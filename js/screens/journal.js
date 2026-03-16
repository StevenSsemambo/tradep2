/* ═══════════════════════════════════════════════════════════════
   JOURNAL SCREEN — Full upgrade
   New: equity curve, P&L heatmap, trade grading, day-of-week stats
   ═══════════════════════════════════════════════════════════════ */

let _journalTab = 'log';

/* ══ RENDER JOURNAL ═════════════════════════════════════════════ */
function renderJournal() {
  return `<div style="display:flex;flex-direction:column;height:calc(100vh - var(--total-nav));overflow:hidden">
    <!-- Header -->
    <div style="flex-shrink:0;padding:12px 16px 8px;border-bottom:1px solid var(--bdr2);background:var(--bg2)">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <h1 class="pg-title">Trade Journal</h1>
        <button class="btn btn-gold btn-sm" onclick="showNewEntryModal()">+ Log Trade</button>
      </div>
      <div class="tab-bar" style="margin-bottom:0">
        ${['log','stats','heatmap','equity'].map(t=>`
          <div class="tab-btn ${_journalTab===t?'active':''}" onclick="_journalTab='${t}';renderScreen('journal')">${
            {log:'📓 Log',stats:'📊 Stats',heatmap:'🌡️ Heatmap',equity:'📈 Equity'}[t]
          }</div>`).join('')}
      </div>
    </div>
    <!-- Content -->
    <div style="flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:14px">
      ${_journalTab==='log'    ? renderJournalLog()    : ''}
      ${_journalTab==='stats'  ? renderJournalStats()  : ''}
      ${_journalTab==='heatmap'? renderJournalHeatmap(): ''}
      ${_journalTab==='equity' ? renderJournalEquity() : ''}
    </div>
  </div>`;
}

/* ══ LOG TAB ════════════════════════════════════════════════════ */
function renderJournalLog() {
  const entries = [...STATE.journal].reverse();
  if (!entries.length) return `
    <div style="text-align:center;padding:48px 20px">
      <div style="font-size:52px;margin-bottom:12px">📓</div>
      <div style="font-family:var(--display);font-weight:800;font-size:18px;margin-bottom:8px">Start Your Journal</div>
      <div style="font-size:13px;color:var(--txt2);line-height:1.6;margin-bottom:20px">Every profitable trader journals. Log your first trade to start building data about your edge.</div>
      <button class="btn btn-gold" onclick="showNewEntryModal()" style="max-width:220px;margin:0 auto">Log First Trade 📓</button>
    </div>`;

  return entries.map(e => {
    const pnl = parseFloat(e.pnl)||0;
    const win = pnl > 0;
    const grade = gradeTradeEntry(e);
    return `
      <div class="j-entry ${win?'win':'loss'}" onclick="showEntryDetail('${e.id||''}')">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">
          <div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-family:var(--display);font-weight:700;font-size:15px">${e.pair||'—'}</span>
              <span class="pill ${win?'pill-green':'pill-red'}" style="font-size:9px">${e.direction||e.dir||'—'}</span>
              ${grade ? `<span class="pill" style="font-size:9px;background:${grade.bg};color:${grade.col};border-color:${grade.col}44">${grade.label}</span>` : ''}
            </div>
            <div style="font-size:11px;color:var(--txt3);margin-top:3px">${fmtDate(e.date||e.time)} · ${e.setup||''} ${e.tf?'· '+e.tf:''}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div style="font-family:var(--mono);font-weight:700;font-size:16px;color:${win?'var(--accent)':'var(--red)'}">${win?'+':''}${fmtCurrency(pnl)}</div>
            ${e.pips ? `<div style="font-size:10px;color:var(--txt3)">${parseFloat(e.pips)>0?'+':''}${e.pips} pips</div>` : ''}
          </div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px">
          ${e.mood  ? `<span style="font-size:11px;color:var(--txt2)">😊 ${e.mood}</span>` : ''}
          ${e.plan  ? `<span style="font-size:11px;color:${e.plan==='yes'?'var(--accent)':'var(--red)'}">Plan: ${e.plan==='yes'?'✓ Followed':'✗ Broke'}</span>` : ''}
          ${e.rr    ? `<span style="font-size:11px;color:var(--txt2)">R:R ${e.rr}</span>` : ''}
        </div>
        ${e.notes ? `<div style="font-size:12px;color:var(--txt2);line-height:1.5;border-top:1px solid var(--bdr3);padding-top:6px;margin-top:2px">"${e.notes.substring(0,120)}${e.notes.length>120?'…':''}"</div>` : ''}
      </div>`;
  }).join('') + `
    <div style="text-align:center;padding:20px 0;color:var(--txt3);font-size:12px">${entries.length} trades logged</div>`;
}

function gradeTradeEntry(e) {
  let score = 0;
  if (e.plan === 'yes') score += 2;
  if (e.mood && !['revenge','frustrated','greedy'].includes(e.mood)) score += 1;
  if (e.rr && parseFloat(e.rr) >= 2) score += 2;
  if (e.setup) score += 1;
  if (e.notes && e.notes.length > 30) score += 1;
  if (score >= 6) return { label: 'A+', bg: 'rgba(0,212,184,0.12)', col: 'var(--accent)' };
  if (score >= 4) return { label: 'B',  bg: 'rgba(245,158,11,0.12)', col: 'var(--gold)' };
  if (score >= 2) return { label: 'C',  bg: 'rgba(249,115,22,0.12)', col: 'var(--orange)' };
  return { label: 'D', bg: 'rgba(239,68,68,0.12)', col: 'var(--red)' };
}

/* ══ STATS TAB ══════════════════════════════════════════════════ */
function renderJournalStats() {
  const j = STATE.journal;
  if (j.length < 3) return `
    <div style="text-align:center;padding:40px 20px">
      <div style="font-size:40px;margin-bottom:12px">📊</div>
      <div style="font-family:var(--display);font-weight:700;margin-bottom:8px">Log 3+ trades to see stats</div>
      <div style="font-size:13px;color:var(--txt2)">Statistics become meaningful with at least 10 trades. Keep logging!</div>
    </div>`;

  const wins = j.filter(t=>parseFloat(t.pnl)>0);
  const losses = j.filter(t=>parseFloat(t.pnl)<=0);
  const wr = Math.round(wins.length/j.length*100);
  const totalPnl = j.reduce((a,t)=>a+(parseFloat(t.pnl)||0),0);
  const avgWin = wins.length ? wins.reduce((a,t)=>a+(parseFloat(t.pnl)||0),0)/wins.length : 0;
  const avgLoss = losses.length ? Math.abs(losses.reduce((a,t)=>a+(parseFloat(t.pnl)||0),0)/losses.length) : 0;
  const pf = avgLoss > 0 ? (avgWin*wins.length/(avgLoss*losses.length)).toFixed(2) : '∞';
  const expectancy = ((wr/100)*avgWin - ((100-wr)/100)*avgLoss).toFixed(2);

  // Best/worst pairs
  const byPair = {};
  j.forEach(t => {
    if (!t.pair) return;
    if (!byPair[t.pair]) byPair[t.pair] = {wins:0,total:0,pnl:0};
    byPair[t.pair].total++;
    byPair[t.pair].pnl += parseFloat(t.pnl)||0;
    if (parseFloat(t.pnl)>0) byPair[t.pair].wins++;
  });
  const pairRows = Object.entries(byPair).sort((a,b)=>b[1].pnl-a[1].pnl).slice(0,5);

  // Day of week performance
  const byDay = {Mon:{pnl:0,c:0},Tue:{pnl:0,c:0},Wed:{pnl:0,c:0},Thu:{pnl:0,c:0},Fri:{pnl:0,c:0}};
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  j.forEach(t => {
    if (!t.date&&!t.time) return;
    const d = dayNames[new Date(t.date||t.time).getDay()];
    if (byDay[d]) { byDay[d].pnl += parseFloat(t.pnl)||0; byDay[d].c++; }
  });

  // Mood performance
  const byMood = {};
  j.forEach(t => {
    if (!t.mood) return;
    if (!byMood[t.mood]) byMood[t.mood] = {wins:0,total:0};
    byMood[t.mood].total++;
    if (parseFloat(t.pnl)>0) byMood[t.mood].wins++;
  });

  // Grade distribution
  const grades = {A:0,B:0,C:0,D:0};
  j.forEach(t => {
    const g = gradeTradeEntry(t);
    if (g) grades[g.label[0]]++;
  });

  return `
    <!-- Core stats grid -->
    <div class="section-lbl">Performance Overview</div>
    <div class="stat-grid4" style="margin-bottom:14px">
      <div class="stat-box"><div class="stat-val" style="color:${wr>=50?'var(--accent)':'var(--red)'}">${wr}%</div><div class="stat-lbl">Win Rate</div></div>
      <div class="stat-box"><div class="stat-val" style="color:${totalPnl>=0?'var(--accent)':'var(--red)'};font-size:16px">${totalPnl>=0?'+':''}$${Math.abs(totalPnl).toFixed(0)}</div><div class="stat-lbl">Net P&L</div></div>
      <div class="stat-box"><div class="stat-val" style="color:${parseFloat(pf)>=1?'var(--accent)':'var(--red)'}">${pf}</div><div class="stat-lbl">Prof. Factor</div></div>
      <div class="stat-box"><div class="stat-val" style="color:${parseFloat(expectancy)>=0?'var(--accent)':'var(--red)'};font-size:16px">${parseFloat(expectancy)>=0?'+':''}$${expectancy}</div><div class="stat-lbl">Expectancy</div></div>
    </div>
    <div class="stat-grid" style="margin-bottom:14px">
      <div class="stat-box"><div class="stat-val" style="color:var(--accent);font-size:16px">+$${avgWin.toFixed(0)}</div><div class="stat-lbl">Avg Winner</div></div>
      <div class="stat-box"><div class="stat-val" style="color:var(--red);font-size:16px">-$${avgLoss.toFixed(0)}</div><div class="stat-lbl">Avg Loser</div></div>
      <div class="stat-box"><div class="stat-val">${wins.length}</div><div class="stat-lbl">Wins</div></div>
      <div class="stat-box"><div class="stat-val">${losses.length}</div><div class="stat-lbl">Losses</div></div>
    </div>

    <!-- Trade Quality Grades -->
    <div class="section-lbl">Trade Quality Grades</div>
    <div class="card" style="padding:14px;margin-bottom:14px">
      <div style="display:flex;gap:8px;margin-bottom:8px">
        ${[['A','var(--accent)','A+ trades — perfect execution'],['B','var(--gold)','B — good, minor issues'],['C','var(--orange)','C — needs work'],['D','var(--red)','D — rule breaks']].map(([g,col,tip])=>`
          <div style="flex:1;text-align:center;background:${col}15;border:1px solid ${col}33;border-radius:var(--rs);padding:10px 4px">
            <div style="font-size:20px;font-weight:700;color:${col};font-family:var(--display)">${g}</div>
            <div style="font-size:18px;font-weight:700;color:${col}">${grades[g]||0}</div>
            <div style="font-size:9px;color:var(--txt3);margin-top:2px">${Math.round(((grades[g]||0)/j.length)*100)}%</div>
          </div>`).join('')}
      </div>
      <div style="font-size:11px;color:var(--txt3);text-align:center">A+ = Plan followed + calm mood + R:R ≥ 2 + good notes</div>
    </div>

    <!-- Pair performance -->
    <div class="section-lbl">Pair Performance</div>
    <div class="card" style="padding:0;overflow:hidden;margin-bottom:14px">
      ${pairRows.length ? pairRows.map(([pair,d],i)=>`
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;${i<pairRows.length-1?'border-bottom:1px solid var(--bdr3)':''}">
          <div>
            <div style="font-weight:700;font-family:var(--display)">${pair}</div>
            <div style="font-size:10px;color:var(--txt3)">${d.wins}/${d.total} wins · ${Math.round(d.wins/d.total*100)}% WR</div>
          </div>
          <div style="font-family:var(--mono);font-weight:700;color:${d.pnl>=0?'var(--accent)':'var(--red)'}">${d.pnl>=0?'+':''}$${Math.abs(d.pnl).toFixed(0)}</div>
        </div>`).join('') : '<div style="padding:14px;color:var(--txt3);font-size:13px">Tag pairs in journal entries to see performance</div>'}
    </div>

    <!-- Day of week -->
    <div class="section-lbl">Performance by Day</div>
    <div class="card" style="padding:14px;margin-bottom:14px">
      <div style="display:flex;gap:6px">
        ${Object.entries(byDay).map(([day,d])=>{
          const avg = d.c > 0 ? d.pnl/d.c : 0;
          const maxAbs = Math.max(...Object.values(byDay).map(x=>Math.abs(x.c>0?x.pnl/x.c:0)),1);
          const pct = Math.abs(avg/maxAbs)*100;
          return `<div style="flex:1;text-align:center">
            <div style="font-size:10px;color:var(--txt3);font-family:var(--display);font-weight:700;margin-bottom:6px">${day}</div>
            <div style="height:60px;display:flex;align-items:flex-end;justify-content:center;margin-bottom:4px">
              <div style="width:26px;border-radius:3px 3px 0 0;background:${avg>=0?'var(--accent)':'var(--red)'};opacity:0.8;height:${Math.max(4,pct)}%"></div>
            </div>
            <div style="font-size:9px;color:${avg>=0?'var(--accent)':'var(--red)'};font-family:var(--mono)">${avg>=0?'+':''}$${Math.abs(avg).toFixed(0)}</div>
            <div style="font-size:8px;color:var(--txt3)">${d.c} trades</div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <!-- Mood correlation -->
    ${Object.keys(byMood).length >= 2 ? `
    <div class="section-lbl">Mood vs Win Rate</div>
    <div class="card" style="padding:14px;margin-bottom:14px">
      ${Object.entries(byMood).sort((a,b)=>b[1].wins/b[1].total-a[1].wins/a[1].total).map(([mood,d])=>{
        const moodWR = Math.round(d.wins/d.total*100);
        return `<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
          <div style="font-size:13px;width:80px;color:var(--txt2)">${mood}</div>
          <div style="flex:1;height:8px;background:var(--bg4);border-radius:4px;overflow:hidden">
            <div style="height:100%;width:${moodWR}%;background:${moodWR>=50?'var(--accent)':'var(--red)'};border-radius:4px;transition:width .6s"></div>
          </div>
          <div style="font-size:11px;color:var(--txt2);font-family:var(--mono);width:36px">${moodWR}%</div>
          <div style="font-size:10px;color:var(--txt3)">${d.total}t</div>
        </div>`;
      }).join('')}
    </div>` : ''}`;
}

/* ══ HEATMAP TAB ════════════════════════════════════════════════ */
function renderJournalHeatmap() {
  const j = STATE.journal;
  if (!j.length) return `<div style="text-align:center;padding:40px;color:var(--txt2)">Log trades to see your P&L heatmap</div>`;

  // Build last 90 days map
  const dayMap = {};
  j.forEach(t => {
    const d = (t.date||t.time||'').substring(0,10);
    if (!d) return;
    if (!dayMap[d]) dayMap[d] = 0;
    dayMap[d] += parseFloat(t.pnl)||0;
  });

  const today = new Date();
  const days = [];
  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().substring(0,10);
    days.push({ key, pnl: dayMap[key]||null, day: d.getDay() });
  }

  const maxAbs = Math.max(...Object.values(dayMap).map(Math.abs), 1);

  // Group into weeks
  const weeks = [];
  let week = [];
  // Pad start
  const firstDay = days[0].day;
  for (let i = 0; i < firstDay; i++) week.push(null);
  days.forEach(d => {
    week.push(d);
    if (week.length === 7) { weeks.push(week); week = []; }
  });
  if (week.length) { while(week.length<7) week.push(null); weeks.push(week); }

  const monthLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  return `
    <div class="section-lbl">90-Day P&L Heatmap</div>
    <div class="card" style="padding:14px;margin-bottom:14px;overflow-x:auto">
      <!-- Day labels -->
      <div style="display:flex;gap:3px;margin-bottom:4px;padding-left:28px">
        ${['S','M','T','W','T','F','S'].map(d=>`<div style="width:14px;text-align:center;font-size:8px;color:var(--txt3);font-family:var(--display)">${d}</div>`).join('')}
      </div>
      <div style="display:flex;gap:3px">
        ${weeks.map((w,wi)=>`
          <div style="display:flex;flex-direction:column;gap:3px">
            ${w.map((d,di)=>{
              if (!d) return `<div style="width:14px;height:14px"></div>`;
              const pnl = d.pnl;
              const intensity = pnl !== null ? Math.min(1, Math.abs(pnl)/maxAbs) : 0;
              const bg = pnl === null ? 'var(--bg4)' :
                         pnl > 0 ? `rgba(0,212,184,${0.15 + intensity*0.75})` :
                         pnl < 0 ? `rgba(239,68,68,${0.15 + intensity*0.75})` : 'var(--bg4)';
              const today_key = today.toISOString().substring(0,10);
              const isToday = d.key === today_key;
              return `<div style="width:14px;height:14px;border-radius:2px;background:${bg};${isToday?'outline:1.5px solid var(--accent)':''};cursor:pointer"
                title="${d.key}: ${pnl!==null?(pnl>=0?'+':'')+'$'+pnl.toFixed(2):'no trades'}">
              </div>`;
            }).join('')}
          </div>`).join('')}
      </div>
      <div style="display:flex;align-items:center;gap:8px;margin-top:12px">
        <span style="font-size:10px;color:var(--txt3)">Less</span>
        ${[0.15,0.35,0.55,0.75,0.95].map(op=>`<div style="width:12px;height:12px;border-radius:2px;background:rgba(0,212,184,${op})"></div>`).join('')}
        <span style="font-size:10px;color:var(--txt3)">More profit</span>
        <div style="width:12px;height:12px;border-radius:2px;background:rgba(239,68,68,0.75)"></div>
        <span style="font-size:10px;color:var(--txt3)">Loss</span>
      </div>
    </div>

    <!-- Monthly summary -->
    <div class="section-lbl">Monthly Summary</div>
    <div class="card" style="padding:0;overflow:hidden;margin-bottom:14px">
      ${(()=>{
        const monthly = {};
        j.forEach(t => {
          const m = (t.date||t.time||'').substring(0,7);
          if (!m) return;
          if (!monthly[m]) monthly[m] = {pnl:0,wins:0,total:0};
          monthly[m].pnl += parseFloat(t.pnl)||0;
          monthly[m].total++;
          if (parseFloat(t.pnl)>0) monthly[m].wins++;
        });
        return Object.entries(monthly).sort((a,b)=>b[0].localeCompare(a[0])).slice(0,6).map(([m,d],i,arr)=>`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;${i<arr.length-1?'border-bottom:1px solid var(--bdr3)':''}">
            <div>
              <div style="font-weight:700;font-family:var(--display);font-size:13px">${m}</div>
              <div style="font-size:10px;color:var(--txt3)">${d.wins}W/${d.total-d.wins}L · ${Math.round(d.wins/d.total*100)}% WR</div>
            </div>
            <div style="font-family:var(--mono);font-weight:700;color:${d.pnl>=0?'var(--accent)':'var(--red)'}">${d.pnl>=0?'+':''}$${Math.abs(d.pnl).toFixed(2)}</div>
          </div>`).join('') || '<div style="padding:14px;color:var(--txt3);font-size:13px">No monthly data yet</div>';
      })()}
    </div>`;
}

/* ══ EQUITY CURVE TAB ═══════════════════════════════════════════ */
function renderJournalEquity() {
  const j = [...STATE.journal].sort((a,b)=>new Date(a.date||a.time)-new Date(b.date||b.time));
  if (j.length < 2) return `<div style="text-align:center;padding:40px;color:var(--txt2)">Log 2+ trades to see your equity curve</div>`;

  // Build equity series starting from 10000
  let equity = 10000;
  const series = [{x:0, y:equity, label:'Start'}];
  j.forEach((t,i) => {
    equity += parseFloat(t.pnl)||0;
    series.push({x:i+1, y:equity, label:t.pair||'', pnl:parseFloat(t.pnl)||0});
  });

  const minY = Math.min(...series.map(p=>p.y));
  const maxY = Math.max(...series.map(p=>p.y));
  const range = maxY - minY || 100;
  const pad = range * 0.1;
  const lo = minY - pad, hi = maxY + pad, rng = hi - lo;
  const W = 320, H = 160, PL = 50, PR = 8, PT = 12, PB = 28;
  const pw = W-PL-PR, ph = H-PT-PB;
  const sx = i => PL + (i/(series.length-1))*pw;
  const sy = v => PT + (1-(v-lo)/rng)*ph;

  // Build SVG path
  const points = series.map((p,i) => `${sx(i)},${sy(p.y)}`).join(' ');
  // Fill area
  const areaPath = `M${sx(0)},${sy(series[0].y)} ` + series.map((p,i)=>`L${sx(i)},${sy(p.y)}`).join(' ') + ` L${sx(series.length-1)},${H-PB} L${PL},${H-PB} Z`;

  // Drawdown calculation
  let peak = 10000, maxDD = 0;
  series.forEach(p => {
    if (p.y > peak) peak = p.y;
    const dd = (peak - p.y) / peak * 100;
    if (dd > maxDD) maxDD = dd;
  });

  const finalEquity = series[series.length-1].y;
  const totalReturn = ((finalEquity - 10000)/10000*100).toFixed(1);
  const isPositive = finalEquity >= 10000;

  // Grid prices
  const gridPrices = [lo + rng*0.25, lo + rng*0.5, lo + rng*0.75, maxY];

  return `
    <div class="section-lbl">Equity Curve</div>
    <div class="card" style="padding:14px;margin-bottom:14px">
      <!-- SVG Chart -->
      <svg viewBox="0 0 ${W} ${H}" width="100%" style="display:block;overflow:visible">
        <!-- Grid -->
        ${gridPrices.map(p=>`
          <line x1="${PL}" y1="${sy(p)}" x2="${W-PR}" y2="${sy(p)}" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
          <text x="${PL-4}" y="${sy(p)+3}" fill="#52718E" font-size="8" font-family="monospace" text-anchor="end">$${Math.round(p).toLocaleString()}</text>
        `).join('')}
        <!-- Zero line -->
        <line x1="${PL}" y1="${sy(10000)}" x2="${W-PR}" y2="${sy(10000)}" stroke="rgba(245,158,11,0.3)" stroke-width="1" stroke-dasharray="4,3"/>
        <!-- Area fill -->
        <path d="${areaPath}" fill="${isPositive?'rgba(0,212,184,0.08)':'rgba(239,68,68,0.08)'}"/>
        <!-- Equity line -->
        <polyline points="${points}" fill="none" stroke="${isPositive?'var(--accent)':'var(--red)'}" stroke-width="2" stroke-linejoin="round"/>
        <!-- Dots for each trade -->
        ${series.slice(1).map((p,i)=>`
          <circle cx="${sx(i+1)}" cy="${sy(p.y)}" r="3"
            fill="${p.pnl>=0?'var(--accent)':'var(--red)'}"
            stroke="var(--bg)" stroke-width="1"/>
        `).join('')}
        <!-- Current equity label -->
        <rect x="${W-PR-52}" y="${sy(finalEquity)-12}" width="50" height="14" fill="${isPositive?'var(--accent)':'var(--red)'}" rx="3"/>
        <text x="${W-PR-27}" y="${sy(finalEquity)-2}" fill="#080E14" font-size="8" font-family="monospace" text-anchor="middle" font-weight="bold">$${Math.round(finalEquity).toLocaleString()}</text>
      </svg>
    </div>

    <!-- Equity stats -->
    <div class="stat-grid" style="margin-bottom:14px">
      <div class="stat-box">
        <div class="stat-val" style="color:${isPositive?'var(--accent)':'var(--red)'};">${isPositive?'+':''}${totalReturn}%</div>
        <div class="stat-lbl">Total Return</div>
      </div>
      <div class="stat-box">
        <div class="stat-val" style="color:${isPositive?'var(--accent)':'var(--red)'};">${isPositive?'+':''}$${(finalEquity-10000).toFixed(0)}</div>
        <div class="stat-lbl">Net P&L</div>
      </div>
      <div class="stat-box">
        <div class="stat-val" style="color:var(--red)">-${maxDD.toFixed(1)}%</div>
        <div class="stat-lbl">Max Drawdown</div>
      </div>
      <div class="stat-box">
        <div class="stat-val">${j.length}</div>
        <div class="stat-lbl">Total Trades</div>
      </div>
    </div>

    <!-- Consecutive runs -->
    <div class="section-lbl">Recent Performance</div>
    <div class="card" style="padding:14px;margin-bottom:14px">
      <div style="display:flex;flex-wrap:wrap;gap:4px">
        ${[...j].slice(-20).map(t=>{
          const win = parseFloat(t.pnl)>0;
          return `<div style="width:24px;height:24px;border-radius:4px;background:${win?'rgba(0,212,184,0.25)':'rgba(239,68,68,0.25)'};border:1px solid ${win?'var(--accent)':'var(--red)'};display:flex;align-items:center;justify-content:center;font-size:9px;color:${win?'var(--accent)':'var(--red)'}">
            ${win?'W':'L'}
          </div>`;
        }).join('')}
      </div>
      <div style="font-size:10px;color:var(--txt3);margin-top:8px">Last ${Math.min(20,j.length)} trades</div>
    </div>`;
}

/* ══ NEW ENTRY MODAL ════════════════════════════════════════════ */
function showNewEntryModal() {
  const now = new Date().toISOString().substring(0,16);
  showModal(`
    <div class="modal-handle"></div>
    <div style="font-family:var(--display);font-weight:800;font-size:18px;margin-bottom:16px">Log Trade</div>

    <div class="inp-row">
      <div class="inp-wrap">
        <label class="inp-label">Pair</label>
        <select class="inp" id="je-pair">
          ${['EUR/USD','GBP/USD','USD/JPY','AUD/USD','USD/CHF','USD/CAD','GBP/JPY','EUR/JPY','NZD/USD','XAU/USD','NAS100','SPX500','US30','Other'].map(p=>`<option>${p}</option>`).join('')}
        </select>
      </div>
      <div class="inp-wrap">
        <label class="inp-label">Direction</label>
        <select class="inp" id="je-dir">
          <option value="BUY">BUY ▲</option>
          <option value="SELL">SELL ▼</option>
        </select>
      </div>
    </div>

    <div class="inp-row">
      <div class="inp-wrap">
        <label class="inp-label">P&L ($)</label>
        <input class="inp" id="je-pnl" type="number" placeholder="+50 or -25">
      </div>
      <div class="inp-wrap">
        <label class="inp-label">Pips</label>
        <input class="inp" id="je-pips" type="number" placeholder="30">
      </div>
    </div>

    <div class="inp-row">
      <div class="inp-wrap">
        <label class="inp-label">Entry Price</label>
        <input class="inp" id="je-entry" type="number" step="0.00001" placeholder="1.08500">
      </div>
      <div class="inp-wrap">
        <label class="inp-label">Exit Price</label>
        <input class="inp" id="je-exit" type="number" step="0.00001" placeholder="1.09100">
      </div>
    </div>

    <div class="inp-row">
      <div class="inp-wrap">
        <label class="inp-label">Stop Loss</label>
        <input class="inp" id="je-sl" type="number" step="0.00001" placeholder="1.08200">
      </div>
      <div class="inp-wrap">
        <label class="inp-label">R:R Achieved</label>
        <input class="inp" id="je-rr" type="number" step="0.1" placeholder="2.0">
      </div>
    </div>

    <div class="inp-row">
      <div class="inp-wrap">
        <label class="inp-label">Timeframe</label>
        <select class="inp" id="je-tf">
          ${['M1','M5','M15','M30','H1','H4','D1','W1'].map(t=>`<option>${t}</option>`).join('')}
        </select>
      </div>
      <div class="inp-wrap">
        <label class="inp-label">Setup Type</label>
        <select class="inp" id="je-setup">
          ${['S/R Bounce','Breakout','EMA Pullback','Pin Bar','Engulfing','London Breakout','SMC OB','Fibonacci','Other'].map(s=>`<option>${s}</option>`).join('')}
        </select>
      </div>
    </div>

    <div class="inp-wrap">
      <label class="inp-label">Mood / Emotional State</label>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        ${[['😊','calm'],['🔥','confident'],['😰','nervous'],['😤','frustrated'],['🤑','greedy'],['😴','tired'],['🎯','focused'],['😤','revenge']].map(([e,m])=>`
          <div onclick="document.querySelectorAll('.mood-sel').forEach(x=>x.classList.remove('selected'));this.classList.add('selected');document.getElementById('je-mood').value='${m}'"
               class="mood-sel" style="padding:7px 10px;border:1.5px solid var(--bdr2);border-radius:8px;cursor:pointer;font-size:13px;display:flex;align-items:center;gap:4px;transition:all .15s"
               ontouchstart="this.style.borderColor='var(--accent)'">
            ${e} <span style="font-size:10px;color:var(--txt2)">${m}</span>
          </div>`).join('')}
        <input type="hidden" id="je-mood" value="calm">
      </div>
    </div>

    <div class="inp-wrap">
      <label class="inp-label">Followed your trading plan?</label>
      <div style="display:flex;gap:8px">
        <div onclick="this.style.background='rgba(0,212,184,0.15)';this.style.borderColor='var(--accent)';document.getElementById('je-plan').value='yes';this.nextElementSibling.style.background='';this.nextElementSibling.style.borderColor='var(--bdr2)'"
             style="flex:1;padding:10px;border:1.5px solid var(--bdr2);border-radius:var(--rs);cursor:pointer;text-align:center;font-size:13px;transition:all .15s">
          ✅ Yes — followed rules
        </div>
        <div onclick="this.style.background='rgba(239,68,68,0.1)';this.style.borderColor='var(--red)';document.getElementById('je-plan').value='no';this.previousElementSibling.style.background='';this.previousElementSibling.style.borderColor='var(--bdr2)'"
             style="flex:1;padding:10px;border:1.5px solid var(--bdr2);border-radius:var(--rs);cursor:pointer;text-align:center;font-size:13px;transition:all .15s">
          ❌ No — broke rules
        </div>
        <input type="hidden" id="je-plan" value="yes">
      </div>
    </div>

    <div class="inp-wrap">
      <label class="inp-label">Trade Notes</label>
      <textarea class="inp" id="je-notes" placeholder="What did you see? Why did you enter? What went wrong or right?" rows="3"></textarea>
    </div>

    <div class="inp-wrap">
      <label class="inp-label">Lesson Learned</label>
      <input class="inp" id="je-lesson" placeholder="One sentence takeaway from this trade">
    </div>

    <button class="btn btn-gold" style="margin-top:6px" onclick="saveJournalEntry()">Save Trade Entry ✓</button>
    <button class="btn btn-outline" style="margin-top:8px" onclick="closeModal()">Cancel</button>
  `);
}

function saveJournalEntry() {
  const pnl = parseFloat(document.getElementById('je-pnl')?.value);
  if (isNaN(pnl)) { showToast('⚠️ Enter the P&L amount'); return; }

  const entry = {
    id: 'j_' + Date.now(),
    date: new Date().toISOString(),
    pair:   document.getElementById('je-pair')?.value  || 'EUR/USD',
    direction: document.getElementById('je-dir')?.value || 'BUY',
    dir:    document.getElementById('je-dir')?.value   || 'BUY',
    pnl:    pnl,
    pips:   parseFloat(document.getElementById('je-pips')?.value)  || null,
    entry:  parseFloat(document.getElementById('je-entry')?.value) || null,
    exit:   parseFloat(document.getElementById('je-exit')?.value)  || null,
    sl:     parseFloat(document.getElementById('je-sl')?.value)    || null,
    rr:     parseFloat(document.getElementById('je-rr')?.value)    || null,
    tf:     document.getElementById('je-tf')?.value    || 'H1',
    setup:  document.getElementById('je-setup')?.value || '',
    mood:   document.getElementById('je-mood')?.value  || 'calm',
    plan:   document.getElementById('je-plan')?.value  || 'yes',
    notes:  document.getElementById('je-notes')?.value || '',
    lesson: document.getElementById('je-lesson')?.value|| '',
  };

  STATE.journal.push(entry);
  addXP(pnl >= 0 ? 20 : 10);
  saveState();
  closeModal();

  const grade = gradeTradeEntry(entry);
  showToast(`📓 Trade logged! ${grade?grade.label+' trade — ':''} +${pnl>=0?20:10} XP`);

  // Check for first win celebration
  const wins = STATE.journal.filter(t=>parseFloat(t.pnl)>0);
  if (wins.length === 1 && typeof showCelebration === 'function') {
    setTimeout(()=>showCelebration('first_win',{pnl}),500);
  }

  navigate('journal');
}

function showEntryDetail(id) {
  const e = STATE.journal.find(t=>t.id===id);
  if (!e) return;
  const pnl = parseFloat(e.pnl)||0;
  const grade = gradeTradeEntry(e);
  showModal(`
    <div class="modal-handle"></div>
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px">
      <div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
          <span style="font-family:var(--display);font-weight:800;font-size:18px">${e.pair||'—'}</span>
          <span class="pill ${pnl>=0?'pill-green':'pill-red'}">${e.direction||e.dir||'—'}</span>
          ${grade ? `<span class="pill" style="background:${grade.bg};color:${grade.col};border-color:${grade.col}44">${grade.label}</span>` : ''}
        </div>
        <div style="font-size:12px;color:var(--txt3)">${fmtDate(e.date||e.time)}</div>
      </div>
      <div style="font-family:var(--mono);font-weight:700;font-size:22px;color:${pnl>=0?'var(--accent)':'var(--red)'}">${pnl>=0?'+':''}$${Math.abs(pnl).toFixed(2)}</div>
    </div>

    <div class="stat-grid" style="margin-bottom:14px">
      ${e.entry ? `<div class="calc-res"><div class="calc-res-val" style="font-size:14px">${e.entry}</div><div class="calc-res-lbl">Entry</div></div>` : ''}
      ${e.exit  ? `<div class="calc-res"><div class="calc-res-val" style="font-size:14px">${e.exit}</div><div class="calc-res-lbl">Exit</div></div>` : ''}
      ${e.sl    ? `<div class="calc-res"><div class="calc-res-val" style="font-size:14px;color:var(--red)">${e.sl}</div><div class="calc-res-lbl">Stop Loss</div></div>` : ''}
      ${e.rr    ? `<div class="calc-res"><div class="calc-res-val" style="font-size:14px;color:var(--accent)">${e.rr}:1</div><div class="calc-res-lbl">R:R</div></div>` : ''}
    </div>

    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">
      ${e.tf    ? `<span class="pill pill-blue">${e.tf}</span>` : ''}
      ${e.setup ? `<span class="pill pill-purple">${e.setup}</span>` : ''}
      ${e.mood  ? `<span class="pill pill-gold">${e.mood}</span>` : ''}
      ${e.plan  ? `<span class="pill ${e.plan==='yes'?'pill-green':'pill-red'}">Plan: ${e.plan==='yes'?'✓ Followed':'✗ Broke'}</span>` : ''}
    </div>

    ${e.notes ? `
      <div class="section-lbl">Notes</div>
      <div class="card" style="padding:12px;margin-bottom:10px;font-size:13px;color:var(--txt2);line-height:1.6">${e.notes}</div>` : ''}

    ${e.lesson ? `
      <div class="section-lbl">Lesson Learned</div>
      <div class="card" style="padding:12px;margin-bottom:10px;font-size:13px;color:var(--txt2);line-height:1.6;background:var(--accent-bg);border-color:var(--bdr)">💡 ${e.lesson}</div>` : ''}

    <div style="display:flex;gap:8px;margin-top:4px">
      <button class="btn btn-outline btn-sm" style="flex:1" onclick="closeModal()">Close</button>
      <button class="btn btn-danger btn-sm" style="width:auto;padding:8px 14px" onclick="deleteJournalEntry('${e.id}')">🗑 Delete</button>
    </div>
  `);
}

function deleteJournalEntry(id) {
  if (!confirm('Delete this trade entry?')) return;
  STATE.journal = STATE.journal.filter(t=>t.id!==id);
  saveState();
  closeModal();
  navigate('journal');
  showToast('Trade entry deleted');
}
