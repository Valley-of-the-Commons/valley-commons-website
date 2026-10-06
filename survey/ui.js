// Pieces both survey pages share: the password gate and the privacy notice.
import { signIn } from './api.js';

export const $ = (sel, root = document) => root.querySelector(sel);
export const el = (html) => {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
};
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// The facts the notice states. Each must match the live configuration
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
    <h2 class="sv-notice__title">Before you start</h2>
    <ul class="sv-notice__list">
      <li>You'll be talking with an AI interviewer, not a person.</li>
      <li><strong>What's kept:</strong> a transcript of what you say or type, and notes drawn from it. Your name and contact details only if you give them. Your voice is not recorded.</li>
      <li><strong>Where:</strong> on a small server Deca runs at home, with an encrypted backup copy kept off-site. Deca shares your answers with the Valley of the Commons core team, including but not limited to Felix, Nena and Koss.</li>
      <li><strong>Who else handles it:</strong> ElevenLabs (US) runs the voice and chat and keeps a copy of the transcript for ${esc(f.elevenlabsRetentionDays)} days. ${esc(f.interviewerProvider)} generates the interviewer's replies. ${esc(f.synthesisProvider)} summarises the answers for the results page. ${esc(f.transferSafeguard)}</li>
      <li><strong>What other attendees see:</strong> a summary of everyone's answers on the results page, behind the same password. Your name appears only if you say yes at the end. Your project cards appear on the board only if you agree.</li>
      <li><strong>On your device:</strong> this browser remembers your progress so you can come back later. Nothing else is stored.</li>
      <li><strong>How long:</strong> until after Valley of the Commons 2027. Everything, including the backup copies, is deleted by 30 September 2027.</li>
      <li><strong>Your choice:</strong> taking part is optional. You can ask Deca to see, correct or delete your answers at any time: <a href="mailto:g.decadilhac@gmail.com">g.decadilhac@gmail.com</a>. You can also complain to the data protection authority in your country.</li>
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

/** Renders the password gate into `mount`; resolves once signed in. */
export function gate(mount, { title, lede }) {
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
        <p class="sv-small">The password was shared in the attendees' Telegram group and by email.</p>
      </form>`);
    mount.replaceChildren(form);
    form.password.focus();
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const error = $('.sv-error', form);
      const button = $('button', form);
      button.disabled = true;
      error.hidden = true;
      try {
        const res = await signIn(form.password.value);
        if (res.ok) return resolve();
        error.textContent = res.data?.error || 'Something went wrong. Try again.';
      } catch {
        error.textContent = 'The survey server cannot be reached right now. Try again in a minute.';
      }
      error.hidden = false;
      button.disabled = false;
      form.password.select();
    });
  });
}
