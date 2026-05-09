// ============================================================
// CAPITAL HEIGHTS — citymap.js
// Placeholder SVG map — fully interactive, no external assets
// ============================================================

const CM_DISTRICTS = [
  {
    id:'commons', name:'The Commons', color:'#4A8AC8',
    bg:'assets/districts/commons_bg.png',
    buildings:[
      {id:'medical', name:'Capital Heights Medical Center', desc:'Visit the hospital or apply for health jobs',  img:'assets/exteriors/capital_heights_medical_center.png', screen:'screen-location', location:'medical'},
      {id:'coffee',  name:'Morning Ledger Coffee',          desc:'Grab a coffee and check your to-do list',      img:'assets/exteriors/morning_ledger_coffee.png',           screen:'screen-location', location:'coffee'},
      {id:'bakery',  name:'Heights Bakery',                 desc:'Pick up a meal or a snack',                    img:'assets/exteriors/heights_bakery.png',                  screen:'screen-location', location:'bakery'},
      {id:'office',  name:'Commons Office Building',        desc:'Apply for professional office jobs',            img:'assets/exteriors/commons_office_building.png',         screen:'screen-jobboard', location:'office'},
      {id:'gym',     name:'Iron District Gym',              desc:'Stay healthy or apply for fitness jobs',        img:'assets/exteriors/iron_district_gym.png',               screen:'screen-location', location:'gym'},
      {id:'metro',   name:'Metro Market',                   desc:'Purchase groceries for the week',              img:'assets/exteriors/metro_market.png',                    screen:'screen-grocery',  location:'grocery'},
    ]
  },
  {
    id:'oldtown', name:'Old Town', color:'#A84AC8',
    bg:'assets/districts/oldtown_bg.png',
    buildings:[
      {id:'grill',   name:'Capitol Grill',        desc:'Dine in or apply for restaurant jobs',   img:'assets/exteriors/capitol_grill.png',        screen:'screen-location', location:'grill'},
      {id:'bistro',  name:'Le Bistro Capital',    desc:'Upscale dining and hospitality jobs',     img:'assets/exteriors/le_bistro_capital.png',    screen:'screen-location', location:'bistro'},
      {id:'media',   name:'Old Town Media House', desc:'Apply for media and communications jobs', img:'assets/exteriors/old_town_media_house.png', screen:'screen-jobboard', location:'media'},
      {id:'law',     name:'Old Town Law Office',  desc:'Apply for legal and pre-law jobs',        img:'assets/exteriors/old_town_law_office.png',  screen:'screen-jobboard', location:'law'},
      {id:'oldapts', name:'Old Town Apartments',  desc:'Find a place to rent in Old Town',        img:'assets/exteriors/old_town_apartments.png', screen:'screen-housing',  location:'oldapts'},
    ]
  },
  {
    id:'crestwood', name:'Crestwood', color:'#C8784A',
    bg:'assets/districts/crestwood_bg.png',
    buildings:[
      {id:'realty', name:'Crestwood Realty',       desc:'Browse homes for sale in Crestwood',   img:'assets/exteriors/crestwood_realty.png',       screen:'screen-housing',  location:'realty'},
      {id:'club',   name:'Crestwood Country Club',  desc:'Apply for event and hospitality jobs', img:'assets/exteriors/crestwood_country_club.png', screen:'screen-jobboard', location:'club'},
    ]
  },
  {
    id:'financial', name:'The Financial District', color:'#C8A84A',
    bg:'assets/districts/financial_bg.png',
    buildings:[
      {id:'capital', name:'Capital Tower',            desc:'Apply for finance and business jobs',    img:'assets/exteriors/capital_tower.png',            screen:'screen-jobboard', location:'capital'},
      {id:'global',  name:'Global Equity Tower',      desc:'Apply for economics and investment jobs', img:'assets/exteriors/global_equity_tower.png',     screen:'screen-jobboard', location:'global'},
      {id:'bank',    name:'Siena Credit Union',       desc:'Manage your bank account',               img:'assets/exteriors/siena_bank.png',               screen:'screen-banking',  location:'bank'},
      {id:'hotel',   name:'Financial District Hotel', desc:'Apply for hospitality and hotel jobs',   img:'assets/exteriors/financial_district_hotel.png', screen:'screen-jobboard', location:'hotel'},
    ]
  },
  {
    id:'capitol', name:'Capitol Square', color:'#4AC87A',
    bg:'assets/districts/capitol_bg.png',
    buildings:[
      {id:'fountain', name:'Central Fountain Plaza',        desc:'The heart of Capital Heights',       img:'assets/exteriors/central_fountain_plaza.png',        screen:'screen-location', location:'plaza'},
      {id:'dmv',      name:'DMV',                          desc:'Register your vehicle or update ID', img:'assets/exteriors/dmv.png',                           screen:'screen-location', location:'dmv'},
      {id:'school',   name:'Capital Heights Public School', desc:'Apply for education jobs',           img:'assets/exteriors/capital_heights_public_school.png', screen:'screen-jobboard', location:'school'},
    ]
  },
  {
    id:'eastbrook', name:'Eastbrook', color:'#C84A4A',
    bg:'assets/districts/eastbrook_bg.png',
    buildings:[
      {id:'meridian',  name:'Meridian Heights', desc:'Upscale apartments available to rent',   img:'assets/exteriors/meridian_heights.png', screen:'screen-housing', location:'meridian'},
      {id:'fairfax',   name:'Fairfax Commons',  desc:'Mid-range apartments available to rent', img:'assets/exteriors/fairfax_commons.png',  screen:'screen-housing', location:'fairfax'},
      {id:'reston',    name:'Reston Flats',     desc:'Budget-friendly apartments to rent',     img:'assets/exteriors/reston_flats.png',     screen:'screen-housing', location:'reston'},
    ]
  },
  {
    id:'riverside', name:'Riverside', color:'#4AC8C8',
    bg:'assets/districts/riverside_bg.png',
    buildings:[
      {id:'nova',       name:'Nova Park Residences', desc:'Modern apartments along the river', img:'assets/exteriors/nova_park_residences.png', screen:'screen-housing', location:'nova'},
      {id:'centennial', name:'Centennial Court',     desc:'Comfortable apartments to rent',    img:'assets/exteriors/centennial_court.png',     screen:'screen-housing', location:'centennial'},
      {id:'annandale',  name:'The Annandale',        desc:'Classic apartments in Riverside',   img:'assets/exteriors/the_annandale.png',        screen:'screen-housing', location:'annandale'},
    ]
  },
];

window.CM_DISTRICTS = CM_DISTRICTS;

// Placeholder SVG layout — clean geometric map
// viewBox: 0 0 1000 620
const CM_PLACEHOLDER = {
  viewBox: '0 0 1000 620',
  river: 'M 480,0 C 470,80 460,120 450,180 C 440,240 430,280 420,340 C 410,400 400,450 390,520 C 380,570 370,600 360,620',
  districts: {
    commons:   { points: '0,0 420,0 415,50 405,120 395,180 380,240 0,240',            label: {x:190, y:120} },
    financial: { points: '420,0 1000,0 1000,280 680,280 650,240 630,180 615,120 430,80 415,50', label: {x:720, y:130} },
    oldtown:   { points: '0,240 380,240 365,320 340,400 310,460 270,520 0,520',       label: {x:170, y:370} },
    capitol:   { points: '390,520 420,340 430,280 680,280 700,360 700,520 700,620 360,620', label: {x:560, y:480} },
    eastbrook: { points: '700,280 1000,280 1000,620 700,620 700,520 700,360',         label: {x:850, y:450} },
    riverside: { points: '680,280 1000,280 1000,0 650,0 630,80 620,150 650,240',      label: {x:840, y:130} },
    crestwood: { points: '0,520 270,520 240,560 200,590 140,610 0,620',               label: {x:120, y:575} },
  }
};

let cm = { player:null, view:'map', activeDistrict:null, carouselIdx:0 };

window.initCityMap = function(player) {
  cm.player = player;
  cm.view = 'map';
  cm.activeDistrict = null;
  cm.carouselIdx = 0;
  cmRender();
};

function cmRender() {
  const el = document.getElementById('screen-citymap');
  if (!el) return;
  if (cm.view === 'map') cmRenderMap(el);
  else cmRenderDistrict(el);
}

// ── PLACEHOLDER MAP ───────────────────────────────────────────
function cmRenderMap(el) {
  const p = CM_PLACEHOLDER;

  el.innerHTML = `
    <div class="cm-wrap">
      <svg class="cm-svg-map" viewBox="${p.viewBox}" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="district-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="rgba(0,0,0,0.5)"/>
          </filter>
          <filter id="district-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <!-- Background -->
        <rect width="1000" height="620" fill="#F0E8D0"/>

        <!-- Grid lines for city feel -->
        ${Array.from({length:20},(_,i)=>`<line x1="${i*55}" y1="0" x2="${i*55}" y2="620" stroke="#DDD0B0" stroke-width="0.5"/>`).join('')}
        ${Array.from({length:12},(_,i)=>`<line x1="0" y1="${i*55}" x2="1000" y2="${i*55}" stroke="#DDD0B0" stroke-width="0.5"/>`).join('')}

        <!-- District shapes -->
        ${CM_DISTRICTS.map(d => {
          const pd = p.districts[d.id];
          if (!pd) return '';
          return `<g class="cm-district-hit" id="cm-g-${d.id}" data-id="${d.id}">
            <polygon
              id="cm-poly-${d.id}"
              points="${pd.points}"
              fill="${d.color}"
              fill-opacity="0.25"
              stroke="${d.color}"
              stroke-width="2.5"
              stroke-opacity="0.7"
              stroke-linejoin="round"/>
          </g>`;
        }).join('')}

        <!-- River -->
        <path d="${p.river}" fill="none" stroke="#6AB4D4" stroke-width="18"
          stroke-linecap="round" stroke-opacity="0.7"/>
        <path d="${p.river}" fill="none" stroke="#8ACCE4" stroke-width="10"
          stroke-linecap="round" stroke-opacity="0.5"/>

        <!-- District labels -->
        ${CM_DISTRICTS.map(d => {
          const pd = p.districts[d.id];
          if (!pd) return '';
          return `<text
            x="${pd.label.x}" y="${pd.label.y}"
            text-anchor="middle" dominant-baseline="middle"
            font-family="Cinzel, serif"
            font-size="${d.id === 'financial' ? '13' : d.id === 'crestwood' ? '9' : '11'}"
            font-weight="700"
            fill="${d.color}"
            paint-order="stroke"
            stroke="#F0E8D0"
            stroke-width="3"
            pointer-events="none"
            opacity="0.9">${d.name}</text>`;
        }).join('')}

        <!-- City title -->
        <text x="500" y="305" text-anchor="middle"
          font-family="Cinzel, serif" font-size="11" font-weight="700"
          fill="#8A7458" opacity="0.6" pointer-events="none">CAPITAL HEIGHTS</text>
      </svg>

      <!-- Name bar -->
      <div class="cm-name-bar" id="cm-name-bar">
        <span id="cm-name-text"></span>
      </div>
    </div>`;

  // Attach events — no inline handlers (CSP)
  CM_DISTRICTS.forEach(d => {
    const g = document.getElementById('cm-g-' + d.id);
    if (!g) return;
    g.addEventListener('mouseenter', () => cmHover(d.id));
    g.addEventListener('mouseleave', () => cmUnhover());
    g.addEventListener('click', () => cmEnterDistrict(d.id));
  });
}

// ── HOVER ─────────────────────────────────────────────────────
window.cmHover = function(id) {
  const d = CM_DISTRICTS.find(d => d.id === id);
  CM_DISTRICTS.forEach(other => {
    const g    = document.getElementById('cm-g-' + other.id);
    const poly = document.getElementById('cm-poly-' + other.id);
    if (!g || !poly) return;
    if (other.id === id) {
      g.setAttribute('transform', 'translate(0,-12)');
      g.style.filter = 'url(#district-shadow)';
      poly.setAttribute('fill-opacity', '0.6');
      poly.setAttribute('stroke-opacity', '1');
      poly.setAttribute('stroke-width', '3');
    } else {
      g.setAttribute('transform', '');
      g.style.filter = '';
      poly.setAttribute('fill-opacity', '0.08');
      poly.setAttribute('stroke-opacity', '0.2');
      poly.setAttribute('stroke-width', '1.5');
    }
  });
  const bar = document.getElementById('cm-name-bar');
  const txt = document.getElementById('cm-name-text');
  if (bar && txt) {
    txt.textContent = d.name;
    txt.style.color = d.color;
    bar.classList.add('visible');
  }
};

window.cmUnhover = function() {
  CM_DISTRICTS.forEach(d => {
    const g    = document.getElementById('cm-g-' + d.id);
    const poly = document.getElementById('cm-poly-' + d.id);
    if (g)    { g.setAttribute('transform', ''); g.style.filter = ''; }
    if (poly) {
      poly.setAttribute('fill-opacity', '0.25');
      poly.setAttribute('stroke-opacity', '0.7');
      poly.setAttribute('stroke-width', '2.5');
    }
  });
  const bar = document.getElementById('cm-name-bar');
  if (bar) bar.classList.remove('visible');
};

// ── ENTER DISTRICT ────────────────────────────────────────────
window.cmEnterDistrict = function(id) {
  cm.activeDistrict = CM_DISTRICTS.find(d => d.id === id);
  cm.carouselIdx = 0;
  cm.view = 'district';
  const fade = document.createElement('div');
  fade.style.cssText = 'position:fixed;inset:0;background:#2A1F0E;opacity:0;z-index:9990;transition:opacity 0.4s ease;pointer-events:all;';
  document.body.appendChild(fade);
  requestAnimationFrame(() => {
    fade.style.opacity = '1';
    setTimeout(() => {
      cmRender();
      requestAnimationFrame(() => {
        fade.style.opacity = '0';
        setTimeout(() => fade.remove(), 400);
      });
    }, 400);
  });
};

// ── DISTRICT SCREEN ───────────────────────────────────────────
function cmRenderDistrict(el) {
  const d = cm.activeDistrict;
  const b = d.buildings[cm.carouselIdx];
  const total = d.buildings.length;

  el.innerHTML = `
    <div class="cm-district-wrap" style="background-image:url('${d.bg}');">
      <div class="cm-district-overlay"></div>
      <div class="cm-district-ui">
        <div class="cm-district-carousel">
          <button class="cm-big-arrow" id="cm-prev-btn" ${total<=1?'disabled':''}>‹</button>
          <div class="cm-district-building">
            ${b.img
              ? `<img src="${b.img}" class="cm-district-building-img"
                  onerror="this.outerHTML='<div class=cm-building-placeholder>🏗️<span>Coming Soon</span></div>'"
                  alt="${b.name}"/>`
              : `<div class="cm-building-placeholder">🏗️<span>Coming Soon</span></div>`}
            <div class="cm-district-building-name">${b.name}</div>
            <div class="cm-district-building-desc">${b.desc}</div>
            <div class="cm-district-dots">
              ${d.buildings.map((_,i) => `<span class="cm-dot ${i===cm.carouselIdx?'active':''}"></span>`).join('')}
            </div>
            <button class="cm-district-enter-btn" id="cm-enter-btn">ENTER</button>
          </div>
          <button class="cm-big-arrow" id="cm-next-btn" ${total<=1?'disabled':''}>›</button>
        </div>
        <button class="cm-back-map" id="cm-back-btn">← Back to Map</button>
      </div>
    </div>`;

  // Attach events — no inline handlers
  document.getElementById('cm-prev-btn').addEventListener('click', cmPrev);
  document.getElementById('cm-next-btn').addEventListener('click', cmNext);
  document.getElementById('cm-enter-btn').addEventListener('click', cmEnterBuilding);
  document.getElementById('cm-back-btn').addEventListener('click', cmBackToMap);
}

window.cmBackToMap = function() {
  const fade = document.createElement('div');
  fade.style.cssText = 'position:fixed;inset:0;background:#2A1F0E;opacity:0;z-index:9990;transition:opacity 0.4s ease;pointer-events:all;';
  document.body.appendChild(fade);
  requestAnimationFrame(() => {
    fade.style.opacity = '1';
    setTimeout(() => {
      cm.view = 'map'; cm.activeDistrict = null;
      cmRender();
      requestAnimationFrame(() => {
        fade.style.opacity = '0';
        setTimeout(() => fade.remove(), 400);
      });
    }, 400);
  });
};

function cmPrev() { const n=cm.activeDistrict.buildings.length; cm.carouselIdx=(cm.carouselIdx-1+n)%n; cmRender(); }
function cmNext() { const n=cm.activeDistrict.buildings.length; cm.carouselIdx=(cm.carouselIdx+1)%n; cmRender(); }

window.cmEnterBuilding = function() {
  const b = cm.activeDistrict.buildings[cm.carouselIdx];
  window.GameState.currentLocation = b.location;
  window.GameState.currentBuilding = b;
  showScreen(b.screen);
  const inits = {
    'screen-banking':  window.initBanking,
    'screen-grocery':  window.initGrocery,
    'screen-housing':  window.initHousing,
    'screen-jobboard': window.initJobBoard,
    'screen-location': window.initLocation,
  };
  if (inits[b.screen]) inits[b.screen](cm.player, b);
};