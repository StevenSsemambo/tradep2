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

      <!-- ── QUICK ACCESS ── -->
      <div class="section-lbl a-fadeup4">Quick Access</div>
      <div class="h-scroll a-fadeup4" style="margin-bottom:16px">
        ${[
          {icon:'📚',label:'Lessons',   sub:completedCount()+'/'+totalLessons(), action:'learn'},
          {icon:'📈',label:'Practice',  sub:'Sim trade',                         action:'trade'},
          {icon:'🤖',label:'AI Mentor', sub:'Ask anything',                      action:'mentor'},
          {icon:'⚔️',label:'Strategies',sub:STRATEGIES.length+' setups',         action:'strategies'},
          {icon:'🧮',label:'Calculator',sub:'6 tools',                           action:'calculator'},
          {icon:'🃏',label:'Flashcards',sub:FLASHCARDS.length+' cards',          action:'flashcards'},
          {icon:'🎮',label:'Patterns',  sub:'Earn XP',                           action:'patterns'},
          {icon:'🕯️',label:'Candles',   sub:'Bible',                             action:'candlebible'},
          {icon:'🗺️',label:'Skill Map', sub:'Roadmap',                           action:'skillmap'},
          {icon:'📖',label:'Knowledge', sub:'Vault',                             action:'vault'},
          {icon:'🌍',label:'Pairs',     sub:'Deep profiles',                     action:'pairprofiles'},
          {icon:'🧬',label:'DNA',       sub:'Your profile',                      action:'dna'},
          {icon:'🏆',label:'Challenges',sub:'18 goals',                          action:'challenges'},
          {icon:'⚡',label:'Speed Round',sub:'60s blitz',                        action:'speedround'},
          {icon:'✅',label:'Checklist', sub:'Pre-trade',                          action:'checklist'},
          {icon:'📉',label:'Risk Ruin', sub:'Calculator',                         action:'riskofRuin'},
          {icon:'🌐',label:'Correlation',sub:'Pair matrix',                       action:'correlation'},
        ].map(a => `
          <div class="qa-card"
               ontouchstart="_qaTx=event.touches[0].clientX;_qaTy=event.touches[0].clientY;_qaMoved=false;this.style.transform='scale(.94)';this.style.borderColor='var(--accent)'"
               ontouchmove="_qaMoved=true;this.style.transform='';this.style.borderColor=''"
               ontouchend="this.style.transform='';this.style.borderColor='';if(!_qaMoved&&Math.abs(event.changedTouches[0].clientX-_qaTx)<12&&Math.abs(event.changedTouches[0].clientY-_qaTy)<12){event.preventDefault();navigate('${a.action}')}"
               onclick="if(!('ontouchstart' in window))navigate('${a.action}')">
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
