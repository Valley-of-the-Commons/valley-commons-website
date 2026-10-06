// The line that tells a submitted person when their own answers join the results,
// shared by the thank-you screen and the results page. Pure, so it is unit-tested.
export const INCLUDED_LINE = 'Your answers are now in the results.';
const UNKNOWN_MINUTES = 3;

/** `etaSeconds` is the Pi's estimate (null or undefined while unknown). */
export function etaLine(etaSeconds) {
  const known = Number.isFinite(etaSeconds);
  if (known && etaSeconds < 30) return 'Your own answers will be added to the results in a moment.';
  const minutes = known ? Math.max(1, Math.ceil(etaSeconds / 60)) : UNKNOWN_MINUTES;
  return `Your own answers will be added to the results in about ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}.`;
}

/** The status line for a `you` object ({ included, eta_seconds }) from the Pi. */
export const youLine = (you) => (you?.included ? INCLUDED_LINE : etaLine(you?.eta_seconds));
