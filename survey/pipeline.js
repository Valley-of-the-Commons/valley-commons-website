// The live feed on the thank-you screen: turns the Pi's /sessions/:id/status
// into short lines, one per real step. Pure, so it is unit-tested.
// Each line: { state: 'done' | 'wait' | 'warn', text }.

const TRANSCRIPT_PATIENCE_MS = 3 * 60 * 1000;
const after = (a, b) => Boolean(a) && (!b || Date.parse(a) > Date.parse(b));

function inSeconds(iso, now) {
  const s = Math.max(0, Math.round((Date.parse(iso) - now) / 1000));
  return s >= 60 ? `${Math.floor(s / 60)} min ${s % 60} s` : `${s} s`;
}

export function pipelineLines(status, now = Date.now(), endedAt = now) {
  const lines = [];
  const { transcript: t, synthesis: syn } = status;
  lines.push({ state: 'done', text: `${status.answers_saved} answers saved to Deca's Raspberry Pi (Postgres) as you talked` });

  // 1. The transcript from ElevenLabs (post-call webhook).
  let reread = null;
  if (!t?.received_at) {
    const late = now - endedAt > TRANSCRIPT_PATIENCE_MS;
    lines.push(late
      ? { state: 'warn', text: 'The transcript from ElevenLabs has not arrived yet. Your answers are already saved.' }
      : { state: 'wait', text: 'Waiting for ElevenLabs to send the transcript (post-call webhook)…' });
    if (!late) return { lines, ready: false };
  } else {
    lines.push({ state: 'done', text: 'Transcript received from ElevenLabs (signed webhook, HMAC verified)' });
    // 2. The re-read (reconciliation) by Claude.
    if (t.reconcile_note === 'short') reread = { state: 'done', text: 'Re-read skipped: short conversation' };
    else if (t.reconcile_note === 'paused' && !t.reconciled_at) reread = { state: 'warn', text: 'Re-read by Claude paused (spend cap or no key); it will run later' };
    else if (t.reconciled_at) {
      const n = t.reconcile_filled || 0;
      reread = { state: 'done', text: n ? `Re-read by Claude Sonnet 5.5: ${n} more answer${n > 1 ? 's' : ''} found` : 'Re-read by Claude Sonnet 5.5: nothing missed' };
    } else {
      lines.push({ state: 'wait', text: 'Claude Sonnet 5.5 is re-reading the transcript for anything missed…' });
      return { lines, ready: false };
    }
    lines.push(reread);
  }

  // 3. The results rebuild (graph + summaries), after the steps above.
  const since = t?.reconciled_at || t?.received_at || endedAt;
  const latest = syn.latest;
  if (latest && after(latest.generated_at, typeof since === 'number' ? new Date(since).toISOString() : since)) {
    lines.push({ state: latest.paused ? 'warn' : 'done', text: latest.paused
      ? `Results rebuilt (version ${latest.version}): counts and board updated; written summaries paused`
      : `Results rebuilt (version ${latest.version}): graph in Apache AGE, summaries by Claude Sonnet 5.5` });
    return { lines, ready: true };
  }
  if (syn.running) lines.push({ state: 'wait', text: 'Rebuilding the graph (Apache AGE) and writing summaries with Claude Sonnet 5.5…' });
  else if (syn.pending && syn.next_run_at) lines.push({ state: 'wait', text: `Results rebuild queued: starts in ${inSeconds(syn.next_run_at, now)}` });
  else lines.push({ state: 'wait', text: 'Results rebuild about to be queued…' });
  return { lines, ready: false };
}
