/* ═══════════════════════════════════════════════════════════════
   TRADEBABY PRO v10 — EXTENDED CONTENT PACK
   More lessons content, indicator deep dives, strategy details
   ═══════════════════════════════════════════════════════════════ */

const LESSON_SUPPLEMENTS = {
  "forex-basics-supplement": `
    <h3>The Mechanics of a Forex Trade — Complete Walkthrough</h3>
    <p>Understanding exactly what happens when you click Buy or Sell demystifies trading and helps you avoid costly mistakes.</p>
    <h4>Step 1: You Place a Market Buy Order</h4>
    <p>You decide to buy 0.1 standard lots (10,000 units) of EUR/USD at the current ask price of 1.0850.</p>
    <p>Your broker receives your order. In an ECN model, it is immediately matched against the best available sell order in the liquidity pool. In a market maker model, the broker takes the other side.</p>
    <h4>Step 2: Execution and Confirmation</h4>
    <p>Your order fills at 1.0850 (or very close, depending on market conditions). You now hold a long position of 10,000 EUR. You have simultaneously sold 10,850 USD (10,000 × 1.0850).</p>
    <h4>Step 3: Position is Open</h4>
    <p>Your broker's server now tracks the current bid price (what you can sell at). Your P&L updates in real-time. The spread (say 1 pip = 1.0849 bid) means you're immediately -$1 as you started at 1.0850 but can only sell at 1.0849 right now.</p>
    <h4>Step 4: Price Moves</h4>
    <p>EUR/USD moves from 1.0850 to 1.0880 — a 30-pip move. Your unrealized P&L: 30 pips × $1/pip (mini lot) = +$30.</p>
    <h4>Step 5: You Close the Position</h4>
    <p>You click Sell (Close). Your broker executes at the current bid of 1.0879 (1 pip below mid). Your realized P&L: (1.0879 - 1.0850) × 10,000 = 0.0029 × 10,000 = $29. Spread cost: $1. Total after spread: $28.</p>
    <h4>Key Takeaways</h4>
    <p>Every trade starts with an immediate cost (the spread). Price must move at least the spread amount before you break even. For a 1-pip spread, EUR/USD must move 1 pip just to break even. This is why limiting your trade frequency and ensuring minimum R:R of 1:2 is so critical — you need price to move enough to overcome the spread cost and still be profitable.</p>
  `,
  
  "candlestick-supplement": `
    <h3>The Psychology Behind Each Candlestick</h3>
    <p>Each candlestick tells a complete story about the battle between buyers and sellers during that time period. Learning to read this story transforms you from a mechanical pattern-spotter into a genuine price action reader.</p>
    <h4>The Hammer — Buyer Rescue</h4>
    <p>Imagine you're a bear. You've been selling EUR/USD aggressively all day, pushing it down from 1.0850 to 1.0790. You feel confident. Then at 1.0790, something unexpected happens: massive buying appears. Suddenly bulls are pushing back hard. By the end of the period, price is back at 1.0845 — near where it opened. The candle closes with a tiny body at the top and a long lower wick showing where the selling attempt failed. That wick is the battle scar of failed bearish pressure. The buyers won this period decisively.</p>
    <p>If this happens at a major support level, you're witnessing institutional buying interest defending that level. That's why hammers at support are so significant.</p>
    <h4>The Shooting Star — Seller Response</h4>
    <p>Now imagine you're a bull. You've been buying EUR/USD and pushing it up from 1.0800 to 1.0870. At 1.0870, sellers appear in force. Price is pushed back down to near the opening price, leaving only a tiny body at the bottom and a long upper wick. The wick tells you exactly where sellers came in aggressively and rejected higher prices.</p>
    <h4>The Doji — Market Confusion</h4>
    <p>When open and close are at the same price, it means buyers pushed price higher and sellers pushed it back, OR sellers pushed it lower and buyers recovered it, ending in a draw. Neither side won. The longer the wicks, the more violent the battle. The result: complete uncertainty. After a strong trend, this indecision is significant because it means the previously dominant side is losing its edge.</p>
    <h4>The Marubozu — One-Sided Domination</h4>
    <p>A full-body candle with no wicks whatsoever means one side completely controlled every single moment of that period. A bullish Marubozu: price opened at the low and closed at the high, with bulls pushing relentlessly the entire time. Zero resistance from bears. This is maximum conviction — often the start of a powerful new trend.</p>
    <h4>Reading Multiple Candles Together</h4>
    <p>The Morning Star pattern tells this three-part story: First candle (large bearish) = bears in full control, selling hard. Second candle (small indecision) = bears losing energy, can't push further; buyers starting to appear. Third candle (large bullish closing above first candle midpoint) = buyers now in full control; bears have capitulated. The three-candle sequence shows a complete power transfer from bears to bulls, making it one of the most reliable reversal patterns in all of technical analysis.</p>
  `,
  
  "support-resistance-supplement": `
    <h3>Why Support and Resistance Levels Form — The Institutional Perspective</h3>
    <p>Understanding WHY levels form makes you dramatically better at identifying significant ones versus insignificant ones.</p>
    <h4>Institutional Order Placement</h4>
    <p>When a major bank decides to buy EUR/USD, they don't place a single market order for $500 million — that would move price against them instantly. Instead, they place large limit orders at specific price levels. They might place $100M at 1.0800, $150M at 1.0750, $200M at 1.0700.</p>
    <p>When price reaches 1.0800 and bounces, it's partially because that bank's $100M order absorbed all the selling at that level. The level becomes "support" because a major participant was actively buying there. Next time price returns, traders who saw the bounce before expect it again. This creates self-reinforcing behavior that makes the level stronger over time.</p>
    <h4>Profit-Taking and Re-Entry Clusters</h4>
    <p>Another powerful source of S&R: when price has risen from 1.0600 to 1.0900, many traders who bought at 1.0700, 1.0750, and 1.0800 take profits at 1.0900. This selling creates resistance at 1.0900. Later, when price pulls back, those same traders (and others who saw the resistance) want to buy again at 1.0800 support. This creates a self-fulfilling cycle.</p>
    <h4>Stop Loss Clusters</h4>
    <p>Every retail trader who bought at support placed their stop loss just below the support level. These stop orders (sell orders) cluster just below obvious support. Smart money knows this. They briefly push price through the support to trigger all those stops (buying their sell orders at the stop price), then reverse the market. This is the "false break" or "stop hunt" pattern. After triggering the stops, there are no more sellers at that level — the path of least resistance is up.</p>
    <h4>Round Numbers</h4>
    <p>1.1000, 1.2000, 150.00 (JPY), 2000.00 (Gold) attract disproportionate order flow. Why? Human psychology. When a fund manager tells their algorithm "buy EUR/USD at 1.1000" — that's a round number choice. When millions of individual traders set alerts at 1.1000 — round number. When banks have contingent orders "if EUR/USD reaches 1.1000, buy $2B" — round number. This concentration of orders at round numbers makes them among the most significant S&R levels.</p>
    <h4>The Time Decay of S&R Levels</h4>
    <p>Not all support/resistance is equally strong or equally long-lasting. A level tested 3 times in the last week is less powerful than a level tested 3 times in the last 3 months — and far less powerful than a level tested 3 times over the last 3 years. Longer timeframe levels survive market regime changes and economic cycles, meaning the orders placed there are from long-term participants with deep conviction.</p>
  `,

  "risk-management-supplement": `
    <h3>The Mathematics of Account Survival</h3>
    <p>Most trading education focuses on entries and exits. Professional trading is fundamentally about account survival — the ability to remain in the game long enough for your edge to play out statistically. The mathematics are unforgiving and non-negotiable.</p>
    <h4>The Ruin Problem</h4>
    <p>Ruin probability is the mathematical chance your account reaches zero before your edge generates sufficient profit. Even a system with positive expectancy has a non-zero ruin probability if position sizes are too large. At 1% risk per trade with a positive expectancy system, ruin probability approaches zero over time. At 10% risk, ruin is virtually guaranteed.</p>
    <h4>The Power of Compounding Small Consistent Returns</h4>
    <p>A trader who consistently makes 2% per month compounds to 26.8% annually. Two percent per month sounds boring — it is not. It requires exceptional discipline, consistent execution, and genuine edge. Most "exciting" traders (big wins, big losses) underperform this boring 2% compounding consistently.</p>
    <p>$10,000 at 2%/month for 5 years = $32,810 (228% return)<br>
    $10,000 at 5%/month for 5 years = $182,938 (1,729% return)<br>
    $10,000 at 0% for 5 years = $10,000 (0% return — many traders achieve this)<br>
    $10,000 at -2%/month for 5 years = $3,042 (-70% loss)</p>
    <h4>The Recovery Asymmetry</h4>
    <p>One of the most important and least understood concepts in trading: the required return to recover from a drawdown grows exponentially with the size of the drawdown. A -10% drawdown requires only +11.1% to recover. But a -50% drawdown requires +100%. A -75% drawdown requires +300%. This mathematical reality makes deep drawdowns devastating and makes drawdown prevention the highest priority.</p>
    <h4>Correlation and Portfolio Risk</h4>
    <p>If you open EUR/USD and GBP/USD both long simultaneously, you haven't diversified your risk — you've doubled it. Both pairs are positively correlated at ~0.85, meaning they move together approximately 85% of the time. In practice, you are long USD on two trades. Apply the correlation rule: if correlation > 0.70, halve position size on each trade to maintain your total heat at the appropriate level.</p>
    <h4>Volatility-Adjusted Position Sizing</h4>
    <p>Market volatility changes dramatically. EUR/USD might have an ATR of 60 pips on a normal week and 120 pips during a FOMC week. A fixed 30-pip stop loss has completely different risk characteristics in these two environments. In normal conditions: 30 pips is 0.5× ATR — a reasonable stop that survives normal noise. In high-volatility conditions: 30 pips is 0.25× ATR — it will be hit by random noise on almost every trade. Adjust position sizing and stop distance proportionally to current ATR to maintain consistent risk across different market conditions.</p>
  `,
};

// ── EXTENDED CANDLE BIBLE PATTERNS ──
const CANDLE_PATTERNS_EXTENDED = [
  {name:'Kicker',type:'Extreme Reversal',reliability:'★★★★★',timeframe:'D1',emoji:'⚡',
   desc:'Two candles. First candle goes one direction. Second candle opens with a GAP in the opposite direction and closes strongly the other way. The complete opposite of the first candle.',
   rules:'Rare in forex (true gaps uncommon). When gaps exist or there is extreme opening difference, treat with highest priority. Represents complete institutional repositioning overnight.',
   stats:'Win rate when identified correctly: 72-78%. Rare but extremely powerful. Often occurs after major news or policy surprises.'},
  {name:'Concealing Baby Swallow',type:'Bullish Reversal',reliability:'★★★★',timeframe:'D1',emoji:'🌊',
   desc:'Four-candle bullish reversal. Two Marubozus (full-body candles) in downtrend, then a candle that gaps down and creates a long upper wick, then a final candle that engulfs the shadow.',
   rules:'Appears at the bottom of sustained downtrends only. The engulfing fourth candle must cover all shadows of the pattern.',
   stats:'Win rate at major support: 63-68%. Rare pattern but reliable when all components are present.'},
  {name:'Three Stars in the South',type:'Bullish Reversal',reliability:'★★★',timeframe:'D1',emoji:'⭐⭐⭐',
   desc:'Three bearish candles of decreasing size, each with a lower close but the lows of each candle are progressively higher. Bears are losing power.',
   rules:'Each candle must be smaller than the previous. The lower wicks should be within the range of the preceding candle.',
   stats:'Win rate at major support: 57-63%. Rarely seen but provides good evidence of trend exhaustion.'},
  {name:'Descending Hawk',type:'Bearish Continuation',reliability:'★★★',timeframe:'H4/D1',emoji:'🦅',
   desc:'A bullish candle followed by a bearish candle that opens above the first candle close but has a lower close. Not as dramatic as an engulfing but shows bears taking over.',
   rules:'Best in downtrend as continuation signal. Second candle must open above first close and close below first open.',
   stats:'Win rate as downtrend continuation: 56-61%. More common than some multi-candle patterns.'},
  {name:'Separating Lines',type:'Continuation',reliability:'★★★',timeframe:'H4/D1',emoji:'📊',
   desc:'Two candles of the same color where the second opens at the same price as the first candle open (or very close). The same open creates "separating" appearance.',
   rules:'Most powerful when preceded by a candle of the opposite color. Best after brief corrections in trending markets.',
   stats:'Win rate as trend continuation: 58-63%. Useful for confirming that corrections within trends are exhausted.'},
  {name:'Belt Hold',type:'Trend Signal',reliability:'★★★',timeframe:'H4/D1',emoji:'🎗️',
   desc:'A Marubozu that opens at or near the high (bearish) or low (bullish) of the session. A bullish belt hold opens at its low and closes near its high with no lower wick.',
   rules:'Must appear after a prior trend. Bullish belt hold at downtrend lows = potential reversal. Bearish belt hold at uptrend highs = potential reversal.',
   stats:'Win rate at extremes: 60-65%. The full-body nature shows strong directional bias for that session.'},
  {name:'Tri-Star',type:'Doji Reversal',reliability:'★★★★',timeframe:'D1',emoji:'✨✨✨',
   desc:'Three consecutive Doji candles. Three periods of complete indecision in a row. Extremely rare but highly significant — the prolonged indecision usually precedes a major move.',
   rules:'All three must be genuine Doji candles (open = close). Most powerful when occurring after a sustained trend.',
   stats:'Win rate as trend reversal signal: 64-70%. Rarity adds to its significance when it appears.'},
];

if (typeof CANDLE_PATTERNS !== 'undefined') {
  const existingNames = CANDLE_PATTERNS.map(p => p.name);
  CANDLE_PATTERNS_EXTENDED.forEach(p => {
    if (!existingNames.includes(p.name)) CANDLE_PATTERNS.push(p);
  });
}

// ── EXTENDED PAIR PROFILE DATA ──
const PAIR_PROFILE_EXTRA = {
  'GBP/JPY': {
    nickname: 'The Beast',
    character: 'Nicknamed The Beast for good reason — GBP/JPY is the most volatile of the major cross pairs. Combines GBP volatility (sensitive to Brexit aftermath, BOE policy) with JPY safe-haven dynamics. Daily ranges of 150-200 pips are normal. During risk-off events, can move 300-500 pips in hours.',
    sessions: { asia: 'Active for JPY', london: 'Very active — most liquid', newYork: 'Active' },
    dailyRange: { typical: '130-180 pips', volatile: '250-500 pips during events' },
    keyDrivers: ['BOE vs BOJ policy divergence', 'UK economic data quality', 'Global risk sentiment (JPY component)', 'London session institutional flow', 'Carry trade dynamics'],
    correlations: { strong: ['EUR/JPY (+0.94)', 'GBP/USD (+0.82)'], negative: ['USD/JPY can diverge when GBP-specific news'] },
    tradingTips: 'Reduce position size by 40-50% compared to EUR/USD. The larger daily range requires proportionally wider stops. Never trade GBP/JPY around major news events without a specific strategy. Respect the volatility — it is not just noise, it is institutional flow.',
    keyLevels: [185.00, 188.00, 190.00, 193.00, 195.00, 198.00, 200.00],
    spreadNote: '2.5-5 pips ECN, wider during London open burst',
    bestStrategy: 'EMA Pullback on H4 in confirmed trends. Avoid short timeframes.',
    avoidTimes: 'BOE, BOJ meetings, UK CPI, UK employment data, major risk-off events'
  }
};

if (typeof PAIR_PROFILES !== 'undefined') {
  Object.assign(PAIR_PROFILES, PAIR_PROFILE_EXTRA);
}

console.log('✅ Extended content pack loaded');
