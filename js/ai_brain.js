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
   8. PREDICTIVE ENGINE — forecasts trade outcomes
   9. PATTERN EVOLUTION — learns which interventions work
   10. MARKET REGIME DETECTION — adapts to market conditions
   11. PERSONALITY ADAPTATION — tailors coaching style to user
   12. CONTINUOUS LEARNING — self-optimizes over time
   ═══════════════════════════════════════════════════════════════ */

/* ============== AI ENHANCEMENTS INIT ============== */
if (!STATE.predictionModel) {
    STATE.predictionModel = {
        tradeOutcomePredictor: null,
        tiltPredictor: null,
        optimalSessionPredictor: null,
        accuracy: { trades: 0, tilt: 0 },
        trainingData: [],
        lastPrediction: null
    };
}

if (!STATE.patternEvolution) {
    STATE.patternEvolution = {
        interventions: [],
        effectivePatterns: {},
        ignoredPatterns: {},
        adaptationRate: 0.7
    };
}

if (!STATE.marketRegime) {
    STATE.marketRegime = {
        current: 'unknown',
        confidence: 0,
        lastUpdate: null,
        regimeHistory: []
    };
}

if (!STATE.personalityProfile) {
    STATE.personalityProfile = {
        style: 'balanced',
        adaptationHistory: [],
        detectedPreferences: {
            likesData: null,
            likesEncouragement: null,
            likesDirectness: null,
            likesExamples: null
        },
        responseToStyles: {}
    };
}

if (!STATE.learningLoop) {
    STATE.learningLoop = {
        lastOptimization: null,
        improvementMetrics: {
            responseHelpfulness: [],
            patternAccuracy: [],
            userRetention: [],
            quizPerformance: []
        },
        learningRate: 0.1,
        version: 1
    };
}
/* ============== END OF INIT ============== */

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

  /* ============== ENHANCED CONTEXT FIELDS ============== */
  const ctx = {
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
  
  const prediction = predictNextTrade ? predictNextTrade(ctx) : null;
  const marketRegime = detectMarketRegime ? detectMarketRegime(ctx) : 'unknown';
  const learningVelocity = calculateLearningVelocity ? calculateLearningVelocity(ctx) : null;
  const riskScore = calculateRiskScore ? calculateRiskScore(ctx) : 0;
  const nextMilestone = calculateNextMilestone ? calculateNextMilestone(ctx) : null;
  const preferredStyle = detectPreferredStyle ? detectPreferredStyle() : 'balanced';
  
  return {
    ...ctx,
    prediction: prediction,
    modelAccuracy: STATE.predictionModel?.accuracy?.trades || 0,
    marketRegime: marketRegime,
    marketAdvice: getMarketRegimeAdvice ? getMarketRegimeAdvice(marketRegime) : null,
    preferredStyle: preferredStyle,
    learningVelocity: learningVelocity,
    riskScore: riskScore,
    nextMilestone: nextMilestone
  };
}

/* ============== HELPER FUNCTIONS ============== */
function average(arr) {
    return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
}

function encodeMoodForML(mood) {
    const moodMap = {
        'calm': 1, 'confident': 2, 'focused': 3,
        'neutral': 0, 'anxious': -1, 'frustrated': -2,
        'revenge': -3, 'greedy': -2, 'angry': -3
    };
    return moodMap[mood?.toLowerCase()] || 0;
}

function calculateRollingWR(trades, currentIdx, window) {
    const start = Math.max(0, currentIdx - window);
    const slice = trades.slice(start, currentIdx);
    if (slice.length === 0) return 50;
    const wins = slice.filter(t => parseFloat(t.pnl) > 0).length;
    return Math.round(wins / slice.length * 100);
}

function calculateConsecutiveLosses(trades, currentIdx) {
    let streak = 0;
    for (let i = currentIdx - 1; i >= 0; i--) {
        if (parseFloat(trades[i].pnl) <= 0) streak++;
        else break;
    }
    return streak;
}
/* ============== END OF HELPER FUNCTIONS ============== */

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

  /* ── Personality detection ── */
  if (STATE.chatHistory?.length % 10 === 0) {
    detectPreferredStyle();
  }

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

/* ============== SECTION 11: PREDICTIVE INTELLIGENCE ENGINE ============== */
/* ════════════════════════════════════════════════════════════════
   11. PREDICTIVE INTELLIGENCE ENGINE
   ════════════════════════════════════════════════════════════════ */

function trainPredictionModel() {
    const trades = STATE.journal || [];
    if (trades.length < 15) return;
    
    const features = trades.map((t, i) => {
        const prevTrades = trades.slice(Math.max(0, i-3), i);
        const prevWins = prevTrades.filter(p => parseFloat(p.pnl) > 0).length;
        
        return {
            hour: new Date(t.date || t.time).getHours(),
            dayOfWeek: new Date(t.date || t.time).getDay(),
            pair: t.pair || 'unknown',
            setup: t.setup || 'unknown',
            mood: encodeMoodForML(t.mood),
            planFollowed: t.plan === 'yes' ? 1 : 0,
            rr: parseFloat(t.rr) || 0,
            winRateLast5: calculateRollingWR(trades, i, 5),
            consecutiveLosses: calculateConsecutiveLosses(trades, i),
            prevTradePnl: i > 0 ? parseFloat(trades[i-1].pnl) : 0,
            prev3Wins: prevWins,
            outcome: parseFloat(t.pnl) > 0 ? 1 : 0
        };
    }).filter(f => f.outcome !== undefined);
    
    const model = buildNaiveBayesModel(features);
    STATE.predictionModel.tradeOutcomePredictor = model;
    
    const validationSize = Math.floor(features.length * 0.2);
    const validationSet = features.slice(-validationSize);
    const correct = validationSet.filter(f => {
        const pred = predictTradeOutcome(f, model);
        return pred === f.outcome;
    }).length;
    
    STATE.predictionModel.accuracy.trades = validationSize > 0 
        ? Math.round(correct / validationSize * 100) 
        : 0;
}

function buildNaiveBayesModel(features) {
    const wins = features.filter(f => f.outcome === 1);
    const losses = features.filter(f => f.outcome === 0);
    
    return {
        priorWin: wins.length / features.length,
        priorLoss: losses.length / features.length,
        avgWinFeatures: {
            hour: average(wins.map(f => f.hour)),
            dayOfWeek: average(wins.map(f => f.dayOfWeek)),
            mood: average(wins.map(f => f.mood)),
            planFollowed: average(wins.map(f => f.planFollowed)),
            rr: average(wins.map(f => f.rr)),
            winRateLast5: average(wins.map(f => f.winRateLast5)),
            prev3Wins: average(wins.map(f => f.prev3Wins))
        },
        avgLossFeatures: {
            hour: average(losses.map(f => f.hour)),
            dayOfWeek: average(losses.map(f => f.dayOfWeek)),
            mood: average(losses.map(f => f.mood)),
            planFollowed: average(losses.map(f => f.planFollowed)),
            rr: average(losses.map(f => f.rr)),
            winRateLast5: average(losses.map(f => f.winRateLast5)),
            prev3Wins: average(losses.map(f => f.prev3Wins))
        }
    };
}

function predictTradeOutcome(features, model) {
    if (!model) return null;
    
    let winScore = model.priorWin;
    let lossScore = model.priorLoss;
    
    Object.keys(model.avgWinFeatures).forEach(key => {
        const winAvg = model.avgWinFeatures[key];
        const lossAvg = model.avgLossFeatures[key];
        const value = features[key];
        
        if (Math.abs(value - winAvg) < Math.abs(value - lossAvg)) {
            winScore *= 1.2;
        } else {
            lossScore *= 1.2;
        }
    });
    
    return winScore > lossScore ? 1 : 0;
}

function predictNextTrade(ctx) {
    if (!STATE.predictionModel?.tradeOutcomePredictor || ctx.allTrades.length < 15) {
        return null;
    }
    
    const lastTrades = ctx.allTrades.slice(-5);
    const prevWins = lastTrades.filter(t => parseFloat(t.pnl) > 0).length;
    
    const features = {
        hour: new Date().getHours(),
        dayOfWeek: new Date().getDay(),
        pair: ctx.bestPair || 'unknown',
        setup: ctx.bestSetup || 'unknown',
        mood: ctx.recentMoods[ctx.recentMoods.length - 1] || 'neutral',
        planFollowed: ctx.planCompliance > 70 ? 1 : 0.5,
        rr: ctx.avgWin / ctx.avgLoss || 1.5,
        winRateLast5: prevWins * 20,
        consecutiveLosses: calculateConsecutiveLosses(ctx.allTrades, ctx.allTrades.length - 1),
        prevTradePnl: ctx.allTrades.length ? parseFloat(ctx.allTrades[ctx.allTrades.length - 1].pnl) : 0,
        prev3Wins: prevWins
    };
    
    const prediction = predictTradeOutcome(features, STATE.predictionModel.tradeOutcomePredictor);
    const confidence = STATE.predictionModel.accuracy.trades || 70;
    
    return {
        willWin: prediction === 1,
        confidence: confidence,
        features: features
    };
}

/* ============== SECTION 12: PATTERN EVOLUTION ENGINE ============== */
/* ════════════════════════════════════════════════════════════════
   12. PATTERN EVOLUTION ENGINE
   ════════════════════════════════════════════════════════════════ */

function trackInterventionFollowThrough(patternType, adviceGiven) {
    const intervention = {
        pattern: patternType,
        advice: adviceGiven.substring(0, 100),
        date: new Date().toISOString(),
        followed: null,
        outcome: null
    };
    
    STATE.patternEvolution.interventions.push(intervention);
    
    setTimeout(() => {
        checkInterventionEffectiveness(intervention);
    }, 3 * 86400000);
}

function checkInterventionEffectiveness(intervention) {
    const ctx = buildFullContext();
    const trades = ctx.allTrades || [];
    
    const postTrades = trades.filter(t => 
        new Date(t.date || t.time) > new Date(intervention.date)
    );
    
    if (postTrades.length < 3) return;
    
    const patternImproved = evaluatePatternImprovement(intervention.pattern, postTrades);
    
    intervention.followed = true;
    intervention.outcome = patternImproved ? 'positive' : 'neutral';
    
    if (patternImproved) {
        STATE.patternEvolution.effectivePatterns[intervention.pattern] = 
            (STATE.patternEvolution.effectivePatterns[intervention.pattern] || 0) + 1;
    } else {
        STATE.patternEvolution.ignoredPatterns[intervention.pattern] = 
            (STATE.patternEvolution.ignoredPatterns[intervention.pattern] || 0) + 1;
    }
}

function evaluatePatternImprovement(patternType, trades) {
    const winRate = trades.filter(t => parseFloat(t.pnl) > 0).length / trades.length * 100;
    return winRate > 50;
}

function evolvePatternAdvice(pattern, originalAdvice, ctx) {
    const evolution = STATE.patternEvolution;
    const patternType = pattern.type;
    
    if (evolution.effectivePatterns[patternType] < (evolution.ignoredPatterns[patternType] || 0)) {
        return `${originalAdvice} <br><br><em>Note: You've ignored this advice before. I'm being more direct: This is costing you money. Set a calendar reminder to review this in 1 week.</em>`;
    }
    
    if (evolution.effectivePatterns[patternType] > 2) {
        return `${originalAdvice} <br><br><em>🔥 This advice has proven profitable for you ${evolution.effectivePatterns[patternType]} times. Trust the pattern.</em>`;
    }
    
    return originalAdvice;
}

/* ============== SECTION 13: MARKET REGIME DETECTION ============== */
/* ════════════════════════════════════════════════════════════════
   13. MARKET REGIME DETECTION
   ════════════════════════════════════════════════════════════════ */

function detectMarketRegime(ctx) {
    const trades = ctx.allTrades || [];
    if (trades.length < 10) return 'unknown';
    
    const recent = trades.slice(-20);
    const pnls = recent.map(t => Math.abs(parseFloat(t.pnl) || 0));
    const avgMove = average(pnls);
    const volatility = avgMove / (ctx.avgWin || 1);
    
    const winRate = ctx.wr / 100;
    const winRateVolatility = calculateWinRateVolatility(recent);
    
    if (volatility > 2.0 && winRateVolatility > 0.3) {
        return 'volatile';
    } else if (winRate > 0.6 && winRateVolatility < 0.2) {
        return 'trending';
    } else if (winRate < 0.4 && winRateVolatility < 0.2) {
        return 'ranging';
    } else if (volatility < 0.8) {
        return 'quiet';
    }
    
    return 'mixed';
}

function calculateWinRateVolatility(trades) {
    if (trades.length < 5) return 1;
    
    const windows = [];
    for (let i = 0; i <= trades.length - 5; i++) {
        const window = trades.slice(i, i + 5);
        const wins = window.filter(t => parseFloat(t.pnl) > 0).length;
        windows.push(wins / 5);
    }
    
    const avg = average(windows);
    const variance = average(windows.map(w => Math.pow(w - avg, 2)));
    return Math.sqrt(variance);
}

const MARKET_ADVICE = {
    volatile: {
        title: "🌪️ Volatile Market Detected",
        advice: "Your recent trades show high volatility. In these conditions:",
        bullets: [
            "Reduce position size by 50%",
            "Widen stops (volatility will hit tight stops)",
            "Focus on 1-2 pairs only",
            "Avoid holding through news events"
        ]
    },
    trending: {
        title: "📈 Trending Market Detected",
        advice: "Your win rate suggests a trending market:",
        bullets: [
            "This is your edge — trade with trend",
            "Consider adding to winning positions",
            "Trailing stops work well here",
            "Avoid counter-trend setups entirely"
        ]
    },
    ranging: {
        title: "📊 Ranging Market Detected",
        advice: "The market appears to be ranging:",
        bullets: [
            "Focus on support/resistance bounces",
            "Take profits faster (trend fades quickly)",
            "Use oscillators like RSI for entries",
            "Consider mean reversion strategies"
        ]
    },
    quiet: {
        title: "😴 Quiet Market Detected",
        advice: "Low volatility environment:",
        bullets: [
            "Wait for breakout before committing",
            "Reduce frequency (fewer quality setups)",
            "Check higher timeframe for direction",
            "Be patient — best trades come later"
        ]
    }
};

function getMarketRegimeAdvice(regime) {
    return MARKET_ADVICE[regime] || null;
}

/* ============== SECTION 14: PERSONALITY ADAPTATION ENGINE ============== */
/* ════════════════════════════════════════════════════════════════
   14. PERSONALITY ADAPTATION ENGINE
   ════════════════════════════════════════════════════════════════ */

const PERSONALITY_STYLES = {
    gentle: {
        tone: "warm and supportive",
        prefixes: ["I understand", "It's okay to", "Everyone struggles with"],
        emphasis: "encouragement and patience",
        emoji: "💙"
    },
    balanced: {
        tone: "professional and clear",
        prefixes: ["Here's what I see", "The data shows", "Consider this"],
        emphasis: "balanced perspective",
        emoji: "⚖️"
    },
    direct: {
        tone: "straightforward and firm",
        prefixes: ["Stop", "This is costing you", "Here's the truth"],
        emphasis: "direct action",
        emoji: "🎯"
    },
    analytical: {
        tone: "data-driven and precise",
        prefixes: ["Statistically", "The numbers indicate", "Probability suggests"],
        emphasis: "hard numbers",
        emoji: "📊"
    },
    motivational: {
        tone: "energetic and inspiring",
        prefixes: ["You've got this", "Champions handle this by", "Level up by"],
        emphasis: "growth mindset",
        emoji: "🔥"
    }
};

function detectPreferredStyle(interactions = STATE.chatHistory || []) {
    if (interactions.length < 10) return 'balanced';
    
    const userResponses = interactions.filter(m => m.role === 'user').slice(-20);
    const botResponses = interactions.filter(m => m.role === 'bot').slice(-20);
    
    const styleEngagement = {};
    
    botResponses.forEach((bot, i) => {
        if (!bot.style) return;
        
        const nextUser = userResponses.find(u => u.timestamp > bot.timestamp);
        if (!nextUser) return;
        
        const engaged = nextUser.text.length > 30 || 
                       nextUser.text.includes('?') || 
                       nextUser.text.toLowerCase().includes('thanks');
        
        styleEngagement[bot.style] = styleEngagement[bot.style] || { shown: 0, engaged: 0 };
        styleEngagement[bot.style].shown++;
        if (engaged) styleEngagement[bot.style].engaged++;
    });
    
    let bestStyle = 'balanced';
    let bestRate = 0;
    
    Object.entries(styleEngagement).forEach(([style, data]) => {
        if (data.shown >= 3) {
            const rate = data.engaged / data.shown;
            if (rate > bestRate) {
                bestRate = rate;
                bestStyle = style;
            }
        }
    });
    
    STATE.personalityProfile.detectedPreferences.style = bestStyle;
    return bestStyle;
}

function adaptResponseToPersonality(response, ctx, baseStyle = null) {
    const preferredStyle = baseStyle || STATE.personalityProfile.detectedPreferences.style || 'balanced';
    const style = PERSONALITY_STYLES[preferredStyle];
    
    if (!style || response.length < 50) return response;
    
    const hasPrefix = style.prefixes.some(p => response.includes(p));
    if (!hasPrefix && Math.random() > 0.5) {
        const prefix = style.prefixes[Math.floor(Math.random() * style.prefixes.length)];
        response = `${prefix} ${response.toLowerCase()}`;
    }
    
    if (!response.includes(style.emoji) && Math.random() > 0.3) {
        response = `${style.emoji} ${response}`;
    }
    
    STATE.personalityProfile.adaptationHistory.push({
        style: preferredStyle,
        timestamp: new Date(),
        responseLength: response.length
    });
    
    return response;
}

/* ============== SECTION 15: CONTINUOUS LEARNING LOOP ============== */
/* ════════════════════════════════════════════════════════════════
   15. CONTINUOUS LEARNING LOOP
   ════════════════════════════════════════════════════════════════ */

function runLearningOptimization() {
    const ctx = buildFullContext();
    const chatHistory = STATE.chatHistory || [];
    const interactions = chatHistory.length;
    
    if (interactions < 50) return;
    
    const lastRun = STATE.learningLoop.lastOptimization;
    if (lastRun && (Date.now() - lastRun) < 7 * 86400000) return;
    
    console.log('🧠 Running AI self-optimization...');
    
    const responseAnalysis = analyzeResponseEffectiveness(chatHistory);
    adjustPatternThresholds(responseAnalysis);
    updatePersonalityWeights(responseAnalysis);
    pruneIneffectivePatterns();
    
    STATE.learningLoop.lastOptimization = Date.now();
    STATE.learningLoop.version++;
    
    console.log(`✅ AI optimized to version ${STATE.learningLoop.version}`);
}

function analyzeResponseEffectiveness(chatHistory) {
    const analysis = {
        patternResponses: { shown: 0, engaged: 0 },
        quizResponses: { shown: 0, engaged: 0 },
        teachingResponses: { shown: 0, engaged: 0 },
        emotionalResponses: { shown: 0, engaged: 0 }
    };
    
    for (let i = 0; i < chatHistory.length - 1; i++) {
        const bot = chatHistory[i];
        const user = chatHistory[i + 1];
        
        if (bot.role !== 'bot' || user.role !== 'user') continue;
        
        let category = 'other';
        if (bot.text.includes('pattern-card') || bot.text.includes('Pattern Report')) {
            category = 'patternResponses';
        } else if (bot.text.includes('Quiz Time') || bot.text.includes('scoreQuizAnswer')) {
            category = 'quizResponses';
        } else if (bot.text.includes('teach') || bot.text.includes('explain')) {
            category = 'teachingResponses';
        } else if (bot.text.includes('EMERGENCY') || bot.text.includes('emotional')) {
            category = 'emotionalResponses';
        }
        
        if (category !== 'other') {
            analysis[category].shown++;
            if (user.text.length > 15) {
                analysis[category].engaged++;
            }
        }
    }
    
    return analysis;
}

function adjustPatternThresholds(analysis) {
    if (analysis.patternResponses.shown > 10) {
        const engageRate = analysis.patternResponses.engaged / analysis.patternResponses.shown;
        
        if (engageRate < 0.3) {
            STATE.learningLoop.learningRate = Math.min(0.3, STATE.learningLoop.learningRate + 0.05);
            console.log('⚙️ Increasing pattern detection threshold');
        } else if (engageRate > 0.7) {
            STATE.learningLoop.learningRate = Math.max(0.05, STATE.learningLoop.learningRate - 0.02);
            console.log('⚙️ Decreasing pattern detection threshold');
        }
    }
}

function updatePersonalityWeights(analysis) {
    let bestCategory = null;
    let bestRate = 0;
    
    Object.entries(analysis).forEach(([cat, data]) => {
        if (data.shown >= 5) {
            const rate = data.engaged / data.shown;
            if (rate > bestRate) {
                bestRate = rate;
                bestCategory = cat;
            }
        }
    });
    
    const styleMap = {
        patternResponses: 'analytical',
        quizResponses: 'motivational',
        teachingResponses: 'balanced',
        emotionalResponses: 'gentle'
    };
    
    if (bestCategory && styleMap[bestCategory]) {
        STATE.personalityProfile.responseToStyles[styleMap[bestCategory]] = 
            (STATE.personalityProfile.responseToStyles[styleMap[bestCategory]] || 0) + 1;
    }
}

function pruneIneffectivePatterns() {
    const patterns = STATE.patternEvolution?.interventions || [];
    if (patterns.length < 20) return;
    
    const patternEffectiveness = {};
    
    patterns.forEach(p => {
        if (!patternEffectiveness[p.pattern]) {
            patternEffectiveness[p.pattern] = { total: 0, effective: 0 };
        }
        patternEffectiveness[p.pattern].total++;
        if (p.outcome === 'positive') {
            patternEffectiveness[p.pattern].effective++;
        }
    });
    
    Object.entries(patternEffectiveness).forEach(([pattern, data]) => {
        if (data.total >= 5 && data.effective / data.total < 0.2) {
            console.log(`📉 Pattern "${pattern}" only ${Math.round(data.effective/data.total*100)}% effective - consider revising`);
        }
    });
}

/* ============== SECTION 16: ENHANCED CONTEXT CALCULATIONS ============== */
/* ════════════════════════════════════════════════════════════════
   16. ENHANCED CONTEXT CALCULATIONS
   ════════════════════════════════════════════════════════════════ */

function calculateLearningVelocity(ctx) {
    const trades = ctx.allTrades || [];
    if (trades.length < 20) return null;
    
    const half = Math.floor(trades.length / 2);
    const firstHalf = trades.slice(0, half);
    const secondHalf = trades.slice(half);
    
    const firstWR = firstHalf.filter(t => parseFloat(t.pnl) > 0).length / firstHalf.length * 100;
    const secondWR = secondHalf.filter(t => parseFloat(t.pnl) > 0).length / secondHalf.length * 100;
    
    return {
        direction: secondWR > firstWR ? 'improving' : 'declining',
        rate: Math.round(secondWR - firstWR),
        firstWR: Math.round(firstWR),
        secondWR: Math.round(secondWR)
    };
}

function calculateRiskScore(ctx) {
    let score = 0;
    
    if (ctx.emotionalRisk) score += 20;
    score += (ctx.recentMoods.filter(m => ['revenge','angry'].includes(m)).length * 5);
    
    if (ctx.avgLoss > ctx.avgWin * 1.5) score += 15;
    if (ctx.planCompliance < 50) score += 15;
    
    if (ctx.marketRegime === 'volatile') score += 15;
    if (ctx.marketRegime === 'unknown') score += 10;
    
    if (ctx.allTrades.length > 10) {
        const last3Days = ctx.allTrades.filter(t => 
            new Date(t.date || t.time) > new Date(Date.now() - 3*86400000)
        ).length;
        if (last3Days > 10) score += 20;
    }
    
    return Math.min(100, score);
}

function calculateNextMilestone(ctx) {
    const milestones = [
        { level: 2, requirement: 'Complete 5 lessons', progress: ctx.completedLessons.length },
        { level: 3, requirement: 'Log 20 trades', progress: ctx.allTrades.length },
        { level: 4, requirement: '70%+ plan compliance', progress: ctx.planCompliance || 0 },
        { level: 5, requirement: '1.5+ profit factor', progress: ctx.pf * 100 }
    ];
    
    const next = milestones.find(m => 
        (m.level > ctx.level) && 
        (typeof m.progress === 'number' ? m.progress < parseInt(m.requirement) : true)
    );
    
    if (!next) return null;
    
    const reqValue = parseInt(next.requirement) || 100;
    const progress = typeof next.progress === 'number' 
        ? Math.min(100, Math.round(next.progress / reqValue * 100))
        : 0;
    
    return {
        level: next.level,
        requirement: next.requirement,
        progress: progress,
        remaining: next.requirement.includes('%') 
            ? `${parseInt(next.requirement) - next.progress}%`
            : parseInt(next.requirement) - next.progress
    };
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
/* ═══════════════════════════════════════════════════════════════
   MENTOR MEMORY ENGINE
   Gives TradeMind genuine continuity across sessions.
   Stores observations, references past conversations naturally.
   ═══════════════════════════════════════════════════════════════ */

function _mm() { return STATE.mentorMemory || {}; }

/* Called when the mentor screen opens — builds session greeting */
function buildSessionGreeting() {
  const ctx = buildFullContext();
  const { name, allTrades, wr, streak, patterns, userTier } = ctx;
  const mm = _mm();
  const now = new Date();
  const hr = now.getHours();
  const today = now.toDateString();
  const isNewDay = mm.lastSessionDate !== today;

  // Update session tracking
  if (!STATE.mentorMemory) STATE.mentorMemory = {};
  STATE.mentorMemory.lastSessionDate = today;
  STATE.mentorMemory.sessionsTotal = (mm.sessionsTotal || 0) + (isNewDay ? 1 : 0);

  const timeGreet = hr < 12 ? 'morning' : hr < 17 ? 'afternoon' : 'evening';
  const sessions = mm.sessionsTotal || 1;

  // First ever session
  if (sessions <= 1 && allTrades.length === 0) {
    return `Good ${timeGreet}, ${name}! I'm TradeMind — and I want to be upfront with you: I'm not just a FAQ bot. I actually read your journal, track your patterns, and remember what we talk about. The more you use the app, the sharper my coaching gets.<br><br>What's on your mind today? You can ask me anything — forex concepts, your trading performance, or just tell me how your last trade went.`;
  }

  // Reference last session topics if returning
  const lastTopics = mm.lastTopics || [];
  const lastNote = (mm.notes || []).slice(-1)[0];
  const recentLoss = allTrades.slice(-3).filter(t => parseFloat(t.pnl) < 0).length >= 2;
  const critPattern = patterns.find(p => p.severity === 'critical');
  const highPattern = patterns.find(p => p.severity === 'high');

  let greeting = `Good ${timeGreet}, ${name}. `;

  // Reference something specific from last time
  if (lastTopics.length > 0 && isNewDay) {
    const topic = lastTopics[lastTopics.length - 1];
    const topicRefs = {
      'rsi': `Last time we talked about RSI — did you get a chance to spot any divergences on the chart?`,
      'smc': `We got into SMC order blocks last session. Any setups you identified since then?`,
      'risk_management': `We covered risk management last time. How has your position sizing been going?`,
      'psychology': `We talked about trading psychology last session. How's the mental side been treating you?`,
      'support_resistance': `We discussed S&R levels last time. Seen any clean bounces lately?`,
      'fibonacci': `We covered Fibonacci last session. Try applying it to any recent charts?`,
    };
    const ref = topicRefs[topic] || `Last session we covered ${topic.replace(/_/g,' ')}.`;
    greeting += ref;
  } else if (recentLoss && isNewDay) {
    greeting += `I noticed your last couple of trades didn't go to plan. That happens to everyone — the question is what we learn from it. How are you feeling about it?`;
  } else if (critPattern) {
    greeting += `There's something important in your data I want to flag: ${critPattern.insight.split('.')[0]}. Want to dig into that?`;
  } else if (allTrades.length > 0 && isNewDay) {
    const lastTrade = allTrades[allTrades.length - 1];
    const pnl = parseFloat(lastTrade.pnl) || 0;
    if (pnl > 0) {
      greeting += `Good to see you — your last trade on ${lastTrade.pair || 'the charts'} was a win. Let's keep that going.`;
    } else {
      greeting += `Welcome back. ${allTrades.length} trades in the journal — that data is starting to tell a real story.`;
    }
  } else {
    greeting += `Good to have you back.`;
  }

  // Add a proactive note if relevant
  const proAlert = getProactiveAlert(true);
  if (proAlert && proAlert.compact) {
    greeting += `<br><br>${proAlert.compact}`;
  }

  return greeting;
}

/* Save a memory note about the user */
function saveMentorNote(text, topic) {
  if (!STATE.mentorMemory) STATE.mentorMemory = {};
  if (!STATE.mentorMemory.notes) STATE.mentorMemory.notes = [];
  STATE.mentorMemory.notes.push({ text, topic: topic || 'general', date: new Date().toISOString() });
  if (STATE.mentorMemory.notes.length > 20) STATE.mentorMemory.notes.shift();
}

/* Track topic asked about */
function trackTopic(topic) {
  if (!STATE.mentorMemory) STATE.mentorMemory = {};
  if (!STATE.mentorMemory.askedAbout) STATE.mentorMemory.askedAbout = {};
  STATE.mentorMemory.askedAbout[topic] = (STATE.mentorMemory.askedAbout[topic] || 0) + 1;
  if (!STATE.mentorMemory.lastTopics) STATE.mentorMemory.lastTopics = [];
  STATE.mentorMemory.lastTopics.push(topic);
  if (STATE.mentorMemory.lastTopics.length > 10) STATE.mentorMemory.lastTopics.shift();
}

/* What topics has this user asked about most? */
function getTopUserTopics() {
  const asked = _mm().askedAbout || {};
  return Object.entries(asked).sort((a,b) => b[1] - a[1]).slice(0,3).map(e => e[0]);
}

/* ═══════════════════════════════════════════════════════════════
   PROACTIVE INTERVENTION ENGINE — upgraded
   Autonomous interventions, not just alerts on greeting.
   ═══════════════════════════════════════════════════════════════ */

function getProactiveAlert(compactMode) {
  const ctx = buildFullContext();
  const { allTrades, emotionalRisk, patterns, streak, name, wr, planCompliance } = ctx;
  const j = STATE.journal || [];
  const pro = STATE.proactive || {};
  const today = new Date().toDateString();
  const dismissed = pro.dismissedToday || [];

  // Don't fire same intervention twice today
  const canFire = type => !dismissed.includes(type);

  // ── CRITICAL: 3+ consecutive losses (highest priority) ──
  const last5 = allTrades.slice(-5);
  const consecLosses = (() => {
    let n = 0;
    for (let i = allTrades.length - 1; i >= 0; i--) {
      if (parseFloat(allTrades[i].pnl) <= 0) n++; else break;
    }
    return n;
  })();

  if (consecLosses >= 3 && canFire('consec_losses')) {
    const msg = {
      type: 'consec_losses',
      severity: 'critical',
      title: `${consecLosses} losses in a row`,
      body: `${name}, you have lost ${consecLosses} trades in a row. I want to be direct with you: the statistically correct move right now is to stop trading today. Not because you are a bad trader — because every professional has a daily loss limit, and yours has been hit.<br><br>
<strong>What to do instead:</strong><br>
• Close the trade screen<br>
• Review what happened in each of those ${consecLosses} trades<br>
• Write one honest sentence about what you would do differently<br>
• Come back fresh tomorrow<br><br>
The traders who survive long-term are not the most talented — they are the ones who protect their capital on bad days.`,
      cta: "Understood — I'll step away",
      ctaAction: `dismissIntervention('consec_losses');navigate('journal')`,
      compact: `⚠️ ${consecLosses} losses in a row — consider stepping away for today.`,
    };
    if (!compactMode) return msg;
    return { compact: msg.compact };
  }

  // ── HIGH: Emotional state before trading ──
  if (emotionalRisk && canFire('emotional_risk')) {
    const revengeCount = j.slice(-5).filter(t => t.mood === 'revenge').length;
    const msg = {
      type: 'emotional_risk',
      severity: 'high',
      title: 'Emotional trading pattern active',
      body: `${name}, your recent journal entries show ${revengeCount > 0 ? `${revengeCount} revenge trade${revengeCount>1?'s':''} logged` : 'frustration or greed in your mood entries'}. Here is the hard data: emotional trades in your journal have a ${_emotionalWinRate(j)}% win rate, compared to your overall ${wr}% rate when calm.<br><br>
This is not a character flaw — it's brain chemistry. The fix is mechanical:<br>
1. Before any trade, rate your stress 1–10<br>
2. If above 6, no trade<br>
3. That simple rule could be worth hundreds of dollars to you`,
      cta: "I hear you — checking my emotional state",
      ctaAction: `dismissIntervention('emotional_risk')`,
      compact: `🧠 Emotional pattern in recent trades — your calm win rate is higher.`,
    };
    if (!compactMode) return msg;
    return { compact: msg.compact };
  }

  // ── HIGH: Plan compliance dropped below 60% ──
  if (planCompliance !== null && planCompliance < 60 && allTrades.length >= 5 && canFire('plan_compliance')) {
    const followWR = _planWinRate(j, 'yes');
    const breakWR = _planWinRate(j, 'no');
    if (followWR > 0 && breakWR > 0) {
      const msg = {
        type: 'plan_compliance',
        severity: 'high',
        title: `Plan compliance: ${planCompliance}%`,
        body: `${name}, your plan compliance has dropped to ${planCompliance}%. Here is why that matters — in your own data:<br><br>
📊 When you follow your plan: <strong style="color:var(--accent)">${followWR}% win rate</strong><br>
📊 When you break your plan: <strong style="color:var(--red)">${breakWR}% win rate</strong><br><br>
The ${followWR - breakWR}-point difference is your discipline gap. Your plan works. Your in-the-moment decisions consistently underperform it.<br><br>
For the next 5 trades: before entry, physically write down every rule your setup meets. Don't enter unless all are checked.`,
        cta: "Got it — back to the plan",
        ctaAction: `dismissIntervention('plan_compliance')`,
        compact: `📋 Plan compliance at ${planCompliance}% — your plan wins ${followWR}% vs ${breakWR}% off-plan.`,
      };
      if (!compactMode) return msg;
      return { compact: msg.compact };
    }
  }

  // ── MODERATE: Long journal gap ──
  if (j.length > 0 && canFire('journal_gap')) {
    const lastEntry = new Date(j[j.length-1].date || j[j.length-1].time || 0);
    const daysSince = Math.round((Date.now() - lastEntry.getTime()) / 86400000);
    if (daysSince >= 4) {
      const msg = {
        type: 'journal_gap',
        severity: 'medium',
        title: `${daysSince} days since last journal entry`,
        body: `${name}, it has been ${daysSince} days since your last journal entry. I want to be honest with you — this is not a minor thing. The journal is not record-keeping, it is the mechanism by which you improve. Without data, I cannot detect your patterns, and you cannot learn from your trades.<br><br>Even a 2-minute entry covering: pair, direction, P&L, mood, and one sentence of notes is enough. Take 2 minutes right now.`,
        cta: "Log a trade now",
        ctaAction: `dismissIntervention('journal_gap');navigate('journal');setTimeout(showNewEntryModal,300)`,
        compact: `📓 ${daysSince} days since last journal entry — your patterns are going untracked.`,
      };
      if (!compactMode) return msg;
      return { compact: msg.compact };
    }
  }

  // ── POSITIVE: Streak check (encouraging, not nagging) ──
  if (streak >= 7 && canFire('streak_milestone') && STATE.dailyCheckIn === new Date().toDateString()) {
    if (!compactMode) return null;
    return { compact: `🔥 ${streak}-day streak — you're building a real habit.` };
  }

  // ── POSITIVE: First profitable week ──
  const thisWeek = allTrades.filter(t => Date.now() - new Date(t.date||t.time||0).getTime() < 7*86400000);
  const weekPnl = thisWeek.reduce((a,t) => a + (parseFloat(t.pnl)||0), 0);
  if (weekPnl > 0 && thisWeek.length >= 3 && canFire('profitable_week')) {
    if (!compactMode) return null;
    return { compact: `✅ Profitable week (+$${weekPnl.toFixed(0)}) — note what's working.` };
  }

  return null;
}

function dismissIntervention(type) {
  if (!STATE.proactive) STATE.proactive = { dismissedToday: [] };
  if (!STATE.proactive.dismissedToday) STATE.proactive.dismissedToday = [];
  STATE.proactive.dismissedToday.push(type);
  saveState();
}

/* Reset dismissed list each new day */
function _resetDailyInterventions() {
  const today = new Date().toDateString();
  if (STATE.proactive?.lastInterventionDate !== today) {
    if (!STATE.proactive) STATE.proactive = {};
    STATE.proactive.dismissedToday = [];
    STATE.proactive.lastInterventionDate = today;
  }
}

function _emotionalWinRate(journal) {
  const emotional = journal.filter(t => ['revenge','frustrated','greedy','angry'].includes(t.mood));
  if (!emotional.length) return 35;
  return Math.round(emotional.filter(t => parseFloat(t.pnl) > 0).length / emotional.length * 100);
}

function _planWinRate(journal, planVal) {
  const trades = journal.filter(t => t.plan === planVal);
  if (!trades.length) return 0;
  return Math.round(trades.filter(t => parseFloat(t.pnl) > 0).length / trades.length * 100);
}

/* ═══════════════════════════════════════════════════════════════
   TRADE POST-MORTEM ENGINE
   Automatically debriefs every closed sim trade.
   Fires immediately after closeSimTrade() is called.
   ═══════════════════════════════════════════════════════════════ */

function generateTradePostMortem(trade, ctx) {
  if (!trade) return null;
  const { name, patterns, allTrades, bestPair, worstDay } = ctx || buildFullContext();
  const pnl = parseFloat(trade.pnl) || 0;
  const isWin = pnl >= 0;
  const mm = _mm();

  // Core result line
  let lines = [];

  // Win analysis
  if (isWin) {
    const rr = parseFloat(trade.rr) || 0;
    if (rr >= 2) lines.push(`R:R of ${rr.toFixed(1)}:1 — above your average. That's the discipline that compounds.`);
    if (trade.plan === 'yes') lines.push(`Plan followed. This is what controlled execution looks like.`);
    if (trade.pair === bestPair) lines.push(`${trade.pair} is your strongest pair — results like this confirm why.`);
    // Check if this setup has a strong pattern
    const setupPattern = patterns.find(p => p.type === 'best_setup' && p.insight.includes(trade.setup));
    if (setupPattern) lines.push(`Your "${trade.setup}" setup is your best historically — you played it well.`);
    if (!lines.length) lines.push(`Clean execution. Note what you did right so you can repeat it.`);
  }

  // Loss analysis
  else {
    if (trade.plan === 'no') lines.push(`Plan was broken. In your data, off-plan trades lose ${_planWinRate(STATE.journal,'no')}% of the time — this fits the pattern.`);
    if (['revenge','frustrated','greedy'].includes(trade.mood)) lines.push(`Mood logged as "${trade.mood}" — emotional state likely affected this trade. Consider the 30-minute rule after any loss.`);
    const dayName = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date().getDay()];
    const worstDayPattern = patterns.find(p => p.type === 'worst_day' && p.insight.includes(dayName));
    if (worstDayPattern) lines.push(`${dayName} is your statistically weakest day. This result is part of that pattern.`);
    if (!lines.length) lines.push(`Review the chart now while the trade is fresh. What would you do differently?`);
  }

  // One concrete next-action
  const action = isWin
    ? `Tag this trade with setup type in the Journal so the pattern gets tracked.`
    : `Before your next trade: re-read your entry rules and confirm all criteria are met.`;

  // Save as memory note
  saveMentorNote(`${isWin?'Win':'Loss'} on ${trade.pair||'unknown'} — ${lines[0]}`, 'trade_debrief');

  return {
    title: isWin ? `✅ Trade closed — +$${pnl.toFixed(2)}` : `❌ Trade closed — -$${Math.abs(pnl).toFixed(2)}`,
    insight: lines[0],
    action,
    isWin,
  };
}

/* Show post-mortem as a dismissible card in the trade screen */
function showTradePostMortem(trade) {
  const mortem = generateTradePostMortem(trade);
  if (!mortem) return;

  const card = document.createElement('div');
  card.id = 'postmortem-card';
  card.style.cssText = `position:fixed;bottom:calc(var(--total-nav,62px)+12px);left:12px;right:12px;max-width:480px;margin:0 auto;z-index:800;background:var(--bg2);border:1px solid ${mortem.isWin?'var(--accent)':'var(--red)'};border-radius:16px;padding:14px 16px;box-shadow:0 8px 32px rgba(0,0,0,0.5);animation:slideUp .3s cubic-bezier(.34,1.56,.64,1)`;

  card.innerHTML = `
    <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px">
      <div style="font-family:var(--display);font-weight:700;font-size:14px;color:${mortem.isWin?'var(--accent)':'var(--red)'}">${mortem.title}</div>
      <button onclick="document.getElementById('postmortem-card')?.remove()" style="background:none;border:none;cursor:pointer;color:var(--txt3);font-size:18px;line-height:1;padding:0 0 0 8px">×</button>
    </div>
    <div style="font-size:13px;color:var(--txt2);line-height:1.6;margin-bottom:8px">${mortem.insight}</div>
    <div style="font-size:11px;color:var(--txt3);border-top:1px solid var(--bdr3);padding-top:8px">→ ${mortem.action}</div>
    <div style="display:flex;gap:6px;margin-top:10px">
      <button onclick="navigate('mentor');setTimeout(()=>{const i=document.getElementById('chat-inp');if(i){i.value='Debrief my last trade';submitChat();}},400);document.getElementById('postmortem-card')?.remove()" style="flex:1;padding:7px;background:var(--bg3);border:1px solid var(--bdr2);border-radius:8px;font-size:11px;font-family:var(--display);font-weight:700;cursor:pointer;color:var(--txt2)">Full analysis →</button>
      <button onclick="document.getElementById('postmortem-card')?.remove()" style="padding:7px 14px;background:none;border:1px solid var(--bdr2);border-radius:8px;font-size:11px;cursor:pointer;color:var(--txt3)">Dismiss</button>
    </div>`;

  document.body.appendChild(card);
  setTimeout(() => card?.remove(), 12000);
}

/* ════════════════════════════════════════════════════════════════
   EXPORT — WIRE INTO MENTOR/FLOAT CHAT
   generateSmartResponse() is the single entry point.
   It tries smart routing first, falls back to existing logic.
   ════════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════
   NATURAL LANGUAGE HUMANISER
   Strips robotic patterns, adds genuine conversational flow.
   Called on every response before delivery.
   ═══════════════════════════════════════════════════════════════ */

function _humanise(text, ctx) {
  if (!text || text.length < 20) return text;
  const name = (ctx && ctx.name) || (STATE.user && STATE.user.name) || '';

  // ── Remove robotic openers ──
  const roboticOpeners = [
    /^(Certainly!?|Absolutely!?|Of course!?|Sure!?|Great question!?|That's a great question!?)[,\s]*/i,
    /^(I understand that|I can help with that|I'd be happy to)[,\s]*/i,
    /^As an AI[,\s]*/i,
    /^As your AI mentor[,\s]*/i,
  ];
  roboticOpeners.forEach(re => { text = text.replace(re, ''); });

  // ── Capitalise if we stripped the opener ──
  if (text.length > 0) text = text.charAt(0).toUpperCase() + text.slice(1);

  // ── Occasional first-name use (not every message — that gets annoying) ──
  const useNameChance = Math.random();
  if (name && useNameChance > 0.7 && !text.includes(name)) {
    // Insert name naturally at a sentence break or at start
    const sentences = text.split('. ');
    if (sentences.length > 2 && Math.random() > 0.5) {
      const idx = Math.floor(Math.random() * (sentences.length - 1)) + 1;
      sentences[idx] = name + ', ' + sentences[idx].charAt(0).toLowerCase() + sentences[idx].slice(1);
      text = sentences.join('. ');
    }
  }

  // ── Replace overly formal phrases with natural ones ──
  const replacements = [
    [/In conclusion/gi, 'Bottom line:'],
    [/Furthermore/gi, 'Also'],
    [/It is important to note that/gi, 'Worth noting:'],
    [/It should be noted that/gi, ''],
    [/\bHowever, it is\b/gi, "That said, it's"],
    [/In order to/gi, 'To'],
    [/At this point in time/gi, 'right now'],
    [/Prior to/gi, 'Before'],
    [/Utilize/gi, 'use'],
    [/Implement/gi, 'use'],
    [/I hope this helps/gi, ''],
    [/Feel free to ask/gi, 'Ask me anything else'],
    [/Don't hesitate to/gi, 'Go ahead and'],
  ];
  replacements.forEach(([from, to]) => { text = text.replace(from, to); });

  return text.trim();
}

/* ═══════════════════════════════════════════════════════════════
   CONTEXT-AWARE RESPONSE ENRICHER
   Adds user-specific data snippets to generic answers.
   e.g. if answering about RSI, append "Your RSI-based trades..." 
   ═══════════════════════════════════════════════════════════════ */

function _enrichWithPersonalData(response, topic, ctx) {
  if (!ctx || ctx.allTrades.length < 5) return response;

  const enrichments = {
    'rsi': () => {
      const rsiTrades = ctx.allTrades.filter(t => t.setup && /rsi/i.test(t.setup));
      if (rsiTrades.length >= 3) {
        const wr = Math.round(rsiTrades.filter(t=>parseFloat(t.pnl)>0).length/rsiTrades.length*100);
        return `<br><br><em style="color:var(--txt3)">Your RSI-tagged trades: ${rsiTrades.length} trades, ${wr}% win rate.</em>`;
      }
      return '';
    },
    'support_resistance': () => {
      const srTrades = ctx.allTrades.filter(t => t.setup && /s.r|support|bounce/i.test(t.setup));
      if (srTrades.length >= 3) {
        const wr = Math.round(srTrades.filter(t=>parseFloat(t.pnl)>0).length/srTrades.length*100);
        return `<br><br><em style="color:var(--txt3)">Your S/R bounce trades: ${srTrades.length} trades, ${wr}% win rate.</em>`;
      }
      return '';
    },
    'risk_management': () => {
      const avgRR = ctx.allTrades.filter(t=>t.rr).reduce((a,t)=>a+parseFloat(t.rr),0) / (ctx.allTrades.filter(t=>t.rr).length||1);
      if (avgRR > 0) return `<br><br><em style="color:var(--txt3)">Your current average achieved R:R: ${avgRR.toFixed(1)}:1.</em>`;
      return '';
    },
    'psychology': () => {
      const calmTrades = ctx.allTrades.filter(t=>t.mood==='calm'||t.mood==='focused');
      if (calmTrades.length >= 3) {
        const calmWR = Math.round(calmTrades.filter(t=>parseFloat(t.pnl)>0).length/calmTrades.length*100);
        return `<br><br><em style="color:var(--txt3)">When calm/focused, your win rate: ${calmWR}% (${calmTrades.length} trades).</em>`;
      }
      return '';
    },
  };

  const enrichFn = enrichments[topic];
  if (enrichFn) {
    const extra = enrichFn();
    if (extra) return response + extra;
  }
  return response;
}

function generateSmartResponse(input) {
  const q = input.toLowerCase().trim();
  const ctx = buildFullContext();

  // Reset daily interventions if new day
  _resetDailyInterventions();

  // Track topic for memory
  const topicMap = {
    'rsi|relative strength': 'rsi', 'macd': 'macd', 'fibonacci|fib': 'fibonacci',
    'support|resistance|s.r': 'support_resistance', 'smc|order block|fair value': 'smc',
    'risk|position size|stop loss': 'risk_management', 'psychology|emotion|mind': 'psychology',
    'session|london|new york': 'trading_sessions', 'candle|hammer|doji|engulf': 'candlesticks',
    'moving average|ema|sma': 'moving_averages', 'bollinger': 'bollinger',
  };
  Object.entries(topicMap).forEach(([pattern, topic]) => {
    if (new RegExp(pattern, 'i').test(q)) trackTopic(topic);
  });

  // Check if user is answering a quiz
  if (STATE._quizActive && STATE._quizKeywords) {
    const score = scoreQuizAnswer(input, ctx);
    if (score) return _humanise(score, ctx);
  }

  // Try smart router first
  let smartResp = smartAIResponse(input);
  if (smartResp) {
    // Detect topic for personal data enrichment
    const topicForEnrich = Object.entries(topicMap).find(([p]) => new RegExp(p,'i').test(q));
    if (topicForEnrich) smartResp = _enrichWithPersonalData(smartResp, topicForEnrich[1], ctx);
    smartResp = adaptResponseToPersonality(smartResp, ctx);
    return _humanise(smartResp, ctx);
  }

  // Fall back to existing 3-tier chain
  try {
    let resp = '';
    if (typeof generateFloatResponse === 'function') {
      resp = generateFloatResponse(input);
    }
    if ((!resp || resp === 'undefined') && typeof generateResponse === 'function') {
      resp = generateResponse(input);
    }
    if (resp && resp !== 'undefined') {
      const topicForEnrich = Object.entries(topicMap).find(([p]) => new RegExp(p,'i').test(q));
      if (topicForEnrich) resp = _enrichWithPersonalData(resp, topicForEnrich[1], ctx);
      return _humanise(resp, ctx);
    }
  } catch(e) {
    console.warn('AI error:', e);
  }

  return _humanise(
    typeof generateResponse === 'function'
      ? generateResponse(input)
      : "I didn't quite catch that. Try asking about a concept, your patterns, or say: review my last trade.",
    ctx
  );
}

console.log('✅ AI Brain loaded: Pattern Detection, Quiz Engine, Level-Aware Teaching, Study Plans, Emotional Coaching');

/* ============== Initialize AI ============== */
function initializeAI() {
    setTimeout(() => {
        const ctx = buildFullContext();
        if (ctx.allTrades.length >= 15 && typeof trainPredictionModel === 'function') {
            trainPredictionModel();
        }
        if (typeof detectPreferredStyle === 'function') {
            detectPreferredStyle();
        }
        if (typeof runLearningOptimization === 'function') {
            runLearningOptimization();
        }
        console.log('🧠 AI fully initialized with all intelligence layers');
    }, 1000);
}

// Call it
initializeAI();
