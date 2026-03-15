/* ═══════════════════════════════════════════════════════════════
   TRADEBABY PRO v10 — TRADING ENCYCLOPEDIA
   Comprehensive reference data for the knowledge base
   ═══════════════════════════════════════════════════════════════ */

// ── COMPLETE INDICATOR REFERENCE ──
const INDICATOR_ENCYCLOPEDIA = {
  
  trend: {
    title: "Trend Indicators",
    description: "Trend indicators smooth price data to reveal the underlying direction of movement. They are lagging by nature — they confirm a trend after it has started.",
    
    "Moving Average (SMA)": {
      creator: "Unknown (used since early 20th century)",
      formula: "SMA(n) = Sum of closing prices over n periods / n",
      interpretation: "Price above SMA = bullish. Price below = bearish. SMA acting as support (in uptrend) or resistance (in downtrend). The more touches without breaking, the stronger the level.",
      bestPeriods: { "9": "Very short-term momentum, scalping", "20": "Short-term trend, Bollinger Bands base", "50": "Medium-term trend filter", "100": "Strong trend filter", "200": "The definitive long-term trend indicator watched by every institutional trader" },
      strengths: ["Simple and transparent", "Widely watched = self-fulfilling support/resistance", "200 SMA is the most respected level in all technical analysis"],
      weaknesses: ["Lags price significantly, especially in fast markets", "Generates false signals in sideways markets", "Equal weighting means recent data not emphasised"],
      bestUsed: "Identify trend direction and dynamic S&R levels. Works best when price is trending strongly.",
      worstUsed: "Ranging, choppy markets. During high-volatility news events."
    },
    
    "Exponential Moving Average (EMA)": {
      creator: "Developed through work of traders in 1960s-70s",
      formula: "EMA = (Close × Multiplier) + (Previous EMA × (1 - Multiplier)), where Multiplier = 2 / (n + 1)",
      interpretation: "Same as SMA but more responsive to recent price changes. More accurate for identifying trend changes. In an uptrend, EMA provides closer support to price than SMA.",
      bestPeriods: { "9": "Short-term momentum", "13": "Short-term crossover systems", "21": "The most popular EMA — swing traders' primary dynamic S&R", "50": "Medium-term trend", "200": "Long-term trend (EMA200 vs SMA200 is debated — both work)" },
      strengths: ["More responsive to recent price changes than SMA", "EMA21 is widely respected as institutional reference", "Better for active trading and day trading"],
      weaknesses: ["More whipsaws than SMA in choppy markets", "Slightly more complex formula"],
      bestUsed: "Entry timing in trending markets. The 21 EMA pullback entry is one of the most reliable setups.",
      worstUsed: "Same as SMA: avoid relying on EMA signals in ranging conditions."
    },
    
    "MACD (Moving Average Convergence Divergence)": {
      creator: "Gerald Appel, 1979",
      formula: "MACD Line = EMA12 - EMA26. Signal Line = EMA9 of MACD Line. Histogram = MACD - Signal",
      interpretation: "MACD above zero = overall bullish. Below zero = bearish. Crossovers: MACD crossing above Signal = buy. Below = sell. Histogram widening = momentum increasing. Narrowing = weakening.",
      components: {
        "MACD Line": "Difference between fast and slow EMA. Shows trend momentum.",
        "Signal Line": "Smoothed MACD. Used for crossover signals.",
        "Histogram": "Visual representation of MACD minus Signal. Most important for divergence analysis."
      },
      divergenceSignals: {
        "Bullish Regular Divergence": "Price lower low, MACD histogram higher low = bear exhaustion = potential reversal up",
        "Bearish Regular Divergence": "Price higher high, MACD histogram lower high = bull exhaustion = potential reversal down",
        "Bullish Hidden Divergence": "Price higher low, MACD lower low = trend continuation up",
        "Bearish Hidden Divergence": "Price lower high, MACD higher high = trend continuation down"
      },
      strengths: ["Shows both trend direction AND momentum in one indicator", "Divergence signals are powerful and relatively reliable", "Visual histogram makes momentum changes easy to spot"],
      weaknesses: ["Triple-lagging indicator (based on EMAs of EMAs)", "Many false crossovers in sideways markets"],
      bestUsed: "Divergence analysis on H4/D1. Confirming trend direction. Never use crossovers alone as trading signals.",
      worstUsed: "Scalping. News events. Highly volatile markets."
    },
    
    "Ichimoku Kinko Hyo (Ichimoku Cloud)": {
      creator: "Goichi Hosoda (pen name: Ichimoku Sanjin), published 1969 after 30 years of development",
      formula: "Tenkan-sen: (9-period high + 9-period low) / 2. Kijun-sen: (26-period high + 26-period low) / 2. Senkou Span A: (Tenkan-sen + Kijun-sen) / 2 plotted 26 periods forward. Senkou Span B: (52-period high + 52-period low) / 2 plotted 26 periods forward. Chikou Span: Current close plotted 26 periods backward.",
      interpretation: "The Kumo (cloud) formed by Span A and B acts as support and resistance. Price above cloud = bullish. Below cloud = bearish. Inside cloud = indecision. Thick cloud = strong S&R. Thin cloud = weak S&R. Twist in cloud (Span A crossing Span B) = potential trend change ahead.",
      keySignals: {
        "TK Cross": "Tenkan crosses above Kijun = buy signal (must be above cloud for conviction). Below Kijun = sell.",
        "Kumo Breakout": "Price closes above the cloud top = strong bullish breakout. Below cloud bottom = strong bearish.",
        "Chikou Confirmation": "When Chikou Span is above/below price from 26 periods ago, it confirms the current signal direction.",
        "Future Cloud": "The cloud is projected 26 periods ahead — this gives advance notice of potential S&R zones."
      },
      strengths: ["Complete system in one indicator", "Shows trend, momentum, and S&R simultaneously", "Works well across multiple timeframes"],
      weaknesses: ["Complex to learn initially", "Clutters charts with many lines", "Designed for Japanese stock markets — some argue period settings need adjustment for 24/5 forex"],
      bestUsed: "H4 and D1 timeframes for swing trading. Most powerful when all components align.",
      worstUsed: "Scalping. Very short timeframes."
    }
  },

  momentum: {
    title: "Momentum Oscillators",
    description: "Oscillators measure the rate and strength of price changes. They oscillate between defined bounds (overbought/oversold levels) and are primarily used to identify momentum shifts.",
    
    "RSI (Relative Strength Index)": {
      creator: "J. Welles Wilder Jr., 1978 (from 'New Concepts in Technical Trading Systems')",
      formula: "RSI = 100 - (100 / (1 + RS)), where RS = Average Gain / Average Loss over n periods",
      defaultPeriod: 14,
      levels: { "70+": "Overbought — potential reversal down (but can remain overbought in strong trends)", "30-": "Oversold — potential reversal up", "50": "Trend midpoint — above = bullish bias, below = bearish bias", "60-70": "Bullish momentum zone in strong uptrends", "30-40": "Bearish momentum zone in strong downtrends" },
      divergenceGuide: {
        "Bearish divergence": "Price makes new high, RSI makes lower high. Warning: upside momentum weakening.",
        "Bullish divergence": "Price makes new low, RSI makes higher low. Warning: downside momentum weakening.",
        "Bearish hidden divergence": "Price lower high, RSI higher high. Trend continuation signal in downtrend.",
        "Bullish hidden divergence": "Price higher low, RSI lower low. Trend continuation signal in uptrend."
      },
      periodGuide: { 7: "More sensitive, more signals, more false signals — good for aggressive traders", 14: "Standard — balance of sensitivity and reliability", 21: "More conservative, fewer signals, higher quality — good for swing traders" },
      strengths: ["Excellent for divergence analysis", "Clear overbought/oversold levels", "RSI 50 line is powerful trend filter"],
      weaknesses: ["Can remain overbought/oversold for extended periods in strong trends", "Generates too many signals in choppy markets", "All signals require additional confirmation"],
      keyInsight: "Never short just because RSI is above 70. In strong trends, RSI can remain overbought for many candles. Use RSI as CONFIRMATION of what you already see in price structure."
    },
    
    "Stochastic Oscillator": {
      creator: "George C. Lane, late 1950s",
      formula: "%K = ((Current Close - Lowest Low) / (Highest High - Lowest Low)) × 100. %D = 3-period SMA of %K",
      defaultSettings: { K: 14, D: 3, Slowing: 3 },
      interpretation: "%K above 80 = overbought. Below 20 = oversold. %K crossing above %D in oversold zone = buy signal. Crossing below %D in overbought zone = sell signal.",
      fastVsSlow: {
        "Fast Stochastic": "Uses raw %K. Very sensitive, generates many false signals.",
        "Slow Stochastic": "Smooths %K with a 3-period SMA before applying %D. Preferred by most traders.",
        "Full Stochastic": "All parameters adjustable. Most flexible version."
      },
      bestSettings: {
        "Scalping": "5,3,3 — fast and responsive",
        "Day trading": "14,3,3 — standard",
        "Swing trading": "21,7,7 — slower, higher quality signals"
      },
      strengths: ["Clear visual signals", "Good for identifying short-term reversals", "Works well in ranging markets"],
      weaknesses: ["Many false signals in trending markets", "Can stay extreme for extended periods"]
    },
    
    "Williams %R": {
      creator: "Larry Williams, 1966",
      formula: "%R = ((Highest High - Close) / (Highest High - Lowest Low)) × -100",
      range: "-100 to 0 (note: inverted compared to most oscillators)",
      levels: { "-20 to 0": "Overbought — potential reversal", "-80 to -100": "Oversold — potential reversal" },
      vsStochastic: "Nearly identical signals but inverted scale. Williams %R = -1 × (Stochastic - 100). Some traders prefer the inverted logic.",
      strengths: ["Simple and effective for identifying extremes", "Momentum divergence works well with this indicator"],
      weaknesses: ["Similar weaknesses to Stochastic — many false signals in trends"]
    },
    
    "CCI (Commodity Channel Index)": {
      creator: "Donald Lambert, 1980",
      formula: "CCI = (Typical Price - 20-period SMA of TP) / (0.015 × Mean Deviation), where TP = (High + Low + Close) / 3",
      levels: { "+100": "Above = overbought (strong trend signal or reversal)", "-100": "Below = oversold", "0": "Trend filter — above = bullish, below = bearish" },
      uniqueFeature: "Unlike RSI (bounded 0-100), CCI is unbounded. Extreme readings (+200, +300) indicate exceptionally strong trends, not just reversals.",
      bestUse: "Trend confirmation (stay long while CCI stays above +100 in strong uptrend). Reversal signals on divergence at key S&R levels.",
      strengths: ["Works in both trending and ranging conditions", "Divergence signals are powerful"],
      weaknesses: ["Unbounded scale makes overbought/oversold relative", "Requires context for interpretation"]
    }
  },

  volatility: {
    title: "Volatility Indicators",
    
    "ATR (Average True Range)": {
      creator: "J. Welles Wilder Jr., 1978",
      formula: "True Range = Maximum of: (High - Low), |High - Previous Close|, |Low - Previous Close|. ATR = Smoothed average of TR over n periods (usually 14).",
      interpretation: "Higher ATR = more volatile market. Lower ATR = calmer market. ATR in pips tells you the average candle range over the lookback period.",
      applications: {
        "Stop Loss": "Multiply ATR by 1.5-2 for stop distance. Wider in volatile markets, tighter in calm ones.",
        "Position sizing": "In high-ATR environments, reduce position size. Maintains consistent dollar risk per trade.",
        "Breakout confirmation": "A breakout candle should be at least 1× ATR in size to be considered significant.",
        "Profit targets": "Set targets at 2-3× ATR from entry for realistic probability.",
        "Filter weak moves": "A price move smaller than 0.5× ATR is noise. A move larger than 2× ATR is significant."
      },
      strengths: ["Pure volatility measure, works in all markets", "No overbought/oversold levels — just raw market volatility data"],
      weaknesses: ["Tells you HOW MUCH price is moving but not WHICH direction", "Lagging — yesterday's volatility may not predict today's"]
    },
    
    "Bollinger Bands": {
      creator: "John Bollinger, 1980s",
      formula: "Middle Band = SMA(20). Upper Band = SMA(20) + (2 × Standard Deviation of closes over 20 periods). Lower Band = SMA(20) - (2 × Standard Deviation).",
      keyPrinciples: {
        "95% rule": "Approximately 95% of price action should occur inside the bands (given 2 standard deviations). Price consistently breaking outside signals a strong trend.",
        "BB Squeeze": "When upper and lower bands converge significantly = lowest volatility period. Price is coiling for a breakout. Trade the direction of the eventual breakout.",
        "BB Expansion": "Bands widening dramatically = trend is strongly underway. Don't fight the trend.",
        "Band walking": "In strong trends, price can 'walk the bands' — staying near one extreme for many candles. This is NOT an automatic reversal signal.",
        "Mean reversion": "After extreme moves to the outer bands, price tends to revert toward the middle band (SMA20)."
      },
      strengths: ["Visually intuitive volatility measurement", "BB Squeeze is one of the most reliable breakout setups", "Works across all timeframes and markets"],
      weaknesses: ["Bands expand in trending markets, making them less useful as reversal signals", "Standard deviation calculation assumes normal distribution — market returns are not normally distributed"],
      keltnerChannel: "Compare Bollinger Bands to Keltner Channels (EMA ± 2×ATR). When BB is inside Keltner Channel = super squeeze = very high probability breakout incoming."
    }
  }
};

// ── COMPLETE ECONOMIC INDICATORS REFERENCE ──
const ECONOMIC_INDICATORS_REFERENCE = {
  unitedStates: {
    country: "United States",
    currency: "USD",
    centralBank: "Federal Reserve (Fed)",
    chair: "Jerome Powell (as of 2024)",
    meetingsPerYear: 8,
    primaryTarget: "2% inflation, maximum employment",
    keyIndicators: [
      {
        name: "Non-Farm Payrolls (NFP)",
        release: "First Friday of every month, 13:30 UTC",
        impact: "🔴 Extreme — largest regular USD mover",
        what: "Number of jobs added/lost outside the agricultural sector",
        interpretation: "Above forecast = USD strength (strong employment = hawkish Fed). Below forecast = USD weakness.",
        tradingNote: "Spreads on EUR/USD can spike to 10-30 pips during release. Do not enter 30 minutes before. Wait 2-5 minutes after for sustained direction.",
        historicalAverage: "~200,000 jobs added per month in healthy economy"
      },
      {
        name: "Consumer Price Index (CPI)",
        release: "Around 10th-13th of each month, 13:30 UTC",
        impact: "🔴 Extreme",
        what: "Measures the weighted average of prices of a basket of consumer goods and services",
        interpretation: "CPI above Fed target (2%) = hawkish pressure = USD strength. Below = dovish = USD weakness. Core CPI (excluding food and energy) is the number the Fed watches most closely.",
        tradingNote: "One of the top 3 USD-moving events. Reaction can be 100-200 pips instantly."
      },
      {
        name: "FOMC Rate Decision",
        release: "8 times per year, 19:00 UTC",
        impact: "🔴 Extreme — the ultimate USD event",
        what: "Federal Open Market Committee's decision on the federal funds rate",
        interpretation: "Rate hike = USD strength. Rate cut = USD weakness. Forward guidance and the press conference at 19:30 UTC often create bigger moves than the decision itself.",
        tradingNote: "Entire market watches this event. Volatility often peaks during Chair Powell's press conference. Consider being flat from 18:30-20:30 UTC."
      },
      {
        name: "GDP (Gross Domestic Product)",
        release: "Quarterly (advance, preliminary, final), typically 3-4 weeks after quarter end",
        impact: "🟡 High",
        what: "Total value of all goods and services produced in the US economy",
        interpretation: "Above expectations = USD strength. GDP contraction (negative) for 2 consecutive quarters = recession = extremely bearish USD.",
        tradingNote: "The advance reading creates most volatility. Preliminary and final revisions create moderate reactions."
      },
      {
        name: "Unemployment Rate",
        release: "Released alongside NFP on first Friday",
        impact: "🟡 High (context for NFP)",
        what: "Percentage of the labor force that is jobless",
        interpretation: "Lower unemployment = tighter labor market = potential wage inflation = Fed may need to raise rates = USD strength. Target: full employment considered ~4% or below.",
        tradingNote: "Analyzed together with NFP and wage growth data for complete picture."
      },
      {
        name: "Retail Sales",
        release: "Around the 15th of each month, 13:30 UTC",
        impact: "🟡 High",
        what: "Total receipts of retail stores — proxy for consumer spending (70% of US GDP)",
        interpretation: "Strong retail sales = consumer confident = economic growth = USD positive. Core retail sales (excluding autos) is the primary number.",
        tradingNote: "Can create 50-100 pip moves on significant surprises."
      },
      {
        name: "ISM Manufacturing/Services PMI",
        release: "First/third business day of month",
        impact: "🟡 Medium-High",
        what: "Survey of purchasing managers about business conditions",
        interpretation: "Above 50 = expansion. Below 50 = contraction. Services PMI is more important (US economy is 80% services). Readings below 45 signal potential recession.",
        tradingNote: "Leading indicator — predicts economic direction 1-2 months ahead."
      },
      {
        name: "Weekly Jobless Claims",
        release: "Every Thursday, 13:30 UTC",
        impact: "🟡 Medium",
        what: "Number of people filing for unemployment benefits for the first time",
        interpretation: "Consistent above 300,000 = employment softening. Below 200,000 = very strong labor market.",
        tradingNote: "Regular weekly event. Less dramatic than NFP but provides weekly labor market pulse."
      }
    ]
  },

  eurozone: {
    country: "Eurozone (19 member states)",
    currency: "EUR",
    centralBank: "European Central Bank (ECB)",
    president: "Christine Lagarde (as of 2024)",
    meetingsPerYear: 8,
    primaryTarget: "2% inflation (medium-term)",
    keyIndicators: [
      {
        name: "ECB Rate Decision",
        release: "8 times per year, 13:15 UTC (decision) + 13:45 UTC (press conference)",
        impact: "🔴 Extreme",
        what: "ECB's deposit facility rate decision",
        interpretation: "Rate hike = EUR strength. Rate cut = EUR weakness. Lagarde's forward guidance often moves markets more than the rate itself.",
        tradingNote: "Press conference at 13:45 UTC is often the key volatility event. Watch for 'hawkish/dovish' language changes."
      },
      {
        name: "Eurozone CPI (Inflation)",
        release: "Around last day of each month (flash), then final ~2 weeks later",
        impact: "🔴 High",
        what: "Harmonised Index of Consumer Prices for the eurozone",
        interpretation: "Above 2% target = ECB hawks want rate hikes = EUR strength. Below target = doves want cuts = EUR weakness.",
        tradingNote: "Flash estimate (end of month) creates the largest reaction. German CPI (released day before eurozone data) often signals eurozone direction."
      },
      {
        name: "Germany GDP and ZEW/IFO Business Surveys",
        release: "GDP: quarterly. ZEW: second Tuesday. IFO: last week of month",
        impact: "🟡 High",
        what: "Germany is the eurozone's largest economy (~30% of eurozone GDP)",
        interpretation: "Strong German data = EUR strength. Weak German data = concerns about entire eurozone = EUR weakness.",
        tradingNote: "Germany often trades as a proxy for European economic health."
      },
      {
        name: "Eurozone PMI (Manufacturing and Services)",
        release: "Around 22nd of each month (preliminary)",
        impact: "🟡 High",
        what: "Survey-based leading economic indicators",
        interpretation: "Above 50 = expansion = EUR positive. Below 50 = contraction = EUR negative. Composite PMI above 52 signals solid growth.",
        tradingNote: "Preliminary reading creates most market reaction."
      }
    ]
  },

  unitedKingdom: {
    country: "United Kingdom",
    currency: "GBP",
    centralBank: "Bank of England (BOE)",
    governor: "Andrew Bailey (as of 2024)",
    meetingsPerYear: 8,
    primaryTarget: "2% CPI inflation",
    keyIndicators: [
      {
        name: "BOE Rate Decision + MPC Vote",
        release: "8 times per year, typically Thursday 12:00 UTC",
        impact: "🔴 Extreme",
        what: "Monetary Policy Committee's interest rate decision with individual vote count",
        interpretation: "Unanimous hike = very hawkish = strong GBP. Split vote = uncertainty = moderate reaction. Quarterly Monetary Policy Report is released with alternate meetings.",
        tradingNote: "MPC vote split (e.g., 7-2 for hold) shows dissent and hints at future direction changes."
      },
      {
        name: "UK CPI and RPI",
        release: "Around the 15th of each month, 07:00 UTC",
        impact: "🔴 High",
        what: "Consumer Price Index and Retail Price Index for the UK",
        interpretation: "CPI above 2% BOE target = hawkish pressure = GBP strength. Below = dovish = GBP weakness.",
        tradingNote: "Released at London morning hours — creates immediate GBP volatility."
      },
      {
        name: "UK Employment and Average Earnings",
        release: "Around 12th of each month, 07:00 UTC",
        impact: "🟡 High",
        what: "ILO unemployment rate plus average earnings growth",
        interpretation: "Strong wage growth = inflation risk = hawkish BOE = GBP strength. Rising unemployment = economic concerns = GBP weakness.",
        tradingNote: "Average earnings growth is watched for wage-push inflation signals."
      },
      {
        name: "UK GDP",
        release: "Monthly and quarterly estimates, around 10th-12th of month",
        impact: "🟡 High",
        what: "Monthly GDP estimate (UK is unusual in releasing monthly estimates)",
        interpretation: "Positive monthly GDP = economic growth = GBP positive. Negative = GBP weakness.",
        tradingNote: "UK is unique in releasing monthly GDP. Quarterly GDP is the major market mover."
      }
    ]
  },

  japan: {
    country: "Japan",
    currency: "JPY",
    centralBank: "Bank of Japan (BOJ)",
    governor: "Kazuo Ueda (as of 2024)",
    meetingsPerYear: 8,
    primaryTarget: "2% inflation (long-elusive)",
    uniqueFactors: [
      "Japan maintained ultra-loose monetary policy (near-zero rates) for decades while all other major central banks raised rates",
      "BOJ's Yield Curve Control (YCC) policy pegged 10-year JGB yields near 0% — created massive intervention risk",
      "JPY's role as safe haven: JPY strengthens in global risk-off events as carry trades unwind",
      "Japan runs large current account surpluses from manufacturing exports — structural JPY demand",
      "BOJ intervention in FX markets is real and has occurred multiple times — most recently in 2022-2024"
    ],
    keyIndicators: [
      {
        name: "BOJ Rate Decision",
        release: "8 times per year, decision time varies",
        impact: "🔴 Extreme for JPY pairs",
        what: "Short-term interest rate decision (primarily regarding ending ultra-low rate policy)",
        interpretation: "Any hawkish shift (ending negative rates, allowing higher yields) = massive JPY strength. Continuation of ultra-loose policy = JPY weakness versus currencies with higher rates.",
        tradingNote: "BOJ decisions have historically been the most dramatic single events for JPY pairs. The end of yield curve control in 2024 created months-long JPY trend changes."
      },
      {
        name: "Japan CPI",
        release: "Around 20th of month, 23:30 UTC",
        impact: "🟡 High",
        what: "Consumer price inflation — long awaited in Japan after decades of deflation",
        interpretation: "Sustained CPI above 2% gives BOJ justification to normalize rates = JPY strength. CPI falling back below 2% = BOJ stays loose = JPY weakness.",
        tradingNote: "Japan's CPI has recently been elevated — watch for BOJ policy shifts."
      },
      {
        name: "Japan GDP",
        release: "Quarterly, about 40 days after quarter end",
        impact: "🟡 Medium",
        what: "Japan's economic growth rate",
        interpretation: "Strong GDP = supports JPY. Japan entering recession would be JPY-negative.",
        tradingNote: "Less market-moving than US/EU GDP but relevant for longer-term USD/JPY direction."
      }
    ]
  }
};

// ── TRADING JOURNAL ANALYTICS FORMULAS ──
const JOURNAL_ANALYTICS = {
  formulas: {
    winRate: {
      formula: "Win Rate = (Number of Winning Trades / Total Trades) × 100%",
      interpretation: "A minimum win rate for profitability depends entirely on R:R ratio. With 1:2 R:R, need only 34%. With 1:3, need only 26%.",
      example: "30 wins out of 60 trades = 50% win rate"
    },
    profitFactor: {
      formula: "Profit Factor = Gross Profit / Gross Loss",
      interpretation: "PF above 1.5 = very good system. Above 1.3 = acceptable. Below 1 = losing system. Above 2 = excellent but may indicate curve-fitting.",
      example: "$1,500 gross profit / $1,000 gross loss = 1.50 profit factor"
    },
    expectancy: {
      formula: "Expectancy = (Win Rate × Average Win) - (Loss Rate × Average Loss)",
      interpretation: "Positive expectancy means you expect to make money over many trades. This is the mathematical definition of having an 'edge'.",
      example: "(0.55 × $80) - (0.45 × $40) = $44 - $18 = $26 per trade expectancy"
    },
    maxDrawdown: {
      formula: "Max Drawdown = (Peak Equity - Trough Equity) / Peak Equity × 100%",
      interpretation: "Measures worst-case scenario for a given period. Max drawdown above 25% suggests excessive risk or system breakdown.",
      example: "Peak $12,000, trough $9,600 = ($12,000 - $9,600) / $12,000 = 20% max drawdown"
    },
    recoveryFactor: {
      formula: "Recovery Factor = Net Profit / Maximum Drawdown",
      interpretation: "Shows how efficiently the system generates returns relative to its risk. RF above 3 is considered strong.",
      example: "$6,000 net profit / $1,200 max drawdown = 5.0 recovery factor"
    },
    sharpeRatio: {
      formula: "Sharpe Ratio = (Return - Risk-Free Rate) / Standard Deviation of Returns",
      interpretation: "Risk-adjusted return measure. Above 1 = good. Above 2 = very good. Above 3 = excellent. Most retail trading systems have Sharpe ratios of 0.5-1.5.",
      example: "Annual return 20%, risk-free rate 5%, std dev 15%: (20-5)/15 = 1.0 Sharpe"
    },
    averageRR: {
      formula: "Average R:R = Average Win / Average Loss",
      interpretation: "Shows your actual achieved risk-reward ratio. Should be at least 1.5:1 for a sustainable system. Many traders plan 1:2 but achieve only 1:1.3 in practice.",
      example: "Average win $85 / Average loss $42 = 2.02:1 average R:R"
    },
    breakEvenWinRate: {
      formula: "Break-Even Win Rate = 1 / (1 + R:R Ratio)",
      interpretation: "The minimum win rate required to break even at a given R:R ratio.",
      examples: [
        "1:1 R:R → Break even at 50%",
        "1:2 R:R → Break even at 33.3%",
        "1:3 R:R → Break even at 25%",
        "1:5 R:R → Break even at 16.7%"
      ]
    }
  },
  
  targetBenchmarks: {
    beginner: { winRate: ">45%", profitFactor: ">1.1", maxDrawdown: "<20%", note: "Focus on not losing, not on making money" },
    intermediate: { winRate: ">50%", profitFactor: ">1.3", maxDrawdown: "<15%", note: "Starting to develop a recognizable edge" },
    advanced: { winRate: ">52%", profitFactor: ">1.5", maxDrawdown: "<12%", note: "Consistent, systematic profitability" },
    professional: { winRate: "45-65%", profitFactor: ">1.8", maxDrawdown: "<10%", note: "Institution-grade performance metrics" }
  }
};

console.log('✅ Trading Encyclopedia loaded');
