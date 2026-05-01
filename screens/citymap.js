// ============================================================
// CAPITAL HEIGHTS — citymap.js
// Main map → click district → building carousel → enter
// ============================================================

const CM_DISTRICTS = [
  {
    id: 'commons',
    name: 'The Commons',
    color: '#4A8AC8',
    // Polygon points as percentages of map width/height
    poly: [{x:0,y:0},{x:42,y:0},{x:42,y:52},{x:0,y:52}],
    buildings: [
      { id:'medical',   name:'Capital Heights Medical Center', desc:'Visit the hospital or apply for health jobs', img:'assets/exteriors/capital_heights_medical_center.png', screen:'screen-location', location:'medical' },
      { id:'metro',     name:'Metro Market',                   desc:'Purchase groceries for the week',            img:'assets/exteriors/metro_market.png',                    screen:'screen-grocery',  location:'grocery' },
      { id:'coffee',    name:'Morning Ledger Coffee',          desc:'Grab a coffee and check your to-do list',    img:'assets/exteriors/morning_ledger_coffee.png',           screen:'screen-location', location:'coffee' },
      { id:'bakery',    name:'Heights Bakery',                 desc:'Pick up a meal or a snack',                  img:'assets/exteriors/heights_bakery.png',                  screen:'screen-location', location:'bakery' },
      { id:'gym',       name:'Iron District Gym',              desc:'Stay healthy or apply for fitness jobs',     img:'assets/exteriors/iron_district_gym.png',               screen:'screen-location', location:'gym' },
      { id:'office',    name:'Commons Office Building',        desc:'Apply for professional office jobs',         img:'assets/exteriors/commons_office_building.png',         screen:'screen-jobboard', location:'office' },
    ]
  },
  {
    id: 'oldtown',
    name: 'Old Town',
    color: '#A84AC8',
    poly: [{x:0,y:52},{x:42,y:52},{x:42,y:100},{x:0,y:100}],
    buildings: [
      { id:'grill',     name:'Capitol Grill',         desc:'Dine in or apply for restaurant jobs',       img:'assets/exteriors/capitol_grill.png',          screen:'screen-location', location:'grill' },
      { id:'bistro',    name:'Le Bistro Capital',     desc:'Upscale dining and hospitality jobs',        img:'assets/exteriors/le_bistro_capital.png',      screen:'screen-location', location:'bistro' },
      { id:'media',     name:'Old Town Media House',  desc:'Apply for media and communications jobs',    img:'assets/exteriors/old_town_media_house.png',   screen:'screen-jobboard', location:'media' },
      { id:'law',       name:'Old Town Law Office',   desc:'Apply for legal and pre-law jobs',           img:'assets/exteriors/old_town_law_office.png',    screen:'screen-jobboard', location:'law' },
      { id:'oldapts',   name:'Old Town Apartments',   desc:'Find a place to rent in Old Town',           img:'assets/exteriors/old_town_apartments.png',   screen:'screen-housing',  location:'oldapts' },
    ]
  },
  {
    id: 'crestwood',
    name: 'Crestwood',
    color: '#C8784A',
    poly: [{x:0,y:70},{x:20,y:70},{x:20,y:100},{x:0,y:100}],
    buildings: [
      { id:'realty',   name:'Crestwood Realty',       desc:'Browse homes for sale in Crestwood',        img:'assets/exteriors/crestwood_realty.png',       screen:'screen-housing',  location:'realty' },
      { id:'club',     name:'Crestwood Country Club', desc:'Apply for event and hospitality jobs',      img:'assets/exteriors/crestwood_country_club.png', screen:'screen-jobboard', location:'club' },
    ]
  },
  {
    id: 'financial',
    name: 'The Financial District',
    color: '#C8A84A',
    poly: [{x:42,y:0},{x:72,y:0},{x:72,y:65},{x:42,y:65}],
    buildings: [
      { id:'capital',  name:'Capital Tower',          desc:'Apply for finance and business jobs',       img:'assets/exteriors/capital_tower.png',           screen:'screen-jobboard', location:'capital' },
      { id:'global',   name:'Global Equity Tower',    desc:'Apply for economics and investment jobs',   img:'assets/exteriors/global_equity_tower.png',    screen:'screen-jobboard', location:'global' },
      { id:'bank',     name:'Siena Credit Union',     desc:'Manage your bank account',                  img:'assets/exteriors/siena_bank.png',              screen:'screen-banking',  location:'bank' },
      { id:'hotel',    name:'Financial District Hotel',desc:'Apply for hospitality and hotel jobs',     img:'assets/exteriors/financial_district_hotel.png',screen:'screen-jobboard', location:'hotel' },
    ]
  },
  {
    id: 'capitol',
    name: 'Capitol Square',
    color: '#4AC87A',
    poly: [{x:42,y:65},{x:72,y:65},{x:72,y:100},{x:42,y:100}],
    buildings: [
      { id:'fountain', name:'Central Fountain Plaza', desc:'The heart of Capital Heights',              img:'assets/exteriors/central_fountain_plaza.png',  screen:'screen-location', location:'plaza' },
      { id:'dmv',      name:'DMV',                    desc:'Register your vehicle or update your ID',  img:'assets/exteriors/dmv.png',                     screen:'screen-location', location:'dmv' },
      { id:'school',   name:'Capital Heights Public School', desc:'Apply for education jobs',          img:'assets/exteriors/capital_heights_public_school.png', screen:'screen-jobboard', location:'school' },
    ]
  },
  {
    id: 'eastbrook',
    name: 'Eastbrook',
    color: '#C84A4A',
    poly: [{x:72,y:50},{x:100,y:50},{x:100,y:100},{x:72,y:100}],
    buildings: [
      { id:'meridian', name:'Meridian Heights',       desc:'Upscale apartments available to rent',      img:'assets/exteriors/meridian_heights.png',        screen:'screen-housing',  location:'meridian' },
      { id:'fairfax',  name:'Fairfax Commons',        desc:'Mid-range apartments available to rent',    img:'assets/exteriors/fairfax_commons.png',         screen:'screen-housing',  location:'fairfax' },
      { id:'reston',   name:'Reston Flats',           desc:'Budget-friendly apartments to rent',        img:'assets/exteriors/reston_flats.png',            screen:'screen-housing',  location:'reston' },
    ]
  },
  {
    id: 'riverside',
    name: 'Riverside',
    color: '#4AC8C8',
    poly: [{x:72,y:0},{x:100,y:0},{x:100,y:50},{x:72,y:50}],
    buildings: [
      { id:'nova',     name:'Nova Park Residences',   desc:'Modern apartments along the river',         img:'assets/exteriors/nova_park_residences.png',    screen:'screen-housing',  location:'nova' },
      { id:'centennial',name:'Centennial Court',      desc:'Comfortable apartments to rent',            img:'assets/exteriors/centennial_court.png',        screen:'screen-housing',  location:'centennial' },
      { id:'annandale',name:'The Annandale',          desc:'Classic apartments in Riverside',           img:'assets/exteriors/the_annandale.png',           screen:'screen-housing',  location:'annandale' },
    ]
  },
];

// ── State ─────────────────────────────────────────────────────
let cm = {
  player: null,
  activeDistrict: null,
  carouselIndex: 0,
};

// ── Init ──────────────────────────────────────────────────────
window.initCityMap = function(player) {
  cm.player = player;
  cm.activeDistrict = null;
  cm.carouselIndex = 0;
  cmRender();
};

function cmRender() {
  const el = document.getElementById('screen-citymap');
  if (!el) return;
  el.innerHTML = `
    <div class="cm-wrap">
      ${cmTopBar()}
      <div class="cm-main">
        <div class="cm-map-container">
          <img src="assets/map/map_full_capital_heights.png" class="cm-map-img" id="cm-map-img"/>
          <svg class="cm-overlay" id="cm-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
            ${CM_DISTRICTS.map(d => `
              <polygon
                points="${d.poly.map(p=>`${p.x},${p.y}`).join(' ')}"
                fill="${d.color}"
                fill-opacity="${cm.activeDistrict?.id === d.id ? 0.35 : 0.12}"
                stroke="${d.color}"
                stroke-width="0.5"
                class="cm-zone ${cm.activeDistrict?.id === d.id ? 'active' : ''}"
                onclick="cmSelectDistrict('${d.id}')"
              />
              <text
                x="${d.poly.reduce((s,p)=>s+p.x,0)/d.poly.length}"
                y="${d.poly.reduce((s,p)=>s+p.y,0)/d.poly.length}"
                text-anchor="middle"
                dominant-baseline="middle"
                fill="white"
                font-size="3.2"
                font-weight="700"
                font-family="Segoe UI, sans-serif"
                pointer-events="none"
                opacity="0.9"
              >${d.name}</text>
            `).join('')}
          </svg>
        </div>
        ${cm.activeDistrict ? cmCarousel() : cmPrompt()}
      </div>
    </div>`;
}

function cmTopBar() {
  const p = cm.player;
  return `<div class="cm-topbar">
    <div class="cm-topbar-left">
      <span class="cm-city-name">Capital Heights</span>
      ${cm.activeDistrict ? `<span class="cm-district-name">→ ${cm.activeDistrict.name}</span>` : ''}
    </div>
    <div class="cm-topbar-right">
      <span class="cm-stat">💰 $${Number(p?.checkingBalance||0).toFixed(2)}</span>
      <span class="cm-stat">📅 Day ${p?.currentDay||1}</span>
      <button class="cm-logout" onclick="handleLogout()">Log Out</button>
    </div>
  </div>`;
}

function cmPrompt() {
  return `<div class="cm-prompt">
    <div class="cm-prompt-icon">🗺️</div>
    <div class="cm-prompt-text">Click a district to explore</div>
  </div>`;
}

function cmCarousel() {
  const d = cm.activeDistrict;
  const b = d.buildings[cm.carouselIndex];
  const total = d.buildings.length;

  return `<div class="cm-carousel">
    <div class="cm-carousel-header">
      <span class="cm-carousel-district">${d.name}</span>
      <button class="cm-carousel-close" onclick="cmCloseDistrict()">✕</button>
    </div>
    <div class="cm-carousel-main">
      <button class="cm-arrow left" onclick="cmCarouselPrev()" ${total <= 1 ? 'disabled' : ''}>‹</button>
      <div class="cm-building-display">
        <img src="${b.img}" class="cm-building-img" onerror="this.style.opacity='0.2'"/>
        <div class="cm-building-name">${b.name}</div>
        <div class="cm-building-desc">${b.desc}</div>
        <div class="cm-carousel-dots">
          ${d.buildings.map((_,i) => `<span class="cm-dot ${i===cm.carouselIndex?'active':''}"></span>`).join('')}
        </div>
      </div>
      <button class="cm-arrow right" onclick="cmCarouselNext()" ${total <= 1 ? 'disabled' : ''}>›</button>
    </div>
    <button class="cm-enter-btn" onclick="cmEnterBuilding()">Enter ${b.name} →</button>
  </div>`;
}

// ── Controls ──────────────────────────────────────────────────
window.cmSelectDistrict = function(id) {
  cm.activeDistrict = CM_DISTRICTS.find(d => d.id === id);
  cm.carouselIndex = 0;
  cmRender();
};

window.cmCloseDistrict = function() {
  cm.activeDistrict = null;
  cm.carouselIndex = 0;
  cmRender();
};

window.cmCarouselPrev = function() {
  const total = cm.activeDistrict.buildings.length;
  cm.carouselIndex = (cm.carouselIndex - 1 + total) % total;
  cmRender();
};

window.cmCarouselNext = function() {
  const total = cm.activeDistrict.buildings.length;
  cm.carouselIndex = (cm.carouselIndex + 1) % total;
  cmRender();
};

window.cmEnterBuilding = function() {
  const b = cm.activeDistrict.buildings[cm.carouselIndex];
  // Store current location on player state
  window.GameState.currentLocation = b.location;
  window.GameState.currentBuilding = b;
  showScreen(b.screen);
  // Call the screen's init if it exists
  const initFns = {
    'screen-banking':  window.initBanking,
    'screen-grocery':  window.initGrocery,
    'screen-housing':  window.initHousing,
    'screen-jobboard': window.initJobBoard,
    'screen-location': window.initLocation,
  };
  if (initFns[b.screen]) initFns[b.screen](cm.player, b);
};