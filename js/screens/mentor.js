/* ═══════════════════════════════════════════
   MENTOR SCREEN — Smart AI Chat
   Uses generateFloatResponse() (the smart path)
   which chains to generateEnhancedResponse()
   then generateResponse() as fallback
   ═══════════════════════════════════════════ */

/* ── MENTOR SCREEN TTS STATE ─────────────────────────────────── */
let _mentorTtsEnabled = false;

function toggleMentorTTS(btn) {
  _mentorTtsEnabled = !_mentorTtsEnabled;
  if (!btn) btn = document.getElementById('mentor-tts-btn');
  if (!btn) return;
  if (_mentorTtsEnabled) {
    btn.style.color = 'var(--accent)';
    btn.style.borderColor = 'var(--accent)';
    btn.style.background = 'rgba(0,212,184,0.1)';
    btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg> On`;
  } else {
    btn.style.color = 'var(--txt2)';
    btn.style.borderColor = 'var(--bdr2)';
    btn.style.background = 'var(--bg3)';
    btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg> Read`;
    if (window.speechSynthesis) { speechSynthesis.cancel(); if (typeof _ttsResetBtns === 'function') _ttsResetBtns(); }
  }
}

function renderMentor() {
  const name = STATE.user.name || 'Trader';
  const history = STATE.chatHistory || [];
  const dna = (typeof calculateTraderDNA === 'function') ? calculateTraderDNA() : null;
  const allTrades = [...(STATE.journal||[]), ...(STATE.simTrades||[])];
  const wr = allTrades.length > 0
    ? Math.round(allTrades.filter(t=>parseFloat(t.pnl)>0).length / allTrades.length * 100) : 0;

  // Build personalised welcome based on data
  const welcomeLines = [];
  if (dna) welcomeLines.push(`I can see you are a <strong style="color:var(--accent)">${dna.archetype}</strong>.`);
  if (allTrades.length > 0) welcomeLines.push(`${allTrades.length} trades logged · ${wr}% win rate.`);
  if ((STATE.dailyStreak||0) > 0) welcomeLines.push(`${STATE.dailyStreak}-day streak 🔥`);
  const welcomeDetail = welcomeLines.length > 0
    ? welcomeLines.join(' ') + '<br><br>'
    : '';

  return `<div style="display:flex;flex-direction:column;height:calc(100vh - var(--total-nav));background:var(--bg)">

    <!-- Header -->
    <div style="flex-shrink:0;padding:12px 16px;border-bottom:1px solid var(--bdr2);display:flex;align-items:center;justify-content:space-between;background:var(--bg2)">
      <div style="display:flex;align-items:center;gap:10px">
        <div style="width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,var(--accent-d),var(--accent));display:flex;align-items:center;justify-content:center;font-size:21px;flex-shrink:0;box-shadow:0 0 14px var(--accent-glow)">🤖</div>
        <div>
          <div style="font-family:var(--display);font-weight:800;font-size:16px">TradeMind AI</div>
          <div style="display:flex;align-items:center;gap:5px;margin-top:1px">
            <span class="live-dot"></span>
            <span style="font-size:11px;color:var(--accent)">Knows your full profile · Personalised answers</span>
          </div>
        </div>
      </div>
      <div style="display:flex;gap:6px">
        <button id="mentor-tts-btn" onclick="toggleMentorTTS(this)"
          style="background:var(--bg3);border:1px solid var(--bdr2);border-radius:20px;padding:5px 10px;display:flex;align-items:center;gap:5px;cursor:pointer;color:var(--txt2);font-size:11px;font-family:var(--display);font-weight:600;transition:all .2s"
          title="Read replies aloud">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
          Read
        </button>
        <button class="btn-icon" onclick="clearChat()" title="Clear chat">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.15"/></svg>
        </button>
      </div>
    </div>

    <!-- Quick chips -->
    <div style="flex-shrink:0;display:flex;gap:6px;overflow-x:auto;padding:8px 14px;border-bottom:1px solid var(--bdr2);scrollbar-width:none;-webkit-overflow-scrolling:touch">
      ${[
        'Analyse my patterns', 'Quiz me', 'My study plan',
        'My weakness?', 'Best pair for me', 'Should I trade today?',
        'My win rate', 'Best setup for me', 'Review my last trade',
        'What is RSI?', 'SMC explained', 'Teach me Fibonacci simply',
        'My progress', 'I am frustrated', 'Risk management',
        'Best day to trade', 'Worst pair to avoid'
      ].map(q => `<div
        style="flex-shrink:0;background:var(--bg3);border:1px solid var(--bdr2);border-radius:20px;padding:6px 13px;font-size:11px;color:var(--txt2);cursor:pointer;white-space:nowrap;font-family:var(--display);font-weight:600;transition:all .2s;-webkit-tap-highlight-color:transparent"
        onclick="sendQuickQuestion('${q.replace(/'/g, "\\'")}');this.style.color='var(--accent)';this.style.borderColor='var(--accent)'"
      >${q}</div>`).join('')}
    </div>

    <!-- Messages -->
    <div id="chat-messages" style="flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;-webkit-overflow-scrolling:touch;overscroll-behavior:contain">
      ${history.length === 0 ? `
        <div class="chat-msg bot">
          ${typeof getProactiveAlert === 'function' && getProactiveAlert() ? `<div style="margin-bottom:10px;padding:8px;background:rgba(239,68,68,0.1);border-radius:8px;font-size:13px">${getProactiveAlert()}</div>` : ''}
          Hey ${name}! 👋 I am <strong style="color:var(--accent)">TradeMind AI</strong> — your intelligent trading coach.<br><br>
          ${welcomeDetail}
          I know your trading history, DNA profile, and every lesson in the academy. Ask me anything about your performance, forex concepts, or strategies — or tap a chip above. 🎯
        </div>
      ` : history.map(m => `
        <div class="chat-msg ${m.role}">${m.text}</div>
      `).join('')}
      <div id="chat-end" style="height:4px;flex-shrink:0"></div>
    </div>

    <!-- Input bar -->
    <div style="flex-shrink:0;padding:10px 12px;padding-bottom:max(10px,env(safe-area-inset-bottom,10px));border-top:1px solid var(--bdr2);display:flex;gap:8px;align-items:center;background:var(--glass);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)">
      <input id="chat-inp"
        style="flex:1;background:var(--bg3);border:1.5px solid var(--bdr2);border-radius:24px;padding:11px 16px;font-size:14px;color:var(--txt);transition:border-color .2s;outline:none;font-family:inherit"
        placeholder="Ask me anything about your trading..."
        onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();submitChat()}"
        onfocus="this.style.borderColor='var(--accent)'"
        onblur="this.style.borderColor='var(--bdr2)'">
      <button onclick="submitChat()"
        style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,var(--accent-d),var(--accent));color:#080E14;display:flex;align-items:center;justify-content:center;flex-shrink:0;cursor:pointer;box-shadow:0 4px 14px var(--accent-glow);border:none;transition:transform .15s"
        ontouchstart="this.style.transform='scale(.88)'"
        ontouchend="this.style.transform='scale(1)'">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="22" y1="2" x2="11" y2="13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </button>
    </div>
  </div>`;
}

function scrollChatToBottom() {
  const el = document.getElementById('chat-end');
  if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'end' }), 80);
}

function appendChatMessage(role, text) {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  const end = document.getElementById('chat-end');

  const wrap = document.createElement('div');
  wrap.style.cssText = `display:flex;flex-direction:column;align-items:${role==='bot'?'flex-start':'flex-end'};gap:2px`;

  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  div.innerHTML = text;
  div.style.animation = 'fadeUp .25s ease both';
  wrap.appendChild(div);

  // Speak button on every bot reply
  if (role === 'bot' && typeof _ttsMakeBtn === 'function') {
    const speakBtn = _ttsMakeBtn(text, 'margin-left:2px;');
    wrap.appendChild(speakBtn);
    // Auto-speak if mentor TTS is active
    if (_mentorTtsEnabled && typeof ttsSpeak === 'function') ttsSpeak(text, speakBtn);
  }

  if (end) container.insertBefore(wrap, end);
  else container.appendChild(wrap);
  scrollChatToBottom();
}

function sendQuickQuestion(q) {
  const inp = document.getElementById('chat-inp');
  if (inp) { inp.value = q; inp.focus(); }
  submitChat();
}

function submitChat() {
  const inp = document.getElementById('chat-inp');
  if (!inp) return;
  const text = inp.value.trim();
  if (!text) return;
  inp.value = '';
  inp.style.borderColor = 'var(--bdr2)';

  // Save and display user message
  if (!STATE.chatHistory) STATE.chatHistory = [];
  STATE.chatHistory.push({ role: 'user', text });
  appendChatMessage('user', text);

  // Typing indicator
  const typId = 'typing-' + Date.now();
  const container = document.getElementById('chat-messages');
  const end = document.getElementById('chat-end');
  if (container) {
    const typDiv = document.createElement('div');
    typDiv.id = typId;
    typDiv.className = 'chat-msg bot';
    typDiv.innerHTML = '<div class="chat-typing"><span></span><span></span><span></span></div>';
    if (end) container.insertBefore(typDiv, end);
    else container.appendChild(typDiv);
    scrollChatToBottom();
  }

  // Realistic delay (400-1200ms based on question length)
  const delay = Math.min(400 + text.length * 10, 1200);

  setTimeout(() => {
    const typEl = document.getElementById(typId);
    if (typEl) typEl.remove();

    // ── SMART AI ROUTING — uses ai_brain.js generateSmartResponse ──
    // Priority: Pattern Detection → Quiz → Level-aware teaching → Float → Enhanced → Base
    let response = '';
    try {
      if (typeof generateSmartResponse === 'function') {
        response = generateSmartResponse(text);
      } else if (typeof generateFloatResponse === 'function') {
        response = generateFloatResponse(text);
      } else if (typeof generateResponse === 'function') {
        response = generateResponse(text);
      }
    } catch(e) {
      console.warn('AI error:', e);
      response = typeof generateResponse === 'function'
        ? generateResponse(text)
        : 'I had trouble processing that. Could you rephrase your question?';
    }

    if (!response || response === 'undefined') {
      response = typeof generateResponse === 'function'
        ? generateResponse(text)
        : 'Ask me anything about your trading, patterns, or anything forex!';
    }

    STATE.chatHistory.push({ role: 'bot', text: response });
    appendChatMessage('bot', response);
    addXP(2);
    saveState();

    // Trim history to last 40 messages to prevent memory bloat
    if (STATE.chatHistory.length > 40) {
      STATE.chatHistory = STATE.chatHistory.slice(-40);
    }
  }, delay);
}

function clearChat() {
  if (confirm('Clear chat history?')) {
    STATE.chatHistory = [];
    saveState();
    navigate('mentor');
  }
}
