/* ═══════════════════════════════════════════════════════════════
   TRADEBABY PRO v10 — EXTENDED MARKET DATA
   Pair statistics, trade scenarios, position sizing examples
   Central bank history, master quotes
   ═══════════════════════════════════════════════════════════════ */

// ── PAIR STATISTICS DATABASE ──
const PAIR_STATISTICS = {
  'EUR/USD': {
    dailyRanges: { low: 40, average: 80, high: 120, bySession: { asia: 25, london: 65, newYork: 70, overlap: 90 } },
    keyStats: {
      averageDailyRange2024: '68 pips',
      correlationWithDXY: '-0.92',
      correlationWithSPX: '0.35',
      correlationWithGold: '0.65',
      typicalSpread: '0.5-1.5 pips ECN, 1-3 pips standard',
      swapLong: '-3.2 points per lot per day (approx 2024)',
      swapShort: '1.8 points per lot per day (approx 2024)'
    },
    technicalLevels: { major: [1.0500, 1.0800, 1.1000, 1.1200, 1.1500], psychological: [1.0550, 1.0750, 1.0850, 1.0950, 1.1050, 1.1150] }
  },
  'GBP/USD': {
    dailyRanges: { low: 60, average: 95, high: 180 },
    keyStats: { averageDailyRange2024: '88 pips', correlationWithEURUSD: '+0.85', correlationWithDXY: '-0.88', typicalSpread: '0.8-2.5 pips ECN', nickname: 'Cable' },
    technicalLevels: { major: [1.2000, 1.2400, 1.2800, 1.3000, 1.3200, 1.3500] }
  },
  'USD/JPY': {
    dailyRanges: { low: 30, average: 70, high: 150 },
    keyStats: { averageDailyRange2024: '78 pips', correlationWithUSYields10yr: '+0.89', correlationWithNikkei: '+0.72', carryTrade: 'Classic carry when US rates > Japan rates', interventionRisk: 'BOJ has directly intervened in 2022, 2023, 2024' },
    technicalLevels: { major: [140.00, 145.00, 150.00, 155.00, 160.00] }
  },
  'XAU/USD': {
    dailyRanges: { low: 8, average: 18, high: 40, note: 'Gold pip = $1 per standard lot' },
    keyStats: { correlationWithDXY: '-0.88', correlationWithRealYields: '-0.85', historicalAllTimeHigh: '$2,790 (October 2024)', keyLevels: [2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800] }
  }
};

// ── COMPLETE TRADE SCENARIOS ──
const TRADE_SCENARIOS = [
  {
    id: 'scenario-001', title: 'EUR/USD Support Bounce - Classic',
    setup: 'D1 uptrend (HH/HL intact). Price pulled back to strong horizontal support at 1.0800 tested 3 times in 3 months.',
    entry: 1.0812, stopLoss: 1.0775, takeProfit: 1.0910,
    riskReward: '2.65:1',
    lotCalc: '10000 account x 1% = $100 risk. 37 pips x $0.10 = $3.70 per lot. Lots = $100/$3.70 = 27 micro lots.',
    outcome: 'Hit Take Profit after 2 days.',
    grade: 'A+ Setup',
    lessons: ['D1 trend plus key S&R plus H4 confirmation = high probability', 'Patience for signal candle close prevented poor entry', 'Correct position sizing kept risk at exactly 1%']
  },
  {
    id: 'scenario-002', title: 'Revenge Trade Example - What NOT To Do',
    setup: 'Trader took EUR/USD long against trend. Hit stop for -$100 loss.',
    errorSequence: [
      'Immediately re-entered with 2x normal size to recover',
      'Price fell further - moved stop loss to give more room',
      'Moved stop loss again when it got close',
      'Account down $320 on one bad idea',
      'Eventually closed at -$500 loss (5% of account)'
    ],
    correctApproach: [
      'Accept the $100 loss as statistical cost of trading',
      'Take 15+ minute break before any new trades',
      'Return only when calm and able to recite your rules',
      'Next trade: same size, same rules - no connection to previous loss'
    ],
    grade: 'Rule Violation - Learning Example'
  },
  {
    id: 'scenario-003', title: 'London Breakout - Optimal Execution',
    setup: 'EUR/USD Asian range 1.0812-1.0858 (46 pips). D1 bullish trend. No news events.',
    execution: {
      observation: 'M15 candle closes at 1.0862 at 08:15 UTC - confirmed close above Asian high',
      entry: 1.0862, stopLoss: 1.0843, takeProfit: 1.0951,
      lotCalc: '10000 x 1% = $100. 15 pips x $0.10 = $1.50. Lots = 67 micro lots.',
      riskReward: '4.7:1 target'
    },
    tradeManagement: ['After 30 pips profit, move stop to break-even', 'After 50 pips, partial close 40%', 'Let remainder run to target'],
    outcome: 'Partial close +$96. Remainder hit break-even. Total: +$96 on $100 risk.',
    grade: 'A Setup - Good Execution'
  },
  {
    id: 'scenario-004', title: 'SMC Order Block Entry',
    setup: 'GBP/USD H4 bearish trend. H1 CHOCH formed. Order Block at 1.2655-1.2665.',
    execution: {
      entry: 1.2662, stopLoss: 1.2648, takeProfit: 1.2740,
      riskReward: '5.57:1'
    },
    outcome: 'Hit 1.2728, closed at 1.2720. +58 pips.',
    grade: 'A Setup - Excellent R:R'
  },
  {
    id: 'scenario-005', title: 'NFP Post-News Trade',
    setup: 'NFP beats massively: 312K vs 175K forecast. EUR/USD spikes down 53 pips to 1.0802.',
    execution: {
      waitTime: '3 minutes after release',
      entry: 1.0815, stopLoss: 1.0835, takeProfit: 1.0760,
      riskReward: '2.75:1'
    },
    outcome: 'Target hit. +55 pips.',
    grade: 'B+ Setup - Good News Trading'
  }
];

// ── POSITION SIZING EXAMPLES ──
const POSITION_SIZING_EXAMPLES = [
  {
    scenario: 'Small Account Beginner', account: 500, risk: 1, riskAmount: 5,
    note: 'With $500, micro lots are essential. Focus on learning process, not dollar amounts.',
    examples: [
      { pair: 'EUR/USD', slPips: 30, lots: '1.67 micro lots', riskCheck: '$5 risk confirmed' },
      { pair: 'GBP/USD', slPips: 40, lots: '1.25 micro lots', riskCheck: '$5 risk confirmed' }
    ]
  },
  {
    scenario: 'Medium Account Intermediate', account: 5000, risk: 1, riskAmount: 50,
    note: 'At $5000 you can trade mini lots comfortably. $50 risk is meaningful but manageable.',
    examples: [
      { pair: 'EUR/USD', slPips: 30, lots: '16.7 micro lots (0.167 mini)', riskCheck: '$50 risk confirmed' },
      { pair: 'GBP/USD', slPips: 45, lots: '11.1 micro lots', riskCheck: '$50 risk confirmed' }
    ]
  },
  {
    scenario: 'Professional Account', account: 50000, risk: 0.5, riskAmount: 250,
    note: 'Pro traders often use 0.5% to manage portfolio-level risk across multiple open trades.',
    examples: [
      { pair: 'EUR/USD', slPips: 25, lots: '1.0 standard lot', riskCheck: '$250 risk confirmed' },
      { pair: 'GBP/JPY', slPips: 40, lots: '0.94 standard lot', riskCheck: '$250 risk confirmed' }
    ]
  }
];

/* ═══════════════════════════════════════════════════════════════
   TRADEBABY PRO v10 — EXTENDED MARKET DATA (Part 2)
   Central bank history, quotes, pair statistics
   ═══════════════════════════════════════════════════════════════ */

// ── CENTRAL BANK HISTORY EXTENDED ──
const CENTRAL_BANK_EXTENDED = [
  {
    year: '1992-09', bank: 'Bank of England', event: 'Black Wednesday — ERM Exit',
    currencies: ['GBP'],
    impact: 'GBP/DEM collapsed as UK was forced out of the European Exchange Rate Mechanism. George Soros made $1 billion shorting the pound. GBP fell 15% in days.',
    lesson: 'When a government commits to maintaining an artificial exchange rate against economic fundamentals, the fundamentals always win eventually. Currency pegs are opportunities — they create predictable breaking points.'
  },
  {
    year: '1997-98', bank: 'Multiple Asian Central Banks', event: 'Asian Financial Crisis',
    currencies: ['THB', 'IDR', 'MYR', 'KRW'],
    impact: 'Thai Baht collapsed July 1997, triggering a domino effect across Southeast Asia. The Thai Baht fell 40%, Indonesian Rupiah fell 80%, Korean Won fell 50%. Contagion spread to Russia and Brazil.',
    lesson: 'Currency crises in emerging markets can spread rapidly via contagion. Weak fundamentals (current account deficits, foreign currency debt, fixed exchange rates) create vulnerability.'
  },
  {
    year: '1999-01', bank: 'European Central Bank', event: 'EUR Launch and Initial Weakness',
    currencies: ['EUR', 'USD'],
    impact: 'The EUR launched at $1.17 in 1999 but fell to a low of $0.8230 by October 2000 — a 30% decline in its first two years. Markets doubted the eurozone concept. ECB intervention in September 2000 helped stabilize.',
    lesson: 'Even major currency pair launches can be subject to sustained trends driven by fundamental doubt. EUR/USD recovering from $0.82 to $1.60 over the next 8 years shows how long fundamental trends can last.'
  },
  {
    year: '2008-09', bank: 'Federal Reserve', event: 'Zero Interest Rate Policy (ZIRP)',
    currencies: ['USD', 'All'],
    impact: 'Fed cut rates to 0-0.25% in December 2008 and began massive QE. USD initially weakened significantly. Gold surged. Began era of ultra-low rates that lasted until 2022.',
    lesson: 'Central bank crisis responses create multi-YEAR currency trends, not just weeks. The dollar weakness from 2008-2011 created 3-year trading opportunities in USD pairs.'
  },
  {
    year: '2010-12', bank: 'European Central Bank', event: 'Eurozone Debt Crisis',
    currencies: ['EUR', 'USD', 'CHF'],
    impact: 'Greece, Ireland, Portugal, Spain, Italy faced sovereign debt crises. EUR/USD fell from 1.4800 to 1.2100. CHF surged to record highs versus EUR (triggering SNB intervention).',
    lesson: 'Sovereign debt crises create sustained currency weakness for the affected currency. The ECB\'s eventual "whatever it takes" statement (Draghi, 2012) immediately reversed the EUR decline — central bank rhetoric is as powerful as action.'
  },
  {
    year: '2015-01', bank: 'Swiss National Bank', event: 'EUR/CHF Peg Removal',
    currencies: ['CHF', 'EUR'],
    impact: 'EUR/CHF went from 1.2000 to 0.8600 in 45 minutes — over 3,000 pips. Several retail forex brokers went insolvent. FXCM required $300M emergency loan. First major broker insolvency event.',
    lesson: 'The most dangerous words in forex: "The peg will never break." Central bank pegs always have a breaking point. Never hold oversized positions during extended periods of artificial price control.'
  },
  {
    year: '2016-06', bank: 'Bank of England', event: 'Brexit Vote Shock',
    currencies: ['GBP', 'EUR', 'USD'],
    impact: 'The Leave vote shocked markets that had priced in a Remain victory. GBP/USD fell from 1.5000 to 1.3100 in one session — 1,900 pips in 24 hours. GBP continued falling for months.',
    lesson: 'Binary political events (referendums, elections) create some of the most extreme forex moves because options markets underprice political risk. The lesson: when opinion polls are very close, anything can happen.'
  },
  {
    year: '2020-03', bank: 'Federal Reserve + All Major Central Banks', event: 'COVID Emergency Response',
    currencies: ['USD', 'All'],
    impact: 'Fed cut rates to zero and launched unlimited QE within days. Dollar initially surged (safe haven demand) then fell sharply as QE expanded money supply. USD/JPY fell 10% in weeks. Gold eventually reached new all-time highs.',
    lesson: 'Crisis moments create extreme volatility followed by structural trends driven by the policy response. The initial crisis reaction (USD buying) was rapidly reversed by the policy response (unlimited USD creation).'
  },
  {
    year: '2022', bank: 'Federal Reserve', event: 'Most Aggressive Rate Hiking Cycle in 40 Years',
    currencies: ['USD', 'EUR', 'GBP', 'JPY'],
    impact: 'Fed raised rates from 0.25% to 5.50% in 16 months. USD surged. EUR/USD fell to parity for first time since 2002. GBP/USD hit lowest since 1985. USD/JPY rose from 115 to 151. This created the strongest USD trend in decades.',
    lesson: 'Interest rate differential is the most powerful long-term driver of currency trends. When the Fed diverges dramatically from other central banks, it creates multi-year opportunities in USD pairs.'
  },
  {
    year: '2023-24', bank: 'Bank of Japan', event: 'End of Ultra-Loose Monetary Policy',
    currencies: ['JPY', 'USD', 'EUR'],
    impact: 'BOJ gradually ended yield curve control, then raised rates for first time in 17 years (March 2024). JPY strengthened dramatically. USD/JPY fell from 161 to 142 in weeks during the August 2024 carry trade unwind.',
    lesson: 'Long-held policies create the largest moves when they change. Decades of BOJ ultra-accommodation built massive carry trades. The unwinding created one of the fastest large-currency moves in history.'
  }
];

// ── TRADING WISDOM QUOTES EXTENDED ──
const MASTER_QUOTES = [
  { quote: "The key to trading success is emotional discipline. If intelligence were the key, there would be a lot more people making money trading.", author: "Victor Sperandeo", category: "psychology" },
  { quote: "I am always thinking about losing money as opposed to making money. Don't focus on making money, focus on protecting what you have.", author: "Paul Tudor Jones", category: "risk" },
  { quote: "The most important rule of trading is to play great defense, not great offense.", author: "Paul Tudor Jones", category: "risk" },
  { quote: "If I have positions going against me, I get right out; if they are going for me, I keep them.", author: "Jesse Livermore", category: "psychology" },
  { quote: "The elements of good trading are: cutting losses, cutting losses, and cutting losses.", author: "Ed Seykota", category: "risk" },
  { quote: "Win or lose, everybody gets what they want out of the market.", author: "Ed Seykota", category: "psychology" },
  { quote: "If you diversify, control your risk, and go with the trend, it just has to work.", author: "Larry Hite", category: "strategy" },
  { quote: "Trading is very competitive and you have to be able to handle getting your butt kicked.", author: "Paul Tudor Jones", category: "psychology" },
  { quote: "I know where I'm getting out before I get in.", author: "Bruce Kovner", category: "risk" },
  { quote: "The market is never wrong — opinions often are.", author: "Jesse Livermore", category: "philosophy" },
  { quote: "Do not anticipate and move without market confirmation — being a little late in your trade is your insurance that you are right or wrong.", author: "Jesse Livermore", category: "strategy" },
  { quote: "Throughout my financial career, I have continually witnessed examples of other people that I have known being ruined by a failure to respect risk.", author: "Larry Hite", category: "risk" },
  { quote: "When I became a winner, I said, 'I figured it out, but if I'm wrong, I'm getting the hell out, because I want to save my money and go on to the next trade.'", author: "Marty Schwartz", category: "psychology" },
  { quote: "There is the plain fool, who does the wrong thing at all times everywhere, but there is the Wall Street fool, who thinks he must trade all the time.", author: "Jesse Livermore", category: "strategy" },
  { quote: "Amateurs want to be right. Professionals want to make money.", author: "Trading Wisdom", category: "psychology" },
  { quote: "Every battle is won before it is fought.", author: "Sun Tzu", category: "preparation" },
  { quote: "Risk comes from not knowing what you're doing.", author: "Warren Buffett", category: "risk" },
  { quote: "The stock market is a device for transferring money from the Active to the Patient.", author: "Warren Buffett", category: "philosophy" },
  { quote: "Look at market fluctuations as your friend rather than your enemy; profit from folly rather than participate in it.", author: "Warren Buffett", category: "philosophy" },
  { quote: "Markets can remain irrational longer than you can remain solvent.", author: "John Maynard Keynes", category: "philosophy" },
  { quote: "The trend is your friend until it bends at the end.", author: "Ed Seykota", category: "strategy" },
  { quote: "Trade what you see, not what you think.", author: "Larry Pesavento", category: "strategy" },
  { quote: "I'm not smarter than the market. I'm just faster to admit when I'm wrong.", author: "Trading Wisdom", category: "psychology" },
  { quote: "A peak performance trader is totally focused on the present moment. They don't think about yesterday's loss or profit.", author: "Van K. Tharp", category: "psychology" },
  { quote: "Losers average losers.", author: "Paul Tudor Jones", category: "risk" },
  { quote: "Know what you own, and know why you own it.", author: "Peter Lynch (adapted to trading)", category: "strategy" },
  { quote: "The person that turns over the most rocks wins the game. And that's always been my philosophy.", author: "Peter Lynch", category: "philosophy" },
  { quote: "The four most dangerous words in investing are: 'this time it's different.'", author: "Sir John Templeton", category: "philosophy" },
  { quote: "Bull markets are born on pessimism, grow on skepticism, mature on optimism, and die on euphoria.", author: "Sir John Templeton", category: "philosophy" },
  { quote: "I never buy at the bottom and I always sell too soon.", author: "Baron Rothschild", category: "strategy" },
  { quote: "To make money in the markets, you have to think independently and be humble.", author: "Ray Dalio", category: "philosophy" },
  { quote: "Pain plus reflection equals progress.", author: "Ray Dalio", category: "psychology" },
  { quote: "He who knows only his own side of the case, knows little of that.", author: "John Stuart Mill (applied to trading)", category: "psychology" },
  { quote: "The biggest risk is not taking any risk. In a world that is changing quickly, the only strategy that is guaranteed to fail is not taking risks.", author: "Mark Zuckerberg (adapted)", category: "philosophy" },
  { quote: "Successful investing is about managing risk, not avoiding it.", author: "Benjamin Graham (adapted)", category: "risk" },
  { quote: "In trading, the answer to most questions is: it depends on the context.", author: "Trading Wisdom", category: "strategy" },
  { quote: "The best investment you can make is in yourself.", author: "Warren Buffett", category: "philosophy" },
  { quote: "Give a man a fish and you feed him for a day. Teach a man to trade and you feed him for a lifetime.", author: "Trading Wisdom", category: "philosophy" },
  { quote: "The market doesn't know your cost basis and doesn't care.", author: "Trading Wisdom", category: "psychology" },
  { quote: "It's not about how much you make when you're right. It's about how little you lose when you're wrong.", author: "George Soros (paraphrased)", category: "risk" },
  { quote: "A small position correctly sized has a much higher probability of being held through volatility than an oversized one.", author: "Trading Wisdom", category: "risk" },
  { quote: "Every morning I wake up, and I say to myself, today I could be wrong about everything I believe about markets.", author: "Trading Wisdom", category: "philosophy" },
  { quote: "The goal of a successful trader is to make the best trades. Money is secondary.", author: "Alexander Elder", category: "psychology" },
  { quote: "Hardship often prepares an ordinary person for an extraordinary destiny.", author: "C.S. Lewis (adapted for trading)", category: "psychology" },
  { quote: "It ain't what you don't know that gets you into trouble. It's what you know for sure that just ain't so.", author: "Mark Twain", category: "psychology" },
  { quote: "Trading is 10% strategy and 90% psychology. Fix your psychology and almost any reasonable strategy will work.", author: "Trading Wisdom", category: "psychology" },
  { quote: "One of the funny things about the stock market is that every time one person buys, another sells, and both think they are astute.", author: "William Feather", category: "philosophy" },
  { quote: "Never let a good crisis go to waste.", author: "Winston Churchill", category: "opportunity" },
  { quote: "In trading, patience is the act of tolerating discomfort while waiting for the optimal moment.", author: "Trading Wisdom", category: "psychology" },
  { quote: "The single biggest investing error that I see is people not having a method for defining the risk.", author: "Ray Dalio", category: "risk" }
];

// Add master quotes to DAILY_TIPS
if (typeof DAILY_TIPS !== 'undefined') {
  MASTER_QUOTES.forEach(q => {
    DAILY_TIPS.push({ tip: q.quote, by: q.author });
  });
}

console.log('✅ Extended market data loaded');
