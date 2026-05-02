// ============================================================
// CAPITAL HEIGHTS — citymap.js
// SVG polygon zones with CSS 3D lift + clipped map art
// ============================================================

const CM_DISTRICTS = [
  {
    id:'commons', name:'The Commons', color:'#4A8AC8',
    bg:'assets/districts/commons_bg.png',
    // SVG polygon as % of viewBox 0 0 100 100
    poly:'0.0,0.0 70.9,0.0 72.4,0.7 68.7,12.9 48.8,49.3 48.1,50.2 47.5,50.6 47.1,50.8 23.5,53.1 4.1,52.6 0.1,52.3',
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
    poly:'0.0,23.8 46.8,38.6 47.1,38.8 47.7,39.6 48.0,40.4 48.1,51.8 47.8,54.4 46.8,59.0 46.0,60.6 44.9,62.3 41.3,65.9 31.6,74.8 29.7,74.0 25.8,71.5 23.9,70.0 23.4,69.6 22.0,67.8 20.7,65.9 19.4,64.0 0.1,25.0',
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
    poly:'18.2,50.3 32.6,75.2 33.0,76.1 33.1,76.8 31.4,99.7 30.7,99.9 5.8,99.9 0.3,99.7 0.2,96.7 0.0,78.0 0.0,59.8 0.1,54.1 0.3,53.9 4.5,51.3 5.3,51.1 9.7,50.8',
    buildings:[
      {id:'realty', name:'Crestwood Realty',       desc:'Browse homes for sale in Crestwood',   img:'assets/exteriors/crestwood_realty.png',       screen:'screen-housing',  location:'realty'},
      {id:'club',   name:'Crestwood Country Club',  desc:'Apply for event and hospitality jobs', img:'assets/exteriors/crestwood_country_club.png', screen:'screen-jobboard', location:'club'},
    ]
  },
  {
    id:'financial', name:'The Financial District', color:'#C8A84A',
    bg:'assets/districts/financial_bg.png',
    poly:'73.1,0.0 75.9,0.1 76.2,1.3 76.6,32.7 76.7,57.8 76.6,65.9 76.3,67.5 75.8,67.6 50.1,68.2 49.1,68.0 48.8,67.5 48.9,66.2 52.0,34.6 52.5,31.3 54.4,24.5 55.6,21.6 56.6,20.2',
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
    poly:'61.2,66.3 65.5,66.4 74.6,67.5 75.3,68.5 75.8,69.7 76.1,72.3 76.8,99.0 76.4,99.8 75.4,99.9 41.6,99.9 37.1,99.8 37.0,92.1 37.4,87.6 38.2,82.0 38.4,80.7 39.5,76.8 48.9,67.7 50.1,67.5',
    buildings:[
      {id:'fountain', name:'Central Fountain Plaza',        desc:'The heart of Capital Heights',       img:'assets/exteriors/central_fountain_plaza.png',        screen:'screen-location', location:'plaza'},
      {id:'dmv',      name:'DMV',                          desc:'Register your vehicle or update ID', img:'assets/exteriors/dmv.png',                           screen:'screen-location', location:'dmv'},
      {id:'school',   name:'Capital Heights Public School', desc:'Apply for education jobs',           img:'assets/exteriors/capital_heights_public_school.png', screen:'screen-jobboard', location:'school'},
    ]
  },
  {
    id:'eastbrook', name:'Eastbrook', color:'#C84A4A',
    bg:'assets/districts/eastbrook_bg.png',
    poly:'92.0,52.8 99.1,53.2 99.3,53.5 99.8,54.1 99.9,68.3 99.9,97.3 99.9,99.0 97.5,99.9 76.9,99.9 76.6,98.2 76.1,54.5 76.7,53.5 83.4,53.1',
    buildings:[
      {id:'meridian',  name:'Meridian Heights', desc:'Upscale apartments available to rent',   img:'assets/exteriors/meridian_heights.png', screen:'screen-housing', location:'meridian'},
      {id:'fairfax',   name:'Fairfax Commons',  desc:'Mid-range apartments available to rent', img:'assets/exteriors/fairfax_commons.png',  screen:'screen-housing', location:'fairfax'},
      {id:'reston',    name:'Reston Flats',     desc:'Budget-friendly apartments to rent',     img:'assets/exteriors/reston_flats.png',     screen:'screen-housing', location:'reston'},
    ]
  },
  {
    id:'riverside', name:'Riverside', color:'#4AC8C8',
    bg:'assets/districts/riverside_bg.png',
    poly:'75.7,0.0 99.6,0.0 99.8,3.7 99.9,8.0 99.9,19.2 99.9,54.0 93.8,54.6 88.8,54.3 79.1,53.6 76.7,52.5 76.4,50.8 76.0,32.2',
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

// Load saved polygons from Firebase as soon as GameState is ready
async function cmLoadSavedPolygons() {
  try {
    if (!window.GameState || !window.GameState.FirestoreDB) return;
    const saved = await window.GameState.FirestoreDB.loadDistrictPolygons();
    if (saved) {
      let count = 0;
      CM_DISTRICTS.forEach(d => {
        if (saved[d.id]) { d.poly = saved[d.id]; count++; }
      });
      window.CM_DISTRICTS = CM_DISTRICTS;
      console.log(`Loaded ${count} saved district polygons from Firebase`);
    }
  } catch(e) {
    console.warn('Could not load district polygons:', e.message);
  }
}

// Try loading on module init (may retry once GameState is ready)
(function tryLoad() {
  if (window.GameState && window.GameState.FirestoreDB) {
    cmLoadSavedPolygons();
  } else {
    setTimeout(tryLoad, 200);
  }
})();

window.initCityMap = async function(player) {
  cm.player = player;
  cm.view = 'map';
  cm.activeDistrict = null;
  cm.carouselIdx = 0;
  // Reload polygons in case they changed since page load
  await cmLoadSavedPolygons();
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
  // Build clip paths AND feather masks in defs
  const defs = CM_DISTRICTS.map(d => {
    const pctPts = d.poly.split(' ').map(pt => {
      const [x,y] = pt.split(',');
      return `${(parseFloat(x)/100).toFixed(4)},${(parseFloat(y)/100).toFixed(4)}`;
    }).join(' ');
    return `
      <!-- Hard clip for the image -->
      <clipPath id="clip-${d.id}" clipPathUnits="objectBoundingBox">
        <polygon points="${pctPts}"/>
      </clipPath>
      <!-- Feather mask: polygon filled white with a blur filter = soft edges -->
      <mask id="mask-${d.id}" maskUnits="objectBoundingBox" x="-5%" y="-5%" width="110%" height="110%">
        <polygon points="${pctPts}" fill="white" filter="url(#feather)"/>
      </mask>`;
  }).join('');

  el.innerHTML = `
    <div class="cm-map-root">
      <svg style="position:absolute;width:0;height:0;overflow:hidden;">
        <defs>
          <!-- Feather blur filter — softens polygon edges -->
          <filter id="feather" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="0.015"/>
          </filter>
          ${defs}
        </defs>
      </svg>

      <!-- Base map — dimmed, always underneath -->
      <img src="assets/map/map_full_capital_heights.png" class="cm-base-map" draggable="false"/>

      <!-- District layers: feathered soft-edge clip -->
      ${CM_DISTRICTS.map(d => `
        <div class="cm-district-layer" id="layer-${d.id}">
          <div class="cm-layer-inner" style="-webkit-mask:url(#mask-${d.id});mask:url(#mask-${d.id});">
            <img src="assets/map/map_full_capital_heights.png"
              class="cm-layer-img"
              style="clip-path:url(#clip-${d.id});"
              draggable="false"/>
          </div>
        </div>`).join('')}

      <!-- Event SVG: transparent polygons for precise hover detection only -->
      <svg class="cm-event-svg" viewBox="0 0 100 100" preserveAspectRatio="none"
        onmouseleave="cmUnhover()">
        ${CM_DISTRICTS.map(d => `
          <polygon id="hit-${d.id}"
            points="${d.poly}"
            fill="transparent" stroke="transparent" stroke-width="1"
            style="cursor:pointer;"
            onmouseenter="cmHover('${d.id}')"
            onclick="cmEnterDistrict('${d.id}')"/>`).join('')}
      </svg>

      <!-- District name bar -->
      <div class="cm-name-bar" id="cm-name-bar">
        <span id="cm-name-text"></span>
      </div>
    </div>`;
}

// ── Hover ──────────────────────────────────────────────────────
window.cmHover = function(id) {
  const d = CM_DISTRICTS.find(d => d.id === id);
  CM_DISTRICTS.forEach(other => {
    const layer = document.getElementById(`layer-${other.id}`);
    if (!layer) return;
    if (other.id === id) {
      layer.classList.add('lifted');
      layer.classList.remove('dimmed');
    } else {
      layer.classList.remove('lifted');
      layer.classList.add('dimmed');
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
    const layer = document.getElementById(`layer-${d.id}`);
    if (layer) { layer.classList.remove('lifted'); layer.classList.remove('dimmed'); }
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