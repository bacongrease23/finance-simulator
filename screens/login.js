// ============================================================
// CAPITAL HEIGHTS — login.js
// Landing → Character Select → PIN → Creation or Resume
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
  { id:"white_man",    label:"Character 1", imgs:["assets/characters/white_man_1.png","assets/characters/white_man_2.png","assets/characters/white_man_3.png"], available:true },
  { id:"black_woman",  label:"Character 2", imgs:["assets/characters/black_woman_1.png","assets/characters/black_woman_2.png","assets/characters/black_woman_3.png"], available:true },
  { id:"char3",  label:"Character 3",  imgs:[], available:false },
  { id:"char4",  label:"Character 4",  imgs:[], available:false },
  { id:"char5",  label:"Character 5",  imgs:[], available:false },
  { id:"char6",  label:"Character 6",  imgs:[], available:false },
  { id:"char7",  label:"Character 7",  imgs:[], available:false },
  { id:"char8",  label:"Character 8",  imgs:[], available:false },
  { id:"char9",  label:"Character 9",  imgs:[], available:false },
  { id:"char10", label:"Character 10", imgs:[], available:false },
  { id:"char11", label:"Character 11", imgs:[], available:false },
  { id:"char12", label:"Character 12", imgs:[], available:false },
];

// ── State ─────────────────────────────────────────────────────
let lg = {
  step: 'landing',          // landing | select | pin | create-outfit | create-name
  claimedIds: [],           // character ids already claimed this season
  selectedChar: null,       // the character object player clicked
  pin: '',                  // 4-digit pin entered
  isReturning: false,       // true if character already has a player
  existingPlayer: null,     // player doc if returning
  // creation state
  firstName: LG_FIRST_NAMES[0],
  lastName:  LG_LAST_NAMES[0],
  firstIdx:  0,
  lastIdx:   0,
  outfitIdx: 0,
};

// ── Init ──────────────────────────────────────────────────────
window.initLogin = async function() {
  // Wait for GameState to be available
  if (!window.GameState || !window.GameState.FirestoreDB) {
    setTimeout(() => window.initLogin(), 50);
    return;
  }
  // Load claimed characters from Firebase
  try {
    const players = await window.GameState.FirestoreDB.getAllPlayers();
    lg.claimedIds = players
      .filter(p => p.characterId && p.pin)
      .map(p => p.characterId);
  } catch(e) {
    lg.claimedIds = [];
  }
  lg.step = 'landing';
  lgRender();
};

function lgRender() {
  const el = document.getElementById('screen-login');
  if (!el) return;
  // Ensure this screen is active
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  if      (lg.step === 'landing')       lgRenderLanding(el);
  else if (lg.step === 'select')        lgRenderSelect(el);
  else if (lg.step === 'pin')           lgRenderPin(el);
  else if (lg.step === 'create-name')   lgRenderCreateName(el);
  else if (lg.step === 'create-outfit') lgRenderCreateOutfit(el);
}

// ── Landing ───────────────────────────────────────────────────
function lgRenderLanding(el) {
  el.innerHTML = `
    <div class="lg-landing">
      <div class="lg-landing-inner">
        <h1 class="lg-title">CAPITAL HEIGHTS</h1>
        <p class="lg-subtitle">Financial Literacy Simulator</p>
        <button class="lg-enter-btn" onclick="lgGoSelect()">Enter Capital Heights →</button>
        <button class="lg-admin-link" onclick="showScreen('screen-admin-login')">Admin</button>
      </div>
    </div>`;
}
window.lgGoSelect = async function() {
  // Refresh claimed list
  try {
    const players = await window.GameState.FirestoreDB.getAllPlayers();
    lg.claimedIds = players.filter(p => p.characterId && p.pin).map(p => p.characterId);
  } catch(e) {}
  lg.step = 'select';
  lgRender();
};

// ── Character Select ──────────────────────────────────────────
function lgRenderSelect(el) {
  el.innerHTML = `
    <div class="lg-select-wrap">
      <div class="lg-select-header">
        <h2 class="lg-select-title">Choose Your Character</h2>
        <p class="lg-select-sub">Available characters are shown below. Locked characters have been claimed.</p>
      </div>
      <div class="lg-char-grid">
        ${LG_CHARACTERS.map(c => {
          const claimed = lg.claimedIds.includes(c.id);
          const locked  = !c.available;
          if (claimed) return ''; // hide claimed entirely
          return `
            <div class="lg-char-slot ${locked ? 'locked' : 'open'}"
                 ${!locked ? `onclick="lgSelectChar('${c.id}')"` : ''}>
              ${c.imgs.length
                ? `<img src="${c.imgs[0]}" class="lg-char-img" alt="${c.label}"/>`
                : `<div class="lg-char-silhouette"></div>`}
              <div class="lg-char-label">${locked ? '🔒 LOCKED' : c.label}</div>
            </div>`;
        }).join('')}
      </div>
      <button class="lg-back-btn" onclick="lg.step='landing';lgRender()">← Back</button>
    </div>`;
}

window.lgSelectChar = function(id) {
  lg.selectedChar = LG_CHARACTERS.find(c => c.id === id);
  lg.pin = '';
  lg.step = 'pin';
  lgRender();
};

// ── PIN Entry ─────────────────────────────────────────────────
function lgRenderPin(el) {
  const c = lg.selectedChar;
  el.innerHTML = `
    <div class="lg-pin-wrap">
      <div class="lg-pin-box">
        ${c.imgs.length
          ? `<img src="${c.imgs[0]}" class="lg-pin-char-img"/>`
          : `<div class="lg-pin-char-silhouette"></div>`}
        <h2 class="lg-pin-title">Enter Your PIN</h2>
        <p class="lg-pin-sub">New player? Choose a 4-digit PIN you'll remember.<br>Returning? Enter your existing PIN.</p>
        <div class="lg-pin-dots">
          ${[0,1,2,3].map(i => `<div class="lg-pin-dot ${lg.pin.length > i ? 'filled' : ''}"></div>`).join('')}
        </div>
        <div class="lg-numpad">
          ${[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map(k => `
            <button class="lg-numpad-btn ${k===''?'invisible':''}"
              ${k !== '' ? `onclick="lgPinKey('${k}')"` : ''}>
              ${k}
            </button>`).join('')}
        </div>
        <p id="lg-pin-error" class="lg-pin-error" style="display:none"></p>
        <button class="lg-back-btn" onclick="lg.step='select';lgRender()">← Back</button>
      </div>
    </div>`;
}

window.lgPinKey = async function(key) {
  if (key === '⌫') {
    lg.pin = lg.pin.slice(0, -1);
    lgRender();
    return;
  }
  if (lg.pin.length >= 4) return;
  lg.pin += key;
  lgRender();

  if (lg.pin.length === 4) {
    await lgSubmitPin();
  }
};

async function lgSubmitPin() {
  const errEl = document.getElementById('lg-pin-error');
  try {
    // Check if this character already has a player
    const players = await window.GameState.FirestoreDB.getAllPlayers();
    const existing = players.find(p => p.characterId === lg.selectedChar.id);

    if (existing) {
      // Returning player — verify PIN
      if (existing.pin !== lg.pin) {
        if (errEl) { errEl.textContent = 'Incorrect PIN. Try again.'; errEl.style.display = 'block'; }
        lg.pin = '';
        setTimeout(() => lgRender(), 800);
        return;
      }
      // PIN correct — check if still available (race condition check)
      lg.existingPlayer = existing;
      lg.isReturning = true;
      await lgResumePlayer(existing);
    } else {
      // New player — check character not claimed since page loaded
      const freshClaimed = players.filter(p => p.characterId && p.pin).map(p => p.characterId);
      if (freshClaimed.includes(lg.selectedChar.id)) {
        if (errEl) { errEl.textContent = 'This character was just claimed by someone else. Please go back and choose another.'; errEl.style.display = 'block'; }
        setTimeout(() => { lg.step = 'select'; lgRender(); }, 2500);
        return;
      }
      // New player — go to name creation
      lg.isReturning = false;
      lg.firstIdx = Math.floor(Math.random() * LG_FIRST_NAMES.length);
      lg.lastIdx  = Math.floor(Math.random() * LG_LAST_NAMES.length);
      lg.outfitIdx = 0;
      lg.step = 'create-name';
      lgRender();
    }
  } catch(e) {
    if (errEl) { errEl.textContent = 'Connection error. Try again.'; errEl.style.display = 'block'; }
    console.error(e);
  }
}

// ── Resume returning player ───────────────────────────────────
async function lgResumePlayer(player) {
  await window.GameState.FirestoreDB.advanceTime(player.uid);
  const fresh = await window.GameState.FirestoreDB.getPlayer(player.uid);
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
}

// ── Create — Name ─────────────────────────────────────────────
function lgRenderCreateName(el) {
  const c = lg.selectedChar;
  const firstName = LG_FIRST_NAMES[lg.firstIdx];
  const lastName  = LG_LAST_NAMES[lg.lastIdx];
  el.innerHTML = `
    <div class="lg-create-wrap">
      <div class="lg-create-box">
        <div class="lg-create-step">Step 1 of 2 — Choose Your Name</div>
        <h2 class="lg-create-name-display">${firstName} ${lastName}</h2>
        <div class="lg-name-row">
          <span class="lg-name-label">First Name</span>
          <div class="lg-name-carousel">
            <button class="lg-arrow" onclick="lgFirstPrev()">‹</button>
            <span class="lg-name-val">${firstName}</span>
            <button class="lg-arrow" onclick="lgFirstNext()">›</button>
          </div>
        </div>
        <div class="lg-name-row">
          <span class="lg-name-label">Last Name</span>
          <div class="lg-name-carousel">
            <button class="lg-arrow" onclick="lgLastPrev()">‹</button>
            <span class="lg-name-val">${lastName}</span>
            <button class="lg-arrow" onclick="lgLastNext()">›</button>
          </div>
        </div>
        <button class="lg-confirm-btn" onclick="lg.step='create-outfit';lgRender()">
          I'm ${firstName} ${lastName} →
        </button>
        <button class="lg-back-btn" onclick="lg.step='pin';lgRender()">← Back</button>
      </div>
    </div>`;
}
window.lgFirstPrev = () => { lg.firstIdx = (lg.firstIdx - 1 + LG_FIRST_NAMES.length) % LG_FIRST_NAMES.length; lgRender(); };
window.lgFirstNext = () => { lg.firstIdx = (lg.firstIdx + 1) % LG_FIRST_NAMES.length; lgRender(); };
window.lgLastPrev  = () => { lg.lastIdx  = (lg.lastIdx  - 1 + LG_LAST_NAMES.length)  % LG_LAST_NAMES.length;  lgRender(); };
window.lgLastNext  = () => { lg.lastIdx  = (lg.lastIdx  + 1) % LG_LAST_NAMES.length;  lgRender(); };

// ── Create — Outfit ───────────────────────────────────────────
function lgRenderCreateOutfit(el) {
  const c = lg.selectedChar;
  const outfits = c.imgs;
  const currentImg = outfits[lg.outfitIdx];
  const firstName = LG_FIRST_NAMES[lg.firstIdx];
  const lastName  = LG_LAST_NAMES[lg.lastIdx];
  el.innerHTML = `
    <div class="lg-create-wrap">
      <div class="lg-create-box">
        <div class="lg-create-step">Step 2 of 2 — Choose Your Outfit</div>
        <div class="lg-outfit-carousel">
          <button class="lg-arrow large" onclick="lgOutfitPrev()">‹</button>
          <div class="lg-outfit-display">
            <img src="${currentImg}" class="lg-outfit-img" alt="Outfit ${lg.outfitIdx + 1}"/>
            <div class="lg-outfit-dots">
              ${outfits.map((_,i) => `<span class="lg-dot ${i===lg.outfitIdx?'active':''}"></span>`).join('')}
            </div>
          </div>
          <button class="lg-arrow large" onclick="lgOutfitNext()">›</button>
        </div>
        <button class="lg-confirm-btn" onclick="lgCreatePlayer()">
          Enter Capital Heights as ${firstName} →
        </button>
        <button class="lg-back-btn" onclick="lg.step='create-name';lgRender()">← Back</button>
        <p id="lg-create-error" class="lg-pin-error" style="display:none"></p>
      </div>
    </div>`;
}
window.lgOutfitPrev = () => { const n = lg.selectedChar.imgs.length; lg.outfitIdx = (lg.outfitIdx - 1 + n) % n; lgRender(); };
window.lgOutfitNext = () => { const n = lg.selectedChar.imgs.length; lg.outfitIdx = (lg.outfitIdx + 1) % n; lgRender(); };

// ── Create Player in Firebase ─────────────────────────────────
window.lgCreatePlayer = async function() {
  const errEl = document.getElementById('lg-create-error');
  const firstName = LG_FIRST_NAMES[lg.firstIdx];
  const lastName  = LG_LAST_NAMES[lg.lastIdx];
  const c = lg.selectedChar;

  try {
    // Final race condition check
    const players = await window.GameState.FirestoreDB.getAllPlayers();
    const alreadyClaimed = players.find(p => p.characterId === c.id);
    if (alreadyClaimed) {
      if (errEl) { errEl.textContent = 'This character was claimed by someone else. Please go back and choose another.'; errEl.style.display = 'block'; }
      setTimeout(() => { lg.step = 'select'; lgRender(); }, 2500);
      return;
    }

    // Generate unique UID from character + name
    const uid = (c.id + '_' + firstName[0] + lastName).toLowerCase().replace(/[^a-z0-9_]/g,'');
    let player = await window.GameState.FirestoreDB.getPlayer(uid);
    if (!player) {
      player = await window.GameState.FirestoreDB.createPlayer(uid, firstName, lastName);
    }
    // Store PIN, character, outfit
    await window.GameState.FirestoreDB.updatePlayer(uid, {
      pin:         lg.pin,
      characterId: c.id,
      outfitIndex: lg.outfitIdx,
      characterName: firstName + ' ' + lastName,
    });
    player = await window.GameState.FirestoreDB.getPlayer(uid);
    window.GameState.player = player;
    showScreen('screen-onboarding');
    if (window.initOnboarding) window.initOnboarding(player);
  } catch(e) {
    if (errEl) { errEl.textContent = 'Error creating player: ' + e.message; errEl.style.display = 'block'; }
    console.error(e);
  }
};

// ── Self-boot — runs as soon as this module loads ────────────
// GameState and showScreen are set up in index.html before imports resolve,
// but we need to wait for the DOM to be ready.
(function boot() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.initLogin());
  } else {
    // Small timeout ensures GameState is fully wired from index.html
    setTimeout(() => window.initLogin(), 0);
  }
})();