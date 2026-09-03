// Server route for game chat.
//
// Talks to an OpenAI-compatible LLM gateway using
// its OpenAI-compatible API. There is deliberately no Vercel AI Gateway and no
// `ai` SDK in the request path: the previous implementation required a paid
// AI_GATEWAY_API_KEY (vck_...) that was never provisioned in this project, so
// this endpoint answered "Server configuration error" for its entire life.

const fs = require('fs');
const path = require('path');
const { clientIp, createRateLimiter } = require('./rate-limit');

// Per-IP throttle. Each POST bills an upstream LLM completion, and the 12-turn
// cap is computed from the client-supplied `messages` array (trivially reset by
// sending a fresh 1-message array), so it does not bound spend. A real per-IP
// window does. 40 requests / 5 min comfortably covers a genuine 12-turn session
// plus a retry or two.
const chatLimiter = createRateLimiter({ windowMs: 5 * 60 * 1000, max: 40 });

// LiteLLM speaks the OpenAI chat-completions protocol, so any OpenAI-compatible
// gateway works here. The key is read from a root-owned file mounted read-only
// rather than an env var, so the value never lands in an .env or a compose
// variable. Set LITELLM_API_KEY instead if you prefer env-based config.
const LITELLM_BASE_URL = process.env.LITELLM_BASE_URL || 'http://litellm:4000/v1';
const LITELLM_KEY_FILE = process.env.LITELLM_API_KEY_FILE || '/run/secrets/litellm-key';

function litellmKey() {
  if (process.env.LITELLM_API_KEY) return process.env.LITELLM_API_KEY.trim();
  try {
    return fs.readFileSync(LITELLM_KEY_FILE, 'utf8').trim();
  } catch (err) {
    return '';
  }
}

// Load internal thoughts for context
function loadInternalThoughts() {
  try {
    const thoughtsPath = path.join(process.cwd(), 'internal_thought.md');
    if (fs.existsSync(thoughtsPath)) {
      return fs.readFileSync(thoughtsPath, 'utf8');
    }
  } catch (error) {
    console.warn('Could not load internal_thought.md:', error.message);
  }
  return '';
}

const INTERNAL_THOUGHTS = loadInternalThoughts();

// Base system prompt for ongoing Socratic dialogue
const SYSTEM_PROMPT = `You are a Socratic game master moderator at the Valley of the Commons.

ROLE:
- Ask ONE brief, open-ended question (1-2 sentences MAX)
- NEVER provide answers, definitions, or solutions
- If asked for a definition, respond with a question about meaning or context
- Build on previous exchanges
- Keep responses SHORT and terminal-friendly

CONTEXT: "Valley of the Commons" is a decade-long game becoming a real village. Participants can propose tools, add rules, name places, create quests, document paths, bind myth to reality.

DESIGN PRINCIPLES (reference subtly, never lecture):
- Game as instrument for generating new operations
- Physical-digital bridge: map, cards, projections
- Community-driven: people mark places, add quests, surface tools
- Ritualistic elements: mix of mythology and real life
- Out of the box thinking: generate unconventional approaches
- Commonalization: game becomes shared resource

${INTERNAL_THOUGHTS ? `\nINTERNAL NOTES (inform questions, help participants discover):\n${INTERNAL_THOUGHTS}\n` : ''}

CRITICAL: Be BRIEF. One question per response. Maximum 2 sentences. Probe, don't lecture.`;

// Context-setting prompt for first response
const FIRST_RESPONSE_PROMPT = `You are a game master moderator welcoming someone to the Valley of the Commons.

This is the FIRST response after the user agreed to help create a game that shapes reality.

TASK:
- Brief context-setting (2-3 sentences) introducing the Valley
- Use internal notes to paint what this game-village is becoming
- End with ONE open-ended question inviting exploration
- Do NOT respond to "yes" or "sure" - set context instead

CONTEXT: "Valley of the Commons" is a decade-long game becoming a real village in the Austrian Alps. Participants can propose tools, add rules, name places, create quests, document paths, bind myth to reality.

${INTERNAL_THOUGHTS ? `\nINTERNAL NOTES (inform context and question):\n${INTERNAL_THOUGHTS}\n` : ''}

CRITICAL: Be BRIEF. Maximum 3-4 sentences total. One question at the end.`;

module.exports = async function handler(req, res) {
  console.log('[game-chat] Request received:', req.method, req.url);
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log('[game-chat] Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // No CORS headers needed (same-origin only)
  // If cross-origin needed later, restrict to specific domains

  // Throttle before doing any paid upstream work.
  if (chatLimiter(clientIp(req))) {
    return res.status(429).json({ error: 'Too many requests. Please slow down and try again shortly.' });
  }

  try {
    const { messages } = req.body;
    console.log('[game-chat] Messages received:', messages?.length || 0);
    if (messages && messages.length > 0) {
      console.log('[game-chat] First message:', {
        role: messages[0]?.role,
        content: messages[0]?.content?.substring(0, 100),
      });
      if (messages.length > 1) {
        console.log('[game-chat] Last message:', {
          role: messages[messages.length - 1]?.role,
          content: messages[messages.length - 1]?.content?.substring(0, 100),
        });
      }
    }

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request format' });
    }

    // Sanitize and whitelist roles (CRITICAL: prevent system injection)
    const sanitizedMessages = messages
      .filter(msg => msg && typeof msg.content === 'string')
      .map(msg => {
        // Whitelist: only 'user' or 'assistant' roles allowed
        const role = msg.role === 'assistant' ? 'assistant' : 'user';
        return {
          role: role,
          content: msg.content.slice(0, 500), // Max 500 chars per message
        };
      })
      .filter(msg => msg.content.length > 0); // Drop empty messages
    
    console.log('[game-chat] Sanitized messages:', sanitizedMessages.length);
    if (sanitizedMessages.length > 0) {
      console.log('[game-chat] Sanitized first message:', {
        role: sanitizedMessages[0]?.role,
        content: sanitizedMessages[0]?.content?.substring(0, 100),
      });
    }

    // Count user turns server-side (prevent gaming)
    const userTurns = sanitizedMessages.filter(m => m.role === 'user').length;
    if (userTurns > 12) {
      return res.status(429).json({ 
        error: 'Conversation limit reached. Please start a new session.' 
      });
    }

    // Detect if this is the first user response (context-setting phase)
    const isFirstResponse = userTurns === 1 && sanitizedMessages.length === 1;

    const apiKey = litellmKey();
    if (!apiKey) {
      console.error('[game-chat] No LiteLLM key: set LITELLM_API_KEY or mount ' + LITELLM_KEY_FILE);
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Cloud-backed alias by default, on purpose. A self-hosted alias that is not
    // reliably reachable costs a 30-second hang per request rather than a clean
    // error, so only point GAME_MODEL at one once that link is dependable. Any
    // alias in the gateway's model_list works.
    //
    // NOT gemini-2.5-flash: it reasons before answering and bills that to the
    // same budget, so at max_tokens 120 it spent 114 tokens thinking and
    // returned two words with finish_reason "length". Measured, not guessed.
    // Any model chosen here must be non-reasoning, or these caps need raising.
    const modelName = process.env.GAME_MODEL || 'claude-haiku';

    console.log('[game-chat] Calling LiteLLM:', modelName, 'messages:', sanitizedMessages.length);

    // Choose prompt based on whether this is the first response
    const activePrompt = isFirstResponse ? FIRST_RESPONSE_PROMPT : SYSTEM_PROMPT;

    const upstream = await fetch(`${LITELLM_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: modelName,
        // The system prompt is prepended here rather than passed separately.
        // sanitizedMessages has already had its roles whitelisted to
        // user/assistant, so nothing from the client can forge a system turn.
        messages: [{ role: 'system', content: activePrompt }, ...sanitizedMessages],
        max_tokens: isFirstResponse ? 120 : 80,
        temperature: 0.7,
        stream: true,
      }),
    });

    if (!upstream.ok || !upstream.body) {
      const detail = await upstream.text().catch(() => '');
      throw new Error(`LiteLLM ${upstream.status}: ${detail.slice(0, 300)}`);
    }

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Transfer-Encoding', 'chunked');

    // Parse the SSE frames LiteLLM sends and forward only the text deltas, so
    // the browser contract stays exactly what it was under the old SDK: a plain
    // chunked text/plain body.
    let buffer = '';
    for await (const chunk of upstream.body) {
      buffer += Buffer.from(chunk).toString('utf8');
      let nl;
      while ((nl = buffer.indexOf('\n')) !== -1) {
        const line = buffer.slice(0, nl).trim();
        buffer = buffer.slice(nl + 1);
        if (!line.startsWith('data:')) continue; // comments / keep-alives
        const payload = line.slice(5).trim();
        if (payload === '[DONE]') {
          res.end();
          console.log('[game-chat] Stream completed');
          return;
        }
        try {
          const delta = JSON.parse(payload).choices?.[0]?.delta?.content;
          if (delta) res.write(delta);
        } catch (parseError) {
          // A frame split across chunk boundaries; the remainder arrives next.
        }
      }
    }
    res.end();
    console.log('[game-chat] Stream completed (no [DONE] sentinel)');

  } catch (error) {
    // modelName/apiKey are block-scoped inside the try, so they are deliberately
    // NOT referenced here -- doing so threw a ReferenceError from inside the
    // error handler and masked every real failure with a stack about the
    // handler itself.
    console.error('[game-chat] error:', { message: error.message, stack: error.stack });

    const isDev = process.env.NODE_ENV !== 'production';
    if (res.headersSent) {
      return res.end();
    }
    return res.status(500).json({
      error: isDev
        ? `game-chat error: ${error.message}`
        : 'AI service temporarily unavailable. Please try again.',
      ...(isDev && { details: error.stack }),
    });
  }
};

