// /survey: gate, privacy notice, mode choice, then a voice or text conversation
// with the ElevenLabs interviewer. Datapoints the agent records go through the
// offline queue to the Pi API. Timing signals and the voice-to-text hand-off are
// driven from here (Spec: Timing).
import { getToken, reportClientError, request, storage } from './api.js';
import { attributionPanelHtml, attributionUpdate, attributionValue } from './attribution.js';
import { createQueue } from './queue.js';
import { RelayConversation } from './relay.js';
import { createClock, timeScale, TIMING_MESSAGES } from './timing.js';
import { $, el, esc, gate, noticeHtml, wirePrivacyLinks } from './ui.js';

const SDK_URL = 'https://cdn.jsdelivr.net/npm/@elevenlabs/client@1.26.0/+esm';
const mount = $('#app');
const scale = timeScale();
const RESULTS_PROMISE = "You will see everyone's results at the end, once you have answered the core questions.";

const state = {
  conversation: null,
  session: null,
  mode: null,
  clock: null,
  textMsSoFar: 0,
  voiceTimeUp: false,
  switchingToText: false,
  leaving: false,
  finishing: false,
  progress: { filled_p1: 0, total_p1: 1, complete: false, submitted: false },
};

const queue = createQueue({
  storage,
  send: (item) => request('/datapoints', { method: 'POST', body: item }),
  onResult: (res) => res.ok && res.data?.progress && setProgress(res.data.progress),
});
window.addEventListener('online', () => queue.flush());

// ---------------------------------------------------------------- screens

async function main() {
  wirePrivacyLinks();
  if (!getToken()) {
    await gate(mount, {
      title: 'How was the Valley?',
      lede: 'A conversation about your time at Valley of the Commons 2026: what worked, what did not, what you started, and what comes next. Talk or write, whenever suits you.',
    });
  }
  queue.flush();
  showNotice();
}

function showNotice() {
  const view = el(`
    <section class="sv-panel sv-rise">
      <p class="sv-lede">${esc(RESULTS_PROMISE)}</p>
      <button class="btn btn-orange" type="button" data-start>Start</button>
      <p class="sv-small">How your answers are handled is explained below. Starting means you have read it.</p>
      <div class="sv-notice">${noticeHtml()}</div>
    </section>`);
  $('[data-start]', view).addEventListener('click', () => showModes());
  mount.replaceChildren(view);
}

async function showModes(note = '') {
  let me;
  try {
    me = await request('/me');
  } catch {
    return showProblem('The survey server cannot be reached right now.', () => showModes(), 'none');
  }
  if (me.status === 401) return main();
  if (me.ok) setProgress(me.data.progress, false);
  const returning = state.progress.filled_p1 > 0;
  const view = el(`
    <section class="sv-modes sv-rise">
      <p class="eyebrow">${returning ? 'Welcome back' : 'How would you like to do this?'}</p>
      <h1 class="sv-title">${returning ? 'Pick up where you left off.' : 'Talk it through, or write it down.'}</h1>
      ${note ? `<p class="sv-note">${esc(note)}</p>` : ''}
      <div class="sv-choice">
        <button class="sv-option" data-mode="voice" type="button">
          <span class="sv-option__icon" aria-hidden="true">${ICONS.mic}</span>
          <span class="sv-option__name">Talk</span>
          <span class="sv-option__hint">A spoken conversation of about 8 minutes, 15 at most. Uses your microphone. It carries on in text if there is more to say.</span>
        </button>
        <button class="sv-option" data-mode="text" type="button">
          <span class="sv-option__icon" aria-hidden="true">${ICONS.pen}</span>
          <span class="sv-option__name">Write</span>
          <span class="sv-option__hint">A written chat at your own pace. Stop and come back any time from this browser.</span>
        </button>
      </div>
      <p class="sv-small">${esc(RESULTS_PROMISE)}</p>
      <p class="sv-small">${storage.persistent ? 'This browser remembers your progress.' : 'This browser cannot store your progress (private window?), so finish in one go or use a normal window.'}</p>
    </section>`);
  for (const b of view.querySelectorAll('[data-mode]')) b.addEventListener('click', () => startSession(b.dataset.mode));
  mount.replaceChildren(view);
}

// A submitted person goes straight to the results page, which says when their
// own answers join it. Anyone else sees a short saved-anonymously screen.
const goToResults = () => window.location.assign('/survey/results');

async function endFlow() {
  await queue.flush();
  try {
    const me = await request('/me');
    if (me.ok) setProgress(me.data.progress, false);
  } catch { /* offline: decide on what we know */ }
  return state.progress.submitted ? goToResults() : showSaved();
}

function showSaved() {
  const view = el(`
    <section class="sv-end sv-rise">
      <h1 class="sv-title sv-title--sm">Thank you. Your answers are saved anonymously.</h1>
      <p class="sv-lede">${esc(RESULTS_PROMISE)}</p>
      <div class="sv-actions">
        <button class="btn btn-orange" type="button" data-resume>Continue</button>
      </div>
    </section>`);
  $('[data-resume]', view).addEventListener('click', () => showModes());
  mount.replaceChildren(view);
}

// The results link appears only when /me says this person may read the results.
async function showResultsIfUnlocked(link, view) {
  let res;
  try { res = await request('/me'); } catch { return; }
  if (res.ok && res.data?.results_unlocked && view.isConnected) link.hidden = false;
}

function showPaused() {
  const view = el(`
    <section class="sv-end sv-rise">
      <h1 class="sv-title">Saved for later.</h1>
      <p class="sv-lede">What you said so far is kept. Come back from this browser and the interviewer picks up where you stopped.</p>
      <div class="sv-actions">
        <button class="btn btn-orange" type="button" data-resume>Continue now</button>
        <a class="btn btn-dark" href="/survey/results" data-results hidden>See the results</a>
      </div>
    </section>`);
  $('[data-resume]', view).addEventListener('click', () => showModes());
  mount.replaceChildren(view);
  showResultsIfUnlocked($('[data-results]', view), view);
}

// `failedMode` decides the greeting if the person switches to text: after a
// voice failure the text session is a hand-off, otherwise a normal start.
function showProblem(message, retry, failedMode = 'voice') {
  const view = el(`
    <section class="sv-end sv-rise">
      <h1 class="sv-title">Something got in the way.</h1>
      <p class="sv-lede">${esc(message)}</p>
      <div class="sv-actions">
        <button class="btn btn-orange" type="button" data-retry>Try again</button>
        <button class="btn btn-dark" type="button" data-text>Continue in text</button>
      </div>
    </section>`);
  $('[data-retry]', view).addEventListener('click', () => retry());
  $('[data-text]', view).addEventListener('click', () => startSession('text', { handoff: failedMode === 'voice' }));
  mount.replaceChildren(view);
}

// ---------------------------------------------------------------- conversation

function conversationView(mode, { keepTranscript } = {}) {
  if (mode === 'text' && keepTranscript && $('.sv-chat')) return $('.sv-chat');
  const view = mode === 'voice'
    ? el(`
      <section class="sv-voice sv-rise" aria-live="polite">
        <div class="sv-orb" data-state="connecting">
          <svg class="sv-ring" viewBox="0 0 120 120" aria-hidden="true">
            <circle class="sv-ring__track" cx="60" cy="60" r="56" />
            <circle class="sv-ring__fill" cx="60" cy="60" r="56" pathLength="100" />
          </svg>
          <div class="sv-orb__core"></div>
        </div>
        <p class="sv-status">Connecting</p>
        <p class="sv-caption" data-caption></p>
        <div class="sv-controls">
          <button class="sv-ghost" type="button" data-mute>${ICONS.mic}<span>Mute</span></button>
          <button class="sv-ghost" type="button" data-to-text>${ICONS.pen}<span>Switch to text</span></button>
          <button class="sv-ghost" type="button" data-leave>${ICONS.pause}<span>Stop for now</span></button>
          <button class="sv-ghost sv-ghost--finish" type="button" data-finish hidden>${ICONS.check}<span>Finish</span></button>
        </div>
        <p class="sv-saved">Your answers are saved as you talk.</p>
      </section>`)
    : el(`
      <section class="sv-chat sv-rise">
        <header class="sv-chat__head">
          <svg class="sv-ring sv-ring--small" viewBox="0 0 120 120" aria-hidden="true">
            <circle class="sv-ring__track" cx="60" cy="60" r="56" />
            <circle class="sv-ring__fill" cx="60" cy="60" r="56" pathLength="100" />
          </svg>
          <span class="sv-chat__title">Your conversation</span>
          <button class="sv-ghost sv-ghost--small" type="button" data-leave>${ICONS.pause}<span>Stop for now</span></button>
        </header>
        <ol class="sv-log" aria-live="polite"></ol>
        <p class="sv-done" hidden>That covers everything, and it is all saved. Keep writing if you like, or <button class="sv-link" type="button" data-finish>finish here</button>.</p>
        <form class="sv-compose">
          <textarea name="message" rows="1" placeholder="Write your answer" aria-label="Your message" required></textarea>
          <button class="btn btn-orange" type="submit" aria-label="Send">${ICONS.send}</button>
        </form>
      </section>`);
  mount.replaceChildren(view);
  return view;
}

async function startSession(mode, { handoff = false, continuation = false } = {}) {
  state.mode = mode;
  state.voiceTimeUp = false;
  state.switchingToText = false;
  state.leaving = false;
  state.finishing = false;
  const view = conversationView(mode, { keepTranscript: continuation || handoff });
  if (handoff) appendNote(view, 'Voice has ended. The conversation continues here.');
  setProgress(state.progress, false);

  const retry = () => startSession(mode, { handoff, continuation });
  const textOnly = mode === 'text';
  // Voice loads the SDK before asking for a session: a session that cannot connect
  // still counts toward the limits, so never create one the page cannot use.
  // Text does not need it: the Pi holds that connection (survey/relay.js).
  let Conversation;
  if (!textOnly) {
    try {
      ({ Conversation } = await import(SDK_URL));
    } catch (err) {
      reportClientError('sdk_load', err);
      return showProblem('The conversation tool could not load. A browser extension or network filter may be blocking cdn.jsdelivr.net or elevenlabs.io.', retry, mode);
    }
  }
  let session;
  try {
    session = await request('/sessions', { method: 'POST', body: { mode, handoff, continuation } });
  } catch {
    return showProblem('The survey server cannot be reached right now.', retry, mode);
  }
  if (session.status === 401) return main();
  if (session.status === 429) return showProblem(session.data?.error || 'The survey is busy right now. Please come back later.', () => showModes(), 'none');
  if (!session.ok) return showProblem('The conversation could not start.', retry, mode);
  state.session = session.data;
  setProgress(session.data.progress, false);

  const callbacks = {
    clientTools: { record_datapoint: recordDatapoint, ask_attribution: () => showAttributionPanel() },
    onConnect: ({ conversationId }) => {
      request(`/sessions/${state.session.session_id}/conversation`, { method: 'POST', body: { conversation_id: conversationId } }).catch(() => {});
    },
    onMessage: (m) => onMessage(view, m),
    onStatusChange: ({ status }) => status === 'connected' && setOrbState(view, 'listening'),
    onDisconnect: (details) => onDisconnect(details),
  };
  const startedAt = Date.now();
  let waitingNoted = false;
  // Stop and Finish work during the busy wait: they abort the relay's retries.
  state.abort = textOnly ? new AbortController() : null;
  if (textOnly) wireCompose(view);
  try {
    state.conversation = textOnly
      ? await RelayConversation.startSession({
        sessionId: session.data.session_id,
        signal: state.abort.signal,
        ...callbacks,
        onWaiting: () => {
          if (waitingNoted) return;
          waitingNoted = true;
          appendNote(view, 'Busy for a moment, connecting\u2026 (it retries on its own)');
        },
      })
      : await Conversation.startSession({
        signedUrl: session.data.signed_url,
        textOnly,
        overrides: { conversation: { textOnly } },
        dynamicVariables: session.data.dynamic_variables,
        ...callbacks,
        onModeChange: ({ mode: m }) => setOrbState(view, m),
        onError: () => {},
      });
  } catch (err) {
    if (err?.name === 'RelayAborted') return; // Stop or Finish already moved on (abandonSession)
    reportClientError('connect', err, state.session.session_id, Date.now() - startedAt);
    if (err?.name === 'RelayBusy') return showProblem('Lots of people are answering right now. Please try again in a few minutes.', retry, mode);
    const blocked = !textOnly && /permission|notallowed|denied/i.test(String(err?.name) + String(err?.message));
    return showProblem(
      blocked
        ? 'Microphone access was blocked. Allow it in your browser settings, or continue in text.'
        : textOnly
          ? 'The conversation could not connect.'
          : 'The voice conversation could not connect. Some security software, VPNs or networks block it. You can continue in text, which works everywhere, or try another device or network.',
      retry, mode);
  }

  state.abort = null;
  state.clock = createClock({ mode, scale, offsetMs: textOnly ? state.textMsSoFar : 0, onThreshold });
  if (!textOnly) wireVoiceControls(view);
}

// Stop or Finish was pressed while the relay was still connecting.
function abandonSession() {
  state.abort = null;
  request(`/sessions/${state.session.session_id}/end`, { method: 'POST' }).catch(() => {});
  return state.finishing ? endFlow() : showPaused();
}

function recordDatapoint(params) {
  const value = typeof params.value === 'string' ? params.value : JSON.stringify(params.value ?? '');
  queue.enqueue({
    session_id: state.session?.session_id,
    key: params.key,
    value,
    confidence: params.confidence,
    evidence: params.evidence,
    idempotency_key: crypto.randomUUID(),
  });
}

// The closing name box (agent tool ask_attribution), in the voice or text view.
// The page records the consent itself, then tells the agent so it carries on.
function showAttributionPanel() {
  const host = $('.sv-voice, .sv-chat');
  if (!host || $('[data-attrib]', host)) return;
  const panel = el(attributionPanelHtml());
  const submit = (name) => {
    const value = attributionValue(name);
    queue.enqueue({ session_id: state.session?.session_id, key: 'attribution_consent', value, confidence: 100, evidence: 'name box', idempotency_key: crypto.randomUUID() });
    // A user message, not a contextual update: contextual updates never prompt the
    // agent to take a turn, so the closing would stall here (seen live 2026-10-06).
    state.conversation?.sendUserMessage(attributionUpdate(value));
    if (state.mode === 'text') setTyping(host, true);
    panel.replaceChildren(el(`<p class="sv-attrib__done">${esc(JSON.parse(value).choice === 'named' ? `Shown as ${JSON.parse(value).display_name}.` : 'Shown anonymously.')}</p>`));
  };
  panel.addEventListener('submit', (e) => { e.preventDefault(); submit(panel.name.value); });
  $('[data-anon]', panel).addEventListener('click', () => submit(''));
  const anchor = $('.sv-compose, .sv-controls', host);
  if (anchor) anchor.before(panel); else host.append(panel);
  panel.name.focus();
}

function onThreshold(id) {
  const c = state.conversation;
  if (!c) return;
  if (state.mode === 'voice') {
    if (id === 'goodbye') state.voiceTimeUp = true;
    if (id === 'hard_stop') return switchToText();
  }
  const message = TIMING_MESSAGES[state.mode][id];
  if (message) c.sendContextualUpdate(message);
}

async function onDisconnect(details) {
  const { mode } = state;
  if (details.reason === 'error') reportClientError('disconnect', { name: 'disconnect', message: details.message }, state.session?.session_id);
  state.clock?.stop();
  const sessionMs = (state.clock?.elapsed() ?? 0) - (mode === 'text' ? state.textMsSoFar : 0);
  if (mode === 'text') state.textMsSoFar = state.clock?.elapsed() ?? state.textMsSoFar;
  state.conversation = null;
  if (state.session) request(`/sessions/${state.session.session_id}/end`, { method: 'POST' }).catch(() => {});
  if (state.leaving) return showPaused();
  if (state.finishing) return endFlow();

  // Deliver anything still queued, then read the real progress before deciding.
  const screen = mount.firstElementChild;
  await queue.flush();
  try {
    const me = await request('/me');
    if (me.ok) setProgress(me.data.progress, false);
  } catch { /* offline: decide on what we know */ }
  if (mount.firstElementChild !== screen) return; // the person already moved on while we waited
  if (state.leaving) return showPaused(); // "Stop for now" pressed while waiting

  if (mode === 'voice') {
    if (state.voiceTimeUp || state.switchingToText) return startSession('text', { handoff: true });
    if (details.reason === 'error') return showProblem('The voice connection dropped.', () => startSession('voice'));
    return state.progress.submitted ? goToResults() : showSaved();
  }
  // Text: the platform ends a session at the agent's maximum duration. Only that
  // case continues invisibly; an agent hang-up before the closing does not.
  const limitMs = (state.session?.max_duration_seconds || 0) * 1000;
  const hitLimit = details.reason === 'agent' && limitMs > 0 && sessionMs >= limitMs - 30000;
  if (hitLimit && !state.progress.submitted) return startSession('text', { continuation: true });
  if (details.reason === 'error') return showProblem('The connection dropped.', () => startSession('text', { continuation: true }), 'text');
  return state.progress.submitted ? goToResults() : showSaved();
}

function switchToText() {
  state.switchingToText = true;
  state.conversation?.endSession();
}

function wireVoiceControls(view) {
  let muted = false;
  $('[data-mute]', view).addEventListener('click', (e) => {
    muted = !muted;
    state.conversation?.setMicMuted(muted);
    e.currentTarget.classList.toggle('is-on', muted);
    $('span', e.currentTarget).textContent = muted ? 'Unmute' : 'Mute';
  });
  $('[data-to-text]', view).addEventListener('click', switchToText);
  $('[data-leave]', view).addEventListener('click', leave);
  $('[data-finish]', view).addEventListener('click', finish);
  animateOrb(view);
}

function wireCompose(view) {
  const form = $('.sv-compose', view);
  if (form.dataset.wired) return;
  form.dataset.wired = '1';
  const box = form.message;
  const grow = () => { box.style.height = 'auto'; box.style.height = `${Math.min(box.scrollHeight, 180)}px`; };
  box.addEventListener('input', grow);
  box.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); form.requestSubmit(); }
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = box.value.trim();
    if (!text || !state.conversation) return;
    appendMessage(view, 'user', text);
    state.conversation.sendUserMessage(text);
    box.value = '';
    grow();
    setTyping(view, true);
  });
  $('[data-leave]', view).addEventListener('click', leave);
  $('[data-finish]', view).addEventListener('click', finish);
  box.focus();
}

function finish() {
  state.finishing = true;
  if (state.conversation) state.conversation.endSession();
  else if (state.abort) { state.abort.abort(); abandonSession(); }
  else endFlow();
}

function leave() {
  state.leaving = true;
  if (state.conversation) state.conversation.endSession();
  else if (state.abort) { state.abort.abort(); abandonSession(); }
  else showPaused();
}

// ---------------------------------------------------------------- rendering

function onMessage(view, m) {
  const role = m.role || (m.source === 'ai' ? 'agent' : 'user');
  if (state.mode === 'voice') {
    const caption = $('[data-caption]', view);
    if (caption) { caption.textContent = m.message; caption.dataset.role = role; }
    return;
  }
  if (role === 'user') return; // already shown when sent
  setTyping(view, false);
  appendMessage(view, 'agent', m.message);
}

function appendMessage(view, role, text) {
  const log = $('.sv-log', view);
  log.append(el(`<li class="sv-msg sv-msg--${role}"><p>${esc(text)}</p></li>`));
  log.lastElementChild.scrollIntoView({ block: 'end', behavior: 'smooth' });
}

function appendNote(view, text) {
  const log = $('.sv-log', view);
  if (log) log.append(el(`<li class="sv-msg sv-msg--note"><p>${esc(text)}</p></li>`));
}

function setTyping(view, on) {
  const log = $('.sv-log', view);
  $('.sv-typing', log)?.remove();
  if (on) log.append(el('<li class="sv-typing" aria-label="The interviewer is writing"><i></i><i></i><i></i></li>'));
}

function setOrbState(view, s) {
  const orb = $('.sv-orb', view);
  if (!orb) return;
  orb.dataset.state = s;
  $('.sv-status', view).textContent = s === 'speaking' ? 'Speaking' : s === 'listening' ? 'Listening' : 'Connecting';
}

// The orb breathes with whoever is talking: output volume while the agent
// speaks, microphone level while it listens.
function animateOrb(view) {
  const orb = $('.sv-orb', view);
  const frame = () => {
    const c = state.conversation;
    if (!c || !orb.isConnected) return;
    const level = orb.dataset.state === 'speaking' ? c.getOutputVolume() : c.getInputVolume();
    orb.style.setProperty('--level', Math.min(1, level * 1.6).toFixed(3));
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

function setProgress(p, animate = true) {
  if (p) state.progress = p;
  const fraction = Math.min(1, state.progress.filled_p1 / (state.progress.total_p1 || 1));
  for (const ring of document.querySelectorAll('.sv-ring__fill')) {
    ring.style.transition = animate ? '' : 'none';
    ring.style.strokeDashoffset = String(100 - fraction * 100);
  }
  const done = $('.sv-done');
  if (done) done.hidden = !state.progress.complete;
  const finishVoice = $('.sv-voice [data-finish]');
  if (finishVoice) finishVoice.hidden = !state.progress.complete;
}

const ICONS = {
  mic: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
  pen: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16v4zM13.5 6.5l4 4"/></svg>',
  pause: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M9 6v12M15 6v12"/></svg>',
  send: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>',
  leaf: '<svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 38C10 20 22 10 40 8c-2 18-12 30-30 30z"/><path d="M10 38 28 20"/></svg>',
};

main();
