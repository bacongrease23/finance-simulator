// ============================================================
// CAPITAL HEIGHTS — home.js
// Player Management Screen — the command center
// ============================================================

let hm = { player: null };

window.initHome = function(player) {
  hm.player = player;
  hmRender();
};

function hmRender() {
  const el = document.getElementById('screen-home');
  if (!el) return;
  const p = hm.player;

  // Derived values
  const monthlySalary = p.annualSalary
    ? (p.payFrequency === 'biweekly' ? p.annualSalary / 26 * 2 : p.annualSalary / 12)
    : 0;
  const monthlyNet = monthlySalary - (p.monthlyRent || 0);
  const creditClass = p.creditScore >= 740 ? 'good' : p.creditScore >= 670 ? 'fair' : 'poor';
  const creditLabel = p.creditScore >= 740 ? 'Excellent' : p.creditScore >= 670 ? 'Good' : p.creditScore >= 580 ? 'Fair' : 'Poor';

  // Location
  const locationLine = window.GameState?.currentBuilding
    ? `📍 ${window.GameState.currentBuilding.name}`
    : `📍 Capital Heights`;

  // GPA label
  const gpa = p.graduationGPA || 0;
  const gpaLabel = gpa >= 3.7 ? 'Summa Cum Laude' : gpa >= 3.3 ? 'Magna Cum Laude' : gpa >= 3.0 ? 'Cum Laude' : gpa >= 2.5 ? 'Good Standing' : 'Minimum Standing';

  el.innerHTML = `
    <div class="hm-wrap">

      <!-- Header -->
      <div class="hm-header">
        <div class="hm-identity">
          <div class="hm-avatar" id="hm-avatar">
            ${p.characterId && p.outfitIndex !== undefined
              ? `<img src="assets/characters/${p.characterId}_${(p.outfitIndex||0)+1}.png" class="hm-avatar-img"/>`
              : `<div class="hm-avatar-placeholder">${(p.firstName||'?')[0]}</div>`}
          </div>
          <div class="hm-identity-text">
            <div class="hm-name">${p.firstName || ''} ${p.lastName || ''}</div>
            <div class="hm-sub">${p.majorLabel || 'General Studies'} · ${gpa.toFixed(1)} GPA · ${gpaLabel}</div>
            <div class="hm-location">${locationLine}</div>
          </div>
        </div>
        <div class="hm-date">
          <div class="hm-date-label">Day ${p.currentDay || 1}</div>
          <div class="hm-date-sub">Month ${p.currentMonth || 1}</div>
        </div>
      </div>

      <!-- Grid -->
      <div class="hm-grid">

        <!-- Finances -->
        <div class="hm-card">
          <div class="hm-card-title">💳 Finances</div>
          <div class="hm-stat-row">
            <span class="hm-stat-label">Checking</span>
            <span class="hm-stat-val ${(p.checkingBalance||0) < 0 ? 'negative' : ''}"
              >$${Number(p.checkingBalance||0).toFixed(2)}</span>
          </div>
          <div class="hm-stat-row">
            <span class="hm-stat-label">Savings</span>
            <span class="hm-stat-val">$${Number(p.savingsBalance||0).toFixed(2)}</span>
          </div>
          <div class="hm-stat-row">
            <span class="hm-stat-label">Credit Score</span>
            <span class="hm-stat-val credit-${creditClass}">${p.creditScore || 650} · ${creditLabel}</span>
          </div>
          <div class="hm-divider"></div>
          <div class="hm-stat-row total">
            <span class="hm-stat-label">Net Worth</span>
            <span class="hm-stat-val ${((p.checkingBalance||0)+(p.savingsBalance||0)) < 0 ? 'negative' : 'positive'}"
              >$${Number((p.checkingBalance||0)+(p.savingsBalance||0)).toFixed(2)}</span>
          </div>
        </div>

        <!-- Income -->
        <div class="hm-card">
          <div class="hm-card-title">💼 Income</div>
          ${p.jobTitle ? `
            <div class="hm-job-name">${p.jobTitle}</div>
            <div class="hm-job-employer">${p.employer || ''}</div>
            <div class="hm-stat-row" style="margin-top:12px;">
              <span class="hm-stat-label">Annual Salary</span>
              <span class="hm-stat-val">$${Number(p.annualSalary||0).toLocaleString()}</span>
            </div>
            <div class="hm-stat-row">
              <span class="hm-stat-label">Monthly Take-Home</span>
              <span class="hm-stat-val">~$${monthlySalary.toFixed(0)}</span>
            </div>
            <div class="hm-stat-row">
              <span class="hm-stat-label">Pay Schedule</span>
              <span class="hm-stat-val">${p.payFrequency === 'biweekly' ? 'Biweekly' : 'Monthly'}</span>
            </div>
          ` : `
            <div class="hm-empty-state">No job yet.<br>Visit the city to find work.</div>
          `}
          <div class="hm-divider"></div>
          <div class="hm-card-subtitle">📈 Passive Income</div>
          <div class="hm-empty-state small">Investments — coming soon</div>
        </div>

        <!-- Assets & Liabilities -->
        <div class="hm-card">
          <div class="hm-card-title">🏠 Assets & Liabilities</div>
          <div class="hm-card-subtitle">Assets</div>
          ${p.apartmentName ? `
            <div class="hm-stat-row">
              <span class="hm-stat-label">Residence</span>
              <span class="hm-stat-val">${p.apartmentName}</span>
            </div>
          ` : `
            <div class="hm-empty-state small">No apartment yet.</div>
          `}
          <div class="hm-divider"></div>
          <div class="hm-card-subtitle">Liabilities</div>
          ${p.monthlyRent > 0 ? `
            <div class="hm-stat-row">
              <span class="hm-stat-label">Monthly Rent</span>
              <span class="hm-stat-val negative">-$${Number(p.monthlyRent).toFixed(0)}/mo</span>
            </div>
          ` : `
            <div class="hm-empty-state small">No liabilities yet.</div>
          `}
          <div class="hm-divider"></div>
          <div class="hm-stat-row total">
            <span class="hm-stat-label">Monthly Cash Flow</span>
            <span class="hm-stat-val ${monthlyNet >= 0 ? 'positive' : 'negative'}"
              >${monthlyNet >= 0 ? '+' : ''}$${monthlyNet.toFixed(0)}/mo</span>
          </div>
        </div>

        <!-- Stock Portfolio -->
        <div class="hm-card hm-card-wide">
          <div class="hm-card-title">📊 Stock Portfolio</div>
          <div class="hm-empty-state">
            Stock trading coming soon.<br>
            <span class="hm-empty-sub">Your investment portfolio will appear here.</span>
          </div>
        </div>

      </div>

      <!-- Travel button -->
      <div class="hm-travel-row">
        ${window.GameState?.currentBuilding ? `
          <button class="hm-return-btn" onclick="hmReturnToLocation()">
            ← Return to ${window.GameState.currentBuilding.name}
          </button>
        ` : ''}
        <button class="hm-travel-btn" onclick="hmTravel()">
          🗺️ Travel
        </button>
      </div>

    </div>`;
}

window.hmTravel = function() {
  showScreen('screen-citymap');
  if (window.initCityMap) window.initCityMap(hm.player);
};

window.hmReturnToLocation = function() {
  const b = window.GameState?.currentBuilding;
  if (!b) return;
  showScreen(b.screen);
  const inits = {
    'screen-banking':  window.initBanking,
    'screen-grocery':  window.initGrocery,
    'screen-housing':  window.initHousing,
    'screen-jobboard': window.initJobBoard,
    'screen-location': window.initLocation,
  };
  if (inits[b.screen]) inits[b.screen](hm.player, b);
};

// Called by forever button
window.openPlayerManagement = function() {
  if (!window.GameState?.player) return;
  // Refresh player data before showing
  window.GameState.FirestoreDB.getPlayer(window.GameState.player.uid).then(fresh => {
    if (fresh) {
      window.GameState.player = fresh;
      hm.player = fresh;
    }
    showScreen('screen-home');
    hmRender();
  }).catch(() => {
    hm.player = window.GameState.player;
    showScreen('screen-home');
    hmRender();
  });
};