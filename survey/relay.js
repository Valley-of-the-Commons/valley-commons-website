// Text conversations over plain HTTPS. The Pi API holds the ElevenLabs WebSocket
// (some networks and security software block the browser's own connection to
// elevenlabs.io); this class mirrors the part of the SDK's Conversation that
// survey.js uses: startSession, sendUserMessage, sendContextualUpdate, endSession.
import { reportClientError, request as apiRequest } from './api.js';

export const OPEN_RETRY_MS = 5000;
export const OPEN_ATTEMPTS = 24;
export const POLL_RETRY_MS = 2000;
export const POLL_FAILURES_MAX = 10;

// Resolves after ms, or early when the signal aborts.
const sleepMs = (ms, signal) => new Promise((resolve) => {
  const timer = setTimeout(resolve, ms);
  signal?.addEventListener('abort', () => { clearTimeout(timer); resolve(); }, { once: true });
});
const namedError = (name, message) => Object.assign(new Error(message), { name });

export class RelayConversation {
  /**
   * `deps` is for tests: a fake request, sleep and error reporter.
   * Resolves once the relay is open; events then arrive through the callbacks.
   * `signal` (an AbortSignal) stops the open retries: startSession then throws
   * RelayAborted, and closes the relay if it had just opened.
   */
  static async startSession({ sessionId, clientTools = {}, onConnect, onMessage, onDisconnect, onStatusChange, onWaiting, signal }, deps = {}) {
    const request = deps.request ?? apiRequest;
    const sleep = deps.sleep ?? ((ms) => sleepMs(ms, signal));
    const aborted = () => namedError('RelayAborted', 'The connection was cancelled.');
    const report = deps.reportError ?? reportClientError;

    let opened;
    for (let attempt = 1; !opened; attempt++) {
      if (signal?.aborted) throw aborted();
      const res = await request(`/sessions/${sessionId}/relay/open`, { method: 'POST' });
      if (signal?.aborted) {
        if (res.ok) await request(`/sessions/${sessionId}/relay/close`, { method: 'POST' }).catch(() => {});
        throw aborted();
      }
      if (res.ok) opened = res.data;
      else if (res.status === 503 && res.data?.retryable) {
        if (attempt >= OPEN_ATTEMPTS) throw namedError('RelayBusy', 'The interviewer is busy right now.');
        onWaiting?.(attempt);
        await sleep(OPEN_RETRY_MS);
      } else throw namedError('RelayOpenFailed', `The relay could not open (${res.status}).`);
    }

    const conversation = new RelayConversation({ sessionId, conversationId: opened.conversation_id, clientTools, onMessage, onDisconnect, request, sleep, report });
    onConnect?.({ conversationId: opened.conversation_id });
    onStatusChange?.({ status: 'connected' });
    conversation.finished = conversation.#poll();
    return conversation;
  }

  #sessionId; #conversationId; #clientTools; #onMessage; #onDisconnect; #request; #sleep; #report;
  #ended = false;
  #sendFailureReported = false;
  #callbackFailureReported = false;

  constructor({ sessionId, conversationId, clientTools, onMessage, onDisconnect, request, sleep, report }) {
    this.#sessionId = sessionId;
    this.#conversationId = conversationId;
    this.#clientTools = clientTools;
    this.#onMessage = onMessage;
    this.#onDisconnect = onDisconnect;
    this.#request = request;
    this.#sleep = sleep;
    this.#report = report;
  }

  getId() { return this.#conversationId; }

  sendUserMessage(text) { return this.#send({ kind: 'user_message', text }); }

  sendContextualUpdate(text) { return this.#send({ kind: 'contextual_update', text }); }

  /** The end event follows through the poll, which then calls onDisconnect. */
  async endSession() {
    try { await this.#request(`/sessions/${this.#sessionId}/relay/close`, { method: 'POST' }); } catch { /* the poll reports a lost relay */ }
  }

  async #send(body) {
    try {
      const res = await this.#request(`/sessions/${this.#sessionId}/relay/send`, { method: 'POST', body });
      if (!res.ok) throw namedError('RelaySendFailed', `relay send failed (${res.status})`);
    } catch (err) {
      if (this.#sendFailureReported) return;
      this.#sendFailureReported = true;
      this.#report('disconnect', err, this.#sessionId);
    }
  }

  #end(details) {
    if (this.#ended) return;
    this.#ended = true;
    this.#guard(this.#onDisconnect, details);
  }

  // A throwing page callback must not stop the poll loop; report it once.
  #guard(callback, ...args) {
    try {
      callback?.(...args);
    } catch (err) {
      if (this.#callbackFailureReported) return;
      this.#callbackFailureReported = true;
      this.#report('disconnect', err, this.#sessionId);
    }
  }

  async #poll() {
    let after = 0;
    let failures = 0;
    while (!this.#ended) {
      let res;
      try {
        res = await this.#request(`/sessions/${this.#sessionId}/relay/events?after=${after}`);
      } catch { res = null; }
      if (!res?.ok) {
        if (++failures >= POLL_FAILURES_MAX) return this.#end({ reason: 'error', message: 'relay lost' });
        await this.#sleep(POLL_RETRY_MS);
        continue;
      }
      failures = 0;
      for (const event of res.data?.events ?? []) {
        after = event.seq;
        if (event.type === 'end') return this.#end({ reason: event.reason, message: event.message });
        if (event.type === 'message') this.#guard(this.#onMessage, { source: 'ai', role: 'agent', message: event.text });
        else if (event.type === 'tool_call') await this.#runTool(event);
      }
      if (res.data?.closed && !(res.data.events?.length)) return this.#end({ reason: 'error', message: 'relay closed' });
    }
  }

  async #runTool({ tool_call_id, tool_name, parameters }) {
    const tool = this.#clientTools[tool_name];
    let result;
    let isError = false;
    if (!tool) {
      result = `Unknown tool: ${tool_name}`;
      isError = true;
    } else {
      try {
        const value = await tool(parameters ?? {});
        result = typeof value === 'string' ? value : value === undefined ? '' : JSON.stringify(value);
      } catch (err) {
        result = String(err?.message ?? err);
        isError = true;
        this.#guard(() => { throw err; });
      }
    }
    await this.#send({ kind: 'tool_result', tool_call_id, result, is_error: isError });
  }
}
