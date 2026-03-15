/* ═══════════════════════════════════════════
   TRADE / PRACTICE SCREEN
   ═══════════════════════════════════════════ */

let _tradeTab = 'trade';
let _simCandles = [];
let _simCurrentPair = 'EUR/USD';
let _simCurrentPrice = 1.0847;
let _simOpenTrade = null;

const TRADE_PAIRS = [
  'EUR/USD','GBP/USD','USD/JPY','AUD/USD','USD/CHF','USD/CAD',
  'GBP/JPY','EUR/JPY','NZD/USD','EUR/GBP','XAU/USD','NAS100','SPX500','US30'
];

function renderTrade() {
  return `<div style="display:flex;flex-direction:column;height:calc(100vh - var(--total-nav));background:var(--bg);overflow:hidden">

    <!-- HEADER BAR -->
    <div style="flex-shrink:0;padding:8px 10px;border-bottom:1px solid var(--bdr2);display:flex;align-items:center;gap:6px;background:var(--bg2)">
      <!-- Pair selector -->
      <select id="tp-pair" onchange="terminalChangePair(this.value)" style="background:var(--bg3);border:1px solid var(--bdr2);border-radius:var(--rs);padding:6px 8px;font-family:var(--display);font-weight:700;font-size:13px;color:var(--txt);flex-shrink:0;cursor:pointer">
        ${TRADE_PAIRS.map(p=>`<option value="${p}" ${p===_simCurrentPair?'selected':''}>${p}</option>`).join('')}
      </select>
      <!-- Price display -->
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:baseline;gap:4px">
          <span id="term-price" style="font-family:var(--mono);font-weight:700;font-size:18px;color:var(--txt)">${_simCurrentPrice.toFixed(4)}</span>
          <span id="term-change" style="font-size:11px;color:var(--green)">+0.00%</span>
        </div>
        <div style="display:flex;align-items:center;gap:4px;margin-top:1px">
          <span class="live-dot" style="width:5px;height:5px"></span>
          <span style="font-size:10px;color:var(--txt3)">LIVE SIM</span>
        </div>
      </div>
      <!-- Timeframe buttons -->
      <div style="display:flex;gap:2px;flex-shrink:0">
        ${['M1','M5','M15','H1','H4','D1'].map(tf=>`<button onclick="terminalSetTF('${tf}')" id="tf-${tf}" style="padding:4px 7px;border-radius:4px;font-size:10px;font-weight:700;font-family:var(--display);border:1px solid ${_chartTF===tf?'var(--gold)':'var(--bdr2)'};background:${_chartTF===tf?'var(--gold)':'var(--bg4)'};color:${_chartTF===tf?'#0A0A0F':'var(--txt2)'};cursor:pointer;transition:all .15s">${tf}</button>`).join('')}
      </div>
    </div>

    <!-- CHART AREA -->
    <div style="flex:1;position:relative;overflow:hidden;min-height:0" id="chart-container">
      <canvas id="main-chart" style="display:block;width:100%;height:100%;touch-action:none"></canvas>

      <!-- Indicator overlays display -->
      <div id="indicator-values" style="position:absolute;top:6px;left:8px;display:flex;flex-wrap:wrap;gap:4px;pointer-events:none">
        <span id="ind-ema20" style="font-size:10px;color:#60A5FA;font-family:monospace;background:rgba(0,0,0,0.5);padding:2px 5px;border-radius:3px"></span>
        <span id="ind-ema50" style="font-size:10px;color:#A78BFA;font-family:monospace;background:rgba(0,0,0,0.5);padding:2px 5px;border-radius:3px"></span>
        <span id="ind-bb" style="font-size:10px;color:#F97316;font-family:monospace;background:rgba(0,0,0,0.5);padding:2px 5px;border-radius:3px"></span>
      </div>

      <!-- Price label on right -->
      <div id="price-line-label" style="position:absolute;right:0;background:var(--gold);color:#0A0A0F;font-family:monospace;font-size:10px;padding:2px 4px;border-radius:3px 0 0 3px;pointer-events:none"></div>

      <!-- Cross cursor info -->
      <div id="crosshair-info" style="position:absolute;top:6px;right:8px;background:rgba(0,0,0,0.75);padding:4px 8px;border-radius:6px;font-size:10px;font-family:monospace;color:var(--txt2);pointer-events:none;display:none"></div>
    </div>

    <!-- RSI SUB-CHART (when enabled) -->
    <div id="rsi-panel" style="flex-shrink:0;height:70px;border-top:1px solid var(--bdr2);background:var(--bg2);display:${_chartIndicators.rsi?'block':'none'}">
      <canvas id="rsi-chart" style="width:100%;height:70px"></canvas>
    </div>

    <!-- MACD SUB-CHART (when enabled) -->
    <div id="macd-panel" style="flex-shrink:0;height:70px;border-top:1px solid var(--bdr2);background:var(--bg2);display:${_chartIndicators.macd?'block':'none'}">
      <canvas id="macd-chart" style="width:100%;height:70px"></canvas>
    </div>

    <!-- BOTTOM CONTROLS -->
    <div style="flex-shrink:0;background:var(--bg2);border-top:1px solid var(--bdr2)">

      <!-- Indicator Bar -->
      <div style="display:flex;gap:4px;padding:6px 10px;border-bottom:1px solid var(--bdr3);overflow-x:auto;scrollbar-width:none">
        <span style="font-size:10px;color:var(--txt3);font-family:var(--display);font-weight:600;flex-shrink:0;align-self:center">Indicators:</span>
        ${[
          {key:'ema20',label:'EMA 20',col:'#60A5FA'},
          {key:'ema50',label:'EMA 50',col:'#A78BFA'},
          {key:'ema200',label:'EMA 200',col:'#F97316'},
          {key:'bb',label:'BB',col:'#22C55E'},
          {key:'vwap',label:'VWAP',col:'#F472B6'},
          {key:'rsi',label:'RSI',col:'#EF4444'},
          {key:'macd',label:'MACD',col:'#C9A84C'},
          {key:'sr',label:'S/R Lines',col:'#9B9891'},
        ].map(ind=>`
          <button onclick="terminalToggleInd('${ind.key}')" style="flex-shrink:0;padding:3px 8px;border-radius:12px;font-size:10px;font-weight:700;font-family:var(--display);cursor:pointer;transition:all .15s;border:1.5px solid ${_chartIndicators[ind.key]?ind.col:'var(--bdr2)'};background:${_chartIndicators[ind.key]?ind.col+'22':'transparent'};color:${_chartIndicators[ind.key]?ind.col:'var(--txt3)'}">${ind.label}</button>`
        ).join('')}
        <button onclick="terminalResetZoom()" style="flex-shrink:0;padding:3px 8px;border-radius:12px;font-size:10px;font-weight:700;font-family:var(--display);cursor:pointer;border:1.5px solid var(--bdr2);color:var(--txt3);background:transparent;margin-left:4px">⊞ Fit</button>
        <button onclick="terminalScreenshot()" style="flex-shrink:0;padding:3px 8px;border-radius:12px;font-size:10px;font-weight:700;font-family:var(--display);cursor:pointer;border:1.5px solid var(--bdr2);color:var(--txt3);background:transparent">📷</button>
      </div>

      <!-- Trade Controls -->
      <div style="padding:6px 8px;display:grid;grid-template-columns:1fr auto;gap:6px;align-items:center">
        <!-- Inputs row -->
        <div style="display:flex;gap:4px;align-items:center;overflow:hidden;min-width:0">
          <div style="display:flex;flex-direction:column;gap:1px;flex-shrink:0">
            <span style="font-size:9px;color:var(--txt3);font-family:var(--display);font-weight:600">LOTS</span>
            <select id="tp-lots" style="background:var(--bg3);border:1px solid var(--bdr2);border-radius:4px;padding:4px 5px;font-size:11px;color:var(--txt);font-family:var(--mono);width:62px">
              <option value="0.01">0.01</option><option value="0.05">0.05</option>
              <option value="0.10" selected>0.10</option><option value="0.25">0.25</option>
              <option value="0.50">0.50</option><option value="1.00">1.00</option>
            </select>
          </div>
          <div style="display:flex;flex-direction:column;gap:1px;flex-shrink:0">
            <span style="font-size:9px;color:var(--red);font-family:var(--display);font-weight:600">SL</span>
            <input id="tp-sl" type="number" value="30" min="5" max="500" style="background:var(--bg3);border:1px solid rgba(239,68,68,0.3);border-radius:4px;padding:4px 5px;font-size:11px;color:var(--txt);font-family:var(--mono);width:50px" oninput="updateRiskCalc()">
          </div>
          <div style="display:flex;flex-direction:column;gap:1px;flex-shrink:0">
            <span style="font-size:9px;color:var(--green);font-family:var(--display);font-weight:600">TP</span>
            <input id="tp-tp" type="number" value="60" min="5" max="1000" style="background:var(--bg3);border:1px solid rgba(34,197,94,0.3);border-radius:4px;padding:4px 5px;font-size:11px;color:var(--txt);font-family:var(--mono);width:50px" oninput="updateRiskCalc()">
          </div>
          <div style="display:flex;flex-direction:column;gap:1px;align-items:center;flex-shrink:0">
            <span style="font-size:9px;color:var(--txt3);font-family:var(--display);font-weight:600">R:R</span>
            <span id="risk-reward-display" style="font-size:11px;color:var(--gold);font-family:var(--mono);font-weight:700">2:1</span>
          </div>
        </div>

        <!-- Buy/Sell or Close -->
        ${_simOpenTrade ? `
        <div style="display:flex;flex-direction:column;align-items:center;gap:2px;flex-shrink:0">
          <span id="live-pnl" style="font-size:11px;font-family:var(--mono);color:var(--txt2)">$0.00</span>
          <button onclick="closeSimTrade('Manual')" style="padding:7px 10px;background:var(--red-bg);border:2px solid var(--red);border-radius:var(--rs);color:var(--red);font-family:var(--display);font-weight:800;font-size:11px;cursor:pointer;white-space:nowrap">⬛ CLOSE</button>
        </div>` : `
        <div style="display:flex;gap:5px;flex-shrink:0">
          <button onclick="openSimTrade('BUY')" style="padding:8px 10px;background:var(--green-bg);border:2px solid var(--green);border-radius:var(--rs);color:var(--green);font-family:var(--display);font-weight:800;font-size:12px;cursor:pointer;min-width:56px;text-align:center">
            BUY<div style="font-size:9px;font-weight:400;opacity:.8;font-family:monospace">${(_simCurrentPrice+0.00012).toFixed(4)}</div>
          </button>
          <button onclick="openSimTrade('SELL')" style="padding:8px 10px;background:var(--red-bg);border:2px solid var(--red);border-radius:var(--rs);color:var(--red);font-family:var(--display);font-weight:800;font-size:12px;cursor:pointer;min-width:56px;text-align:center">
            SELL<div style="font-size:9px;font-weight:400;opacity:.8;font-family:monospace">${_simCurrentPrice.toFixed(4)}</div>
          </button>
        </div>`}
      </div>

      ${_simOpenTrade ? `
      <!-- Open trade info strip -->
      <div style="padding:4px 10px 8px;display:flex;gap:10px;font-size:11px;color:var(--txt2)">
        <span style="color:${_simOpenTrade.dir==='BUY'?'var(--green)':'var(--red)'}">● ${_simOpenTrade.dir} ${_simCurrentPair}</span>
        <span>Entry: <strong class="t-mono">${_simOpenTrade.entry.toFixed(4)}</strong></span>
        <span>SL: <strong class="t-mono" style="color:var(--red)">${_simOpenTrade.sl.toFixed(4)}</strong></span>
        <span>TP: <strong class="t-mono" style="color:var(--green)">${_simOpenTrade.tp.toFixed(4)}</strong></span>
        <span>Lots: <strong class="t-mono">${_simOpenTrade.lots}</strong></span>
      </div>` : ''}

      <!-- Equity bar -->
      <div style="display:flex;justify-content:space-between;padding:4px 10px 6px;border-top:1px solid var(--bdr3)">
        <span style="font-size:10px;color:var(--txt3)">Balance: <strong style="color:var(--txt);font-family:var(--mono)">${fmtCurrency(STATE.simBalance)}</strong></span>
        <span style="font-size:10px;color:var(--txt3)">Equity: <strong id="term-equity" style="color:${STATE.simEquity>=STATE.simBalance?'var(--green)':'var(--red)'};font-family:var(--mono)">${fmtCurrency(STATE.simEquity)}</strong></span>
        <span style="font-size:10px;color:var(--txt3)">P&L: <strong style="color:${STATE.simEquity-10000>=0?'var(--green)':'var(--red)'};font-family:var(--mono)">${STATE.simEquity-10000>=0?'+':''}${fmtCurrency(STATE.simEquity-10000)}</strong></span>
      </div>
    </div>
  </div>`;
}

// Trading terminal state
let _chartTF = 'M5';
let _chartOffset = 0; // candles from right
let _chartZoom = 1.0; // candles visible scale
let _chartCandles = {}; // keyed by pair+tf
let _chartIndicators = { ema20:true, ema50:true, ema200:false, bb:false, vwap:false, rsi:false, macd:false, sr:true };
let _chartIsDragging = false;
let _chartDragStartX = 0;
let _chartDragStartOffset = 0;
let _chartPinchStartDist = 0;
let _chartPinchStartZoom = 1;
let _chartMouseX = -1;
let _chartMouseY = -1;
let _termPriceInterval = null;

const TF_CANDLE_COUNT = { M1:200, M5:150, M15:120, H1:100, H4:80, D1:60 };
const TF_VOLATILITY = { M1:0.0002, M5:0.0005, M15:0.001, H1:0.002, H4:0.004, D1:0.008 };

function terminalChangePair(pair) {
  _simCurrentPair = pair;
  const found = MARKET_DATA.tickers.find(t=>t.pair===pair);
  if (found) _simCurrentPrice = found.price;
  _chartCandles = {};
  _chartOffset = 0;
  renderScreen('trade');
  setTimeout(initTerminal, 60);
}

function terminalSetTF(tf) {
  _chartTF = tf;
  _chartOffset = 0;
  // Update TF button styles
  ['M1','M5','M15','H1','H4','D1'].forEach(t => {
    const btn = document.getElementById('tf-'+t);
    if (!btn) return;
    btn.style.border = `1px solid ${t===tf?'var(--gold)':'var(--bdr2)'}`;
    btn.style.background = t===tf ? 'var(--gold)' : 'var(--bg4)';
    btn.style.color = t===tf ? '#0A0A0F' : 'var(--txt2)';
  });
  renderChart();
}

function terminalToggleInd(key) {
  _chartIndicators[key] = !_chartIndicators[key];
  // Show/hide sub-panels
  const rsiPanel = document.getElementById('rsi-panel');
  const macdPanel = document.getElementById('macd-panel');
  if (rsiPanel) rsiPanel.style.display = _chartIndicators.rsi ? 'block' : 'none';
  if (macdPanel) macdPanel.style.display = _chartIndicators.macd ? 'block' : 'none';
  // Update button styling
  const colors = {ema20:'#60A5FA',ema50:'#A78BFA',ema200:'#F97316',bb:'#22C55E',vwap:'#F472B6',rsi:'#EF4444',macd:'#C9A84C',sr:'#9B9891'};
  const labels = {ema20:'EMA 20',ema50:'EMA 50',ema200:'EMA 200',bb:'BB',vwap:'VWAP',rsi:'RSI',macd:'MACD',sr:'S/R Lines'};
  document.querySelectorAll('[onclick^="terminalToggleInd"]').forEach(btn => {
    const k = btn.getAttribute('onclick').match(/'(\w+)'/)?.[1];
    if (!k) return;
    const col = colors[k] || 'var(--gold)';
    const active = _chartIndicators[k];
    btn.style.border = `1.5px solid ${active?col:'var(--bdr2)'}`;
    btn.style.background = active ? col+'22' : 'transparent';
    btn.style.color = active ? col : 'var(--txt3)';
  });
  renderChart();
}

function terminalResetZoom() {
  _chartOffset = 0;
  _chartZoom = 1.0;
  renderChart();
}

function terminalScreenshot() {
  const canvas = document.getElementById('main-chart');
  if (!canvas) return;
  const link = document.createElement('a');
  link.download = `tradebaby_${_simCurrentPair}_${_chartTF}_${Date.now()}.png`;
  link.href = canvas.toDataURL();
  link.click();
  showToast('📷 Chart saved!');
}

function getChartCandles() {
  const key = _simCurrentPair + '_' + _chartTF;
  if (!_chartCandles[key]) {
    _chartCandles[key] = generateTFCandles(_simCurrentPrice, _chartTF);
  }
  return _chartCandles[key];
}

function generateTFCandles(basePrice, tf) {
  const count = TF_CANDLE_COUNT[tf] || 100;
  const vol = TF_VOLATILITY[tf] || 0.001;
  const candles = [];
  let price = basePrice * (0.92 + Math.random() * 0.16);
  const trend = Math.random() > 0.5 ? 1 : -1;
  for (let i = 0; i < count; i++) {
    const trendBias = (i / count) * trend * vol * 0.5;
    const open = price;
    const change = (Math.random() - 0.48 + trendBias * 0.3) * vol;
    const close = Math.max(open + change, basePrice * 0.5);
    const wickUp = Math.random() * vol * 0.6;
    const wickDn = Math.random() * vol * 0.6;
    const high = Math.max(open, close) + wickUp;
    const low = Math.min(open, close) - wickDn;
    const volume = Math.floor(500 + Math.random() * 4500 + Math.abs(change) * 100000);
    candles.push({ open, high, low, close, volume, bull: close >= open, time: Date.now() - (count - i) * getTFMs(tf) });
    price = close;
  }
  return candles;
}

function getTFMs(tf) {
  return {M1:60000,M5:300000,M15:900000,H1:3600000,H4:14400000,D1:86400000}[tf]||300000;
}

// EMA calculation
function calcEMA(candles, period) {
  const k = 2/(period+1);
  const ema = [];
  let prev = candles.slice(0,period).reduce((a,c)=>a+c.close,0)/period;
  for (let i = 0; i < candles.length; i++) {
    if (i < period-1) { ema.push(null); continue; }
    if (i === period-1) { ema.push(prev); continue; }
    prev = candles[i].close * k + prev * (1-k);
    ema.push(prev);
  }
  return ema;
}

// Bollinger Bands
function calcBB(candles, period=20, mult=2) {
  const upper=[], lower=[], mid=[];
  for (let i=0;i<candles.length;i++) {
    if (i<period-1){upper.push(null);lower.push(null);mid.push(null);continue;}
    const slice=candles.slice(i-period+1,i+1).map(c=>c.close);
    const m=slice.reduce((a,b)=>a+b,0)/period;
    const std=Math.sqrt(slice.reduce((a,b)=>a+(b-m)**2,0)/period);
    upper.push(m+mult*std);lower.push(m-mult*std);mid.push(m);
  }
  return {upper,lower,mid};
}

// RSI calculation
function calcRSI(candles, period=14) {
  const rsi=[];
  for(let i=0;i<candles.length;i++){
    if(i<period){rsi.push(null);continue;}
    const gains=[],losses=[];
    for(let j=i-period+1;j<=i;j++){
      const d=candles[j].close-candles[j-1<0?0:j-1].close;
      if(d>0)gains.push(d);else losses.push(-d);
    }
    const avgG=gains.reduce((a,b)=>a+b,0)/period;
    const avgL=losses.reduce((a,b)=>a+b,0)/period||0.000001;
    rsi.push(100-100/(1+avgG/avgL));
  }
  return rsi;
}

// VWAP calculation
function calcVWAP(candles) {
  let cumTPV=0, cumVol=0;
  return candles.map(c=>{
    const tp=(c.high+c.low+c.close)/3;
    cumTPV+=tp*(c.volume||1000);
    cumVol+=(c.volume||1000);
    return cumTPV/cumVol;
  });
}

// Auto S/R detection
function calcSRLevels(candles) {
  const levels=[];
  for(let i=2;i<candles.length-2;i++){
    // Local high
    if(candles[i].high>candles[i-1].high&&candles[i].high>candles[i-2].high&&candles[i].high>candles[i+1].high&&candles[i].high>candles[i+2].high)
      levels.push({price:candles[i].high,type:'r'});
    // Local low
    if(candles[i].low<candles[i-1].low&&candles[i].low<candles[i-2].low&&candles[i].low<candles[i+1].low&&candles[i].low<candles[i+2].low)
      levels.push({price:candles[i].low,type:'s'});
  }
  // Cluster nearby levels
  const clustered=[];
  levels.forEach(l=>{
    const nearby=clustered.find(c=>Math.abs(c.price-l.price)<(l.price*0.001));
    if(nearby)nearby.strength++;
    else clustered.push({...l,strength:1});
  });
  return clustered.filter(l=>l.strength>=2).slice(-8);
}

function initTerminal() {
  const canvas = document.getElementById('main-chart');
  if (!canvas) return;

  // Set canvas size
  const container = document.getElementById('chart-container');
  if (container) {
    canvas.width = container.offsetWidth || 380;
    canvas.height = container.offsetHeight || 260;
  }

  // RSI/MACD canvases
  ['rsi-chart','macd-chart'].forEach(id=>{
    const c=document.getElementById(id);
    if(c){c.width=canvas.width;c.height=70;}
  });

  // Generate candles if needed
  getChartCandles();
  renderChart();
  updatePriceLabel();

  // Touch events for pan + zoom
  canvas.addEventListener('touchstart', onChartTouchStart, {passive:false});
  canvas.addEventListener('touchmove', onChartTouchMove, {passive:false});
  canvas.addEventListener('touchend', onChartTouchEnd, {passive:true});

  // Mouse events for desktop
  canvas.addEventListener('mousedown', e=>{
    _chartIsDragging=true;
    _chartDragStartX=e.clientX;
    _chartDragStartOffset=_chartOffset;
  });
  canvas.addEventListener('mousemove', e=>{
    _chartMouseX=e.offsetX;_chartMouseY=e.offsetY;
    if(_chartIsDragging){
      const dx=e.clientX-_chartDragStartX;
      const candles=getChartCandles();
      const cw=canvas.width/Math.floor(50*_chartZoom);
      _chartOffset=Math.max(0,Math.min(candles.length-10,_chartDragStartOffset+Math.round(-dx/cw)));
      renderChart();
    } else {
      renderChartCrosshair(e.offsetX,e.offsetY);
    }
  });
  canvas.addEventListener('mouseup',()=>{_chartIsDragging=false;});
  canvas.addEventListener('mouseleave',()=>{_chartIsDragging=false;_chartMouseX=-1;renderChart();});
  canvas.addEventListener('wheel',e=>{
    e.preventDefault();
    _chartZoom=Math.max(0.3,Math.min(3,_chartZoom*(e.deltaY>0?1.1:0.9)));
    renderChart();
  },{passive:false});

  // Start price tick
  if(_termPriceInterval) clearInterval(_termPriceInterval);
  _termPriceInterval=setInterval(terminalPriceTick, 600);
}

let _touchStartX=0, _touchStartY=0, _touchStartOffset=0, _touchStartZoom=1, _touch2Dist=0;

function onChartTouchStart(e) {
  if(e.touches.length===1){
    _touchStartX=e.touches[0].clientX;
    _touchStartY=e.touches[0].clientY;
    _touchStartOffset=_chartOffset;
    _chartIsDragging=true;
  } else if(e.touches.length===2){
    _chartIsDragging=false;
    _touch2Dist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
    _touchStartZoom=_chartZoom;
  }
  e.preventDefault();
}

function onChartTouchMove(e) {
  if(e.touches.length===1&&_chartIsDragging){
    const dx=e.touches[0].clientX-_touchStartX;
    const canvas=document.getElementById('main-chart');
    if(!canvas) return;
    const candles=getChartCandles();
    const cw=canvas.width/Math.floor(50*_chartZoom);
    _chartOffset=Math.max(0,Math.min(candles.length-10,_touchStartOffset+Math.round(-dx/cw)));
    renderChart();
  } else if(e.touches.length===2){
    const dist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
    _chartZoom=Math.max(0.3,Math.min(3,_touchStartZoom*(dist/_touch2Dist)));
    renderChart();
  }
  e.preventDefault();
}

function onChartTouchEnd(e){_chartIsDragging=false;}

function terminalPriceTick() {
  const vol=TF_VOLATILITY[_chartTF]||0.001;
  _simCurrentPrice=Math.max(_simCurrentPrice+(Math.random()-0.49)*vol*0.3,0.01);

  // Update last candle
  const key=_simCurrentPair+'_'+_chartTF;
  const candles=_chartCandles[key];
  if(candles&&candles.length>0){
    const last=candles[candles.length-1];
    last.close=_simCurrentPrice;
    last.high=Math.max(last.high,_simCurrentPrice);
    last.low=Math.min(last.low,_simCurrentPrice);
    last.bull=last.close>=last.open;
    last.volume=(last.volume||1000)+Math.floor(Math.random()*50);
    // Occasionally new candle
    if(Math.random()<0.08){
      candles.push(generateTFCandles(_simCurrentPrice,_chartTF).pop());
      if(candles.length>TF_CANDLE_COUNT[_chartTF]+20)candles.shift();
    }
  }

  // Update price displays
  const tp=document.getElementById('term-price');
  if(tp) tp.textContent=_simCurrentPrice.toFixed(4);

  // Live P&L
  if(_simOpenTrade){
    const pm=_simCurrentPair.includes('JPY')?100:10000;
    const pips=(_simOpenTrade.dir==='BUY'?_simCurrentPrice-_simOpenTrade.entry:_simOpenTrade.entry-_simCurrentPrice)*pm;
    const pnl=parseFloat((pips*_simOpenTrade.lots*10*0.1).toFixed(2));
    const pnlStr=(pnl>=0?'+':'')+fmtCurrency(pnl);
    const col=pnl>=0?'var(--green)':'var(--red)';
    ['live-pnl','open-live-pnl'].forEach(id=>{const e=el(id);if(e){e.textContent=pnlStr;e.style.color=col;}});

    if(_simOpenTrade.dir==='BUY'){
      if(_simCurrentPrice<=_simOpenTrade.sl)closeSimTrade('Stop Loss');
      if(_simCurrentPrice>=_simOpenTrade.tp)closeSimTrade('Take Profit');
    }else{
      if(_simCurrentPrice>=_simOpenTrade.sl)closeSimTrade('Stop Loss');
      if(_simCurrentPrice<=_simOpenTrade.tp)closeSimTrade('Take Profit');
    }
  }

  updatePriceLabel();
  renderChart();
}

function updatePriceLabel(){
  const canvas=document.getElementById('main-chart');
  const lbl=document.getElementById('price-line-label');
  if(!canvas||!lbl)return;
  const candles=getChartCandles();
  if(!candles.length)return;
  const prices=candles.flatMap(c=>[c.high,c.low]);
  const lo=Math.min(...prices),hi=Math.max(...prices);
  const range=hi-lo||0.001;
  const PAD=12;
  const py=canvas.height-PAD-(((_simCurrentPrice-lo)/range)*(canvas.height-PAD*2));
  lbl.textContent=_simCurrentPrice.toFixed(4);
  lbl.style.top=(py-8)+'px';
}

function renderChart() {
  const canvas=document.getElementById('main-chart');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const candles=getChartCandles();
  const w=canvas.width, h=canvas.height;

  // Background
  ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--bg3').trim()||'#18181F';
  ctx.fillRect(0,0,w,h);

  // Visible candles based on zoom+offset
  const visible=Math.floor(50*_chartZoom);
  const startIdx=Math.max(0,candles.length-visible-_chartOffset);
  const endIdx=Math.max(startIdx+5,candles.length-_chartOffset);
  const visibleCandles=candles.slice(startIdx,endIdx);
  if(!visibleCandles.length)return;

  const prices=visibleCandles.flatMap(c=>[c.high,c.low]);
  let lo=Math.min(...prices),hi=Math.max(...prices);
  const margin=(hi-lo)*0.08||0.001;
  lo-=margin; hi+=margin;
  const range=hi-lo||0.001;
  const PAD_L=52, PAD_R=6, PAD_T=12, PAD_B=20;
  const plotW=w-PAD_L-PAD_R, plotH=h-PAD_T-PAD_B;

  const sy=v=>PAD_T+(1-(v-lo)/range)*plotH;
  const cw=Math.max(2,plotW/visibleCandles.length-1);
  const cx=i=>PAD_L+(i+0.5)*(plotW/visibleCandles.length);

  // Grid
  ctx.strokeStyle='rgba(255,255,255,0.04)';ctx.lineWidth=1;
  for(let i=0;i<=4;i++){
    const y=PAD_T+plotH*(i/4);
    ctx.beginPath();ctx.moveTo(PAD_L,y);ctx.lineTo(w-PAD_R,y);ctx.stroke();
    const price=hi-(range*(i/4));
    ctx.fillStyle='rgba(155,152,145,0.7)';ctx.font='9px monospace';ctx.textAlign='right';
    ctx.fillText(price.toFixed(4),PAD_L-3,y+3);
  }

  // Time labels
  ctx.fillStyle='rgba(155,152,145,0.6)';ctx.font='8px monospace';ctx.textAlign='center';
  const labelStep=Math.max(1,Math.floor(visibleCandles.length/6));
  visibleCandles.forEach((c,i)=>{
    if(i%labelStep===0){
      const d=new Date(c.time||Date.now());
      const label=_chartTF.startsWith('D')?`${d.getMonth()+1}/${d.getDate()}`:`${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
      ctx.fillText(label,cx(i),h-4);
    }
  });

  // S/R Levels
  if(_chartIndicators.sr){
    const levels=calcSRLevels(visibleCandles);
    levels.forEach(l=>{
      const y=sy(l.price);
      ctx.strokeStyle=l.type==='r'?'rgba(239,68,68,0.4)':'rgba(34,197,94,0.4)';
      ctx.lineWidth=1;ctx.setLineDash([6,4]);
      ctx.beginPath();ctx.moveTo(PAD_L,y);ctx.lineTo(w-PAD_R,y);ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle=l.type==='r'?'rgba(239,68,68,0.7)':'rgba(34,197,94,0.7)';
      ctx.font='8px monospace';ctx.textAlign='left';
      ctx.fillText(l.price.toFixed(4),PAD_L+2,y-2);
    });
  }

  // VWAP
  if(_chartIndicators.vwap){
    const vwap=calcVWAP(visibleCandles);
    ctx.strokeStyle='#F472B6';ctx.lineWidth=1;ctx.setLineDash([4,3]);
    ctx.beginPath();
    vwap.forEach((v,i)=>{if(v&&i>=1){i===1?ctx.moveTo(cx(i),sy(v)):ctx.lineTo(cx(i),sy(v));}});
    ctx.stroke();ctx.setLineDash([]);
  }

  // Bollinger Bands
  if(_chartIndicators.bb){
    const bb=calcBB(visibleCandles);
    ctx.fillStyle='rgba(34,197,94,0.05)';
    ctx.beginPath();
    bb.upper.forEach((v,i)=>{if(v){i===0?ctx.moveTo(cx(i),sy(v)):ctx.lineTo(cx(i),sy(v));}});
    bb.lower.slice().reverse().forEach((v,i,arr)=>{if(v){const ri=arr.length-1-i;ctx.lineTo(cx(ri),sy(v));}});
    ctx.closePath();ctx.fill();
    ['upper','lower','mid'].forEach((k,ki)=>{
      ctx.strokeStyle=ki===2?'rgba(34,197,94,0.4)':'rgba(34,197,94,0.6)';
      ctx.lineWidth=ki===2?0.8:1;ctx.setLineDash(ki===2?[4,3]:[]);
      ctx.beginPath();
      bb[k].forEach((v,i)=>{if(v){i===0?ctx.moveTo(cx(i),sy(v)):ctx.lineTo(cx(i),sy(v));}});
      ctx.stroke();ctx.setLineDash([]);
    });
  }

  // EMA lines
  const emaConfigs=[
    {key:'ema20',period:20,color:'#60A5FA',width:1.2},
    {key:'ema50',period:50,color:'#A78BFA',width:1.2},
    {key:'ema200',period:200,color:'#F97316',width:1.5},
  ];
  emaConfigs.forEach(cfg=>{
    if(!_chartIndicators[cfg.key])return;
    const allCandles=candles;
    const allEMA=calcEMA(allCandles,cfg.period);
    const visEMA=allEMA.slice(startIdx,endIdx);
    ctx.strokeStyle=cfg.color;ctx.lineWidth=cfg.width;
    ctx.beginPath();let started=false;
    visEMA.forEach((v,i)=>{
      if(v===null)return;
      const vv=Math.max(lo,Math.min(hi,v));
      if(!started){ctx.moveTo(cx(i),sy(vv));started=true;}
      else ctx.lineTo(cx(i),sy(vv));
    });
    ctx.stroke();

    // Label on chart
    const lastEMA=visEMA.filter(v=>v!==null).pop();
    if(lastEMA){
      const indEl=document.getElementById('ind-'+cfg.key);
      if(indEl)indEl.textContent=`${cfg.key.toUpperCase()}:${lastEMA.toFixed(4)}`;
    }
  });

  // BB label
  if(!_chartIndicators.bb){const ind=document.getElementById('ind-bb');if(ind)ind.textContent='';}
  else{const ind=document.getElementById('ind-bb');if(ind)ind.textContent='BB(20,2)';}

  // Candles
  visibleCandles.forEach((c,i)=>{
    const x=cx(i);
    const col=c.bull?'#22C55E':'#EF4444';
    ctx.strokeStyle=col;ctx.lineWidth=1;
    // Wick
    ctx.beginPath();ctx.moveTo(x,sy(c.high));ctx.lineTo(x,sy(c.low));ctx.stroke();
    // Body
    const top=Math.min(sy(c.open),sy(c.close));
    const bh=Math.max(1.5,Math.abs(sy(c.open)-sy(c.close)));
    ctx.fillStyle=c.bull?'#22C55E':'#EF4444';
    ctx.shadowColor=col;ctx.shadowBlur=i===visibleCandles.length-1?4:0;
    ctx.fillRect(x-cw/2,top,cw,bh);
    ctx.shadowBlur=0;
  });

  // Current price line
  const py=sy(_simCurrentPrice);
  ctx.strokeStyle='rgba(201,168,76,0.8)';ctx.lineWidth=1;ctx.setLineDash([4,4]);
  ctx.beginPath();ctx.moveTo(PAD_L,py);ctx.lineTo(w-PAD_R,py);ctx.stroke();ctx.setLineDash([]);

  // Open trade lines
  if(_simOpenTrade){
    const slY=sy(_simOpenTrade.sl);
    const tpY=sy(_simOpenTrade.tp);
    const entY=sy(_simOpenTrade.entry);
    // SL
    ctx.strokeStyle='rgba(239,68,68,0.9)';ctx.lineWidth=1.5;ctx.setLineDash([5,3]);
    ctx.beginPath();ctx.moveTo(PAD_L,slY);ctx.lineTo(w-PAD_R,slY);ctx.stroke();
    ctx.fillStyle='rgba(239,68,68,0.85)';ctx.font='9px monospace';ctx.textAlign='left';
    ctx.fillText('SL '+_simOpenTrade.sl.toFixed(4),PAD_L+4,slY-2);
    // TP
    ctx.strokeStyle='rgba(34,197,94,0.9)';
    ctx.beginPath();ctx.moveTo(PAD_L,tpY);ctx.lineTo(w-PAD_R,tpY);ctx.stroke();
    ctx.fillStyle='rgba(34,197,94,0.85)';
    ctx.fillText('TP '+_simOpenTrade.tp.toFixed(4),PAD_L+4,tpY+9);
    // Entry
    ctx.strokeStyle='rgba(201,168,76,0.9)';ctx.setLineDash([]);ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(PAD_L,entY);ctx.lineTo(w-PAD_R,entY);ctx.stroke();
    ctx.fillStyle='rgba(201,168,76,0.85)';
    ctx.fillText((_simOpenTrade.dir==='BUY'?'▲':'▼')+' '+_simOpenTrade.entry.toFixed(4),PAD_L+4,entY-2);
    ctx.setLineDash([]);
  }

  // Crosshair
  if(_chartMouseX>PAD_L&&_chartMouseX<w-PAD_R&&_chartMouseY>PAD_T&&_chartMouseY<h-PAD_B){
    ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.lineWidth=1;ctx.setLineDash([]);
    ctx.beginPath();ctx.moveTo(_chartMouseX,PAD_T);ctx.lineTo(_chartMouseX,h-PAD_B);ctx.stroke();
    ctx.beginPath();ctx.moveTo(PAD_L,_chartMouseY);ctx.lineTo(w-PAD_R,_chartMouseY);ctx.stroke();
    const hoverPrice=lo+(1-(_chartMouseY-PAD_T)/plotH)*range;
    const ci=document.getElementById('crosshair-info');
    if(ci){
      ci.style.display='block';
      const hi2=Math.floor((_chartMouseX-PAD_L)/(plotW/visibleCandles.length));
      const hc=visibleCandles[Math.min(hi2,visibleCandles.length-1)];
      if(hc) ci.textContent=`O:${hc.open.toFixed(4)} H:${hc.high.toFixed(4)} L:${hc.low.toFixed(4)} C:${hc.close.toFixed(4)}`;
    }
  }else{
    const ci=document.getElementById('crosshair-info');
    if(ci)ci.style.display='none';
  }

  // RSI sub-chart
  if(_chartIndicators.rsi){
    const rc=document.getElementById('rsi-chart');
    if(rc){
      const rctx=rc.getContext('2d');
      const rsi=calcRSI(visibleCandles);
      rctx.fillStyle='#0E1424';rctx.fillRect(0,0,rc.width,rc.height);
      rctx.strokeStyle='rgba(255,255,255,0.04)';rctx.lineWidth=1;
      [30,50,70].forEach(l=>{
        const y=(1-l/100)*rc.height;
        rctx.beginPath();rctx.moveTo(0,y);rctx.lineTo(rc.width,y);rctx.stroke();
        rctx.fillStyle='rgba(155,152,145,0.5)';rctx.font='8px monospace';rctx.textAlign='left';
        rctx.fillText(l,2,y-1);
      });
      rctx.strokeStyle='#EF4444';rctx.lineWidth=1.2;rctx.beginPath();let rStarted=false;
      rsi.forEach((v,i)=>{
        if(v===null)return;
        const x=(i/visibleCandles.length)*rc.width;
        const y=(1-v/100)*rc.height;
        if(!rStarted){rctx.moveTo(x,y);rStarted=true;}else rctx.lineTo(x,y);
      });
      rctx.stroke();
      const lastRSI=rsi.filter(v=>v!==null).pop();
      if(lastRSI){
        rctx.fillStyle=lastRSI>70?'#EF4444':lastRSI<30?'#22C55E':'#9B9891';
        rctx.font='9px monospace';rctx.textAlign='right';
        rctx.fillText('RSI:'+lastRSI.toFixed(1),rc.width-4,12);
      }
    }
  }

  // MACD sub-chart
  if(_chartIndicators.macd){
    const mc=document.getElementById('macd-chart');
    if(mc){
      const mctx=mc.getContext('2d');
      mctx.fillStyle='#0E1424';mctx.fillRect(0,0,mc.width,mc.height);
      const ema12=calcEMA(visibleCandles,12);
      const ema26=calcEMA(visibleCandles,26);
      const macdLine=ema12.map((v,i)=>v&&ema26[i]?v-ema26[i]:null);
      const signal=calcEMA(macdLine.map(v=>v||0).map((v,i,a)=>({close:v,open:v,high:v,low:v})),9).map(v=>v);
      const mn=Math.min(...macdLine.filter(v=>v)),mx=Math.max(...macdLine.filter(v=>v));
      const mr=Math.max(Math.abs(mn),Math.abs(mx))||0.001;
      const msy=v=>(mc.height/2)*(1-v/mr);
      mctx.strokeStyle='rgba(255,255,255,0.06)';mctx.lineWidth=1;
      mctx.beginPath();mctx.moveTo(0,mc.height/2);mctx.lineTo(mc.width,mc.height/2);mctx.stroke();
      // Histogram
      macdLine.forEach((v,i)=>{
        if(v===null)return;
        const x=(i/macdLine.length)*mc.width;
        const bw=Math.max(1,(mc.width/macdLine.length)-1);
        const y=msy(v),zh=mc.height/2;
        mctx.fillStyle=v>=0?'rgba(34,197,94,0.5)':'rgba(239,68,68,0.5)';
        mctx.fillRect(x,Math.min(y,zh),bw,Math.abs(y-zh));
      });
      // MACD line
      mctx.strokeStyle='#C9A84C';mctx.lineWidth=1;mctx.beginPath();let mStarted=false;
      macdLine.forEach((v,i)=>{
        if(v===null)return;
        const x=(i/macdLine.length)*mc.width;
        if(!mStarted){mctx.moveTo(x,msy(v));mStarted=true;}else mctx.lineTo(x,msy(v));
      });
      mctx.stroke();
      mctx.fillStyle='#C9A84C';mctx.font='9px monospace';mctx.textAlign='right';
      const lm=macdLine.filter(v=>v!==null).pop();
      if(lm)mctx.fillText('MACD:'+lm.toFixed(5),mc.width-4,12);
    }
  }
}

function renderChartCrosshair(mx,my){
  renderChart();
  const canvas=document.getElementById('main-chart');
  if(!canvas||mx<0)return;
  const ctx=canvas.getContext('2d');
  ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(mx,0);ctx.lineTo(mx,canvas.height);ctx.stroke();
  ctx.beginPath();ctx.moveTo(0,my);ctx.lineTo(canvas.width,my);ctx.stroke();
}

// Override initSimChart to use new terminal
const _origInitSimChart = initSimChart;
function initSimChart() {
  setTimeout(initTerminal, 50);
}


// ── SIM TRADING LOGIC ──
function updateSimPair(pair) {
  _simCurrentPair = pair;
  const found = MARKET_DATA.tickers.find(t => t.pair === pair);
  if (found) _simCurrentPrice = found.price;
  _simCandles = generateCandleData(_simCurrentPrice, 50);
  document.getElementById('trade-content').innerHTML = renderTradeTab();
  setTimeout(initSimChart, 50);
}

function updateRiskCalc() {
  const sl = parseFloat(el('tp-sl')?.value || 30);
  const tp = parseFloat(el('tp-tp')?.value || 60);
  const rr = tp / sl;
  const rrEl = el('risk-reward-display');
  if (rrEl) {
    rrEl.textContent = `${rr.toFixed(1)}:1`;
    rrEl.style.color = rr >= 2 ? 'var(--green)' : rr >= 1 ? 'var(--gold)' : 'var(--red)';
  }
}

function openSimTrade(dir) {
  if (typeof SOUNDS !== 'undefined') SOUNDS.play(dir === 'BUY' ? 'tradeBuy' : 'tradeSell');
  if (_simOpenTrade) { showToast('⚠️ Close your existing position first'); return; }
  const lots  = parseFloat(el('tp-lots')?.value || '0.10');
  const slPip = parseInt(el('tp-sl')?.value || '30');
  const tpPip = parseInt(el('tp-tp')?.value || '60');
  const pm    = _simCurrentPair.includes('JPY') ? 0.01 :
                _simCurrentPair.includes('XAU') ? 0.1  :
                (_simCurrentPair.includes('NAS') || _simCurrentPair.includes('SPX') || _simCurrentPair.includes('US30')) ? 1 : 0.0001;

  _simOpenTrade = {
    pair: _simCurrentPair, dir, entry: _simCurrentPrice, lots,
    sl: dir === 'BUY' ? _simCurrentPrice - slPip * pm : _simCurrentPrice + slPip * pm,
    tp: dir === 'BUY' ? _simCurrentPrice + tpPip * pm : _simCurrentPrice - tpPip * pm,
    time: new Date().toISOString()
  };

  showToast(`📈 ${dir} ${_simCurrentPair} @ ${_simCurrentPrice.toFixed(4)}`);
  addXP(5);
  navigate('trade');
}

function closeSimTrade(reason = 'Manual') {
  if (!_simOpenTrade) return;
  const pm = _simCurrentPair.includes('JPY') ? 100 :
             (_simCurrentPair.includes('NAS') || _simCurrentPair.includes('SPX') || _simCurrentPair.includes('US30')) ? 1 :
             _simCurrentPair.includes('XAU') ? 10 : 10000;
  const pips = (_simOpenTrade.dir === 'BUY'
    ? _simCurrentPrice - _simOpenTrade.entry
    : _simOpenTrade.entry - _simCurrentPrice) * pm;
  const pnl = parseFloat((pips * _simOpenTrade.lots * 10 * 0.1).toFixed(2));

  STATE.simTrades.push({
    pair: _simOpenTrade.pair, dir: _simOpenTrade.dir,
    entry: _simOpenTrade.entry.toFixed(4), exit: _simCurrentPrice.toFixed(4),
    lots: _simOpenTrade.lots, pnl, reason, time: new Date().toISOString()
  });
  STATE.simEquity = parseFloat((STATE.simEquity + pnl).toFixed(2));
  _simOpenTrade = null;

  addXP(15);
  saveState();
  showToast(`${pnl >= 0 ? '✅ Profit' : '❌ Loss'}: ${pnl >= 0 ? '+' : ''}${fmtCurrency(pnl)}`);
  navigate('trade');
}

// ── CHART RENDERING ──
function generateCandleData(seed = 1.0847, count = 50) {
  const data = []; let price = seed;
  for (let i = 0; i < count; i++) {
    const open = price;
    const change = (Math.random() - 0.48) * 0.003;
    const close = Math.max(open + change, 0.0001);
    const high = Math.max(open, close) + Math.random() * 0.0015;
    const low  = Math.min(open, close) - Math.random() * 0.0015;
    data.push({ open, high, low, close, bull: close >= open });
    price = close;
  }
  return data;
}

function tickPrice() {
  const change = (Math.random() - 0.49) * 0.0003;
  _simCurrentPrice = Math.max(_simCurrentPrice + change, 0.0001);
  return _simCurrentPrice;
}

function initSimChart() {
  const canvas = el('sim-candle-chart');
  if (!canvas) return;
  canvas.width  = canvas.offsetWidth || 360;
  canvas.height = 190;
  if (_simCandles.length === 0) _simCandles = generateCandleData(_simCurrentPrice, 50);
  drawCandleChart(canvas.getContext('2d'), _simCandles, canvas.width, canvas.height);

  if (_simPriceInterval) clearInterval(_simPriceInterval);
  _simPriceInterval = setInterval(() => {
    _simCurrentPrice = tickPrice();

    // Update last candle or add new
    if (_simCandles.length > 0) {
      const last = _simCandles[_simCandles.length - 1];
      last.close = _simCurrentPrice;
      last.high  = Math.max(last.high, _simCurrentPrice);
      last.low   = Math.min(last.low,  _simCurrentPrice);
      last.bull  = last.close >= last.open;
      if (Math.random() < 0.15) {
        _simCandles.push(generateCandleData(_simCurrentPrice, 1)[0]);
        if (_simCandles.length > 70) _simCandles.shift();
      }
    }

    // Update price displays
    const bid = el('bid-price'), ask = el('ask-price');
    if (bid) bid.textContent = _simCurrentPrice.toFixed(4);
    if (ask) ask.textContent = (_simCurrentPrice + 0.00012).toFixed(4);

    // Update live P&L
    if (_simOpenTrade) {
      const pm = _simCurrentPair.includes('JPY') ? 100 : 10000;
      const pips = (_simOpenTrade.dir === 'BUY'
        ? _simCurrentPrice - _simOpenTrade.entry
        : _simOpenTrade.entry - _simCurrentPrice) * pm;
      const pnl = parseFloat((pips * _simOpenTrade.lots * 10 * 0.1).toFixed(2));
      const pnlStr = `${pnl >= 0 ? '+' : ''}${fmtCurrency(pnl)}`;
      const col = pnl >= 0 ? 'var(--green)' : 'var(--red)';
      ['live-pnl', 'open-live-pnl'].forEach(id => {
        const e2 = el(id);
        if (e2) { e2.textContent = pnlStr; e2.style.color = col; }
      });
      const cpd = el('current-price-display');
      if (cpd) cpd.textContent = _simCurrentPrice.toFixed(4);

      // Auto-close on SL/TP hit
      if (_simOpenTrade.dir === 'BUY') {
        if (_simCurrentPrice <= _simOpenTrade.sl) closeSimTrade('Stop Loss');
        if (_simCurrentPrice >= _simOpenTrade.tp) closeSimTrade('Take Profit');
      } else {
        if (_simCurrentPrice >= _simOpenTrade.sl) closeSimTrade('Stop Loss');
        if (_simCurrentPrice <= _simOpenTrade.tp) closeSimTrade('Take Profit');
      }
    }

    // Redraw chart
    const c = el('sim-candle-chart');
    if (c && c.isConnected) drawCandleChart(c.getContext('2d'), _simCandles, c.width, c.height);
  }, 800);
}

function drawCandleChart(ctx, candles, w, h) {
  if (!ctx || !candles || !candles.length) return;
  ctx.clearRect(0, 0, w, h);

  // Background
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg3').trim() || '#18181F';
  ctx.fillRect(0, 0, w, h);

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = (h / 4) * i;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }

  const prices = candles.flatMap(c => [c.high, c.low]);
  const lo = Math.min(...prices), hi = Math.max(...prices);
  const range = (hi - lo) || 0.001;
  const PAD = 14;
  const sy = p => h - PAD - ((p - lo) / range) * (h - PAD * 2);
  const gap = w / candles.length;
  const cw  = Math.max(2, gap - 1.5);

  candles.forEach((c, i) => {
    const x = i * gap + gap / 2;
    const col = c.bull ? '#22C55E' : '#EF4444';
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 1.2;
    // Wick
    ctx.beginPath(); ctx.moveTo(x, sy(c.high)); ctx.lineTo(x, sy(c.low)); ctx.stroke();
    // Body
    const top = Math.min(sy(c.open), sy(c.close));
    const bodyH = Math.max(1.5, Math.abs(sy(c.open) - sy(c.close)));
    ctx.fillRect(x - cw / 2, top, cw, bodyH);
    // Last candle glow
    if (i === candles.length - 1) {
      ctx.shadowColor = col; ctx.shadowBlur = 8;
      ctx.fillRect(x - cw / 2, top, cw, bodyH);
      ctx.shadowBlur = 0;
    }
  });

  // Current price dashed line
  const last = candles[candles.length - 1].close;
  const py = sy(last);
  ctx.strokeStyle = 'rgba(201,168,76,0.7)'; ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(w, py); ctx.stroke();
  ctx.setLineDash([]);

  // Price label
  ctx.fillStyle = '#C9A84C'; ctx.font = 'bold 10px monospace';
  ctx.fillText(last.toFixed(4), 4, py - 4);
}

function showTradeHelp() {
  showModal(`<div class="modal-handle"></div>
    <div style="font-family:var(--display);font-weight:800;font-size:18px;margin-bottom:4px">Practice Trading Guide</div>
    <p style="font-size:13px;color:var(--txt2);margin-bottom:14px">This is a 100% risk-free simulation using real market prices.</p>
    <div style="display:flex;flex-direction:column;gap:10px;font-size:13px;color:var(--txt2)">
      <div>1️⃣ <strong style="color:var(--txt)">Select instrument</strong> — choose from 14 pairs</div>
      <div>2️⃣ <strong style="color:var(--txt)">Set lot size</strong> — start with 0.10 (mini lot)</div>
      <div>3️⃣ <strong style="color:var(--txt)">Set Stop Loss</strong> — your maximum loss in pips</div>
      <div>4️⃣ <strong style="color:var(--txt)">Set Take Profit</strong> — your target in pips</div>
      <div>5️⃣ <strong style="color:var(--txt)">Click BUY or SELL</strong> — enter the market</div>
      <div>6️⃣ <strong style="color:var(--txt)">Close manually</strong> or wait for SL/TP to trigger</div>
    </div>
    <div style="margin-top:14px;padding:12px;background:var(--gold-bg);border:1px solid var(--bdr);border-radius:var(--rs)">
      <div style="font-size:12px;color:var(--txt2)"><strong style="color:var(--gold)">💡 Tip:</strong> Always aim for minimum 1:2 Risk/Reward. If SL = 30 pips, TP should be at least 60 pips.</div>
    </div>
    <button class="btn btn-gold" style="margin-top:16px" onclick="closeModal()">Got it!</button>
  `);
}

/* === js/screens/journal.js === */