// ============================================================
// CAPITAL HEIGHTS — login.js
// Landing → New or Returning → Character → PIN → Create → Game
// ============================================================

const LG_FIRST_NAMES = [
  "Alex","Jordan","Morgan","Taylor","Casey","Riley","Jamie","Quinn",
  "Avery","Peyton","Skylar","Drew","Blake","Cameron","Logan","Parker",
  "Reese","Sydney","Dakota","Hayden"
];

const LG_LAST_NAMES = [
  "Rivera","Lee","Chen","Brooks","Williams","Johnson","Morrison","Bennett",
  "Walsh","Callahan","Harrington","Summers","Fitzgerald","Donovan","Holloway",
  "Washington","Simmons","Thornton","Coleman","Jacobs","Foster","Rivers",
  "Graves","Caldwell","Whitaker","Okafor","Ellis","Dupont","Monroe","Hargrove"
];

const LG_CHARACTERS = [
  { id:"white_man",   label:"Character 1", imgs:["assets/characters/white_man_1.png","assets/characters/white_man_2.png","assets/characters/white_man_3.png"] },
  { id:"black_woman", label:"Character 2", imgs:["assets/characters/black_woman_1.png","assets/characters/black_woman_2.png","assets/characters/black_woman_3.png"] },
  { id:"char3",  label:"Character 3",  imgs:[] },
  { id:"char4",  label:"Character 4",  imgs:[] },
  { id:"char5",  label:"Character 5",  imgs:[] },
  { id:"char6",  label:"Character 6",  imgs:[] },
  { id:"char7",  label:"Character 7",  imgs:[] },
  { id:"char8",  label:"Character 8",  imgs:[] },
  { id:"char9",  label:"Character 9",  imgs:[] },
  { id:"char10", label:"Character 10", imgs:[] },
  { id:"char11", label:"Character 11", imgs:[] },
  { id:"char12", label:"Character 12", imgs:[] },
];

// ── State ─────────────────────────────────────────────────────
let lg = {
  mode: null,           // 'new' | 'returning'
  step: 'landing',
  claimedMap: {},       // { characterId: playerDoc }
  selectedChar: null,
  pin: '',
  pinConfirm: '',
  pinStep: 'enter',     // 'enter' | 'confirm'
  firstIdx: 0,
  lastIdx: 0,
  outfitIdx: 0,
};

// ── Boot ──────────────────────────────────────────────────────
window.initLogin = async function() {
  if (!window.GameState || !window.GameState.FirestoreDB) {
    setTimeout(() => window.initLogin(), 50);
    return;
  }
  await lgRefreshClaimed();
  lg.step = 'landing';
  lgRender();
};

async function lgRefreshClaimed() {
  try {
    const players = await window.GameState.FirestoreDB.getAllPlayers();
    lg.claimedMap = {};
    players.filter(p => p.characterId && p.pin).forEach(p => {
      lg.claimedMap[p.characterId] = p;
    });
  } catch(e) { lg.claimedMap = {}; }
}

// ── Render router ─────────────────────────────────────────────
function lgRender() {
  const el = document.getElementById('screen-login');
  if (!el) return;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  el.classList.add('active');

  if      (lg.step === 'landing')        lgRenderLanding(el);
  else if (lg.step === 'new-select')     lgRenderNewSelect(el);
  else if (lg.step === 'new-pin')        lgRenderNewPin(el);
  else if (lg.step === 'new-name')       lgRenderNewName(el);
  else if (lg.step === 'new-outfit')     lgRenderNewOutfit(el);
  else if (lg.step === 'ret-select')     lgRenderRetSelect(el);
  else if (lg.step === 'ret-pin')        lgRenderRetPin(el);
}

// ── LANDING ───────────────────────────────────────────────────
function lgRenderLanding(el) {
  el.innerHTML = `
    <div class="lg-landing">
      <div class="lg-landing-inner">
        <h1 class="lg-title">CAPITAL<br>HEIGHTS</h1>
        <p class="lg-subtitle">Financial Literacy Simulator</p>
        <div class="lg-landing-btns">
          <button class="lg-primary-btn" onclick="lgStartNew()">
            🏙️ Begin Your Journey
          </button>
          <button class="lg-secondary-btn" onclick="lgStartReturning()">
            🔑 Return to Your Journey
          </button>
        </div>
        <button class="lg-admin-link" onclick="showScreen('screen-admin-login')">Admin</button>
      </div>
    </div>`;
}

window.lgStartNew = async function() {
  await lgRefreshClaimed();
  lg.mode = 'new';
  lg.selectedChar = null;
  lg.pin = '';
  lg.pinConfirm = '';
  lg.pinStep = 'enter';
  lg.firstIdx = Math.floor(Math.random() * LG_FIRST_NAMES.length);
  lg.lastIdx  = Math.floor(Math.random() * LG_LAST_NAMES.length);
  lg.outfitIdx = 0;
  lg.step = 'new-select';
  lgRender();
};

window.lgStartReturning = async function() {
  await lgRefreshClaimed();
  lg.mode = 'returning';
  lg.selectedChar = null;
  lg.pin = '';
  lg.step = 'ret-select';
  lgRender();
};

// ── NEW: Character Select ─────────────────────────────────────
function lgRenderNewSelect(el) {
  const available = LG_CHARACTERS.filter(c => !lg.claimedMap[c.id]);
  el.innerHTML = `
    <div class="lg-select-wrap">
      <div class="lg-select-header">
        <h2 class="lg-select-title">Choose Your Character</h2>
        <p class="lg-select-sub">Select an available character to begin your journey.</p>
      </div>
      <div class="lg-char-grid">
        ${LG_CHARACTERS.map(c => {
          const claimed = !!lg.claimedMap[c.id];
          const hasAssets = c.imgs.length > 0;
          if (claimed) return '';
          return `
            <div class="lg-char-slot ${hasAssets ? 'open' : 'locked'}"
                 ${hasAssets ? `onclick="lgNewSelectChar('${c.id}')"` : ''}>
              ${hasAssets
                ? `<img src="${c.imgs[0]}" class="lg-char-img"/>`
                : `<div class="lg-char-silhouette"></div>`}
              <div class="lg-char-label">${hasAssets ? c.label : '🔒 LOCKED'}</div>
            </div>`;
        }).join('')}
      </div>
      <button class="lg-back-btn" onclick="lg.step='landing';lgRender()">← Back</button>
    </div>`;
}

window.lgNewSelectChar = function(id) {
  lg.selectedChar = LG_CHARACTERS.find(c => c.id === id);
  lg.pin = '';
  lg.pinConfirm = '';
  lg.pinStep = 'enter';
  lg.step = 'new-pin';
  lgRender();
};

// ── NEW: Set PIN ──────────────────────────────────────────────
function lgRenderNewPin(el) {
  const isConfirm = lg.pinStep === 'confirm';
  const currentPin = isConfirm ? lg.pinConfirm : lg.pin;
  el.innerHTML = `
    <div class="lg-pin-wrap">
      <div class="lg-pin-box">
        ${lg.selectedChar.imgs.length
          ? `<img src="${lg.selectedChar.imgs[lg.outfitIdx]}" class="lg-pin-char-img"/>`
          : `<div class="lg-pin-char-silhouette">?</div>`}
        <h2 class="lg-pin-title">${isConfirm ? 'Confirm Your PIN' : 'Create Your PIN'}</h2>
        <p class="lg-pin-sub">${isConfirm
          ? 'Enter your PIN again to confirm it.'
          : 'Choose a 4-digit PIN you will remember. You will need it every time you log in.'}</p>
        <div class="lg-pin-dots">
          ${[0,1,2,3].map(i => `<div class="lg-pin-dot ${currentPin.length > i ? 'filled' : ''}"></div>`).join('')}
        </div>
        <div class="lg-numpad">
          ${[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map(k => `
            <button class="lg-numpad-btn ${k===''?'invisible':''}"
              ${k !== '' ? `onclick="lgNewPinKey('${k}')"` : ''}>
              ${k}
            </button>`).join('')}
        </div>
        <p id="lg-pin-error" class="lg-pin-error" style="display:none"></p>
        <button class="lg-back-btn" onclick="${isConfirm ? "lg.pinStep='enter';lg.pin='';lg.pinConfirm='';lgRender()" : "lg.step='new-select';lgRender()"}">← Back</button>
      </div>
    </div>`;
}

window.lgNewPinBack = function() {
  if (lg.pinStep === 'confirm') {
    lg.pinStep = 'enter'; lg.pin = ''; lg.pinConfirm = '';
  } else {
    lg.step = 'new-select';
  }
  lgRender();
};

window.lgNewPinKey = function(key) {
  const isConfirm = lg.pinStep === 'confirm';
  if (key === '⌫') {
    if (isConfirm) lg.pinConfirm = lg.pinConfirm.slice(0,-1);
    else           lg.pin        = lg.pin.slice(0,-1);
    lgRender();
    return;
  }
  if (isConfirm) {
    if (lg.pinConfirm.length >= 4) return;
    lg.pinConfirm += key;
  } else {
    if (lg.pin.length >= 4) return;
    lg.pin += key;
  }
  lgRender();

  if (!isConfirm && lg.pin.length === 4) {
    // Move to confirm step
    setTimeout(() => { lg.pinStep = 'confirm'; lgRender(); }, 300);
  } else if (isConfirm && lg.pinConfirm.length === 4) {
    setTimeout(() => lgNewPinConfirmed(), 300);
  }
};

function lgNewPinConfirmed() {
  if (lg.pin !== lg.pinConfirm) {
    lg.pinStep = 'enter';
    lg.pin = '';
    lg.pinConfirm = '';
    lgRender();
    const err = document.getElementById('lg-pin-error');
    if (err) { err.textContent = "PINs didn't match. Try again."; err.style.display = 'block'; }
    return;
  }
  lg.step = 'new-name';
  lgRender();
};

// ── NEW: Choose Name ──────────────────────────────────────────
function lgRenderNewName(el) {
  const firstName = LG_FIRST_NAMES[lg.firstIdx];
  const lastName  = LG_LAST_NAMES[lg.lastIdx];
  el.innerHTML = `
    <div class="lg-create-wrap">
      <div class="lg-create-box">
        <div class="lg-create-step">Step 1 of 2 — Choose Your Name</div>
        <h2 class="lg-create-name-display">${firstName} ${lastName}</h2>
        <div class="lg-name-row">
          <span class="lg-name-label">First</span>
          <div class="lg-name-carousel">
            <button class="lg-arrow" onclick="lgFirstPrev()">‹</button>
            <span class="lg-name-val">${firstName}</span>
            <button class="lg-arrow" onclick="lgFirstNext()">›</button>
          </div>
        </div>
        <div class="lg-name-row">
          <span class="lg-name-label">Last</span>
          <div class="lg-name-carousel">
            <button class="lg-arrow" onclick="lgLastPrev()">‹</button>
            <span class="lg-name-val">${lastName}</span>
            <button class="lg-arrow" onclick="lgLastNext()">›</button>
          </div>
        </div>
        <button class="lg-confirm-btn" onclick="lgGoToOutfit()">
          I'm ${firstName} ${lastName} →
        </button>
        <button class="lg-back-btn" onclick="lgNameBack()">← Back</button>
      </div>
    </div>`;
}

window.lgGoToOutfit = function() {
  lg.step = 'new-outfit';
  lgRender();
};
window.lgNameBack = function() {
  lg.pinStep = 'enter'; lg.pin = ''; lg.pinConfirm = '';
  lg.step = 'new-pin';
  lgRender();
};
window.lgFirstPrev = function() { lg.firstIdx = (lg.firstIdx - 1 + LG_FIRST_NAMES.length) % LG_FIRST_NAMES.length; lgRender(); };
window.lgFirstNext = function() { lg.firstIdx = (lg.firstIdx + 1) % LG_FIRST_NAMES.length; lgRender(); };
window.lgLastPrev  = function() { lg.lastIdx  = (lg.lastIdx  - 1 + LG_LAST_NAMES.length)  % LG_LAST_NAMES.length;  lgRender(); };
window.lgLastNext  = function() { lg.lastIdx  = (lg.lastIdx  + 1) % LG_LAST_NAMES.length;  lgRender(); };

// ── NEW: Choose Outfit ────────────────────────────────────────
function lgRenderNewOutfit(el) {
  const c = lg.selectedChar;
  const firstName = LG_FIRST_NAMES[lg.firstIdx];
  const lastName  = LG_LAST_NAMES[lg.lastIdx];
  el.innerHTML = `
    <div class="lg-create-wrap">
      <div class="lg-create-box">
        <div class="lg-create-step">Step 2 of 2 — Choose Your Outfit</div>
        <div class="lg-outfit-carousel">
          <button class="lg-arrow large" onclick="lgOutfitPrev()">‹</button>
          <div class="lg-outfit-display">
            <img src="${c.imgs[lg.outfitIdx]}" class="lg-outfit-img"/>
            <div class="lg-outfit-dots">
              ${c.imgs.map((_,i) => `<span class="lg-dot ${i===lg.outfitIdx?'active':''}"></span>`).join('')}
            </div>
          </div>
          <button class="lg-arrow large" onclick="lgOutfitNext()">›</button>
        </div>
        <button class="lg-confirm-btn" onclick="lgCreatePlayer()">
          Enter Capital Heights as ${firstName} →
        </button>
        <button class="lg-back-btn" onclick="lgOutfitBack()">← Back</button>
        <p id="lg-create-error" class="lg-pin-error" style="display:none"></p>
      </div>
    </div>`;
}

window.lgOutfitBack = function() { lg.step = 'new-name'; lgRender(); };
window.lgOutfitPrev = function() { const n = lg.selectedChar.imgs.length; lg.outfitIdx = (lg.outfitIdx - 1 + n) % n; lgRender(); };
window.lgOutfitNext = function() { const n = lg.selectedChar.imgs.length; lg.outfitIdx = (lg.outfitIdx + 1) % n; lgRender(); };

// ── NEW: Create Player ────────────────────────────────────────
window.lgCreatePlayer = async function() {
  const errEl = document.getElementById('lg-create-error');
  const firstName = LG_FIRST_NAMES[lg.firstIdx];
  const lastName  = LG_LAST_NAMES[lg.lastIdx];
  const c = lg.selectedChar;
  try {
    // Race condition check
    await lgRefreshClaimed();
    if (lg.claimedMap[c.id]) {
      if (errEl) { errEl.textContent = 'This character was just claimed. Please go back and choose another.'; errEl.style.display = 'block'; }
      setTimeout(() => { lg.step = 'new-select'; lgRender(); }, 2500);
      return;
    }
    const uid = (c.id + '_' + firstName[0] + lastName).toLowerCase().replace(/[^a-z0-9_]/g,'');
    let player = await window.GameState.FirestoreDB.getPlayer(uid);
    if (!player) player = await window.GameState.FirestoreDB.createPlayer(uid, firstName, lastName);
    await window.GameState.FirestoreDB.updatePlayer(uid, {
      pin: lg.pin,
      characterId: c.id,
      outfitIndex: lg.outfitIdx,
      characterName: firstName + ' ' + lastName,
      firstName, lastName,
    });
    player = await window.GameState.FirestoreDB.getPlayer(uid);
    window.GameState.player = player;
    showScreen('screen-onboarding');
    if (window.initOnboarding) window.initOnboarding(player);
  } catch(e) {
    if (errEl) { errEl.textContent = 'Error: ' + e.message; errEl.style.display = 'block'; }
    console.error(e);
  }
};

// ── RETURNING: Character Select ───────────────────────────────
function lgRenderRetSelect(el) {
  const claimed = Object.keys(lg.claimedMap);
  el.innerHTML = `
    <div class="lg-select-wrap">
      <div class="lg-select-header">
        <h2 class="lg-select-title">Welcome Back</h2>
        <p class="lg-select-sub">Select your character, then enter your PIN.</p>
      </div>
      <div class="lg-char-grid">
        ${LG_CHARACTERS.map(c => {
          const isClaimed = !!lg.claimedMap[c.id];
          if (!isClaimed) return ''; // hide unclaimed for returning flow
          return `
            <div class="lg-char-slot open" onclick="lgRetSelectChar('${c.id}')">
              ${c.imgs.length
                ? `<img src="${c.imgs[lg.claimedMap[c.id]?.outfitIndex||0]||c.imgs[0]}" class="lg-char-img"/>`
                : `<div class="lg-char-silhouette"></div>`}
              <div class="lg-char-label">${lg.claimedMap[c.id]?.firstName||c.label}</div>
            </div>`;
        }).join('')}
      </div>
      ${claimed.length === 0 ? '<p style="color:#555;text-align:center;">No returning players yet this season.</p>' : ''}
      <button class="lg-back-btn" onclick="lg.step='landing';lgRender()">← Back</button>
    </div>`;
}

window.lgRetSelectChar = function(id) {
  lg.selectedChar = LG_CHARACTERS.find(c => c.id === id);
  lg.pin = '';
  lg.step = 'ret-pin';
  lgRender();
};

// ── RETURNING: Enter PIN ──────────────────────────────────────
function lgRenderRetPin(el) {
  const c = lg.selectedChar;
  const existingPlayer = lg.claimedMap[c.id];
  const outfitIdx = existingPlayer?.outfitIndex || 0;
  el.innerHTML = `
    <div class="lg-pin-wrap">
      <div class="lg-pin-box">
        ${c.imgs.length
          ? `<img src="${c.imgs[outfitIdx]||c.imgs[0]}" class="lg-pin-char-img"/>`
          : `<div class="lg-pin-char-silhouette">?</div>`}
        <h2 class="lg-pin-title">Welcome back, ${existingPlayer?.firstName||''}!</h2>
        <p class="lg-pin-sub">Enter your 4-digit PIN to continue.</p>
        <div class="lg-pin-dots">
          ${[0,1,2,3].map(i => `<div class="lg-pin-dot ${lg.pin.length > i ? 'filled' : ''}"></div>`).join('')}
        </div>
        <div class="lg-numpad">
          ${[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map(k => `
            <button class="lg-numpad-btn ${k===''?'invisible':''}"
              ${k !== '' ? `onclick="lgRetPinKey('${k}')"` : ''}>
              ${k}
            </button>`).join('')}
        </div>
        <p id="lg-ret-pin-error" class="lg-pin-error" style="display:none"></p>
        <button class="lg-back-btn" onclick="lgRetPinBack()">← Back</button>
      </div>
    </div>`;
}

window.lgRetPinBack = function() { lg.step = 'ret-select'; lg.pin = ''; lgRender(); };
window.lgRetPinKey = async function(key) {
  if (key === '⌫') { lg.pin = lg.pin.slice(0,-1); lgRender(); return; }
  if (lg.pin.length >= 4) return;
  lg.pin += key;
  lgRender();
  if (lg.pin.length === 4) {
    setTimeout(() => lgRetVerifyPin(), 300);
  }
};

async function lgRetVerifyPin() {
  const existing = lg.claimedMap[lg.selectedChar.id];
  if (!existing) {
    lg.pin = '';
    lgRender();
    return;
  }
  if (existing.pin !== lg.pin) {
    lg.pin = '';
    lgRender();
    setTimeout(() => {
      const err = document.getElementById('lg-ret-pin-error');
      if (err) { err.textContent = 'Incorrect PIN. Try again.'; err.style.display = 'block'; }
    }, 50);
    return;
  }
  // Correct — resume
  try {
    await window.GameState.FirestoreDB.advanceTime(existing.uid);
    const fresh = await window.GameState.FirestoreDB.getPlayer(existing.uid);
    window.GameState.player = fresh;
    const step = fresh.onboardingStep;
    const inOnboarding = !step || step === 'character' || step === 'degree' || step === 'finals';
    if (inOnboarding) {
      showScreen('screen-onboarding');
      if (window.initOnboarding) window.initOnboarding(fresh);
    } else if (step === 'complete' && fresh.apartmentId) {
      showScreen('screen-home');
      if (window.initHome) window.initHome(fresh);
    } else {
      showScreen('screen-citymap');
      if (window.initCityMap) window.initCityMap(fresh);
    }
  } catch(e) {
    const err = document.getElementById('lg-ret-pin-error');
    if (err) { err.textContent = 'Connection error: ' + e.message; err.style.display = 'block'; }
  }
}

// ── Self-boot ─────────────────────────────────────────────────
(function() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(() => window.initLogin(), 0));
  } else {
    setTimeout(() => window.initLogin(), 0);
  }
})();