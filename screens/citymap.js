// ============================================================
// CAPITAL HEIGHTS — citymap.js
// SVG polygon zones with CSS 3D lift + clipped map art
// ============================================================

const CM_DISTRICTS = [
  {
    id:'commons', name:'The Commons', color:'#4A8AC8',
    bg:'assets/districts/commons_bg.png',
    // SVG polygon as % of viewBox 0 0 100 100
    poly:'0,0 50,0 50,28 42,52 0,52',
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
    poly:'0,52 42,52 32,72 20,100 0,100',
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
    poly:'0,100 20,100 20,72 0,72',
    buildings:[
      {id:'realty', name:'Crestwood Realty',       desc:'Browse homes for sale in Crestwood',   img:'assets/exteriors/crestwood_realty.png',       screen:'screen-housing',  location:'realty'},
      {id:'club',   name:'Crestwood Country Club',  desc:'Apply for event and hospitality jobs', img:'assets/exteriors/crestwood_country_club.png', screen:'screen-jobboard', location:'club'},
    ]
  },
  {
    id:'financial', name:'The Financial District', color:'#C8A84A',
    bg:'assets/districts/financial_bg.png',
    poly:'50,0 72,0 72,28 80,55 72,65 42,52 50,28',
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
    poly:'32,72 42,52 72,65 80,55 80,100 20,100',
    buildings:[
      {id:'fountain', name:'Central Fountain Plaza',        desc:'The heart of Capital Heights',       img:'assets/exteriors/central_fountain_plaza.png',        screen:'screen-location', location:'plaza'},
      {id:'dmv',      name:'DMV',                          desc:'Register your vehicle or update ID', img:'assets/exteriors/dmv.png',                           screen:'screen-location', location:'dmv'},
      {id:'school',   name:'Capital Heights Public School', desc:'Apply for education jobs',           img:'assets/exteriors/capital_heights_public_school.png', screen:'screen-jobboard', location:'school'},
    ]
  },
  {
    id:'eastbrook', name:'Eastbrook', color:'#C84A4A',
    bg:'assets/districts/eastbrook_bg.png',
    poly:'80,55 100,45 100,100 80,100',
    buildings:[
      {id:'meridian',  name:'Meridian Heights', desc:'Upscale apartments available to rent',   img:'assets/exteriors/meridian_heights.png', screen:'screen-housing', location:'meridian'},
      {id:'fairfax',   name:'Fairfax Commons',  desc:'Mid-range apartments available to rent', img:'assets/exteriors/fairfax_commons.png',  screen:'screen-housing', location:'fairfax'},
      {id:'reston',    name:'Reston Flats',     desc:'Budget-friendly apartments to rent',     img:'assets/exteriors/reston_flats.png',     screen:'screen-housing', location:'reston'},
    ]
  },
  {
    id:'riverside', name:'Riverside', color:'#4AC8C8',
    bg:'assets/districts/riverside_bg.png',
    poly:'72,0 100,0 100,45 80,55 72,28',
    buildings:[
      {id:'nova',       name:'Nova Park Residences', desc:'Modern apartments along the river', img:'assets/exteriors/nova_park_residences.png', screen:'screen-housing', location:'nova'},
      {id:'centennial', name:'Centennial Court',     desc:'Comfortable apartments to rent',    img:'assets/exteriors/centennial_court.png',     screen:'screen-housing', location:'centennial'},
      {id:'annandale',  name:'The Annandale',        desc:'Classic apartments in Riverside',   img:'assets/exteriors/the_annandale.png',        screen:'screen-housing', location:'annandale'},
    ]
  },
];

// Expose to admin calibrator
window.CM_DISTRICTS = CM_DISTRICTS;

let cm = { player:null, view:'map', activeDistrict:null, carouselIdx:0 };

window.initCityMap = async function(player) {
  cm.player = player;
  cm.view = 'map';
  cm.activeDistrict = null;
  cm.carouselIdx = 0;

  // Load saved polygon coordinates from Firebase
  // If found, override the hardcoded defaults
  try {
    const saved = await window.GameState.FirestoreDB.loadDistrictPolygons();
    if (saved) {
      CM_DISTRICTS.forEach(d => {
        if (saved[d.id]) d.poly = saved[d.id];
      });
      window.CM_DISTRICTS = CM_DISTRICTS;
    }
  } catch(e) {}

  cmRender();
};

function cmRender() {
  const el = document.getElementById('screen-citymap');
  if (!el) return;
  if (cm.view === 'map') cmRenderMap(el);
  else cmRenderDistrict(el);
}

// ── MAP ────────────────────────────────────────────────────────
function cmRenderMap(el) {
  // Build unique clip-path IDs for each district
  const defs = CM_DISTRICTS.map(d =>
    `<clipPath id="clip-${d.id}" clipPathUnits="objectBoundingBox">
      <polygon points="${d.poly.split(' ').map(pt => {
        const [x,y] = pt.split(',');
        return `${(parseFloat(x)/100).toFixed(4)},${(parseFloat(y)/100).toFixed(4)}`;
      }).join(' ')}"/>
    </clipPath>`
  ).join('');

  el.innerHTML = `
    <div class="cm-map-root">
      <!-- Hidden SVG just for clip-path definitions -->
      <svg style="position:absolute;width:0;height:0;overflow:hidden;">
        <defs>${defs}</defs>
      </svg>

      <!-- Base map — always visible underneath -->
      <img src="assets/map/map_full_capital_heights.png" class="cm-base-map" draggable="false"/>

      <!-- One lifting layer per district:
           - The image is the FULL map, clipped to the district polygon
           - This way edges are perfectly clean (no rough cuts)
           - The whole clipped piece lifts on hover -->
      ${CM_DISTRICTS.map(d => `
        <div class="cm-district-layer" id="layer-${d.id}"
          style="--district-color:${d.color};"
          onmouseenter="cmHover('${d.id}')"
          onmouseleave="cmUnhover()"
          onclick="cmEnterDistrict('${d.id}')">
          <img src="assets/map/map_full_capital_heights.png"
            class="cm-layer-img"
            style="clip-path:url(#clip-${d.id});"
            draggable="false"/>
          <!-- Invisible SVG polygon as precise hit zone -->
          <svg class="cm-hit-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="${d.poly}" fill="transparent"/>
          </svg>
        </div>
      `).join('')}

      <!-- District name bar -->
      <div class="cm-name-bar" id="cm-name-bar">
        <span id="cm-name-text"></span>
      </div>
    </div>`;
}

// ── Hover ──────────────────────────────────────────────────────
window.cmHover = function(id) {
  const d = CM_DISTRICTS.find(d => d.id === id);

  // Lift this district
  const layer = document.getElementById(`layer-${id}`);
  if (layer) layer.classList.add('lifted');

  // Dim all others
  CM_DISTRICTS.forEach(other => {
    if (other.id !== id) {
      const el = document.getElementById(`layer-${other.id}`);
      if (el) el.classList.add('dimmed');
    }
  });

  // Show name
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
    const el = document.getElementById(`layer-${d.id}`);
    if (el) { el.classList.remove('lifted'); el.classList.remove('dimmed'); }
  });
  const bar = document.getElementById('cm-name-bar');
  if (bar) bar.classList.remove('visible');
};

// ── Enter district ─────────────────────────────────────────────
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

// ── District screen ────────────────────────────────────────────
function cmRenderDistrict(el) {
  const d = cm.activeDistrict;
  const b = d.buildings[cm.carouselIdx];
  const total = d.buildings.length;
  el.innerHTML = `
    <div class="cm-district-wrap" style="background-image:url('${d.bg}');">
      <div class="cm-district-overlay"></div>
      <div class="cm-district-ui">
        <div class="cm-district-carousel">
          <button class="cm-big-arrow" onclick="cmPrev()" ${total<=1?'disabled':''}>‹</button>
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
            <button class="cm-district-enter-btn" onclick="cmEnterBuilding()">ENTER</button>
          </div>
          <button class="cm-big-arrow" onclick="cmNext()" ${total<=1?'disabled':''}>›</button>
        </div>
        <button class="cm-back-map" onclick="cmBackToMap()">← Back to Map</button>
      </div>
    </div>`;
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

window.cmPrev = () => { const n=cm.activeDistrict.buildings.length; cm.carouselIdx=(cm.carouselIdx-1+n)%n; cmRender(); };
window.cmNext = () => { const n=cm.activeDistrict.buildings.length; cm.carouselIdx=(cm.carouselIdx+1)%n; cmRender(); };

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