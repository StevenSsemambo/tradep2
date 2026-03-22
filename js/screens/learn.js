/* ═══════════════════════════════════════════
   LEARN, PROFILE, TOOLS SCREENS
   ═══════════════════════════════════════════ */

let _stratFilter = 'All';

// ── LEARN ──
function renderLearn() {
  const pct = progressPct();
  return `<div class="screen-pad">
    <div class="pg-header a-fadeup" style="padding:0 0 12px">
      <div>
        <h1 class="pg-title">Academy</h1>
        <div style="font-size:12px;color:var(--txt2)">${completedCount()}/${totalLessons()} lessons · ${pct}% complete</div>
      </div>
      <div style="display:flex;gap:6px">
        <button class="btn btn-ghost btn-sm" onclick="navigate('skillmap')">🗺️</button>
        <button class="btn btn-ghost btn-sm" onclick="navigate('flashcards')">🃏</button>
      </div>
    </div>

    <div class="card a-fadeup2" style="padding:14px;margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px">
        <span style="font-size:12px;color:var(--txt2)">Overall Progress</span>
        <span style="font-size:12px;color:var(--gold);font-family:var(--mono)">${pct}%</span>
      </div>
      <div class="prog-bar lg"><div class="prog-fill" style="width:${pct}%"></div></div>
    </div>

    <!-- Learning Tools -->
    <div class="h-scroll a-fadeup2" style="margin-bottom:16px">
      ${[
        {icon:'🕯️', label:'Candle Bible', sub:CANDLE_PATTERNS.length+' patterns', action:'candlebible'},
        {icon:'🎮', label:'Pattern Game', sub:'Earn XP', action:'patterns'},
        {icon:'🃏', label:'Flashcards', sub:FLASHCARDS.length+' cards', action:'flashcards'},
        {icon:'⚔️', label:'Strategies', sub:STRATEGIES.length+' setups', action:'strategies'},
        {icon:'🗺️', label:'Skill Map', sub:'Visual roadmap', action:'skillmap'},
        {icon:'📖', label:'Curriculum', sub:'Full syllabus', action:'curriculum'},
      ].map(a => `
        <div class="card card-tappable" onclick="navigate('${a.action}')" style="flex-shrink:0;width:110px;padding:12px;cursor:pointer">
          <div style="font-size:24px;margin-bottom:6px">${a.icon}</div>
          <div style="font-size:12px;font-weight:700;font-family:var(--display)">${a.label}</div>
          <div style="font-size:10px;color:var(--txt3);margin-top:2px">${a.sub}</div>
        </div>
      `).join('')}
    </div>

    <!-- Curriculum -->
    ${CURRICULUM.map((cat, ci) => {
      const catDone = cat.lessons.filter(l => STATE.progress[l.id]).length;
      const catPct = Math.round((catDone / cat.lessons.length) * 100);
      return `<div class="a-fadeup" style="animation-delay:${ci * .05}s;margin-bottom:20px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:20px">${cat.emoji}</span>
            <div>
              <div style="font-family:var(--display);font-weight:700;font-size:14px">${cat.title}</div>
              <div style="font-size:11px;color:var(--txt2)">${catDone}/${cat.lessons.length} done</div>
            </div>
          </div>
          <span class="pill ${catPct === 100 ? 'pill-green' : 'pill-gold'}">${catPct}%</span>
        </div>
        <div class="prog-bar sm" style="margin-bottom:10px">
          <div class="prog-fill" style="width:${catPct}%"></div>
        </div>
        ${cat.lessons.map((l, li) => {
          const done = STATE.progress[l.id];
          const prevDone = li === 0 || STATE.progress[cat.lessons[li-1].id];
          const isCurrent = !done && prevDone;
          return `<div class="lesson-card ${done ? 'done' : isCurrent ? 'current' : ''}" onclick="openLesson('${l.id}')">
            <div class="lesson-icon">${l.emoji}</div>
            <div class="lesson-meta">
              <div class="lesson-title">${l.title}</div>
              <div class="lesson-sub">⏱ ${l.mins} min · +${l.xp || 50} XP${done ? ' · ✓ Done' : isCurrent ? ' · Start here' : ''}</div>
            </div>
            <div class="lesson-check ${done ? 'done' : ''}">
              ${done ? '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
            </div>
          </div>`;
        }).join('')}
      </div>`;
    }).join('')}
  </div>`;
}

// ── LESSON DETAIL ──
let _currentLesson = null;

function openLesson(id) {
  const found = getLessonById(id);
  if (!found) return;
  _currentLesson = found;
  STATE.screen = 'lesson';
  renderScreen('lesson');
  document.getElementById('screen-wrap').scrollTop = 0;
  addXP(2);
}

function renderLesson() {
  if (!_currentLesson) { navigate('learn'); return ''; }
  const {lesson: l, category: cat} = _currentLesson;
  const done = STATE.progress[l.id];
  const allInCat = cat.lessons;
  const idx = allInCat.findIndex(x => x.id === l.id);
  const quiz = (typeof QUIZZES !== 'undefined') ? QUIZZES[l.id] : null;

  return `<div class="screen-pad">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px" class="a-fadeup">
      <button class="back-btn" onclick="navigate('learn')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div style="flex:1">
        <div style="font-size:10px;color:var(--gold);font-family:var(--display);font-weight:700;letter-spacing:1px">${cat.title.toUpperCase()}</div>
        <div style="font-size:11px;color:var(--txt3)">Lesson ${idx + 1} of ${allInCat.length}</div>
      </div>
      <button onclick="ttsReadLesson(this)" id="lesson-tts-btn"
        style="background:var(--bg3);border:1px solid var(--bdr2);border-radius:20px;padding:5px 11px;display:flex;align-items:center;gap:5px;cursor:pointer;color:var(--txt2);font-size:11px;font-family:var(--display);font-weight:600;flex-shrink:0"
        title="Read lesson aloud">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        Read
      </button>
      ${done ? '<span class="pill pill-green">✓ Done</span>' : ''}
    </div>

    <div class="a-fadeup2" style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
      <div style="font-size:38px;flex-shrink:0">${l.emoji}</div>
      <div>
        <h1 style="font-size:20px;line-height:1.2">${l.title}</h1>
        <div style="font-size:12px;color:var(--txt2);margin-top:4px">⏱ ${l.mins} min · +${l.xp || 50} XP on completion</div>
      </div>
    </div>

    <div class="a-fadeup3 lesson-body">${l.content}</div>

    ${quiz ? renderLessonQuiz(l.id, quiz) : ''}

    <div class="a-fadeup4" style="margin-top:24px;display:flex;gap:10px">
      ${!done
        ? `<button class="btn btn-gold" onclick="completelesson('${l.id}')">✓ Mark Complete · +${l.xp || 50} XP</button>`
        : `<button class="btn btn-ghost btn-sm" onclick="navigate('learn')" style="width:auto">← Back</button>`
      }
      ${idx < allInCat.length - 1
        ? `<button class="btn btn-outline btn-sm" onclick="openLesson('${allInCat[idx + 1].id}')" style="width:auto">Next →</button>`
        : ''
      }
    </div>

    ${idx < allInCat.length - 1 ? `
    <div style="margin-top:20px">
      <div class="section-lbl">Up Next</div>
      <div class="lesson-card" onclick="openLesson('${allInCat[idx + 1].id}')">
        <div class="lesson-icon">${allInCat[idx + 1].emoji}</div>
        <div class="lesson-meta">
          <div class="lesson-title">${allInCat[idx + 1].title}</div>
          <div class="lesson-sub">⏱ ${allInCat[idx + 1].mins} min · +${allInCat[idx + 1].xp || 50} XP</div>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
    </div>` : ''}
  </div>`;
}

function renderLessonQuiz(lessonId, questions) {
  const results = STATE.quizResults[lessonId] || {};
  const allDone = questions.every((_, i) => results[i] !== undefined);
  if (allDone) {
    const score = questions.filter((_, i) => results[i] === true).length;
    return `<div class="card card-green" style="padding:14px;margin-top:16px">
      <div style="font-family:var(--display);font-weight:700;margin-bottom:4px">✓ Quiz Complete!</div>
      <div style="font-size:13px;color:var(--txt2)">Score: ${score}/${questions.length} · ${Math.round(score/questions.length*100)}%</div>
      <button class="btn btn-ghost btn-xs" style="margin-top:8px" onclick="delete STATE.quizResults['${lessonId}'];saveState();renderScreen('lesson')">Retry</button>
    </div>`;
  }
  return `<div style="margin-top:16px">
    <div class="section-lbl">Quick Quiz</div>
    ${questions.map((q, i) => {
      if (results[i] !== undefined) {
        return `<div class="card" style="padding:12px;margin-bottom:8px;background:${results[i] ? 'var(--green-bg)' : 'var(--red-bg)'}">
          <div style="font-size:13px;font-weight:600;margin-bottom:6px">${q.q}</div>
          ${q.opts.map((o, oi) => `<div style="padding:3px 0;font-size:12px;color:${oi===q.correct?'var(--green)':oi===results[i+'-p']&&!results[i]?'var(--red)':'var(--txt3)'}">
            ${oi===q.correct?'✓':oi===results[i+'-p']&&!results[i]?'✗':''} ${o}
          </div>`).join('')}
        </div>`;
      }
      return `<div class="card" style="padding:12px;margin-bottom:10px">
        <div style="font-size:13px;font-weight:600;margin-bottom:8px">${q.q}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
          ${q.opts.map((o, oi) => `<div class="pattern-opt" onclick="answerQuiz('${lessonId}',${i},${oi},${q.correct})">${o}</div>`).join('')}
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

function answerQuiz(lessonId, qi, picked, correct) {
  if (!STATE.quizResults[lessonId]) STATE.quizResults[lessonId] = {};
  const right = picked === correct;
  STATE.quizResults[lessonId][qi] = right;
  STATE.quizResults[lessonId][qi + '-p'] = picked;
  if (right) { addXP(15); showToast('✅ Correct! +15 XP'); }
  else showToast('❌ Incorrect — check the highlighted answer');
  saveState();
  renderScreen('lesson');
}

function completelesson(id) {
  if (!STATE.progress[id]) {
    STATE.progress[id] = true;
    const found = getLessonById(id);
    const xp = found?.lesson?.xp || 50;
    const prevLevel = STATE.user.level;
    addXP(xp);
    saveState();
    const totalDone = Object.keys(STATE.progress).length;
    const isFirstLesson = totalDone === 1;
    const leveledUp = STATE.user.level > prevLevel;
    setTimeout(() => {
      if (leveledUp && typeof showCelebration === 'function') {
        showCelebration('level_up', { level: STATE.user.level });
      } else if (isFirstLesson && typeof showCelebration === 'function') {
        showCelebration('lesson_complete', { xp, lessonsLeft: totalLessons() - totalDone });
      } else {
        showToast(`🎓 Lesson complete! +${xp} XP`);
      }
    }, 300);
  }
  renderScreen('lesson');
}

// ── TTS: READ LESSON ALOUD ──
function ttsReadLesson(btn) {
  if (!window.speechSynthesis) { alert('Text-to-speech is not supported in this browser.'); return; }
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
    btn.style.color = 'var(--txt2)';
    btn.style.borderColor = 'var(--bdr2)';
    btn.style.background = 'var(--bg3)';
    btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg> Read';
    return;
  }
  const bodyEl = document.querySelector('.lesson-body');
  if (!bodyEl) return;
  const d = document.createElement('div');
  d.innerHTML = bodyEl.innerHTML.replace(/<br\s*\/?>/gi, ' ');
  const text = (d.textContent || d.innerText || '').replace(/\s+/g, ' ').trim();
  if (!text) return;

  btn.style.color = 'var(--accent)';
  btn.style.borderColor = 'var(--accent)';
  btn.style.background = 'rgba(0,212,184,0.1)';
  btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2"/></svg> Stop';

  const utt = new SpeechSynthesisUtterance(text);
  if (typeof _ttsVoice !== 'undefined' && _ttsVoice) utt.voice = _ttsVoice;
  utt.rate = 1.0; utt.pitch = 1.0; utt.volume = 1.0;
  utt.onend = utt.onerror = function() {
    const b = document.getElementById('lesson-tts-btn');
    if (b) {
      b.style.color = 'var(--txt2)'; b.style.borderColor = 'var(--bdr2)'; b.style.background = 'var(--bg3)';
      b.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg> Read';
    }
  };
  speechSynthesis.speak(utt);
}

// ── CURRICULUM OVERVIEW ──
function renderCurriculum() {
  return `<div class="screen-pad">
    <div class="pg-header a-fadeup" style="padding:0 0 14px">
      <div style="display:flex;gap:10px;align-items:center">
        <button class="back-btn" onclick="navigate('learn')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>
        <div><h1 class="pg-title">Full Curriculum</h1><div style="font-size:12px;color:var(--txt2)">${totalLessons()} lessons across ${CURRICULUM.length} subjects</div></div>
      </div>
    </div>
    ${CURRICULUM.map(cat => `
      <div class="a-fadeup" style="margin-bottom:16px">
        <div class="card card-gold" style="padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px;cursor:pointer" onclick="navigate('learn')">
          <span style="font-size:24px">${cat.emoji}</span>
          <div style="flex:1">
            <div style="font-family:var(--display);font-weight:700;font-size:15px">${cat.title}</div>
            <div style="font-size:12px;color:var(--txt2);margin-top:2px">${cat.desc}</div>
          </div>
          <span class="pill ${cat.lessons.filter(l=>STATE.progress[l.id]).length===cat.lessons.length?'pill-green':'pill-gold'}">${cat.lessons.filter(l=>STATE.progress[l.id]).length}/${cat.lessons.length}</span>
        </div>
        ${cat.lessons.map(l => `
          <div style="padding:8px 12px;border-bottom:1px solid var(--bdr2);display:flex;align-items:center;gap:10px;cursor:pointer;background:var(--bg3);border-radius:0" onclick="openLesson('${l.id}')">
            <span style="font-size:16px">${l.emoji}</span>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:600">${l.title}</div>
              <div style="font-size:10px;color:var(--txt3)">${l.mins} min</div>
            </div>
            ${STATE.progress[l.id] ? '<span style="color:var(--green);font-size:14px">✓</span>' : '<span style="color:var(--txt3);font-size:12px">→</span>'}
          </div>
        `).join('')}
      </div>
    `).join('')}
  </div>`;
}

// ── SKILL MAP ──
function renderSkillMap() {
  return `<div class="screen-pad">
    <div class="pg-header a-fadeup" style="padding:0 0 14px">
      <div style="display:flex;gap:10px;align-items:center">
        <button class="back-btn" onclick="navigate('learn')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>
        <div><h1 class="pg-title">Skill Map</h1><div style="font-size:12px;color:var(--txt2)">${completedCount()}/${totalLessons()} lessons complete</div></div>
      </div>
    </div>
    <div class="card a-fadeup2" style="padding:12px;margin-bottom:12px">
      <div style="font-size:12px;color:var(--txt2)">
        <span style="color:var(--green)">●</span> Complete &nbsp;
        <span style="color:var(--gold)">●</span> Current &nbsp;
        <span style="color:var(--txt4)">●</span> Locked
      </div>
    </div>
    ${CURRICULUM.map((cat, ci) => `
      <div class="a-fadeup" style="animation-delay:${ci*.04}s;margin-bottom:20px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
          <span style="font-size:18px">${cat.emoji}</span>
          <div style="flex:1;font-family:var(--display);font-weight:700;font-size:13px">${cat.title}</div>
          <span class="pill ${cat.lessons.filter(l=>STATE.progress[l.id]).length===cat.lessons.length?'pill-green':'pill-gold'}" style="font-size:9px">
            ${cat.lessons.filter(l=>STATE.progress[l.id]).length}/${cat.lessons.length}
          </span>
        </div>
        <div style="display:flex;align-items:center;overflow-x:auto;padding:4px 0 12px;scrollbar-width:none;-webkit-overflow-scrolling:touch">
          ${cat.lessons.map((l, li) => {
            const done = STATE.progress[l.id];
            const prevDone = li === 0 || STATE.progress[cat.lessons[li-1].id];
            const isCurrent = !done && prevDone;
            return `${li > 0 ? `<div class="skill-connector ${STATE.progress[cat.lessons[li-1].id] ? 'done' : ''}"></div>` : ''}
            <div class="skill-node-wrap" onclick="openLesson('${l.id}')">
              <div class="skill-node ${done ? 'done' : isCurrent ? 'current' : 'locked'}">
                ${l.emoji}
                ${done ? `<div style="position:absolute;bottom:-2px;right:-2px;width:14px;height:14px;background:var(--green);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:8px;border:2px solid var(--bg3);color:white">✓</div>` : ''}
              </div>
              <div class="skill-label" style="color:${done?'var(--green)':isCurrent?'var(--gold)':'var(--txt3)'}">${l.title.split(' ').slice(0,2).join(' ')}</div>
            </div>`;
          }).join('')}
        </div>
      </div>
    `).join('')}
  </div>`;
}

// ── FLASHCARDS ──
let _flashIdx = 0, _flashFlipped = false;

function renderFlashcards() {
  const total = FLASHCARDS.length;
  const seen = Object.keys(STATE.flashProgress).length;
  const card = FLASHCARDS[_flashIdx % total];
  return `<div class="screen-pad">
    <div class="pg-header a-fadeup" style="padding:0 0 14px">
      <div style="display:flex;gap:10px;align-items:center">
        <button class="back-btn" onclick="navigate('learn')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>
        <div><h1 class="pg-title">Flashcards</h1><div style="font-size:12px;color:var(--txt2)">${seen}/${total} studied</div></div>
      </div>
      <span class="pill pill-gold">${(_flashIdx % total) + 1}/${total}</span>
    </div>
    <div class="prog-bar a-fadeup2" style="margin-bottom:16px"><div class="prog-fill" style="width:${Math.round(seen/total*100)}%"></div></div>
    <div class="flashcard-wrap a-fadeup2" onclick="_flashFlipped=!_flashFlipped;renderScreen('flashcards')" style="cursor:pointer">
      <div style="background:var(--bg2);border:1px solid var(--bdr2);border-radius:var(--r,12px);padding:24px 20px;min-height:220px;display:flex;flex-direction:column;justify-content:center;position:relative;transition:all .3s">
        ${_flashFlipped ? `
          <div style="font-size:11px;color:var(--amber);font-family:var(--display);letter-spacing:1.5px;margin-bottom:16px;font-weight:700">✅ ANSWER</div>
          <div style="font-size:14px;line-height:1.7;color:var(--txt)">${card.a}</div>
          <div style="font-size:10px;color:var(--txt3);font-family:monospace;letter-spacing:1px;text-transform:uppercase;margin-top:auto;padding-top:16px;text-align:center">TAP TO FLIP BACK</div>
        ` : `
          <div style="font-size:11px;color:var(--txt3);font-family:var(--display);letter-spacing:1.5px;margin-bottom:16px;font-weight:700">QUESTION ${(_flashIdx % total) + 1}</div>
          <div style="font-family:var(--display);font-weight:700;font-size:19px;line-height:1.4;color:var(--txt)">${card.q}</div>
          <div style="font-size:10px;color:var(--amber);font-family:monospace;letter-spacing:1px;text-transform:uppercase;margin-top:auto;padding-top:16px;text-align:center;animation:pulse 2s ease infinite">👆 TAP TO REVEAL ANSWER</div>
        `}
      </div>
    </div>
    ${_flashFlipped ? `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px" class="a-fadeup">
      <button class="btn btn-danger" onclick="gradeFlashcard(false)">✗ Didn't Know</button>
      <button class="btn btn-success" onclick="gradeFlashcard(true)">✓ Got It! +5 XP</button>
    </div>` : `
    <button class="btn btn-outline" style="margin-top:14px" onclick="_flashFlipped=true;renderScreen('flashcards')">Reveal Answer</button>`}
    <div style="display:flex;gap:8px;margin-top:12px">
      <button class="btn btn-ghost btn-sm" onclick="_flashIdx=Math.max(0,_flashIdx-1);_flashFlipped=false;renderScreen('flashcards')">← Prev</button>
      <button class="btn btn-ghost btn-sm" onclick="_flashIdx=Math.floor(Math.random()*FLASHCARDS.length);_flashFlipped=false;renderScreen('flashcards')">🔀 Random</button>
      <button class="btn btn-ghost btn-sm" onclick="_flashIdx=(_flashIdx+1)%FLASHCARDS.length;_flashFlipped=false;renderScreen('flashcards')">Next →</button>
    </div>
  </div>`;
}

function gradeFlashcard(correct) {
  const id = 'fc-' + (_flashIdx % FLASHCARDS.length);
  STATE.flashProgress[id] = {correct, seen: true, time: Date.now()};
  if (correct) { addXP(5); showToast('✅ +5 XP'); }
  _flashIdx = (_flashIdx + 1) % FLASHCARDS.length;
  _flashFlipped = false;
  saveState();
  renderScreen('flashcards');
}

// ── PATTERN GAME ──
let _pgIdx = 0, _pgAnswered = false;

// Extended pattern game uses BOTH PATTERN_QUIZ and CANDLE_PATTERNS
function getExtendedPatterns() {
  // Build pattern quiz entries from candle patterns too
  const extra = [
    {name:'Dragonfly Doji', type:'Bullish Reversal', winrate:'62-67%', timeframe:'H4/D1',
     hint:'Open = Close at the HIGH with very long lower wick',
     meaning:'Strong bullish rejection — price tested lows but closed at the high',
     rules:'At support levels or downtrend bottoms.',
     candles:[{o:0.65,h:0.66,l:0.30,c:0.65,bull:true}]},
    {name:'Gravestone Doji', type:'Bearish Reversal', winrate:'61-66%', timeframe:'H4/D1',
     hint:'Open = Close at the LOW with very long upper wick',
     meaning:'Strong bearish rejection — price tested highs but closed at the low',
     rules:'At resistance levels or uptrend highs.',
     candles:[{o:0.35,h:0.70,l:0.34,c:0.35,bull:false}]},
    {name:'Piercing Line', type:'Bullish Reversal', winrate:'58-63%', timeframe:'H4/D1',
     hint:'A bullish candle opens below the previous bearish candle low and closes above its midpoint',
     meaning:'Buyers absorbing selling pressure and pushing back strongly',
     rules:'At downtrend lows or support zones.',
     candles:[{o:0.45,h:0.42,l:0.68,c:0.65,bull:false},{o:0.70,h:0.65,l:0.52,c:0.53,bull:true}]},
    {name:'Dark Cloud Cover', type:'Bearish Reversal', winrate:'56-61%', timeframe:'H4/D1',
     hint:'A bearish candle opens above the previous bullish candle high and closes below its midpoint',
     meaning:'Sellers overwhelming buyers at a key level',
     rules:'At uptrend highs or resistance zones.',
     candles:[{o:0.60,h:0.63,l:0.42,c:0.44,bull:true},{o:0.38,h:0.40,l:0.57,c:0.55,bull:false}]},
    {name:'Marubozu', type:'Trend Confirmation', winrate:'58-65%', timeframe:'All TFs',
     hint:'A full-body candle with no wicks at all — open = low, close = high (or vice versa)',
     meaning:'Maximum conviction — one side completely dominated the entire session',
     rules:'Most powerful when starting a new trend after a consolidation.',
     candles:[{o:0.65,h:0.65,l:0.40,c:0.40,bull:false},{o:0.40,h:0.40,l:0.65,c:0.65,bull:true}]},
    {name:'Three White Soldiers', type:'Strong Bullish', winrate:'70-75%', timeframe:'D1',
     hint:'Three consecutive large green candles each closing higher than the previous',
     meaning:'Bulls completely in control — one of the strongest reversal patterns',
     rules:'Each opens near previous close. Best at major lows after extended downtrend.',
     candles:[{o:0.62,h:0.60,l:0.55,c:0.56,bull:true},{o:0.56,h:0.53,l:0.47,c:0.48,bull:true},{o:0.48,h:0.45,l:0.38,c:0.39,bull:true}]},
    {name:'Three Black Crows', type:'Strong Bearish', winrate:'68-73%', timeframe:'D1',
     hint:'Three consecutive large red candles each closing lower than the previous',
     meaning:'Bears completely in control — mirror of Three White Soldiers',
     rules:'Each opens near previous close. Best at major highs after extended uptrend.',
     candles:[{o:0.38,h:0.40,l:0.47,c:0.46,bull:false},{o:0.46,h:0.48,l:0.55,c:0.54,bull:false},{o:0.54,h:0.57,l:0.65,c:0.64,bull:false}]},
    {name:'Tweezer Top', type:'Bearish Reversal', winrate:'58-63%', timeframe:'H4/D1',
     hint:'Two consecutive candles with nearly identical HIGHS at a resistance level',
     meaning:'Double rejection at the same price — sellers defending that level aggressively',
     rules:'Must appear at resistance or swing highs. Second candle should be bearish.',
     candles:[{o:0.52,h:0.38,l:0.55,c:0.54,bull:true},{o:0.53,h:0.38,l:0.65,c:0.62,bull:false}]},
  ];
  return [...PATTERN_QUIZ, ...extra];
}

function renderPatternGame() {
  const p = PATTERN_QUIZ[_pgIdx % PATTERN_QUIZ.length];
  const others = PATTERN_QUIZ.filter((_, i) => i !== _pgIdx % PATTERN_QUIZ.length)
    .sort(() => Math.random() - .5).slice(0, 3).map(x => x.name);
  const opts = [p.name, ...others].sort(() => Math.random() - .5);
  return `<div class="screen-pad">
    <div class="pg-header a-fadeup" style="padding:0 0 14px">
      <div style="display:flex;gap:10px;align-items:center">
        <button class="back-btn" onclick="navigate('learn')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>
        <div><h1 class="pg-title">Pattern Game</h1><div style="font-size:12px;color:var(--txt2)">${STATE.patternScore.correct}/${STATE.patternScore.total} correct</div></div>
      </div>
      <span class="pill pill-gold">${(_pgIdx%PATTERN_QUIZ.length)+1}/${PATTERN_QUIZ.length}</span>
    </div>
    <div class="card a-fadeup2" style="padding:14px;margin-bottom:12px;text-align:center">
      <div style="font-size:11px;color:var(--txt3);font-family:var(--display);letter-spacing:1.5px;margin-bottom:10px">IDENTIFY THIS PATTERN</div>
      <div class="mini-chart-wrap"><canvas id="pg-canvas"></canvas></div>
      <div style="margin-top:10px;font-size:12px;color:var(--txt2);font-style:italic">${p.hint}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px" id="pg-opts">
      ${opts.map(o => `<div class="pattern-opt" id="pgopt-${o.replace(/\W/g,'-')}" onclick="checkPatternAnswer('${o}','${p.name}')">${o}</div>`).join('')}
    </div>
    ${_pgAnswered ? `
    <div class="card card-gold a-fadeup" style="padding:14px;margin-bottom:12px">
      <div style="font-family:var(--display);font-weight:700;margin-bottom:6px">${p.name}</div>
      <div style="font-size:12px;color:var(--txt2);margin-bottom:6px">${p.type} · ${p.timeframe}</div>
      <div style="font-size:12px;color:var(--txt2);margin-bottom:8px">${p.rules}</div>
      <span class="pill pill-green">Win Rate: ${p.winrate}</span>
    </div>
    <button class="btn btn-gold" onclick="_pgAnswered=false;_pgIdx=(_pgIdx+1)%PATTERN_QUIZ.length;renderScreen('patterns');setTimeout(drawPatternCanvas,80)">Next Pattern →</button>` : ''}
    <div style="margin-top:12px;display:flex;justify-content:space-between;font-size:12px;color:var(--txt3)">
      <span>${STATE.patternScore.correct} correct of ${STATE.patternScore.total} attempts</span>
      <span>${STATE.patternScore.total>0?Math.round(STATE.patternScore.correct/STATE.patternScore.total*100):0}% accuracy</span>
    </div>
  </div>`;
}

function checkPatternAnswer(chosen, correct) {
  if (_pgAnswered) return;
  _pgAnswered = true;
  STATE.patternScore.total++;
  const right = chosen === correct;
  if (right) { STATE.patternScore.correct++; addXP(10); showToast('🎯 Correct! +10 XP'); }
  else showToast(`❌ It was: ${correct}`);
  document.querySelectorAll('.pattern-opt').forEach(el => {
    if (el.textContent.trim() === correct) el.classList.add('correct');
    else if (el.textContent.trim() === chosen && !right) el.classList.add('wrong');
  });
  saveState();
  renderScreen('patterns');
  setTimeout(drawPatternCanvas, 80);
}

function drawPatternCanvas() {
  const canvas = document.getElementById('pg-canvas');
  if (!canvas) return;
  const p = PATTERN_QUIZ[_pgIdx % PATTERN_QUIZ.length];
  canvas.width = canvas.offsetWidth || 300;
  canvas.height = 155;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg3').trim() || '#18181F';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const candles = p.candles;
  const prices = candles.flatMap(c => [c.h, c.l]);
  const lo = Math.min(...prices), hi = Math.max(...prices);
  const range = (hi - lo) || 0.05;
  const pad = 20, w = canvas.width, h = canvas.height;
  const sy = v => h - pad - ((v - lo) / range) * (h - pad * 2);
  const count = candles.length;
  const spacing = count === 1 ? w / 2 : w / (count + 1);
  const cw = Math.min(40, spacing * 0.7);
  candles.forEach((c, i) => {
    const x = count === 1 ? w / 2 : spacing * (i + 1);
    const col = c.bull ? '#22C55E' : '#EF4444';
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x, sy(c.h)); ctx.lineTo(x, sy(c.l)); ctx.stroke();
    const top = Math.min(sy(c.o), sy(c.c));
    const bh = Math.max(2, Math.abs(sy(c.o) - sy(c.c)));
    ctx.shadowColor = col; ctx.shadowBlur = 6;
    ctx.fillRect(x - cw/2, top, cw, bh);
    ctx.shadowBlur = 0;
  });
}

// ── CANDLE BIBLE ──
let _candleFilter = 'All';

function renderCandleBible() {
  const types = ['All', 'Bullish Reversal', 'Bearish Reversal', 'Indecision/Reversal', 'Strong Bullish', 'Strong Bearish', 'Trend Confirmation'];
  const filtered = _candleFilter === 'All' ? CANDLE_PATTERNS : CANDLE_PATTERNS.filter(p => p.type === _candleFilter);
  return `<div class="screen-pad">
    <div class="pg-header a-fadeup" style="padding:0 0 12px">
      <div style="display:flex;gap:10px;align-items:center">
        <button class="back-btn" onclick="navigate('learn')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>
        <div><h1 class="pg-title">Candle Bible</h1><div style="font-size:12px;color:var(--txt2)">${CANDLE_PATTERNS.length} patterns</div></div>
      </div>
    </div>
    <div class="h-scroll a-fadeup2" style="margin-bottom:14px">
      ${types.map(t => `<button onclick="_candleFilter='${t}';renderScreen('candlebible')" style="flex-shrink:0;padding:6px 12px;border-radius:20px;font-size:11px;font-weight:700;font-family:var(--display);cursor:pointer;border:1.5px solid var(--bdr2);background:${_candleFilter===t?'var(--gold)':'var(--bg3)'};color:${_candleFilter===t?'#0A0A0F':'var(--txt2)'};white-space:nowrap;transition:all .15s">${t}</button>`).join('')}
    </div>
    ${filtered.map((p, i) => `
      <div class="cp-card a-fadeup" style="animation-delay:${i*.04}s" onclick="showCandleDetail('${p.name.replace(/'/g,'')}')">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px">
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
              <span style="font-size:22px">${p.emoji}</span>
              <div>
                <div style="font-family:var(--display);font-weight:700;font-size:15px">${p.name}</div>
                <span class="pill ${p.type.includes('Bullish')?'pill-green':p.type.includes('Bearish')?'pill-red':'pill-gold'}" style="margin-top:3px;font-size:9px">${p.type}</span>
              </div>
            </div>
            <div style="font-size:12px;color:var(--txt2);line-height:1.5">${p.desc}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div style="font-size:16px;color:var(--gold)">${p.reliability}</div>
            <div style="font-size:9px;color:var(--txt3);font-family:var(--display);margin-top:2px">RELIABILITY</div>
          </div>
        </div>
      </div>
    `).join('')}
  </div>`;
}

function getCandlePatternSVG(name) {
  const W=200, H=110;
  function c(x,o,h,l,cl,w,bull) {
    const col=bull?'#22C55E':'#EF4444';
    const scale=H*0.85, off=H*0.05;
    const allP=[o,h,l,cl];
    const mn=Math.min(...allP), mx=Math.max(...allP);
    const rng=mx-mn||0.01;
    const sy=v=>off+(1-(v-mn)/rng)*scale;
    const bT=Math.min(sy(o),sy(cl)), bH=Math.max(2,Math.abs(sy(o)-sy(cl)));
    return `<g><line x1="${x}" y1="${sy(h)}" x2="${x}" y2="${sy(l)}" stroke="${col}" stroke-width="1.5"/>
      <rect x="${x-w/2}" y="${bT}" width="${w}" height="${bH}" fill="${col}" rx="1"/></g>`;
  }
  const svgs = {
    'Hammer':         `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="#13131A" rx="4"/>${c(100,90,92,40,88,22,true)}</svg>`,
    'Inverted Hammer':`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="#13131A" rx="4"/>${c(100,45,90,42,48,22,true)}</svg>`,
    'Shooting Star':  `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="#13131A" rx="4"/>${c(100,55,90,52,58,22,false)}</svg>`,
    'Hanging Man':    `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="#13131A" rx="4"/>${c(100,55,57,20,52,22,false)}</svg>`,
    'Doji':           `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="#13131A" rx="4"/>${c(100,60,85,35,60,2,true)}</svg>`,
    'Dragonfly Doji': `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="#13131A" rx="4"/>${c(100,65,66,30,65,2,true)}</svg>`,
    'Gravestone Doji':`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="#13131A" rx="4"/>${c(100,35,70,34,35,2,false)}</svg>`,
    'Bullish Engulfing':`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="#13131A" rx="4"/>
      ${c(80,55,53,60,57,16,false)}${c(120,62,45,65,47,24,true)}</svg>`,
    'Bearish Engulfing':`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="#13131A" rx="4"/>
      ${c(80,47,45,52,49,16,true)}${c(120,44,65,40,62,24,false)}</svg>`,
    'Morning Star':   `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="#13131A" rx="4"/>
      ${c(65,40,37,68,65,18,false)}${c(100,68,65,72,69,14,true)}${c(135,62,38,64,40,18,true)}</svg>`,
    'Evening Star':   `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="#13131A" rx="4"/>
      ${c(65,65,68,38,40,18,true)}${c(100,37,35,42,38,14,false)}${c(135,43,65,40,62,18,false)}</svg>`,
    'Marubozu':       `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="#13131A" rx="4"/>
      ${c(80,65,65,40,40,22,false)}${c(130,40,40,65,65,22,true)}</svg>`,
    'Three White Soldiers':`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="#13131A" rx="4"/>
      ${c(60,68,66,55,56,18,true)}${c(100,55,52,42,43,18,true)}${c(140,43,40,28,29,18,true)}</svg>`,
    'Three Black Crows':`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="#13131A" rx="4"/>
      ${c(60,35,37,48,47,18,false)}${c(100,48,50,60,59,18,false)}${c(140,59,62,72,71,18,false)}</svg>`,
    'Piercing Line':  `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="#13131A" rx="4"/>
      ${c(80,42,38,65,63,18,false)}${c(130,67,62,48,50,18,true)}</svg>`,
    'Dark Cloud Cover':`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="#13131A" rx="4"/>
      ${c(80,65,68,42,44,18,true)}${c(130,38,42,59,57,18,false)}</svg>`,
    'Tweezer Top':    `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="#13131A" rx="4"/>
      ${c(80,55,40,65,62,18,true)}${c(130,55,40,65,44,18,false)}
      <line x1="40" y1="${H*0.37}" x2="160" y2="${H*0.37}" stroke="#F97316" stroke-width="1" stroke-dasharray="4,3"/></svg>`,
    'Tweezer Bottom': `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="#13131A" rx="4"/>
      ${c(80,43,72,42,68,18,false)}${c(130,59,72,42,45,18,true)}
      <line x1="40" y1="${H*0.62}" x2="160" y2="${H*0.62}" stroke="#22C55E" stroke-width="1" stroke-dasharray="4,3"/></svg>`,
  };
  return svgs[name] || `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="#13131A" rx="4"/><text x="${W/2}" y="${H/2+5}" text-anchor="middle" fill="#9B9891" font-size="12">Pattern Visual</text></svg>`;
}

function showCandleDetail(name) {
  const p = CANDLE_PATTERNS.find(x => x.name === name);
  if (!p) return;
  const svg = getCandlePatternSVG(name);
  showModal(`<div class="modal-handle"></div>
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
      <span style="font-size:36px">${p.emoji}</span>
      <div>
        <div style="font-family:var(--display);font-weight:800;font-size:18px">${p.name}</div>
        <div style="font-size:12px;color:var(--txt2);margin-top:2px">${p.type} · ${p.reliability} · ${p.timeframe}</div>
      </div>
    </div>
    <div style="border-radius:8px;overflow:hidden;margin-bottom:14px">${svg}</div>
    <div class="section-lbl">What Is It?</div>
    <p style="font-size:13px;color:var(--txt2);line-height:1.7;margin-bottom:12px">${p.desc}</p>
    <div class="section-lbl">Trading Rules</div>
    <p style="font-size:13px;color:var(--txt2);line-height:1.7;margin-bottom:12px">${p.rules}</p>
    <div class="section-lbl">Statistics</div>
    <div class="card" style="padding:10px;margin-bottom:14px;background:var(--bg4)">
      <p style="font-size:12px;color:var(--txt2);line-height:1.6;margin:0">${p.stats}</p>
    </div>
    <button class="btn btn-gold" onclick="closeModal();addXP(15);showToast('📚 Pattern studied! +15 XP')">Mark as Studied +15 XP</button>
  `);
}

function renderStrategies() {
  if (typeof STRATEGIES === 'undefined' || !STRATEGIES.length) {
    return `<div class="screen-pad"><div class="pg-header a-fadeup"><button class="back-btn" onclick="navigate('learn')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button><h1 class="pg-title">Strategies</h1></div><div class="card" style="padding:20px;text-align:center"><div style="font-size:36px;margin-bottom:12px">⚔️</div><div style="font-family:var(--display);font-weight:700">Loading strategies...</div><div style="font-size:13px;color:var(--txt2);margin-top:8px">Complete a few lessons first to unlock the Strategy Library.</div><button class="btn btn-outline" style="margin-top:14px" onclick="navigate('learn')">← Back to Learn</button></div></div>`;
  }
  const styles = ['All','Day Trade','Swing','Swing/Day','Day/Swing','Scalping','Position'];
  const filtered = _stratFilter === 'All' ? STRATEGIES : STRATEGIES.filter(s => s.style && s.style.includes(_stratFilter));
  return `<div class="screen-pad">
    <div class="pg-header a-fadeup" style="padding:0 0 12px">
      <div style="display:flex;gap:10px;align-items:center">
        <button class="back-btn" onclick="navigate('home')"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg></button>
        <div><h1 class="pg-title">Strategy Library</h1><div style="font-size:12px;color:var(--txt2)">${STRATEGIES.length} complete strategies</div></div>
      </div>
    </div>
    <div class="h-scroll a-fadeup2" style="margin-bottom:14px">
      ${styles.map(s => `<button onclick="_stratFilter='${s}';renderScreen('strategies')" style="flex-shrink:0;padding:6px 12px;border-radius:20px;font-size:11px;font-weight:700;font-family:var(--display);cursor:pointer;border:1.5px solid var(--bdr2);background:${_stratFilter===s?'var(--gold)':'var(--bg3)'};color:${_stratFilter===s?'#0A0A0F':'var(--txt2)'};transition:all .15s">${s}</button>`).join('')}
    </div>
    ${filtered.map((s, i) => `
      <div class="strat-card a-fadeup" style="animation-delay:${i*.05}s" onclick="showStratDetail('${s.id}')">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px">
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
              <span style="font-size:22px">${s.emoji}</span>
              <div style="font-family:var(--display);font-weight:700;font-size:16px">${s.name}</div>
            </div>
            <div style="display:flex;gap:4px;flex-wrap:wrap">
              <span class="pill pill-gold" style="font-size:9px">${s.style}</span>
              <span class="pill pill-blue" style="font-size:9px">${s.tf}</span>
              <span class="diff-stars">${'★'.repeat(s.difficulty)}${'☆'.repeat(5-s.difficulty)}</span>
            </div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div class="t-mono" style="font-size:16px;color:var(--green)">${s.winrate}</div>
            <div style="font-size:9px;color:var(--txt3);font-family:var(--display)">WIN RATE</div>
            <div class="t-mono" style="font-size:13px;color:var(--gold);margin-top:3px">${s.rr}</div>
            <div style="font-size:9px;color:var(--txt3);font-family:var(--display)">R:R</div>
          </div>
        </div>
        <div style="font-size:13px;color:var(--txt2);line-height:1.5">${s.desc}</div>
        <div style="margin-top:8px;font-size:11px;color:var(--txt3)">📊 ${s.pairs}</div>
      </div>
    `).join('')}
  </div>`;
}

function showStratDetail(id) {
  if (typeof STRATEGIES === 'undefined') return;
  const s = STRATEGIES.find(x => x.id === id);
  if (!s) { showToast('Strategy not found'); return; }
  showModal(`<div class="modal-handle"></div>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
      <span style="font-size:36px">${s.emoji}</span>
      <div><div style="font-family:var(--display);font-weight:800;font-size:19px">${s.name}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px"><span class="pill pill-gold">${s.style}</span><span class="pill pill-blue">${s.tf}</span></div></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:14px">
      <div class="calc-res"><div class="calc-res-val" style="color:var(--green)">${s.winrate}</div><div class="calc-res-lbl">Win Rate</div></div>
      <div class="calc-res"><div class="calc-res-val" style="color:var(--gold)">${s.rr}</div><div class="calc-res-lbl">R:R</div></div>
      <div class="calc-res"><div class="calc-res-val">${'★'.repeat(s.difficulty)}</div><div class="calc-res-lbl">Difficulty</div></div>
    </div>
    <div style="margin-bottom:12px"><div class="section-lbl">Overview</div><p style="font-size:13px;color:var(--txt2);line-height:1.6">${s.desc}</p></div>
    <div style="margin-bottom:12px"><div class="section-lbl">Best Pairs</div><p style="font-size:13px;color:var(--txt2)">${s.pairs}</p></div>
    <div class="section-lbl">Complete Rules</div>
    <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:14px">
      ${s.rules.map((r, i) => `<div style="display:flex;gap:10px;align-items:flex-start;padding:9px;background:var(--bg3);border-radius:var(--rs)">
        <div style="width:20px;height:20px;border-radius:50%;background:var(--gold);color:#0A0A0F;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;flex-shrink:0;font-family:var(--display)">${i+1}</div>
        <div style="font-size:13px;color:var(--txt2);line-height:1.5">${r}</div>
      </div>`).join('')}
    </div>
    ${s.backtest ? `<div class="card card-gold" style="padding:12px;margin-bottom:14px"><div class="section-lbl">Backtest Notes</div><p style="font-size:12px;color:var(--txt2);line-height:1.55">${s.backtest}</p></div>` : ''}
    <button class="btn btn-gold" onclick="closeModal();addXP(10);showToast('📊 Strategy studied! +10 XP')">Add to Toolkit +10 XP</button>`);
}

/* === js/screens/trade.js === */
