// ============================================
// TRADING TERMINAL - SINGLE FILE
// Professional MT5-Style Simulator
// ============================================

(function() {
    // ============================================
    // STYLES - Injected CSS
    // ============================================
    const styles = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        #trading-terminal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: #0a0b0d;
            color: #e0e0e0;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        /* Top Bar */
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

        /* Main Layout */
        .terminal-main {
            display: flex;
            flex: 1;
            overflow: hidden;
        }

        /* Chart Area */
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

        #chart-canvas {
            width: 100%;
            flex: 1;
            background: #131722;
            cursor: crosshair;
        }

        /* Right Panel - Trading */
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

        /* Trading Controls */
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

        /* Open Positions */
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

        /* Indicators Panel */
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
    // INJECT STYLES
    // ============================================
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // ============================================
    // CREATE TERMINAL HTML
    // ============================================
    document.body.innerHTML = `
        <div id="trading-terminal">
            <div class="terminal-header">
                <div class="symbol-info">
                    <span class="symbol">EURUSD</span>
                    <span>Leverage: 1:100</span>
                </div>
                <div class="price-info">
                    <span class="bid">Bid: <span id="bid-price">1.10000</span></span>
                    <span class="ask">Ask: <span id="ask-price">1.10020</span></span>
                </div>
                <div class="server-time">
                    Server Time: <span id="server-time">00:00:00</span>
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
                    <canvas id="chart-canvas"></canvas>
                </div>

                <div class="trading-panel">
                    <div class="account-summary">
                        <div class="balance-row">
                            <span>Balance:</span>
                            <span class="balance-value" id="balance">$10,000.00</span>
                        </div>
                        <div class="balance-row">
                            <span>Equity:</span>
                            <span class="equity-value" id="equity">$10,000.00</span>
                        </div>
                        <div class="balance-row">
                            <span>Margin:</span>
                            <span class="margin-value" id="margin">$0.00</span>
                        </div>
                        <div class="balance-row">
                            <span>Free Margin:</span>
                            <span class="free-margin-value" id="free-margin">$10,000.00</span>
                        </div>
                    </div>

                    <div class="trading-controls">
                        <div class="trade-type">
                            <button class="trade-btn buy-btn" onclick="terminal.buy()">BUY</button>
                            <button class="trade-btn sell-btn" onclick="terminal.sell()">SELL</button>
                        </div>
                        <div class="position-size">
                            <label>Volume (Lots)</label>
                            <input type="number" id="lot-size" value="0.01" min="0.01" max="100" step="0.01">
                        </div>
                    </div>

                    <div class="positions-section">
                        <div class="section-title">OPEN POSITIONS</div>
                        <div id="positions-list"></div>
                    </div>

                    <div class="indicators-panel">
                        <div class="section-title">INDICATORS</div>
                        <div class="indicator-checkbox">
                            <input type="checkbox" id="show-rsi" checked>
                            <label for="show-rsi">RSI (14)</label>
                        </div>
                        <div class="indicator-checkbox">
                            <input type="checkbox" id="show-macd">
                            <label for="show-macd">MACD (12,26,9)</label>
                        </div>
                        <div class="indicator-checkbox">
                            <input type="checkbox" id="show-ema">
                            <label for="show-ema">EMA (20)</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="status-bar">
                <span>Spread: 2.0 pips</span>
                <span>Swap Long: -4.25</span>
                <span>Swap Short: -2.15</span>
                <span id="connection-status">Connected (Demo)</span>
            </div>
        </div>
    `;

    // ============================================
    // TRADING ENGINE
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
        visibleCandles: 80
    };

    // ============================================
    // PRICE GENERATOR (Realistic Market Simulation)
    // ============================================
    function generateMarketMovement() {
        // Trend component (slow moving average)
        TerminalState.trend += (Math.random() - 0.5) * 0.00001;
        TerminalState.trend = Math.max(-0.001, Math.min(0.001, TerminalState.trend));
        
        // Momentum component
        TerminalState.momentum += (Math.random() - 0.5) * 0.0001;
        TerminalState.momentum = TerminalState.momentum * 0.9; // Decay
        
        // Random noise
        const noise = (Math.random() - 0.5) * TerminalState.volatility;
        
        // Combine components
        const move = TerminalState.trend + TerminalState.momentum + noise;
        
        // Update bid price
        TerminalState.bid += move;
        
        // Ensure price stays positive
        TerminalState.bid = Math.max(0.8, Math.min(1.4, TerminalState.bid));
        
        // Update ask price (bid + spread)
        TerminalState.ask = TerminalState.bid + TerminalState.spread;
        
        // Update UI
        document.getElementById('bid-price').textContent = TerminalState.bid.toFixed(5);
        document.getElementById('ask-price').textContent = TerminalState.ask.toFixed(5);
    }

    // ============================================
    // CANDLE MANAGEMENT
    // ============================================
    function updateCandles() {
        const now = Date.now();
        const secondsSinceLastCandle = (now - TerminalState.lastCandleTime) / 1000;
        
        // Check if we need a new candle
        if (secondsSinceLastCandle >= TerminalState.candleSeconds) {
            // Close current candle if exists
            if (TerminalState.currentCandle) {
                TerminalState.currentCandle.close = TerminalState.bid;
                TerminalState.candles.push(TerminalState.currentCandle);
                
                // Keep only last 1000 candles
                if (TerminalState.candles.length > 1000) {
                    TerminalState.candles.shift();
                }
            }
            
            // Create new candle
            TerminalState.currentCandle = {
                open: TerminalState.bid,
                high: TerminalState.bid,
                low: TerminalState.bid,
                close: TerminalState.bid,
                time: now
            };
            
            TerminalState.lastCandleTime = now;
        } else {
            // Update current candle
            if (TerminalState.currentCandle) {
                TerminalState.currentCandle.high = Math.max(TerminalState.currentCandle.high, TerminalState.bid);
                TerminalState.currentCandle.low = Math.min(TerminalState.currentCandle.low, TerminalState.bid);
                TerminalState.currentCandle.close = TerminalState.bid;
            } else {
                // First candle
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

    // ============================================
    // INDICATORS CALCULATION
    // ============================================
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

    // ============================================
    // CHART DRAWING ENGINE
    // ============================================
    function drawChart() {
        const canvas = document.getElementById('chart-canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const candles = [...TerminalState.candles, TerminalState.currentCandle].filter(Boolean).slice(-TerminalState.visibleCandles);
        if (candles.length === 0) return;
        
        // Calculate price range for scaling
        const prices = candles.flatMap(c => [c.high, c.low]);
        const maxPrice = Math.max(...prices);
        const minPrice = Math.min(...prices);
        const priceRange = maxPrice - minPrice || 1;
        
        // Chart dimensions
        const padding = { top: 20, bottom: 30, left: 50, right: 20 };
        const chartWidth = canvas.width - padding.left - padding.right;
        const chartHeight = canvas.height - padding.top - padding.bottom;
        
        const candleWidth = Math.max(3, (chartWidth / candles.length) * 0.7);
        const spacing = (chartWidth / candles.length) * 0.3;
        
        // Draw grid
        ctx.strokeStyle = '#2a2e33';
        ctx.lineWidth = 0.5;
        
        // Horizontal grid lines
        for (let i = 0; i <= 5; i++) {
            const y = padding.top + (i / 5) * chartHeight;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(canvas.width - padding.right, y);
            ctx.stroke();
            
            // Price labels
            const price = maxPrice - (i / 5) * priceRange;
            ctx.fillStyle = '#8a8d92';
            ctx.font = '10px Arial';
            ctx.fillText(price.toFixed(5), 5, y - 5);
        }
        
        // Draw candles
        candles.forEach((candle, index) => {
            const x = padding.left + index * (candleWidth + spacing);
            
            // Calculate y positions
            const highY = padding.top + ((maxPrice - candle.high) / priceRange) * chartHeight;
            const lowY = padding.top + ((maxPrice - candle.low) / priceRange) * chartHeight;
            const openY = padding.top + ((maxPrice - candle.open) / priceRange) * chartHeight;
            const closeY = padding.top + ((maxPrice - candle.close) / priceRange) * chartHeight;
            
            // Draw wick
            ctx.strokeStyle = '#8a8d92';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x + candleWidth / 2, highY);
            ctx.lineTo(x + candleWidth / 2, lowY);
            ctx.stroke();
            
            // Draw body
            const isBullish = candle.close >= candle.open;
            ctx.fillStyle = isBullish ? '#4caf50' : '#ff4d4d';
            ctx.fillRect(x, Math.min(openY, closeY), candleWidth, Math.abs(closeY - openY) || 1);
        });
        
        // Draw indicators
        if (TerminalState.showRSI) {
            drawRSI(ctx, candles, padding, chartWidth, chartHeight, maxPrice, minPrice);
        }
        
        if (TerminalState.showEMA) {
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
        if (candles.length < 15) return;
        
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

    function drawEMA(ctx, candles, padding, chartWidth, chartHeight, maxPrice, minPrice) {
        if (candles.length < 20) return;
        
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

    // ============================================
    // TRADING FUNCTIONS
    // ============================================
    function openPosition(type) {
        const lotSize = parseFloat(document.getElementById('lot-size').value) || 0.01;
        const contractSize = 100000; // Standard lot
        const marginRequired = (lotSize * contractSize * TerminalState.ask) / 100; // 1:100 leverage
        
        // Check margin
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
        
        // Update margin
        TerminalState.margin += marginRequired;
        updateAccount();
        renderPositions();
    }

    function closePosition(positionId) {
        const index = TerminalState.positions.findIndex(p => p.id === positionId);
        if (index === -1) return;
        
        const position = TerminalState.positions[index];
        const closePrice = position.type === 'buy' ? TerminalState.bid : TerminalState.ask;
        
        // Calculate profit/loss
        const points = position.type === 'buy' 
            ? closePrice - position.entry 
            : position.entry - closePrice;
        
        const profit = points * position.lot * 100000;
        
        // Update balance
        TerminalState.balance += profit;
        
        // Remove position
        TerminalState.positions.splice(index, 1);
        
        // Recalculate margin
        TerminalState.margin = TerminalState.positions.reduce((total, pos) => {
            return total + (pos.lot * 100000 * TerminalState.ask) / 100;
        }, 0);
        
        updateAccount();
        renderPositions();
    }

    function updateAccount() {
        // Calculate unrealized P&L
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
        
        // Update UI
        document.getElementById('balance').textContent = `$${TerminalState.balance.toFixed(2)}`;
        document.getElementById('equity').textContent = `$${TerminalState.equity.toFixed(2)}`;
        document.getElementById('margin').textContent = `$${TerminalState.margin.toFixed(2)}`;
        document.getElementById('free-margin').textContent = `$${TerminalState.freeMargin.toFixed(2)}`;
    }

    function renderPositions() {
        const container = document.getElementById('positions-list');
        
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
                        <button class="close-position" onclick="terminal.closePosition(${pos.id})">Close</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    // ============================================
    // UI CONTROL OBJECT
    // ============================================
    window.terminal = {
        buy: () => openPosition('buy'),
        sell: () => openPosition('sell'),
        closePosition: (id) => closePosition(id),
        setTimeframe: (tf) => {
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
            
            // Update active button
            document.querySelectorAll('.timeframe-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.timeframe === tf) {
                    btn.classList.add('active');
                }
            });
        }
    };

    // ============================================
    // EVENT LISTENERS
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        // Timeframe buttons
        document.querySelectorAll('.timeframe-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                terminal.setTimeframe(e.target.dataset.timeframe);
            });
        });
        
        // Indicator checkboxes
        document.getElementById('show-rsi').addEventListener('change', (e) => {
            TerminalState.showRSI = e.target.checked;
        });
        
        document.getElementById('show-macd').addEventListener('change', (e) => {
            TerminalState.showMACD = e.target.checked;
        });
        
        document.getElementById('show-ema').addEventListener('change', (e) => {
            TerminalState.showEMA = e.target.checked;
        });
        
        // Mouse tracking for crosshair
        const canvas = document.getElementById('chart-canvas');
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            TerminalState.mouseX = e.clientX - rect.left;
            TerminalState.mouseY = e.clientY - rect.top;
        });
        
        canvas.addEventListener('mouseleave', () => {
            TerminalState.mouseX = null;
            TerminalState.mouseY = null;
        });
    });

    // ============================================
    // MAIN LOOP
    // ============================================
    function mainLoop() {
        // Generate price movement
        generateMarketMovement();
        
        // Update candles
        updateCandles();
        
        // Update positions with current prices
        TerminalState.positions.forEach(pos => {
            pos.current = pos.type === 'buy' ? TerminalState.bid : TerminalState.ask;
        });
        
        // Update account
        updateAccount();
        
        // Update positions display
        renderPositions();
        
        // Draw chart
        drawChart();
        
        // Update server time
        document.getElementById('server-time').textContent = new Date().toLocaleTimeString();
        
        requestAnimationFrame(mainLoop);
    }

    // Start the main loop
    setTimeout(() => {
        // Generate some initial candles
        for (let i = 0; i < 100; i++) {
            generateMarketMovement();
            updateCandles();
        }
        mainLoop();
    }, 100);
})();
