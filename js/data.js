/* ═══════════════════════════════════════════
   DATA LAYER — TradeBaby Pro v4
   Market data, strategies, flashcards, patterns
   ═══════════════════════════════════════════ */

// ── MARKET DATA ──
const MARKET_DATA = {
  tickers: [
    {pair:'EUR/USD', price:1.0847, change:0.0012,  pct: 0.11},
    {pair:'GBP/USD', price:1.2634, change:-0.0023, pct:-0.18},
    {pair:'USD/JPY', price:149.82, change: 0.45,   pct: 0.30},
    {pair:'AUD/USD', price:0.6512, change: 0.0008,  pct: 0.12},
    {pair:'USD/CHF', price:0.8921, change:-0.0015,  pct:-0.17},
    {pair:'USD/CAD', price:1.3654, change: 0.0021,  pct: 0.15},
    {pair:'NZD/USD', price:0.5923, change:-0.0011,  pct:-0.19},
    {pair:'EUR/GBP', price:0.8585, change: 0.0009,  pct: 0.10},
    {pair:'EUR/JPY', price:162.44, change: 0.67,   pct: 0.41},
    {pair:'GBP/JPY', price:189.21, change:-0.34,   pct:-0.18},
    {pair:'EUR/AUD', price:1.6648, change:-0.0045,  pct:-0.27},
    {pair:'AUD/JPY', price:97.56,  change: 0.23,   pct: 0.24},
    {pair:'XAU/USD', price:2341.50,change: 8.20,   pct: 0.35},
    {pair:'XAG/USD', price:27.42,  change: 0.18,   pct: 0.66},
    {pair:'BTC/USD', price:67420,  change: 1240,   pct: 1.87},
    {pair:'ETH/USD', price:3841,   change: 56,     pct: 1.48},
    {pair:'NAS100',  price:17840,  change:-125,    pct:-0.70},
    {pair:'SPX500',  price:5234,   change: 18,     pct: 0.34},
    {pair:'US30',    price:38670,  change: 142,    pct: 0.37},
    {pair:'OIL/USD', price:78.45,  change:-0.32,   pct:-0.41},
  ]
};

// ── DAILY WISDOM ──
const DAILY_TIPS = [
  {tip:"The market is a device for transferring money from the impatient to the patient.", by:"Warren Buffett"},
  {tip:"The goal of a successful trader is to make the best trades. Money is secondary.", by:"Alexander Elder"},
  {tip:"Risk comes from not knowing what you're doing.", by:"Warren Buffett"},
  {tip:"It's not whether you're right or wrong, but how much you make when right and how much you lose when wrong.", by:"George Soros"},
  {tip:"Amateurs want to be right. Professionals want to make money.", by:"Trading Wisdom"},
  {tip:"The elements of good trading are cutting losses, cutting losses, and cutting losses.", by:"Ed Seykota"},
  {tip:"Markets can remain irrational longer than you can remain solvent.", by:"John Maynard Keynes"},
  {tip:"Trade what you see, not what you think.", by:"Larry Pesavento"},
  {tip:"Plan the trade. Trade the plan.", by:"Classic Rule"},
  {tip:"The biggest trading errors are conceptual, not execution errors.", by:"Mark Douglas"},
  {tip:"I'm always thinking about losing money as opposed to making money.", by:"Paul Tudor Jones"},
  {tip:"Without a plan, you are just gambling.", by:"Trading Wisdom"},
  {tip:"The hard work in trading comes in the preparation. The trading should be effortless.", by:"Jack Schwager"},
  {tip:"Every trade is a probability. The best you can do is tilt the odds in your favor.", by:"Trading Wisdom"},
  {tip:"The less I care about the outcome of a specific trade, the better I trade.", by:"Mark Douglas"},
  {tip:"Consistency is the mother of mastery.", by:"Trading Wisdom"},
  {tip:"Cut your losses quickly. Let your profits run.", by:"Classic Rule"},
  {tip:"A good trader must have a chronic inability to accept things at face value.", by:"Michael Lewis"},
  {tip:"Win or lose, everybody gets what they want out of the market.", by:"Ed Seykota"},
  {tip:"Be patient. Opportunities will come. Don't force trades.", by:"Trading Wisdom"},
  {tip:"Your job is not to predict the market. Your job is to react to it.", by:"Trading Wisdom"},
  {tip:"The market rewards patience and punishes greed.", by:"Trading Wisdom"},
  {tip:"Novice traders risk 5-10× too much per trade.", by:"Bruce Kovner"},
  {tip:"The goal is not to be right. The goal is to make money.", by:"Trading Wisdom"},
  {tip:"Do more of what works and less of what doesn't.", by:"Steve Clark"},
  {tip:"In trading, discipline separates the rich from the broke.", by:"Trading Wisdom"},
  {tip:"A losing trade followed perfectly is better than a winning trade broken.", by:"Trading Wisdom"},
  {tip:"Opportunities come infrequently. When it rains gold, put out the bucket, not the thimble.", by:"Warren Buffett"},
  {tip:"There is no Holy Grail in trading. There is only you, your method, and the market.", by:"Trading Wisdom"},
  {tip:"The stock market is filled with individuals who know the price of everything, but the value of nothing.", by:"Philip Fisher"},
];

// ── FLASHCARDS ──
const FLASHCARDS = [
  {q:"What is a pip?", a:"The smallest standard price movement. Most pairs: 0.0001 (4th decimal). JPY pairs: 0.01 (2nd decimal). Pipette = 0.00001 (5th decimal)."},
  {q:"What is leverage?", a:"Borrowing from your broker to control a larger position. 100:1 = $1,000 controls $100,000. Amplifies both profits AND losses equally."},
  {q:"What is the Bid price?", a:"The price at which you can SELL. Always lower than the Ask. The market maker buys from you at this price."},
  {q:"What is the Ask price?", a:"The price at which you can BUY. Always higher than the Bid. The market maker sells to you at this price."},
  {q:"What is the Spread?", a:"Difference between Bid and Ask — the broker's built-in fee. EUR/USD: normally 0.5-2 pips. Exotic pairs: 10-50+ pips. Widens dramatically during news."},
  {q:"What is a Standard Lot?", a:"100,000 currency units. On EUR/USD with USD account = ~$10 per pip movement. Too large for most beginners."},
  {q:"What is a Mini Lot?", a:"10,000 units. ~$1 per pip on EUR/USD. Good for accounts with $1,000-$5,000 balance."},
  {q:"What is a Micro Lot?", a:"1,000 units. ~$0.10 per pip on EUR/USD. Best for beginners and small accounts under $1,000."},
  {q:"What is Margin?", a:"Collateral your broker holds to keep positions open. NOT a fee. Required Margin = Position Size ÷ Leverage. Falling below required margin triggers margin call."},
  {q:"What is a Margin Call?", a:"Broker warning when your equity falls below required margin level (~100%). Must deposit more funds or close trades or broker auto-closes positions."},
  {q:"What is a Stop Loss?", a:"Auto-closes trade at predetermined loss level. Non-negotiable — ALWAYS use one. Place at logical S&R level, not random pips. Never move it further away."},
  {q:"What is a Take Profit?", a:"Auto-closes trade when it reaches your profit target. Set BEFORE entering while thinking clearly. Prevents greed from moving the goalposts mid-trade."},
  {q:"What is a Bullish Engulfing?", a:"2-candle reversal: second green candle completely engulfs the first red candle. Strong bullish reversal signal, best at downtrend lows and key support levels."},
  {q:"What is a Bearish Engulfing?", a:"2-candle reversal: second red candle completely engulfs the first green candle. Strong bearish reversal, best at uptrend highs and key resistance."},
  {q:"What is a Hammer?", a:"Small body at top, long lower wick (at least 2× body length). Buyers rejected lower prices. Bullish reversal at downtrend lows and support. Needs confirmation candle."},
  {q:"What is a Shooting Star?", a:"Small body at bottom, long upper wick (at least 2× body). Sellers rejected higher prices. Bearish reversal at uptrend highs and resistance."},
  {q:"What is a Doji?", a:"Open ≈ Close. Complete market indecision. Most powerful after a strong trend at a key S&R level. The next candle confirms the direction."},
  {q:"What is RSI?", a:"Relative Strength Index. Oscillates 0-100. Above 70 = overbought. Below 30 = oversold. RSI 50 = trend filter. Divergence = powerful reversal signal."},
  {q:"What is MACD?", a:"12EMA - 26EMA with 9EMA signal line. MACD crossing above signal = bullish. Below = bearish. Histogram shows momentum strength. Divergence warns of reversals."},
  {q:"What is the Golden Cross?", a:"50 MA crosses ABOVE the 200 MA. Major long-term bullish signal, widely watched by institutional traders and fund managers."},
  {q:"What is the Death Cross?", a:"50 MA crosses BELOW the 200 MA. Major long-term bearish signal. Often preceded by extended downtrend."},
  {q:"What is Support?", a:"Price level where buying overcomes selling — price bounces up. More tests without breaking = stronger level. Broken support becomes resistance."},
  {q:"What is Resistance?", a:"Price level where selling overcomes buying — price bounces down. More tests = stronger level. Broken resistance becomes support (role reversal)."},
  {q:"What is Role Reversal?", a:"When broken support becomes resistance, or broken resistance becomes support. Trading the retest of a broken level is one of the highest-probability setups."},
  {q:"What is the 1% Rule?", a:"Never risk more than 1-2% of your account on any single trade. Allows surviving 50+ consecutive losses. The single most important rule in trading."},
  {q:"What is Risk/Reward Ratio?", a:"Relationship between potential loss and potential gain. 1:2 R:R = risk $1 to make $2. Minimum recommended: 1:2. With 1:2 R:R, you only need 34% win rate to profit."},
  {q:"What is Expectancy?", a:"Expected profit per dollar risked. Formula: (Win% × Avg Win) - (Loss% × Avg Loss). Positive expectancy = profitable system over many trades."},
  {q:"What is a Head & Shoulders?", a:"3 peaks: left shoulder, head (highest), right shoulder. Neckline = line through the two troughs. Close below neckline = sell entry. Target = head height."},
  {q:"What is a Double Top?", a:"Two nearly equal highs at resistance. Enter SHORT on close below the neckline (middle low). Target = pattern height. Signals bullish exhaustion."},
  {q:"What is a Double Bottom?", a:"Two nearly equal lows at support. Enter LONG on close above the middle high. Target = pattern height. Signals bearish exhaustion. Also called W-pattern."},
  {q:"What is Fibonacci 61.8%?", a:"The 'Golden Ratio' Fibonacci level. Most respected retracement globally. Price often reverses here in strong trends. Also called the 'Golden Pocket'."},
  {q:"What is an Order Block?", a:"In SMC: the last bearish candle before a major bullish impulse move. Price often returns to this zone for institutions to fill remaining orders."},
  {q:"What is a Fair Value Gap?", a:"3-candle price imbalance where candle 1 and candle 3 don't overlap. Price moved too fast, leaving untraded prices. Price tends to return to fill it."},
  {q:"What is CHOCH?", a:"Change of Character — first structure break against the prevailing trend. Signals potential reversal. Used in Smart Money Concepts to identify institutional reversals."},
  {q:"What is ATR?", a:"Average True Range — measures market volatility. Use to set realistic stops (1.5-2× ATR). Higher ATR = more volatile, wider stops needed."},
  {q:"What is Bollinger Band Squeeze?", a:"When upper and lower bands narrow significantly. Signals low volatility period. Price is coiling for a breakout — often precedes big directional moves."},
  {q:"What is the London/NY Overlap?", a:"13:00-17:00 UTC. Both major sessions active. Highest volume, tightest spreads, best trends of the entire trading day. Best time to trade major pairs."},
  {q:"What is NFP?", a:"Non-Farm Payrolls — US monthly jobs report, first Friday each month. Biggest regular USD mover. 100-300 pip reactions common. Spreads widen dramatically."},
  {q:"What is Hawkish?", a:"Central bank signaling rate hikes or monetary tightening. Reduces money supply. Generally causes the currency to STRENGTHEN."},
  {q:"What is Dovish?", a:"Central bank signaling rate cuts or monetary easing. Expands money supply. Generally causes the currency to WEAKEN."},
  {q:"What is Carry Trade?", a:"Buying a high-interest currency, selling a low-interest one. Earn the interest differential (swap) daily. Best in stable, risk-on environments. Unwinds violently in crises."},
  {q:"What is Slippage?", a:"Difference between your intended execution price and actual fill price. Normal in fast markets and on market orders. Factor into calculations especially during news."},
  {q:"What is a Pin Bar?", a:"Small body with wick at least 2× body size. Long lower wick = bullish rejection. Long upper wick = bearish rejection. Most powerful at key S&R levels with confluence."},
  {q:"What is confluence?", a:"Multiple technical factors aligning at the same price level. More factors = higher probability. Example: Fibonacci 61.8% + horizontal S&R + MA200 = extremely strong setup."},
  {q:"What is a trailing stop?", a:"A dynamic stop loss that moves WITH price as your trade profits, locking in gains while letting the trade run further. Automatically moves up (or down for shorts)."},
  {q:"What is an Inside Bar?", a:"A candle whose high AND low are completely within the previous candle's range. Signals consolidation/indecision. Trade the breakout of the mother bar's range."},
  {q:"What is the Morning Star?", a:"3-candle bullish reversal: large bearish candle → small indecision candle → large bullish candle closing past midpoint of first. Best at major support levels."},
  {q:"What is the Evening Star?", a:"3-candle bearish reversal: large bullish → small indecision → large bearish closing past midpoint of first. Best at major resistance. Mirror of Morning Star."},
  {q:"What is a Marubozu?", a:"Full-body candle with no wicks. Shows maximum conviction — bulls or bears completely dominated. Often starts or confirms the beginning of a strong new trend."},
  {q:"What is the RSI 50 line?", a:"The midpoint of RSI acts as a trend filter. RSI consistently above 50 = bullish momentum. Below 50 = bearish. Used to confirm trend direction before entering trades."},
  {q:"What is Quantitative Easing (QE)?", a:"When a central bank buys assets (bonds) to inject money into the economy. Expansionary monetary policy. Generally bearish for the currency as money supply increases."},
];

// ── PATTERN QUIZ DATA ──
const PATTERN_QUIZ = [
  {
    name:'Bullish Engulfing', type:'Bullish Reversal', winrate:'63-68%', timeframe:'H4/D1',
    hint:'A small red candle followed by a large green candle that completely swallows it',
    meaning:'Strong bullish reversal — buyers overwhelmed sellers', rules:'Best at downtrend lows and key support. Larger size difference = stronger signal.',
    candles:[
      {o:0.60, h:0.61, l:0.57, c:0.58, bull:false},
      {o:0.56, h:0.65, l:0.55, c:0.64, bull:true}
    ]
  },
  {
    name:'Bearish Engulfing', type:'Bearish Reversal', winrate:'61-66%', timeframe:'H4/D1',
    hint:'A small green candle followed by a large red candle that completely swallows it',
    meaning:'Strong bearish reversal — sellers overwhelmed buyers', rules:'Best at uptrend highs and key resistance. Most powerful on D1 after strong rallies.',
    candles:[
      {o:0.58, h:0.63, l:0.57, c:0.62, bull:true},
      {o:0.64, h:0.65, l:0.54, c:0.55, bull:false}
    ]
  },
  {
    name:'Hammer', type:'Bullish Reversal', winrate:'60-65%', timeframe:'All TFs',
    hint:'Small body at the TOP of the candle with a very long lower wick',
    meaning:'Buyers rejected lower prices — potential bottom', rules:'Appears at downtrend lows. Lower wick must be at least 2× body. Confirmation candle needed.',
    candles:[
      {o:0.62, h:0.63, l:0.50, c:0.61, bull:true},
    ]
  },
  {
    name:'Shooting Star', type:'Bearish Reversal', winrate:'59-64%', timeframe:'All TFs',
    hint:'Small body at the BOTTOM of the candle with a very long upper wick',
    meaning:'Sellers rejected higher prices — potential top', rules:'Appears at uptrend highs. Upper wick must be 2× body. Best at strong resistance levels.',
    candles:[
      {o:0.60, h:0.73, l:0.59, c:0.61, bull:true},
    ]
  },
  {
    name:'Doji', type:'Indecision/Reversal', winrate:'55-60%', timeframe:'H4/D1',
    hint:'Open and close prices are nearly identical — creating a cross or plus sign shape',
    meaning:'Complete indecision — neither bulls nor bears in control', rules:'Most powerful after a strong trend at a key S&R level. Next candle confirms direction.',
    candles:[
      {o:0.60, h:0.66, l:0.54, c:0.60, bull:true},
    ]
  },
  {
    name:'Morning Star', type:'Strong Bullish Reversal', winrate:'67-72%', timeframe:'D1/H4',
    hint:'Three candles: large bearish, small middle candle, large bullish',
    meaning:'Bears exhausted — bulls take control. One of the strongest reversal patterns.',
    rules:'Middle candle must be small (indecision). Third candle must close past midpoint of first. Best at major support.',
    candles:[
      {o:0.68, h:0.69, l:0.55, c:0.56, bull:false},
      {o:0.55, h:0.58, l:0.53, c:0.56, bull:true},
      {o:0.57, h:0.71, l:0.56, c:0.69, bull:true}
    ]
  },
  {
    name:'Evening Star', type:'Strong Bearish Reversal', winrate:'65-70%', timeframe:'D1/H4',
    hint:'Three candles: large bullish, small middle candle, large bearish',
    meaning:'Bulls exhausted — bears take control. Mirror of Morning Star.',
    rules:'Best at major resistance after extended uptrend. Third candle must close past midpoint of first.',
    candles:[
      {o:0.52, h:0.65, l:0.51, c:0.64, bull:true},
      {o:0.64, h:0.67, l:0.62, c:0.63, bull:false},
      {o:0.63, h:0.64, l:0.50, c:0.51, bull:false}
    ]
  },
  {
    name:'Pin Bar', type:'Bullish/Bearish Reversal', winrate:'62-67%', timeframe:'H4/D1',
    hint:'Very small body with a wick that is at least 2-3× the body length on one side',
    meaning:'Strong price rejection — potential reversal if at key level',
    rules:'Lower wick = bullish rejection (buy at support). Upper wick = bearish rejection (sell at resistance). Context is everything.',
    candles:[
      {o:0.62, h:0.63, l:0.47, c:0.61, bull:true},
    ]
  },
  {
    name:'Bullish Pin Bar', type:'Bullish Reversal', winrate:'62-67%', timeframe:'H4/D1',
    hint:'Long lower wick, small body near the top — buyers strongly rejected lower prices',
    meaning:'Strong bullish rejection at support', rules:'Enter at 50% retracement of the wick. SL below wick extreme. Best at Fibonacci + S&R confluence.',
    candles:[
      {o:0.61, h:0.63, l:0.48, c:0.62, bull:true},
    ]
  },
  {
    name:'Three White Soldiers', type:'Strong Bullish', winrate:'70-75%', timeframe:'D1',
    hint:'Three consecutive large green candles, each closing higher than the last',
    meaning:'Strong momentum shift — bulls completely in control', rules:'Each opens near previous close. Appears at major lows. One of highest-probability reversal patterns.',
    candles:[
      {o:0.54, h:0.59, l:0.53, c:0.58, bull:true},
      {o:0.58, h:0.64, l:0.57, c:0.63, bull:true},
      {o:0.63, h:0.70, l:0.62, c:0.69, bull:true}
    ]
  },
  {
    name:'Three Black Crows', type:'Strong Bearish', winrate:'68-73%', timeframe:'D1',
    hint:'Three consecutive large red candles, each closing lower than the last',
    meaning:'Strong momentum shift — bears completely in control', rules:'Each opens near previous close. Appears at major highs. Mirror of Three White Soldiers.',
    candles:[
      {o:0.68, h:0.69, l:0.62, c:0.63, bull:false},
      {o:0.63, h:0.64, l:0.57, c:0.58, bull:false},
      {o:0.58, h:0.59, l:0.51, c:0.52, bull:false}
    ]
  },
  {
    name:'Tweezer Bottom', type:'Bullish Reversal', winrate:'58-63%', timeframe:'H4/D1',
    hint:'Two candles with nearly identical LOWS — price tested the same low twice',
    meaning:'Double rejection of lower prices — strong support', rules:'Two candles with matching lows at support. Second candle should be bullish. Shows failed bearish pressure.',
    candles:[
      {o:0.65, h:0.66, l:0.55, c:0.56, bull:false},
      {o:0.55, h:0.63, l:0.55, c:0.62, bull:true}
    ]
  },
];

// ── CANDLESTICK BIBLE ──
const CANDLE_PATTERNS = [
  {name:'Hammer', type:'Bullish Reversal', reliability:'★★★★', timeframe:'All TFs', emoji:'🔨',
   desc:'Small body at top, long lower wick (at least 2× body size). Price tested lower but buyers closed it near the high. Represents failed bearish pressure.',
   rules:'Must appear at bottom of downtrend. Lower wick ≥ 2× body. Little or no upper wick. Requires confirmation from next candle closing higher.',
   stats:'Win rate at key support: 60-65%. Mid-range: ~48%. D1/H4 most reliable. Power increases at Fibonacci + S&R confluence.'},
  {name:'Inverted Hammer', type:'Bullish Reversal', reliability:'★★★', timeframe:'H4/D1', emoji:'🔁',
   desc:'Small body at bottom, long upper wick. Buyers pushed up but lost control. Potential reversal when at downtrend lows.',
   rules:'At downtrend bottoms only. Needs bullish confirmation candle to be valid. Treat as tentative signal until confirmed.',
   stats:'Win rate with confirmation: ~55%. Less reliable than regular hammer. Never trade without the confirmation candle.'},
  {name:'Shooting Star', type:'Bearish Reversal', reliability:'★★★★', timeframe:'All TFs', emoji:'⭐',
   desc:'Small body at bottom, long upper wick (2× body). Sellers rejected higher prices. The classic bearish reversal candle.',
   rules:'Appears at top of uptrend. Upper wick ≥ 2× body. Little/no lower wick. Best at round numbers and key resistance.',
   stats:'Win rate at resistance: 59-64%. Most powerful at weekly/monthly highs. Bearish confirmation increases reliability.'},
  {name:'Hanging Man', type:'Bearish Warning', reliability:'★★★', timeframe:'H4/D1', emoji:'🪢',
   desc:'Identical shape to hammer but appears at uptrend highs. Warning that selling pressure is emerging despite bullish close.',
   rules:'Must appear at top of uptrend to be bearish. Requires strong bearish confirmation next candle. Without confirmation, ignore.',
   stats:'Win rate with confirmation: ~54%. Weaker signal than shooting star. Only trade with strong bearish follow-through.'},
  {name:'Doji', type:'Indecision/Reversal', reliability:'★★★', timeframe:'H4/D1', emoji:'✚',
   desc:'Open ≈ Close. Complete equilibrium between buyers and sellers. Neither side won the battle.',
   rules:'Most powerful after a strong sustained trend at a key level. Next candle MUST confirm direction. Four subtypes: standard, long-legged, dragonfly, gravestone.',
   stats:'Standard doji reversal rate at S&R: ~55%. Dragonfly (bullish): 62%. Gravestone (bearish): 61%. Useless without context.'},
  {name:'Dragonfly Doji', type:'Bullish Reversal', reliability:'★★★★', timeframe:'H4/D1', emoji:'🐉',
   desc:'Open = Close at the HIGH. Long lower wick. Strong bullish signal — price tested lows and was completely rejected.',
   rules:'Forms when open and close are at or near the session high. At support levels or downtrend bottoms. Very bullish signal.',
   stats:'Win rate at key support: 62-67%. One of the more reliable single-candle patterns. Similar to hammer but with more symmetry.'},
  {name:'Gravestone Doji', type:'Bearish Reversal', reliability:'★★★★', timeframe:'H4/D1', emoji:'🪦',
   desc:'Open = Close at the LOW. Long upper wick. Strong bearish signal — price tested highs and was completely rejected.',
   rules:'Forms when open and close are at or near the session low. At resistance or uptrend highs. Very bearish signal.',
   stats:'Win rate at key resistance: 61-66%. Most powerful at weekly/monthly highs. Also called the "tombstone" doji.'},
  {name:'Bullish Engulfing', type:'Bullish Reversal', reliability:'★★★★★', timeframe:'All TFs', emoji:'🐂',
   desc:'Second green candle completely engulfs the first red candle. One of the most reliable and widely traded reversal patterns.',
   rules:'Green candle opens below red close, closes above red open. At downtrend lows or support. Larger size difference = stronger. Body engulfment matters more than wicks.',
   stats:'Win rate at S&R: 63-68%. Best pattern for reversal trading on H4/D1. Power increases with larger green candle.'},
  {name:'Bearish Engulfing', type:'Bearish Reversal', reliability:'★★★★★', timeframe:'All TFs', emoji:'🐻',
   desc:'Second red candle completely engulfs the first green candle. The bearish mirror of bullish engulfing.',
   rules:'Red candle opens above green close, closes below green open. At uptrend highs or resistance. Most powerful on D1 after extended rallies.',
   stats:'Win rate at resistance: 61-66%. Especially powerful at the top of strong, multi-week uptrends.'},
  {name:'Morning Star', type:'Strong Bullish Reversal', reliability:'★★★★★', timeframe:'D1/H4', emoji:'☀️',
   desc:'3 candles: large bearish → small indecision → large bullish. The classic powerful bottom reversal. Represents complete sentiment shift.',
   rules:'Strong bearish first candle. Small middle candle (can be any color). Large bullish third candle closing past first candle midpoint. At major support only.',
   stats:'Win rate at major support: 67-72%. One of the highest probability 3-candle patterns. Context is critical — at major support only.'},
  {name:'Evening Star', type:'Strong Bearish Reversal', reliability:'★★★★★', timeframe:'D1/H4', emoji:'🌙',
   desc:'3 candles: large bullish → small indecision → large bearish. The classic top reversal. Mirror of Morning Star.',
   rules:'Large bullish first candle. Small middle candle. Large bearish third closing past first midpoint. At major resistance after extended uptrend.',
   stats:'Win rate at major resistance: 65-70%. Most powerful when forming at multi-month or yearly highs.'},
  {name:'Marubozu', type:'Trend Confirmation', reliability:'★★★★', timeframe:'All TFs', emoji:'📊',
   desc:'Full-body candle with no wicks or very small wicks. Maximum conviction — one side completely dominated the session.',
   rules:'Bullish marubozu: opens at low, closes at high. Bearish: opens at high, closes at low. Signals strong momentum continuation.',
   stats:'Trend continuation rate: 58-65%. After consolidation, often launches a new strong trend. Very reliable momentum signal.'},
  {name:'Three White Soldiers', type:'Strong Bullish', reliability:'★★★★★', timeframe:'D1', emoji:'⚔️',
   desc:'Three consecutive large bullish candles, each opening within and closing above the previous. Maximum bullish conviction.',
   rules:'Each candle must be large. Each opens near previous close (minimal gap). At major lows after extended downtrend.',
   stats:'Win rate at major lows: 70-75%. One of the highest probability multi-candle patterns. Very rare but very reliable.'},
  {name:'Three Black Crows', type:'Strong Bearish', reliability:'★★★★★', timeframe:'D1', emoji:'🐦‍⬛',
   desc:'Three consecutive large bearish candles, each closing lower. Maximum bearish conviction. Mirror of Three White Soldiers.',
   rules:'Each candle large and closes lower. Each opens near previous close. At major highs after extended uptrend.',
   stats:'Win rate at major highs: 68-73%. Often seen at tops of major bull runs. Treat with extreme seriousness.'},
  {name:'Piercing Line', type:'Bullish Reversal', reliability:'★★★★', timeframe:'H4/D1', emoji:'🗡️',
   desc:'Two candles: large bearish, then bullish that opens below the low and closes above the midpoint of the bearish candle.',
   rules:'At downtrend lows. Bullish candle must close past 50% of bearish candle. Like a partial engulfing.',
   stats:'Win rate at support: 58-63%. Similar to engulfing but green candle does not fully engulf. Requires confirmation.'},
  {name:'Dark Cloud Cover', type:'Bearish Reversal', reliability:'★★★★', timeframe:'H4/D1', emoji:'⛈️',
   desc:'Two candles: large bullish, then bearish that opens above the high and closes below the midpoint of the bullish candle.',
   rules:'At uptrend highs or resistance. Bearish candle must close past 50% of bullish candle. Mirror of Piercing Line.',
   stats:'Win rate at resistance: 56-61%. More reliable on D1 than H4. Confirmation helps.'},
  {name:'Tweezer Top', type:'Bearish Reversal', reliability:'★★★', timeframe:'H4/D1', emoji:'🔧',
   desc:'Two consecutive candles with matching or near-matching HIGHS at resistance. Price tested the same high twice and rejected both times.',
   rules:'Must appear at resistance or swing highs. Second candle should be bearish. Extra powerful at round numbers.',
   stats:'Win rate at resistance: 58-63%. More reliable when highs align exactly. Add confluence for higher probability.'},
  {name:'Tweezer Bottom', type:'Bullish Reversal', reliability:'★★★', timeframe:'H4/D1', emoji:'🔩',
   desc:'Two consecutive candles with matching lows at support. Price tested the same low twice and bounced both times.',
   rules:'Must appear at support or swing lows. Second candle should be bullish. Best at major support levels.',
   stats:'Win rate at support: 57-62%. Most reliable when lows match exactly. Fibonacci + S&R confluence increases probability significantly.'},
];

// ── STRATEGIES ──
const STRATEGIES = [
  {
    id:'london-breakout', name:'London Breakout', style:'Day Trade', tf:'H1/M15',
    pairs:'EUR/USD, GBP/USD, EUR/JPY', winrate:'58%', rr:'1:2', difficulty:2, emoji:'🇬🇧', color:'var(--blue)',
    desc:'Capture the explosive move at London open (08:00 UTC) when major institutional traders enter the market.',
    rules:[
      'Mark the Asian session range: highest high and lowest low from 00:00-07:00 UTC',
      'At London open (08:00 UTC), wait for a candle to CLOSE above the Asian high or below Asian low',
      'BUY on confirmed close above Asian high | SELL on confirmed close below Asian low',
      'Stop Loss: 10-15 pips beyond the broken range extreme',
      'Take Profit: 1.5-2× the full height of the Asian session range',
      'Risk per trade: maximum 1% of account balance',
      'Avoid: Mondays (gap risk), holidays, days with Asian range >80 pips',
      'Best pairs: EUR/USD and GBP/USD. Avoid exotic pairs on this strategy',
    ],
    backtest:'Historical win rate ~58% on EUR/USD (2018-2024). Performs best when aligned with D1 trend direction. Weakest in July-August low-volume months.'
  },
  {
    id:'trend-pullback', name:'EMA Trend Pullback', style:'Swing/Day', tf:'H4/H1',
    pairs:'All Major Pairs', winrate:'52%', rr:'1:3', difficulty:2, emoji:'〰️', color:'var(--green)',
    desc:'Enter on pullbacks to the 21 EMA in a confirmed trend. Patient, high R:R approach used by many professional traders.',
    rules:[
      'H4 uptrend confirmed: price above both 21 EMA AND 50 EMA, both sloping upward',
      'Wait for price to pull back to the 21 EMA zone (within 5-10 pips)',
      'Look for bullish confirmation candle: hammer, bullish engulfing, or doji + bull candle',
      'Enter on the open of the next candle after confirmation',
      'Stop Loss: below the swing low of the pullback (NOT below the EMA)',
      'Take Profit: at previous swing high OR 3× your risk amount',
      'Move stop to break-even after price moves 1× risk in your favor',
      'For downtrends: exact reverse (sell at EMA retest with bearish confirmation)',
    ],
    backtest:'Best performance in ADX>25 trending conditions. Struggles in choppy markets. Filter: only trade when 21 EMA slope is clearly visible.'
  },
  {
    id:'support-bounce', name:'Support & Resistance Bounce', style:'Swing', tf:'D1/H4',
    pairs:'All Pairs', winrate:'55%', rr:'1:2.5', difficulty:1, emoji:'📏', color:'var(--gold)',
    desc:'The most fundamental strategy in trading. Buy at strong support, sell at strong resistance. Excellent for beginners.',
    rules:[
      'Mark key S&R levels on D1 timeframe — minimum 3 clear touch points',
      'Wait for price to approach the zone (within 10-15 pips)',
      'Look for reversal confirmation: pin bar, doji, or engulfing candle',
      'Enter on H4 or H1 after confirmation candle CLOSES',
      'Stop Loss: 10-20 pips beyond the S&R zone',
      'Take Profit: next significant S&R level on the opposite side',
      'Trade is only valid if R:R is minimum 1:2',
      'Avoid entering 30 minutes before or after high-impact news events',
    ],
    backtest:'Best when S&R coincides with round numbers (1.1000, 1.2000). Most reliable and learnable strategy for beginners. Start here.'
  },
  {
    id:'breakout-retest', name:'Breakout & Retest', style:'Day/Swing', tf:'H4/H1',
    pairs:'All Major Pairs', winrate:'48%', rr:'1:3', difficulty:2, emoji:'🔥', color:'var(--orange)',
    desc:'Enter the second-chance move after a key level breaks and price retests it. Lower risk than chasing breakouts.',
    rules:[
      'Mark S&R level with at least 3 clear touches in recent history',
      'Wait for a strong momentum candle that CLOSES beyond the level',
      'Allow price to pull back and retest the broken level',
      'Enter on a confirmation candle at the retest showing rejection',
      'Stop Loss: beyond the retested level (it should now be new S/R)',
      'Take Profit: measure the consolidation range, project same distance from breakout',
      'Must wait for the retest — never chase the initial breakout',
      'Avoid if consolidation lasted less than 4 hours',
    ],
    backtest:'False breakouts common (48% win rate). The retest entry provides much better R:R than chasing the initial break. Patience critical.'
  },
  {
    id:'rsi-divergence', name:'RSI Divergence', style:'Swing', tf:'H4/D1',
    pairs:'EUR/USD, GBP/JPY, XAU/USD', winrate:'45%', rr:'1:4', difficulty:3, emoji:'📊', color:'var(--purple)',
    desc:'Identify momentum divergence between price and RSI to catch high R:R reversals. Best at key confluence zones.',
    rules:[
      'On H4 or D1: price makes new HIGH but RSI makes lower high = bearish divergence',
      'Or price makes new LOW but RSI makes higher low = bullish divergence',
      'Divergence MUST occur at a major S&R level for confluence',
      'Divergence should span at least 20+ candles for significance',
      'Wait for a candlestick confirmation pattern after the divergence',
      'Enter on the CLOSE of the confirmation candle',
      'Stop Loss: beyond the swing high/low that formed the divergence',
      'Take Profit: next major S&R level (target 1:4 R:R minimum)',
    ],
    backtest:'Lower win rate but exceptional R:R when correct. Best on H4/D1. Avoid M5/M15 — too many false signals. Must have S&R confluence.'
  },
  {
    id:'smc-order-block', name:'SMC Order Block Entry', style:'Day Trade', tf:'H1/M15',
    pairs:'EUR/USD, GBP/USD, NAS100', winrate:'50%', rr:'1:3', difficulty:4, emoji:'🏛️', color:'var(--cyan)',
    desc:'Institutional-style trading using Smart Money Concepts. Enter at Order Blocks after Change of Character.',
    rules:[
      'Step 1: Identify H4/D1 market structure direction (BOS confirms trend)',
      'Step 2: On H1, wait for CHOCH — first structure break against the trend',
      'Step 3: Mark the Order Block (last bearish candle before the bullish CHOCH impulse)',
      'Step 4: Wait for price to retrace back to the Order Block zone',
      'Step 5: On M15, look for FVG fill or bullish confirmation at the OB',
      'Stop Loss: 3-5 pips below the Order Block low/high',
      'Take Profit: at next liquidity pool (previous swing high/equal highs)',
      'Invalidate OB if it has been tested more than 2 times previously',
    ],
    backtest:'Requires significant screen time to identify correctly. High R:R when mastered. Popular but heavily saturated — use with additional confluence.'
  },
  {
    id:'inside-bar', name:'Inside Bar Breakout', style:'Swing/Day', tf:'D1/H4',
    pairs:'All Major Pairs', winrate:'52%', rr:'1:2.5', difficulty:2, emoji:'📦', color:'var(--blue)',
    desc:'Trade the directional breakout from an Inside Bar consolidation. Mechanical rules with clear entry and exit.',
    rules:[
      'Identify Inside Bar: high AND low are completely within the previous candle (mother bar)',
      'Mother bar should be a strong directional candle',
      'Best setup: inside bar at a key S&R level or after a strong impulse move',
      'Set Buy Stop 1-2 pips above the Inside Bar high (breakout to upside)',
      'Set Sell Stop 1-2 pips below the Inside Bar low (breakout to downside)',
      'Stop Loss: opposite side of the Inside Bar + 3 pip buffer',
      'Take Profit: 2-2.5× the height of the Inside Bar',
      'Cancel pending orders if not triggered after 3 candles',
    ],
    backtest:'Clean mechanical rules. D1/H4 most reliable. M15/M30 generates too many false breakouts. Best after strong trend moves.'
  },
  {
    id:'pin-bar', name:'Pin Bar Reversal', style:'Swing', tf:'H4/D1',
    pairs:'All Majors + Gold', winrate:'53%', rr:'1:2', difficulty:2, emoji:'📌', color:'var(--purple)',
    desc:'High-probability reversal entries at key price rejection points. Visual, intuitive, and reliable at confluence zones.',
    rules:[
      'Pin bar criteria: wick must be at least 2× the body length, body ≤ 1/3 total candle length',
      'Bullish pin bar: long lower wick at support zone',
      'Bearish pin bar: long upper wick at resistance zone',
      'MUST be at major S&R, Fibonacci level, or MA200 for validity',
      'Optimal entry: limit order at 50% retracement of the pin bar wick',
      'Stop Loss: 3-5 pips beyond the extreme of the wick',
      'Take Profit: next major S&R level (minimum 2:1 R:R required)',
      'Mid-range pin bars without context = low probability, skip them',
    ],
    backtest:'Highly effective when context is clear. Same pattern mid-range = ~40% win rate. At strong S&R with confluence: 60-67% win rate.'
  },
  {
    id:'scalping-5min', name:'5-Minute Scalping', style:'Scalping', tf:'M5/M1',
    pairs:'EUR/USD, USD/JPY', winrate:'60%', rr:'1:1.5', difficulty:5, emoji:'⚡', color:'var(--red)',
    desc:'Quick in-and-out micro trades during peak London/NY hours. High intensity. Not for beginners.',
    rules:[
      'ONLY trade during London/NY overlap: 13:00-17:00 UTC',
      'Use M15 chart to determine trend direction — only trade in that direction',
      'On M5: enter on pullback to 9 EMA that shows rejection confirmation',
      'Stop Loss: maximum 5-8 pips on EUR/USD',
      'Take Profit: 8-12 pips target (1.5:1 R:R minimum)',
      'Maximum 5 trades per session — quality over quantity',
      'STOP trading after 2 consecutive losses for the session, no exceptions',
      'Requires ECN broker with raw spreads. Regular broker spreads make scalping unprofitable.',
    ],
    backtest:'Requires raw spread ECN broker. Commission-heavy. Not viable with >1.5 pip spread. Strict session discipline is essential.'
  },
  {
    id:'carry-trade', name:'Carry Trade', style:'Position', tf:'W1/D1',
    pairs:'AUD/JPY, NZD/JPY, USD/TRY', winrate:'65%', rr:'1:5+', difficulty:3, emoji:'💰', color:'var(--green)',
    desc:'Profit from interest rate differentials by holding high-rate vs low-rate currency positions for weeks or months.',
    rules:[
      'Identify pairs with significant interest rate differential (check broker swap rates)',
      'Buy the high-interest-rate currency, sell the low-interest currency',
      'Confirm D1 uptrend in the direction of the carry (technical alignment)',
      'Check broker swap rates before entering — they vary significantly',
      'Wide stop loss: 100-200 pips (noise filter for long-term hold)',
      'Hold position for weeks to months to accumulate positive swap',
      'Exit immediately if central bank changes rate outlook',
      'Reduce to 25% position size during high-uncertainty risk-off periods',
    ],
    backtest:'AUD/JPY historically strongest carry pair. Devastating in 2008 crisis and 2020 COVID (-40% in days). Always size conservatively.'
  },
];

/* === js/state.js === */
/* ═══════════════════════════════════════
   TRADEBABY PRO v10 — EXPANDED DATA
   More flashcards, more patterns, more content
   ═══════════════════════════════════════ */

// ── ADDITIONAL FLASHCARDS (v10) ──
if (typeof FLASHCARDS !== 'undefined') {
  FLASHCARDS.push(
    {q:"What is the Williams %R indicator?", a:"Oscillator by Larry Williams. Range -100 to 0. Above -20 = overbought. Below -80 = oversold. Similar to Stochastic but inverted. Best used with trend confirmation."},
    {q:"What is the CCI (Commodity Channel Index)?", a:"Measures price deviation from its average. Above +100 = overbought (strong trend). Below -100 = oversold. Zero line = trend filter. Works in trending AND ranging markets."},
    {q:"What is the Parabolic SAR?", a:"'Stop and Reverse' indicator. Dots below price = uptrend (hold longs). Dots above price = downtrend (hold shorts). When price crosses the dots, flip direction. Best in trending, not ranging markets."},
    {q:"What is Ichimoku Cloud?", a:"5-component Japanese indicator showing trend, support, resistance, and momentum simultaneously. Kumo (cloud) = S&R zone. Price above cloud = bullish. Below cloud = bearish. Crossing cloud = signal."},
    {q:"What is the Elder Ray Index?", a:"Alexander Elder's indicator combining MA trend with Bull Power (high - EMA) and Bear Power (low - EMA). Trade long when EMA rising + bear power negative but rising. Sell when EMA falling + bull power positive but falling."},
    {q:"What is the Awesome Oscillator?", a:"Bill Williams' momentum indicator. 5-period SMA minus 34-period SMA on midpoints. Green bars = momentum increasing. Red bars = decreasing. Twin Peaks, Saucer, Zero Line Cross are main signals."},
    {q:"What is a Spinning Top candle?", a:"Small body with wicks on both sides, roughly equal in length. Like a Doji but with a slightly larger body. Indicates indecision and balance between buyers and sellers. Context determines significance."},
    {q:"What is the Three Inside Up pattern?", a:"3-candle bullish reversal: large bearish candle → small bull candle inside first → third bull closes above first. A confirmed Harami. Win rate ~65% at major support. More reliable than single Doji."},
    {q:"What is the Abandoned Baby pattern?", a:"3-candle pattern. Bearish: bull candle, Doji with gap (doesn't overlap), bearish candle. Bullish: bear candle, Doji gap, bull candle. Gaps make it rare but highly reliable (70%+ win rate)."},
    {q:"What is a Kicker candle?", a:"Two-candle pattern. First candle goes one way. Second opens (with gap) and goes the opposite direction entirely. Strongest reversal signal in candlestick analysis. Institutional repositioning. Rare but very powerful."},
    {q:"What is the COT Report?", a:"Commitment of Traders — weekly CFTC report showing how large speculators (hedge funds), commercial hedgers, and small speculators are positioned in futures markets. Released every Friday for previous Tuesday's data. Key institutional positioning tool."},
    {q:"What is a currency intervention?", a:"When a central bank directly buys or sells its own currency to affect its exchange rate. Examples: Bank of Japan selling USD in 2022 to support JPY, Swiss National Bank in 2011-2015. Creates extreme volatility."},
    {q:"What is the carry trade unwind?", a:"When carry trades (borrowing low-rate currency, buying high-rate) reverse suddenly. Causes dramatic moves in AUD/JPY, NZD/JPY as everyone exits simultaneously. Most common during risk-off events and crises."},
    {q:"What is market depth / DOM?", a:"Depth of Market shows all pending buy and sell orders at each price level. Large order walls create support/resistance. Spoofing = fake large orders placed and quickly cancelled. Used by HFT firms."},
    {q:"What is slippage model in backtesting?", a:"How far price moves against you when filling an order. Critical for scalpers. A strategy profitable with 0 slippage might lose money with 1-2 pip slippage. Always backtest with realistic slippage assumptions."},
    {q:"What is a limit order vs stop order?", a:"LIMIT order: executes at your price OR BETTER. No guarantees it fills. STOP order: triggers when price reaches level, then executes at MARKET (not guaranteed at exact price — can slip). Stop-limit combines both."},
    {q:"What are equal highs/lows in SMC?", a:"When price makes two or more touches at the same high or low level. In Smart Money Concepts, equal highs/lows = LIQUIDITY POOLS where stops cluster. Institutions hunt these levels before reversing."},
    {q:"What is a displacement in SMC?", a:"A large, fast candle that breaks structure and creates a Fair Value Gap. Shows institutional order flow entering the market decisively. The FVG left by the displacement is a high-probability reentry zone."},
    {q:"What is the Silver Bullet strategy?", a:"ICT concept: trade the NY Open 3:00-4:00 AM window (ICT time), London 10:00-11:00 AM, or NY 2:00-3:00 PM. Look for a FVG forming during the hourly period, trade into the FVG fill. Simple, rules-based SMC entry."},
    {q:"What is fractals in trading?", a:"Bill Williams concept. A fractal high = candle with highest high with two lower highs on each side. Fractal low = lowest low with two higher lows on each side. Mark fractal highs/lows as key S&R levels."}
  );
}

// ── ADDITIONAL STRATEGY: OPTIONS ON FOREX ──
if (typeof STRATEGIES !== 'undefined') {
  STRATEGIES.push({
    id:'news-strangle', name:'News Strangle (Options Approach)', style:'Event', tf:'D1/H4',
    pairs:'EUR/USD, GBP/USD on NFP/FOMC days', winrate:'55%', rr:'1:3', difficulty:4, emoji:'📰', color:'var(--orange)',
    desc:'Place a buy stop above AND sell stop below current price before major news. Cancel losing side immediately after news drops.',
    rules:[
      'Use only on NFP (first Friday/month), FOMC, or major CPI releases',
      '30 minutes before news: mark current price as center',
      'Place BUY STOP 15-20 pips above center price',
      'Place SELL STOP 15-20 pips below center price',
      'SL on each side: 25-30 pips from entry',
      'TP: 60-80 pips from entry (1:3 R:R minimum)',
      'Cancel the losing side within 60 seconds of news release',
      'NEVER trade this if spread is above 3 pips — news widening kills profits',
    ],
    backtest:'Works best on true surprise data (actual vs forecast divergence >50% miss). Both sides sometimes hit — limit total risk to 1% across both positions.'
  },{
    id:'week-open-gap', name:'Weekly Gap Fill Strategy', style:'Swing', tf:'H4/D1',
    pairs:'All major pairs', winrate:'67%', rr:'1:2', difficulty:2, emoji:'📊', color:'var(--cyan)',
    desc:'Forex markets close Friday NY session and reopen Sunday. Gaps between close and open tend to fill during the week.',
    rules:[
      'Monday morning: compare Friday close to Sunday open',
      'If gap is more than 20 pips, it is tradeable',
      'Trade in direction TO FILL the gap',
      'Entry: Monday London open (08:00 UTC)',
      'Stop Loss: beyond the open price (above gap if selling down, below gap if buying up)',
      'Take Profit: at the Friday close price (gap filled)',
      'Avoid: gaps caused by major news events — may not fill',
      'Best pairs: EUR/USD and GBP/USD (most liquid, fills most reliably)',
    ],
    backtest:'Historical gap fill rate on major pairs: 65-70% of gaps fill within the same week. Gaps larger than 80 pips are less likely to fill quickly. Use D1 trend as confirmation.'
  });
}

// ── EXTENDED PAIR PROFILES ──
// (Additional data for pairs already in PAIR_PROFILES)
const PAIR_ADDITIONAL_DATA = {
  'EUR/USD': {
    keyLevels: [1.0500, 1.0800, 1.1000, 1.1200, 1.1500],
    typicalSpread: '0.5-1.5 pips',
    bestSessions: 'London + NY Overlap (13:00-17:00 UTC)',
    avoidTimes: 'Asian session (00:00-07:00 UTC)',
    correlations: {positive:['GBP/USD (+0.85)','AUD/USD (+0.65)'], negative:['USD/CHF (-0.90)','USD/JPY (-0.60)']},
    fundamentalDrivers: ['ECB interest rate decisions','US CPI and NFP','EU GDP vs US GDP differential','Risk sentiment (safe haven USD buying)'],
    tradingTips: 'The world\'s most traded pair. Tightest spreads. Best for beginners. Most predictable at key levels due to massive institutional participation.',
  },
  'GBP/USD': {
    keyLevels: [1.2000, 1.2400, 1.2800, 1.3000, 1.3200],
    typicalSpread: '0.8-2.5 pips',
    bestSessions: 'London open (08:00-10:00 UTC)',
    avoidTimes: 'Asian session, Friday PM',
    correlations: {positive:['EUR/USD (+0.85)'], negative:['USD/CHF (-0.78)']},
    fundamentalDrivers: ['Bank of England meetings','UK CPI and GDP','Brexit aftermath policy','UK vs US rate differentials'],
    tradingTips: '"Cable" is volatile and emotional. Wider ranges than EUR/USD. Less predictable at key levels. Higher reward but higher risk. Study the BOE closely.',
  },
};

/* ═══════════════════════════════════════════════════════════════
   TRADEBABY PRO v10 — MASSIVE DATA EXPANSION
   Extra flashcards, pattern quiz entries, strategies, market data
   ═══════════════════════════════════════════════════════════════ */

// ── EXTENDED FLASHCARDS (push 50 more onto existing array) ──
if (typeof FLASHCARDS !== 'undefined') {
  const extraFlashcards = [
    // ADVANCED TECHNICAL
    {q:"What is the Keltner Channel?", a:"Three lines: EMA20 (middle), EMA20 ± 2×ATR (upper/lower). Similar to Bollinger Bands but uses ATR instead of standard deviation. BB outside Keltner = squeeze breakout forming. More reliable than BB squeeze alone."},
    {q:"What is the VWAP indicator?", a:"Volume Weighted Average Price — average price weighted by volume. Major institutions use it as benchmark for day trading. Price above VWAP = bullish intraday bias. Price below = bearish. Resets at market open each day."},
    {q:"What is the Detrended Price Oscillator (DPO)?", a:"Removes trend from price to identify cycles. Shows how price compares to a past moving average. Used to measure cycle length and identify overbought/oversold within cycles. Best for identifying price cycles not trend direction."},
    {q:"What is Volume Profile?", a:"Horizontal histogram showing trading volume at each price level. High Volume Node (HVN) = strong S&R. Low Volume Node (LVN) = price passes through quickly. Point of Control (POC) = highest volume level = strongest magnet."},
    {q:"What is the Chaikin Money Flow?", a:"Measures buying and selling pressure by combining price and volume. Above zero = buying pressure (accumulation). Below zero = selling pressure (distribution). Best used as confirmation of breakouts — CMF rising as price breaks resistance = valid breakout."},
    {q:"What is the Force Index?", a:"Alexander Elder's indicator. Combines price change direction, magnitude, and volume. Three-day EMA = short-term signals. 13-day EMA = longer-term trend. Positive = bulls in control. Negative = bears in control."},
    {q:"What is the Aroon Indicator?", a:"Measures time since last high (Aroon Up) and last low (Aroon Down) over N periods. Aroon Up above 70 = strong uptrend. Aroon Down above 70 = strong downtrend. Both near 50 = consolidation. Crossovers signal trend changes."},
    {q:"What is the Mass Index?", a:"Signals reversals by tracking trading range widening. When Mass Index rises above 27 then drops below 26.5 (reversal bulge), expect trend reversal. Useful for identifying exhaustion tops and bottoms."},
    {q:"What is the Commodity Channel Index (CCI) divergence?", a:"When CCI makes a new extreme but price does not (or vice versa), divergence signals a potential reversal. CCI divergence on D1 or H4 at key S&R levels is one of the most reliable signals in the entire toolkit of technical analysis."},
    {q:"What is the Klinger Oscillator?", a:"Combines short-term price fluctuations with long-term money flow. Signal line = 13-EMA of KO. Crossovers signal buy/sell. Divergence with price is the most reliable use. Best suited for D1 and weekly timeframes."},
    // MARKET STRUCTURE & SMC
    {q:"What is a breaker block in SMC?", a:"A failed Order Block — an OB that price broke through decisively. After breaking through, the breaker block flips polarity. Former bullish OB becomes bearish resistance. Former bearish OB becomes bullish support. High probability setups."},
    {q:"What is mitigation in SMC?", a:"When price returns to an Order Block or breaker block to 'mitigate' (fill) remaining orders. After mitigation, the block loses its power. Waiting for price to mitigate an OB before trading the next move reduces false signals."},
    {q:"What is inducement in SMC?", a:"Smart money deliberately moves price to induce retail traders into positions, then reverses against them. Often manifests as a small liquidity sweep that appears to break structure, tempting breakout traders, before the real move in the opposite direction."},
    {q:"What are premium and discount arrays?", a:"In SMC, price above 50% of a swing range = premium (expensive for buying, good for selling). Below 50% = discount (cheap for buying, expensive for selling). Buy in discounts, sell in premiums — this alone dramatically improves entry timing."},
    {q:"What is a market maker model?", a:"ICT concept: market makers first accumulate positions by pushing price to take liquidity (stop hunts), then distribute by creating the actual trend move. Recognizing accumulation vs distribution phases helps anticipate the real directional move."},
    {q:"What is a turtle soup pattern?", a:"Trading against false breakouts. When price breaks a 20-day high or low and immediately fails, enter in the opposite direction. The original Turtle Traders' setup exploited this reversal. Works because most breakout traders get trapped."},
    // FUNDAMENTAL & MACRO
    {q:"What is purchasing power parity (PPP)?", a:"Theory that exchange rates should adjust so identical goods cost the same in any country. Countries whose currencies are undervalued vs PPP tend to see appreciation over time. The Economist's Big Mac Index is a simplified PPP measure."},
    {q:"What is the Taylor Rule?", a:"Formula predicting central bank interest rates based on inflation and output gaps. If inflation is above target or output is above potential, rates should rise. Traders use it to anticipate central bank moves before official decisions."},
    {q:"What is fiscal policy vs monetary policy?", a:"Monetary policy: Central bank controls interest rates and money supply (ECB, Fed). Affects currency strength directly. Fiscal policy: Government controls taxes and spending. Affects economic growth and inflation indirectly. Both impact forex."},
    {q:"What is the current account deficit?", a:"When a country imports more goods/services than it exports. Creates selling pressure on the currency (must sell domestic currency to buy foreign goods). Persistent deficits = long-term currency weakness. US and UK run large structural deficits."},
    {q:"What is currency devaluation?", a:"When a government/central bank deliberately weakens its currency. Reasons: boost exports (cheaper for foreigners), reduce debt burden, stimulate economy. Often done through rate cuts or direct market intervention. Creates trading opportunities."},
    {q:"What are currency wars?", a:"When multiple countries competitively devalue their currencies to gain export advantages. Common during global recessions. Creates volatile, trend-reversing forex markets. 2010-2015 period saw significant currency war dynamics globally."},
    {q:"What is the J-curve effect?", a:"After devaluation, trade balance initially worsens before improving. The 'J' shape: trade deficit widens short-term (existing import contracts priced in foreign currency), then improves as exports become competitive. Takes 12-18 months."},
    {q:"What is hot money?", a:"Short-term speculative capital flowing between countries to capture interest rate differentials or anticipated currency moves. Causes rapid appreciation/depreciation. Highly destabilizing. When hot money exits, currencies can crash 10-20% in days."},
    // RISK & MONEY MANAGEMENT
    {q:"What is the Kelly Criterion?", a:"Formula for optimal position sizing: f* = (bp - q) / b where b = odds, p = win probability, q = loss probability. Full Kelly is too aggressive for trading — professional traders use Quarter-Kelly (25% of Kelly size) to reduce drawdowns."},
    {q:"What is value at risk (VaR)?", a:"Statistical measure of maximum expected loss over a time period at a given confidence level. Example: 1-day 95% VaR of $1,000 means 95% chance of not losing more than $1,000 in one day. Used by institutional risk managers."},
    {q:"What is maximum adverse excursion (MAE)?", a:"The largest loss a trade reaches before closing (whether it ultimately wins or loses). Analyzing MAE helps optimize stop placement. If winning trades rarely exceed 20 pips adverse, stops at 25 pips capture most winners without widening unnecessarily."},
    {q:"What is maximum favorable excursion (MFE)?", a:"The largest profit a trade reaches before closing. Comparing MFE to actual closed profit reveals if you're exiting too early. If trades regularly reach 60 pips MFE before you close at 30, you're leaving significant profits on the table."},
    {q:"What is heat in trading?", a:"The open risk across all current positions — how much you stand to lose if all trades hit their stop losses simultaneously. Professional traders manage total portfolio heat (e.g., max 5% heat across all open trades) not just per-trade risk."},
    {q:"What is the Safe-F position sizing?", a:"System that adjusts position size based on current drawdown. When in a drawdown, reduce size. When at equity highs, maintain or slightly increase size. Ensures you risk less when your system is underperforming and more when it's outperforming."},
    // EXECUTION & OPERATIONS
    {q:"What is a dealing desk vs no dealing desk?", a:"Dealing desk (Market Maker): broker takes opposite side of your trade. No dealing desk (STP/ECN): orders route directly to liquidity providers. NDD is transparent and removes conflict of interest. Preferred by professional traders."},
    {q:"What is requoting?", a:"When a broker rejects your market order price and offers a different (worse) price. Common with dealing desk brokers during volatile markets. ECN/STP brokers rarely requote. Frequent requotes = sign of poor broker execution."},
    {q:"What is latency in trading?", a:"Time delay between placing an order and its execution. Matters enormously for scalpers (microseconds) but irrelevant for swing traders. HFT firms spend millions on low-latency infrastructure. Retail traders should use brokers with servers near major liquidity centres."},
    {q:"What is a partial fill?", a:"When only part of your order executes at the requested price. Example: Buy 10 lots at 1.0850 but only 7 lots fill. Happens when insufficient liquidity at that price. Common in exotic pairs or during low-liquidity periods."},
    {q:"What is a dark pool?", a:"Private trading venue where large institutions trade away from public markets to minimise market impact of large orders. Dark pool activity can explain sudden price movements that appear 'unexplained' on retail charts. Not accessible to retail traders."},
    // TRADING STRATEGIES ADVANCED
    {q:"What is mean reversion trading?", a:"Trading the assumption that prices revert to their average over time. After extreme moves, fade (trade against) the direction. Tools: Bollinger Bands, RSI extremes, price distance from MA200. Works best in ranging markets, fails in strong trends."},
    {q:"What is momentum trading?", a:"Trading in the direction of a strong price move, assuming it will continue. Entry on first pullback after breakout. Tools: MACD, RSI above 50, ADX above 25. Works best in trending markets, fails in ranging conditions."},
    {q:"What is statistical arbitrage?", a:"Exploiting temporary price differences between correlated instruments. Example: EUR/USD and GBP/USD historically move together. When they diverge significantly, bet on reversion. Requires sophisticated programming for retail traders."},
    {q:"What is pairs trading?", a:"Going long on an underperforming asset and short on an outperforming related asset, expecting the spread to converge. Example: Long EUR/GBP when it's cheap vs its historical range, short when expensive. Market-neutral strategy."},
    {q:"What is grid trading?", a:"Placing buy and sell orders at regular price intervals above and below current price. Profits from sideways market oscillations. Risk: in a strong trend, one side accumulates massive losing positions. Requires careful position sizing and stop management."},
    {q:"What is algorithmic trading?", a:"Using computer programs to automatically execute trades based on predefined rules. Removes emotional decision-making. Types: trend following, mean reversion, HFT, arbitrage. Most profitable hedge funds rely heavily on quantitative/algorithmic strategies."},
    // TRADING PSYCHOLOGY ADVANCED
    {q:"What is trading in the zone?", a:"Mark Douglas's concept: a mental state where you execute trades mechanically without emotional interference, accepting all outcomes as part of a statistical distribution. Achieved through believing in your edge, accepting risk, and thinking in probabilities."},
    {q:"What is process-oriented trading?", a:"Judging each trade on whether you followed your rules — not on whether it won or lost. A perfectly executed losing trade is a success. A rule-breaking winning trade is a failure. This mindset eliminates emotional decision-making over time."},
    {q:"What is deliberate practice in trading?", a:"Practicing with focused intention to improve specific weaknesses, not just logging trades. Examples: review 100 historical setups to improve entry timing; practice stop placement on past charts; roleplay handling losing streaks mentally."},
    {q:"What is overtrading?", a:"Taking more trades than your edge justifies — usually driven by boredom, FOMO, or trying to recover losses. Overtrading degrades your edge: transaction costs increase, emotional decision-making increases, win rate drops. Discipline means NOT trading."},
    {q:"What is the disposition effect?", a:"Psychological tendency to sell winners too early (lock in gains) and hold losers too long (avoid realizing losses). The mathematically optimal strategy is the opposite: let winners run, cut losses quickly. One of the most damaging trading biases."},
    {q:"What is peak-end rule in trading?", a:"Kahneman's finding: people judge experiences by their peak and end, not the average. In trading: one big win or loss colors your entire perception of your system. Overcome this by tracking statistical averages across many trades, not reacting to individual results."},
    // PRACTICAL OPERATIONS
    {q:"What is a trading plan?", a:"Written document defining: instruments traded, timeframes, entry/exit rules (specific, not vague), risk per trade, daily/monthly loss limits, drawdown response protocol, trading hours. Without a plan you are gambling. With one, you run a business."},
    {q:"What is a trading edge?", a:"A statistical advantage that gives you positive expectancy over many trades. An edge can come from: better timing, better risk management, exploiting behavioral biases, information, execution speed. Every profitable trader has identified their specific edge."},
    {q:"What is curve fitting (overfitting)?", a:"Optimizing a strategy to fit historical data so perfectly that it has no predictive power on future data. Recognizable by: too many parameters, huge backtest profits, poor live performance. Use out-of-sample testing to avoid this trap."},
    {q:"What is walk-forward testing?", a:"More rigorous backtesting method. Optimize strategy on Period 1 (in-sample), test on Period 2 (out-of-sample), advance the window, repeat. Simulates real trading conditions. A strategy that passes walk-forward testing has genuine predictive value."},
  ];
  FLASHCARDS.push(...extraFlashcards);
}

// ── EXTENDED PATTERN QUIZ ──
if (typeof PATTERN_QUIZ !== 'undefined') {
  const extraPatterns = [
    {
      name:'Bearish Pin Bar', type:'Bearish Reversal', winrate:'61-66%', timeframe:'H4/D1',
      hint:'Long upper wick with small body at the bottom — sellers strongly rejected higher prices',
      meaning:'Strong bearish rejection at resistance — potential reversal down',
      rules:'Enter at 50% retracement of wick. SL above wick extreme. Best at Fibonacci + resistance confluence.',
      candles:[{o:0.59,h:0.74,l:0.58,c:0.60,bull:false}]
    },
    {
      name:'Piercing Line', type:'Bullish Reversal', winrate:'58-63%', timeframe:'H4/D1',
      hint:'A bullish candle that opens below the previous bearish low and closes above its midpoint',
      meaning:'Buyers absorbing selling and pushing back strongly — partial engulfing',
      rules:'At downtrend lows. Green candle must close past 50% of bearish candle. Needs confirmation.',
      candles:[
        {o:0.48,h:0.45,l:0.66,c:0.64,bull:false},
        {o:0.68,h:0.63,l:0.52,c:0.54,bull:true}
      ]
    },
    {
      name:'Dark Cloud Cover', type:'Bearish Reversal', winrate:'56-61%', timeframe:'H4/D1',
      hint:'A bearish candle that opens above previous bullish high and closes below its midpoint',
      meaning:'Sellers overwhelming buyers at resistance — mirror of Piercing Line',
      rules:'At uptrend highs. Red candle must close below 50% of bullish candle.',
      candles:[
        {o:0.60,h:0.63,l:0.42,c:0.44,bull:true},
        {o:0.40,h:0.42,l:0.57,c:0.55,bull:false}
      ]
    },
    {
      name:'Three Inside Up', type:'Bullish Reversal', winrate:'65-70%', timeframe:'D1',
      hint:'A Harami pattern followed by confirmation: large red, small green inside, large green',
      meaning:'A confirmed bullish Harami — three-candle bottom reversal',
      rules:'Third candle must close above first candle. Best at major support after downtrend.',
      candles:[
        {o:0.62,h:0.60,l:0.74,c:0.72,bull:false},
        {o:0.70,h:0.68,l:0.75,c:0.63,bull:true},
        {o:0.64,h:0.61,l:0.56,c:0.58,bull:true}
      ]
    },
    {
      name:'Abandoned Baby', type:'Strong Reversal', winrate:'70-75%', timeframe:'D1',
      hint:'A Doji gaps away from the previous candle and the next candle gaps back — very rare',
      meaning:'Complete exhaustion of the prior trend — strongest reversal signal when it appears',
      rules:'Gaps must be genuine (common in stocks, rare in forex). Treat as very high probability at extremes.',
      candles:[
        {o:0.64,h:0.62,l:0.72,c:0.70,bull:false},
        {o:0.76,h:0.74,l:0.78,c:0.76,bull:true},
        {o:0.66,h:0.64,l:0.57,c:0.59,bull:true}
      ]
    },
    {
      name:'Hikkake Pattern', type:'Trend Continuation', winrate:'60-65%', timeframe:'H4/D1',
      hint:'A failed Inside Bar breakout that traps traders, then continues the original trend',
      meaning:'False breakout that traps inside bar breakout traders before reversing sharply',
      rules:'Wait for price to break the Inside Bar, fail, then re-enter the Inside Bar range. Trade in the original direction.',
      candles:[
        {o:0.60,h:0.65,l:0.55,c:0.64,bull:true},
        {o:0.63,h:0.64,l:0.57,c:0.58,bull:false},
        {o:0.58,h:0.66,l:0.57,c:0.59,bull:true},
        {o:0.59,h:0.61,l:0.53,c:0.54,bull:false},
        {o:0.54,h:0.55,l:0.47,c:0.48,bull:false}
      ]
    },
    {
      name:'Outside Bar', type:'Continuation/Reversal', winrate:'55-62%', timeframe:'H4/D1',
      hint:'A candle whose high AND low are outside the previous candle — expands in both directions',
      meaning:'High volatility and indecision — direction determined by close relative to previous candle',
      rules:'Bullish outside bar (closes above prev high) = buy. Bearish (closes below prev low) = sell.',
      candles:[
        {o:0.58,h:0.61,l:0.57,c:0.59,bull:true},
        {o:0.60,h:0.64,l:0.54,c:0.62,bull:true}
      ]
    },
    {
      name:'Long Lower Shadow', type:'Bullish Signal', winrate:'58-63%', timeframe:'All TFs',
      hint:'Any candle with a very long lower shadow — shows buyers aggressively rejected lower prices',
      meaning:'Strong buying interest emerged below — support confirmed at the wick low',
      rules:'Shadow must be at least 3x the body. Context matters: at support = high probability.',
      candles:[{o:0.62,h:0.63,l:0.44,c:0.61,bull:true}]
    },
    {
      name:'Three Line Strike', type:'Continuation', winrate:'65-70%', timeframe:'D1',
      hint:'Three consecutive same-colored candles followed by a large opposite candle that engulfs all three',
      meaning:'A large counter-move that appears to reverse the trend but actually continues it',
      rules:'Four-candle pattern. The large fourth candle is a buying opportunity for continuation.',
      candles:[
        {o:0.50,h:0.48,l:0.54,c:0.53,bull:false},
        {o:0.53,h:0.51,l:0.57,c:0.56,bull:false},
        {o:0.56,h:0.54,l:0.60,c:0.59,bull:false},
        {o:0.59,h:0.47,l:0.61,c:0.48,bull:true}
      ]
    },
    {
      name:'Mat Hold', type:'Bullish Continuation', winrate:'62-67%', timeframe:'D1',
      hint:'A large bullish candle followed by 2-3 small bearish candles, then a new bull candle resumes',
      meaning:'Brief consolidation within a strong uptrend — continuation pattern',
      rules:'Small bearish candles must stay within upper half of first bull candle. Final bull candle makes new high.',
      candles:[
        {o:0.48,h:0.46,l:0.58,c:0.57,bull:true},
        {o:0.57,h:0.56,l:0.59,c:0.58,bull:false},
        {o:0.58,h:0.57,l:0.60,c:0.59,bull:false},
        {o:0.59,h:0.58,l:0.65,c:0.64,bull:true}
      ]
    },
    {
      name:'Ladder Bottom', type:'Bullish Reversal', winrate:'60-65%', timeframe:'D1',
      hint:'Three bearish candles with descending opens, a Shooting Star, then a bullish engulfing',
      meaning:'Exhaustion of selling pressure at the bottom of a downtrend',
      rules:'Rare but reliable when pattern completes in full. Requires all five candles.',
      candles:[
        {o:0.65,h:0.64,l:0.70,c:0.69,bull:false},
        {o:0.68,h:0.67,l:0.74,c:0.73,bull:false},
        {o:0.73,h:0.71,l:0.78,c:0.77,bull:false},
        {o:0.77,h:0.70,l:0.78,c:0.76,bull:false},
        {o:0.76,h:0.71,l:0.65,c:0.66,bull:true}
      ]
    },
    {
      name:'Concealing Baby Swallow', type:'Bullish Reversal', winrate:'63-68%', timeframe:'D1',
      hint:'Two Marubozus followed by a candle that opens below and creates a long upper shadow',
      meaning:'The bearish power is beginning to exhaust — reversal signal',
      rules:'Appears after sustained downtrend. Fourth candle engulfs shadows of both third candle and one prior.',
      candles:[
        {o:0.68,h:0.68,l:0.72,c:0.72,bull:false},
        {o:0.72,h:0.72,l:0.76,c:0.76,bull:false},
        {o:0.76,h:0.71,l:0.79,c:0.78,bull:false},
        {o:0.79,h:0.70,l:0.80,c:0.71,bull:true}
      ]
    },
  ];
  PATTERN_QUIZ.push(...extraPatterns);
}

// ── MORE STRATEGIES ──
if (typeof STRATEGIES !== 'undefined') {
  const extraStrategies = [
    {
      id:'ma-crossover', name:'Golden Cross / Death Cross', style:'Swing/Position', tf:'D1/W1',
      pairs:'All Pairs, Indices, Gold', winrate:'55%', rr:'1:5+', difficulty:2, emoji:'✖️', color:'var(--gold)',
      desc:'Trade the major trend change signalled when the 50 MA crosses the 200 MA. Low frequency, very high conviction.',
      rules:[
        'Golden Cross: 50 SMA crosses ABOVE 200 SMA on D1 → long-term buy signal',
        'Death Cross: 50 SMA crosses BELOW 200 SMA on D1 → long-term sell signal',
        'Entry: Wait for the cross, then wait for first pullback to 50 MA as entry',
        'Confirmation: Price should already be above 200 MA when 50 crosses up through it',
        'Stop Loss: Below 200 MA (invalidation of the entire signal)',
        'Take Profit: Target next major resistance, or trail stop using 50 MA',
        'Filter: ADX above 20 confirms sufficient trend strength',
        'Patience: This setup appears only 3-6 times per year on any given pair',
      ],
      backtest:'Historical Golden Cross on EUR/USD: ~55% of crosses lead to sustained trends. False signals common in sideways markets. Best on indices (SPX500, NAS100) and Gold. Hold for weeks to months.'
    },
    {
      id:'session-open', name:'Session Open Breakout', style:'Day Trade', tf:'H1/M15',
      pairs:'EUR/USD, GBP/USD, USD/JPY', winrate:'54%', rr:'1:2.5', difficulty:2, emoji:'🌅', color:'var(--cyan)',
      desc:'Trade the directional move at New York open (13:00 UTC) — the second most powerful session transition of the day.',
      rules:[
        'At 13:00 UTC (NY open), note the high and low of the last completed H1 candle',
        'Place Buy Stop 3 pips above the H1 high, Sell Stop 3 pips below the H1 low',
        'Once triggered, cancel the opposite order',
        'Stop Loss: 15 pips beyond your entry order level',
        'Take Profit: 37 pips (2.5:1 R:R)',
        'Only trade Monday to Thursday — avoid Friday NY open',
        'Cancel pending orders if not triggered within 90 minutes',
        'Skip days with FOMC, NFP, or CPI releases before 15:00 UTC',
      ],
      backtest:'Best performance when US economic data is released at 13:30 UTC creating a clear directional bias. Avoid completely on major news days. Consistent edge when conditions are right.'
    },
    {
      id:'asian-range', name:'Asian Range Fade', style:'Day Trade', tf:'H1/M30',
      pairs:'EUR/USD, GBP/USD, USD/JPY', winrate:'56%', rr:'1:2', difficulty:2, emoji:'🌙', color:'var(--blue)',
      desc:'Fade the extremes of the Asian session range. Price often consolidates in Asia then reverts to range midpoint before London continuation.',
      rules:[
        'Mark Asian session high and low: 00:00-07:00 UTC',
        'At 07:30-08:00 UTC, if price has reached the extreme of Asian range, look to fade it',
        'Buy at Asian low if price is there with bullish rejection candle',
        'Sell at Asian high if price is there with bearish rejection candle',
        'Stop: 10 pips beyond the extreme',
        'Target 1: Asian range midpoint (50% of range) — move stop to break-even',
        'Target 2: The opposite extreme of the Asian range',
        'Only trade if Asian range is between 20 and 60 pips — avoid if too wide or narrow',
      ],
      backtest:'Works because Asian session creates natural ranges with little directional bias. London frequently revisits these levels. Win rate improves significantly when combined with D1 S&R confluence.'
    },
    {
      id:'fibonacci-retracement', name:'Fibonacci Pullback Entry', style:'Swing', tf:'H4/D1',
      pairs:'All Major Pairs + Gold', winrate:'57%', rr:'1:3', difficulty:3, emoji:'🌀', color:'var(--purple)',
      desc:'Enter at the 61.8% Fibonacci retracement of the prior impulse move in a confirmed trend.',
      rules:[
        'Identify a completed impulse move on H4 or D1 (minimum 80 pips for H4, 150 pips D1)',
        'Draw Fibonacci from swing low to swing high (uptrend) or high to low (downtrend)',
        'Wait for price to retrace to the 61.8% level (golden pocket zone)',
        'At 61.8%: look for a bullish/bearish pin bar, engulfing candle, or doji confirmation',
        'Enter on close of confirmation candle',
        'Stop Loss: 15-20 pips below/above the 78.6% level',
        'Take Profit: At the prior swing extreme (100% extension) or 161.8% extension',
        'Additional confluence: H4 61.8% aligning with D1 horizontal S&R = highest priority setup',
      ],
      backtest:'At 61.8% in D1 uptrend with bullish pin bar confirmation: historical win rate 58-65%. The more confluences (Fib + S&R + MA + session), the higher the probability.'
    },
    {
      id:'price-action-50', name:'50% Inside Bar Retracement', style:'Swing', tf:'D1/H4',
      pairs:'All Major Pairs', winrate:'59%', rr:'1:2', difficulty:2, emoji:'🎯', color:'var(--green)',
      desc:'Enter on a pullback to the 50% midpoint of a large directional candle or the first retracement after a strong move.',
      rules:[
        'Identify a large directional candle (at least 1.5× ATR) on H4 or D1',
        'After the candle closes, wait for price to pull back to its 50% midpoint',
        'At 50%: enter in the direction of the large candle',
        'This entry level often coincides with VWAP and Round Number levels — add extra weight',
        'Stop Loss: Beyond the extreme of the entry candle (full candle risk)',
        'Reduce lot size by 50% to compensate for the wider stop',
        'Take Profit: The high or low of the entry candle (1:2 R:R)',
        'If price fails to reach 50% and makes a new extreme: skip this setup',
      ],
      backtest:'The 50% rule exploits the tendency of impulsive moves to retrace exactly half before continuing. Mechanical, objective, and high probability when the original move has genuine momentum behind it.'
    },
    {
      id:'multi-timeframe-confluence', name:'Multi-Timeframe Confluence Entry', style:'Swing/Day', tf:'H4/H1',
      pairs:'EUR/USD, GBP/USD, USD/JPY', winrate:'62%', rr:'1:2.5', difficulty:4, emoji:'🔭', color:'var(--orange)',
      desc:'The highest probability framework: only enter when D1, H4, and H1 all agree on direction simultaneously.',
      rules:[
        'Step 1 (D1): Determine overall trend direction — is price making HH/HL or LL/LH?',
        'Step 2 (H4): Is there a clear setup forming at a key H4 level in the D1 direction?',
        'Step 3 (H1): Wait for entry trigger — a specific candle pattern at the H4 level',
        'All three must align: D1 trend + H4 key level + H1 trigger = ENTER',
        'If ANY timeframe contradicts the others, SKIP the trade',
        'Stop Loss: Below H4 swing low (uptrend) or above H4 swing high (downtrend)',
        'Take Profit: Next major D1 level',
        'This approach reduces trade frequency dramatically but increases win rate significantly',
      ],
      backtest:'The top-down MTF approach has the highest win rate of any systematic approach in retail forex. Fewer trades, higher quality. A trader using this system should expect 1-4 high-quality setups per week on a single pair.'
    },
    {
      id:'divergence-entry', name:'RSI Divergence at S&R', style:'Swing', tf:'H4/D1',
      pairs:'EUR/USD, GBP/JPY, XAU/USD', winrate:'52%', rr:'1:4', difficulty:3, emoji:'📉', color:'var(--red)',
      desc:'Catch high R:R reversals when RSI diverges from price precisely at a key S&R level.',
      rules:[
        'On H4 or D1: Price makes a new HIGH but RSI makes a LOWER high (bearish divergence)',
        'Or: Price makes a new LOW but RSI makes a HIGHER low (bullish divergence)',
        'MANDATORY: Divergence must occur AT a major S&R level — no S&R = no trade',
        'Divergence must span at least 15-20 candles to be significant',
        'Wait for a candlestick reversal signal after the divergence forms',
        'Enter on the CLOSE of the confirmation candle',
        'Stop Loss: Beyond the extreme that created the divergence',
        'Take Profit: Next major S&R level (target 1:4 R:R minimum)',
      ],
      backtest:'Lower win rate compensated by exceptional R:R. The combination of divergence + key level is what makes this reliable. Divergence alone (without S&R) has much lower win rate and should be ignored.'
    },
    {
      id:'wyckoff-accumulation', name:'Wyckoff Accumulation Entry', style:'Position/Swing', tf:'D1/H4',
      pairs:'EUR/USD, Gold, Indices', winrate:'58%', rr:'1:5+', difficulty:5, emoji:'🏗️', color:'var(--cyan)',
      desc:'Identify Wyckoff accumulation phases and enter on the Spring or LPS (Last Point of Support) for high R:R swing trades.',
      rules:[
        'Step 1: Identify a trading range forming after a downtrend',
        'Step 2: Look for a Selling Climax (SC) — massive volume spike + wide spread down candle',
        'Step 3: Automatic Rally (AR) follows SC — bounce from extreme',
        'Step 4: Secondary Test (ST) revisits SC area — ideally with lower volume',
        'Step 5: Spring — price briefly breaks below support (stop hunt) then rallies strongly',
        'Entry: On Spring reversal candle or on the subsequent LPS (higher low after Spring)',
        'Stop Loss: Below the Spring low',
        'Target: Measured move from trading range height projected upward from breakout',
      ],
      backtest:'Wyckoff accumulation setups are rare but powerful. The Spring entry offers exceptional R:R because it occurs at the ultimate low of the base. Requires patience — setups may take weeks to develop fully.'
    },
  ];
  STRATEGIES.push(...extraStrategies);
}

// ── MARKET PSYCHOLOGY DATA — The Psychology Lab ──
const PSYCHOLOGY_LAB = {
  biasDefinitions: {
    confirmationBias: {
      name: 'Confirmation Bias',
      description: 'The tendency to search for, interpret, and remember information that confirms your existing beliefs while ignoring contradicting evidence.',
      tradingManifestation: 'You decide EUR/USD is going up, then only look at bullish signals and ignore the bearish ones. You hold a losing trade because you keep finding reasons why it will reverse.',
      fix: 'Before entering any trade, write down THREE reasons why you could be WRONG. Actively seek disconfirming evidence.',
      severity: 'critical'
    },
    lossAversion: {
      name: 'Loss Aversion',
      description: 'Losses feel approximately 2-2.5x more painful psychologically than equivalent gains feel pleasurable.',
      tradingManifestation: 'Cutting winners too early (afraid to lose the gain) and holding losers too long (avoiding the pain of realizing the loss). The net result is small wins and large losses.',
      fix: 'Set hard rules for exits BEFORE entering. Take Profit and Stop Loss levels set in advance cannot be moved during the trade.',
      severity: 'critical'
    },
    recencyBias: {
      name: 'Recency Bias',
      description: 'Overweighting recent events when making predictions, ignoring the broader statistical base rate.',
      tradingManifestation: 'After 3 wins, you increase position size because "the strategy is working." After 3 losses, you abandon a perfectly valid strategy because it "isn\'t working anymore."',
      fix: 'Track performance over minimum 50-100 trades. Never change strategy based on fewer than 20 data points.',
      severity: 'high'
    },
    gamblersFallacy: {
      name: 'Gambler\'s Fallacy',
      description: 'Believing that past independent events influence future independent events.',
      tradingManifestation: '"I\'ve had 5 losses in a row, so I\'m due for a win" — then oversizing the next trade. Each trade is independent. Past losses do not increase the probability of the next trade winning.',
      fix: 'Remind yourself: each trade has the exact same probability of winning as every other trade. Five losses in a row is normal and expected in any trading system.',
      severity: 'high'
    },
    sunkCostFallacy: {
      name: 'Sunk Cost Fallacy',
      description: 'Continuing an activity because of past investment (time, money, emotion) rather than expected future value.',
      tradingManifestation: '"I\'ve been holding this losing trade for 3 days. I can\'t close it now after holding it this long." The time you\'ve held the trade is completely irrelevant to whether you should hold it going forward.',
      fix: 'Ask only: "If I had no position right now, would I enter this trade at this price level?" If no, close it.',
      severity: 'critical'
    },
    overconfidence: {
      name: 'Overconfidence Bias',
      description: 'Excessive confidence in one\'s own abilities, predictions, and knowledge.',
      tradingManifestation: 'After a good month, increasing position sizes dramatically. Believing you can predict market direction better than you actually can. Taking setups that don\'t meet your own criteria because "I just know."',
      fix: 'Maintain consistent position sizes regardless of recent performance. Track your prediction accuracy honestly with journaling.',
      severity: 'high'
    },
    anchoring: {
      name: 'Anchoring Bias',
      description: 'Over-relying on the first piece of information encountered when making decisions.',
      tradingManifestation: 'You entered EUR/USD at 1.0800. It drops to 1.0750. You\'re anchored to your entry price, so you see 1.0750 as "cheap" and add to a losing position. The market doesn\'t know or care where you entered.',
      fix: 'Ask: "Based on current price action and levels, is this a valid entry?" Forget your entry price entirely.',
      severity: 'medium'
    },
    herding: {
      name: 'Herding (Social Proof)',
      description: 'Following the behavior of a larger group rather than using independent analysis.',
      tradingManifestation: 'Entering EUR/USD because "everyone on Twitter is long" or because your broker shows 80% of clients are buying. Professional traders know: when retail is overwhelmingly positioned one way, smart money is on the other side.',
      fix: 'Make all trade decisions based solely on your own analysis and plan. Social media trading opinions are noise.',
      severity: 'medium'
    }
  },

  stressManagement: [
    { situation: 'After a large loss', recommended: 'Close your trading platform. Go for a 20-minute walk. Return only after your heart rate normalizes. Never trade while the adrenaline of a loss is still in your system.', doNot: 'Immediately re-enter a trade to "get it back." This is the single most common path to account destruction.' },
    { situation: 'During a losing streak', recommended: 'Reduce position size by 50% immediately. Increase your selectivity — only take A+ setups. Spend more time reviewing your journal and less time trading.', doNot: 'Increase size to recover faster. Change your strategy every few days. Conclude that trading doesn\'t work.' },
    { situation: 'Before major news events', recommended: 'Either close all positions 30 minutes before the event, or set wider stops that can withstand the news spike. Know your exit before the news hits.', doNot: 'Hold positions through major news without a plan. Increase size because "I\'m sure about the direction."' },
    { situation: 'After a big win', recommended: 'Bank some of the profit mentally. Keep position sizes consistent. Note what you did well in your journal.', doNot: 'Immediately take a much larger position because "you\'re on a roll." A win streak makes the next loss more psychologically damaging.' },
    { situation: 'When markets are very volatile', recommended: 'Use smaller position sizes. Widen stops proportionally. Sometimes the right move is simply not trading.', doNot: 'Increase position size to take advantage of bigger moves. Tighten stops in volatile conditions.' },
    { situation: 'When you miss a move', recommended: 'Accept that missed trades are part of trading. Wait for the next valid setup. FOMO trades taken late into moves have terrible R:R and high failure rates.', doNot: 'Chase price. Enter a trade just because you don\'t want to miss the move. The next setup is always coming.' },
  ]
};

// ── FAMOUS TRADERS DATABASE — Extended ──
const FAMOUS_TRADERS_EXTENDED = [
  {
    name: 'Ed Seykota',
    era: '1970s-2000s',
    style: 'Trend Following + Computer-Based',
    returns: 'Turned $5,000 into $15,000,000 (250,000% return)',
    keyLesson: 'Trend following with rigid risk management. His core system: trade with the long-term trend, use close-only stops, risk small amounts. Famous quote: "Win or lose, everybody gets what they want out of the market."',
    bestQuote: 'The elements of good trading are: (1) cutting losses, (2) cutting losses, and (3) cutting losses.',
    psychologyInsight: 'Seykota believed psychology accounts for 90% of trading success. He famously told an interviewer that consistently losing traders unconsciously want to lose — because trading fulfills some emotional need unrelated to profits.',
  },
  {
    name: 'Bruce Kovner',
    era: '1980s-2010s',
    style: 'Global Macro + Currencies',
    returns: 'Averaged 87% annual return for 10+ years at Caxton Associates',
    keyLesson: 'Risk management above all. Kovner says he always mentally goes to where his stop loss would be before entering a trade. He evaluates whether he can handle that loss. If not, he doesn\'t take the trade.',
    bestQuote: 'Novice traders risk 5-10 times too much per trade.',
    psychologyInsight: 'Kovner is famous for being able to take very large positions while remaining psychologically calm — because he had already accepted the maximum loss before entering. The outcome had no power over him.',
  },
  {
    name: 'Linda Bradford Raschke',
    era: '1980s-present',
    style: 'Short-term Trading + Price Action',
    returns: 'Consistent 18%+ annual returns over 35+ years',
    keyLesson: 'Master one or two setups completely rather than knowing many partially. Her main setup is the Andy-S pattern (retracement within a trend using the first bar of a new high/low day). Mastery of ONE edge compounds dramatically.',
    bestQuote: 'The most important thing is to have a method for staying with your winners and cutting your losers.',
    psychologyInsight: 'Raschke is one of the few female supertraders profiled in Market Wizards. She emphasizes that the boredom of repetitive execution is what makes great traders — not intelligence or creativity.',
  },
  {
    name: 'Michael Marcus',
    era: '1970s-1990s',
    style: 'Global Macro + Commodities',
    returns: 'Turned $30,000 into $80,000,000',
    keyLesson: 'Marcus took enormous conviction positions when he was very right, but used careful risk management. He said the key skill was distinguishing between a normal retracement and a real reversal — and cutting losses immediately when reversals occurred.',
    bestQuote: 'Every trader has strengths and weaknesses. Some are good holders of winners, but may hold their losers a little too long. Others may cut their winners a little short, but are quick to take their losses.',
    psychologyInsight: 'Marcus made his biggest profits by combining fundamental analysis (he had strong macro views) with technical timing. The macro view gave him conviction to hold through pullbacks. The technical timing gave him precise entries.',
  },
  {
    name: 'Marty Schwartz',
    era: '1980s-2000s',
    style: 'Short-term Technical Trading',
    returns: 'Won the US Trading Championship 9 out of 10 years',
    keyLesson: 'Schwartz uses a strictly defined set of technical indicators (EMA9, EMA18, 5-day MA of the T-bill yield) and only trades when his entire system confirms. He is famous for saying he made more money as a technical analyst than as a fundamental analyst.',
    bestQuote: 'I always laugh at people who say: "I\'ve never met a rich technician." I love that! It\'s such an arrogant, nonsensical response. I used fundamentals for 9 years and got rich as a technician.',
    psychologyInsight: 'Schwartz\'s key psychological practice: he acknowledges when he\'s wrong immediately. He says most people ego-trade — they can\'t admit a trade is wrong because they confuse it with being wrong as a person.',
  },
  {
    name: 'Richard Dennis',
    era: '1970s-1990s',
    style: 'Trend Following (Turtle Trader Founder)',
    returns: 'Turned $1,600 into $200,000,000',
    keyLesson: 'Created the famous Turtle Trading experiment — proved trading can be taught. His Turtle system: trade breakouts of 20-day and 55-day highs/lows with a fixed percentage risk system (2% per trade). Pure mechanical, emotion-free execution.',
    bestQuote: 'Trading is a skill that can be learned, like playing the piano.',
    psychologyInsight: 'Dennis made history by betting $1 million that he could teach random people to trade profitably in two weeks. He won. The Turtle Traders collectively made over $100 million in their first few years, proving that a good system + disciplined execution beats talent.',
  },
];

// ── PAIR PROFILES EXTENDED — 4 more pairs ──
const PAIR_PROFILES_EXTENDED = {
  'NZD/USD': {
    nickname: 'The Kiwi',
    character: 'Smaller Australian cousin. Moves on dairy prices, NZ economic data, and risk sentiment. Less liquid than AUD/USD but often cleaner technical patterns.',
    sessions: { asia: 'Most active', london: 'Moderate', newYork: 'Active' },
    dailyRange: { typical: '40-70 pips', volatile: '80-120 pips' },
    keyDrivers: ['RBNZ interest rate decisions', 'NZ dairy/agricultural prices (GlobalDairyTrade)', 'Risk on/off sentiment', 'China economic data (NZ major export partner)', 'US Dollar strength'],
    correlations: { strong: ['AUD/USD (+0.92)', 'AUD/JPY (+0.80)'], negative: ['USD/CAD (-0.70)'] },
    tradingTips: 'NZD/USD follows AUD/USD very closely. If they diverge significantly, mean reversion trade is possible. Lower liquidity means slightly wider spreads — factor into cost calculations.',
    keyLevels: [0.5500, 0.5800, 0.6000, 0.6200, 0.6500],
    bestStrategy: 'Support/Resistance Bounce + Trend Pullback'
  },
  'USD/CAD': {
    nickname: 'The Loonie',
    character: 'The oil currency. CAD strength directly correlates with oil prices (Canada is a major oil exporter). USD/CAD FALLS when oil rises. Trade oil price direction to predict CAD movement.',
    sessions: { asia: 'Quiet', london: 'Building', newYork: 'Most active' },
    dailyRange: { typical: '60-90 pips', volatile: '100-150 pips' },
    keyDrivers: ['WTI Crude Oil price (strong negative correlation)', 'Bank of Canada rate decisions', 'US NFP and Canadian employment data', 'US/Canada trade relationship', 'CAD/USD interest rate differential'],
    correlations: { strong: ['WTI Oil (-0.75 with USD/CAD)', 'EUR/USD (-0.65)'], negative: ['AUD/USD (-0.60)'] },
    tradingTips: 'Watch oil prices. If oil spikes, USD/CAD drops (CAD strengthens). Most active during New York hours. Canadian GDP and employment releases at 13:30 UTC create sharp moves.',
    keyLevels: [1.2500, 1.3000, 1.3500, 1.4000, 1.4500],
    bestStrategy: 'Trend Pullback + Session Open Breakout'
  },
  'EUR/JPY': {
    nickname: 'Yuppy',
    character: 'High-octane cross. Combines EUR risk sentiment with JPY safe-haven dynamics. Extremely volatile during risk-off events. Popular with carry traders due to rate differential.',
    sessions: { asia: 'Active for JPY', london: 'Very active', newYork: 'Active' },
    dailyRange: { typical: '80-120 pips', volatile: '150-250 pips' },
    keyDrivers: ['ECB vs BOJ policy divergence (biggest driver)', 'Global risk sentiment (JPY strengthens in panic)', 'EU economic data vs Japan data', 'Bank of Japan yield curve control policy', 'Carry trade flows'],
    correlations: { strong: ['GBP/JPY (+0.94)', 'EUR/USD (+0.70)'], negative: ['USD/JPY inverse when EUR strengthening'] },
    tradingTips: 'Wider spreads than majors. Much larger daily ranges. Reduce position size by 30-40% vs EUR/USD. Strong trends can last weeks. Extremely dangerous during BOJ or ECB surprise announcements.',
    keyLevels: [155.00, 160.00, 163.00, 165.00, 170.00],
    bestStrategy: 'EMA Trend Pullback + Multi-Timeframe Confluence'
  },
  'AUD/JPY': {
    nickname: 'Risk Proxy',
    character: 'The ultimate risk sentiment barometer. When markets are confident (risk-on), AUD/JPY rises. When fear strikes (risk-off), it crashes. Like owning a live fear/greed gauge.',
    sessions: { asia: 'Most active', london: 'Moderate', newYork: 'Active' },
    dailyRange: { typical: '70-100 pips', volatile: '150-300 pips (crisis)' },
    keyDrivers: ['Global risk sentiment (primary driver)', 'RBA vs BOJ interest rate differential', 'China economic data and sentiment', 'Commodity prices (AUD correlates)', 'Risk events: VIX, geopolitical crises'],
    correlations: { strong: ['S&P500 (+0.82)', 'NZD/JPY (+0.95)'], negative: ['USD/JPY sometimes decouples'] },
    tradingTips: 'Carry trade favorite historically. Watch S&P500 and VIX as leading indicators. During risk-off events, AUD/JPY can fall 300-500 pips in hours. Never hold large positions through major risk events.',
    keyLevels: [88.00, 92.00, 95.00, 98.00, 100.00],
    bestStrategy: 'Carry Trade + Trend Pullback in risk-on conditions'
  }
};

// ── ECONOMIC CALENDAR DATA — Key Monthly Events ──
const ECONOMIC_CALENDAR_GUIDE = {
  weekly: [
    { day: 'Every Thursday', event: 'US Jobless Claims', impact: 'Medium', currency: 'USD', time: '13:30 UTC', description: 'Weekly initial unemployment claims. Consistent above 300K = employment weakness. Below 200K = very strong labor market.' },
    { day: 'Every Friday (last)', event: 'NFP (Non-Farm Payrolls)', impact: 'High', currency: 'USD', time: '13:30 UTC', description: 'The most important monthly US data. Expected vs actual divergence causes 100-300 pip moves. Avoid holding positions 30 mins before.' },
  ],
  monthly: [
    { week: 1, event: 'NFP + Unemployment Rate', impact: '🔴 Extreme', currency: 'USD', description: 'First Friday of every month. Biggest regular USD mover. Entire forex market watches.' },
    { week: 2, event: 'US CPI (Inflation)', impact: '🔴 Extreme', currency: 'USD', description: 'Mid-month. Directly affects Fed rate expectations. Above target = USD strength. Below = USD weakness.' },
    { week: 2, event: 'UK CPI', impact: '🔴 High', currency: 'GBP', description: 'Mid-month. Same concept as US CPI but for GBP. Critical for BOE rate decisions.' },
    { week: 3, event: 'FOMC Rate Decision', impact: '🔴 Extreme', currency: 'USD', description: '8 times per year. Fed Chair press conference afterward creates volatile price action. Can move USD pairs 200+ pips.' },
    { week: 3, event: 'ECB Rate Decision', impact: '🔴 High', currency: 'EUR', description: '8 times per year. Christine Lagarde press conference follows. Major EUR mover.' },
    { week: 3, event: 'BOE Rate Decision', impact: '🔴 High', currency: 'GBP', description: '8 times per year. MPC vote count and quarterly inflation report are key.' },
    { week: 4, event: 'Flash PMI (US/EU/UK)', impact: '🟡 Medium', currency: 'USD/EUR/GBP', description: 'Preliminary manufacturing and services activity. Above 50 = expansion. Below 50 = contraction.' },
    { week: 4, event: 'US GDP (Quarterly)', impact: '🟡 Medium', currency: 'USD', description: 'Quarterly GDP release. Flash, preliminary, and final readings. Major deviation from forecast creates moves.' },
  ],
  avoidTimes: [
    '30 minutes before any 🔴 High impact event',
    'Monday morning first 30 minutes (gap risk)',
    'Friday from 15:00 UTC (position squaring)',
    'Major holidays: Christmas/New Year, US Thanksgiving, Easter',
    'BOJ intervention risk periods (when USD/JPY moves >3% in one week)',
  ]
};

// ── TRADING JOURNAL TEMPLATES — Pre-built setups ──
const JOURNAL_SETUPS = [
  'Support & Resistance Bounce',
  'Resistance Rejection',
  'EMA Trend Pullback',
  'Breakout Retest',
  'London Open Breakout',
  'Session Open Breakout',
  'RSI Divergence',
  'MACD Crossover + Trend',
  'SMC Order Block Entry',
  'SMC FVG Retracement',
  'Pin Bar at S&R',
  'Bullish/Bearish Engulfing at Level',
  'Inside Bar Breakout',
  'Fibonacci 61.8% Entry',
  'Golden Cross / Death Cross',
  'Pattern Breakout (H&S, Double Top/Bottom)',
  'News Momentum Play',
  'Asian Range Fade',
  'Multi-TF Confluence Entry',
  'Wyckoff Spring Entry',
  'Carry Trade Entry',
  'Scalp — 5-min EMA bounce',
  'Momentum Continuation',
  'Gap Fill',
  'Other / Custom',
];

// ── EXTENDED DAILY TIPS (50 more) ──
if (typeof DAILY_TIPS !== 'undefined') {
  const moreTips = [
    {tip:"The market is the most efficient wealth redistribution mechanism ever invented — from the impatient to the patient.",by:"Trading Wisdom"},
    {tip:"Your worst enemy in trading is not the market. It is the person staring back at you in the mirror.",by:"Trading Wisdom"},
    {tip:"In trading, the answer to 'should I hold or fold?' is almost always: check your plan.",by:"Trading Wisdom"},
    {tip:"Risk management is not about avoiding losses. It is about surviving them.",by:"Trading Wisdom"},
    {tip:"The best trades often feel uncomfortable. If everyone is comfortable, there may not be an edge.",by:"Trading Wisdom"},
    {tip:"Every losing trade is a paid lesson. Every rule-breaking loss is an expensive one.",by:"Trading Wisdom"},
    {tip:"A trader who can stay flat when there is no edge is already ahead of 80% of retail traders.",by:"Trading Wisdom"},
    {tip:"The market gives generous hints to those who are willing to wait and listen.",by:"Trading Wisdom"},
    {tip:"Compounding is the eighth wonder of the world. He who understands it earns it.",by:"Albert Einstein (adapted)"},
    {tip:"The most profitable words in trading: 'I was wrong. I will exit now.'",by:"Trading Wisdom"},
    {tip:"Discipline is the bridge between your trading goals and your trading results.",by:"Trading Wisdom"},
    {tip:"Markets go up and markets go down. Only one thing lasts: your risk management.",by:"Trading Wisdom"},
    {tip:"Speed kills in trading. The slower and more deliberate your process, the better your outcomes.",by:"Trading Wisdom"},
    {tip:"A loss well-managed is the foundation of your next win.",by:"Trading Wisdom"},
    {tip:"The market is never wrong — opinions often are.",by:"Jesse Livermore"},
    {tip:"To be a successful trader you have to be willing to make mistakes regularly; there is nothing wrong with it.",by:"William Eckhardt"},
    {tip:"It is not about being right or wrong, rather, it is about how much money you make when you are right and how much you do not lose when you are wrong.",by:"George Soros"},
    {tip:"The key to trading success is emotional discipline. If intelligence were the key, there would be a lot more people making money trading.",by:"Victor Sperandeo"},
    {tip:"In trading, when a pattern works it becomes overcrowded. When overcrowded, it fails. Then it becomes uncrowded and works again.",by:"Market Wisdom"},
    {tip:"The trading techniques that work are not the most sophisticated. They are the ones you can actually execute consistently under pressure.",by:"Trading Wisdom"},
    {tip:"Never trade more than you can comfortably lose. The moment the stakes change your psychology, your performance degrades.",by:"Trading Wisdom"},
    {tip:"A small consistent edge, executed 1,000 times, beats a large intermittent edge executed 10 times.",by:"Trading Wisdom"},
    {tip:"The secret to position sizing is simple: risk the same percentage on every trade, regardless of how confident you feel.",by:"Trading Wisdom"},
    {tip:"Markets reward patience because impatience is the most common human flaw in finance.",by:"Trading Wisdom"},
    {tip:"The hardest part of trading is not making money when you are right. It is limiting losses when you are wrong.",by:"Trading Wisdom"},
    {tip:"If you have to count on being right to make money, your system is broken.",by:"Trading Wisdom"},
    {tip:"A good trading system is one that trades itself when your emotions say otherwise.",by:"Trading Wisdom"},
    {tip:"You cannot think clearly about a trade you are in. Make decisions before you enter.",by:"Trading Wisdom"},
    {tip:"The best technical analysis finds what a motivated institutional trader would buy or sell and why.",by:"Trading Wisdom"},
    {tip:"Price is truth. Everything else is an opinion.",by:"Trading Wisdom"},
    {tip:"A trend trader's greatest enemy is trying to pick tops and bottoms.",by:"Trading Wisdom"},
    {tip:"The market will reward you for patience and punish you for impatience, eventually and reliably.",by:"Trading Wisdom"},
    {tip:"Trade less. Think more. The best traders I know sit on their hands most of the time.",by:"Market Wizards"},
    {tip:"Your P&L is a lagging indicator of your habits. Fix the habits first.",by:"Trading Wisdom"},
    {tip:"Every day the market gives you an examination. The score is your P&L. Your trading plan is your study guide.",by:"Trading Wisdom"},
    {tip:"The goal is not to make money today. The goal is to still be trading profitably five years from now.",by:"Trading Wisdom"},
    {tip:"Risk control must come first. Profits look after themselves if risk is managed.",by:"George Soros"},
    {tip:"The best traders are not smarter. They are more disciplined about cutting losses.",by:"Market Wizards"},
    {tip:"If you lose your account, you lose your ability to trade. Protect the account above all.",by:"Trading Wisdom"},
    {tip:"When you are in doubt, do nothing. The market will always present another opportunity.",by:"Trading Wisdom"},
    {tip:"Your trading results are the exact reflection of your trading habits.",by:"Trading Wisdom"},
    {tip:"A 1% improvement in discipline compounded over a year is transformative.",by:"Trading Wisdom"},
    {tip:"The market is a mirror. It reflects your edge, your discipline, and your psychology back at you.",by:"Trading Wisdom"},
    {tip:"Most consistent profitable traders have average strategies but exceptional risk management.",by:"Trading Wisdom"},
    {tip:"You cannot control the outcome of a trade. You can control the quality of the decision.",by:"Trading Wisdom"},
    {tip:"Always exit a bad trade today. Never let a bad trade become a catastrophic one tomorrow.",by:"Trading Wisdom"},
    {tip:"A trading methodology is only valuable if you can execute it with perfect consistency.",by:"Mark Douglas"},
    {tip:"The best revenge after a losing trade is executing the next one perfectly.",by:"Trading Wisdom"},
    {tip:"When the market gives you a gift — a perfect setup — take it at full size. When it does not, do not trade.",by:"Trading Wisdom"},
    {tip:"The ability to sit and wait is not passivity. It is one of the most active and valuable trading skills.",by:"Trading Wisdom"},
  ];
  moreTips.forEach(t => DAILY_TIPS.push(t));
}

/* ═══════════════════════════════════════════════════════════════
   TRADEBABY PRO v10 — COMPREHENSIVE FOREX GLOSSARY
   200+ term definitions that power the AI lookup and educational content
   ═══════════════════════════════════════════════════════════════ */

const FOREX_GLOSSARY = {
  // ── PRICE & QUOTES ──
  "pip": "The smallest standard price movement. Most pairs: 0.0001 (4th decimal). JPY pairs: 0.01 (2nd decimal). The word 'pip' stands for Percentage In Point. A pipette is 1/10th of a pip (5th decimal).",
  "pipette": "One-tenth of a pip — the 5th decimal place on most currency pairs, or 3rd decimal on JPY pairs. Also called a fractional pip. Most modern brokers quote prices to pipettes for tighter spreads.",
  "bid": "The price at which you can sell a currency pair. Always lower than the ask. The market maker buys from you at the bid. When you click 'SELL', you execute at the bid.",
  "ask": "The price at which you can buy a currency pair. Always higher than the bid. The market maker sells to you at the ask price. When you click 'BUY', you execute at the ask.",
  "spread": "The difference between the bid and ask price. This is the broker's primary fee. EUR/USD spread of 1 pip = ask 1.0851, bid 1.0850. The spread is your immediate cost on entry — every trade starts slightly negative.",
  "quote currency": "The second currency in a pair. In EUR/USD, USD is the quote currency. Pip values are always expressed in the quote currency. You need to convert to your account currency if different.",
  "base currency": "The first currency in a pair. In EUR/USD, EUR is the base currency. Price shows how much quote currency is needed to buy one unit of base currency. A rising EUR/USD means EUR strengthened.",
  "cross pair": "A currency pair that does not include the USD. Examples: EUR/GBP, EUR/JPY, GBP/JPY. Usually have slightly wider spreads than major pairs due to lower liquidity.",
  "exotic pair": "A major currency paired with an emerging market currency. Examples: USD/ZAR, USD/MXN, EUR/TRY. High spreads (10-50+ pips), lower liquidity, higher overnight interest rates.",
  "rollover": "The process of extending a forex position past the daily settlement time (typically 5pm New York). Involves crediting or debiting the position with the interest rate differential (swap).",
  "spot rate": "The current exchange rate for immediate delivery. What you see quoted on forex platforms. Distinct from forward rates (for future delivery) used by corporations for hedging.",
  "forward contract": "An agreement to exchange currencies at a specified price on a future date. Used by companies to hedge currency risk. Not typically available to retail forex traders.",
  
  // ── POSITION TYPES ──
  "long position": "A trade where you buy the base currency and sell the quote currency, profiting if the base currency rises. 'Going long EUR/USD' means you bought euros and sold dollars.",
  "short position": "A trade where you sell the base currency and buy the quote currency, profiting if the base currency falls. 'Going short EUR/USD' means you sold euros and bought dollars.",
  "flat": "Having no open positions. Also called 'square.' Being flat means no market exposure. Professional traders are flat over weekends or major event risks.",
  "hedging": "Opening an opposing position to offset risk of an existing trade. Example: long EUR/USD + short EUR/USD = perfect hedge (no profit/loss potential). Partial hedges are more common.",
  "net position": "The combined directional exposure after accounting for multiple positions. Long 2 lots EUR/USD + Short 1 lot = net long 1 lot. Your actual exposure to market movement.",
  
  // ── ORDER TYPES ──
  "market order": "Executes immediately at the best available price. No price guarantee — price may differ from what you see (slippage) in fast markets. Use for immediate execution when speed matters.",
  "limit order": "Executes only at your specified price or better. Buy limit = buys at or below your price. Sell limit = sells at or above. No guarantee of execution if price doesn't reach your level.",
  "stop order": "Triggers when price reaches your level, then executes at market. Buy stop above current price (breakout entry). Sell stop below (breakdown entry). Can slip in fast markets.",
  "stop loss": "An order that automatically closes your trade at a specified loss level. Non-negotiable for risk management. Always set a stop loss before entering any trade.",
  "take profit": "An order that automatically closes your trade when it reaches your profit target. Set this before entering while you're thinking clearly — not during the trade.",
  "trailing stop": "A dynamic stop loss that moves with price as your trade profits. If you set a 30-pip trailing stop and price moves 50 pips in your favor, the stop moves up 50 pips, locking in 20 pips of profit.",
  "OCO order": "One Cancels the Other — two orders where execution of one automatically cancels the second. Used for trading breakouts in either direction without knowing which way price will move.",
  "GTC order": "Good Till Cancelled — an order that remains active until you cancel it or it executes. Default on most platforms. Contrast with GTD (Good Till Date) or IOC (Immediate Or Cancel).",
  "pending order": "An order set to execute when price reaches a specified level. Includes limit orders and stop orders. Allows you to pre-plan entries without watching the screen constantly.",
  
  // ── RISK & MONEY MANAGEMENT ──
  "risk per trade": "The maximum dollar amount you are willing to lose on a single trade. Calculated as a percentage of account balance (typically 1-2%). The foundation of professional position sizing.",
  "risk reward ratio": "The relationship between potential loss (risk) and potential gain (reward) on a trade. A 1:2 ratio means risking $50 to potentially make $100. Minimum recommended: 1:2.",
  "profit factor": "Total gross profit divided by total gross loss across all trades. A profit factor above 1.3 is considered good. Below 1.0 means the strategy is losing money overall.",
  "expectancy": "Expected profit per dollar risked, calculated as: (Win% × Avg Win) - (Loss% × Avg Loss). Positive expectancy = profitable system. The goal of every trading system.",
  "drawdown": "The peak-to-trough decline in account equity during a specified period. A 10% drawdown means equity fell 10% from its high point. Maximum drawdown is the largest such decline.",
  "maximum drawdown": "The largest peak-to-trough decline in account value across the trading history. A key risk metric. Most strategies have a max drawdown of 15-30% in backtesting.",
  "recovery factor": "Net profit divided by maximum drawdown. Measures how efficiently a system recovers from its worst loss period. A factor above 3 is considered strong.",
  "heat": "The total open risk across all current positions simultaneously. If you have 3 trades each risking 1%, your total heat is 3%. Professional traders limit total heat to 3-6%.",
  "money management": "The complete system governing how much to trade, when to trade, and how to manage risk. Encompasses position sizing, risk limits, drawdown rules, and portfolio allocation.",
  "position sizing": "The process of calculating how many lots to trade based on account size, risk percentage, stop loss distance, and pip value. The single most important mechanical skill in trading.",
  "diversification": "Spreading risk across multiple uncorrelated instruments or strategies. In forex: avoid trading highly correlated pairs in the same direction simultaneously, which would double your real risk.",
  
  // ── MARKET STRUCTURE ──
  "market structure": "The sequence of highs and lows that defines whether price is trending (HH/HL or LH/LL) or ranging (horizontal highs and lows). The most fundamental concept in technical analysis.",
  "higher high": "A price peak that exceeds the previous price peak. In combination with Higher Lows, it confirms an uptrend. Breaking above the last higher high is a Break of Structure.",
  "higher low": "A price trough that is above the previous trough. The defining characteristic of an uptrend alongside higher highs. When a higher low is broken, watch for potential trend change.",
  "lower low": "A price trough below the previous trough, confirming a downtrend. Alongside lower highs, defines the bearish market structure.",
  "lower high": "A price peak below the previous peak, confirming a downtrend. The most immediate signal that sellers are in control.",
  "break of structure": "When price decisively moves beyond a significant swing high (bullish BOS) or swing low (bearish BOS). Confirms trend continuation in institutional trading frameworks.",
  "change of character": "In SMC: the first structural break AGAINST the prevailing trend. The CHOCH candle breaks the most recent Higher Low (in uptrend) signaling a potential reversal. First warning sign.",
  "swing high": "A peak that is higher than both the candle before and after it. Also called a reaction high or fractal high. Key levels for stop placement and S&R identification.",
  "swing low": "A trough lower than both adjacent candles. Key level for stop placement in short trades and for identifying support zones.",
  "range": "A market condition where price oscillates between horizontal support and resistance without a clear directional trend. Characterised by equal highs and lows.",
  
  // ── INSTITUTIONAL CONCEPTS ──
  "liquidity": "In SMC: clusters of buy or sell orders that accumulate at obvious levels (above swing highs = buy stops; below swing lows = sell stops). Institutions need liquidity to fill large orders.",
  "liquidity grab": "When price briefly moves beyond a key level to collect stop orders, then immediately reverses. Also called a stop hunt or liquidity sweep. Creates the 'false breakout' pattern.",
  "order block": "In SMC: the last opposing candle before a significant impulse move. The final bearish candle before a major bullish move is a Bullish Order Block — where institutions built their long positions.",
  "fair value gap": "A 3-candle imbalance where candle 1 and candle 3 don't overlap, leaving an untraded price gap. Price tends to return to 'fill' the FVG before continuing in the original direction.",
  "imbalance": "Same as Fair Value Gap. A price range that was traded too quickly in one direction, leaving untraded prices. Markets are attracted to filling these imbalances.",
  "institutional order flow": "The buying and selling activity of large participants (banks, hedge funds, central banks). Price moves because of order flow imbalances. Reading structure helps identify likely future institutional activity.",
  "premium zone": "In SMC: price above the 50% level of a swing range. Expensive relative to recent action. Look to sell in premium (shorting at overextended prices). Opposite of discount.",
  "discount zone": "In SMC: price below the 50% level of a swing range. Cheap relative to recent action. Look to buy in discount (buying at undervalued prices).",
  "mitigation": "When price returns to an Order Block to 'use up' the remaining institutional orders. After full mitigation, the OB loses its significance.",
  "displacement": "A large, fast candle that creates a Fair Value Gap and breaks structure. Shows decisive institutional entry. The subsequent FVG is a high-probability reentry zone.",
  
  // ── TECHNICAL INDICATORS ──
  "RSI": "Relative Strength Index. Measures momentum on a 0-100 scale. Above 70 = overbought. Below 30 = oversold. 50 line = trend filter. Divergence is the most powerful signal.",
  "MACD": "Moving Average Convergence Divergence. MACD line = 12 EMA minus 26 EMA. Signal line = 9 EMA of MACD. Histogram = MACD minus Signal. Crossovers and divergence are the primary signals.",
  "Bollinger Bands": "Volatility indicator: Middle band (20 SMA) with upper and lower bands at 2 standard deviations. BB Squeeze = bands narrow = low volatility = big move incoming.",
  "ATR": "Average True Range. Measures market volatility by averaging the true range of each candle over N periods. Use for stop placement (1.5×ATR), position sizing, and identifying breakouts.",
  "Stochastic": "Oscillator comparing close to price range over N periods. Above 80 = overbought. Below 20 = oversold. %K crossing %D in oversold zone = buy signal.",
  "Ichimoku Cloud": "Japanese indicator showing trend, momentum, and support/resistance in one view. Kumo (cloud) = S&R zone. Price above cloud = bullish. Below = bearish. Thick cloud = strong S&R.",
  "Fibonacci retracement": "Tool based on Fibonacci ratios. Key levels: 23.6%, 38.2%, 50%, 61.8% (golden pocket), 78.6%. Price often reverses at these levels during pullbacks within a trend.",
  "moving average": "Smooths price data to reveal the underlying trend. SMA = equal weight to all periods. EMA = more weight to recent prices. Periods: 9, 21, 50, 200 are most widely watched.",
  "VWAP": "Volume Weighted Average Price. Average price weighted by volume. Resets daily. Price above VWAP = bullish intraday. Major institutional benchmark for execution.",
  "ADX": "Average Directional Index. Measures trend strength, not direction. Above 25 = trending market (trade with trend). Below 20 = ranging (use range strategies). Ignores direction.",
  "volume": "The number of units traded in a period. High volume on a breakout = institutional participation = valid move. Low volume breakout = likely false. Volume leads price.",
  "momentum": "The rate of price change. Strong momentum = large candles with small wicks in the trend direction. Weakening momentum = smaller candles, increasing wicks, price stalling.",

  // ── CANDLESTICK PATTERNS ──
  "doji": "A candle where open and close are at or nearly the same price. Represents indecision. Types: standard (cross shape), dragonfly (T shape, bullish), gravestone (inverted T, bearish), long-legged (extreme indecision).",
  "marubozu": "A candle with no wicks (or very small wicks). Open = low (bullish) or open = high (bearish). Shows maximum conviction. One side completely dominated the entire period.",
  "hammer": "A candle at downtrend lows with a small body near the top and a long lower wick (at least 2× body). Buyers rejected lower prices. Bullish reversal signal requiring confirmation.",
  "shooting star": "A candle at uptrend highs with a small body near the bottom and a long upper wick (at least 2× body). Sellers rejected higher prices. Bearish reversal signal.",
  "engulfing": "Two-candle pattern where the second candle's body completely engulfs the first's body. Bullish engulfing (large green after small red) at lows = buy signal. Bearish (large red after small green) at highs = sell signal.",
  "morning star": "Three-candle bullish reversal: large bearish → small indecision candle → large bullish closing past first candle's midpoint. Appears at major support after downtrend.",
  "evening star": "Three-candle bearish reversal: large bullish → small indecision → large bearish closing past first candle's midpoint. Mirror of morning star. Appears at major resistance after uptrend.",
  "pin bar": "A candlestick with a small body and a wick at least 2-3× the body on one side. Long lower wick at support = bullish pin bar. Long upper wick at resistance = bearish pin bar.",
  "inside bar": "A candle whose high AND low are completely within the previous candle's range. Signals consolidation and coiling energy. Trade the breakout of the mother bar's range.",
  "harami": "Japanese for 'pregnant.' A small candle whose body is completely inside the previous large candle's body. Signals potential reversal. Requires confirmation from the next candle.",

  // ── FUNDAMENTAL ANALYSIS ──
  "hawkish": "Central bank policy stance favouring higher interest rates or tighter money supply to control inflation. Generally bullish for the currency as it attracts capital inflows.",
  "dovish": "Central bank policy stance favouring lower interest rates or loose money supply to stimulate growth. Generally bearish for the currency as it reduces investment attractiveness.",
  "interest rate differential": "The difference in interest rates between two countries. Higher differential = more attractive carry trade. One of the most powerful long-term drivers of currency exchange rates.",
  "quantitative easing": "Central bank buying of assets (government bonds) to inject money into the economy. Expansionary policy. Generally weakens the currency by increasing money supply.",
  "quantitative tightening": "Central bank selling assets or allowing them to mature without reinvestment. Reduces money supply. Contractionary policy that generally strengthens the currency.",
  "CPI": "Consumer Price Index. Measures the average change in prices paid by consumers for goods and services. The primary inflation measure. Higher CPI → central bank likely to raise rates → currency strengthens.",
  "NFP": "Non-Farm Payrolls. US monthly jobs report released first Friday of each month. Measures employment changes outside agriculture. Largest regular market-moving event for USD pairs.",
  "GDP": "Gross Domestic Product. Total value of goods and services produced by a country. Quarterly release. Strong GDP growth → currency strengthens. Contraction → weakens. Leading indicator: PMI.",
  "PMI": "Purchasing Managers Index. Survey of business activity. Above 50 = expansion. Below 50 = contraction. Released monthly. A leading indicator because managers order in advance of production.",
  "trade balance": "Difference between exports and imports. Surplus (exports > imports) = demand for domestic currency → appreciates. Deficit (imports > exports) → depreciation pressure.",
  "current account": "A country's total balance of trade (goods and services) plus net income and transfers. Large deficits create persistent selling pressure on the currency.",
  "carry trade": "Borrowing in a low-interest-rate currency to invest in a higher-rate currency, profiting from the daily interest differential (swap). Unwinds violently during risk-off periods.",
  "risk on": "Market sentiment favoring risky investments. Investors buy equities, commodities, high-yield currencies (AUD, NZD). USD, JPY, CHF, and gold typically weaken.",
  "risk off": "Market sentiment favouring safety. Investors flee to safe-haven assets: USD, JPY, CHF, gold, US Treasuries. Higher-yield currencies fall sharply.",

  // ── TRADING PSYCHOLOGY ──
  "confirmation bias": "The tendency to seek information that confirms existing beliefs while discounting contradicting evidence. In trading: only seeing bullish signals when you want to go long.",
  "loss aversion": "The psychological phenomenon where losses feel approximately 2-2.5× more painful than equivalent gains feel positive. Causes premature profit-taking and excessive loss-holding.",
  "FOMO": "Fear Of Missing Out. The anxiety of missing a price move that compels traders to enter late and at poor prices. One of the most costly trading emotions.",
  "revenge trading": "Re-entering trades immediately after a loss, driven by the emotional desire to recover money quickly. Almost always leads to larger losses. The pattern that destroys most accounts.",
  "overconfidence": "Excessive belief in one's own predictions and abilities. Usually follows a winning streak. Manifests as oversizing, taking sub-standard setups, and abandoning risk management.",
  "recency bias": "Overweighting recent events when making predictions. After 3 wins: assumes system is working perfectly. After 3 losses: assumes system is broken. Both conclusions from insufficient data.",
  "anchoring": "Relying too heavily on the first piece of information encountered. In trading: fixating on entry price when the market has no knowledge of or care for where you entered.",
  "sunk cost fallacy": "Continuing an activity because of past investment rather than future value. In trading: holding a losing trade because 'I've held it too long to close now.'",
  "gambler's fallacy": "Believing past independent events influence future independent events. In trading: 'I've had 5 losses in a row so I'm due a win.' Each trade is statistically independent.",
  "flow state": "A mental state of complete absorption and optimal performance where time seems to slow and execution becomes effortless. The goal of pre-trading routines and emotional preparation.",

  // ── BROKER & PLATFORM TERMS ──
  "ECN broker": "Electronic Communication Network broker. Connects traders directly with liquidity providers. Variable spreads (can be 0.0 pips), adds per-trade commission. Best for active trading.",
  "STP broker": "Straight-Through Processing broker. Orders routed directly to liquidity providers without dealer intervention. Less conflict of interest than market makers. No dealing desk.",
  "market maker": "Broker that takes the other side of client trades. Makes money from spread. May hedge with larger liquidity providers or trade against clients. Used by most beginner-focused brokers.",
  "requote": "When a broker rejects your order price during fast markets and offers a new price. Sign of poor execution. Common with dealing desk brokers. ECN brokers rarely requote.",
  "slippage": "The difference between your intended execution price and actual fill price. Happens during fast-moving markets and on market orders. Factor slippage into backtesting results.",
  "margin": "Collateral your broker holds while you have open positions. Not a fee — just a security deposit. Required Margin = (Position Size × Price) ÷ Leverage.",
  "leverage": "The ratio of position size to required margin. 100:1 leverage = $1,000 controls $100,000. Amplifies both profits and losses equally. Use cautiously.",
  "swap": "The overnight interest rate paid or received for holding a position past the daily settlement. Positive swap = you earn. Negative = you pay. Triple swap on Wednesdays covers weekend.",
  "margin call": "Broker notification that equity has fallen below required margin level (typically 100% margin level). Must deposit funds or close positions immediately.",
  "stop out level": "The equity level (typically 20-50% margin level) at which the broker automatically begins closing your losing positions to protect against negative equity.",
  "liquidity provider": "Large financial institutions (banks, prime brokers) that supply bid/ask quotes to brokers. The deeper the liquidity, the tighter the spreads and better the fills.",
  "lot": "Standard unit of currency trade size. Standard lot = 100,000 units. Mini lot = 10,000 units. Micro lot = 1,000 units. Nano lot = 100 units.",
};

// ── SETUP DATABASE — Pre-defined high-probability setups with rules ──
const SETUP_DATABASE = [
  {
    name: "London Breakout — Asian Range",
    category: "Day Trade", difficulty: 2, winRate: "58%", riskReward: "1:2", timeframe: "H1/M15",
    pairs: ["EUR/USD", "GBP/USD"],
    prerequisites: ["Mark Asian range (00:00-07:00 UTC) high and low", "Asian range should be 25-80 pips"],
    entryRules: ["At 08:00 UTC London open, wait for a candle to CLOSE above Asian high or below Asian low", "Enter on next candle open after the close-beyond"],
    stopLoss: "10-15 pips beyond the broken range extreme",
    takeProfit: "1.5-2× the Asian session range height",
    filters: ["Avoid Mondays (gap risk)", "Skip if Asian range was over 80 pips (already volatile)", "Best when D1 trend aligns with breakout direction"],
    notes: "The London open session is when institutional traders establish daily positions. The Asian range becomes the battlefield."
  },
  {
    name: "EMA 21 Pullback — Swing Entry",
    category: "Swing", difficulty: 2, winRate: "52%", riskReward: "1:3", timeframe: "H4",
    pairs: ["All major pairs"],
    prerequisites: ["H4 uptrend confirmed: price above EMA21 AND EMA50, both sloping up", "RSI above 50 on H4"],
    entryRules: ["Wait for price to pull back to EMA21 zone (within 10 pips)", "Bullish confirmation candle closes above EMA21: hammer, engulfing, or pin bar", "Enter on open of next candle"],
    stopLoss: "Below the swing low of the pullback (not just below the EMA)",
    takeProfit: "Previous swing high or 3× your risk amount",
    filters: ["ADX above 20 confirms trend strength", "Not within 2 hours of major news release", "Best when EMA21 and EMA50 have clear upward slope"],
    notes: "In strong uptrends, EMA21 acts as dynamic support. This is the institutional entry level."
  },
  {
    name: "S&R Role Reversal Retest",
    category: "Swing", difficulty: 2, winRate: "62%", riskReward: "1:2.5", timeframe: "H4/D1",
    pairs: ["All pairs"],
    prerequisites: ["Identify key horizontal level with 3+ previous touches", "Price must have broken through the level with a large candle (momentum)"],
    entryRules: ["Wait for price to retrace back to the broken level", "Reversal candle (pin bar, engulfing, or doji) forms at the retested level", "Enter on candle close"],
    stopLoss: "Beyond the retested level by 10-15 pips",
    takeProfit: "Previous structure level on the other side (measured move)",
    filters: ["Retracement should not fully re-enter the pre-breakout range", "Confirmation candle should close back on the breakout side of the level", "Higher timeframe alignment strongly preferred"],
    notes: "Role reversal is one of the most reliable concepts in trading. Previous resistance becomes support."
  },
  {
    name: "RSI Divergence at Key Level",
    category: "Swing", difficulty: 3, winRate: "49%", riskReward: "1:4", timeframe: "H4/D1",
    pairs: ["EUR/USD", "GBP/JPY", "XAU/USD"],
    prerequisites: ["Price at a significant S&R level on H4 or D1", "RSI divergence spanning at least 20 candles forming"],
    entryRules: ["Bearish: price makes new high but RSI lower high at resistance", "Bullish: price makes new low but RSI higher low at support", "Wait for reversal candle confirmation"],
    stopLoss: "Beyond the swing high/low that created the divergence",
    takeProfit: "Next major S&R level (target 1:4 R:R minimum)",
    filters: ["Divergence MUST be at a key S&R level — never in mid-range", "Divergence spanning 30+ candles is more reliable than 20", "D1 divergence is more powerful than H4"],
    notes: "Lower win rate but exceptional R:R when correct. The S&R requirement is what makes this reliable."
  },
  {
    name: "SMC Order Block Entry",
    category: "Day Trade", difficulty: 4, winRate: "51%", riskReward: "1:3", timeframe: "H1/M15",
    pairs: ["EUR/USD", "GBP/USD", "NAS100"],
    prerequisites: ["D1/H4 market structure trend identified via BOS", "H1 CHOCH — first structure break against HTF trend occurred"],
    entryRules: ["Mark the Order Block at the CHOCH candle (last opposing candle before impulse)", "Wait for price to retrace back to the OB zone", "M15 confirmation: FVG fill or reversal candle within OB zone"],
    stopLoss: "3-5 pips beyond the Order Block extreme",
    takeProfit: "Next liquidity pool (equal highs/lows, previous swing extremes)",
    filters: ["OB should be tested for the FIRST time (fresh OB)", "Must be aligned with HTF trend", "Avoid OBs that have been tested more than twice"],
    notes: "The most sophisticated entry model. Requires significant screen time to master but produces excellent R:R."
  },
  {
    name: "Fibonacci Golden Pocket Entry",
    category: "Swing", difficulty: 3, winRate: "57%", riskReward: "1:3", timeframe: "H4/D1",
    pairs: ["All major pairs + Gold"],
    prerequisites: ["Completed impulse move of minimum 80 pips (H4) or 150 pips (D1)", "D1 trend confirms direction", "Fibonacci drawn from impulse start to end"],
    entryRules: ["Wait for price to reach 61.8% retracement level (golden pocket)", "Reversal confirmation: bullish/bearish engulfing, pin bar, or doji at level", "Enter on close of confirmation candle"],
    stopLoss: "15-20 pips beyond the 78.6% level",
    takeProfit: "Prior swing extreme (100%) or 161.8% extension",
    filters: ["Additional confluence: Fib 61.8% + horizontal S&R = highest priority", "Volume (if available) should be declining on the retracement", "RSI below 50 on retracement (bullish setup) confirms pullback weakness"],
    notes: "The 61.8% golden pocket is the most respected retracement level globally. Institutional orders cluster here."
  },
];
