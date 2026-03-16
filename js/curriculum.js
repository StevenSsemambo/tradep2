/* Curriculum data */
const CURRICULUM = [
  {
    id:'forex-basics',title:'Forex Fundamentals',emoji:'📘',
    desc:'Master the foundation of currency trading — from what forex is to placing your first trade.',
    color:'var(--blue)',
    lessons:[
      {id:'what-is-forex',title:'What is Forex?',emoji:'🌍',mins:8,xp:80,
       content:`<h3>What is the Forex Market?</h3>
<p>The <strong>Foreign Exchange (Forex or FX)</strong> market is the world's largest and most liquid financial market, with over <strong>$7.5 trillion</strong> traded daily. Unlike stocks, forex has no central exchange — it operates 24 hours a day, 5 days a week across global financial centers.</p>
<p>In simple terms: forex is the exchange of one nation's currency for another. When you travel abroad and exchange your currency at the airport, you've participated in the forex market.</p>
<h3>How Forex Trading Works</h3>
<p>Forex trading involves buying one currency while simultaneously selling another. Currencies are always traded in <strong>pairs</strong>, like EUR/USD (Euro vs US Dollar). If you believe the Euro will strengthen against the Dollar, you <em>buy</em> EUR/USD. If you're right, you profit.</p>
<h3>Key Participants</h3>
<ul>
<li><strong>Central Banks</strong> — Control monetary policy (Fed, ECB, BOE, BOJ). Biggest movers of all.</li>
<li><strong>Commercial Banks</strong> — Citibank, Deutsche Bank, JPMorgan facilitate most forex flow</li>
<li><strong>Hedge Funds & Institutions</strong> — Speculative trading with billions</li>
<li><strong>Retail Traders</strong> — That's you! Trading via online brokers</li>
<li><strong>Corporations</strong> — Hedging international business revenue</li>
<li><strong>Tourists & Travelers</strong> — Currency exchange for travel</li>
</ul>
<h3>Why Trade Forex?</h3>
<ul>
<li>✅ 24/5 market — trade anytime</li>
<li>✅ Highest liquidity in the world — tight spreads</li>
<li>✅ Leverage available for amplified returns</li>
<li>✅ Low entry capital requirement (start with $100)</li>
<li>✅ Profit in both rising AND falling markets</li>
<li>✅ No commissions on most retail accounts</li>
</ul>
<h3>Forex vs Other Markets</h3>
<table><tr><th>Market</th><th>Daily Volume</th><th>Hours</th><th>Commission</th></tr>
<tr><td>Forex</td><td>$7.5 Trillion</td><td>24/5</td><td>Spread only</td></tr>
<tr><td>Stock Market</td><td>$200 Billion</td><td>6.5 hrs/day</td><td>Per trade</td></tr>
<tr><td>Crypto</td><td>$50 Billion</td><td>24/7</td><td>0.1-0.5%</td></tr>
<tr><td>Gold (Futures)</td><td>$100 Billion</td><td>23 hrs</td><td>Per contract</td></tr>
</table>
<div class="callout"><strong>💡 Key Insight:</strong> The forex market moves based on the relative strength of economies. When the US economy outperforms Europe, the USD typically strengthens against the EUR, driving EUR/USD lower. This is the foundation of fundamental analysis.</div>`,
      },
      {id:'currency-pairs',title:'Currency Pairs Explained',emoji:'💱',mins:10,xp:100,
       content:`<h3>Understanding Currency Pairs</h3>
<p>Every forex trade involves exactly two currencies. The <strong>base currency</strong> comes first, the <strong>quote currency</strong> second.</p>
<div class="card" style="padding:14px;margin:10px 0;text-align:center"><div class="mono" style="font-size:20px;color:var(--gold)">EUR / USD = 1.0850</div><div style="display:flex;justify-content:space-between;margin-top:8px;font-size:12px;color:var(--text2)"><span>← Base (sell)</span><span>Quote (buy) →</span></div><p style="font-size:13px;color:var(--text2);margin-top:8px">1 Euro = 1.0850 US Dollars</p></div>
<p>If EUR/USD goes from 1.0850 to 1.0900, the Euro strengthened. If it goes to 1.0800, the Euro weakened.</p>
<h3>Major Pairs (Most Traded)</h3>
<p>All major pairs include the USD. They have the tightest spreads and highest liquidity:</p>
<table><tr><th>Pair</th><th>Nickname</th><th>Daily Volume</th></tr>
<tr><td>EUR/USD</td><td>The Euro</td><td>~28% of all forex</td></tr>
<tr><td>USD/JPY</td><td>The Yen</td><td>~13%</td></tr>
<tr><td>GBP/USD</td><td>Cable</td><td>~11%</td></tr>
<tr><td>AUD/USD</td><td>Aussie</td><td>~7%</td></tr>
<tr><td>USD/CAD</td><td>Loonie</td><td>~5%</td></tr>
<tr><td>USD/CHF</td><td>Swissie</td><td>~5%</td></tr>
<tr><td>NZD/USD</td><td>Kiwi</td><td>~4%</td></tr>
</table>
<h3>Minor (Cross) Pairs</h3>
<p>No USD involved. Slightly wider spreads but excellent trading opportunities:</p>
<ul><li>EUR/GBP, EUR/JPY, EUR/AUD, EUR/CHF</li><li>GBP/JPY ("The Beast" — highly volatile), GBP/AUD</li><li>AUD/JPY, AUD/NZD, CAD/JPY</li></ul>
<h3>Exotic Pairs</h3>
<p>One major currency + an emerging market currency. Wide spreads, high volatility, lower liquidity:</p>
<ul><li>USD/ZAR (South African Rand), USD/MXN (Mexican Peso)</li><li>EUR/TRY (Turkish Lira), USD/SGD (Singapore Dollar)</li></ul>
<h3>Bid, Ask & Spread</h3>
<div class="stat-grid"><div class="stat-box"><div class="stat-val" style="font-size:18px;color:var(--red)">1.0848</div><div class="stat-lbl">BID — Your sell price</div></div><div class="stat-box"><div class="stat-val" style="font-size:18px;color:var(--green)">1.0850</div><div class="stat-lbl">ASK — Your buy price</div></div></div>
<p style="margin-top:10px">The <strong>spread</strong> is 2 pips — the broker's fee. Majors: 0.5-2 pips. Minors: 2-5 pips. Exotics: 10-50+ pips.</p>
<div class="callout"><strong>⚠️ Remember:</strong> You BUY at the ASK (higher price) and SELL at the BID (lower price). The spread is your immediate cost — you start every trade slightly negative before price even moves.</div>`,
      },
      {id:'pips-lots',title:'Pips, Lots & Position Sizing',emoji:'📐',mins:12,xp:120,
       content:`<h3>What is a Pip?</h3>
<p>A <strong>pip</strong> (Percentage in Point) is the smallest standard price move in forex. The name comes from "percentage in point" — it's the standardized unit of measurement.</p>
<ul><li>Most pairs: 1 pip = <strong>0.0001</strong> (4th decimal place)</li><li>JPY pairs: 1 pip = <strong>0.01</strong> (2nd decimal place)</li><li>A <strong>pipette</strong> = 0.00001 (the 5th decimal — "fractional pip")</li></ul>
<div class="card" style="padding:12px;margin:10px 0"><div class="mono" style="font-size:13px">EUR/USD: 1.0850 → 1.0860 = <span style="color:var(--green)">+10 pips</span><br>USD/JPY: 149.00 → 150.00 = <span style="color:var(--green)">+100 pips</span><br>GBP/USD: 1.2650 → 1.2600 = <span style="color:var(--red)">-50 pips</span></div></div>
<h3>Lot Sizes — The Unit of Trade</h3>
<table><tr><th>Lot Type</th><th>Units</th><th>EUR/USD Pip Value</th><th>Best For</th></tr>
<tr><td><strong>Standard</strong></td><td class="mono">100,000</td><td style="color:var(--green)">~$10/pip</td><td>Experienced traders</td></tr>
<tr><td><strong>Mini</strong></td><td class="mono">10,000</td><td style="color:var(--green)">~$1/pip</td><td>Intermediate traders</td></tr>
<tr><td><strong>Micro</strong></td><td class="mono">1,000</td><td style="color:var(--green)">~$0.10/pip</td><td>Beginners / small accounts</td></tr>
<tr><td><strong>Nano</strong></td><td class="mono">100</td><td style="color:var(--green)">~$0.01/pip</td><td>Practice / tiny accounts</td></tr>
</table>
<h3>Pip Value Formula</h3>
<div class="card card-gold" style="padding:12px"><div class="mono" style="font-size:13px;color:var(--gold)">Pip Value = (Pip Size / Exchange Rate) × Lot Size</div><div style="font-size:12px;color:var(--text2);margin-top:6px">For USD-quoted pairs (EUR/USD, GBP/USD):<br>Pip value = 0.0001 × 100,000 = <strong style="color:var(--gold)">$10 per pip</strong> (standard lot)</div></div>
<h3>Position Sizing — The Most Important Skill</h3>
<div class="card card-gold" style="padding:14px;margin:10px 0"><div class="mono" style="color:var(--gold);font-size:13px">Lot Size = (Account × Risk%) ÷ (Stop Loss pips × Pip Value)</div><div style="font-size:13px;color:var(--text2);margin-top:10px"><strong>Example:</strong> $10,000 account, 1% risk, 30 pip SL, micro lots ($0.10/pip):<br>= ($10,000 × 0.01) ÷ (30 × $0.10)<br>= $100 ÷ $3 = <strong style="color:var(--gold)">33.3 micro lots</strong></div></div>
<div class="callout"><strong>💡 Never trade without calculating position size first.</strong> Use the built-in calculator in the TRADE tab. This one habit separates losing traders from winning ones.</div>`,
      },
      {id:'leverage-margin',title:'Leverage & Margin',emoji:'⚖️',mins:10,xp:100,
       content:`<h3>Understanding Leverage</h3>
<p>Leverage is borrowing from your broker to control a larger position. It's expressed as a ratio:</p>
<div class="stat-grid" style="margin:10px 0">
<div class="stat-box"><div class="stat-val">100:1</div><div class="stat-lbl">Leverage</div></div>
<div class="stat-box"><div class="stat-val" style="color:var(--blue)">$1,000</div><div class="stat-lbl">Your Capital</div></div>
<div class="stat-box"><div class="stat-val" style="color:var(--green)">$100K</div><div class="stat-lbl">Position Size</div></div>
<div class="stat-box"><div class="stat-val" style="color:var(--red)">1%</div><div class="stat-lbl">Margin Req.</div></div>
</div>
<h3>Types of Margin</h3>
<ul>
<li><strong>Required Margin</strong> = Position Size ÷ Leverage (the deposit held as collateral)</li>
<li><strong>Used Margin</strong> = Total required margin across all open trades</li>
<li><strong>Free Margin</strong> = Equity − Used Margin (available to open new trades)</li>
<li><strong>Margin Level</strong> = (Equity ÷ Used Margin) × 100%</li>
</ul>
<h3>The Margin Call & Stop Out</h3>
<p>When your account loses money, margin level falls. Here's what happens:</p>
<ul>
<li>🟡 <strong>Margin Call (~100% level)</strong> — Broker warns you to deposit more or close trades</li>
<li>🔴 <strong>Stop Out (~50% level)</strong> — Broker automatically closes your trades from largest loss first</li>
</ul>
<h3>Leverage: The Double-Edged Sword</h3>
<div class="stat-grid" style="margin:10px 0">
<div class="stat-box card-green"><div style="color:var(--green);font-weight:700;font-family:var(--display)">BUY 1 lot EUR/USD @ 1:100</div><div style="font-size:12px;color:var(--text2);margin-top:4px">Price moves +100 pips: <strong style="color:var(--green)">+$1,000 profit</strong> on $1,000 margin</div></div>
<div class="stat-box card-red"><div style="color:var(--red);font-weight:700;font-family:var(--display)">BUY 1 lot EUR/USD @ 1:100</div><div style="font-size:12px;color:var(--text2);margin-top:4px">Price moves -100 pips: <strong style="color:var(--red)">-$1,000 loss</strong> = 100% wipeout</div></div>
</div>
<h3>Safe Leverage Guidelines</h3>
<ul><li>🟢 Beginners: 1:5 to 1:10</li><li>🟡 Intermediate: 1:10 to 1:30</li><li>🔴 Advanced: Up to 1:50 (strict risk management required)</li></ul>
<div class="callout"><strong>🚨 Warning:</strong> High leverage is the #1 reason traders blow accounts. A 1% adverse move with 100:1 leverage = 100% loss. Most regulated brokers cap retail leverage at 1:30 (EU/UK) or 1:50 (US). Never use maximum leverage available.</div>`,
      },
      {id:'order-types',title:'Order Types Mastery',emoji:'📋',mins:11,xp:110,
       content:`<h3>The 6 Essential Order Types</h3>
<p>Understanding order types lets you execute trades precisely and automate your strategy.</p>
<h3>1. Market Order</h3>
<p>Executes immediately at the best available price. Use when speed matters more than exact price.</p>
<div class="card card-green" style="padding:10px;margin:6px 0;font-size:13px">Best for: <strong>News trades, emergency exits, highly liquid markets during peak hours</strong></div>
<h3>2. Limit Orders (4 types)</h3>
<p><strong>Buy Limit</strong> — Buy when price drops TO your level (below current). You want to buy cheaper.</p>
<p><strong>Sell Limit</strong> — Sell when price rises TO your level (above current). You want to sell higher.</p>
<p><strong>Buy Stop</strong> — Buy when price rises THROUGH your level (above current). Breakout entry.</p>
<p><strong>Sell Stop</strong> — Sell when price falls THROUGH your level (below current). Breakdown entry.</p>
<h3>3. Stop Loss (SL)</h3>
<p>Your safety net. Automatically closes a losing trade at your predetermined maximum loss level.</p>
<div class="card card-red" style="padding:10px;margin:6px 0;font-size:13px;color:var(--text2)">Place SL at a <strong>logical level</strong> — below support (for longs), above resistance (for shorts). Not just a random pip distance.</div>
<h3>4. Take Profit (TP)</h3>
<p>Locks in your profit automatically. The trade closes when price reaches your target.</p>
<h3>5. Trailing Stop</h3>
<p>Moves WITH your trade as it profits, locking in gains while letting the trade run further. If you set a 30-pip trailing stop and price moves 50 pips in your favor, your stop moves up 50 pips too.</p>
<h3>6. OCO (One Cancels the Other)</h3>
<p>Two pending orders — when one executes, the other is automatically cancelled. Perfect for trading breakouts where you don't know the direction.</p>
<div class="callout"><strong>Golden Rule:</strong> <em>NEVER</em> enter a trade without a Stop Loss. One unexpected news event, one flash crash, one gap open on Monday — any of these can wipe an account in seconds without a stop loss.</div>`,
      },
    ]
  },
  {
    id:'technical-analysis',title:'Technical Analysis',emoji:'📊',
    desc:'Read charts like a professional — the visual language of markets.',
    color:'var(--purple)',
    lessons:[
      {id:'candlestick-basics',title:'Candlestick Fundamentals',emoji:'🕯️',mins:14,xp:140,
       content:`<h3>The Language of Price Action</h3>
<p>Candlestick charts were invented by Japanese rice traders in the 18th century. They pack 4 critical prices into one visual element — giving you far more information than a simple line chart.</p>
<div style="display:flex;gap:10px;justify-content:center;margin:14px 0;flex-wrap:wrap">
<div style="text-align:center"><svg viewBox="0 0 80 160" width="80" height="160"><line x1="40" y1="10" x2="40" y2="40" stroke="#22C55E" stroke-width="2"/><rect x="20" y="40" width="40" height="80" fill="#22C55E" rx="2"/><line x1="40" y1="120" x2="40" y2="150" stroke="#22C55E" stroke-width="2"/><text y="10" x="40" text-anchor="middle" fill="#9B9891" font-size="9" font-family="monospace">HIGH</text><text y="35" x="62" text-anchor="start" fill="#F0EEE8" font-size="9" font-family="monospace">CLOSE</text><text y="125" x="62" text-anchor="start" fill="#F0EEE8" font-size="9" font-family="monospace">OPEN</text><text y="156" x="40" text-anchor="middle" fill="#9B9891" font-size="9" font-family="monospace">LOW</text></svg><div style="font-size:11px;color:var(--green);margin-top:4px;font-family:var(--display);font-weight:700">BULLISH</div></div>
<div style="text-align:center"><svg viewBox="0 0 80 160" width="80" height="160"><line x1="40" y1="10" x2="40" y2="40" stroke="#EF4444" stroke-width="2"/><rect x="20" y="40" width="40" height="80" fill="#EF4444" rx="2"/><line x1="40" y1="120" x2="40" y2="150" stroke="#EF4444" stroke-width="2"/><text y="10" x="40" text-anchor="middle" fill="#9B9891" font-size="9" font-family="monospace">HIGH</text><text y="35" x="62" text-anchor="start" fill="#F0EEE8" font-size="9" font-family="monospace">OPEN</text><text y="125" x="62" text-anchor="start" fill="#F0EEE8" font-size="9" font-family="monospace">CLOSE</text><text y="156" x="40" text-anchor="middle" fill="#9B9891" font-size="9" font-family="monospace">LOW</text></svg><div style="font-size:11px;color:var(--red);margin-top:4px;font-family:var(--display);font-weight:700">BEARISH</div></div>
</div>
<h3>The 10 Most Important Candlestick Patterns</h3>
<p><strong>🔨 Hammer</strong> — Small body at top, long lower wick. Price tested lower but closed near high. Strong bullish reversal at downtrend lows. The wick = failed selling pressure.</p>
<p><strong>☁️ Inverted Hammer</strong> — Small body at bottom, long upper wick. At downtrend lows = potential bullish reversal. Requires confirmation next candle.</p>
<p><strong>💫 Shooting Star</strong> — Small body at bottom, long upper wick. At uptrend highs = strong bearish reversal. Failed buying pressure.</p>
<p><strong>🪝 Hanging Man</strong> — Looks like a hammer but appears at uptrend highs. Bearish warning — selling pressure is emerging.</p>
<p><strong>⭐ Doji</strong> — Open = Close. Complete indecision. After a strong trend = warning of reversal. Types: Standard, Long-legged, Dragonfly (bullish), Gravestone (bearish).</p>
<p><strong>🐾 Bullish Engulfing</strong> — Second green candle completely engulfs first red candle. Strong bullish reversal. Power increases with larger size difference.</p>
<p><strong>🐾 Bearish Engulfing</strong> — Second red candle completely engulfs first green candle. Strong bearish reversal.</p>
<p><strong>☀️ Morning Star</strong> — 3 candles: Large bearish → small indecision → large bullish. Powerful bullish reversal at lows.</p>
<p><strong>🌙 Evening Star</strong> — 3 candles: Large bullish → small indecision → large bearish. Powerful bearish reversal at highs.</p>
<p><strong>🌅 Marubozu</strong> — Full body candle with no wicks. Maximum conviction — bulls or bears completely in control. Often starts new trends.</p>
<div class="callout"><strong>Context is everything.</strong> A hammer at a major support level after a 300-pip downtrend = HIGH probability. A hammer in the middle of a range = LOW probability. Never trade patterns in isolation — always ask "where is this pattern forming?"</div>`,
      },
      {id:'support-resistance',title:'Support & Resistance',emoji:'📏',mins:13,xp:130,
       content:`<h3>The Cornerstone of Technical Analysis</h3>
<p><strong>Support</strong> is a price zone where buying interest historically overcomes selling pressure — price "bounces" up. Buyers step in because they see value at this price.</p>
<p><strong>Resistance</strong> is where selling overcomes buying — price "bounces" down. Sellers step in because they think the price is overvalued.</p>
<h3>Why These Levels Form</h3>
<p>S&R levels form because of human psychology and institutional order flow:</p>
<ul>
<li><strong>Institutional orders</strong> — Banks and hedge funds place large orders at key levels</li>
<li><strong>Profit taking</strong> — Traders who bought lower take profits at the same resistance</li>
<li><strong>Stop loss clusters</strong> — Stops placed just beyond levels create momentum on breakout</li>
<li><strong>Round numbers</strong> — 1.1000, 1.2000 attract enormous order flow (psychological)</li>
</ul>
<h3>Types of S&R Levels</h3>
<p><strong>Horizontal S&R</strong> — Fixed price areas, the most reliable. Draw horizontal lines at obvious reversal zones.</p>
<p><strong>Swing Highs/Lows</strong> — Previous day, week, month highs and lows carry significant weight.</p>
<p><strong>Round Numbers</strong> — 1.1000, 1.2000, 150.00 (JPY). Institutions place large orders here.</p>
<p><strong>Dynamic S&R</strong> — Moving averages that act as support/resistance. The 200 MA is the most watched.</p>
<p><strong>Fibonacci Levels</strong> — 38.2%, 50%, 61.8% retracements. Widely watched by traders globally.</p>
<p><strong>Previous Range Highs/Lows</strong> — Yesterday's high/low are critical intraday levels.</p>
<h3>How to Draw Levels Correctly</h3>
<ul>
<li>Use the <em>body</em> of candles as primary reference, wicks secondary</li>
<li>Minimum 2 touches to confirm a level, 3+ for high confidence</li>
<li>Think in <em>zones</em> not exact prices (±5-10 pips buffer)</li>
<li>Higher timeframe levels > lower timeframe levels in importance</li>
</ul>
<h3>The Role Reversal (Most Powerful Concept)</h3>
<div class="callout"><strong>Support broken becomes Resistance. Resistance broken becomes Support.</strong> When price breaks above resistance, that level now acts as support on the pullback. The "retest" of a broken level is one of the highest probability trade setups in all of technical analysis. Wait for the retest!</div>
<h3>Confluence = Higher Probability</h3>
<p>The best trades have multiple factors aligning at one level:</p>
<ul>
<li>Horizontal S&R + Fibonacci 61.8% + MA200 = very strong setup</li>
<li>Horizontal S&R + round number + previous day high = strong setup</li>
<li>More confluence factors = higher probability = take the trade</li>
</ul>`,
      },
      {id:'trend-analysis',title:'Trend Analysis & Market Structure',emoji:'📈',mins:15,xp:150,
       content:`<h3>The Most Important Concept in Trading</h3>
<p>"The trend is your friend" is not just a cliché — it's a mathematical fact. Trading WITH the trend is the highest-probability approach in any market.</p>
<h3>Defining a Trend</h3>
<p><strong>Uptrend (Bullish):</strong> Series of Higher Highs (HH) and Higher Lows (HL). Each peak is higher than the last. Each trough is higher than the last.</p>
<p><strong>Downtrend (Bearish):</strong> Series of Lower Lows (LL) and Lower Highs (LH). Each trough is lower than the last. Each peak is lower than the last.</p>
<p><strong>Range/Consolidation:</strong> Price moves sideways between horizontal support and resistance.</p>
<h3>Market Structure Concepts (Advanced)</h3>
<p><strong>Break of Structure (BOS)</strong> — When price breaks a significant previous high (in uptrend) or low (in downtrend), confirming trend continuation. This is a <em>momentum signal</em>.</p>
<p><strong>Change of Character (CHOCH)</strong> — When price breaks structure <em>against</em> the trend direction. First sign of potential reversal. Example: in an uptrend, price fails to make a higher high and then breaks below the last higher low = CHOCH.</p>
<p><strong>Liquidity Sweep</strong> — Price briefly moves beyond a key level to grab stop orders, then reverses sharply. A fake breakout followed by a strong reversal.</p>
<h3>Multi-Timeframe Analysis</h3>
<table>
<tr><th>Timeframe</th><th>Purpose</th><th>Weight</th></tr>
<tr><td>Monthly/Weekly</td><td>Define macro trend bias</td><td>Highest</td></tr>
<tr><td>Daily/H4</td><td>Key levels, swing structure</td><td>High</td></tr>
<tr><td>H1/M30</td><td>Entry setup identification</td><td>Medium</td></tr>
<tr><td>M15/M5</td><td>Precise entry timing</td><td>Low</td></tr>
</table>
<p><strong>Rule:</strong> Only take trades in the direction of the higher timeframe trend. Never fight the trend on a lower timeframe unless the higher timeframe has clearly reversed.</p>
<h3>Trendlines</h3>
<p>Connect swing lows for uptrends, swing highs for downtrends. Minimum 2 touch points — 3+ confirms strength. A trendline break can signal a potential reversal but always wait for confirmation.</p>
<div class="callout"><strong>Top-Down Analysis Workflow:</strong> Monthly → Weekly → Daily → H4 → H1 → M15. Each timeframe gives context to the one below it. Before entering any trade, you should know the trend on at least 3 timeframes.</div>`,
      },
      {id:'moving-averages',title:'Moving Averages',emoji:'〰️',mins:12,xp:120,
       content:`<h3>The Trader's Most Versatile Tool</h3>
<p>Moving averages (MAs) smooth price action, revealing the underlying trend and acting as dynamic support/resistance. They're the most widely used indicators globally.</p>
<h3>SMA vs EMA — Which is Better?</h3>
<div class="stat-grid" style="margin:10px 0">
<div class="stat-box"><div style="font-weight:700;font-family:var(--display);color:var(--blue);margin-bottom:4px">SMA (Simple MA)</div><div style="font-size:12px;color:var(--text2)">Equal weight to all periods. Slower to react. Less noise. Better for S&R identification on H4/D1.</div></div>
<div class="stat-box"><div style="font-weight:700;font-family:var(--display);color:var(--orange);margin-bottom:4px">EMA (Exponential MA)</div><div style="font-size:12px;color:var(--text2)">More weight to recent prices. Faster response. More signals (more false ones too). Better for active entries on H1/H4.</div></div>
</div>
<div class="card" style="padding:10px;margin:8px 0"><div class="mono" style="font-size:12px;color:var(--gold)">SMA(20) = Sum of last 20 closes ÷ 20<br>EMA uses recursive formula weighting recent prices more</div></div>
<h3>The Key MA Levels Every Trader Watches</h3>
<table>
<tr><th>MA</th><th>Use</th><th>Best For</th></tr>
<tr><td><strong>EMA 9/10</strong></td><td>Very short-term momentum</td><td>Scalping, fast moves</td></tr>
<tr><td><strong>EMA 21</strong></td><td>Short-term trend, pullback entry</td><td>Swing trading</td></tr>
<tr><td><strong>SMA 50</strong></td><td>Medium-term trend indicator</td><td>Intraday to swing</td></tr>
<tr><td><strong>SMA 100</strong></td><td>Strong trend filter</td><td>All timeframes</td></tr>
<tr><td><strong>SMA 200</strong></td><td>The king — major trend/S&R</td><td>All traders</td></tr>
</table>
<h3>The Golden Cross & Death Cross</h3>
<p><strong>Golden Cross</strong> — 50 MA crosses ABOVE 200 MA = long-term bullish signal. Historically one of the most reliable macro signals.</p>
<p><strong>Death Cross</strong> — 50 MA crosses BELOW 200 MA = long-term bearish signal.</p>
<h3>MAs as Dynamic S&R</h3>
<p>In a strong uptrend, price often pulls back to the 21 EMA or 50 MA before continuing higher. This creates excellent, predictable entry opportunities with tight stop losses.</p>
<p><strong>The 3 MA System:</strong> EMA9 > EMA21 > SMA50 (all sloping up) = strong uptrend. All aligned = highest probability environment for longs.</p>
<div class="callout"><strong>Don't over-MA your chart.</strong> 2-3 MAs maximum. The best traders often use just one (e.g., the 21 EMA) and master it completely. More lines = more confusion.</div>`,
      },
      {id:'indicators',title:'Key Indicators Deep Dive',emoji:'🔭',mins:18,xp:180,
       content:`<h3>Indicators: Tools, Not Oracles</h3>
<p>Indicators are mathematical calculations of price and/or volume. They ALWAYS lag price because they're calculated from past data. Never trade indicators blindly — use them as confirmation, not direction.</p>
<h3>RSI (Relative Strength Index)</h3>
<p>Invented by J. Welles Wilder. Oscillates 0-100, measuring momentum speed and change.</p>
<ul>
<li><strong>RSI > 70</strong> = Overbought (potential reversal down — but can stay overbought for hours in strong trends)</li>
<li><strong>RSI < 30</strong> = Oversold (potential reversal up)</li>
<li><strong>RSI 50 Line</strong> = Trend filter. Above 50 = bullish bias. Below 50 = bearish bias.</li>
<li><strong>Bearish Divergence</strong> = Price makes new high, RSI makes lower high → weakening momentum</li>
<li><strong>Bullish Divergence</strong> = Price makes new low, RSI makes higher low → bearish exhaustion</li>
</ul>
<p>Best settings: <strong>RSI 14</strong> (default), RSI 7 (faster, more signals), RSI 21 (slower, fewer false signals)</p>
<h3>MACD (Moving Average Convergence Divergence)</h3>
<p>Created by Gerald Appel. Shows both trend direction AND momentum in one indicator.</p>
<ul>
<li>MACD Line = 12 EMA − 26 EMA</li>
<li>Signal Line = 9 EMA of the MACD line</li>
<li>Histogram = MACD − Signal (shows momentum strength)</li>
<li><strong>MACD crosses above Signal</strong> = Buy signal</li>
<li><strong>MACD crosses below Signal</strong> = Sell signal</li>
<li><strong>MACD above zero</strong> = Bullish overall trend</li>
<li>Divergence between MACD and price = powerful reversal warning</li>
</ul>
<h3>Bollinger Bands</h3>
<p>John Bollinger's invention. Shows volatility with a channel around price.</p>
<ul>
<li>Middle Band = 20 SMA</li>
<li>Upper Band = 20 SMA + 2 standard deviations</li>
<li>Lower Band = 20 SMA − 2 standard deviations</li>
<li><strong>BB Squeeze</strong> = Bands narrow = low volatility = big move coming soon</li>
<li><strong>BB Expansion</strong> = Bands widen = high volatility, trend underway</li>
<li>Price touching outer band = extended, but NOT always a reversal signal</li>
</ul>
<h3>Stochastic Oscillator</h3>
<p>Compares closing price to price range over a period. Settings: K=5, D=3, Slowing=3 for active trading.</p>
<ul><li>Above 80 = Overbought | Below 20 = Oversold</li><li>%K crossing above %D = buy signal (best in oversold zone)</li></ul>
<h3>ATR (Average True Range)</h3>
<p>Measures volatility. Higher ATR = bigger moves expected. Use to:</p>
<ul><li>Set stop losses (e.g., 1.5× ATR as stop)</li><li>Determine if a move is "significant"</li><li>Avoid trading when ATR is extremely low (dead markets)</li></ul>
<h3>Fibonacci Retracement</h3>
<p>Based on the golden ratio (1.618). Key levels: 23.6%, 38.2%, 50%, 61.8% (golden ratio), 78.6%</p>
<p>Draw from swing low to high (uptrend) or high to low (downtrend). Price retraces to these levels before continuing — the 61.8% "golden pocket" is most respected globally.</p>
<div class="callout"><strong>Less is more.</strong> Pick 2-3 indicators. Master them. Beginners with 10 indicators are more confused, not more informed. The best price action traders use zero indicators — just price and volume.</div>`,
      },
      {id:'chart-patterns',title:'Chart Patterns Masterclass',emoji:'🔷',mins:16,xp:160,
       content:`<h3>Chart Patterns: The Market's Recurring Language</h3>
<p>Chart patterns are visual formations that repeat across markets and timeframes. They represent the battle between buyers and sellers, with predictable outcomes based on who wins.</p>
<h3>Continuation Patterns (Trend Resumes)</h3>
<p><strong>📐 Bull/Bear Flag</strong> — Strong move (flagpole), brief consolidation in a narrow channel (flag), then continuation. Entry: breakout of the flag. Target = flagpole length. One of the highest-probability patterns.</p>
<p><strong>🔺 Ascending Triangle</strong> — Flat resistance top + rising support. Buyers getting more aggressive. Bullish breakout above flat resistance. Target = height of triangle.</p>
<p><strong>🔻 Descending Triangle</strong> — Flat support bottom + falling resistance. Sellers getting more aggressive. Bearish breakdown below flat support.</p>
<p><strong>△ Symmetrical Triangle</strong> — Converging trendlines. Market undecided. Breakout in either direction — trade the break.</p>
<p><strong>◇ Pennant</strong> — Like a flag but triangular consolidation. Short-term pause in strong trend.</p>
<h3>Reversal Patterns (Trend Changes)</h3>
<p><strong>👑 Head & Shoulders</strong> — 3 peaks: left shoulder, head (highest), right shoulder. Neckline = line through the two troughs. Break below neckline = entry. Target = head-to-neckline height projected downward. One of the most reliable reversal patterns.</p>
<p><strong>🙃 Inverse Head & Shoulders</strong> — Opposite of above. Bullish reversal at bottoms.</p>
<p><strong>⬇️⬇️ Double Top</strong> — Two equal highs at resistance. Break of middle low (neckline) = entry. Bearish reversal.</p>
<p><strong>⬆️⬆️ Double Bottom</strong> — Two equal lows at support. Break of middle high = entry. Bullish reversal (W pattern).</p>
<p><strong>🍽️ Cup & Handle</strong> — Long rounding bottom (cup) + short consolidation (handle). Bullish continuation. Target = cup depth projected up from handle breakout.</p>
<h3>How to Trade Patterns Correctly</h3>
<ul>
<li><strong>Wait for confirmation</strong> — Always wait for a close beyond the pattern boundary</li>
<li><strong>Trade the retest</strong> — After breakout, wait for retest of broken level (lower risk entry)</li>
<li><strong>Measure the target</strong> — Every pattern has a measurable price objective</li>
<li><strong>Accept failures</strong> — Even the best patterns fail 40-50% of the time</li>
</ul>
<div class="callout"><strong>Patterns fail — that's normal.</strong> If you use 1:3 R:R and patterns succeed 45% of the time, you're still highly profitable. The math works in your favor even with a sub-50% win rate.</div>`,
      },
    ]
  },
  {
    id:'risk-management',title:'Risk Management',emoji:'🛡️',
    desc:'The skill that keeps you alive in trading. Master this before anything else.',
    color:'var(--red)',
    lessons:[
      {id:'the-1percent-rule',title:'The 1% Rule & Position Sizing',emoji:'💯',mins:14,xp:140,
       content:`<h3>The Single Most Important Rule</h3>
<p>Ask any consistently profitable professional trader their #1 rule. The answer is always some version of <strong>risk management first</strong>. You can have a 40% win rate and still be highly profitable with correct sizing.</p>
<h3>The 1-2% Rule</h3>
<div class="card card-gold" style="padding:16px;margin:12px 0;text-align:center"><div style="font-family:var(--display);font-size:22px;color:var(--gold);font-weight:800">NEVER RISK MORE THAN 1-2%<br>PER TRADE</div><div style="font-size:13px;color:var(--text2);margin-top:8px">of your total account balance</div></div>
<h3>The Mathematics of Survival</h3>
<table>
<tr><th>Risk/Trade</th><th>20 Consecutive Losses</th><th>Recovery Needed</th></tr>
<tr><td style="color:var(--green)">1%</td><td style="color:var(--green)">-18% drawdown</td><td style="color:var(--green)">+22%</td></tr>
<tr><td style="color:var(--gold)">2%</td><td style="color:var(--gold)">-33% drawdown</td><td style="color:var(--gold)">+50%</td></tr>
<tr><td style="color:var(--orange)">5%</td><td style="color:var(--orange)">-64% drawdown</td><td style="color:var(--orange)">+180%</td></tr>
<tr><td style="color:var(--red)">10%</td><td style="color:var(--red)">-87% drawdown</td><td style="color:var(--red)">+700%!</td></tr>
</table>
<p>20 consecutive losses is rare but possible. Professional traders build systems that survive worst-case scenarios.</p>
<h3>Position Sizing Formula</h3>
<div class="card card-gold" style="padding:14px"><div class="mono" style="color:var(--gold);font-size:13px">Lots = (Account Balance × Risk%) ÷ (Stop Loss pips × Pip Value)</div><div style="margin-top:12px;font-size:13px;color:var(--text2)"><strong>Example:</strong> $5,000 account, 1% risk ($50), 25 pip SL, standard EUR/USD ($10/pip/standard lot):<br>Lots = $50 ÷ (25 × $10) = $50 ÷ $250 = <strong style="color:var(--gold)">0.20 standard lots (2 mini lots)</strong></div></div>
<h3>Risk/Reward — The Other Half</h3>
<p>Always set your Take Profit BEFORE you enter. Minimum 1:2 R:R (risk $1 to make $2).</p>
<div class="card card-green" style="padding:12px;margin:10px 0"><div class="section-label">Profitability with 1:2 R:R at 50% win rate</div><div style="font-size:13px;color:var(--text2)">10 trades: 5 wins × +$200 = +$1,000<br>5 losses × -$100 = -$500<br><strong style="color:var(--green)">Net: +$500 on $5,000 = +10% ✅</strong></div></div>
<div class="callout"><strong>Use the Calculator tab</strong> to automatically calculate the correct lot size for every trade. Make this a non-negotiable habit before every single trade you enter.</div>`,
      },
      {id:'drawdown-recovery',title:'Drawdown & Recovery Psychology',emoji:'📉',mins:10,xp:100,
       content:`<h3>Understanding Drawdown</h3>
<p>Drawdown is the decline from your account peak to its current trough. It's measured in percentage terms. <strong>Every professional trader experiences significant drawdowns</strong> — the difference is how they manage them.</p>
<h3>The Brutal Mathematics of Recovery</h3>
<table>
<tr><th>Drawdown</th><th>To Recover</th><th>What Happened</th></tr>
<tr><td>-10%</td><td style="color:var(--green)">+11.1%</td><td>10 bad trades at 1% risk</td></tr>
<tr><td>-20%</td><td style="color:var(--gold)">+25%</td><td>20 bad trades</td></tr>
<tr><td>-30%</td><td style="color:var(--orange)">+42.9%</td><td>2-3 bad weeks</td></tr>
<tr><td>-50%</td><td style="color:var(--red)">+100%</td><td>Trading without plan</td></tr>
<tr><td>-80%</td><td style="color:var(--red)">+400%</td><td>Account almost gone</td></tr>
</table>
<h3>Drawdown Management Rules</h3>
<ul>
<li><strong>Daily limit: -3% to -5%</strong> — Stop trading completely for the day</li>
<li><strong>Weekly limit: -5% to -8%</strong> — Reduce position size by 50%</li>
<li><strong>Monthly limit: -10%</strong> — Pause, review all trades, fix issues</li>
<li><strong>Max drawdown: -20-25%</strong> — Complete stop. Full system review required.</li>
</ul>
<h3>The Drawdown Mindset</h3>
<p>When in a drawdown:</p>
<ul>
<li>✅ Reduce position size by 50% immediately</li>
<li>✅ Review your last 20 trades for pattern errors</li>
<li>✅ Switch to demo for a week while you diagnose the issue</li>
<li>✅ Ask: Am I deviating from my plan? Am I revenge trading?</li>
<li>❌ Do NOT increase position size to "recover faster" — classic blow-up pattern</li>
<li>❌ Do NOT change strategy every few losing trades</li>
</ul>
<div class="callout"><strong>Drawdowns are tuition fees.</strong> Every great trader has had a bad drawdown. What separates survivors from those who quit is how they respond. Preserve capital — it's your most valuable asset.</div>`,
      },
      {id:'risk-reward',title:'Risk/Reward & Expectancy Math',emoji:'⚡',mins:11,xp:110,
       content:`<h3>The Math That Makes Trading Profitable</h3>
<p>Most beginners obsess over win rate. Professionals focus on <strong>expectancy</strong> — the expected profit per dollar risked over many trades.</p>
<h3>Expectancy Formula</h3>
<div class="card card-gold" style="padding:14px;text-align:center"><div class="mono" style="color:var(--gold);font-size:14px">E = (Win% × Avg Win) − (Loss% × Avg Loss)</div><div style="font-size:12px;color:var(--text2);margin-top:8px">Positive expectancy = profitable system regardless of individual trade outcomes</div></div>
<h3>Win Rate vs R:R Matrix</h3>
<table>
<tr><th>Win Rate</th><th>1:1 R:R</th><th>1:2 R:R</th><th>1:3 R:R</th><th>1:5 R:R</th></tr>
<tr><td>30%</td><td style="color:var(--red)">-$40</td><td style="color:var(--red)">-$10</td><td style="color:var(--green)">+$20</td><td style="color:var(--green)">+$80</td></tr>
<tr><td>40%</td><td style="color:var(--red)">-$20</td><td style="color:var(--green)">+$20</td><td style="color:var(--green)">+$60</td><td style="color:var(--green)">+$140</td></tr>
<tr><td>50%</td><td style="color:var(--orange)">$0</td><td style="color:var(--green)">+$50</td><td style="color:var(--green)">+$100</td><td style="color:var(--green)">+$200</td></tr>
<tr><td>60%</td><td style="color:var(--green)">+$20</td><td style="color:var(--green)">+$80</td><td style="color:var(--green)">+$140</td><td style="color:var(--green)">+$260</td></tr>
</table>
<p style="font-size:11px;color:var(--text3)">Values = profit/loss per 100 trades risking $1 each</p>
<h3>Minimum Win Rates for Profitability</h3>
<ul>
<li>1:1 R:R → Need >50% win rate</li>
<li>1:2 R:R → Need >34% win rate</li>
<li>1:3 R:R → Need >26% win rate</li>
<li>1:5 R:R → Need >17% win rate</li>
</ul>
<div class="callout"><strong>Key insight:</strong> A trader with 1:3 R:R who is right only 30% of the time makes money. Quality setups with high R:R are far more valuable than forcing "easy" trades with low R:R. Be selective. Be patient. Let the trade come to you.</div>`,
      },
    ]
  },
  {
    id:'trading-psychology',title:'Trading Psychology',emoji:'🧠',
    desc:'90% of trading is mental. Master your mind to master the markets.',
    color:'var(--purple)',
    lessons:[
      {id:'emotions-trading',title:'Fear, Greed & Emotions',emoji:'😤',mins:15,xp:150,
       content:`<h3>The Psychological Edge Is the Biggest Edge</h3>
<p>You can have the best strategy in the world and still blow your account if your emotions override your rules. Trading is a performance activity — like professional sport — and your mental state directly determines your results.</p>
<h3>The Two Enemies: Fear & Greed</h3>
<div class="stat-grid" style="margin:10px 0">
<div class="stat-box card-red"><div style="color:var(--red);font-weight:700;font-family:var(--display);font-size:15px;margin-bottom:6px">😨 FEAR</div><ul style="font-size:12px;color:var(--text2)"><li>FOMO — entering late, chasing moves</li><li>Cutting winners too early</li><li>Hesitating on valid setups</li><li>Moving TP closer out of fear</li><li>Not trading at all (paralysis)</li></ul></div>
<div class="stat-box card-gold"><div style="color:var(--gold);font-weight:700;font-family:var(--display);font-size:15px;margin-bottom:6px">🤑 GREED</div><ul style="font-size:12px;color:var(--text2)"><li>Oversizing positions</li><li>Moving TP further constantly</li><li>Revenge trading after losses</li><li>Overtrading — forcing entries</li><li>Not taking profit when obvious</li></ul></div>
</div>
<h3>The 7 Cognitive Biases That Kill Traders</h3>
<p><strong>Confirmation Bias</strong> — Only seeing information that confirms your bias. Fix: actively look for reasons NOT to take the trade.</p>
<p><strong>Recency Bias</strong> — Weighting recent events too much. After 5 wins: overconfidence and oversizing. After 5 losses: paralysis and self-doubt.</p>
<p><strong>Loss Aversion</strong> — Losses feel 2× more painful than equivalent gains feel good. Causes holding losers too long and cutting winners early.</p>
<p><strong>Overconfidence Bias</strong> — "I've traded 3 months and have a system." Leads to reckless risk-taking after a winning streak.</p>
<p><strong>Anchoring</strong> — Fixating on your entry price. The market doesn't care where you entered.</p>
<p><strong>Gambler's Fallacy</strong> — After 5 losses: "I'm due a win." After 5 wins: "I can't lose now." Every trade has the same probability regardless of history.</p>
<p><strong>Sunk Cost Fallacy</strong> — "I've held this losing trade for 3 days, I can't close it now." The time already lost is irrelevant. Close bad trades immediately.</p>
<h3>The Revenge Trade Cycle</h3>
<div class="card card-red" style="padding:12px"><div style="font-size:13px;color:var(--text2)">Loss → Anger/frustration → Larger position to recover → Another loss → More anger → Even larger position → Account destruction</div></div>
<div class="callout"><strong>The Rule:</strong> After 2 consecutive losses, STOP trading for the day. Close your platform. Go for a walk. Return tomorrow with a clear head. This single rule prevents revenge trading.</div>`,
      },
      {id:'discipline-rules',title:'Trading Discipline & The Plan',emoji:'📜',mins:13,xp:130,
       content:`<h3>The Gap Between Knowing and Doing</h3>
<p>The biggest problem most traders have isn't knowledge — they <em>know</em> to use stop losses, they <em>know</em> to follow their plan. The problem is execution under pressure, when real money is on the line.</p>
<h3>Your Pre-Trade Checklist</h3>
<div class="card" style="padding:14px;margin:10px 0">
<p style="font-weight:600;font-family:var(--display);margin-bottom:10px;color:var(--gold)">Before EVERY Trade — No Exceptions:</p>
<div style="font-size:13px;display:flex;flex-direction:column;gap:8px;color:var(--text2)">
<label style="display:flex;align-items:flex-start;gap:8px;cursor:pointer"><input type="checkbox" style="margin-top:2px;accent-color:var(--gold);flex-shrink:0"> <span>✅ Setup matches my strategy criteria exactly</span></label>
<label style="display:flex;align-items:flex-start;gap:8px;cursor:pointer"><input type="checkbox" style="margin-top:2px;accent-color:var(--gold);flex-shrink:0"> <span>✅ Stop loss at a logical level (not random pips)</span></label>
<label style="display:flex;align-items:flex-start;gap:8px;cursor:pointer"><input type="checkbox" style="margin-top:2px;accent-color:var(--gold);flex-shrink:0"> <span>✅ Position size calculated — max 1-2% risk</span></label>
<label style="display:flex;align-items:flex-start;gap:8px;cursor:pointer"><input type="checkbox" style="margin-top:2px;accent-color:var(--gold);flex-shrink:0"> <span>✅ R:R is minimum 1:2</span></label>
<label style="display:flex;align-items:flex-start;gap:8px;cursor:pointer"><input type="checkbox" style="margin-top:2px;accent-color:var(--gold);flex-shrink:0"> <span>✅ I am emotionally calm — not angry, fearful, or greedy</span></label>
<label style="display:flex;align-items:flex-start;gap:8px;cursor:pointer"><input type="checkbox" style="margin-top:2px;accent-color:var(--gold);flex-shrink:0"> <span>✅ No high-impact news in the next 30 minutes</span></label>
<label style="display:flex;align-items:flex-start;gap:8px;cursor:pointer"><input type="checkbox" style="margin-top:2px;accent-color:var(--gold);flex-shrink:0"> <span>✅ HTF trend aligns with my entry direction</span></label>
</div>
</div>
<h3>Building Your Trading Plan</h3>
<p>A trading plan is your business plan for trading. It removes emotion by defining rules in advance, before you have money on the line.</p>
<ul>
<li><strong>Universe:</strong> Which pairs/instruments you trade (specialise — max 3-5)</li>
<li><strong>Timeframes:</strong> Your analysis TF and your entry TF</li>
<li><strong>Entry rules:</strong> Exact criteria (not vague — "when I feel it's good" is not a rule)</li>
<li><strong>Exit rules:</strong> Where exactly is your SL and TP, and why</li>
<li><strong>Risk rules:</strong> Max risk per trade, daily/weekly loss limits</li>
<li><strong>Session rules:</strong> Which hours you trade, which you avoid</li>
<li><strong>Drawdown response:</strong> What you do when losing (reduce size, stop, review)</li>
</ul>
<div class="callout"><strong>Process over outcome.</strong> Judge every trade on whether you followed your rules — NOT on whether it won or lost. A perfectly executed losing trade is a success. A poorly executed winning trade is a failure. This mindset shift is transformative.</div>`,
      },
      {id:'trading-mindset',title:'The Professional Trader Mindset',emoji:'🏆',mins:14,xp:140,
       content:`<h3>What Separates Pros from Amateurs</h3>
<p>It's not IQ. It's not advanced strategies. It's not secret indicators. It's <strong>consistent execution of fundamentals, and the mental framework to handle uncertainty.</strong></p>
<h3>Amateur vs Professional: A Comparison</h3>
<table>
<tr><th>Amateur Thinks</th><th>Professional Thinks</th></tr>
<tr><td style="color:var(--red)">I need to win this trade</td><td style="color:var(--green)">I need to execute correctly</td></tr>
<tr><td style="color:var(--red)">This setup looks perfect, I'll size up</td><td style="color:var(--green)">Same size, same rules, always</td></tr>
<tr><td style="color:var(--red)">I'll move my stop — it'll come back</td><td style="color:var(--green)">My stop is my plan. I honor it.</td></tr>
<tr><td style="color:var(--red)">I can't close at a loss</td><td style="color:var(--green)">Quick losses are cheap lessons</td></tr>
<tr><td style="color:var(--red)">3 losses in a row — I need to trade more</td><td style="color:var(--green)">3 losses — I take a break</td></tr>
<tr><td style="color:var(--red)">The market is against me</td><td style="color:var(--green)">The market is neutral. I adapt.</td></tr>
<tr><td style="color:var(--red)">I'll recover with one big trade</td><td style="color:var(--green)">Slow, consistent growth always wins</td></tr>
</table>
<h3>The Probability Mindset</h3>
<p>The most important shift: <strong>stop thinking in individual trades and start thinking in distributions of trades.</strong></p>
<p>A flipped coin is 50/50. If it lands heads 5 times in a row, what's the probability of heads on flip 6? Still 50/50. The coin has no memory.</p>
<p>Trading is the same. After 5 losses, your next trade has the same probability as always. After 5 wins, the same. Each trade is independent. Manage the system, not the individual outcomes.</p>
<h3>The Daily Habits of Successful Traders</h3>
<ul>
<li>🌅 <strong>Pre-market</strong> — Review overnight price action, check economic calendar, mark key levels for the day</li>
<li>📋 <strong>Pre-trade</strong> — Complete the checklist. No exceptions.</li>
<li>📓 <strong>Post-trade</strong> — Journal every trade with screenshot</li>
<li>🌆 <strong>End of day</strong> — Review open positions, check news for tomorrow</li>
<li>🗓️ <strong>End of week</strong> — Analyze all trades. Find patterns. What worked? What didn't?</li>
<li>💪 <strong>Non-trading habits</strong> — Exercise, sleep (7-8 hrs), nutrition. Your brain is your tool.</li>
</ul>
<div class="callout"><strong>Trading mastery is a journey of 2-5 years.</strong> The traders who make it are not the smartest or most educated — they're the most patient, most disciplined, and most willing to learn from every single trade. You're on the right path.</div>`,
      },
    ]
  },
  {
    id:'fundamental-analysis',title:'Fundamental Analysis',emoji:'📰',
    desc:'Trade the economic big picture. Understand why currencies really move.',
    color:'var(--orange)',
    lessons:[
      {id:'economic-calendar',title:'Economic Calendar Mastery',emoji:'🗓️',mins:13,xp:130,
       content:`<h3>The Economic Calendar: Your Trading Bible</h3>
<p>Fundamental analysis means trading the economic data and events that drive currency values. High-impact news can move markets 50-300 pips in seconds — both for and against your position.</p>
<h3>Impact Levels</h3>
<ul>
<li>🔴 <strong>High Impact</strong> — Major market movers. Close positions 30 min before, or have a strategy.</li>
<li>🟡 <strong>Medium Impact</strong> — Notable but usually smaller moves. Monitor carefully.</li>
<li>🟢 <strong>Low Impact</strong> — Minimal effect on markets typically.</li>
</ul>
<h3>The 10 Most Market-Moving Events</h3>
<p>1. <strong>FOMC Rate Decision & Press Conference</strong> — 8 times/year. Biggest USD mover. Powell's words matter as much as the decision.</p>
<p>2. <strong>NFP (Non-Farm Payrolls)</strong> — First Friday each month. 300+ pip moves common on USD pairs. 30-min blackout recommended.</p>
<p>3. <strong>CPI (Consumer Price Index)</strong> — Monthly inflation data. Directly affects rate expectations. Massive market reaction.</p>
<p>4. <strong>GDP Data</strong> — Quarterly. Major economic health indicator.</p>
<p>5. <strong>Central Bank Rate Decisions</strong> — ECB, BOE, BOJ, RBA, RBNZ. Massive movers for their respective currencies.</p>
<p>6. <strong>PMI (Purchasing Managers Index)</strong> — Above 50 = expansion, below 50 = contraction. Monthly leading indicator.</p>
<p>7. <strong>Retail Sales</strong> — Consumer spending = 70% of US GDP. Important USD driver.</p>
<p>8. <strong>Unemployment Claims</strong> — Weekly US data. Less dramatic but consistent market mover.</p>
<p>9. <strong>Trade Balance</strong> — Surplus/deficit in goods and services. Affects currency supply/demand.</p>
<p>10. <strong>Central Bank Speeches</strong> — Fed Chair, ECB President etc. Forward guidance moves markets.</p>
<h3>Trading News Events — 3 Strategies</h3>
<p><strong>Strategy 1: Avoid entirely</strong> — Close all positions 30 min before. Best for beginners. Zero risk from news.</p>
<p><strong>Strategy 2: Trade the aftermath</strong> — Wait 2-5 minutes after release, let initial spike settle, then trade the direction of the sustained move.</p>
<p><strong>Strategy 3: Fade the spike</strong> — If initial move is extreme and quickly reverses, trade against the spike. High risk, high reward. Advanced only.</p>
<div class="callout"><strong>⚡ Spread Warning:</strong> Spreads on EUR/USD can jump from 1 pip to 20+ pips during major news events. This can trigger your stop loss even if price "goes your way" at the news. Check spreads on your broker's demo first.</div>`,
      },
      {id:'central-banks',title:'Central Banks & Monetary Policy',emoji:'🏦',mins:12,xp:120,
       content:`<h3>The True Market Movers</h3>
<p>Central banks are the most powerful entities in financial markets. A single sentence in a central bank statement can move a currency 200 pips instantly. Understanding their language and policy cycles is essential for any serious trader.</p>
<h3>The Major Central Banks</h3>
<table>
<tr><th>Central Bank</th><th>Currency</th><th>Meets</th><th>Key Tool</th></tr>
<tr><td><strong>Federal Reserve (Fed)</strong></td><td class="mono" style="color:var(--gold)">USD</td><td>8×/year</td><td>Fed Funds Rate</td></tr>
<tr><td><strong>European Central Bank (ECB)</strong></td><td class="mono" style="color:var(--gold)">EUR</td><td>8×/year</td><td>Deposit Facility Rate</td></tr>
<tr><td><strong>Bank of England (BOE)</strong></td><td class="mono" style="color:var(--gold)">GBP</td><td>8×/year</td><td>Bank Rate</td></tr>
<tr><td><strong>Bank of Japan (BOJ)</strong></td><td class="mono" style="color:var(--gold)">JPY</td><td>8×/year</td><td>Short-term Rate + YCC</td></tr>
<tr><td><strong>Swiss National Bank (SNB)</strong></td><td class="mono" style="color:var(--gold)">CHF</td><td>4×/year</td><td>Policy Rate</td></tr>
<tr><td><strong>Reserve Bank of Australia (RBA)</strong></td><td class="mono" style="color:var(--gold)">AUD</td><td>11×/year</td><td>Cash Rate</td></tr>
<tr><td><strong>Bank of Canada (BOC)</strong></td><td class="mono" style="color:var(--gold)">CAD</td><td>8×/year</td><td>Overnight Rate</td></tr>
</table>
<h3>Hawkish vs Dovish</h3>
<div class="stat-grid" style="margin:10px 0">
<div class="stat-box card-green"><div style="color:var(--green);font-weight:700;font-family:var(--display)">🦅 HAWKISH</div><p style="font-size:12px;color:var(--text2);margin-top:4px">Signals rate hikes or tight policy. Reduces money supply. <strong style="color:var(--green)">Currency strengthens.</strong></p></div>
<div class="stat-box card-red"><div style="color:var(--red);font-weight:700;font-family:var(--display)">🕊️ DOVISH</div><p style="font-size:12px;color:var(--text2);margin-top:4px">Signals rate cuts or loose policy. Expands money supply. <strong style="color:var(--red)">Currency weakens.</strong></p></div>
</div>
<h3>Interest Rate Differentials</h3>
<p>The difference in interest rates between two countries is one of the most powerful long-term drivers of currency values. If the US rate is 5.25% and Japan's is 0.1%, capital flows to USD for better returns → USD/JPY trends higher.</p>
<h3>Quantitative Easing (QE) vs Tightening (QT)</h3>
<p><strong>QE:</strong> Central bank buys assets (bonds), injecting money into economy. Expansionary = bearish for currency.</p>
<p><strong>QT:</strong> Sells assets, removing money from economy. Contractionary = bullish for currency.</p>
<div class="callout"><strong>Pro tip:</strong> Don't wait for the actual rate decision — watch for "forward guidance" in speeches and minutes. Markets price in expected rate changes weeks or months in advance. By the time the decision comes, it's often "buy the rumour, sell the fact."</div>`,
      },
      {id:'macro-drivers',title:'Macro Drivers of Currency Value',emoji:'🌏',mins:11,xp:110,
       content:`<h3>What Really Moves Currencies Long-Term</h3>
<p>Beyond short-term news, currencies are driven by fundamental economic forces. Understanding these gives you a long-term directional bias for your trades.</p>
<h3>The Big 6 Macro Drivers</h3>
<p><strong>1. Interest Rate Differentials</strong> — The most powerful driver. Higher rate = more attractive = stronger currency. Watch central bank meetings and CPI data as leading indicators.</p>
<p><strong>2. Economic Growth (GDP)</strong> — Faster-growing economy = more investment inflows = stronger currency. Quarterly GDP surprises can create multi-week trends.</p>
<p><strong>3. Inflation</strong> — Moderate inflation = healthy economy = can support higher rates = bullish. Hyperinflation = currency collapse. Deflation = weak economy = bearish.</p>
<p><strong>4. Employment</strong> — High employment = strong consumer spending = economic strength = bullish currency. NFP and unemployment claims tell this story monthly/weekly.</p>
<p><strong>5. Trade Balance</strong> — Trade surplus (exports > imports) = more demand for local currency = bullish. Countries like Japan with chronic surpluses see structural JPY support.</p>
<p><strong>6. Geopolitical Stability</strong> — Political instability, wars, sanctions = capital flight = currency weakness. Safe haven currencies (USD, CHF, JPY, Gold) strengthen in risk-off periods.</p>
<h3>Risk-On vs Risk-Off</h3>
<p><strong>Risk-On:</strong> Investors buy risky assets (AUD, NZD, emerging markets, stocks). USD, JPY, CHF weaken. Happens when economy is strong and confidence is high.</p>
<p><strong>Risk-Off:</strong> Investors flee to safety (USD, JPY, CHF, Gold). AUD, NZD, EM currencies fall sharply. Happens during crises, recessions, market panic.</p>
<h3>Commodity Currencies</h3>
<p>AUD/USD, NZD/USD, USD/CAD are closely correlated with commodity prices:</p>
<ul><li>AUD — Iron ore, coal, agricultural exports</li><li>CAD — Oil prices (Canada = major oil exporter)</li><li>NZD — Agricultural prices (dairy)</li></ul>
<div class="callout"><strong>Practical application:</strong> Before taking a swing trade, check the fundamental picture. Are you trading WITH or AGAINST the fundamental trend? Trading in the direction of fundamental momentum significantly increases probability of success.</div>`,
      },
    ]
  },
  {
    id:'trading-sessions',title:'Trading Sessions & Timing',emoji:'🕐',
    desc:'Trade at the right time. The WHEN is as important as the WHERE.',
    color:'var(--cyan)',
    lessons:[
      {id:'session-overview',title:'Global Trading Sessions',emoji:'🌐',mins:11,xp:110,
       content:`<h3>The 24-Hour Forex Clock</h3>
<p>Forex is open 24 hours but not all hours are equal. Volatility, liquidity, and trading opportunity vary dramatically depending on which financial centres are active.</p>
<h3>The Four Major Sessions</h3>
<div class="card" style="padding:14px;margin:10px 0">
<div style="display:flex;flex-direction:column;gap:12px">
<div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px"><strong style="font-family:var(--display)">🇦🇺 Sydney</strong><span class="pill pill-blue">Low Volume</span></div><div style="font-size:12px;color:var(--text2)"><span class="mono">22:00–07:00 UTC</span> | Best: AUD/USD, AUD/JPY, NZD/USD | Quiet opening of the week</div></div>
<div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px"><strong style="font-family:var(--display)">🇯🇵 Tokyo/Asia</strong><span class="pill pill-blue">Low–Medium</span></div><div style="font-size:12px;color:var(--text2)"><span class="mono">00:00–09:00 UTC</span> | Best: USD/JPY, EUR/JPY, AUD/JPY | Range-bound often</div></div>
<div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px"><strong style="font-family:var(--display)">🇬🇧 London</strong><span class="pill pill-green">High Volume ⭐</span></div><div style="font-size:12px;color:var(--text2)"><span class="mono">08:00–17:00 UTC</span> | Best: EUR/USD, GBP/USD, EUR/GBP | Most liquid session</div></div>
<div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px"><strong style="font-family:var(--display)">🇺🇸 New York</strong><span class="pill pill-green">High Volume ⭐</span></div><div style="font-size:12px;color:var(--text2)"><span class="mono">13:00–22:00 UTC</span> | Best: All USD pairs | NFP, FOMC releases here</div></div>
</div>
</div>
<h3>🔥 London/New York Overlap (13:00–17:00 UTC)</h3>
<div class="card card-gold" style="padding:12px;margin:10px 0"><p style="font-size:13px;color:var(--text2)">This 4-hour window has the <strong>highest volume and tightest spreads</strong> of any trading period. Both major financial centres are active simultaneously. Most major trend moves start or accelerate here. This is when professional traders are most active.</p></div>
<h3>Session Characteristics</h3>
<table>
<tr><th>Session</th><th>Characteristic</th><th>Best Strategy</th></tr>
<tr><td>Asian</td><td>Range-bound, low volatility</td><td>Range trading, carry</td></tr>
<tr><td>London Open</td><td>Strong directional moves</td><td>Breakout of Asian range</td></tr>
<tr><td>London/NY Overlap</td><td>Highest volatility + volume</td><td>Trend following</td></tr>
<tr><td>NY Afternoon</td><td>Quieter, range develops</td><td>Fade extreme moves</td></tr>
<tr><td>Weekend</td><td>Market closed</td><td>Analysis only</td></tr>
</table>
<div class="callout"><strong>Time zone tip:</strong> Add UTC to your phone/computer alongside your local time. Forex uses UTC as the reference standard. All major news releases, session opens, and daily candle closes are measured from UTC (or New York time = UTC-5).</div>`,
      },
      {id:'day-of-week',title:'Day of Week Effects',emoji:'📅',mins:8,xp:80,
       content:`<h3>Not All Days Are Created Equal</h3>
<p>Professional traders know that certain days of the week have higher probability setups, while others are best avoided.</p>
<h3>The Weekly Pattern</h3>
<p><strong>Monday</strong> — Gaps from weekend news. Low volume initially. Markets "finding direction." Avoid trading the open gap blindly. Often a trap day.</p>
<p><strong>Tuesday</strong> — Volume picks up. Usually the first clear directional day. Good for trend trades established Monday.</p>
<p><strong>Wednesday</strong> — Mid-week liquidity. Often the highest volume day. If a trend is developing, Wednesday often has the strongest continuation moves. Watch for FOMC minutes.</p>
<p><strong>Thursday</strong> — Bank of England, ECB meetings often on Thursdays. USD claims data. Still active.</p>
<p><strong>Friday</strong> — NFP first Friday of month = massive volatility. Other Fridays: lower volume as traders square positions for the weekend. Spreads widen into Friday close. <strong>Avoid carrying positions over the weekend.</strong></p>
<h3>Monthly Calendar Awareness</h3>
<ul>
<li><strong>First Friday</strong> — NFP. Don't trade EUR/USD or GBP/USD 30 min before without a strategy.</li>
<li><strong>Mid-month</strong> — CPI data (US, UK, Europe). Major mover.</li>
<li><strong>Month-end</strong> — Institutional rebalancing. Unusual flows. Can reverse trends temporarily.</li>
<li><strong>Quarter-end</strong> — Larger institutional rebalancing. Increased volatility.</li>
</ul>
<div class="callout"><strong>Best days to trade:</strong> Tuesday, Wednesday, Thursday during London/NY overlap. Worst days: Monday morning and Friday afternoon. This alone can improve your win rate by filtering out lower-probability environments.</div>`,
      },
    ]
  },
  {
    id:'trading-calculations',title:'Trading Calculations',emoji:'🧮',
    desc:'Master the numbers. Every profitable trader lives and breathes these calculations.',
    color:'var(--gold)',
    lessons:[
      {id:'key-calculations',title:'Essential Trade Math',emoji:'📊',mins:14,xp:140,
       content:`<h3>The Numbers Every Trader Must Know Automatically</h3>
<p>These calculations should become second nature. Do them before every trade. Use the calculator in the TRADE tab for instant results.</p>
<h3>1. Pip Value Calculation</h3>
<div class="card" style="padding:12px;margin:8px 0"><div class="mono" style="font-size:13px;color:var(--gold)">Pip Value (USD) = (Pip × Lot Size) ÷ Current Rate</div><div style="font-size:12px;color:var(--text2);margin-top:6px">For EUR/USD (USD is quote): Pip Value = 0.0001 × 100,000 = $10/pip (standard lot)<br>For USD/JPY (USD is base): Pip Value = 0.01 × 100,000 ÷ 150 = $6.67/pip</div></div>
<h3>2. Position Size</h3>
<div class="card" style="padding:12px;margin:8px 0"><div class="mono" style="font-size:13px;color:var(--gold)">Lots = Risk Amount ÷ (SL Pips × Pip Value per lot)</div><div style="font-size:12px;color:var(--text2);margin-top:6px">$10,000 account, 1% risk ($100), 40 pip SL, micro lots:<br>$100 ÷ (40 × $0.10) = $100 ÷ $4 = <strong style="color:var(--gold)">25 micro lots</strong></div></div>
<h3>3. Profit & Loss Calculation</h3>
<div class="card" style="padding:12px;margin:8px 0"><div class="mono" style="font-size:13px;color:var(--gold)">P&L = (Close − Open) × Lots × 100,000 ÷ Quote Rate</div><div style="font-size:12px;color:var(--text2);margin-top:6px">Buy EUR/USD 1.0800 → Close 1.0860, 0.5 standard lots:<br>= (1.0860 − 1.0800) × 0.5 × 100,000 ÷ 1.0860<br>= 0.006 × 50,000 ÷ 1.0860 ≈ <strong style="color:var(--green)">$276</strong></div></div>
<h3>4. Swap (Rollover) Calculation</h3>
<div class="card" style="padding:12px;margin:8px 0"><div class="mono" style="font-size:13px;color:var(--gold)">Daily Swap = Lots × Swap Rate (from broker)</div><div style="font-size:12px;color:var(--text2);margin-top:6px">Check broker's swap rates before any multi-day trade. Positive swap = you earn. Negative = you pay.<br>Triple swap on Wednesday night (covers Sat+Sun).</div></div>
<h3>5. Win Rate & Expectancy</h3>
<div class="card" style="padding:12px;margin:8px 0"><div class="mono" style="font-size:13px;color:var(--gold)">Expectancy = (Win% × Avg Win) − (Loss% × Avg Loss)<br>Break-even Win Rate = 1 ÷ (1 + R:R Ratio)</div><div style="font-size:12px;color:var(--text2);margin-top:6px">1:2 R:R: Break-even = 1 ÷ 3 = 33.3%<br>1:3 R:R: Break-even = 1 ÷ 4 = 25%</div></div>
<h3>6. Margin Required</h3>
<div class="card" style="padding:12px;margin:8px 0"><div class="mono" style="font-size:13px;color:var(--gold)">Margin = (Lot Size × Contract Size) ÷ Leverage</div><div style="font-size:12px;color:var(--text2);margin-top:6px">1 standard lot EUR/USD at 1:100 leverage:<br>= (1 × 100,000 × 1.08) ÷ 100 = <strong style="color:var(--gold)">$1,080 margin</strong></div></div>
<div class="callout"><strong>Use the built-in calculator</strong> in the TRADE tab → Calc button. All these formulas are built in. Always calculate BEFORE entering — never guess position sizes.</div>`,
      },
    ]
  },
  {
    id:'smc-concepts',title:'Smart Money Concepts (SMC)',emoji:'🏛️',
    desc:'Trade with the banks. Understand institutional order flow.',
    color:'var(--cyan)',
    lessons:[
      {id:'smc-intro',title:'Introduction to SMC',emoji:'💡',mins:16,xp:160,
       content:`<h3>What Is Smart Money?</h3>
<p>Smart Money = institutional traders (banks, hedge funds, central banks). They move the markets. Retail traders are "dumb money" — often on the wrong side of institutional moves. SMC teaches you to identify institutional footprints and trade alongside them.</p>
<h3>Core SMC Concepts</h3>
<p><strong>Order Blocks (OB)</strong> — Areas where institutions placed large orders, causing a significant impulse move. The last bearish candle before a major bullish impulse = bullish Order Block. Price often returns to these zones for institutions to complete their orders.</p>
<p><strong>Fair Value Gaps (FVG / Imbalance)</strong> — A 3-candle pattern where candle 1 and candle 3 don't overlap, leaving a "gap" in price delivery. Represents an imbalance between buyers and sellers. Price often returns to fill FVGs before continuing.</p>
<p><strong>Liquidity</strong> — Pools of buy/sell stop orders that accumulate above swing highs and below swing lows. Institutions need liquidity to fill large orders. They "hunt" retail stops before reversing.</p>
<p><strong>Break of Structure (BOS)</strong> — Confirmed trend continuation. Price breaks a key swing high (bullish) or swing low (bearish).</p>
<p><strong>Change of Character (CHOCH)</strong> — First sign of trend reversal. Price breaks structure against the prevailing trend. This is the CHOCH candle — the one that broke the last relevant swing.</p>
<p><strong>Premium & Discount</strong> — Price above the 50% of a recent swing = Premium (expensive, look to sell). Price below 50% = Discount (cheap, look to buy).</p>
<h3>The SMC Trading Model</h3>
<div class="card" style="padding:14px;margin:10px 0">
<ol style="font-size:13px;display:flex;flex-direction:column;gap:6px;color:var(--text2)">
<li>Identify HTF (D1/H4) market structure and direction</li>
<li>On H1: Wait for CHOCH — first structure break against HTF trend</li>
<li>After CHOCH: price is likely retracing to HTF direction</li>
<li>Mark the Order Block at the CHOCH point</li>
<li>Wait for price to return to the OB zone</li>
<li>Use M15/M5 for entry confirmation (FVG fill, candlestick pattern)</li>
<li>SL: below/above the Order Block extreme</li>
<li>TP: next liquidity pool (equal highs/lows, previous swing points)</li>
</ol>
</div>
<div class="callout"><strong>SMC popularity warning:</strong> SMC has become extremely popular on social media. When millions of traders watch the same patterns, institutions adapt. Always combine SMC with other confluence factors. The tool is valid — but mechanical application rarely works long-term.</div>`,
      },
      {id:'liquidity-hunting',title:'Liquidity & Stop Hunting',emoji:'🎯',mins:12,xp:120,
       content:`<h3>Why Retail Traders Get Stopped Out at the Worst Times</h3>
<p>You enter a trade, place your stop at the obvious level. Price hits your stop, then immediately reverses to your target. Sound familiar? This is liquidity hunting — it's not random and it's not bad luck.</p>
<h3>Where Institutions Hunt Liquidity</h3>
<ul>
<li><strong>Below swing lows</strong> — Retail buys have stops here</li>
<li><strong>Above swing highs</strong> — Retail sells have stops here</li>
<li><strong>Below/above round numbers</strong> — 1.1000, 1.2000 (massive order clusters)</li>
<li><strong>Equal Highs (EQH)</strong> — Two or more highs at same level = obvious buy-stop cluster</li>
<li><strong>Equal Lows (EQL)</strong> — Two or more lows at same level = obvious sell-stop cluster</li>
<li><strong>Session highs/lows</strong> — Previous day high/low, Asian range extremes</li>
</ul>
<h3>The Liquidity Hunt Pattern</h3>
<div class="card" style="padding:12px;margin:10px 0;font-size:13px;color:var(--text2)">
1. Market has clear swing high with multiple retail sell stops above<br>
2. Institutions push price above swing high (stop hunt spike)<br>
3. Retail stops triggered → provides liquidity for institutional SELL orders<br>
4. Price reverses strongly downward (institutions now short)<br>
5. Retail who just got stopped out watches price go their original direction
</div>
<h3>How to Use This Knowledge</h3>
<ul>
<li><strong>Don't place stops at obvious levels</strong> — go 5-10 pips beyond the obvious cluster</li>
<li><strong>Watch for sweep + reversal setups</strong> — long wick through key level then strong reversal = high probability trade</li>
<li><strong>Wait for liquidity sweep before entering</strong> — don't enter before the sweep</li>
<li><strong>Equal highs/lows are targets</strong> — price is likely to sweep them eventually</li>
</ul>
<div class="callout"><strong>The fake breakout setup:</strong> One of the highest probability setups in professional trading. Price sweeps beyond a key level, grabs the liquidity, then aggressively reverses. Enter on the reversal candle. Stop beyond the sweep wick. Target the opposite side of the range.</div>`,
      },
    ]
  },
  {
    id:'mt5-guide',title:'MetaTrader 5 (MT5) Mastery',emoji:'💻',
    desc:'Master the world\'s most popular trading platform end-to-end.',
    color:'var(--blue)',
    lessons:[
      {id:'mt5-interface',title:'MT5 Interface & Setup',emoji:'🖥️',mins:12,xp:120,
       content:`<h3>MetaTrader 5 — The Professional Standard</h3>
<p>MT5 is the most widely used professional retail trading platform. Available on desktop (Windows/Mac), web browser, and mobile (iOS/Android). Most brokers support it.</p>
<h3>MT5 Interface Layout</h3>
<p><strong>Market Watch Panel (Left)</strong> — List of instruments with live bid/ask prices. Right-click → "Chart Window" to open. Right-click → "Specification" for full contract details.</p>
<p><strong>Chart Area (Center)</strong> — Your main workspace. Multiple charts. Right-click for settings. Mouse wheel to zoom. Drag to scroll.</p>
<p><strong>Navigator Panel (Left)</strong> — Access indicators, expert advisors (EAs), scripts. Drag indicator to chart to apply.</p>
<p><strong>Terminal Panel (Bottom)</strong></p>
<ul>
<li><strong>Trade tab</strong> — Open positions with real-time P&L</li>
<li><strong>History tab</strong> — Closed trade history</li>
<li><strong>Alerts tab</strong> — Custom price alerts</li>
<li><strong>Mailbox tab</strong> — Broker messages</li>
</ul>
<h3>Essential MT5 Keyboard Shortcuts</h3>
<table>
<tr><th>Shortcut</th><th>Action</th></tr>
<tr><td class="mono">F9</td><td>Open New Order dialog</td></tr>
<tr><td class="mono">F8</td><td>Chart properties</td></tr>
<tr><td class="mono">+/−</td><td>Zoom in/out on chart</td></tr>
<tr><td class="mono">Ctrl+Z</td><td>Undo drawing</td></tr>
<tr><td class="mono">Delete</td><td>Delete selected object</td></tr>
<tr><td class="mono">Ctrl+A</td><td>Select all objects</td></tr>
<tr><td class="mono">H</td><td>Toggle crosshair cursor</td></tr>
<tr><td class="mono">Ctrl+G</td><td>Toggle grid</td></tr>
<tr><td class="mono">End</td><td>Jump to current candle</td></tr>
</table>
<h3>Step-by-Step: Placing a Trade in MT5</h3>
<ol style="font-size:13px;color:var(--text2);display:flex;flex-direction:column;gap:5px">
<li>Open the chart for your chosen pair</li>
<li>Press F9 or click "New Order" button in toolbar</li>
<li>Select instrument (should auto-fill from chart)</li>
<li>Choose order type: Market, Limit, Stop</li>
<li>Set Volume (lot size — calculate this first!)</li>
<li>Set Stop Loss price (NOT pips — set the actual price level)</li>
<li>Set Take Profit price</li>
<li>Click Buy (blue) or Sell (red) to execute</li>
<li>Confirm position appears in Trade tab</li>
</ol>
<div class="callout"><strong>MT5 Stop Loss tip:</strong> Enter the actual price for SL/TP, not pips. Example: if EUR/USD is at 1.0850 and you want 30 pip SL for a buy, enter SL = 1.0820. This is more precise than pip-based stops.</div>`,
      },
      {id:'mt5-indicators',title:'Adding & Using Indicators in MT5',emoji:'📈',mins:9,xp:90,
       content:`<h3>MT5's Built-in Indicator Library</h3>
<p>MT5 comes with 38 built-in indicators across 5 categories. Here are the most useful ones:</p>
<h3>Trend Indicators</h3>
<ul>
<li><strong>Moving Average</strong> — Go to Navigator → Indicators → Trend → Moving Average. Set MA Method (SMA/EMA), Period, Apply to (Close). Best: EMA21, EMA50, SMA200.</li>
<li><strong>Bollinger Bands</strong> — Trend → Bollinger Bands. Default settings (20, 2.0) work well.</li>
<li><strong>Ichimoku Cloud</strong> — Shows trend, S&R, and momentum all at once. Advanced.</li>
</ul>
<h3>Oscillators (for momentum/divergence)</h3>
<ul>
<li><strong>RSI</strong> — Oscillators → Relative Strength Index. Period 14, add levels 70/30.</li>
<li><strong>MACD</strong> — Oscillators → MACD. Default 12-26-9 is fine to start.</li>
<li><strong>Stochastic</strong> — Oscillators → Stochastic Oscillator. Try 5,3,3 for active trading.</li>
</ul>
<h3>How to Draw S&R Lines</h3>
<p>Toolbar → Draw horizontal line, or press H. Click on chart to place. Drag to adjust. Right-click → Properties to change color/style.</p>
<h3>MT5 Strategy Tester (Backtesting)</h3>
<p>View → Strategy Tester. Select any Expert Advisor or indicator to test on historical data. Run backtests to validate your strategy before going live.</p>
<h3>Setting Price Alerts in MT5</h3>
<p>Terminal → Alerts tab → Right-click → Create. Set price level, sound, and notification. MT5 will alert you even when minimized.</p>
<div class="callout"><strong>Mobile MT5:</strong> Download from App Store/Google Play. Log in with your broker credentials. Full functionality on mobile including placing orders, managing positions, and viewing charts with indicators.</div>`,
      },
    ]
  },
  {
    id:'journalling',title:'Trade Journalling',emoji:'📓',
    desc:'The #1 habit that separates consistently profitable traders from the rest.',
    color:'var(--green)',
    lessons:[
      {id:'why-journal',title:'Why Journalling Changes Everything',emoji:'✍️',mins:9,xp:90,
       content:`<h3>The Mirror That Makes You Better</h3>
<p>Ask any professional who made it past their first year of trading consistently. Every single one journals. Every. Single. One. Without exception.</p>
<h3>What Your Journal Reveals (That Nothing Else Can)</h3>
<ul>
<li>Which setups are <em>actually</em> profitable for YOU (vs what you think works)</li>
<li>What time of day you perform best and worst</li>
<li>Emotional patterns: when do you revenge trade? When do you skip valid setups?</li>
<li>Your real win rate vs your perception</li>
<li>How much the spread/commission is actually costing you</li>
<li>Whether you follow your rules (process compliance %)</li>
<li>Your actual R:R ratio achieved vs what you planned</li>
</ul>
<h3>What to Record in Every Trade</h3>
<div class="card" style="padding:14px;margin:10px 0">
<div style="font-size:13px;color:var(--text2);display:flex;flex-direction:column;gap:5px">
<div>📅 Date & Time of entry and exit</div>
<div>💱 Pair and direction (BUY/SELL)</div>
<div>📊 Timeframe used for analysis and entry</div>
<div>📍 Entry price, Stop Loss, Take Profit (planned vs actual)</div>
<div>📐 Lot size, Risk amount $, Risk %</div>
<div>⏰ Trade duration</div>
<div>✅/❌ Outcome, final P&L in pips and $</div>
<div>📸 Screenshot of chart at entry AND exit</div>
<div>🧠 Emotional state: 1-5 score + 1 sentence</div>
<div>📝 Setup type, what worked, what could improve</div>
</div>
</div>
<h3>The Weekly Review (Non-Negotiable)</h3>
<p>Every weekend: go through every trade. Answer these questions:</p>
<ul>
<li>Did I follow my rules on every trade? If not, why not?</li>
<li>Were my losses due to the market or my mistakes?</li>
<li>What is my current profit factor? Win rate? Avg R:R?</li>
<li>What one thing will I improve this week?</li>
</ul>
<div class="callout"><strong>Use TradeBaby's Journal tab</strong> to log every trade. The stats section automatically calculates win rate, profit factor, performance by pair, and emotional correlations. This is your edge-building machine.</div>`,
      },
    ]
  },
  {
    id:'advanced-concepts',title:'Advanced Trading Concepts',emoji:'🔬',
    desc:'Take your trading to the next level with professional-grade techniques.',
    color:'var(--purple)',
    lessons:[
      {id:'correlation',title:'Currency Correlation',emoji:'🔗',mins:10,xp:100,
       content:`<h3>Understanding Correlation</h3>
<p>Currency pairs move in relation to each other. Understanding correlation prevents you from doubling your risk unknowingly.</p>
<h3>Positive Correlation (Move Together)</h3>
<p>If you buy EUR/USD AND buy GBP/USD simultaneously, you have essentially doubled your USD exposure. If USD strengthens, both lose. You think you have 2 trades — you really have 1 big trade.</p>
<ul>
<li>EUR/USD & GBP/USD — Highly correlated (0.85+)</li>
<li>EUR/USD & AUD/USD — Moderately correlated (0.6-0.7)</li>
<li>EUR/USD & EUR/GBP — Partially correlated</li>
</ul>
<h3>Negative Correlation (Move Opposite)</h3>
<p>EUR/USD and USD/CHF move almost exactly opposite (-0.9 correlation). Buying both = a near-zero net position.</p>
<ul>
<li>EUR/USD & USD/CHF — Strongly negative</li>
<li>EUR/USD & USD/JPY — Moderately negative</li>
<li>AUD/USD & USD/CAD — Moderately negative</li>
</ul>
<h3>Safe Haven vs Risk Currency Clusters</h3>
<p><strong>Risk-on currencies (positive correlation):</strong> AUD, NZD, CAD, EUR, GBP all tend to rise together when markets are bullish.</p>
<p><strong>Safe havens (negative correlation to risk):</strong> USD, JPY, CHF rise when markets panic/crash.</p>
<h3>Practical Rules</h3>
<ul>
<li>Never open correlated trades in the same direction without reducing size</li>
<li>If trading EUR/USD AND GBP/USD, halve position size on each</li>
<li>Use correlation to hedge: opposing positions in correlated pairs</li>
<li>Monitor total USD exposure, not just individual trade risk</li>
</ul>
<div class="callout"><strong>Correlation is dynamic.</strong> These relationships change over time as economic conditions evolve. Check current correlation matrices on sites like myfxbook.com before assuming historical correlations still hold.</div>`,
      },
      {id:'market-microstructure',title:'Market Microstructure',emoji:'🏗️',mins:11,xp:110,
       content:`<h3>Understanding How Markets Actually Work</h3>
<p>Most retail traders have no idea how the market actually operates at the microstructure level. This knowledge gives you a significant edge.</p>
<h3>The Interbank Market</h3>
<p>The real forex market is the interbank market — large banks trading directly with each other. Citibank, Deutsche Bank, UBS, JPMorgan and others exchange billions daily. Retail traders don't access this directly — your broker aggregates prices from multiple liquidity providers.</p>
<h3>Types of Brokers</h3>
<p><strong>Market Maker (Dealing Desk)</strong> — Broker takes the other side of your trade. Makes money from spread AND can trade against you. Conflict of interest. Used by most beginner-focused brokers. Not inherently bad but be aware.</p>
<p><strong>STP (Straight-Through Processing)</strong> — Your order routes directly to liquidity providers. No dealing desk interference. Better for larger trades.</p>
<p><strong>ECN (Electronic Communication Network)</strong> — True market access. Variable spreads (can be 0.0 pips). Commission-based. Professional-grade. Best for scalping and high-frequency strategies.</p>
<h3>Order Flow & Price Discovery</h3>
<p>Price moves because of order imbalance. When buy orders > sell orders at a level, price rises to find sellers. When sell orders > buys, price falls. Large institutional orders create the significant moves you see on charts.</p>
<h3>Slippage</h3>
<p>The difference between your intended execution price and actual fill price. Happens during fast markets, low liquidity periods, and on market orders. Normal and unavoidable — factor into your calculations.</p>
<div class="callout"><strong>Broker selection matters.</strong> For swing trading: any reputable STP/ECN broker works. For scalping: you NEED an ECN broker with raw spreads + commission. Market makers with variable spreads will eat your scalping edge in costs alone.</div>`,
      },
      {id:'trading-tools',title:'Professional Trading Tools',emoji:'🛠️',mins:10,xp:100,
       content:`<h3>Tools That Give You an Edge</h3>
<p>Beyond MT5, professional traders use these resources daily. Most are free.</p>
<h3>Essential Free Resources</h3>
<p><strong>Economic Calendar:</strong> investing.com/economic-calendar or forexfactory.com. Set to your timezone. Check every morning.</p>
<p><strong>TradingView</strong> — The best charting platform. Multi-timeframe, drawing tools, community ideas, replay mode. Free tier is sufficient. tradingview.com</p>
<p><strong>DXY (US Dollar Index)</strong> — Tracks USD strength vs basket of 6 currencies. Essential context for all USD pairs.</p>
<p><strong>VIX (Volatility Index)</strong> — "Fear gauge" for stock markets. High VIX = risk-off = USD/JPY/CHF strength. Low VIX = risk-on = AUD/NZD strength.</p>
<p><strong>COT Report (Commitment of Traders)</strong> — Weekly CFTC report showing institutional positioning in futures. Shows whether large speculators are net long or short a currency. Released Fridays for previous Tuesday data.</p>
<p><strong>Position Size Calculator:</strong> babypips.com/tools or use TradeBaby's built-in calculator.</p>
<p><strong>Pip Calculator:</strong> Calculate exact pip values for any pair and lot size.</p>
<h3>Premium Tools (Worth It)</h3>
<ul>
<li><strong>Jigsaw Trading</strong> — Order flow and depth of market for futures</li>
<li><strong>Bookmap</strong> — Volume/heat map visualization</li>
<li><strong>TradeStation/NinjaTrader</strong> — Advanced backtesting and order flow</li>
</ul>
<div class="callout"><strong>Warning on "premium signals":</strong> 99% of paid signal services and "forex gurus" are scams. No legitimate profitable trader sells signals — they trade their own capital. Learn to fish; don't buy fish.</div>`,
      },
    ]
  },
];

// ── QUIZZES ──
const QUIZZES = {
  'what-is-forex': [
    {q:"What is the daily trading volume of the forex market?",opts:["$750 million","$7.5 billion","$7.5 trillion","$75 trillion"],correct:2},
    {q:"Forex is traded on which exchange?",opts:["NYSE","NASDAQ","No central exchange — OTC","CME only"],correct:2},
    {q:"How many days per week is the forex market open?",opts:["3","5","6","7"],correct:1},
  ],
  'pips-lots': [
    {q:"For EUR/USD, a pip is at which decimal place?",opts:["2nd","3rd","4th","5th"],correct:2},
    {q:"How many units are in a standard lot?",opts:["1,000","10,000","100,000","1,000,000"],correct:2},
    {q:"What is the approximate pip value for a mini lot on EUR/USD?",opts:["$10/pip","$1/pip","$0.10/pip","$100/pip"],correct:1},
  ],
  'leverage-margin': [
    {q:"With 100:1 leverage, how much can $1,000 control?",opts:["$10,000","$50,000","$100,000","$1,000,000"],correct:2},
    {q:"What triggers a margin call?",opts:["Account makes profit","Equity falls below required margin","You open too many trades","Weekend gap"],correct:1},
  ],
  'the-1percent-rule': [
    {q:"What is the maximum recommended risk per trade?",opts:["5-10%","10-15%","1-2%","20-25%"],correct:2},
    {q:"After a 50% account loss, what gain is needed to recover?",opts:["50%","75%","100%","25%"],correct:2},
    {q:"With 1:2 R:R, what minimum win rate is needed to profit?",opts:["50%","40%","34%","60%"],correct:2},
  ],
  'moving-averages': [
    {q:"What is a Golden Cross?",opts:["Price touching MA200","MA50 crossing above MA200","MA9 crossing MA21","Price breaking resistance"],correct:1},
    {q:"Which MA is most watched as a major long-term indicator?",opts:["MA9","MA21","MA50","MA200"],correct:3},
    {q:"Which MA type reacts faster to recent price changes?",opts:["SMA","EMA","They are identical","WMA"],correct:1},
  ],
  'support-resistance': [
    {q:"What is role reversal in S&R?",opts:["Price reversing randomly","Broken support becoming resistance","S&R swapping daily","A chart pattern"],correct:1},
    {q:"Minimum touches to confirm a strong S&R level?",opts:["1","2","3+","10+"],correct:2},
  ],
  'candlestick-basics': [
    {q:"What does a bullish engulfing pattern signal?",opts:["Trend continuation","Potential bullish reversal","Indecision","Strong downtrend"],correct:1},
    {q:"A Doji candle shows what?",opts:["Strong buying","Market indecision — open ≈ close","Strong selling","Definite reversal"],correct:1},
    {q:"Where is a hammer pattern most significant?",opts:["Mid-range anywhere","Top of uptrend","Bottom of downtrend at support","After consolidation"],correct:2},
  ],
  'emotions-trading': [
    {q:"What should you do after 2 consecutive losses?",opts:["Double size to recover","Stop trading for the day","Switch strategies","Trade more"],correct:1},
    {q:"Revenge trading typically ends with:",opts:["A big recovery","Account blow-up","Better discipline","A profitable week"],correct:1},
  ],
};


/* ═══════════════════════════════════════
   TRADEBABY PRO v10 — NEW CURRICULUM LESSONS
   Price Action, Wyckoff, Elliot Wave, Psychology Deep Dives
   Each lesson includes SVG chart demonstrations
   ═══════════════════════════════════════ */

(function injectV10Lessons() {
  if (typeof CURRICULUM === 'undefined') return;

  // ── HELPER: Inline SVG chart builder for lessons ──
  function mkChart(w, h, content) {
    return `<svg viewBox="0 0 ${w} ${h}" width="100%" xmlns="http://www.w3.org/2000/svg" style="border-radius:8px;background:#13131A;display:block">${content}</svg>`;
  }

  function candlesSVG(candles, W=300, H=120) {
    if (!candles.length) return '';
    const prices = candles.flatMap(c => [c.h, c.l]);
    const lo = Math.min(...prices), hi = Math.max(...prices);
    const rng = (hi - lo) || 0.01;
    const PAD = 12, plotW = W - PAD*2, plotH = H - PAD*2;
    const cw = Math.max(8, plotW / candles.length - 2);
    const cx = (i) => PAD + (i + 0.5) * (plotW / candles.length);
    const sy = (v) => PAD + (1 - (v - lo) / rng) * plotH;
    let out = `<rect width="${W}" height="${H}" fill="#13131A" rx="6"/>`;
    // Grid
    [0.25, 0.5, 0.75].forEach(f => {
      out += `<line x1="${PAD}" y1="${PAD + f*plotH}" x2="${W-PAD}" y2="${PAD + f*plotH}" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>`;
    });
    candles.forEach((c, i) => {
      const col = c.bull ? '#10B981' : '#EF4444';
      const x = cx(i);
      const bodyT = Math.min(sy(c.o), sy(c.c));
      const bodyH = Math.max(2, Math.abs(sy(c.o) - sy(c.c)));
      out += `<line x1="${x}" y1="${sy(c.h)}" x2="${x}" y2="${sy(c.l)}" stroke="${col}" stroke-width="1.5"/>`;
      out += `<rect x="${x-cw/2}" y="${bodyT}" width="${cw}" height="${bodyH}" fill="${col}" rx="1"/>`;
      if (c.label) out += `<text x="${x}" y="${H-2}" text-anchor="middle" fill="#9B9891" font-size="8" font-family="monospace">${c.label}</text>`;
    });
    return mkChart(W, H, out);
  }

  // ── PRICE ACTION MASTER CLASS (Advanced Concepts) ──
  const advSubject = CURRICULUM.find(s => s.id === 'advanced-concepts');
  if (advSubject) {
    if (!advSubject.lessons.find(l => l.id === 'pa-master')) {
      advSubject.lessons.splice(0, 0, {
        id: 'pa-master', title: 'Price Action Masterclass', emoji: '🕯️', mins: 22, xp: 220,
        content: `<h3>What Is Pure Price Action?</h3>
<p>Price action trading means reading the market using only the raw price movement on your chart — no indicators, no oscillators, no noise. Every indicator is derived FROM price, meaning price always leads and indicators always lag. The most successful traders in history (Livermore, Tudor Jones, Druckenmiller) all read price directly.</p>
<h3>The 5 Pillars of Price Action</h3>
<p><strong>1. Candlestick Patterns</strong> — Each candle tells you who won the battle that period: buyers or sellers, and by how much conviction.</p>
<p><strong>2. Market Structure (HH/HL/LH/LL)</strong> — The sequence of highs and lows defines EVERYTHING about where price is going.</p>
<p><strong>3. Key Price Levels</strong> — Horizontal support and resistance are the most powerful concept in all of trading.</p>
<p><strong>4. Momentum & Velocity</strong> — How fast and how far price moves tells you about conviction. Large bodies = strong conviction. Small bodies with wicks = hesitation.</p>
<p><strong>5. Context & Timeframe Confluence</strong> — A signal on H1 that aligns with D1 structure is 10× more powerful than the same signal in isolation.</p>

<div class="chart-visual">
<div class="chart-visual-title">CHART: Uptrend Structure — Higher Highs + Higher Lows</div>
${candlesSVG([
  {o:0.55,h:0.57,l:0.52,c:0.56,bull:true,label:'HL'},
  {o:0.56,h:0.62,l:0.54,c:0.61,bull:true,label:'HH'},
  {o:0.61,h:0.63,l:0.57,c:0.58,bull:false,label:'HL'},
  {o:0.58,h:0.66,l:0.56,c:0.65,bull:true,label:'HH'},
  {o:0.65,h:0.67,l:0.61,c:0.62,bull:false,label:'HL'},
  {o:0.62,h:0.70,l:0.60,c:0.69,bull:true,label:'HH'},
], 320, 130)}
<p style="font-size:11px;color:var(--txt3);margin-top:6px">Each HL is higher than the last. Each HH is higher. As long as this pattern holds, we are in an uptrend and should only be buying dips.</p>
</div>

<div class="chart-visual">
<div class="chart-visual-title">CHART: Change of Character (CHOCH) — Trend Reversal Warning</div>
${candlesSVG([
  {o:0.45,h:0.47,l:0.42,c:0.46,bull:true,label:'HH'},
  {o:0.46,h:0.48,l:0.43,c:0.44,bull:false,label:'HL'},
  {o:0.44,h:0.50,l:0.42,c:0.49,bull:true,label:'HH'},
  {o:0.49,h:0.51,l:0.40,c:0.41,bull:false,label:'CHOCH'},
  {o:0.41,h:0.47,l:0.38,c:0.46,bull:true,label:'LH'},
  {o:0.46,h:0.47,l:0.35,c:0.36,bull:false,label:'LL'},
], 320, 130)}
<p style="font-size:11px;color:var(--txt3);margin-top:6px">The CHOCH candle breaks BELOW the last Higher Low. This is the FIRST warning that the uptrend may be ending. Smart traders tighten stops or close longs at this signal.</p>
</div>

<h3>The Inside Bar — Complete Trade Setup</h3>
<p>An Inside Bar forms when a candle's entire range (high to low) is contained within the previous candle (the mother bar). This shows consolidation and energy coiling for a breakout.</p>

<div class="chart-visual">
<div class="chart-visual-title">CHART: Inside Bar Breakout Setup</div>
${candlesSVG([
  {o:0.55,h:0.66,l:0.52,c:0.64,bull:true,label:'Mother'},
  {o:0.63,h:0.65,l:0.56,c:0.58,bull:false,label:'IB'},
  {o:0.58,h:0.70,l:0.57,c:0.69,bull:true,label:'Break!'},
  {o:0.69,h:0.72,l:0.67,c:0.71,bull:true},
  {o:0.71,h:0.74,l:0.69,c:0.73,bull:true},
], 320, 130)}
<p style="font-size:11px;color:var(--txt3);margin-top:6px">Entry: Buy Stop above Inside Bar high. SL: Below Inside Bar low (or mother bar low). TP: Measured move equal to mother bar height.</p>
</div>

<h3>Pin Bar — The King of Reversals</h3>
<div class="chart-visual">
<div class="chart-visual-title">CHART: Bullish Pin Bar at Support</div>
${(()=>{
  const W=300,H=120,PAD=12;
  return mkChart(W,H,`
    <rect width="${W}" height="${H}" fill="#13131A" rx="6"/>
    <line x1="${PAD}" y1="${H-PAD-10}" x2="${W-PAD}" y2="${H-PAD-10}" stroke="rgba(16,185,129,0.4)" stroke-width="1.5" stroke-dasharray="6,3"/>
    <text x="${PAD+2}" y="${H-PAD-2}" fill="rgba(16,185,129,0.7)" font-size="8" font-family="monospace">SUPPORT</text>
    <line x1="80" y1="30" x2="80" y2="${H-PAD-10}" stroke="#10B981" stroke-width="2"/>
    <rect x="68" y="32" width="24" height="16" fill="#10B981" rx="2"/>
    <text x="80" y="${H-2}" text-anchor="middle" fill="#10B981" font-size="8" font-family="monospace">PIN BAR</text>
    <text x="140" y="60" fill="#9B9891" font-size="9" font-family="monospace">← Long lower wick</text>
    <text x="140" y="72" fill="#9B9891" font-size="9" font-family="monospace">= buyer rejection</text>
    <text x="140" y="84" fill="#9B9891" font-size="9" font-family="monospace">= entry signal</text>
    <line x1="200" y1="45" x2="220" y2="45" stroke="#10B981" stroke-width="1.5"/>
    <text x="200" y="38" fill="#10B981" font-size="8" font-family="monospace">TP</text>
    <line x1="200" y1="${H-PAD-10}" x2="220" y2="${H-PAD-10}" stroke="#EF4444" stroke-width="1.5"/>
    <text x="200" y="${H-PAD-2}" fill="#EF4444" font-size="8" font-family="monospace">SL</text>
  `);
})()}
</div>
<div class="callout"><strong>Price Action Rule #1:</strong> Context is everything. The exact same pin bar in the middle of a range = 40% win rate. Same pin bar at a major D1 support level after a 200-pip downtrend, aligned with the H4 trend = 68%+ win rate. Never trade patterns in isolation.</div>`
      });
    }

    // Elliott Wave Lesson
    if (!advSubject.lessons.find(l => l.id === 'elliott-wave')) {
      advSubject.lessons.push({
        id: 'elliott-wave', title: 'Elliott Wave Theory', emoji: '🌊', mins: 18, xp: 180,
        content: `<h3>Waves Within Waves</h3>
<p>R.N. Elliott discovered in the 1930s that market prices move in repetitive wave patterns driven by investor psychology. The core principle: markets move in 5 waves in the direction of the trend, then correct in 3 waves against it.</p>
<h3>The 5-3 Wave Structure</h3>

<div class="chart-visual">
<div class="chart-visual-title">CHART: Complete Elliott Wave Cycle (5 Impulse + 3 Corrective)</div>
${(()=>{
  const W=320, H=150;
  return mkChart(W, H, `
    <rect width="${W}" height="${H}" fill="#13131A" rx="6"/>
    <!-- Impulse waves 1-5 -->
    <polyline points="20,120 60,80 80,95 120,45 140,65 180,20" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linejoin="round"/>
    <!-- Corrective ABC -->
    <polyline points="180,20 210,55 230,35 270,75" fill="none" stroke="#EF4444" stroke-width="2" stroke-dasharray="5,3" stroke-linejoin="round"/>
    <!-- Wave labels -->
    <text x="62" y="74" fill="#F59E0B" font-size="11" font-weight="bold">①</text>
    <text x="82" y="90" fill="#F59E0B" font-size="11" font-weight="bold">②</text>
    <text x="122" y="40" fill="#F59E0B" font-size="11" font-weight="bold">③</text>
    <text x="142" y="60" fill="#F59E0B" font-size="11" font-weight="bold">④</text>
    <text x="182" y="16" fill="#F59E0B" font-size="11" font-weight="bold">⑤</text>
    <text x="212" y="50" fill="#EF4444" font-size="11" font-weight="bold">A</text>
    <text x="232" y="30" fill="#EF4444" font-size="11" font-weight="bold">B</text>
    <text x="272" y="70" fill="#EF4444" font-size="11" font-weight="bold">C</text>
    <!-- Legend -->
    <line x1="20" y1="142" x2="50" y2="142" stroke="#10B981" stroke-width="2"/>
    <text x="55" y="146" fill="#10B981" font-size="9" font-family="monospace">Impulse (bullish)</text>
    <line x1="160" y1="142" x2="190" y2="142" stroke="#EF4444" stroke-width="2" stroke-dasharray="4,2"/>
    <text x="195" y="146" fill="#EF4444" font-size="9" font-family="monospace">Correction</text>
  `);
})()}
</div>

<h3>The 3 Inviolable Elliott Wave Rules</h3>
<p><strong>Rule 1:</strong> Wave 2 NEVER retraces below the start of Wave 1.</p>
<p><strong>Rule 2:</strong> Wave 3 is NEVER the shortest of waves 1, 3, and 5.</p>
<p><strong>Rule 3:</strong> Wave 4 NEVER overlaps the price territory of Wave 1.</p>

<h3>Fibonacci in Elliott Waves</h3>
<p>Wave relationships follow Fibonacci ratios with remarkable consistency:</p>
<ul>
<li><strong>Wave 2</strong> retraces 38.2%, 50%, or 61.8% of Wave 1</li>
<li><strong>Wave 3</strong> is typically 161.8% of Wave 1 (the extended wave)</li>
<li><strong>Wave 4</strong> retraces 38.2% of Wave 3</li>
<li><strong>Wave 5</strong> equals Wave 1 in length (or 61.8% of Wave 1+3)</li>
<li><strong>Wave A</strong> retraces 38.2-50% of the impulse</li>
<li><strong>Wave C</strong> equals Wave A in length</li>
</ul>

<div class="chart-visual">
<div class="chart-visual-title">CHART: Best Entry — Wave 3 (The Power Wave)</div>
${candlesSVG([
  {o:0.50,h:0.52,l:0.48,c:0.51,bull:true,label:'W1↑'},
  {o:0.51,h:0.52,l:0.46,c:0.47,bull:false,label:'W2↓'},
  {o:0.47,h:0.48,l:0.45,c:0.46,bull:false},
  {o:0.46,h:0.68,l:0.45,c:0.67,bull:true,label:'W3!!'},
  {o:0.67,h:0.68,l:0.61,c:0.62,bull:false,label:'W4↓'},
  {o:0.62,h:0.72,l:0.61,c:0.71,bull:true,label:'W5↑'},
], 320, 130)}
<p style="font-size:11px;color:var(--txt3);margin-top:6px">Wave 3 is always the strongest and most tradeable wave. Entry: After Wave 2 completes its Fibonacci retracement. This is the highest-probability Elliott Wave entry.</p>
</div>

<div class="callout"><strong>Elliott Wave reality check:</strong> Wave counting is subjective — two experienced analysts often count the same chart differently. Use Elliott as context (are we in wave 3 or wave 5?) rather than precise entry triggers. Combine with S&R and momentum for best results.</div>`
      });
    }

    // Fibonacci Deep Dive
    if (!advSubject.lessons.find(l => l.id === 'fibonacci-deep')) {
      advSubject.lessons.push({
        id: 'fibonacci-deep', title: 'Fibonacci Trading — Complete Guide', emoji: '🌀', mins: 16, xp: 160,
        content: `<h3>The Golden Ratio in Markets</h3>
<p>The Fibonacci sequence (1, 1, 2, 3, 5, 8, 13, 21...) produces the Golden Ratio (1.618) and its inverse (0.618). These numbers appear throughout nature — in nautilus shells, sunflowers, DNA spirals. And remarkably, they also appear in market price movements, because markets are driven by human psychology, and humans respond to these proportions instinctively.</p>

<h3>Key Fibonacci Retracement Levels</h3>

<div class="chart-visual">
<div class="chart-visual-title">CHART: Fibonacci Retracement Levels on an Uptrend Pullback</div>
${(()=>{
  const W=300, H=160;
  return mkChart(W, H, `
    <rect width="${W}" height="${H}" fill="#13131A" rx="6"/>
    <!-- Price line going up then retracing -->
    <polyline points="20,140 80,40 100,40" fill="none" stroke="#F59E0B" stroke-width="1.5"/>
    <polyline points="100,40 150,82" fill="none" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="4,2"/>
    <!-- Fib levels (retracing from 40 to 140 = range 100) -->
    <!-- 23.6% = 40+23.6 = 63.6 → y=63.6 -->
    <line x1="80" y1="64" x2="290" y2="64" stroke="rgba(59,130,246,0.5)" stroke-width="1" stroke-dasharray="4,3"/>
    <text x="215" y="60" fill="#3B82F6" font-size="8" font-family="monospace">23.6%</text>
    <!-- 38.2% = 40+38.2 = 78.2 → y=78.2 -->
    <line x1="80" y1="78" x2="290" y2="78" stroke="rgba(139,92,246,0.6)" stroke-width="1" stroke-dasharray="4,3"/>
    <text x="215" y="74" fill="#8B5CF6" font-size="8" font-family="monospace">38.2%</text>
    <!-- 50% = 40+50 = 90 → y=90 -->
    <line x1="80" y1="90" x2="290" y2="90" stroke="rgba(245,158,11,0.6)" stroke-width="1" stroke-dasharray="4,3"/>
    <text x="215" y="86" fill="#F59E0B" font-size="8" font-family="monospace">50.0%</text>
    <!-- 61.8% = 40+61.8 = 101.8 → y=102 -->
    <line x1="80" y1="102" x2="290" y2="102" stroke="#F59E0B" stroke-width="2"/>
    <rect x="193" y="96" width="55" height="12" fill="rgba(245,158,11,0.15)" rx="2"/>
    <text x="215" y="105" fill="#F59E0B" font-size="8" font-family="monospace" font-weight="bold">61.8% ★</text>
    <!-- 78.6% -->
    <line x1="80" y1="118" x2="290" y2="118" stroke="rgba(239,68,68,0.4)" stroke-width="1" stroke-dasharray="4,3"/>
    <text x="215" y="114" fill="#EF4444" font-size="8" font-family="monospace">78.6%</text>
    <!-- Price touching 61.8 -->
    <circle cx="150" cy="102" r="5" fill="none" stroke="#F59E0B" stroke-width="2"/>
    <!-- Bounce from 61.8 -->
    <polyline points="150,102 200,60 240,50" fill="none" stroke="#10B981" stroke-width="2"/>
    <text x="10" y="44" fill="#F59E0B" font-size="8" font-family="monospace">HIGH</text>
    <text x="10" y="144" fill="#F59E0B" font-size="8" font-family="monospace">LOW</text>
  `);
})()}
</div>

<h3>The Golden Pocket (61.8% — 65%)</h3>
<p>The 61.8% retracement level — called the "Golden Pocket" — is the most respected Fibonacci level globally. It's where the majority of institutional buy orders cluster in uptrends, and sell orders in downtrends.</p>

<div class="chart-visual">
<div class="chart-visual-title">CHART: High-Probability Confluence Setup — Golden Pocket + S&R + MA</div>
${(()=>{
  const W=300, H=140;
  return mkChart(W, H, `
    <rect width="${W}" height="${H}" fill="#13131A" rx="6"/>
    <!-- EMA line (dynamic support) -->
    <polyline points="10,100 40,95 70,90 100,88 130,85 160,82 190,80 220,78 260,76 290,74" fill="none" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="none"/>
    <text x="235" y="70" fill="#3B82F6" font-size="8" font-family="monospace">EMA 21</text>
    <!-- Horizontal S&R -->
    <line x1="10" y1="88" x2="290" y2="88" stroke="rgba(16,185,129,0.5)" stroke-width="1.5" stroke-dasharray="5,3"/>
    <text x="10" y="84" fill="#10B981" font-size="8" font-family="monospace">Support</text>
    <!-- Fib 61.8% -->
    <line x1="10" y1="91" x2="290" y2="91" stroke="rgba(245,158,11,0.6)" stroke-width="1"/>
    <text x="235" y="99" fill="#F59E0B" font-size="8" font-family="monospace">Fib 61.8%</text>
    <!-- Confluence zone shading -->
    <rect x="10" y="86" width="280" height="7" fill="rgba(245,158,11,0.08)" rx="2"/>
    <!-- Price action: drops to zone, hammer, bounces -->
    <polyline points="30,40 60,50 80,60 100,75 120,88 130,91" fill="none" stroke="#F59E0B" stroke-width="1.5"/>
    <!-- Hammer at confluence -->
    <line x1="130" y1="91" x2="130" y2="108" stroke="#10B981" stroke-width="2"/>
    <rect x="124" y="91" width="12" height="8" fill="#10B981" rx="1"/>
    <!-- Bounce -->
    <polyline points="130,91 155,70 180,55 210,40 240,30" fill="none" stroke="#10B981" stroke-width="2.5"/>
    <text x="150" y="120" fill="#F59E0B" font-size="9" font-family="monospace">Triple Confluence = High Probability Entry</text>
  `);
})()}
</div>

<h3>Fibonacci Extension Levels (Profit Targets)</h3>
<p>After a breakout, Fibonacci extensions project where the next move will reach:</p>
<ul>
<li><strong>127.2%</strong> — First target, often where initial momentum fades</li>
<li><strong>161.8%</strong> — The primary extension target (most widely used)</li>
<li><strong>200%</strong> — Double the original move</li>
<li><strong>261.8%</strong> — Extended trend target in strong moves</li>
</ul>
<div class="callout"><strong>Professional tip:</strong> Draw Fibonacci retracements only after a COMPLETED move (a clear impulse from bottom to top or vice versa). The level must have at least one clean test to confirm it's being respected. Mark your retracements on D1 first — these are the most respected levels.</div>`
      });
    }
  }

  // ── ADVANCED RISK MANAGEMENT LESSON ──
  const riskSubject = CURRICULUM.find(s => s.id === 'risk-management');
  if (riskSubject && !riskSubject.lessons.find(l => l.id === 'advanced-risk')) {
    riskSubject.lessons.push({
      id: 'advanced-risk', title: 'Advanced Risk Management Systems', emoji: '🛡️', mins: 16, xp: 160,
      content: `<h3>Beyond the 1% Rule</h3>
<p>The 1% rule is the starting point, not the destination. Professional traders use sophisticated risk frameworks that account for correlation, drawdown phases, win streaks, and volatility environments.</p>

<h3>The 2% / 6% Rules (Alexander Elder)</h3>
<p><strong>2% Rule:</strong> Never risk more than 2% of total equity on any single trade.</p>
<p><strong>6% Rule:</strong> If you lose 6% of your equity in a single month, STOP trading for the remainder of that month. Review every trade. Find the systematic issue.</p>

<div class="chart-visual">
<div class="chart-visual-title">CHART: Account Equity with Different Risk Levels After 20 Losses</div>
${(()=>{
  const W=300, H=140;
  const scenarios = [
    {label:'1% risk',color:'#10B981', final:Math.pow(0.99,20)*100},
    {label:'2% risk',color:'#F59E0B', final:Math.pow(0.98,20)*100},
    {label:'5% risk',color:'#F97316', final:Math.pow(0.95,20)*100},
    {label:'10% risk',color:'#EF4444', final:Math.pow(0.90,20)*100},
  ];
  let bars = scenarios.map((s, i) => {
    const barH = (s.final / 100) * 100;
    const x = 30 + i * 65;
    return `<rect x="${x}" y="${130-barH}" width="50" height="${barH}" fill="${s.color}" rx="3" opacity="0.85"/>
    <text x="${x+25}" y="${140}" text-anchor="middle" fill="${s.color}" font-size="9" font-family="monospace">${s.label}</text>
    <text x="${x+25}" y="${125-barH}" text-anchor="middle" fill="${s.color}" font-size="9" font-family="monospace" font-weight="bold">$${Math.round(s.final)}</text>`;
  }).join('');
  return mkChart(W, H+20, `<rect width="${W}" height="${H+20}" fill="#13131A" rx="6"/><text x="${W/2}" y="14" text-anchor="middle" fill="#9B9891" font-size="9" font-family="monospace">Starting $100 — After 20 consecutive losses</text>${bars}`);
})()}
</div>

<h3>Correlation-Adjusted Position Sizing</h3>
<p>If you are long EUR/USD AND long GBP/USD simultaneously, you have 2 trades but essentially ONE risk — both are long USD. Your actual exposure is doubled.</p>
<ul>
<li>Highly correlated pairs (>0.70): halve position size on each</li>
<li>Moderately correlated (0.40-0.70): reduce each by 30%</li>
<li>Uncorrelated (<0.40): full size on each</li>
</ul>

<h3>Volatility-Based Stop Losses (ATR Method)</h3>
<p>The ATR (Average True Range) method places stops at a multiple of current volatility rather than a fixed pip amount:</p>
<p><strong>Stop Loss = Entry Price ± (1.5 × ATR)</strong></p>
<p>In a high-volatility environment, a 30-pip stop gets hit by noise. In a low-volatility environment, a 30-pip stop is unnecessarily wide. ATR-based stops adapt to market conditions automatically.</p>

<div class="chart-visual">
<div class="chart-visual-title">CHART: ATR Stop Loss vs Fixed Pip Stop in Volatile Market</div>
${candlesSVG([
  {o:0.50,h:0.55,l:0.46,c:0.53,bull:true},
  {o:0.53,h:0.58,l:0.48,c:0.56,bull:true},
  {o:0.56,h:0.62,l:0.50,c:0.52,bull:false,label:'ENTRY'},
  {o:0.52,h:0.57,l:0.44,c:0.55,bull:true,label:'ATR SL✓'},
  {o:0.55,h:0.60,l:0.53,c:0.59,bull:true},
  {o:0.59,h:0.64,l:0.57,c:0.63,bull:true,label:'TP ✓'},
], 300, 120)}
<p style="font-size:11px;color:var(--txt3);margin-top:6px">Fixed 20-pip stop = stopped out on the volatile candle. ATR stop (1.5×ATR below entry) = survived the noise and reached TP.</p>
</div>
<div class="callout"><strong>Professional rule:</strong> Your stop loss should be placed where the trade is WRONG — not where you can afford to lose. If your logical stop is 80 pips away but that would risk $400, reduce your position size, not your stop. Small size + logical stop = professional approach.</div>`
    });
  }

  // ── TRADING PSYCHOLOGY ADVANCED ──
  const psychSubject = CURRICULUM.find(s => s.id === 'trading-psychology');
  if (psychSubject && !psychSubject.lessons.find(l => l.id === 'flow-state')) {
    psychSubject.lessons.push({
      id: 'flow-state', title: 'Peak Performance & Flow State', emoji: '🧘', mins: 14, xp: 140,
      content: `<h3>The Zone: Trading in Flow State</h3>
<p>Psychologist Mihaly Csikszentmihalyi defined "flow" as complete immersion in an activity — where time seems to stop, everything clicks, and performance reaches its peak. Athletes call it "the zone." Traders call it "being in the market."</p>
<p>The conditions for flow: <em>skill level matches challenge level</em>. Too easy = boredom. Too hard = anxiety. The sweet spot is where your skill meets appropriate challenge.</p>
<h3>The Pre-Trading Ritual</h3>
<p>Elite athletes have pre-game rituals because they work. Your pre-trading ritual should prepare your brain for optimal decision-making:</p>
<ol>
<li><strong>Physical preparation</strong> — 10 minutes of light exercise or walking raises dopamine and improves focus</li>
<li><strong>Market review</strong> — 15 minutes: check economic calendar, mark key levels, assess overnight price action</li>
<li><strong>Trade plan</strong> — Write down: "I will trade X if Y happens. My risk is Z." Before the market opens.</li>
<li><strong>Emotional check</strong> — Rate your state 1-10. Below 6? Consider not trading or reducing size.</li>
<li><strong>Clear the environment</strong> — Remove distractions. Close social media. This is your office.</li>
</ol>
<h3>Managing Losing Streaks Psychologically</h3>
<p>Every trader faces losing streaks. The mental response determines whether you survive them:</p>
<ul>
<li><strong>After loss 1:</strong> Log it. Note the trade was valid (or wasn't). Move on.</li>
<li><strong>After loss 2:</strong> Review both trades. Is there a pattern? Or normal variance?</li>
<li><strong>After loss 3:</strong> Mandatory break. 15-30 minutes away from screens. Reduce size to 50% for next trade.</li>
<li><strong>After loss 4:</strong> Stop for the day. Return fresh tomorrow.</li>
</ul>
<h3>The Performance Journal</h3>
<p>Beyond logging your trades, keep a performance journal that tracks your mental and emotional state. Rate each session on:</p>
<ul>
<li>Focus level (1-10)</li>
<li>Emotional control (1-10)</li>
<li>Rule adherence (1-10)</li>
<li>One thing you did well</li>
<li>One thing to improve</li>
</ul>
<p>After 30 days, you will see clear correlations between your mental states and your trading results. This data is gold.</p>
<div class="callout"><strong>The compound effect of marginal improvements:</strong> Improving your focus, discipline, and emotional control by just 1% each week compounds to 67% improvement over a year. You don't need to be perfect — you just need to be consistently better than yesterday.</div>`
    });
  }

  console.log('✅ v10 curriculum lessons injected');
})();

/* ═══════════════════════════════════════════════════════════════
   TRADEBABY PRO v10 — SVG CHART VISUALS INJECTOR
   Adds inline chart illustrations to existing lessons
   ═══════════════════════════════════════════════════════════════ */

(function injectLessonCharts() {
  if (typeof CURRICULUM === 'undefined') return;

  // ── SVG BUILDER UTILITIES ──
  function mkSVG(w, h, inner) {
    return `<svg viewBox="0 0 ${w} ${h}" width="100%" xmlns="http://www.w3.org/2000/svg" style="display:block;border-radius:8px;background:#13131A">${inner}</svg>`;
  }
  function cv(x,o,h,l,c,w,bull,lbl) {
    const col=bull?'#10B981':'#EF4444', P=6, RNG=(h-l)||0.01;
    const SH=100, SW=80, pad=8;
    const prices=[o,h,l,c]; const mn=Math.min(...prices),mx=Math.max(...prices);
    const rng=(mx-mn)||0.01;
    const sy=v=>pad+(1-(v-mn)/rng)*(SH-pad*2);
    const bT=Math.min(sy(o),sy(c)), bH=Math.max(2,Math.abs(sy(o)-sy(c)));
    let s=`<g transform="translate(${x},0)">`;
    s+=`<line x1="${w/2}" y1="${sy(h)}" x2="${w/2}" y2="${sy(l)}" stroke="${col}" stroke-width="1.5"/>`;
    s+=`<rect x="${w/2-w*.4}" y="${bT}" width="${w*.8}" height="${bH}" fill="${col}" rx="1"/>`;
    if(lbl) s+=`<text x="${w/2}" y="${SH+2}" text-anchor="middle" font-size="7" font-family="monospace" fill="#9B9891">${lbl}</text>`;
    s+=`</g>`;
    return s;
  }
  function candleRow(candles, W, H) {
    const n=candles.length, cw=Math.floor(W/n)-2, pad=10;
    let inner=`<rect width="${W}" height="${H}" fill="#13131A" rx="6"/>`;
    inner+=`<line x1="${pad}" y1="${H*.25}" x2="${W-pad}" y2="${H*.25}" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>`;
    inner+=`<line x1="${pad}" y1="${H*.5}" x2="${W-pad}" y2="${H*.5}" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>`;
    inner+=`<line x1="${pad}" y1="${H*.75}" x2="${W-pad}" y2="${H*.75}" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>`;
    const prices=candles.flatMap(c=>[c.h,c.l]);
    const lo=Math.min(...prices),hi=Math.max(...prices),rng=(hi-lo)||0.01;
    const sy=v=>pad+(1-(v-lo)/rng)*(H-pad*2-12);
    candles.forEach((c,i)=>{
      const x=pad+i*(W-pad*2)/n, col=c.bull?'#10B981':'#EF4444';
      const bT=Math.min(sy(c.o),sy(c.c)), bH=Math.max(2,Math.abs(sy(c.o)-sy(c.c)));
      inner+=`<line x1="${x+cw/2}" y1="${sy(c.h)}" x2="${x+cw/2}" y2="${sy(c.l)}" stroke="${col}" stroke-width="1.5"/>`;
      inner+=`<rect x="${x}" y="${bT}" width="${cw}" height="${bH}" fill="${col}" rx="1"/>`;
      if(c.lbl) inner+=`<text x="${x+cw/2}" y="${H-2}" text-anchor="middle" font-size="7" font-family="monospace" fill="#9B9891">${c.lbl}</text>`;
    });
    return mkSVG(W, H, inner);
  }
  function wrapChart(title, svg, note) {
    return `<div class="chart-visual"><div class="chart-visual-title">${title}</div>${svg}${note?`<p style="font-size:11px;color:var(--txt3);margin-top:6px;line-height:1.5">${note}</p>`:''}</div>`;
  }

  // ── SUPPORT & RESISTANCE LESSON ──
  const sr = CURRICULUM.flatMap(c=>c.lessons).find(l=>l.id==='support-resistance');
  if (sr && !sr._chartsInjected) {
    sr._chartsInjected = true;
    const srChart = (()=>{
      const W=300,H=140;
      return mkSVG(W,H,`
        <rect width="${W}" height="${H}" fill="#13131A" rx="6"/>
        <line x1="20" y1="42" x2="${W-10}" y2="42" stroke="rgba(239,68,68,0.5)" stroke-width="1.5" stroke-dasharray="5,3"/>
        <text x="22" y="38" fill="rgba(239,68,68,0.8)" font-size="8" font-family="monospace">RESISTANCE — 1.1000</text>
        <line x1="20" y1="100" x2="${W-10}" y2="100" stroke="rgba(16,185,129,0.5)" stroke-width="1.5" stroke-dasharray="5,3"/>
        <text x="22" y="115" fill="rgba(16,185,129,0.8)" font-size="8" font-family="monospace">SUPPORT — 1.0800</text>
        <polyline points="20,120 45,105 55,100 75,88 90,80 105,70 125,58 140,42 145,42 160,55 175,70 195,88 210,100 225,85 240,72 260,55 270,42 280,50" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linejoin="round"/>
        <circle cx="55" cy="100" r="4" fill="none" stroke="#10B981" stroke-width="1.5"/>
        <circle cx="210" cy="100" r="4" fill="none" stroke="#10B981" stroke-width="1.5"/>
        <circle cx="140" cy="42" r="4" fill="none" stroke="#EF4444" stroke-width="1.5"/>
        <circle cx="270" cy="42" r="4" fill="none" stroke="#EF4444" stroke-width="1.5"/>
        <text x="40" y="128" fill="#10B981" font-size="8" font-family="monospace">BOUNCE ✓</text>
        <text x="198" y="128" fill="#10B981" font-size="8" font-family="monospace">BOUNCE ✓</text>
      `);
    })();
    const roleReversal = (()=>{
      const W=300,H=130;
      return mkSVG(W,H,`
        <rect width="${W}" height="${H}" fill="#13131A" rx="6"/>
        <line x1="20" y1="65" x2="${W-10}" y2="65" stroke="rgba(245,158,11,0.6)" stroke-width="1.5"/>
        <text x="22" y="61" fill="rgba(245,158,11,0.8)" font-size="8" font-family="monospace">KEY LEVEL — was RESISTANCE, now SUPPORT</text>
        <polyline points="20,110 50,95 70,78 90,65 100,50 120,35 140,25 155,38 165,55 175,65 185,58 195,48 215,35 235,25" fill="none" stroke="#F59E0B" stroke-width="1.5"/>
        <polyline points="235,25 255,65 270,72" fill="none" stroke="#10B981" stroke-width="2"/>
        <rect x="160" y="60" width="20" height="10" fill="#10B981" rx="1"/>
        <text x="190" y="118" fill="#10B981" font-size="8" font-family="monospace">RETEST → BOUNCE = HIGH PROB ENTRY ✅</text>
        <text x="22" y="125" fill="#9B9891" font-size="8" font-family="monospace">Price broke through resistance, retests it as new support</text>
      `);
    })();
    sr.content += wrapChart('CHART: Support & Resistance in Action', srChart, 'Price repeatedly bounces from both the support zone (green) and resistance zone (red). Each touch confirms the level. The more touches, the stronger the zone.');
    sr.content += wrapChart('CHART: Role Reversal — Resistance Becomes Support', roleReversal, 'After price breaks through resistance and retests it, the old resistance now acts as support. This retest setup is one of the highest-probability entries in all of technical analysis.');
  }

  // ── CANDLESTICK BASICS LESSON ──
  const cb = CURRICULUM.flatMap(c=>c.lessons).find(l=>l.id==='candlestick-basics');
  if (cb && !cb._chartsInjected) {
    cb._chartsInjected = true;
    const bullBear = candleRow([
      {o:0.55,h:0.57,l:0.52,c:0.56,bull:true,lbl:'Bull'},
      {o:0.56,h:0.62,l:0.54,c:0.58,bull:false,lbl:'Bear'},
      {o:0.47,h:0.49,l:0.36,c:0.48,bull:true,lbl:'Hammer'},
      {o:0.60,h:0.73,l:0.59,c:0.61,bull:false,lbl:'Shoot★'},
      {o:0.60,h:0.66,l:0.54,c:0.60,bull:true,lbl:'Doji'},
    ],310,115);
    const engulfing = candleRow([
      {o:0.60,h:0.62,l:0.56,c:0.57,bull:false,lbl:'Red'},
      {o:0.55,h:0.65,l:0.54,c:0.64,bull:true,lbl:'Engulf ✓'},
      {o:0.64,h:0.70,l:0.62,c:0.69,bull:true,lbl:'Bull'},
      {o:0.68,h:0.70,l:0.63,c:0.64,bull:false,lbl:'Green'},
      {o:0.65,h:0.66,l:0.55,c:0.56,bull:false,lbl:'Engulf ✓'},
      {o:0.56,h:0.58,l:0.48,c:0.49,bull:false,lbl:'Bear'},
    ],310,115);
    cb.content += wrapChart('CHART: The 5 Core Candle Types You Must Know', bullBear, 'From left: Bullish candle (close > open), Bearish candle (open > close), Hammer (long lower wick at lows), Shooting Star (long upper wick at highs), Doji (open = close = indecision).');
    cb.content += wrapChart('CHART: Bullish & Bearish Engulfing Patterns', engulfing, 'Left group: Bearish candle followed by a larger bullish candle that completely engulfs it = Bullish Engulfing (buy signal at lows). Right group: Bullish candle followed by a larger bearish candle = Bearish Engulfing (sell signal at highs).');
  }

  // ── TREND ANALYSIS LESSON ──
  const ta = CURRICULUM.flatMap(c=>c.lessons).find(l=>l.id==='trend-analysis');
  if (ta && !ta._chartsInjected) {
    ta._chartsInjected = true;
    const trendChart = (()=>{
      const W=310,H=145;
      return mkSVG(W,H,`
        <rect width="${W}" height="${H}" fill="#13131A" rx="6"/>
        <polyline points="15,120 40,105 55,115 75,90 90,100 115,72 130,82 155,55 170,65 195,38 210,48" fill="none" stroke="#10B981" stroke-width="2" stroke-linejoin="round"/>
        <circle cx="40" cy="105" r="3" fill="#F59E0B"/>
        <circle cx="75" cy="90" r="3" fill="#F59E0B"/>
        <circle cx="115" cy="72" r="3" fill="#F59E0B"/>
        <circle cx="155" cy="55" r="3" fill="#F59E0B"/>
        <circle cx="195" cy="38" r="3" fill="#F59E0B"/>
        <text x="38" y="118" fill="#F59E0B" font-size="8" font-family="monospace">HL</text>
        <text x="73" y="103" fill="#F59E0B" font-size="8" font-family="monospace">HL</text>
        <text x="113" y="85" fill="#F59E0B" font-size="8" font-family="monospace">HL</text>
        <text x="153" y="68" fill="#F59E0B" font-size="8" font-family="monospace">HL</text>
        <circle cx="55" cy="115" r="3" fill="none" stroke="#10B981" stroke-width="1.5"/>
        <circle cx="90" cy="100" r="3" fill="none" stroke="#10B981" stroke-width="1.5"/>
        <circle cx="130" cy="82" r="3" fill="none" stroke="#10B981" stroke-width="1.5"/>
        <circle cx="170" cy="65" r="3" fill="none" stroke="#10B981" stroke-width="1.5"/>
        <circle cx="210" cy="48" r="3" fill="none" stroke="#10B981" stroke-width="1.5"/>
        <text x="48" y="132" fill="#10B981" font-size="8" font-family="monospace">HH</text>
        <text x="86" y="117" fill="#10B981" font-size="8" font-family="monospace">HH</text>
        <text x="126" y="99" fill="#10B981" font-size="8" font-family="monospace">HH</text>
        <text x="166" y="82" fill="#10B981" font-size="8" font-family="monospace">HH</text>
        <text x="20" y="14" fill="#10B981" font-size="9" font-family="monospace" font-weight="bold">UPTREND: Higher Highs + Higher Lows</text>
        <polyline points="220,40 240,50 255,44 270,58 285,52 300,65" fill="none" stroke="#EF4444" stroke-width="2"/>
        <text x="220" y="14" fill="#EF4444" font-size="9" font-family="monospace">CHOCH</text>
        <text x="220" y="25" fill="#9B9891" font-size="8" font-family="monospace">First LH = warning</text>
      `);
    })();
    ta.content += wrapChart('CHART: Uptrend Structure — Higher Highs (HH) & Higher Lows (HL)', trendChart, 'In a healthy uptrend, each swing high is higher than the last (HH) and each swing low is higher than the last (HL). As long as this pattern holds, only look to BUY. The moment a Higher Low is broken, the CHOCH alerts you the trend may be ending.');
  }

  // ── MOVING AVERAGES LESSON ──
  const maLesson = CURRICULUM.flatMap(c=>c.lessons).find(l=>l.id==='moving-averages');
  if (maLesson && !maLesson._chartsInjected) {
    maLesson._chartsInjected = true;
    const maChart = (()=>{
      const W=310,H=145;
      // Simulate price and EMA21 and SMA200
      const prices=[120,118,122,119,125,123,128,126,130,128,132,129,135,133,138,136,140,137,142,140,145,143,147];
      const ema21=[122,121,123,121,124,123,126,125,128,127,130,128,132,130,134,132,136,134,138,136,140,138,142];
      const sma200=[115,115,116,116,117,117,118,118,119,119,120,120,121,121,122,122,123,123,124,124,125,125,126];
      const mn=100,mx=150,rng=mx-mn;
      const pad=12,pW=W-pad*2,pH=H-pad*2;
      const sx=(i)=>pad+i*(pW/(prices.length-1));
      const sy=(v)=>pad+(1-(v-mn)/rng)*pH;
      let pts=prices.map((p,i)=>`${sx(i)},${sy(p)}`).join(' ');
      let ema=ema21.map((p,i)=>`${sx(i)},${sy(p)}`).join(' ');
      let sma=sma200.map((p,i)=>`${sx(i)},${sy(p)}`).join(' ');
      return mkSVG(W,H,`
        <rect width="${W}" height="${H}" fill="#13131A" rx="6"/>
        <polyline points="${sma}" fill="none" stroke="#F97316" stroke-width="1.5" stroke-dasharray="4,3"/>
        <polyline points="${ema}" fill="none" stroke="#3B82F6" stroke-width="1.5"/>
        <polyline points="${pts}" fill="none" stroke="rgba(245,158,11,0.6)" stroke-width="1"/>
        <text x="${pad+2}" y="${sy(ema21[ema21.length-1])-4}" fill="#3B82F6" font-size="8" font-family="monospace">EMA 21 (entry signal)</text>
        <text x="${pad+2}" y="${sy(sma200[sma200.length-1])+10}" fill="#F97316" font-size="8" font-family="monospace">SMA 200 (major S/R)</text>
        <circle cx="${sx(10)}" cy="${sy(prices[10])}" r="4" fill="none" stroke="#10B981" stroke-width="2"/>
        <text x="${sx(10)+6}" y="${sy(prices[10])-4}" fill="#10B981" font-size="7" font-family="monospace">Pullback to EMA = entry</text>
      `);
    })();
    maLesson.content += wrapChart('CHART: EMA 21 Pullback Entry in an Uptrend', maChart, 'Price in uptrend pulls back to EMA21 (blue line) — this is the high-probability entry zone. The SMA200 (orange dashed) confirms the overall long-term bullish trend. When price touches EMA21 with a bullish confirmation candle, that is a strong buy signal.');
  }

  // ── INDICATORS LESSON ──
  const indLesson = CURRICULUM.flatMap(c=>c.lessons).find(l=>l.id==='indicators');
  if (indLesson && !indLesson._chartsInjected) {
    indLesson._chartsInjected = true;
    const rsiChart = (()=>{
      const W=310,H=160;
      const prices=[50,52,55,53,58,57,62,60,65,63,68,66,70,68,66,64,60,58,55,53,50,52,55];
      const rsiVals=[50,52,56,54,60,58,64,62,68,66,72,70,72,70,65,60,55,50,44,40,36,40,46];
      const mn=40,mx=75,rng=mx-mn;
      const rsiMn=30,rsiMx=80,rsiRng=rsiMx-rsiMn;
      const pH1=80,pH2=50,pad=10;
      const pW=W-pad*2;
      const sx=i=>pad+i*(pW/(prices.length-1));
      const sy1=v=>pad+(1-(v-mn)/rng)*pH1;
      const sy2=v=>pH1+pad*2+(1-(v-rsiMn)/rsiRng)*pH2;
      let pLine=prices.map((p,i)=>`${sx(i)},${sy1(p)}`).join(' ');
      let rLine=rsiVals.map((r,i)=>`${sx(i)},${sy2(r)}`).join(' ');
      const ob70=sy2(70), os30=sy2(30);
      return mkSVG(W,H,`
        <rect width="${W}" height="${H}" fill="#13131A" rx="6"/>
        <text x="${pad}" y="${pad+8}" fill="#9B9891" font-size="8" font-family="monospace">PRICE</text>
        <polyline points="${pLine}" fill="none" stroke="#F59E0B" stroke-width="1.5"/>
        <line x1="${pad}" y1="${pH1+pad+1}" x2="${W-pad}" y2="${pH1+pad+1}" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
        <text x="${pad}" y="${pH1+pad*2+8}" fill="#9B9891" font-size="8" font-family="monospace">RSI(14)</text>
        <line x1="${pad}" y1="${ob70}" x2="${W-pad}" y2="${ob70}" stroke="rgba(239,68,68,0.4)" stroke-width="1" stroke-dasharray="3,3"/>
        <text x="${W-pad-14}" y="${ob70-2}" fill="rgba(239,68,68,0.7)" font-size="7" font-family="monospace">70</text>
        <line x1="${pad}" y1="${os30}" x2="${W-pad}" y2="${os30}" stroke="rgba(16,185,129,0.4)" stroke-width="1" stroke-dasharray="3,3"/>
        <text x="${W-pad-14}" y="${os30+8}" fill="rgba(16,185,129,0.7)" font-size="7" font-family="monospace">30</text>
        <polyline points="${rLine}" fill="none" stroke="#8B5CF6" stroke-width="1.5"/>
        <circle cx="${sx(12)}" cy="${sy1(prices[12])}" r="3" fill="none" stroke="#EF4444" stroke-width="1.5"/>
        <circle cx="${sx(20)}" cy="${sy2(rsiVals[20])}" r="3" fill="none" stroke="#10B981" stroke-width="1.5"/>
        <text x="${sx(17)}" y="${H-2}" fill="#EF4444" font-size="7" font-family="monospace">Bearish Div →</text>
      `);
    })();
    indLesson.content += wrapChart('CHART: RSI Overbought + Bearish Divergence Signal', rsiChart, 'Price makes a new high (orange line) but RSI makes a LOWER high (purple line) = bearish divergence. This is one of the most reliable reversal signals. Note the RSI reaching the 70 overbought zone just as price peaks — double warning.');
  }

  // ── CHART PATTERNS LESSON ──
  const cpLesson = CURRICULUM.flatMap(c=>c.lessons).find(l=>l.id==='chart-patterns');
  if (cpLesson && !cpLesson._chartsInjected) {
    cpLesson._chartsInjected = true;
    const headShoulder = (()=>{
      const W=310,H=145;
      return mkSVG(W,H,`
        <rect width="${W}" height="${H}" fill="#13131A" rx="6"/>
        <polyline points="15,110 35,85 50,90 70,65 85,88 105,45 120,70 135,85 155,62 170,88 185,85 200,108" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linejoin="round"/>
        <text x="60" y="60" text-anchor="middle" fill="#9B9891" font-size="8" font-family="monospace">LS</text>
        <text x="105" y="40" text-anchor="middle" fill="#EF4444" font-size="9" font-family="monospace" font-weight="bold">HEAD</text>
        <text x="150" y="57" text-anchor="middle" fill="#9B9891" font-size="8" font-family="monospace">RS</text>
        <line x1="40" y1="88" x2="190" y2="88" stroke="rgba(239,68,68,0.7)" stroke-width="1.5" stroke-dasharray="4,3"/>
        <text x="195" y="92" fill="#EF4444" font-size="8" font-family="monospace">NECK</text>
        <polyline points="200,108 215,120 230,128" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-dasharray="none"/>
        <text x="205" y="140" fill="#EF4444" font-size="8" font-family="monospace">SELL → target = head height</text>
        <line x1="200" y1="88" x2="200" y2="45" stroke="rgba(245,158,11,0.3)" stroke-width="1" stroke-dasharray="3,3"/>
        <text x="202" y="64" fill="rgba(245,158,11,0.5)" font-size="7" font-family="monospace">↕ measure</text>
      `);
    })();
    const flagPattern = (()=>{
      const W=310,H=140;
      return mkSVG(W,H,`
        <rect width="${W}" height="${H}" fill="#13131A" rx="6"/>
        <line x1="20" y1="115" x2="80" y2="40" stroke="#10B981" stroke-width="3" stroke-linecap="round"/>
        <text x="15" y="128" fill="#10B981" font-size="8" font-family="monospace">Flagpole</text>
        <polyline points="80,40 90,50 100,45 110,55 120,50 130,60" fill="none" stroke="#F59E0B" stroke-width="1.5"/>
        <polyline points="80,55 90,65 100,60 110,70 120,65 130,75" fill="none" stroke="#F59E0B" stroke-width="1.5"/>
        <line x1="80" y1="40" x2="130" y2="40" stroke="rgba(245,158,11,0.2)" stroke-width="1" stroke-dasharray="2,2"/>
        <line x1="80" y1="55" x2="130" y2="55" stroke="rgba(245,158,11,0.2)" stroke-width="1" stroke-dasharray="2,2"/>
        <text x="82" y="85" fill="#F59E0B" font-size="8" font-family="monospace">Flag (consolidation)</text>
        <line x1="130" y1="60" x2="130" y2="75" stroke="#10B981" stroke-width="1.5"/>
        <polyline points="130,60 170,25 190,10" fill="none" stroke="#10B981" stroke-width="2.5"/>
        <text x="150" y="28" fill="#10B981" font-size="8" font-family="monospace">Breakout = entry</text>
        <text x="150" y="40" fill="#9B9891" font-size="7" font-family="monospace">Target = flagpole height</text>
      `);
    })();
    cpLesson.content += wrapChart('CHART: Head & Shoulders — Classic Reversal Pattern', headShoulder, 'Three peaks: left shoulder, head (highest), right shoulder. The neckline connects the two troughs. Enter SHORT on close below the neckline. Target = distance from head to neckline projected downward. Win rate at major resistance: 68-73%.');
    cpLesson.content += wrapChart('CHART: Bull Flag — Best Continuation Pattern', flagPattern, 'Strong impulse move (flagpole) followed by a brief consolidation in a narrow channel (flag), then continuation in the original direction. Entry on breakout above flag resistance. Target = flagpole height added to breakout point. Win rate: 65-70% in trending conditions.');
  }

  // ── 1% RULE LESSON ──
  const oneRule = CURRICULUM.flatMap(c=>c.lessons).find(l=>l.id==='the-1percent-rule');
  if (oneRule && !oneRule._chartsInjected) {
    oneRule._chartsInjected = true;
    const riskChart = (()=>{
      const W=310,H=155;
      const scenarios=[
        {label:'1% risk',color:'#10B981',val:82},
        {label:'2% risk',color:'#F59E0B',val:67},
        {label:'5% risk',color:'#F97316',val:36},
        {label:'10% risk',color:'#EF4444',val:12},
      ];
      let bars=scenarios.map((s,i)=>{
        const x=20+i*72, bH=s.val, y=120-bH;
        return `<rect x="${x}" y="${y}" width="50" height="${bH}" fill="${s.color}" rx="3" opacity="0.85"/>
          <text x="${x+25}" y="${H-12}" text-anchor="middle" fill="${s.color}" font-size="8" font-family="monospace">${s.label}</text>
          <text x="${x+25}" y="${y-4}" text-anchor="middle" fill="${s.color}" font-size="9" font-family="monospace" font-weight="bold">$${s.val}</text>`;
      }).join('');
      return mkSVG(W,H,`
        <rect width="${W}" height="${H}" fill="#13131A" rx="6"/>
        <text x="${W/2}" y="14" text-anchor="middle" fill="#9B9891" font-size="9" font-family="monospace">Account remaining after 20 consecutive losses (starting $100)</text>
        ${bars}
        <line x1="10" y1="120" x2="${W-10}" y2="120" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
      `);
    })();
    oneRule.content += wrapChart('CHART: Why the 1% Rule Is Survival — 20 Consecutive Losses', riskChart, '1% risk per trade: only -18% drawdown — still very recoverable. 10% risk per trade: -87% drawdown — effectively account destroyed. Professional traders optimize for survival first. Profits follow from survival.');
  }

  // ── RISK/REWARD LESSON ──
  const rrLesson = CURRICULUM.flatMap(c=>c.lessons).find(l=>l.id==='risk-reward');
  if (rrLesson && !rrLesson._chartsInjected) {
    rrLesson._chartsInjected = true;
    const rrChart = (()=>{
      const W=310,H=145;
      return mkSVG(W,H,`
        <rect width="${W}" height="${H}" fill="#13131A" rx="6"/>
        <line x1="40" y1="20" x2="40" y2="125" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
        <line x1="35" y1="125" x2="${W-10}" y2="125" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
        <rect x="55" y="75" width="40" height="45" fill="rgba(239,68,68,0.4)" rx="2"/>
        <text x="75" y="102" text-anchor="middle" fill="#EF4444" font-size="8" font-family="monospace">RISK</text>
        <text x="75" y="112" text-anchor="middle" fill="#EF4444" font-size="7" font-family="monospace">-$100</text>
        <rect x="115" y="35" width="40" height="85" fill="rgba(16,185,129,0.4)" rx="2"/>
        <text x="135" y="78" text-anchor="middle" fill="#10B981" font-size="8" font-family="monospace">REWARD</text>
        <text x="135" y="90" text-anchor="middle" fill="#10B981" font-size="8" font-family="monospace">1:2 R:R</text>
        <text x="135" y="100" text-anchor="middle" fill="#10B981" font-size="7" font-family="monospace">+$200</text>
        <rect x="175" y="50" width="40" height="70" fill="rgba(139,92,246,0.4)" rx="2"/>
        <text x="195" y="85" text-anchor="middle" fill="#8B5CF6" font-size="8" font-family="monospace">1:3 R:R</text>
        <text x="195" y="97" text-anchor="middle" fill="#8B5CF6" font-size="7" font-family="monospace">+$300</text>
        <text x="235" y="60" fill="#9B9891" font-size="8" font-family="monospace">Need only</text>
        <text x="235" y="72" fill="#10B981" font-size="10" font-family="monospace" font-weight="bold">34% wins</text>
        <text x="235" y="84" fill="#9B9891" font-size="8" font-family="monospace">to profit</text>
        <text x="235" y="96" fill="#9B9891" font-size="8" font-family="monospace">at 1:2 R:R</text>
      `);
    })();
    rrLesson.content += wrapChart('CHART: Risk vs Reward — Visual Comparison', rrChart, 'With 1:2 R:R, you risk $100 to potentially earn $200. This means you only need to win 34% of your trades to be profitable. At 1:3 R:R, you only need 26% win rate. Higher R:R = more forgiving, more sustainable trading.');
  }

  // ── GLOBAL SESSIONS LESSON ──
  const sessLesson = CURRICULUM.flatMap(c=>c.lessons).find(l=>l.id==='session-overview');
  if (sessLesson && !sessLesson._chartsInjected) {
    sessLesson._chartsInjected = true;
    const sessChart = (()=>{
      const W=310,H=130;
      const sessions=[
        {name:'Sydney',start:22,end:7,color:'rgba(59,130,246,0.4)',label:'AUD'},
        {name:'Tokyo',start:0,end:9,color:'rgba(59,130,246,0.55)',label:'JPY'},
        {name:'London',start:8,end:17,color:'rgba(16,185,129,0.55)',label:'EUR/GBP'},
        {name:'New York',start:13,end:22,color:'rgba(245,158,11,0.55)',label:'USD'},
      ];
      const hrW=(W-50)/24;
      let bars=sessions.map((s,i)=>{
        const y=20+i*26;
        const x1=s.start===22?50:50+s.start*hrW;
        const x2=s.end===7?50+7*hrW:s.end<=s.start?W-2:50+s.end*hrW;
        const bW=Math.min(x2-x1,W-x1-2);
        return `<rect x="${x1}" y="${y}" width="${bW}" height="20" fill="${s.color}" rx="3"/>
          <text x="4" y="${y+14}" fill="#9B9891" font-size="8" font-family="monospace">${s.name}</text>
          <text x="${x1+4}" y="${y+13}" fill="white" font-size="8" font-family="monospace" font-weight="bold">${s.label}</text>`;
      }).join('');
      // Overlap highlight
      const olX=50+13*hrW, olW=4*hrW;
      let inner=`<rect width="${W}" height="${H}" fill="#13131A" rx="6"/>`;
      inner+=`<rect x="${olX}" y="18" width="${olW}" height="${26*3+4}" fill="rgba(245,158,11,0.12)" rx="2"/>`;
      inner+=`<text x="${olX+olW/2}" y="${H-4}" text-anchor="middle" fill="#F59E0B" font-size="8" font-family="monospace">OVERLAP 13-17 UTC ⭐</text>`;
      inner+=bars;
      for(let h=0;h<=24;h+=4){
        const x=50+h*hrW;
        inner+=`<line x1="${x}" y1="16" x2="${x}" y2="${H-14}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>`;
        inner+=`<text x="${x}" y="${H-14}" text-anchor="middle" fill="#5E5C58" font-size="7" font-family="monospace">${h}:00</text>`;
      }
      return mkSVG(W,H,inner);
    })();
    sessLesson.content += wrapChart('CHART: Global Trading Sessions — 24-Hour Forex Clock (UTC)', sessChart, 'The London/NY overlap (13:00-17:00 UTC, highlighted in gold) is the most active 4-hour window of the entire trading week. Both major financial centres are simultaneously active, creating the highest volume, tightest spreads, and strongest directional trends.');
  }


  // ── DOUBLE TOP & DOUBLE BOTTOM ──
  const cpLesson2 = CURRICULUM.flatMap(c=>c.lessons).find(l=>l.id==='chart-patterns');
  if (cpLesson2 && !cpLesson2._dt_injected) {
    cpLesson2._dt_injected = true;

    // Double Top
    const doubleTop = (()=>{
      const W=310,H=145;
      return mkSVG(W,H,`
        <rect width="${W}" height="${H}" fill="#13131A" rx="6"/>
        <polyline points="15,120 35,100 55,75 70,60 85,75 100,90 115,60 130,75 145,88 160,100 175,115 190,120" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linejoin="round"/>
        <circle cx="70" cy="60" r="5" fill="none" stroke="#EF4444" stroke-width="2"/>
        <circle cx="115" cy="60" r="5" fill="none" stroke="#EF4444" stroke-width="2"/>
        <text x="60" y="50" fill="#EF4444" font-size="8" font-family="monospace">TOP 1</text>
        <text x="105" y="50" fill="#EF4444" font-size="8" font-family="monospace">TOP 2</text>
        <line x1="15" y1="88" x2="${W-10}" y2="88" stroke="rgba(239,68,68,0.6)" stroke-width="1.5" stroke-dasharray="5,3"/>
        <text x="200" y="85" fill="rgba(239,68,68,0.8)" font-size="8" font-family="monospace">NECKLINE</text>
        <polyline points="190,120 205,128 220,135" fill="none" stroke="#EF4444" stroke-width="2.5"/>
        <text x="195" y="143" fill="#EF4444" font-size="8" font-family="monospace">SELL → target = height</text>
        <line x1="70" y1="60" x2="70" y2="88" stroke="rgba(245,158,11,0.3)" stroke-width="1" stroke-dasharray="3,3"/>
        <text x="72" y="76" fill="rgba(245,158,11,0.5)" font-size="7" font-family="monospace">↕ measure</text>
      `);
    })();

    // Double Bottom
    const doubleBottom = (()=>{
      const W=310,H=145;
      return mkSVG(W,H,`
        <rect width="${W}" height="${H}" fill="#13131A" rx="6"/>
        <polyline points="15,25 35,45 55,70 70,90 85,75 100,60 115,90 130,75 145,55 160,40 175,28 190,20" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linejoin="round"/>
        <circle cx="70" cy="90" r="5" fill="none" stroke="#10B981" stroke-width="2"/>
        <circle cx="115" cy="90" r="5" fill="none" stroke="#10B981" stroke-width="2"/>
        <text x="55" y="105" fill="#10B981" font-size="8" font-family="monospace">BOTTOM 1</text>
        <text x="100" y="105" fill="#10B981" font-size="8" font-family="monospace">BOTTOM 2</text>
        <line x1="15" y1="57" x2="${W-10}" y2="57" stroke="rgba(16,185,129,0.6)" stroke-width="1.5" stroke-dasharray="5,3"/>
        <text x="200" y="54" fill="rgba(16,185,129,0.8)" font-size="8" font-family="monospace">NECKLINE</text>
        <polyline points="190,20 205,12 220,6" fill="none" stroke="#10B981" stroke-width="2.5"/>
        <text x="170" y="8" fill="#10B981" font-size="8" font-family="monospace">BUY → target = height</text>
        <line x1="70" y1="57" x2="70" y2="90" stroke="rgba(245,158,11,0.3)" stroke-width="1" stroke-dasharray="3,3"/>
        <text x="72" y="76" fill="rgba(245,158,11,0.5)" font-size="7" font-family="monospace">↕ measure</text>
      `);
    })();

    cpLesson2.content += wrapChart('CHART: Double Top — M Pattern (Bearish Reversal)', doubleTop, 'Two nearly equal highs at resistance. The neckline = middle low. Enter SHORT on a candle CLOSE below the neckline. Target = distance from neckline to the tops projected downward. Win rate at key resistance: 62-68%.');
    cpLesson2.content += wrapChart('CHART: Double Bottom — W Pattern (Bullish Reversal)', doubleBottom, 'Two nearly equal lows at support. The neckline = middle high. Enter LONG on a candle CLOSE above the neckline. Target = distance from neckline to the bottoms projected upward. Win rate at key support: 62-68%.');
  }

  // ── WEDGES ──
  const cpLesson3 = CURRICULUM.flatMap(c=>c.lessons).find(l=>l.id==='chart-patterns');
  if (cpLesson3 && !cpLesson3._wedge_injected) {
    cpLesson3._wedge_injected = true;

    // Rising Wedge (bearish)
    const risingWedge = (()=>{
      const W=310,H=145;
      return mkSVG(W,H,`
        <rect width="${W}" height="${H}" fill="#13131A" rx="6"/>
        <line x1="20" y1="110" x2="220" y2="40" stroke="rgba(239,68,68,0.5)" stroke-width="1.5" stroke-dasharray="5,3"/>
        <line x1="20" y1="125" x2="220" y2="75" stroke="rgba(239,68,68,0.5)" stroke-width="1.5" stroke-dasharray="5,3"/>
        <polyline points="20,125 45,115 60,108 80,98 100,90 120,82 140,74 160,66 180,58 200,50 220,42" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linejoin="round"/>
        <text x="25" y="138" fill="#9B9891" font-size="8" font-family="monospace">↗ Rising Wedge = BEARISH</text>
        <text x="25" y="15" fill="#EF4444" font-size="8" font-family="monospace">Tightening channel rising → momentum weakening</text>
        <polyline points="220,42 240,55 260,75 275,95" fill="none" stroke="#EF4444" stroke-width="2.5"/>
        <text x="225" y="112" fill="#EF4444" font-size="8" font-family="monospace">SELL on break↓</text>
        <text x="225" y="122" fill="#9B9891" font-size="7" font-family="monospace">target = wedge height</text>
      `);
    })();

    // Falling Wedge (bullish)
    const fallingWedge = (()=>{
      const W=310,H=145;
      return mkSVG(W,H,`
        <rect width="${W}" height="${H}" fill="#13131A" rx="6"/>
        <line x1="20" y1="20" x2="220" y2="90" stroke="rgba(16,185,129,0.5)" stroke-width="1.5" stroke-dasharray="5,3"/>
        <line x1="20" y1="35" x2="220" y2="118" stroke="rgba(16,185,129,0.5)" stroke-width="1.5" stroke-dasharray="5,3"/>
        <polyline points="20,35 45,45 60,52 80,60 100,68 120,76 140,82 160,88 180,94 200,100 220,106" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linejoin="round"/>
        <text x="25" y="138" fill="#9B9891" font-size="8" font-family="monospace">↘ Falling Wedge = BULLISH</text>
        <text x="25" y="13" fill="#10B981" font-size="8" font-family="monospace">Tightening channel falling → bears losing steam</text>
        <polyline points="220,106 235,90 250,68 265,45 275,28" fill="none" stroke="#10B981" stroke-width="2.5"/>
        <text x="225" y="140" fill="#10B981" font-size="8" font-family="monospace">BUY on break↑</text>
      `);
    })();

    cpLesson3.content += wrapChart('CHART: Rising Wedge — Deceptive Bullish-Looking Bearish Pattern', risingWedge, 'Price makes higher highs AND higher lows but within converging trendlines. The tightening range shows bulls are losing momentum. When price breaks the lower trendline = bearish. Often catches new traders who see "uptrend" and buy right before the breakdown.');
    cpLesson3.content += wrapChart('CHART: Falling Wedge — Bullish Reversal or Continuation', fallingWedge, 'Price makes lower lows AND lower highs within converging trendlines but bears are losing momentum. When price breaks the upper trendline = bullish entry. Works both as a reversal pattern (at bottoms) and continuation pattern (during uptrend corrections).');
  }

  // ── TRIANGLES ──
  const cpLesson4 = CURRICULUM.flatMap(c=>c.lessons).find(l=>l.id==='chart-patterns');
  if (cpLesson4 && !cpLesson4._triangle_injected) {
    cpLesson4._triangle_injected = true;

    // Ascending Triangle
    const ascTriangle = (()=>{
      const W=310,H=145;
      return mkSVG(W,H,`
        <rect width="${W}" height="${H}" fill="#13131A" rx="6"/>
        <line x1="15" y1="55" x2="225" y2="55" stroke="rgba(239,68,68,0.6)" stroke-width="1.5" stroke-dasharray="5,3"/>
        <text x="17" y="50" fill="rgba(239,68,68,0.7)" font-size="8" font-family="monospace">FLAT RESISTANCE — being tested repeatedly</text>
        <line x1="15" y1="120" x2="215" y2="60" stroke="rgba(16,185,129,0.5)" stroke-width="1.5" stroke-dasharray="5,3"/>
        <text x="17" y="135" fill="rgba(16,185,129,0.7)" font-size="8" font-family="monospace">Rising support = buyers getting more aggressive</text>
        <polyline points="15,120 35,105 50,98 60,55 70,70 85,82 100,55 110,65 125,72 140,55 150,60 165,62 185,55 195,57" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linejoin="round"/>
        <polyline points="215,55 240,38 265,22 280,10" fill="none" stroke="#10B981" stroke-width="3"/>
        <text x="225" y="45" fill="#10B981" font-size="9" font-family="monospace" font-weight="bold">BUY BREAKOUT ▲</text>
      `);
    })();

    // Descending Triangle
    const descTriangle = (()=>{
      const W=310,H=145;
      return mkSVG(W,H,`
        <rect width="${W}" height="${H}" fill="#13131A" rx="6"/>
        <line x1="15" y1="90" x2="225" y2="90" stroke="rgba(16,185,129,0.6)" stroke-width="1.5" stroke-dasharray="5,3"/>
        <text x="17" y="103" fill="rgba(16,185,129,0.7)" font-size="8" font-family="monospace">FLAT SUPPORT — tested repeatedly</text>
        <line x1="15" y1="30" x2="215" y2="85" stroke="rgba(239,68,68,0.5)" stroke-width="1.5" stroke-dasharray="5,3"/>
        <text x="17" y="25" fill="rgba(239,68,68,0.7)" font-size="8" font-family="monospace">Falling resistance = sellers getting more aggressive</text>
        <polyline points="15,30 35,45 50,52 60,90 70,78 85,68 100,90 110,82 125,75 140,90 150,86 165,82 185,90 198,88" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linejoin="round"/>
        <polyline points="215,90 235,105 255,118 270,130 280,138" fill="none" stroke="#EF4444" stroke-width="3"/>
        <text x="220" y="143" fill="#EF4444" font-size="9" font-family="monospace" font-weight="bold">SELL BREAKDOWN ▼</text>
      `);
    })();

    // Symmetrical Triangle
    const symmTriangle = (()=>{
      const W=310,H=145;
      return mkSVG(W,H,`
        <rect width="${W}" height="${H}" fill="#13131A" rx="6"/>
        <line x1="15" y1="25" x2="195" y2="73" stroke="rgba(239,68,68,0.5)" stroke-width="1.5" stroke-dasharray="5,3"/>
        <line x1="15" y1="120" x2="195" y2="73" stroke="rgba(16,185,129,0.5)" stroke-width="1.5" stroke-dasharray="5,3"/>
        <polyline points="15,25 40,40 60,50 80,45 100,55 120,52 140,60 160,58 175,63 190,70" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linejoin="round"/>
        <polyline points="15,120 40,105 60,95 80,100 100,90 120,93 140,84 160,82 175,76 190,73" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linejoin="round"/>
        <text x="20" y="73" fill="#9B9891" font-size="8" font-family="monospace">Coiling...</text>
        <polyline points="195,70 215,50 235,35 255,20" fill="none" stroke="#10B981" stroke-width="2.5"/>
        <text x="200" y="18" fill="#10B981" font-size="8" font-family="monospace">Breakout UP ✓</text>
        <polyline points="195,75 215,90 235,105 255,120" fill="none" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="4,3"/>
        <text x="200" y="133" fill="#EF4444" font-size="8" font-family="monospace">or DOWN</text>
        <text x="105" y="140" fill="#9B9891" font-size="8" font-family="monospace">Trade the breakout direction, not before it</text>
      `);
    })();

    cpLesson4.content += wrapChart('CHART: Ascending Triangle — Bullish Continuation', ascTriangle, 'Flat resistance (bulls keep testing the same level) combined with rising support (bulls buying at higher and higher lows). Pressure builds until breakout above the flat line. Win rate: 60-65%. Target = height of triangle from breakout point.');
    cpLesson4.content += wrapChart('CHART: Descending Triangle — Bearish Continuation', descTriangle, 'Flat support (bears keep testing the same level) combined with falling resistance (sellers selling at lower and lower highs). Pressure builds until breakdown below the flat line. Win rate: 60-65%. Mirror of ascending triangle.');
    cpLesson4.content += wrapChart('CHART: Symmetrical Triangle — Neutral Coil, Trade the Breakout', symmTriangle, 'Both resistance and support converge. Neither bulls nor bears in control — coiling energy. Trade the breakout in whichever direction price closes through the trendline. Never guess direction before the break. Win rate: ~58% with confirmation.');
  }

  // ── DOWNTREND & CONSOLIDATION ──
  const taLesson2 = CURRICULUM.flatMap(c=>c.lessons).find(l=>l.id==='trend-analysis');
  if (taLesson2 && !taLesson2._down_injected) {
    taLesson2._down_injected = true;

    // Downtrend
    const downtrend = (()=>{
      const W=310,H=145;
      return mkSVG(W,H,`
        <rect width="${W}" height="${H}" fill="#13131A" rx="6"/>
        <polyline points="15,20 40,35 55,25 75,50 90,38 115,68 130,55 155,85 170,72 195,102 210,88 235,118 250,105" fill="none" stroke="#EF4444" stroke-width="2" stroke-linejoin="round"/>
        <circle cx="40" cy="35" r="3" fill="#EF4444"/>
        <circle cx="90" cy="38" r="3" fill="#EF4444"/>
        <circle cx="130" cy="55" r="3" fill="#EF4444"/>
        <circle cx="170" cy="72" r="3" fill="#EF4444"/>
        <text x="38" y="28" fill="#EF4444" font-size="8" font-family="monospace">LH</text>
        <text x="88" y="31" fill="#EF4444" font-size="8" font-family="monospace">LH</text>
        <text x="128" y="48" fill="#EF4444" font-size="8" font-family="monospace">LH</text>
        <text x="168" y="65" fill="#EF4444" font-size="8" font-family="monospace">LH</text>
        <circle cx="75" cy="50" r="3" fill="none" stroke="#EF4444" stroke-width="1.5"/>
        <circle cx="115" cy="68" r="3" fill="none" stroke="#EF4444" stroke-width="1.5"/>
        <circle cx="155" cy="85" r="3" fill="none" stroke="#EF4444" stroke-width="1.5"/>
        <circle cx="195" cy="102" r="3" fill="none" stroke="#EF4444" stroke-width="1.5"/>
        <text x="73" y="63" fill="#F97316" font-size="8" font-family="monospace">LL</text>
        <text x="113" y="82" fill="#F97316" font-size="8" font-family="monospace">LL</text>
        <text x="153" y="99" fill="#F97316" font-size="8" font-family="monospace">LL</text>
        <text x="193" y="116" fill="#F97316" font-size="8" font-family="monospace">LL</text>
        <text x="15" y="140" fill="#EF4444" font-size="8" font-family="monospace">DOWNTREND: Lower Highs + Lower Lows — ONLY look to SELL</text>
      `);
    })();

    // Consolidation / Range
    const consolidation = (()=>{
      const W=310,H=145;
      return mkSVG(W,H,`
        <rect width="${W}" height="${H}" fill="#13131A" rx="6"/>
        <line x1="15" y1="45" x2="${W-10}" y2="45" stroke="rgba(239,68,68,0.5)" stroke-width="1.5" stroke-dasharray="5,3"/>
        <line x1="15" y1="100" x2="${W-10}" y2="100" stroke="rgba(16,185,129,0.5)" stroke-width="1.5" stroke-dasharray="5,3"/>
        <text x="17" y="40" fill="rgba(239,68,68,0.7)" font-size="8" font-family="monospace">RANGE TOP (resistance)</text>
        <text x="17" y="115" fill="rgba(16,185,129,0.7)" font-size="8" font-family="monospace">RANGE BOTTOM (support)</text>
        <polyline points="15,72 35,65 50,55 60,45 70,52 85,62 100,70 115,55 125,62 140,72 155,65 165,75 180,100 190,85 205,72 215,62 225,72 240,82 250,72 265,80 275,72" fill="none" stroke="#F59E0B" stroke-width="1.5" stroke-linejoin="round"/>
        <text x="90" y="133" fill="#9B9891" font-size="8" font-family="monospace">BUY at support · SELL at resistance · Wait for breakout</text>
        <rect x="15" y="45" width="${W-25}" height="55" fill="rgba(245,158,11,0.04)" rx="3"/>
        <text x="115" y="78" fill="rgba(245,158,11,0.4)" font-size="9" font-family="monospace" text-anchor="middle">CONSOLIDATION ZONE</text>
      `);
    })();

    taLesson2.content += wrapChart('CHART: Downtrend Structure — Lower Highs (LH) & Lower Lows (LL)', downtrend, 'In a confirmed downtrend each swing high is lower than the last (LH) and each swing low is lower than the last (LL). As long as this holds, only look to SELL. Never buy into a downtrend hoping for a reversal without confirmation — it is the most common beginner mistake.');
    taLesson2.content += wrapChart('CHART: Consolidation / Range — The Market is Deciding', consolidation, 'Price moves sideways between horizontal support (green) and resistance (red). Neither bulls nor bears in control. Two strategies: range trade by buying support and selling resistance with tight stops, OR wait for a clean breakout with volume and trade the new trend direction.');
  }

  // ── INVERSE HEAD & SHOULDERS ──
  const cpLesson5 = CURRICULUM.flatMap(c=>c.lessons).find(l=>l.id==='chart-patterns');
  if (cpLesson5 && !cpLesson5._ihs_injected) {
    cpLesson5._ihs_injected = true;

    const inverseHS = (()=>{
      const W=310,H=145;
      return mkSVG(W,H,`
        <rect width="${W}" height="${H}" fill="#13131A" rx="6"/>
        <polyline points="15,35 35,60 50,55 70,80 85,58 105,100 120,75 135,60 155,80 170,57 185,60 200,38" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linejoin="round"/>
        <circle cx="70" cy="80" r="5" fill="none" stroke="#10B981" stroke-width="2"/>
        <text x="55" y="95" fill="#10B981" font-size="8" font-family="monospace">LS</text>
        <circle cx="105" cy="100" r="5" fill="none" stroke="#10B981" stroke-width="2"/>
        <text x="90" y="115" fill="#10B981" font-size="9" font-family="monospace" font-weight="bold">HEAD</text>
        <circle cx="155" cy="80" r="5" fill="none" stroke="#10B981" stroke-width="2"/>
        <text x="148" y="95" fill="#10B981" font-size="8" font-family="monospace">RS</text>
        <line x1="35" y1="57" x2="195" y2="57" stroke="rgba(16,185,129,0.7)" stroke-width="1.5" stroke-dasharray="5,3"/>
        <text x="195" y="54" fill="rgba(16,185,129,0.8)" font-size="8" font-family="monospace">NECKLINE</text>
        <polyline points="200,38 218,25 235,15 250,8" fill="none" stroke="#10B981" stroke-width="2.5"/>
        <text x="200" y="8" fill="#10B981" font-size="8" font-family="monospace">BUY → target = head depth</text>
      `);
    })();

    // Cup & Handle
    const cupHandle = (()=>{
      const W=310,H=145;
      return mkSVG(W,H,`
        <rect width="${W}" height="${H}" fill="#13131A" rx="6"/>
        <path d="M 20,30 Q 95,125 170,30" fill="none" stroke="#F59E0B" stroke-width="2"/>
        <text x="82" y="138" fill="#9B9891" font-size="8" font-family="monospace">CUP (rounding bottom)</text>
        <polyline points="170,30 180,42 190,38 200,46 210,40 220,48 230,42" fill="none" stroke="#F59E0B" stroke-width="1.8"/>
        <text x="172" y="60" fill="#9B9891" font-size="8" font-family="monospace">HANDLE</text>
        <text x="172" y="70" fill="#9B9891" font-size="8" font-family="monospace">(small pullback)</text>
        <line x1="15" y1="30" x2="240" y2="30" stroke="rgba(16,185,129,0.5)" stroke-width="1.5" stroke-dasharray="5,3"/>
        <text x="17" y="25" fill="rgba(16,185,129,0.7)" font-size="8" font-family="monospace">RESISTANCE (cup rim)</text>
        <polyline points="230,42 250,25 265,12 278,4" fill="none" stroke="#10B981" stroke-width="3"/>
        <text x="230" y="8" fill="#10B981" font-size="8" font-family="monospace">BUY breakout ✓</text>
        <text x="15" y="143" fill="#9B9891" font-size="8" font-family="monospace">Target = depth of cup projected from breakout</text>
      `);
    })();

    cpLesson5.content += wrapChart('CHART: Inverse Head & Shoulders — Powerful Bullish Reversal', inverseHS, 'Mirror image of H&S but at market bottoms. Three valleys: left shoulder, head (deepest), right shoulder. The neckline connects the peaks between the valleys. Enter LONG on close above the neckline. Target = depth from neckline to head projected upward. Win rate: 67-72%.');
    cpLesson5.content += wrapChart('CHART: Cup & Handle — Classic Bullish Continuation', cupHandle, 'A long rounding bottom (the cup) followed by a smaller pullback (the handle), then a breakout above the cup rim. Formed over weeks to months on D1/W1 charts. Entry: close above the rim on the handle breakout. Target = depth of the cup added to breakout level. Win rate: 65-70% in uptrends.');
  }

  // ── BREAKOUT VISUALS for S&R lesson ──
  const srLesson2 = CURRICULUM.flatMap(c=>c.lessons).find(l=>l.id==='support-resistance');
  if (srLesson2 && !srLesson2._breakout_injected) {
    srLesson2._breakout_injected = true;

    const breakoutChart = (()=>{
      const W=310,H=145;
      return mkSVG(W,H,`
        <rect width="${W}" height="${H}" fill="#13131A" rx="6"/>
        <line x1="15" y1="70" x2="${W-10}" y2="70" stroke="rgba(239,68,68,0.6)" stroke-width="1.5" stroke-dasharray="5,3"/>
        <text x="17" y="65" fill="rgba(239,68,68,0.7)" font-size="8" font-family="monospace">RESISTANCE — rejected 3× → becoming weaker</text>
        <polyline points="15,120 35,105 50,100 65,70 75,80 90,90 105,70 115,78 130,70 140,60 160,45 175,50 195,38 210,28" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linejoin="round"/>
        <circle cx="65" cy="70" r="4" fill="none" stroke="#EF4444" stroke-width="1.5"/>
        <circle cx="105" cy="70" r="4" fill="none" stroke="#EF4444" stroke-width="1.5"/>
        <circle cx="130" cy="70" r="4" fill="none" stroke="#EF4444" stroke-width="1.5"/>
        <text x="55" y="64" fill="#EF4444" font-size="7" font-family="monospace">1st</text>
        <text x="97" y="64" fill="#EF4444" font-size="7" font-family="monospace">2nd</text>
        <text x="122" y="64" fill="#EF4444" font-size="7" font-family="monospace">3rd</text>
        <rect x="135" y="40" width="20" height="30" fill="#10B981" rx="1"/>
        <text x="155" y="60" fill="#10B981" font-size="8" font-family="monospace">← BREAK candle</text>
        <polyline points="180,50 180,70" fill="none" stroke="rgba(16,185,129,0.6)" stroke-width="1" stroke-dasharray="3,2"/>
        <text x="158" y="85" fill="#10B981" font-size="8" font-family="monospace">Retest → now SUPPORT</text>
        <text x="15" y="140" fill="#9B9891" font-size="8" font-family="monospace">Wait for CLOSE above resistance, then buy the retest</text>
      `);
    })();

    const fakeBreakout = (()=>{
      const W=310,H=145;
      return mkSVG(W,H,`
        <rect width="${W}" height="${H}" fill="#13131A" rx="6"/>
        <line x1="15" y1="60" x2="${W-10}" y2="60" stroke="rgba(245,158,11,0.7)" stroke-width="1.5" stroke-dasharray="5,3"/>
        <text x="17" y="55" fill="rgba(245,158,11,0.8)" font-size="8" font-family="monospace">KEY LEVEL — resistance above</text>
        <polyline points="15,110 40,95 60,80 80,65 95,55 105,45 115,38" fill="none" stroke="#F59E0B" stroke-width="1.5"/>
        <polyline points="115,38 120,32 118,38 115,50 118,60 122,70 130,80" fill="none" stroke="#EF4444" stroke-width="2"/>
        <text x="100" y="28" fill="#EF4444" font-size="8" font-family="monospace">FAKE breakout</text>
        <text x="102" y="38" fill="#EF4444" font-size="7" font-family="monospace">(wick only)</text>
        <polyline points="130,80 145,92 160,105 175,115 190,120" fill="none" stroke="#EF4444" stroke-width="2"/>
        <text x="130" y="137" fill="#EF4444" font-size="8" font-family="monospace">Price rejected → reversal = SELL entry</text>
        <text x="15" y="140" fill="#9B9891" font-size="8" font-family="monospace">A wick through does NOT confirm breakout. Need a CLOSE.</text>
      `);
    })();

    srLesson2.content += wrapChart('CHART: Real Breakout — Three Tests Then Breakout', breakoutChart, 'Resistance tested 3 times before breaking. Each test weakens sellers. The breakout candle must CLOSE above the level. After the close-above, price often retests the broken level (which is now support) before continuing higher. This retest = ideal entry point.');
    srLesson2.content += wrapChart('CHART: Fake Breakout — The Stop Hunt Trap', fakeBreakout, 'Price briefly spikes above resistance (a wick) but fails to CLOSE above it. This is institutions hunting retail buy-stop orders above the level. The reversal back below is often a very high-probability SELL signal. Always wait for a full candle CLOSE to confirm any breakout.');
  }

  // ── FIBONACCI LESSON CHARTS ──
  const fibLesson = CURRICULUM.flatMap(c=>c.lessons).find(l=>l.id==='indicators');
  if (fibLesson && !fibLesson._fib_injected) {
    fibLesson._fib_injected = true;

    const fibChart = (()=>{
      const W=310,H=165;
      const levels = [
        {pct:0,   y:20,  label:'0% — Swing High',   col:'rgba(239,68,68,0.6)'},
        {pct:23.6,y:50,  label:'23.6% — Shallow',   col:'rgba(245,158,11,0.4)'},
        {pct:38.2,y:75,  label:'38.2% — Normal',    col:'rgba(245,158,11,0.5)'},
        {pct:50,  y:95,  label:'50.0% — Mid',        col:'rgba(245,158,11,0.6)'},
        {pct:61.8,y:112, label:'61.8% ⭐ GOLDEN',   col:'rgba(16,185,129,0.8)'},
        {pct:78.6,y:132, label:'78.6% — Deep',       col:'rgba(239,68,68,0.4)'},
        {pct:100, y:152, label:'100% — Swing Low',   col:'rgba(239,68,68,0.6)'},
      ];
      let inner = `<rect width="${W}" height="${W}" fill="#13131A" rx="6"/>`;
      levels.forEach(l => {
        inner += `<line x1="70" y1="${l.y}" x2="${W-10}" y2="${l.y}" stroke="${l.col}" stroke-width="${l.pct===61.8?2:1}" stroke-dasharray="${l.pct===61.8?'none':'4,3'}"/>`;
        inner += `<text x="5" y="${l.y+4}" fill="${l.pct===61.8?'#10B981':'#9B9891'}" font-size="${l.pct===61.8?9:8}" font-family="monospace" font-weight="${l.pct===61.8?'bold':'normal'}">${l.label}</text>`;
      });
      // Price line bouncing at 61.8
      inner += `<polyline points="70,20 110,55 130,75 155,112 175,98 195,85 215,65 235,45 255,25" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linejoin="round"/>`;
      inner += `<circle cx="155" cy="112" r="5" fill="none" stroke="#10B981" stroke-width="2"/>`;
      inner += `<text x="160" y="110" fill="#10B981" font-size="8" font-family="monospace">Bounce at 61.8% = BUY</text>`;
      return mkSVG(W, 165, inner);
    })();

    fibLesson.content += wrapChart('CHART: Fibonacci Retracement — The Golden Pocket Setup', fibChart, 'Draw from swing high to swing low (or vice versa). Price often retraces to key Fibonacci levels before continuing the trend. The 61.8% level (the Golden Pocket, highlighted in green) is the most powerful and widely respected level globally. When it coincides with a horizontal S&R level = extremely high probability entry zone.');
  }

  console.log('✅ All chart pattern SVGs injected: Double Top/Bottom, Wedges, Triangles, Downtrend, Consolidation, Inverse H&S, Cup & Handle, Breakout/Fake, Fibonacci');

  console.log('✅ SVG chart visuals injected into all core lessons');
})();

/* ═══════════════════════════════════════════════════════════════
   TRADEBABY PRO v10 — ADDITIONAL FULL LESSONS (BATCH 2)
   Deep-dive lessons with comprehensive SVG chart demonstrations
   ═══════════════════════════════════════════════════════════════ */

(function injectBatch2Lessons() {
  if (typeof CURRICULUM === 'undefined') return;

  // ── SVG HELPERS (local scope) ──
  function mkSVG(w, h, inner) {
    return `<svg viewBox="0 0 ${w} ${h}" width="100%" xmlns="http://www.w3.org/2000/svg" style="display:block;border-radius:8px;background:#13131A">${inner}</svg>`;
  }
  function wChart(title, svg, note) {
    return `<div class="chart-visual"><div class="chart-visual-title">${title}</div>${svg}${note ? `<p style="font-size:11px;color:var(--txt3,#9B9891);margin-top:6px;line-height:1.5">${note}</p>` : ''}</div>`;
  }
  function cRow(candles, W, H) {
    const n = candles.length, cw = Math.max(8, Math.floor((W - 20) / n) - 3), pad = 10;
    const prices = candles.flatMap(c => [c.h, c.l]);
    const lo = Math.min(...prices), hi = Math.max(...prices), rng = (hi - lo) || 0.01;
    const sy = v => pad + (1 - (v - lo) / rng) * (H - pad * 2 - 10);
    let inner = `<rect width="${W}" height="${H}" fill="#13131A" rx="6"/>`;
    [0.25, 0.5, 0.75].forEach(f => {
      inner += `<line x1="${pad}" y1="${pad + f * (H - pad * 2 - 10)}" x2="${W - pad}" y2="${pad + f * (H - pad * 2 - 10)}" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>`;
    });
    candles.forEach((c, i) => {
      const x = pad + i * ((W - pad * 2) / n), col = c.bull ? '#10B981' : '#EF4444';
      const bT = Math.min(sy(c.o), sy(c.c)), bH = Math.max(2, Math.abs(sy(c.o) - sy(c.c)));
      inner += `<line x1="${x + cw / 2}" y1="${sy(c.h)}" x2="${x + cw / 2}" y2="${sy(c.l)}" stroke="${col}" stroke-width="1.5"/>`;
      inner += `<rect x="${x}" y="${bT}" width="${cw}" height="${bH}" fill="${col}" rx="1"/>`;
      if (c.lbl) inner += `<text x="${x + cw / 2}" y="${H - 1}" text-anchor="middle" font-size="7" font-family="monospace" fill="#9B9891">${c.lbl}</text>`;
    });
    return mkSVG(W, H, inner);
  }

  // ── FIND OR CREATE SMC SUBJECT ──
  let smcSubject = CURRICULUM.find(s => s.id === 'smc-concepts');
  if (!smcSubject) {
    smcSubject = { id: 'smc-concepts', title: 'Smart Money Concepts', emoji: '🏛️', desc: 'Trade with institutions.', color: 'var(--cyan)', lessons: [] };
    CURRICULUM.push(smcSubject);
  }

  // ── ORDER BLOCKS DEEP DIVE ──
  if (!smcSubject.lessons.find(l => l.id === 'order-blocks-deep')) {
    smcSubject.lessons.push({
      id: 'order-blocks-deep', title: 'Order Blocks — Mastery Guide', emoji: '📦', mins: 20, xp: 200,
      content: `<h3>What Institutions Leave Behind</h3>
<p>When large institutions (banks, hedge funds, central banks) place massive orders, they cannot fill them all at once without moving the market against themselves. They place partial orders, and when price moves away, they leave behind "unfinished business" — these zones become Order Blocks.</p>
<p>An <strong>Order Block</strong> is simply the last opposing candle before a significant impulse move. When a major bullish move occurs, the last bearish candle before it is a Bullish Order Block — because institutions were building their long position there.</p>

<h3>Identifying Order Blocks</h3>
<p><strong>Bullish Order Block (OB+):</strong> The last <em>bearish</em> candle before a major bullish impulse that creates a Break of Structure. This candle represents where smart money was absorbing sell orders while building their long positions.</p>
<p><strong>Bearish Order Block (OB-):</strong> The last <em>bullish</em> candle before a major bearish impulse that creates a Break of Structure.</p>

${wChart('CHART: Bullish Order Block Formation', cRow([
  {o:0.60,h:0.58,l:0.63,c:0.62,bull:false,lbl:'OB ↓'},
  {o:0.62,h:0.58,l:0.73,c:0.72,bull:true,lbl:'Impulse'},
  {o:0.72,h:0.70,l:0.76,c:0.75,bull:true,lbl:'BOS'},
  {o:0.75,h:0.74,l:0.78,c:0.77,bull:true},
  {o:0.77,h:0.75,l:0.80,c:0.65,bull:false,lbl:'Retrace'},
  {o:0.65,h:0.63,l:0.63,c:0.64,bull:true,lbl:'Return'},
  {o:0.64,h:0.62,l:0.70,c:0.69,bull:true,lbl:'↑ Cont.'},
  {o:0.69,h:0.67,l:0.74,c:0.73,bull:true},
], 320, 120), 'The bearish candle (OB) before the impulse is where institutions built their long positions. Price drops back to this zone, institutions fill remaining orders, then price continues up. This is the entry zone.')}

<h3>Rules for Valid Order Blocks</h3>
<ul>
<li><strong>Must have displaced price</strong> — The candle following the OB must break structure significantly (strong impulse, multiple candles of displacement)</li>
<li><strong>Fresh beats tested</strong> — An OB that has never been retested (fresh) is highest quality. An OB tested once retains some validity. Tested twice = significantly weakened.</li>
<li><strong>Aligned with HTF direction</strong> — A bullish OB on H1 aligned with an H4 uptrend is much stronger than one against the higher timeframe trend</li>
<li><strong>Within premium/discount</strong> — Bullish OBs are most powerful in discount zones (below 50% of the range). Bearish OBs in premium zones (above 50%)</li>
</ul>

<h3>Entry Technique on the OB Return</h3>
<p>When price returns to an Order Block, you have three entry methods with increasing precision:</p>
<ol>
<li><strong>OB high/low entry</strong> — Limit order at the high (bullish OB) or low (bearish OB) of the OB candle</li>
<li><strong>Mitigation entry</strong> — Wait for price to enter the OB zone (50% into the candle body), then look for reversal candle</li>
<li><strong>FVG within OB</strong> — If a Fair Value Gap exists within or just above/below the OB, that overlapping confluence is the highest probability entry zone</li>
</ol>
<div class="callout"><strong>Stop Loss on OB trades:</strong> Place SL below the OB's lowest wick (bullish OB) or above the OB's highest wick (bearish OB). If price trades beyond the OB extreme, the order block is invalidated — exit immediately.</div>`
    });
  }

  // ── MARKET STRUCTURE MASTERCLASS ──
  if (!CURRICULUM.flatMap(c=>c.lessons).find(l => l.id === 'market-structure-master')) {
    const advSubj = CURRICULUM.find(s => s.id === 'advanced-concepts') || smcSubject;
    advSubj.lessons.push({
      id: 'market-structure-master', title: 'Market Structure Masterclass', emoji: '📐', mins: 19, xp: 190,
      content: `<h3>Reading the Market's Language</h3>
<p>Market structure is the most fundamental skill in technical analysis. Before any indicator, pattern, or strategy, understanding where price has been and where it structurally is going gives you context that no indicator can provide.</p>

<h3>The Four Market States</h3>
<p><strong>Trending Up (Bullish):</strong> Series of Higher Highs (HH) and Higher Lows (HL). Each peak exceeds the last. Each trough is above the last trough. Only look to BUY.</p>
<p><strong>Trending Down (Bearish):</strong> Series of Lower Highs (LH) and Lower Lows (LL). Only look to SELL.</p>
<p><strong>Ranging:</strong> Price oscillating between horizontal support and resistance. Look to BUY at support, SELL at resistance. Avoid breakout trades.</p>
<p><strong>Transitioning:</strong> Neither a clear trend nor a clear range — the most dangerous state. Avoid trading until a new state forms.</p>

${wChart('CHART: The Full Market Cycle — Trend to Range to Reversal', cRow([
  {o:0.40,h:0.38,l:0.44,c:0.43,bull:true,lbl:'HH'},
  {o:0.43,h:0.42,l:0.45,c:0.42,bull:false,lbl:'HL'},
  {o:0.42,h:0.40,l:0.48,c:0.47,bull:true,lbl:'HH'},
  {o:0.47,h:0.46,l:0.49,c:0.47,bull:false,lbl:'HL'},
  {o:0.47,h:0.46,l:0.51,c:0.50,bull:true,lbl:'HH'},
  {o:0.50,h:0.49,l:0.52,c:0.50,bull:false,lbl:'HL→?'},
  {o:0.50,h:0.52,l:0.51,c:0.52,bull:false,lbl:'CHOCH'},
  {o:0.52,h:0.55,l:0.53,c:0.55,bull:false,lbl:'LH'},
  {o:0.55,h:0.58,l:0.57,c:0.58,bull:false,lbl:'LL'},
  {o:0.58,h:0.60,l:0.56,c:0.60,bull:false,lbl:'LH'},
  {o:0.60,h:0.63,l:0.61,c:0.63,bull:false,lbl:'LL'},
], 330, 120), 'Left: Uptrend with HH/HL structure. Middle: CHOCH — first Higher Low broken, signaling potential reversal. Right: New LH/LL structure confirming downtrend. This transition is where the biggest R:R opportunities appear.')}

<h3>Internal Structure vs External Structure</h3>
<p><strong>External Structure:</strong> The major swing highs and lows visible on the current timeframe. These are the headline structure points that define the trend.</p>
<p><strong>Internal Structure:</strong> Minor swing highs and lows within each "leg" of the external structure. Internal structure breaks (CHOCH on the lower timeframe) often precede external structure breaks.</p>

<h3>How to Use Structure for Trade Direction</h3>
<table>
<tr><th>D1 Structure</th><th>H4 Structure</th><th>Action</th></tr>
<tr><td style="color:var(--green)">Bullish (HH/HL)</td><td style="color:var(--green)">Bullish (HH/HL)</td><td>Buy at H4 support with full conviction</td></tr>
<tr><td style="color:var(--green)">Bullish</td><td style="color:var(--red)">Bearish (CHOCH)</td><td>Wait for H4 to show reversal confirmation before buying</td></tr>
<tr><td style="color:var(--red)">Bearish (LH/LL)</td><td style="color:var(--red)">Bearish</td><td>Sell at H4 resistance with full conviction</td></tr>
<tr><td style="color:var(--red)">Bearish</td><td style="color:var(--green)">Bullish (counter)</td><td>Wait — counter-trend, lower probability, tighter targets</td></tr>
</table>

${wChart('CHART: Structural Break of Structure (BOS) Confirmation', cRow([
  {o:0.48,h:0.46,l:0.52,c:0.51,bull:false},
  {o:0.51,h:0.48,l:0.55,c:0.54,bull:false},
  {o:0.54,h:0.52,l:0.59,c:0.58,bull:false,lbl:'prev HH'},
  {o:0.58,h:0.57,l:0.62,c:0.61,bull:false},
  {o:0.61,h:0.59,l:0.56,c:0.57,bull:true,lbl:'HL'},
  {o:0.57,h:0.55,l:0.63,c:0.62,bull:true,lbl:'BOS!'},
  {o:0.62,h:0.60,l:0.64,c:0.63,bull:true,lbl:'New HH'},
  {o:0.63,h:0.62,l:0.66,c:0.65,bull:true},
], 330, 115), 'Price breaks above the most recent previous high (BOS = Break of Structure). This confirms the downtrend is over and a new uptrend is starting. The first Higher Low after the BOS is the ideal entry for the new trend.')}

<div class="callout"><strong>Structure-first workflow:</strong> Before checking any indicator, ask yourself: "What is the structure doing on D1, H4, and H1?" If all three timeframes show the same structural bias, that alignment is your highest-conviction trade context. Only add indicators to refine entry timing — never to determine direction.</div>`
    });
  }

  // ── INSTITUTIONAL TRADING HOURS ──
  let sessSubj = CURRICULUM.find(s => s.id === 'trading-sessions');
  if (!sessSubj) sessSubj = CURRICULUM.find(s => s.id === 'advanced-concepts');
  if (sessSubj && !sessSubj.lessons.find(l => l.id === 'killzones')) {
    sessSubj.lessons.push({
      id: 'killzones', title: 'ICT Kill Zones — Optimal Trading Hours', emoji: '⚡', mins: 12, xp: 120,
      content: `<h3>Kill Zones: When Institutions Move Markets</h3>
<p>ICT (Inner Circle Trader) popularized the concept of "Kill Zones" — specific windows when institutional order flow is most concentrated and trend moves are most reliable. Trading during these windows versus random times dramatically changes win rate.</p>

<h3>The Four Kill Zones (UTC Time)</h3>
<p>🌏 <strong>Asian Kill Zone: 20:00–00:00 UTC</strong></p>
<p>Tokyo institutional activity. Best for: AUD/JPY, NZD/JPY, USD/JPY. Characteristically range-bound. Asian range extremes become key levels for London to target.</p>

<p>🇬🇧 <strong>London Kill Zone: 07:00–10:00 UTC</strong></p>
<p>London open and the first 3 hours. Strongest directional moves. Institutions establishing their day positions. The London Breakout strategy targets exactly this window. Best for: EUR/USD, GBP/USD, EUR/GBP.</p>

<p>🇺🇸 <strong>New York Kill Zone: 13:00–16:00 UTC</strong></p>
<p>NY open. Economic data releases (NFP, CPI, FOMC at 13:30 UTC). Second major directional window. Often reverses or confirms London direction. Best for: all USD pairs.</p>

<p>🔄 <strong>London Close Kill Zone: 15:00–17:00 UTC</strong></p>
<p>End of London session. London traders closing positions = counter-moves. Price often retraces the NY open move during this window. Used by experienced traders to fade extreme London/NY moves.</p>

${(()=>{
  const W = 330, H = 140;
  const blocks = [
    {label:'Asian KZ',start:20,end:24,y:25,color:'rgba(59,130,246,0.4)',text:'AUD/JPY ▸'},
    {label:'London KZ',start:7,end:10,y:55,color:'rgba(16,185,129,0.55)',text:'EUR/GBP ▸'},
    {label:'NY KZ',start:13,end:16,y:85,color:'rgba(245,158,11,0.55)',text:'USD pairs ▸'},
    {label:'London Close',start:15,end:17,y:55,color:'rgba(239,68,68,0.3)',text:''},
  ];
  const pad = 40, pW = W - pad - 10;
  const hx = h24 => h24 >= 20 ? pad + (h24-20)*(pW/24) : pad + (h24+4)*(pW/24);
  let inner = `<rect width="${W}" height="${H}" fill="#13131A" rx="6"/>`;
  inner += `<line x1="${pad}" y1="${H-15}" x2="${W-10}" y2="${H-15}" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>`;
  [0,4,8,12,16,20].forEach(h => {
    const x = pad + ((h+4)%24)*(pW/24);
    inner += `<text x="${x}" y="${H-4}" text-anchor="middle" fill="#5E5C58" font-size="7" font-family="monospace">${h}:00</text>`;
    inner += `<line x1="${x}" y1="15" x2="${x}" y2="${H-15}" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>`;
  });
  blocks.forEach(b => {
    const x1 = hx(b.start), x2 = b.end <= b.start ? W-10 : hx(b.end);
    inner += `<rect x="${x1}" y="${b.y}" width="${x2-x1}" height="20" fill="${b.color}" rx="3"/>`;
    inner += `<text x="${x1+4}" y="${b.y+13}" fill="white" font-size="8" font-family="monospace" font-weight="bold">${b.label}</text>`;
  });
  inner += `<text x="${pad+2}" y="14" fill="#F59E0B" font-size="8" font-family="monospace">⭐ London/NY Overlap: strongest 4 hours of the week</text>`;
  return wChart('CHART: The Four ICT Kill Zones (UTC)', mkSVG(W, H, inner), '');
})()}

<h3>The Silver Bullet — A Kill Zone Trade Model</h3>
<p>One of ICT's simplest, most repeatable models:</p>
<ol>
<li>During the NY Kill Zone (13:00-16:00 UTC), identify the hourly direction</li>
<li>Wait for a displacement candle to form a Fair Value Gap (FVG)</li>
<li>If FVG is in a bullish direction, wait for price to retrace INTO the FVG</li>
<li>Enter long at the FVG with SL below the displacement candle's low</li>
<li>TP at the high of the displacement candle</li>
</ol>
<div class="callout"><strong>Kill Zone edge:</strong> The same setup taken inside a Kill Zone has a statistically higher win rate than the same setup taken outside one. Institutions have predictable operating schedules. Trading when they're active means trading WITH order flow, not against it.</div>`
    });
  }

  // ── BACKTESTING MASTERY ──
  if (!CURRICULUM.flatMap(c=>c.lessons).find(l => l.id === 'backtesting-master')) {
    const advSubj2 = CURRICULUM.find(s => s.id === 'advanced-concepts');
    if (advSubj2) {
      advSubj2.lessons.push({
        id: 'backtesting-master', title: 'Backtesting Your Strategy', emoji: '🔬', mins: 15, xp: 150,
        content: `<h3>Why Backtesting Is Non-Negotiable</h3>
<p>You would never take a new car onto a highway without first testing it. Yet most traders risk real money on untested strategies. Backtesting lets you discover whether your strategy actually has an edge — without risking a single dollar.</p>

<h3>The Backtesting Process</h3>
<p><strong>Step 1 — Write Your Rules</strong></p>
<p>Before touching a chart, write down every single rule completely. If your rules contain the words "usually," "often," "feels right," or "when it looks good" — you don't have a strategy yet. Rules must be binary: IF X AND Y THEN Z.</p>
<p>Example rule (bad): "Enter when RSI looks oversold at support"</p>
<p>Example rule (good): "Enter when RSI(14) is below 35 AND price is within 10 pips of a D1 support level that has had at least 3 previous touches AND a bullish engulfing candle closes on H4"</p>

<p><strong>Step 2 — Choose Your Dataset</strong></p>
<p>Minimum: 2 years of data. Ideal: 5+ years covering different market conditions (trending, ranging, volatile, calm). Include at least one major crisis period (2008, 2020, 2022).</p>

<p><strong>Step 3 — Manual Backtest (The Gold Standard)</strong></p>
<p>Use TradingView's Bar Replay feature or MT5's Strategy Tester visual mode. Move through history bar by bar. Mark every setup that meets ALL your criteria. Record each result in a spreadsheet.</p>

<p><strong>Step 4 — Record Keeping</strong></p>
<table>
<tr><th>Field</th><th>Why Track It</th></tr>
<tr><td>Entry date/time</td><td>Identify performance by day/month/session</td></tr>
<tr><td>Pair and TF</td><td>See which markets suit your strategy best</td></tr>
<tr><td>Direction</td><td>Are you better long or short?</td></tr>
<tr><td>Entry/SL/TP exact prices</td><td>Calculate actual R:R achieved</td></tr>
<tr><td>Outcome (W/L/BE)</td><td>Win rate calculation</td></tr>
<tr><td>Pip outcome</td><td>Profit factor calculation</td></tr>
<tr><td>Notes: what was the setup quality?</td><td>A/B/C grade setups differently</td></tr>
</table>

<p><strong>Step 5 — Analyse the Results</strong></p>
<p>After 100+ trades, calculate:
<ul>
<li><strong>Win Rate</strong> = Wins ÷ Total Trades</li>
<li><strong>Profit Factor</strong> = Gross Wins ÷ Gross Losses (needs to be above 1.3)</li>
<li><strong>Max Drawdown</strong> = Largest peak-to-trough loss (should be below 20%)</li>
<li><strong>Expectancy</strong> = (WR × Avg Win) − (LR × Avg Loss) (must be positive)</li>
</ul>

<div class="callout"><strong>Walk-Forward Testing:</strong> After backtesting on 2018-2022, test on 2023-2024 data without changing rules. If performance drops significantly, you likely have curve-fitting (overfitting) — rules that worked on past data but have no real edge. Only a strategy that performs well on both in-sample AND out-of-sample data has a genuine edge.</div>`
      });
    }
  }

  // ── BUILDING A TRADING PLAN ──
  const psychSubj = CURRICULUM.find(s => s.id === 'trading-psychology');
  if (psychSubj && !psychSubj.lessons.find(l => l.id === 'trading-plan-builder')) {
    psychSubj.lessons.push({
      id: 'trading-plan-builder', title: 'Building Your Trading Plan', emoji: '📋', mins: 16, xp: 160,
      content: `<h3>Your Trading Business Plan</h3>
<p>Every successful business has a business plan. Trading is a business. Without a written trading plan, you are operating on emotion and reaction — the most expensive way to trade. A trading plan makes decisions for you IN ADVANCE, before your emotions are involved.</p>

<h3>The 9 Components of a Complete Trading Plan</h3>

<p><strong>1. Instruments & Universe</strong><br>Which pairs/instruments will you trade? List them specifically. <em>Start with 1-3 pairs and master them. Every additional pair adds complexity exponentially.</em></p>

<p><strong>2. Timeframes</strong><br>Your analysis timeframe (e.g., D1/H4) and your entry timeframe (e.g., H1/M15). Every trade must be assessed on BOTH before entering.</p>

<p><strong>3. Entry Rules (Specific, Binary)</strong><br>Write out exact criteria. No vague language. "When EUR/USD on H4 pulls back to EMA21 with a bullish engulfing candle closing above EMA21, AND D1 is in an uptrend (HH/HL structure)" = acceptable. "When it looks good" = unacceptable.</p>

<p><strong>4. Exit Rules — Stop Loss</strong><br>Where exactly does your stop go and why? What price proves your setup wrong? Document the logic, not just a pip number.</p>

<p><strong>5. Exit Rules — Take Profit</strong><br>What is your profit target based on? Next S&R level? Fibonacci extension? Fixed R multiple? Write it down.</p>

<p><strong>6. Risk Rules</strong><br>Maximum risk per trade (1-2%). Maximum open trades simultaneously. Maximum daily drawdown (stop trading for day if -3%). Maximum weekly drawdown (-5%).</p>

<p><strong>7. Trading Hours</strong><br>Which session(s) will you trade? What time will you START trading? What time will you STOP? When will you avoid trading (major news events)? Documenting this prevents "I'll just take one more trade at midnight" decisions.</p>

<p><strong>8. Drawdown Response Protocol</strong><br>If down X% today → [specific action]. If down Y% this week → [specific action]. Pre-decide what you'll do so you don't decide emotionally during a drawdown.</p>

<p><strong>9. Performance Review Schedule</strong><br>Weekly: review all trades, process compliance %, P&L. Monthly: evaluate whether the strategy is working. Quarterly: assess if plan needs updating.</p>

<h3>The Pre-Trade Checklist</h3>
<p>Before EVERY trade, run through this checklist:</p>
<div style="background:var(--bg3,#1C1C22);border:1px solid var(--bdr,rgba(245,158,11,0.15));border-left:3px solid var(--amber,#F59E0B);border-radius:8px;padding:14px;margin:12px 0">
<p style="font-weight:700;font-family:var(--display);margin-bottom:10px;color:var(--amber,#F59E0B)">Pre-Trade Checklist — No Exceptions</p>
<div style="font-size:13px;display:flex;flex-direction:column;gap:8px;color:var(--txt2,#9B9891)">
<label>☐ Setup matches my entry rules exactly (not approximately)</label>
<label>☐ Higher timeframe trend aligns with my direction</label>
<label>☐ Stop Loss is at a logical level, not random pips</label>
<label>☐ Position size calculated — max 1-2% risk</label>
<label>☐ R:R is at least 1:2</label>
<label>☐ No major news in the next 30 minutes</label>
<label>☐ I am calm, not anxious, frustrated, or greedy</label>
<label>☐ This is a trade I would be comfortable showing another trader</label>
</div>
</div>
<div class="callout"><strong>The plan IS the edge.</strong> Most retail traders have a strategy but no plan. The plan is what controls risk, prevents emotional decisions, and creates the discipline that separates consistently profitable traders from everyone else. Write yours this week, even if it's imperfect. Refine it with each review.</div>`
    });
  }

  // ── OPTIONS & ALTERNATIVE INSTRUMENTS OVERVIEW ──
  const fundSubj = CURRICULUM.find(s => s.id === 'fundamental-analysis');
  if (fundSubj && !fundSubj.lessons.find(l => l.id === 'alternative-instruments')) {
    fundSubj.lessons.push({
      id: 'alternative-instruments', title: 'Beyond Forex: Gold, Oil & Indices', emoji: '🌐', mins: 14, xp: 140,
      content: `<h3>Expanding Your Tradeable Universe</h3>
<p>Most forex platforms offer gold, silver, crude oil, and major stock indices alongside currency pairs. Understanding how these instruments behave and correlate with forex gives you additional high-probability setups.</p>

<h3>Gold (XAU/USD)</h3>
<p><strong>Character:</strong> The ultimate safe haven asset. Inversely correlated with USD strength. When fear increases (crises, geopolitical tension), gold typically rallies. When USD strengthens, gold typically falls.</p>
<p><strong>Best for:</strong> Trend following on D1. Gold creates sustained multi-week trends during periods of USD weakness or global uncertainty. Low noise, high follow-through when it trends.</p>
<p><strong>Key levels:</strong> $2,000, $2,100, $2,200, $2,300 are major psychological levels. Round numbers attract institutional orders.</p>
<p><strong>Trading note:</strong> Gold spreads are typically 0.25-1 pip but can widen dramatically during low-liquidity periods. Best traded during London and NY sessions.</p>

${wChart('CHART: Gold USD Inverse Correlation with Dollar Index', (()=>{
  const W=320, H=120, pad=12;
  const gold  = [60,62,65,70,75,72,68,72,78,82,88,92,90,94,98];
  const dxy   = [75,73,70,65,60,63,67,63,57,53,47,43,45,41,37];
  const pW = W-pad*2, pH = H-pad*2;
  const mn1=40,mx1=105,mn2=35,mx2=80;
  const sy1 = v => pad+(1-(v-mn1)/(mx1-mn1))*pH;
  const sy2 = v => pad+(1-(v-mn2)/(mx2-mn2))*pH;
  const sx   = (i,n) => pad + i*(pW/(n-1));
  let inner=`<rect width="${W}" height="${H}" fill="#13131A" rx="6"/>`;
  [0.25,0.5,0.75].forEach(f=>inner+=`<line x1="${pad}" y1="${pad+f*pH}" x2="${W-pad}" y2="${pad+f*pH}" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>`);
  inner+=`<polyline points="${gold.map((v,i)=>`${sx(i,gold.length)},${sy1(v)}`).join(' ')}" fill="none" stroke="#F59E0B" stroke-width="2"/>`;
  inner+=`<polyline points="${dxy.map((v,i)=>`${sx(i,dxy.length)},${sy2(v)}`).join(' ')}" fill="none" stroke="#3B82F6" stroke-width="1.5" stroke-dasharray="5,3"/>`;
  inner+=`<text x="${W-pad-35}" y="${sy1(gold[gold.length-1])-5}" fill="#F59E0B" font-size="8" font-family="monospace">Gold ↑</text>`;
  inner+=`<text x="${W-pad-30}" y="${sy2(dxy[dxy.length-1])+12}" fill="#3B82F6" font-size="8" font-family="monospace">DXY ↓</text>`;
  return mkSVG(W,H,inner);
})(), 'When the US Dollar Index (DXY, blue dashed) falls, Gold (orange) typically rises. This inverse relationship holds about 80% of the time. Check DXY direction before entering Gold trades.')}

<h3>Crude Oil (XTIUSD / OIL)</h3>
<p><strong>Character:</strong> Energy commodity. Driven by OPEC decisions, US inventory data (weekly Wednesday release), geopolitical risks, and USD strength. Highly volatile.</p>
<p><strong>Key drivers:</strong> OPEC production decisions (can move price 5-10% instantly), US EIA Weekly Petroleum Status Report (Wednesday 15:30 UTC), geopolitical events affecting Middle East supply.</p>
<p><strong>Currency correlation:</strong> CAD positively correlates with oil (Canada exports oil → USD/CAD falls when oil rises). NOK (Norwegian Krone) also oil-correlated.</p>

<h3>Major Stock Indices</h3>
<table>
<tr><th>Index</th><th>What It Tracks</th><th>Risk Correlation</th></tr>
<tr><td><strong>NAS100</strong></td><td>100 largest NASDAQ stocks (tech-heavy)</td><td>Risk-on, USD bearish when rises</td></tr>
<tr><td><strong>SPX500</strong></td><td>Top 500 US companies</td><td>Global risk barometer</td></tr>
<tr><td><strong>US30</strong></td><td>Dow Jones 30 blue-chip stocks</td><td>Risk indicator</td></tr>
<tr><td><strong>GER40</strong></td><td>Germany's top 40 companies</td><td>EUR correlated</td></tr>
<tr><td><strong>UK100</strong></td><td>UK's top 100 companies</td><td>GBP partially correlated</td></tr>
</table>
<p><strong>Trading rule:</strong> When NAS100/SPX500 is falling sharply (risk-off), expect: USD strength, JPY strength, CHF strength, AUD weakness, NZD weakness. When indices are rallying strongly (risk-on): opposite flows.</p>

<div class="callout"><strong>Intermarket shortcut:</strong> Check SPX500 or NAS100 chart each morning before trading. If indices are falling, bias all your trades toward USD long / AUD-NZD short. If indices are rising, the opposite. This single macro check adds a powerful layer of confluence to every forex trade.</div>`
    });
  }

  console.log('✅ Batch 2 lessons injected');
})();
