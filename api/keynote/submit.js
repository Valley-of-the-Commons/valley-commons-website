// POST /api/keynote/submit?slug=<slug>  body: { player_id, question_index, choice }
// Records one answer per (player, item), scores it server-side (correct key never
// shipped), and updates the player's running score. Rejects submissions outside
// the open answer window (pre-roll or past the limit) and duplicates.
const {
  serviceClient, isQuizItem, correctIndexFor, scoreQuiz, QUESTION_MS,
} = require('./quiz');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const db = serviceClient();
  if (!db) return res.status(503).json({ error: 'not_configured' });

  const slug = (req.query.slug || '').toString();
  const body = req.body || {};
  const playerId = body.player_id;
  const questionIndex = body.question_index;
  const choice = body.choice;
  if (!slug || !playerId || typeof questionIndex !== 'number' || typeof choice !== 'number') {
    return res.status(400).json({ error: 'bad_request' });
  }

  const { data: state } = await db
    .from('quiz_state')
    .select('phase,current_index,question_started_at')
    .eq('slug', slug)
    .maybeSingle();
  if (!state || state.phase !== 'question' || state.current_index !== questionIndex) {
    return res.status(409).json({ error: 'not_open' });
  }
  const startedAt = state.question_started_at ? new Date(state.question_started_at).getTime() : null;
  if (startedAt === null) return res.status(409).json({ error: 'not_open' });
  const elapsed = Date.now() - startedAt; // negative during the pre-roll window
  if (elapsed < 0) return res.status(409).json({ error: 'not_open' });
  if (elapsed > QUESTION_MS) return res.status(409).json({ error: 'too_late' });

  const quiz = await isQuizItem(slug, questionIndex);
  let isCorrect = null;
  let points = 0;
  if (quiz) {
    const correct = correctIndexFor(slug, questionIndex);
    isCorrect = correct !== null && choice === correct;
    points = scoreQuiz(isCorrect, elapsed);
  }

  const { error: insErr } = await db
    .from('quiz_answers')
    .insert({ slug, player_id: playerId, question_index: questionIndex, choice, is_correct: isCorrect, points });
  if (insErr) {
    // unique(player_id, question_index) violation = already answered this item
    return res.status(409).json({ error: 'duplicate' });
  }

  if (points > 0) {
    // One answer per item per player, from one device, so read-then-add is safe.
    const { data: p } = await db.from('quiz_players').select('score').eq('id', playerId).maybeSingle();
    const newScore = (p && p.score ? p.score : 0) + points;
    await db.from('quiz_players').update({ score: newScore }).eq('id', playerId);
  }

  return res.status(200).json({ ok: true, points, isCorrect });
};
