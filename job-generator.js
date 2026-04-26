// ============================================================
// METROPOLIS — Job Board Generator
// job-generator.js
//
// Generates ~500 unique entry-level job listings for the job board.
// Run seedJobs() once from the admin panel AFTER seedDatabase().
//
// Structure:
//   - ~30 employer companies
//   - Jobs across all major categories
//   - Weighted benefit generation (realistic distributions)
//   - 3 ULTRA-RARE employer-provided housing jobs (hidden in the pool)
// ============================================================

import { db } from './firebase-schema.js';
import { doc, setDoc, writeBatch } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// ── EMPLOYERS ───────────────────────────────────────────────
const EMPLOYERS = [
  // Finance & Consulting
  { name:"Merriweather Capital Group",     city:"McLean",      type:"finance"        },
  { name:"Dominion Financial Services",    city:"Tysons",      type:"finance"        },
  { name:"Allegiance Wealth Advisors",     city:"Arlington",   type:"finance"        },
  { name:"Sentinel Consulting Group",      city:"Fairfax",     type:"consulting"     },
  { name:"PrimeVest Analytics",            city:"Reston",      type:"finance"        },
  // Tech
  { name:"NovaTech Systems",               city:"Herndon",     type:"tech"           },
  { name:"ClearPath Software",             city:"Reston",      type:"tech"           },
  { name:"DataBridge Solutions",           city:"Arlington",   type:"tech"           },
  { name:"Apex Digital Labs",              city:"Fairfax",     type:"tech"           },
  { name:"GridWork IT Services",           city:"Vienna",      type:"tech"           },
  // Healthcare
  { name:"Fairfax County Medical Center",  city:"Fairfax",     type:"healthcare"     },
  { name:"Inova Health Partners",          city:"Falls Church",type:"healthcare"     },
  { name:"CareFirst Community Clinics",    city:"Annandale",   type:"healthcare"     },
  // Government & Defense
  { name:"Paragon Defense Contractors",    city:"Chantilly",   type:"government"     },
  { name:"Capitol Ridge Associates",       city:"Arlington",   type:"government"     },
  { name:"Vanguard Federal Solutions",     city:"McLean",      type:"government"     },
  // Education
  { name:"Fairfax County Public Schools",  city:"Fairfax",     type:"education"      },
  { name:"Northern Virginia Community College", city:"Annandale", type:"education"  },
  // Retail & Hospitality
  { name:"Harborview Hotel & Suites",      city:"Reston",      type:"hospitality"   },
  { name:"Grandview Restaurant Group",     city:"Arlington",   type:"hospitality"   },
  { name:"Metro Fresh Market",             city:"Fairfax",     type:"retail"        },
  { name:"Landmark Retail Partners",       city:"Tysons",      type:"retail"        },
  // Law & Media
  { name:"Vance, Holloway & Steele LLP",   city:"Arlington",   type:"legal"         },
  { name:"Northern Virginia Tribune",      city:"Fairfax",     type:"media"         },
  // Engineering & Construction
  { name:"BlueLine Civil Engineering",     city:"Centreville", type:"engineering"   },
  { name:"Cornerstone Property Group",     city:"Vienna",      type:"realestate"    },
  { name:"Summit Trade Services",          city:"Manassas",    type:"trades"        },
  // Social Services & Nonprofit
  { name:"Fairfax Community Action Network", city:"Annandale", type:"nonprofit"     },
  { name:"The Meridian Counseling Center", city:"Falls Church",type:"healthcare"    },
  // Arts & Creative
  { name:"Studio Collective NoVA",         city:"Arlington",   type:"arts"          },
];

// ── JOB TEMPLATES BY CATEGORY ───────────────────────────────
const JOB_TEMPLATES = {

  finance: [
    { title:"Junior Financial Analyst",       majorMatch:["finance","accounting","economics","business","undecided"], salaryMin:52000, salaryMax:62000 },
    { title:"Staff Accountant",               majorMatch:["accounting","finance","business"],                         salaryMin:48000, salaryMax:58000 },
    { title:"Audit Associate",                majorMatch:["accounting","finance"],                                    salaryMin:50000, salaryMax:60000 },
    { title:"Investment Operations Analyst",  majorMatch:["finance","economics","business"],                          salaryMin:55000, salaryMax:65000 },
    { title:"Payroll Coordinator",            majorMatch:["accounting","hr","business","all"],                        salaryMin:44000, salaryMax:52000 },
    { title:"Tax Preparer (Entry Level)",     majorMatch:["accounting","finance"],                                    salaryMin:42000, salaryMax:50000 },
    { title:"Financial Planning Assistant",   majorMatch:["finance","business","economics"],                          salaryMin:46000, salaryMax:56000 },
    { title:"Credit Analyst Trainee",         majorMatch:["finance","accounting","economics"],                        salaryMin:50000, salaryMax:60000 },
    { title:"Budget Analyst I",               majorMatch:["finance","economics","business","accounting"],             salaryMin:52000, salaryMax:62000 },
    { title:"Insurance Claims Analyst",       majorMatch:["finance","business","all"],                                salaryMin:44000, salaryMax:54000 },
  ],

  consulting: [
    { title:"Junior Business Analyst",        majorMatch:["business","economics","cs","finance","all"],               salaryMin:55000, salaryMax:70000 },
    { title:"Management Consulting Analyst",  majorMatch:["business","finance","economics","political"],              salaryMin:60000, salaryMax:75000 },
    { title:"Process Improvement Coordinator",majorMatch:["business","engineering","cs"],                             salaryMin:50000, salaryMax:62000 },
    { title:"Research Analyst",               majorMatch:["economics","political","sociology","business","all"],      salaryMin:48000, salaryMax:58000 },
    { title:"Project Coordinator",            majorMatch:["business","communications","all"],                         salaryMin:46000, salaryMax:56000 },
  ],

  tech: [
    { title:"Junior Software Developer",      majorMatch:["cs","it","engineering"],                                   salaryMin:70000, salaryMax:90000 },
    { title:"IT Support Specialist I",        majorMatch:["it","cs","engineering","all"],                             salaryMin:46000, salaryMax:56000 },
    { title:"QA Testing Analyst",             majorMatch:["cs","it","engineering"],                                   salaryMin:52000, salaryMax:62000 },
    { title:"Cybersecurity Analyst I",        majorMatch:["cs","it","engineering"],                                   salaryMin:65000, salaryMax:80000 },
    { title:"Data Analyst I",                 majorMatch:["cs","it","economics","finance","business"],                salaryMin:58000, salaryMax:72000 },
    { title:"Network Administrator Trainee",  majorMatch:["it","cs"],                                                 salaryMin:50000, salaryMax:62000 },
    { title:"Technical Support Rep",          majorMatch:["it","cs","all"],                                           salaryMin:44000, salaryMax:54000 },
    { title:"Junior UX/UI Designer",          majorMatch:["cs","arts","communications"],                              salaryMin:55000, salaryMax:70000 },
    { title:"Cloud Operations Associate",     majorMatch:["cs","it","engineering"],                                   salaryMin:60000, salaryMax:75000 },
    { title:"Systems Analyst I",              majorMatch:["cs","it","engineering","business"],                        salaryMin:58000, salaryMax:72000 },
  ],

  healthcare: [
    { title:"Registered Nurse (RN), Entry",   majorMatch:["nursing","biology"],                                       salaryMin:65000, salaryMax:78000 },
    { title:"Medical Assistant",              majorMatch:["nursing","biology","all"],                                  salaryMin:38000, salaryMax:46000 },
    { title:"Patient Care Coordinator",       majorMatch:["nursing","psychology","social_work","all"],                salaryMin:40000, salaryMax:50000 },
    { title:"Health Services Administrator",  majorMatch:["healthcare","business","all"],                             salaryMin:46000, salaryMax:56000 },
    { title:"Mental Health Counselor (Intern)",majorMatch:["psychology","sociology","social_work"],                   salaryMin:38000, salaryMax:48000 },
    { title:"Physical Therapy Aide",          majorMatch:["nursing","biology","all"],                                  salaryMin:34000, salaryMax:42000 },
    { title:"Pharmacy Technician",            majorMatch:["biology","nursing","all"],                                  salaryMin:36000, salaryMax:45000 },
    { title:"Medical Billing Specialist",     majorMatch:["accounting","biology","all"],                              salaryMin:40000, salaryMax:50000 },
    { title:"Public Health Coordinator",      majorMatch:["biology","sociology","political","nursing"],               salaryMin:44000, salaryMax:54000 },
  ],

  government: [
    { title:"Government Relations Analyst",   majorMatch:["political","communications","business"],                   salaryMin:52000, salaryMax:65000 },
    { title:"Federal Program Assistant",      majorMatch:["political","business","all"],                              salaryMin:48000, salaryMax:60000 },
    { title:"Defense Contractor Analyst",     majorMatch:["cs","engineering","business","political"],                 salaryMin:60000, salaryMax:78000 },
    { title:"Contracts Administrator I",      majorMatch:["business","legal","all"],                                  salaryMin:52000, salaryMax:64000 },
    { title:"Policy Research Associate",      majorMatch:["political","economics","sociology"],                       salaryMin:48000, salaryMax:58000 },
    { title:"Intelligence Research Analyst",  majorMatch:["political","cs","criminal","all"],                         salaryMin:58000, salaryMax:72000 },
    { title:"Administrative Officer I",       majorMatch:["business","all"],                                          salaryMin:45000, salaryMax:55000 },
  ],

  education: [
    { title:"Elementary Teacher (K-5)",       majorMatch:["education"],                                               salaryMin:46000, salaryMax:55000 },
    { title:"Middle School Teacher",          majorMatch:["education","english","math"],                              salaryMin:47000, salaryMax:56000 },
    { title:"High School Teacher",            majorMatch:["education","english","political","biology"],               salaryMin:48000, salaryMax:58000 },
    { title:"Special Education Assistant",    majorMatch:["education","psychology","sociology"],                      salaryMin:38000, salaryMax:46000 },
    { title:"College Admissions Coordinator", majorMatch:["education","communications","business"],                   salaryMin:42000, salaryMax:52000 },
    { title:"Instructional Aide",             majorMatch:["education","all"],                                         salaryMin:34000, salaryMax:42000 },
    { title:"School Counselor (Resident)",    majorMatch:["psychology","education","sociology"],                      salaryMin:48000, salaryMax:58000 },
  ],

  hospitality: [
    { title:"Front Desk Coordinator",         majorMatch:["hospitality","communications","all"],                      salaryMin:36000, salaryMax:44000 },
    { title:"Restaurant Shift Supervisor",    majorMatch:["hospitality","business","all"],                            salaryMin:38000, salaryMax:48000 },
    { title:"Event Planning Assistant",       majorMatch:["hospitality","communications","marketing"],                salaryMin:40000, salaryMax:50000 },
    { title:"Food Service Manager Trainee",   majorMatch:["hospitality","business"],                                  salaryMin:40000, salaryMax:50000 },
    { title:"Catering Coordinator",           majorMatch:["hospitality","communications","all"],                      salaryMin:38000, salaryMax:46000 },
    { title:"Guest Services Agent",           majorMatch:["hospitality","communications","all"],                      salaryMin:34000, salaryMax:42000 },
  ],

  marketing: [
    { title:"Marketing Coordinator",          majorMatch:["marketing","communications","business"],                   salaryMin:44000, salaryMax:56000 },
    { title:"Social Media Specialist",        majorMatch:["marketing","communications","english","arts"],             salaryMin:42000, salaryMax:54000 },
    { title:"Content Writer / Copywriter",    majorMatch:["english","communications","marketing"],                    salaryMin:42000, salaryMax:52000 },
    { title:"PR & Communications Associate",  majorMatch:["communications","marketing","political","english"],        salaryMin:44000, salaryMax:56000 },
    { title:"Brand Ambassador",               majorMatch:["marketing","communications","all"],                        salaryMin:36000, salaryMax:46000 },
    { title:"Email Marketing Analyst",        majorMatch:["marketing","cs","business"],                               salaryMin:46000, salaryMax:58000 },
    { title:"Digital Advertising Coordinator",majorMatch:["marketing","cs","business"],                               salaryMin:48000, salaryMax:60000 },
  ],

  legal: [
    { title:"Legal Assistant",                majorMatch:["criminal","political","english","all"],                    salaryMin:40000, salaryMax:52000 },
    { title:"Paralegal I",                    majorMatch:["criminal","political","english"],                          salaryMin:44000, salaryMax:56000 },
    { title:"Court Records Clerk",            majorMatch:["criminal","political","all"],                              salaryMin:38000, salaryMax:46000 },
    { title:"Compliance Associate",           majorMatch:["business","finance","legal","political"],                  salaryMin:50000, salaryMax:62000 },
  ],

  engineering: [
    { title:"Civil Engineering Technician",   majorMatch:["engineering"],                                             salaryMin:50000, salaryMax:62000 },
    { title:"Junior Structural Engineer",     majorMatch:["engineering"],                                             salaryMin:62000, salaryMax:76000 },
    { title:"Environmental Technician",       majorMatch:["engineering","biology"],                                   salaryMin:46000, salaryMax:58000 },
    { title:"CAD Drafter",                    majorMatch:["engineering","arts"],                                      salaryMin:48000, salaryMax:60000 },
    { title:"Construction Project Assistant", majorMatch:["engineering","business"],                                  salaryMin:48000, salaryMax:60000 },
  ],

  trades: [
    { title:"Apprentice Electrician",         majorMatch:["engineering","all"],                                       salaryMin:44000, salaryMax:56000 },
    { title:"HVAC Technician Trainee",        majorMatch:["engineering","all"],                                       salaryMin:42000, salaryMax:52000 },
    { title:"Plumbing Apprentice",            majorMatch:["all"],                                                     salaryMin:42000, salaryMax:52000 },
    { title:"General Maintenance Technician", majorMatch:["all"],                                                     salaryMin:38000, salaryMax:48000 },
  ],

  arts: [
    { title:"Junior Graphic Designer",        majorMatch:["arts","communications","marketing"],                       salaryMin:42000, salaryMax:55000 },
    { title:"Freelance Illustrator",          majorMatch:["arts"],                                                    salaryMin:35000, salaryMax:50000 },
    { title:"Video Production Assistant",     majorMatch:["arts","communications","marketing"],                       salaryMin:40000, salaryMax:52000 },
    { title:"Photography Coordinator",        majorMatch:["arts","communications"],                                   salaryMin:38000, salaryMax:48000 },
    { title:"Gallery & Event Assistant",      majorMatch:["arts","hospitality"],                                      salaryMin:35000, salaryMax:44000 },
  ],

  social: [
    { title:"Social Worker (MSW Candidate)",  majorMatch:["sociology","psychology","education"],                      salaryMin:40000, salaryMax:52000 },
    { title:"Case Manager I",                 majorMatch:["sociology","psychology","criminal"],                       salaryMin:40000, salaryMax:50000 },
    { title:"Community Outreach Coordinator", majorMatch:["sociology","political","communications"],                  salaryMin:38000, salaryMax:48000 },
    { title:"Youth Program Coordinator",      majorMatch:["education","psychology","sociology"],                      salaryMin:36000, salaryMax:46000 },
    { title:"Victim Advocate",                majorMatch:["criminal","psychology","sociology"],                       salaryMin:38000, salaryMax:48000 },
  ],

  criminal: [
    { title:"Police Officer Recruit",         majorMatch:["criminal","political","all"],                              salaryMin:52000, salaryMax:62000 },
    { title:"Probation Officer Trainee",      majorMatch:["criminal","sociology","psychology"],                       salaryMin:44000, salaryMax:56000 },
    { title:"Corrections Officer",            majorMatch:["criminal","all"],                                          salaryMin:44000, salaryMax:54000 },
    { title:"Loss Prevention Specialist",     majorMatch:["criminal","all"],                                          salaryMin:36000, salaryMax:46000 },
    { title:"Fraud Investigator Trainee",     majorMatch:["criminal","finance","cs"],                                 salaryMin:48000, salaryMax:60000 },
  ],

  all: [
    { title:"Administrative Assistant",       majorMatch:["all"],                                                     salaryMin:36000, salaryMax:46000 },
    { title:"Customer Service Rep",           majorMatch:["all"],                                                     salaryMin:34000, salaryMax:44000 },
    { title:"Sales Associate",                majorMatch:["all"],                                                     salaryMin:36000, salaryMax:50000 },
    { title:"Office Manager Trainee",         majorMatch:["business","all"],                                          salaryMin:38000, salaryMax:50000 },
    { title:"Receptionist",                   majorMatch:["all"],                                                     salaryMin:32000, salaryMax:42000 },
    { title:"Human Resources Assistant",      majorMatch:["business","psychology","all"],                             salaryMin:40000, salaryMax:52000 },
    { title:"Operations Coordinator",         majorMatch:["business","all"],                                          salaryMin:42000, salaryMax:54000 },
    { title:"Logistics Coordinator",          majorMatch:["business","engineering","all"],                            salaryMin:44000, salaryMax:56000 },
    { title:"Volunteer Programs Coordinator", majorMatch:["sociology","all"],                                         salaryMin:34000, salaryMax:44000 },
  ],
};

// ── BENEFIT GENERATION ──────────────────────────────────────
// Realistic weighted distributions for NoVA entry-level market

function generateBenefits(salaryLevel, isUltraRareHousing = false) {
  const r = () => Math.random();

  // Health insurance: ~80% of entry-level jobs offer it
  const hasHealth = r() < 0.80;
  const healthPlans = ["HMO","PPO","HDHP"];
  const healthWeights = [0.4, 0.35, 0.25]; // HMO most common for entry
  const healthPlan = hasHealth ? weightedPick(healthPlans, healthWeights) : null;

  // 401k: ~70% offer it; match varies
  const has401k = r() < 0.70;
  const matchOptions = [0, 2, 3, 4, 5, 6];
  const matchWeights = [0.15, 0.20, 0.35, 0.15, 0.10, 0.05];
  const retirementPct = has401k ? weightedPick(matchOptions, matchWeights) : 0;

  // Gym stipend: ~25% of jobs (more common at tech/finance)
  const hasGym = r() < (salaryLevel > 65000 ? 0.40 : 0.20);
  const gymAmounts = [25, 30, 50, 75, 100];
  const gymWeights = [0.3, 0.25, 0.25, 0.15, 0.05];
  const gymAmount = hasGym ? weightedPick(gymAmounts, gymWeights) : 0;

  // PTO days
  const ptoDays = weightedPick([0, 5, 10, 15, 20], [0.05, 0.20, 0.45, 0.20, 0.10]);

  // Remote policy
  const remotePolicy = weightedPick(
    ["in-office", "hybrid", "remote"],
    salaryLevel > 65000 ? [0.30, 0.50, 0.20] : [0.55, 0.35, 0.10]
  );

  // Signing bonus: ~15% of higher-salary jobs
  const signingBonus = (r() < 0.15 && salaryLevel > 55000)
    ? weightedPick([500, 1000, 1500, 2000, 2500], [0.20, 0.35, 0.25, 0.15, 0.05])
    : 0;

  // Tuition reimbursement: ~20% of companies
  const tuitionReimbursement = r() < 0.20;

  // Other misc perks
  const possibleOther = [
    "Transit benefits", "Free parking", "Employee discounts",
    "Company laptop", "Cell phone stipend", "Catered lunches (2x/week)",
    "Professional development fund", "Childcare assistance", "Pet insurance"
  ];
  const other = possibleOther.filter(() => r() < 0.12);

  return {
    health: hasHealth,
    healthPlan,
    retirement401k: has401k,
    retirementPct,
    gymStipend: hasGym,
    gymAmount,
    paidTimeOff: ptoDays,
    remotePolicy,
    signingBonus,
    tuitionReimbursement,
    housing: isUltraRareHousing,
    housingAddress: isUltraRareHousing ? null : null, // set by rare job config
    housingRent: isUltraRareHousing ? 0 : 0,
    other,
  };
}

function weightedPick(options, weights) {
  const total = weights.reduce((a, b) => a + b, 0);
  let rand    = Math.random() * total;
  for (let i = 0; i < options.length; i++) {
    rand -= weights[i];
    if (rand <= 0) return options[i];
  }
  return options[options.length - 1];
}

function randomSalary(min, max) {
  // Round to nearest $500 for realism
  const raw = min + Math.random() * (max - min);
  return Math.round(raw / 500) * 500;
}

function randomPay() {
  return Math.random() < 0.65 ? "biweekly" : "monthly";
}

// Job description templates
const DESCRIPTIONS = {
  finance:    ["Analyze financial data and prepare reports for senior analysts.", "Support the finance team with reconciliations, forecasting, and monthly close activities.", "Assist in budget preparation, variance analysis, and financial modeling.", "Process transactions, maintain ledgers, and support audit readiness."],
  tech:       ["Develop and maintain software applications in a collaborative team environment.", "Provide technical support and troubleshoot hardware, software, and network issues.", "Analyze large datasets and build dashboards to support business decisions.", "Protect company systems by monitoring, detecting, and responding to cyber threats."],
  healthcare: ["Provide direct patient care under the supervision of licensed clinical staff.", "Coordinate patient intake, appointments, and care transitions.", "Support clinical operations including documentation, billing, and compliance.", "Provide mental health support services to individuals and families."],
  government: ["Support federal program administration, reporting, and compliance requirements.", "Analyze policy data and prepare briefings for senior government officials.", "Manage government contracts and ensure deliverables meet regulatory standards.", "Research legislative issues and assist with stakeholder communications."],
  education:  ["Deliver engaging instruction aligned to state standards and learning objectives.", "Support students with individualized learning plans and academic needs.", "Assist lead teachers with classroom management, instruction, and assessment.", "Advise students on academic planning, mental wellness, and college readiness."],
  hospitality:["Provide exceptional guest experiences in a fast-paced service environment.", "Coordinate event logistics, vendor relations, and client communication.", "Oversee daily food service operations including scheduling and quality control.", "Manage reservations, check-in/check-out, and guest relations."],
  marketing:  ["Create and distribute content across digital and social media platforms.", "Coordinate marketing campaigns from concept through execution.", "Write compelling copy for web, email, and print marketing materials.", "Track campaign performance metrics and prepare analytics reports."],
  legal:      ["Assist attorneys with research, filing, and case preparation.", "Organize and maintain legal documents, deadlines, and client files.", "Conduct legal research using databases and summarize findings.", "Ensure organizational compliance with laws and regulations."],
  engineering:["Support senior engineers on civil infrastructure design projects.", "Prepare technical drawings and specifications using CAD software.", "Conduct site inspections, testing, and data collection.", "Coordinate with contractors to ensure project quality and timelines."],
  trades:     ["Learn a licensed trade under journeyman supervision with hands-on training.", "Perform installations, maintenance, and repairs under direct guidance.", "Assist with service calls, diagnostics, and equipment maintenance."],
  arts:       ["Create visual assets for print, web, and social media under art direction.", "Assist with photo shoots, video production, and post-production editing.", "Support gallery programming, exhibitions, and community arts events."],
  social:     ["Provide case management support to individuals navigating social services.", "Connect clients with community resources, housing, and employment services.", "Coordinate outreach programs and maintain client records."],
  criminal:   ["Perform law enforcement duties including patrol, response, and investigation.", "Supervise individuals on probation/parole and support rehabilitation.", "Conduct investigations, document findings, and prepare case reports."],
  all:        ["Support daily office operations and administrative functions.", "Provide excellent customer service and resolve client inquiries.", "Assist multiple departments with scheduling, reporting, and correspondence.", "Coordinate logistics and ensure smooth day-to-day business operations."],
};

function getDescription(category) {
  const pool = DESCRIPTIONS[category] || DESCRIPTIONS.all;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ── ULTRA-RARE HOUSING JOBS (exactly 3) ─────────────────────
// These exist somewhere in the 500-job pool. Players must discover them.
const HOUSING_JOBS = [
  {
    jobId:       "housing_job_001",
    title:       "Residential Complex Manager Trainee",
    employer:    "Cornerstone Property Group",
    industry:    "realestate",
    level:       "entry",
    location:    "Vienna, VA",
    annualSalary: 44000,
    benefits: {
      health: true, healthPlan: "HMO",
      retirement401k: true, retirementPct: 3,
      gymStipend: false, gymAmount: 0,
      paidTimeOff: 10, remotePolicy: "in-office",
      signingBonus: 0, tuitionReimbursement: false,
      housing: true,
      housingAddress: "On-site unit, Cornerstone Oaks, Vienna, VA",
      housingRent: 350, // heavily subsidised
      other: ["Free on-site parking"],
    },
    payFrequency: "biweekly",
    description:  "Manage day-to-day operations of a residential apartment complex. Live on-site in a subsidised unit. Responsibilities include tenant relations, maintenance coordination, and leasing support.",
    majorMatch:   ["business","realestate","hospitality","all"],
    isAvailable:  true, claimedBy: null,
  },
  {
    jobId:       "housing_job_002",
    title:       "Campus Housing & Residential Life Coordinator",
    employer:    "Northern Virginia Community College",
    industry:    "education",
    level:       "entry",
    location:    "Annandale, VA",
    annualSalary: 40000,
    benefits: {
      health: true, healthPlan: "PPO",
      retirement401k: true, retirementPct: 5,
      gymStipend: true, gymAmount: 30,
      paidTimeOff: 15, remotePolicy: "in-office",
      signingBonus: 0, tuitionReimbursement: true,
      housing: true,
      housingAddress: "On-campus apartment, NOVA Annandale Campus",
      housingRent: 400,
      other: ["Free tuition for employee courses","Campus meal credits"],
    },
    payFrequency: "biweekly",
    description:  "Support student housing operations and residential programming. Live in a fully furnished on-campus apartment at a deep discount. Includes tuition benefits for personal courses.",
    majorMatch:   ["education","psychology","sociology","business","all"],
    isAvailable:  true, claimedBy: null,
  },
  {
    jobId:       "housing_job_003",
    title:       "Hotel Night Auditor & Resident Staff",
    employer:    "Harborview Hotel & Suites",
    industry:    "hospitality",
    level:       "entry",
    location:    "Reston, VA",
    annualSalary: 38000,
    benefits: {
      health: true, healthPlan: "HMO",
      retirement401k: false, retirementPct: 0,
      gymStipend: false, gymAmount: 0,
      paidTimeOff: 5, remotePolicy: "in-office",
      signingBonus: 500, tuitionReimbursement: false,
      housing: true,
      housingAddress: "Staff suite, Harborview Hotel & Suites, Reston, VA",
      housingRent: 300,
      other: ["Free hotel meals during shifts","Employee rate on hotel rooms"],
    },
    payFrequency: "biweekly",
    description:  "Work the overnight audit shift, reconcile daily transactions, and manage late-night guest services. Live in a staff suite on the property at a deep discount. Ideal for independent, self-starting candidates.",
    majorMatch:   ["hospitality","accounting","finance","all"],
    isAvailable:  true, claimedBy: null,
  },
];

// ── MAIN GENERATOR ──────────────────────────────────────────

export async function seedJobs(targetCount = 500) {
  console.log(`🏢 Generating ${targetCount} jobs...`);

  const allJobs = [];
  let idCounter = 1;

  // Categories and how many jobs to generate per category
  // Total: ~497 generated + 3 housing = 500
  const categoryTargets = {
    finance:    65,
    consulting: 30,
    tech:       80,
    healthcare: 55,
    government: 45,
    education:  40,
    hospitality:35,
    marketing:  40,
    legal:      25,
    engineering:30,
    trades:     20,
    arts:       20,
    social:     22,
    criminal:   25,
    all:        35,  // generic jobs available to everyone
  };

  for (const [category, count] of Object.entries(categoryTargets)) {
    const templates  = JOB_TEMPLATES[category] || JOB_TEMPLATES.all;
    const employers  = EMPLOYERS.filter(e =>
      e.type === category || e.type === "consulting" || category === "all"
    );
    // Fall back to all employers if category doesn't match
    const empPool = employers.length >= 2 ? employers : EMPLOYERS;

    for (let i = 0; i < count; i++) {
      const template = templates[Math.floor(Math.random() * templates.length)];
      const employer = empPool[Math.floor(Math.random() * empPool.length)];
      const salary   = randomSalary(template.salaryMin, template.salaryMax);

      // Deduplicate: add a subtle variant so same titles feel different
      const titleVariants = ["", " I", " II", " (Entry Level)", " — NoVA Division", " Trainee", " Associate"];
      const titleSuffix   = titleVariants[Math.floor(Math.random() * titleVariants.length)];
      const titleFinal    = template.title.replace(/ I$| \(Entry Level\)$/, "") + titleSuffix;

      allJobs.push({
        jobId:        `job_${String(idCounter).padStart(4, "0")}`,
        title:        titleFinal.trim(),
        employer:     employer.name,
        industry:     category,
        level:        "entry",
        location:     `${employer.city}, VA`,
        annualSalary: salary,
        benefits:     generateBenefits(salary),
        payFrequency: randomPay(),
        description:  getDescription(category),
        majorMatch:   template.majorMatch,
        isAvailable:  true,
        claimedBy:    null,
      });

      idCounter++;
    }
  }

  // Shuffle the regular jobs so housing jobs aren't obviously at the end
  for (let i = allJobs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allJobs[i], allJobs[j]] = [allJobs[j], allJobs[i]];
  }

  // Insert 3 housing jobs at random positions
  const pos1 = Math.floor(Math.random() * allJobs.length);
  const pos2 = Math.floor(Math.random() * allJobs.length);
  const pos3 = Math.floor(Math.random() * allJobs.length);
  allJobs.splice(pos1, 0, HOUSING_JOBS[0]);
  allJobs.splice(pos2, 0, HOUSING_JOBS[1]);
  allJobs.splice(pos3, 0, HOUSING_JOBS[2]);

  // Write to Firestore in batches of 499 (Firestore batch limit is 500)
  const BATCH_SIZE = 400;
  let batchCount   = 0;

  for (let i = 0; i < allJobs.length; i += BATCH_SIZE) {
    const chunk = allJobs.slice(i, i + BATCH_SIZE);
    const batch = writeBatch(db);
    for (const job of chunk) {
      batch.set(doc(db, "jobs", job.jobId), job);
    }
    await batch.commit();
    batchCount++;
    console.log(`  ✅ Batch ${batchCount}: wrote jobs ${i + 1}–${Math.min(i + BATCH_SIZE, allJobs.length)}`);
  }

  console.log(`🎉 Job seed complete! ${allJobs.length} jobs written.`);
  console.log(`   💎 3 ultra-rare housing jobs hidden at positions ${pos1}, ${pos2+1}, ${pos3+2}`);
  return allJobs.length;
}
