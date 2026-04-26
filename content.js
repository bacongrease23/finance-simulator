// ============================================================
// VAULTWOOD ACADEMY — content.js
// All game content: majors, jobs, questions, exit tickets,
// grad school programs, and email templates
// Fairfax County, VA salary and cost of living baseline
// ============================================================

// ============================================================
// COLLEGE MAJORS
// ============================================================
const MAJORS = [
  { id: "business",       label: "Business Administration" },
  { id: "finance",        label: "Finance" },
  { id: "accounting",     label: "Accounting" },
  { id: "economics",      label: "Economics" },
  { id: "marketing",      label: "Marketing" },
  { id: "cs",             label: "Computer Science" },
  { id: "it",             label: "Information Technology" },
  { id: "engineering",    label: "Engineering" },
  { id: "nursing",        label: "Nursing" },
  { id: "biology",        label: "Biology" },
  { id: "psychology",     label: "Psychology" },
  { id: "education",      label: "Education" },
  { id: "communications", label: "Communications & Media" },
  { id: "political",      label: "Political Science" },
  { id: "criminal",       label: "Criminal Justice" },
  { id: "arts",           label: "Fine Arts & Design" },
  { id: "english",        label: "English & Creative Writing" },
  { id: "sociology",      label: "Sociology & Social Work" },
  { id: "hospitality",    label: "Hospitality & Restaurant Management" },
  { id: "undecided",      label: "Undecided" }
];

// ============================================================
// GRAD SCHOOL PROGRAMS
// Loan amounts based on Northern Virginia / GMU / GWU costs
// ============================================================
const GRAD_PROGRAMS = [
  {
    id: "mba",
    label: "MBA — Master of Business Administration",
    requiredMajors: ["business","finance","accounting","economics","marketing","undecided"],
    loanAmount: 65000,
    duration: "2 years",
    unlocksLevel: "masters",
    questions: [
      {
        question: "What does ROI stand for in business?",
        options: ["Return on Investment","Rate of Inflation","Revenue Over Income","Risk of Instability"],
        answer: 0
      },
      {
        question: "A SWOT analysis evaluates which four factors?",
        options: ["Strengths, Weaknesses, Opportunities, Threats","Sales, Wages, Operations, Taxes","Supply, Workforce, Output, Technology","Strategy, Workflow, Objectives, Timeline"],
        answer: 0
      },
      {
        question: "Which financial statement shows a company's revenues and expenses over a period of time?",
        options: ["Balance Sheet","Cash Flow Statement","Income Statement","Net Worth Statement"],
        answer: 2
      },
      {
        question: "What is the primary goal of supply chain management?",
        options: ["Maximizing employee salaries","Efficiently moving goods from production to customer","Reducing the number of products offered","Increasing government regulation"],
        answer: 1
      },
      {
        question: "In marketing, the '4 Ps' refer to:",
        options: ["Profit, People, Process, Performance","Product, Price, Place, Promotion","Planning, Positioning, Pricing, Publicity","Production, Packaging, Placement, Profit"],
        answer: 1
      }
    ]
  },
  {
    id: "ms_cs",
    label: "MS — Computer Science",
    requiredMajors: ["cs","it","engineering"],
    loanAmount: 55000,
    duration: "2 years",
    unlocksLevel: "masters",
    questions: [
      {
        question: "What does an algorithm do?",
        options: ["Stores data permanently","Provides a step-by-step process to solve a problem","Connects computers to the internet","Displays graphics on a screen"],
        answer: 1
      },
      {
        question: "Which data structure operates on a 'first in, first out' basis?",
        options: ["Stack","Tree","Queue","Graph"],
        answer: 2
      },
      {
        question: "What is the purpose of a database index?",
        options: ["To encrypt sensitive data","To speed up data retrieval","To back up files automatically","To connect to the internet"],
        answer: 1
      },
      {
        question: "In object-oriented programming, what is 'inheritance'?",
        options: ["Deleting unused code","A class receiving properties from a parent class","Connecting two databases","Encrypting a program"],
        answer: 1
      },
      {
        question: "What does HTTP stand for?",
        options: ["Hyperlink Transfer Text Protocol","HyperText Transfer Protocol","High Traffic Transmission Program","Hosted Text and Transfer Process"],
        answer: 1
      }
    ]
  },
  {
    id: "msn",
    label: "MSN — Master of Science in Nursing",
    requiredMajors: ["nursing","biology"],
    loanAmount: 48000,
    duration: "2 years",
    unlocksLevel: "masters",
    questions: [
      {
        question: "What is the normal resting heart rate range for a healthy adult?",
        options: ["40-60 bpm","60-100 bpm","100-140 bpm","20-40 bpm"],
        answer: 1
      },
      {
        question: "Which type of medication reduces fever?",
        options: ["Antibiotic","Antipyretic","Anticoagulant","Antifungal"],
        answer: 1
      },
      {
        question: "What does 'triage' mean in a medical context?",
        options: ["A type of surgery","Sorting patients by urgency of care","A medication dosage system","A hospital billing process"],
        answer: 1
      },
      {
        question: "The abbreviation 'PRN' on a prescription means:",
        options: ["Take every night","Take as needed","Take before meals","Take with water only"],
        answer: 1
      },
      {
        question: "Which vital sign measures the force of blood against artery walls?",
        options: ["Temperature","Respiratory rate","Blood pressure","Pulse oximetry"],
        answer: 2
      }
    ]
  },
  {
    id: "med",
    label: "MD — Doctor of Medicine",
    requiredMajors: ["nursing","biology","psychology"],
    loanAmount: 220000,
    duration: "4 years",
    unlocksLevel: "phd",
    questions: [
      {
        question: "Which organ produces insulin?",
        options: ["Liver","Kidney","Pancreas","Gallbladder"],
        answer: 2
      },
      {
        question: "What is the most common blood type in the United States?",
        options: ["AB+","O+","B-","A+"],
        answer: 1
      },
      {
        question: "The Hippocratic Oath is associated with which principle?",
        options: ["Maximizing profit in healthcare","Do no harm","Treating only paying patients","Prioritizing research over patient care"],
        answer: 1
      },
      {
        question: "Which part of the brain controls breathing and heart rate?",
        options: ["Cerebrum","Cerebellum","Brain stem","Frontal lobe"],
        answer: 2
      },
      {
        question: "A patient with a BMI over 30 is classified as:",
        options: ["Underweight","Normal weight","Overweight","Obese"],
        answer: 3
      }
    ]
  },
  {
    id: "jd",
    label: "JD — Juris Doctor (Law)",
    requiredMajors: ["political","criminal","english","business","psychology"],
    loanAmount: 180000,
    duration: "3 years",
    unlocksLevel: "phd",
    questions: [
      {
        question: "What is the standard of proof in a criminal case?",
        options: ["Preponderance of evidence","Beyond a reasonable doubt","Clear and convincing evidence","Probable cause"],
        answer: 1
      },
      {
        question: "The First Amendment protects which of the following?",
        options: ["The right to bear arms","Freedom of speech and religion","The right to a fair trial","Protection from unreasonable searches"],
        answer: 1
      },
      {
        question: "What is a 'tort' in legal terms?",
        options: ["A type of contract","A civil wrong causing harm to another","A criminal felony charge","A property deed"],
        answer: 1
      },
      {
        question: "Which court is the highest in the United States?",
        options: ["The Federal Circuit Court","The Court of Appeals","The Supreme Court","The District Court"],
        answer: 2
      },
      {
        question: "What does 'habeas corpus' literally mean?",
        options: ["Innocent until proven guilty","You shall have the body","Let the decision stand","Beyond reasonable doubt"],
        answer: 1
      }
    ]
  },
  {
    id: "mfa",
    label: "MFA — Master of Fine Arts",
    requiredMajors: ["arts","english","communications"],
    loanAmount: 42000,
    duration: "2 years",
    unlocksLevel: "masters",
    questions: [
      {
        question: "Which art movement is Pablo Picasso most associated with?",
        options: ["Impressionism","Surrealism","Cubism","Expressionism"],
        answer: 2
      },
      {
        question: "In graphic design, what does 'kerning' refer to?",
        options: ["The color palette of a design","The spacing between individual letters","The thickness of a border","The resolution of an image"],
        answer: 1
      },
      {
        question: "Which file format is best for images that require a transparent background?",
        options: ["JPEG","BMP","PNG","GIF"],
        answer: 2
      },
      {
        question: "The term 'composition' in visual art refers to:",
        options: ["The type of paint used","How elements are arranged in a work","The subject matter of a painting","The frame around a piece"],
        answer: 1
      },
      {
        question: "Which of the following is a primary color?",
        options: ["Green","Orange","Purple","Blue"],
        answer: 3
      }
    ]
  }
];

// ============================================================
// 30 JOBS
// Salaries based on Fairfax County, VA entry-level 2024 data
// educationRequired: "undergrad" | "masters" | "phd"
// majorRequired: array of major IDs, or "any"
// ============================================================
const JOBS = [
  // --- BUSINESS & FINANCE ---
  {
    id: "financial_analyst",
    title: "Financial Analyst",
    company: "Capital One (McLean, VA)",
    salary: 72000,
    educationRequired: "undergrad",
    majorRequired: ["finance","accounting","economics","business"],
    description: "Analyze financial data and prepare reports to guide business decisions.",
    questions: [
      {
        variants: [
          { question: "What does a balance sheet show?", options: ["A company's revenues only","A company's assets, liabilities, and equity at a point in time","A company's cash flow over a year","A company's tax obligations"], answer: 1 },
          { question: "Which financial document lists what a company owns and owes?", options: ["Income statement","Cash flow statement","Balance sheet","Tax return"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "If a company earns $500,000 in revenue and has $300,000 in expenses, what is its profit?", options: ["$800,000","$200,000","$300,000","$150,000"], answer: 1 },
          { question: "Revenue of $500,000 minus costs of $300,000 equals what?", options: ["$100,000 profit","$200,000 profit","$800,000 profit","$50,000 profit"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is the purpose of a budget forecast?", options: ["To record past transactions","To predict future revenues and expenses","To calculate taxes owed","To hire new employees"], answer: 1 },
          { question: "A financial projection that estimates future income and costs is called a:", options: ["Tax filing","Budget forecast","Audit report","Payroll register"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What does 'liquidity' mean in finance?", options: ["How profitable a company is","How quickly an asset can be converted to cash","The total debt a company has","The number of employees a company has"], answer: 1 },
          { question: "An asset that can be quickly converted to cash is described as:", options: ["Illiquid","Leveraged","Liquid","Depreciated"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is compound interest?", options: ["Interest paid only on the original principal","Interest earned on both principal and previously earned interest","A fixed monthly fee charged by banks","Interest that decreases over time"], answer: 1 },
          { question: "When interest is calculated on both the original amount and accumulated interest, it is called:", options: ["Simple interest","Flat interest","Compound interest","Fixed interest"], answer: 2 },
        ]
      }
    ]
  },
  {
    id: "accountant",
    title: "Staff Accountant",
    company: "Deloitte (Tysons, VA)",
    salary: 65000,
    educationRequired: "undergrad",
    majorRequired: ["accounting","finance","business"],
    description: "Prepare and examine financial records for accuracy and tax compliance.",
    questions: [
      {
        variants: [
          { question: "What does GAAP stand for?", options: ["General Accounting and Auditing Principles","Generally Accepted Accounting Principles","Government Approved Accounting Practices","Gross Asset and Audit Policies"], answer: 1 },
          { question: "The standard rules accountants follow in the US are called:", options: ["IRS Codes","GAAP","FASB Mandates","Federal Tax Law"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is a debit in accounting?", options: ["Money leaving a bank account only","An entry that increases assets or decreases liabilities","A type of loan","A fee charged by the IRS"], answer: 1 },
          { question: "In double-entry bookkeeping, a debit entry typically:", options: ["Decreases assets","Increases liabilities","Increases assets or decreases liabilities","Only applies to expense accounts"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is depreciation?", options: ["An increase in asset value over time","The gradual reduction in the value of an asset","A type of business loan","A government tax credit"], answer: 1 },
          { question: "When a company spreads the cost of an asset over its useful life, this is called:", options: ["Amortization only","Appreciation","Depreciation","Capitalization"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "Which of the following is a liability?", options: ["Cash in a checking account","Accounts receivable","A bank loan owed by the company","Office equipment"], answer: 2 },
          { question: "Money a company owes to the bank is classified as a:", options: ["Revenue","Asset","Liability","Equity"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is the accounting equation?", options: ["Revenue - Expenses = Profit","Assets = Liabilities + Equity","Income - Taxes = Net Pay","Debits + Credits = Balance"], answer: 1 },
          { question: "Which formula is the foundation of double-entry accounting?", options: ["Assets = Liabilities + Equity","Revenue = Costs + Profit","Cash = Income - Expenses","Equity = Assets - Revenue"], answer: 0 },
        ]
      }
    ]
  },
  {
    id: "marketing_coordinator",
    title: "Marketing Coordinator",
    company: "Booz Allen Hamilton (McLean, VA)",
    salary: 58000,
    educationRequired: "undergrad",
    majorRequired: ["marketing","communications","business","arts"],
    description: "Support marketing campaigns, manage social media, and analyze consumer data.",
    questions: [
      {
        variants: [
          { question: "What is a target audience?", options: ["Every person who uses the internet","A specific group of people a campaign is designed to reach","All customers who have ever bought a product","The marketing team within a company"], answer: 1 },
          { question: "The specific group of consumers a marketing campaign is aimed at is called the:", options: ["General public","Demographics board","Target audience","Consumer base"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What does SEO stand for?", options: ["Social Engagement Operations","Search Engine Optimization","Sales and Earnings Overview","Subscriber Engagement Online"], answer: 1 },
          { question: "The process of improving a website's visibility in search engine results is called:", options: ["PPC","CRM","SEO","ROI"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is a 'call to action' in marketing?", options: ["A phone number for customer service","A prompt that encourages the audience to take a specific step","A list of product features","A marketing budget report"], answer: 1 },
          { question: "A button that says 'Buy Now' or 'Sign Up Today' is an example of a:", options: ["Brand logo","Call to action","Market segment","Consumer profile"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is brand awareness?", options: ["How much a brand spends on advertising","The extent to which consumers recognize a brand","The number of products a brand sells","A brand's annual revenue"], answer: 1 },
          { question: "When consumers can recognize and recall a company's name and image, this is called:", options: ["Market share","Brand equity","Brand awareness","Consumer loyalty"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "Which metric measures the percentage of email recipients who clicked a link?", options: ["Open rate","Bounce rate","Click-through rate","Conversion rate"], answer: 2 },
          { question: "The ratio of clicks to total email recipients is known as the:", options: ["Unsubscribe rate","Click-through rate","Delivery rate","Spam rate"], answer: 1 },
        ]
      }
    ]
  },

  // --- TECHNOLOGY ---
  {
    id: "software_developer",
    title: "Software Developer",
    company: "Amazon Web Services (Arlington, VA)",
    salary: 98000,
    educationRequired: "undergrad",
    majorRequired: ["cs","it","engineering"],
    description: "Design, build, and maintain software applications and systems.",
    questions: [
      {
        variants: [
          { question: "What is a variable in programming?", options: ["A type of computer hardware","A named storage location that holds data","A programming language","A type of software bug"], answer: 1 },
          { question: "In coding, a container that stores a value and can be referenced by name is called a:", options: ["Function","Loop","Variable","Class"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What does a 'function' do in programming?", options: ["Stores data permanently","Performs a specific task when called","Connects to the internet","Displays images on screen"], answer: 1 },
          { question: "A reusable block of code that performs a defined task is called a:", options: ["Variable","Array","Function","Loop"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is a 'bug' in software development?", options: ["A type of virus that destroys hardware","An error or flaw in the code that causes unexpected behavior","A feature that hasn't been built yet","A type of software license"], answer: 1 },
          { question: "When software doesn't behave as intended due to a coding error, that error is called a:", options: ["Patch","Bug","Update","Script"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What does 'debugging' mean?", options: ["Writing new code from scratch","Finding and fixing errors in a program","Deleting old software","Testing a finished product"], answer: 1 },
          { question: "The process of identifying and resolving code errors is known as:", options: ["Compiling","Rendering","Debugging","Deploying"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is version control used for in software development?", options: ["Setting software prices","Tracking and managing changes to code over time","Testing user interfaces","Managing employee schedules"], answer: 1 },
          { question: "A system that records changes to code so developers can revert to earlier versions is called:", options: ["A compiler","Version control","A runtime environment","An IDE"], answer: 1 },
        ]
      }
    ]
  },
  {
    id: "cybersecurity_analyst",
    title: "Cybersecurity Analyst",
    company: "Leidos (Reston, VA)",
    salary: 85000,
    educationRequired: "undergrad",
    majorRequired: ["cs","it","engineering"],
    description: "Protect computer systems and networks from cyber threats and attacks.",
    questions: [
      {
        variants: [
          { question: "What is phishing?", options: ["A type of encryption method","A fraudulent attempt to obtain sensitive information by disguising as a trustworthy source","A network security protocol","A type of firewall"], answer: 1 },
          { question: "When a criminal sends fake emails pretending to be a bank to steal passwords, this is called:", options: ["Hacking","Phishing","Spoofing","Malware"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What does a firewall do?", options: ["Speeds up internet connection","Monitors and controls incoming and outgoing network traffic","Stores data in the cloud","Encrypts email messages"], answer: 1 },
          { question: "A security system that filters network traffic based on predetermined rules is called a:", options: ["VPN","Router","Firewall","Proxy"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is two-factor authentication (2FA)?", options: ["Using two different passwords","A security process requiring two forms of verification to access an account","Logging in from two devices simultaneously","A type of encryption"], answer: 1 },
          { question: "Requiring both a password and a code sent to your phone to log in is an example of:", options: ["Encryption","Two-factor authentication","VPN access","Biometric login"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is malware?", options: ["A type of computer hardware","Software designed to disrupt, damage, or gain unauthorized access to systems","A network monitoring tool","A type of database"], answer: 1 },
          { question: "Viruses, ransomware, and spyware are all examples of:", options: ["Firmware","Malware","Software updates","Network protocols"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What does encryption do to data?", options: ["Deletes it permanently","Converts it into a coded format that only authorized parties can read","Speeds up data transfer","Backs it up automatically"], answer: 1 },
          { question: "The process of scrambling data so only someone with the correct key can read it is called:", options: ["Compression","Encryption","Indexing","Caching"], answer: 1 },
        ]
      }
    ]
  },
  {
    id: "it_support",
    title: "IT Support Specialist",
    company: "Northrop Grumman (Falls Church, VA)",
    salary: 52000,
    educationRequired: "undergrad",
    majorRequired: ["it","cs","any"],
    description: "Provide technical assistance and support for computer systems and users.",
    questions: [
      {
        variants: [
          { question: "What is the first step when troubleshooting a computer that won't turn on?", options: ["Replace the hard drive","Check that it is plugged in and the power source works","Reinstall the operating system","Call the manufacturer immediately"], answer: 1 },
          { question: "Before assuming a computer is broken, a technician should first:", options: ["Order replacement parts","Verify it has power and is properly connected","Format the hard drive","Update all software"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What does 'restarting' a computer often fix?", options: ["Hardware damage","Temporary software glitches and memory issues","Permanent data loss","Network infrastructure problems"], answer: 1 },
          { question: "Many minor computer problems can be resolved simply by:", options: ["Replacing the CPU","Upgrading the RAM","Restarting the system","Reformatting the drive"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is a device driver?", options: ["A person who transports computers","Software that allows the operating system to communicate with hardware","A type of hard drive","A network cable"], answer: 1 },
          { question: "The software that lets your operating system talk to hardware like printers and monitors is called a:", options: ["Patch","Driver","Codec","Plugin"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What does VPN stand for?", options: ["Virtual Private Network","Very Personal Node","Verified Proxy Network","Visual Processing Node"], answer: 0 },
          { question: "A secure, encrypted connection over the internet that protects user privacy is called a:", options: ["DNS","VPN","FTP","LAN"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is the purpose of a help desk ticket system?", options: ["To schedule employee vacations","To track, prioritize, and resolve IT support requests","To store company financial data","To monitor network traffic"], answer: 1 },
          { question: "When IT teams log and manage user issues through a centralized system, they are using a:", options: ["CRM platform","Help desk ticketing system","Network monitor","Data warehouse"], answer: 1 },
        ]
      }
    ]
  },

  // --- HEALTHCARE ---
  {
    id: "registered_nurse",
    title: "Registered Nurse",
    company: "Inova Fairfax Hospital",
    salary: 78000,
    educationRequired: "undergrad",
    majorRequired: ["nursing","biology"],
    description: "Provide and coordinate patient care in a hospital setting.",
    questions: [
      {
        variants: [
          { question: "What is a normal adult body temperature in Fahrenheit?", options: ["96.8°F","98.6°F","100.4°F","101.2°F"], answer: 1 },
          { question: "The standard healthy body temperature for an adult is:", options: ["97.0°F","98.6°F","99.5°F","100.0°F"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What does the abbreviation 'IV' stand for in medical care?", options: ["Internal Vaccine","Intravenous","Instant Vitals","Intensive Verification"], answer: 1 },
          { question: "When medication is delivered directly into a vein, it is given:", options: ["Orally","Subcutaneously","Intravenously","Topically"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is the purpose of taking a patient's pulse?", options: ["To measure blood pressure","To count how many times the heart beats per minute","To check oxygen levels","To measure body temperature"], answer: 1 },
          { question: "Counting heartbeats per minute is done by checking a patient's:", options: ["Blood pressure","Temperature","Pulse","Respiration"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "Which blood type is considered the universal donor?", options: ["AB+","A+","O-","B-"], answer: 2 },
          { question: "The blood type that can be donated to any patient regardless of their blood type is:", options: ["O+","AB-","O-","A+"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What does 'NPO' mean in a hospital setting?", options: ["Nothing by mouth","No pain observed","Normal patient outcome","Needs physical observation"], answer: 0 },
          { question: "When a patient is listed as NPO before surgery, they are instructed to:", options: ["Take all medications","Eat a light meal only","Have nothing to eat or drink","Drink only water"], answer: 2 },
        ]
      }
    ]
  },
  {
    id: "physician",
    title: "Physician (Primary Care)",
    company: "Kaiser Permanente (Fairfax, VA)",
    salary: 220000,
    educationRequired: "phd",
    majorRequired: ["biology","nursing","psychology"],
    description: "Diagnose and treat patients, manage long-term health conditions.",
    questions: [
      {
        variants: [
          { question: "What is a differential diagnosis?", options: ["A second opinion from another doctor","A list of possible conditions that could explain a patient's symptoms","A type of medical test","A patient's medical history"], answer: 1 },
          { question: "When a doctor creates a list of potential conditions that might explain symptoms, this is called:", options: ["A prognosis","A differential diagnosis","An informed consent","A triage protocol"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What does 'prognosis' mean?", options: ["The cause of a disease","The predicted outcome of a patient's condition","A type of medication","A surgical procedure"], answer: 1 },
          { question: "A doctor's prediction of how a patient's illness will progress is called the:", options: ["Diagnosis","Treatment plan","Prognosis","Medical history"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is the purpose of informed consent?", options: ["To bill insurance companies","To ensure patients understand and agree to a treatment before it occurs","To discharge patients from the hospital","To document allergies"], answer: 1 },
          { question: "Before performing a procedure, doctors must obtain a patient's agreement after explaining risks. This is called:", options: ["Medical clearance","Informed consent","Referral authorization","Patient advocacy"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What does 'acute' mean when describing an illness?", options: ["Lasting a very long time","Severe and of sudden onset","Mild and manageable","Related to aging"], answer: 1 },
          { question: "A condition that comes on suddenly and is severe but short-term is described as:", options: ["Chronic","Terminal","Acute","Benign"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is a contraindication?", options: ["A recommended treatment","A reason a specific treatment or drug should NOT be used","A patient's list of allergies","A type of medical test"], answer: 1 },
          { question: "When a medication should not be used because it could harm a specific patient, this is called a:", options: ["Side effect","Dosage warning","Contraindication","Drug interaction"], answer: 2 },
        ]
      }
    ]
  },

  // --- EDUCATION ---
  {
    id: "teacher",
    title: "High School Teacher",
    company: "Fairfax County Public Schools",
    salary: 58000,
    educationRequired: "undergrad",
    majorRequired: ["education","english","political","biology","psychology","mathematics"],
    description: "Educate and mentor high school students in your subject area.",
    questions: [
      {
        variants: [
          { question: "What is a lesson plan?", options: ["A school budget document","A structured outline of teaching objectives, activities, and assessments for a class","A student's homework assignment","A school calendar"], answer: 1 },
          { question: "The document a teacher prepares that outlines goals, activities, and assessments for a class session is called a:", options: ["Curriculum map","Lesson plan","Report card","Rubric"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is formative assessment?", options: ["A final exam at the end of a course","Ongoing assessments used during instruction to monitor student progress","A standardized state test","A grade given at the end of a semester"], answer: 1 },
          { question: "Quick checks for understanding that happen during a lesson, like exit tickets, are examples of:", options: ["Summative assessment","Standardized testing","Formative assessment","Benchmark exams"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What does differentiated instruction mean?", options: ["Teaching only advanced students","Tailoring instruction to meet the diverse needs of all learners","Using technology in every lesson","Teaching the same content at the same pace to everyone"], answer: 1 },
          { question: "When a teacher adjusts their methods to support students of different ability levels, they are using:", options: ["Direct instruction","Differentiated instruction","Standardized curriculum","Cooperative learning"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is an IEP?", options: ["Individual Education Plan — a customized plan for students with disabilities","International English Program","Individualized Exam Protocol","Instructional Evaluation Process"], answer: 0 },
          { question: "A legal document outlining specialized education services for a student with a disability is called:", options: ["A 504 Plan","A report card","An IEP","A behavior plan"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What does 'Bloom's Taxonomy' help teachers do?", options: ["Grade papers faster","Organize learning objectives from basic recall to higher-order thinking","Manage classroom behavior","Plan field trips"], answer: 1 },
          { question: "A framework teachers use to design learning goals ranging from remembering facts to creating new ideas is:", options: ["Maslow's Hierarchy","Gardner's Intelligences","Bloom's Taxonomy","Piaget's Stages"], answer: 2 },
        ]
      }
    ]
  },

  // --- GOVERNMENT & LAW ---
  {
    id: "attorney",
    title: "Attorney",
    company: "Fairfax County Government",
    salary: 95000,
    educationRequired: "phd",
    majorRequired: ["political","criminal","english","psychology","business"],
    description: "Represent clients and provide legal advice in civil or criminal matters.",
    questions: [
      {
        variants: [
          { question: "What is the role of a defense attorney?", options: ["To prosecute criminals on behalf of the government","To represent and defend the accused in legal proceedings","To serve as a judge in court","To write new laws"], answer: 1 },
          { question: "The lawyer who represents someone accused of a crime is called:", options: ["The prosecutor","The bailiff","The defense attorney","The arbiter"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What does 'plaintiff' mean in a civil lawsuit?", options: ["The person accused of wrongdoing","The person who files the lawsuit","The judge presiding over the case","The jury member"], answer: 1 },
          { question: "In a civil case, the party who initiates the legal action is called the:", options: ["Defendant","Plaintiff","Witness","Counsel"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is a subpoena?", options: ["A type of court verdict","A legal order requiring a person to testify or produce documents","A settlement agreement","A type of contract"], answer: 1 },
          { question: "A legal document that compels someone to appear in court or provide evidence is called a:", options: ["Warrant","Subpoena","Injunction","Deposition"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is the purpose of discovery in a legal case?", options: ["To select jury members","To allow both parties to obtain evidence from each other before trial","To present closing arguments","To determine sentencing"], answer: 1 },
          { question: "The pre-trial phase where both sides exchange relevant information and evidence is called:", options: ["Arraignment","Discovery","Voir dire","Sentencing"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What does 'pro bono' legal work mean?", options: ["Paid work for government clients","Legal services provided for free, typically for those who cannot afford it","Work done by law students","International legal cases"], answer: 1 },
          { question: "When a lawyer takes a case without charging the client, this is known as:", options: ["Contingency fee work","Pro bono work","Retainer work","Billable hours"], answer: 1 },
        ]
      }
    ]
  },
  {
    id: "police_officer",
    title: "Police Officer",
    company: "Fairfax County Police Department",
    salary: 62000,
    educationRequired: "undergrad",
    majorRequired: ["criminal","political","sociology","any"],
    description: "Enforce laws, respond to emergencies, and protect the community.",
    questions: [
      {
        variants: [
          { question: "What is probable cause?", options: ["A confession from a suspect","Reasonable grounds to believe a crime has been or is being committed","A court order to make an arrest","A witness statement"], answer: 1 },
          { question: "When an officer has sufficient reason to believe a crime has occurred, this is called:", options: ["Reasonable suspicion","Probable cause","Warrant authority","Exigent circumstance"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What are Miranda Rights?", options: ["Rights that protect police officers in the line of duty","Rights read to a suspect upon arrest informing them of their right to remain silent and have an attorney","Rights that allow police to search a home without a warrant","Rights that determine bail amounts"], answer: 1 },
          { question: "The warning that begins 'You have the right to remain silent...' is known as:", options: ["The Fourth Amendment warning","Miranda Rights","Probable cause notice","The Bill of Rights"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is the difference between a misdemeanor and a felony?", options: ["There is no difference","A misdemeanor is a less serious crime; a felony is a more serious crime","A felony can only be committed by adults","A misdemeanor always results in prison time"], answer: 1 },
          { question: "A minor criminal offense like petty theft is classified as a:", options: ["Felony","Infraction","Misdemeanor","Capital crime"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is a chain of custody in evidence handling?", options: ["The order in which suspects are arrested","The documented process of collecting, storing, and tracking evidence","A list of witnesses in a case","The ranking system within a police department"], answer: 1 },
          { question: "Documenting who collected, handled, and stored evidence to maintain its integrity is called:", options: ["Evidence logging","Chain of custody","Crime scene protocol","Forensic analysis"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is community policing?", options: ["A strategy where police only respond to 911 calls","A strategy that focuses on building relationships between police and the communities they serve","A military-style law enforcement approach","A federal police program"], answer: 1 },
          { question: "When officers engage with residents, attend community events, and build trust locally, this approach is called:", options: ["Reactive policing","Community policing","Federal enforcement","Tactical response"], answer: 1 },
        ]
      }
    ]
  },

  // --- TRADES & SKILLED LABOR ---
  {
    id: "electrician",
    title: "Licensed Electrician",
    company: "Dominion Energy Contractors (Fairfax, VA)",
    salary: 68000,
    educationRequired: "undergrad",
    majorRequired: ["engineering","any"],
    description: "Install, maintain, and repair electrical systems in homes and businesses.",
    questions: [
      {
        variants: [
          { question: "What does a circuit breaker do?", options: ["Increases electrical voltage","Automatically stops electrical flow when a circuit is overloaded","Converts AC to DC power","Measures electrical resistance"], answer: 1 },
          { question: "A device that automatically cuts power to prevent electrical overload is called a:", options: ["Fuse only","Ground fault interrupter","Circuit breaker","Voltage regulator"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is the unit used to measure electrical current?", options: ["Volts","Watts","Amperes (Amps)","Ohms"], answer: 2 },
          { question: "Electrical current flowing through a circuit is measured in:", options: ["Volts","Ohms","Kilowatts","Amperes"], answer: 3 },
        ]
      },
      {
        variants: [
          { question: "What color is typically used for the ground wire in US electrical wiring?", options: ["Black","White","Green or bare copper","Red"], answer: 2 },
          { question: "In standard US wiring, the grounding wire is usually:", options: ["Black","White or gray","Red","Green or bare copper"], answer: 3 },
        ]
      },
      {
        variants: [
          { question: "What is the purpose of a GFCI outlet?", options: ["To increase electrical output","To protect against electrical shock in wet areas","To store electrical energy","To reduce electricity bills"], answer: 1 },
          { question: "The type of outlet required near sinks and in bathrooms that shuts off power if a ground fault is detected is called:", options: ["AFCI","Standard outlet","GFCI","Three-prong outlet"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What does voltage measure in an electrical system?", options: ["The rate of electrical flow","The resistance in a circuit","The electrical potential difference that drives current","The total power consumed"], answer: 2 },
          { question: "The force that pushes electrical current through a circuit is called:", options: ["Amperage","Wattage","Voltage","Resistance"], answer: 2 },
        ]
      }
    ]
  },
  {
    id: "plumber",
    title: "Licensed Plumber",
    company: "Local 602 Plumbers Union (Fairfax, VA)",
    salary: 65000,
    educationRequired: "undergrad",
    majorRequired: ["engineering","any"],
    description: "Install and repair pipes, fixtures, and water systems in buildings.",
    questions: [
      {
        variants: [
          { question: "What is the purpose of a P-trap under a sink?", options: ["To increase water pressure","To hold water that blocks sewer gases from entering the building","To filter drinking water","To measure water flow"], answer: 1 },
          { question: "The curved pipe section under a sink that prevents sewer gas from entering a home is called a:", options: ["Shutoff valve","Drain stopper","P-trap","Vent pipe"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What should you do first if a pipe bursts in a home?", options: ["Call a plumber immediately","Shut off the main water supply valve","Open all the faucets","Wait to see if it stops on its own"], answer: 1 },
          { question: "The first action to take when a pipe breaks and water is flooding is to:", options: ["Use a bucket to catch water","Shut off the main water valve","Turn on the hot water heater","Call 911"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is water pressure measured in?", options: ["Gallons per hour","PSI (pounds per square inch)","Liters per minute","Kilowatts"], answer: 1 },
          { question: "The unit used to measure the force of water in a plumbing system is:", options: ["GPM","BTU","PSI","CFM"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is the purpose of a water heater's pressure relief valve?", options: ["To increase water temperature","To release pressure if the tank gets dangerously over-pressurized","To filter sediment","To measure water usage"], answer: 1 },
          { question: "A safety device on a water heater that opens to release pressure if it builds too high is called a:", options: ["Thermostat valve","Pressure relief valve","Ball valve","Check valve"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What material are most modern residential water supply pipes made from?", options: ["Lead","Cast iron","PEX or copper","Galvanized steel"], answer: 2 },
          { question: "The most common pipe materials used in modern home plumbing are:", options: ["Clay and cement","Lead and iron","Copper and PEX","Asbestos and rubber"], answer: 2 },
        ]
      }
    ]
  },

  // --- HOSPITALITY & FOOD SERVICE ---
  {
    id: "restaurant_manager",
    title: "Restaurant Manager",
    company: "Founding Farmers (Tysons, VA)",
    salary: 52000,
    educationRequired: "undergrad",
    majorRequired: ["hospitality","business","any"],
    description: "Oversee daily restaurant operations, staff, and customer experience.",
    questions: [
      {
        variants: [
          { question: "What is food cost percentage?", options: ["The price a restaurant charges for a dish","The ratio of food costs to food revenue, used to measure profitability","The amount of food wasted per week","The cost of kitchen equipment"], answer: 1 },
          { question: "The formula that compares the cost of ingredients to the revenue from food sales is called:", options: ["Labor cost ratio","Food cost percentage","Gross margin","Operating cost"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What does FIFO mean in restaurant inventory management?", options: ["Food In, Food Out","First In, First Out — oldest inventory is used first","Fast Inventory For Operations","Food Inspection and Freshness Order"], answer: 1 },
          { question: "The inventory practice of using the oldest stock before newer stock is called:", options: ["LIFO","FIFO","Just-in-time","Par level management"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is a health inspection in a restaurant context?", options: ["A checkup for restaurant staff","An official review of a restaurant's food safety and sanitation practices","A financial audit by the government","A review of menu prices"], answer: 1 },
          { question: "When a government official visits a restaurant to check cleanliness and food handling practices, this is called:", options: ["A franchise review","A health inspection","A quality audit","A food certification"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is a 'cover' in restaurant terms?", options: ["The restaurant's roof","A single customer served during a meal period","A menu item","The total square footage of the dining room"], answer: 1 },
          { question: "In the restaurant industry, each individual guest served at a table is referred to as a:", options: ["Turn","Cover","Seat","Reservation"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What does 'table turn time' mean?", options: ["How often tables are cleaned","How long a table is occupied from seating to departure","The rotation of staff assignments","How frequently the menu changes"], answer: 1 },
          { question: "The amount of time between when guests are seated and when they leave, freeing the table for new guests, is called:", options: ["Service time","Table turn time","Reservation window","Seating cycle"], answer: 1 },
        ]
      }
    ]
  },

  // --- CREATIVE & MEDIA ---
  {
    id: "graphic_designer",
    title: "Graphic Designer",
    company: "ICF Next (Fairfax, VA)",
    salary: 55000,
    educationRequired: "undergrad",
    majorRequired: ["arts","communications","marketing"],
    description: "Create visual content for digital and print media.",
    questions: [
      {
        variants: [
          { question: "What is the rule of thirds in design?", options: ["Using only three colors in a design","A composition guideline dividing an image into nine equal parts to create balance","Using three fonts maximum","A printing technique using three ink colors"], answer: 1 },
          { question: "A design principle where an image is divided into a 3x3 grid to help place subjects at interesting intersection points is called:", options: ["The golden ratio","The rule of thirds","Symmetrical balance","The Gestalt principle"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is the difference between RGB and CMYK color modes?", options: ["There is no difference","RGB is for screens (light); CMYK is for printing (ink)","RGB is for printing; CMYK is for screens","RGB uses more colors than CMYK"], answer: 1 },
          { question: "When designing for a website, you use RGB. When designing for a printed brochure, you use:", options: ["HSL","RGB","CMYK","Pantone only"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is white space in graphic design?", options: ["A background that is always white","The empty or blank areas in a design that give visual breathing room","A type of font","A printing error"], answer: 1 },
          { question: "The intentional use of empty areas around design elements to improve readability is called:", options: ["Negative space or white space","Dead space","Layout padding","Margin overflow"], answer: 0 },
        ]
      },
      {
        variants: [
          { question: "What is a vector graphic?", options: ["A photograph taken with a high-resolution camera","An image made of mathematical paths that can be scaled without losing quality","A type of 3D rendering","A bitmap image"], answer: 1 },
          { question: "Unlike raster images, these graphics can be resized to any dimension without becoming blurry:", options: ["JPEG files","PNG files","Vector graphics","GIF files"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is typography in design?", options: ["A type of photography","The art and technique of arranging text to make it readable and visually appealing","A color theory concept","A layout grid system"], answer: 1 },
          { question: "Choosing fonts, sizes, spacing, and arrangement to communicate effectively with text is called:", options: ["Copywriting","Typography","Kerning only","Layout design"], answer: 1 },
        ]
      }
    ]
  },
  {
    id: "journalist",
    title: "Journalist / Reporter",
    company: "Washington Post (Arlington, VA)",
    salary: 54000,
    educationRequired: "undergrad",
    majorRequired: ["communications","english","political"],
    description: "Research, write, and report news stories for print or digital media.",
    questions: [
      {
        variants: [
          { question: "What is the inverted pyramid style of writing?", options: ["A style that saves the most important information for the end","A structure that presents the most newsworthy information first, followed by details","A poetic writing technique","A style used only in opinion pieces"], answer: 1 },
          { question: "The journalism writing structure that leads with the most critical facts and follows with background details is:", options: ["Narrative structure","The inverted pyramid","Feature writing","Editorial structure"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is a primary source in journalism?", options: ["The editor of a newspaper","Direct, firsthand information such as interviews, documents, or eyewitness accounts","A news article from another outlet","A published book"], answer: 1 },
          { question: "An interview with a witness or an original government document would be considered a:", options: ["Secondary source","Tertiary source","Primary source","Editorial source"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What does it mean to 'fact-check' a story?", options: ["To make a story more interesting","To verify that claims in a story are accurate and supported by evidence","To check the length of an article","To review grammar and spelling only"], answer: 1 },
          { question: "The process of verifying the accuracy of information before publishing is called:", options: ["Editing","Proofreading","Fact-checking","Attribution"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is the 'who, what, when, where, why, and how' framework called in journalism?", options: ["The 6 W's","The Five W's and H","The news checklist","The lead formula"], answer: 1 },
          { question: "Journalists use this set of questions to ensure all essential information is covered in a story:", options: ["The 4 P's","The inverted pyramid","The Five W's and H","The AP Style Guide"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is editorial independence?", options: ["The right of advertisers to control news content","The principle that journalists should report news without outside interference or bias","A type of newspaper ownership structure","The editor's ability to hire and fire staff"], answer: 1 },
          { question: "The concept that news coverage should be free from pressure by advertisers, governments, or owners is called:", options: ["Press freedom","Editorial independence","Media literacy","Journalistic bias"], answer: 1 },
        ]
      }
    ]
  },

  // --- SOCIAL SERVICES ---
  {
    id: "social_worker",
    title: "Social Worker",
    company: "Fairfax County Department of Family Services",
    salary: 54000,
    educationRequired: "undergrad",
    majorRequired: ["sociology","psychology","education"],
    description: "Help individuals and families access resources and navigate difficult situations.",
    questions: [
      {
        variants: [
          { question: "What is a case plan in social work?", options: ["A social worker's daily schedule","A documented outline of goals and services designed to help a client achieve stability","A government funding application","A legal document filed with the court"], answer: 1 },
          { question: "The individualized document that outlines a client's goals, needed services, and progress timelines is called a:", options: ["Intake form","Referral document","Case plan","Incident report"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What does 'mandated reporter' mean?", options: ["A reporter who covers social services stories","A professional required by law to report suspected child abuse or neglect","A social worker who files court documents","A government official who audits agencies"], answer: 1 },
          { question: "Teachers, social workers, and healthcare workers who are legally required to report suspected abuse are called:", options: ["Mandatory witnesses","Mandated reporters","Case managers","Legal guardians"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is the purpose of a needs assessment in social work?", options: ["To determine a client's income","To evaluate what support services a client requires","To decide if a client qualifies for welfare","To audit a social service agency"], answer: 1 },
          { question: "The process of identifying what resources and support a client needs is called:", options: ["An intake interview","A background check","A needs assessment","A referral evaluation"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What does 'client confidentiality' mean in social work?", options: ["Clients must keep their social worker's information private","A social worker must protect client information and not disclose it without consent","All client files are shared with government agencies","Clients may review their social worker's personal records"], answer: 1 },
          { question: "The ethical obligation to protect the privacy of a client's personal information is called:", options: ["Client autonomy","Professional boundaries","Client confidentiality","Duty to warn"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is 'active listening' in a social work context?", options: ["Taking detailed notes during a client meeting","Fully concentrating on, understanding, and responding to a client to show engagement","Listening to recorded sessions","Reading a client's case file thoroughly"], answer: 1 },
          { question: "When a social worker gives their full attention to a client and responds in a way that demonstrates understanding, this is called:", options: ["Passive listening","Reflective listening","Active listening","Clinical observation"], answer: 2 },
        ]
      }
    ]
  },
  {
    id: "psychologist",
    title: "Licensed Psychologist",
    company: "Northern Virginia Mental Health Institute",
    salary: 88000,
    educationRequired: "phd",
    majorRequired: ["psychology","sociology"],
    description: "Assess and treat mental health conditions through therapy and evaluation.",
    questions: [
      {
        variants: [
          { question: "What is cognitive behavioral therapy (CBT)?", options: ["A type of medication for anxiety","A therapy that focuses on changing negative thought patterns to improve behavior and emotions","A hypnosis technique","A group therapy method only"], answer: 1 },
          { question: "The therapy approach that helps patients identify and change unhelpful thinking patterns is called:", options: ["Psychoanalysis","Exposure therapy","Cognitive behavioral therapy","EMDR"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is the DSM-5?", options: ["A medication dosing guide","The Diagnostic and Statistical Manual of Mental Disorders, used to diagnose mental health conditions","A therapy treatment plan","A government mental health policy"], answer: 1 },
          { question: "The standard reference manual psychologists use to diagnose mental health disorders is called:", options: ["The ICD-10","The DSM-5","The PDR","The APA Guidelines"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is the placebo effect?", options: ["A dangerous medication side effect","An improvement in symptoms caused by a patient's belief in a treatment, not the treatment itself","A type of therapy","A measurement of drug effectiveness"], answer: 1 },
          { question: "When a patient improves because they believe they are receiving effective treatment, even if they are not, this is called:", options: ["The nocebo effect","Confirmation bias","The placebo effect","Therapeutic expectation"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What does 'informed consent' mean in psychology?", options: ["Getting consent from insurance companies","A patient agreeing to participate in therapy or research after being fully informed of the process and risks","A doctor's authorization to treat a patient","Getting parental consent for a minor"], answer: 1 },
          { question: "Before beginning therapy or a study, a psychologist must obtain the client's agreement after explaining all aspects. This is:", options: ["Confidentiality agreement","Release of information","Informed consent","Treatment authorization"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is Maslow's Hierarchy of Needs?", options: ["A medication treatment protocol","A motivational theory stating humans must meet basic needs before pursuing higher-level needs","A personality assessment tool","A diagnostic criteria framework"], answer: 1 },
          { question: "The pyramid-shaped theory suggesting people are motivated first by survival needs, then safety, belonging, esteem, and finally self-actualization is:", options: ["Erikson's Stages","Maslow's Hierarchy of Needs","Freud's Psychosexual Theory","Piaget's Cognitive Development"], answer: 1 },
        ]
      }
    ]
  },

  // --- ENGINEERING ---
  {
    id: "civil_engineer",
    title: "Civil Engineer",
    company: "VDOT (Fairfax, VA)",
    salary: 78000,
    educationRequired: "undergrad",
    majorRequired: ["engineering"],
    description: "Design and oversee construction of infrastructure like roads and bridges.",
    questions: [
      {
        variants: [
          { question: "What is a load-bearing wall?", options: ["Any wall in a building","A wall that supports the weight of the structure above it","A wall made of concrete only","An exterior wall"], answer: 1 },
          { question: "A wall that carries structural weight from the roof or upper floors down to the foundation is called:", options: ["A partition wall","A curtain wall","A load-bearing wall","A retaining wall"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is the purpose of a retaining wall?", options: ["To divide rooms inside a building","To hold back soil and prevent erosion or collapse","To support a roof structure","To provide sound insulation"], answer: 1 },
          { question: "A structure built to prevent soil from sliding or collapsing on a slope is called a:", options: ["Foundation wall","Retaining wall","Shear wall","Grade beam"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What does 'tensile strength' mean in engineering?", options: ["How much weight a material can hold from above","The maximum stress a material can withstand while being stretched before breaking","How resistant a material is to heat","How flexible a material is"], answer: 1 },
          { question: "The maximum pulling force a material can handle before it breaks is called its:", options: ["Compressive strength","Shear strength","Tensile strength","Yield strength"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is a foundation in construction?", options: ["The first floor of a building","The structural base that transfers a building's load to the ground","The framework of a building's walls","The waterproofing layer of a building"], answer: 1 },
          { question: "The part of a structure that sits below ground and supports the entire weight of the building is called the:", options: ["Slab","Grade beam","Foundation","Footing"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is stormwater runoff?", options: ["Water that evaporates from roads","Precipitation that flows over land surfaces into waterways rather than soaking into the ground","Water released from a dam","Wastewater from buildings"], answer: 1 },
          { question: "When rainwater flows across paved or hard surfaces and enters storm drains or waterways, this is called:", options: ["Groundwater recharge","Stormwater runoff","Wastewater discharge","Aquifer flow"], answer: 1 },
        ]
      }
    ]
  },
  {
    id: "aerospace_engineer",
    title: "Aerospace Engineer",
    company: "Northrop Grumman (Herndon, VA)",
    salary: 92000,
    educationRequired: "undergrad",
    majorRequired: ["engineering","cs"],
    description: "Design and test aircraft, spacecraft, and defense systems.",
    questions: [
      {
        variants: [
          { question: "What are the four forces of flight?", options: ["Speed, altitude, drag, and mass","Lift, weight, thrust, and drag","Power, velocity, resistance, and gravity","Pressure, density, friction, and momentum"], answer: 1 },
          { question: "The forces acting on an aircraft in flight are:", options: ["Gravity, wind, speed, and engine power","Lift, weight, thrust, and drag","Altitude, heading, pitch, and roll","Fuel, mass, velocity, and pressure"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is Bernoulli's principle as it relates to flight?", options: ["Heavier objects fall faster","Faster-moving air creates lower pressure, generating lift on a wing","Thrust equals the mass times acceleration","Objects in motion stay in motion"], answer: 1 },
          { question: "The concept that explains how a wing generates lift due to air pressure differences is:", options: ["Newton's Third Law","Bernoulli's principle","Boyle's Law","Pascal's Principle"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What does Mach 1 represent?", options: ["The speed of light","The speed of sound (approximately 767 mph at sea level)","Twice the speed of sound","The maximum speed of a commercial airplane"], answer: 1 },
          { question: "An aircraft traveling at the speed of sound is traveling at:", options: ["Mach 2","Mach 0.5","Mach 1","Mach 3"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is a wind tunnel used for in aerospace engineering?", options: ["To generate electricity","To test how air flows around vehicles and structures","To simulate zero-gravity conditions","To test engine fuel efficiency"], answer: 1 },
          { question: "Aerospace engineers use this tool to study how airflow interacts with aircraft designs:", options: ["A pressure chamber","A wind tunnel","A centrifuge","A vacuum chamber"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What does CAD stand for in engineering design?", options: ["Computer Aided Design","Component Assembly Diagram","Calculated Aerospace Data","Construction and Assembly Documentation"], answer: 0 },
          { question: "Engineers use software called _____ to create precise 2D and 3D models of their designs.", options: ["CAD","CAM","BIM","FEA"], answer: 0 },
        ]
      }
    ]
  },

  // --- REAL ESTATE & FINANCE ---
  {
    id: "real_estate_agent",
    title: "Real Estate Agent",
    company: "Keller Williams (Fairfax, VA)",
    salary: 62000,
    educationRequired: "undergrad",
    majorRequired: ["business","finance","marketing","any"],
    description: "Help clients buy, sell, and rent properties.",
    questions: [
      {
        variants: [
          { question: "What is a listing agreement?", options: ["A document buyers sign when making an offer","A contract between a homeowner and an agent giving the agent the right to sell the home","A mortgage application","A home inspection report"], answer: 1 },
          { question: "When a homeowner signs a contract giving an agent permission to sell their home, they are signing a:", options: ["Purchase agreement","Buyer's agency agreement","Listing agreement","Title deed"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What does 'closing costs' refer to in a real estate transaction?", options: ["The final price of a home","Fees and expenses paid at the completion of a real estate transaction, beyond the purchase price","The cost of moving into a new home","The real estate agent's commission only"], answer: 1 },
          { question: "The various fees — such as title insurance, appraisal, and lender fees — paid when a home sale is finalized are called:", options: ["Down payment","Escrow deposits","Closing costs","Earnest money"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is a comparative market analysis (CMA)?", options: ["A home inspection report","An evaluation of a home's value based on recent sales of similar nearby properties","A mortgage approval document","A property tax assessment"], answer: 1 },
          { question: "To help determine the right listing price, agents compare a home to recently sold similar homes. This is called a:", options: ["Property appraisal","Comparative market analysis","Home valuation index","Broker price opinion"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is earnest money?", options: ["The real estate agent's commission","A good-faith deposit made by the buyer when submitting an offer","The seller's down payment","A home warranty payment"], answer: 1 },
          { question: "When a buyer makes an offer, they typically submit a deposit to show they are serious. This is called:", options: ["Down payment","Closing deposit","Earnest money","Escrow fee"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What does 'contingent' mean in a real estate listing?", options: ["The home has been sold","An offer has been accepted but the sale depends on certain conditions being met","The home is available for immediate sale","The home failed inspection"], answer: 1 },
          { question: "When a home sale is dependent on conditions like a passing inspection or financing approval, the listing status is:", options: ["Pending","Active","Contingent","Closed"], answer: 2 },
        ]
      }
    ]
  },
  {
    id: "loan_officer",
    title: "Mortgage Loan Officer",
    company: "Wells Fargo (Tysons, VA)",
    salary: 68000,
    educationRequired: "undergrad",
    majorRequired: ["finance","business","accounting","economics"],
    description: "Evaluate and process mortgage and loan applications for clients.",
    questions: [
      {
        variants: [
          { question: "What is a credit score?", options: ["Your total income for the year","A numerical rating representing your creditworthiness based on your borrowing history","The total amount of debt you owe","Your bank account balance"], answer: 1 },
          { question: "The three-digit number that reflects how reliably you repay borrowed money is called your:", options: ["Net worth","Credit limit","Credit score","Debt ratio"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is a debt-to-income ratio (DTI)?", options: ["Your total debt divided by your assets","The percentage of your gross monthly income that goes toward debt payments","Your monthly expenses divided by savings","Your credit limit divided by your debt"], answer: 1 },
          { question: "Lenders use this ratio to compare how much you owe each month to how much you earn:", options: ["LTV ratio","APR","Debt-to-income ratio","Amortization rate"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is an APR on a loan?", options: ["The base interest rate without fees","The Annual Percentage Rate — the total yearly cost of borrowing including fees and interest","The monthly payment amount","The loan origination fee"], answer: 1 },
          { question: "The true cost of a loan expressed as a yearly percentage, including all fees and interest, is called the:", options: ["Prime rate","Interest rate","APR","Amortization rate"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is amortization in the context of a mortgage?", options: ["The penalty for paying off a loan early","The process of paying off a loan through regular scheduled payments of principal and interest over time","The increase in home value over time","The down payment requirement"], answer: 1 },
          { question: "When a loan is paid off gradually through regular monthly payments, this process is called:", options: ["Depreciation","Amortization","Refinancing","Capitalization"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is a fixed-rate mortgage?", options: ["A mortgage where the interest rate changes monthly","A mortgage where the interest rate stays the same for the life of the loan","A mortgage with no down payment required","A short-term loan with a balloon payment"], answer: 1 },
          { question: "A home loan with the same interest rate and monthly payment for the entire repayment period is called a:", options: ["Adjustable-rate mortgage","Interest-only mortgage","Fixed-rate mortgage","Balloon mortgage"], answer: 2 },
        ]
      }
    ]
  },

  // --- GOVERNMENT & PUBLIC SERVICE ---
  {
    id: "city_planner",
    title: "Urban/City Planner",
    company: "Fairfax County Planning Division",
    salary: 72000,
    educationRequired: "masters",
    majorRequired: ["political","engineering","sociology","economics"],
    description: "Develop plans and programs for land use in communities.",
    questions: [
      {
        variants: [
          { question: "What is zoning?", options: ["A system for measuring land area","A legal framework that divides land into areas designated for specific uses like residential, commercial, or industrial","A type of building permit","A property tax system"], answer: 1 },
          { question: "Laws that regulate how land in different areas can be used — such as housing, retail, or industry — are called:", options: ["Building codes","Zoning regulations","Eminent domain laws","Property ordinances"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is mixed-use development?", options: ["A development that combines residential and commercial spaces in the same area or building","A building that mixes new and old construction styles","A property with multiple owners","A neighborhood with both rentals and owned homes"], answer: 0 },
          { question: "When a single building or neighborhood contains both apartments and retail shops, this is called:", options: ["Multi-family housing","Mixed-use development","Transit-oriented design","Planned unit development"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is a General Plan or Comprehensive Plan?", options: ["A city's annual budget","A long-term guide for land use, transportation, and community development in a city or county","A specific building construction blueprint","A traffic management system"], answer: 1 },
          { question: "The document that guides a city's long-term development goals for land use, housing, and infrastructure is called a:", options: ["Capital improvement plan","Comprehensive plan","Zoning ordinance","Development permit"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is eminent domain?", options: ["A city's right to tax property","The government's right to acquire private property for public use, with fair compensation","A zoning exemption for historical buildings","A property owner's right to develop their land"], answer: 1 },
          { question: "When the government acquires privately owned land to build a highway or school, paying the owner fair market value, this is called:", options: ["Foreclosure","Eminent domain","Rezoning","Condemnation only"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is an environmental impact assessment?", options: ["A property tax calculation","A study that evaluates the potential environmental effects of a proposed development project","A review of a building's energy efficiency","A noise pollution complaint process"], answer: 1 },
          { question: "Before a major development is approved, planners must complete a study of how it will affect the environment. This is called:", options: ["A traffic study","A fiscal impact analysis","An environmental impact assessment","A land survey"], answer: 2 },
        ]
      }
    ]
  },
  {
    id: "firefighter",
    title: "Firefighter / EMT",
    company: "Fairfax County Fire and Rescue",
    salary: 58000,
    educationRequired: "undergrad",
    majorRequired: ["any"],
    description: "Respond to fires, medical emergencies, and rescue situations.",
    questions: [
      {
        variants: [
          { question: "What is the correct order of the fire triangle?", options: ["Water, wind, and fuel","Heat, fuel, and oxygen","Smoke, heat, and ignition","Carbon dioxide, heat, and fuel"], answer: 1 },
          { question: "For a fire to burn it needs three things. They are:", options: ["Smoke, heat, and fuel","Heat, fuel, and oxygen","Ignition, air, and accelerant","Spark, oxygen, and carbon"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What does the acronym PASS stand for when using a fire extinguisher?", options: ["Pull, Aim, Squeeze, Sweep","Push, Activate, Spray, Scatter","Point, Apply, Squirt, Smother","Prepare, Aim, Spray, Stop"], answer: 0 },
          { question: "When operating a fire extinguisher, you should remember the acronym:", options: ["RACE","PASS","STOP","PULL"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is triage in emergency medical response?", options: ["Treating the least injured patients first","Sorting patients by severity of injury to determine treatment priority","Transporting all patients to the same hospital","Documenting injuries for insurance purposes"], answer: 1 },
          { question: "When multiple patients are injured, first responders sort them by urgency of care. This process is called:", options: ["Staging","Assessment","Triage","Intake"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What does CPR stand for?", options: ["Cardiac Pulse Restoration","Cardiopulmonary Resuscitation","Critical Patient Response","Chest Pressure Routine"], answer: 1 },
          { question: "The emergency procedure combining chest compressions and rescue breathing to maintain blood flow is called:", options: ["AED treatment","CPR","Defibrillation","BLS"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is the incident command system (ICS)?", options: ["A fire department scheduling tool","A standardized management structure used during emergencies to coordinate response efforts","A radio communication system","A firefighter training program"], answer: 1 },
          { question: "The organized command structure that allows multiple agencies to work together effectively during an emergency is called:", options: ["Emergency operations center","Mutual aid agreement","Incident command system","Unified command protocol"], answer: 2 },
        ]
      }
    ]
  },

  // --- ADDITIONAL VARIED ROLES ---
  {
    id: "pharmacist",
    title: "Pharmacist",
    company: "Inova Health System (Fairfax, VA)",
    salary: 125000,
    educationRequired: "phd",
    majorRequired: ["biology","nursing","chemistry"],
    description: "Dispense medications, counsel patients, and ensure safe drug use.",
    questions: [
      {
        variants: [
          { question: "What is a generic drug?", options: ["A drug with no brand name that has never been tested","A medication that is bioequivalent to a brand-name drug but sold at a lower cost","A drug that treats multiple conditions","An over-the-counter medication"], answer: 1 },
          { question: "A medication that contains the same active ingredient as a brand-name drug but costs less is called a:", options: ["Controlled substance","Supplement","Generic drug","Compounded medication"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is a drug interaction?", options: ["The side effects of a single medication","When two or more drugs affect each other in ways that alter their effectiveness or cause harm","The dosage instructions on a prescription","An allergic reaction to medication"], answer: 1 },
          { question: "When two medications taken together produce a dangerous or reduced effect, this is called a:", options: ["Contraindication","Drug interaction","Adverse reaction","Therapeutic duplication"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What does 'PRN' mean on a prescription label?", options: ["Prior to eating","Take as needed","Take before noon","Prescription renewal needed"], answer: 1 },
          { question: "A doctor writes 'PRN' on a prescription. This means the patient should take it:", options: ["Every morning","At bedtime only","As needed","Twice daily"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is the purpose of a formulary?", options: ["A list of pharmacy hours","A list of medications approved and covered by a health insurance plan","A drug testing protocol","A dosage calculation guide"], answer: 1 },
          { question: "When an insurance plan publishes a list of drugs it will cover, this list is called a:", options: ["Drug schedule","Benefit summary","Formulary","Medication guide"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is a controlled substance?", options: ["Any prescription medication","A drug regulated by the government due to its potential for abuse or dependence","An over-the-counter medication","A vitamin or supplement"], answer: 1 },
          { question: "Medications like opioids that are tightly regulated by the DEA because of their abuse potential are called:", options: ["Prescription drugs","Generic medications","Controlled substances","Therapeutic agents"], answer: 2 },
        ]
      }
    ]
  },
  {
    id: "hr_specialist",
    title: "HR Specialist",
    company: "General Dynamics IT (Fairfax, VA)",
    salary: 60000,
    educationRequired: "undergrad",
    majorRequired: ["business","psychology","sociology","communications"],
    description: "Recruit employees, manage benefits, and ensure workplace compliance.",
    questions: [
      {
        variants: [
          { question: "What is onboarding in HR?", options: ["The process of terminating an employee","The process of integrating a new employee into the organization","A type of performance review","A benefits enrollment period"], answer: 1 },
          { question: "The structured process that helps new hires learn their roles and company culture is called:", options: ["Orientation only","Offboarding","Onboarding","Performance management"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What does 'at-will employment' mean?", options: ["Employees can only be fired for documented reasons","Either the employer or employee can end employment at any time for any legal reason","Employees are guaranteed a minimum one-year contract","Employees work voluntarily without pay"], answer: 1 },
          { question: "In most US states, a job arrangement where employment can be ended by either party at any time is called:", options: ["Contract employment","Union employment","At-will employment","Probationary employment"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is the purpose of a performance review?", options: ["To determine whether to hire a new employee","To evaluate an employee's work, set goals, and provide feedback","To calculate payroll taxes","To review workplace safety protocols"], answer: 1 },
          { question: "A formal evaluation where a manager assesses an employee's contributions and areas for improvement is called a:", options: ["Onboarding session","Performance review","Exit interview","Skills assessment"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is workplace harassment?", options: ["A disagreement between coworkers","Unwelcome conduct based on a protected characteristic that creates a hostile work environment","Any criticism from a manager","A strict company policy"], answer: 1 },
          { question: "Repeated unwelcome behavior based on race, gender, religion, or other protected characteristics is called:", options: ["Workplace conflict","Workplace harassment","Constructive dismissal","Employee misconduct"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is FMLA?", options: ["Federal Minimum Labor Act","Family and Medical Leave Act — allows eligible employees to take unpaid leave for family or health reasons","Fair Market Labor Agreement","Federal Management and Labor Act"], answer: 1 },
          { question: "The law that gives eligible employees up to 12 weeks of unpaid, job-protected leave for family or medical reasons is the:", options: ["ADA","FLSA","FMLA","ERISA"], answer: 2 },
        ]
      }
    ]
  },
  {
    id: "data_analyst",
    title: "Data Analyst",
    company: "MITRE Corporation (McLean, VA)",
    salary: 76000,
    educationRequired: "undergrad",
    majorRequired: ["cs","it","economics","finance","business","engineering"],
    description: "Collect and interpret data to help organizations make better decisions.",
    questions: [
      {
        variants: [
          { question: "What is the purpose of data visualization?", options: ["To encrypt sensitive data","To represent data graphically so patterns and insights are easier to understand","To store large amounts of data","To collect data from users"], answer: 1 },
          { question: "Charts, graphs, and dashboards that make data easier to interpret are forms of:", options: ["Data mining","Data visualization","Data warehousing","Data modeling"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What does SQL stand for?", options: ["Structured Query Language","Simple Query Logic","Standard Question Language","Sequential Query Library"], answer: 0 },
          { question: "The language used to manage and query relational databases is called:", options: ["Python","HTML","SQL","Java"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is a KPI?", options: ["A type of programming language","Key Performance Indicator — a measurable value that shows how effectively goals are being met","A database management system","A data encryption standard"], answer: 1 },
          { question: "A measurable metric used to evaluate success in achieving objectives is called a:", options: ["Benchmark","KPI","ROI","Dashboard"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is an outlier in a data set?", options: ["The most common value in a data set","A data point that differs significantly from other observations","The average of all values","A missing or null value"], answer: 1 },
          { question: "A value in a data set that is unusually high or low compared to the rest is called an:", options: ["Average","Median","Outlier","Mode"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is the difference between mean and median?", options: ["They are the same thing","Mean is the average of all values; median is the middle value when data is sorted","Mean is the most frequent value; median is the average","Mean only applies to small data sets"], answer: 1 },
          { question: "You add all values and divide by the count to get the _____, while the middle value in an ordered list is the _____.", options: ["Median, mean","Mode, mean","Mean, median","Range, median"], answer: 2 },
        ]
      }
    ]
  },
  {
    id: "freelance_artist",
    title: "Freelance Artist / Illustrator",
    company: "Self-Employed (Northern Virginia)",
    salary: 38000,
    educationRequired: "undergrad",
    majorRequired: ["arts","communications","any"],
    description: "Create artwork and illustrations for clients on a project basis.",
    questions: [
      {
        variants: [
          { question: "What is a client brief in freelance work?", options: ["A short thank-you note to a client","A document outlining the client's project requirements, goals, and expectations","A contract for payment","A portfolio of past work"], answer: 1 },
          { question: "The document a client provides that describes what they want from a creative project is called a:", options: ["Invoice","Scope of work","Client brief","Style guide"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is a usage license in creative work?", options: ["A permit to operate a business","An agreement specifying how a client can use the artist's work","A type of copyright registration","A gallery exhibition contract"], answer: 1 },
          { question: "When an artist sells the right to use their work for specific purposes without transferring full ownership, they grant a:", options: ["Work-for-hire contract","Usage license","Copyright transfer","Public domain release"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is a retainer in freelance business?", options: ["A type of art supply","An upfront fee paid to secure a freelancer's availability over a period of time","A contract for a one-time project","A client's deposit for materials"], answer: 1 },
          { question: "When a client pays a freelancer a set amount regularly to ensure their availability, this fee is called a:", options: ["Project fee","Retainer","Deposit","Commission"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is an invoice?", options: ["A portfolio of creative work","A bill sent to a client requesting payment for completed work","A contract agreeing to do work","A receipt for materials purchased"], answer: 1 },
          { question: "After completing a project, a freelancer sends this document to request payment:", options: ["Contract","Scope of work","Invoice","Brief"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What does 'scope creep' mean in freelance projects?", options: ["A client who is difficult to work with","When the project gradually expands beyond the original agreed-upon work without additional compensation","When a project is completed ahead of schedule","When a client cancels a project"], answer: 1 },
          { question: "When a client keeps adding new requests beyond what was originally agreed, causing unpaid extra work, this is called:", options: ["Project expansion","Scope creep","Contract breach","Feature bloat"], answer: 1 },
        ]
      }
    ]
  },
  {
    id: "sales_rep",
    title: "Sales Representative",
    company: "Salesforce (Reston, VA)",
    salary: 55000,
    educationRequired: "undergrad",
    majorRequired: ["business","marketing","communications","any"],
    description: "Sell products or services and build client relationships.",
    questions: [
      {
        variants: [
          { question: "What is a sales pipeline?", options: ["A monthly sales report","A visual representation of prospects at various stages of the sales process","A list of all past customers","A territory map for sales reps"], answer: 1 },
          { question: "The system that tracks potential customers from first contact through closing a deal is called a:", options: ["Lead list","Sales pipeline","CRM dashboard","Revenue forecast"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is a sales quota?", options: ["The number of calls made per day","A target amount of sales a representative is expected to achieve in a set period","A commission rate","A sales territory boundary"], answer: 1 },
          { question: "The monthly or quarterly revenue target a salesperson must reach is called their:", options: ["Commission","Sales quota","KPI","Territory goal"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is the difference between B2B and B2C sales?", options: ["There is no difference","B2B is business-to-business sales; B2C is business-to-consumer sales","B2B sells physical products; B2C sells services","B2B is online; B2C is in-person"], answer: 1 },
          { question: "A company that sells software to other companies is doing _____ sales, while a store selling to shoppers is doing _____ sales.", options: ["B2C, B2B","B2B, B2C","D2C, B2B","Wholesale, retail"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is upselling?", options: ["Persuading a customer to buy a cheaper alternative","Encouraging a customer to purchase a higher-end product or additional features","Offering a discount to close a sale","Following up after a sale is completed"], answer: 1 },
          { question: "When a salesperson suggests a premium version or add-ons to increase the total sale, this is called:", options: ["Cross-selling","Upselling","Bundling","Cold calling"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is a CRM system in sales?", options: ["A commission rate management tool","Customer Relationship Management software that tracks interactions with clients and prospects","A company's revenue reporting system","A legal contract management platform"], answer: 1 },
          { question: "Sales teams use _____ software to track customer data, communication history, and deal progress.", options: ["ERP","POS","CRM","LMS"], answer: 2 },
        ]
      }
    ]
  },
  {
    id: "environmental_scientist",
    title: "Environmental Scientist",
    company: "EPA (Fairfax, VA)",
    salary: 70000,
    educationRequired: "undergrad",
    majorRequired: ["biology","engineering","political"],
    description: "Study environmental issues and develop solutions to protect natural resources.",
    questions: [
      {
        variants: [
          { question: "What is a carbon footprint?", options: ["The physical size of a factory","The total amount of greenhouse gases produced by an individual, organization, or product","The amount of carbon in soil","The footprint of a carbon fiber material"], answer: 1 },
          { question: "The total greenhouse gas emissions caused directly and indirectly by a person or organization is called their:", options: ["Ecological impact","Carbon footprint","Emission standard","Environmental liability"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is biodiversity?", options: ["The study of biology","The variety of life forms in a given ecosystem or on Earth","A type of environmental law","The process of species extinction"], answer: 1 },
          { question: "The range of different species of plants, animals, and other organisms in an ecosystem is called:", options: ["Ecology","Biomass","Biodiversity","Sustainability"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is the Clean Air Act?", options: ["A local ordinance about factory emissions","A US federal law that regulates air emissions to protect public health and the environment","An international climate treaty","A company's voluntary environmental policy"], answer: 1 },
          { question: "The federal legislation that empowers the EPA to set national standards for air quality is the:", options: ["Endangered Species Act","Clean Water Act","Clean Air Act","NEPA"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is remediation in environmental science?", options: ["Writing environmental policy","The process of cleaning up contaminated soil, water, or air","Monitoring wildlife populations","Conducting environmental research"], answer: 1 },
          { question: "When scientists and engineers clean up a polluted site like an old industrial facility, this process is called:", options: ["Mitigation","Conservation","Remediation","Reclamation"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What does 'sustainable development' mean?", options: ["Development that ignores environmental concerns","Development that meets current needs without compromising the ability of future generations to meet their own needs","Slowing economic growth to protect nature","Using only renewable energy sources"], answer: 1 },
          { question: "The concept of economic growth that uses resources responsibly so they remain available for the future is called:", options: ["Green energy","Sustainable development","Carbon neutrality","Conservation"], answer: 1 },
        ]
      }
    ]
  },
  {
    id: "barista_cafe_owner",
    title: "Café Owner / Barista",
    company: "Self-Employed (Fairfax, VA)",
    salary: 35000,
    educationRequired: "undergrad",
    majorRequired: ["any"],
    description: "Run a small coffee shop, manage staff, and serve customers.",
    questions: [
      {
        variants: [
          { question: "What is gross profit?", options: ["Total revenue minus all expenses","Revenue minus the cost of goods sold","Net income after taxes","Total sales before any deductions"], answer: 1 },
          { question: "If a café earns $10,000 in sales and spends $3,000 on ingredients, what is the gross profit?", options: ["$13,000","$7,000","$3,000","$10,000"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is a profit margin?", options: ["The total revenue of a business","The percentage of revenue remaining after costs are deducted","The break-even point of a business","The total amount spent on advertising"], answer: 1 },
          { question: "If a café makes $5,000 profit on $20,000 in sales, the profit margin is:", options: ["20%","25%","15%","10%"], answer: 1 },
        ]
      },
      {
        variants: [
          { question: "What is a break-even point?", options: ["When a business starts making a profit","The point at which total revenue equals total costs — no profit, no loss","When a business decides to close","The maximum sales a business can achieve"], answer: 1 },
          { question: "The sales level at which a business covers all its costs but earns zero profit is called the:", options: ["Profit threshold","Revenue goal","Break-even point","Operating minimum"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is overhead cost?", options: ["The cost of products sold to customers","Ongoing business expenses not directly tied to producing a product, like rent and utilities","The cost of hiring new employees","The price charged to customers"], answer: 1 },
          { question: "Expenses like rent, electricity, and insurance that a business pays regardless of sales volume are called:", options: ["Variable costs","Direct costs","Overhead costs","Production costs"], answer: 2 },
        ]
      },
      {
        variants: [
          { question: "What is cash flow?", options: ["The total profit a business earns","The movement of money into and out of a business over a period of time","The amount of cash in a bank account","A business loan"], answer: 1 },
          { question: "Tracking money coming in from sales and going out for expenses over a set period is called managing:", options: ["Net income","Cash flow","Working capital","Revenue streams"], answer: 1 },
        ]
      }
    ]
  }
];

// ============================================================
// INTRO FINANCE EXIT TICKET
// 10 questions, 3 variants each for anti-cheating
// Topic: Money Basics — Unit 1
// ============================================================
const EXIT_TICKET_UNIT_1 = {
  title: "Unit 1 Exit Ticket — Money Basics",
  passingScore: 80,
  questions: [
    {
      variants: [
        { question: "What is a budget?", options: ["A type of bank account","A plan for how to spend and save your money","A credit card limit","A government tax form"], answer: 1 },
        { question: "Which of the following best describes a personal budget?", options: ["A loan from a bank","A spending and saving plan based on your income","A list of things you want to buy","A type of investment account"], answer: 1 },
        { question: "A financial plan that tracks your income and controls your spending is called a:", options: ["Credit score","Savings bond","Budget","Tax return"], answer: 2 }
      ]
    },
    {
      variants: [
        { question: "What is income?", options: ["Money you owe to others","Money you receive from work or other sources","A type of expense","A bank loan"], answer: 1 },
        { question: "The money you earn from a job or other sources is called your:", options: ["Debt","Expense","Income","Credit"], answer: 2 },
        { question: "Which of the following is an example of income?", options: ["A monthly rent payment","A weekly paycheck","A credit card bill","A student loan payment"], answer: 1 }
      ]
    },
    {
      variants: [
        { question: "What is an expense?", options: ["Money you earn","Money you spend on goods or services","Your credit score","Your savings account balance"], answer: 1 },
        { question: "Rent, groceries, and utility bills are all examples of:", options: ["Income","Assets","Expenses","Investments"], answer: 2 },
        { question: "The money that goes out of your account to pay for things is called a(n):", options: ["Revenue","Deposit","Expense","Dividend"], answer: 2 }
      ]
    },
    {
      variants: [
        { question: "What does it mean to 'live within your means'?", options: ["Spending more than you earn","Spending only what you can afford based on your income","Only buying luxury items","Never spending money on entertainment"], answer: 1 },
        { question: "If your income is $2,000 a month and your expenses total $2,500, you are:", options: ["Living within your means","Saving money effectively","Spending more than you earn","Breaking even"], answer: 2 },
        { question: "Spending less than or equal to what you earn each month is described as:", options: ["Going into debt","Living within your means","Being financially stressed","Over-budgeting"], answer: 1 }
      ]
    },
    {
      variants: [
        { question: "What is the purpose of an emergency fund?", options: ["To save for a vacation","To pay for unexpected expenses without going into debt","To invest in the stock market","To pay monthly bills"], answer: 1 },
        { question: "Financial experts recommend saving 3-6 months of expenses in case of emergencies. This savings is called:", options: ["A retirement fund","A checking account","An emergency fund","A sinking fund"], answer: 2 },
        { question: "Money set aside specifically for unexpected costs like car repairs or medical bills is called a(n):", options: ["Investment portfolio","Emergency fund","Down payment fund","Discretionary fund"], answer: 1 }
      ]
    },
    {
      variants: [
        { question: "What is the difference between a need and a want?", options: ["There is no difference","A need is essential for survival; a want is something desired but not essential","A want is more important than a need","Needs cost more than wants"], answer: 1 },
        { question: "Food, shelter, and clothing are considered _____, while a new video game is a _____.", options: ["Wants, need","Needs, want","Luxuries, necessity","Expenses, savings"], answer: 1 },
        { question: "In budgeting, distinguishing between essential and non-essential purchases helps you prioritize:", options: ["Credit card rewards","Your needs versus your wants","Investment returns","Tax deductions"], answer: 1 }
      ]
    },
    {
      variants: [
        { question: "What is net pay?", options: ["Your salary before any deductions","The amount you take home after taxes and deductions are removed","Your total annual income","Your hourly wage"], answer: 1 },
        { question: "The money left on your paycheck after taxes, health insurance, and other deductions are taken out is called:", options: ["Gross pay","Net pay","Base pay","Take-home estimate"], answer: 1 },
        { question: "If your gross pay is $1,000 and $250 is deducted for taxes, your net pay is:", options: ["$1,250","$750","$1,000","$250"], answer: 1 }
      ]
    },
    {
      variants: [
        { question: "What is a savings account?", options: ["An account used for daily spending","A bank account that holds money and earns interest over time","A type of investment","A credit card account"], answer: 1 },
        { question: "A bank account designed to store money and earn a small amount of interest is called a:", options: ["Checking account","Money market account","Savings account","Brokerage account"], answer: 2 },
        { question: "To earn interest on money you are not spending right away, you should keep it in a:", options: ["Debit card","Savings account","Prepaid card","Loan account"], answer: 1 }
      ]
    },
    {
      variants: [
        { question: "What is interest on a loan?", options: ["A fee paid to you for lending money","The extra cost you pay for borrowing money","A government tax on purchases","A discount on your loan balance"], answer: 1 },
        { question: "When you take out a loan, the bank charges you extra money over time. This extra charge is called:", options: ["Principal","Collateral","Interest","Premium"], answer: 2 },
        { question: "Borrowing $1,000 and paying back $1,080 means you paid $80 in:", options: ["Principal","Fees only","Interest","Late charges"], answer: 2 }
      ]
    },
    {
      variants: [
        { question: "What is a credit score?", options: ["Your bank account balance","A number that represents how reliably you repay borrowed money","Your annual income","The limit on your credit card"], answer: 1 },
        { question: "Lenders use a three-digit number to decide whether to approve your loan. This number is your:", options: ["Tax ID","Net worth","Credit score","Debt ratio"], answer: 2 },
        { question: "Paying bills on time and keeping debt low helps improve your:", options: ["Gross income","Emergency fund","Credit score","Checking balance"], answer: 2 }
      ]
    }
  ]
};

// ============================================================
// EMAIL TEMPLATES
// Used by the system to send in-game emails to students
// ============================================================
const EMAIL_TEMPLATES = {
  welcome: {
    from: "Vaultwood Academy",
    subject: "Welcome to Vaultwood — Your Journey Begins",
    body: `Congratulations on your graduation. The real world is waiting.\n\nYou're moving back home for now. No income. No rent. But you have something valuable — an education and a plan.\n\nComplete your financial literacy coursework to unlock your first apartment and get ready for the Job Fair.\n\nGood luck. You're going to need it.\n\n— Vaultwood Academy`
  },
  exit_ticket_flagged: {
    from: "Your Teacher",
    subject: "📋 Exit Ticket — Needs Revision",
    body: `Hi {{studentName}},\n\nI reviewed your Exit Ticket for {{skillName}} and I have some feedback for you.\n\n{{teacherFeedback}}\n\nYour Exit Ticket has been reset with new questions. Head back to the {{location}} to try again. You've got this.\n\n— {{teacherName}}`
  },
  exit_ticket_passed: {
    from: "Vaultwood Academy",
    subject: "✅ Skill Unlocked — {{skillName}}",
    body: `Congratulations, {{studentName}}!\n\nYou passed your Exit Ticket for {{skillName}}. This skill has been added to your Knowledge List.\n\n{{unlockedMessage}}\n\nKeep building. The more you know, the more doors open.\n\n— Vaultwood Academy`
  },
  job_offer: {
    from: "{{companyName}}",
    subject: "🎉 Job Offer — {{jobTitle}}",
    body: `Dear {{studentName}},\n\nWe are pleased to offer you the position of {{jobTitle}} at {{companyName}}.\n\nStarting Salary: {{salary}}/year\nStart Date: Immediately\n\nThis offer is contingent on your acceptance. Please report to your new job by logging into your character dashboard.\n\nWelcome aboard.\n\n— {{companyName}} HR Department`
  },
  job_rejected_major: {
    from: "{{companyName}} HR",
    subject: "Application Update — {{jobTitle}}",
    body: `Dear {{studentName}},\n\nThank you for your interest in the {{jobTitle}} position at {{companyName}}.\n\nAfter reviewing your application, we regret to inform you that this role requires a {{requiredMajor}} degree. Your current background does not meet the minimum qualifications.\n\nYou are welcome to explore other positions at the Job Fair, or consider graduate school to qualify for this role in the future.\n\nBest of luck.\n\n— {{companyName}} HR Department`
  },
  paycheck: {
    from: "Vaultwood Payroll System",
    subject: "💵 Paycheck Deposited — Week of {{date}}",
    body: `Hi {{studentName}},\n\nYour weekly paycheck has been processed.\n\nGross Pay: {{grossPay}}\nBills & Deductions: -{{deductions}}\nNet Deposit: {{netPay}}\n\nYour updated savings balance: {{savingsBalance}}\n\nRemember: paychecks process every Friday. Plan accordingly.\n\n— Vaultwood Payroll`
  },
  bill_due: {
    from: "Vaultwood Billing",
    subject: "⚠️ Bill Due — {{billName}}",
    body: `Hi {{studentName}},\n\nA bill is due:\n\n{{billName}}: {{amount}}\n\nThis will be automatically deducted from your account on {{dueDate}}. Make sure you have sufficient funds.\n\nIf you cannot pay, your credit score may be affected.\n\n— Vaultwood Billing`
  },
  loan_approved: {
    from: "Vaultwood National Bank",
    subject: "✅ Loan Approved — {{loanType}}",
    body: `Dear {{studentName}},\n\nYour loan application has been approved.\n\nLoan Type: {{loanType}}\nAmount: {{loanAmount}}\nInterest Rate: {{interestRate}}% APR\nMonthly Payment: {{monthlyPayment}}\n\nFunds have been added to your account. Your first payment is due on {{firstPaymentDate}}.\n\nRemember: missing payments will negatively impact your credit score.\n\n— Vaultwood National Bank`
  },
  loan_denied: {
    from: "Vaultwood National Bank",
    subject: "❌ Loan Application — Not Approved",
    body: `Dear {{studentName}},\n\nWe have reviewed your loan application and are unable to approve it at this time.\n\nReason: {{denialReason}}\n\nTo improve your chances:\n- Complete the Loan Knowledge Check\n- Improve your credit score\n- Reduce existing debt\n\nYou are welcome to reapply once these conditions are met.\n\n— Vaultwood National Bank`
  },
  apartment_approved: {
    from: "{{landlordName}} — Property Management",
    subject: "🏠 Lease Approved — {{apartmentAddress}}",
    body: `Dear {{studentName}},\n\nWelcome home! Your lease application has been approved.\n\nAddress: {{apartmentAddress}}\nMonthly Rent: {{rent}}\nLease Start: {{startDate}}\n\nYour first month's rent and security deposit have been deducted from your account.\n\nRemember: rent is due automatically every month. Plan your budget accordingly.\n\n— {{landlordName}}`
  },
  grad_school_accepted: {
    from: "Vaultwood Graduate School",
    subject: "🎓 Graduate School Acceptance — {{programName}}",
    body: `Dear {{studentName}},\n\nCongratulations! You have been accepted into the {{programName}} program.\n\nProgram Duration: {{duration}}\nTotal Loan: {{loanAmount}}\n\nNote: Graduate school is not covered by your parents. A student loan of {{loanAmount}} has been added to your debt. Monthly loan payments begin when you complete the program.\n\nThis investment in your education will unlock higher-paying career opportunities. Make it count.\n\n— Vaultwood Graduate School`
  },
  homework_assigned: {
    from: "Your Teacher",
    subject: "📚 Homework Assigned — Due {{dueDate}}",
    body: `Hi {{studentName}},\n\nHomework has been assigned for tonight.\n\nAssignment: {{assignmentTitle}}\nDue: {{dueDate}}\n\nTo complete this assignment:\n1. Go to the Library in Vaultwood\n2. Find the shelf for {{dueDate}}\n3. Open the assignment and complete it\n\nThis must be submitted before midnight to receive credit.\n\n— {{teacherName}}`
  },
  teacher_message: {
    from: "Your Teacher",
    subject: "{{subject}}",
    body: `{{body}}\n\n— {{teacherName}}`
  },
  skill_unlocked: {
    from: "Vaultwood Academy",
    subject: "🔓 New Skill Unlocked — {{skillName}}",
    body: `{{studentName}},\n\nYou've unlocked a new skill: {{skillName}}\n\n{{description}}\n\nThis skill has been added to your Knowledge List. New areas of Vaultwood are now accessible to you.\n\n— Vaultwood Academy`
  }
};

// ============================================================
// SKILLS / KNOWLEDGE TREE
// Prerequisites define what must be unlocked first
// ============================================================
const SKILLS = [
  {
    id: "money_basics",
    label: "Money Basics",
    description: "Understand income, expenses, budgeting, and net pay.",
    prerequisites: [],
    unlocks: ["Ability to track income and expenses", "Access to the Budget Planner"],
    exitTicket: "EXIT_TICKET_UNIT_1"
  },
  {
    id: "budgeting",
    label: "Budgeting",
    description: "Create and manage a monthly budget.",
    prerequisites: ["money_basics"],
    unlocks: ["Ability to rent an apartment", "Access to the Apartment Listings"],
    exitTicket: "budgeting_exit_ticket"
  },
  {
    id: "loans",
    label: "Loans & Borrowing",
    description: "Understand how loans work, interest rates, and repayment.",
    prerequisites: ["budgeting"],
    unlocks: ["Ability to apply for loans", "Access to graduate school programs", "Bank loan products"],
    exitTicket: "loans_exit_ticket"
  },
  {
    id: "credit",
    label: "Credit & Credit Scores",
    description: "Understand credit scores and how to build good credit.",
    prerequisites: ["loans"],
    unlocks: ["Ability to apply for credit cards", "Access to better loan rates"],
    exitTicket: "credit_exit_ticket"
  },
  {
    id: "mortgages",
    label: "Mortgages & Home Buying",
    description: "Understand mortgages, down payments, and the home buying process.",
    prerequisites: ["credit","budgeting"],
    unlocks: ["Ability to buy a home", "Access to the Real Estate listings in Vaultwood"],
    exitTicket: "mortgage_exit_ticket"
  },
  {
    id: "investing",
    label: "Investing & The Stock Market",
    description: "Understand stocks, bonds, ETFs, and long-term investing.",
    prerequisites: ["money_basics","budgeting"],
    unlocks: ["Access to the Vaultwood Stock Exchange", "Ability to open a brokerage account"],
    exitTicket: "investing_exit_ticket"
  },
  {
    id: "taxes",
    label: "Taxes",
    description: "Understand federal and state income taxes, deductions, and filing.",
    prerequisites: ["money_basics"],
    unlocks: ["Ability to file taxes in-game", "Access to tax refund events"],
    exitTicket: "taxes_exit_ticket"
  },
  {
    id: "insurance",
    label: "Insurance",
    description: "Understand health, auto, and renter's insurance.",
    prerequisites: ["budgeting"],
    unlocks: ["Ability to purchase insurance policies", "Protection from certain random events"],
    exitTicket: "insurance_exit_ticket"
  }
];

// ============================================================
// EXPORT — makes all content available to script.js
// ============================================================
if (typeof module !== 'undefined') {
  module.exports = { MAJORS, JOBS, GRAD_PROGRAMS, EXIT_TICKET_UNIT_1, EMAIL_TEMPLATES, SKILLS };
}