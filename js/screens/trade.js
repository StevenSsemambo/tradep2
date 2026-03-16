// ============================================
// TRADING TERMINAL MODULE
// Single file that exports a terminal component
// ============================================

const TradingTerminal = (function() {
    // Private variables
    let container = null;
    let isActive = false;
    let animationFrame = null;
    
    // ============================================
    // STYLES - Injected CSS (scoped to terminal)
    // ============================================
    const styles = `
        .terminal-container {
            width: 100%;
            height: 100%;
            background: #0a0b0d;
            color: #e0e0e0;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .terminal-header {
            background: #1e2226;
            padding: 8px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #2a2e33;
            font-size: 14px;
        }

        .symbol-info {
            display: flex;
            gap: 30px;
        }

        .symbol {
            color: #4caf50;
            font-weight: bold;
            font-size: 16px;
        }

        .price-info {
            display: flex;
            gap: 20px;
        }

        .bid { color: #ff4d4d; }
        .ask { color: #4caf50; }

        .terminal-main {
            display: flex;
            flex: 1;
            overflow: hidden;
        }

        .chart-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            background: #131722;
            position: relative;
        }

        .chart-toolbar {
            background: #1e2226;
            padding: 5px 10px;
            display: flex;
            gap: 15px;
            border-bottom: 1px solid #2a2e33;
        }

        .timeframe-btn {
            background: transparent;
            border: none;
            color: #8a8d92;
            padding: 5px 10px;
            cursor: pointer;
            font-size: 12px;
            border-radius: 3px;
        }

        .timeframe-btn.active {
            background: #2a2e33;
            color: #4caf50;
        }

        .timeframe-btn:hover {
            background: #2a2e33;
        }

        #terminal-chart-canvas {
            width: 100%;
            flex: 1;
            background: #131722;
            cursor: crosshair;
        }

        .trading-panel {
            width: 300px;
            background: #1e2226;
            border-left: 1px solid #2a2e33;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
        }

        .account-summary {
            padding: 20px;
            background: #262b31;
            border-bottom: 1px solid #2a2e33;
        }

        .balance-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 14px;
        }

        .balance-value {
            font-weight: bold;
            color: #4caf50;
        }

        .equity-value { color: #4caf50; }
        .margin-value { color: #ffd700; }
        .free-margin-value { color: #4caf50; }

        .trading-controls {
            padding: 20px;
            border-bottom: 1px solid #2a2e33;
        }

        .trade-type {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
        }

        .trade-btn {
            flex: 1;
            padding: 12px;
            border: none;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
        }

        .buy-btn {
            background: #2e7d32;
            color: white;
        }

        .buy-btn:hover { background: #1b5e20; }

        .sell-btn {
            background: #c62828;
            color: white;
        }

        .sell-btn:hover { background: #8e0000; }

        .position-size {
            margin-bottom: 15px;
        }

        .position-size label {
            display: block;
            margin-bottom: 5px;
            font-size: 12px;
            color: #8a8d92;
        }

        .position-size input {
            width: 100%;
            padding: 8px;
            background: #2a2e33;
            border: 1px solid #3a3e43;
            color: white;
            border-radius: 3px;
        }

        .positions-section {
            padding: 20px;
            flex: 1;
        }

        .section-title {
            font-size: 14px;
            margin-bottom: 15px;
            color: #8a8d92;
        }

        .position-item {
            background: #262b31;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 10px;
            font-size: 12px;
            border-left: 3px solid;
        }

        .position-item.buy { border-left-color: #4caf50; }
        .position-item.sell { border-left-color: #ff4d4d; }

        .position-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
        }

        .position-details {
            display: flex;
            justify-content: space-between;
            color: #8a8d92;
        }

        .close-position {
            background: #c62828;
            color: white;
            border: none;
            padding: 3px 10px;
            border-radius: 3px;
            cursor: pointer;
            font-size: 11px;
        }

        .close-position:hover {
            background: #8e0000;
        }

        .indicators-panel {
            padding: 20px;
            border-top: 1px solid #2a2e33;
        }

        .indicator-checkbox {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
        }

        .status-bar {
            background: #1e2226;
            padding: 5px 20px;
            border-top: 1px solid #2a2e33;
            font-size: 12px;
            color: #8a8d92;
            display: flex;
            gap: 30px;
        }
    `;

    // ============================================
    // TERMINAL STATE
    // ============================================
    const TerminalState = {
        symbol: 'EURUSD',
        balance: 10000,
        equity: 10000,
        margin: 0,
        freeMargin: 10000,
        bid: 1.10000,
        ask: 1.10020,
        spread: 0.00020,
        
        positions: [],
        candles: [],
        currentCandle: null,
        
        // Market parameters
        trend: 0,
        volatility: 0.0002,
        momentum: 0,
        
        // Timeframe settings
        timeframe: '1m',
        candleSeconds: 60,
        lastCandleTime: Date.now(),
        
        // Indicators
        showRSI: true,
        showMACD: false,
        showEMA: false,
        
        // Chart settings
        visibleCandles: 80,
        
        // Mouse position for crosshair
        mouseX: null,
        mouseY: null
    };

    // ============================================
    // PRIVATE METHODS
    // ============================================
    function generateMarketMovement() {
        TerminalState.trend += (Math.random() - 0.5) * 0.00001;
        TerminalState.trend = Math.max(-0.001, Math.min(0.001, TerminalState.trend));
        
        TerminalState.momentum += (Math.random() - 0.5) * 0.0001;
        TerminalState.momentum = TerminalState.momentum * 0.9;
        
        const noise = (Math.random() - 0.5) * TerminalState.volatility;
        const move = TerminalState.trend + TerminalState.momentum + noise;
        
        TerminalState.bid += move;
        TerminalState.bid = Math.max(0.8, Math.min(1.4, TerminalState.bid));
        TerminalState.ask = TerminalState.bid + TerminalState.spread;
        
        // Update UI if active
        if (isActive) {
            const bidEl = document.getElementById('terminal-bid-price');
            const askEl = document.getElementById('terminal-ask-price');
            if (bidEl) bidEl.textContent = TerminalState.bid.toFixed(5);
            if (askEl) askEl.textContent = TerminalState.ask.toFixed(5);
        }
    }

    function updateCandles() {
        const now = Date.now();
        const secondsSinceLastCandle = (now - TerminalState.lastCandleTime) / 1000;
        
        if (secondsSinceLastCandle >= TerminalState.candleSeconds) {
            if (TerminalState.currentCandle) {
                TerminalState.currentCandle.close = TerminalState.bid;
                TerminalState.candles.push(TerminalState.currentCandle);
                
                if (TerminalState.candles.length > 1000) {
                    TerminalState.candles.shift();
                }
            }
            
            TerminalState.currentCandle = {
                open: TerminalState.bid,
                high: TerminalState.bid,
                low: TerminalState.bid,
                close: TerminalState.bid,
                time: now
            };
            
            TerminalState.lastCandleTime = now;
        } else {
            if (TerminalState.currentCandle) {
                TerminalState.currentCandle.high = Math.max(TerminalState.currentCandle.high, TerminalState.bid);
                TerminalState.currentCandle.low = Math.min(TerminalState.currentCandle.low, TerminalState.bid);
                TerminalState.currentCandle.close = TerminalState.bid;
            } else {
                TerminalState.currentCandle = {
                    open: TerminalState.bid,
                    high: TerminalState.bid,
                    low: TerminalState.bid,
                    close: TerminalState.bid,
                    time: now
                };
            }
        }
    }

    function calculateRSI(period = 14) {
        if (TerminalState.candles.length < period + 1) return null;
        
        let gains = 0;
        let losses = 0;
        
        for (let i = TerminalState.candles.length - period; i < TerminalState.candles.length; i++) {
            const change = TerminalState.candles[i].close - TerminalState.candles[i-1].close;
            if (change >= 0) {
                gains += change;
            } else {
                losses -= change;
            }
        }
        
        const avgGain = gains / period;
        const avgLoss = losses / period;
        
        if (avgLoss === 0) return 100;
        
        const rs = avgGain / avgLoss;
        return 100 - (100 / (1 + rs));
    }

    function calculateEMA(period = 20) {
        if (TerminalState.candles.length < period) return [];
        
        const prices = TerminalState.candles.slice(-period * 2).map(c => c.close);
        const multiplier = 2 / (period + 1);
        const ema = [prices[0]];
        
        for (let i = 1; i < prices.length; i++) {
            ema.push((prices[i] - ema[i-1]) * multiplier + ema[i-1]);
        }
        
        return ema.slice(-TerminalState.visibleCandles);
    }

    function calculateRSISlice(candles) {
        let gains = 0, losses = 0;
        for (let i = 1; i < candles.length; i++) {
            const change = candles[i].close - candles[i-1].close;
            if (change >= 0) gains += change;
            else losses -= change;
        }
        const avgGain = gains / 14;
        const avgLoss = losses / 14;
        if (avgLoss === 0) return 100;
        return 100 - (100 / (1 + avgGain / avgLoss));
    }

    function drawChart() {
        if (!isActive) return;
        
        const canvas = document.getElementById('terminal-chart-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const candles = [...TerminalState.candles, TerminalState.currentCandle].filter(Boolean).slice(-TerminalState.visibleCandles);
        if (candles.length === 0) return;
        
        const prices = candles.flatMap(c => [c.high, c.low]);
        const maxPrice = Math.max(...prices);
        const minPrice = Math.min(...prices);
        const priceRange = maxPrice - minPrice || 1;
        
        const padding = { top: 20, bottom: 30, left: 50, right: 20 };
        const chartWidth = canvas.width - padding.left - padding.right;
        const chartHeight = canvas.height - padding.top - padding.bottom;
        
        const candleWidth = Math.max(3, (chartWidth / candles.length) * 0.7);
        const spacing = (chartWidth / candles.length) * 0.3;
        
        // Draw grid
        ctx.strokeStyle = '#2a2e33';
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i <= 5; i++) {
            const y = padding.top + (i / 5) * chartHeight;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(canvas.width - padding.right, y);
            ctx.stroke();
            
            const price = maxPrice - (i / 5) * priceRange;
            ctx.fillStyle = '#8a8d92';
            ctx.font = '10px Arial';
            ctx.fillText(price.toFixed(5), 5, y - 5);
        }
        
        // Draw candles
        candles.forEach((candle, index) => {
            const x = padding.left + index * (candleWidth + spacing);
            
            const highY = padding.top + ((maxPrice - candle.high) / priceRange) * chartHeight;
            const lowY = padding.top + ((maxPrice - candle.low) / priceRange) * chartHeight;
            const openY = padding.top + ((maxPrice - candle.open) / priceRange) * chartHeight;
            const closeY = padding.top + ((maxPrice - candle.close) / priceRange) * chartHeight;
            
            ctx.strokeStyle = '#8a8d92';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x + candleWidth / 2, highY);
            ctx.lineTo(x + candleWidth / 2, lowY);
            ctx.stroke();
            
            const isBullish = candle.close >= candle.open;
            ctx.fillStyle = isBullish ? '#4caf50' : '#ff4d4d';
            ctx.fillRect(x, Math.min(openY, closeY), candleWidth, Math.abs(closeY - openY) || 1);
        });
        
        // Draw indicators
        if (TerminalState.showRSI && candles.length > 15) {
            drawRSI(ctx, candles, padding, chartWidth, chartHeight, maxPrice, minPrice);
        }
        
        if (TerminalState.showEMA && candles.length > 20) {
            drawEMA(ctx, candles, padding, chartWidth, chartHeight, maxPrice, minPrice);
        }
        
        // Draw crosshair
        if (TerminalState.mouseX && TerminalState.mouseY) {
            ctx.strokeStyle = '#4caf50';
            ctx.lineWidth = 0.5;
            ctx.setLineDash([5, 5]);
            
            ctx.beginPath();
            ctx.moveTo(padding.left, TerminalState.mouseY);
            ctx.lineTo(canvas.width - padding.right, TerminalState.mouseY);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(TerminalState.mouseX, padding.top);
            ctx.lineTo(TerminalState.mouseX, canvas.height - padding.bottom);
            ctx.stroke();
            
            ctx.setLineDash([]);
        }
    }

    function drawRSI(ctx, candles, padding, chartWidth, chartHeight, maxPrice, minPrice) {
        const rsiValues = [];
        for (let i = 14; i < candles.length; i++) {
            rsiValues.push(calculateRSISlice(candles.slice(i - 14, i + 1)));
        }
        
        if (rsiValues.length < 2) return;
        
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        
        rsiValues.forEach((rsi, index) => {
            const x = padding.left + (index + 14) * ((chartWidth) / candles.length);
            const y = padding.top + ((70 - Math.min(70, Math.max(30, rsi))) / 100) * chartHeight * 0.3;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
    }

    function drawEMA(ctx, candles, padding, chartWidth, chartHeight, maxPrice, minPrice) {
        const ema = calculateEMA(20);
        if (ema.length < 2) return;
        
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        
        ema.forEach((value, index) => {
            const x = padding.left + (index + candles.length - ema.length) * (chartWidth / candles.length);
            const y = padding.top + ((maxPrice - value) / (maxPrice - minPrice)) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
    }

    function openPosition(type) {
        const lotSize = parseFloat(document.getElementById('terminal-lot-size').value) || 0.01;
        const contractSize = 100000;
        const marginRequired = (lotSize * contractSize * TerminalState.ask) / 100;
        
        if (marginRequired > TerminalState.freeMargin) {
            alert('Insufficient margin!');
            return;
        }
        
        const position = {
            id: Date.now() + Math.random(),
            type: type,
            lot: lotSize,
            entry: type === 'buy' ? TerminalState.ask : TerminalState.bid,
            current: type === 'buy' ? TerminalState.bid : TerminalState.ask,
            swap: 0,
            time: new Date().toLocaleTimeString()
        };
        
        TerminalState.positions.push(position);
        TerminalState.margin += marginRequired;
        updateAccount();
        renderPositions();
    }

    function closePosition(positionId) {
        const index = TerminalState.positions.findIndex(p => p.id === positionId);
        if (index === -1) return;
        
        const position = TerminalState.positions[index];
        const closePrice = position.type === 'buy' ? TerminalState.bid : TerminalState.ask;
        
        const points = position.type === 'buy' 
            ? closePrice - position.entry 
            : position.entry - closePrice;
        
        const profit = points * position.lot * 100000;
        
        TerminalState.balance += profit;
        TerminalState.positions.splice(index, 1);
        
        TerminalState.margin = TerminalState.positions.reduce((total, pos) => {
            return total + (pos.lot * 100000 * TerminalState.ask) / 100;
        }, 0);
        
        updateAccount();
        renderPositions();
    }

    function updateAccount() {
        let unrealizedPL = 0;
        TerminalState.positions.forEach(pos => {
            const currentPrice = pos.type === 'buy' ? TerminalState.bid : TerminalState.ask;
            const points = pos.type === 'buy' 
                ? currentPrice - pos.entry 
                : pos.entry - currentPrice;
            unrealizedPL += points * pos.lot * 100000;
        });
        
        TerminalState.equity = TerminalState.balance + unrealizedPL;
        TerminalState.freeMargin = TerminalState.equity - TerminalState.margin;
        
        if (isActive) {
            const balanceEl = document.getElementById('terminal-balance');
            const equityEl = document.getElementById('terminal-equity');
            const marginEl = document.getElementById('terminal-margin');
            const freeMarginEl = document.getElementById('terminal-free-margin');
            
            if (balanceEl) balanceEl.textContent = `$${TerminalState.balance.toFixed(2)}`;
            if (equityEl) equityEl.textContent = `$${TerminalState.equity.toFixed(2)}`;
            if (marginEl) marginEl.textContent = `$${TerminalState.margin.toFixed(2)}`;
            if (freeMarginEl) freeMarginEl.textContent = `$${TerminalState.freeMargin.toFixed(2)}`;
        }
    }

    function renderPositions() {
        if (!isActive) return;
        
        const container = document.getElementById('terminal-positions-list');
        if (!container) return;
        
        if (TerminalState.positions.length === 0) {
            container.innerHTML = '<div style="color: #8a8d92; text-align: center; padding: 20px;">No open positions</div>';
            return;
        }
        
        container.innerHTML = TerminalState.positions.map(pos => {
            const currentPrice = pos.type === 'buy' ? TerminalState.bid : TerminalState.ask;
            const points = pos.type === 'buy' 
                ? currentPrice - pos.entry 
                : pos.entry - currentPrice;
            const profit = points * pos.lot * 100000;
            
            return `
                <div class="position-item ${pos.type}">
                    <div class="position-header">
                        <span>${pos.type.toUpperCase()} ${pos.lot.toFixed(2)}</span>
                        <span style="color: ${profit >= 0 ? '#4caf50' : '#ff4d4d'}">
                            $${profit.toFixed(2)}
                        </span>
                    </div>
                    <div class="position-details">
                        <span>${pos.entry.toFixed(5)}</span>
                        <span>${pos.time}</span>
                        <button class="close-position" onclick="TradingTerminalAPI.closePosition(${pos.id})">Close</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    function setupEventListeners() {
        if (!container) return;
        
        // Timeframe buttons
        container.querySelectorAll('.timeframe-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tf = e.target.dataset.timeframe;
                setTimeframe(tf);
            });
        });
        
        // Indicator checkboxes
        const rsiCheckbox = document.getElementById('terminal-show-rsi');
        const macdCheckbox = document.getElementById('terminal-show-macd');
        const emaCheckbox = document.getElementById('terminal-show-ema');
        
        if (rsiCheckbox) {
            rsiCheckbox.addEventListener('change', (e) => {
                TerminalState.showRSI = e.target.checked;
            });
        }
        
        if (macdCheckbox) {
            macdCheckbox.addEventListener('change', (e) => {
                TerminalState.showMACD = e.target.checked;
            });
        }
        
        if (emaCheckbox) {
            emaCheckbox.addEventListener('change', (e) => {
                TerminalState.showEMA = e.target.checked;
            });
        }
        
        // Mouse tracking for crosshair
        const canvas = document.getElementById('terminal-chart-canvas');
        if (canvas) {
            canvas.addEventListener('mousemove', (e) => {
                const rect = canvas.getBoundingClientRect();
                TerminalState.mouseX = e.clientX - rect.left;
                TerminalState.mouseY = e.clientY - rect.top;
            });
            
            canvas.addEventListener('mouseleave', () => {
                TerminalState.mouseX = null;
                TerminalState.mouseY = null;
            });
        }
    }

    function setTimeframe(tf) {
        TerminalState.timeframe = tf;
        const seconds = {
            '1m': 60,
            '5m': 300,
            '15m': 900,
            '1h': 3600,
            '4h': 14400,
            '1d': 86400
        };
        TerminalState.candleSeconds = seconds[tf] || 60;
        
        if (isActive) {
            container.querySelectorAll('.timeframe-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.timeframe === tf) {
                    btn.classList.add('active');
                }
            });
        }
    }

    function mainLoop() {
        if (!isActive) return;
        
        generateMarketMovement();
        updateCandles();
        
        TerminalState.positions.forEach(pos => {
            pos.current = pos.type === 'buy' ? TerminalState.bid : TerminalState.ask;
        });
        
        updateAccount();
        renderPositions();
        drawChart();
        
        const timeEl = document.getElementById('terminal-server-time');
        if (timeEl) {
            timeEl.textContent = new Date().toLocaleTimeString();
        }
        
        animationFrame = requestAnimationFrame(mainLoop);
    }

    // ============================================
    // PUBLIC API
    // ============================================
    function mount(parentElement) {
        if (isActive) return;
        
        container = document.createElement('div');
        container.className = 'terminal-container';
        container.innerHTML = `
            <div class="terminal-header">
                <div class="symbol-info">
                    <span class="symbol">EURUSD</span>
                    <span>Leverage: 1:100</span>
                </div>
                <div class="price-info">
                    <span class="bid">Bid: <span id="terminal-bid-price">1.10000</span></span>
                    <span class="ask">Ask: <span id="terminal-ask-price">1.10020</span></span>
                </div>
                <div class="server-time">
                    Server Time: <span id="terminal-server-time">00:00:00</span>
                </div>
            </div>

            <div class="terminal-main">
                <div class="chart-container">
                    <div class="chart-toolbar">
                        <button class="timeframe-btn active" data-timeframe="1m">1m</button>
                        <button class="timeframe-btn" data-timeframe="5m">5m</button>
                        <button class="timeframe-btn" data-timeframe="15m">15m</button>
                        <button class="timeframe-btn" data-timeframe="1h">1h</button>
                        <button class="timeframe-btn" data-timeframe="4h">4h</button>
                        <button class="timeframe-btn" data-timeframe="1d">1d</button>
                    </div>
                    <canvas id="terminal-chart-canvas"></canvas>
                </div>

                <div class="trading-panel">
                    <div class="account-summary">
                        <div class="balance-row">
                            <span>Balance:</span>
                            <span class="balance-value" id="terminal-balance">$10,000.00</span>
                        </div>
                        <div class="balance-row">
                            <span>Equity:</span>
                            <span class="equity-value" id="terminal-equity">$10,000.00</span>
                        </div>
                        <div class="balance-row">
                            <span>Margin:</span>
                            <span class="margin-value" id="terminal-margin">$0.00</span>
                        </div>
                        <div class="balance-row">
                            <span>Free Margin:</span>
                            <span class="free-margin-value" id="terminal-free-margin">$10,000.00</span>
                        </div>
                    </div>

                    <div class="trading-controls">
                        <div class="trade-type">
                            <button class="trade-btn buy-btn" onclick="TradingTerminalAPI.buy()">BUY</button>
                            <button class="trade-btn sell-btn" onclick="TradingTerminalAPI.sell()">SELL</button>
                        </div>
                        <div class="position-size">
                            <label>Volume (Lots)</label>
                            <input type="number" id="terminal-lot-size" value="0.01" min="0.01" max="100" step="0.01">
                        </div>
                    </div>

                    <div class="positions-section">
                        <div class="section-title">OPEN POSITIONS</div>
                        <div id="terminal-positions-list"></div>
                    </div>

                    <div class="indicators-panel">
                        <div class="section-title">INDICATORS</div>
                        <div class="indicator-checkbox">
                            <input type="checkbox" id="terminal-show-rsi" checked>
                            <label for="terminal-show-rsi">RSI (14)</label>
                        </div>
                        <div class="indicator-checkbox">
                            <input type="checkbox" id="terminal-show-macd">
                            <label for="terminal-show-macd">MACD (12,26,9)</label>
                        </div>
                        <div class="indicator-checkbox">
                            <input type="checkbox" id="terminal-show-ema">
                            <label for="terminal-show-ema">EMA (20)</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="status-bar">
                <span>Spread: 2.0 pips</span>
                <span>Swap Long: -4.25</span>
                <span>Swap Short: -2.15</span>
                <span id="terminal-connection-status">Connected (Demo)</span>
            </div>
        `;
        
        parentElement.appendChild(container);
        
        // Inject styles if not already present
        if (!document.getElementById('terminal-styles')) {
            const styleSheet = document.createElement("style");
            styleSheet.id = 'terminal-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
        
        isActive = true;
        
        // Setup event listeners
        setupEventListeners();
        
        // Generate some initial candles
        for (let i = 0; i < 100; i++) {
            generateMarketMovement();
            updateCandles();
        }
        
        // Start main loop
        mainLoop();
    }

    function unmount() {
        if (!isActive || !container) return;
        
        isActive = false;
        
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
        
        container.remove();
        container = null;
    }

    // Public API for buttons
    window.TradingTerminalAPI = {
        buy: () => openPosition('buy'),
        sell: () => openPosition('sell'),
        closePosition: (id) => closePosition(id),
        setTimeframe: (tf) => setTimeframe(tf)
    };

    // Return public methods
    return {
        mount: mount,
        unmount: unmount,
        isActive: () => isActive
    };
})();

// Auto-mount if this is the main page (for testing)
// Comment this out when using in your app
// document.addEventListener('DOMContentLoaded', () => {
//     TradingTerminal.mount(document.body);
// });
