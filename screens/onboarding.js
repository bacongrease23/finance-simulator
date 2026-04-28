// ============================================================
// CAPITAL HEIGHTS — onboarding.js
// ============================================================

const OB_CHARACTERS = [
  { id:"char1", name:"Alex Rivera",    desc:"Business-minded and ambitious",   emoji:"🧑" },
  { id:"char2", name:"Jordan Lee",     desc:"Tech-savvy problem solver",        emoji:"👩" },
  { id:"char3", name:"Morgan Chen",    desc:"Creative and entrepreneurial",     emoji:"🧑" },
  { id:"char4", name:"Taylor Brooks",  desc:"Detail-oriented and analytical",   emoji:"👩" },
  { id:"char5", name:"Casey Williams", desc:"People-focused team player",       emoji:"🧑" },
  { id:"char6", name:"Riley Johnson",  desc:"Strategic and goal-driven",        emoji:"👩" },
];

const OB_MAJORS = [
  { id:"business",        label:"Business Administration",       category:"Business & Finance" },
  { id:"finance",         label:"Finance",                       category:"Business & Finance" },
  { id:"accounting",      label:"Accounting",                    category:"Business & Finance" },
  { id:"economics",       label:"Economics",                     category:"Business & Finance" },
  { id:"marketing",       label:"Marketing",                     category:"Business & Finance" },
  { id:"entrepreneurship",label:"Entrepreneurship",              category:"Business & Finance" },
  { id:"realestate",      label:"Real Estate",                   category:"Business & Finance" },
  { id:"hr",              label:"Human Resources",               category:"Business & Finance" },
  { id:"intlbusiness",    label:"International Business",        category:"Business & Finance" },
  { id:"cs",              label:"Computer Science",              category:"Technology" },
  { id:"it",              label:"Information Technology",        category:"Technology" },
  { id:"cybersecurity",   label:"Cybersecurity",                 category:"Technology" },
  { id:"engineering",     label:"Engineering",                   category:"Technology" },
  { id:"nursing",         label:"Nursing",                       category:"Health & Science" },
  { id:"biology",         label:"Biology",                       category:"Health & Science" },
  { id:"publichealth",    label:"Public Health",                 category:"Health & Science" },
  { id:"kinesiology",     label:"Kinesiology & Exercise Science",category:"Health & Science" },
  { id:"envsci",          label:"Environmental Science",         category:"Health & Science" },
  { id:"psychology",      label:"Psychology",                    category:"Social Sciences & Law" },
  { id:"sociology",       label:"Sociology",                     category:"Social Sciences & Law" },
  { id:"socialwork",      label:"Social Work",                   category:"Social Sciences & Law" },
  { id:"political",       label:"Political Science",             category:"Social Sciences & Law" },
  { id:"criminal",        label:"Criminal Justice",              category:"Social Sciences & Law" },
  { id:"prelaw",          label:"Pre-Law",                       category:"Social Sciences & Law" },
  { id:"communications",  label:"Communications & Media",        category:"Arts, Media & Communication" },
  { id:"journalism",      label:"Journalism",                    category:"Arts, Media & Communication" },
  { id:"arts",            label:"Fine Arts & Design",            category:"Arts, Media & Communication" },
  { id:"graphicdesign",   label:"Graphic Design",                category:"Arts, Media & Communication" },
  { id:"english",         label:"English & Creative Writing",    category:"Arts, Media & Communication" },
  { id:"education",       label:"Education",                     category:"Education & Hospitality" },
  { id:"earlychildhood",  label:"Early Childhood Education",     category:"Education & Hospitality" },
  { id:"sportsmanagement",label:"Sports Management",             category:"Education & Hospitality" },
  { id:"hospitality",     label:"Hospitality & Restaurant Mgmt", category:"Education & Hospitality" },
  { id:"generalstudies",  label:"General Studies",               category:"General" },
];

const OB_QUESTIONS = {
  business:[
    {q:"What does a business budget help you do?",opts:["Plan how to spend and save money","Choose what to wear to work","Decide how many employees to hire","Set store hours"],a:0},
    {q:"What is profit?",opts:["Money a business spends on supplies","Money left over after paying all expenses","A type of bank loan","The number of customers served"],a:1},
    {q:"What does a manager do?",opts:["Only handles the money","Leads and organizes a team to meet goals","Works alone on projects","Only talks to customers"],a:1},
    {q:"What is customer service?",opts:["Fixing broken products only","Helping and satisfying the people who buy from you","Counting inventory","Writing advertisements"],a:1},
    {q:"A business expense is:",opts:["Money the business earns","Money the business spends","A type of savings account","A customer complaint"],a:1},
  ],
  finance:[
    {q:"What is interest on a savings account?",opts:["A fee you pay the bank","Extra money the bank pays you for keeping money there","A type of loan","A monthly charge"],a:1},
    {q:"What is a stock?",opts:["A type of bank account","A small ownership share in a company","A government loan","A type of insurance"],a:1},
    {q:"What does it mean to invest money?",opts:["Spend it immediately","Put it somewhere hoping it will grow over time","Donate it to charity","Keep it under your mattress"],a:1},
    {q:"What is a credit score used for?",opts:["Tracking how much you spend on food","Showing how responsible you are with borrowed money","Counting your savings","Measuring your income"],a:1},
    {q:"What is a 401k?",opts:["A type of credit card","A retirement savings account through your employer","A bank loan","A government tax"],a:1},
  ],
  accounting:[
    {q:"Revenue means:",opts:["Money a business spends","Total money a business earns from sales","A type of expense","A bank loan"],a:1},
    {q:"What is an expense?",opts:["Money earned from sales","Money spent to run the business","A type of profit","A customer payment"],a:1},
    {q:"What does an accountant primarily do?",opts:["Design products","Track, record, and manage financial records","Hire employees","Handle customer service"],a:1},
    {q:"What is payroll?",opts:["A list of customers","The process of paying employees their wages","A type of bank account","A business expense report"],a:1},
    {q:"What is a balance sheet?",opts:["A daily sales report","A document showing what a business owns and owes","An employee schedule","A customer list"],a:1},
  ],
  economics:[
    {q:"What happens when a product is scarce but everyone wants it?",opts:["The price usually goes down","The price usually goes up","The product becomes free","Nothing changes"],a:1},
    {q:"What is inflation?",opts:["Prices going down over time","Prices going up over time","The economy growing fast","A type of tax"],a:1},
    {q:"Supply means:",opts:["How much people want something","How much of something is available","The price of a product","A type of store"],a:1},
    {q:"What is GDP?",opts:["A type of loan","The total value of goods and services a country produces","A government agency","A stock market index"],a:1},
    {q:"A tax is:",opts:["A voluntary donation","Money the government collects from people and businesses","A type of savings account","A business expense only"],a:1},
  ],
  marketing:[
    {q:"What is advertising?",opts:["Paying your employees","Promoting a product or service to get people to buy it","Managing store inventory","Tracking expenses"],a:1},
    {q:"A brand is:",opts:["A product's price","The identity and image of a company or product","A type of advertisement","A sales strategy"],a:1},
    {q:"What is a target audience?",opts:["All people everywhere","The specific group of people a business is trying to reach","A sales goal","A type of advertisement"],a:1},
    {q:"What does a logo represent?",opts:["A product's price","A visual symbol that identifies a brand","An employee name tag","A store layout"],a:1},
    {q:"Social media marketing means:",opts:["Mailing paper flyers","Using platforms like Instagram to promote products","Running TV commercials only","Cold-calling customers"],a:1},
  ],
  entrepreneurship:[
    {q:"An entrepreneur is someone who:",opts:["Works for a large company","Starts and runs their own business","Only invests in stocks","Manages a government office"],a:1},
    {q:"What is a startup?",opts:["A morning work routine","A newly created business","A type of bank loan","A government grant"],a:1},
    {q:"What is a business plan?",opts:["A store floor layout","A written document describing how a business will operate and make money","A list of employees","A marketing flyer"],a:1},
    {q:"What does taking a risk mean in business?",opts:["Breaking the law","Making a decision that could lead to loss or gain","Hiring more people","Spending less money"],a:1},
    {q:"What is a product?",opts:["A type of advertisement","Something a business creates and sells","A company's total profit","A customer complaint"],a:1},
  ],
  realestate:[
    {q:"What is a mortgage?",opts:["A type of savings account","A loan used to buy property","A monthly rent payment","A home insurance plan"],a:1},
    {q:"What does a real estate agent do?",opts:["Builds houses","Helps people buy and sell property","Manages rental payments","Designs home interiors"],a:1},
    {q:"What is a down payment?",opts:["The last payment on a loan","An upfront payment made when buying a home","A monthly mortgage payment","A type of property tax"],a:1},
    {q:"What does renting mean?",opts:["Owning a home","Paying to live in someone else's property","Buying property with a loan","Selling a house"],a:1},
    {q:"What is property value?",opts:["How much rent is charged","How much a piece of real estate is worth","The size of a home in square feet","The age of a building"],a:1},
  ],
  hr:[
    {q:"What does HR stand for?",opts:["High Revenue","Human Resources","Home Registration","Health Records"],a:1},
    {q:"What does an HR department primarily handle?",opts:["Marketing and advertising","Hiring, employee benefits, and workplace policies","Product development","Customer service"],a:1},
    {q:"What is a job interview?",opts:["A work performance review","A meeting where an employer evaluates a potential hire","A salary negotiation","A company orientation"],a:1},
    {q:"What is a workplace benefit?",opts:["A bonus sale","Extra compensation like health insurance or paid time off","A job promotion","A company party"],a:1},
    {q:"What does onboarding mean?",opts:["Leaving a job","The process of introducing a new employee to a company","A performance review","A job training test"],a:1},
  ],
  intlbusiness:[
    {q:"What is international trade?",opts:["Businesses only selling locally","Buying and selling goods between different countries","A type of stock market","A government trade law"],a:1},
    {q:"What is an exchange rate?",opts:["A store return policy","The value of one country's currency compared to another","A business trade agreement","A type of international tax"],a:1},
    {q:"A multinational company is:",opts:["A small local business","A company that operates in multiple countries","A government-owned business","A startup company"],a:1},
    {q:"What is an import?",opts:["A product made and sold locally","A product brought into a country from another country","A type of business tax","A trade agreement"],a:1},
    {q:"What is globalization?",opts:["A local business strategy","The growing connection of countries through trade, culture, and technology","A type of currency","A government policy"],a:1},
  ],
  cs:[
    {q:"What is a computer program?",opts:["A computer's physical parts","A set of instructions that tells a computer what to do","A type of internet browser","A computer keyboard"],a:1},
    {q:"What does the internet allow people to do?",opts:["Only send emails","Connect and share information globally","Only play video games","Only shop online"],a:1},
    {q:"What is a password used for?",opts:["Making computers faster","Protecting accounts and keeping information private","Connecting to WiFi","Organizing files"],a:1},
    {q:"What does coding mean?",opts:["Sending secret messages","Writing instructions for a computer in a programming language","Designing a website's colors","Fixing broken hardware"],a:1},
    {q:"What is an app?",opts:["A type of computer virus","A software program designed for a specific purpose","A computer's hard drive","A type of internet browser"],a:1},
  ],
  it:[
    {q:"What does IT stand for?",opts:["International Trade","Information Technology","Internal Transfer","Internet Testing"],a:1},
    {q:"What is a network?",opts:["A type of computer program","A system of connected computers that can share information","A computer's operating system","A type of software"],a:1},
    {q:"What is a firewall?",opts:["A physical barrier in a building","A security system that protects a network from unauthorized access","A type of computer virus","A backup system"],a:1},
    {q:"What does backing up data mean?",opts:["Deleting old files","Saving a copy of important files in case the original is lost","Speeding up a computer","Connecting to the internet"],a:1},
    {q:"What is tech support?",opts:["Selling new computers","Helping people solve technology problems","Building computer hardware","Designing new software"],a:1},
  ],
  cybersecurity:[
    {q:"What is a computer virus?",opts:["A physical illness spread by computers","Harmful software that can damage or steal data","A type of firewall","A security update"],a:1},
    {q:"What is phishing?",opts:["A computer game","A trick used to steal personal information by pretending to be trustworthy","A type of antivirus software","A network connection"],a:1},
    {q:"Why should you use a strong password?",opts:["To make it easier to remember","To make it harder for others to guess and access your accounts","Passwords do not matter","To log in faster"],a:1},
    {q:"What does antivirus software do?",opts:["Speeds up your computer","Detects and removes harmful software from your device","Connects you to the internet","Backs up your files"],a:1},
    {q:"What is personal data?",opts:["Data stored on a company server","Private information about an individual like name, address, or passwords","Public information anyone can see","A type of computer file"],a:1},
  ],
  engineering:[
    {q:"What do engineers primarily do?",opts:["Write books","Design and build solutions to real-world problems","Manage businesses","Teach students"],a:1},
    {q:"What is a blueprint?",opts:["A type of paint color","A detailed technical drawing of a design or building","A project budget","A team schedule"],a:1},
    {q:"What does prototype mean?",opts:["A finished product","An early model built to test a design","A type of engineering tool","A project report"],a:1},
    {q:"Why is math important in engineering?",opts:["It is not really important","Engineers use math to calculate, measure, and solve problems accurately","Only for accounting","To write reports"],a:1},
    {q:"What is structural integrity?",opts:["How attractive a building looks","How well a structure can hold up under stress or weight","The cost of building materials","The speed of construction"],a:1},
  ],
  nursing:[
    {q:"What is a patient?",opts:["A doctor in training","A person receiving medical care","A hospital administrator","A medical researcher"],a:1},
    {q:"What does taking someone's temperature tell you?",opts:["Their blood pressure","Whether they have a fever or unusually low body temperature","How much they weigh","Their heart rate"],a:1},
    {q:"What is a vaccine?",opts:["A pain medication","A substance that helps the body build protection against a disease","A type of surgery","A hospital test"],a:1},
    {q:"What does CPR stand for?",opts:["Complete Patient Recovery","Cardiopulmonary Resuscitation","Central Patient Response","Critical Pulse Reading"],a:1},
    {q:"Why do nurses wash their hands frequently?",opts:["It is a dress code requirement","To prevent the spread of germs and infections","To use hospital soap","It is a hospital tradition"],a:1},
  ],
  biology:[
    {q:"What is a cell?",opts:["A type of plant","The basic building block of all living things","A part of the nervous system","A type of molecule"],a:1},
    {q:"What is photosynthesis?",opts:["How animals digest food","How plants use sunlight to make their own food","How cells reproduce","How bacteria spread"],a:1},
    {q:"What is an ecosystem?",opts:["A type of cell","A community of living things interacting with their environment","A biology lab experiment","A type of organism"],a:1},
    {q:"What do lungs do?",opts:["Pump blood through the body","Help the body take in oxygen and release carbon dioxide","Digest food","Filter waste from the blood"],a:1},
    {q:"What does DNA contain?",opts:["Blood type only","Genetic instructions that determine traits","A person's medical history","The body's water content"],a:1},
  ],
  publichealth:[
    {q:"What is public health?",opts:["Running a private hospital","Protecting and improving the health of entire communities","A type of health insurance","A medical specialty"],a:1},
    {q:"What does hygiene mean?",opts:["A type of disease","Practices that keep you clean and healthy like washing hands","A public health law","A type of medication"],a:1},
    {q:"Why is clean water important for public health?",opts:["It tastes better","Contaminated water can spread diseases to many people at once","It is cheaper to produce","Water quality does not affect health"],a:1},
    {q:"What is an epidemic?",opts:["A single person getting sick","A widespread outbreak of a disease affecting many people","A type of vaccine","A public health department"],a:1},
    {q:"What is a vaccine's main purpose?",opts:["To treat a current illness","To prevent getting a disease in the first place","To reduce pain","To improve nutrition"],a:1},
  ],
  kinesiology:[
    {q:"What does kinesiology study?",opts:["The stock market","How the human body moves","Computer systems","Environmental science"],a:1},
    {q:"What is cardiovascular exercise?",opts:["Lifting weights only","Exercise that raises your heart rate like running or swimming","Stretching only","A type of physical therapy"],a:1},
    {q:"What does a physical therapist help people do?",opts:["Plan workout routines for athletes only","Recover movement and reduce pain after injury or illness","Diagnose medical conditions","Prescribe medications"],a:1},
    {q:"Why is warming up before exercise important?",opts:["It burns more calories","It prepares muscles and reduces the risk of injury","It is a gym rule","It improves flexibility permanently"],a:1},
    {q:"What is a muscle?",opts:["A type of bone","Tissue in the body that contracts to create movement","A part of the nervous system","A type of joint"],a:1},
  ],
  envsci:[
    {q:"What is climate change?",opts:["Daily weather patterns","Long-term shifts in global temperatures and weather patterns","A type of natural disaster","A seasonal change"],a:1},
    {q:"What does recycling do?",opts:["Creates more waste","Converts used materials into new products to reduce waste","Only saves paper","Increases pollution"],a:1},
    {q:"What is a renewable energy source?",opts:["Coal and oil","Energy from sources that naturally replenish like sun and wind","Nuclear energy only","Gasoline"],a:1},
    {q:"Why are forests important to the environment?",opts:["They are only important for wood","They absorb CO2, provide oxygen, and support wildlife","They block sunlight","They cause flooding"],a:1},
    {q:"What is pollution?",opts:["Natural weather changes","Harmful substances introduced into the environment","A type of recycling","A conservation effort"],a:1},
  ],
  psychology:[
    {q:"What does psychology study?",opts:["The human body's physical systems","Human behavior and the mind","The history of medicine","Political systems"],a:1},
    {q:"What is stress?",opts:["A type of physical injury","A mental and physical response to pressure or difficult situations","A medical diagnosis","A personality trait"],a:1},
    {q:"What is self-esteem?",opts:["How smart you are","How you feel about yourself and your own worth","Your social media following","Your academic grades"],a:1},
    {q:"What does a psychologist do?",opts:["Prescribes medication","Studies behavior and helps people understand and manage mental health","Performs surgery","Diagnoses physical illnesses"],a:1},
    {q:"What is empathy?",opts:["Feeling sorry for yourself","The ability to understand and share the feelings of another person","A type of therapy","A personality disorder"],a:1},
  ],
  sociology:[
    {q:"What does sociology study?",opts:["The human body","How people interact in groups and societies","The earth's environment","Political leadership"],a:1},
    {q:"What is a social norm?",opts:["A new trend","An accepted rule or standard of behavior in a society","A law passed by the government","A cultural tradition only"],a:1},
    {q:"What is peer pressure?",opts:["Pressure from teachers","Influence from people your age to behave in a certain way","A type of stress disorder","A school policy"],a:1},
    {q:"What does culture mean?",opts:["A person's race only","The shared beliefs, values, customs, and practices of a group","A type of art","A country's government"],a:1},
    {q:"What is a community?",opts:["A government agency","A group of people sharing a common location or interest","A type of family structure","A political party"],a:1},
  ],
  socialwork:[
    {q:"What does a social worker primarily do?",opts:["Manage business finances","Help people access resources and navigate difficult life situations","Design community buildings","Write government policies"],a:1},
    {q:"What does advocacy mean in social work?",opts:["Managing a budget","Speaking up and supporting the rights and needs of others","Writing case reports","Providing medical care"],a:1},
    {q:"What is child welfare?",opts:["School performance tracking","Programs and services designed to protect children's safety and wellbeing","A type of government tax","A family court ruling"],a:1},
    {q:"Why is confidentiality important in social work?",opts:["It is required by law only","It builds trust and protects clients' private information","It speeds up casework","It reduces paperwork"],a:1},
    {q:"What is a resource in social work?",opts:["A financial investment","A service or support available to help someone in need","A type of therapy","A government building"],a:1},
  ],
  political:[
    {q:"What is the purpose of government?",opts:["To control citizens","To organize society, maintain order, and provide public services","To collect as many taxes as possible","To run businesses"],a:1},
    {q:"What is voting?",opts:["A type of tax","The process of choosing leaders or deciding on issues in a democracy","A government requirement","A political party activity only"],a:1},
    {q:"What is the Constitution?",opts:["A list of government employees","The document that establishes the fundamental laws and rights of the United States","A type of tax law","A presidential speech"],a:1},
    {q:"What is a democracy?",opts:["Rule by one powerful leader","A system of government where citizens have a say through voting","A type of economic system","A government with no laws"],a:1},
    {q:"What does a senator do?",opts:["Runs a city","Represents their state in the U.S. Senate and helps create laws","Manages the military","Leads the Supreme Court"],a:1},
  ],
  criminal:[
    {q:"What is a law?",opts:["A suggestion from the government","A rule established by authority that must be followed","A police officer's opinion","A court decision only"],a:1},
    {q:"What does innocent until proven guilty mean?",opts:["Everyone who is arrested is guilty","A person is considered not guilty until a court proves otherwise","Only applies to minor crimes","A type of plea deal"],a:1},
    {q:"What does a police officer do?",opts:["Create new laws","Enforce laws and protect the safety of the community","Run the court system","Sentence criminals"],a:1},
    {q:"What is a crime?",opts:["A disagreement between people","An act that breaks the law and can result in punishment","A traffic ticket only","A type of civil dispute"],a:1},
    {q:"What is a courtroom used for?",opts:["Government meetings","A place where legal cases are heard and decisions are made","Police training","Storing legal documents"],a:1},
  ],
  prelaw:[
    {q:"What does a lawyer do?",opts:["Make laws","Represent and advise clients on legal matters","Serve as a judge","Enforce traffic laws"],a:1},
    {q:"What is a trial?",opts:["A practice test in law school","A formal legal process where evidence is presented to decide a case","A type of plea deal","A police investigation"],a:1},
    {q:"What is evidence in a legal case?",opts:["A lawyer's personal opinion","Information or objects used to prove or disprove facts in a case","A type of legal document","A court fee"],a:1},
    {q:"What is the role of a judge?",opts:["Prosecute criminals","Oversee legal proceedings and make rulings based on the law","Represent the defendant","Investigate crimes"],a:1},
    {q:"What does innocent until proven guilty mean?",opts:["Everyone arrested is guilty","A person is assumed not guilty until proven otherwise in court","Only applies to serious crimes","A plea agreement"],a:1},
  ],
  communications:[
    {q:"What is communication?",opts:["Only speaking out loud","The process of sharing information between people","Writing emails only","Using social media"],a:1},
    {q:"What is body language?",opts:["A type of spoken language","Nonverbal cues like posture, gestures, and facial expressions","Sign language only","A communication disorder"],a:1},
    {q:"What does a news anchor do?",opts:["Write news articles","Present news stories on television or radio","Photograph news events","Edit video footage"],a:1},
    {q:"What is a media outlet?",opts:["A store that sells electronics","A platform that distributes news and information like TV, radio, or websites","A type of advertisement","A social media account"],a:1},
    {q:"What is public speaking?",opts:["Talking on the phone","Presenting information or ideas to an audience","A type of writing","An interview technique"],a:1},
  ],
  journalism:[
    {q:"What is the main job of a journalist?",opts:["Create advertisements","Research and report accurate information to the public","Manage social media accounts","Write fiction stories"],a:1},
    {q:"What makes a news story credible?",opts:["It has lots of photos","It is based on verified facts and reliable sources","It is entertaining","It is shared many times"],a:1},
    {q:"What is the difference between fact and opinion?",opts:["There is no difference","A fact can be proven true while an opinion is a personal belief","Opinions are always wrong","Facts are more interesting"],a:1},
    {q:"What is a headline?",opts:["A photo caption","The title of a news article that summarizes the story","The journalist's name","The publication date"],a:1},
    {q:"What is an interview in journalism?",opts:["A job application process","A conversation where a journalist asks questions to gather information","A type of article","A photo session"],a:1},
  ],
  arts:[
    {q:"What are primary colors?",opts:["Red, orange, yellow","Red, blue, and yellow — colors that cannot be made by mixing others","Black, white, and gray","Green, purple, and orange"],a:1},
    {q:"What is composition in art?",opts:["The cost of art supplies","How elements are arranged in a work of art","A type of painting style","The size of a canvas"],a:1},
    {q:"What is a sculpture?",opts:["A type of painting","A three-dimensional work of art created from materials like stone or clay","A drawing technique","A type of photography"],a:1},
    {q:"What is abstract art?",opts:["Art that looks exactly like real life","Art that uses shapes, colors, and forms rather than realistic images","Black and white art only","Art made by computers"],a:1},
    {q:"What does an artist use a sketchbook for?",opts:["Writing stories","Planning and practicing ideas before creating final artwork","Mixing paint colors","Displaying finished art"],a:1},
  ],
  graphicdesign:[
    {q:"What is graphic design?",opts:["Drawing portraits","Using visual elements like text and images to communicate a message","Writing stories","Building websites only"],a:1},
    {q:"What is a logo?",opts:["A type of font","A visual symbol that represents a brand or company","A color palette","A design template"],a:1},
    {q:"What does font mean?",opts:["A design color","A style of text with a specific appearance","A type of image","A logo design"],a:1},
    {q:"What is contrast in design?",opts:["Using the same colors throughout","Using differences in color, size, or shape to make elements stand out","A type of font","A design software"],a:1},
    {q:"What tool do most graphic designers use to create digital work?",opts:["A regular pen and paper only","Design software on a computer like Photoshop or Illustrator","A video camera","A 3D printer"],a:1},
  ],
  english:[
    {q:"What is a thesis statement?",opts:["A book's title","The main argument or point of an essay","A type of punctuation","The conclusion of a story"],a:1},
    {q:"What is a metaphor?",opts:["A comparison using like or as","Saying something IS something else to make a comparison","A type of rhyme","A story character"],a:1},
    {q:"What is fiction?",opts:["True stories based on real events","Stories and characters created from imagination","A type of poetry","A type of essay"],a:1},
    {q:"What is the purpose of a paragraph?",opts:["To fill space on a page","To develop one main idea with supporting details","To introduce a new character","To summarize the whole essay"],a:1},
    {q:"What does an author's tone mean?",opts:["How loud they speak","The attitude or feeling conveyed through their writing","The length of their writing","The topic they write about"],a:1},
  ],
  education:[
    {q:"What is the main goal of a teacher?",opts:["To assign homework","To help students learn and grow","To manage school budgets","To write report cards"],a:1},
    {q:"What is a lesson plan?",opts:["A student's daily schedule","A teacher's guide for how to teach a specific topic","A school calendar","A homework assignment"],a:1},
    {q:"What does assessment mean in education?",opts:["A school field trip","A way to measure what students have learned","A classroom decoration","A type of lesson plan"],a:1},
    {q:"Why is education important?",opts:["It is required by law only","It helps people gain knowledge and skills to succeed in life","It keeps kids busy","It prepares students only for college"],a:1},
    {q:"What is a classroom discussion?",opts:["Students taking a test","A structured conversation where students share and explore ideas","A type of homework","A reading assignment"],a:1},
  ],
  earlychildhood:[
    {q:"Early childhood refers to what age range?",opts:["13-18 years","Birth to around 8 years old","10-12 years","18-21 years"],a:1},
    {q:"What is play-based learning?",opts:["Watching educational videos","Using play activities to help young children develop skills","Giving children worksheets","A type of homework"],a:1},
    {q:"Why is reading to young children important?",opts:["It is a bedtime routine only","It builds vocabulary, imagination, and a love of learning","It replaces school","It keeps children quiet"],a:1},
    {q:"What is child development?",opts:["How fast children grow physically only","The physical, social, emotional, and cognitive growth of children over time","A type of school curriculum","A parenting style"],a:1},
    {q:"What does a preschool teacher primarily do?",opts:["Prepare children for college immediately","Create a safe environment where young children learn through play","Teach advanced subjects","Manage a school budget"],a:1},
  ],
  sportsmanagement:[
    {q:"What does a sports manager do?",opts:["Only coaches athletes","Oversees the business operations of sports teams or organizations","Plays professional sports","Sells sports equipment"],a:1},
    {q:"What is sports marketing?",opts:["Selling jerseys only","Promoting teams, events, and athletes to attract fans and sponsors","A type of coaching strategy","A player contract"],a:1},
    {q:"What is a sports contract?",opts:["A game schedule","A legal agreement between a player and a team about pay and conditions","A sponsorship deal","A coaching manual"],a:1},
    {q:"What is a sponsor in sports?",opts:["A team's coach","A company that pays to be associated with a team in exchange for advertising","A team's owner","A sports agent"],a:1},
    {q:"What does ticket revenue mean for a sports team?",opts:["Money spent on player salaries","Money earned from selling tickets to games","A type of player contract","Sponsorship income"],a:1},
  ],
  hospitality:[
    {q:"What is customer service in hospitality?",opts:["Managing a hotel's finances","Making guests feel welcome, comfortable, and satisfied","Cooking meals","Cleaning rooms only"],a:1},
    {q:"What does a hotel front desk employee do?",opts:["Cook meals for guests","Check guests in and out and handle their requests","Clean hotel rooms","Manage hotel finances"],a:1},
    {q:"What is a reservation?",opts:["A guest complaint","An advance booking for a room, table, or service","A hotel rule","A type of hotel room"],a:1},
    {q:"What is a tip in a restaurant?",opts:["A required charge added to all bills","Extra money a customer gives a server to show appreciation for good service","The total bill amount","A restaurant policy"],a:1},
    {q:"What does hospitality mean?",opts:["Running a strict workplace","Making guests feel warmly welcomed and well cared for","Managing hotel budgets","Training new employees"],a:1},
  ],
  generalstudies:[
    {q:"What is a budget?",opts:["A type of loan","A plan for how to spend and save money","A government tax","A bank account type"],a:1},
    {q:"What is the purpose of a resume?",opts:["A list of your hobbies","A document summarizing your skills and experience for a job application","A school transcript","A reference letter"],a:1},
    {q:"What does interest mean on a loan?",opts:["The original amount borrowed","Extra money you pay back on top of what you borrowed","A bank fee","A monthly payment plan"],a:1},
    {q:"What is a checking account used for?",opts:["Long-term savings","Everyday spending and paying bills","Investing in stocks","Storing retirement funds"],a:1},
    {q:"What is a W-2 form?",opts:["A tax form showing your yearly wages and taxes withheld","A job application","A bank statement","A credit report"],a:0},
  ],
};

let ob = {
  player:null, step:'character',
  selectedChar:null, selectedMajor:null,
  questions:[], currentQ:0, score:0, wrongAnswers:[],
};

window.initOnboarding = function(player) {
  ob.player = player;
  ob.step   = player.onboardingStep || 'character';
  if (player.characterId) ob.selectedChar  = OB_CHARACTERS.find(c => c.id === player.characterId) || null;
  if (player.majorId)     ob.selectedMajor = OB_MAJORS.find(m => m.id === player.majorId) || null;
  if (ob.selectedMajor)   ob.questions     = OB_QUESTIONS[ob.selectedMajor.id] || OB_QUESTIONS.generalstudies;
  obRender();
};

function obRender() {
  const el = document.getElementById('screen-onboarding');
  if (!el) return;
  if      (ob.step==='character') obRenderCharacter(el);
  else if (ob.step==='degree')    obRenderDegree(el);
  else if (ob.step==='finals')    obRenderFinals(el);
  else if (ob.step==='results')   obRenderResults(el);
  else { showScreen('screen-home'); if(window.initHome) window.initHome(ob.player); }
}

function obStepBar(active) {
  return ['Character','Degree','Finals','Graduate'].map((s,i)=>{
    const n=i+1, cls=n<active?'done':n===active?'active':'';
    return `<div class="ob-step ${cls}">${n} ${s}</div>`;
  }).join('');
}

// ── Character ────────────────────────────────────────────────
function obRenderCharacter(el) {
  el.innerHTML=`<div class="ob-wrap">
    <div class="ob-header">
      <div class="ob-step-bar">${obStepBar(1)}</div>
      <h1 class="ob-title">Who are you?</h1>
      <p class="ob-sub">Choose your character. This is how you'll be known in Capital Heights.</p>
    </div>
    <div class="char-grid">
      ${OB_CHARACTERS.map(c=>`
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
window.obSelectChar = id => { ob.selectedChar=OB_CHARACTERS.find(c=>c.id===id); obRender(); };
window.obConfirmChar = async () => {
  if(!ob.selectedChar) return;
  await window.GameState.FirestoreDB.updatePlayer(ob.player.uid,{characterId:ob.selectedChar.id,characterName:ob.selectedChar.name,onboardingStep:'degree'});
  ob.step='degree'; obRender();
};

// ── Degree ───────────────────────────────────────────────────
function obRenderDegree(el) {
  const cats={};
  OB_MAJORS.forEach(m=>{ if(!cats[m.category]) cats[m.category]=[]; cats[m.category].push(m); });
  el.innerHTML=`<div class="ob-wrap">
    <div class="ob-header">
      <div class="ob-step-bar">${obStepBar(2)}</div>
      <h1 class="ob-title">Choose your degree</h1>
      <p class="ob-sub">Your major shapes your final exam and the jobs available to you.</p>
    </div>
    ${Object.entries(cats).map(([cat,majors])=>`
      <div class="degree-category">
        <div class="degree-cat-label">${cat}</div>
        <div class="degree-grid">
          ${majors.map(m=>`
            <div class="degree-card ${ob.selectedMajor?.id===m.id?'selected':''}" onclick="obSelectMajor('${m.id}')">
              ${m.label}
            </div>`).join('')}
        </div>
      </div>`).join('')}
    <div class="ob-footer">
      <button class="ob-btn" onclick="obConfirmDegree()" ${!ob.selectedMajor?'disabled':''}>
        Enroll in ${ob.selectedMajor?ob.selectedMajor.label:'...'} →
      </button>
    </div>
  </div>`;
}
window.obSelectMajor = id => { ob.selectedMajor=OB_MAJORS.find(m=>m.id===id); obRender(); };
window.obConfirmDegree = async () => {
  if(!ob.selectedMajor) return;
  await window.GameState.FirestoreDB.updatePlayer(ob.player.uid,{majorId:ob.selectedMajor.id,majorLabel:ob.selectedMajor.label,onboardingStep:'finals'});
  ob.questions=OB_QUESTIONS[ob.selectedMajor.id]||OB_QUESTIONS.generalstudies;
  ob.currentQ=0; ob.score=0; ob.wrongAnswers=[]; ob.step='finals'; obRender();
};

// ── Finals ───────────────────────────────────────────────────
function obRenderFinals(el) {
  const q=ob.questions[ob.currentQ];
  const prog=Math.round((ob.currentQ/ob.questions.length)*100);
  el.innerHTML=`<div class="ob-wrap">
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
        ${q.opts.map((opt,i)=>`<button class="finals-opt" onclick="obAnswerQ(${i})">${opt}</button>`).join('')}
      </div>
    </div>
  </div>`;
}
window.obDropClass = () => {
  if(!confirm('Drop this class? You will go back to choosing your degree.')) return;
  ob.selectedMajor=null; ob.currentQ=0; ob.score=0; ob.wrongAnswers=[]; ob.step='degree'; obRender();
};
window.obAnswerQ = idx => {
  const q=ob.questions[ob.currentQ];
  if(idx===q.a) ob.score++;
  else ob.wrongAnswers.push({question:q.q,correct:q.opts[q.a],chosen:q.opts[idx]});
  document.querySelectorAll('.finals-opt').forEach((btn,i)=>{
    btn.disabled=true;
    if(i===q.a) btn.classList.add('correct');
    if(i===idx&&idx!==q.a) btn.classList.add('wrong');
  });
  setTimeout(()=>{ ob.currentQ++; if(ob.currentQ>=ob.questions.length) ob.step='results'; obRender(); },900);
};

// ── Results ──────────────────────────────────────────────────
function obRenderResults(el) {
  const total=ob.questions.length, passed=ob.score>=3;
  const pct=Math.round((ob.score/total)*100);
  const gpa=passed?(2.0+((ob.score/total)*2.0)).toFixed(1):null;
  el.innerHTML=`<div class="ob-wrap">
    <div class="ob-header">
      <div class="ob-step-bar">${obStepBar(4)}</div>
      <h1 class="ob-title">${passed?'🎓 Congratulations!':'📋 Not Quite...'}</h1>
    </div>
    <div class="results-box">
      <div class="results-score ${passed?'pass':'fail'}">${ob.score}/${total}</div>
      <div class="results-pct">${pct}%</div>
      <p class="results-msg">
        ${passed
          ?`You passed your <strong>${ob.selectedMajor.label}</strong> finals with a <strong>${gpa} GPA</strong>. Welcome to Capital Heights, ${ob.player.firstName}.`
          :`You need at least 3 correct answers to graduate. Review your mistakes and try again.`}
      </p>
      ${ob.wrongAnswers.length>0?`
        <div class="results-review">
          <p class="review-label">Review your mistakes</p>
          ${ob.wrongAnswers.map(w=>`
            <div class="review-item">
              <div class="review-q">${w.question}</div>
              <div class="review-wrong">✗ Your answer: ${w.chosen}</div>
              <div class="review-correct">✓ Correct: ${w.correct}</div>
            </div>`).join('')}
        </div>`:''}
      ${passed
        ?`<button class="ob-btn" onclick="obGraduate('${gpa}')">Enter Capital Heights →</button>`
        :`<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
            <button class="ob-btn retry" onclick="obRetryFinals()">Retake the Exam</button>
            <button class="ob-btn" style="background:#2a2a2a;color:#ccc;" onclick="obDropClass()">Switch Degree</button>
          </div>`}
    </div>
  </div>`;
}
window.obRetryFinals = () => { ob.currentQ=0; ob.score=0; ob.wrongAnswers=[]; ob.step='finals'; obRender(); };
window.obGraduate = async gpa => {
  await window.GameState.FirestoreDB.updatePlayer(ob.player.uid,{graduationGPA:parseFloat(gpa),onboardingStep:'jobboard'});
  ob.player.onboardingStep='jobboard';
  window.GameState.player=ob.player;
  showScreen('screen-citymap');
  if(window.initCityMap) window.initCityMap(ob.player);
};