/* ═══════════════════════════════════════════
   JOURNAL SCREEN
   ═══════════════════════════════════════════ */

let _journalView = 'list';

function renderJournal() {
  return `<div class="screen-pad">
    <div class="pg-header a-fadeup" style="padding:0 0 12px">
      <h1 class="pg-title">Trade Journal</h1>
      <button class="btn btn-gold btn-sm" onclick="_journalView='add';renderJournalBody()">+ Log Trade</button>
    </div>

    <div class="tab-bar a-fadeup2">
      <div class="tab-btn ${_journalView === 'list'  ? 'active' : ''}" onclick="_journalView='list';renderJournalBody()">Entries</div>
      <div class="tab-btn ${_journalView === 'stats' ? 'active' : ''}" onclick="_journalView='stats';renderJournalBody()">Stats</div>
      <div class="tab-btn ${_journalView === 'add'   ? 'active' : ''}" onclick="_journalView='add';renderJournalBody()">+ New</div>
    </div>

    <div id="journal-body" class="a-fadeup3">${journalBodyHTML()}</div>
  </div>`;
}

function renderJournalBody() {
  const el = document.getElementById('journal-body');
  if (el) el.innerHTML = journalBodyHTML();
}

function journalBodyHTML() {
  if (_journalView === 'stats') return renderJournalStats();
  if (_journalView === 'add')   return renderJournalForm();
  return renderJournalList();
}

function renderJournalList() {
  if (!STATE.journal.length) {
    return `<div style="text-align:center;padding:50px 0;color:var(--txt3)">
      <div style="font-size:52px;margin-bottom:12px">📓</div>
      <div style="font-family:var(--display);font-weight:700;font-size:16px;color:var(--txt2);margin-bottom:8px">No trades logged yet</div>
      <div style="font-size:13px;margin-bottom:20px">Journaling is the #1 habit of profitable traders</div>
      <button class="btn btn-gold" style="width:auto;padding:12px 24px" onclick="_journalView='add';renderJournalBody()">Log Your First Trade</button>
    </div>`;
  }

  return STATE.journal.slice().reverse().map((t, i) => {
    const pnl = parseFloat(t.pnl) || 0;
    const cls = pnl > 0 ? 'win' : pnl < 0 ? 'loss' : 'be';
    const idx = STATE.journal.length - 1 - i;
    return `<div class="j-entry ${cls}" onclick="viewJournalEntry(${idx})">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div>
          <div style="font-size:11px;color:var(--txt3);font-family:var(--mono);margin-bottom:4px">${fmtDate(t.date)}</div>
          <div style="display:flex;align-items:center;gap:6px">
            <strong style="font-family:var(--display);font-size:15px">${t.pair}</strong>
            <span class="pill ${t.direction === 'BUY' ? 'pill-green' : 'pill-red'}" style="font-size:9px">${t.direction}</span>
            ${t.setup ? `<span class="pill pill-blue" style="font-size:9px">${t.setup}</span>` : ''}
          </div>
          <div style="font-size:11px;color:var(--txt3);margin-top:3px">${t.tf || ''} &nbsp;${t.lots ? t.lots+' lots' : ''}</div>
        </div>
        <div style="text-align:right">
          <div class="t-mono" style="font-size:17px;font-weight:600;color:${pnl >= 0 ? 'var(--green)' : 'var(--red)'}">
            ${pnl >= 0 ? '+' : ''}${fmtCurrency(pnl)}
          </div>
          <div style="font-size:10px;color:var(--txt3);margin-top:2px">${t.plan === 'yes' ? '✅ Plan followed' : t.plan === 'no' ? '❌ Deviated' : ''}</div>
        </div>
      </div>
      ${t.notes ? `<div style="font-size:12px;color:var(--txt2);margin-top:8px;padding-top:8px;border-top:1px solid var(--bdr2);line-height:1.5">${t.notes.substring(0, 90)}${t.notes.length > 90 ? '…' : ''}</div>` : ''}
    </div>`;
  }).join('');
}

function renderJournalStats() {
  const trades = STATE.journal;
  if (!trades.length) return `<div style="text-align:center;padding:60px 20px;color:var(--txt3)">
    <div style="font-size:48px;margin-bottom:12px">📊</div>
    <div style="font-family:var(--display);font-size:16px;font-weight:700;margin-bottom:6px">No trades logged yet</div>
    <div style="font-size:13px">Add your first trade in the Add tab to start tracking your performance.</div>
  </div>`;

  const pnls = trades.map(t => parseFloat(t.pnl)||0);
  const wins   = trades.filter(t => parseFloat(t.pnl) > 0);
  const losses = trades.filter(t => parseFloat(t.pnl) <= 0);
  const totalPnl = pnls.reduce((a,b)=>a+b,0);
  const wr  = Math.round((wins.length / trades.length) * 100);
  const avgW = wins.length   ? wins.reduce((a,t)=>a+(parseFloat(t.pnl)||0),0)/wins.length : 0;
  const avgL = losses.length ? Math.abs(losses.reduce((a,t)=>a+(parseFloat(t.pnl)||0),0)/losses.length) : 0;
  const pf   = (avgL > 0 && losses.length > 0) ? ((avgW * wins.length) / (avgL * losses.length)).toFixed(2) : wins.length > 0 ? '∞' : '0';
  const expectancy = ((wr/100 * avgW) - ((100-wr)/100 * avgL)).toFixed(2);
  
  // Max drawdown calc
  let peak = 10000, equity = 10000, maxDD = 0;
  pnls.forEach(p => {
    equity += p;
    if (equity > peak) peak = equity;
    const dd = peak > 0 ? ((peak - equity) / peak * 100) : 0;
    if (dd > maxDD) maxDD = dd;
  });

  // Longest win/loss streaks
  let curW=0,maxW=0,curL=0,maxL=0;
  trades.forEach(t => {
    if (parseFloat(t.pnl)>0){curW++;maxW=Math.max(maxW,curW);curL=0;}
    else{curL++;maxL=Math.max(maxL,curL);curW=0;}
  });

  // By pair
  const byPair = {};
  trades.forEach(t => {
    if (!byPair[t.pair]) byPair[t.pair] = {count:0,pnl:0,wins:0};
    byPair[t.pair].count++;
    byPair[t.pair].pnl += parseFloat(t.pnl)||0;
    if (parseFloat(t.pnl)>0) byPair[t.pair].wins++;
  });

  // By setup
  const bySetup = {};
  trades.forEach(t => {
    if (!t.setup) return;
    if (!bySetup[t.setup]) bySetup[t.setup] = {count:0,pnl:0,wins:0};
    bySetup[t.setup].count++;
    bySetup[t.setup].pnl += parseFloat(t.pnl)||0;
    if (parseFloat(t.pnl)>0) bySetup[t.setup].wins++;
  });

  // Mood stats
  const moodWR = {};
  trades.forEach(t => {
    if (!t.mood) return;
    if (!moodWR[t.mood]) moodWR[t.mood] = {wins:0,total:0};
    moodWR[t.mood].total++;
    if (parseFloat(t.pnl)>0) moodWR[t.mood].wins++;
  });

  // Equity curve points (last 20 trades)
  const eqData = [];
  let eq = 10000;
  trades.slice(-20).forEach((t,i) => {
    eq += parseFloat(t.pnl)||0;
    eqData.push(eq);
  });
  const eqMin = Math.min(...eqData)*0.998, eqMax = Math.max(...eqData)*1.002;
  const eqRange = eqMax-eqMin || 1;
  const eqW = 280, eqH = 70;
  const eqPoints = eqData.map((v,i) => {
    const x = (i/(eqData.length-1||1))*eqW;
    const y = eqH - ((v-eqMin)/eqRange)*eqH;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  const lastEq = eqData[eqData.length-1]||10000;
  const eqColor = lastEq >= 10000 ? '#22C55E' : '#EF4444';

  return `
    <!-- KEY METRICS -->
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:12px">
      <div class="stat-box"><div class="stat-val">${trades.length}</div><div class="stat-lbl">Total Trades</div></div>
      <div class="stat-box"><div class="stat-val" style="color:${wr>=50?'var(--green)':'var(--red)'}">${wr}%</div><div class="stat-lbl">Win Rate</div></div>
      <div class="stat-box"><div class="stat-val" style="color:${totalPnl>=0?'var(--green)':'var(--red)'}">${totalPnl>=0?'+':''}$${Math.abs(totalPnl).toFixed(0)}</div><div class="stat-lbl">Net P&L</div></div>
      <div class="stat-box"><div class="stat-val" style="color:${parseFloat(pf)>=1.2?'var(--green)':parseFloat(pf)>=1?'var(--gold)':'var(--red)'}">${pf}</div><div class="stat-lbl">Profit Factor</div></div>
      <div class="stat-box"><div class="stat-val" style="color:${parseFloat(expectancy)>=0?'var(--green)':'var(--red)'}">${parseFloat(expectancy)>=0?'+':''}$${expectancy}</div><div class="stat-lbl">Expectancy/Trade</div></div>
      <div class="stat-box"><div class="stat-val" style="color:var(--red)">${maxDD.toFixed(1)}%</div><div class="stat-lbl">Max Drawdown</div></div>
    </div>

    <!-- EQUITY CURVE -->
    <div class="card" style="padding:14px;margin-bottom:12px">
      <div class="section-lbl" style="margin-bottom:10px">📈 Equity Curve (Last ${eqData.length} Trades)</div>
      <svg viewBox="0 0 ${eqW} ${eqH+20}" width="100%" style="overflow:visible">
        <defs>
          <linearGradient id="eqGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${eqColor}" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="${eqColor}" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <!-- Grid -->
        ${[0,0.25,0.5,0.75,1].map(f=>`<line x1="0" y1="${f*eqH}" x2="${eqW}" y2="${f*eqH}" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>`).join('')}
        <!-- Fill area -->
        <polygon points="${eqPoints} ${eqW},${eqH} 0,${eqH}" fill="url(#eqGrad)"/>
        <!-- Line -->
        <polyline points="${eqPoints}" fill="none" stroke="${eqColor}" stroke-width="2" stroke-linejoin="round"/>
        <!-- Labels -->
        <text x="2" y="${eqH+14}" font-size="8" fill="#9B9891" font-family="monospace">$${eqData[0]?.toFixed(0)}</text>
        <text x="${eqW-2}" y="${eqH+14}" font-size="8" fill="${eqColor}" font-family="monospace" text-anchor="end">$${lastEq.toFixed(0)}</text>
      </svg>
    </div>

    <!-- WIN/LOSS DETAIL -->
    <div class="card" style="padding:14px;margin-bottom:12px">
      <div class="section-lbl" style="margin-bottom:10px">⚖️ Win / Loss Analysis</div>
      <div style="display:flex;gap:3px;height:10px;border-radius:5px;overflow:hidden;margin-bottom:10px">
        <div style="width:${wr}%;background:var(--green)"></div>
        <div style="flex:1;background:var(--red)"></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:12px">
        <div style="padding:8px;background:var(--green-bg);border-radius:6px;border:1px solid var(--green-bdr)">
          <div style="color:var(--green);font-weight:700;font-family:var(--display)">✓ ${wins.length} WINS</div>
          <div style="color:var(--txt2);margin-top:4px">Avg: +$${avgW.toFixed(2)}</div>
          <div style="color:var(--txt2)">Best: +$${Math.max(0,...wins.map(t=>parseFloat(t.pnl)||0)).toFixed(2)}</div>
          <div style="color:var(--gold)">Streak: ${maxW}</div>
        </div>
        <div style="padding:8px;background:var(--red-bg);border-radius:6px;border:1px solid var(--red-bdr)">
          <div style="color:var(--red);font-weight:700;font-family:var(--display)">✗ ${losses.length} LOSSES</div>
          <div style="color:var(--txt2);margin-top:4px">Avg: -$${avgL.toFixed(2)}</div>
          <div style="color:var(--txt2)">Worst: -$${Math.abs(Math.min(0,...losses.map(t=>parseFloat(t.pnl)||0))).toFixed(2)}</div>
          <div style="color:var(--red)">Streak: ${maxL}</div>
        </div>
      </div>
    </div>

    <!-- BY PAIR -->
    ${Object.keys(byPair).length > 0 ? `
    <div class="card" style="padding:14px;margin-bottom:12px">
      <div class="section-lbl" style="margin-bottom:10px">🌍 Performance by Pair</div>
      ${Object.entries(byPair).sort((a,b)=>b[1].pnl-a[1].pnl).map(([pair,d]) => {
        const pairWR = Math.round(d.wins/d.count*100);
        const maxAbs = Math.max(...Object.values(byPair).map(x=>Math.abs(x.pnl)));
        const barW = maxAbs > 0 ? Math.abs(d.pnl)/maxAbs*100 : 0;
        return `<div style="margin-bottom:8px">
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px">
            <span><strong>${pair}</strong> <span style="color:var(--txt3)">${d.count}T · ${pairWR}%WR</span></span>
            <span class="t-mono" style="color:${d.pnl>=0?'var(--green)':'var(--red)'}">${d.pnl>=0?'+':''}$${d.pnl.toFixed(2)}</span>
          </div>
          <div style="background:var(--bg4);border-radius:3px;height:6px;overflow:hidden">
            <div style="height:100%;width:${barW.toFixed(0)}%;background:${d.pnl>=0?'var(--green)':'var(--red)'};border-radius:3px"></div>
          </div>
        </div>`;
      }).join('')}
    </div>` : ''}

    <!-- BY SETUP -->
    ${Object.keys(bySetup).length > 0 ? `
    <div class="card" style="padding:14px;margin-bottom:12px">
      <div class="section-lbl" style="margin-bottom:10px">🎯 Performance by Setup</div>
      ${Object.entries(bySetup).sort((a,b)=>b[1].pnl-a[1].pnl).slice(0,6).map(([setup,d]) => {
        const sWR = Math.round(d.wins/d.count*100);
        return `<div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--bdr2);font-size:12px">
          <div><strong>${setup}</strong><span style="color:var(--txt3);margin-left:6px">${d.count}× · ${sWR}%WR</span></div>
          <span class="t-mono" style="color:${d.pnl>=0?'var(--green)':'var(--red)'}">${d.pnl>=0?'+':''}$${d.pnl.toFixed(2)}</span>
        </div>`;
      }).join('')}
    </div>` : ''}

    <!-- MOOD vs PERFORMANCE -->
    ${Object.keys(moodWR).length > 0 ? `
    <div class="card" style="padding:14px;margin-bottom:12px">
      <div class="section-lbl" style="margin-bottom:10px">🧠 Mood → Win Rate</div>
      ${Object.entries(moodWR).sort((a,b)=>b[1].wins/b[1].total - a[1].wins/a[1].total).map(([mood,d]) => {
        const mwr = Math.round(d.wins/d.total*100);
        const moodEmoji = {great:'😄',good:'🙂',neutral:'😐',tired:'😴',frustrated:'😤',revenge:'😡',confident:'💪'}[mood]||'😐';
        return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
          <span style="font-size:16px;flex-shrink:0">${moodEmoji}</span>
          <span style="font-size:12px;color:var(--txt2);width:90px;text-transform:capitalize">${mood}</span>
          <div style="flex:1;background:var(--bg4);border-radius:3px;height:8px;overflow:hidden">
            <div style="height:100%;width:${mwr}%;background:${mwr>=50?'var(--green)':'var(--red)'};border-radius:3px"></div>
          </div>
          <span style="font-size:11px;color:var(--txt2);width:42px;text-align:right">${mwr}% (${d.total})</span>
        </div>`;
      }).join('')}
    </div>` : ''}

    <!-- AI INSIGHTS -->
    <div class="card" style="padding:14px;margin-bottom:12px;background:var(--gold-bg);border-color:var(--bdr)">
      <div class="section-lbl" style="margin-bottom:8px">🤖 AI Journal Insights</div>
      <div style="font-size:12px;color:var(--txt2);line-height:1.8">
        ${wr >= 60 ? '🟢 Win rate above 60% — excellent setup selection' : wr >= 45 ? '🟡 Win rate in acceptable range' : '🔴 Win rate below 45% — be more selective with entries'}<br>
        ${parseFloat(pf) >= 1.5 ? '🟢 Profit factor above 1.5 — strong system' : parseFloat(pf) >= 1 ? '🟡 Barely profitable — improve exits or R:R' : '🔴 Negative expectancy — system needs fixing'}<br>
        ${maxDD < 5 ? '🟢 Drawdown under control' : maxDD < 15 ? '🟡 Moderate drawdown — review sizing' : '🔴 High drawdown — reduce position sizes immediately'}<br>
        ${maxW >= 5 ? `🔥 Best win streak: ${maxW} trades — note what you did right` : ''}<br>
        ${maxL >= 3 ? `⚠️ Longest loss streak: ${maxL} trades — review those setups` : ''}
        ${parseFloat(expectancy) > 0 ? `<br>✅ Positive expectancy $${expectancy}/trade — keep executing your plan` : `<br>❌ Negative expectancy — focus on improving entries and cutting losses faster`}
      </div>
    </div>
  `;
}

function renderJournalForm() {
  const pairs   = ['EUR/USD','GBP/USD','USD/JPY','AUD/USD','USD/CHF','USD/CAD','GBP/JPY','EUR/JPY','NZD/USD','XAU/USD','BTC/USD','NAS100','Other'];
  const setups  = ['Support Bounce','Resistance Reject','Trend Pullback','Breakout Retest','London Breakout','RSI Divergence','SMC Order Block','Pin Bar','Inside Bar','Scalp','News Trade','Other'];
  const tframes = ['M1','M5','M15','M30','H1','H4','D1','W1'];

  return `
    <div class="section-lbl">Log New Trade</div>

    <div class="inp-row">
      <div class="inp-wrap">
        <label class="inp-label">Pair / Instrument</label>
        <select class="inp" id="j-pair">${pairs.map(p=>`<option>${p}</option>`).join('')}</select>
      </div>
      <div class="inp-wrap">
        <label class="inp-label">Direction</label>
        <select class="inp" id="j-dir">
          <option value="BUY">🟢 BUY (Long)</option>
          <option value="SELL">🔴 SELL (Short)</option>
        </select>
      </div>
    </div>

    <div class="inp-row">
      <div class="inp-wrap">
        <label class="inp-label">Entry Price</label>
        <input class="inp" id="j-entry" type="number" step="0.0001" placeholder="1.0850">
      </div>
      <div class="inp-wrap">
        <label class="inp-label">Exit Price</label>
        <input class="inp" id="j-exit" type="number" step="0.0001" placeholder="1.0910">
      </div>
    </div>

    <div class="inp-row">
      <div class="inp-wrap">
        <label class="inp-label">P&L ($)</label>
        <input class="inp" id="j-pnl" type="number" step="0.01" placeholder="60.00">
      </div>
      <div class="inp-wrap">
        <label class="inp-label">Lot Size</label>
        <input class="inp" id="j-lots" type="number" step="0.01" value="0.10" placeholder="0.10">
      </div>
    </div>

    <div class="inp-row">
      <div class="inp-wrap">
        <label class="inp-label">Setup Type</label>
        <select class="inp" id="j-setup">
          <option value="">-- Select --</option>
          ${setups.map(s=>`<option>${s}</option>`).join('')}
        </select>
      </div>
      <div class="inp-wrap">
        <label class="inp-label">Timeframe</label>
        <select class="inp" id="j-tf">${tframes.map(t=>`<option>${t}</option>`).join('')}</select>
      </div>
    </div>

    <div class="inp-wrap">
      <label class="inp-label">Emotional State</label>
      <select class="inp" id="j-mood">
        <option value="neutral">😐 Calm / Neutral</option>
        <option value="confident">😊 Confident</option>
        <option value="fearful">😰 Fearful / Hesitant</option>
        <option value="greedy">🤑 Greedy / Over-excited</option>
        <option value="frustrated">😤 Frustrated</option>
        <option value="revenge">😠 Revenge trading</option>
      </select>
    </div>

    <div class="inp-wrap">
      <label class="inp-label">Followed Trading Plan?</label>
      <select class="inp" id="j-plan">
        <option value="yes">✅ Yes — followed perfectly</option>
        <option value="mostly">🟡 Mostly followed</option>
        <option value="no">❌ No — deviated from plan</option>
      </select>
    </div>

    <div class="inp-wrap">
      <label class="inp-label">Notes & Observations</label>
      <textarea class="inp" id="j-notes" placeholder="What went well? What could improve? Any patterns you noticed? Key lesson from this trade?"></textarea>
    </div>

    <button class="btn btn-gold" onclick="saveJournalEntry()">Save Journal Entry</button>
    <button class="btn btn-ghost btn-sm" style="margin-top:8px" onclick="_journalView='list';renderJournalBody()">Cancel</button>
  `;
}

function saveJournalEntry() {
  const entry = {
    date: new Date().toISOString(),
    pair: document.getElementById('j-pair').value,
    direction: document.getElementById('j-dir').value,
    entry: document.getElementById('j-entry').value,
    exit: document.getElementById('j-exit').value,
    pnl: document.getElementById('j-pnl').value,
    lots: document.getElementById('j-lots').value,
    setup: document.getElementById('j-setup').value,
    tf: document.getElementById('j-tf').value,
    mood: document.getElementById('j-mood').value,
    plan: document.getElementById('j-plan').value,
    notes: document.getElementById('j-notes').value,
  };

  STATE.journal.push(entry);
  addXP(20);
  saveState();
  _journalView = 'list';
  showToast('📓 Trade logged! +20 XP');
  navigate('journal');
}

function viewJournalEntry(idx) {
  const t = STATE.journal[idx];
  if (!t) return;
  const pnl = parseFloat(t.pnl) || 0;
  showModal(`
    <div class="modal-handle"></div>
    <div style="font-family:var(--display);font-weight:800;font-size:20px;margin-bottom:4px">${t.pair} ${t.direction}</div>
    <div style="font-size:12px;color:var(--txt3);margin-bottom:16px">${fmtDate(t.date)}</div>

    <div class="inp-row3" style="margin-bottom:14px">
      <div class="calc-res"><div class="calc-res-val" style="color:${pnl>=0?'var(--green)':'var(--red)'}">${pnl>=0?'+':''}$${Math.abs(pnl).toFixed(2)}</div><div class="calc-res-lbl">P&L</div></div>
      <div class="calc-res"><div class="calc-res-val">${t.entry||'—'}</div><div class="calc-res-lbl">Entry</div></div>
      <div class="calc-res"><div class="calc-res-val">${t.exit||'—'}</div><div class="calc-res-lbl">Exit</div></div>
    </div>

    ${t.setup?`<div style="margin-bottom:10px"><div class="section-lbl">Setup</div><span class="pill pill-blue">${t.setup}</span></div>`:''}
    ${t.mood?`<div style="margin-bottom:10px"><div class="section-lbl">Emotional State</div><div style="font-size:13px;color:var(--txt2);margin-top:4px">${t.mood}</div></div>`:''}
    ${t.plan?`<div style="margin-bottom:10px"><div class="section-lbl">Followed Plan</div><div style="font-size:13px;color:var(--txt2);margin-top:4px">${t.plan}</div></div>`:''}
    ${t.notes?`<div style="margin-bottom:14px"><div class="section-lbl">Notes</div><div style="font-size:13px;color:var(--txt2);line-height:1.6;margin-top:4px">${t.notes}</div></div>`:''}

    <div style="display:flex;gap:8px">
      <button class="btn btn-danger btn-sm" onclick="deleteJournalEntry(${idx})">Delete</button>
      <button class="btn btn-outline btn-sm" onclick="closeModal()">Close</button>
    </div>
  `);
}

function deleteJournalEntry(idx) {
  if (confirm('Delete this journal entry?')) {
    STATE.journal.splice(idx, 1);
    saveState();
    closeModal();
    showToast('🗑️ Entry deleted');
    navigate('journal');
  }
}

/* === js/screens/mentor.js === */