// Pieces the results page uses: the password gate and the privacy notice.

export const $ = (sel, root = document) => root.querySelector(sel);
export const el = (html) => {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
};
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// The facts the notice states, as configured while the survey ran
// (ElevenLabs agent privacy settings, the interviewer LLM, the synthesis model).
// Checked 2026-10-03: agent privacy.retention_days 7, record_voice false, llm
// claude-sonnet-5-5 (pi-data services/votc-survey/agent/settings.json); synthesis
// model claude-sonnet-5-5 (src/llm.js). Safeguards: ElevenLabs' own DPF policy
// page; Anthropic's Data Processing Addendum (SCCs, Modules 2 and 3).
export const NOTICE_FACTS = {
  elevenlabsRetentionDays: '7',
  interviewerProvider: 'Anthropic (US), through ElevenLabs,',
  synthesisProvider: 'Anthropic (US)',
  transferSafeguard: 'ElevenLabs is certified under the EU-US Data Privacy Framework; Anthropic is bound by the EU Standard Contractual Clauses.',
};

export function noticeHtml(f = NOTICE_FACTS) {
  return `
    <h2 class="sv-notice__title">About this survey</h2>
    <ul class="sv-notice__list">
      <li>The survey ran from 3 October 2026 and closed on 31 October 2026. Each person talked with an AI interviewer, not a person. Voices were not recorded.</li>
      <li><strong>What's kept:</strong> a transcript of what each person said or typed, and notes drawn from it. Names and contact details only where people gave them.</li>
      <li><strong>Where:</strong> in an encrypted archive that only Deca can open, stored in a private repository on GitHub. The home server that ran the survey no longer holds any of it. Deca shares the answers with the Valley of the Commons core team, including but not limited to Felix, Nena and Koss.</li>
      <li><strong>Who else handled it:</strong> ElevenLabs (US) ran the voice and chat and kept a copy of each transcript for ${esc(f.elevenlabsRetentionDays)} days. ${esc(f.interviewerProvider)} generated the interviewer's replies. ${esc(f.synthesisProvider)} summarised the answers for this page. ${esc(f.transferSafeguard)}</li>
      <li><strong>What this page shows:</strong> a summary of everyone's answers, stored encrypted; it opens only with the attendees' password. A name appears only where the person said yes at the end. Project cards appear on the board only with the person's agreement. Words a person offered for publication, with their yes, may appear publicly, for example on the Valley website or in posts, with the name they chose.</li>
      <li><strong>On your device:</strong> this browser remembers that you entered the password, so the page opens directly next time. Nothing else is stored.</li>
      <li><strong>How long:</strong> kept for as long as the team uses it to plan future Valley events.</li>
      <li><strong>Your rights:</strong> you can ask Deca to see, correct or delete your answers at any time: <a href="mailto:g.decadilhac@gmail.com">g.decadilhac@gmail.com</a>. You can also complain to the data protection authority in your country.</li>
    </ul>`;
}

/** Wires every [data-privacy] link to open the notice in a dialog. */
export function wirePrivacyLinks(root = document) {
  let dialog = $('#sv-privacy');
  if (!dialog) {
    dialog = el(`<dialog id="sv-privacy" class="sv-dialog" aria-label="Privacy notice">
      <div class="sv-notice sv-notice--dialog" tabindex="-1" autofocus>${noticeHtml()}
        <form method="dialog"><button class="btn btn-dark" value="close">Close</button></form>
      </div>
    </dialog>`);
    document.body.append(dialog);
  }
  for (const a of root.querySelectorAll('[data-privacy]')) {
    a.addEventListener('click', (e) => { e.preventDefault(); dialog.showModal(); dialog.scrollTop = 0; });
  }
}

/**
 * Renders the password gate into `mount`; resolves once `unlock(password)` answers
 * { ok: true }. On { ok: false, error } the error is shown and the form stays.
 */
export function gate(mount, { title, lede, unlock }) {
  return new Promise((resolve) => {
    const form = el(`
      <form class="sv-gate sv-rise" autocomplete="off">
        <p class="eyebrow">Valley of the Commons 2026</p>
        <h1 class="sv-title">${title}</h1>
        <p class="sv-lede">${lede}</p>
        <label class="sv-field">
          <span>Password</span>
          <input name="password" type="password" required autocomplete="current-password" />
        </label>
        <p class="sv-error" role="alert" hidden></p>
        <button class="btn btn-orange" type="submit">Enter</button>
        <p class="sv-small">The password was shared in the attendees' Telegram group.</p>
      </form>`);
    mount.replaceChildren(form);
    form.password.focus();
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const error = $('.sv-error', form);
      const button = $('button', form);
      button.disabled = true;
      error.hidden = true;
      const res = await unlock(form.password.value);
      if (res.ok) return resolve();
      error.textContent = res.error;
      error.hidden = false;
      button.disabled = false;
      form.password.select();
    });
  });
}
