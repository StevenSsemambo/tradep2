/* ═══════════════════════════════════════════════════════════════
   TRADEBABY PRO v10 — COMPREHENSIVE AI CHATBOT
   40+ topic responses with personal data integration
   ═══════════════════════════════════════════════════════════════ */

function generateResponse(input) {
  const q = input.toLowerCase().trim();
  const name = (STATE && STATE.user && STATE.user.name) ? STATE.user.name : 'Trader';
  const lvl  = (STATE && STATE.user) ? (STATE.user.level || 1) : 1;
  const completed = (STATE && STATE.progress) ? Object.keys(STATE.progress).length : 0;
  const streak = (STATE && STATE.dailyStreak) ? STATE.dailyStreak : 0;
  const simTrades = (STATE && STATE.simTrades) ? STATE.simTrades : [];
  const journal = (STATE && STATE.journal) ? STATE.journal : [];
  const allTrades = [...journal, ...simTrades];
  const simEq = (STATE && STATE.simEquity) ? STATE.simEquity : 10000;
  const bal = (STATE && STATE.simBalance) ? STATE.simBalance : 10000;
  const wr = allTrades.length > 0 ? Math.round(allTrades.filter(t=>parseFloat(t.pnl)>0).length/allTrades.length*100) : 0;
  const totalPnl = allTrades.reduce((a,t)=>a+(parseFloat(t.pnl)||0),0);
  const totalL = (typeof CURRICULUM !== 'undefined') ? CURRICULUM.reduce((a,c)=>a+(c.lessons?c.lessons.length:0),0) : 35;

  // ── EMOTIONAL SUPPORT ──
  const stressWords = ['stressed','frustrated','anxious','scared','worried','depressed','struggling','losing','failing','hopeless','angry','upset','bad trade','blew','blown','wiped','lost everything','giving up'];
  if (stressWords.some(w => q.includes(w))) {
    return `I hear you, ${name} — what you are feeling is completely valid. Trading is genuinely one of the most psychologically demanding skills in the world.<br><br><strong>Here is what actually matters right now:</strong><br>• Every professional trader you admire has been exactly where you are<br>• Jesse Livermore lost his entire fortune four times and rebuilt each time<br>• <strong>Stop trading today if you are emotional.</strong> Emotional trades are statistical losses<br>• The market will be here tomorrow — your capital and mental health are more important<br><br>Review your journal: Is this a <em>system failure</em> (bad strategy) or <em>execution failure</em> (breaking your own rules)? Those need completely different solutions.<br><br>Tell me what happened and I will give you targeted help. You have got this. 💪`;
  }

  // ── MOTIVATION ──
  if (q.match(/motivat|give up|cant do|quit|worth it|feel like stopping|no hope/)) {
    return `Do not give up, ${name}. Here is the truth about trading timelines most courses hide:<br><br><strong>Typical profitable trader journey:</strong><br>• Months 1-3: Excited but losing (completely normal)<br>• Months 4-8: Frustrated, questioning everything (most people quit here)<br>• Months 9-18: Starting to break even consistently<br>• Month 18+: Consistent profitability begins<br><br>You are Level ${lvl} with ${completed} lessons done and a ${streak}-day streak. That consistency IS the skill being built. The people who push through months 4-8 are the ones who eventually make it.<br><br><strong>One rule:</strong> Never quit after a loss. Take a break, review the trade objectively, then decide. 🏆`;
  }

  // ── PROGRESS CHECK ──
  if (q.match(/my progress|how am i|my stats|my level|how far|show.*my|my.*data/)) {
    return `Your complete snapshot, ${name}:<br><br>⭐ <strong>Level ${lvl}</strong> — ${(STATE.user||{}).xp||0}/${(STATE.user||{}).xpNext||500} XP to next<br>📚 <strong>${completed}/${totalL} lessons</strong> complete<br>🔥 <strong>${streak}-day streak</strong><br>📈 <strong>${allTrades.length} trades</strong> — ${wr}% win rate<br>💰 Sim equity: <strong>$${simEq.toFixed(2)}</strong> (${((simEq-10000)/100).toFixed(1)}% return)<br>💵 Net P&L: <strong style="color:${totalPnl>=0?'var(--green)':'var(--red)'}">${totalPnl>=0?'+':''}$${Math.abs(totalPnl).toFixed(2)}</strong><br>📓 <strong>${journal.length} journal entries</strong><br>🏆 <strong>${(STATE.achievements||[]).length} badges</strong><br><br>${completed < 10 ? '📌 Focus: Complete Forex Basics and Risk Management first.' : completed < 20 ? '📌 Next: Technical Analysis deep dive + start journaling every trade.' : '📌 Advanced: Review journal analytics weekly and refine your edge.'}`;
  }

  // ── NEXT LESSON ──
  if (q.match(/next lesson|what.*study|what.*learn next|continue|where.*start/)) {
    if (typeof CURRICULUM !== 'undefined') {
      for (const cat of CURRICULUM) {
        for (const l of cat.lessons) {
          if (!(STATE.progress||{})[l.id]) {
            return `Your next lesson: <strong>"${l.title}"</strong> in <em>${cat.title}</em>.<br><br>${l.content ? l.content.replace(/<[^>]+>/g,'').substring(0,150).trim()+'...' : ''}<br><br>⏱ ~${l.mins} minutes · +${l.xp||50} XP on completion<br><br>Head to the <strong>Learn tab</strong> to start! 🎓`;
          }
        }
      }
    }
    return `You have completed all available lessons! Focus on: daily sim trading, journaling every trade, reviewing analytics weekly, and mastering your top 2-3 strategies.`;
  }

  // ── TRADE REVIEW ──
  if (q.match(/review.*trade|trade.*review|analyze.*trade|check.*trade/)) {
    return `I will review your trade! Give me these details:<br><br>1. 📊 Pair and timeframe (e.g., EUR/USD H4)<br>2. 📍 Direction and entry price<br>3. 🛑 Where you placed your Stop Loss and WHY<br>4. 🎯 Take Profit target level<br>5. ⏰ What happened: hit SL, hit TP, or manual close?<br>6. 🧠 Your reasoning for the entry<br>7. 😊 Emotional state when you entered<br><br>With those details I will give you honest, specific feedback. 🎯`;
  }

  // ── WHAT IS FOREX ──
  if (q.match(/what is forex|how does forex|forex.*work|currency.*market|forex.*market/)) {
    return `<strong>Forex (Foreign Exchange)</strong> — the world largest financial market.<br><br>📊 <strong>Daily volume:</strong> $7.5 TRILLION (50x larger than all stock markets combined)<br>🕐 <strong>Hours:</strong> 24 hours/day, 5 days/week<br>📍 <strong>No central exchange</strong> — OTC market across global financial centres<br><br><strong>How it works:</strong> You buy one currency while selling another. EUR/USD = 1.0850 means 1 Euro = 1.0850 US Dollars. If EUR/USD rises and you bought, you profit.<br><br><strong>Why trade forex?</strong><br>• Profit in rising AND falling markets<br>• Start with as little as $100<br>• Tightest spreads of any market<br>• Most liquid market in existence<br>• Available 24/5 — trade on YOUR schedule`;
  }

  // ── PIPS ──
  if (q.match(/\bpip\b|what is.*pip|pip value|pipette|how.*pip/)) {
    return `<strong>A pip</strong> is the standard unit of forex price movement.<br><br>📏 Most pairs (EUR/USD, GBP/USD): 1 pip = <strong>0.0001</strong> (4th decimal)<br>📏 JPY pairs (USD/JPY, EUR/JPY): 1 pip = <strong>0.01</strong> (2nd decimal)<br><br><strong>Pip values per standard lot (100,000 units):</strong><br>• EUR/USD: <strong>$10/pip</strong><br>• GBP/USD: <strong>~$10/pip</strong><br>• USD/JPY: <strong>~$6.67/pip</strong><br>• Gold (XAU/USD): <strong>$1/pip</strong><br><br><strong>Mini lot</strong> (10,000 units): values divide by 10<br><strong>Micro lot</strong> (1,000 units): values divide by 100<br><br>Use the <strong>Calculator → Pip tab</strong> for any pair instantly! 🧮`;
  }

  // ── LEVERAGE ──
  if (q.match(/leverage|margin call|explain leverage|what is leverage/)) {
    return `<strong>Leverage</strong> = borrowed capital from your broker to control a larger position.<br><br><strong>100:1 leverage:</strong> $1,000 of your money controls $100,000 worth of currency.<br><br>The brutal math:<br>✅ +100 pips profit on 1 standard lot = +$1,000 (100% on your $1,000 margin)<br>❌ -100 pips loss on 1 standard lot = -$1,000 (complete wipeout)<br><br><strong>Safe leverage guidelines:</strong><br>🟢 Beginner: 1:5 to 1:10<br>🟡 Intermediate: 1:10 to 1:30<br>🔴 Advanced: up to 1:50 (strict risk management only)<br><br><strong>Key insight:</strong> High leverage is the #1 account killer. Position SIZE matters more than leverage ratio. Always use the Position Size Calculator before entering.`;
  }

  // ── SPREAD ──
  if (q.match(/spread|bid ask|ask bid|broker fee|cost.*trade/)) {
    return `<strong>The Spread</strong> = Bid − Ask = your broker built-in fee on every trade.<br><br>You buy at the ASK (higher) and sell at the BID (lower). Every trade starts slightly negative.<br><br><strong>Typical spreads (ECN broker):</strong><br>• EUR/USD: 0.5-1.5 pips<br>• GBP/USD: 0.8-2 pips<br>• USD/JPY: 0.5-1.5 pips<br>• Gold (XAU/USD): 0.25-1 pip<br>• Exotic pairs: 10-50+ pips<br><br>⚠️ <strong>During major news events:</strong> spreads spike from 1 pip to 20-50 pips. This alone can trigger your stop loss. Always check spreads before trading news events.`;
  }

  // ── SUPPORT RESISTANCE ──
  if (q.match(/support|resistance|s.r level|key level|draw.*level|horizontal level/)) {
    return `<strong>Support and Resistance</strong> — the foundation of all technical analysis.<br><br>🟢 <strong>Support:</strong> Price zone where buyers overcome sellers — price bounces UP<br>🔴 <strong>Resistance:</strong> Price zone where sellers overcome buyers — price bounces DOWN<br><br><strong>How to identify strong levels:</strong><br>1. Use D1 chart first (highest importance levels)<br>2. Minimum 2-3 clear price reactions to confirm<br>3. Think in ZONES not exact prices (±10 pip buffer)<br>4. Round numbers (1.1000, 1.2000) attract institutional orders<br>5. Previous week/month highs and lows are critical<br><br><strong>Role Reversal:</strong> Broken support becomes resistance. Broken resistance becomes support. Retesting a broken level is one of the highest-probability setups in all of trading.`;
  }

  // ── CANDLESTICKS ──
  if (q.match(/candlestick|candle pattern|hammer|engulf|doji|morning star|pin bar|shooting star/)) {
    return `<strong>Top 6 candlestick patterns to master:</strong><br><br>🔨 <strong>Hammer</strong> — Long lower wick at support. Buyers rejected lower prices. Bullish reversal.<br>⭐ <strong>Shooting Star</strong> — Long upper wick at resistance. Sellers rejected higher prices. Bearish reversal.<br>🐂 <strong>Bullish Engulfing</strong> — Large green engulfs previous red. Strong buy at lows.<br>🐻 <strong>Bearish Engulfing</strong> — Large red engulfs previous green. Strong sell at highs.<br>✚ <strong>Doji</strong> — Open = Close. Pure indecision. Most powerful after a trend at key S&R.<br>☀️ <strong>Morning Star</strong> — 3 candles: bearish, small indecision, large bullish. Powerful bottom reversal.<br><br><strong>The context rule:</strong> A hammer mid-range = 40% win rate. Same hammer at major D1 support after 300-pip downtrend = 65%+ win rate. Context is everything.<br><br>Study all 18 patterns in <strong>Learn → Candle Bible</strong> 📚`;
  }

  // ── MOVING AVERAGES ──
  if (q.match(/moving average|\bema\b|\bsma\b|200.*ma|golden cross|death cross/)) {
    return `<strong>Moving Averages</strong> — the most versatile tool in trading.<br><br><strong>SMA</strong> (Simple): Equal weight to all periods. Slower, better for S&R identification.<br><strong>EMA</strong> (Exponential): More weight to recent prices. Faster, better for entries.<br><br><strong>Key MA levels every trader watches:</strong><br>• EMA 9/21 — Short-term trend and entry signals<br>• EMA 50 — Medium-term trend filter<br>• <strong>SMA 200</strong> — THE king. Major long-term S&R. Watched by every institution globally<br><br><strong>Golden Cross:</strong> EMA50 crosses ABOVE SMA200 = major long-term bullish signal<br><strong>Death Cross:</strong> EMA50 crosses BELOW SMA200 = major long-term bearish signal<br><br>In a confirmed uptrend, price pulling back to the EMA21 with a bullish confirmation candle = high-probability entry.`;
  }

  // ── RSI ──
  if (q.match(/\brsi\b|relative strength|overbought|oversold.*indicator/)) {
    return `<strong>RSI (Relative Strength Index)</strong> — Momentum oscillator by J. Welles Wilder.<br><br>📊 Scale: 0-100<br>🔴 Above 70 = Overbought (potential reversal — but can stay overbought in strong trends!)<br>🟢 Below 30 = Oversold (potential reversal up)<br>⚪ 50 line = Trend filter (above 50 = bullish bias, below = bearish bias)<br><br><strong>Divergence (most powerful use):</strong><br>• <strong>Bearish:</strong> Price new HIGH but RSI lower high = weakening momentum = reversal warning<br>• <strong>Bullish:</strong> Price new LOW but RSI higher low = bearish exhaustion = reversal warning<br><br><strong>Best settings:</strong> RSI(14) standard · RSI(7) more signals · RSI(21) higher quality<br><br>Never trade RSI in isolation — always need price action confirmation at a key level.`;
  }

  // ── MACD ──
  if (q.match(/macd|moving average convergence|histogram|signal line/)) {
    return `<strong>MACD</strong> — Shows trend direction AND momentum in one indicator.<br><br><strong>Components:</strong><br>• MACD Line = 12 EMA minus 26 EMA<br>• Signal Line = 9 EMA of the MACD line<br>• Histogram = MACD minus Signal (green = growing momentum, red = fading)<br><br><strong>Signals:</strong><br>✅ MACD crosses above Signal = Buy<br>❌ MACD crosses below Signal = Sell<br>📊 MACD above zero = overall bullish; below zero = bearish<br><br><strong>Best use — Divergence:</strong> Price makes new high but MACD histogram makes lower high = hidden weakness. More reliable than crossover signals alone.<br><br>Default settings: 12-26-9. Works best on H4 and D1 timeframes.`;
  }

  // ── BOLLINGER BANDS ──
  if (q.match(/bollinger|bb.*squeeze|volatility.*band|band.*squeeze/)) {
    return `<strong>Bollinger Bands</strong> — John Bollinger volatility indicator.<br><br><strong>Components:</strong><br>• Middle Band = 20 SMA<br>• Upper Band = 20 SMA + 2 standard deviations<br>• Lower Band = 20 SMA minus 2 standard deviations<br><br><strong>Key signals:</strong><br>🗜️ <strong>BB Squeeze:</strong> Bands narrow = low volatility = big move coming. Trade the breakout.<br>📈 <strong>BB Expansion:</strong> Bands widen = trend underway. Do not fight it.<br>🎯 Price touching outer band in a trend = continuation, NOT automatically a reversal.<br><br><strong>Best use:</strong> BB Squeeze identifies when to prepare for a breakout. BB Expansion confirms a trend is accelerating. Combine with RSI for optimal signals.`;
  }

  // ── FIBONACCI ──
  if (q.match(/fibonacci|fib.*level|golden ratio|61\.8|golden pocket|retracement/)) {
    return `<strong>Fibonacci Retracement</strong> — Based on the Golden Ratio (1.618).<br><br><strong>Key levels:</strong><br>• 23.6% — Shallow pullback (very strong trend)<br>• 38.2% — Normal pullback<br>• 50.0% — Psychological level, widely respected<br>• <strong>61.8% = "Golden Pocket"</strong> — Most respected globally. Institutional order zone<br>• 78.6% — Deep pullback, weakening trend<br><br><strong>Extension targets:</strong><br>• 127.2% — First profit target<br>• 161.8% — Primary target (most reliable)<br>• 261.8% — Extended trend target<br><br><strong>Draw in uptrend:</strong> from swing LOW to swing HIGH<br><strong>Draw in downtrend:</strong> from swing HIGH to swing LOW<br><br>Fibonacci 61.8% + horizontal S&R + EMA21 = triple confluence = very high probability entry zone.`;
  }

  // ── RISK MANAGEMENT ──
  if (q.match(/risk management|stop loss placement|1.*percent rule|position.*siz|lot.*calculat/)) {
    return `<strong>Risk Management — the #1 skill in trading.</strong><br><br><strong>The 1-2% Rule:</strong> Never risk more than 1-2% of account on any single trade.<br><br><strong>Position Size Formula:</strong><br>Lots = (Balance x Risk%) divided by (SL pips x Pip Value)<br><br><strong>Example</strong> ($10,000 account, 1% risk, 30-pip SL, EUR/USD):<br>= ($100 risk) divided by (30 x $0.10) = $100 / $3 = <strong>33 micro lots</strong><br><br><strong>Why 1% matters (20 consecutive losses):</strong><br>• 1% risk: -18% drawdown, need +22% to recover ✅<br>• 5% risk: -64% drawdown, need +180% to recover ⚠️<br>• 10% risk: -87% drawdown, need +700% to recover 💀<br><br>Use the <strong>Calculator → Position Size tab</strong> before every single trade.`;
  }

  // ── TRADING PSYCHOLOGY ──
  if (q.match(/psychology|emotion|fear.*greed|discipline|mental|mindset|cognitive.*bias/)) {
    return `<strong>Trading Psychology — The Real Edge Separator</strong><br><br>You can have the best strategy in the world and still lose if emotions override your rules.<br><br><strong>The 7 biases that destroy traders:</strong><br>1. <strong>Confirmation Bias</strong> — Only seeing info that confirms your view<br>2. <strong>Loss Aversion</strong> — Losses feel 2x more painful than equal gains feel good<br>3. <strong>Recency Bias</strong> — Overweighting the last few trades<br>4. <strong>Sunk Cost Fallacy</strong> — "I cannot close this losing trade after holding it 3 days"<br>5. <strong>Gambler Fallacy</strong> — "I am due a win after 5 losses"<br>6. <strong>Overconfidence</strong> — Increasing size recklessly after a winning streak<br>7. <strong>Anchoring</strong> — Fixating on your entry price<br><br><strong>The 3-loss rule:</strong> After 3 consecutive losses, stop trading for the day. Come back fresh tomorrow.`;
  }

  // ── SMART MONEY CONCEPTS ──
  if (q.match(/smc|smart money|order block|fair value gap|fvg|choch|bos|liquidity pool|ict/)) {
    return `<strong>Smart Money Concepts (SMC)</strong> — Institutional trading framework.<br><br><strong>Core concepts:</strong><br>📦 <strong>Order Block</strong> — Last bearish candle before major bullish impulse. Institutions left orders there. Price returns to fill them.<br>🔲 <strong>Fair Value Gap (FVG)</strong> — 3-candle imbalance where candle 1 and 3 do not overlap. Price tends to fill the gap.<br>💧 <strong>Liquidity</strong> — Stop clusters above swing highs and below swing lows. Institutions hunt these before reversing.<br>📈 <strong>BOS</strong> — Break of Structure. Confirms trend continuation.<br>🔄 <strong>CHOCH</strong> — Change of Character. First structure break against the trend = reversal warning.<br><br><strong>SMC 5-step entry:</strong><br>1. D1/H4: Identify trend direction via BOS<br>2. H1: Wait for CHOCH against higher TF trend<br>3. Mark the Order Block at the CHOCH candle<br>4. Wait for price to return to OB zone<br>5. M15: Confirm with FVG fill or reversal candle`;
  }

  // ── SESSIONS TIMING ──
  if (q.match(/trading session|best time|london.*open|new york|asian.*session|overlap|when.*trade/)) {
    const hr = new Date().getHours();
    const current = hr>=8&&hr<12?'London Open (active NOW!)':hr>=13&&hr<17?'London/NY Overlap (PRIME TIME - active NOW!)':hr>=17&&hr<22?'New York Session (active now)':hr>=0&&hr<9?'Asian Session (currently active)':'Between sessions';
    return `<strong>Current session: ${current}</strong><br><br><strong>The 4 trading sessions (UTC):</strong><br>🌏 Sydney 22:00-07:00 — Low volume, AUD/NZD pairs<br>🇯🇵 Tokyo/Asia 00:00-09:00 — Low-medium, JPY pairs<br>🇬🇧 London 08:00-17:00 — HIGH volume, EUR/GBP pairs ⭐<br>🇺🇸 New York 13:00-22:00 — HIGH volume, USD pairs ⭐<br><br>🔥 <strong>BEST: London/NY Overlap 13:00-17:00 UTC</strong><br>Highest volume, tightest spreads, strongest trends of the entire week. This is when institutional traders are most active.<br><br><strong>Avoid:</strong> Monday morning gaps, Friday afternoon position squaring, 30 minutes around major news events.`;
  }

  // ── FUNDAMENTAL ANALYSIS ──
  if (q.match(/fundamental|economic calendar|nfp|cpi|fomc|interest rate|central bank|hawkish|dovish/)) {
    return `<strong>Fundamental Analysis</strong> — Trading the economic big picture.<br><br><strong>Most market-moving events:</strong><br>🔴 NFP (Non-Farm Payrolls) — 1st Friday/month. 100-300 pip moves on USD pairs<br>🔴 FOMC Rate Decision — 8x/year. Biggest regular USD mover<br>🔴 CPI (Inflation data) — Monthly. Directly affects rate expectations<br>🟡 GDP, PMI, Retail Sales — Monthly macro indicators<br><br><strong>Hawkish vs Dovish:</strong><br>🦅 <strong>Hawkish</strong> = Rate hikes, tight money = currency STRENGTHENS<br>🕊️ <strong>Dovish</strong> = Rate cuts, loose money = currency WEAKENS<br><br><strong>3 strategies for news trading:</strong><br>1. Avoid entirely (close positions 30 min before) — best for beginners<br>2. Trade the aftermath — wait 2-5 min, then trade the sustained direction<br>3. Fade the spike — advanced only, when initial move is extreme and quickly reverses`;
  }

  // ── POSITION SIZING ──
  if (q.match(/position siz|lot size|how much.*risk|lot.*calculat|calculat.*lot/)) {
    return `<strong>Position Sizing Formula:</strong><br><br>Lots = (Account Balance x Risk%) divided by (SL pips x Pip Value)<br><br><strong>Your sim account ($${bal.toFixed(0)}), 1% risk, 30-pip SL on EUR/USD:</strong><br>= ($${bal.toFixed(0)} x 0.01) divided by (30 x $0.10)<br>= $${(bal*0.01).toFixed(0)} divided by $3<br>= <strong>${(bal*0.01/3).toFixed(1)} micro lots</strong><br><br><strong>Essential rules:</strong><br>• 1% risk = professional, sustainable standard<br>• 2% maximum for A+ setups only<br>• NEVER risk more than 2% under any circumstances<br>• Calculate BEFORE entering every single trade<br><br>Use the <strong>Calculator tab</strong> (More → Calculator → Position Size) for instant results.`;
  }

  // ── CHART PATTERNS ──
  if (q.match(/chart pattern|head.*shoulder|double top|double bottom|flag|triangle|cup.*handle/)) {
    return `<strong>Top Chart Patterns and Win Rates:</strong><br><br>👑 <strong>Head and Shoulders</strong> — 3 peaks, neckline break = entry. Win rate: 68-73%<br>📉 <strong>Double Top/Bottom</strong> — Two equal highs/lows at S&R, neckline break = entry. 62-68%<br>🏁 <strong>Bull/Bear Flag</strong> — Strong impulse, consolidation, breakout. Best continuation. 65-70%<br>🔺 <strong>Ascending Triangle</strong> — Flat resistance + rising lows = bullish breakout. 60-65%<br>🔻 <strong>Descending Triangle</strong> — Flat support + falling highs = bearish breakdown. 60-65%<br>🍵 <strong>Cup and Handle</strong> — Rounding bottom + pullback = bullish continuation. 65-70%<br><br><strong>Rules for ALL patterns:</strong><br>• Wait for a CLOSE beyond the pattern boundary, never a wick<br>• Target = height of the pattern projected from the breakout point<br>• Even the best patterns fail 30-40% of the time — always use stops`;
  }

  // ── STOP LOSS ──
  if (q.match(/stop loss|where.*stop|sl placement|trailing stop/)) {
    return `<strong>Stop Loss Placement — The Critical Skill</strong><br><br><strong>Golden Rule:</strong> Place SL at a LOGICAL level where the trade is proven wrong — not a random pip distance.<br><br><strong>Where to place stops:</strong><br>• Longs: Below the nearest support level (with 5-10 pip buffer)<br>• Shorts: Above the nearest resistance level (with buffer)<br>• Beyond the swing high/low of the setup candle<br>• Beyond the Order Block (SMC traders)<br><br><strong>ATR method:</strong> Stop = Entry plus/minus (1.5 x ATR14). Adapts automatically to current volatility.<br><br><strong>NEVER:</strong><br>❌ Move SL further away when losing<br>❌ Remove SL entirely for any reason<br>❌ Place SL at the exact round number everyone else uses<br><br><strong>Trailing Stop:</strong> Moves WITH price as trade profits, locking in gains while letting winners run further.`;
  }

  // ── RISK/REWARD ──
  if (q.match(/risk.*reward|r:r|rr ratio|risk reward|expectancy/)) {
    return `<strong>Risk/Reward Ratio</strong> — The math that makes trading profitable long-term.<br><br><strong>Minimum win rates needed at each R:R:</strong><br>• 1:1 R:R — Need more than 50% win rate<br>• <strong>1:2 R:R — Need only more than 34%</strong> (recommended minimum)<br>• 1:3 R:R — Need only more than 26%<br>• 1:5 R:R — Need only more than 17%<br><br><strong>Expectancy formula:</strong><br>E = (Win% x Avg Win) minus (Loss% x Avg Loss)<br><br>${allTrades.length > 5 ? `Your data: ${wr}% win rate, avg win $${allTrades.filter(t=>parseFloat(t.pnl)>0).reduce((a,t)=>a+(parseFloat(t.pnl)||0),0)/(allTrades.filter(t=>parseFloat(t.pnl)>0).length||1)|0}, avg loss $${Math.abs(allTrades.filter(t=>parseFloat(t.pnl)<=0).reduce((a,t)=>a+(parseFloat(t.pnl)||0),0)/(allTrades.filter(t=>parseFloat(t.pnl)<=0).length||1))|0}` : 'Log more trades to see your personal expectancy.'}<br><br>Set your Take Profit BEFORE entering, based on the next key S&R level.`;
  }

  // ── CARRY TRADE ──
  if (q.match(/carry trade|swap.*earn|positive swap|interest.*differ/)) {
    return `<strong>Carry Trade</strong> — Earning interest rate differentials.<br><br>You borrow a low-interest-rate currency to buy a high-interest-rate currency, earning the daily swap difference.<br><br><strong>Classic carry pairs:</strong><br>• AUD/JPY — Australia higher rates vs Japan near-zero rates<br>• NZD/JPY — Similar dynamic<br>• USD/JPY — When Fed rates are significantly higher than BOJ<br><br><strong>Requirements for carry trading:</strong><br>• Check your broker specific swap rates (they vary widely)<br>• Need stable to rising market conditions (risk-on environment)<br>• Wide stop loss 100-200 pips to withstand noise<br>• Hold for weeks to months to accumulate meaningful swaps<br><br>⚠️ <strong>Critical risk:</strong> Carry trades unwind catastrophically in risk-off events. AUD/JPY fell 40% in 2008. Always size conservatively. Use the Calculator Swap tab to model costs.`;
  }

  // ── COMPOUND GROWTH ──
  if (q.match(/compound|grow.*account|double.*account|account.*growth|consistent.*return/)) {
    const calc3 = (bal * Math.pow(1.03, 24)).toFixed(0);
    const calc5 = (bal * Math.pow(1.05, 24)).toFixed(0);
    return `<strong>The Magic of Compounding in Trading</strong><br><br>Starting with your sim balance ($${bal.toFixed(0)}), consistent monthly returns over 24 months:<br><br>• 3% per month: <strong>$${calc3}</strong> (+${(((parseInt(calc3)-bal)/bal)*100).toFixed(0)}%)<br>• 5% per month: <strong>$${calc5}</strong> (+${(((parseInt(calc5)-bal)/bal)*100).toFixed(0)}%)<br>• 10% per month: $${(bal * Math.pow(1.10, 24)).toFixed(0)} (exceptional, very rare)<br><br><strong>Why consistency beats big wins:</strong><br>3% every month consistently beats 20% one month then -15% the next. Compounding rewards consistency and punishes volatility. Even the best hedge funds average 20-30% per year.<br><br>Use <strong>Calculator → Growth tab</strong> to model your scenario with monthly deposits. 📈`;
  }

  // ── JOURNAL ──
  if (q.match(/journal|log.*trade|record.*trade|why.*journal|track.*trade/)) {
    return `<strong>Why journalling is non-negotiable:</strong><br><br>Every consistently profitable trader journals. Without it, you are flying blind — you do not know which setups actually work for YOU.<br><br><strong>What your journal reveals:</strong><br>• Which setups are actually profitable vs what you think works<br>• What time of day you perform best<br>• When emotions are affecting your execution<br>• Your actual R:R achieved vs planned<br>• Process compliance percentage<br><br>${journal.length === 0 ? '<strong style="color:var(--red)">You have 0 journal entries.</strong> This is your #1 priority right now. Log your very next trade.' : journal.length < 10 ? `You have ${journal.length} entries — good start! Aim for 25+ before drawing statistical conclusions.` : `You have ${journal.length} entries — excellent! Check Journal → Stats for your full performance breakdown.`}<br><br><strong>Minimum per trade:</strong> pair, direction, entry/SL/TP, lot size, outcome, mood, one sentence of notes.`;
  }

  // ── BACKTESTING ──
  if (q.match(/backtest|back.*test|test.*strategy|historical.*data|paper.*trad/)) {
    return `<strong>Backtesting</strong> — Testing your strategy on historical data before risking real money.<br><br><strong>Process:</strong><br>1. Define strategy rules completely with zero ambiguity<br>2. Select timeframe and 2+ years of historical data<br>3. Manually scroll through charts, mark every valid setup<br>4. Record: entry, SL, TP, outcome, pip gain/loss<br>5. After 100+ trades: calculate win rate, profit factor, max drawdown<br><br><strong>Pitfalls to avoid:</strong><br>• Curve fitting — Changing rules to fit past data perfectly<br>• Look-ahead bias — Using information not available at that candle close<br>• Ignoring spread/slippage — Always add 1-2 pips to results<br><br><strong>Target metrics:</strong><br>Win rate above 40%, profit factor above 1.3, max drawdown below 20%<br><br><strong>Tools:</strong> MT5 Strategy Tester, TradingView Manual Replay mode, Forex Tester software.`;
  }

  // ── BROKER SELECTION ──
  if (q.match(/broker|regulated|ecn.*broker|choose.*broker|which broker/)) {
    return `<strong>Choosing a Safe Quality Broker:</strong><br><br><strong>Must-have requirements:</strong><br>✅ Regulated by Tier 1 regulator (FCA, ASIC, CySEC, NFA, FSCA)<br>✅ Offers MT4 or MT5 platform<br>✅ Operating 5+ years with verifiable track record<br>✅ Clear withdrawal process confirmed by real user reviews<br>✅ Competitive spreads under 1.5 pip on EUR/USD<br><br><strong>Red flags — avoid immediately:</strong><br>🚩 Guaranteed returns of any percentage<br>🚩 Bonuses with hidden withdrawal conditions<br>🚩 No verifiable regulatory registration number<br>🚩 Pressure to deposit quickly for limited time offers<br>🚩 Withdrawal requests ignored or delayed beyond 2-3 days<br>🚩 Proprietary platform only (no MT4/MT5)<br><br>For swing trading: Any regulated STP broker works. For scalping: need ECN with raw spreads + commission. Check the <strong>Knowledge Vault → Broker Guide</strong> for full details.`;
  }

  // ── KNOWLEDGE BASE LOOKUP ──
  const KB = {
    'swap|rollover|overnight fee': `<strong>Swap/Rollover</strong> — Daily interest cost or credit for holding overnight.<br><br>Held past 5:00 PM EST = interest rate differential calculated between the two currencies.<br><br>Positive swap = you earn (holding higher-rate currency).<br>Negative swap = you pay (holding lower-rate currency).<br><br><strong>Wednesday triple swap:</strong> On Wednesday night you receive 3 days of swap (covers the weekend). Critical if holding positions mid-week!<br><br>Use <strong>Calculator → Swap tab</strong> to calculate exact daily and total costs before entering multi-day positions.`,

    'margin level|free margin|used margin': `<strong>Margin Concepts:</strong><br><br>Required Margin = (Position Size x Current Price) divided by Leverage<br>Example: 1 lot EUR/USD at 100:1 leverage = $1,085 required margin<br><br>Used Margin = Total margin held across all open trades<br>Free Margin = Equity minus Used Margin (available for new positions)<br>Margin Level = (Equity divided by Used Margin) x 100%<br><br>🟡 Margin Call (100% level) = Broker warns to add funds or close trades<br>🔴 Stop Out (50% level) = Broker automatically closes your largest losing trade<br><br>Use <strong>Calculator → Margin tab</strong> before opening large positions.`,

    'ichimoku|kumo|cloud indicator': `<strong>Ichimoku Cloud</strong> — A complete trading system in one indicator.<br><br>5 components forming the Kumo (cloud):<br>• Tenkan-sen (9-period midpoint) — fast signal<br>• Kijun-sen (26-period midpoint) — trend and signal<br>• Senkou Span A and B — form the cloud (future S&R)<br>• Chikou Span — current close plotted 26 periods back<br><br>Price above cloud = bullish. Below cloud = bearish. Inside cloud = neutral/consolidation.<br>Thin cloud = weak S&R. Thick cloud = strong S&R.<br><br>Most powerful on H4 and D1 when all components align with the same bias.`,

    'divergence|rsi diverge|macd diverge': `<strong>Divergence</strong> — When price and indicator disagree.<br><br><strong>Bearish Divergence:</strong><br>Price makes new HIGH but RSI/MACD makes lower high = momentum weakening = reversal warning<br><br><strong>Bullish Divergence:</strong><br>Price makes new LOW but indicator makes higher low = bearish exhaustion = reversal warning<br><br><strong>Hidden Divergence (continuation):</strong><br>Bullish hidden: Price higher low + indicator lower low = trend continuation up<br>Bearish hidden: Price lower high + indicator higher high = trend continuation down<br><br>Only trade divergence at KEY S&R levels. Spanning 20+ candles is most reliable. Always wait for confirming price action candle.`,

    'atr|average true range': `<strong>ATR (Average True Range)</strong> — Pure volatility measurement.<br><br>ATR measures average candle range over N periods (default 14). Higher ATR = more volatile market.<br><br><strong>How traders use ATR:</strong><br>• Stop Loss: SL = Entry plus/minus (1.5-2 x ATR) — adapts to current volatility<br>• Position sizing: In high-ATR environments, reduce position size<br>• Breakout confirmation: Breakout candle should be at least 1x ATR in size<br>• Target setting: TP at 2-3x ATR for realistic profit targets<br><br>Example: EUR/USD ATR(14) on H4 = 30 pips means market noise = ~30 pips. Your stop should exceed this noise level.`,

    'elliott wave|wave count|impulse wave': `<strong>Elliott Wave Theory</strong> — Markets move in predictable wave patterns.<br><br>5 impulse waves (1,2,3,4,5) in trend direction followed by 3 corrective waves (A,B,C).<br><br><strong>3 Rules (never violated):</strong><br>1. Wave 2 never retraces below Wave 1 start<br>2. Wave 3 is never the shortest impulse wave<br>3. Wave 4 never overlaps Wave 1 territory<br><br>Fibonacci ratios: Wave 2 retraces 38.2-61.8% of Wave 1. Wave 3 is typically 161.8% of Wave 1 (the power wave).<br><br>Best entry: After Wave 2 completes at Fibonacci level, enter Wave 3. This is the strongest, most profitable wave in any Elliott cycle.`,

    'correlation|pairs.*correlate|correlated.*pairs': `<strong>Currency Correlation</strong> — How pairs move in relation to each other.<br><br><strong>Positive correlation (move together):</strong><br>• EUR/USD and GBP/USD: +0.85 correlation<br>• EUR/USD and AUD/USD: +0.65 correlation<br>If you buy both, you have doubled your USD exposure.<br><br><strong>Negative correlation (move opposite):</strong><br>• EUR/USD and USD/CHF: -0.90 correlation<br>• EUR/USD and USD/JPY: -0.60 correlation<br><br><strong>Risk warning:</strong> Trading EUR/USD and GBP/USD in the same direction = one big trade, not two separate ones. Always check correlation before opening multiple positions simultaneously.`,

    'beginners|new trader|just started|where do i start': `Welcome to forex trading! The right learning order:<br><br>1. ✅ Forex Basics — pairs, pips, lots, leverage<br>2. ✅ Risk Management — the 1% rule (most important!)<br>3. ✅ Support and Resistance — foundation of TA<br>4. ✅ Candlestick patterns — reading price action<br>5. ✅ Trading Psychology — why most traders fail<br>6. 📈 Start sim trading with 0.01 lots while studying<br>7. 📓 Journal every single trade from day 1<br><br>Critical truths: Plan for 6-18 months before consistency. Never risk real money until 3 profitable months on demo. The Learn tab curriculum is in perfect order — start at the top and work down! 🚀`,
  };

  for (const [patterns, answer] of Object.entries(KB)) {
    const patternList = patterns.split('|');
    if (patternList.some(p => q.includes(p.trim()))) {
      return answer + '<br><br><em>Want me to go deeper on any aspect of this?</em>';
    }
  }

  // ── LESSON CONTENT LOOKUP ──
  if (typeof CURRICULUM !== 'undefined') {
    for (const cat of CURRICULUM) {
      for (const l of cat.lessons) {
        const lt = l.title.toLowerCase();
        const li = (l.id || '').replace(/-/g, ' ');
        if (q.includes(lt) || (li && q.includes(li))) {
          return `The lesson <strong>"${l.title}"</strong> is in <em>${cat.title}</em>.<br><br>${l.content ? l.content.replace(/<[^>]+>/g,'').substring(0,200).trim()+'...' : ''}<br><br>Go to <strong>Learn → ${cat.title}</strong> to study it and earn +${l.xp||50} XP. 📚`;
        }
      }
    }
  }

  // ── STRATEGY LOOKUP ──
  if (typeof STRATEGIES !== 'undefined') {
    for (const s of STRATEGIES) {
      const sn = s.name.toLowerCase();
      const si = (s.id||'').replace(/-/g,' ');
      if (q.includes(sn) || q.includes(si)) {
        return `<strong>${s.name}</strong> — ${s.style} strategy<br><br>📊 Win Rate: ${s.winrate} | R:R: ${s.rr} | Difficulty: ${'★'.repeat(s.difficulty)}<br>📈 Best pairs: ${s.pairs}<br><br>${s.desc}<br><br>Full entry rules in <strong>Learn → Strategies</strong>. +10 XP when you study it! ⚔️`;
      }
    }
  }

  // ── CALCULATION QUESTIONS ──
  if (q.match(/calculat|how much|formula|math.*equation/)) {
    return `The <strong>Calculator</strong> (More → Calculator) has 6 tools:<br><br>📐 <strong>Position Size</strong> — what lot size for my risk %?<br>📏 <strong>Pip Value</strong> — how much is each pip worth?<br>💰 <strong>P&L</strong> — what will I make or lose?<br>💳 <strong>Margin</strong> — how much collateral does the broker hold?<br>🔄 <strong>Swap</strong> — what does holding overnight cost?<br>📈 <strong>Compound Growth</strong> — what will my account grow to?<br><br>Or tell me your numbers directly: account balance, risk %, stop loss pips — and I will calculate manually for you!`;
  }

  // ── GREETINGS ──
  const greetWords = ['hello','hi','hey','morning','afternoon','evening','howdy','sup'];
  if (greetWords.some(g => q.startsWith(g) || q === g)) {
    const hrs = new Date().getHours();
    const timeStr = hrs<12?'morning':hrs<17?'afternoon':'evening';
    return `Good ${timeStr}, ${name}! 😊<br><br>I am your AI trading mentor. I can help with:<br>• Any forex concept, indicator, or strategy<br>• Candlestick patterns, chart patterns, S&R analysis<br>• Risk management and position sizing formulas<br>• Your personal progress and what to study next<br>• Trading psychology and discipline<br>• Trade review and feedback on specific setups<br><br>What would you like to explore? 🎯`;
  }

  // ── NOTIFICATIONS ──
  if (q.match(/notif|alert|remind|push.*notif/)) {
    return `<strong>TradeBaby Pro Notifications include:</strong><br><br>• 📚 Daily learning reminders<br>• ⏰ Trading session alerts (London open, NY/London overlap)<br>• 🔔 Weekly review reminders<br>• 🏆 Achievement unlock notifications<br>• ⚠️ AI pattern alerts (revenge trading, FOMO, win streaks detected)<br><br>Enable in <strong>More → Settings → Notifications</strong>. Browser permission required. Works best when app is installed as PWA on your home screen.`;
  }

  // ── DEFAULT SMART RESPONSES ──
  const defaults = [
    `Good question, ${name}. The foundation of all trading success is three pillars:<br><br>1. <strong>Edge</strong> — A strategy that wins consistently over 100+ trades<br>2. <strong>Risk Management</strong> — Protecting capital on every trade (1-2% max per trade)<br>3. <strong>Psychology</strong> — Executing without emotion even when it is difficult<br><br>Could you be more specific? I can explain any concept, review strategies, or give feedback on your approach. What exactly would you like to understand better?`,

    `Try asking me something more specific and I will give you a precise, detailed answer. For example:<br><br>• "What is [indicator/pattern/concept]?"<br>• "How do I [entry/exit/size a position]?"<br>• "Explain [strategy name]"<br>• "What should I study next?"<br>• "Review my trade: [entry, SL, TP, outcome]"<br>• "Show me my progress"<br><br>I have deep knowledge of forex fundamentals, 40+ technical concepts, all strategies, psychology, and your personal trading data. Ask anything! 💪`,

    `Here are three questions every successful trader asks before every single trade:<br><br>1. 🎯 <strong>What is the setup?</strong> Why am I entering this specific trade?<br>2. 🛑 <strong>Where is my stop?</strong> What price proves my idea is wrong?<br>3. 💰 <strong>What is the target?</strong> Is the R:R at least 1:2?<br><br>If you cannot clearly answer all three before entering, the trade is not ready yet. What specific trading topic can I help you with today?`,
  ];

  return defaults[Math.floor(Math.random() * defaults.length)];
}

// ── Helpers used by chatbot ──
function completedCount() {
  return (STATE && STATE.progress) ? Object.keys(STATE.progress).length : 0;
}
function totalLessons() {
  if (typeof CURRICULUM === 'undefined') return 35;
  return CURRICULUM.reduce((a, c) => a + (c.lessons ? c.lessons.length : 0), 0);
}
function progressPct() {
  const total = totalLessons();
  return total > 0 ? Math.round(completedCount() / total * 100) : 0;
}

/* ═══════════════════════════════════════════════════════════════
   TRADEBABY PRO v10 — GLOSSARY LOOKUP INTEGRATION
   Enhances generateResponse with glossary lookup capability
   ═══════════════════════════════════════════════════════════════ */

// Wrap generateResponse to include glossary lookup
const _baseGenerateResponse = generateResponse;
function generateResponse(input) {
  const q = input.toLowerCase().trim();

  // First try glossary lookup for "what is X?" or "define X" or "explain X"
  const glossaryMatch = q.match(/^(?:what is|what are|define|explain|meaning of|tell me about|what does .+ mean)\s+(?:a |an |the )?(.+?)[\?\.]*$/);
  if (glossaryMatch && typeof FOREX_GLOSSARY !== 'undefined') {
    const term = glossaryMatch[1].toLowerCase().replace(/['"]/g, '').trim();
    // Direct match
    if (FOREX_GLOSSARY[term]) {
      return `<strong>${term.charAt(0).toUpperCase() + term.slice(1)}</strong><br><br>${FOREX_GLOSSARY[term]}<br><br><em>Want to learn more? Check the related lesson in the <strong>Learn tab</strong>.</em>`;
    }
    // Fuzzy match — find partial matches
    const keys = Object.keys(FOREX_GLOSSARY);
    const partial = keys.find(k => k.includes(term) || term.includes(k));
    if (partial) {
      return `<strong>${partial.charAt(0).toUpperCase() + partial.slice(1)}</strong><br><br>${FOREX_GLOSSARY[partial]}<br><br><em>This is from the TradeBaby Forex Glossary — 200+ definitions available.</em>`;
    }
  }

  // Check SETUP_DATABASE for setup-related questions
  if ((q.includes('setup') || q.includes('strategy') || q.includes('entry')) && typeof SETUP_DATABASE !== 'undefined') {
    const matchedSetup = SETUP_DATABASE.find(s =>
      s.name.toLowerCase().split(' ').some(word => word.length > 4 && q.includes(word))
    );
    if (matchedSetup) {
      return `<strong>${matchedSetup.name}</strong><br><br>
📊 Win Rate: <strong>${matchedSetup.winRate}</strong> · R:R: <strong>${matchedSetup.riskReward}</strong> · Difficulty: ${'★'.repeat(matchedSetup.difficulty)}<br>
📈 Best pairs: ${matchedSetup.pairs.join(', ')}<br>
⏱ Timeframe: ${matchedSetup.timeframe}<br><br>
<strong>Prerequisites:</strong><br>
${matchedSetup.prerequisites.map(p => `• ${p}`).join('<br>')}<br><br>
<strong>Entry Rules:</strong><br>
${matchedSetup.entryRules.map(r => `• ${r}`).join('<br>')}<br><br>
🛑 <strong>SL:</strong> ${matchedSetup.stopLoss}<br>
🎯 <strong>TP:</strong> ${matchedSetup.takeProfit}<br><br>
<em>${matchedSetup.notes}</em>`;
    }
  }

  // Fall through to base response
  return _baseGenerateResponse(input);
}
