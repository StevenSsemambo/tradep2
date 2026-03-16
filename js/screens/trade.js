/* ═══════════════════════════════════════════════════════════════
   TRADEBABY PRO v10 — MT5-STYLE TRADING TERMINAL
   COMPLETE WORKING VERSION - Just copy and paste this entire file
   ═══════════════════════════════════════════════════════════════ */

(function() {
    // ============================================
    // STATE MANAGEMENT
    // ============================================
    let _simCurrentPair = 'EUR/USD';
    let _simCurrentPrice = 1.0847;
    let _simOpenTrade = null;
    let _simTodayTrades = [];
    let _termPriceInterval = null;
    let _animationFrame = null;

    let _chartTF = 'M5';
    let _chartOffset = 0;
    let _chartZoom = 1.0;
    let _chartCandles = {};
    let _chartIndicators = {
        ema20: true,
        ema50: true,
        ema200: false,
        bb: false,
        vwap: false,
        rsi: false,
        macd: false,
        sr: true
    };
    
    let _chartIsDragging = false;
    let _chartDragStartX = 0;
    let _chartDragStartOff = 0;
    let _chartMouseX = -1;
    let _chartMouseY = -1;
    
    // Drawing tools
    let _drawMode = false;
    let _drawLines = [];
    let _drawStart = null;
    let _historyOpen = false;

    // ============================================
    // CONSTANTS
    // ============================================
    const TRADE_PAIRS = [
        'EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CHF', 'USD/CAD',
        'GBP/JPY', 'EUR/JPY', 'NZD/USD', 'EUR/GBP', 'XAU/USD', 'NAS100', 'SPX500', 'US30'
    ];

    const TF_CONFIG = {
        M1: { count: 120, ms: 60000, vol: 0.00015 },
        M5: { count: 100, ms: 300000, vol: 0.00035 },
        M15: { count: 90, ms: 900000, vol: 0.00065 },
        H1: { count: 72, ms: 3600000, vol: 0.0012 },
        H4: { count: 60, ms: 14400000, vol: 0.0025 },
        D1: { count: 50, ms: 86400000, vol: 0.005 }
    };

    // ============================================
    // HELPER FUNCTIONS
    // ============================================
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

        if (_simCurrentPair.includes('JPY')) base *= 100;
        else if (_simCurrentPair.includes('XAU')) base *= 0.3;
        else if (_simCurrentPair.includes('NAS') || _simCurrentPair.includes('SPX') || _simCurrentPair.includes('US30')) base *= 5;

        return base * (overlap ? 1.6 : inSession ? 1.2 : 0.8);
    }

    function haptic(ms = 40) {
        try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) { }
    }

    function showToast(msg) {
        console.log('Toast:', msg);
        // You can implement a toast UI later
    }

    // ============================================
    // CANDLE GENERATION
    // ============================================
    function generateCandles(basePrice, tf, count) {
        const config = TF_CONFIG[tf] || TF_CONFIG.M5;
        const vol = config.vol;
        const candles = [];
        let price = basePrice;

        let trend = 0;
        let momentum = 0;

        for (let i = 0; i < count; i++) {
            if (Math.random() < 0.02) {
                trend += (Math.random() - 0.5) * vol * 2;
                trend = Math.max(-vol * 3, Math.min(vol * 3, trend));
            }

            momentum = momentum * 0.7 + (Math.random() - 0.5) * vol * 0.5;

            const open = price;
            const candleMove = trend + momentum + (Math.random() - 0.5) * vol;
            let close = open + candleMove;

            const meanPrice = basePrice;
            close = close * 0.98 + meanPrice * 0.02;

            const wickSize = Math.random() * vol * 0.8;
            const high = Math.max(open, close) + wickSize;
            const low = Math.min(open, close) - wickSize * (0.5 + Math.random() * 0.5);

            candles.push({
                open: Number(open.toFixed(5)),
                high: Number(high.toFixed(5)),
                low: Number(low.toFixed(5)),
                close: Number(close.toFixed(5)),
                volume: Math.floor(500 + Math.random() * 3000),
                time: Date.now() - (count - i) * config.ms,
                isBull: close >= open
            });

            price = close;
        }

        return candles;
    }

    function getChartCandles() {
        const key = _simCurrentPair + '_' + _chartTF;
        if (!_chartCandles[key] || _chartCandles[key].length === 0) {
            _chartCandles[key] = generateCandles(_simCurrentPrice, _chartTF, TF_CONFIG[_chartTF].count);
        }
        return _chartCandles[key];
    }

    function updateLastCandle() {
        const candles = getChartCandles();
        if (!candles || candles.length === 0) return;

        const lastCandle = candles[candles.length - 1];
        const now = Date.now();
        const config = TF_CONFIG[_chartTF];

        if (now - lastCandle.time >= config.ms) {
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

            const maxCandles = TF_CONFIG[_chartTF].count + 20;
            if (candles.length > maxCandles) {
                candles.shift();
                if (_chartOffset > 0) _chartOffset = Math.max(0, _chartOffset - 1);
            }
        } else {
            lastCandle.close = _simCurrentPrice;
            lastCandle.high = Math.max(lastCandle.high, _simCurrentPrice);
            lastCandle.low = Math.min(lastCandle.low, _simCurrentPrice);
            lastCandle.isBull = lastCandle.close >= lastCandle.open;
            lastCandle.volume += Math.floor(Math.random() * 10);
        }
    }

    // ============================================
    // PRICE ENGINE
    // ============================================
    function terminalPriceTick() {
        const vol = getSessionVol() * 0.3;
        const move = (Math.random() - 0.499) * vol;
        const trend = (Math.sin(Date.now() / 30000) * 0.00001);

        _simCurrentPrice = Math.max(0.0001, _simCurrentPrice + move + trend);

        updateLastCandle();

        // Update UI
        const priceEl = document.getElementById('term-price');
        if (priceEl) {
            priceEl.textContent = _simCurrentPrice.toFixed(getPairDecimals(_simCurrentPair));
        }

        updateOpenPnL();
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

        if (_simOpenTrade.dir === 'BUY') {
            if (_simCurrentPrice <= _simOpenTrade.sl) closeSimTrade('Stop Loss');
            if (_simCurrentPrice >= _simOpenTrade.tp) closeSimTrade('Take Profit');
        } else {
            if (_simCurrentPrice >= _simOpenTrade.sl) closeSimTrade('Stop Loss');
            if (_simCurrentPrice <= _simOpenTrade.tp) closeSimTrade('Take Profit');
        }
    }

    // ============================================
    // TRADING FUNCTIONS
    // ============================================
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
        
        // Re-render the trade section
        const tradeSection = document.querySelector('.trade-info');
        if (tradeSection) updateTradeDisplay();
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
        
        updateTradeDisplay();
    }

    function updateTradeDisplay() {
        const tradeSection = document.querySelector('.trade-info');
        if (!tradeSection) return;

        if (_simOpenTrade) {
            tradeSection.innerHTML = `
                <div style="display:flex;align-items:center;gap:10px;flex:1;background:#1A1206;border:1px solid #EF535055;border-radius:4px;padding:6px 10px">
                    <div>
                        <div style="font-size:9px;color:#787B86;font-family:monospace">LIVE P&L</div>
                        <span id="live-pnl" style="font-size:16px;font-family:monospace;font-weight:700;color:#B2B5BE">$0.00</span>
                    </div>
                    <button onclick="window.terminal.close()"
                        style="flex:1;padding:12px 8px;background:#C62828;border:2px solid #EF5350;border-radius:4px;color:#fff;font-family:monospace;font-weight:800;font-size:14px;cursor:pointer;letter-spacing:.5px">
                        ■ CLOSE TRADE
                    </button>
                </div>
            `;
        } else {
            tradeSection.innerHTML = `
                <button onclick="window.terminal.buy()"
                    style="flex:1;padding:12px 8px;background:#0A2E1A;border:2px solid #26A69A;border-radius:4px;color:#26A69A;font-family:monospace;font-weight:800;font-size:14px;cursor:pointer;line-height:1.3">
                    ▲ BUY<br><span style="font-size:10px;opacity:.8;font-weight:400">${(_simCurrentPrice + getPipValue(_simCurrentPair) * 2).toFixed(getPairDecimals(_simCurrentPair))}</span>
                </button>
                <button onclick="window.terminal.sell()"
                    style="flex:1;padding:12px 8px;background:#2E0A0A;border:2px solid #EF5350;border-radius:4px;color:#EF5350;font-family:monospace;font-weight:800;font-size:14px;cursor:pointer;line-height:1.3">
                    ▼ SELL<br><span style="font-size:10px;opacity:.8;font-weight:400">${_simCurrentPrice.toFixed(getPairDecimals(_simCurrentPair))}</span>
                </button>
            `;
        }
    }

    // ============================================
    // CHART RENDERING
    // ============================================
    function renderChart() {
        const canvas = document.getElementById('main-chart');
        if (!canvas) return;

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

        // Clear
        ctx.fillStyle = '#0A0C14';
        ctx.fillRect(0, 0, w, h);

        // Calculate visible range
        const visibleCount = Math.floor(40 * _chartZoom);
        const totalCandles = candles.length;
        let endIndex = Math.max(0, totalCandles - _chartOffset);
        let startIndex = Math.max(0, endIndex - visibleCount);

        if (startIndex < 0) startIndex = 0;
        if (endIndex > totalCandles) endIndex = totalCandles;
        if (endIndex - startIndex < 5) {
            startIndex = Math.max(0, endIndex - 10);
        }

        const visibleCandles = candles.slice(startIndex, endIndex);
        if (visibleCandles.length === 0) return;

        // Calculate price range
        let minPrice = Math.min(...visibleCandles.map(c => c.low));
        let maxPrice = Math.max(...visibleCandles.map(c => c.high));
        const priceRange = maxPrice - minPrice;
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

        const yPos = (price) => PAD_T + plotH - ((price - minPrice) / range) * plotH;

        // Draw grid
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 1;

        for (let i = 0; i <= 5; i++) {
            const y = PAD_T + (i / 5) * plotH;
            ctx.beginPath();
            ctx.moveTo(PAD_L, y);
            ctx.lineTo(w - PAD_R, y);
            ctx.stroke();

            const price = maxPrice - (i / 5) * range;
            ctx.fillStyle = '#5D6577';
            ctx.font = '9px monospace';
            ctx.textAlign = 'right';
            ctx.fillText(price.toFixed(getPairDecimals(_simCurrentPair)), PAD_L - 5, y - 3);
        }

        // Vertical grid
        for (let i = 0; i < visibleCandles.length; i += Math.max(1, Math.floor(visibleCandles.length / 6))) {
            const x = PAD_L + i * candleSpacing + candleSpacing / 2;
            ctx.beginPath();
            ctx.moveTo(x, PAD_T);
            ctx.lineTo(x, h - PAD_B);
            ctx.stroke();

            const candle = visibleCandles[i];
            if (candle && candle.time) {
                const date = new Date(candle.time);
                let timeLabel;
                if (_chartTF === 'D1') {
                    timeLabel = `${date.getMonth() + 1}/${date.getDate()}`;
                } else {
                    timeLabel = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
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

            // Wick
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, highY);
            ctx.lineTo(x, lowY);
            ctx.stroke();

            // Body
            const bodyTop = Math.min(openY, closeY);
            const bodyHeight = Math.max(1, Math.abs(closeY - openY));

            if (isBull && candleWidth > 3) {
                ctx.fillStyle = '#0A0C14';
                ctx.strokeStyle = color;
                ctx.lineWidth = 1;
                ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
                ctx.strokeRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
            } else {
                ctx.fillStyle = color;
                ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
            }

            // Highlight last candle
            if (i === visibleCandles.length - 1) {
                ctx.shadowColor = color;
                ctx.shadowBlur = 8;
                ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
                ctx.shadowBlur = 0;
            }
        });

        // Current price line
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

        // Draw EMAs
        if (_chartIndicators.ema20) drawEMA(ctx, visibleCandles, PAD_L, PAD_T, plotW, plotH, minPrice, range, 20, '#2196F3');
        if (_chartIndicators.ema50) drawEMA(ctx, visibleCandles, PAD_L, PAD_T, plotW, plotH, minPrice, range, 50, '#9C27B0');

        // Crosshair
        if (_chartMouseX > PAD_L && _chartMouseX < w - PAD_R &&
            _chartMouseY > PAD_T && _chartMouseY < h - PAD_B) {
            drawCrosshair(ctx, _chartMouseX, _chartMouseY, PAD_L, PAD_T, plotW, plotH, minPrice, range);
        }
    }

    function drawEMA(ctx, candles, padL, padT, plotW, plotH, minPrice, range, period, color) {
        if (candles.length < period) return;

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

        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
    }

    function drawCrosshair(ctx, mx, my, padL, padT, plotW, plotH, minPrice, range) {
        ctx.strokeStyle = 'rgba(150,150,170,0.3)';
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        ctx.moveTo(mx, padT);
        ctx.lineTo(mx, padT + plotH);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(padL, my);
        ctx.lineTo(padL + plotW, my);
        ctx.stroke();

        const price = minPrice + ((padT + plotH - my) / plotH) * range;
        ctx.fillStyle = '#FFC107';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(price.toFixed(getPairDecimals(_simCurrentPair)), padL - 5, my - 3);
    }

    // ============================================
    // EVENT HANDLERS
    // ============================================
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
            const moveAmount = Math.round(dx / 20);

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

    // ============================================
    // UI CONTROLS
    // ============================================
    function terminalChangePair(pair) {
        _simCurrentPair = pair;
        _simCurrentPrice = 1.0847 + (Math.random() - 0.5) * 0.1;
        _chartCandles = {};
        _chartOffset = 0;
        _drawLines = [];
        updateTradeDisplay();
    }

    function terminalSetTF(tf) {
        _chartTF = tf;
        _chartOffset = 0;
        _chartCandles = {};
        
        // Update button styles
        document.querySelectorAll('.timeframe-btn').forEach(btn => {
            const btnTf = btn.getAttribute('data-tf');
            if (btnTf === tf) {
                btn.style.background = '#2962FF';
                btn.style.color = '#fff';
                btn.style.borderColor = '#2962FF';
            } else {
                btn.style.background = '#1C1F2B';
                btn.style.color = '#787B86';
                btn.style.borderColor = '#363A4A';
            }
        });
    }

    function terminalToggleInd(key) {
        _chartIndicators[key] = !_chartIndicators[key];

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

    // ============================================
    // INITIALIZATION
    // ============================================
    function initTerminal() {
        console.log('Initializing terminal...');
        
        // Clear existing intervals
        if (_termPriceInterval) clearInterval(_termPriceInterval);
        if (_animationFrame) cancelAnimationFrame(_animationFrame);

        // Get canvas
        const canvas = document.getElementById('main-chart');
        if (!canvas) {
            console.error('Canvas not found!');
            return;
        }

        // Set up event listeners
        canvas.addEventListener('mousedown', onChartMouseDown);
        canvas.addEventListener('mousemove', onChartMouseMove);
        canvas.addEventListener('mouseup', onChartMouseUp);
        canvas.addEventListener('mouseleave', onChartMouseLeave);
        canvas.addEventListener('wheel', onChartWheel, { passive: false });

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
        updateTradeDisplay();
        
        console.log('Terminal initialized');
    }

    // ============================================
    // RENDER THE TERMINAL HTML
    // ============================================
    function renderTerminalHTML() {
        const container = document.getElementById('trading-terminal');
        if (!container) return;

        const decimals = getPairDecimals(_simCurrentPair);
        const askPrice = (_simCurrentPrice + getPipValue(_simCurrentPair) * 2).toFixed(decimals);
        const bidPrice = _simCurrentPrice.toFixed(decimals);

        container.innerHTML = `
            <div style="display:flex;flex-direction:column;height:100%;background:#0A0C14;color:#D1D4DC;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;overflow:hidden">
                
                <!-- Header -->
                <div style="flex-shrink:0;padding:8px 12px;background:#1E222D;border-bottom:1px solid #2A2E3D;display:flex;align-items:center;gap:15px">
                    <select id="pair-select" style="background:#0A0C14;border:1px solid #2A2E3D;border-radius:4px;padding:6px 10px;color:#D1D4DC;font-weight:600;cursor:pointer">
                        ${TRADE_PAIRS.map(p => `<option value="${p}" ${p === _simCurrentPair ? 'selected' : ''}>${p}</option>`).join('')}
                    </select>
                    
                    <div style="display:flex;gap:20px">
                        <div><span style="color:#787B86">Bid:</span> <span id="term-price" style="color:#26A69A;font-weight:600;font-family:monospace">${bidPrice}</span></div>
                        <div><span style="color:#787B86">Ask:</span> <span style="color:#EF5350;font-weight:600;font-family:monospace">${askPrice}</span></div>
                    </div>
                    
                    <div style="margin-left:auto;display:flex;gap:4px">
                        ${['M1','M5','M15','H1','H4','D1'].map(tf => `
                            <button class="timeframe-btn" data-tf="${tf}" onclick="window.terminal.setTF('${tf}')" style="padding:4px 10px;background:${_chartTF === tf ? '#2962FF' : '#1C1F2B'};border:1px solid ${_chartTF === tf ? '#2962FF' : '#363A4A'};border-radius:3px;color:${_chartTF === tf ? '#fff' : '#787B86'};font-size:11px;font-weight:600;cursor:pointer">${tf}</button>
                        `).join('')}
                    </div>
                </div>

                <!-- Chart Area -->
                <div style="flex:1;position:relative;min-height:0">
                    <canvas id="main-chart" style="width:100%;height:100%;display:block;cursor:crosshair"></canvas>
                </div>

                <!-- Indicator Toolbar -->
                <div style="flex-shrink:0;padding:6px 12px;background:#1E222D;border-top:1px solid #2A2E3D;border-bottom:1px solid #2A2E3D;display:flex;gap:6px;overflow-x:auto">
                    <span style="color:#787B86;font-size:11px;padding:4px 0">Indicators:</span>
                    <button id="indbtn-ema20" onclick="window.terminal.toggleInd('ema20')" style="padding:4px 10px;background:${_chartIndicators.ema20 ? '#2196F328' : 'transparent'};border:1px solid ${_chartIndicators.ema20 ? '#2196F3' : '#2A2E3D'};border-radius:3px;color:${_chartIndicators.ema20 ? '#2196F3' : '#5D6577'};font-size:10px;cursor:pointer">EMA20</button>
                    <button id="indbtn-ema50" onclick="window.terminal.toggleInd('ema50')" style="padding:4px 10px;background:${_chartIndicators.ema50 ? '#9C27B028' : 'transparent'};border:1px solid ${_chartIndicators.ema50 ? '#9C27B0' : '#2A2E3D'};border-radius:3px;color:${_chartIndicators.ema50 ? '#9C27B0' : '#5D6577'};font-size:10px;cursor:pointer">EMA50</button>
                    <button id="indbtn-sr" onclick="window.terminal.toggleInd('sr')" style="padding:4px 10px;background:${_chartIndicators.sr ? '#9E9E9E28' : 'transparent'};border:1px solid ${_chartIndicators.sr ? '#9E9E9E' : '#2A2E3D'};border-radius:3px;color:${_chartIndicators.sr ? '#9E9E9E' : '#5D6577'};font-size:10px;cursor:pointer">S/R</button>
                    <button onclick="window.terminal.resetZoom()" style="padding:4px 10px;background:transparent;border:1px solid #2A2E3D;border-radius:3px;color:#5D6577;font-size:10px;cursor:pointer">Reset Zoom</button>
                </div>

                <!-- Trading Panel -->
                <div style="flex-shrink:0;padding:12px;background:#1E222D;display:flex;gap:15px;align-items:center">
                    <div style="display:flex;gap:10px">
                        <div>
                            <div style="font-size:10px;color:#787B86;margin-bottom:2px">Lots</div>
                            <select id="tp-lots" style="background:#0A0C14;border:1px solid #2A2E3D;border-radius:3px;padding:6px;color:#D1D4DC;width:80px">
                                <option>0.01</option>
                                <option>0.05</option>
                                <option selected>0.10</option>
                                <option>0.25</option>
                                <option>0.50</option>
                                <option>1.00</option>
                            </select>
                        </div>
                        <div>
                            <div style="font-size:10px;color:#EF5350;margin-bottom:2px">SL (pips)</div>
                            <input id="tp-sl" type="number" value="30" min="5" max="500" style="background:#0A0C14;border:1px solid #2A2E3D;border-radius:3px;padding:6px;color:#D1D4DC;width:70px">
                        </div>
                        <div>
                            <div style="font-size:10px;color:#26A69A;margin-bottom:2px">TP (pips)</div>
                            <input id="tp-tp" type="number" value="60" min="5" max="1000" style="background:#0A0C14;border:1px solid #2A2E3D;border-radius:3px;padding:6px;color:#D1D4DC;width:70px">
                        </div>
                    </div>

                    <div class="trade-info" style="flex:1;display:flex;gap:6px">
                        ${!_simOpenTrade ? `
                            <button onclick="window.terminal.buy()" style="flex:1;padding:12px;background:#0A2E1A;border:2px solid #26A69A;border-radius:4px;color:#26A69A;font-weight:800;font-size:14px;cursor:pointer">▲ BUY</button>
                            <button onclick="window.terminal.sell()" style="flex:1;padding:12px;background:#2E0A0A;border:2px solid #EF5350;border-radius:4px;color:#EF5350;font-weight:800;font-size:14px;cursor:pointer">▼ SELL</button>
                        ` : `
                            <div style="display:flex;align-items:center;gap:10px;flex:1;background:#1A1206;border:1px solid #EF535055;border-radius:4px;padding:6px 10px">
                                <div>
                                    <div style="font-size:9px;color:#787B86">LIVE P&L</div>
                                    <span id="live-pnl" style="font-size:16px;font-family:monospace;font-weight:700;color:#B2B5BE">$0.00</span>
                                </div>
                                <button onclick="window.terminal.close()" style="flex:1;padding:12px 8px;background:#C62828;border:2px solid #EF5350;border-radius:4px;color:#fff;font-weight:800;font-size:14px;cursor:pointer">CLOSE</button>
                            </div>
                        `}
                    </div>
                </div>

                <!-- Status Bar -->
                <div style="flex-shrink:0;padding:4px 12px;background:#1E222D;border-top:1px solid #2A2E3D;display:flex;gap:20px;font-size:10px;color:#787B86">
                    <span>Spread: 2.0 pips</span>
                    <span>Balance: $10,000</span>
                    <span id="open-positions">Open: ${_simOpenTrade ? 1 : 0}</span>
                    <span style="margin-left:auto">${new Date().toLocaleTimeString()}</span>
                </div>
            </div>
        `;

        // Add event listener for pair select
        const pairSelect = document.getElementById('pair-select');
        if (pairSelect) {
            pairSelect.addEventListener('change', (e) => {
                terminalChangePair(e.target.value);
            });
        }
    }

    // ============================================
    // PUBLIC API
    // ============================================
    window.terminal = {
        buy: () => openSimTrade('BUY'),
        sell: () => openSimTrade('SELL'),
        close: () => closeSimTrade('Manual'),
        setTF: (tf) => terminalSetTF(tf),
        toggleInd: (key) => terminalToggleInd(key),
        resetZoom: () => terminalResetZoom(),
        init: initTerminal
    };

    // ============================================
    // AUTO-START
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM loaded, creating terminal...');
        
        // Create container if it doesn't exist
        let container = document.getElementById('trading-terminal');
        if (!container) {
            container = document.createElement('div');
            container.id = 'trading-terminal';
            container.style.width = '100%';
            container.style.height = '100vh';
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';
            document.body.appendChild(container);
        }
        
        // Render HTML
        renderTerminalHTML();
        
        // Initialize
        setTimeout(() => {
            initTerminal();
        }, 100);
    });
})();
