/* ═══════════════════════════════════════════════════════════════
   PIPSTART — TRADE CASE STUDIES
   10 winning + 10 losing real-world trade analyses
   Fully offline — static data
   ═══════════════════════════════════════════════════════════════ */
const CASE_STUDIES = [
  /* ── WINNING TRADES ── */
  {
    id:'win-001', type:'win', grade:'A+',
    title:'EUR/USD London Breakout',
    pair:'EUR/USD', direction:'BUY', tf:'H1', setup:'London Open Breakout',
    entry:1.0812, sl:1.0782, tp:1.0888, pips:76, rr:'2.5:1',
    date:'2024-03-14',
    story:`Price had been consolidating in a 40-pip range during the Asian session. At 08:05 UTC London open, a strong bullish engulfing candle closed above the Asian high with above-average volume. The key confirmation: D1 trend was bullish (HH/HL intact), and the 1.0800 level had held as support three times in the prior 2 weeks.`,
    execution:`Entered at the close of the breakout candle. Stop placed 5 pips below the Asian range low. Target was the prior week's high. Held the trade for 18 hours through a small pullback to the breakout level, which held perfectly.`,
    lessons:['London open breakouts aligned with D1 trend are high probability','Let the candle close confirm before entering — the wick before close was deceptive','The pullback to the breakout level was an opportunity to add, not a reason to exit'],
    mistakes:'None — textbook execution.',
    svg:`<svg viewBox="0 0 280 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;border-radius:8px">
      <rect width="280" height="120" fill="#1E222D"/>
      <line x1="10" y1="100" x2="270" y2="100" stroke="#363A4A" stroke-width="0.5"/>
      <line x1="10" y1="20" x2="10" y2="100" stroke="#363A4A" stroke-width="0.5"/>
      <!-- candles consolidation -->
      ${[0,1,2,3,4,5,6,7].map(i=>`<rect x="${20+i*18}" y="55" width="8" height="${5+Math.random()*15|0}" fill="${Math.random()>0.5?'#26A69A':'#EF5350'}"/>`).join('')}
      <!-- breakout candle -->
      <rect x="164" y="35" width="10" height="30" fill="#26A69A"/>
      <line x1="169" y1="28" x2="169" y2="35" stroke="#26A69A" stroke-width="1.5"/>
      <line x1="169" y1="65" x2="169" y2="70" stroke="#26A69A" stroke-width="1.5"/>
      <!-- continuation -->
      <rect x="178" y="30" width="8" height="22" fill="#26A69A"/>
      <rect x="190" y="38" width="8" height="18" fill="#EF5350"/>
      <rect x="202" y="32" width="8" height="20" fill="#26A69A"/>
      <rect x="214" y="25" width="8" height="25" fill="#26A69A"/>
      <!-- entry line -->
      <line x1="160" y1="58" x2="270" y2="58" stroke="#26A69A" stroke-dasharray="3,2" stroke-width="1"/>
      <text x="232" y="55" fill="#26A69A" font-size="8" font-family="monospace">ENTRY 1.0812</text>
      <!-- sl line -->
      <line x1="160" y1="78" x2="270" y2="78" stroke="#EF5350" stroke-dasharray="3,2" stroke-width="1"/>
      <text x="240" y="75" fill="#EF5350" font-size="8" font-family="monospace">SL</text>
      <!-- tp line -->
      <line x1="160" y1="18" x2="270" y2="18" stroke="#FFD700" stroke-dasharray="3,2" stroke-width="1"/>
      <text x="242" y="15" fill="#FFD700" font-size="8" font-family="monospace">TP ✓</text>
      <text x="12" y="15" fill="#D1D4DC" font-size="9" font-family="monospace">EUR/USD H1 — London Breakout</text>
    </svg>`
  },
  {
    id:'win-002', type:'win', grade:'A',
    title:'GBP/USD Support Bounce',
    pair:'GBP/USD', direction:'BUY', tf:'H4', setup:'S&R Bounce + RSI Divergence',
    entry:1.2645, sl:1.2595, tp:1.2795, pips:150, rr:'3:1',
    date:'2024-02-28',
    story:`GBP/USD had been declining for 6 days, dropping 280 pips. Price reached the major 1.2600 support level — a zone that had held 4 times in the prior 3 months. On the H4 chart, RSI formed a bullish divergence: price made a lower low but RSI made a higher low, signaling weakening bearish momentum.`,
    execution:`Waited for a bullish confirmation candle on H4. A hammer formed with a lower wick touching 1.2590. Entered the next candle open. Stop placed below the wick low. Trade reached TP in 3 days.`,
    lessons:['Divergence at a key level provides double confirmation','High-timeframe S&R (H4/D1) bounces have better probability than short-TF setups','Patience to wait for confirmation candle prevented a premature entry at 1.2620'],
    mistakes:'Could have entered earlier on the H1 confirmation, capturing an extra 25 pips.',
  },
  {
    id:'win-003', type:'win', grade:'A',
    title:'XAU/USD SMC Order Block Buy',
    pair:'XAU/USD', direction:'BUY', tf:'H1', setup:'SMC Order Block + FVG',
    entry:2285.50, sl:2271.00, tp:2342.00, pips:565, rr:'3.9:1',
    date:'2024-04-03',
    story:`Gold had made a strong bullish impulse from 2200 to 2330, then pulled back sharply. On H4, there was a clear Order Block at the 2280-2290 zone (last bearish candles before the major impulse). Price returned to this zone and formed a Fair Value Gap on H1. D1 trend was strongly bullish.`,
    execution:`Entered at the OB midpoint when price filled the FVG and produced a bullish pin bar. Stop below the OB low. Target was the prior high. Trade ran for 2 days.`,
    lessons:['SMC OB + FVG confluence gives extremely high-probability entries on Gold','Gold requires wider stops (in pips) but the larger pip value compensates','D1 trend alignment is non-negotiable for Gold — it trends powerfully'],
    mistakes:'Position size was slightly too large given Gold volatility — should have reduced by 20%.',
  },
  {
    id:'win-004', type:'win', grade:'B+',
    title:'USD/JPY Trend Continuation',
    pair:'USD/JPY', direction:'BUY', tf:'H4', setup:'EMA Pullback in Trend',
    entry:149.45, sl:148.90, tp:151.20, pips:175, rr:'3.2:1',
    date:'2024-01-18',
    story:`USD/JPY had been in a clear weekly uptrend. Price pulled back to the EMA 21 on H4, which coincided with a prior resistance level turned support around 149.30-149.50. The pullback formed three consecutive smaller bearish candles, showing weakening selling pressure.`,
    execution:`Entered on a bullish engulfing that formed on the EMA 21. Stop below the swing low. Target was the recent high.`,
    lessons:['EMA pullbacks in established trends are consistent setups','Three small bearish candles on the pullback showed sellers were weakening','The resistance-turned-support added confluence to the EMA level'],
    mistakes:'None significant. Slightly conservative target — price continued 80 more pips after TP.',
  },
  {
    id:'win-005', type:'win', grade:'A',
    title:'EUR/GBP Range Trade',
    pair:'EUR/GBP', direction:'SELL', tf:'H1', setup:'Range Resistance Rejection',
    entry:0.8568, sl:0.8590, tp:0.8510, pips:58, rr:'2.6:1',
    date:'2024-03-22',
    story:`EUR/GBP had been ranging between 0.8510 and 0.8570 for 12 days. Price returned to the top of the range and formed a bearish shooting star on H1 exactly at 0.8568 resistance. RSI was above 65 at the time.`,
    execution:`Shorted the shooting star close. Stop above the wick high. Target was range support. Trade completed in 14 hours.`,
    lessons:['Ranging markets reward range trading — fighting the range is a losing battle','Shooting star at established resistance with RSI confirmation = quality entry','Short timeframe works well for range trades — less drawdown, faster completion'],
    mistakes:'',
  },
  /* ── LOSING TRADES — what went wrong ── */
  {
    id:'loss-001', type:'loss', grade:'F',
    title:'The Revenge Trade',
    pair:'EUR/USD', direction:'BUY', tf:'M15', setup:'None — emotional entry',
    entry:1.0894, sl:'None set', tp:'None set', pips:-85, rr:'N/A',
    date:'2024-02-12',
    story:`After a legitimate -30 pip loss on a morning trade, the trader immediately entered a new EUR/USD long with double the normal position size, no analysis, no stop loss, at 14:23 UTC — 20 minutes before a US inflation print was due. Price gapped 85 pips down on the CPI release.`,
    execution:`No plan. Entered to recover the previous loss. No stop loss set. Held through the news event hoping for a reversal. Eventually panic-closed at -85 pips, losing 3× the original loss.`,
    lessons:['Never trade within 30 minutes of major news without a specific strategy','Always set a stop loss — especially during news events when spreads spike','The 3-loss rule: after any significant loss, step away. Never double down.','This single revenge trade wiped out 3 days of profitable trading'],
    mistakes:'Broke every rule: no plan, no SL, wrong size, traded into news, emotional state.',
    warning:true,
  },
  {
    id:'loss-002', type:'loss', grade:'D',
    title:'Counter-Trend Trade',
    pair:'GBP/JPY', direction:'BUY', tf:'H1', setup:'Trying to catch the bottom',
    entry:188.40, sl:187.80, tp:189.50, pips:-60, rr:'-',
    date:'2024-03-05',
    story:`GBP/JPY had fallen 320 pips over 4 days. The trader decided it had fallen "too far" and tried to buy the bottom. The D1 trend was clearly bearish. There was no technical confirmation of a reversal — just the feeling that it had fallen enough.`,
    execution:`Entered on a small H1 bounce after 3 red candles. Stop 60 pips below. Price continued falling another 180 pips over the next 2 days, stopping out first.`,
    lessons:["'It's fallen too much' is not a trading strategy — trend continuation is statistically more probable than reversal",'Always trade WITH the higher timeframe trend, not against it','Catching falling knives is the fastest way to blow accounts','Wait for reversal confirmation (CHOCH, double bottom, divergence) — never guess'],
    mistakes:'No technical basis. Traded against clear D1 bearish trend. Confirmed: never predict, only react.',
    warning:true,
  },
  {
    id:'loss-003', type:'loss', grade:'D+',
    title:'Moved the Stop Loss',
    pair:'USD/CHF', direction:'SELL', tf:'H4', setup:'Bearish engulfing at resistance',
    entry:0.8945, sl:0.8975, tp:0.8865, pips:-65, rr:'-',
    date:'2024-01-30',
    story:`Legitimate short entry at resistance with a well-placed stop. However, when price moved against the position and the stop was 5 pips away, the trader moved the stop 35 pips further to "give it more room."`,
    execution:`Original stop was at 0.8975. When price hit 0.8970, the trader moved the stop to 0.9010. Price continued up and stopped out for -65 pips instead of -30 pips.`,
    lessons:['Your original stop was placed when you were thinking clearly. Moving it is emotional decision-making','The purpose of a stop loss is to define your risk BEFORE emotion becomes involved','If a trade reaches your stop, it has proved your original thesis wrong — accept it','Moving stops further away is the #1 account-destroying habit of losing traders'],
    mistakes:'Moved the stop loss. The original 30-pip stop was correctly placed — the loss would have been half.',
    warning:true,
  },
  {
    id:'loss-004', type:'loss', grade:'C-',
    title:'Overtraded After a Win',
    pair:'Multiple', direction:'MIXED', tf:'M15', setup:'Overconfidence after winning streak',
    entry:'N/A', sl:'N/A', tp:'N/A', pips:-120, rr:'-',
    date:'2024-04-08',
    story:`After a 5-trade winning streak generating $180 profit, the trader opened 7 trades in a single day — 4× their normal frequency. They were trading setups that didn't fully meet their rules, on pairs they didn't specialise in, with oversized positions. Net result: -$120 in one day.`,
    execution:`Each individual trade had some basis, but the frequency, size, and quality all deteriorated. Three trades were opened out of FOMO, not genuine setups.`,
    lessons:['Winning streaks create overconfidence — the most dangerous emotional state in trading','Quality over quantity: 2 good trades beat 8 mediocre ones','Stick to your daily trade limit (usually 2-3 maximum)','After a big win day, trade SMALLER the next day, not larger'],
    mistakes:'Overtraded, oversized, traded outside speciality pairs, broke all three quality rules.',
    warning:true,
  },
  {
    id:'loss-005', type:'loss', grade:'C',
    title:'Good Setup, Wrong Timing',
    pair:'EUR/USD', direction:'BUY', tf:'H1', setup:'S&R Bounce (pre-NFP)',
    entry:1.0778, sl:1.0748, tp:1.0858, pips:-30, rr:'-',
    date:'2024-05-03',
    story:`A technically valid bullish setup at a key support level. The trade was entered at 12:30 UTC on the first Friday of the month — 30 minutes before the US Non-Farm Payrolls release. NFP came in much stronger than expected, dollar surged, and the trade was stopped out in 4 minutes.`,
    execution:`The setup was correct. The timing was completely wrong. A simple check of the economic calendar would have revealed the NFP risk.`,
    lessons:['Always check the economic calendar BEFORE entering any trade','NFP (first Friday of month), FOMC (8× per year), and CPI releases can move price 100-200 pips instantly','If you like the setup, wait until 30 minutes after the news — then enter on the confirmed direction','The setup was A-grade. The execution was F-grade due to news blindness'],
    mistakes:'Entered 30 minutes before NFP without checking the calendar. Setup was fine; timing was catastrophic.',
  },
];
