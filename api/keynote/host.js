// POST /api/keynote/host/:action?slug=<slug>
// Drives the room state machine. Gated by KEYNOTE_HOST_SECRET (isHost). All state
// writes go through here with the service key. Upserts quiz_state so a room whose
// row was never seeded self-heals on the first action.
//
// Flow: open -> lobby; next -> question (question_started_at set PREROLL_MS in the
// future for the get-ready window); reveal publishes the correct index (quiz only);
// leaderboard -> standings; next past the last item (or finish) -> ended; close ->
// idle (keeps results); reset -> idle (archives then clears). open and reset and
// finish archive the session first, so results are never lost.
const {
  serviceClient, isHost, itemCount, itemsFor, correctIndexFor, PREROLL_MS,
} = require('./quiz');

async function archiveSession(db, slug) {
  try {
    const [{ data: players }, { data: answers }] = await Promise.all([
      db.from('quiz_players').select('nickname,score,joined_at').eq('slug', slug),
      db.from('quiz_answers').select('question_index,choice').eq('slug', slug),
    ]);
    if (!players || players.length === 0) return;
    const standings = [...players]
      .sort(
        (a, b) =>
          (b.score ?? 0) - (a.score ?? 0) ||
          String(a.joined_at).localeCompare(String(b.joined_at))
      )
      .map((p) => ({ nickname: p.nickname, score: p.score ?? 0 }));
    const items = await itemsFor(slug);
    const aggregates = items.map((it, i) => {
      const counts = new Array(it.options.length).fill(0);
      for (const a of answers || []) {
        if (a.question_index === i && a.choice >= 0 && a.choice < counts.length) counts[a.choice] += 1;
      }
      return counts;
    });
    await db.from('quiz_sessions').insert({ slug, results: { standings, aggregates, playerCount: players.length } });
  } catch (e) {
    // best-effort archive; never block the host action
    console.error('[keynote/host] archive failed:', e && e.message);
  }
}

const ACTIONS = ['open', 'next', 'reveal', 'finish', 'leaderboard', 'close', 'reset'];

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const db = serviceClient();
  if (!db) return res.status(503).json({ error: 'not_configured' });
  if (!isHost(req)) return res.status(403).json({ error: 'forbidden' });

  const action = (req.params && req.params.action) || '';
  if (!ACTIONS.includes(action)) return res.status(404).json({ error: 'unknown_action' });
  const slug = (req.query.slug || '').toString();
  if (!slug) return res.status(400).json({ error: 'bad_request' });

  const { data: state } = await db.from('quiz_state').select('*').eq('slug', slug).maybeSingle();
  const current = state ? state.current_index : 0;
  const phase = state ? state.phase : 'idle';

  let patch = {};
  switch (action) {
    case 'open':
      await archiveSession(db, slug);
      await db.from('quiz_answers').delete().eq('slug', slug);
      await db.from('quiz_players').delete().eq('slug', slug);
      patch = { phase: 'lobby', current_index: 0, question_started_at: null, revealed_answer: null };
      break;
    case 'next': {
      const target = phase === 'lobby' ? 0 : current + 1;
      if (target >= (await itemCount(slug))) {
        patch = { phase: 'ended' };
        await archiveSession(db, slug);
      } else {
        patch = {
          phase: 'question',
          current_index: target,
          question_started_at: new Date(Date.now() + PREROLL_MS).toISOString(),
          revealed_answer: null,
        };
      }
      break;
    }
    case 'reveal':
      patch = { revealed_answer: correctIndexFor(slug, current) };
      break;
    case 'finish':
      patch = { phase: 'ended' };
      await archiveSession(db, slug);
      break;
    case 'leaderboard':
      patch = { phase: 'leaderboard' };
      break;
    case 'close':
      patch = { phase: 'idle', current_index: 0, question_started_at: null, revealed_answer: null };
      break;
    case 'reset':
      await archiveSession(db, slug);
      await db.from('quiz_answers').delete().eq('slug', slug);
      await db.from('quiz_players').delete().eq('slug', slug);
      patch = { phase: 'idle', current_index: 0, question_started_at: null, revealed_answer: null };
      break;
  }

  const { error } = await db
    .from('quiz_state')
    .upsert({ slug, ...patch, updated_at: new Date().toISOString() }, { onConflict: 'slug' });
  if (error) {
    console.error('[keynote/host]', error.message);
    return res.status(500).json({ error: 'update_failed' });
  }
  return res.status(200).json({ ok: true, phase: patch.phase ?? phase });
};
