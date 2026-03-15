/* ═══════════════════════════════════════════════════════════════
   TRADEBABY PRO v10 — AI CHATBOT ENGINE
   ─────────────────────────────────────────────────────────────
   Upgrade: Conversation memory (last 3 turns context)
            Real trade review (reads STATE.journal last entry)
            Context-aware follow-up detection
            Smarter intent routing
   ═══════════════════════════════════════════════════════════════ */

/* ── CONVERSATION MEMORY ──────────────────────────────────────
   Stores last 3 user messages so the AI can detect follow-ups
   e.g. "What is RSI?" → "How do I use it?" → knows what "it" is
   ──────────────────────────────────────────────────────────── */
const _conversationMemory = {
  _turns: [],   // { userMsg, topic, botReplyStart }
  MAX: 3,

  add(userMsg, topic, botReplyStart) {
    this._turns.push({ userMsg: userMsg.toLowerCase(), topic, botReplyStart });
    if (this._turns.length > this.MAX) this._turns.shift();
  },

  lastTopic() {
    return this._turns.length ? this._turns[this._turns.length - 1].topic : null;
  },

  lastUserMsg() {
    return this._turns.length ? this._turns[this._turns.length - 1].userMsg : '';
  },

  // Was the previous topic X? Lets us detect "how do I use it?" after "what is RSI?"
  prevTopic() {
    return this._turns.length >= 2 ? this._turns[this._turns.length - 2].topic : null;
  },

  // Detects ambiguous follow-ups like "show me more", "how do I use it", "give me an example"
  isFollowUp(q) {
    const followUpPhrases = [
      'more detail', 'more about', 'tell me more', 'go deeper', 'elaborate',
      'how do i use it', 'how to use it', 'give me an example', 'example please',
      'show me', 'what does that mean', 'i dont understand', "don't understand",
      'can you explain', 'what about', 'and what', 'ok but', 'yeah but',
      'so how', 'so what', 'then what', 'why is that', 'how so'
    ];
    return followUpPhrases.some(p => q.includes(p)) && q.length < 60;
  }
};

/* ── HELPER: pull real STATE data ─────────────────────────────── */
function _getStateContext() {
  const name     = (STATE?.user?.name)     || 'Trader';
  const lvl      = (STATE?.user?.level)    || 1;
  const xp       = (STATE?.user?.xp)       || 0;
  const xpNext   = (STATE?.user?.xpNext)   || 500;
  const streak   = (STATE?.dailyStreak)    || 0;
  const journal  = (STATE?.journal)        || [];
  const simT     = (STATE?.simTrades)      || [];
  const allT     = [...journal, ...simT];
  const progress = (STATE?.progress)       || {};
  const completed = Object.keys(progress).length;
  const simEq    = (STATE?.simEquity)      || 10000;
  const simBal   = (STATE?.simBalance)     || 10000;
  const wins     = allT.filter(t => parseFloat(t.pnl) > 0).length;
  const losses   = allT.length - wins;
  const wr       = allT.length > 0 ? Math.round(wins / allT.length * 100) : 0;
  const totalPnl = allT.reduce((a, t) => a + (parseFloat(t.pnl) || 0), 0);
  const avgW     = wins   > 0 ? allT.filter(t=>parseFloat(t.pnl)>0).reduce((a,t)=>a+(parseFloat(t.pnl)||0),0)/wins : 0;
  const avgL     = losses > 0 ? Math.abs(allT.filter(t=>parseFloat(t.pnl)<=0).reduce((a,t)=>a+(parseFloat(t.pnl)||0),0)/losses) : 0;
  const pf       = avgL > 0 ? (avgW * wins / (avgL * losses)).toFixed(2) : (wins > 0 ? '∞' : '0');
  const totalL   = (typeof totalLessons === 'function') ? totalLessons() : 38;
  const lastTrade = journal.length > 0 ? journal[journal.length - 1] : null;
  const lastSimTrade = simT.length > 0 ? simT[simT.length - 1] : null;

  return {
    name, lvl, xp, xpNext, streak, journal, simT, allT, progress,
    completed, totalL, simEq, simBal, wins, losses, wr, totalPnl,
    avgW, avgL, pf, lastTrade, lastSimTrade
  };
}

/* ═══════════════════════════════════════════════════════════════
   MAIN ENTRY POINT
   ═══════════════════════════════════════════════════════════════ */
function generateResponse(input) {
  const raw = input.trim();
  const q   = raw.toLowerCase();
  const ctx = _getStateContext();
  const { name, lvl, completed, streak, allT, wr, totalPnl,
          avgW, avgL, pf, simBal, simEq, totalL, journal,
          lastTrade, lastSimTrade, wins, losses } = ctx;

  // ── FOLLOW-UP CONTEXT RESOLUTION ─────────────────────────
  // If it's an ambiguous follow-up, re-route to previous topic
  if (_conversationMemory.isFollowUp(q)) {
    const topic = _conversationMemory.lastTopic();
    if (topic) {
      const resolved = _resolveFollowUp(q, topic, ctx);
      if (resolved) {
        _conversationMemory.add(q, topic, resolved.substring(0, 40));
        return resolved;
      }
    }
  }

  // ── REAL TRADE REVIEW ─────────────────────────────────────
  // "review my last trade" / "how did I do" / "check my last trade"
  if (q.match(/review.*last|last.*trade.*review|how did i do|check.*my.*trade|my last trade|analyse.*trade|analyze.*trade/)) {
    const trade = lastTrade || lastSimTrade;
    if (!trade) {
      _conversationMemory.add(q, 'trade_review', 'No trades');
      return `${name}, you have no trades logged yet. Make some sim trades in the Trade terminal or log real trades in the Journal tab — then I can give you specific, detailed feedback on each one.`;
    }
    const pnl   = parseFloat(trade.pnl) || 0;
    const rr    = (trade.sl && trade.tp && trade.entry)
      ? (() => {
          const slDist = Math.abs(parseFloat(trade.entry) - parseFloat(trade.sl));
          const tpDist = Math.abs(parseFloat(trade.tp)    - parseFloat(trade.entry));
          return slDist > 0 ? (tpDist / slDist).toFixed(1) : '?';
        })()
      : '?';
    const outcome = pnl > 0 ? 'WIN 🟢' : pnl < 0 ? 'LOSS 🔴' : 'BREAKEVEN ⚪';
    const moodRisk = trade.mood && ['revenge','frustrated','greedy'].includes(trade.mood);
    const planBroken = trade.plan === 'no';
    const issues = [];
    if (moodRisk)   issues.push(`⚠️ <strong>Emotional state:</strong> You entered while feeling <em>${trade.mood}</em> — one of the highest-risk mental states. Emotional trades are statistically worse.`);
    if (planBroken) issues.push(`⚠️ <strong>Plan deviation:</strong> You marked this trade as not following your plan. This is your most important thing to fix.`);
    if (rr !== '?' && parseFloat(rr) < 1.5) issues.push(`⚠️ <strong>R:R ratio ${rr}:1</strong> is below the recommended 1.5:1 minimum. Only take trades with better setup or tighter stop.`);
    if (pnl < 0 && trade.notes && trade.notes.length < 20) issues.push(`💡 Your notes on this trade are very brief. A detailed post-mortem would help you learn from it.`);

    const reply = `<strong>Trade Review — ${trade.pair || 'Unknown'} ${trade.direction || ''}</strong><br><br>
📊 Outcome: <strong style="color:${pnl>0?'var(--accent)':'var(--red)'}">${outcome}</strong> — <span style="color:${pnl>=0?'var(--accent)':'var(--red)'}">${pnl>=0?'+':''}$${Math.abs(pnl).toFixed(2)}</span><br>
${trade.entry ? `📍 Entry: <strong>${trade.entry}</strong>` : ''}${trade.sl ? ` · SL: <strong style="color:var(--red)">${trade.sl}</strong>` : ''}${trade.tp ? ` · TP: <strong style="color:var(--accent)">${trade.tp}</strong>` : ''}<br>
${rr !== '?' ? `⚖️ R:R: <strong>${rr}:1</strong>` : ''}${trade.setup ? ` · Setup: <strong>${trade.setup}</strong>` : ''}${trade.tf ? ` · TF: ${trade.tf}` : ''}<br>
${trade.mood ? `😊 Mood: ${trade.mood}` : ''}${trade.plan ? ` · Followed plan: <strong>${trade.plan}</strong>` : ''}<br>
${trade.notes ? `<br>📝 <em>"${trade.notes.substring(0, 120)}${trade.notes.length > 120 ? '…' : ''}"</em>` : ''}<br>
${issues.length > 0 ? `<br><strong>Issues found:</strong><br>${issues.join('<br>')}` : `<br>✅ <strong>No major issues detected.</strong> ${pnl > 0 ? 'Good trade! Focus on consistency.' : 'Loss is part of the process — did you follow your rules?'}`}<br>
<br><em>For deep analysis of all your trades, go to <strong>Journal → Stats</strong>.</em>`;

    _conversationMemory.add(q, 'trade_review', reply.substring(0, 40));
    return reply;
  }

  // ── EMOTIONAL SUPPORT ─────────────────────────────────────
  const stressWords = ['stressed','frustrated','anxious','scared','worried','depressed',
    'struggling','losing','failing','hopeless','angry','upset','bad trade',
    'blew','blown','wiped','lost everything','giving up','hate trading','cant do this'];
  if (stressWords.some(w => q.includes(w))) {
    const reply = `${name}, what you are feeling is completely valid. Trading is one of the most psychologically demanding skills in the world — most professionals won't admit how hard their early years were.<br><br>
<strong>Here is what actually matters right now:</strong><br>
• Every trader you admire has been exactly where you are<br>
• Jesse Livermore lost everything four times and rebuilt<br>
• <strong>Stop trading today if you are emotional</strong> — emotional trades are statistical losses<br>
• The market will be here tomorrow; your capital and mental health matter more<br><br>
${allT.length > 0 ? `You have ${allT.length} trades logged and a ${streak}-day streak. You are building real data. ` : ''}Review your journal: is this a <em>system problem</em> (bad strategy) or an <em>execution problem</em> (breaking your own rules)? Those need completely different solutions.<br><br>
Tell me specifically what happened and I will give you targeted, concrete help. 💪`;
    _conversationMemory.add(q, 'emotional_support', reply.substring(0, 40));
    return reply;
  }

  // ── MOTIVATION ─────────────────────────────────────────────
  if (q.match(/motivat|give up|cant do|quit|worth it|feel like stopping|no hope|is this worth/)) {
    const reply = `Do not quit, ${name}. Here is the truth most trading courses won't tell you:<br><br>
<strong>Typical profitable trader timeline:</strong><br>
• Months 1-3: Excited but losing (completely normal)<br>
• Months 4-8: Frustrated, questioning everything (<em>most people quit here</em>)<br>
• Months 9-18: Starting to break even consistently<br>
• Month 18+: Consistent profitability begins<br><br>
You are Level ${lvl} · ${completed} lessons done · ${streak}-day streak · ${allT.length} trades logged.<br>
That data does not lie. Consistency in learning IS the skill being built. The people who push through months 4-8 are the ones who eventually make it.<br><br>
<strong>One rule:</strong> Never quit after a loss. Take a break, review the trade, then decide. The market rewards those who stay. 🏆`;
    _conversationMemory.add(q, 'motivation', reply.substring(0, 40));
    return reply;
  }

  // ── PROGRESS / MY STATS ────────────────────────────────────
  if (q.match(/my progress|how am i|my stats|my level|how far|show my|my data|my numbers/)) {
    const reply = `<strong>Your complete snapshot, ${name}:</strong><br><br>
⭐ <strong>Level ${lvl}</strong> — ${ctx.xp}/${ctx.xpNext} XP<br>
📚 <strong>${completed}/${totalL} lessons</strong> complete (${Math.round(completed/totalL*100)}%)<br>
🔥 <strong>${streak}-day streak</strong><br>
📈 <strong>${allT.length} trades</strong> — ${wr}% win rate · ${wins}W/${losses}L<br>
💰 Net P&L: <strong style="color:${totalPnl>=0?'var(--accent)':'var(--red)'}">${totalPnl>=0?'+':''}$${Math.abs(totalPnl).toFixed(2)}</strong><br>
⚖️ Profit factor: <strong>${pf}</strong> · Avg win: +$${avgW.toFixed(0)} · Avg loss: -$${avgL.toFixed(0)}<br>
💵 Sim equity: <strong>$${simEq.toFixed(2)}</strong> (${((simEq-10000)/100).toFixed(1)}% return)<br>
📓 <strong>${journal.length} journal entries</strong><br>
🏆 <strong>${(STATE.achievements||[]).length} badges earned</strong><br><br>
${completed < 10 ? '📌 Focus: Complete Forex Basics and Risk Management first — they are the foundation.' :
  completed < 20 ? '📌 Next: Technical Analysis deep dive + journal every sim trade.' :
  '📌 Advanced: Refine your edge. Review journal analytics weekly. Master 2-3 strategies.'}`;
    _conversationMemory.add(q, 'progress', reply.substring(0, 40));
    return reply;
  }

  // ── NEXT LESSON ────────────────────────────────────────────
  if (q.match(/next lesson|what.*study|what.*learn next|continue.*learn|where.*start|what.*next/)) {
    if (typeof CURRICULUM !== 'undefined') {
      for (const cat of CURRICULUM) {
        for (const l of cat.lessons) {
          if (!(STATE.progress||{})[l.id]) {
            const reply = `Your next lesson: <strong>"${l.title}"</strong> in <em>${cat.title}</em>.<br><br>
${l.content ? l.content.replace(/<[^>]+>/g,'').substring(0, 180).trim() + '…' : ''}<br><br>
⏱ ~${l.mins} minutes · +${l.xp||50} XP on completion<br><br>
Head to the <strong>Learn tab</strong> to start it now. 🎓`;
            _conversationMemory.add(q, 'next_lesson', l.title);
            return reply;
          }
        }
      }
    }
    return `You have completed all available lessons! Now focus on: daily sim trading, journaling every trade, reviewing analytics weekly, and mastering your top 2-3 setups.`;
  }

  // ── WHAT IS FOREX ──────────────────────────────────────────
  if (q.match(/what is forex|how does forex work|forex.*work|currency.*market|explain forex/)) {
    const reply = `<strong>Forex (Foreign Exchange)</strong> — the world's largest financial market.<br><br>
📊 <strong>Daily volume:</strong> $7.5 trillion (50× all stock markets combined)<br>
🕐 <strong>Hours:</strong> 24 hours/day · 5 days/week — no central exchange, fully OTC<br>
📍 Currencies always traded in <strong>pairs</strong>: EUR/USD, GBP/JPY, XAU/USD etc.<br><br>
<strong>How it works:</strong> You buy one currency while selling another. If EUR/USD = 1.0850, one Euro costs 1.0850 US Dollars. Buy EUR/USD → you're betting Euro strengthens vs the Dollar.<br><br>
<strong>Why trade forex:</strong><br>
• Profit in both rising AND falling markets<br>
• Start with as little as $100<br>
• Tightest spreads of any market<br>
• Trade on your schedule — no exchange hours<br>
• 20:1 to 500:1 leverage (double-edged sword)<br><br>
Want me to explain <strong>currency pairs</strong>, <strong>leverage</strong>, or <strong>pips</strong> next?`;
    _conversationMemory.add(q, 'forex_basics', reply.substring(0, 40));
    return reply;
  }

  // ── PIPS ───────────────────────────────────────────────────
  if (q.match(/\bpip\b|what is.*pip|pip value|pipette|how.*pip|explain pip/)) {
    const reply = `<strong>A pip</strong> (Percentage in Point) is the smallest standard unit of forex price movement.<br><br>
📏 Most pairs (EUR/USD, GBP/USD): 1 pip = <strong>0.0001</strong> (4th decimal place)<br>
📏 JPY pairs (USD/JPY, EUR/JPY): 1 pip = <strong>0.01</strong> (2nd decimal place)<br>
📏 5th decimal = pipette (1/10 of a pip)<br><br>
<strong>Pip dollar values (standard lot = 100,000 units):</strong><br>
• EUR/USD: <strong>$10/pip</strong><br>
• Mini lot (0.10): <strong>$1/pip</strong><br>
• Micro lot (0.01): <strong>$0.10/pip</strong><br><br>
<strong>Example:</strong> You buy EUR/USD at 1.0850, it moves to 1.0910 = <strong>60 pips</strong>. At 0.10 lot = $60 profit.<br><br>
Use <strong>Calculator → Pip Value tab</strong> for any pair instantly. 🧮`;
    _conversationMemory.add(q, 'pips', reply.substring(0, 40));
    return reply;
  }

  // ── LEVERAGE ───────────────────────────────────────────────
  if (q.match(/leverage|margin call|explain leverage|what is leverage|how.*leverage/)) {
    const reply = `<strong>Leverage</strong> = borrowed capital from your broker to control a larger position.<br><br>
<strong>Example with 100:1 leverage:</strong><br>
$1,000 of your money controls <strong>$100,000</strong> worth of currency.<br><br>
The brutal math:<br>
✅ +100 pips on 1 lot = <strong>+$1,000</strong> (100% return on $1,000 margin)<br>
❌ -100 pips on 1 lot = <strong>-$1,000</strong> (complete wipeout)<br><br>
<strong>Safe leverage guidelines:</strong><br>
🟢 Beginner: 1:5 to 1:10<br>
🟡 Intermediate: 1:10 to 1:30<br>
🔴 Advanced: up to 1:50 (strict risk management required)<br><br>
⚠️ High leverage is the #1 account killer. Always use the <strong>Position Size Calculator</strong> — leverage ratio matters far less than your lot size. Never risk more than 1-2% per trade regardless of leverage.`;
    _conversationMemory.add(q, 'leverage', reply.substring(0, 40));
    return reply;
  }

  // ── SPREAD ─────────────────────────────────────────────────
  if (q.match(/spread|bid ask|ask bid|broker fee|cost.*trade|transaction.*cost/)) {
    const reply = `<strong>The Spread</strong> = Ask − Bid = your broker's built-in fee on every trade.<br><br>
You <strong>buy at the Ask</strong> (higher price) and <strong>sell at the Bid</strong> (lower price). Every trade begins slightly negative — you must first cover the spread.<br><br>
<strong>Typical spreads on a quality ECN broker:</strong><br>
• EUR/USD: 0.5 – 1.5 pips ✅<br>
• GBP/USD: 0.8 – 2 pips ✅<br>
• Gold (XAU/USD): 0.2 – 0.5 pips ✅<br>
• Exotic pairs: 10 – 50+ pips ⚠️<br><br>
<strong>Critical warning:</strong> During major news events (NFP, FOMC), spreads spike from 1 pip to 20-50 pips in seconds. This alone can hit your stop loss. Always check spreads before trading news events.`;
    _conversationMemory.add(q, 'spread', reply.substring(0, 40));
    return reply;
  }

  // ── SUPPORT & RESISTANCE ───────────────────────────────────
  if (q.match(/support|resistance|s.r level|key level|draw.*level|horizontal level|price level/)) {
    const reply = `<strong>Support & Resistance</strong> — the foundation of all technical analysis.<br><br>
🟢 <strong>Support:</strong> Zone where buyers consistently overcome sellers → price bounces up<br>
🔴 <strong>Resistance:</strong> Zone where sellers consistently overcome buyers → price bounces down<br><br>
<strong>How to identify high-quality levels:</strong><br>
1. Start on D1/W1 chart — these levels carry the most weight<br>
2. Require minimum 2-3 clear price reactions to confirm<br>
3. Think in <strong>zones</strong> not exact prices (±10 pip buffer)<br>
4. Round numbers (1.1000, 1.2500) attract institutional orders<br>
5. Previous weekly/monthly highs and lows are critical<br><br>
<strong>Role Reversal:</strong> Broken support <em>becomes</em> resistance. Broken resistance <em>becomes</em> support. Retesting a broken level after a clear break = one of the highest-probability setups in all of trading. This is a core concept. 🎯`;
    _conversationMemory.add(q, 'support_resistance', reply.substring(0, 40));
    return reply;
  }

  // ── RSI ────────────────────────────────────────────────────
  if (q.match(/\brsi\b|relative strength|overbought|oversold.*indicator|rsi.*divergence/)) {
    const reply = `<strong>RSI (Relative Strength Index)</strong> — J. Welles Wilder's momentum oscillator.<br><br>
📊 Scale 0-100:<br>
🔴 Above 70 = Overbought (potential reversal — can stay overbought in strong trends!)<br>
🟢 Below 30 = Oversold (potential reversal up)<br>
⚪ 50 line = Trend filter: above = bullish bias, below = bearish bias<br><br>
<strong>Most powerful use — Divergence:</strong><br>
🐻 <strong>Bearish:</strong> Price makes new HIGH but RSI makes lower high → momentum weakening → reversal warning<br>
🐂 <strong>Bullish:</strong> Price makes new LOW but RSI makes higher low → bearish exhaustion → reversal warning<br><br>
<strong>Best settings:</strong> RSI(14) standard · RSI(7) more signals · RSI(21) higher quality signals<br><br>
Never trade RSI in isolation — always confirm with price action at a key level. The indicator confirms what price is already showing. 📈`;
    _conversationMemory.add(q, 'rsi', reply.substring(0, 40));
    return reply;
  }

  // ── MACD ───────────────────────────────────────────────────
  if (q.match(/macd|moving average convergence|histogram.*indicator|signal.*line.*macd/)) {
    const reply = `<strong>MACD</strong> (Moving Average Convergence Divergence) — trend direction AND momentum in one tool.<br><br>
<strong>The 3 components:</strong><br>
• <strong>MACD Line</strong> = 12 EMA minus 26 EMA<br>
• <strong>Signal Line</strong> = 9 EMA of the MACD line<br>
• <strong>Histogram</strong> = MACD minus Signal (green = growing momentum, red = fading)<br><br>
<strong>Trading signals:</strong><br>
✅ MACD crosses above Signal = bullish momentum<br>
❌ MACD crosses below Signal = bearish momentum<br>
📊 MACD above zero = overall bullish; below zero = bearish<br><br>
<strong>Best use — Divergence:</strong> Price new high but MACD histogram lower high = hidden weakness. More reliable than crossover signals alone. Works best on H4 and D1 charts.<br><br>
Default settings: 12-26-9. No need to change unless doing specific strategies.`;
    _conversationMemory.add(q, 'macd', reply.substring(0, 40));
    return reply;
  }

  // ── BOLLINGER BANDS ────────────────────────────────────────
  if (q.match(/bollinger|bb.*squeeze|volatility.*band|band.*squeeze|bb.*band/)) {
    const reply = `<strong>Bollinger Bands</strong> — John Bollinger's volatility indicator.<br><br>
<strong>3 components:</strong><br>
• Middle Band = 20-period SMA<br>
• Upper Band = 20 SMA + 2 standard deviations<br>
• Lower Band = 20 SMA − 2 standard deviations<br><br>
<strong>Key patterns:</strong><br>
🗜️ <strong>BB Squeeze</strong> — Bands narrow = low volatility = big move imminent. Prepare for breakout.<br>
📈 <strong>BB Expansion</strong> — Bands widen = strong trend underway. Ride it; don't fight it.<br>
🎯 Touching the outer band during a trend = continuation, <em>not</em> automatically a reversal.<br><br>
<strong>Best combined with:</strong> RSI (confirm momentum), Volume (confirm breakout), Key S&R levels (confirm reversal points).`;
    _conversationMemory.add(q, 'bollinger', reply.substring(0, 40));
    return reply;
  }

  // ── FIBONACCI ──────────────────────────────────────────────
  if (q.match(/fibonacci|fib.*level|golden ratio|61\.8|golden pocket|retracement.*fib/)) {
    const reply = `<strong>Fibonacci Retracement</strong> — Based on the Golden Ratio (1.618).<br><br>
<strong>Key retracement levels:</strong><br>
• 23.6% — Shallow pullback (very strong trend)<br>
• 38.2% — Normal healthy pullback<br>
• 50.0% — Psychological midpoint, widely respected<br>
• <strong>61.8% = Golden Pocket</strong> ⭐ Most respected globally — institutional order zone<br>
• 78.6% — Deep pullback, weakening trend<br><br>
<strong>Extension targets:</strong> 127.2% · <strong>161.8%</strong> (primary) · 261.8%<br><br>
<strong>Drawing rules:</strong><br>
• Uptrend: drag from swing LOW to swing HIGH<br>
• Downtrend: drag from swing HIGH to swing LOW<br><br>
<strong>The confluence triple:</strong> Fibonacci 61.8% + horizontal S&R + EMA21 aligning = extremely high probability entry zone.`;
    _conversationMemory.add(q, 'fibonacci', reply.substring(0, 40));
    return reply;
  }

  // ── MOVING AVERAGES ────────────────────────────────────────
  if (q.match(/moving average|\bema\b|\bsma\b|200.*ma|golden cross|death cross|ema.*pullback/)) {
    const reply = `<strong>Moving Averages</strong> — the most versatile tool in a trader's toolkit.<br><br>
<strong>SMA</strong> (Simple): Equal weight to all periods. Slower but better for S&R identification.<br>
<strong>EMA</strong> (Exponential): More weight to recent candles. Faster, better for dynamic entries.<br><br>
<strong>Key MA levels every trader watches:</strong><br>
• EMA 9 / 21 — Short-term trend and crossover entries<br>
• EMA 50 — Medium-term trend filter. Price above = bullish bias.<br>
• <strong>SMA 200</strong> — THE king. Major long-term S&R. Watched by every institution globally.<br><br>
<strong>Golden Cross:</strong> EMA 50 crosses ABOVE SMA 200 = major long-term bullish signal<br>
<strong>Death Cross:</strong> EMA 50 crosses BELOW SMA 200 = major long-term bearish signal<br><br>
Best EMA pullback entry: In a confirmed uptrend, price pulls back to EMA 21 with a bullish confirmation candle at S&R = high-probability buy.`;
    _conversationMemory.add(q, 'moving_averages', reply.substring(0, 40));
    return reply;
  }

  // ── CANDLESTICKS ───────────────────────────────────────────
  if (q.match(/candlestick|candle pattern|hammer|engulf|doji|morning star|pin bar|shooting star|candle.*bible/)) {
    const reply = `<strong>The 6 most important candlestick patterns:</strong><br><br>
🔨 <strong>Hammer</strong> — Long lower wick at support. Buyers rejected lower prices. Bullish reversal.<br>
⭐ <strong>Shooting Star</strong> — Long upper wick at resistance. Sellers rejected higher prices. Bearish.<br>
🐂 <strong>Bullish Engulfing</strong> — Large green candle fully engulfs prior red. Strong reversal up.<br>
🐻 <strong>Bearish Engulfing</strong> — Large red engulfs prior green. Strong reversal down.<br>
✚ <strong>Doji</strong> — Open ≈ Close. Pure market indecision. Most powerful at S&R after a trend.<br>
☀️ <strong>Morning Star</strong> — 3 candles: large bearish, small indecision, large bullish. Strong bottom.<br><br>
<strong>The context rule:</strong> A hammer mid-range = ~40% probability. Same hammer at major D1 support after a 300-pip downtrend = 65%+. Context is everything — the pattern is just the trigger.<br><br>
Study all 17 patterns with SVG illustrations in <strong>Learn → Candle Bible 🕯️</strong>`;
    _conversationMemory.add(q, 'candlesticks', reply.substring(0, 40));
    return reply;
  }

  // ── RISK MANAGEMENT ────────────────────────────────────────
  if (q.match(/risk management|1.*percent.*rule|position.*siz|risk.*per.*trade|protect.*capital|drawdown.*control/)) {
    const riskAmt = (simBal * 0.01).toFixed(2);
    const lots    = (simBal * 0.01 / 3).toFixed(2);
    const reply = `<strong>Risk Management — the #1 skill in trading.</strong><br><br>
<strong>The 1% Rule:</strong> Never risk more than 1% of your account on any single trade.<br><br>
<strong>Position Size Formula:</strong><br>
<code>Lots = (Balance × Risk%) ÷ (SL pips × Pip Value)</code><br><br>
<strong>Your sim ($${simBal.toFixed(0)}), 1% risk, 30-pip SL on EUR/USD:</strong><br>
= $${riskAmt} ÷ (30 × $0.10) = $${riskAmt} ÷ $3.00 = <strong>${lots} lots</strong><br><br>
<strong>Why 1% is non-negotiable (20 losses in a row):</strong><br>
• 1% risk: drawdown = -18% → need +22% to recover ✅<br>
• 5% risk: drawdown = -64% → need +180% to recover ⚠️<br>
• 10% risk: drawdown = -87% → need +700% to recover 💀<br><br>
Use the <strong>Calculator → Position Size tab</strong> before every single trade. This one habit separates survivors from accounts that blow.`;
    _conversationMemory.add(q, 'risk_management', reply.substring(0, 40));
    return reply;
  }

  // ── TRADING PSYCHOLOGY ─────────────────────────────────────
  if (q.match(/psychology|emotion|fear.*greed|discipline|mental.*state|mindset|cognitive.*bias|trading.*brain/)) {
    const reply = `<strong>Trading Psychology — the real separator between profitable and unprofitable traders.</strong><br><br>
You can have the best strategy in the world and still lose if emotions override your rules.<br><br>
<strong>The 7 biases destroying retail traders:</strong><br>
1. <strong>Confirmation Bias</strong> — Only seeing information that confirms your view<br>
2. <strong>Loss Aversion</strong> — Losses feel 2× more painful than equal gains feel good<br>
3. <strong>Recency Bias</strong> — Overweighting the last few trades<br>
4. <strong>Sunk Cost Fallacy</strong> — "I have held this losing trade 3 days, I can not close now"<br>
5. <strong>Gambler's Fallacy</strong> — "I am due a win after 5 losses"<br>
6. <strong>Overconfidence</strong> — Recklessly increasing size after a winning streak<br>
7. <strong>Anchoring</strong> — Fixating on your entry price instead of current market reality<br><br>
<strong>The 3-loss rule:</strong> After 3 consecutive losses, close the platform. Return tomorrow. No exceptions.<br><br>
Take the <strong>Bias Test</strong> (More → Bias Test) to score yourself on all 7 biases. 🧠`;
    _conversationMemory.add(q, 'psychology', reply.substring(0, 40));
    return reply;
  }

  // ── SMC ────────────────────────────────────────────────────
  if (q.match(/smc|smart money|order block|fair value gap|fvg|choch|bos|liquidity|ict.*concept/)) {
    const reply = `<strong>Smart Money Concepts (SMC)</strong> — reading institutional market behaviour.<br><br>
<strong>Core concepts:</strong><br>
📦 <strong>Order Block (OB)</strong> — Last bearish candle before a major bullish impulse. Institutions left unfilled orders there. Price returns to sweep the zone.<br>
🔲 <strong>Fair Value Gap (FVG)</strong> — 3-candle imbalance where candle 1 and 3 don't overlap. Price tends to fill the inefficiency.<br>
💧 <strong>Liquidity</strong> — Stop clusters sitting above swing highs and below lows. Institutions hunt these before reversing direction.<br>
📈 <strong>BOS</strong> — Break of Structure. Confirms current trend continuation.<br>
🔄 <strong>CHOCH</strong> — Change of Character. First counter-trend structure break = early reversal warning.<br><br>
<strong>SMC 5-step entry process:</strong><br>
1. D1/H4: Identify trend via BOS direction<br>
2. H1: Wait for CHOCH against the higher TF trend<br>
3. Mark the Order Block at the CHOCH candle<br>
4. Wait for price to return to the OB zone<br>
5. M15: Enter on FVG fill or reversal confirmation candle`;
    _conversationMemory.add(q, 'smc', reply.substring(0, 40));
    return reply;
  }

  // ── SESSIONS / TIMING ──────────────────────────────────────
  if (q.match(/trading session|best time.*trade|london.*open|new york.*session|asian.*session|overlap|when should i trade|when to trade/)) {
    const hr = new Date().getHours();
    const nowSession =
      hr>=8&&hr<12  ? '🇬🇧 London Open — ACTIVE NOW' :
      hr>=12&&hr<13 ? '🌐 Pre-NY — Moderate' :
      hr>=13&&hr<17 ? '⭐ London/NY Overlap — PRIME TIME ACTIVE' :
      hr>=17&&hr<22 ? '🇺🇸 New York — ACTIVE NOW' :
      hr>=22||hr<2  ? '🌏 Sydney — ACTIVE (low volume)' :
      hr>=0&&hr<9   ? '🇯🇵 Tokyo — ACTIVE' : 'Between sessions';
    const reply = `<strong>Current session: ${nowSession}</strong><br><br>
<strong>The 4 trading sessions (UTC):</strong><br>
🌏 Sydney: 22:00–07:00 — Low volume, AUD/NZD pairs<br>
🇯🇵 Tokyo: 00:00–09:00 — Low/medium volume, JPY pairs<br>
🇬🇧 London: 08:00–17:00 — HIGH volume ⭐ EUR/GBP pairs<br>
🇺🇸 New York: 13:00–22:00 — HIGH volume ⭐ USD pairs<br><br>
🔥 <strong>Best of all: London/NY Overlap 13:00–17:00 UTC</strong><br>
Highest liquidity, tightest spreads, strongest directional moves of the entire week. This is when institutional traders are most active.<br><br>
<strong>Avoid:</strong> Monday gaps, Friday afternoon position squaring, 30 min around major news.`;
    _conversationMemory.add(q, 'sessions', reply.substring(0, 40));
    return reply;
  }

  // ── FUNDAMENTAL ANALYSIS ───────────────────────────────────
  if (q.match(/fundamental|economic calendar|nfp|cpi|fomc|interest rate|central bank|hawkish|dovish/)) {
    const reply = `<strong>Fundamental Analysis</strong> — Trading the macro picture.<br><br>
<strong>Most market-moving events (ranked by impact):</strong><br>
🔴 <strong>NFP</strong> (Non-Farm Payrolls) — 1st Friday/month. 100–300 pip USD moves typical.<br>
🔴 <strong>FOMC Rate Decision</strong> — 8× per year. Biggest regular USD mover.<br>
🔴 <strong>CPI (Inflation)</strong> — Monthly. Directly drives rate hike/cut expectations.<br>
🟡 GDP, PMI, Retail Sales — Monthly macro indicators.<br><br>
<strong>Hawkish vs Dovish:</strong><br>
🦅 <strong>Hawkish</strong> = rate hikes, tight money → currency <strong>strengthens</strong><br>
🕊️ <strong>Dovish</strong> = rate cuts, loose money → currency <strong>weakens</strong><br><br>
<strong>3 approaches to news:</strong><br>
1. <strong>Avoid entirely</strong> — close positions 30 min before (best for beginners)<br>
2. <strong>Trade the aftermath</strong> — wait 2-5 min, trade sustained direction<br>
3. <strong>Fade the spike</strong> — advanced only; when initial move violently reverses`;
    _conversationMemory.add(q, 'fundamentals', reply.substring(0, 40));
    return reply;
  }

  // ── POSITION SIZING ────────────────────────────────────────
  if (q.match(/position siz|lot size|how much.*risk|lot.*calculat|calculat.*lot|what lot/)) {
    const riskAmt = (simBal * 0.01).toFixed(2);
    const lots    = (simBal * 0.01 / 3).toFixed(2);
    const reply = `<strong>Position Sizing Formula:</strong><br><br>
<code>Lots = (Balance × Risk%) ÷ (SL pips × Pip Value)</code><br><br>
<strong>Your sim account ($${simBal.toFixed(0)}), 1% risk, 30-pip SL on EUR/USD:</strong><br>
= ($${simBal.toFixed(0)} × 0.01) ÷ (30 × $0.10)<br>
= $${riskAmt} ÷ $3.00 = <strong>${lots} lots</strong><br><br>
<strong>Key rules:</strong><br>
• 1% risk = professional, sustainable standard<br>
• 2% maximum for A+ setups only<br>
• <strong>Never exceed 2% under any circumstances</strong><br>
• Calculate before entering every single trade<br><br>
Use <strong>More → Calculator → Position Size</strong> for instant real-time calculations. 🧮`;
    _conversationMemory.add(q, 'position_sizing', reply.substring(0, 40));
    return reply;
  }

  // ── CHART PATTERNS ─────────────────────────────────────────
  if (q.match(/chart pattern|head.*shoulder|double top|double bottom|flag.*pattern|triangle.*pattern|cup.*handle/)) {
    const reply = `<strong>Top Chart Patterns with Win Rates:</strong><br><br>
👑 <strong>Head & Shoulders</strong> — 3 peaks, neckline break = entry. 68-73% win rate.<br>
📉 <strong>Double Top/Bottom</strong> — Two equal highs/lows + neckline break. 62-68%.<br>
🏁 <strong>Bull/Bear Flag</strong> — Strong impulse, tight consolidation, breakout. 65-70%.<br>
🔺 <strong>Ascending Triangle</strong> — Flat resistance + rising lows = bullish break. 60-65%.<br>
🔻 <strong>Descending Triangle</strong> — Flat support + falling highs = bearish break. 60-65%.<br>
🍵 <strong>Cup & Handle</strong> — Rounding base + small pullback = bullish continuation. 65-70%.<br><br>
<strong>Rules for ALL patterns:</strong><br>
• Wait for a <strong>candle close</strong> beyond the pattern (never a wick alone)<br>
• Target = height of pattern projected from breakout<br>
• Even the best patterns fail 30-40% of the time — always use stops 🛑`;
    _conversationMemory.add(q, 'chart_patterns', reply.substring(0, 40));
    return reply;
  }

  // ── STOP LOSS ──────────────────────────────────────────────
  if (q.match(/stop loss|where.*stop|sl placement|trailing stop|stop.*placement/)) {
    const reply = `<strong>Stop Loss Placement — the most critical skill.</strong><br><br>
<strong>Golden Rule:</strong> Place SL at a logical level where your trade is <em>proven wrong</em> — never a random pip distance.<br><br>
<strong>Where to place stops:</strong><br>
• Longs: below the nearest support level + 5-10 pip buffer<br>
• Shorts: above the nearest resistance level + buffer<br>
• Beyond the swing high/low of the setup candle<br>
• Beyond the Order Block (for SMC traders)<br>
• ATR method: SL = Entry ± (1.5 × ATR14) — adapts to current volatility<br><br>
<strong>NEVER do these:</strong><br>
❌ Move SL further away when the trade goes against you<br>
❌ Remove SL "just this once"<br>
❌ Place SL at the exact round number everyone else uses<br><br>
<strong>Trailing Stop:</strong> Moves with price as the trade profits, locking in gains while letting winners run. Available in MT5 right-click menu.`;
    _conversationMemory.add(q, 'stop_loss', reply.substring(0, 40));
    return reply;
  }

  // ── RISK/REWARD ────────────────────────────────────────────
  if (q.match(/risk.*reward|r:r|rr ratio|risk reward ratio|expectancy.*formula/)) {
    const reply = `<strong>Risk/Reward Ratio</strong> — the math that makes trading profitable long-term.<br><br>
<strong>Minimum win rates needed at each R:R:</strong><br>
• 1:1 R:R — need more than 50% win rate to profit<br>
• <strong>1:2 R:R — need only 34%</strong> ✅ Recommended minimum<br>
• 1:3 R:R — need only 26%<br>
• 1:5 R:R — need only 17%<br><br>
<strong>Expectancy formula:</strong><br>
<code>E = (WR% × Avg Win) − (LR% × Avg Loss)</code><br><br>
${allT.length >= 5 ?
  `<strong>Your current data:</strong> ${wr}% win rate · Avg win +$${avgW.toFixed(0)} · Avg loss -$${avgL.toFixed(0)}<br>Expectancy per trade: <strong style="color:${(wr/100*avgW - (100-wr)/100*avgL)>=0?'var(--accent)':'var(--red)'}">${((wr/100*avgW - (100-wr)/100*avgL)>=0?'+':'')}$${(wr/100*avgW - (100-wr)/100*avgL).toFixed(2)}</strong>` :
  'Log more trades to see your personal expectancy calculated here.'}<br><br>
Always set your Take Profit <em>before</em> entering, based on the next key S&R level.`;
    _conversationMemory.add(q, 'risk_reward', reply.substring(0, 40));
    return reply;
  }

  // ── JOURNAL ────────────────────────────────────────────────
  if (q.match(/journal|log.*trade|record.*trade|why.*journal|track.*performance/)) {
    const reply = `<strong>Why journalling is non-negotiable:</strong><br><br>
Every consistently profitable trader journals. Without it, you are flying blind — you literally do not know which setups work for <em>you</em>, not just in theory.<br><br>
<strong>What your journal reveals over time:</strong><br>
• Which setups are actually profitable vs. what you <em>think</em> works<br>
• What time of day you perform best<br>
• When emotions are degrading your execution<br>
• Your actual R:R achieved vs. planned<br>
• Plan compliance percentage (the most important metric)<br><br>
${journal.length === 0 ?
  '<strong style="color:var(--red)">You have 0 journal entries.</strong> This is your #1 priority right now. Log your very next trade in the Journal tab.' :
  journal.length < 10 ?
  `You have <strong>${journal.length} entries</strong> — good start! Aim for 25+ before drawing any statistical conclusions.` :
  `You have <strong>${journal.length} entries</strong> — excellent data set! Go to <strong>Journal → Stats</strong> for your full performance breakdown.`}<br><br>
<strong>Minimum per trade:</strong> pair · direction · entry/SL/TP · lot size · outcome · mood · one sentence of notes.`;
    _conversationMemory.add(q, 'journal', reply.substring(0, 40));
    return reply;
  }

  // ── COMPOUND GROWTH ────────────────────────────────────────
  if (q.match(/compound|grow.*account|double.*account|account.*growth|consistent.*return|compounding/)) {
    const c3  = (simBal * Math.pow(1.03, 24)).toFixed(0);
    const c5  = (simBal * Math.pow(1.05, 24)).toFixed(0);
    const c10 = (simBal * Math.pow(1.10, 24)).toFixed(0);
    const reply = `<strong>The Power of Compounding in Trading</strong><br><br>
Starting balance: $${simBal.toFixed(0)} · Consistent monthly returns over 24 months:<br><br>
• 3%/month: <strong>$${c3}</strong> (+${Math.round((parseInt(c3)-simBal)/simBal*100)}%)<br>
• 5%/month: <strong>$${c5}</strong> (+${Math.round((parseInt(c5)-simBal)/simBal*100)}%)<br>
• 10%/month: <strong>$${c10}</strong> (exceptional — very rare long-term)<br><br>
<strong>Why consistency beats big wins:</strong><br>
3% every month <em>consistently</em> beats 20% one month then -15% the next. Compounding punishes volatility and rewards steady execution. Even the world's best hedge funds average 20-30% per year.<br><br>
Use <strong>Calculator → Growth tab</strong> to model your exact scenario with monthly deposits. 📈`;
    _conversationMemory.add(q, 'compound_growth', reply.substring(0, 40));
    return reply;
  }

  // ── CARRY TRADE ────────────────────────────────────────────
  if (q.match(/carry trade|swap.*earn|positive swap|interest.*differ/)) {
    const reply = `<strong>Carry Trade</strong> — profiting from interest rate differentials.<br><br>
You borrow a low-interest-rate currency to buy a high-interest-rate currency, earning the daily swap difference as passive income.<br><br>
<strong>Classic carry pairs:</strong><br>
• AUD/JPY — Australia higher rates vs Japan near-zero<br>
• NZD/JPY — Similar dynamic<br>
• USD/JPY — When Fed rates significantly exceed BOJ rates<br><br>
<strong>Requirements:</strong><br>
• Stable or rising market (risk-on environment essential)<br>
• Wide stop loss 100-200 pips to withstand noise<br>
• Hold for weeks to months to accumulate meaningful swap income<br><br>
⚠️ <strong>Critical risk:</strong> Carry trades unwind catastrophically in risk-off events. AUD/JPY fell 40% in 2008. Always size conservatively and check current swap rates in your broker's terminal. Use the <strong>Calculator → Swap tab</strong> to model your costs first.`;
    _conversationMemory.add(q, 'carry_trade', reply.substring(0, 40));
    return reply;
  }

  // ── BACKTESTING ────────────────────────────────────────────
  if (q.match(/backtest|back.*test|test.*strategy|historical.*data|paper.*trad/)) {
    const reply = `<strong>Backtesting</strong> — testing your strategy on historical data before risking real money.<br><br>
<strong>The correct process:</strong><br>
1. Write strategy rules with <em>zero ambiguity</em> — no discretionary decisions<br>
2. Select your timeframe + 2+ years of historical data<br>
3. Manually scroll through charts, mark every valid setup<br>
4. Record: entry price, SL, TP, outcome, pip gain/loss, date<br>
5. After 100+ trades: calculate win rate, profit factor, max drawdown<br><br>
<strong>Pitfalls to avoid:</strong><br>
• Curve fitting — editing rules to perfectly match past data<br>
• Look-ahead bias — using information not visible at that candle close<br>
• Ignoring spread/slippage — always add 1-2 pips to results<br><br>
<strong>Minimum acceptable backtest metrics:</strong><br>
Win rate &gt;40% · Profit factor &gt;1.3 · Max drawdown &lt;20%<br><br>
Tools: MT5 Strategy Tester, TradingView Manual Replay, Forex Tester software.`;
    _conversationMemory.add(q, 'backtesting', reply.substring(0, 40));
    return reply;
  }

  // ── BROKER SELECTION ───────────────────────────────────────
  if (q.match(/broker|regulated|ecn.*broker|choose.*broker|which broker|best broker/)) {
    const reply = `<strong>Choosing a Safe, Quality Broker:</strong><br><br>
<strong>Must-have requirements:</strong><br>
✅ Regulated by Tier 1 regulator (FCA, ASIC, CySEC, NFA, FSCA)<br>
✅ MT4 or MT5 platform available<br>
✅ 5+ years operating with verifiable track record<br>
✅ EUR/USD spread under 1.5 pips<br>
✅ Withdrawals processed within 2-3 business days<br><br>
<strong>Red flags — avoid these brokers immediately:</strong><br>
🚩 Guaranteed returns of any kind<br>
🚩 Deposit bonuses with hidden withdrawal lock conditions<br>
🚩 No verifiable regulatory registration number<br>
🚩 Pressure to deposit quickly ("limited offer")<br>
🚩 Withdrawals delayed or refused without explanation<br>
🚩 Proprietary platform only — no MT4/MT5<br><br>
Check the <strong>Knowledge Vault → Broker Guide</strong> for a comprehensive breakdown including recommended regulation bodies by region.`;
    _conversationMemory.add(q, 'broker', reply.substring(0, 40));
    return reply;
  }

  // ── STOP LOSS / SL ─────────────────────────────────────────
  if (q.match(/stop loss|where.*stop|sl placement|trailing stop/)) {
    const reply = `<strong>Stop Loss Placement — most critical skill.</strong><br><br>
<strong>Golden Rule:</strong> Place SL at a logical level where your trade is proven wrong — never random.<br><br>
<strong>Where to place stops:</strong><br>
• Longs: below nearest support + 5-10 pip buffer<br>
• Shorts: above nearest resistance + buffer<br>
• Beyond swing high/low of the setup candle<br>
• ATR method: Entry ± 1.5 × ATR(14) — adapts to volatility<br><br>
<strong>NEVER:</strong><br>
❌ Move SL further away when losing<br>
❌ Remove SL "just this once"<br>
❌ Place SL at the exact round number (liquidity trap)`;
    _conversationMemory.add(q, 'stop_loss', reply.substring(0, 40));
    return reply;
  }

  // ── GLOSSARY LOOKUP ────────────────────────────────────────
  const glossaryMatch = q.match(/^(?:what is|what are|define|explain|meaning of|what does .+ mean|tell me about)\s+(?:a |an |the )?(.+?)[\?\.]*$/);
  if (glossaryMatch && typeof FOREX_GLOSSARY !== 'undefined') {
    const term = glossaryMatch[1].toLowerCase().replace(/['"]/g, '').trim();
    if (FOREX_GLOSSARY[term]) {
      const reply = `<strong>${term.charAt(0).toUpperCase()+term.slice(1)}</strong><br><br>${FOREX_GLOSSARY[term]}<br><br><em>Want to go deeper? Check the related lesson in the <strong>Learn tab</strong>.</em>`;
      _conversationMemory.add(q, 'glossary_' + term, reply.substring(0, 40));
      return reply;
    }
    const keys = Object.keys(FOREX_GLOSSARY);
    const partial = keys.find(k => k.includes(term) || term.includes(k));
    if (partial) {
      const reply = `<strong>${partial.charAt(0).toUpperCase()+partial.slice(1)}</strong><br><br>${FOREX_GLOSSARY[partial]}<br><br><em>From the TradeBaby Forex Glossary — 200+ definitions available.</em>`;
      _conversationMemory.add(q, 'glossary_' + partial, reply.substring(0, 40));
      return reply;
    }
  }

  // ── SETUP DATABASE LOOKUP ──────────────────────────────────
  if ((q.includes('setup') || q.includes('strategy') || q.includes('entry')) && typeof SETUP_DATABASE !== 'undefined') {
    const matched = SETUP_DATABASE.find(s =>
      s.name.toLowerCase().split(' ').some(w => w.length > 4 && q.includes(w))
    );
    if (matched) {
      const reply = `<strong>${matched.name}</strong><br><br>
📊 Win Rate: <strong>${matched.winRate}</strong> · R:R: <strong>${matched.riskReward}</strong> · Difficulty: ${'★'.repeat(matched.difficulty)}<br>
📈 Best pairs: ${matched.pairs.join(', ')}<br>
⏱ Timeframe: ${matched.timeframe}<br><br>
<strong>Entry Rules:</strong><br>
${matched.entryRules.map(r=>`• ${r}`).join('<br>')}<br><br>
🛑 SL: ${matched.stopLoss}<br>
🎯 TP: ${matched.takeProfit}<br><br>
<em>${matched.notes}</em>`;
      _conversationMemory.add(q, 'strategy_' + matched.name, reply.substring(0, 40));
      return reply;
    }
  }

  // ── LESSON CONTENT LOOKUP ──────────────────────────────────
  if (typeof CURRICULUM !== 'undefined') {
    for (const cat of CURRICULUM) {
      for (const l of cat.lessons) {
        const lt = l.title.toLowerCase();
        const li = (l.id||'').replace(/-/g,' ');
        if (q.includes(lt) || (li && q.includes(li))) {
          const reply = `The lesson <strong>"${l.title}"</strong> is in <em>${cat.title}</em>.<br><br>
${l.content ? l.content.replace(/<[^>]+>/g,'').substring(0, 200).trim()+'…' : ''}<br><br>
Go to <strong>Learn → ${cat.title}</strong> to study it and earn +${l.xp||50} XP. 📚`;
          _conversationMemory.add(q, 'lesson_' + l.id, reply.substring(0, 40));
          return reply;
        }
      }
    }
  }

  // ── STRATEGY LOOKUP ────────────────────────────────────────
  if (typeof STRATEGIES !== 'undefined') {
    for (const s of STRATEGIES) {
      const sn = s.name.toLowerCase();
      const si = (s.id||'').replace(/-/g,' ');
      if (q.includes(sn) || q.includes(si)) {
        const reply = `<strong>${s.name}</strong> — ${s.style} strategy<br><br>
📊 Win Rate: ${s.winrate} · R:R: ${s.rr} · Difficulty: ${'★'.repeat(s.difficulty)}<br>
📈 Best pairs: ${s.pairs}<br><br>
${s.desc}<br><br>
Full entry rules in <strong>Learn → Strategies ⚔️</strong>`;
        _conversationMemory.add(q, 'strategy_' + s.id, reply.substring(0, 40));
        return reply;
      }
    }
  }

  // ── CALCULATOR QUESTIONS ───────────────────────────────────
  if (q.match(/calculat|how much|formula|math.*equat/)) {
    const reply = `The <strong>Calculator</strong> (More → Calculator) has 6 tools:<br><br>
📐 <strong>Position Size</strong> — what lot size for my risk %?<br>
📏 <strong>Pip Value</strong> — how much is each pip worth in dollars?<br>
💰 <strong>P&L</strong> — what will I make or lose on this trade?<br>
💳 <strong>Margin</strong> — how much collateral does my broker hold?<br>
🔄 <strong>Swap</strong> — what does holding overnight actually cost?<br>
📈 <strong>Compound Growth</strong> — what will my account grow to?<br><br>
Or give me your numbers directly and I will calculate it manually: balance, risk %, stop loss in pips.`;
    _conversationMemory.add(q, 'calculator', reply.substring(0, 40));
    return reply;
  }

  // ── GREETINGS ──────────────────────────────────────────────
  const greetWords = ['hello','hi','hey','good morning','good afternoon','good evening','howdy','sup','what\'s up'];
  if (greetWords.some(g => q.startsWith(g) || q === g)) {
    const hr = new Date().getHours();
    const timeStr = hr<12?'morning':hr<17?'afternoon':'evening';
    const reply = `Good ${timeStr}, ${name}! 😊<br><br>
I am TradeMind AI — your intelligent trading mentor. I can help with:<br>
• Any forex concept, indicator, or strategy<br>
• Your personal performance data and analytics<br>
• Reviewing your last trade with specific feedback<br>
• Position sizing, calculations, and risk management<br>
• Trading psychology and beating mental biases<br>
• What to study next on your learning path<br><br>
What would you like to explore today? 🎯`;
    _conversationMemory.add(q, 'greeting', reply.substring(0, 40));
    return reply;
  }

  // ── DEFAULT FALLBACK ───────────────────────────────────────
  const defaults = [
    `${name}, I can give you a detailed answer if you are more specific. Try asking:<br><br>
• <strong>"What is [concept/indicator/pattern]?"</strong><br>
• <strong>"Review my last trade"</strong><br>
• <strong>"My win rate"</strong> or <strong>"My progress"</strong><br>
• <strong>"How do I place a stop loss?"</strong><br>
• <strong>"Explain SMC order blocks"</strong><br>
• <strong>"Best pair for me"</strong><br>
• <strong>"Should I trade today?"</strong><br><br>
I have deep knowledge of all forex concepts, strategies, and your personal trading data. What specifically do you need help with? 💪`,

    `Good question. The foundation of all trading success is three pillars:<br><br>
1. <strong>Edge</strong> — a strategy that wins consistently across 100+ trades<br>
2. <strong>Risk Management</strong> — protecting capital (1-2% max per trade, always)<br>
3. <strong>Psychology</strong> — executing without emotion even when it is uncomfortable<br><br>
Most traders focus on #1 and neglect #2 and #3. The stats show that most successful traders have only a 50-55% win rate — their edge comes from R:R discipline, not being right all the time.<br><br>
What specifically would you like to understand or improve?`,
  ];

  const reply = defaults[Math.floor(Math.random() * defaults.length)];
  _conversationMemory.add(q, 'default', reply.substring(0, 40));
  return reply;
}

/* ── FOLLOW-UP RESOLVER ───────────────────────────────────────
   Called when a follow-up is detected — adds context from the
   previous topic so "how do I use it?" makes sense
   ──────────────────────────────────────────────────────────── */
function _resolveFollowUp(q, topic, ctx) {
  const { name } = ctx;
  const followUpMap = {
    'rsi': `To use RSI effectively, ${name}:<br><br>
<strong>On H4/D1 charts:</strong><br>
• Use RSI 50 line as a trend filter — only buy when RSI &gt;50, only sell when &lt;50<br>
• At key S&R, wait for RSI to dip below 30 then back above it for bullish entry confirmation<br>
• Divergence setup: on H1/H4, find where price makes new extreme but RSI does not — that is your entry zone<br><br>
<strong>Common mistakes to avoid:</strong><br>
• Trading every overbought/oversold reading — in strong trends RSI stays extreme for days<br>
• Using RSI alone without price action confirmation at a key level<br>
• Default 14 setting is fine — no need to over-optimise`,

    'macd': `Practical MACD usage, ${name}:<br><br>
<strong>Best approach on H4/D1:</strong><br>
• Use MACD zero line as trend filter — only look for buys when MACD histogram is above zero<br>
• Wait for MACD line to cross above Signal line AND be above zero = confirmed bullish momentum<br>
• Histogram divergence: price new high but histogram lower high = hidden weakness, reduce size or avoid longs<br><br>
<strong>Entry technique:</strong><br>
1. H4 MACD confirms direction (above/below zero)<br>
2. Drop to H1 and wait for MACD crossover in same direction<br>
3. Enter on H1 close with SL below recent swing`,

    'fibonacci': `How to actually trade Fibonacci, ${name}:<br><br>
<strong>Step-by-step process:</strong><br>
1. Identify a clear impulse move (at least 50 pips clean direction)<br>
2. Draw Fibonacci from swing low to swing high (uptrend) or high to low (downtrend)<br>
3. Watch for price to <em>close back below</em> the 61.8% level (Golden Pocket)<br>
4. Look for a confirming candle (hammer, engulfing, doji rejection) at the zone<br>
5. Enter with SL just beyond the 78.6% level (or swing point)<br>
6. Target: 127.2% or 161.8% extension<br><br>
The key: Fibonacci levels alone are not signals. They mark <em>where</em> to look for signals.`,

    'support_resistance': `How to trade S&R levels, ${name}:<br><br>
<strong>The Bounce Trade:</strong><br>
1. Identify a strong S&R level (3+ touches on D1)<br>
2. Wait for price to approach the level<br>
3. Look for a rejection candle (hammer/shooting star/engulfing) on H1<br>
4. Enter on the next candle's open after the rejection closes<br>
5. SL: 10-15 pips beyond the S&R zone<br>
6. TP: next major S&R level (minimum 1:2 R:R)<br><br>
<strong>Role Reversal Trade:</strong> Wait for price to <em>break and retest</em> a level. The retest is usually a higher-probability entry than the initial break.`,

    'psychology': `Practical psychology techniques, ${name}:<br><br>
<strong>Before every trade:</strong><br>
• Answer: Am I trading this because it is a genuine setup, or because I want to trade?<br>
• If you have had 2 losses today, stop. The rule is absolute.<br>
• Never trade within 30 minutes of a stressful event (real-life or trading)<br><br>
<strong>During a trade:</strong><br>
• Set SL and TP when you enter. Then close the chart.<br>
• Watching every tick is the fastest way to make emotional decisions<br><br>
<strong>After a loss:</strong><br>
• Write one sentence: what happened and was it your fault or the market?<br>
• A loss where you followed your rules perfectly is NOT a failure`,

    'smc': `How to apply SMC in practice, ${name}:<br><br>
<strong>The simplified SMC daily routine:</strong><br>
1. Morning: Check D1 for overall structure — are we in BOS uptrend or downtrend?<br>
2. Mark H4 Order Blocks (last bearish candle before a large bullish move)<br>
3. Wait for price to pull back INTO the OB zone<br>
4. On M15: look for a Fair Value Gap fill AND a CHOCH (Change of Character)<br>
5. Enter when you see a confirmation candle closing inside the OB<br>
6. SL: below the OB low (longs) or above OB high (shorts)<br>
7. TP: next significant liquidity pool or FVG above<br><br>
The entire system is built on one idea: institutions leave footprints in price — learn to read them.`,
  };

  return followUpMap[topic] || null;
}

/* ── HELPER FUNCTIONS (used by multiple screens) ─────────────── */
function completedCount() {
  return (STATE?.progress) ? Object.keys(STATE.progress).length : 0;
}
function totalLessons() {
  if (typeof CURRICULUM === 'undefined') return 38;
  return CURRICULUM.reduce((a, c) => a + (c.lessons ? c.lessons.length : 0), 0);
}
function progressPct() {
  const t = totalLessons();
  return t > 0 ? Math.round(completedCount() / t * 100) : 0;
}
