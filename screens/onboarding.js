// ============================================================
// CAPITAL HEIGHTS — onboarding.js
// Handles the full first-time player setup:
//   Step 1: Character select
//   Step 2: Degree / major select
//   Step 3: Finals exam (5 questions from chosen major)
//   Step 4: Graduation + transition to city
// ============================================================

const CHARACTERS = [
  { id:"char1", name:"Alex Rivera",    desc:"Business-minded and ambitious",   emoji:"🧑" },
  { id:"char2", name:"Jordan Lee",     desc:"Tech-savvy problem solver",        emoji:"👩" },
  { id:"char3", name:"Morgan Chen",    desc:"Creative and entrepreneurial",     emoji:"🧑" },
  { id:"char4", name:"Taylor Brooks",  desc:"Detail-oriented and analytical",   emoji:"👩" },
  { id:"char5", name:"Casey Williams", desc:"People-focused team player",       emoji:"🧑" },
  { id:"char6", name:"Riley Johnson",  desc:"Strategic and goal-driven",        emoji:"👩" },
];

const MAJORS = [
  { id:"business",     label:"Business Administration" },
  { id:"finance",      label:"Finance" },
  { id:"accounting",   label:"Accounting" },
  { id:"economics",    label:"Economics" },
  { id:"marketing",    label:"Marketing" },
  { id:"cs",           label:"Computer Science" },
  { id:"it",           label:"Information Technology" },
  { id:"engineering",  label:"Engineering" },
  { id:"nursing",      label:"Nursing" },
  { id:"biology",      label:"Biology" },
  { id:"psychology",   label:"Psychology" },
  { id:"education",    label:"Education" },
  { id:"communications",label:"Communications & Media" },
  { id:"political",    label:"Political Science" },
  { id:"criminal",     label:"Criminal Justice" },
  { id:"arts",         label:"Fine Arts & Design" },
  { id:"english",      label:"English & Creative Writing" },
  { id:"sociology",    label:"Sociology & Social Work" },
  { id:"hospitality",  label:"Hospitality & Restaurant Management" },
  { id:"undecided",    label:"Undecided" },
];

// 5 questions per major — pulled from content.js style
const FINALS_QUESTIONS = {
  business: [
    { q:"What does ROI stand for?", opts:["Return on Investment","Rate of Inflation","Revenue Over Income","Risk of Instability"], a:0 },
    { q:"A SWOT analysis evaluates Strengths, Weaknesses, Opportunities, and __?", opts:["Threats","Taxes","Trends","Transactions"], a:0 },
    { q:"Which statement shows revenues and expenses over time?", opts:["Balance Sheet","Cash Flow Statement","Income Statement","Net Worth Statement"], a:2 },
    { q:"The '4 Ps' of marketing are Product, Price, Place, and __?", opts:["Profit","Promotion","People","Planning"], a:1 },
    { q:"What is gross profit?", opts:["Revenue minus all expenses","Revenue minus cost of goods sold","Net income after taxes","Total assets minus liabilities"], a:1 },
  ],
  finance: [
    { q:"What is compound interest?", opts:["Interest on the principal only","Interest on principal plus accumulated interest","A fixed fee charged by banks","Interest paid once per year only"], a:1 },
    { q:"A stock represents:", opts:["A loan to a company","Ownership share in a company","A government bond","A savings account"], a:1 },
    { q:"What does a 401(k) primarily provide?", opts:["Health insurance","Retirement savings with tax advantages","A college fund","A business loan"], a:1 },
    { q:"What is a credit score used for?", opts:["Tracking spending habits","Measuring ability to repay debt","Calculating tax owed","Determining insurance premiums only"], a:1 },
    { q:"What is diversification in investing?", opts:["Putting all money in one stock","Spreading investments to reduce risk","Only investing in bonds","Keeping money in cash"], a:1 },
  ],
  accounting: [
    { q:"What is a debit in accounting?", opts:["An increase in liability","An increase in assets or decrease in liabilities","Money owed to a vendor","A bank fee"], a:1 },
    { q:"Accounts payable represents:", opts:["Money owed to you","Money you owe to others","Your checking balance","Your annual revenue"], a:1 },
    { q:"What is depreciation?", opts:["An increase in asset value","The gradual reduction of an asset's value over time","A tax penalty","A type of loan"], a:1 },
    { q:"GAAP stands for:", opts:["Generally Accepted Accounting Principles","Government Approved Audit Process","Gross Assets and Accounting Policy","General Annual Audit Protocol"], a:0 },
    { q:"The accounting equation is Assets = Liabilities + __?", opts:["Revenue","Expenses","Equity","Profit"], a:2 },
  ],
  economics: [
    { q:"What is supply and demand?", opts:["A government pricing policy","The relationship between product availability and consumer desire","A type of tax","A banking regulation"], a:1 },
    { q:"GDP stands for:", opts:["Gross Domestic Product","Government Debt Payment","General Distribution of Profits","Gross Daily Purchases"], a:0 },
    { q:"Inflation means:", opts:["Prices are falling","The value of money is increasing","The general price level is rising over time","Unemployment is decreasing"], a:2 },
    { q:"A recession is defined as:", opts:["One quarter of economic decline","Two consecutive quarters of negative GDP growth","Unemployment above 10%","A stock market crash"], a:1 },
    { q:"What is an opportunity cost?", opts:["The price of a product","The value of the next best alternative given up","A government fee","The cost of inflation"], a:1 },
  ],
  marketing: [
    { q:"What is a target market?", opts:["All possible consumers","A specific group of consumers a business aims to reach","A type of advertisement","A sales quota"], a:1 },
    { q:"Brand equity refers to:", opts:["The cost of making a product","The value a brand adds to a product beyond its function","A marketing budget","A company's total revenue"], a:1 },
    { q:"SEO stands for:", opts:["Sales and Earnings Overview","Search Engine Optimization","Social Engagement Outreach","Sponsored Email Operations"], a:1 },
    { q:"A call to action (CTA) in marketing is:", opts:["A customer complaint","A prompt encouraging the audience to take a specific action","A pricing strategy","A type of product placement"], a:1 },
    { q:"What is market segmentation?", opts:["Selling one product to everyone","Dividing a market into distinct groups of buyers","A type of discount strategy","A supply chain process"], a:1 },
  ],
  cs: [
    { q:"What does an algorithm do?", opts:["Stores data permanently","Provides steps to solve a problem","Connects to the internet","Displays graphics"], a:1 },
    { q:"What does HTTP stand for?", opts:["Hyperlink Transfer Text Protocol","HyperText Transfer Protocol","High Traffic Transmission Program","Hosted Text Transfer Process"], a:1 },
    { q:"Which data structure is 'first in, first out'?", opts:["Stack","Tree","Queue","Graph"], a:2 },
    { q:"What is a 'bug' in programming?", opts:["A computer virus","An error or flaw in code","A type of software update","A programming language"], a:1 },
    { q:"What does RAM stand for?", opts:["Random Access Memory","Read and Monitor","Remote Application Mode","Rapid Array Management"], a:0 },
  ],
  it: [
    { q:"What is a firewall?", opts:["A type of computer virus","A system that monitors and controls network traffic","A backup storage device","A type of operating system"], a:1 },
    { q:"What does VPN stand for?", opts:["Virtual Private Network","Variable Proxy Node","Verified Public Network","Virtual Processing Node"], a:0 },
    { q:"What is phishing?", opts:["A type of software update","A fraudulent attempt to steal sensitive information","A network speed test","A type of firewall"], a:1 },
    { q:"Cloud computing refers to:", opts:["Weather prediction software","Delivering computing services over the internet","A type of RAM","Local server storage only"], a:1 },
    { q:"What is two-factor authentication?", opts:["Using two passwords","A security process requiring two forms of verification","A type of encryption","A backup system"], a:1 },
  ],
  engineering: [
    { q:"What is the purpose of a blueprint?", opts:["To track project costs","To provide detailed technical drawings of a design","To manage a team","To test materials"], a:1 },
    { q:"What does CAD stand for?", opts:["Computer Aided Design","Construction and Development","Civil Architecture Drawing","Calculated Asset Data"], a:0 },
    { q:"What is tensile strength?", opts:["How much weight a beam can hold vertically","A material's resistance to being pulled apart","The flexibility of a material","The cost of a material"], a:1 },
    { q:"What is the purpose of a load-bearing wall?", opts:["Decoration only","To support the weight of the structure above it","To divide rooms","To insulate the building"], a:1 },
    { q:"What does R-value measure in construction?", opts:["Roof thickness","Thermal resistance of insulation","Room dimensions","Rainfall resistance"], a:1 },
  ],
  nursing: [
    { q:"Normal resting heart rate for a healthy adult is:", opts:["40-60 bpm","60-100 bpm","100-140 bpm","20-40 bpm"], a:1 },
    { q:"Which medication type reduces fever?", opts:["Antibiotic","Antipyretic","Anticoagulant","Antifungal"], a:1 },
    { q:"What does 'PRN' mean on a prescription?", opts:["Take every night","Take as needed","Take before meals","Take with water only"], a:1 },
    { q:"Which vital sign measures force of blood against artery walls?", opts:["Temperature","Respiratory rate","Blood pressure","Pulse oximetry"], a:2 },
    { q:"Triage means:", opts:["A type of surgery","Sorting patients by urgency of care","A medication system","A billing process"], a:1 },
  ],
  biology: [
    { q:"Which organ produces insulin?", opts:["Liver","Kidney","Pancreas","Gallbladder"], a:2 },
    { q:"DNA stands for:", opts:["Deoxyribonucleic Acid","Digital Nucleotide Array","Dynamic Nitrogen Acid","Dual Nucleic Arrangement"], a:0 },
    { q:"What is photosynthesis?", opts:["How animals digest food","How plants convert sunlight into energy","How cells reproduce","How bacteria multiply"], a:1 },
    { q:"The basic unit of life is:", opts:["An organ","A molecule","A cell","A tissue"], a:2 },
    { q:"Which blood type is the universal donor?", opts:["AB+","O-","B+","A-"], a:1 },
  ],
  psychology: [
    { q:"Who developed the theory of classical conditioning?", opts:["Sigmund Freud","Ivan Pavlov","Abraham Maslow","Carl Jung"], a:1 },
    { q:"Maslow's Hierarchy of Needs places which need at the base?", opts:["Safety","Esteem","Physiological","Self-actualization"], a:2 },
    { q:"What is cognitive dissonance?", opts:["A learning disability","Mental discomfort from conflicting beliefs","A sleep disorder","A type of phobia"], a:1 },
    { q:"Nature vs. nurture debates whether behavior is shaped by:", opts:["Age vs. education","Genetics vs. environment","Culture vs. religion","Friends vs. family"], a:1 },
    { q:"The placebo effect is:", opts:["A real medication side effect","A positive response to an inactive treatment","A type of therapy","A mental illness"], a:1 },
  ],
  education: [
    { q:"What is differentiated instruction?", opts:["Teaching the same lesson to all students","Tailoring teaching methods to meet individual student needs","Using only technology to teach","Grading on a curve"], a:1 },
    { q:"An IEP stands for:", opts:["Individual Education Plan","Instructional Evaluation Process","Internal Education Policy","Integrated English Program"], a:0 },
    { q:"Bloom's Taxonomy is a framework for:", opts:["Student grading","Levels of cognitive learning objectives","School budgeting","Teacher evaluation"], a:1 },
    { q:"Formative assessment is:", opts:["A final exam","Ongoing feedback during the learning process","A standardized test","A report card"], a:1 },
    { q:"What is the purpose of a lesson plan?", opts:["To track student attendance","To organize and guide instruction toward learning goals","To schedule school events","To manage classroom budgets"], a:1 },
  ],
  communications: [
    { q:"What is the primary purpose of a press release?", opts:["To advertise a product","To inform media about newsworthy events","To respond to complaints","To recruit employees"], a:1 },
    { q:"Active listening involves:", opts:["Waiting for your turn to speak","Fully concentrating and responding to the speaker","Reading while someone talks","Multitasking during a conversation"], a:1 },
    { q:"What is media bias?", opts:["A technical broadcasting error","A tendency to present news with a particular perspective","An advertising policy","A copyright issue"], a:1 },
    { q:"A target audience is:", opts:["Everyone who owns a TV","The specific group a message is designed to reach","A news anchor","A social media platform"], a:1 },
    { q:"Nonverbal communication includes:", opts:["Emails and texts","Body language, facial expressions, and gestures","Public speeches","Written reports"], a:1 },
  ],
  political: [
    { q:"What is the standard of proof in a criminal case?", opts:["Preponderance of evidence","Beyond a reasonable doubt","Clear and convincing evidence","Probable cause"], a:1 },
    { q:"The First Amendment protects:", opts:["The right to bear arms","Freedom of speech and religion","The right to a fair trial","Protection from unreasonable searches"], a:1 },
    { q:"How many branches does the U.S. federal government have?", opts:["Two","Three","Four","Five"], a:1 },
    { q:"What is a filibuster?", opts:["A type of tax bill","A tactic to delay legislation by prolonged debate","A presidential veto","A congressional vote"], a:1 },
    { q:"The Electoral College is used to elect:", opts:["Senators","The President and Vice President","Supreme Court Justices","Members of Congress"], a:1 },
  ],
  criminal: [
    { q:"What is probable cause?", opts:["A guilty verdict","Reasonable grounds to believe a crime was committed","A type of sentence","A plea deal"], a:1 },
    { q:"Miranda rights must be read when:", opts:["A person is suspected of a crime","A person is arrested and interrogated in custody","A person is charged in court","A search warrant is issued"], a:1 },
    { q:"The difference between a felony and misdemeanor is:", opts:["Location of crime","Severity — felonies are more serious crimes","The type of victim","Whether a weapon was used"], a:1 },
    { q:"What is recidivism?", opts:["A rehabilitation program","The tendency to reoffend after prior conviction","A type of parole","A court appeal"], a:1 },
    { q:"Forensic science is used to:", opts:["Set sentencing guidelines","Analyze physical evidence in criminal investigations","Train police officers","Write criminal laws"], a:1 },
  ],
  arts: [
    { q:"What is the color wheel used for?", opts:["Measuring paint quantity","Understanding color relationships and mixing","Tracking art sales","Grading artwork"], a:1 },
    { q:"In design, 'negative space' refers to:", opts:["Dark colors","The empty space around a subject","A failed design","Black and white art only"], a:1 },
    { q:"What is typography?", opts:["A type of painting","The art and technique of arranging type/text","A photography style","A sculpture technique"], a:1 },
    { q:"The Golden Ratio is used in art to:", opts:["Calculate paint costs","Create aesthetically pleasing proportions","Measure canvas size","Mix colors accurately"], a:1 },
    { q:"What does 'composition' mean in visual art?", opts:["The cost of materials","The arrangement of elements within a work","The type of paint used","The size of a canvas"], a:1 },
  ],
  english: [
    { q:"What is a thesis statement?", opts:["A book summary","The central argument of an essay","A type of punctuation","A literary device"], a:1 },
    { q:"What is a metaphor?", opts:["A direct comparison using 'like' or 'as'","An indirect comparison without using 'like' or 'as'","A type of rhyme","A story structure"], a:1 },
    { q:"What does 'point of view' mean in literature?", opts:["The theme of a story","The perspective from which a story is told","The climax of a plot","The setting of a story"], a:1 },
    { q:"What is the purpose of a topic sentence?", opts:["To conclude a paragraph","To introduce the main idea of a paragraph","To provide evidence","To summarize the essay"], a:1 },
    { q:"What is foreshadowing?", opts:["A flashback in a story","Hints or clues about what will happen later","A character's backstory","The story's resolution"], a:1 },
  ],
  sociology: [
    { q:"What is socialization?", opts:["Using social media","The process of learning norms and values of a society","A type of government","A marketing strategy"], a:1 },
    { q:"Social stratification refers to:", opts:["Population growth","The hierarchical arrangement of people in society","A type of community event","Immigration patterns"], a:1 },
    { q:"What is a social institution?", opts:["A government building","An established system meeting basic social needs (family, education, religion)","A type of nonprofit","A community center"], a:1 },
    { q:"What does 'social mobility' mean?", opts:["Moving to a new city","The ability to move between social classes","A type of transportation","Online social networking"], a:1 },
    { q:"Ethnocentrism means:", opts:["Studying different cultures","Judging other cultures by your own culture's standards","Respecting cultural differences","Learning a new language"], a:1 },
  ],
  hospitality: [
    { q:"What is the primary goal of customer service in hospitality?", opts:["Maximizing profit at all costs","Ensuring guest satisfaction and comfort","Reducing staff costs","Increasing menu prices"], a:1 },
    { q:"What does 'RevPAR' measure in hotel management?", opts:["Restaurant revenue","Revenue per available room","Rate of staff turnover","Room preparation time"], a:1 },
    { q:"A front-of-house employee in a restaurant is:", opts:["A chef","A dishwasher","A server or host","A line cook"], a:2 },
    { q:"What is upselling in hospitality?", opts:["Lowering prices to attract guests","Encouraging customers to purchase higher-end options","Offering discounts","Removing items from a menu"], a:1 },
    { q:"What does 'mise en place' mean in a restaurant kitchen?", opts:["The dessert menu","Everything in its place — preparation before service","A French dish","A kitchen safety rule"], a:1 },
  ],
  undecided: [
    { q:"What is a budget?", opts:["A type of loan","A plan for how to spend and save money","A government tax","A bank account type"], a:1 },
    { q:"What is an interest rate?", opts:["A bank fee","The percentage charged or earned on money borrowed or saved","A type of investment","A credit card limit"], a:1 },
    { q:"What is the purpose of an emergency fund?", opts:["For vacation savings","To cover unexpected expenses without going into debt","For retirement only","For investing in stocks"], a:1 },
    { q:"A W-2 form shows:", opts:["Your credit score","Your annual wages and taxes withheld by an employer","Your monthly expenses","Your bank balance"], a:1 },
    { q:"What is net pay?", opts:["Your salary before deductions","Your take-home pay after taxes and deductions","Your gross income","Your annual bonus"], a:1 },
  ],
};

// ── Step tracker ─────────────────────────────────────────────
let ob = {
  player:        null,
  step:          'character',   // character → degree → finals → done
  selectedChar:  null,
  selectedMajor: null,
  questions:     [],
  currentQ:      0,
  score:         0,
  wrongAnswers:  [],
};

// ── Init ─────────────────────────────────────────────────────
window.initOnboarding = function(player) {
  ob.player = player;
  ob.step   = player.onboardingStep || 'character';
  render();
};

function render() {
  const el = document.getElementById('screen-onboarding');
  if (!el) return;
  if (ob.step === 'character') renderCharacter(el);
  else if (ob.step === 'degree')    renderDegree(el);
  else if (ob.step === 'finals')    renderFinals(el);
  else if (ob.step === 'results')   renderResults(el);
  else if (ob.step === 'complete')  finishOnboarding();
}

// ── Step 1: Character Select ─────────────────────────────────
function renderCharacter(el) {
  el.innerHTML = `
    <div class="ob-wrap">
      <div class="ob-header">
        <div class="ob-step-bar">
          <div class="ob-step active">1 Character</div>
          <div class="ob-step">2 Degree</div>
          <div class="ob-step">3 Finals</div>
          <div class="ob-step">4 Graduate</div>
        </div>
        <h1 class="ob-title">Who are you?</h1>
        <p class="ob-sub">Choose your character. This is how you'll appear in Capital Heights.</p>
      </div>
      <div class="char-grid">
        ${CHARACTERS.map(c => `
          <div class="char-card ${ob.selectedChar?.id === c.id ? 'selected' : ''}"
               onclick="selectChar('${c.id}')">
            <div class="char-emoji">${c.emoji}</div>
            <div class="char-name">${c.name}</div>
            <div class="char-desc">${c.desc}</div>
          </div>
        `).join('')}
      </div>
      <div class="ob-footer">
        <button class="ob-btn" onclick="confirmChar()" ${!ob.selectedChar ? 'disabled' : ''}>
          Choose This Character →
        </button>
      </div>
    </div>`;
}

window.selectChar = function(id) {
  ob.selectedChar = CHARACTERS.find(c => c.id === id);
  render();
};

window.confirmChar = async function() {
  if (!ob.selectedChar) return;
  await window.GameState.FirestoreDB.updatePlayer(ob.player.uid, {
    characterId:    ob.selectedChar.id,
    characterName:  ob.selectedChar.name,
    onboardingStep: 'degree',
  });
  ob.player.characterId   = ob.selectedChar.id;
  ob.player.characterName = ob.selectedChar.name;
  ob.step = 'degree';
  render();
};

// ── Step 2: Degree Select ────────────────────────────────────
function renderDegree(el) {
  el.innerHTML = `
    <div class="ob-wrap">
      <div class="ob-header">
        <div class="ob-step-bar">
          <div class="ob-step done">1 Character</div>
          <div class="ob-step active">2 Degree</div>
          <div class="ob-step">3 Finals</div>
          <div class="ob-step">4 Graduate</div>
        </div>
        <h1 class="ob-title">Choose your degree</h1>
        <p class="ob-sub">Your major determines your final exam questions and which jobs you'll qualify for.</p>
      </div>
      <div class="degree-grid">
        ${MAJORS.map(m => `
          <div class="degree-card ${ob.selectedMajor?.id === m.id ? 'selected' : ''}"
               onclick="selectMajor('${m.id}')">
            ${m.label}
          </div>
        `).join('')}
      </div>
      <div class="ob-footer">
        <button class="ob-btn" onclick="confirmDegree()" ${!ob.selectedMajor ? 'disabled' : ''}>
          Enroll in ${ob.selectedMajor ? ob.selectedMajor.label : '...'} →
        </button>
      </div>
    </div>`;
}

window.selectMajor = function(id) {
  ob.selectedMajor = MAJORS.find(m => m.id === id);
  render();
};

window.confirmDegree = async function() {
  if (!ob.selectedMajor) return;
  await window.GameState.FirestoreDB.updatePlayer(ob.player.uid, {
    majorId:        ob.selectedMajor.id,
    majorLabel:     ob.selectedMajor.label,
    onboardingStep: 'finals',
  });
  ob.player.majorId    = ob.selectedMajor.id;
  ob.player.majorLabel = ob.selectedMajor.label;

  // Load questions for this major
  ob.questions    = FINALS_QUESTIONS[ob.selectedMajor.id] || FINALS_QUESTIONS.undecided;
  ob.currentQ     = 0;
  ob.score        = 0;
  ob.wrongAnswers = [];
  ob.step         = 'finals';
  render();
};

// ── Step 3: Finals Exam ──────────────────────────────────────
function renderFinals(el) {
  const q    = ob.questions[ob.currentQ];
  const prog = Math.round(((ob.currentQ) / ob.questions.length) * 100);

  el.innerHTML = `
    <div class="ob-wrap">
      <div class="ob-header">
        <div class="ob-step-bar">
          <div class="ob-step done">1 Character</div>
          <div class="ob-step done">2 Degree</div>
          <div class="ob-step active">3 Finals</div>
          <div class="ob-step">4 Graduate</div>
        </div>
        <h1 class="ob-title">${ob.selectedMajor.label} — Final Exam</h1>
        <p class="ob-sub">Question ${ob.currentQ + 1} of ${ob.questions.length}</p>
        <div class="progress-bar"><div class="progress-fill" style="width:${prog}%"></div></div>
      </div>
      <div class="finals-box">
        <div class="finals-q">${q.q}</div>
        <div class="finals-opts">
          ${q.opts.map((opt, i) => `
            <button class="finals-opt" onclick="answerQ(${i})">${opt}</button>
          `).join('')}
        </div>
      </div>
    </div>`;
}

window.answerQ = function(idx) {
  const q = ob.questions[ob.currentQ];
  if (idx === q.a) {
    ob.score++;
  } else {
    ob.wrongAnswers.push({ question: q.q, correct: q.opts[q.a], chosen: q.opts[idx] });
  }

  // Flash feedback
  const opts = document.querySelectorAll('.finals-opt');
  opts.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.a)  btn.classList.add('correct');
    if (i === idx && idx !== q.a) btn.classList.add('wrong');
  });

  setTimeout(() => {
    ob.currentQ++;
    if (ob.currentQ >= ob.questions.length) {
      ob.step = 'results';
    }
    render();
  }, 900);
};

// ── Step 4: Results / Graduation ─────────────────────────────
function renderResults(el) {
  const total   = ob.questions.length;
  const score   = ob.score;
  const pct     = Math.round((score / total) * 100);
  const passed  = score >= 3; // must get 3/5 to pass
  const gpa     = passed ? (2.0 + ((score / total) * 2.0)).toFixed(1) : null;

  el.innerHTML = `
    <div class="ob-wrap">
      <div class="ob-header">
        <div class="ob-step-bar">
          <div class="ob-step done">1 Character</div>
          <div class="ob-step done">2 Degree</div>
          <div class="ob-step done">3 Finals</div>
          <div class="ob-step ${passed ? 'active' : ''}">4 Graduate</div>
        </div>
        <h1 class="ob-title">${passed ? '🎓 Congratulations!' : '📋 Not Quite...'}</h1>
      </div>
      <div class="results-box">
        <div class="results-score ${passed ? 'pass' : 'fail'}">${score}/${total}</div>
        <div class="results-pct">${pct}%</div>
        <p class="results-msg">
          ${passed
            ? `You passed your ${ob.selectedMajor.label} finals with a <strong>${gpa} GPA</strong>. Welcome to Capital Heights, ${ob.player.firstName}.`
            : `You need at least 3 correct answers to graduate. Review your answers and try again.`}
        </p>
        ${ob.wrongAnswers.length > 0 ? `
          <div class="results-review">
            <p class="review-label">Review:</p>
            ${ob.wrongAnswers.map(w => `
              <div class="review-item">
                <div class="review-q">${w.question}</div>
                <div class="review-wrong">Your answer: ${w.chosen}</div>
                <div class="review-correct">Correct: ${w.correct}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}
        ${passed
          ? `<button class="ob-btn" onclick="graduate('${gpa}')">Enter Capital Heights →</button>`
          : `<button class="ob-btn retry" onclick="retryFinals()">Retake the Exam</button>`}
      </div>
    </div>`;
}

window.retryFinals = function() {
  ob.currentQ     = 0;
  ob.score        = 0;
  ob.wrongAnswers = [];
  ob.step         = 'finals';
  render();
};

window.graduate = async function(gpa) {
  await window.GameState.FirestoreDB.updatePlayer(ob.player.uid, {
    graduationGPA:  parseFloat(gpa),
    onboardingStep: 'jobboard',
  });
  ob.player.graduationGPA  = parseFloat(gpa);
  ob.player.onboardingStep = 'jobboard';
  window.GameState.player  = ob.player;

  // Go to city map — job board is accessed from home computer
  showScreen('screen-citymap');
  if (window.initCityMap) window.initCityMap(ob.player);
};

function finishOnboarding() {
  showScreen('screen-home');
  if (window.initHome) window.initHome(ob.player);
}