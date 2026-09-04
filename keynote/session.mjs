// Keynote live quiz/survey client. Loaded only for companion pages that have
// items (Week 2 + evergreen). Talks to the separate Supabase project: realtime
// reads with the anon key, all writes via the /api/keynote/* server routes.
//
// Phases (from quiz_state.phase): idle (show the companion) -> lobby -> question
// (pre-roll then timed) -> reveal (quiz only) -> leaderboard -> ended. The host,
// revealed by an easter-egg tap on the title and gated by KEYNOTE_HOST_SECRET,
// drives the transitions; every other phone just displays. Timing mirrors the
// server (keep in sync): pre-roll 5s, answer window 30s, reveal 3s.
const PREROLL_MS = 5000;
const QUESTION_MS = 30000;
const REVEAL_MS = 3000;

const esc = (s) =>
  String(s == null ? '' : s).replace(/[&<>"]/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])
  );

export async function initSession(room, els) {
  const slug = room.slug;
  let cfg;
  try {
    cfg = await (await fetch('/api/keynote/config')).json();
  } catch {
    return; // no backend reachable; companion stays as-is
  }
  if (!cfg || !cfg.configured) return; // live session offline

  let createClient;
  try {
    ({ createClient } = await import('https://esm.sh/@supabase/supabase-js@2'));
  } catch {
    return; // CDN blocked; companion still works
  }
  const sb = createClient(cfg.url, cfg.anonKey, { auth: { persistSession: false } });

  // --- local state ---
  const meKey = `keynote_player_${slug}`;
  let me = null;
  try { me = JSON.parse(localStorage.getItem(meKey) || 'null'); } catch { me = null; }
  let hostSecret = null;
  try { hostSecret = sessionStorage.getItem('keynote_host_secret'); } catch { hostSecret = null; }
  let hostActive = !!hostSecret;

  let state = { phase: 'idle', current_index: 0, question_started_at: null, revealed_answer: null };
  let players = [];
  let answers = [];
  let picked = null; // {index, choice}
  let pickError = null;
  let hostTimers = [];

  const view = els.session; // the container we render the live session into
  const companion = els.companion; // the companion wrapper (hidden during a live session)

  // --- data ---
  async function refetch() {
    const [{ data: st }, { data: pl }, { data: an }] = await Promise.all([
      sb.from('quiz_state').select('*').eq('slug', slug).maybeSingle(),
      sb.from('quiz_players').select('id,nickname,score').eq('slug', slug),
      sb.from('quiz_answers').select('question_index,choice').eq('slug', slug),
    ]);
    if (st) state = st;
    players = pl || [];
    answers = an || [];
    render();
  }

  // --- host actions ---
  async function hostAction(action) {
    if (!hostSecret) return;
    try {
      const res = await fetch(`/api/keynote/host/${action}?slug=${encodeURIComponent(slug)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Keynote-Host': hostSecret },
        body: '{}',
      });
      if (res.status === 403) { alert('Host secret rejected.'); }
    } catch { /* ignore */ }
  }

  async function join(nickname) {
    const res = await fetch(`/api/keynote/join?slug=${encodeURIComponent(slug)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname }),
    });
    const data = await res.json().catch(() => ({}));
    if (data.player_id) {
      me = { id: data.player_id, nickname };
      localStorage.setItem(meKey, JSON.stringify(me));
      render();
    }
  }

  async function submit(choice) {
    if (!me) return;
    const index = state.current_index;
    picked = { index, choice };
    pickError = null;
    render();
    try {
      const res = await fetch(`/api/keynote/submit?slug=${encodeURIComponent(slug)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player_id: me.id, question_index: index, choice }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        if (d.error === 'duplicate') { /* already locked; keep pick */ }
        else if (d.error === 'too_late') { pickError = "Time's up on that one."; }
        else if (d.error === 'not_open') { pickError = 'That just closed.'; }
        else { pickError = 'Could not lock that in. Tap again.'; picked = null; }
        render();
      }
    } catch {
      pickError = 'Network hiccup. Tap again.';
      picked = null;
      render();
    }
  }

  // The host client runs the per-question timers: at the answer window's close,
  // reveal (quiz) then standings, or straight to standings (poll).
  function scheduleHostTimers() {
    hostTimers.forEach(clearTimeout);
    hostTimers = [];
    if (!hostActive || state.phase !== 'question' || !state.question_started_at) return;
    const startedAt = new Date(state.question_started_at).getTime();
    const closeAt = startedAt + QUESTION_MS;
    const isQuiz = (room.items[state.current_index] || {}).type === 'quiz';
    const at = (t) => Math.max(0, t - Date.now());
    if (isQuiz) {
      hostTimers.push(setTimeout(() => hostAction('reveal'), at(closeAt) + 150));
      hostTimers.push(setTimeout(() => hostAction('leaderboard'), at(closeAt + REVEAL_MS) + 150));
    } else {
      hostTimers.push(setTimeout(() => hostAction('leaderboard'), at(closeAt) + 150));
    }
  }

  // --- rendering ---
  function myAnswerFor(index) {
    if (picked && picked.index === index) return picked.choice;
    return null;
  }

  function optionButtons(item, index, opts) {
    const revealed = state.revealed_answer;
    const myChoice = myAnswerFor(index);
    return item.options
      .map((o, i) => {
        const isMine = myChoice === i;
        const isCorrect = revealed !== null && i === revealed;
        const cls = ['kq-opt', isMine ? 'is-mine' : '', isCorrect ? 'is-correct' : ''].join(' ').trim();
        const disabled = opts.disabled ? 'disabled' : '';
        return `<button class="${cls}" data-choice="${i}" ${disabled}>${esc(o)}</button>`;
      })
      .join('');
  }

  function render() {
    scheduleHostTimers();
    const live = state.phase !== 'idle';
    if (companion) companion.style.display = live ? 'none' : '';
    view.style.display = live ? '' : 'none';
    if (!live) { view.innerHTML = ''; renderHostBar(); return; }

    const item = room.items[state.current_index];
    let body = '';
    if (state.phase === 'lobby') {
      body = `<div class="kq-center"><p class="eyebrow">Get ready</p>
        <h2 class="kq-h">${esc(room.meta.eyebrow)}</h2>
        <p class="kq-sub">${players.length} in the room</p>
        ${me ? '' : joinFormHtml()}</div>`;
    } else if (state.phase === 'question' && item) {
      const startedAt = state.question_started_at ? new Date(state.question_started_at).getTime() : 0;
      const preroll = Date.now() < startedAt;
      const section = item.type === 'quiz' ? 'Quiz' : 'Survey';
      if (!me) {
        body = `<div class="kq-center">${joinFormHtml()}</div>`;
      } else if (preroll) {
        body = `<div class="kq-center"><p class="eyebrow">${section}</p><h2 class="kq-h">Next question in a moment</h2></div>`;
      } else {
        body = `<div class="kq-q">
          <p class="eyebrow">${section} &middot; question ${state.current_index + 1}</p>
          <h2 class="kq-h">${esc(item.prompt)}</h2>
          <div class="kq-opts">${optionButtons(item, state.current_index, { disabled: false })}</div>
          ${pickError ? `<p class="kq-err">${esc(pickError)}</p>` : picked && picked.index === state.current_index ? `<p class="kq-sub">Locked in.</p>` : ''}
        </div>`;
      }
    } else if (state.phase === 'reveal' && item) {
      body = `<div class="kq-q">
        <p class="eyebrow">Answer</p>
        <h2 class="kq-h">${esc(item.prompt)}</h2>
        <div class="kq-opts">${optionButtons(item, state.current_index, { disabled: true })}</div>
      </div>`;
    } else if (state.phase === 'leaderboard') {
      body = item && item.type === 'poll' ? pollResultsHtml(item) : leaderboardHtml();
    } else if (state.phase === 'ended') {
      body = `<div class="kq-center"><p class="eyebrow">That's a wrap</p><h2 class="kq-h">Thank you for playing</h2></div>${leaderboardHtml()}`;
    }
    view.innerHTML = body;
    wireView();
    renderHostBar();
  }

  function joinFormHtml() {
    return `<form class="kq-join"><input class="kq-input" maxlength="24" placeholder="your nickname" aria-label="nickname" /><button class="cta" type="submit">Join</button></form>`;
  }

  function leaderboardHtml() {
    const sorted = [...players].sort((a, b) => (b.score || 0) - (a.score || 0));
    const rows = sorted
      .slice(0, 12)
      .map((p, i) => `<li><span class="kq-rank">${i + 1}</span><span class="kq-name">${esc(p.nickname)}</span><span class="kq-score">${p.score || 0}</span></li>`)
      .join('');
    return `<div class="kq-board"><p class="eyebrow">Standings</p><ol class="kq-list">${rows || '<li>No players yet</li>'}</ol></div>`;
  }

  function pollResultsHtml(item) {
    const idx = state.current_index;
    const counts = item.options.map((_, i) => answers.filter((a) => a.question_index === idx && a.choice === i).length);
    const total = counts.reduce((s, c) => s + c, 0) || 1;
    const bars = item.options
      .map((o, i) => {
        const pct = Math.round((counts[i] / total) * 100);
        return `<div class="kq-bar"><div class="kq-bar__label">${esc(o)} <span>${pct}%</span></div><div class="kq-bar__track"><div class="kq-bar__fill" style="width:${pct}%"></div></div></div>`;
      })
      .join('');
    return `<div class="kq-board"><p class="eyebrow">The room</p><h2 class="kq-h">${esc(item.prompt)}</h2>${bars}</div>`;
  }

  function renderHostBar() {
    let bar = document.getElementById('kq-hostbar');
    if (!hostActive) { if (bar) bar.remove(); return; }
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'kq-hostbar';
      document.body.appendChild(bar);
    }
    const p = state.phase;
    const item = room.items[state.current_index];
    const isLast = state.current_index >= room.items.length - 1;
    let primary = '';
    if (p === 'idle') primary = btn('open', 'Open session');
    else if (p === 'lobby') primary = btn('next', 'Start');
    else if (p === 'question') primary = btn('leaderboard', 'End question');
    else if (p === 'leaderboard') primary = isLast ? btn('finish', 'Finish') : btn('next', 'Next question');
    else if (p === 'ended') primary = btn('close', 'Close & show companion');
    bar.innerHTML = `<div class="kq-hostbar__row"><span class="kq-hostbar__meta">host &middot; ${esc(p)} &middot; ${state.current_index + 1}/${room.items.length} &middot; ${item ? esc(item.type) : '-'} &middot; ${players.length} in room</span>
      <span class="kq-hostbar__btns">${primary} ${btn('reset', 'Reset')}</span></div>`;
    bar.querySelectorAll('button[data-action]').forEach((b) =>
      b.addEventListener('click', () => hostAction(b.getAttribute('data-action')))
    );
  }
  function btn(action, label) {
    return `<button data-action="${action}">${esc(label)}</button>`;
  }

  function wireView() {
    const form = view.querySelector('.kq-join');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const v = form.querySelector('.kq-input').value.trim();
        if (v) join(v);
      });
    }
    view.querySelectorAll('.kq-opt[data-choice]').forEach((b) => {
      if (b.disabled) return;
      b.addEventListener('click', () => submit(Number(b.getAttribute('data-choice'))));
    });
  }

  // --- host easter egg: 5 taps on the companion title within 3s ---
  let taps = [];
  const title = companion && companion.querySelector('.companion__title');
  if (title) {
    title.style.cursor = 'default';
    title.addEventListener('click', () => {
      const now = Date.now();
      taps = taps.filter((t) => now - t < 3000);
      taps.push(now);
      if (taps.length >= 5) {
        taps = [];
        const secret = prompt('Host secret:');
        if (secret) {
          hostSecret = secret;
          hostActive = true;
          try { sessionStorage.setItem('keynote_host_secret', secret); } catch { /* ignore */ }
          render();
        }
      }
    });
  }

  // --- realtime + initial load ---
  sb.channel(`keynote-${slug}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'quiz_state', filter: `slug=eq.${slug}` }, refetch)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'quiz_players', filter: `slug=eq.${slug}` }, refetch)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'quiz_answers', filter: `slug=eq.${slug}` }, refetch)
    .subscribe();

  // Re-render on the local clock too, so the pre-roll -> question transition and
  // the answer window are reflected without waiting for a DB event.
  setInterval(() => { if (state.phase === 'question') render(); }, 1000);

  await refetch();
}
