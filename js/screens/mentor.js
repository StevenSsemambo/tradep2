/* ═══════════════════════════════════════════
   MENTOR / CHAT SCREEN
   ═══════════════════════════════════════════ */

function renderMentor() {
  const name = STATE.user.name || 'Trader';
  const history = STATE.chatHistory;
  const dna = calculateTraderDNA ? calculateTraderDNA() : null;

  return `<div style="display:flex;flex-direction:column;height:calc(100vh - var(--total-nav));background:var(--bg)">
    <!-- Header -->
    <div style="flex-shrink:0;padding:12px 16px;border-bottom:1px solid var(--bdr2);display:flex;align-items:center;justify-content:space-between;background:var(--bg)">
      <div style="display:flex;align-items:center;gap:10px">
        <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--accent-d),var(--accent));display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">🤖</div>
        <div>
          <div style="font-family:var(--display);font-weight:800;font-size:16px">TradeMind AI</div>
          <div style="display:flex;align-items:center;gap:5px;margin-top:1px">
            <span class="live-dot"></span>
            <span style="font-size:11px;color:var(--green)">Online · Knows your full profile</span>
          </div>
        </div>
      </div>
      <button class="btn-icon" onclick="clearChat()" title="Clear chat" style="flex-shrink:0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.15"/></svg>
      </button>
    </div>

    <!-- Quick chips -->
    <div style="flex-shrink:0;display:flex;gap:6px;overflow-x:auto;padding:8px 14px 8px;border-bottom:1px solid var(--bdr2);scrollbar-width:none;-webkit-overflow-scrolling:touch">
      ${[
        'My weakness?','Best pair for me','Explain leverage','What is a pip?',
        'Position sizing','Best time to trade','RSI explained','Psychology tips',
        'My progress','Motivate me','SMC explained','London Breakout',
        'Support & resistance','Candlestick patterns','Risk management'
      ].map(q => `<div style="flex-shrink:0;background:var(--bg3);border:1px solid var(--bdr2);border-radius:20px;padding:6px 12px;font-size:11px;color:var(--txt2);cursor:pointer;white-space:nowrap;font-family:var(--display);font-weight:600;transition:all .15s" onclick="sendQuickQuestion('${q.replace(/'/g,"\'")}');this.style.color='var(--gold)';this.style.borderColor='var(--bdr)'">${q}</div>`).join('')}
    </div>

    <!-- Messages area - this MUST be flex:1 and overflow:auto -->
    <div id="chat-messages" style="flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;-webkit-overflow-scrolling:touch;overscroll-behavior:contain">
      ${history.length === 0 ? `
        <div style="align-self:flex-start;background:var(--bg3);border:1px solid var(--bdr2);border-radius:16px 16px 16px 4px;padding:12px 14px;max-width:88%;font-size:14px;line-height:1.55">
          Hey ${name}! 👋 I'm <strong style="color:var(--gold)">TradeMind AI</strong> — your personal trading coach.<br><br>
          ${dna ? `I can see you're a <strong>${dna.archetype}</strong> with ${STATE.journal.length} journal entries and ${STATE.simTrades.length} sim trades. I know everything about your performance.<br><br>` : ''}
          Ask me anything — concepts, strategy, your personal data, or tap a chip above. 🎯
        </div>
      ` : history.map(m => `<div style="max-width:88%;padding:11px 14px;border-radius:${m.role==='user'?'16px 16px 4px 16px':'16px 16px 16px 4px'};font-size:14px;line-height:1.55;align-self:${m.role==='user'?'flex-end':'flex-start'};background:${m.role==='user'?'linear-gradient(135deg,var(--gold),var(--gold-d))':'var(--bg3)'};color:${m.role==='user'?'#0A0A0F':'var(--txt)'};border:${m.role==='bot'?'1px solid var(--bdr2)':'none'}">${m.text}</div>`).join('')}
      <div id="chat-end" style="height:4px"></div>
    </div>

    <!-- Input bar - CRITICAL: flex-shrink:0 keeps it always visible -->
    <div style="flex-shrink:0;padding:10px 12px;border-top:1px solid var(--bdr2);display:flex;gap:8px;background:var(--glass);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);padding-bottom:max(10px,env(safe-area-inset-bottom,10px))">
      <input id="chat-inp" 
        style="flex:1;background:rgba(255,255,255,.05);border:1.5px solid var(--bdr2);border-radius:24px;padding:11px 16px;font-size:14px;color:var(--txt);transition:border-color .2s;outline:none;font-family:inherit"
        placeholder="Ask anything about trading..."
        onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();submitChat()}"
        onfocus="this.style.borderColor='var(--gold)'"
        onblur="this.style.borderColor='var(--bdr2)'">
      <button onclick="submitChat()" style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,var(--accent-d),var(--accent));color:#0A0A0F;display:flex;align-items:center;justify-content:center;flex-shrink:0;cursor:pointer;box-shadow:0 4px 12px var(--gold-glow);border:none;transition:transform .1s" ontouchstart="this.style.transform='scale(.88)'" ontouchend="this.style.transform='scale(1)'">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      </button>
    </div>
  </div>`;
}

function scrollChatToBottom() {
  const end = document.getElementById('chat-end');
  if (end) setTimeout(() => end.scrollIntoView({ behavior: 'smooth' }), 50);
}

function appendChatMessage(role, text) {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  const end = document.getElementById('chat-end');
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  div.innerHTML = text;
  if (end) container.insertBefore(div, end);
  else container.appendChild(div);
  scrollChatToBottom();
}

function sendQuickQuestion(q) {
  const inp = document.getElementById('chat-inp');
  if (inp) inp.value = q;
  submitChat();
}

function submitChat() {
  const inp = document.getElementById('chat-inp');
  if (!inp) return;
  const text = inp.value.trim();
  if (!text) return;
  inp.value = '';

  // Add user message
  STATE.chatHistory.push({ role: 'user', text });
  appendChatMessage('user', text);

  // Show typing indicator
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

  const delay = 400 + Math.random() * 800;
  setTimeout(() => {
    const typEl = document.getElementById(typId);
    if (typEl) typEl.remove();
    const response = generateResponse(text);
    STATE.chatHistory.push({ role: 'bot', text: response });
    appendChatMessage('bot', response);
    addXP(2);
    saveState();
  }, delay);
}

function clearChat() {
  if (confirm('Clear chat history?')) {
    STATE.chatHistory = [];
    saveState();
    navigate('mentor');
  }
}

// All responses handled in chatbot.js

/* === js/screens/profile.js === */