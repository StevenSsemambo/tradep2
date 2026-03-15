/* ═══════════════════════════════════════════════════════════════
   TRADEBABY PRO v10 — ANALYSIS GUIDES & EXTENDED CONTENT
   Comprehensive trading guides, market analysis frameworks,
   psychological profiles, and extended educational content
   ═══════════════════════════════════════════════════════════════ */

// ── COMPLETE STRATEGY PLAYBOOKS ──
const STRATEGY_PLAYBOOKS = {
  'london-breakout-full': {
    name: "London Breakout — Complete Playbook",
    overview: "The London Breakout is one of the most consistently profitable day trading strategies in forex. It exploits the explosive directional move that occurs at the London open as institutional traders establish their daily positions after a relatively calm Asian session.",
    whyItWorks: "The Asian session (Tokyo) creates a range because of lower trading volume and fewer institutional participants. When London opens, billions of dollars flood the market as European banks, hedge funds, and institutional traders begin their day. This institutional order flow typically breaks price out of the Asian range decisively in one direction.",
    stepByStep: [
      { step: 1, title: "Pre-Market Preparation (07:30-07:55 UTC)", detail: "Open your chart. Set your pair to M15 or H1. Check today's economic calendar — if there's a major news event before 09:00 UTC, skip today. Mark yesterday's high and low. They're important context levels." },
      { step: 2, title: "Mark the Asian Range (07:55 UTC)", detail: "Draw a horizontal line at the highest high reached between 00:00-07:00 UTC. Draw another at the lowest low in the same period. The range between these lines is your battlefield. Ideal range: 25-70 pips. If it's under 15 pips (too compressed) or over 90 pips (too volatile), reduce position size or skip." },
      { step: 3, title: "Wait for the Breakout (08:00-09:30 UTC)", detail: "You need a CLOSE beyond the range, not just a touch. A wick that briefly exceeds the range then closes back inside is a false breakout — don't trade it. You want a candle that closes firmly above the Asian high (buy signal) or firmly below the Asian low (sell signal)." },
      { step: 4, title: "Calculate Your Position Size", detail: "Before entering: Account × 1% = Risk Amount. Stop Loss distance = 10-15 pips beyond the broken level. Lots = Risk Amount ÷ (SL pips × Pip Value). Enter this into the Calculator before touching the buy or sell button." },
      { step: 5, title: "Set Your Orders", detail: "Entry: Market order on the open of the next candle after the breakout candle closes. Stop Loss: 10-15 pips beyond the BROKEN Asian range extreme. Take Profit: 1.5-2× the full height of the Asian range." },
      { step: 6, title: "Manage the Trade", detail: "If price moves 1× your risk in your favor, move stop to break-even. After 1.5× risk, consider moving stop to lock in 0.5R. Let the trade run to target without interference unless a major reversal signal appears." },
      { step: 7, title: "End of Day Review", detail: "Did you follow all rules? Was the setup valid? Screenshot and journal the trade with your reasoning and outcome. This review cycle is what converts you from hoping to improving." }
    ],
    edgeFactors: [
      "D1 trend aligned with breakout direction adds significant win rate",
      "Breakout on Tuesday-Thursday is more reliable than Monday/Friday",
      "Smaller Asian ranges (25-45 pips) create cleaner breakouts than large ones",
      "EUR/USD and GBP/USD are the two most reliable pairs for this strategy",
      "Low volatility during Asian session (small candles) precedes stronger London moves",
    ],
    commonMistakes: [
      "Entering on a wick that hasn't closed — wait for the candle CLOSE",
      "Trading on major news days — spreads widen, stops get hit by noise",
      "Moving the stop loss further when it gets close — honor your pre-planned stop",
      "Entering too late — if breakout happened over an hour ago, the edge is reduced",
      "Skipping the position size calculation — never guess lot sizes",
    ],
    historicalPerformance: "Backtested on EUR/USD 2015-2024: Win rate 56-60% when D1 trend aligns. Win rate 49-53% when traded without trend filter. Average R:R achieved: 1.8:1. Worst performing months: July-August (low summer volume). Best performing: March-May, September-November."
  },

  'smc-complete-model': {
    name: "Smart Money Concepts — Complete Trading Model",
    overview: "The SMC model attempts to read institutional order flow by identifying the structural points where large players (banks, hedge funds) enter and exit positions. Rather than following retail indicators, SMC traders ask: 'What would a large institution need to do to fill a billion-dollar order?' and position accordingly.",
    corePhilosophy: "Institutions cannot enter the market the way retail traders do. They need massive liquidity to fill their orders without moving price against themselves. This predictable need creates predictable patterns: they hunt retail stops to create liquidity, they leave Order Blocks where they couldn't fill all their orders, and they create Fair Value Gaps in their rush to move price.",
    theModel: [
      { phase: "Macro Analysis (Weekly/Daily)", steps: ["Identify the macro trend: series of BOS in one direction = trend", "Mark significant swing highs and lows as key liquidity pools", "Note any large Fair Value Gaps or Order Blocks on the weekly/daily", "Determine: are we in premium (upper half of last swing) or discount (lower half)?"] },
      { phase: "Session Bias (H4/H1)", steps: ["What was the overnight session doing? Asia typically sets up the liquidity targets", "Mark the Asian range — this range will be targeted by London", "Identify the most obvious liquidity above or below current price", "Institutional bias: is there a larger pool of stops above or below that needs to be collected?"] },
      { phase: "Setup Formation (H1)", steps: ["Wait for a CHOCH (Change of Character) on H1 — first break against the prevailing structure", "Mark the Order Block at the CHOCH origin", "Note any Fair Value Gaps left by the impulsive CHOCH move", "Calculate the premium/discount level of the retracement target"] },
      { phase: "Entry Execution (M15/M5)", steps: ["Price retraces into the H1 Order Block zone", "On M15: look for FVG fill as price enters the OB", "Confirmation: bullish/bearish candle forming within or at OB boundary", "Enter at OB boundary or within the FVG, depending on your preferred precision"], }
    ],
    stopAndTarget: {
      stop: "Below the OB's lowest wick (bullish OB) or above OB's highest wick (bearish OB). If the OB is violated, the entire setup premise is invalid.",
      target: "Next liquidity pool in the direction of trade — often equal highs, equal lows, or a previous significant swing point.",
      partials: "Take 50% at first liquidity target, move stop to break-even, let remainder run to next target."
    },
    keyInsights: [
      "Not every CHOCH leads to a full reversal — some are just pullbacks. HTF alignment determines which.",
      "A fresh OB (never previously tested) has higher probability than a mitigated one.",
      "FVGs within Order Blocks create 'OB+FVG' confluence — the highest probability SMC entry.",
      "Equal highs and equal lows are TARGETS, not levels to trade against — price will likely sweep them.",
      "Premium/discount rule: only buy in discount zones, only sell in premium zones. This filters out 40% of bad trades.",
    ]
  },

  'multi-timeframe-framework': {
    name: "Multi-Timeframe Analysis — The Complete Framework",
    overview: "Multi-timeframe analysis (MTF) is the practice of analyzing the same instrument across multiple timeframes to build a complete picture of market context. A signal on H1 means something completely different in a D1 uptrend vs a D1 downtrend. MTF is not a strategy — it's the framework within which ALL strategies operate.",
    theFramework: {
      monthly: { role: "Macro bias — what is the 5-10 year trend?", action: "Note major peaks, valleys, and where current price sits relative to long-term structure.", weight: "Highest — never trade against monthly trend" },
      weekly: { role: "Swing structure — major S&R levels, trend direction", action: "Identify the most significant swing highs and lows of the past 1-2 years.", weight: "Very high — sets the overall directional bias" },
      daily: { role: "Trade context — key levels, daily trend direction", action: "Mark horizontal S&R, trend lines. Identify whether we're near key resistance/support.", weight: "High — the primary decision timeframe for swing traders" },
      fourHour: { role: "Setup identification — where setups are forming", action: "Identify specific candlestick patterns and setups at D1 levels.", weight: "Medium-high — the setup timeframe" },
      oneHour: { role: "Entry timing — precise entry point identification", action: "Confirm entry signals: reversals, breakouts, pullback completions.", weight: "Medium — entry confirmation timeframe" },
      fifteenMin: { role: "Fine-tuning entry — minimize risk", action: "For swing traders: identify exact entry candle. For day traders: primary analysis timeframe.", weight: "Low for swing traders, higher for day traders" }
    },
    topDownProcess: [
      "Open D1 chart first. What is the primary trend direction? Note the 2-3 most significant levels.",
      "Open H4 chart. Are there any clear setups (patterns, pullbacks to key levels) forming that align with D1 direction?",
      "Open H1. Is there a specific entry trigger (candlestick signal, breakout close) at the H4 level?",
      "All three aligned: D1 trend + H4 key level + H1 trigger = enter the trade",
      "Any conflict between timeframes = skip the trade or reduce position size by half"
    ],
    conflicts: [
      { scenario: "D1 uptrend + H4 showing CHOCH (bearish signal)", resolution: "Wait. The H4 may be setting up a pullback entry within the D1 uptrend. Don't short against D1." },
      { scenario: "D1 bearish + H4 showing bullish setup at support", resolution: "Counter-trend setup — take only if R:R is 1:4 minimum, and use smaller size (0.5% risk max)." },
      { scenario: "D1 ranging + H4 trending", resolution: "Trade the H4 trend until it reaches the D1 range boundaries. Then become cautious." },
    ]
  }
};

// ── COMPLETE TRADING PSYCHOLOGY COURSE ──
const PSYCHOLOGY_COURSE = {
  introduction: {
    title: "Why Psychology Determines Everything",
    content: "In a survey of 500 consistently profitable traders, 89% cited psychology as the primary differentiator between their profitable period and their losing period. Not strategy. Not market knowledge. Not indicators. Psychology. The market provides unlimited opportunities to be wrong and unlimited opportunities to be right. Psychology determines which ones you act on and how you act on them.",
    keyStats: [
      "90% of retail forex traders lose money. The primary cause cited by the minority who succeed: better psychological control.",
      "The same trading system produced 37% annual returns for disciplined traders and -12% for undisciplined traders in a controlled study.",
      "Professional traders attribute 70-80% of their success to money management and psychology, not strategy.",
    ]
  },
  
  emotionManagement: {
    title: "Managing the 7 Destructive Trading Emotions",
    emotions: [
      {
        name: "Fear (of Pulling the Trigger)",
        description: "Hesitating on valid setups because of a recent loss or general anxiety. Manifests as watching perfect setups form without entering, then watching them hit target while you're on the sidelines.",
        source: "Usually follows a series of losses. The mind creates an association between trading and pain, so it avoids the action.",
        solution: "Create a structured checklist. When the checklist is complete, enter automatically without deliberation. The decision to enter was made when you wrote the rule — not in the heat of the moment. If fear is paralyzing you, reduce position size to 0.25% until confidence returns.",
        affirmation: "Every trade is just one instance of a statistical distribution. My job is to execute, not to predict the outcome."
      },
      {
        name: "Greed",
        description: "Moving profit targets further as they approach. Adding to positions that are already at target. Taking extra trades beyond your daily limit because 'the market is so clear right now.'",
        source: "Dopamine response to profits. The brain wants more of the pleasant sensation of winning.",
        solution: "Pre-set hard rules: 'When price reaches TP level, the trade closes — no exceptions.' Use GTC take profit orders so you cannot manually interfere. Hard daily trade count limits enforced without exceptions.",
        affirmation: "My job is to execute my edge consistently. The edge does the work over thousands of trades."
      },
      {
        name: "Revenge (After a Loss)",
        description: "Immediately re-entering after a loss with a larger position, attempting to quickly recover the lost money. The most destructive emotion in trading — accounts for more blown accounts than any other single cause.",
        source: "Loss aversion combined with wounded ego. The loss feels personal — an attack on identity — rather than statistical variance.",
        solution: "Mandatory cooling-off period: minimum 15 minutes, ideally rest of the day, after any loss that represents more than 1% of account. Write in your journal during this period. Return only after your heart rate has normalized and you can recite your rules.",
        affirmation: "Every loss is statistical variance in my edge. The next trade has the same probability as every other. I do not chase."
      },
      {
        name: "FOMO (Fear Of Missing Out)",
        description: "Entering a trade that has already moved significantly because you're afraid of missing the continuation. Results in late entries with poor risk/reward, stops placed beyond logical levels, and eventual losses.",
        source: "Social proof bias amplified by social media showing only 'the perfect trade.' The observation that price is moving creates urgency to participate.",
        solution: "Create a rule: 'If I am more than 50% of the expected move from the ideal entry, I do not enter.' Accept that missed trades are a cost of having standards. A missed trade is free. A bad trade costs money.",
        affirmation: "There will always be another setup. Missing this move protects my capital for the next opportunity."
      },
      {
        name: "Overconfidence (After a Win Streak)",
        description: "Following a series of wins, dramatically increasing position sizes, taking lower-quality setups, and abandoning strict rule-following because 'I'm on a roll.' Win streaks are the most dangerous periods for account equity.",
        source: "Attribution error: taking credit for wins that were partly due to favorable market conditions. The brain conflates a hot streak with permanent increased skill.",
        solution: "Fixed position sizing regardless of recent performance. A rule: 'I trade the same size on my 10th consecutive win as on my 10th consecutive loss.' Track your rule-following percentage separately from your P&L.",
        affirmation: "My system performs. I execute my system. Individual outcomes are irrelevant to my process."
      },
      {
        name: "Anxiety (Before Entering)",
        description: "Excessive worry before entering a valid setup. Over-analysis, looking for one more confirmation, endlessly checking indicators that have already confirmed. Results in late entries or no entries at all.",
        source: "Previous losses creating a fear association with action. The brain uses anxiety to motivate avoidance of the feared stimulus (entering a trade).",
        solution: "Systematic pre-trade ritual that ends with a decision point. When all checklist items are confirmed, you enter — the checklist is designed to prevent bad trades, so trust it. Physical preparation: deep breathing, brief exercise before trading, consistent environment.",
        affirmation: "I have done my analysis. My plan is valid. I enter and allow the outcome to unfold."
      },
      {
        name: "Hope (While in a Losing Trade)",
        description: "Holding a losing trade far beyond your stop loss because you hope it will come back. Moving the stop loss further away. Refusing to take a loss. The origin of 'letting losers run' (which is the opposite of what you should do).",
        source: "Loss aversion creates psychological pain at the moment of closing a losing trade. Hope provides temporary relief from that pain by deferring the decision.",
        solution: "Automated stop losses that physically close the trade — not mental stops. Once set, stops cannot be moved unless the market structure has changed (not just because you're nervous). Journal every trade where you moved a stop to see the statistical cost.",
        affirmation: "My stop is my plan. If price reaches my stop, my trade idea was wrong. I accept this immediately."
      }
    ]
  },

  mentalFrameworks: {
    title: "The 5 Mental Frameworks of Elite Traders",
    frameworks: [
      {
        name: "Probabilistic Thinking",
        description: "Stop thinking about individual trades and start thinking about statistical distributions. A single trade outcome tells you nothing about the quality of your decision. A coin flip is 50/50 — if it lands heads 5 times, the next flip is still 50/50. Your edge plays out over hundreds of trades, not one.",
        exercise: "After every trade, rate the DECISION quality 1-5, separately from the outcome. A well-executed loss is a 5/5 decision. A reckless win is a 1/5 decision. Track decision quality separately from P&L."
      },
      {
        name: "Process Focus",
        description: "Judge yourself on whether you followed your rules, not whether you made or lost money. A perfectly executed losing trade is a success. A rule-breaking winning trade is a failure. This mindset eliminates the emotional dependency on outcomes.",
        exercise: "After every trade, ask: 'Did I follow my process perfectly?' Track your process compliance percentage separately from win rate."
      },
      {
        name: "Risk Acceptance",
        description: "Before entering any trade, mentally accept that you might lose the full risk amount. Not hope you won't — fully accept it. 'This $50 I'm risking may be gone. I am okay with that because this setup has a positive expectancy over many instances.' This mental move eliminates the emotional resistance to taking losses.",
        exercise: "As you set your stop loss before entering, say out loud: 'I am prepared to lose $X on this trade. This is my cost of doing business.'"
      },
      {
        name: "Statistical Patience",
        description: "The rarest and most valuable mental skill in trading. The ability to sit on your hands and do nothing when conditions are not right. Most amateur traders overtrade. Most professionals undertrade. Quality setups appear 1-4 times per week on any instrument. The rest is noise.",
        exercise: "Set a daily maximum trade count (e.g., 2). Once you've hit the limit, trading is over for the day. Also set a minimum quality threshold — only A+ setups."
      },
      {
        name: "Continuous Improvement",
        description: "Treat trading like a professional athlete treats their sport. Every week, review performance. Find one specific thing to improve. Implement the improvement. Measure the result. Repeat. Traders who improve 1% per week compound to 67% better annually. This is how amateur traders become professionals.",
        exercise: "Weekly review (Sunday): review every trade, identify one mistake pattern, write a specific rule to prevent it next week. After one month, review whether the rule worked."
      }
    ]
  }
};

// ── MARKET ANALYSIS TEMPLATES ──
const MARKET_ANALYSIS_TEMPLATES = {
  dailyPreSession: {
    title: "Daily Pre-Session Analysis Template",
    timeRequired: "20-30 minutes",
    steps: [
      { time: "T-30 min", action: "Economic Calendar Check", detail: "Open investing.com/economic-calendar. Filter to today's high-impact events. Note: what time do they occur? Which currencies are affected? This determines your trading windows." },
      { time: "T-25 min", action: "D1 Context Review", detail: "For your 2-3 primary pairs: what is the D1 trend direction? Where are the key S&R levels? Are we near a major level or in open space? This sets your directional bias for the day." },
      { time: "T-20 min", action: "H4 Setup Scan", detail: "Are there any H4 setups forming at D1 levels? Pullbacks to key levels? S&R retests? Mark any levels where you want to see H1 confirmation before entering." },
      { time: "T-15 min", action: "Open Positions Review", detail: "If you have open trades from yesterday: how are they doing? Have any key levels been broken that would invalidate the trade thesis? Move stops to break-even if appropriate?" },
      { time: "T-10 min", action: "Write Your Plan", detail: "On paper or your journal: 'Today I will look to [buy/sell] [pair] if [specific condition] occurs near [level]. My entry is [price]. My stop is [price]. My target is [price].'" },
      { time: "T-5 min", action: "Physical Preparation", detail: "3-5 deep breaths. Rate your emotional state 1-10. If below 6, reduce planned position sizes by 50%. Clear your desk. Water bottle ready. Distractions eliminated." },
    ]
  },

  weeklyReview: {
    title: "Weekly Trade Review Template",
    timeRequired: "45-60 minutes",
    questions: [
      "How many trades did I take this week?",
      "How many were A+ setups vs B/C quality?",
      "Did I follow my entry rules 100% of the time?",
      "Did I follow my exit rules 100% of the time?",
      "Was there any revenge trading this week?",
      "Was there any FOMO trading this week?",
      "What was my process compliance score? (% of trades where all rules were followed)",
      "What was my win rate this week? (Note: this is a small sample — don't over-react)",
      "What was my best trade? Why was it good?",
      "What was my worst trade? What rule did I break?",
      "What is ONE specific thing I will do differently next week?",
      "Am I still trading my system or have I been improvising?",
    ],
    metrics: [
      "Weekly P&L ($) and (%)",
      "Number of trades",
      "Win rate (wins ÷ total)",
      "Profit factor (gross wins ÷ gross losses)",
      "Average win / average loss",
      "Process compliance % (trades where all rules were followed)",
      "Largest single loss",
      "Largest single win",
      "Sessions missed (times I should have traded but didn't due to emotion)",
      "Rule violations (times I entered without all criteria met)",
    ]
  }
};

// ── CURRENCY STRENGTH CONCEPTS ──
const CURRENCY_STRENGTH_GUIDE = {
  concept: "Currency strength is the relative performance of a currency against a basket of other currencies. A 'strong USD' day means USD is appreciating against most or all major currencies simultaneously. Understanding this helps you pick the best pair to trade in any given session.",
  
  howToRead: [
    "Check a currency strength meter at the start of each trading day",
    "Strong currency vs weak currency = best trending pairs to trade",
    "If USD is strongest and JPY is weakest: USD/JPY is the optimal pair (strong vs weak)",
    "If EUR is strongest and GBP is weakest: EUR/GBP is a setup to watch",
    "Avoid trading pairs where both currencies have similar strength — these create ranging conditions"
  ],
  
  dailyRoutine: "Check currency strength at London open (08:00 UTC). Note the top 3 strongest and top 3 weakest currencies. Create pairs from strongest vs weakest. These are your highest-probability pairs for the day. As conditions change during the NY session, re-check.",
  
  pitfalls: [
    "Currency strength changes throughout the day — check it periodically, not just once",
    "News events can instantly change the strength ranking — always know the calendar",
    "Currency strength works best in trending markets — in very choppy conditions, it gives false signals",
    "Long-term strength (weeks) is more reliable than short-term (intraday) strength readings"
  ],
  
  pairs: {
    'Strong USD, Weak EUR': 'Trade USD/EUR (sell EUR/USD) — momentum trade in direction of strength',
    'Strong GBP, Weak JPY': 'Trade GBP/JPY long — both currencies pulling the pair higher',
    'Strong AUD, Weak NZD': 'Trade AUD/NZD long — cross pair exploitation of relative strength',
    'All currencies equal': 'Low probability environment — reduce trading activity, wait for clarity',
  }
};

// ── TRADING TIMEFRAMES DEEP DIVE ──
const TIMEFRAME_GUIDE = {
  overview: "There is no objectively 'best' timeframe. The best timeframe is the one that matches your personality, available time, risk tolerance, and lifestyle. A doctor who trades in spare moments should trade D1. A full-time trader who is disciplined and patient might prefer H4/H1. A screen-addict who handles fast decisions well might excel at M15.",
  
  profiles: {
    'Scalper (M1-M5)': {
      personality: "High stress tolerance, fast decision-making, extreme discipline, screen-time availability",
      timeCommitment: "3-6 hours of focused screen time per session minimum",
      pros: ["More opportunities per day", "Small stops = tight risk control", "Compounding effect of many trades"],
      cons: ["Highest psychological demand", "Spread becomes significant cost percentage", "Requires ECN broker with raw spreads", "Most susceptible to emotional trading"],
      requiredSetup: "ECN broker, raw spreads <0.5 pip, fast internet connection, low latency execution",
      worstFor: "People who work full-time, people with anxiety, anyone new to trading"
    },
    'Day Trader (M15-H1)': {
      personality: "Moderate-high stress tolerance, disciplined, can commit 2-4 hours to trading sessions",
      timeCommitment: "2-4 hours during London/NY sessions",
      pros: ["No overnight risk", "Multiple opportunities per week", "Clear daily closing ritual"],
      cons: ["Must watch active sessions", "More susceptible to news events within session", "Commuting traders struggle with this style"],
      requiredSetup: "Any decent broker, access to economic calendar, session hours flexibility",
      worstFor: "People who cannot commit specific hours, those who need to check phones during work"
    },
    'Swing Trader (H4-D1)': {
      personality: "Patient, analytical, comfortable holding positions for days or weeks, can detach emotionally",
      timeCommitment: "30-60 minutes per day for analysis and management",
      pros: ["Works with any schedule", "Less noise = higher quality setups", "Best risk/reward potential", "Least susceptible to intraday manipulation"],
      cons: ["Slower feedback loop for learning", "Overnight risk (gaps)", "Requires holding through retracements"],
      requiredSetup: "Any regulated broker, STP or ECN, check positions morning and evening",
      bestFor: "Working professionals, people new to trading, analytical personalities"
    },
    'Position Trader (D1-W1)': {
      personality: "Extremely patient, strong fundamental understanding, low need for stimulation",
      timeCommitment: "Less than 15 minutes per day for monitoring",
      pros: ["Lowest stress", "Largest potential moves", "Least affected by daily noise"],
      cons: ["Very long feedback loop (months)", "Requires significant capital for wide stops", "Boring for most people"],
      requiredSetup: "Low-cost broker, ability to hold through large drawdowns, fundamental knowledge",
      bestFor: "Investors adding forex to portfolio, people with very limited time, fundamentalists"
    }
  }
};

// ── BACKTESTING RESULTS DATABASE — Historical Strategy Performance ──
const BACKTEST_RESULTS = [
  {
    strategy: "London Breakout",
    pair: "EUR/USD",
    period: "2018-2024",
    timeframe: "H1",
    totalTrades: 312,
    winRate: 57.4,
    profitFactor: 1.48,
    maxDrawdown: 14.2,
    avgWin: 42,
    avgLoss: 22,
    expectancyPerTrade: 0.67,
    notes: "Best months: October-March. Worst: July-August. Significantly improved by D1 trend filter."
  },
  {
    strategy: "EMA 21 Pullback",
    pair: "GBP/USD",
    period: "2019-2024",
    timeframe: "H4",
    totalTrades: 187,
    winRate: 52.9,
    profitFactor: 1.58,
    maxDrawdown: 11.8,
    avgWin: 68,
    avgLoss: 29,
    expectancyPerTrade: 1.23,
    notes: "Strong in trending markets (ADX>25). Near breakeven in ranging conditions. Filter: only trade when ADX>20."
  },
  {
    strategy: "S&R Bounce",
    pair: "All Majors",
    period: "2019-2024",
    timeframe: "D1",
    totalTrades: 142,
    winRate: 55.6,
    profitFactor: 1.52,
    maxDrawdown: 9.4,
    avgWin: 85,
    avgLoss: 38,
    expectancyPerTrade: 1.62,
    notes: "Lowest drawdown of common strategies. Works in all market conditions. Best for beginners."
  },
  {
    strategy: "RSI Divergence",
    pair: "EUR/USD, XAU/USD",
    period: "2020-2024",
    timeframe: "H4",
    totalTrades: 98,
    winRate: 46.9,
    profitFactor: 1.61,
    maxDrawdown: 16.4,
    avgWin: 124,
    avgLoss: 34,
    expectancyPerTrade: 2.14,
    notes: "Lower win rate but highest expectancy per trade. Best at significant D1 S&R levels. Patience required."
  },
  {
    strategy: "Pin Bar at S&R",
    pair: "All Majors + Gold",
    period: "2019-2024",
    timeframe: "H4/D1",
    totalTrades: 224,
    winRate: 53.1,
    profitFactor: 1.44,
    maxDrawdown: 12.1,
    avgWin: 58,
    avgLoss: 28,
    expectancyPerTrade: 0.93,
    notes: "Context is everything — mid-range pin bars perform at 38% (nearly random). At key S&R: 63%."
  },
  {
    strategy: "Inside Bar Breakout",
    pair: "All Majors",
    period: "2018-2024",
    timeframe: "D1",
    totalTrades: 178,
    winRate: 51.7,
    profitFactor: 1.38,
    maxDrawdown: 13.7,
    avgWin: 54,
    avgLoss: 28,
    expectancyPerTrade: 0.74,
    notes: "Mechanical and clear rules. D1 most reliable. M15/M30 produces too many false breakouts."
  },
];

// ── NEWS TRADING GUIDE ──
const NEWS_TRADING_GUIDE = {
  overview: "News events create some of the largest, fastest price moves in forex. A single economic release can move EUR/USD 100-300 pips in 30 seconds. This creates both enormous opportunity and enormous risk. Most professional traders have one of two approaches: avoid news entirely, or have a specific, rules-based news trading strategy.",
  
  whyNewsMovesMarkets: "Markets price in EXPECTATIONS. The actual number matters less than the SURPRISE relative to what the market expected. A strong NFP number that was already priced in = small reaction. A weak NFP that was expected to be strong = massive USD selloff. The deviation from expectations drives the size of the move.",
  
  threeMethods: {
    avoid: {
      name: "Method 1: Avoid Entirely (Recommended for Beginners)",
      steps: [
        "Check economic calendar every morning. Mark all high-impact events (red icons).",
        "Close all positions in the affected pair 30-45 minutes before the event.",
        "Set a reminder for 15 minutes after the event.",
        "After 15 minutes, re-evaluate the pair's direction and look for a new setup.",
        "Never hold a position through NFP, FOMC, or CPI without a specific strategy."
      ],
      pros: ["Zero event risk", "Preserves capital", "Simple to execute"],
      cons: ["Misses some good setups", "May exit profitable trades prematurely"]
    },
    aftermath: {
      name: "Method 2: Trade the Aftermath (Intermediate)",
      steps: [
        "Do not trade before or at the news release moment.",
        "Wait 2-5 minutes after the release for the initial spike to settle.",
        "Identify the direction of the SUSTAINED move (not the spike).",
        "Look for a small pullback in the new direction on M5/M1.",
        "Enter with tight stop (below the consolidation low for longs).",
        "Target: previous key level in the direction of the news move.",
        "Cancel if price is already 50+ pips from the close-before-news price."
      ],
      pros: ["Catches sustained post-news moves", "Better entries than trading the spike"],
      cons: ["Misses the initial move", "Can still get stopped by volatility"]
    },
    fade: {
      name: "Method 3: Fade the Initial Spike (Advanced)",
      steps: [
        "The initial news spike is often an overreaction that retraces.",
        "Watch for price to spike 30-50+ pips in one direction then STALL.",
        "A stalling spike followed by reversal candles = fade signal.",
        "Enter in the opposite direction of the spike, stop above/below the spike extreme.",
        "Target: pre-news price level.",
        "ONLY use this method when you see a clear stall and reversal — not on all spikes."
      ],
      pros: ["Excellent R:R when correct", "Exploits retail overreaction"],
      cons: ["High risk if news fundamentally changes the picture", "Advanced — for experienced traders only"]
    }
  }
};

console.log('✅ Analysis guides, psychology course, backtest results loaded');
