/* ═══════════════════════════════════════════════════════════════
   TRADEBABY PRO — AI BRAIN MODULE
   The intelligence layer that makes TradeMind truly smart.
   
   Architecture:
   ─────────────
   1. CONTEXT ENGINE  — assembles a full picture of the user
   2. PATTERN DETECTOR — finds real patterns in journal data
   3. SMART ROUTER    — decides which AI function to call
   4. RESPONSE ENHANCER — makes responses adaptive and personalized
   5. PROACTIVE COACH — watches for bad habits and intervenes
   6. QUIZ ENGINE     — can test user comprehension inline
   7. TRADE ANALYZER  — deep analysis of a specific trade setup
   ═══════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════
   1. FULL CONTEXT ENGINE
   Builds a complete snapshot of everything known about the user.
   Called once per response. Everything routes through this.
   ════════════════════════════════════════════════════════════════ */
function buildFullContext() {
  const j   = STATE.journal  || [];
  const sim = STATE.simTrades || [];
  const all = [...j, ...sim];
  const wins = all.filter(t => parseFloat(t.pnl) > 0);
  const losses = all.filter(t => parseFloat(t.pnl) <= 0);

  /* ── Trading stats ── */
  const wr       = all.length ? Math.round(wins.length / all.length * 100) : 0;
  const totalPnl = all.reduce((a, t) => a + (parseFloat(t.pnl) || 0), 0);
  const avgWin   = wins.length   ? wins.reduce((a,t)=>a+(parseFloat(t.pnl)||0),0)/wins.length : 0;
  const avgLoss  = losses.length ? Math.abs(losses.reduce((a,t)=>a+(parseFloat(t.pnl)||0),0)/losses.length) : 0;
  const pf       = avgLoss > 0 ? (avgWin * wins.length / (avgLoss * losses.length)) : (wins.length ? 99 : 0);
  const expectancy = (wr/100) * avgWin - ((100-wr)/100) * avgLoss;

  /* ── Level classification ── */
  const lvl = STATE.user?.level || 1;
  const userTier =
    lvl <= 2  ? 'beginner' :
    lvl <= 5  ? 'intermediate' :
    lvl <= 9  ? 'advanced' : 'expert';

  /* ── Pattern analysis (the good stuff) ── */
  const patterns = detectJournalPatterns(j);

  /* ── DNA ── */
  const dna = (typeof calculateTraderDNA === 'function') ? calculateTraderDNA() : null;

  /* ── Learning progress ── */
  const completedLessons = Object.keys(STATE.progress || {});
  const totalLess = typeof totalLessons === 'function' ? totalLessons() : 38;
  const progressPct2 = totalLess > 0 ? Math.round(completedLessons.length / totalLess * 100) : 0;

  /* ── Topics user has asked about (from chat history) ── */
  const chatTopics = (STATE.chatHistory || [])
    .filter(m => m.role === 'bot')
    .slice(-20)
    .map(m => m.text?.substring(0, 60))
    .filter(Boolean);

  /* ── Mood today ── */
  const todayMood = STATE.dailyMood || null;
  const recentMoods = j.slice(-5).map(t => t.mood).filter(Boolean);
  const emotionalRisk = recentMoods.filter(m =>
    ['revenge','frustrated','greedy','angry'].includes(m)).length >= 2;

  /* ── Best / worst pair ── */
  const pairMap = {};
  all.forEach(t => {
    if (!t.pair) return;
    if (!pairMap[t.pair]) pairMap[t.pair] = { pnl:0, wins:0, total:0 };
    pairMap[t.pair].pnl   += parseFloat(t.pnl)||0;
    pairMap[t.pair].total++;
    if (parseFloat(t.pnl) > 0) pairMap[t.pair].wins++;
  });
  const sortedPairs = Object.entries(pairMap).sort((a,b) => b[1].pnl - a[1].pnl);
  const bestPair  = sortedPairs[0]?.[0] || null;
  const worstPair = sortedPairs[sortedPairs.length - 1]?.[0] || null;

  /* ── Best / worst setup ── */
  const setupMap = {};
  j.forEach(t => {
    if (!t.setup) return;
    if (!setupMap[t.setup]) setupMap[t.setup] = { pnl:0, wins:0, total:0 };
    setupMap[t.setup].pnl   += parseFloat(t.pnl)||0;
    setupMap[t.setup].total++;
    if (parseFloat(t.pnl) > 0) setupMap[t.setup].wins++;
  });
  const sortedSetups = Object.entries(setupMap).sort((a,b) => b[1].pnl - a[1].pnl);
  const bestSetup  = sortedSetups[0]?.[0] || null;
  const worstSetup = sortedSetups[sortedSetups.length-1]?.[0] || null;

  /* ── Plan compliance ── */
  const planEntries = j.filter(t => t.plan);
  const planCompliance = planEntries.length
    ? Math.round(planEntries.filter(t => t.plan === 'yes').length / planEntries.length * 100) : null;

  return {
    name: STATE.user?.name || 'Trader',
    level: lvl, userTier, xp: STATE.user?.xp || 0,
    streak: STATE.dailyStreak || 0,
    journal: j, simTrades: sim, allTrades: all,
    wins, losses, wr, totalPnl, avgWin, avgLoss, pf, expectancy,
    completedLessons, totalLess, progressPct: progressPct2,
    patterns, dna, todayMood, recentMoods, emotionalRisk,
    pairMap, bestPair, worstPair,
    setupMap, bestSetup, worstSetup,
    planCompliance, chatTopics,
    simBalance: STATE.simBalance || 10000,
    simEquity:  STATE.simEquity  || 10000,
    achievements: STATE.achievements || [],
    patternScore: STATE.patternScore || { correct:0, total:0 },
  };
}

/* ════════════════════════════════════════════════════════════════
   2. PATTERN DETECTOR
   Finds real patterns in journal data that the user can act on.
   These are the kind of insights a $500/hr trading coach would give.
   ════════════════════════════════════════════════════════════════ */
function detectJournalPatterns(journal) {
  if (!journal || journal.length < 5) return [];
  const patterns = [];

  /* ── Day of week pattern ── */
  const dayData = { Mon:{w:0,l:0}, Tue:{w:0,l:0}, Wed:{w:0,l:0}, Thu:{w:0,l:0}, Fri:{w:0,l:0} };
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  journal.forEach(t => {
    const d = dayNames[new Date(t.date || t.time || Date.now()).getDay()];
    if (dayData[d]) {
      if (parseFloat(t.pnl) > 0) dayData[d].w++; else dayData[d].l++;
    }
  });
  const worstDay = Object.entries(dayData)
    .filter(([,d]) => d.w + d.l >= 3)
    .sort((a,b) => (b[1].l/(b[1].w+b[1].l||1)) - (a[1].l/(a[1].w+a[1].l||1)))[0];
  const bestDay = Object.entries(dayData)
    .filter(([,d]) => d.w + d.l >= 3)
    .sort((a,b) => (b[1].w/(b[1].w+b[1].l||1)) - (a[1].w/(a[1].w+a[1].l||1)))[0];
  if (worstDay && worstDay[1].l > worstDay[1].w) {
    const wr = Math.round(worstDay[1].w/(worstDay[1].w+worstDay[1].l)*100);
    patterns.push({
      type: 'worst_day', severity: 'high',
      insight: `You have only a ${wr}% win rate on ${worstDay[0]}s (${worstDay[1].l} losses, ${worstDay[1].w} wins). Consider not trading on ${worstDay[0]}s.`,
      action: `Skip ${worstDay[0]}s completely for 1 month and measure the impact on your overall performance.`
    });
  }
  if (bestDay && bestDay[1].w > bestDay[1].l) {
    const wr = Math.round(bestDay[1].w/(bestDay[1].w+bestDay[1].l)*100);
    patterns.push({
      type: 'best_day', severity: 'positive',
      insight: `${bestDay[0]} is your best day — ${wr}% win rate. Your edge is strongest then.`,
      action: `On ${bestDay[0]}s, you can trade with full confidence in your system.`
    });
  }

  /* ── Revenge trading detection ── */
  const revengeTrades = journal.filter(t => t.mood === 'revenge');
  if (revengeTrades.length >= 2) {
    const revengeWR = Math.round(revengeTrades.filter(t=>parseFloat(t.pnl)>0).length/revengeTrades.length*100);
    patterns.push({
      type: 'revenge_trading', severity: 'critical',
      insight: `You have ${revengeTrades.length} revenge trades logged with only ${revengeWR}% win rate. This is your biggest account leak.`,
      action: 'After any loss, wait 30 minutes before considering another trade. Make this a hard rule.'
    });
  }

  /* ── Plan compliance pattern ── */
  const planTrades = journal.filter(t => t.plan);
  if (planTrades.length >= 5) {
    const broke = planTrades.filter(t => t.plan === 'no');
    const kept  = planTrades.filter(t => t.plan === 'yes');
    const brokeWR = broke.length  ? Math.round(broke.filter(t=>parseFloat(t.pnl)>0).length/broke.length*100) : 0;
    const keptWR  = kept.length   ? Math.round(kept.filter(t=>parseFloat(t.pnl)>0).length/kept.length*100)  : 0;
    if (keptWR > brokeWR + 15) {
      patterns.push({
        type: 'plan_compliance', severity: 'high',
        insight: `When you follow your plan: ${keptWR}% win rate. When you break it: ${brokeWR}% win rate. Your plan is ${keptWR - brokeWR}% better than your impulses.`,
        action: 'Your plan is statistically proven better than your in-the-moment decisions. Trust it.'
      });
    }
  }

  /* ── Best setup detection ── */
  const setupData = {};
  journal.forEach(t => {
    if (!t.setup) return;
    if (!setupData[t.setup]) setupData[t.setup] = { w:0, l:0, pnl:0 };
    if (parseFloat(t.pnl) > 0) setupData[t.setup].w++; else setupData[t.setup].l++;
    setupData[t.setup].pnl += parseFloat(t.pnl)||0;
  });
  const topSetup = Object.entries(setupData)
    .filter(([,d]) => d.w + d.l >= 3)
    .sort((a,b) => b[1].pnl - a[1].pnl)[0];
  if (topSetup) {
    const wr = Math.round(topSetup[1].w/(topSetup[1].w+topSetup[1].l)*100);
    patterns.push({
      type: 'best_setup', severity: 'positive',
      insight: `"${topSetup[0]}" is your best setup: ${wr}% win rate and $${topSetup[1].pnl.toFixed(0)} total profit from ${topSetup[1].w+topSetup[1].l} trades.`,
      action: `Specialize. Take only "${topSetup[0]}" setups for the next month and see your performance improve.`
    });
  }

  /* ── Overtrading pattern ── */
  const tradeCounts = {};
  journal.forEach(t => {
    const d = (t.date||t.time||'').substring(0,10);
    if (d) tradeCounts[d] = (tradeCounts[d]||0) + 1;
  });
  const overtradeDays = Object.values(tradeCounts).filter(c => c >= 5).length;
  if (overtradeDays >= 3) {
    patterns.push({
      type: 'overtrading', severity: 'high',
      insight: `You traded 5+ times in a single day on ${overtradeDays} different days. Overtrading is statistically shown to reduce performance.`,
      action: 'Set a hard limit: maximum 3 trades per day. Quality over quantity.'
    });
  }

  /* ── Consecutive losses pattern ── */
  let maxStreak = 0, curStreak = 0;
  journal.slice(-30).forEach(t => {
    if (parseFloat(t.pnl) <= 0) { curStreak++; maxStreak = Math.max(maxStreak, curStreak); }
    else curStreak = 0;
  });
  if (maxStreak >= 4) {
    patterns.push({
      type: 'loss_streak', severity: 'high',
      insight: `You had a ${maxStreak}-trade losing streak recently. Your response to consecutive losses directly determines long-term survival.`,
      action: `After 3 consecutive losses, stop trading for the session. Your edge disappears when you are emotional.`
    });
  }

  /* ── R:R achievement pattern ── */
  const rrTrades = journal.filter(t => t.rr && parseFloat(t.rr) > 0);
  if (rrTrades.length >= 5) {
    const avgRR = rrTrades.reduce((a,t) => a + parseFloat(t.rr), 0) / rrTrades.length;
    if (avgRR < 1.5) {
      patterns.push({
        type: 'low_rr', severity: 'high',
        insight: `Your average achieved R:R is only ${avgRR.toFixed(1)}:1. You need at least 1.5:1 to be sustainably profitable even with good win rates.`,
        action: 'Before entering any trade, check: is my TP at least 1.5× my risk? If not, skip the trade.'
      });
    } else if (avgRR >= 2.5) {
      patterns.push({
        type: 'great_rr', severity: 'positive',
        insight: `Excellent! Your average R:R is ${avgRR.toFixed(1)}:1. With this, you only need a 30% win rate to be profitable.`,
        action: 'Maintain this discipline. Your R:R is your greatest edge.'
      });
    }
  }

  return patterns;
}

/* ════════════════════════════════════════════════════════════════
   3. SMART ROUTER
   Decides which level of AI response to generate based on question.
   Returns a response string.
   ════════════════════════════════════════════════════════════════ */
function smartAIResponse(input) {
  const q   = input.toLowerCase().trim();
  const ctx = buildFullContext();

  /* ── Tier 1: Proactive pattern insights ── */
  if (q.match(/my pattern|what pattern|what do you see|analyse me|analyze me|give me insight|diagnose me|what am i doing wrong|tell me everything|full analysis/)) {
    return generatePatternReport(ctx);
  }

  /* ── Tier 2: Contextual level-aware teaching ── */
  if (q.match(/teach me|explain.*simply|i don't understand|i dont understand|what does.*mean|how does.*work|eli5|explain like/)) {
    return generateLevelAwareExplanation(q, ctx);
  }

  /* ── Tier 3: Real-time trade coaching ── */
  if (q.match(/should i take|is this.*setup|good setup|bad setup|what do you think.*trade|evaluate.*setup|rate.*setup/)) {
    return generateTradeCoaching(q, ctx);
  }

  /* ── Tier 4: Inline quiz ── */
  if (q.match(/quiz me|test me|test my knowledge|question me|can you quiz|ask me a question/)) {
    return generateInlineQuiz(ctx);
  }

  /* ── Tier 5: Study plan generator ── */
  if (q.match(/study plan|learning plan|what should i study|curriculum for me|personalized plan|my roadmap/)) {
    return generatePersonalizedStudyPlan(ctx);
  }

  /* ── Tier 6: Emotional support with data ── */
  if (q.match(/i'm frustrated|i am frustrated|losing streak|bad week|bad day|want to quit|feeling down|demotivated/)) {
    return generateEmotionalCoaching(ctx);
  }

  /* ── Tier 7: Journal pattern question ── */
  if (q.match(/best day|worst day|when do i|what time|which pair.*best|best pair|worst pair|best setup|my edge/)) {
    return generatePatternAnswer(q, ctx);
  }

  /* ── Fall through to existing generateResponse ── */
  return null; // null means use existing chatbot.js logic
}

/* ════════════════════════════════════════════════════════════════
   4. PATTERN REPORT
   Full data-driven coaching report from journal patterns
   ════════════════════════════════════════════════════════════════ */
function generatePatternReport(ctx) {
  const { name, patterns, wr, totalPnl, pf, expectancy, planCompliance,
          bestPair, worstPair, bestSetup, allTrades, userTier } = ctx;

  if (allTrades.length < 5) {
    return `${name}, I need at least 5 trades to generate a meaningful pattern report. You have ${allTrades.length} right now. Log more trades and come back — the insights will be worth it. 📊`;
  }

  const criticalPatterns = patterns.filter(p => p.severity === 'critical');
  const highPatterns     = patterns.filter(p => p.severity === 'high');
  const positivePatterns = patterns.filter(p => p.severity === 'positive');

  let report = `<strong>📊 Full Performance Analysis — ${name}</strong><br><br>`;

  // Core numbers
  report += `<strong>The Numbers:</strong><br>`;
  report += `Win Rate: <strong style="color:${wr>=50?'var(--accent)':'var(--red)'}">${wr}%</strong> · `;
  report += `Profit Factor: <strong style="color:${pf>=1?'var(--accent)':'var(--red)'}">${pf.toFixed(2)}</strong> · `;
  report += `Expectancy: <strong style="color:${expectancy>=0?'var(--accent)':'var(--red)'}">${expectancy>=0?'+':''}$${expectancy.toFixed(2)}/trade</strong><br>`;
  if (planCompliance !== null) {
    report += `Plan Compliance: <strong style="color:${planCompliance>=70?'var(--accent)':'var(--red)'}">${planCompliance}%</strong><br>`;
  }
  report += `<br>`;

  // Critical issues first
  if (criticalPatterns.length > 0) {
    report += `<strong style="color:var(--red)">🚨 Critical Issues:</strong><br>`;
    criticalPatterns.forEach(p => {
      report += `• ${p.insight}<br>`;
      report += `<em style="color:var(--txt3)">→ ${p.action}</em><br>`;
    });
    report += `<br>`;
  }

  // High priority patterns
  if (highPatterns.length > 0) {
    report += `<strong style="color:var(--gold)">⚠️ Key Areas to Fix:</strong><br>`;
    highPatterns.slice(0,3).forEach(p => {
      report += `• ${p.insight}<br>`;
      report += `<em style="color:var(--txt3)">→ ${p.action}</em><br>`;
    });
    report += `<br>`;
  }

  // Positive strengths
  if (positivePatterns.length > 0) {
    report += `<strong style="color:var(--accent)">✅ Your Strengths:</strong><br>`;
    positivePatterns.forEach(p => {
      report += `• ${p.insight}<br>`;
    });
    report += `<br>`;
  }

  // If no patterns detected yet
  if (patterns.length === 0) {
    report += `No strong patterns detected yet — you need more data. Log at least 15-20 trades with mood, setup type, and plan compliance filled in. That data is what makes these insights powerful.<br><br>`;
  }

  // One priority action
  const topAction = criticalPatterns[0] || highPatterns[0];
  if (topAction) {
    report += `<strong>🎯 Your #1 Priority This Week:</strong><br>`;
    report += `${topAction.action}`;
  }

  return report;
}

/* ════════════════════════════════════════════════════════════════
   5. LEVEL-AWARE TEACHING
   Same topic, different depth based on user's level
   ════════════════════════════════════════════════════════════════ */
function generateLevelAwareExplanation(q, ctx) {
  const { userTier, name, level } = ctx;

  // Extract what they want explained
  const topicMatch = q.match(/(?:teach me|explain|what is|what does|how does?)\s+(?:simply\s+)?(.{3,40}?)(?:\?|$|simply|like)/);
  const topic = topicMatch ? topicMatch[1].trim() : q.replace(/teach me|explain|eli5/g,'').trim();

  // Level-specific prefix
  const levelPrefix = {
    beginner:     `${name}, since you're building your foundation (Level ${level}), here's the simplest version:`,
    intermediate: `${name}, at Level ${level} you already know the basics. Here's the deeper picture:`,
    advanced:     `${name}, at Level ${level} you'll appreciate the nuance here:`,
    expert:       `${name}, at your Level ${level} expertise, here's the institutional perspective:`,
  }[userTier] || '';

  // Generate topic response through existing generateResponse
  const baseResponse = (typeof generateResponse === 'function') ? generateResponse(topic) : '';

  if (!baseResponse || baseResponse.length < 50) {
    return `${levelPrefix}<br><br>I understand you want to learn about "${topic}". Could you be more specific? For example: "Explain RSI" or "Teach me support and resistance simply."`;
  }

  // Add level-appropriate follow-up
  const followUp = {
    beginner:     `<br><br><em>💡 As a beginner, focus on understanding this concept visually first. Check the Candle Bible and Pattern sections in Learn tab.</em>`,
    intermediate: `<br><br><em>💡 Ready to go deeper? Try applying this in the Practice Terminal with paper trades, then journal your results.</em>`,
    advanced:     `<br><br><em>💡 Advanced tip: combine this with ${topic.includes('rsi') ? 'price action confluence at S/R levels' : 'multi-timeframe analysis'} for higher probability setups.</em>`,
    expert:       `<br><br><em>💡 Expert application: use this as a filter only — your edge comes from setup confluence, not from this indicator alone.</em>`,
  }[userTier] || '';

  return `${levelPrefix}<br><br>${baseResponse}${followUp}`;
}

/* ════════════════════════════════════════════════════════════════
   6. INLINE QUIZ ENGINE
   AI tests user's knowledge and adapts difficulty to their level
   ════════════════════════════════════════════════════════════════ */
const _quizTopics = {
  beginner: [
    { q:'What is a pip in forex trading?', a:'The smallest standard price movement. 0.0001 for most pairs, 0.01 for JPY pairs.', keywords:['0.0001','fourth decimal','price movement','smallest'] },
    { q:'What does a Hammer candlestick tell you?', a:'It shows buyers rejected lower prices — a potential bullish reversal at support.', keywords:['buyers','bullish','reversal','support','lower prices'] },
    { q:'What is the 1% rule in risk management?', a:'Never risk more than 1% of your account on any single trade.', keywords:['1%','account','risk','single trade'] },
    { q:'What is the spread in forex?', a:'The difference between the Bid and Ask price — the broker\'s built-in fee.', keywords:['bid','ask','broker','fee','difference'] },
    { q:'What does leverage do?', a:'It lets you control a larger position with less capital. 100:1 means $1,000 controls $100,000.', keywords:['control','capital','position','borrow'] },
  ],
  intermediate: [
    { q:'What is RSI divergence and why is it powerful?', a:'When price makes a new high/low but RSI does not confirm it — signals weakening momentum before a reversal.', keywords:['divergence','price','rsi','momentum','reversal','confirm'] },
    { q:'Explain the role reversal concept in S&R.', a:'When broken resistance becomes support, or broken support becomes resistance. The retest of a broken level is a high-probability entry.', keywords:['broken','support','resistance','retest','becomes'] },
    { q:'What is the minimum R:R ratio you should take and why?', a:'Minimum 1:2 — this means you only need to win 34% of trades to be profitable.', keywords:['1:2','2:1','34%','profitable','minimum'] },
    { q:'What is a Fair Value Gap in SMC?', a:'A 3-candle imbalance where candle 1 and candle 3 do not overlap — institutions often fill this gap.', keywords:['3 candle','overlap','imbalance','gap','institutions'] },
  ],
  advanced: [
    { q:'What is the Break of Structure in Smart Money Concepts?', a:'Price breaking a significant previous swing high or low — confirming trend continuation. Used to identify when institutions are accumulating.', keywords:['swing','break','continuation','institutional','accumulation'] },
    { q:'Describe the complete SMC 5-step entry model.', a:'1. Identify H4/D1 trend via BOS. 2. Wait for CHOCH on H1. 3. Mark the Order Block. 4. Wait for price to return to OB. 5. Confirm with FVG fill on M15.', keywords:['bos','choch','order block','fvg','h4','h1'] },
    { q:'What is expectancy and how do you calculate it?', a:'Expected profit per trade. Formula: (Win% × Avg Win) minus (Loss% × Avg Loss). Positive expectancy = profitable system.', keywords:['expectancy','win rate','average win','average loss','formula'] },
  ],
};

let _currentQuiz = null;

function generateInlineQuiz(ctx) {
  const { userTier, name } = ctx;
  const pool = _quizTopics[userTier] || _quizTopics.beginner;
  const q    = pool[Math.floor(Math.random() * pool.length)];
  _currentQuiz = q;

  STATE._quizActive = true;
  STATE._quizQuestion = q.q;
  STATE._quizAnswer   = q.a;
  STATE._quizKeywords = q.keywords;

  return `<strong>🎓 Quiz Time, ${name}!</strong><br><br>
<div style="background:var(--accent-bg);border:1px solid var(--bdr);border-radius:var(--rs);padding:12px;margin:4px 0">
<strong style="color:var(--accent)">Question (${userTier} level):</strong><br><br>
${q.q}
</div>
<br>
Type your answer and I'll score it for you. No pressure — this is to help you learn, not judge you. 💪`;
}

function scoreQuizAnswer(userAnswer, ctx) {
  if (!STATE._quizActive || !STATE._quizKeywords) return null;

  const ans = userAnswer.toLowerCase();
  const keywords = STATE._quizKeywords;
  const matched = keywords.filter(k => ans.includes(k.toLowerCase())).length;
  const score   = Math.round((matched / keywords.length) * 100);

  STATE._quizActive = false;
  const xpEarned = score >= 70 ? 15 : score >= 40 ? 8 : 3;
  if (typeof addXP === 'function') addXP(xpEarned);

  let response = '';
  if (score >= 80) {
    response = `✅ <strong style="color:var(--accent)">Excellent!</strong> You clearly understand this concept. +${xpEarned} XP<br><br>`;
    response += `Your answer matched the key concepts well.<br><br>`;
  } else if (score >= 50) {
    response = `🟡 <strong style="color:var(--gold)">Good attempt!</strong> You got the core idea. +${xpEarned} XP<br><br>`;
    response += `You missed some specifics. `;
  } else {
    response = `📚 <strong style="color:var(--red)">Let me help you understand this better.</strong> +${xpEarned} XP<br><br>`;
  }

  response += `<strong>Complete answer:</strong><br>${STATE._quizAnswer}<br><br>`;
  response += `Want another question? Just say "quiz me again" 🎯`;

  STATE._quizQuestion = null;
  STATE._quizAnswer   = null;
  STATE._quizKeywords = null;

  return response;
}

/* ════════════════════════════════════════════════════════════════
   7. PERSONALIZED STUDY PLAN GENERATOR
   Creates a week-by-week learning plan based on user's profile
   ════════════════════════════════════════════════════════════════ */
function generatePersonalizedStudyPlan(ctx) {
  const { name, userTier, completedLessons, totalLess, wr, patterns,
          allTrades, bestSetup, dna, emotionalRisk } = ctx;

  let plan = `<strong>📚 Your Personal Study Plan, ${name}</strong><br><br>`;

  // Diagnose primary weakness
  const hasEmotionIssue = emotionalRisk || patterns.some(p => p.type === 'revenge_trading');
  const hasRRIssue      = patterns.some(p => p.type === 'low_rr');
  const hasPlanIssue    = patterns.some(p => p.type === 'plan_compliance');
  const isBeginner      = userTier === 'beginner' || completedLessons.length < 8;

  plan += `<strong>Based on your data:</strong> Level ${ctx.level} trader · ${completedLessons.length}/${totalLess} lessons · ${wr}% win rate · ${allTrades.length} trades<br><br>`;

  if (isBeginner) {
    plan += `<strong>📌 Weeks 1-2: Foundation</strong><br>
• Complete: Forex Basics → Currency Pairs → Pips & Lots<br>
• Daily: 15 min of flashcards (5-10 cards)<br>
• Practice: 1 sim trade per day, journal it<br>
• Goal: First 5 lessons complete<br><br>`;

    plan += `<strong>📌 Weeks 3-4: Core Skills</strong><br>
• Complete: Support & Resistance → Candlesticks → Risk Management<br>
• Daily: Pattern Game (3 rounds)<br>
• Practice: 2 sim trades, focus on S/R bounce only<br>
• Goal: 100% plan compliance on sim trades<br><br>`;
  } else if (hasEmotionIssue) {
    plan += `<strong>🎯 Priority: Emotional Control (your #1 issue)</strong><br><br>`;
    plan += `<strong>Week 1:</strong> Study Trading Psychology lesson. Write 3 rules for what triggers your revenge trading.<br>
<strong>Week 2:</strong> Implement 30-min break rule after ANY loss. No exceptions. Journal your mood on every trade.<br>
<strong>Week 3:</strong> Review journal — are the post-break trades better? They will be.<br>
<strong>Week 4:</strong> Study the Bias Test. Identify your top 2 biases.<br><br>`;
  } else if (hasRRIssue) {
    plan += `<strong>🎯 Priority: Risk/Reward Improvement</strong><br><br>`;
    plan += `<strong>This week:</strong> Study the Risk/Reward lesson. Use the calculator to plan EVERY trade before entering.<br>
<strong>Rule to add:</strong> Only enter trades where TP is minimum 1.5× your SL distance. No exceptions.<br>
<strong>Daily practice:</strong> On each sim trade, calculate R:R before entering. Journal the actual R:R achieved.<br><br>`;
  } else {
    plan += `<strong>📌 This Week: Deepen Your Edge</strong><br>`;
    if (bestSetup) {
      plan += `• Your best setup is "${bestSetup}" — study everything about it in the Strategy Library<br>`;
    }
    plan += `• Study: ${userTier === 'advanced' ? 'SMC Order Blocks + ICT Kill Zones' : 'Chart Patterns + Multi-timeframe Analysis'}<br>`;
    plan += `• Daily: 3 pattern quiz rounds + 1 flash card session<br>`;
    plan += `• Journal: Tag every trade with setup type and rate your execution 1-5<br><br>`;
  }

  plan += `<strong>📊 Your Weekly Targets:</strong><br>`;
  plan += `• Win rate target: ${Math.min(wr + 10, 65)}% (currently ${wr}%)<br>`;
  plan += `• Journal entries: ${Math.max(5, allTrades.length < 10 ? 5 : 3)} this week<br>`;
  plan += `• Lessons to complete: ${Math.min(3, totalLess - completedLessons.length)}<br>`;
  plan += `• Flashcards: 20 per day`;

  return plan;
}

/* ════════════════════════════════════════════════════════════════
   8. EMOTIONAL COACHING
   Data-driven emotional support — not just generic motivation
   ════════════════════════════════════════════════════════════════ */
function generateEmotionalCoaching(ctx) {
  const { name, wr, allTrades, patterns, streak, userTier, totalPnl } = ctx;

  const revengePattern = patterns.find(p => p.type === 'revenge_trading');
  const lossPattern    = patterns.find(p => p.type === 'loss_streak');

  let response = `${name}, I hear you. Trading is genuinely one of the hardest psychological challenges there is — not because of the math, but because of what it does to your emotions.<br><br>`;

  // Data-based reassurance
  if (allTrades.length > 0) {
    response += `<strong>Here is what your data actually shows:</strong><br>`;
    response += `• You have ${allTrades.length} trades logged — that is ${allTrades.length} data points. That is real work.<br>`;
    response += `• Your win rate is ${wr}% — ${wr >= 40 ? 'that is already in the range where profitable trading is possible with good R:R.' : 'that needs work, but you now have data to improve it specifically.'}<br>`;
    if (streak > 0) response += `• ${streak}-day learning streak — you are showing up. That is 80% of the battle.<br>`;
    response += `<br>`;
  }

  // Specific advice based on their pattern
  if (revengePattern) {
    response += `<strong>Your data shows revenge trading is active.</strong> Here is what to do right now:<br>`;
    response += `1. Close the app for today<br>2. Walk away for 30 minutes<br>3. Tomorrow, before you trade: write down your entry rules and only enter when ALL rules are met<br><br>`;
  } else if (lossPattern) {
    response += `<strong>Loss streaks happen to every trader.</strong> Here is the professional response:<br>`;
    response += `1. Drop position size to 0.25× normal until you get 3 wins<br>2. Review each losing trade: was it your fault or the market?<br>3. If fault = market, your system is fine. If fault = you, identify the specific rule you broke.<br><br>`;
  } else {
    response += `<strong>The traders who made it through this moment:</strong> They did not quit. They reduced size, reviewed their journal, found one specific thing to fix, and returned better.<br><br>`;
  }

  response += `Tell me specifically what happened today and I will help you turn it into a lesson. 💪`;
  return response;
}

/* ════════════════════════════════════════════════════════════════
   9. PATTERN ANSWER
   Specific data-backed answer about user's trading patterns
   ════════════════════════════════════════════════════════════════ */
function generatePatternAnswer(q, ctx) {
  const { patterns, bestPair, worstPair, bestSetup, pairMap, setupMap, name } = ctx;

  if (q.match(/best day|worst day/)) {
    const dayP = patterns.find(p => p.type === 'best_day' || p.type === 'worst_day');
    if (dayP) return `${name}, based on your journal data: ${dayP.insight}<br><br><strong>Action:</strong> ${dayP.action}`;
    return `${name}, I need more journal data to tell you your best/worst day. Make sure you are logging trades with dates, and you need at least 3 trades per day of the week for meaningful statistics.`;
  }

  if (q.match(/best pair|which pair.*best|pair.*best/)) {
    if (bestPair && pairMap[bestPair]) {
      const d = pairMap[bestPair];
      const wr = Math.round(d.wins / d.total * 100);
      return `${name}, your best pair is <strong style="color:var(--accent)">${bestPair}</strong>: $${d.pnl.toFixed(0)} total profit · ${wr}% win rate · ${d.total} trades.<br><br>Consider specializing in ${bestPair} — mastery of one pair beats average performance across many.`;
    }
    return `${name}, tag your trades with pair names in the Journal to get this data. After 10+ trades I can tell you exactly which pair suits you best.`;
  }

  if (q.match(/worst pair/)) {
    if (worstPair && pairMap[worstPair]) {
      const d = pairMap[worstPair];
      return `${name}, your worst pair is <strong style="color:var(--red)">${worstPair}</strong>: $${d.pnl.toFixed(0)} P&L · ${d.total} trades.<br><br>Stop trading ${worstPair} for 30 days. Every time you avoid a bad pair, you save money.`;
    }
  }

  if (q.match(/best setup|setup.*best/)) {
    const setupP = patterns.find(p => p.type === 'best_setup');
    if (setupP) return `${name}, ${setupP.insight}<br><br><strong>Action:</strong> ${setupP.action}`;
    return `${name}, tag your trades with setup types in the Journal (S/R Bounce, EMA Pullback, etc.) to get this data.`;
  }

  if (q.match(/my edge/)) {
    const posPatterns = patterns.filter(p => p.severity === 'positive');
    if (posPatterns.length > 0) {
      return `${name}, your data shows your edge is: ${posPatterns.map(p => p.insight).join(' Also, ')}<br><br>Protect this edge. Don't let bad days erode it.`;
    }
    return `${name}, your edge isn't fully visible yet in your data. Log 20+ trades with full detail (pair, setup, mood, plan, R:R) and I can identify it precisely.`;
  }

  return null;
}

/* ════════════════════════════════════════════════════════════════
   10. PROACTIVE COACH SYSTEM
   Watches for concerning patterns and surfaces warnings
   Called from the chat before the user even asks
   ════════════════════════════════════════════════════════════════ */
function getProactiveAlert() {
  const ctx = buildFullContext();
  const { allTrades, emotionalRisk, patterns, streak, name } = ctx;
  const j = STATE.journal || [];

  // Recent losing streak
  const last5 = [...(STATE.journal||[]), ...(STATE.simTrades||[])].slice(-5);
  const last5Losses = last5.filter(t => parseFloat(t.pnl) <= 0).length;
  if (last5Losses >= 4) {
    return `⚠️ <strong style="color:var(--red)">Heads up, ${name}:</strong> You have lost 4 of your last 5 trades. Before opening any new positions, review what went wrong. Revenge trading from here is the #1 account killer.`;
  }

  // Emotional risk from recent journal
  if (emotionalRisk) {
    return `🧠 <strong style="color:var(--gold)">Emotional pattern detected:</strong> Recent entries show frustration or revenge trading. Your win rate drops sharply in this state. Consider taking a break before the next trade.`;
  }

  // Streak at risk
  if (streak > 5 && STATE.dailyCheckIn !== new Date().toDateString()) {
    return `🔥 <strong style="color:var(--accent)">Streak check:</strong> You are on a ${streak}-day streak! Don't forget to log in and study today to keep it alive.`;
  }

  // Long gap since journalling
  if (j.length > 0) {
    const lastEntry = new Date(j[j.length-1].date || j[j.length-1].time || 0);
    const daysSince = Math.round((Date.now() - lastEntry.getTime()) / 86400000);
    if (daysSince >= 5) {
      return `📓 <strong style="color:var(--gold)">Journal gap:</strong> You have not logged a trade in ${daysSince} days. Even review sessions deserve an entry — what did you practice or learn?`;
    }
  }

  return null;
}

/* ════════════════════════════════════════════════════════════════
   EXPORT — WIRE INTO MENTOR/FLOAT CHAT
   generateSmartResponse() is the single entry point.
   It tries smart routing first, falls back to existing logic.
   ════════════════════════════════════════════════════════════════ */
function generateSmartResponse(input) {
  const q = input.toLowerCase().trim();

  // Check if user is answering a quiz
  if (STATE._quizActive && STATE._quizKeywords) {
    const score = scoreQuizAnswer(input, buildFullContext());
    if (score) return score;
  }

  // Try smart router first
  const smartResp = smartAIResponse(input);
  if (smartResp) return smartResp;

  // Fall back to existing 3-tier chain
  try {
    if (typeof generateFloatResponse === 'function') {
      const r = generateFloatResponse(input);
      if (r && r !== 'undefined') return r;
    }
    if (typeof generateEnhancedResponse === 'function') {
      const r = generateEnhancedResponse(input);
      if (r && r !== 'undefined') return r;
    }
    if (typeof generateResponse === 'function') {
      return generateResponse(input);
    }
  } catch(e) {
    console.warn('AI error:', e);
    return typeof generateResponse === 'function' ? generateResponse(input) : 'Ask me anything about trading!';
  }

  return typeof generateResponse === 'function' ? generateResponse(input) : 'Ask me anything about trading!';
}

console.log('✅ AI Brain loaded: Pattern Detection, Quiz Engine, Level-Aware Teaching, Study Plans, Emotional Coaching');
