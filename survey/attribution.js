// The name box shown at the closing (agent tool ask_attribution). The page, not
// the agent, records attribution_consent from it: an empty name means anonymous.
// Pure helpers, so they are unit-tested.
export const NAME_MAX = 80;

/** The attribution_consent value (JSON text for POST /datapoints) for what was typed. */
export function attributionValue(name) {
  const display_name = String(name ?? '').trim().slice(0, NAME_MAX);
  return JSON.stringify(display_name ? { choice: 'named', display_name } : { choice: 'anonymous' });
}

/** The contextual update that tells the agent to move on. */
export function attributionUpdate(value) {
  const v = JSON.parse(value);
  return v.choice === 'named' ? `[attribution] recorded: named as ${v.display_name}` : '[attribution] recorded: anonymous';
}

export const attributionPanelHtml = () => `
  <form class="sv-attrib" data-attrib>
    <label class="sv-attrib__label" for="sv-attrib-name">How should we show your answers?</label>
    <input id="sv-attrib-name" class="sv-attrib__input" name="name" type="text" maxlength="${NAME_MAX}" autocomplete="name" placeholder="Leave empty to stay anonymous" aria-label="Name to show" />
    <div class="sv-attrib__actions">
      <button class="btn btn-orange" type="submit">Show my name</button>
      <button class="btn btn-dark" type="button" data-anon>Stay anonymous</button>
    </div>
  </form>`;
