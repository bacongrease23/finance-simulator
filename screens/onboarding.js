// ============================================================
// CAPITAL HEIGHTS — onboarding.js
// 8 category buttons → major select → finals → graduation
// ============================================================

const OB_CHARACTERS = [
  { id:"char1", name:"Alex Rivera",    desc:"Business-minded and ambitious",   emoji:"🧑" },
  { id:"char2", name:"Jordan Lee",     desc:"Tech-savvy problem solver",        emoji:"👩" },
  { id:"char3", name:"Morgan Chen",    desc:"Creative and entrepreneurial",     emoji:"🧑" },
  { id:"char4", name:"Taylor Brooks",  desc:"Detail-oriented and analytical",   emoji:"👩" },
  { id:"char5", name:"Casey Williams", desc:"People-focused team player",       emoji:"🧑" },
  { id:"char6", name:"Riley Johnson",  desc:"Strategic and goal-driven",        emoji:"👩" },
];

// 8 categories, each with 5+ majors
const OB_CATEGORIES = [
  {
    id:"business", label:"Business & Finance", icon:"💼", color:"#C8A84A",
    majors:[
      {id:"business",        label:"Business Administration"},
      {id:"finance",         label:"Finance"},
      {id:"accounting",      label:"Accounting"},
      {id:"economics",       label:"Economics"},
      {id:"marketing",       label:"Marketing"},
      {id:"entrepreneurship",label:"Entrepreneurship"},
      {id:"realestate",      label:"Real Estate"},
      {id:"hr",              label:"Human Resources"},
      {id:"intlbusiness",    label:"International Business"},
    ]
  },
  {
    id:"technology", label:"Technology", icon:"💻", color:"#4A8AC8",
    majors:[
      {id:"cs",           label:"Computer Science"},
      {id:"it",           label:"Information Technology"},
      {id:"cybersecurity",label:"Cybersecurity"},
      {id:"engineering",  label:"Engineering"},
      {id:"datascience",  label:"Data Science"},
    ]
  },
  {
    id:"health", label:"Health & Science", icon:"🏥", color:"#4AC87A",
    majors:[
      {id:"nursing",     label:"Nursing"},
      {id:"biology",     label:"Biology"},
      {id:"publichealth",label:"Public Health"},
      {id:"kinesiology", label:"Kinesiology & Exercise Science"},
      {id:"envsci",      label:"Environmental Science"},
    ]
  },
  {
    id:"sociallaw", label:"Social Sciences & Law", icon:"⚖️", color:"#A84AC8",
    majors:[
      {id:"psychology", label:"Psychology"},
      {id:"sociology",  label:"Sociology"},
      {id:"socialwork", label:"Social Work"},
      {id:"political",  label:"Political Science"},
      {id:"criminal",   label:"Criminal Justice"},
      {id:"prelaw",     label:"Pre-Law"},
    ]
  },
  {
    id:"arts", label:"Arts", icon:"🎨", color:"#C84A6A",
    majors:[
      {id:"finearts",      label:"Fine Arts"},
      {id:"graphicdesign", label:"Graphic Design"},
      {id:"photography",   label:"Photography"},
      {id:"filmvideo",     label:"Film & Video Production"},
      {id:"architecture",  label:"Architecture"},
    ]
  },
  {
    id:"media", label:"Media & Communication", icon:"📡", color:"#4AC8C8",
    majors:[
      {id:"communications",label:"Communications"},
      {id:"journalism",    label:"Journalism"},
      {id:"english",       label:"English & Creative Writing"},
      {id:"pr",            label:"Public Relations"},
      {id:"digitalmedia",  label:"Digital Media"},
    ]
  },
  {
    id:"education", label:"Education & Hospitality", icon:"🎓", color:"#C8784A",
    majors:[
      {id:"education",       label:"Education"},
      {id:"earlychildhood",  label:"Early Childhood Education"},
      {id:"sportsmanagement",label:"Sports Management"},
      {id:"eventmanagement", label:"Event Management"},
      {id:"hospitality",     label:"Hospitality & Restaurant Mgmt"},
    ]
  },
  {
    id:"general", label:"General Studies", icon:"📚", color:"#666",
    isGeneral: true,
    majors:[
      {id:"generalstudies", label:"General Studies"},
    ]
  },
];

// All majors flat list for lookup
const OB_ALL_MAJORS = OB_CATEGORIES.flatMap(c => c.majors);

// ── Questions — 10% harder than before, still 8th/9th grade ──
const OB_QUESTIONS = {
  business:[
    {q:"A company's revenue is $80,000 and its expenses are $52,000. What is its profit?",opts:["$28,000","$132,000","$52,000","$18,000"],a:0},
    {q:"Which of the following best describes a business budget?",opts:["A record of past spending only","A plan that estimates future income and expenses","A loan from a bank","A list of employees and salaries"],a:1},
    {q:"What does it mean when a business 'breaks even'?",opts:["The business is losing money","Revenue exactly equals expenses — no profit or loss","The business is growing rapidly","The business owes taxes"],a:1},
    {q:"A manager delegates a task. What does that mean?",opts:["The manager does the task alone","The manager assigns the task to someone else","The manager cancels the task","The manager reports the task to a supervisor"],a:1},
    {q:"Which describes good customer service?",opts:["Responding to problems only when required","Ignoring minor complaints","Resolving issues quickly and making the customer feel valued","Offering discounts on every purchase"],a:2},
  ],
  finance:[
    {q:"You deposit $1,000 in a savings account with 5% annual interest. How much interest do you earn after one year?",opts:["$5","$50","$500","$150"],a:1},
    {q:"What is the main difference between a stock and a bond?",opts:["Stocks are safer than bonds","A stock is ownership in a company; a bond is a loan to a company","Bonds pay higher returns than stocks","Stocks are issued by governments only"],a:1},
    {q:"Which action would most likely improve a low credit score over time?",opts:["Opening many new credit cards","Paying bills consistently on time","Spending more money each month","Ignoring small debts"],a:1},
    {q:"What does diversifying your investments mean?",opts:["Putting all money into the safest option","Spreading money across different types of investments to reduce risk","Only investing in real estate","Investing in one company you trust"],a:1},
    {q:"A 401k match from an employer means:",opts:["You pay into a retirement account and the employer adds nothing","The employer contributes additional money based on what you contribute","You receive a guaranteed return of 401%","The government manages your retirement funds"],a:1},
  ],
  accounting:[
    {q:"If a business has $50,000 in assets and $30,000 in liabilities, what is its equity?",opts:["$80,000","$30,000","$20,000","$50,000"],a:2},
    {q:"Which financial statement shows whether a business made or lost money over a period?",opts:["Balance sheet","Cash flow statement","Income statement","Payroll report"],a:2},
    {q:"What does accounts receivable represent?",opts:["Money the business owes to suppliers","Money owed TO the business by customers","The company's savings account balance","Employee wages not yet paid"],a:1},
    {q:"Depreciation refers to:",opts:["An increase in the value of an asset","The gradual decrease in value of an asset over time","A type of business loan","A tax paid on profits"],a:1},
    {q:"What is the main purpose of an audit?",opts:["To fire underperforming employees","To independently verify that financial records are accurate","To create a new budget","To calculate employee bonuses"],a:1},
  ],
  economics:[
    {q:"If demand for a product increases but supply stays the same, what typically happens to price?",opts:["Price decreases","Price stays the same","Price increases","The product becomes free"],a:2},
    {q:"Which best describes a recession?",opts:["A period of rapid economic growth","A temporary rise in inflation","A period of significant economic decline, often with rising unemployment","A government budget surplus"],a:2},
    {q:"What does the Federal Reserve primarily control?",opts:["Tax rates","The stock market","Interest rates and the money supply","Government spending"],a:2},
    {q:"An opportunity cost is best described as:",opts:["The total cost of a product","What you give up when you choose one option over another","A government fee","The price of inflation"],a:1},
    {q:"Which is an example of a public good?",opts:["A private gym","A toll road","Street lighting","A restaurant"],a:2},
  ],
  marketing:[
    {q:"A product launches with a very low price to attract customers quickly. This strategy is called:",opts:["Price skimming","Penetration pricing","Value pricing","Discount bundling"],a:1},
    {q:"What does ROI stand for in marketing?",opts:["Rate of Inflation","Return on Investment","Reach of Influence","Revenue Over Income"],a:1},
    {q:"Which best describes a unique selling proposition (USP)?",opts:["The lowest price in the market","What makes a product distinctly better or different from competitors","A type of advertisement","A customer loyalty program"],a:1},
    {q:"Market segmentation means:",opts:["Selling the same product to everyone","Dividing the market into groups with similar needs or characteristics","Lowering prices for certain customers","Advertising on multiple platforms"],a:1},
    {q:"Which metric measures how many people saw an advertisement?",opts:["Conversion rate","Click-through rate","Reach or impressions","Bounce rate"],a:2},
  ],
  entrepreneurship:[
    {q:"What is a business model?",opts:["A diagram of a store layout","A plan for how a business will make money","A legal document for starting a company","A type of marketing strategy"],a:1},
    {q:"Venture capital is:",opts:["A personal savings account","Funding provided to startups in exchange for equity or ownership","A government small business grant","A type of business loan from a bank"],a:1},
    {q:"What does 'scaling a business' mean?",opts:["Reducing costs by firing employees","Growing the business in a way that increases revenue without proportionally increasing costs","Moving to a smaller location","Changing the company's products"],a:1},
    {q:"Which is the biggest financial risk of starting a business?",opts:["Hiring too many employees","Losing the money you invested if the business fails","Having too many customers","Growing too fast"],a:1},
    {q:"A minimum viable product (MVP) is:",opts:["The most expensive version of a product","The simplest version of a product that can be tested with real customers","A product that has already succeeded","A government-approved product"],a:1},
  ],
  realestate:[
    {q:"A home is listed at $300,000 and requires a 10% down payment. How much is the down payment?",opts:["$3,000","$30,000","$300","$10,000"],a:1},
    {q:"What does a home appraisal determine?",opts:["How much the seller wants for the home","The estimated market value of a property","The monthly mortgage payment","The property tax amount"],a:1},
    {q:"Which factor most directly affects mortgage interest rates?",opts:["The color of the house","The buyer's credit score","The size of the backyard","The age of the neighborhood"],a:1},
    {q:"What is equity in a home?",opts:["The mortgage balance remaining","The difference between the home's value and what is still owed on it","The monthly payment amount","The property tax rate"],a:1},
    {q:"A landlord-tenant agreement is also called:",opts:["A deed","A mortgage","A lease","An appraisal"],a:2},
  ],
  hr:[
    {q:"Which law prohibits employment discrimination based on race, color, religion, sex, or national origin?",opts:["The Fair Labor Standards Act","Title VII of the Civil Rights Act","The Family and Medical Leave Act","The Americans with Disabilities Act"],a:1},
    {q:"What is the purpose of an employee performance review?",opts:["To determine whether to fire someone","To evaluate work performance and set goals for improvement","To calculate payroll","To update company policies"],a:1},
    {q:"Gross pay vs. net pay — what is the difference?",opts:["They are the same thing","Gross pay is before deductions; net pay is take-home after deductions","Net pay is higher than gross pay","Gross pay includes bonuses only"],a:1},
    {q:"What does FMLA stand for?",opts:["Federal Minimum Labor Act","Family and Medical Leave Act","Fair Market Labor Agreement","Federal Management and Leadership Act"],a:1},
    {q:"Which best describes the purpose of an employee handbook?",opts:["A personal journal for employees","A document outlining company policies, expectations, and employee rights","A list of employee salaries","A guide for managers only"],a:1},
  ],
  intlbusiness:[
    {q:"A U.S. company sells products to customers in Japan. This is an example of:",opts:["Importing","Outsourcing","Exporting","Foreign direct investment"],a:2},
    {q:"What is a tariff?",opts:["A tax placed on imported goods","A type of trade agreement","A foreign currency exchange fee","A business registration fee"],a:0},
    {q:"Which organization oversees international trade rules between countries?",opts:["The United Nations","The World Trade Organization","The International Monetary Fund","NATO"],a:1},
    {q:"What is currency exchange risk in international business?",opts:["The risk of shipping products overseas","The risk that currency value changes reduce profit when converting money","The risk of language barriers","The risk of different time zones"],a:1},
    {q:"Outsourcing means:",opts:["A company expanding into a new country","Hiring another company or workers in another country to perform tasks","A government trade restriction","A type of import tax"],a:1},
  ],
  cs:[
    {q:"What is the difference between hardware and software?",opts:["Hardware is code; software is the physical machine","Hardware is the physical machine; software is the programs that run on it","They are the same thing","Hardware is for businesses; software is for personal use"],a:1},
    {q:"What does a loop in programming do?",opts:["Ends a program","Repeats a set of instructions multiple times until a condition is met","Stores data permanently","Connects to the internet"],a:1},
    {q:"What is a variable in coding?",opts:["A type of computer virus","A storage container for a value that can change in a program","A network connection","A type of operating system"],a:1},
    {q:"Binary code uses which two digits?",opts:["1 and 2","0 and 9","0 and 1","A and B"],a:2},
    {q:"What does debugging mean?",opts:["Writing new code from scratch","Finding and fixing errors in a program","Deleting old programs","Speeding up a computer"],a:1},
  ],
  it:[
    {q:"What is the purpose of an IP address?",opts:["To store files","To uniquely identify a device on a network","To speed up internet connections","To encrypt data"],a:1},
    {q:"Which type of storage holds data permanently, even when the computer is off?",opts:["RAM","Cache","ROM/Hard drive","CPU"],a:2},
    {q:"What is the difference between LAN and WAN?",opts:["LAN is faster than WAN always","LAN covers a small local area; WAN covers a larger geographic area","WAN is only used by governments","They are the same thing"],a:1},
    {q:"What does HTTPS indicate about a website?",opts:["The website is free","The connection is encrypted and more secure","The website is government-owned","The website loads faster"],a:1},
    {q:"What is cloud storage?",opts:["Saving files on your computer's desktop","Storing data on remote servers accessed through the internet","A type of USB drive","Backup storage on a disc"],a:1},
  ],
  cybersecurity:[
    {q:"What is two-factor authentication?",opts:["Using two different passwords","A security process requiring two forms of identity verification to log in","A type of firewall","Logging in from two devices"],a:1},
    {q:"A ransomware attack:",opts:["Slows down your internet connection","Encrypts your files and demands payment to restore access","Steals your passwords silently","Deletes your operating system"],a:1},
    {q:"What is social engineering in cybersecurity?",opts:["Using social media for marketing","Manipulating people psychologically to reveal confidential information","A type of antivirus software","Network security protocol"],a:1},
    {q:"Which password is strongest?",opts:["password123","JohnSmith1990","Xk!9mP#2vL@q","ABCDEFGH"],a:2},
    {q:"What does encryption do to data?",opts:["Deletes it permanently","Converts it into a coded format that only authorized parties can read","Makes it load faster","Backs it up automatically"],a:1},
  ],
  engineering:[
    {q:"What is the engineering design process?",opts:["Building a product as fast as possible","A systematic approach: define a problem, design, build, test, and improve","Choosing the cheapest materials","Writing a report about a product"],a:1},
    {q:"What does a civil engineer primarily design?",opts:["Computer software","Infrastructure like roads, bridges, and buildings","Electronic circuits","Manufacturing machines"],a:1},
    {q:"Which material is generally strongest under compression?",opts:["Rubber","Concrete","Plastic","Foam"],a:1},
    {q:"What is a load in structural engineering?",opts:["The weight of construction workers only","Any force applied to a structure that it must support","The cost of building materials","The size of a building"],a:1},
    {q:"Why are safety factors used in engineering design?",opts:["To make products more expensive","To ensure designs can handle more than expected stress without failing","To satisfy government regulations only","To reduce manufacturing time"],a:1},
  ],
  datascience:[
    {q:"What is the main purpose of data analysis?",opts:["To collect as much data as possible","To find patterns and insights that help make better decisions","To store data securely","To design databases"],a:1},
    {q:"What is a dataset?",opts:["A type of computer program","A collection of organized information used for analysis","A backup system","A type of database software"],a:1},
    {q:"What does a chart or graph help you do with data?",opts:["Store data more efficiently","Visualize patterns and relationships that are hard to see in raw numbers","Delete unnecessary data","Encrypt sensitive information"],a:1},
    {q:"Which term describes data that is too large or complex for traditional software to handle?",opts:["Metadata","Big data","Raw data","Structured data"],a:1},
    {q:"What is the difference between correlation and causation?",opts:["They mean the same thing","Correlation means two things are related; causation means one directly causes the other","Causation is weaker than correlation","Correlation only applies to scientific studies"],a:1},
  ],
  nursing:[
    {q:"A patient's blood pressure reading is 140/90. Which part is the systolic pressure?",opts:["90","140","Both numbers equally","Neither — systolic is measured differently"],a:1},
    {q:"What does the acronym HIPAA protect?",opts:["Hospital insurance payments","Patient privacy and medical information","Nursing licensing standards","Hospital safety regulations"],a:1},
    {q:"Which action is most important before and after patient care?",opts:["Documenting the visit","Washing hands to prevent infection","Checking the patient's insurance","Taking vital signs"],a:1},
    {q:"What does triage mean in an emergency setting?",opts:["Treating patients in the order they arrived","Sorting and prioritizing patients based on the severity of their condition","Sending patients to specialists","Recording patient medical history"],a:1},
    {q:"Which medication route delivers drugs directly into a vein?",opts:["Oral","Topical","Intravenous (IV)","Subcutaneous"],a:2},
  ],
  biology:[
    {q:"Which organelle is known as the powerhouse of the cell?",opts:["Nucleus","Ribosome","Mitochondria","Cell membrane"],a:2},
    {q:"What is the role of red blood cells?",opts:["Fight infections","Carry oxygen through the bloodstream","Produce antibodies","Regulate body temperature"],a:1},
    {q:"Which type of reproduction requires two parents?",opts:["Budding","Binary fission","Sexual reproduction","Asexual reproduction"],a:2},
    {q:"What is natural selection?",opts:["Animals choosing their own mates","The process where traits that help survival are passed on more frequently","Humans breeding animals selectively","A random change in DNA"],a:1},
    {q:"What is the function of the cell membrane?",opts:["To produce energy","To control what enters and exits the cell","To store genetic information","To carry out photosynthesis"],a:1},
  ],
  publichealth:[
    {q:"What is the difference between a pandemic and an epidemic?",opts:["They are the same thing","An epidemic is local or regional; a pandemic is global","A pandemic is less serious than an epidemic","An epidemic only affects animals"],a:1},
    {q:"What is the purpose of contact tracing during a disease outbreak?",opts:["To fine people who are sick","To identify and notify people who may have been exposed to an infection","To track hospital costs","To quarantine entire cities"],a:1},
    {q:"Which is a leading preventable cause of death in the United States?",opts:["Car accidents","Smoking","Natural disasters","Food poisoning"],a:1},
    {q:"What does the CDC stand for?",opts:["Center for Disease Control and Prevention","Central Department of Community Health","Committee for Disease Containment","Clinical Data and Compliance"],a:0},
    {q:"Herd immunity occurs when:",opts:["Everyone in a community gets sick","Enough people are immune to slow or stop disease spread through the population","A vaccine is 100% effective","A disease disappears permanently"],a:1},
  ],
  kinesiology:[
    {q:"What is the difference between aerobic and anaerobic exercise?",opts:["Aerobic uses weights; anaerobic uses cardio","Aerobic uses oxygen for sustained activity; anaerobic is short bursts without relying on oxygen","They are the same type of exercise","Aerobic is only for athletes"],a:1},
    {q:"What does a sports injury prevention specialist focus on?",opts:["Treating injuries after they happen","Identifying risk factors and implementing strategies to prevent injuries before they occur","Coaching athletic performance","Prescribing medication for athletes"],a:1},
    {q:"What is the function of the skeletal system?",opts:["To pump blood through the body","To provide structure, protect organs, and allow movement","To digest food","To carry electrical signals"],a:1},
    {q:"RICE is a common first aid method for injuries. What does it stand for?",opts:["Run, Ice, Compress, Elevate","Rest, Ice, Compression, Elevation","Relax, Inject, Cool, Exercise","Rest, Ibuprofin, Compress, Elevate"],a:1},
    {q:"What is VO2 max a measure of?",opts:["Maximum heart rate","The maximum amount of oxygen the body can use during intense exercise","Blood pressure during exercise","Muscle strength capacity"],a:1},
  ],
  envsci:[
    {q:"What is the greenhouse effect?",opts:["Plants growing in a greenhouse","The trapping of heat in Earth's atmosphere by gases like CO2, warming the planet","A type of solar energy","A farming technique"],a:1},
    {q:"Which human activity most contributes to deforestation?",opts:["Fishing","Agriculture and logging to clear land","Urban road construction","Water treatment"],a:1},
    {q:"What is biodiversity?",opts:["The study of plants only","The variety of living species in a given area or on Earth","A type of environmental law","The measurement of pollution levels"],a:1},
    {q:"Which is a nonrenewable energy source?",opts:["Solar power","Wind energy","Natural gas","Hydroelectric power"],a:2},
    {q:"What does carbon neutral mean?",opts:["Producing zero energy","Balancing carbon emissions with an equivalent amount removed from the atmosphere","Using only solar energy","Having no industrial production"],a:1},
  ],
  psychology:[
    {q:"What is the difference between a psychologist and a psychiatrist?",opts:["They are exactly the same","A psychiatrist holds a medical degree and can prescribe medication; a psychologist typically cannot","Psychologists only work with children","Psychiatrists only treat severe mental illness"],a:1},
    {q:"What is confirmation bias?",opts:["A type of memory disorder","The tendency to search for or favor information that confirms what you already believe","A fear of making decisions","A learning disability"],a:1},
    {q:"Maslow's Hierarchy of Needs suggests that basic needs like food and safety must be met before:",opts:["You can earn money","Higher needs like belonging and self-actualization can be pursued","You can go to school","You form relationships"],a:1},
    {q:"What is classical conditioning?",opts:["Teaching through reward and punishment","Learning where a neutral stimulus becomes associated with an automatic response","A type of cognitive therapy","Memory training"],a:1},
    {q:"What does the term 'nature vs. nurture' refer to?",opts:["A debate about farming methods","The debate over whether behavior is shaped more by genetics or environment","A parenting philosophy","A psychological disorder"],a:1},
  ],
  sociology:[
    {q:"What is a social institution?",opts:["A government building","An established system that meets fundamental societal needs, such as family, education, or religion","A type of community center","A legal organization"],a:1},
    {q:"What is the difference between a folkway and a law?",opts:["They are the same","A folkway is an informal social norm; a law is a formal rule with legal consequences","Folkways are written; laws are spoken","Laws are optional; folkways are enforced"],a:1},
    {q:"What is upward social mobility?",opts:["Moving to a new city","Moving to a higher social class through increased income, education, or status","Getting a promotion at work","A type of immigration"],a:1},
    {q:"What is the sociological imagination, as described by C. Wright Mills?",opts:["Creative thinking in social situations","The ability to connect personal experiences to larger social and historical forces","A type of social media","Imagining a perfect society"],a:1},
    {q:"Which term describes judging another culture by the standards of your own culture?",opts:["Cultural relativism","Multiculturalism","Ethnocentrism","Assimilation"],a:2},
  ],
  socialwork:[
    {q:"What ethical principle requires social workers to respect a client's right to make their own decisions?",opts:["Confidentiality","Self-determination","Beneficence","Non-maleficence"],a:1},
    {q:"What is a needs assessment in social work?",opts:["A budget review","A process to identify the specific needs and resources of an individual or community","A background check","A performance evaluation"],a:1},
    {q:"Which best describes the strengths-based approach in social work?",opts:["Focusing on what is wrong with a client's situation","Identifying and building on a client's existing strengths and resources","Providing financial assistance only","Placing clients in institutions"],a:1},
    {q:"Mandatory reporting laws require social workers to report:",opts:["All client conversations","Suspected abuse or neglect of children or vulnerable adults","Financial problems","Housing issues"],a:1},
    {q:"What does case management involve?",opts:["Managing a court case","Coordinating services and resources to meet a client's needs over time","Filing paperwork only","Conducting group therapy"],a:1},
  ],
  political:[
    {q:"What is the purpose of the separation of powers in the U.S. government?",opts:["To make laws easier to pass","To prevent any one branch from becoming too powerful","To speed up government decisions","To reduce the number of elected officials"],a:1},
    {q:"What is gerrymandering?",opts:["A type of election fraud","Manipulating the boundaries of electoral districts to favor a particular party","A voting system used in primaries","A method of campaign financing"],a:1},
    {q:"What is a primary election?",opts:["The main national election in November","An election where voters choose their party's candidate to run in the general election","A local government vote","A recall election"],a:1},
    {q:"What does the judicial branch of government do?",opts:["Creates laws","Enforces laws","Interprets laws and determines if they are constitutional","Controls the military"],a:2},
    {q:"What is the role of the Electoral College?",opts:["It nominates presidential candidates","It formally elects the President and Vice President based on state votes","It approves legislation","It confirms Supreme Court justices"],a:1},
  ],
  criminal:[
    {q:"What is the difference between a felony and a misdemeanor?",opts:["Location where crime occurred","Felonies are more serious crimes with harsher penalties; misdemeanors are less serious","Whether a weapon was used","The age of the offender"],a:1},
    {q:"What does due process mean?",opts:["The speed of a criminal trial","The legal requirement that the government must respect all legal rights owed to a person","A type of plea bargain","The process of jury selection"],a:1},
    {q:"What is the exclusionary rule?",opts:["A rule excluding witnesses from court","Evidence obtained illegally cannot be used in court","A rule about excluding media from trials","A sentencing guideline"],a:1},
    {q:"What is recidivism?",opts:["A rehabilitation program for first-time offenders","The tendency of a convicted criminal to reoffend after release","A type of prison sentence","A legal defense strategy"],a:1},
    {q:"What is the purpose of parole?",opts:["To permanently release a prisoner","To allow early release under supervision, with conditions that must be met","To reduce a prison sentence in court","To transfer prisoners between facilities"],a:1},
  ],
  prelaw:[
    {q:"What is the difference between civil law and criminal law?",opts:["They are the same","Civil law resolves disputes between individuals; criminal law addresses offenses against society","Criminal law only applies to violent crimes","Civil law is handled by police"],a:1},
    {q:"What is a plaintiff?",opts:["The person accused of a crime","The person who brings a lawsuit against another party","A witness in a trial","The judge's assistant"],a:1},
    {q:"What does 'beyond a reasonable doubt' mean?",opts:["The jury is somewhat sure of guilt","The evidence is so strong that no reasonable person would question guilt","The defendant has admitted guilt","A majority of jurors agree"],a:1},
    {q:"What is a deposition?",opts:["A type of court verdict","Pre-trial testimony given under oath outside of court","A legal document filed with the court","A written argument from an attorney"],a:1},
    {q:"What is the purpose of the appeals process?",opts:["To retry a case with a new jury","To review whether legal errors occurred in a lower court that affected the outcome","To increase a criminal sentence","To negotiate a plea deal"],a:1},
  ],
  finearts:[
    {q:"What is chiaroscuro in visual art?",opts:["A type of sculpture","The use of strong contrasts between light and dark to give a sense of volume","A painting done outdoors","A style of abstract art"],a:1},
    {q:"What is the difference between representational and abstract art?",opts:["There is no difference","Representational art depicts recognizable subjects; abstract art uses shapes and forms without literal representation","Abstract art is always black and white","Representational art is older than abstract art"],a:1},
    {q:"What is the purpose of an artist's statement?",opts:["A price list for artworks","A written explanation of the artist's intentions, process, and the meaning behind their work","A biography of famous artists","A list of art materials used"],a:1},
    {q:"Which art movement emphasized dreamlike, irrational imagery?",opts:["Impressionism","Realism","Surrealism","Cubism"],a:2},
    {q:"What does 'medium' refer to in art?",opts:["The size of a painting","The material or technique used to create a work of art","The subject matter of a painting","The artist's style"],a:1},
  ],
  graphicdesign:[
    {q:"What is visual hierarchy in design?",opts:["Using only one color","Arranging design elements to guide the viewer's eye to the most important information first","Making all elements the same size","A type of font choice"],a:1},
    {q:"What does resolution mean in digital design?",opts:["The number of colors in an image","The amount of detail in an image, measured in pixels per inch","The file size of an image","The brightness of a screen"],a:1},
    {q:"What is the difference between RGB and CMYK color modes?",opts:["They produce identical results","RGB is for screens using light; CMYK is for print using ink","CMYK is higher quality than RGB","RGB is only for black and white"],a:1},
    {q:"What is whitespace (negative space) in design?",opts:["White-colored backgrounds only","Empty space around elements that improves readability and visual clarity","A design mistake","The background color of a page"],a:1},
    {q:"What is a vector graphic?",opts:["A photograph taken with high quality","An image made of mathematical paths that can be scaled without losing quality","A type of animation","A low-resolution image"],a:1},
  ],
  photography:[
    {q:"What does aperture control in a camera?",opts:["The shutter speed","How much light enters through the lens","The ISO sensitivity","The focal length"],a:1},
    {q:"What is the rule of thirds?",opts:["Using three colors in every photo","A composition guideline dividing the frame into nine sections to create more balanced images","Taking three photos of every subject","A lighting technique"],a:1},
    {q:"What does ISO measure in photography?",opts:["The speed of the shutter","The camera sensor's sensitivity to light","The focal length of a lens","The aperture size"],a:1},
    {q:"What is depth of field?",opts:["The distance between the camera and subject","The range of distance in a photo that appears acceptably sharp","The brightness of an image","The size of the camera sensor"],a:1},
    {q:"What is the purpose of white balance in photography?",opts:["To increase image resolution","To ensure colors appear accurate under different lighting conditions","To control exposure time","To reduce image noise"],a:1},
  ],
  filmvideo:[
    {q:"What is a storyboard used for in film production?",opts:["Recording audio during filming","Visually planning a film shot by shot before production begins","Editing footage after filming","Writing the script"],a:1},
    {q:"What does the director of photography (DP) do?",opts:["Writes the screenplay","Oversees the visual look of the film, including camera work and lighting","Manages the film's budget","Directs the actors"],a:1},
    {q:"What is the difference between pre-production and post-production?",opts:["They are the same phase","Pre-production is planning before filming; post-production is editing and finishing after filming","Post-production happens before filming","Pre-production is only for big-budget films"],a:1},
    {q:"What is continuity in filmmaking?",opts:["Using the same camera throughout","Ensuring visual consistency so details match between different shots of the same scene","A type of film genre","The speed of editing"],a:1},
    {q:"What does a foley artist do?",opts:["Writes music for films","Creates and records everyday sound effects to be added to a film in post-production","Operates the camera","Designs costumes"],a:1},
  ],
  architecture:[
    {q:"What is the purpose of load-bearing walls in a building?",opts:["Decoration only","They support the weight of the structure above and cannot be removed","They separate rooms","They provide insulation"],a:1},
    {q:"What does sustainable architecture prioritize?",opts:["Using the most expensive materials","Designing buildings that minimize environmental impact and use resources efficiently","Making buildings as large as possible","Speed of construction"],a:1},
    {q:"What is the function of a foundation in a building?",opts:["To support the roof","To transfer the building's load to the ground and provide stability","To provide insulation","To support interior walls only"],a:1},
    {q:"What does scale mean in architectural drawings?",opts:["The height of a building","The proportional relationship between the drawing and the actual building size","The cost of materials","The building's weight limit"],a:1},
    {q:"What is the difference between structural and aesthetic design in architecture?",opts:["They are the same","Structural design ensures safety and stability; aesthetic design focuses on visual appearance","Aesthetic design is more important","Structural design only applies to large buildings"],a:1},
  ],
  communications:[
    {q:"What is the difference between verbal and nonverbal communication?",opts:["There is no difference","Verbal uses spoken or written words; nonverbal uses body language, tone, and facial expressions","Nonverbal is less important","Verbal only refers to speeches"],a:1},
    {q:"What is media literacy?",opts:["The ability to read quickly","The ability to critically analyze, evaluate, and create media messages","A type of journalism degree","Reading newspapers daily"],a:1},
    {q:"What does framing mean in media communication?",opts:["Putting a photo in a frame","How media presents information to shape the audience's perception of an issue","A type of camera shot","A news broadcast format"],a:1},
    {q:"What is the purpose of an op-ed?",opts:["To report breaking news objectively","To express a personal opinion or argument on a topic, typically in a newspaper","To announce a product","To summarize a TV show"],a:1},
    {q:"What is active listening?",opts:["Listening to music while studying","Fully concentrating, understanding, and responding thoughtfully to a speaker","Listening without taking notes","Hearing something without paying attention"],a:1},
  ],
  journalism:[
    {q:"What is the inverted pyramid structure in news writing?",opts:["Starting with background information","Presenting the most important information first, followed by supporting details","Writing stories in chronological order","Using the longest paragraph first"],a:1},
    {q:"What is a primary source in journalism?",opts:["The most popular news outlet","Direct, firsthand information such as eyewitness accounts or original documents","A story published by a major newspaper","A summary of another article"],a:1},
    {q:"What is libel?",opts:["A type of news broadcast","A false published statement that damages someone's reputation","A journalism award","A type of anonymous source"],a:1},
    {q:"What is the difference between hard news and feature stories?",opts:["Hard news is longer than features","Hard news covers timely, important events; features explore topics in greater depth or human interest","Feature stories are more credible","Hard news is only about politics"],a:1},
    {q:"Why is source diversity important in journalism?",opts:["It makes articles longer","It ensures multiple perspectives are represented and reduces bias","It is required by law","It increases advertisement revenue"],a:1},
  ],
  english:[
    {q:"What is the difference between a simile and a metaphor?",opts:["They are the same thing","A simile compares using 'like' or 'as'; a metaphor makes the comparison directly without those words","Metaphors are more poetic","Similes are only used in poetry"],a:1},
    {q:"What is the narrative point of view in first person?",opts:["An unknown narrator tells the story","The story is told from the perspective of a character using 'I' and 'me'","Multiple characters narrate alternately","The narrator knows everything about all characters"],a:1},
    {q:"What is the purpose of a counterargument in a persuasive essay?",opts:["To confuse the reader","To acknowledge an opposing viewpoint and then refute it, strengthening your argument","To end the essay","To introduce your main argument"],a:1},
    {q:"What is the difference between denotation and connotation?",opts:["They mean the same thing","Denotation is a word's literal dictionary meaning; connotation is the emotional or cultural associations it carries","Connotation is more accurate than denotation","Denotation only applies to technical writing"],a:1},
    {q:"What is a round character in fiction?",opts:["A character who appears in every scene","A complex, fully developed character who changes or grows throughout the story","A character with no flaws","A character based on a real person"],a:1},
  ],
  pr:[
    {q:"What is the primary goal of public relations?",opts:["To sell products directly","To manage and shape the public perception of a person, company, or organization","To create advertisements","To handle customer complaints"],a:1},
    {q:"What is a press release?",opts:["A recorded statement by a company","An official written statement distributed to media to announce newsworthy information","A type of paid advertisement","A social media post"],a:1},
    {q:"What is crisis communication in PR?",opts:["Communicating only during slow business periods","Managing and responding to a negative event or controversy to protect an organization's reputation","Avoiding the media during problems","A type of press conference"],a:1},
    {q:"What is the difference between PR and advertising?",opts:["They are the same","PR earns media coverage organically; advertising is paid placement","Advertising is more credible","PR only uses social media"],a:1},
    {q:"What is a media kit?",opts:["Camera equipment for journalists","A package of information about a company or person provided to media for coverage","A type of press release","A list of media contacts"],a:1},
  ],
  digitalmedia:[
    {q:"What is SEO?",opts:["Social Engagement Online","Search Engine Optimization — improving content so it ranks higher in search results","Software Engineering Operations","A type of digital advertisement"],a:1},
    {q:"What is engagement rate on social media?",opts:["The number of followers","A metric measuring how actively an audience interacts with content through likes, comments, and shares","The number of posts per day","The cost of running ads"],a:1},
    {q:"What is a content strategy?",opts:["A plan for what furniture to put in an office","A plan for creating, publishing, and managing content to achieve specific goals","A type of social media profile","A list of popular hashtags"],a:1},
    {q:"What does 'going viral' mean?",opts:["A computer getting a virus","Content spreading rapidly and widely across the internet","A live streaming event","A paid advertising campaign"],a:1},
    {q:"What is a podcast?",opts:["A type of live TV show","A digital audio program available for streaming or download, often released in episodes","A video-only platform","A type of blog"],a:1},
  ],
  education:[
    {q:"What is the difference between formative and summative assessment?",opts:["They are the same","Formative is ongoing feedback during learning; summative evaluates learning at the end of a unit or course","Summative is given daily","Formative only applies to standardized tests"],a:1},
    {q:"What is differentiated instruction?",opts:["Teaching the same lesson the same way to all students","Adjusting teaching methods and content to meet the diverse learning needs of individual students","Giving advanced students more homework","A type of classroom management"],a:1},
    {q:"What does an IEP (Individualized Education Program) provide?",opts:["A general curriculum for all students","A customized educational plan for students with disabilities, outlining specific goals and accommodations","A gifted student program","A behavior contract"],a:1},
    {q:"What is the purpose of Bloom's Taxonomy in education?",opts:["Classifying plant species","A framework that categorizes levels of cognitive thinking from basic recall to complex creation","A grading scale","A classroom behavior system"],a:1},
    {q:"What is project-based learning?",opts:["Assigning textbook chapters only","Students learn by actively working on real-world projects over an extended period","A type of standardized test","Watching educational videos"],a:1},
  ],
  earlychildhood:[
    {q:"What is parallel play in child development?",opts:["Children playing the same game together","When young children play near each other but independently, without direct interaction","Children taking turns","A structured group activity"],a:1},
    {q:"What is the zone of proximal development (ZPD)?",opts:["A classroom seating arrangement","The range of tasks a child can do with guidance but not yet independently — Vygotsky's concept","A physical play area","A reading level assessment"],a:1},
    {q:"What does attachment theory suggest about early childhood?",opts:["Children learn best alone","Strong emotional bonds with caregivers in early childhood form the foundation for healthy development","Play is not important for learning","Children develop at the same rate"],a:1},
    {q:"What is the purpose of a developmental milestone?",opts:["A school grade level","A marker of typical skills and behaviors expected at certain ages in a child's development","A standardized test score","A parenting technique"],a:1},
    {q:"Which type of play is most important for young children's social development?",opts:["Solitary play","Cooperative play with peers","Watching educational programs","Individual academic work"],a:1},
  ],
  sportsmanagement:[
    {q:"What is an athlete's NIL rights?",opts:["National Insurance for League players","The right for athletes to profit from their Name, Image, and Likeness","A type of sports contract","A league's negotiating rules"],a:1},
    {q:"What is a salary cap in professional sports?",opts:["The minimum wage for athletes","A limit on the total amount a team can spend on player salaries to maintain competitive balance","A player's maximum bonus","The cost of stadium operations"],a:1},
    {q:"What does a sports agent primarily do?",opts:["Coach athletes during games","Negotiate contracts and manage business relationships on behalf of athletes","Manage team finances","Scout new players"],a:1},
    {q:"What is sports analytics used for?",opts:["Counting game attendance only","Analyzing data to improve player performance, team strategy, and business decisions","Designing team uniforms","Managing ticket sales"],a:1},
    {q:"What is the purpose of a collective bargaining agreement in sports?",opts:["To set ticket prices","A negotiated contract between a players' union and team owners covering salaries, benefits, and working conditions","To schedule games","To establish fan rules"],a:1},
  ],
  eventmanagement:[
    {q:"What is a run of show document?",opts:["A post-event report","A detailed timeline listing every element of an event in sequence","A vendor contract","A budget summary"],a:1},
    {q:"What does an event planner do during the vendor negotiation phase?",opts:["Set up chairs and tables","Discuss and agree on services, pricing, and contracts with suppliers like caterers and venues","Send invitations to guests","Create the event program"],a:1},
    {q:"What is an event brief?",opts:["A short summary sent to guests","A document outlining the goals, audience, budget, and key details of an event","A post-event review","A vendor invoice"],a:1},
    {q:"What is contingency planning in event management?",opts:["Planning for the best possible outcome","Preparing backup plans for problems that might occur, like weather or technical issues","A type of event budget","Planning entertainment options"],a:1},
    {q:"What does ROI mean for an event organizer?",opts:["Range of Invitation","Return on Investment — measuring whether the event achieved its goals relative to its cost","Rate of Involvement","Reach of Impact"],a:1},
  ],
  hospitality:[
    {q:"What is RevPAR in hotel management?",opts:["Revenue Per Available Room — a key measure of hotel financial performance","Rate of Variable Pricing and Revenue","A type of hotel rating","Revenue Per Annual Reservation"],a:0},
    {q:"What is the purpose of a guest satisfaction survey?",opts:["To sell additional services","To collect feedback that helps identify areas for improvement in guest experience","To verify billing information","To check guests out faster"],a:1},
    {q:"What does 'overbooking' mean in hospitality?",opts:["Having too many staff scheduled","Accepting more reservations than capacity, anticipating some cancellations","Charging guests too much","Booking the wrong type of room"],a:1},
    {q:"What is upselling in a restaurant or hotel?",opts:["Lowering prices to attract more customers","Encouraging customers to purchase a higher-value option or additional services","Offering refunds","Reducing menu options"],a:1},
    {q:"What is the difference between front-of-house and back-of-house in a restaurant?",opts:["Front is for managers; back is for staff","Front-of-house is the customer-facing area; back-of-house is the kitchen and operations area","They are the same","Front is indoor; back is outdoor"],a:1},
  ],
  generalstudies:[
    {q:"If you earn $2,500 per month and your rent is $900, what percentage of your income goes to rent?",opts:["27.5%","36%","45%","18%"],a:1},
    {q:"What is the difference between a need and a want?",opts:["They are the same","A need is essential for survival or basic functioning; a want is something desired but not essential","Wants cost more than needs","Needs are only physical items"],a:1},
    {q:"What does it mean to live within your means?",opts:["Earning as much money as possible","Spending no more than you earn and avoiding unnecessary debt","Only buying sale items","Having a savings account"],a:1},
    {q:"What is compound interest and why does it matter?",opts:["Interest paid once a year — it does not matter much","Interest calculated on both the original amount and previously earned interest — it grows faster over time","A fixed fee charged by banks","Interest only on the original deposit"],a:1},
    {q:"A credit card has a 20% annual interest rate. If you carry a $500 balance for a year without paying it off, approximately how much interest will you owe?",opts:["$5","$50","$100","$200"],a:2},
  ],
};

// ── State ─────────────────────────────────────────────────────
let ob = {
  player:null, step:'character',
  selectedChar:null, selectedCategory:null, selectedMajor:null,
  questions:[], currentQ:0, score:0, wrongAnswers:[],
};

// ── Init ──────────────────────────────────────────────────────
window.initOnboarding = function(player) {
  ob.player = player;
  ob.step   = player.onboardingStep || 'character';
  if (player.characterId) {
    ob.selectedChar = OB_CHARACTERS.find(c => c.id === player.characterId) || null;
  }
  if (player.majorId) {
    for (const cat of OB_CATEGORIES) {
      const m = cat.majors.find(m => m.id === player.majorId);
      if (m) { ob.selectedMajor = m; ob.selectedCategory = cat; break; }
    }
    if (ob.selectedMajor) {
      ob.questions = OB_QUESTIONS[ob.selectedMajor.id] || OB_QUESTIONS.generalstudies;
    }
  }
  obRender();
};

function obRender() {
  const el = document.getElementById('screen-onboarding');
  if (!el) return;
  if      (ob.step === 'character') obRenderCharacter(el);
  else if (ob.step === 'category')  obRenderCategory(el);
  else if (ob.step === 'major')     obRenderMajor(el);
  else if (ob.step === 'finals')    obRenderFinals(el);
  else if (ob.step === 'results')   obRenderResults(el);
  else { showScreen('screen-home'); if (window.initHome) window.initHome(ob.player); }
}

function obStepBar(active) {
  return ['Character','Degree','Finals','Graduate'].map((s,i) => {
    const n = i+1, cls = n < active ? 'done' : n === active ? 'active' : '';
    return `<div class="ob-step ${cls}">${n} ${s}</div>`;
  }).join('');
}

// ── Step 1: Character ─────────────────────────────────────────
function obRenderCharacter(el) {
  el.innerHTML = `<div class="ob-wrap">
    <div class="ob-header">
      <div class="ob-step-bar">${obStepBar(1)}</div>
      <h1 class="ob-title">Who are you?</h1>
      <p class="ob-sub">Choose your character. This is how you'll be known in Capital Heights.</p>
    </div>
    <div class="char-grid">
      ${OB_CHARACTERS.map(c => `
        <div class="char-card ${ob.selectedChar?.id===c.id?'selected':''}" onclick="obSelectChar('${c.id}')">
          <div class="char-emoji">${c.emoji}</div>
          <div class="char-name">${c.name}</div>
          <div class="char-desc">${c.desc}</div>
        </div>`).join('')}
    </div>
    <div class="ob-footer">
      <button class="ob-btn" onclick="obConfirmChar()" ${!ob.selectedChar?'disabled':''}>
        Choose This Character →
      </button>
    </div>
  </div>`;
}
window.obSelectChar = id => { ob.selectedChar = OB_CHARACTERS.find(c => c.id === id); obRender(); };
window.obConfirmChar = async () => {
  if (!ob.selectedChar) return;
  await window.GameState.FirestoreDB.updatePlayer(ob.player.uid, {
    characterId: ob.selectedChar.id, characterName: ob.selectedChar.name, onboardingStep:'degree'
  });
  ob.step = 'category'; obRender();
};

// ── Step 2a: Category Select ──────────────────────────────────
function obRenderCategory(el) {
  const regular = OB_CATEGORIES.filter(c => !c.isGeneral);
  const general = OB_CATEGORIES.find(c => c.isGeneral);
  el.innerHTML = `<div class="ob-wrap">
    <div class="ob-header">
      <div class="ob-step-bar">${obStepBar(2)}</div>
      <h1 class="ob-title">Choose your field of study</h1>
      <p class="ob-sub">Select a category to see the available degrees.</p>
    </div>
    <div class="cat-grid">
      ${regular.map(c => `
        <div class="cat-card" style="--cat-color:${c.color};" onclick="obSelectCategory('${c.id}')">
          <div class="cat-icon">${c.icon}</div>
          <div class="cat-label">${c.label}</div>
        </div>`).join('')}
    </div>
    <div class="cat-general" onclick="obSelectCategory('${general.id}')">
      <div class="cat-icon">${general.icon}</div>
      <div class="cat-label">${general.label}</div>
      <div class="cat-general-sub">Not sure yet? Start here.</div>
    </div>
  </div>`;
}
window.obSelectCategory = id => {
  ob.selectedCategory = OB_CATEGORIES.find(c => c.id === id);
  // If general studies — skip major select, go straight to finals
  if (ob.selectedCategory.isGeneral) {
    ob.selectedMajor = ob.selectedCategory.majors[0];
    ob.questions = OB_QUESTIONS.generalstudies;
    ob.currentQ = 0; ob.score = 0; ob.wrongAnswers = [];
    ob.step = 'finals'; obRender();
  } else {
    ob.step = 'major'; obRender();
  }
};

// ── Step 2b: Major Select ─────────────────────────────────────
function obRenderMajor(el) {
  const cat = ob.selectedCategory;
  el.innerHTML = `<div class="ob-wrap">
    <div class="ob-header">
      <div class="ob-step-bar">${obStepBar(2)}</div>
      <h1 class="ob-title">${cat.icon} ${cat.label}</h1>
      <p class="ob-sub">Choose your specific major.</p>
    </div>
    <div class="major-list">
      ${cat.majors.map(m => `
        <div class="major-card ${ob.selectedMajor?.id===m.id?'selected':''}" onclick="obSelectMajor('${m.id}')">
          ${m.label}
        </div>`).join('')}
    </div>
    <div class="ob-footer" style="display:flex;gap:12px;justify-content:center;">
      <button class="ob-btn" style="background:#2a2a2a;color:#ccc;" onclick="ob.step='category';obRender()">← Back</button>
      <button class="ob-btn" onclick="obConfirmMajor()" ${!ob.selectedMajor?'disabled':''}>
        Enroll in ${ob.selectedMajor?ob.selectedMajor.label:'...'} →
      </button>
    </div>
  </div>`;
}
window.obSelectMajor = id => {
  ob.selectedMajor = ob.selectedCategory.majors.find(m => m.id === id);
  obRender();
};
window.obConfirmMajor = async () => {
  if (!ob.selectedMajor) return;
  await window.GameState.FirestoreDB.updatePlayer(ob.player.uid, {
    majorId: ob.selectedMajor.id, majorLabel: ob.selectedMajor.label, onboardingStep:'finals'
  });
  ob.questions = OB_QUESTIONS[ob.selectedMajor.id] || OB_QUESTIONS.generalstudies;
  ob.currentQ = 0; ob.score = 0; ob.wrongAnswers = [];
  ob.step = 'finals'; obRender();
};

// ── Step 3: Finals ────────────────────────────────────────────
function obRenderFinals(el) {
  const q = ob.questions[ob.currentQ];
  const prog = Math.round((ob.currentQ / ob.questions.length) * 100);
  el.innerHTML = `<div class="ob-wrap">
    <div class="ob-header">
      <div class="ob-step-bar">${obStepBar(3)}</div>
      <h1 class="ob-title">${ob.selectedMajor.label} — Final Exam</h1>
      <p class="ob-sub">Question ${ob.currentQ+1} of ${ob.questions.length} &nbsp;|&nbsp;
        <span class="drop-link" onclick="obDropClass()">Drop Class</span></p>
      <div class="progress-bar"><div class="progress-fill" style="width:${prog}%"></div></div>
    </div>
    <div class="finals-box">
      <div class="finals-q">${q.q}</div>
      <div class="finals-opts">
        ${q.opts.map((opt,i) => `<button class="finals-opt" onclick="obAnswerQ(${i})">${opt}</button>`).join('')}
      </div>
    </div>
  </div>`;
}
window.obDropClass = () => {
  if (!confirm('Drop this class? You will go back to choosing your degree.')) return;
  ob.selectedMajor = null; ob.currentQ = 0; ob.score = 0; ob.wrongAnswers = [];
  ob.step = 'category'; obRender();
};
window.obAnswerQ = idx => {
  const q = ob.questions[ob.currentQ];
  if (idx === q.a) ob.score++;
  else ob.wrongAnswers.push({question:q.q, correct:q.opts[q.a], chosen:q.opts[idx]});
  document.querySelectorAll('.finals-opt').forEach((btn,i) => {
    btn.disabled = true;
    if (i === q.a) btn.classList.add('correct');
    if (i === idx && idx !== q.a) btn.classList.add('wrong');
  });
  setTimeout(() => {
    ob.currentQ++;
    if (ob.currentQ >= ob.questions.length) ob.step = 'results';
    obRender();
  }, 900);
};

// ── Step 4: Results ───────────────────────────────────────────
function obRenderResults(el) {
  const total = ob.questions.length, passed = ob.score >= 3;
  const pct = Math.round((ob.score / total) * 100);
  const gpa = passed ? (2.0 + ((ob.score / total) * 2.0)).toFixed(1) : null;
  el.innerHTML = `<div class="ob-wrap">
    <div class="ob-header">
      <div class="ob-step-bar">${obStepBar(4)}</div>
      <h1 class="ob-title">${passed ? '🎓 Congratulations!' : '📋 Not Quite...'}</h1>
    </div>
    <div class="results-box">
      <div class="results-score ${passed?'pass':'fail'}">${ob.score}/${total}</div>
      <div class="results-pct">${pct}%</div>
      <p class="results-msg">
        ${passed
          ? `You passed your <strong>${ob.selectedMajor.label}</strong> finals with a <strong>${gpa} GPA</strong>. Welcome to Capital Heights, ${ob.player.firstName}.`
          : `You need at least 3 correct answers to graduate. Review your mistakes and try again.`}
      </p>
      ${ob.wrongAnswers.length > 0 ? `
        <div class="results-review">
          <p class="review-label">Review your mistakes</p>
          ${ob.wrongAnswers.map(w => `
            <div class="review-item">
              <div class="review-q">${w.question}</div>
              <div class="review-wrong">✗ Your answer: ${w.chosen}</div>
              <div class="review-correct">✓ Correct: ${w.correct}</div>
            </div>`).join('')}
        </div>` : ''}
      ${passed
        ? `<button class="ob-btn" onclick="obGraduate('${gpa}')">Enter Capital Heights →</button>`
        : `<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
             <button class="ob-btn retry" onclick="obRetryFinals()">Retake the Exam</button>
             <button class="ob-btn" style="background:#2a2a2a;color:#ccc;" onclick="obDropClass()">Switch Degree</button>
           </div>`}
    </div>
  </div>`;
}
window.obRetryFinals = () => { ob.currentQ=0; ob.score=0; ob.wrongAnswers=[]; ob.step='finals'; obRender(); };
window.obGraduate = async gpa => {
  await window.GameState.FirestoreDB.updatePlayer(ob.player.uid, {
    graduationGPA: parseFloat(gpa), onboardingStep: 'jobboard'
  });
  ob.player.onboardingStep = 'jobboard';
  window.GameState.player = ob.player;
  showScreen('screen-citymap');
  if (window.initCityMap) window.initCityMap(ob.player);
};