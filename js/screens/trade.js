/* ═══════════════════════════════════════════════════════════════
   TRADEBABY PRO v10 — MT5-STYLE TRADING TERMINAL
   FIXED: Stable charts, smooth price movement, MT5 aesthetics
   ═══════════════════════════════════════════════════════════════ */

/* ── STATE ────────────────────────────────────────────────── */
let _simCurrentPair  = 'EUR/USD';
let _simCurrentPrice = 1.0847;
let _simOpenTrade    = null;
let _simTodayTrades  = [];
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
let _lastRenderTime = 0;
let _animationFrame = null;

/* Drawing tool state */
let _drawMode  = false;
let _drawLines = [];
let _drawStart = null;

/* Candle timing - FIXED: More realistic durations */
const TF_CONFIG = {
    M1:  { count: 120, ms: 60000,  vol: 0.00015 },
    M5:  { count: 100, ms: 300000, vol: 0.00035 },
    M15: { count: 90,  ms: 900000, vol: 0.00065 },
    H1:  { count: 72,  ms: 3600000, vol: 0.0012 },
    H4:  { count: 60,  ms: 14400000, vol: 0.0025 },
    D1:  { count: 50,  ms: 86400000, vol: 0.005 }
};

let _lastCandleTime = Date.now();
let _priceHistory = [];

const TRADE_PAIRS = [
    'EUR/USD','GBP/USD','USD/JPY','AUD/USD','USD/CHF','USD/CAD',
    'GBP/JPY','EUR/JPY','NZD/USD','EUR/GBP','XAU/USD','NAS100','SPX500','US30'
];

/* ── HELPER FUNCTIONS ───────────────────────────────────── */
function getPairDecimals(pair) {
    if (pair.includes('JPY')) return 3;
    if (pair.includes('XAU')) return 2;
    if (pair.includes('NAS') || pair.includes('SPX') || pair.includes('US30')) return 2;
    return 5;
}

function getPipValue(pair) {
    if (pair.includes('JPY')) return 0.01;
    if (pair.includes('XAU')) return 0.1;
    if (pair.includes('NAS') || pair.includes('SPX') || pair.includes('US30')) return 1;
    return 0.0001;
}

function getSessionVol() {
    const hr = new Date().getUTCHours();
    const inSession = (hr >= 7 && hr <= 17);
    const overlap = (hr >= 12 && hr <= 16);
    let base = TF_CONFIG[_chartTF]?.vol || 0.00035;
    
    // Pair multiplier
    if (_simCurrentPair.includes('JPY')) base *= 100;
    else if (_simCurrentPair.includes('XAU')) base *= 0.3;
    else if (_simCurrentPair.includes('NAS') || _simCurrentPair.includes('SPX') || _simCurrentPair.includes('US30')) base *= 5;
    
    return base * (overlap ? 1.6 : inSession ? 1.2 : 0.8);
}

/* ── HAPTIC ─────────────────────────────────────────────── */
function haptic(ms = 40) {
    try { if (navigator.vibrate) navigator.vibrate(ms); } catch(e) {}
}

/* ═══════════════════════════════════════════════════════════
   IMPROVED CANDLE GENERATION - Stable and realistic
   ═══════════════════════════════════════════════════════════ */
function generateCandles(basePrice, tf, count) {
    const config = TF_CONFIG[tf] || TF_CONFIG.M5;
    const vol = config.vol;
    const candles = [];
    let price = basePrice;
    
    // Create a persistent trend with momentum
    let trend = 0;
    let momentum = 0;
    
    for (let i = 0; i < count; i++) {
        // Update trend slowly
        if (Math.random() < 0.02) {
            trend += (Math.random() - 0.5) * vol * 2;
            trend = Math.max(-vol * 3, Math.min(vol * 3, trend));
        }
        
        // Momentum decays
        momentum = momentum * 0.7 + (Math.random() - 0.5) * vol * 0.5;
        
        // Generate candle
        const open = price;
        const candleMove = trend + momentum + (Math.random() - 0.5) * vol;
        let close = open + candleMove;
        
        // Add mean reversion to prevent runaway prices
        const meanPrice = basePrice;
        close = close * 0.98 + meanPrice * 0.02;
        
        // Calculate high/low with realistic wicks
        const wickSize = Math.random() * vol * 0.8;
        const high = Math.max(open, close) + wickSize;
        const low = Math.min(open, close) - wickSize * (0.5 + Math.random() * 0.5);
        
        const candle = {
            open: Number(open.toFixed(5)),
            high: Number(high.toFixed(5)),
            low: Number(low.toFixed(5)),
            close: Number(close.toFixed(5)),
            volume: Math.floor(500 + Math.random() * 3000),
            time: Date.now() - (count - i) * config.ms,
            isBull: close >= open
        };
        
        candles.push(candle);
        price = close;
    }
    
    return candles;
}

/* Get or generate candles for current pair/timeframe */
function getChartCandles() {
    const key = _simCurrentPair + '_' + _chartTF;
    if (!_chartCandles[key] || _chartCandles[key].length === 0) {
        _chartCandles[key] = generateCandles(_simCurrentPrice, _chartTF, TF_CONFIG[_chartTF].count);
    }
    return _chartCandles[key];
}

/* Update the last candle with current price */
function updateLastCandle() {
    const candles = getChartCandles();
    if (!candles || candles.length === 0) return;
    
    const lastCandle = candles[candles.length - 1];
    const now = Date.now();
    const config = TF_CONFIG[_chartTF];
    
    // Check if candle should be sealed
    if (now - lastCandle.time >= config.ms) {
        // Create new candle
        const newCandle = {
            open: lastCandle.close,
            high: lastCandle.close,
            low: lastCandle.close,
            close: lastCandle.close,
            volume: 0,
            time: lastCandle.time + config.ms,
            isBull: true
        };
        candles.push(newCandle);
        
        // Keep array size manageable
        const maxCandles = TF_CONFIG[_chartTF].count + 20;
        if (candles.length > maxCandles) {
            candles.shift();
            if (_chartOffset > 0) _chartOffset = Math.max(0, _chartOffset - 1);
        }
    } else {
        // Update current candle
        lastCandle.close = _simCurrentPrice;
        lastCandle.high = Math.max(lastCandle.high, _simCurrentPrice);
        lastCandle.low = Math.min(lastCandle.low, _simCurrentPrice);
        lastCandle.isBull = lastCandle.close >= lastCandle.open;
        lastCandle.volume += Math.floor(Math.random() * 10);
    }
}

/* Price tick - FIXED: Smooth, continuous movement */
function terminalPriceTick() {
    const vol = getSessionVol() * 0.3;
    const move = (Math.random() - 0.499) * vol;
    
    // Add tiny trend
    const trend = (Math.sin(Date.now() / 30000) * 0.00001);
    
    _simCurrentPrice = Math.max(0.0001, _simCurrentPrice + move + trend);
    
    // Store price for history
    _priceHistory.push({ price: _simCurrentPrice, time: Date.now() });
    if (_priceHistory.length > 100) _priceHistory.shift();
    
    // Update candle
    updateLastCandle();
    
    // Update UI
    const priceEl = document.getElementById('term-price');
    if (priceEl) {
        priceEl.textContent = _simCurrentPrice.toFixed(getPairDecimals(_simCurrentPair));
    }
    
    // Update P&L if trade open
    updateOpenPnL();
    
    // Render chart
    if (Date.now() - _lastRenderTime > 32) { // Cap at ~30fps
        renderChart();
        _lastRenderTime = Date.now();
    }
}

function updateOpenPnL() {
    if (!_simOpenTrade) return;
    
    const pipValue = getPipValue(_simCurrentPair);
    const points = _simOpenTrade.dir === 'BUY' 
        ? _simCurrentPrice - _simOpenTrade.entry 
        : _simOpenTrade.entry - _simCurrentPrice;
    
    const pips = points / pipValue;
    const pnl = pips * _simOpenTrade.lots * 10;
    
    const pnlStr = (pnl >= 0 ? '+' : '') + '$' + Math.abs(pnl).toFixed(2);
    const pnlColor = pnl >= 0 ? '#26A69A' : '#EF5350';
    
    ['live-pnl', 'open-live-pnl'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = pnlStr;
            el.style.color = pnlColor;
        }
    });
    
    // Check SL/TP
    if (_simOpenTrade.dir === 'BUY') {
        if (_simCurrentPrice <= _simOpenTrade.sl) closeSimTrade('Stop Loss');
        if (_simCurrentPrice >= _simOpenTrade.tp) closeSimTrade('Take Profit');
    } else {
        if (_simCurrentPrice >= _simOpenTrade.sl) closeSimTrade('Stop Loss');
        if (_simCurrentPrice <= _simOpenTrade.tp) closeSimTrade('Take Profit');
    }
}

/* ═══════════════════════════════════════════════════════════
   CHART RENDERING - FIXED: Stable and smooth
   ═══════════════════════════════════════════════════════════ */
function renderChart() {
    const canvas = document.getElementById('main-chart');
    if (!canvas) return;
    
    // Ensure canvas dimensions match container
    const container = canvas.parentElement;
    if (container) {
        canvas.width = container.clientWidth || 800;
        canvas.height = container.clientHeight || 400;
    }
    
    const ctx = canvas.getContext('2d');
    const candles = getChartCandles();
    if (!candles || candles.length === 0) return;
    
    const w = canvas.width;
    const h = canvas.height;
    
    // Clear with MT5 dark background
    ctx.fillStyle = '#0A0C14';
    ctx.fillRect(0, 0, w, h);
    
    // Calculate visible range
    const visibleCount = Math.floor(40 * _chartZoom);
    const totalCandles = candles.length;
    let endIndex = Math.max(0, totalCandles - _chartOffset);
    let startIndex = Math.max(0, endIndex - visibleCount);
    
    // Ensure we don't go out of bounds
    if (startIndex < 0) startIndex = 0;
    if (endIndex > totalCandles) endIndex = totalCandles;
    if (endIndex - startIndex < 5) {
        // Adjust to show at least 5 candles
        startIndex = Math.max(0, endIndex - 10);
    }
    
    const visibleCandles = candles.slice(startIndex, endIndex);
    if (visibleCandles.length === 0) return;
    
    // Calculate price range
    let minPrice = Math.min(...visibleCandles.map(c => c.low));
    let maxPrice = Math.max(...visibleCandles.map(c => c.high));
    const priceRange = maxPrice - minPrice;
    
    // Add padding
    const padding = priceRange * 0.05;
    minPrice -= padding;
    maxPrice += padding;
    const range = maxPrice - minPrice;
    
    // Chart area
    const PAD_L = 55;
    const PAD_R = 15;
    const PAD_T = 15;
    const PAD_B = 25;
    
    const plotW = w - PAD_L - PAD_R;
    const plotH = h - PAD_T - PAD_B;
    
    const candleSpacing = plotW / visibleCandles.length;
    const candleWidth = Math.max(2, candleSpacing * 0.7);
    
    // Helper function
    const yPos = (price) => PAD_T + plotH - ((price - minPrice) / range) * plotH;
    
    // Draw grid
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
        const y = PAD_T + (i / 5) * plotH;
        ctx.beginPath();
        ctx.moveTo(PAD_L, y);
        ctx.lineTo(w - PAD_R, y);
        ctx.stroke();
        
        // Price labels
        const price = maxPrice - (i / 5) * range;
        ctx.fillStyle = '#5D6577';
        ctx.font = '9px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(price.toFixed(getPairDecimals(_simCurrentPair)), PAD_L - 5, y - 3);
    }
    
    // Vertical grid lines
    for (let i = 0; i < visibleCandles.length; i += Math.max(1, Math.floor(visibleCandles.length / 6))) {
        const x = PAD_L + i * candleSpacing + candleSpacing / 2;
        ctx.beginPath();
        ctx.moveTo(x, PAD_T);
        ctx.lineTo(x, h - PAD_B);
        ctx.stroke();
        
        // Time labels
        const candle = visibleCandles[i];
        if (candle && candle.time) {
            const date = new Date(candle.time);
            let timeLabel;
            if (_chartTF === 'D1') {
                timeLabel = `${date.getMonth()+1}/${date.getDate()}`;
            } else {
                timeLabel = `${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`;
            }
            ctx.fillStyle = '#5D6577';
            ctx.font = '8px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(timeLabel, x, h - 5);
        }
    }
    
    // Draw candles
    visibleCandles.forEach((candle, i) => {
        const x = PAD_L + i * candleSpacing + candleSpacing / 2;
        
        const openY = yPos(candle.open);
        const closeY = yPos(candle.close);
        const highY = yPos(candle.high);
        const lowY = yPos(candle.low);
        
        const isBull = candle.close >= candle.open;
        const color = isBull ? '#26A69A' : '#EF5350';
        
        // Draw wick
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, highY);
        ctx.lineTo(x, lowY);
        ctx.stroke();
        
        // Draw body
        const bodyTop = Math.min(openY, closeY);
        const bodyHeight = Math.max(1, Math.abs(closeY - openY));
        
        if (isBull && candleWidth > 3) {
            // Hollow body for bullish
            ctx.fillStyle = '#0A0C14';
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.fillRect(x - candleWidth/2, bodyTop, candleWidth, bodyHeight);
            ctx.strokeRect(x - candleWidth/2, bodyTop, candleWidth, bodyHeight);
        } else {
            // Filled body for bearish
            ctx.fillStyle = color;
            ctx.fillRect(x - candleWidth/2, bodyTop, candleWidth, bodyHeight);
        }
        
        // Highlight last candle
        if (i === visibleCandles.length - 1) {
            ctx.shadowColor = color;
            ctx.shadowBlur = 8;
            ctx.fillRect(x - candleWidth/2, bodyTop, candleWidth, bodyHeight);
            ctx.shadowBlur = 0;
        }
    });
    
    // Draw current price line
    const currentY = yPos(_simCurrentPrice);
    ctx.strokeStyle = 'rgba(38,166,154,0.5)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(PAD_L, currentY);
    ctx.lineTo(w - PAD_R, currentY);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Price label
    ctx.fillStyle = '#2962FF';
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(_simCurrentPrice.toFixed(getPairDecimals(_simCurrentPair)), w - PAD_R - 5, currentY - 5);
    
    // Draw indicators (simplified for performance)
    if (_chartIndicators.ema20) drawEMA(ctx, visibleCandles, PAD_L, PAD_T, plotW, plotH, minPrice, range, 20, '#2196F3');
    if (_chartIndicators.ema50) drawEMA(ctx, visibleCandles, PAD_L, PAD_T, plotW, plotH, minPrice, range, 50, '#9C27B0');
    
    // Draw support/resistance
    if (_chartIndicators.sr) drawSupportResistance(ctx, visibleCandles, PAD_L, PAD_T, plotW, plotH, minPrice, range);
    
    // Crosshair
    if (_chartMouseX > PAD_L && _chartMouseX < w - PAD_R && 
        _chartMouseY > PAD_T && _chartMouseY < h - PAD_B) {
        drawCrosshair(ctx, _chartMouseX, _chartMouseY, PAD_L, PAD_T, plotW, plotH, minPrice, range);
    }
}

function drawEMA(ctx, candles, padL, padT, plotW, plotH, minPrice, range, period, color) {
    if (candles.length < period) return;
    
    // Calculate EMA
    const multiplier = 2 / (period + 1);
    let ema = candles[0].close;
    const points = [];
    
    for (let i = 0; i < candles.length; i++) {
        if (i === 0) {
            ema = candles[i].close;
        } else {
            ema = (candles[i].close - ema) * multiplier + ema;
        }
        
        const x = padL + (i / candles.length) * plotW;
        const y = padT + plotH - ((ema - minPrice) / range) * plotH;
        points.push({ x, y });
    }
    
    // Draw line
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
}

function drawSupportResistance(ctx, candles, padL, padT, plotW, plotH, minPrice, range) {
    const levels = [];
    const tolerance = (maxPrice - minPrice) * 0.01;
    
    // Find swing highs and lows
    for (let i = 2; i < candles.length - 2; i++) {
        // Swing high
        if (candles[i].high > candles[i-1].high && 
            candles[i].high > candles[i-2].high &&
            candles[i].high > candles[i+1].high && 
            candles[i].high > candles[i+2].high) {
            levels.push({ price: candles[i].high, type: 'resistance' });
        }
        
        // Swing low
        if (candles[i].low < candles[i-1].low && 
            candles[i].low < candles[i-2].low &&
            candles[i].low < candles[i+1].low && 
            candles[i].low < candles[i+2].low) {
            levels.push({ price: candles[i].low, type: 'support' });
        }
    }
    
    // Merge nearby levels
    const merged = [];
    levels.forEach(level => {
        const existing = merged.find(l => Math.abs(l.price - level.price) < tolerance);
        if (existing) {
            existing.strength = (existing.strength || 1) + 1;
        } else {
            merged.push({ ...level, strength: 1 });
        }
    });
    
    // Draw strongest levels
    merged.filter(l => l.strength >= 2).slice(-5).forEach(level => {
        const y = padT + plotH - ((level.price - minPrice) / range) * plotH;
        if (y < padT - 10 || y > padT + plotH + 10) return;
        
        ctx.strokeStyle = level.type === 'support' ? 'rgba(38,166,154,0.3)' : 'rgba(239,83,80,0.3)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(padL, y);
        ctx.lineTo(padL + plotW, y);
        ctx.stroke();
        
        ctx.fillStyle = level.type === 'support' ? '#26A69A' : '#EF5350';
        ctx.font = '8px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(level.price.toFixed(getPairDecimals(_simCurrentPair)), padL + 5, y - 3);
    });
    ctx.setLineDash([]);
}

function drawCrosshair(ctx, mx, my, padL, padT, plotW, plotH, minPrice, range) {
    // Vertical line
    ctx.strokeStyle = 'rgba(150,150,170,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(mx, padT);
    ctx.lineTo(mx, padT + plotH);
    ctx.stroke();
    
    // Horizontal line
    ctx.beginPath();
    ctx.moveTo(padL, my);
    ctx.lineTo(padL + plotW, my);
    ctx.stroke();
    
    // Price at crosshair
    const price = minPrice + ((padT + plotH - my) / plotH) * range;
    ctx.fillStyle = '#FFC107';
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(price.toFixed(getPairDecimals(_simCurrentPair)), padL - 5, my - 3);
}

/* ═══════════════════════════════════════════════════════════
   INITIALIZATION
   ═══════════════════════════════════════════════════════════ */
function initTerminal() {
    // Clear any existing interval
    if (_termPriceInterval) clearInterval(_termPriceInterval);
    if (_animationFrame) cancelAnimationFrame(_animationFrame);
    
    // Set up canvas
    const canvas = document.getElementById('main-chart');
    if (canvas) {
        canvas.addEventListener('mousedown', onChartMouseDown);
        canvas.addEventListener('mousemove', onChartMouseMove);
        canvas.addEventListener('mouseup', onChartMouseUp);
        canvas.addEventListener('mouseleave', onChartMouseLeave);
        canvas.addEventListener('wheel', onChartWheel, { passive: false });
        
        // Touch events
        canvas.addEventListener('touchstart', onChartTouchStart, { passive: false });
        canvas.addEventListener('touchmove', onChartTouchMove, { passive: false });
        canvas.addEventListener('touchend', onChartTouchEnd);
    }
    
    // Generate initial candles
    const key = _simCurrentPair + '_' + _chartTF;
    if (!_chartCandles[key]) {
        _chartCandles[key] = generateCandles(_simCurrentPrice, _chartTF, TF_CONFIG[_chartTF].count);
    }
    
    // Start price updates
    _termPriceInterval = setInterval(terminalPriceTick, 100);
    
    // Start render loop
    function renderLoop() {
        renderChart();
        _animationFrame = requestAnimationFrame(renderLoop);
    }
    renderLoop();
    
    // Initial render
    renderChart();
}

/* ── EVENT HANDLERS ─────────────────────────────────────── */
function onChartMouseDown(e) {
    _chartIsDragging = true;
    _chartDragStartX = e.clientX;
    _chartDragStartOff = _chartOffset;
    e.preventDefault();
}

function onChartMouseMove(e) {
    const rect = e.target.getBoundingClientRect();
    _chartMouseX = e.clientX - rect.left;
    _chartMouseY = e.clientY - rect.top;
    
    if (_chartIsDragging) {
        const dx = e.clientX - _chartDragStartX;
        const candles = getChartCandles();
        const visibleCount = Math.floor(40 * _chartZoom);
        const moveAmount = Math.round(dx / 20); // Adjust sensitivity
        
        _chartOffset = Math.max(0, Math.min(
            candles.length - visibleCount,
            _chartDragStartOff - moveAmount
        ));
    }
}

function onChartMouseUp() {
    _chartIsDragging = false;
}

function onChartMouseLeave() {
    _chartMouseX = -1;
    _chartMouseY = -1;
}

function onChartWheel(e) {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    _chartZoom = Math.max(0.5, Math.min(3, _chartZoom * zoomFactor));
}

function onChartTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = e.target.getBoundingClientRect();
    _chartDragStartX = touch.clientX;
    _chartDragStartOff = _chartOffset;
    _chartIsDragging = true;
}

function onChartTouchMove(e) {
    e.preventDefault();
    if (!_chartIsDragging) return;
    
    const touch = e.touches[0];
    const dx = touch.clientX - _chartDragStartX;
    const candles = getChartCandles();
    const visibleCount = Math.floor(40 * _chartZoom);
    const moveAmount = Math.round(dx / 20);
    
    _chartOffset = Math.max(0, Math.min(
        candles.length - visibleCount,
        _chartDragStartOff - moveAmount
    ));
}

function onChartTouchEnd() {
    _chartIsDragging = false;
}

/* ═══════════════════════════════════════════════════════════
   TRADING FUNCTIONS
   ═══════════════════════════════════════════════════════════ */
function openSimTrade(dir) {
    haptic(40);
    if (_simOpenTrade) {
        alert('Close existing position first');
        return;
    }
    
    const lots = parseFloat(document.getElementById('tp-lots')?.value || '0.10');
    const slPips = parseInt(document.getElementById('tp-sl')?.value || '30');
    const tpPips = parseInt(document.getElementById('tp-tp')?.value || '60');
    const pipValue = getPipValue(_simCurrentPair);
    
    _simOpenTrade = {
        dir: dir,
        entry: _simCurrentPrice,
        lots: lots,
        sl: dir === 'BUY' ? _simCurrentPrice - slPips * pipValue : _simCurrentPrice + slPips * pipValue,
        tp: dir === 'BUY' ? _simCurrentPrice + tpPips * pipValue : _simCurrentPrice - tpPips * pipValue,
        time: new Date().toISOString()
    };
    
    showToast(`${dir} ${_simCurrentPair} @ ${_simCurrentPrice.toFixed(getPairDecimals(_simCurrentPair))}`);
}

function closeSimTrade(reason = 'Manual') {
    if (!_simOpenTrade) return;
    haptic(60);
    
    const pipValue = getPipValue(_simCurrentPair);
    const points = _simOpenTrade.dir === 'BUY' 
        ? _simCurrentPrice - _simOpenTrade.entry 
        : _simOpenTrade.entry - _simCurrentPrice;
    
    const pips = points / pipValue;
    const pnl = pips * _simOpenTrade.lots * 10;
    
    _simTodayTrades.push({
        pair: _simCurrentPair,
        dir: _simOpenTrade.dir,
        entry: _simOpenTrade.entry.toFixed(getPairDecimals(_simCurrentPair)),
        exit: _simCurrentPrice.toFixed(getPairDecimals(_simCurrentPair)),
        lots: _simOpenTrade.lots,
        pnl: pnl,
        reason: reason
    });
    
    _simOpenTrade = null;
    showToast(`${reason}: ${pnl >= 0 ? '+' : ''}$${pnl.toFixed(2)}`);
}

/* ═══════════════════════════════════════════════════════════
   UI CONTROLS
   ═══════════════════════════════════════════════════════════ */
function terminalChangePair(pair) {
    _simCurrentPair = pair;
    _simCurrentPrice = 1.0847 + (Math.random() - 0.5) * 0.1;
    _chartCandles = {};
    _chartOffset = 0;
    _drawLines = [];
    initTerminal();
}

function terminalSetTF(tf) {
    _chartTF = tf;
    _chartOffset = 0;
    _chartCandles = {}; // Force regenerate
    initTerminal();
}

function terminalToggleInd(key) {
    _chartIndicators[key] = !_chartIndicators[key];
    
    // Update button styles
    const colors = {
        ema20: '#2196F3', ema50: '#9C27B0', ema200: '#FF6D00',
        bb: '#4CAF50', vwap: '#E91E63', rsi: '#F44336',
        macd: '#FFC107', sr: '#9E9E9E'
    };
    
    const btn = document.getElementById('indbtn-' + key);
    if (btn) {
        const active = _chartIndicators[key];
        btn.style.border = `1px solid ${active ? colors[key] : '#2A2E3D'}`;
        btn.style.background = active ? colors[key] + '28' : 'transparent';
        btn.style.color = active ? colors[key] : '#5D6577';
    }
}

function terminalResetZoom() {
    _chartOffset = 0;
    _chartZoom = 1;
}

function toggleDrawTool(mode) {
    _drawMode = _drawMode === mode ? false : mode;
}

function clearDrawLines() {
    _drawLines = [];
}

/* ═══════════════════════════════════════════════════════════
   EXPORTS
   ═══════════════════════════════════════════════════════════ */
window.terminal = {
    changePair: terminalChangePair,
    setTF: terminalSetTF,
    toggleInd: terminalToggleInd,
    resetZoom: terminalResetZoom,
    toggleDraw: toggleDrawTool,
    clearDraw: clearDrawLines,
    buy: () => openSimTrade('BUY'),
    sell: () => openSimTrade('SELL'),
    close: () => closeSimTrade('Manual'),
    init: initTerminal
};
