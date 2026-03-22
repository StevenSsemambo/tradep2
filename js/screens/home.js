let _qaTouchX = 0, _qaTouchY = 0;
/* ═══════════════════════════════════════════════════════════════
   HOME SCREEN — Premium trading dashboard
   Upgrades: celebration overlay, swipeable cards, dense cleanup
   ═══════════════════════════════════════════════════════════════ */

// _clockInterval declared in state.js — do not redeclare

/* ════ CELEBRATION OVERLAYS ════════════════════════════════════ */
function showCelebration(type, data = {}) {
  /* type: 'lesson_complete' | 'level_up' | 'first_win' | 'streak' | 'onboarding_done' */
  const configs = {
    onboarding_done: {
      emoji: '🎉', title: `Welcome to TradeBaby, ${data.name || 'Trader'}!`,
      sub: "Your trading academy is ready. Let's build your edge.",
      color: '#00D4B8', btn: "Let's Start 🚀", confetti: true
    },
    lesson_complete: {
      emoji: '🎓', title: 'Lesson Complete!',
      sub: `+${data.xp || 50} XP earned · ${data.lessonsLeft || 'More'} lessons to go`,
      color: '#00D4B8', btn: 'Continue →', confetti: false
    },
    level_up: {
      emoji: '⚡', title: `Level ${data.level} Unlocked!`,
      sub: `You've reached Level ${data.level}. New challenges await.`,
      color: '#FFD700', btn: 'Awesome! 🏆', confetti: true
    },
    first_win: {
      emoji: '💰', title: 'First Winning Trade!',
      sub: `+${data.pnl ? fmtCurrency(data.pnl) : '$0.00'} profit. You're on your way.`,
      color: '#00D4B8', btn: 'Keep Going! 📈', confetti: true
    },
    streak: {
      emoji: '🔥', title: `${data.days || 7}-Day Streak!`,
      sub: `${data.days} days of consistent learning. Discipline is your edge.`,
      color: '#FF6B6B', btn: 'Stay Hot! 🔥', confetti: false
    },
  };
  const cfg = configs[type];
  if (!cfg) return;

  if (cfg.confetti) launchConfetti();

  /* Full-screen celebration overlay */
  const overlay = document.createElement('div');
  overlay.id = 'celebration-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:10000;
    display:flex;align-items:center;justify-content:center;
    background:rgba(8,14,20,0.92);backdrop-filter:blur(12px);
    animation:fadeIn .3s ease both;
  `;

  overlay.innerHTML = `
    <div style="
      background:linear-gradient(135deg,var(--bg2) 0%,rgba(${cfg.color==='#00D4B8'?'0,212,184':'255,215,0'},.08) 100%);
      border:1px solid ${cfg.color}44;border-radius:24px;padding:36px 28px;
      max-width:320px;width:calc(100% - 40px);text-align:center;
      animation:fadeUp .4s cubic-bezier(.22,.68,0,1.2) both;
      box-shadow:0 0 60px ${cfg.color}22;
    ">
      <div style="font-size:64px;margin-bottom:16px;animation:floatLogo 2s ease-in-out infinite">${cfg.emoji}</div>
      <div style="font-family:'Syne',sans-serif;font-weight:800;font-size:22px;color:${cfg.color};margin-bottom:8px;line-height:1.2">${cfg.title}</div>
      <div style="font-size:14px;color:var(--txt2);line-height:1.6;margin-bottom:24px">${cfg.sub}</div>
      ${type === 'level_up' ? `
        <div style="display:flex;justify-content:center;gap:16px;margin-bottom:20px">
          <div style="text-align:center">
            <div style="font-family:monospace;font-size:28px;font-weight:700;color:#FFD700">L${data.level}</div>
            <div style="font-size:10px;color:var(--txt3);font-family:var(--display);letter-spacing:1px">LEVEL</div>
          </div>
        </div>` : ''}
      <button onclick="document.getElementById('celebration-overlay')?.remove()"
        style="background:linear-gradient(135deg,${cfg.color==='#FFD700'?'#B8860B,#FFD700':'var(--accent-d),var(--accent)'});color:#080E14;border:none;border-radius:12px;padding:14px 32px;font-family:'Syne',sans-serif;font-weight:800;font-size:15px;cursor:pointer;width:100%;box-shadow:0 4px 20px ${cfg.color}44">
        ${cfg.btn}
      </button>
    </div>
  `;

  document.body.appendChild(overlay);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.remove();
  });

  /* Auto-dismiss after 8s */
  setTimeout(() => overlay?.remove(), 8000);
}

/* ════ RENDER HOME ══════════════════════════════════════════════ */
function renderHome() {
  const name   = STATE.user.name || 'Trader';
  const hr     = new Date().getHours();
  const greeting = hr < 5 ? 'Good night' : hr < 12 ? 'Good morning' : hr < 17 ? 'Good afternoon' : 'Good evening';
  const xpPct  = Math.round((STATE.user.xp / STATE.user.xpNext) * 100);
  const insight = getSmartInsight();
  const totalPnl = STATE.simTrades.reduce((a, t) => a + (t.pnl || 0), 0);
  const wr       = STATE.simTrades.length > 0
    ? Math.round(STATE.simTrades.filter(t => t.pnl > 0).length / STATE.simTrades.length * 100) : 0;

  return `
    ${renderTickerBar()}

    <div class="screen-pad">
      <!-- ── GREETING ROW ── -->
      <div class="a-fadeup" style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px">
        <div>
          <div style="font-size:11px;color:var(--txt3);font-family:var(--display);font-weight:600;letter-spacing:.5px">${greeting},</div>
          <h1 style="font-size:24px;font-family:'Syne',sans-serif;font-weight:800;margin-top:2px;letter-spacing:-.5px">${name} 👋</h1>
          <div style="display:flex;align-items:center;gap:8px;margin-top:6px">
            <span class="pill pill-accent">⚡ Lvl ${STATE.user.level}</span>
            <span style="font-size:12px;color:var(--txt3)">${STATE.dailyStreak}🔥 streak</span>
          </div>
        </div>
        <div style="display:flex;gap:6px;align-items:center;margin-top:4px">
          <button class="btn-icon" onclick="navigate('notifications')" style="position:relative">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
            ${STATE.notifications.filter(n=>!n.read).length > 0 ? '<span style="position:absolute;top:2px;right:2px;width:8px;height:8px;background:var(--red);border-radius:50%;border:2px solid var(--bg)"></span>' : ''}
          </button>
          <button class="btn-icon" onclick="navigate('settings')">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
          </button>
        </div>
      </div>

      <!-- ── HOT STREAK BANNER ── -->
      ${typeof getHotStreakLabel === 'function' && getHotStreakLabel() ? `<div class="a-fadeup" style="background:rgba(249,115,22,0.12);border:1px solid rgba(249,115,22,0.3);border-radius:var(--rs);padding:8px 12px;margin-bottom:10px;font-size:13px">${getHotStreakLabel().text}</div>` : ''}

      <!-- ── XP BAR ── -->
      <div class="xp-wrap a-fadeup2" style="margin-bottom:12px">
        <div class="xp-row">
          <div class="xp-level">Level ${STATE.user.level} Trader</div>
          <div class="xp-pts">${STATE.user.xp} / ${STATE.user.xpNext} XP</div>
        </div>
        <div class="prog-bar lg"><div class="prog-fill" style="width:${xpPct}%"></div></div>
        <div style="font-size:10px;color:var(--txt3);margin-top:4px">${STATE.user.xpNext - STATE.user.xp} XP to Level ${STATE.user.level + 1}</div>
      </div>

      <!-- ── SWIPEABLE CARDS (Insight + Daily Tip) ── -->
      ${renderSwipeCards(insight)}

      <!-- ── FOREX CLOCK ── -->
      <div class="a-fadeup3" style="margin-bottom:14px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <div class="section-lbl" style="margin-bottom:0">Live Sessions</div>
          <div id="utc-time" class="utc-display">—</div>
        </div>
        <div class="forex-clock" id="forex-clock"></div>
      </div>

      <!-- ── STATS GRID ── -->
      <div class="stat-grid a-fadeup3" style="margin-bottom:14px">
        <div class="stat-box card-tappable" onclick="navigate('learn')" style="cursor:pointer">
          <div class="stat-val">${progressPct()}%</div>
          <div class="stat-lbl">Course</div>
        </div>
        <div class="stat-box card-tappable" onclick="navigate('analytics')" style="cursor:pointer">
          <div class="stat-val" style="color:${totalPnl>=0?'var(--accent)':'var(--red)'}">${totalPnl>=0?'+':''}$${Math.abs(totalPnl).toFixed(0)}</div>
          <div class="stat-lbl">Sim P&L</div>
        </div>
        <div class="stat-box card-tappable" onclick="navigate('journal')" style="cursor:pointer">
          <div class="stat-val">${STATE.journal.length}</div>
          <div class="stat-lbl">Journal</div>
        </div>
        <div class="stat-box card-tappable" onclick="navigate('analytics')" style="cursor:pointer">
          <div class="stat-val">${wr > 0 ? wr + '%' : '—'}</div>
          <div class="stat-lbl">Win Rate</div>
        </div>
      </div>

      <!-- ── QUICK ACCESS GRID (2×4 + More) ── -->
      <div class="section-lbl a-fadeup4">Quick Access</div>
      <div class="a-fadeup4" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px">
        ${[
          {icon:'📚',label:'Lessons',   sub:completedCount()+'/'+totalLessons(), action:'learn'},
          {icon:'📈',label:'Practice',  sub:'Sim trade',   action:'trade'},
          {icon:'🤖',label:'AI Mentor', sub:'Ask anything',action:'mentor'},
          {icon:'⚔️',label:'Strategies',sub:'Setups',      action:'strategies'},
          {icon:'🧮',label:'Calculator',sub:'6 tools',     action:'calculator'},
          {icon:'🃏',label:'Flashcards',sub:FLASHCARDS.length+' cards',action:'flashcards'},
          {icon:'📖',label:'Cases',     sub:'Real trades', action:'casestudies'},
          {icon:'⋯',label:'More',       sub:'All tools',   action:'more'},
        ].map(a => `
          <div class="qa-card"
               ontouchstart="_qaTx=event.touches[0].clientX;_qaTy=event.touches[0].clientY;_qaMoved=false;this.style.transform='scale(.94)';this.style.borderColor='var(--accent)'"
               ontouchmove="_qaMoved=true;this.style.transform='';this.style.borderColor=''"
               ontouchend="this.style.transform='';this.style.borderColor='';if(!_qaMoved&&Math.abs(event.changedTouches[0].clientX-_qaTx)<12&&Math.abs(event.changedTouches[0].clientY-_qaTy)<12){event.preventDefault();${ a.action==='more' ? "showMoreMenu()" : "navigate('"+a.action+"')" }}"
               onclick="if(!('ontouchstart' in window)){ ${ a.action==='more' ? "showMoreMenu()" : "navigate('"+a.action+"')" }}">
            <div style="font-size:22px">${a.icon}</div>
            <div style="font-size:10px;font-weight:700;font-family:var(--display);line-height:1.2">${a.label}</div>
            <div style="font-size:9px;color:var(--txt3);margin-top:1px">${a.sub}</div>
          </div>
        `).join('')}
      </div>

      <!-- ── CONTINUE LEARNING ── -->
      ${renderNextLesson()}

      <!-- ── MOOD CHECK-IN ── -->
      ${renderMoodCheckin()}

      <!-- ── MARKET SNAPSHOT ── -->
      <div class="section-lbl a-fadeup5" style="margin-top:14px">Market Snapshot</div>
      <div class="card a-fadeup5" style="padding:0;overflow:hidden;margin-bottom:14px">
        ${MARKET_DATA.tickers.slice(0, 3).map((t, i) => {
          const up = t.change >= 0;
          const price = t.price > 100
            ? t.price.toLocaleString('en-US', {minimumFractionDigits:2})
            : t.price.toFixed(4);
          return `<div style="display:flex;justify-content:space-between;align-items:center;padding:9px 14px;${i<2?'border-bottom:1px solid var(--bdr2)':''}"
            class="card-tappable" onclick="showToast('${t.pair}: ${price} (${up?'+':''}${t.pct.toFixed(2)}%)')">
            <div style="font-weight:700;font-size:13px;font-family:var(--display)">${t.pair}</div>
            <div style="text-align:right">
              <div style="font-family:var(--mono);font-size:13px">${price}</div>
              <div style="font-size:11px;color:${up?'var(--accent)':'var(--red)'}">${up?'▲':'▼'} ${Math.abs(t.pct).toFixed(2)}%</div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>

      <!-- ── WEEKLY REVIEW BANNER (Sundays) ── -->
      ${new Date().getDay() === 0 ? `
      <div class="card a-fadeup5" style="margin-bottom:14px;padding:14px;background:linear-gradient(135deg,var(--bg2),rgba(0,212,184,0.08));border-color:var(--accent-dim,var(--bdr))">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="font-size:28px">📊</div>
          <div style="flex:1">
            <div style="font-family:var(--display);font-weight:700;font-size:14px;color:var(--accent)">Weekly Review</div>
            <div style="font-size:12px;color:var(--txt2);margin-top:2px">It's Sunday — let the AI generate your week in review</div>
          </div>
          <button class="btn btn-outline btn-sm" style="width:auto" onclick="navigate('mentor');setTimeout(()=>{const i=document.getElementById('chat-inp');if(i){i.value='Generate my weekly review';submitChat();}},400)">Review →</button>
        </div>
      </div>` : ''}

      <!-- ── AFRICAN MARKET TIP ── -->
      ${typeof AFRICA_DATA !== 'undefined' ? `
      <div class="card a-fadeup5" style="margin-bottom:14px;padding:14px">
        <div style="font-size:10px;color:var(--gold);font-family:var(--display);font-weight:700;letter-spacing:1px;margin-bottom:8px">🌍 LOCAL TRADING TIP</div>
        ${(()=>{
          const tip = AFRICA_DATA.localContext[new Date().getDate() % AFRICA_DATA.localContext.length];
          const cur = STATE.user.localCurrency || 'UGX';
          const cc = AFRICA_DATA.currencies[cur];
          return `<div style="font-size:13px;color:var(--txt2);line-height:1.6">${tip.icon} ${tip.tip}</div>
          ${cc ? `<div style="font-size:11px;color:var(--txt3);margin-top:6px">Current rate: $1 USD ≈ ${cc.symbol} ${cc.rateToUSD.toLocaleString()}</div>` : ''}`;
        })()}
        <button class="btn btn-ghost btn-xs" style="margin-top:8px" onclick="navigate('africabrokers')">View African Broker Guide →</button>
      </div>` : ''}

      <!-- ── DAILY WISDOM (bottom) ── -->
      <div class="a-fadeup5" style="margin-bottom:20px">
        <div class="section-lbl">Daily Wisdom</div>
        <div style="background:linear-gradient(135deg,var(--bg2),var(--accent-bg));border:1px solid var(--bdr);border-radius:var(--r);padding:18px;position:relative;overflow:hidden">
          <div style="position:absolute;top:-20px;right:-20px;width:90px;height:90px;border-radius:50%;background:radial-gradient(circle,rgba(0,212,184,0.08),transparent 70%)"></div>
          <div style="font-size:13px;font-style:italic;line-height:1.7;color:var(--txt);margin-bottom:12px">"${DAILY_TIPS[new Date().getDate() % DAILY_TIPS.length].tip}"</div>
          <div style="font-size:11px;color:var(--accent);font-family:var(--display);font-weight:700;letter-spacing:.5px">— ${DAILY_TIPS[new Date().getDate() % DAILY_TIPS.length].by}</div>
        </div>
      </div>
    </div>
  `;
}

/* ── SWIPEABLE INSIGHT + TIP CARDS ──────────────────────────── */
let _homeCardIdx = 0;

function renderSwipeCards(insight) {
  const tip = DAILY_TIPS[new Date().getDate() % DAILY_TIPS.length];
  const cards = [
    /* Card 0: Smart insight */
    `<div style="display:flex;align-items:center;gap:12px;padding:14px">
      <div style="font-size:28px;flex-shrink:0">${insight.icon}</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;color:var(--txt2);line-height:1.5">${insight.text}</div>
      </div>
      <span class="pill pill-accent" onclick="navigate('${insight.action}')" style="cursor:pointer;flex-shrink:0">${insight.cta} →</span>
    </div>`,
    /* Card 1: Session status */
    `<div style="padding:14px;overflow-y:auto;max-height:140px;-webkit-overflow-scrolling:touch">
      <div style="font-size:10px;color:var(--accent);font-family:var(--display);font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:10px">⏰ Today's Session</div>
      ${renderSessionSummary()}
    </div>`,
  ];

  return `
    <div class="a-fadeup2" style="margin-bottom:14px;position:relative">
      <div id="swipe-card-wrap" style="overflow:hidden;border-radius:var(--r);border:1px solid var(--bdr);background:rgba(255,255,255,0.45);backdrop-filter:blur(10px)" ontouchstart="swipeCardStart(event)" ontouchend="swipeCardEnd(event)">
        <div id="swipe-card-inner" style="display:flex;transition:transform .3s cubic-bezier(.22,.68,0,1.2)">
          ${cards.map((c, i) => `<div style="min-width:100%;flex-shrink:0;overflow-y:auto;max-height:160px;-webkit-overflow-scrolling:touch">${c}</div>`).join('')}
        </div>
      </div>
      <!-- Dots -->
      <div style="display:flex;justify-content:center;gap:5px;margin-top:6px">
        ${cards.map((_, i) => `
          <div onclick="goSwipeCard(${i})" style="width:${_homeCardIdx===i?'18px':'6px'};height:6px;border-radius:3px;background:${_homeCardIdx===i?'var(--accent)':'var(--bdr2)'};transition:all .3s;cursor:pointer"></div>
        `).join('')}
      </div>
    </div>`;
}

let _swipeTX = 0;
function swipeCardStart(e) { _swipeTX = e.touches[0].clientX; }
function swipeCardEnd(e) {
  const dx = e.changedTouches[0].clientX - _swipeTX;
  if (Math.abs(dx) > 40) {
    const total = 3;
    if (dx < 0 && _homeCardIdx < total - 1) _homeCardIdx++;
    else if (dx > 0 && _homeCardIdx > 0)    _homeCardIdx--;
    _updateSwipeCard();
  }
}
function goSwipeCard(i) { _homeCardIdx = i; _updateSwipeCard(); }
function _updateSwipeCard() {
  const inner = document.getElementById('swipe-card-inner');
  if (inner) inner.style.transform = `translateX(-${_homeCardIdx * 100}%)`;
  /* Update dots */
  const wrap = document.getElementById('swipe-card-wrap');
  if (wrap) {
    const nextSib = wrap.nextElementSibling;
    if (nextSib) {
      nextSib.querySelectorAll('div').forEach((dot, i) => {
        dot.style.width    = _homeCardIdx === i ? '18px' : '6px';
        dot.style.background = _homeCardIdx === i ? 'var(--accent)' : 'var(--bdr2)';
      });
    }
  }
}

function renderSessionSummary() {
  const sessions = getSessionStatus();
  const open = sessions.filter(s => s.isOpen);
  const soon = sessions.find(s => s.soon);
  if (open.length > 0) {
    return `<div style="color:var(--accent);font-size:13px;margin-bottom:6px">● ${open.map(s=>s.name).join(' + ')} ${open.length>1?'sessions are':'session is'} <strong>LIVE</strong></div>
      <div style="font-size:12px;color:var(--txt2)">Best pairs: ${open.flatMap(s=>s.pairs.split(' ')).join(', ')}</div>
      <div style="font-size:11px;color:var(--txt3);margin-top:4px">Peak trading hours — highest liquidity and tightest spreads</div>`;
  }
  if (soon) {
    return `<div style="color:var(--orange);font-size:13px;margin-bottom:6px">⏰ ${soon.name} opens in ~${soon.minsTill} min</div>
      <div style="font-size:12px;color:var(--txt2)">Good time to prepare analysis and mark key S/R levels</div>`;
  }
  return `<div style="font-size:13px;color:var(--txt2)">All major sessions currently closed</div>
    <div style="font-size:11px;color:var(--txt3);margin-top:4px">Great time for learning, strategy review, and journalling</div>`;
}

/* ── TICKER BAR ──────────────────────────────────────────────── */
function renderTickerBar() {
  const items = MARKET_DATA.tickers.map(t => {
    const up = t.change >= 0;
    const price = t.price > 100
      ? t.price.toLocaleString('en-US', {minimumFractionDigits:2})
      : t.price.toFixed(4);
    return `<div class="ticker-item">
      <span style="font-family:var(--display);font-weight:700;font-size:11px;color:var(--txt2)">${t.pair}</span>
      <span style="font-family:var(--mono);font-size:11px">${price}</span>
      <span style="color:${up?'var(--accent)':'var(--red)'};font-size:10px">${up?'▲':'▼'} ${Math.abs(t.pct).toFixed(2)}%</span>
    </div>`;
  }).join('');
  return `<div class="ticker-outer"><div class="ticker-inner">${items}${items}</div></div>`;
}

/* ── SMART INSIGHT ───────────────────────────────────────────── */
function getSmartInsight() {
  const now = new Date();
  const hr  = now.getHours();
  const sessions = getSessionStatus();
  const soon = sessions.find(s => s.soon);
  const open = sessions.filter(s => s.isOpen);
  const daysSinceJournal = STATE.journal.length > 0
    ? Math.round((now - new Date(STATE.journal[STATE.journal.length-1].date)) / 86400000) : 999;
  const allTrades = [...STATE.journal, ...STATE.simTrades];
  const wr = allTrades.length >= 10
    ? Math.round(allTrades.filter(t=>parseFloat(t.pnl)>0).length/allTrades.length*100) : null;

  if (daysSinceJournal >= 3 && allTrades.length > 0)
    return {icon:'📓',text:`You haven't journalled in ${daysSinceJournal} days. Reviewing your trades is how improvement actually happens.`,action:'journal',cta:'Log Trade'};
  if (soon)
    return {icon:'⏰',text:`${soon.name} opens in ~${soon.minsTill} min. Ideal time to prep your analysis and mark levels.`,action:'trade',cta:'Prep Charts'};
  if (open.length > 0 && hr >= 8 && hr <= 20)
    return {icon:'📈',text:`${open.map(s=>s.name).join(' + ')} ${open.length>1?'sessions are':'session is'} live. Peak trading window active.`,action:'trade',cta:'Practice Now'};
  if (completedCount() < 5)
    return {icon:'📚',text:`${5-completedCount()} more lessons to unlock the Strategy Library. The foundation matters.`,action:'learn',cta:'Study Now'};
  if (wr !== null && wr < 40)
    return {icon:'🎯',text:`Win rate at ${wr}%. Your journal data will reveal why. Review and adjust.`,action:'analytics',cta:'View Analytics'};
  if (STATE.dailyCheckIn !== now.toDateString())
    return {icon:'☀️',text:`Morning check-in: How are you feeling today? Your mood affects your trading performance.`,action:'home',cta:'Check In'};
  return {icon:'💡',text:'Consistent daily practice builds real edge. One lesson + one sim trade + one journal entry.',action:'learn',cta:'Keep Going'};
}

/* ── NEXT LESSON ─────────────────────────────────────────────── */
function renderNextLesson() {
  if (typeof CURRICULUM === 'undefined') return '';
  for (const cat of CURRICULUM) {
    for (const l of cat.lessons) {
      if (!STATE.progress[l.id]) {
        return `<div class="section-lbl a-fadeup4">Continue Learning</div>
          <div class="card a-fadeup4 card-tappable" onclick="openLesson('${l.id}')" style="padding:14px;margin-bottom:14px;background:linear-gradient(135deg,var(--bg2),var(--accent-bg));border-color:var(--bdr)">
            <div style="display:flex;align-items:center;gap:12px">
              <div style="font-size:30px;flex-shrink:0">${l.emoji}</div>
              <div style="flex:1;min-width:0">
                <div style="font-size:10px;color:var(--accent);font-family:var(--display);font-weight:700;letter-spacing:1px">${cat.title.toUpperCase()}</div>
                <div style="font-weight:700;font-family:'Syne',sans-serif;font-size:15px;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${l.title}</div>
                <div style="font-size:11px;color:var(--txt2);margin-top:3px">⏱ ${l.mins} min · +${l.xp||50} XP</div>
              </div>
              <div style="color:var(--accent);flex-shrink:0;font-size:20px">→</div>
            </div>
          </div>`;
      }
    }
  }
  return `<div class="card a-fadeup4" style="padding:14px;margin-bottom:14px;text-align:center;background:var(--accent-bg);border-color:var(--bdr)">
    <div style="font-size:32px;margin-bottom:8px">🏆</div>
    <div style="font-family:var(--display);font-weight:800">All Lessons Complete!</div>
    <div style="font-size:13px;color:var(--txt2);margin-top:4px">Focus on practice, journalling, and strategy mastery.</div>
  </div>`;
}

/* ── MOOD CHECK-IN ───────────────────────────────────────────── */
function renderMoodCheckin() {
  const today = new Date().toDateString();
  if (STATE.dailyCheckIn === today) return '';
  return `<div class="card a-fadeup4" style="margin-bottom:14px;padding:14px">
    <div style="font-family:var(--display);font-weight:700;font-size:14px;margin-bottom:10px">How are you feeling today?</div>
    <div style="display:flex;flex-direction:row;gap:6px;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;padding-bottom:2px">
      ${[['😊','Great'],['😐','Okay'],['😟','Off'],['🔥','Fired up'],['😴','Tired']].map(([e,l]) => `
        <div onclick="logMood('${l}','${e}')"
          style="flex:1;min-width:52px;flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 6px;border-radius:var(--rs);cursor:pointer;border:1.5px solid var(--bdr2);background:var(--bg3);font-size:20px;user-select:none;-webkit-user-select:none;text-align:center;transition:all .15s;-webkit-tap-highlight-color:transparent"
          ontouchstart="this.style.borderColor='var(--accent)';this.style.background='var(--accent-bg)'">
          ${e}<span style="font-size:9px;font-family:var(--display);font-weight:700;color:var(--txt3);display:block;margin-top:2px">${l}</span>
        </div>`).join('')}
    </div>
  </div>`;
}

function logMood(mood, emoji) {
  STATE.dailyCheckIn = new Date().toDateString();
  STATE.dailyMood    = mood;
  addXP(10);
  saveState();
  const tips = {
    'Great':    'Excellent energy! Channel it into focused, rule-based trading 💪',
    'Okay':     'Steady is good. Consistency beats intensity every time.',
    'Off':      'Rest is part of the process. Light study session today.',
    'Fired up': 'Great energy! Make sure it does not lead to overtrading.',
    'Tired':    'Fatigue causes mistakes. Consider a lighter session today.',
  };
  showToast(`${emoji} ${tips[mood] || 'Thanks for checking in!'} +10 XP`);
  const el = document.querySelector('.card:has([onclick^="logMood"])');
  if (el) el.style.display = 'none';
}

/* ── FOREX CLOCK ─────────────────────────────────────────────── */
function getSessionStatus() {
  const now     = new Date();
  const utcMins = now.getUTCHours() * 60 + now.getUTCMinutes();
  return [
    {name:'Sydney',   flag:'🇦🇺', open:22*60, close:7*60,  pairs:'AUD NZD'},
    {name:'Tokyo',    flag:'🇯🇵', open:0,     close:9*60,  pairs:'JPY AUD'},
    {name:'London',   flag:'🇬🇧', open:8*60,  close:17*60, pairs:'EUR GBP'},
    {name:'New York', flag:'🇺🇸', open:13*60, close:22*60, pairs:'USD CAD'},
  ].map(s => {
    const isOpen = s.open > s.close
      ? utcMins >= s.open || utcMins < s.close
      : utcMins >= s.open && utcMins < s.close;
    const minsToOpen = s.open > utcMins ? s.open - utcMins : s.open + 1440 - utcMins;
    return { ...s, isOpen, soon: !isOpen && minsToOpen <= 60, minsTill: minsToOpen };
  });
}

function initForexClock() {
  renderForexClock();
  if (_clockInterval) clearInterval(_clockInterval);
  _clockInterval = setInterval(renderForexClock, 30000);
}

function renderForexClock() {
  const clockEl = document.getElementById('forex-clock');
  const utcEl   = document.getElementById('utc-time');
  if (!clockEl) return;
  const sessions = getSessionStatus();
  if (utcEl) utcEl.textContent = new Date().toUTCString().split(' ')[4] + ' UTC';
  clockEl.innerHTML = sessions.map(s => `
    <div class="clk-session ${s.isOpen?'open':s.soon?'soon':''}">
      <div class="clk-name">${s.flag} ${s.name}</div>
      <div class="clk-pairs">${s.pairs}</div>
      <div class="clk-status" style="color:${s.isOpen?'var(--accent)':s.soon?'var(--orange)':'var(--txt3)'}">
        ${s.isOpen?'● OPEN':s.soon?`~${s.minsTill}m`:'Closed'}
      </div>
    </div>`).join('');
}

/* ── WEEKLY REVIEW GENERATOR ─────────────────────────────────── */
function generateWeeklyReview() {
  const week = 7 * 24 * 3600000;
  const now = Date.now();
  const allTrades = [...(STATE.journal||[]), ...(STATE.simTrades||[])];
  const weekTrades = allTrades.filter(t => now - new Date(t.date||t.time||0).getTime() < week);
  if (weekTrades.length === 0) return;

  const wins = weekTrades.filter(t => parseFloat(t.pnl) > 0);
  const losses = weekTrades.filter(t => parseFloat(t.pnl) < 0);
  const totalPnl = weekTrades.reduce((a,t) => a + (parseFloat(t.pnl)||0), 0);
  const wr = weekTrades.length > 0 ? Math.round(wins.length / weekTrades.length * 100) : 0;
  const planFollowed = weekTrades.filter(t => t.plan === 'yes').length;
  const planPct = weekTrades.length > 0 ? Math.round(planFollowed / weekTrades.length * 100) : 0;
  const bestTrade = weekTrades.sort((a,b) => (parseFloat(b.pnl)||0) - (parseFloat(a.pnl)||0))[0];
  const worstTrade = [...weekTrades].sort((a,b) => (parseFloat(a.pnl)||0) - (parseFloat(b.pnl)||0))[0];

  const summary = `📊 <strong>Your Week in Review</strong><br><br>
Trades: <strong>${weekTrades.length}</strong> · Win rate: <strong style="color:${wr>=50?'var(--accent)':'var(--red)'};">${wr}%</strong> · P&L: <strong style="color:${totalPnl>=0?'var(--accent)':'var(--red)'}">${totalPnl>=0?'+':''}$${Math.abs(totalPnl).toFixed(2)}</strong><br>
Plan compliance: <strong style="color:${planPct>=70?'var(--accent)':'var(--red)'}">${planPct}%</strong> of trades followed your plan<br><br>
${bestTrade ? `🏆 Best trade: ${bestTrade.pair||''} ${bestTrade.direction||''} <strong style="color:var(--accent)">+$${Math.abs(parseFloat(bestTrade.pnl)||0).toFixed(2)}</strong><br>` : ''}
${worstTrade && parseFloat(worstTrade.pnl) < 0 ? `📉 Worst trade: ${worstTrade.pair||''} ${worstTrade.direction||''} <strong style="color:var(--red)">-$${Math.abs(parseFloat(worstTrade.pnl)||0).toFixed(2)}</strong><br>` : ''}
<br><strong>Focus for next week:</strong> ${planPct < 60 ? 'Plan compliance is your #1 priority — only enter trades that fully meet your rules.' : wr < 40 ? 'Review your entry criteria — your setups may need refinement. Check the journal analytics.' : totalPnl < 0 ? 'Check your R:R — even with a decent win rate, small wins vs large losses can produce negative P&L.' : 'Maintain consistency — what worked this week, do more of it next week.'}`;

  addNotification('📊 Your weekly review is ready — check the AI Mentor', '📊');
  if (typeof STATE !== 'undefined') {
    if (!STATE.chatHistory) STATE.chatHistory = [];
    STATE.chatHistory.push({ role: 'bot', text: summary });
    saveState();
  }
}

/* ── AFRICA BROKER GUIDE SCREEN ──────────────────────────────── */
function renderAfricaBrokers() {
  if (typeof AFRICA_DATA === 'undefined') return '<div class="screen-pad"><p>Loading...</p></div>';
  const cur = STATE.user.localCurrency || 'UGX';
  const cc = AFRICA_DATA.currencies;
  return `<div class="screen-pad">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px" class="a-fadeup">
      <button class="back-btn" onclick="navigate('home')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <h1 class="pg-title">African Forex Guide</h1>
    </div>

    <!-- Currency selector -->
    <div class="a-fadeup2" style="margin-bottom:16px">
      <div class="section-lbl">Your Currency</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${Object.entries(cc).map(([code,c]) => `
          <button onclick="STATE.user.localCurrency='${code}';saveState();renderScreen('africabrokers')"
            style="padding:8px 14px;border-radius:20px;font-size:12px;font-weight:700;font-family:var(--display);cursor:pointer;border:1.5px solid ${cur===code?'var(--accent)':'var(--bdr2)'};background:${cur===code?'var(--accent-bg)':'var(--bg3)'};color:${cur===code?'var(--accent)':'var(--txt2)'}">
            ${c.flag} ${code}
          </button>`).join('')}
      </div>
      ${cc[cur] ? `<div style="font-size:12px;color:var(--txt3);margin-top:8px">$1 USD = ${cc[cur].symbol} ${cc[cur].rateToUSD.toLocaleString()}</div>` : ''}
    </div>

    <!-- Starting capital table -->
    <div class="a-fadeup2" style="margin-bottom:16px">
      <div class="section-lbl">How much to start with</div>
      <div class="card" style="padding:0;overflow:hidden">
        ${(AFRICA_DATA.startingCapital.find(x=>x.currency===cur)||AFRICA_DATA.startingCapital[0]).usd.map((usd,i)=>{
          const row = AFRICA_DATA.startingCapital.find(x=>x.currency===cur)||AFRICA_DATA.startingCapital[0];
          const local = row.amounts[i];
          const riskPer = (usd*0.01).toFixed(2);
          return `<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;${i<3?'border-bottom:1px solid var(--bdr2)':''}">
            <div>
              <div style="font-weight:700;font-size:13px">$${usd} · ${cc[cur]?cc[cur].symbol:''} ${local.toLocaleString()}</div>
              <div style="font-size:11px;color:var(--txt2)">1% risk = $${riskPer} per trade</div>
            </div>
            <span class="pill ${i===0?'pill-red':i===1?'pill-accent':i===2?'pill-green':''}">
              ${i===0?'Micro':i===1?'Starter':i===2?'Comfortable':'Advanced'}
            </span>
          </div>`;
        }).join('')}
      </div>
    </div>

    <!-- Recommended brokers -->
    <div class="a-fadeup3" style="margin-bottom:16px">
      <div class="section-lbl">Recommended Brokers for Africa</div>
      ${AFRICA_DATA.brokers.map(b => `
        <div class="card" style="margin-bottom:8px;padding:14px">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:6px">
            <div>
              <div style="font-family:var(--display);font-weight:700;font-size:14px">${b.name}</div>
              <div style="font-size:11px;color:var(--txt3)">Regulated: ${b.regulated}</div>
            </div>
            <div style="text-align:right;flex-shrink:0">
              <div style="font-size:11px;color:var(--accent)">Min $${b.minDeposit}</div>
              <div style="font-size:10px;color:var(--gold)">${'★'.repeat(b.stars)}</div>
            </div>
          </div>
          <div style="font-size:12px;color:var(--txt2);line-height:1.5">${b.note}</div>
          ${b.mobile ? `<span class="pill pill-green" style="font-size:9px;margin-top:6px;display:inline-block">📱 Mobile money accepted</span>` : ''}
        </div>`).join('')}
    </div>

    <!-- Sessions in EAT -->
    <div class="a-fadeup4" style="margin-bottom:16px">
      <div class="section-lbl">Trading Sessions in East Africa Time (EAT)</div>
      <div class="card" style="padding:0;overflow:hidden">
        ${AFRICA_DATA.sessions_EAT.map((s,i) => `
          <div style="display:flex;justify-content:space-between;padding:10px 14px;${i<AFRICA_DATA.sessions_EAT.length-1?'border-bottom:1px solid var(--bdr2)':''}">
            <div style="font-weight:700;font-size:13px">${s.name}</div>
            <div style="text-align:right">
              <div style="font-size:12px;font-family:var(--mono)">${s.open} – ${s.close} EAT</div>
              <div style="font-size:11px;color:${s.activity.includes('🔥')?'var(--accent)':'var(--txt3)'}">${s.activity}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>

    <!-- Local tips -->
    <div class="a-fadeup5" style="margin-bottom:20px">
      <div class="section-lbl">Local Trading Tips</div>
      ${AFRICA_DATA.localContext.map(t => `
        <div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--bdr3)">
          <span style="font-size:18px;flex-shrink:0">${t.icon}</span>
          <div style="font-size:13px;color:var(--txt2);line-height:1.6">${t.tip}</div>
        </div>`).join('')}
    </div>
  </div>`;
}

/* ── CASE STUDIES SCREEN ─────────────────────────────────────── */
function renderCaseStudies() {
  if (typeof CASE_STUDIES === 'undefined') return '<div class="screen-pad"><p>Loading...</p></div>';
  const wins = CASE_STUDIES.filter(c => c.type === 'win');
  const losses = CASE_STUDIES.filter(c => c.type === 'loss');
  return `<div class="screen-pad">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px" class="a-fadeup">
      <button class="back-btn" onclick="navigate('home')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div>
        <h1 class="pg-title">Trade Case Studies</h1>
        <div style="font-size:12px;color:var(--txt2)">Real trade analyses — what worked and what didn't</div>
      </div>
    </div>
    <div class="section-lbl a-fadeup2" style="margin-top:14px">✅ Winning Trades (${wins.length})</div>
    ${wins.map(c => renderCaseCard(c)).join('')}
    <div class="section-lbl a-fadeup3" style="margin-top:18px">❌ Losing Trades — Learn From These (${losses.length})</div>
    ${losses.map(c => renderCaseCard(c)).join('')}
  </div>`;
}

function renderCaseCard(c) {
  const isWin = c.type === 'win';
  return `<div class="card a-fadeup2" style="margin-bottom:10px;padding:0;overflow:hidden;cursor:pointer" onclick="openCaseStudy('${c.id}')">
    <div style="padding:12px 14px;border-bottom:1px solid var(--bdr2)">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div>
          <div style="font-family:var(--display);font-weight:700;font-size:14px">${c.title}</div>
          <div style="font-size:11px;color:var(--txt3);margin-top:2px">${c.pair} · ${c.tf} · ${c.setup}</div>
        </div>
        <div style="text-align:right;flex-shrink:0">
          <div style="font-family:var(--mono);font-weight:700;font-size:14px;color:${isWin?'var(--accent)':'var(--red)'}">
            ${isWin?'+':''}${c.pips > 0 ? c.pips : c.pips} pips
          </div>
          <span class="pill ${isWin?'pill-green':'pill-red'}" style="font-size:9px">Grade ${c.grade}</span>
        </div>
      </div>
    </div>
    <div style="padding:10px 14px;font-size:12px;color:var(--txt2);line-height:1.5">${c.story.substring(0,120)}…</div>
  </div>`;
}

function openCaseStudy(id) {
  const c = (typeof CASE_STUDIES !== 'undefined') ? CASE_STUDIES.find(x => x.id === id) : null;
  if (!c) return;
  const isWin = c.type === 'win';
  const html = `
    <div style="padding:4px 0">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <div>
          <div style="font-family:var(--display);font-weight:800;font-size:16px">${c.title}</div>
          <div style="font-size:11px;color:var(--txt3)">${c.pair} · ${c.direction} · ${c.tf}</div>
        </div>
        <span class="pill ${isWin?'pill-green':'pill-red'}" style="font-size:10px">Grade ${c.grade}</span>
      </div>
      ${c.svg || ''}
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin:12px 0">
        ${c.entry?`<div style="text-align:center;background:var(--bg3);border-radius:8px;padding:8px"><div style="font-size:10px;color:var(--txt3)">Entry</div><div style="font-size:12px;font-weight:700;font-family:var(--mono)">${c.entry}</div></div>`:''}
        ${c.sl?`<div style="text-align:center;background:var(--bg3);border-radius:8px;padding:8px"><div style="font-size:10px;color:var(--red)">Stop Loss</div><div style="font-size:12px;font-weight:700;font-family:var(--mono);color:var(--red)">${c.sl}</div></div>`:''}
        ${c.tp?`<div style="text-align:center;background:var(--bg3);border-radius:8px;padding:8px"><div style="font-size:10px;color:var(--accent)">Take Profit</div><div style="font-size:12px;font-weight:700;font-family:var(--mono);color:var(--accent)">${c.tp}</div></div>`:''}
      </div>
      ${c.rr !== 'N/A' ? `<div style="font-size:12px;color:var(--txt2);margin-bottom:10px">R:R <strong>${c.rr}</strong> · Result: <strong style="color:${isWin?'var(--accent)':'var(--red)'}">${c.pips > 0 ?'+':''}${c.pips} pips</strong></div>` : ''}
      ${c.warning?`<div style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:8px;padding:10px;font-size:12px;color:var(--red);margin-bottom:10px">⚠️ This is a cautionary example — study what went wrong</div>`:''}
      <div style="font-size:13px;color:var(--txt);line-height:1.7;margin-bottom:12px">${c.story}</div>
      ${c.execution?`<div style="font-size:12px;color:var(--txt2);line-height:1.6;margin-bottom:12px"><strong>Execution:</strong> ${c.execution}</div>`:''}
      <div style="font-size:11px;color:var(--accent);font-family:var(--display);font-weight:700;margin-bottom:6px">Key Lessons</div>
      ${(c.lessons||[]).map(l=>`<div style="display:flex;gap:8px;margin-bottom:5px"><span style="color:var(--accent);flex-shrink:0">•</span><span style="font-size:12px;color:var(--txt2);line-height:1.5">${l}</span></div>`).join('')}
      ${c.mistakes?`<div style="font-size:12px;color:var(--red);margin-top:10px;padding:10px;background:rgba(239,68,68,0.08);border-radius:8px"><strong>Mistakes:</strong> ${c.mistakes}</div>`:''}
      <button class="btn btn-outline btn-sm" style="margin-top:14px;width:auto" onclick="closeModal();addXP(5);showToast('📚 Case study reviewed +5 XP')">Got it +5 XP</button>
    </div>`;
  showModal(html);
  addXP(2);
}
