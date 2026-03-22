/* ═══════════════════════════════════════════════════════════
   TRADEBABY PRO v10 — APP.JS
   Boot sequence, navigation, onboarding, tour, utilities
   SayMy Tech Developers
   ═══════════════════════════════════════════════════════════ */

const SPLASH_MSGS = [
  'Loading market data...', 'Preparing your academy...', 'Setting up AI mentor...',
  'Building trading terminal...', 'Syncing your progress...', 'Almost ready...',
];

/* ══ BOOT ══ */
function bootApp() {
  loadState();

  // Draw particles on splash canvas
  const canvas = document.getElementById('splash-canvas');
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx2d = canvas.getContext('2d');
    const particles = Array.from({length: 40}, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      a: Math.random() * 0.6 + 0.2
    }));
    let animId;
    function drawParticles() {
      ctx2d.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx2d.beginPath();
        ctx2d.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx2d.fillStyle = `rgba(245,158,11,${p.a})`;
        ctx2d.fill();
      });
      animId = requestAnimationFrame(drawParticles);
    }
    drawParticles();
    // Stop animation after launch
    window.addEventListener('tb_ready', () => { if (animId) cancelAnimationFrame(animId); }, {once:true});
  }

  const fill = document.getElementById('splash-fill');
  const msg  = document.getElementById('splash-msg');
  let pct = 0, mi = 0;

  const tick = setInterval(() => {
    pct = Math.min(pct + Math.random() * 18 + 10, 100);
    if (fill) fill.style.width = pct + '%';
    if (msg && mi < SPLASH_MSGS.length) msg.textContent = SPLASH_MSGS[mi++];
    if (pct >= 100) {
      clearInterval(tick);
      setTimeout(launchApp, 400);
    }
  }, 320);
}

function launchApp() {
  const splash = document.getElementById('splash');
  if (splash) {
    splash.style.transition = 'opacity .5s ease';
    splash.style.opacity = '0';
    setTimeout(() => { if (splash) splash.style.display = 'none'; }, 500);
  }

  const app = document.getElementById('app');
  if (app) {
    app.style.display = '';
    app.style.opacity = '0';
    setTimeout(() => { app.style.transition = 'opacity .4s ease'; app.style.opacity = '1'; }, 50);
  }

  buildMoreMenu();

  if (!STATE.user.onboarded) {
    setTimeout(showOnboarding, 600);
  } else {
    navigate('home');
    if (!STATE.user.toured) setTimeout(startTour, 1200);
    if (typeof setupNotificationSchedule === 'function') setupNotificationSchedule();
    if (typeof initFloatChat === 'function') initFloatChat();
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js', { scope: './' })
      .then(reg => {
        if ('caches' in window) {
          caches.open('tradebaby-v10').then(c => c.add(window.location.href).catch(() => {}));
        }
        reg.addEventListener('updatefound', () => {
          const nw = reg.installing;
          if (nw) nw.addEventListener('statechange', () => {
            if (nw.state === 'installed' && navigator.serviceWorker.controller) {
              showToast('🔄 App updated — restart for latest');
            }
          });
        });
      })
      .catch(e => console.log('SW:', e.message));
  }

  window.dispatchEvent(new Event('tb_ready'));
}

/* ══ MORE MENU ══ */
function buildMoreMenu() {
  const grid = document.getElementById('more-grid');
  if (!grid) return;
  const items = [
    {icon:'🤖', label:'Mentor AI',  action:'mentor', badge:true},
    {icon:'👤', label:'Profile',    action:'profile'},
    {icon:'📊', label:'Analytics',  action:'analytics'},
    {icon:'🧬', label:'DNA',        action:'dna'},
    {icon:'🏆', label:'Challenges', action:'challenges'},
    {icon:'⚔️', label:'Strategies', action:'strategies'},
    {icon:'🧮', label:'Calculator', action:'calculator'},
    {icon:'🗺️', label:'My Path',    action:'mypath'},
    {icon:'🌍', label:'Pairs',      action:'pairprofiles'},
    {icon:'📖', label:'Knowledge',  action:'vault'},
    {icon:'🧠', label:'Bias Test',  action:'biastest'},
    {icon:'🚦', label:'TradeCheck', action:'shoulditrade'},
    {icon:'🔬', label:'Forensics',  action:'forensics'},
    {icon:'🔔', label:'Alerts',     action:'notifications'},
    {icon:'⚙️', label:'Settings',   action:'settings'},
    {icon:'📋', label:'Curriculum', action:'curriculum'},
    {icon:'🔍', label:'Search',     action:'search'},
    {icon:'📚', label:'Case Studies',action:'casestudies'},
    {icon:'🌍', label:'Africa Guide',action:'africabrokers'},
  ];
  grid.innerHTML = items.map(item => `
    <div onclick="closeMoreMenu();navigate('${item.action}')"
      style="display:flex;flex-direction:column;align-items:center;gap:5px;padding:12px 4px;background:var(--bg3);border-radius:var(--r);cursor:pointer;border:1px solid var(--bdr2);transition:all .15s;position:relative"
      ontouchstart="this.style.background='var(--bg4)'" ontouchend="this.style.background='var(--bg3)'">
      <span style="font-size:22px">${item.icon}</span>
      <span style="font-size:10px;font-weight:700;font-family:var(--display);color:var(--txt2);text-align:center;line-height:1.2">${item.label}</span>
      ${item.badge ? '<span id="more-mentor-dot" style="display:none;position:absolute;top:4px;right:4px;width:7px;height:7px;background:var(--red);border-radius:50%;border:1.5px solid var(--bg3)"></span>' : ''}
    </div>`).join('');
}

function showMoreMenu() {
  const b = document.getElementById('more-menu-backdrop');
  if (b) b.style.display = 'block';
  if (typeof BEHAVIOR !== 'undefined') BEHAVIOR.log('more_menu_open');
  const unread = (STATE.notifications || []).filter(n => !n.read).length;
  const dot = document.getElementById('more-mentor-dot');
  if (dot) dot.style.display = unread > 0 ? 'block' : 'none';
}

function closeMoreMenu() {
  const b = document.getElementById('more-menu-backdrop');
  if (b) b.style.display = 'none';
}

/* ══ NAVIGATION ══ */
function navigate(screen, opts = {}) {
  closeMoreMenu();

  // ── PROACTIVE GATE: check before entering trade screen ──
  if (screen === 'trade' && typeof getProactiveAlert === 'function') {
    const alert = getProactiveAlert();
    if (alert && (alert.severity === 'critical' || alert.severity === 'high') && typeof showProactiveModal === 'function') {
      showProactiveModal(alert, () => _doNavigate(screen, opts));
      return;
    }
  }

  _doNavigate(screen, opts);
}

function _doNavigate(screen, opts = {}) {
  closeMoreMenu();

  if (typeof _termPriceInterval !== 'undefined' && _termPriceInterval && screen !== 'trade') {
    clearInterval(_termPriceInterval); _termPriceInterval = null;
  }
  if (typeof _clockInterval !== 'undefined' && _clockInterval && screen !== 'home') {
    clearInterval(_clockInterval); _clockInterval = null;
  }

  STATE.screen = screen;
  if (typeof BEHAVIOR !== 'undefined') BEHAVIOR.log('screen_visit', { screen });

  // Nav highlight
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  const nav5 = { home: 'ni-home', learn: 'ni-learn', trade: 'ni-trade', journal: 'ni-journal' };
  const navId = nav5[screen];
  if (navId) {
    const nb = document.getElementById(navId);
    if (nb) nb.classList.add('active');
  } else {
    const more = document.getElementById('ni-more');
    if (more) more.classList.add('active');
  }

  renderScreen(screen);

  const sw = document.getElementById('screen-wrap');
  if (sw) {
    sw.scrollTop = 0;
    sw.style.paddingBottom = screen === 'mentor' ? '0' : '';
  }
}

/* ══ SCREEN ROUTER ══ */
function renderScreen(screen) {
  const el = document.getElementById('screen');
  if (!el) return;
  closeMoreMenu();

  const screens = {
    home:        () => typeof renderHome === 'function' ? renderHome() : '<div class="screen-pad">Loading...</div>',
    learn:       () => typeof renderLearn === 'function' ? renderLearn() : '',
    lesson:      () => typeof renderLesson === 'function' ? renderLesson() : '',
    trade:       () => typeof renderTrade === 'function' ? renderTrade() : '',
    journal:     () => typeof renderJournal === 'function' ? renderJournal() : '',
    mentor:      () => typeof renderMentor === 'function' ? renderMentor() : '',
    profile:     () => typeof renderProfile === 'function' ? renderProfile() : '',
    analytics:   () => typeof renderAnalytics === 'function' ? renderAnalytics() : '',
    settings:    () => typeof renderSettings === 'function' ? renderSettings() : '',
    strategies:  () => typeof renderStrategies === 'function' ? renderStrategies() : '',
    calculator:  () => typeof renderCalculator === 'function' ? renderCalculator() : '',
    flashcards:  () => typeof renderFlashcards === 'function' ? renderFlashcards() : '',
    patterns:    () => typeof renderPatternGame === 'function' ? renderPatternGame() : '',
    candlebible: () => typeof renderCandleBible === 'function' ? renderCandleBible() : '',
    skillmap:    () => typeof renderSkillMap === 'function' ? renderSkillMap() : '',
    curriculum:  () => typeof renderCurriculum === 'function' ? renderCurriculum() : '',
    notifications:()=> typeof renderNotifications === 'function' ? renderNotifications() : '',
    dna:         () => typeof renderTraderDNA === 'function' ? renderTraderDNA() : '',
    forensics:   () => typeof renderForensics === 'function' ? renderForensics() : '',
    mypath:      () => typeof renderMyPath === 'function' ? renderMyPath() : '',
    challenges:  () => typeof renderChallenges === 'function' ? renderChallenges() : '',
    shoulditrade:() => typeof renderShouldITrade === 'function' ? renderShouldITrade() : '',
    pairprofiles:() => typeof renderPairProfiles === 'function' ? renderPairProfiles() : '',
    vault:       () => typeof renderKnowledgeVault === 'function' ? renderKnowledgeVault() : '',
    biastest:    () => typeof renderBiasTest === 'function' ? renderBiasTest() : '',
  };

  const fn = screens[screen];
  el.innerHTML = fn ? fn() : (typeof renderHome === 'function' ? renderHome() : '');

  // Post-render hooks
  if (screen === 'trade')     setTimeout(() => { if (typeof initTerminal === 'function') initTerminal(); }, 80);
  if (screen === 'analytics') setTimeout(() => { if (typeof initEquityChart === 'function') initEquityChart(); }, 80);
  if (screen === 'home')      { if (typeof initForexClock === 'function') initForexClock(); }
  if (screen === 'patterns')  setTimeout(() => { if (typeof drawPatternCanvas === 'function') drawPatternCanvas(); }, 80);
  if (screen === 'mentor') {
    const sw = document.getElementById('screen-wrap');
    if (sw) sw.style.paddingBottom = '0';
    setTimeout(() => {
      const msgs = document.getElementById('chat-messages');
      if (msgs) msgs.scrollTop = msgs.scrollHeight;
    }, 80);
  }
}

/* ══ TOAST ══ */
function showToast(msg, duration = 2800) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = 'position:fixed;bottom:calc(var(--total-nav,60px) + 14px);left:50%;transform:translateX(-50%);width:calc(100% - 32px);max-width:420px;z-index:700;pointer-events:none;display:flex;flex-direction:column;gap:6px;align-items:center';
    document.body.appendChild(container);
  }
  const el = document.createElement('div');
  el.className = 'toast-msg';
  el.innerHTML = msg;
  el.style.cssText = `background:var(--bg2);border:1px solid var(--bdr2);border-left:2px solid var(--amber);border-radius:var(--rs,8px);padding:10px 16px;font-size:13px;font-family:var(--display);font-weight:600;box-shadow:0 8px 24px rgba(0,0,0,0.4);animation:fadeUp .25s ease;max-width:100%;text-align:center`;
  container.appendChild(el);
  setTimeout(() => {
    el.style.transition = 'opacity .3s, transform .3s';
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    setTimeout(() => el.remove(), 300);
  }, duration);

  // Sound
  if (typeof SOUNDS !== 'undefined') {
    if (msg.includes('Achievement') || msg.includes('🏅')) SOUNDS.play('achievement');
    else if (msg.includes('Level')) SOUNDS.play('levelUp');
    else if (msg.includes('+') && msg.includes('XP')) SOUNDS.play('xp');
  }
}

/* ══ MODAL ══ */
function showModal(html) {
  const bd = document.getElementById('modal-backdrop');
  const mc = document.getElementById('modal-content');
  if (!bd || !mc) return;
  mc.innerHTML = html;
  bd.style.display = 'block';
  mc.style.animation = 'slideUp .3s cubic-bezier(.34,1.56,.64,1)';
}

function closeModal() {
  const bd = document.getElementById('modal-backdrop');
  if (bd) bd.style.display = 'none';
}

/* ══ CONFETTI ══ */
function launchConfetti() {
  const colors = ['#F59E0B','#FCD34D','#10B981','#3B82F6','#8B5CF6','#EF4444','#F97316'];
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      el.style.cssText = `left:${Math.random()*100}vw;top:-20px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>0.5?'50%':'2px'};transform:rotate(${Math.random()*360}deg);animation-duration:${2+Math.random()*2}s;animation-delay:${Math.random()*0.5}s;width:${6+Math.random()*6}px;height:${6+Math.random()*10}px`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4000);
    }, i * 40);
  }
}

/* ══ ONBOARDING ══ */
let _obStep = 0;
const OB_STEPS = [
  { field: 'name',         type: 'text',   title: "What's your name?",         sub: "We'll personalise everything for you.",              icon: '👋' },
  { field: 'experience',   type: 'choice', title: "Your trading experience?",  sub: "Be honest — it helps us teach you right.",           icon: '📊', opts: ['complete-beginner','some-knowledge','intermediate','experienced'] },
  { field: 'goal',         type: 'choice', title: "Your #1 goal?",             sub: "This sets your learning path.",                      icon: '🎯', opts: ['consistent-income','part-time-trading','full-time-trading','learning-investing'] },
  { field: 'schedule',     type: 'choice', title: "When will you trade?",      sub: "We'll optimise alerts and lessons for your time.",    icon: '🕐', opts: ['mornings','evenings','weekends','flexible'] },
  { field: 'riskStyle',    type: 'choice', title: "Your risk personality?",    sub: "Honest self-awareness is a trading superpower.",     icon: '⚖️', opts: ['very-conservative','balanced','moderately-aggressive','high-risk-reward'] },
  { field: 'learningStyle',type: 'choice', title: "How do you learn best?",    sub: "We'll match your academy path to how you absorb best.", icon: '📚', opts: ['structured-lessons','practical-trading','visual-charts','mentored'] },
];

function showOnboarding() {
  const onb = document.getElementById('onboarding');
  if (onb) onb.style.display = '';
  _obStep = 0;
  renderObStep();
}

function renderObStep() {
  const step = OB_STEPS[_obStep];
  const progress = ((_obStep) / OB_STEPS.length) * 100;
  const fill = document.getElementById('ob-progress');
  if (fill) fill.style.width = progress + '%';

  const optLabels = {
    'complete-beginner':'Complete Beginner','some-knowledge':'Some Knowledge',
    'intermediate':'Intermediate','experienced':'Experienced',
    'consistent-income':'Consistent Income','part-time-trading':'Part-Time Trading',
    'full-time-trading':'Full-Time Trading','learning-investing':'Learning & Investing',
    'mornings':'Morning Sessions','evenings':'Evening Sessions',
    'weekends':'Weekends Only','flexible':'Flexible',
    'very-conservative':'Very Conservative','balanced':'Balanced',
    'moderately-aggressive':'Growth-Focused','high-risk-reward':'High R:R Hunter',
    'structured-lessons':'Structured Lessons','practical-trading':'Hands-On Practice',
    'visual-charts':'Visual Charts','mentored':'AI Mentored',
  };

  const body = document.getElementById('ob-body');
  if (!body) return;

  body.innerHTML = `
    <div style="padding:30px 0;min-height:70vh;display:flex;flex-direction:column;justify-content:center">
      <div style="font-size:56px;text-align:center;margin-bottom:20px;animation:fadeUp .3s ease">${step.icon}</div>
      <h2 style="font-family:var(--display);font-weight:900;font-size:26px;text-align:center;margin-bottom:8px;letter-spacing:-.4px;animation:fadeUp .3s .05s ease both">${step.title}</h2>
      <p style="font-size:14px;color:var(--txt2);text-align:center;margin-bottom:32px;animation:fadeUp .3s .1s ease both">${step.sub}</p>
      <div id="ob-input-area" style="animation:fadeUp .3s .15s ease both">
        ${step.type === 'text' ? `
          <input class="inp" id="ob-text" type="text" placeholder="Enter your name..." value="${STATE.user.name||''}"
            style="font-size:18px;padding:14px 18px;text-align:center;font-weight:600"
            onkeydown="if(event.key==='Enter')obNext()" autofocus>
        ` : `
          <div style="display:flex;flex-direction:column;gap:8px">
            ${(step.opts || []).map(opt => `
              <button onclick="selectOb('${step.field}','${opt}')" id="ob-opt-${opt}"
                class="btn btn-outline"
                style="text-align:left;padding:14px 18px;font-size:14px;font-weight:600;${STATE.user[step.field]===opt?'border-color:var(--amber);background:var(--amber-bg);color:var(--amber)':''}">
                ${optLabels[opt] || opt}
              </button>`).join('')}
          </div>
        `}
      </div>
      <div style="display:flex;gap:10px;margin-top:28px;animation:fadeUp .3s .2s ease both">
        ${_obStep > 0 ? `<button class="btn btn-outline" onclick="obBack()" style="width:auto;padding:13px 20px">← Back</button>` : ''}
        <button class="btn btn-amber" onclick="obNext()">
          ${_obStep < OB_STEPS.length - 1 ? 'Continue →' : 'Start Learning 🚀'}
        </button>
      </div>
      <div style="text-align:center;font-size:11px;color:var(--txt3);margin-top:16px">${_obStep + 1} of ${OB_STEPS.length}</div>
    </div>`;
}

function selectOb(field, value) {
  STATE.user[field] = value;
  document.querySelectorAll('[id^="ob-opt-"]').forEach(b => {
    b.style.borderColor = '';
    b.style.background = '';
    b.style.color = '';
  });
  const sel = document.getElementById(`ob-opt-${value}`);
  if (sel) { sel.style.borderColor = 'var(--amber)'; sel.style.background = 'var(--amber-bg)'; sel.style.color = 'var(--amber)'; }
  setTimeout(obNext, 280);
}

function obBack() {
  if (_obStep > 0) { _obStep--; renderObStep(); }
}

function obNext() {
  const step = OB_STEPS[_obStep];
  if (step.type === 'text') {
    const inp = document.getElementById('ob-text');
    const val = inp ? inp.value.trim() : '';
    if (!val) { inp && (inp.style.borderColor = 'var(--red)'); return; }
    STATE.user[step.field] = val;
  }
  if (_obStep < OB_STEPS.length - 1) {
    _obStep++;
    renderObStep();
  } else {
    finishOnboarding();
  }
}

function finishOnboarding() {
  STATE.user.onboarded = true;
  STATE.user.joinDate = new Date().toISOString();
  if (!STATE.user.level) STATE.user.level = 1;
  if (!STATE.user.xp) STATE.user.xp = 0;
  if (!STATE.user.xpNext) STATE.user.xpNext = 500;
  saveState();

  // Assign learning path
  if (typeof getAssignedPath === 'function') STATE.assignedPath = getAssignedPath();

  const onb = document.getElementById('onboarding');
  if (onb) { onb.style.transition = 'opacity .4s ease'; onb.style.opacity = '0'; setTimeout(() => { onb.style.display = 'none'; }, 400); }

  navigate('home');
  setTimeout(() => {
    if (typeof showCelebration === 'function') {
      showCelebration('onboarding_done', { name: STATE.user.name });
    } else {
      showToast(`Welcome, ${STATE.user.name}! 🎉 Your trading journey starts now.`);
      if (typeof launchConfetti === 'function') launchConfetti();
    }
  }, 700);
  if (typeof setupNotificationSchedule === 'function') setupNotificationSchedule();
  if (typeof initFloatChat === 'function') initFloatChat();
}

/* ══ TOUR ══ */
let _tourStep = 0;
const TOUR_STEPS = [
  { target: 'ni-home',  title: 'Home Dashboard', text: 'Your command centre. Live prices, AI briefings, quick access to everything.' },
  { target: 'ni-learn', title: 'Trading Academy', text: '30+ lessons from zero to advanced. Complete lessons, earn XP and badges.' },
  { target: 'ni-trade', title: 'Practice Terminal', text: 'Full MT5-like chart with 8 indicators, 6 timeframes, and live sim trading.' },
  { target: 'ni-journal', title: 'Trade Journal', text: 'Log every trade. The #1 habit of profitable traders. See your patterns.' },
  { target: 'ni-more', title: 'More Features', text: 'DNA profiling, AI mentor, analytics, knowledge vault, challenges, and more.' },
];

function startTour() {
  _tourStep = 0;
  renderTourStep();
}

function renderTourStep() {
  closeModal();
  const step = TOUR_STEPS[_tourStep];
  if (!step) { endTour(); return; }
  const targetEl = document.getElementById(step.target);
  const rect = targetEl ? targetEl.getBoundingClientRect() : null;

  const overlay = document.createElement('div');
  overlay.id = 'tour-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:850;pointer-events:none';

  const popup = document.createElement('div');
  popup.style.cssText = `position:fixed;left:16px;right:16px;z-index:851;background:var(--bg2);border:1px solid var(--bdr);border-radius:var(--r);padding:18px;box-shadow:0 20px 60px rgba(0,0,0,0.8);animation:fadeUp .3s ease;max-width:400px;margin:0 auto`;

  if (rect && rect.top > window.innerHeight / 2) {
    popup.style.top = '20px';
  } else {
    popup.style.bottom = 'calc(var(--total-nav,60px) + 16px)';
  }

  popup.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
      <div style="font-family:var(--display);font-weight:800;font-size:16px;color:var(--amber)">${step.title}</div>
      <div style="font-size:11px;color:var(--txt3);font-family:var(--mono)">${_tourStep+1}/${TOUR_STEPS.length}</div>
    </div>
    <p style="font-size:13px;color:var(--txt2);line-height:1.6;margin-bottom:14px">${step.text}</p>
    <div style="display:flex;gap:8px">
      <button onclick="endTour()" class="btn btn-outline btn-sm">Skip Tour</button>
      <button onclick="nextTourStep()" class="btn btn-amber btn-sm">${_tourStep < TOUR_STEPS.length - 1 ? 'Next →' : 'Done! 🎉'}</button>
    </div>`;

  document.getElementById('tour-overlay')?.remove();
  document.getElementById('tour-popup')?.remove();
  popup.id = 'tour-popup';
  overlay.id = 'tour-overlay';
  document.body.appendChild(overlay);
  document.body.appendChild(popup);
  overlay.addEventListener('click', nextTourStep);
}

function nextTourStep() { _tourStep++; renderTourStep(); }

function endTour() {
  document.getElementById('tour-overlay')?.remove();
  document.getElementById('tour-popup')?.remove();
  STATE.user.toured = true;
  saveState();
}

/* ══ TOUCH QUICK ACCESS ══ */
let _qaTX = 0, _qaTY = 0;
function qaTouch(el) {
  _qaTX = event.touches[0].clientX; _qaTY = event.touches[0].clientY;
  el.style.transform = 'scale(0.93)'; el.style.borderColor = 'var(--amber)';
}
function qaTap(el, action) {
  el.style.transform = ''; el.style.borderColor = '';
  const dx = Math.abs(event.changedTouches[0].clientX - _qaTX);
  const dy = Math.abs(event.changedTouches[0].clientY - _qaTY);
  if (dx < 12 && dy < 12) navigate(action);
}

/* Swipe handled in state.js */

/* ══ PREVENT DOUBLE TAP ZOOM ══ */
let _lt = 0;
document.addEventListener('touchend', e => {
  const n = Date.now();
  if (n - _lt < 280) e.preventDefault();
  _lt = n;
}, { passive: false });

/* ══ RIPPLE EFFECT ══ */
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn-amber,.btn-gold,.btn-outline,.btn-ghost,.btn-success');
  if (!btn) return;
  const r = document.createElement('span');
  r.className = 'btn-ripple';
  const rect = btn.getBoundingClientRect();
  r.style.left = (e.clientX - rect.left - 5) + 'px';
  r.style.top = (e.clientY - rect.top - 5) + 'px';
  btn.style.position = 'relative'; btn.style.overflow = 'hidden';
  btn.appendChild(r);
  setTimeout(() => r.remove(), 600);
});

/* ══ INSTALL PROMPT ══ */
let _deferredInstall = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault(); _deferredInstall = e;
  setTimeout(showInstallBanner, 8000);
});
window.addEventListener('appinstalled', () => {
  const b = document.getElementById('install-banner');
  if (b) b.style.display = 'none';
  showToast('📱 TradeBaby Pro installed! Fully offline ready.');
});

function showInstallBanner() {
  if (!_deferredInstall) return;
  const b = document.getElementById('install-banner');
  if (b) b.style.display = 'flex';
}

function triggerInstall() {
  if (!_deferredInstall) return;
  _deferredInstall.prompt();
  _deferredInstall.userChoice.then(r => {
    if (r.outcome === 'accepted') showToast('Installing TradeBaby Pro...');
    _deferredInstall = null;
    document.getElementById('install-banner').style.display = 'none';
  });
}

/* ══ URL SHORTCUTS ══ */
(function handleURLParams() {
  const p = new URLSearchParams(window.location.search);
  const s = p.get('screen');
  if (s) window.addEventListener('tb_ready', () => setTimeout(() => navigate(s), 400));
})();

/* ══ AUTO SAVE ══ */
setInterval(saveState, 30000);

/* ══ BOOT ══ */
document.addEventListener('DOMContentLoaded', bootApp);

console.log('🚀 TradeBaby Pro v10 — SayMy Tech');
