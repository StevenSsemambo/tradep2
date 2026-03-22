/* ═══════════════════════════════════════════════════════════════
   TRADEBABY PRO v10 — MT5-STYLE TRADING TERMINAL
   Complete rewrite: MT5 dark green/black aesthetic,
   full chart engine, drawing tools, trade history panel,
   haptic feedback, session-aware volatility
   ═══════════════════════════════════════════════════════════════ */

/* ── STATE ────────────────────────────────────────────────── */
let _simCurrentPair  = 'EUR/USD';
let _simCurrentPrice = 1.0847;
let _simOpenTrade    = null;
let _simTodayTrades  = [];   // session closed trades for history strip
let _termPriceInterval = null;

let _chartTF      = 'M5';
let _chartOffset  = 0;
let _chartZoom    = 1.0;
let _chartCandles = {};
let _chartIndicators = { ema20:true, ema50:true, ema200:false, bb:false, vwap:false, rsi:false, macd:false, sr:true };
let _chartIsDragging   = false;
let _chartDragStartX   = 0;
let _chartDragStartOff = 0;
let _chartMouseX = -1;
let _chartMouseY = -1;
let _chartZoomPivot = 0;

/* Drawing tool state */
let _drawMode  = false;   // 'hline' | 'trendline' | false
let _drawLines = [];      // { type, p1, p2, color }
let _drawStart = null;    // canvas coords while drawing

let _historyOpen = false;  // trade history strip collapsed/open

const TRADE_PAIRS = [
  'EUR/USD','GBP/USD','USD/JPY','AUD/USD','USD/CHF','USD/CAD',
  'GBP/JPY','EUR/JPY','NZD/USD','EUR/GBP','XAU/USD','NAS100','SPX500','US30'
];

const TF_CANDLE_COUNT = { M1:200, M5:150, M15:120, H1:100, H4:80, D1:60 };

/* Real-time duration for each candle (in ms) — controls how long a candle forms */
const TF_REAL_MS = { M1:12000, M5:20000, M15:35000, H1:55000, H4:80000, D1:110000 };
let _candleFormingStart = Date.now();

/* Session-aware volatility — higher during London/NY overlap */
function getSessionVol(tf) {
  const hr = new Date().getUTCHours();
  const inSession = (hr >= 7 && hr <= 17); // London + NY
  const overlap   = (hr >= 12 && hr <= 16);
  const base = { M1:0.00020, M5:0.00050, M15:0.00100, H1:0.00200, H4:0.00400, D1:0.00800 }[tf] || 0.001;
  const mult = _simCurrentPair.includes('JPY') ? 100 :
               _simCurrentPair.includes('XAU') ? 0.3 :
               (_simCurrentPair.includes('NAS')||_simCurrentPair.includes('SPX')||_simCurrentPair.includes('US30')) ? 5 : 1;
  return base * mult * (overlap ? 1.8 : inSession ? 1.3 : 0.7);
}

/* ── HAPTIC ──────────────────────────────────────────────── */
function haptic(ms = 40) {
  try { if (navigator.vibrate) navigator.vibrate(ms); } catch(e) {}
}

/* ═══════════════════════════════════════════════════════════
   RENDER
   ═══════════════════════════════════════════════════════════ */
function renderTrade() {
  /* MT5-style colour palette — dark green/black charting environment */
  return `<div id="mt5-wrap" style="display:flex;flex-direction:column;height:calc(100dvh - var(--total-nav,62px) - env(safe-area-inset-bottom,0px));background:#1E222D;overflow:hidden;color:#D1D4DC;max-height:calc(100dvh - var(--total-nav,62px))">

    <!-- ══ HEADER BAR ══ -->
    <div style="flex-shrink:0;padding:6px 8px;border-bottom:1px solid #1E2130;display:flex;align-items:center;gap:6px;background:#262B3E">
      <!-- Pair -->
      <select id="tp-pair" onchange="terminalChangePair(this.value)"
        style="background:#1C1F2B;border:1px solid #363A4A;border-radius:4px;padding:5px 8px;font-family:'JetBrains Mono',monospace;font-weight:700;font-size:13px;color:#D1D4DC;cursor:pointer;flex-shrink:0;min-width:88px">
        ${TRADE_PAIRS.map(p=>`<option value="${p}" ${p===_simCurrentPair?'selected':''}>${p}</option>`).join('')}
      </select>

      <!-- Price -->
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:baseline;gap:5px">
          <span id="term-price" style="font-family:'JetBrains Mono',monospace;font-weight:700;font-size:19px;color:#D1D4DC">${_simCurrentPrice.toFixed(_simCurrentPair.includes('JPY')?3:4)}</span>
          <span id="term-change" style="font-size:11px;color:#26A69A">+0.00%</span>
        </div>
        <div style="display:flex;align-items:center;gap:4px">
          <span style="width:6px;height:6px;border-radius:50%;background:#26A69A;display:inline-block;animation:pulse 2s ease infinite"></span>
          <span style="font-size:9px;color:#787B86;font-family:monospace">SIM · ${new Date().toUTCString().split(' ')[4]} UTC</span>
        </div>
      </div>

      <!-- Timeframes -->
      <div style="display:flex;gap:2px;flex-shrink:0">
        ${['M1','M5','M15','H1','H4','D1'].map(tf=>`
          <button onclick="terminalSetTF('${tf}')" id="tf-${tf}"
            style="padding:4px 7px;border-radius:3px;font-size:10px;font-weight:700;font-family:monospace;cursor:pointer;transition:all .1s;border:1px solid ${_chartTF===tf?'#2962FF':'#363A4A'};background:${_chartTF===tf?'#2962FF':'#1C1F2B'};color:${_chartTF===tf?'#fff':'#787B86'}">
            ${tf}
          </button>`).join('')}
      </div>

      <!-- Draw tools -->
      <div style="display:flex;gap:2px;flex-shrink:0">
        <button id="draw-hline-btn" onclick="toggleDrawTool('hline')" title="Horizontal Line"
          style="padding:4px 7px;border-radius:3px;font-size:12px;cursor:pointer;transition:all .1s;border:1px solid ${_drawMode==='hline'?'#F0B90B':'#2A2E3D'};background:${_drawMode==='hline'?'#F0B90B22':'#0F111A'};color:${_drawMode==='hline'?'#F0B90B':'#5D6577'}">—</button>
        <button id="draw-trend-btn" onclick="toggleDrawTool('trendline')" title="Trendline"
          style="padding:4px 7px;border-radius:3px;font-size:12px;cursor:pointer;transition:all .1s;border:1px solid ${_drawMode==='trendline'?'#F0B90B':'#2A2E3D'};background:${_drawMode==='trendline'?'#F0B90B22':'#0F111A'};color:${_drawMode==='trendline'?'#F0B90B':'#5D6577'}">/</button>
        <button onclick="clearDrawLines()" title="Clear drawings"
          style="padding:4px 7px;border-radius:3px;font-size:10px;cursor:pointer;border:1px solid #363A4A;background:#1C1F2B;color:#787B86">✕</button>
      </div>
    </div>

    <!-- ══ CHART AREA ══ -->
    <div style="flex:1;position:relative;overflow:hidden;min-height:0" id="chart-container">
      <canvas id="main-chart" style="display:block;width:100%;height:100%;touch-action:none;cursor:crosshair"></canvas>

      <!-- Indicator value labels (top-left overlay) -->
      <div id="indicator-values" style="position:absolute;top:5px;left:56px;display:flex;flex-wrap:wrap;gap:3px;pointer-events:none">
        <span id="ind-ema20"  style="font-size:9px;color:#2196F3;font-family:monospace;background:rgba(0,0,0,0.65);padding:1px 4px;border-radius:2px"></span>
        <span id="ind-ema50"  style="font-size:9px;color:#9C27B0;font-family:monospace;background:rgba(0,0,0,0.65);padding:1px 4px;border-radius:2px"></span>
        <span id="ind-ema200" style="font-size:9px;color:#FF6D00;font-family:monospace;background:rgba(0,0,0,0.65);padding:1px 4px;border-radius:2px"></span>
        <span id="ind-bb"     style="font-size:9px;color:#4CAF50;font-family:monospace;background:rgba(0,0,0,0.65);padding:1px 4px;border-radius:2px"></span>
        <span id="ind-vwap"   style="font-size:9px;color:#E91E63;font-family:monospace;background:rgba(0,0,0,0.65);padding:1px 4px;border-radius:2px"></span>
      </div>

      <!-- Current price label (right edge) -->
      <div id="price-line-label" style="position:absolute;right:0;font-family:monospace;font-size:10px;padding:2px 5px;border-radius:2px 0 0 2px;pointer-events:none;background:#2962FF;color:#ffffff;font-weight:700"></div>

      <!-- OHLCV crosshair info bar -->
      <div id="crosshair-info" style="position:absolute;top:0;left:0;right:0;background:rgba(19,23,34,0.9);padding:3px 8px;font-size:10px;font-family:monospace;color:#B2B5BE;display:none;pointer-events:none;border-bottom:1px solid #1E2130"></div>
    </div>

    <!-- ══ RSI SUB-CHART ══ -->
    <div id="rsi-panel" style="flex-shrink:0;height:68px;border-top:1px solid #1E2130;background:#1E222D;display:${_chartIndicators.rsi?'block':'none'}">
      <canvas id="rsi-chart" style="width:100%;height:68px;display:block"></canvas>
    </div>

    <!-- ══ MACD SUB-CHART ══ -->
    <div id="macd-panel" style="flex-shrink:0;height:68px;border-top:1px solid #1E2130;background:#1E222D;display:${_chartIndicators.macd?'block':'none'}">
      <canvas id="macd-chart" style="width:100%;height:68px;display:block"></canvas>
    </div>

    <!-- ══ BOTTOM CONTROLS ══ -->
    <div style="flex-shrink:0;background:#262B3E;border-top:1px solid #1E2130">

      <!-- Indicator row -->
      <div style="display:flex;gap:3px;padding:5px 8px;border-bottom:1px solid #1E2130;overflow-x:auto;scrollbar-width:none;align-items:center">
        <span style="font-size:9px;color:#787B86;font-family:monospace;flex-shrink:0">IND:</span>
        ${[
          {key:'ema20', label:'EMA20', col:'#2196F3'},
          {key:'ema50', label:'EMA50', col:'#9C27B0'},
          {key:'ema200',label:'EMA200',col:'#FF6D00'},
          {key:'bb',    label:'BB',    col:'#4CAF50'},
          {key:'vwap',  label:'VWAP',  col:'#E91E63'},
          {key:'rsi',   label:'RSI',   col:'#F44336'},
          {key:'macd',  label:'MACD',  col:'#FFC107'},
          {key:'sr',    label:'S/R',   col:'#9E9E9E'},
        ].map(ind => `
          <button onclick="terminalToggleInd('${ind.key}')" id="indbtn-${ind.key}"
            style="flex-shrink:0;padding:2px 7px;border-radius:2px;font-size:9px;font-weight:700;font-family:monospace;cursor:pointer;transition:all .12s;border:1px solid ${_chartIndicators[ind.key]?ind.col:'#2A2E3D'};background:${_chartIndicators[ind.key]?ind.col+'28':'transparent'};color:${_chartIndicators[ind.key]?ind.col:'#5D6577'}">
            ${ind.label}
          </button>`).join('')}
        <button onclick="terminalResetZoom()" style="flex-shrink:0;padding:2px 7px;border-radius:2px;font-size:9px;font-family:monospace;cursor:pointer;border:1px solid #363A4A;background:transparent;color:#787B86;margin-left:3px">⊞ Fit</button>
        <button onclick="terminalScreenshot()" style="flex-shrink:0;padding:2px 7px;border-radius:2px;font-size:9px;font-family:monospace;cursor:pointer;border:1px solid #363A4A;background:transparent;color:#787B86">📷</button>
      </div>

      <!-- Trade controls: 2 clear rows (inputs + actions) -->
      <!-- ROW 1: Inputs grid -->
      <div style="padding:6px 8px 3px;display:grid;grid-template-columns:1fr 1fr 1fr auto auto;gap:5px;align-items:end">
        <div>
          <div style="font-size:8px;color:#B2B5BE;font-family:monospace;font-weight:700;margin-bottom:2px">LOTS</div>
          <select id="tp-lots" style="width:100%;background:#1C1F2B;border:1px solid #363A4A;border-radius:3px;padding:4px 3px;font-size:11px;color:#D1D4DC;font-family:monospace">
            <option>0.01</option><option>0.05</option><option selected>0.10</option>
            <option>0.25</option><option>0.50</option><option>1.00</option>
          </select>
        </div>
        <div>
          <div style="font-size:8px;color:#EF5350;font-family:monospace;font-weight:700;margin-bottom:2px">SL pips</div>
          <input id="tp-sl" type="number" value="30" min="5" max="500" oninput="updateRiskCalc()"
            style="width:100%;background:#1C1F2B;border:1px solid #EF535044;border-radius:3px;padding:4px 3px;font-size:11px;color:#D1D4DC;font-family:monospace">
        </div>
        <div>
          <div style="font-size:8px;color:#26A69A;font-family:monospace;font-weight:700;margin-bottom:2px">TP pips</div>
          <input id="tp-tp" type="number" value="60" min="5" max="1000" oninput="updateRiskCalc()"
            style="width:100%;background:#1C1F2B;border:1px solid #26A69A44;border-radius:3px;padding:4px 3px;font-size:11px;color:#D1D4DC;font-family:monospace">
        </div>
        <div style="text-align:center;padding:0 4px">
          <div style="font-size:8px;color:#B2B5BE;font-family:monospace;font-weight:700;margin-bottom:2px">R:R</div>
          <span id="risk-reward-display" style="font-size:13px;color:#FFC107;font-family:monospace;font-weight:700;display:block">2:1</span>
        </div>
        <div style="text-align:center;padding:0 4px">
          <div style="font-size:8px;color:#B2B5BE;font-family:monospace;font-weight:700;margin-bottom:2px">RISK</div>
          <span id="risk-pct-display" style="font-size:11px;color:#9E9E9E;font-family:monospace;display:block">1%</span>
        </div>
      </div>
      <!-- ROW 2: Big clear action buttons -->
      <div style="padding:4px 8px 5px;display:flex;gap:6px">
        ${_simOpenTrade ? `
          <div style="display:flex;align-items:center;gap:10px;flex:1;background:#1A1206;border:1px solid #EF535055;border-radius:4px;padding:6px 10px">
            <div>
              <div style="font-size:9px;color:#787B86;font-family:monospace">LIVE P&L</div>
              <span id="live-pnl" style="font-size:16px;font-family:monospace;font-weight:700;color:#B2B5BE">$0.00</span>
            </div>
            <button onclick="haptic(60);closeSimTrade('Manual')"
              style="flex:1;padding:12px 8px;background:#C62828;border:2px solid #EF5350;border-radius:4px;color:#fff;font-family:monospace;font-weight:800;font-size:14px;cursor:pointer;letter-spacing:.5px">
              ■ CLOSE TRADE
            </button>
          </div>` : `
          <button onclick="haptic(35);openSimTrade('BUY')"
            style="flex:1;padding:12px 8px;background:#0A2E1A;border:2px solid #26A69A;border-radius:4px;color:#26A69A;font-family:monospace;font-weight:800;font-size:14px;cursor:pointer;line-height:1.3"
            ontouchstart="this.style.opacity='.75'" ontouchend="this.style.opacity='1'">
            ▲ BUY<br><span style="font-size:10px;opacity:.8;font-weight:400">${(_simCurrentPrice+(_simCurrentPair.includes('JPY')?0.003:0.00012)).toFixed(_simCurrentPair.includes('JPY')?3:4)}</span>
          </button>
          <button onclick="haptic(35);openSimTrade('SELL')"
            style="flex:1;padding:12px 8px;background:#2E0A0A;border:2px solid #EF5350;border-radius:4px;color:#EF5350;font-family:monospace;font-weight:800;font-size:14px;cursor:pointer;line-height:1.3"
            ontouchstart="this.style.opacity='.75'" ontouchend="this.style.opacity='1'">
            ▼ SELL<br><span style="font-size:10px;opacity:.8;font-weight:400">${_simCurrentPrice.toFixed(_simCurrentPair.includes('JPY')?3:4)}</span>
          </button>`}
      </div>

      <!-- Open trade info bar -->
      ${_simOpenTrade ? `
      <div style="padding:3px 8px 5px;display:flex;gap:8px;font-size:10px;font-family:monospace;border-top:1px solid #1E2130;background:#1C1F2B;overflow-x:auto;scrollbar-width:none;white-space:nowrap">
        <span style="color:${_simOpenTrade.dir==='BUY'?'#26A69A':'#EF5350'};font-weight:700">${_simOpenTrade.dir==='BUY'?'▲':'▼'} ${_simCurrentPair} ${_simOpenTrade.lots}</span>
        <span style="color:#787B86">@</span>
        <span style="color:#D1D4DC">${_simOpenTrade.entry.toFixed(4)}</span>
        <span style="color:#787B86">SL:</span><span style="color:#EF5350">${_simOpenTrade.sl.toFixed(4)}</span>
        <span style="color:#787B86">TP:</span><span style="color:#26A69A">${_simOpenTrade.tp.toFixed(4)}</span>
        <span id="open-live-pnl" style="color:#B2B5BE;margin-left:auto">$0.00</span>
      </div>` : ''}

      <!-- Account equity bar -->
      <div style="display:flex;gap:12px;padding:3px 8px 5px;border-top:1px solid #1E2130;font-size:9px;font-family:monospace;color:#787B86">
        <span>Balance: <strong style="color:#D1D4DC">${fmtCurrency(STATE.simBalance)}</strong></span>
        <span>Equity: <strong id="term-equity" style="color:${STATE.simEquity>=STATE.simBalance?'#26A69A':'#EF5350'}">${fmtCurrency(STATE.simEquity)}</strong></span>
        <span>P&L: <strong style="color:${STATE.simEquity-10000>=0?'#26A69A':'#EF5350'}">${STATE.simEquity-10000>=0?'+':''}${fmtCurrency(STATE.simEquity-10000)}</strong></span>
        <button onclick="_historyOpen=!_historyOpen;renderScreen('trade');setTimeout(initTerminal,60)"
          style="margin-left:auto;background:none;border:none;color:#787B86;cursor:pointer;font-family:monospace;font-size:9px">
          ${_historyOpen?'▼':'▲'} History (${_simTodayTrades.length})
        </button>
      </div>

      <!-- Trade history panel (collapsible) -->
      ${_historyOpen ? `
      <div style="max-height:140px;overflow-y:auto;border-top:1px solid #1E2130;background:#0A0D14">
        ${_simTodayTrades.length === 0 ?
          `<div style="padding:12px 8px;text-align:center;font-size:10px;font-family:monospace;color:#787B86">No closed trades this session</div>` :
          `<table style="width:100%;font-size:9px;font-family:monospace;border-collapse:collapse">
            <tr style="color:#787B86;border-bottom:1px solid #1E2130">
              <td style="padding:3px 6px">Pair</td><td>Dir</td><td>Entry</td><td>Exit</td><td>Lots</td><td style="color:#FFC107">P&L</td><td>Reason</td>
            </tr>
            ${_simTodayTrades.slice().reverse().map(t=>`
              <tr style="border-bottom:1px solid #1A1D2A">
                <td style="padding:3px 6px;color:#D1D4DC">${t.pair}</td>
                <td style="color:${t.dir==='BUY'?'#26A69A':'#EF5350'}">${t.dir}</td>
                <td style="color:#B2B5BE">${t.entry}</td>
                <td style="color:#B2B5BE">${t.exit}</td>
                <td style="color:#B2B5BE">${t.lots}</td>
                <td style="color:${t.pnl>=0?'#26A69A':'#EF5350'};font-weight:700">${t.pnl>=0?'+':''}$${Math.abs(t.pnl).toFixed(2)}</td>
                <td style="color:#787B86">${t.reason}</td>
              </tr>`).join('')}
          </table>`}
      </div>` : ''}
    </div>
  </div>`;
}

/* ═══════════════════════════════════════════════════════════
   TERMINAL INIT
   ═══════════════════════════════════════════════════════════ */
function initTerminal() {
  const canvas = document.getElementById('main-chart');
  if (!canvas) return;

  const container = document.getElementById('chart-container');
  if (container) {
    canvas.width  = container.offsetWidth  || 380;
    canvas.height = container.offsetHeight || 260;
  }

  ['rsi-chart','macd-chart'].forEach(id => {
    const c = document.getElementById(id);
    if (c) { c.width = canvas.width; c.height = 68; }
  });

  getChartCandles();
  renderChart();
  updatePriceLabel();

  /* Touch events */
  canvas.addEventListener('touchstart', onChartTouchStart, { passive: false });
  canvas.addEventListener('touchmove',  onChartTouchMove,  { passive: false });
  canvas.addEventListener('touchend',   onChartTouchEnd,   { passive: true  });

  /* Mouse events */
  canvas.addEventListener('mousedown', e => {
    if (_drawMode) { startDraw(e); return; }
    _chartIsDragging   = true;
    _chartDragStartX   = e.clientX;
    _chartDragStartOff = _chartOffset;
    canvas.style.cursor = 'grabbing';
  });
  canvas.addEventListener('mousemove', e => {
    _chartMouseX = e.offsetX; _chartMouseY = e.offsetY;
    if (_drawMode && _drawStart) { updateDraw(e); return; }
    if (_chartIsDragging) {
      const dx  = e.clientX - _chartDragStartX;
      const cds = getChartCandles();
      const visCount = Math.max(10, Math.floor(50 * _chartZoom));
      const cw  = canvas.width / visCount;
      // Drag RIGHT = see older candles (past). Drag LEFT = see newer candles.
      const newOff = _chartDragStartOff + Math.round(dx / cw);
      _chartOffset = Math.max(0, Math.min(Math.max(0, cds.length - visCount), newOff));
      renderChart();
    } else {
      renderChartCrosshair(e.offsetX, e.offsetY);
    }
  });
  canvas.addEventListener('mouseup', () => { _chartIsDragging = false; canvas.style.cursor = 'crosshair'; if (_drawMode && _drawStart) finishDraw(); });
  canvas.addEventListener('mouseleave', () => { _chartIsDragging = false; _chartMouseX = -1; renderChart(); });
  canvas.addEventListener('wheel', e => {
    e.preventDefault();
    const pivot = e.offsetX / canvas.width;
    _chartZoomPivot = pivot;
    _chartZoom = Math.max(0.25, Math.min(4, _chartZoom * (e.deltaY > 0 ? 1.12 : 0.89)));
    renderChart();
  }, { passive: false });

  /* Price tick */
  if (_termPriceInterval) clearInterval(_termPriceInterval);
  _termPriceInterval = setInterval(terminalPriceTick, 500);
}

/* ── TOUCH ───────────────────────────────────────────────── */
let _touchStartX = 0, _touchStartOff = 0, _touchStartZoom = 1, _touch2Dist = 0;

function onChartTouchStart(e) {
  e.preventDefault();
  if (e.touches.length === 1) {
    _touchStartX   = e.touches[0].clientX;
    _touchStartOff = _chartOffset;
    _chartIsDragging = true;
    if (_drawMode) { startDrawTouch(e.touches[0]); }
  } else if (e.touches.length === 2) {
    _chartIsDragging = false;
    _touch2Dist    = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
    _touchStartZoom = _chartZoom;
  }
}
function onChartTouchMove(e) {
  e.preventDefault();
  if (e.touches.length === 1 && _chartIsDragging) {
    if (_drawMode && _drawStart) { updateDrawTouch(e.touches[0]); return; }
    const dx = e.touches[0].clientX - _touchStartX;
    const canvas = document.getElementById('main-chart');
    if (!canvas) return;
    const cds = getChartCandles();
    const visCount = Math.max(10, Math.floor(50 * _chartZoom));
    const cw = canvas.width / visCount;
    // Drag RIGHT = see older candles. MT5 convention.
    const newOff = _touchStartOff + Math.round(dx / cw);
    _chartOffset = Math.max(0, Math.min(Math.max(0, cds.length - visCount), newOff));
    renderChart();
  } else if (e.touches.length === 2) {
    const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
    _chartZoom = Math.max(0.25, Math.min(4, _touchStartZoom * (dist / _touch2Dist)));
    renderChart();
  }
}
function onChartTouchEnd(e) { _chartIsDragging = false; if (_drawMode && _drawStart) finishDraw(); }

/* ── DRAW TOOLS ─────────────────────────────────────────── */
function toggleDrawTool(mode) {
  _drawMode = _drawMode === mode ? false : mode;
  const canvas = document.getElementById('main-chart');
  if (canvas) canvas.style.cursor = _drawMode ? 'crosshair' : 'default';
  // update button colors
  ['hline','trendline'].forEach(m => {
    const btn = document.getElementById(`draw-${m==='hline'?'hline':'trend'}-btn`);
    if (!btn) return;
    const active = _drawMode === m;
    btn.style.borderColor = active ? '#F0B90B' : '#2A2E3D';
    btn.style.background  = active ? '#F0B90B22' : '#0F111A';
    btn.style.color       = active ? '#F0B90B' : '#5D6577';
  });
  renderChart();
}

function clearDrawLines() { _drawLines = []; _drawStart = null; renderChart(); }

function _canvasToPrice(y, lo, hi, h, padT, padB) {
  const range = hi - lo || 0.001;
  return lo + (1 - (y - padT) / (h - padT - padB)) * range;
}

function _canvasToIndex(x, padL, plotW, visibleCount) {
  return Math.floor((x - padL) / (plotW / visibleCount));
}

function startDraw(e) {
  const canvas = document.getElementById('main-chart');
  if (!canvas) return;
  _drawStart = { x: e.offsetX, y: e.offsetY };
}
function startDrawTouch(touch) {
  const canvas = document.getElementById('main-chart');
  if (!canvas) return;
  const r = canvas.getBoundingClientRect();
  _drawStart = { x: touch.clientX - r.left, y: touch.clientY - r.top };
}
function updateDraw(e) { _drawStart.x2 = e.offsetX; _drawStart.y2 = e.offsetY; renderChart(); }
function updateDrawTouch(touch) {
  const canvas = document.getElementById('main-chart');
  if (!canvas) return;
  const r = canvas.getBoundingClientRect();
  _drawStart.x2 = touch.clientX - r.left;
  _drawStart.y2 = touch.clientY - r.top;
  renderChart();
}
function finishDraw() {
  if (!_drawStart) return;
  const canvas = document.getElementById('main-chart');
  const candles = getChartCandles();
  const w = canvas.width, h = canvas.height;
  const PAD_L = 52, PAD_T = 12, PAD_B = 20;

  const visible = Math.floor(50 * _chartZoom);
  const startIdx = Math.max(0, candles.length - visible - _chartOffset);
  const endIdx   = Math.max(startIdx + 5, candles.length - _chartOffset);
  const vis = candles.slice(startIdx, endIdx);
  const prices = vis.flatMap(c => [c.high, c.low]);
  let lo = Math.min(...prices), hi = Math.max(...prices);
  const margin = (hi - lo) * 0.08 || 0.001;
  lo -= margin; hi += margin;

  const price1 = _canvasToPrice(_drawStart.y, lo, hi, h, PAD_T, PAD_B);
  const price2 = _drawStart.y2 !== undefined
    ? _canvasToPrice(_drawStart.y2, lo, hi, h, PAD_T, PAD_B) : price1;

  _drawLines.push({
    type: _drawMode,
    p1: { price: price1, x: _drawStart.x },
    p2: { price: price2, x: _drawStart.x2 || _drawStart.x },
    color: '#F0B90B'
  });
  _drawStart = null;
  renderChart();
}

/* ═══════════════════════════════════════════════════════════
   PRICE ENGINE
   ═══════════════════════════════════════════════════════════ */
function getChartCandles() {
  const key = _simCurrentPair + '_' + _chartTF;
  if (!_chartCandles[key]) _chartCandles[key] = generateTFCandles(_simCurrentPrice, _chartTF);
  return _chartCandles[key];
}

function generateTFCandles(basePrice, tf) {
  const count = TF_CANDLE_COUNT[tf] || 100;
  const vol   = getSessionVol(tf);
  const candles = [];
  let price = basePrice * (0.93 + Math.random() * 0.14);
  const trendDir = Math.random() > 0.5 ? 1 : -1;
  let trendStrength = 0.3 + Math.random() * 0.5;

  for (let i = 0; i < count; i++) {
    const progress = i / count;
    /* Occasional trend reversals */
    if (Math.random() < 0.08) trendStrength *= -1;
    const bias  = trendDir * trendStrength * vol * 0.4;
    const open  = price;
    const body  = (Math.random() - 0.47 + bias) * vol;
    const close = Math.max(open + body, basePrice * 0.3);
    const wickH = Math.random() * vol * 0.8;
    const wickL = Math.random() * vol * 0.8;
    const high  = Math.max(open, close) + wickH;
    const low   = Math.min(open, close) - wickL;
    const volume = Math.floor(600 + Math.random() * 5000 + Math.abs(body) * 80000);
    candles.push({ open, high, low, close, volume, bull: close >= open, _sealed: true, time: Date.now() - (count - i) * getTFMs(tf) });
    price = close;
  }
  // Mark last candle as forming (unsealed)
  if (candles.length > 0) candles[candles.length - 1]._sealed = false;
  _candleFormingStart = Date.now();
  return candles;
}

function getTFMs(tf) {
  return { M1:60000, M5:300000, M15:900000, H1:3600000, H4:14400000, D1:86400000 }[tf] || 300000;
}

function terminalChangePair(pair) {
  _simCurrentPair = pair;
  const found = MARKET_DATA.tickers.find(t => t.pair === pair);
  if (found) _simCurrentPrice = found.price;
  _chartCandles = {};
  _chartOffset  = 0;
  _drawLines    = [];
  _candleFormingStart = Date.now();
  renderScreen('trade');
  setTimeout(initTerminal, 80);
}

function terminalSetTF(tf) {
  _chartTF    = tf;
  _chartOffset = 0;
  _candleFormingStart = Date.now();
  ['M1','M5','M15','H1','H4','D1'].forEach(t => {
    const btn = document.getElementById('tf-' + t);
    if (!btn) return;
    const active = t === tf;
    btn.style.border     = `1px solid ${active ? '#2962FF' : '#363A4A'}`;
    btn.style.background = active ? '#2962FF' : '#1C1F2B';
    btn.style.color      = active ? '#ffffff'   : '#787B86';
  });
  renderChart();
}

function terminalToggleInd(key) {
  _chartIndicators[key] = !_chartIndicators[key];
  const rp = document.getElementById('rsi-panel');
  const mp = document.getElementById('macd-panel');
  if (rp) rp.style.display = _chartIndicators.rsi  ? 'block' : 'none';
  if (mp) mp.style.display = _chartIndicators.macd ? 'block' : 'none';
  const colors = { ema20:'#2196F3', ema50:'#9C27B0', ema200:'#FF6D00', bb:'#4CAF50', vwap:'#E91E63', rsi:'#F44336', macd:'#FFC107', sr:'#9E9E9E' };
  const btn = document.getElementById('indbtn-' + key);
  if (btn) {
    const col    = colors[key];
    const active = _chartIndicators[key];
    btn.style.border     = `1px solid ${active ? col : '#2A2E3D'}`;
    btn.style.background = active ? col + '28' : 'transparent';
    btn.style.color      = active ? col : '#5D6577';
  }
  renderChart();
}

function terminalResetZoom() { _chartOffset = 0; _chartZoom = 1.0; _drawLines = []; renderChart(); }

function terminalScreenshot() {
  const canvas = document.getElementById('main-chart');
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = `TradeBaby_${_simCurrentPair}_${_chartTF}_${Date.now()}.png`;
  link.href = canvas.toDataURL();
  link.click();
  showToast('📷 Chart saved!');
}

/* ── PRICE TICK ──────────────────────────────────────────── */
function terminalPriceTick() {
  // Micro tick: very small smooth movement
  const vol   = getSessionVol(_chartTF) * 0.04;
  const drift = (Math.random() - 0.499) * vol;
  _simCurrentPrice = Math.max(_simCurrentPrice + drift, 0.0001);

  const key     = _simCurrentPair + '_' + _chartTF;
  const candles = _chartCandles[key];
  if (!candles || !candles.length) return;

  const last = candles[candles.length - 1];

  // Only the FORMING (last, unsealed) candle gets updated each tick
  if (!last._sealed) {
    last.close  = _simCurrentPrice;
    last.high   = Math.max(last.high,  _simCurrentPrice);
    last.low    = Math.min(last.low,   _simCurrentPrice);
    last.bull   = last.close >= last.open;
    last.volume = (last.volume || 0) + Math.floor(Math.random() * 80 + 20);
  }

  // Check if this candle's time has expired → seal it and start a new one
  const duration = TF_REAL_MS[_chartTF] || 30000;
  if (Date.now() - _candleFormingStart >= duration) {
    last._sealed = true;
    const newOpen = last.close;
    candles.push({
      open: newOpen, high: newOpen, low: newOpen, close: newOpen,
      volume: 0, bull: true, _sealed: false, time: Date.now()
    });
    if (candles.length > TF_CANDLE_COUNT[_chartTF] + 30) {
      candles.shift();
      if (_chartOffset > 0) _chartOffset = Math.max(0, _chartOffset - 1);
    }
    _candleFormingStart = Date.now();
  }

  /* Update price display */
  const tp = document.getElementById('term-price');
  if (tp) tp.textContent = _simCurrentPrice.toFixed(_simCurrentPair.includes('JPY') ? 3 : 4);

  /* Live P&L */
  if (_simOpenTrade) {
    const pm   = _simCurrentPair.includes('JPY') ? 100 :
                 (_simCurrentPair.includes('NAS') || _simCurrentPair.includes('SPX') || _simCurrentPair.includes('US30')) ? 1 :
                 _simCurrentPair.includes('XAU') ? 10 : 10000;
    const pips = (_simOpenTrade.dir === 'BUY'
      ? _simCurrentPrice - _simOpenTrade.entry
      : _simOpenTrade.entry - _simCurrentPrice) * pm;
    const pnl  = parseFloat((pips * _simOpenTrade.lots * 10 * 0.1).toFixed(2));
    const col  = pnl >= 0 ? '#26A69A' : '#EF5350';
    const str  = (pnl >= 0 ? '+' : '') + fmtCurrency(pnl);
    ['live-pnl', 'open-live-pnl'].forEach(id => {
      const e2 = document.getElementById(id);
      if (e2) { e2.textContent = str; e2.style.color = col; }
    });
    /* SL / TP check */
    if (_simOpenTrade.dir === 'BUY') {
      if (_simCurrentPrice <= _simOpenTrade.sl) closeSimTrade('Stop Loss');
      if (_simCurrentPrice >= _simOpenTrade.tp) closeSimTrade('Take Profit');
    } else {
      if (_simCurrentPrice >= _simOpenTrade.sl) closeSimTrade('Stop Loss');
      if (_simCurrentPrice <= _simOpenTrade.tp) closeSimTrade('Take Profit');
    }
  }

  updatePriceLabel();
  renderChart();
}

function updatePriceLabel() {
  const canvas = document.getElementById('main-chart');
  const lbl    = document.getElementById('price-line-label');
  if (!canvas || !lbl) return;
  const candles = getChartCandles();
  if (!candles.length) return;
  const prices = candles.flatMap(c => [c.high, c.low]);
  const lo = Math.min(...prices), hi = Math.max(...prices);
  const range = hi - lo || 0.001;
  const PAD_T = 12, PAD_B = 20;
  const py = canvas.height - PAD_B - ((_simCurrentPrice - lo) / range) * (canvas.height - PAD_T - PAD_B);
  lbl.textContent = _simCurrentPrice.toFixed(_simCurrentPair.includes('JPY') ? 3 : 4);
  lbl.style.top   = Math.max(0, py - 8) + 'px';
}

/* ═══════════════════════════════════════════════════════════
   CHART RENDERER — MT5 AESTHETIC
   ═══════════════════════════════════════════════════════════ */
function calcEMA(candles, period) {
  const k = 2 / (period + 1);
  const ema = [];
  let prev = candles.slice(0, period).reduce((a, c) => a + c.close, 0) / period;
  for (let i = 0; i < candles.length; i++) {
    if (i < period - 1) { ema.push(null); continue; }
    if (i === period - 1) { ema.push(prev); continue; }
    prev = candles[i].close * k + prev * (1 - k);
    ema.push(prev);
  }
  return ema;
}

function calcBB(candles, period = 20, mult = 2) {
  const upper = [], lower = [], mid = [];
  for (let i = 0; i < candles.length; i++) {
    if (i < period - 1) { upper.push(null); lower.push(null); mid.push(null); continue; }
    const sl  = candles.slice(i - period + 1, i + 1).map(c => c.close);
    const m   = sl.reduce((a, b) => a + b, 0) / period;
    const std = Math.sqrt(sl.reduce((a, b) => a + (b - m) ** 2, 0) / period);
    upper.push(m + mult * std); lower.push(m - mult * std); mid.push(m);
  }
  return { upper, lower, mid };
}

function calcRSI(candles, period = 14) {
  const rsi = [];
  for (let i = 0; i < candles.length; i++) {
    if (i < period) { rsi.push(null); continue; }
    const gains = [], losses = [];
    for (let j = i - period + 1; j <= i; j++) {
      const d = candles[j].close - candles[Math.max(0, j - 1)].close;
      if (d > 0) gains.push(d); else losses.push(-d);
    }
    const ag = gains.reduce((a, b) => a + b, 0) / period;
    const al = (losses.reduce((a, b) => a + b, 0) / period) || 0.000001;
    rsi.push(100 - 100 / (1 + ag / al));
  }
  return rsi;
}

function calcVWAP(candles) {
  let cv = 0, cv2 = 0;
  return candles.map(c => {
    const tp = (c.high + c.low + c.close) / 3;
    cv  += tp * (c.volume || 1000);
    cv2 += (c.volume || 1000);
    return cv / cv2;
  });
}

function calcSRLevels(candles) {
  const lvls = [];
  for (let i = 2; i < candles.length - 2; i++) {
    if (candles[i].high > candles[i-1].high && candles[i].high > candles[i-2].high &&
        candles[i].high > candles[i+1].high && candles[i].high > candles[i+2].high)
      lvls.push({ price: candles[i].high, type: 'r' });
    if (candles[i].low < candles[i-1].low && candles[i].low < candles[i-2].low &&
        candles[i].low < candles[i+1].low && candles[i].low < candles[i+2].low)
      lvls.push({ price: candles[i].low, type: 's' });
  }
  const cl = [];
  lvls.forEach(l => {
    const n = cl.find(c => Math.abs(c.price - l.price) < l.price * 0.001);
    if (n) n.strength++; else cl.push({ ...l, strength: 1 });
  });
  return cl.filter(l => l.strength >= 2).slice(-10);
}

function renderChart() {
  const canvas = document.getElementById('main-chart');
  if (!canvas) return;
  const ctx     = canvas.getContext('2d');
  const candles = getChartCandles();
  const w = canvas.width, h = canvas.height;

  /* MT5 dark background */
  ctx.fillStyle = '#1E222D';
  ctx.fillRect(0, 0, w, h);

  /* Visible window */
  const visible  = Math.max(10, Math.floor(50 * _chartZoom));
  const endIdx   = Math.max(0, candles.length - _chartOffset);
  const startIdx = Math.max(0, endIdx - visible);
  const vis      = candles.slice(startIdx, endIdx);
  if (!vis.length) return;
  // Use 'visible' (intended count) for consistent candle width
  const displayCount = visible; // keeps candle width stable even near left edge

  const prices = vis.flatMap(c => [c.high, c.low]);
  let lo = Math.min(...prices), hi = Math.max(...prices);
  const margin = (hi - lo) * 0.10 || 0.001;
  lo -= margin; hi += margin;
  const range = hi - lo || 0.001;

  const PAD_L = 56, PAD_R = 6, PAD_T = 14, PAD_B = 22;
  const plotW = w - PAD_L - PAD_R;
  const plotH = h - PAD_T - PAD_B;

  const sy  = v => PAD_T + (1 - (v - lo) / range) * plotH;
  const cw  = Math.max(1.5, plotW / displayCount - 1);
  const cx  = i => PAD_L + (i + 0.5) * (plotW / displayCount);

  /* ── Grid lines ── */
  const gridColor = 'rgba(255,255,255,0.035)';
  ctx.strokeStyle = gridColor; ctx.lineWidth = 1;
  for (let gi = 0; gi <= 5; gi++) {
    const y     = PAD_T + plotH * (gi / 5);
    const price = hi - range * (gi / 5);
    ctx.beginPath(); ctx.moveTo(PAD_L, y); ctx.lineTo(w - PAD_R, y); ctx.stroke();
    ctx.fillStyle = '#5D6577'; ctx.font = '9px monospace'; ctx.textAlign = 'right';
    ctx.fillText(price.toFixed(_simCurrentPair.includes('JPY') ? 3 : 4), PAD_L - 3, y + 3);
  }
  /* Vertical grid lines */
  const vstep = Math.max(1, Math.floor(vis.length / 6));
  vis.forEach((c, i) => {
    if (i % vstep === 0) {
      const x = cx(i);
      ctx.strokeStyle = gridColor; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x, PAD_T); ctx.lineTo(x, h - PAD_B); ctx.stroke();
      const d = new Date(c.time || Date.now());
      const lbl = _chartTF.startsWith('D')
        ? `${d.getMonth()+1}/${d.getDate()}`
        : `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
      ctx.fillStyle = '#5D6577'; ctx.font = '8px monospace'; ctx.textAlign = 'center';
      ctx.fillText(lbl, x, h - 5);
    }
  });

  /* ── S/R Levels ── */
  if (_chartIndicators.sr) {
    calcSRLevels(vis).forEach(l => {
      const y = sy(l.price);
      if (y < PAD_T || y > h - PAD_B) return;
      ctx.strokeStyle = l.type === 'r' ? 'rgba(239,83,80,0.45)' : 'rgba(38,166,154,0.45)';
      ctx.lineWidth = 1; ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.moveTo(PAD_L, y); ctx.lineTo(w - PAD_R, y); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = l.type === 'r' ? 'rgba(239,83,80,0.8)' : 'rgba(38,166,154,0.8)';
      ctx.font = '8px monospace'; ctx.textAlign = 'left';
      ctx.fillText(l.price.toFixed(4), PAD_L + 3, y - 2);
    });
  }

  /* ── VWAP ── */
  if (_chartIndicators.vwap) {
    const vwap = calcVWAP(vis);
    ctx.strokeStyle = '#E91E63'; ctx.lineWidth = 1.2; ctx.setLineDash([5, 4]);
    ctx.beginPath(); let vStarted = false;
    vwap.forEach((v, i) => {
      if (!v) return;
      const vv = Math.max(lo, Math.min(hi, v));
      if (!vStarted) { ctx.moveTo(cx(i), sy(vv)); vStarted = true; } else ctx.lineTo(cx(i), sy(vv));
    });
    ctx.stroke(); ctx.setLineDash([]);
    const lv = vwap.filter(v => v).pop();
    if (lv) { const indEl = document.getElementById('ind-vwap'); if (indEl) indEl.textContent = `VWAP:${lv.toFixed(4)}`; }
  } else { const e = document.getElementById('ind-vwap'); if (e) e.textContent = ''; }

  /* ── Bollinger Bands ── */
  if (_chartIndicators.bb) {
    const bb = calcBB(vis);
    ctx.fillStyle = 'rgba(76,175,80,0.04)';
    ctx.beginPath();
    bb.upper.forEach((v, i) => { if (v) { i === 0 ? ctx.moveTo(cx(i), sy(v)) : ctx.lineTo(cx(i), sy(v)); } });
    [...bb.lower].reverse().forEach((v, i, a) => { if (v) ctx.lineTo(cx(a.length - 1 - i), sy(v)); });
    ctx.closePath(); ctx.fill();
    [['upper', '#4CAF5088', 1, []], ['lower', '#4CAF5088', 1, []], ['mid', '#4CAF5044', 0.8, [4,3]]].forEach(([k, col, lw, dash]) => {
      ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.setLineDash(dash);
      ctx.beginPath(); let bStarted = false;
      bb[k].forEach((v, i) => { if (v) { const vv = Math.max(lo, Math.min(hi, v)); if (!bStarted) { ctx.moveTo(cx(i), sy(vv)); bStarted = true; } else ctx.lineTo(cx(i), sy(vv)); } });
      ctx.stroke(); ctx.setLineDash([]);
    });
    const ind = document.getElementById('ind-bb'); if (ind) ind.textContent = 'BB(20,2)';
  } else { const e = document.getElementById('ind-bb'); if (e) e.textContent = ''; }

  /* ── EMA Lines ── */
  const emaConfigs = [
    { key:'ema20',  period:20,  color:'#2196F3', width:1.2 },
    { key:'ema50',  period:50,  color:'#9C27B0', width:1.2 },
    { key:'ema200', period:200, color:'#FF6D00', width:1.5 },
  ];
  emaConfigs.forEach(cfg => {
    if (!_chartIndicators[cfg.key]) { const e = document.getElementById('ind-' + cfg.key); if (e) e.textContent = ''; return; }
    const allEMA = calcEMA(candles, cfg.period);
    const visEMA = allEMA.slice(startIdx, endIdx);
    ctx.strokeStyle = cfg.color; ctx.lineWidth = cfg.width;
    ctx.beginPath(); let started = false;
    visEMA.forEach((v, i) => {
      if (v === null) return;
      const vv = Math.max(lo, Math.min(hi, v));
      if (!started) { ctx.moveTo(cx(i), sy(vv)); started = true; } else ctx.lineTo(cx(i), sy(vv));
    });
    ctx.stroke();
    const last = visEMA.filter(v => v !== null).pop();
    if (last) { const e = document.getElementById('ind-' + cfg.key); if (e) e.textContent = `${cfg.key.toUpperCase()}:${last.toFixed(4)}`; }
  });

  /* ── Candles ── */
  vis.forEach((c, i) => {
    const x   = cx(i);
    const bull = c.bull;
    const bodyColor  = bull ? '#26A69A' : '#EF5350';
    const wickColor  = bull ? '#26A69A' : '#EF5350';
    const isLast     = i === vis.length - 1;

    /* Wick */
    ctx.strokeStyle = wickColor; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x, sy(c.high)); ctx.lineTo(x, sy(c.low)); ctx.stroke();

    /* Body */
    const top = Math.min(sy(c.open), sy(c.close));
    const bh  = Math.max(1, Math.abs(sy(c.open) - sy(c.close)));
    if (isLast) { ctx.shadowColor = bodyColor; ctx.shadowBlur = 5; }
    ctx.fillStyle = bodyColor;
    ctx.fillRect(x - cw / 2, top, cw, bh);
    if (isLast) ctx.shadowBlur = 0;

    /* Hollow body for bull candles (MT5 style) */
    if (bull && cw > 3) {
      ctx.fillStyle = '#131722';
      ctx.fillRect(x - cw / 2 + 1, top + 1, cw - 2, Math.max(0, bh - 2));
      ctx.strokeStyle = bodyColor; ctx.lineWidth = 1;
      ctx.strokeRect(x - cw / 2, top, cw, bh);
    }
  });

  /* ── Current price dashed line ── */
  const py = sy(_simCurrentPrice);
  const pInView = py > PAD_T && py < h - PAD_B;
  if (pInView) {
    ctx.strokeStyle = 'rgba(38,166,154,0.7)'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(PAD_L, py); ctx.lineTo(w - PAD_R, py); ctx.stroke();
    ctx.setLineDash([]);
  }

  /* ── Open trade SL/TP/Entry lines ── */
  if (_simOpenTrade) {
    const lines = [
      { price: _simOpenTrade.sl,    color: '#EF5350', label: 'SL',    lw: 1.5 },
      { price: _simOpenTrade.tp,    color: '#26A69A', label: 'TP',    lw: 1.5 },
      { price: _simOpenTrade.entry, color: '#FFC107', label: _simOpenTrade.dir, lw: 1 },
    ];
    lines.forEach(({ price, color, label, lw }) => {
      const y = sy(price);
      if (y < PAD_T - 2 || y > h - PAD_B + 2) return;
      ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.setLineDash([5, 3]);
      ctx.beginPath(); ctx.moveTo(PAD_L, y); ctx.lineTo(w - PAD_R, y); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = color; ctx.font = 'bold 9px monospace'; ctx.textAlign = 'left';
      ctx.fillRect(PAD_L, y - 9, ctx.measureText(label + ' ' + price.toFixed(4)).width + 6, 12);
      ctx.fillStyle = '#131722';
      ctx.fillText(`${label} ${price.toFixed(4)}`, PAD_L + 3, y);
    });
  }

  /* ── User-drawn lines ── */
  _drawLines.forEach(dl => {
    ctx.strokeStyle = dl.color || '#F0B90B'; ctx.lineWidth = 1.5; ctx.setLineDash([]);
    if (dl.type === 'hline') {
      const y = sy(dl.p1.price);
      if (y < 0 || y > h) return;
      ctx.beginPath(); ctx.moveTo(PAD_L, y); ctx.lineTo(w - PAD_R, y); ctx.stroke();
      ctx.fillStyle = dl.color; ctx.font = '9px monospace'; ctx.textAlign = 'right';
      ctx.fillText(dl.p1.price.toFixed(4), w - PAD_R - 2, y - 2);
    } else if (dl.type === 'trendline') {
      ctx.beginPath(); ctx.moveTo(dl.p1.x, sy(dl.p1.price)); ctx.lineTo(dl.p2.x, sy(dl.p2.price)); ctx.stroke();
    }
  });

  /* ── In-progress drawing ── */
  if (_drawMode && _drawStart && _drawStart.x2 !== undefined) {
    ctx.strokeStyle = '#F0B90B'; ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
    if (_drawMode === 'hline') {
      const y = _drawStart.y;
      ctx.beginPath(); ctx.moveTo(PAD_L, y); ctx.lineTo(w - PAD_R, y); ctx.stroke();
    } else {
      ctx.beginPath(); ctx.moveTo(_drawStart.x, _drawStart.y); ctx.lineTo(_drawStart.x2, _drawStart.y2); ctx.stroke();
    }
    ctx.setLineDash([]);
  }

  /* ── Crosshair ── */
  if (_chartMouseX > PAD_L && _chartMouseX < w - PAD_R && _chartMouseY > PAD_T && _chartMouseY < h - PAD_B) {
    ctx.strokeStyle = 'rgba(150,155,175,0.3)'; ctx.lineWidth = 1; ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(_chartMouseX, PAD_T); ctx.lineTo(_chartMouseX, h - PAD_B); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(PAD_L, _chartMouseY); ctx.lineTo(w - PAD_R, _chartMouseY); ctx.stroke();
    const hoverPrice = lo + (1 - (_chartMouseY - PAD_T) / plotH) * range;
    ctx.fillStyle = '#5D6577'; ctx.font = '9px monospace'; ctx.textAlign = 'right';
    ctx.fillText(hoverPrice.toFixed(4), PAD_L - 2, _chartMouseY + 3);
    const ci = document.getElementById('crosshair-info');
    if (ci) {
      ci.style.display = 'block';
      const hIdx = Math.min(Math.max(0, Math.floor((_chartMouseX - PAD_L) / (plotW / vis.length))), vis.length - 1);
      const hc   = vis[hIdx];
      if (hc) {
        const d = new Date(hc.time || Date.now());
        ci.textContent = `${d.toLocaleDateString()} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}  O:${hc.open.toFixed(4)}  H:${hc.high.toFixed(4)}  L:${hc.low.toFixed(4)}  C:${hc.close.toFixed(4)}  Vol:${(hc.volume||0).toLocaleString()}`;
      }
    }
  } else {
    const ci = document.getElementById('crosshair-info'); if (ci) ci.style.display = 'none';
  }

  /* ── RSI sub-chart ── */
  if (_chartIndicators.rsi) _renderRSI(vis, startIdx, endIdx);
  /* ── MACD sub-chart ── */
  if (_chartIndicators.macd) _renderMACD(vis);
}

function _renderRSI(vis, startIdx, endIdx) {
  const rc = document.getElementById('rsi-chart');
  if (!rc) return;
  const rctx = rc.getContext('2d');
  const rsi  = calcRSI(vis);
  rctx.fillStyle = '#1E222D'; rctx.fillRect(0, 0, rc.width, rc.height);
  [20, 30, 50, 70, 80].forEach(l => {
    const y = (1 - l / 100) * rc.height;
    rctx.strokeStyle = l === 30 || l === 70 ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)';
    rctx.lineWidth = 1;
    rctx.beginPath(); rctx.moveTo(0, y); rctx.lineTo(rc.width, y); rctx.stroke();
    rctx.fillStyle = '#5D6577'; rctx.font = '8px monospace'; rctx.textAlign = 'left';
    rctx.fillText(l, 2, y - 1);
  });
  rctx.strokeStyle = '#F44336'; rctx.lineWidth = 1.2; rctx.beginPath(); let rs = false;
  rsi.forEach((v, i) => {
    if (v === null) return;
    const x = (i / vis.length) * rc.width;
    const y = (1 - v / 100) * rc.height;
    if (!rs) { rctx.moveTo(x, y); rs = true; } else rctx.lineTo(x, y);
  });
  rctx.stroke();
  const last = rsi.filter(v => v !== null).pop();
  if (last) {
    const col = last > 70 ? '#EF5350' : last < 30 ? '#26A69A' : '#9598A1';
    rctx.fillStyle = col; rctx.font = 'bold 9px monospace'; rctx.textAlign = 'right';
    rctx.fillText('RSI: ' + last.toFixed(1), rc.width - 3, 11);
  }
}

function _renderMACD(vis) {
  const mc = document.getElementById('macd-chart');
  if (!mc) return;
  const mctx = mc.getContext('2d');
  mctx.fillStyle = '#1E222D'; mctx.fillRect(0, 0, mc.width, mc.height);
  const ema12  = calcEMA(vis, 12);
  const ema26  = calcEMA(vis, 26);
  const macdL  = ema12.map((v, i) => v && ema26[i] ? v - ema26[i] : null);
  const signalL = calcEMA(macdL.map(v => ({ close: v || 0, open: v || 0, high: v || 0, low: v || 0 })), 9);
  const valid   = macdL.filter(v => v !== null);
  const mr      = Math.max(Math.abs(Math.min(...valid)), Math.abs(Math.max(...valid))) || 0.0001;
  const msy     = v => (mc.height / 2) * (1 - v / mr);
  mctx.strokeStyle = 'rgba(255,255,255,0.07)'; mctx.lineWidth = 1;
  mctx.beginPath(); mctx.moveTo(0, mc.height / 2); mctx.lineTo(mc.width, mc.height / 2); mctx.stroke();
  macdL.forEach((v, i) => {
    if (!v) return;
    const x  = (i / macdL.length) * mc.width;
    const bw = Math.max(1, (mc.width / macdL.length) - 1);
    const y  = msy(v), zh = mc.height / 2;
    mctx.fillStyle = v >= 0 ? 'rgba(38,166,154,0.55)' : 'rgba(239,83,80,0.55)';
    mctx.fillRect(x, Math.min(y, zh), bw, Math.abs(y - zh));
  });
  mctx.strokeStyle = '#FFC107'; mctx.lineWidth = 1.2; mctx.beginPath(); let ms = false;
  macdL.forEach((v, i) => {
    if (!v) return;
    const x = (i / macdL.length) * mc.width;
    if (!ms) { mctx.moveTo(x, msy(v)); ms = true; } else mctx.lineTo(x, msy(v));
  });
  mctx.stroke();
  const last = valid.pop();
  if (last) { mctx.fillStyle = '#FFC107'; mctx.font = 'bold 9px monospace'; mctx.textAlign = 'right'; mctx.fillText('MACD: ' + last.toFixed(5), mc.width - 3, 11); }
}

function renderChartCrosshair(mx, my) {
  renderChart();
}

/* ═══════════════════════════════════════════════════════════
   TRADING LOGIC
   ═══════════════════════════════════════════════════════════ */
function updateRiskCalc() {
  const sl = parseFloat(document.getElementById('tp-sl')?.value || 30);
  const tp = parseFloat(document.getElementById('tp-tp')?.value || 60);
  const rr = tp / (sl || 1);
  const rrEl = document.getElementById('risk-reward-display');
  if (rrEl) {
    rrEl.textContent = rr.toFixed(1) + ':1';
    rrEl.style.color = rr >= 2 ? '#26A69A' : rr >= 1.5 ? '#FFC107' : '#EF5350';
  }
  /* Risk % estimate */
  const lots = parseFloat(document.getElementById('tp-lots')?.value || 0.1);
  const pv   = _simCurrentPair.includes('JPY') ? 0.067 : _simCurrentPair.includes('XAU') ? 0.1 : 0.1;
  const riskAmt = sl * lots * pv * 100;
  const riskPct = STATE.simBalance > 0 ? (riskAmt / STATE.simBalance * 100) : 0;
  const rpEl = document.getElementById('risk-pct-display');
  if (rpEl) {
    rpEl.textContent = riskPct.toFixed(1) + '%';
    rpEl.style.color = riskPct <= 1 ? '#26A69A' : riskPct <= 2 ? '#FFC107' : '#EF5350';
  }
}

function openSimTrade(dir) {
  haptic(dir === 'BUY' ? 40 : 40);
  if (typeof SOUNDS !== 'undefined') SOUNDS.play(dir === 'BUY' ? 'tradeBuy' : 'tradeSell');
  if (_simOpenTrade) { showToast('⚠️ Close existing position first'); return; }
  const lots  = parseFloat(document.getElementById('tp-lots')?.value || '0.10');
  const slPip = parseInt(document.getElementById('tp-sl')?.value   || '30');
  const tpPip = parseInt(document.getElementById('tp-tp')?.value   || '60');
  const pm    = _simCurrentPair.includes('JPY')   ? 0.01  :
                _simCurrentPair.includes('XAU')   ? 0.1   :
                (_simCurrentPair.includes('NAS') || _simCurrentPair.includes('SPX') || _simCurrentPair.includes('US30')) ? 1 : 0.0001;
  _simOpenTrade = {
    pair: _simCurrentPair, dir, entry: _simCurrentPrice, lots,
    sl: dir === 'BUY' ? _simCurrentPrice - slPip * pm : _simCurrentPrice + slPip * pm,
    tp: dir === 'BUY' ? _simCurrentPrice + tpPip * pm : _simCurrentPrice - tpPip * pm,
    time: new Date().toISOString()
  };
  showToast(`${dir === 'BUY' ? '▲' : '▼'} ${dir} ${_simCurrentPair} @ ${_simCurrentPrice.toFixed(4)}`);
  addXP(5);
  if (typeof BEHAVIOR !== 'undefined') BEHAVIOR.log('sim_trade', { pair: _simCurrentPair, dir });
  navigate('trade');
}

function closeSimTrade(reason = 'Manual') {
  if (!_simOpenTrade) return;
  haptic(60);
  const pm   = _simCurrentPair.includes('JPY') ? 100 :
               (_simCurrentPair.includes('NAS') || _simCurrentPair.includes('SPX') || _simCurrentPair.includes('US30')) ? 1 :
               _simCurrentPair.includes('XAU') ? 10 : 10000;
  const pips = (_simOpenTrade.dir === 'BUY'
    ? _simCurrentPrice - _simOpenTrade.entry
    : _simOpenTrade.entry - _simCurrentPrice) * pm;
  const pnl  = parseFloat((pips * _simOpenTrade.lots * 10 * 0.1).toFixed(2));

  const closedTrade = {
    pair:  _simOpenTrade.pair,  dir:   _simOpenTrade.dir,
    entry: _simOpenTrade.entry.toFixed(4), exit: _simCurrentPrice.toFixed(4),
    lots:  _simOpenTrade.lots,  pnl,   reason,
    time:  new Date().toISOString()
  };

  STATE.simTrades.push(closedTrade);
  _simTodayTrades.push(closedTrade);
  STATE.simEquity = parseFloat((STATE.simEquity + pnl).toFixed(2));
  _simOpenTrade   = null;

  addXP(pnl >= 0 ? 20 : 10);
  if (typeof SOUNDS !== 'undefined') SOUNDS.play(pnl >= 0 ? 'tradeWin' : 'tradeLoss');
  saveState();

  if (pnl >= 0) {
    showToast(`✅ ${reason}: +${fmtCurrency(pnl)} 🎉`);
    if (pnl > 50) setTimeout(launchConfetti, 200);
  } else {
    showToast(`❌ ${reason}: ${fmtCurrency(pnl)}`);
  }

  // AI post-mortem — fires after a short delay so the toast shows first
  setTimeout(() => {
    if (typeof showTradePostMortem === 'function') showTradePostMortem(closedTrade);
  }, 800);

  // Proactive check — warn if this creates a loss streak
  setTimeout(() => {
    if (typeof getProactiveAlert === 'function') {
      const alert = getProactiveAlert();
      if (alert && alert.severity === 'critical' && typeof showProactiveModal === 'function') {
        showProactiveModal(alert);
      }
    }
  }, 1500);

  navigate('trade');
}

/* Legacy compat stubs */
function generateCandleData(seed, count) { return generateTFCandles(seed || 1.0847, 'M5').slice(-count); }
function initSimChart() { setTimeout(initTerminal, 50); }
function drawCandleChart() {}
function tickPrice() { const v = getSessionVol('M5') * 0.2; _simCurrentPrice = Math.max(_simCurrentPrice + (Math.random() - 0.49) * v, 0.01); return _simCurrentPrice; }
function updateSimPair(p) { terminalChangePair(p); }
function showTradeHelp() {
  showModal(`<div class="modal-handle"></div>
    <div style="font-family:var(--display);font-weight:800;font-size:18px;margin-bottom:4px">Practice Terminal Guide</div>
    <p style="font-size:13px;color:var(--txt2);margin-bottom:14px">100% risk-free simulation. Real market mechanics, zero real money.</p>
    <div style="display:flex;flex-direction:column;gap:8px;font-size:13px;color:var(--txt2)">
      <div>1️⃣ <strong style="color:var(--txt)">Select pair</strong> — 14 instruments</div>
      <div>2️⃣ <strong style="color:var(--txt)">Set lot size</strong> — start 0.01</div>
      <div>3️⃣ <strong style="color:var(--txt)">Set SL pips</strong> — your maximum loss</div>
      <div>4️⃣ <strong style="color:var(--txt)">Set TP pips</strong> — your profit target</div>
      <div>5️⃣ <strong style="color:var(--txt)">BUY ▲ or SELL ▼</strong></div>
      <div>6️⃣ <strong style="color:var(--txt)">— or —</strong> Use drawing tools: — for horizontal lines, / for trendlines</div>
    </div>
    <div style="margin-top:12px;padding:10px;background:var(--accent-bg);border:1px solid var(--bdr);border-radius:var(--rs)">
      <div style="font-size:12px;color:var(--txt2)"><strong style="color:var(--accent)">💡 MT5 controls:</strong> Drag to pan · Pinch/scroll to zoom · — button for horizontal lines · / for trendlines · ✕ clears drawings</div>
    </div>
    <button class="btn btn-gold" style="margin-top:14px" onclick="closeModal()">Got it!</button>`);
}
