// ============================================================
// CAPITAL HEIGHTS — onboarding.js
// Character → Category → Major → Finals (10 Qs) → Graduation
// Players always graduate — GPA reflects performance 2.0-4.0
// ============================================================

const OB_CHARACTERS = [
  { id:"char1", name:"Alex Rivera",    desc:"Business-minded and ambitious",   emoji:"🧑" },
  { id:"char2", name:"Jordan Lee",     desc:"Tech-savvy problem solver",        emoji:"👩" },
  { id:"char3", name:"Morgan Chen",    desc:"Creative and entrepreneurial",     emoji:"🧑" },
  { id:"char4", name:"Taylor Brooks",  desc:"Detail-oriented and analytical",   emoji:"👩" },
  { id:"char5", name:"Casey Williams", desc:"People-focused team player",       emoji:"🧑" },
  { id:"char6", name:"Riley Johnson",  desc:"Strategic and goal-driven",        emoji:"👩" },
];

const OB_CATEGORIES = [
  { id:"business",  label:"Business & Finance",       icon:"💼", color:"#C8A84A",
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
    ]},
  { id:"technology", label:"Technology",              icon:"💻", color:"#4A8AC8",
    majors:[
      {id:"cs",           label:"Computer Science"},
      {id:"it",           label:"Information Technology"},
      {id:"cybersecurity",label:"Cybersecurity"},
      {id:"engineering",  label:"Engineering"},
      {id:"datascience",  label:"Data Science"},
    ]},
  { id:"health",    label:"Health & Science",         icon:"🏥", color:"#4AC87A",
    majors:[
      {id:"nursing",     label:"Nursing"},
      {id:"biology",     label:"Biology"},
      {id:"publichealth",label:"Public Health"},
      {id:"kinesiology", label:"Kinesiology & Exercise Science"},
      {id:"envsci",      label:"Environmental Science"},
    ]},
  { id:"sociallaw", label:"Social Sciences & Law",    icon:"⚖️", color:"#A84AC8",
    majors:[
      {id:"psychology", label:"Psychology"},
      {id:"sociology",  label:"Sociology"},
      {id:"socialwork", label:"Social Work"},
      {id:"political",  label:"Political Science"},
      {id:"criminal",   label:"Criminal Justice"},
      {id:"prelaw",     label:"Pre-Law"},
    ]},
  { id:"arts",      label:"Arts",                     icon:"🎨", color:"#C84A6A",
    majors:[
      {id:"finearts",    label:"Fine Arts"},
      {id:"graphicdesign",label:"Graphic Design"},
      {id:"photography", label:"Photography"},
      {id:"filmvideo",   label:"Film & Video Production"},
      {id:"architecture",label:"Architecture"},
    ]},
  { id:"media",     label:"Media & Communication",    icon:"📡", color:"#4AC8C8",
    majors:[
      {id:"communications",label:"Communications"},
      {id:"journalism",    label:"Journalism"},
      {id:"english",       label:"English & Creative Writing"},
      {id:"pr",            label:"Public Relations"},
      {id:"digitalmedia",  label:"Digital Media"},
    ]},
  { id:"education", label:"Education & Hospitality",  icon:"🎓", color:"#C8784A",
    majors:[
      {id:"education",       label:"Education"},
      {id:"earlychildhood",  label:"Early Childhood Education"},
      {id:"sportsmanagement",label:"Sports Management"},
      {id:"eventmanagement", label:"Event Management"},
      {id:"hospitality",     label:"Hospitality & Restaurant Mgmt"},
    ]},
  { id:"general",   label:"General Studies", icon:"📚", color:"#555", isGeneral:true,
    majors:[{id:"generalstudies", label:"General Studies"}]},
];

const OB_ALL_MAJORS = OB_CATEGORIES.flatMap(c => c.majors);

const OB_QUESTIONS = {
  business:[
    {q:"A company's revenue is $80,000 and expenses are $52,000. What is the profit?",opts:["$18,000","$28,000","$52,000","$132,000"],a:1},
    {q:"What does it mean when a business breaks even?",opts:["It owes back taxes","It is growing rapidly","It is losing money","Revenue exactly equals expenses"],a:3},
    {q:"A manager delegates a task. This means the manager:",opts:["Assigns the task to someone else","Does the task alone","Cancels the task","Reports it to a supervisor"],a:0},
    {q:"Which describes the best customer service response to a complaint?",opts:["Offer a discount every time","Respond only when required","Ignore minor ones","Resolve it quickly and make the customer feel valued"],a:3},
    {q:"What is gross profit?",opts:["Revenue minus cost of goods sold only","Net income after taxes","Total assets minus liabilities","Revenue minus all expenses"],a:0},
    {q:"What does cash flow refer to?",opts:["Total company profit","The movement of money in and out of a business","Annual revenue","The amount in a savings account"],a:1},
    {q:"A sole proprietorship is:",opts:["A business owned and operated by one person","A company with many shareholders","A government-owned business","A type of nonprofit"],a:0},
    {q:"What is market share?",opts:["A business expense","The number of products a company makes","A type of stock","The percentage of total sales a company holds in its industry"],a:3},
    {q:"Which is an example of a fixed cost?",opts:["Raw materials","Packaging costs that vary by unit","Monthly rent for office space","Sales commissions"],a:2},
    {q:"What is a business expense?",opts:["A customer complaint","Money the business spends to operate","A type of savings","Money the business earns"],a:1},
  ],
  finance:[
    {q:"You deposit $1,000 at 5% annual interest. How much interest after one year?",opts:["$5","$150","$500","$50"],a:3},
    {q:"A stock is ownership; a bond is a loan to a company. Which is safer for most investors?",opts:["Bonds are generally lower risk","They carry identical risk","Risk depends only on company size","Stocks are always safer"],a:0},
    {q:"Which action most improves a low credit score over time?",opts:["Ignoring small debts","Spending more each month","Opening many new cards","Paying bills consistently on time"],a:3},
    {q:"What does diversifying investments mean?",opts:["Putting everything in the safest option","Only investing in real estate","Trusting one company","Spreading money across different investments to reduce risk"],a:3},
    {q:"A 401k employer match means:",opts:["Government manages your retirement","Guaranteed 401% return","Employer contributes money based on your contribution","You pay in and employer adds nothing"],a:2},
    {q:"What is liquidity?",opts:["How quickly an asset can be converted to cash without major loss","How profitable an investment is","The risk level of a stock","The total value of investments"],a:0},
    {q:"What is a mutual fund?",opts:["A pooled investment where many investors money is managed together","A personal retirement account","A type of checking account","A government savings program"],a:0},
    {q:"What is the time value of money?",opts:["Money only has value when invested","A dollar today is worth more than a dollar in the future due to earning potential","Inflation makes money worthless","Money saved is worth less than money spent"],a:1},
    {q:"What is an emergency fund typically used for?",opts:["Investing in stocks","Vacation savings","Covering unexpected expenses without going into debt","A down payment only"],a:2},
    {q:"Which best describes a bear market?",opts:["A market with no volatility","A market only for bonds","Stock prices falling 20 percent or more over time","Stock prices rising 20 percent or more"],a:2},
  ],
  accounting:[
    {q:"Assets = Liabilities + ___",opts:["Profit","Equity","Revenue","Expenses"],a:1},
    {q:"What does accounts receivable represent?",opts:["Money owed to suppliers","Savings account balance","Money owed TO the business by customers","Unpaid wages"],a:2},
    {q:"Depreciation refers to:",opts:["A tax paid on profits","An increase in asset value","Gradual decrease in an asset's value over time","A type of loan"],a:2},
    {q:"What is the main purpose of an audit?",opts:["To fire underperforming employees","To calculate bonuses","To create a new budget","To independently verify financial records are accurate"],a:3},
    {q:"Revenue is $90,000 and COGS is $55,000. What is gross profit?",opts:["$55,000","$90,000","$35,000","$145,000"],a:2},
    {q:"What is a liability?",opts:["Something a business owes to others","A type of revenue","An operating expense","Something a business owns"],a:0},
    {q:"Cash basis accounting records transactions:",opts:["Only at year end","When earned or incurred regardless of payment","When money actually changes hands","Only for large companies"],a:2},
    {q:"What does COGS stand for?",opts:["Company Operating Growth Statement","Cash on General Sale","Capital and Overhead General Summary","Cost of Goods Sold"],a:3},
    {q:"A credit in double-entry bookkeeping increases liabilities and equity and:",opts:["Always increases all accounts","Decreases assets","Always decreases all accounts","Only applies to bank accounts"],a:1},
    {q:"What is working capital?",opts:["Total company revenue","Current assets minus current liabilities","Long-term investments","Annual operating budget"],a:1},
  ],
  economics:[
    {q:"If demand increases but supply stays the same, price typically:",opts:["Increases","Decreases","The product becomes free","Stays the same"],a:0},
    {q:"Which best describes a recession?",opts:["A government budget surplus","Rapid economic growth","Significant economic decline with rising unemployment","Temporary rise in inflation"],a:2},
    {q:"What does the Federal Reserve primarily control?",opts:["Interest rates and the money supply","The stock market","Tax rates","Government spending"],a:0},
    {q:"Opportunity cost is best described as:",opts:["Total cost of a product","A government fee","What you give up when choosing one option over another","The price of inflation"],a:2},
    {q:"Which is an example of a public good?",opts:["A toll road","A private gym","A restaurant","Street lighting"],a:3},
    {q:"What is a progressive tax?",opts:["Only businesses pay this tax","A flat tax rate for everyone","Everyone pays the same dollar amount","Higher earners pay a higher percentage of income"],a:3},
    {q:"What does monetary policy control?",opts:["Corporate tax rates","Money supply and interest rates managed by the central bank","Import and export regulations","Government spending and taxation"],a:1},
    {q:"What is a trade deficit?",opts:["When exports exceed imports","A type of government debt","When imports exceed exports — more is bought than sold internationally","A tariff on imported goods"],a:2},
    {q:"Elasticity in economics refers to:",opts:["Inflation rate sensitivity","The strength of a currency","How flexible a business hours are","How sensitive demand or supply is to changes in price"],a:3},
    {q:"Microeconomics focuses on individual decisions while macroeconomics focuses on:",opts:["Business strategy only","The same things","Entire economies and broad factors like GDP and inflation","Government budgets only"],a:2},
  ],
  marketing:[
    {q:"A product launches with very low price to attract customers quickly. This is called:",opts:["Penetration pricing","Price skimming","Discount bundling","Value pricing"],a:0},
    {q:"What does ROI stand for in marketing?",opts:["Reach of Influence","Revenue Over Income","Rate of Inflation","Return on Investment"],a:3},
    {q:"A unique selling proposition is:",opts:["The lowest price","A loyalty program","A type of advertisement","What makes a product distinctly better than competitors"],a:3},
    {q:"Market segmentation means:",opts:["Dividing the market into groups with similar needs","Advertising on multiple platforms","Lowering prices for some customers","Selling the same product to everyone"],a:0},
    {q:"Which metric measures how many people saw an ad?",opts:["Click-through rate","Bounce rate","Conversion rate","Reach or impressions"],a:3},
    {q:"What is brand equity?",opts:["A marketing budget","The cost to make a product","The value a brand adds beyond the product's physical attributes","A company's total revenue"],a:2},
    {q:"A conversion in digital marketing is when:",opts:["A social media follower comments","A type of advertisement loads","A user takes a desired action such as buying or signing up","A brand changes its name"],a:2},
    {q:"B2B marketing differs from B2C because:",opts:["They are the same","B2B only uses online channels","B2C uses more advertising always","B2B sells to other businesses while B2C sells directly to consumers"],a:3},
    {q:"What is content marketing?",opts:["Creating valuable content to attract and engage a target audience","Managing a store inventory","Paying for advertisements","Sending promotional emails only"],a:0},
    {q:"A/B testing in marketing means:",opts:["Testing two versions of content to see which performs better","Comparing two different products","Annual Budget testing","A type of market research survey"],a:0},
  ],
  entrepreneurship:[
    {q:"What is a business model?",opts:["A store layout diagram","A marketing strategy","A legal company document","A plan for how a business will make money"],a:3},
    {q:"Venture capital is:",opts:["Funding for startups in exchange for equity","A government small business grant","A personal savings account","A bank loan"],a:0},
    {q:"What does scaling a business mean?",opts:["Reducing costs by firing employees","Growing revenue without proportionally increasing costs","Moving to a smaller location","Changing products"],a:1},
    {q:"The biggest financial risk of starting a business is:",opts:["Losing invested money if the business fails","Having too many customers","Growing too fast","Hiring too many employees"],a:0},
    {q:"A minimum viable product is:",opts:["The most expensive version","The simplest version that can be tested with real customers","A product that already succeeded","A government-approved product"],a:1},
    {q:"Bootstrapping a business means:",opts:["A type of marketing strategy","Taking a large bank loan","Hiring a large team immediately","Starting and growing with personal funds rather than outside investment"],a:3},
    {q:"A pivot in the startup world means:",opts:["A dance move at a company party","Changing the company name","A fundamental change in business strategy when the original approach is not working","Expanding to a new market"],a:2},
    {q:"What is equity in a startup context?",opts:["A type of business loan","The company bank balance","Total revenue earned","Ownership share in the company"],a:3},
    {q:"What is a competitive advantage?",opts:["Having the lowest price always","Hiring more employees","Something that allows a business to outperform competitors in a sustainable way","Spending more on advertising"],a:2},
    {q:"A burn rate describes:",opts:["The rate at which a startup spends its cash reserves","How fast a product sells","Revenue growth speed","A marketing expense metric"],a:0},
  ],
  realestate:[
    {q:"A home is $300,000 with 10% down payment. How much is the down payment?",opts:["$300","$10,000","$30,000","$3,000"],a:2},
    {q:"What does a home appraisal determine?",opts:["How much the seller wants","Estimated market value of a property","Property tax amount","Monthly mortgage payment"],a:1},
    {q:"Which factor most directly affects mortgage interest rates offered to a buyer?",opts:["Age of the neighborhood","Size of the backyard","Color of the house","Buyer credit score"],a:3},
    {q:"Home equity is:",opts:["Difference between home value and what is still owed","Mortgage balance remaining","Monthly payment amount","Property tax rate"],a:0},
    {q:"A landlord-tenant agreement is also called a:",opts:["Deed","Lease","Appraisal","Mortgage"],a:1},
    {q:"A buyer market in real estate means:",opts:["Sellers have all the power","Supply exceeds demand giving buyers more negotiating power","Prices are at their highest","A market only for first-time buyers"],a:1},
    {q:"Closing costs refer to:",opts:["The cost of home repairs","Fees paid at the finalization of a real estate transaction","The last mortgage payment","Moving expenses"],a:1},
    {q:"Title insurance protects the buyer against:",opts:["Legal disputes over property ownership","Physical home damage","The realtor commission","Mortgage payment loss if unemployed"],a:0},
    {q:"What does ROI mean for a rental property?",opts:["The percentage return on the money invested in the property","Revenue on Investment only","Rental Obligation Index","Rate of Insurance"],a:0},
    {q:"Amortization in a mortgage means:",opts:["Refinancing a loan","A type of property tax","Paying off a loan in a lump sum","Gradually paying off a loan through scheduled payments covering principal and interest"],a:3},
  ],
  hr:[
    {q:"Which law prohibits employment discrimination based on race, sex, or religion?",opts:["Fair Labor Standards Act","Family and Medical Leave Act","Americans with Disabilities Act","Title VII of the Civil Rights Act"],a:3},
    {q:"The purpose of a performance review is to:",opts:["Evaluate performance and set improvement goals","Determine whether to fire someone","Calculate payroll","Update company policies"],a:0},
    {q:"Gross pay differs from net pay because:",opts:["Gross is before deductions; net is take-home after deductions","They are the same","Gross pay includes bonuses only","Net pay is higher"],a:0},
    {q:"FMLA stands for:",opts:["Federal Minimum Labor Act","Federal Management Leadership Act","Family and Medical Leave Act","Fair Market Labor Agreement"],a:2},
    {q:"An employee handbook outlines:",opts:["A personal journal","A guide for managers only","A list of salaries","Company policies, expectations, and employee rights"],a:3},
    {q:"At-will employment means:",opts:["Either party can end the relationship at any time for most reasons","Employees work volunteer hours","A government employment program","Employees can only be fired for cause"],a:0},
    {q:"The purpose of an exit interview is to:",opts:["Finalize payroll only","Gather honest feedback from departing employees to improve the organization","Guilt employees into staying","Fulfill a legal requirement"],a:1},
    {q:"Workers compensation covers:",opts:["Retirement contributions","Unemployment insurance","Health insurance premiums","Medical expenses and lost wages for employees injured on the job"],a:3},
    {q:"A non-compete agreement restricts employees from:",opts:["Working for competitors for a period after leaving","Joining a union","Receiving a bonus","Competing in sports"],a:0},
    {q:"Unconscious bias in the workplace refers to:",opts:["Automatic unintentional attitudes that affect decisions without awareness","Deliberate discrimination","A legal violation always","A type of workplace policy"],a:0},
  ],
  intlbusiness:[
    {q:"A U.S. company sells products to Japan. This is an example of:",opts:["Exporting","Foreign direct investment","Outsourcing","Importing"],a:0},
    {q:"What is a tariff?",opts:["A business registration fee","A tax placed on imported goods","A type of trade agreement","A currency exchange fee"],a:1},
    {q:"The World Trade Organization oversees:",opts:["The International Monetary Fund","NATO military spending","International trade rules between countries","United Nations budgets"],a:2},
    {q:"Currency exchange risk means:",opts:["The risk of time zones","The risk of shipping overseas","The risk of language barriers","The risk that currency value changes reduce profit when converting money"],a:3},
    {q:"Outsourcing means:",opts:["A company expanding into a new country","A type of import tax","Hiring another company or workers in another country to perform tasks","A government trade restriction"],a:2},
    {q:"A free trade agreement is:",opts:["A treaty reducing or eliminating tariffs and trade barriers between countries","A type of foreign policy","Countries trading for free with no money involved","A government subsidy"],a:0},
    {q:"Foreign direct investment is when:",opts:["A company invests directly in business operations in another country","Buying foreign currency","A type of tariff","A short-term stock purchase in foreign markets"],a:0},
    {q:"A trade surplus means:",opts:["Exports exceed imports — more is sold internationally than purchased","Imports exceed exports","A favorable tariff agreement","A government budget surplus"],a:0},
    {q:"Cultural intelligence in international business refers to:",opts:["The ability to relate and work effectively across cultures","A business certification","A type of language translation tool","IQ specific to international students"],a:0},
    {q:"A joint venture in international business involves:",opts:["Two competitors merging permanently","Two or more companies partnering on a specific project while remaining independent","A type of international loan","A government-run business"],a:1},
  ],
  cs:[
    {q:"What is the difference between hardware and software?",opts:["They are the same","Hardware is for businesses only","Hardware is code; software is physical","Hardware is physical; software is programs that run on it"],a:3},
    {q:"A loop in programming:",opts:["Stores data permanently","Ends a program","Connects to the internet","Repeats instructions until a condition is met"],a:3},
    {q:"A variable in coding is:",opts:["A type of operating system","A network connection","A storage container for a value that can change","A type of virus"],a:2},
    {q:"Binary code uses which two digits?",opts:["1 and 2","0 and 9","A and B","0 and 1"],a:3},
    {q:"Debugging means:",opts:["Speeding up a computer","Finding and fixing errors in a program","Deleting old programs","Writing code from scratch"],a:1},
    {q:"An API is:",opts:["A programming language","A type of computer virus","A type of database","A set of rules allowing different software applications to communicate"],a:3},
    {q:"Version control like Git is used to:",opts:["Test software","Encrypt programs","Speed up code execution","Track changes in code over time and allow collaboration"],a:3},
    {q:"Object-oriented programming organizes code into:",opts:["Sequential instructions only","Separate files for each feature","Lists of commands only","Reusable objects with properties and methods"],a:3},
    {q:"Recursion is:",opts:["A way to store data","A type of loop","A debugging technique","A function that calls itself to solve a problem"],a:3},
    {q:"A compiled language differs from an interpreted language because:",opts:["Compiled translates all code before running; interpreted translates line by line during execution","They work the same way","Compiled is always faster","Interpreted languages cannot make apps"],a:0},
  ],
  it:[
    {q:"An IP address is used to:",opts:["Encrypt data","Speed up internet","Store files","Uniquely identify a device on a network"],a:3},
    {q:"Which storage holds data permanently when the computer is off?",opts:["Cache","Hard drive or SSD","RAM","CPU"],a:1},
    {q:"LAN differs from WAN because:",opts:["WAN is only for governments","They are the same","LAN covers a small local area; WAN covers a larger geographic area","LAN is always faster"],a:2},
    {q:"HTTPS indicates a website is:",opts:["Government-owned","Free","Faster than HTTP","Using an encrypted and more secure connection"],a:3},
    {q:"Cloud storage means:",opts:["A type of USB drive","Backup storage on a disc","Saving files on your desktop","Storing data on remote servers accessed through the internet"],a:3},
    {q:"Virtualization in IT creates:",opts:["Better-looking websites","A type of internet connection","Virtual versions of hardware or software to run multiple systems on one machine","A backup strategy"],a:2},
    {q:"A router differs from a switch because:",opts:["A router is only for homes","A router connects networks together; a switch connects devices within the same network","They are identical","A switch is used for WiFi only"],a:1},
    {q:"RAID in data storage stands for:",opts:["Redundant Array of Independent Disks for redundancy or speed","Remote Access Internet Device","Random Access Internal Drive","Rapid Application Integration Drive"],a:0},
    {q:"A DNS server:",opts:["Is a cloud backup service","Stores files","Is a type of firewall","Translates domain names into IP addresses"],a:3},
    {q:"Bandwidth refers to:",opts:["The speed of a processor","Storage capacity of a hard drive","Number of devices on a network","The maximum amount of data that can be transmitted over a network in a given time"],a:3},
  ],
  cybersecurity:[
    {q:"Two-factor authentication requires:",opts:["Two different passwords","A type of firewall","Two forms of identity verification to log in","Logging in from two devices"],a:2},
    {q:"A ransomware attack:",opts:["Slows internet connection","Encrypts files and demands payment to restore access","Steals passwords silently","Deletes your OS"],a:1},
    {q:"Social engineering in cybersecurity means:",opts:["A type of antivirus","Using social media for marketing","Manipulating people psychologically to reveal confidential information","A network protocol"],a:2},
    {q:"Which password is strongest?",opts:["ABCDEFGH","password123","Xk!9mP#2vL@q","JohnSmith1990"],a:2},
    {q:"Encryption:",opts:["Backs data up automatically","Converts data into coded format only authorized parties can read","Makes data load faster","Deletes data"],a:1},
    {q:"A zero-day vulnerability is:",opts:["A firewall rule","A software flaw unknown to the vendor exploited before a fix is available","A system with no flaws","A type of antivirus scan"],a:1},
    {q:"The principle of least privilege means:",opts:["A password policy","A type of encryption","Giving all employees full access","Giving users only the minimum access needed to perform their job"],a:3},
    {q:"A DDoS attack works by:",opts:["Installing a keylogger","Phishing for passwords","Stealing database records","Overwhelming a server with traffic to make it unavailable"],a:3},
    {q:"Penetration testing involves:",opts:["A type of firewall test","Testing network speed","Authorized simulated attacks to find vulnerabilities before malicious actors do","Testing how far a cable reaches"],a:2},
    {q:"The CIA Triad in cybersecurity stands for:",opts:["Central Intelligence Agency","Confidentiality, Integrity, Availability — the three core principles of information security","Computer Internet Access","Control Identity Authentication"],a:1},
  ],
  engineering:[
    {q:"The engineering design process is:",opts:["Choosing cheapest materials","Building as fast as possible","A systematic approach: define problem, design, build, test, and improve","Writing a report about a product"],a:2},
    {q:"A civil engineer primarily designs:",opts:["Electronic circuits","Computer software","Infrastructure like roads, bridges, and buildings","Manufacturing machines"],a:2},
    {q:"Which material is generally strongest under compression?",opts:["Rubber","Concrete","Plastic","Foam"],a:1},
    {q:"A structural load refers to:",opts:["Any force applied to a structure it must support","Weight of construction workers only","Cost of building materials","Size of a building"],a:0},
    {q:"Safety factors in engineering design ensure:",opts:["Faster manufacturing","Regulatory satisfaction only","Products are expensive","Designs handle more stress than expected without failing"],a:3},
    {q:"A stress test in engineering determines:",opts:["Employee performance","How much force or pressure a material or structure can withstand before failing","A quality inspection type","Production speed"],a:1},
    {q:"Thermodynamics concerns:",opts:["The study of water flow","The relationship between heat, energy, and work","The design of bridges","Electrical circuit analysis"],a:1},
    {q:"A series circuit differs from a parallel circuit because:",opts:["Series has one path for current; parallel has multiple paths","They are the same","Series is only for AC power","Parallel circuits always use more power"],a:0},
    {q:"Torque measures:",opts:["Speed of rotation","Electrical resistance","Rotational force applied to an object","Pressure in a fluid system"],a:2},
    {q:"Engineering simulations are used to:",opts:["Replace CAD software","Replace physical testing entirely","Model and test how a design will perform before building it physically","Train engineers only"],a:2},
  ],
  datascience:[
    {q:"The main purpose of data analysis is to:",opts:["Find patterns and insights to help make better decisions","Store data securely","Design databases","Collect as much data as possible"],a:0},
    {q:"Charts and graphs help you:",opts:["Delete unnecessary data","Store data more efficiently","Visualize patterns hard to see in raw numbers","Encrypt sensitive information"],a:2},
    {q:"Big data refers to:",opts:["Metadata","Structured data","Data too large or complex for traditional software to handle","Raw data"],a:2},
    {q:"Correlation vs causation — what is the difference?",opts:["Causation is weaker","Correlation means two things are related; causation means one directly causes the other","They mean the same","Correlation only applies to science"],a:1},
    {q:"A dataset is:",opts:["A collection of organized information used for analysis","A type of database software","A type of computer program","A backup system"],a:0},
    {q:"Machine learning is:",opts:["A type of AI where systems learn from data to improve performance without being explicitly programmed","A type of database","A programming language","Teaching people to use machines"],a:0},
    {q:"Data cleaning involves:",opts:["Identifying and correcting errors, inconsistencies, and missing values in a dataset","A type of data encryption","Deleting all old data","Organizing files into folders"],a:0},
    {q:"Structured data differs from unstructured data because:",opts:["Structured is organized in tables; unstructured includes text, images, video without a predefined format","They are the same","Structured data cannot be analyzed","Unstructured data is more accurate"],a:0},
    {q:"Regression analysis is used for:",opts:["Visualizing data in charts","Examining relationships between variables to predict a continuous outcome","A type of data cleaning","Predicting a categorical outcome"],a:1},
    {q:"An outlier in a dataset is:",opts:["The most common value","A type of chart","A data point that differs significantly from the rest of the dataset","The average value"],a:2},
  ],
  nursing:[
    {q:"A blood pressure reading of 140/90 — which number is systolic?",opts:["Neither","Both equally","140","90"],a:2},
    {q:"HIPAA primarily protects:",opts:["Patient privacy and medical information","Hospital safety regulations","Hospital insurance payments","Nursing licensing standards"],a:0},
    {q:"The most important action before and after patient care is:",opts:["Taking vital signs","Hand washing to prevent infection","Checking insurance","Documenting the visit"],a:1},
    {q:"Triage in an emergency setting means:",opts:["Treating in order of arrival","Sending to specialists","Recording medical history","Sorting and prioritizing patients by severity of condition"],a:3},
    {q:"Intravenous (IV) delivers medication:",opts:["Directly into a vein","Through the mouth","Under the skin","Through the skin"],a:0},
    {q:"Normal adult respiratory rate at rest is:",opts:["25-35 breaths per minute","4-8 breaths per minute","12-20 breaths per minute","40-50 breaths per minute"],a:2},
    {q:"NPO in a medical setting means:",opts:["New Patient Order","Normal Patient Observation","Non-Prescription Option","Nothing by mouth — the patient should not eat or drink"],a:3},
    {q:"A nosocomial infection is:",opts:["An infection acquired during a hospital stay","A type of vaccine reaction","A chronic illness","An inherited condition"],a:0},
    {q:"Informed consent means:",opts:["A doctor order form","A patient voluntary agreement to treatment after being informed of risks and alternatives","A hospital billing process","A patient insurance form"],a:1},
    {q:"The Glasgow Coma Scale measures:",opts:["Blood pressure severity","Infection risk","A patient level of consciousness based on eye, verbal, and motor responses","Pain levels"],a:2},
  ],
  biology:[
    {q:"Which organelle is the powerhouse of the cell?",opts:["Cell membrane","Ribosome","Mitochondria","Nucleus"],a:2},
    {q:"Red blood cells primarily:",opts:["Carry oxygen through the bloodstream","Produce antibodies","Regulate body temperature","Fight infections"],a:0},
    {q:"Natural selection means:",opts:["A random DNA change","Traits that help survival are passed on more frequently","Animals choosing their own mates","Humans breeding animals selectively"],a:1},
    {q:"The cell membrane controls:",opts:["Photosynthesis","What enters and exits the cell","Genetic information storage","Energy production"],a:1},
    {q:"Sexual reproduction requires:",opts:["Two parents","No genetic material","Binary fission","One parent"],a:0},
    {q:"DNA differs from RNA because:",opts:["RNA is found in the nucleus only","DNA stores genetic information; RNA helps carry instructions from DNA to make proteins","They are the same","DNA is temporary; RNA is permanent"],a:1},
    {q:"An enzyme is:",opts:["A protein that speeds up chemical reactions in the body","A structural component of cell walls","A type of hormone","A type of cell"],a:0},
    {q:"Homeostasis is:",opts:["The movement of cells","A type of immune response","The process of cell division","The body ability to maintain a stable internal environment despite external changes"],a:3},
    {q:"A dominant gene:",opts:["Is the most common gene in a population","Is always harmful","Requires two copies to show","Is expressed even when only one copy is present"],a:3},
    {q:"Osmosis is the movement of:",opts:["Water through a semipermeable membrane from lower to higher solute concentration","The process of cell division","Active transport of molecules","Proteins across a membrane"],a:0},
  ],
  publichealth:[
    {q:"A pandemic differs from an epidemic because:",opts:["An epidemic is local or regional; a pandemic is global","A pandemic is less serious","An epidemic only affects animals","They are the same"],a:0},
    {q:"Contact tracing is used to:",opts:["Identify and notify people who may have been exposed to an infection","Fine people who are sick","Quarantine entire cities","Track hospital costs"],a:0},
    {q:"CDC stands for:",opts:["Committee for Disease Containment","Center for Disease Control and Prevention","Central Department of Community Health","Clinical Data and Compliance"],a:1},
    {q:"Herd immunity occurs when:",opts:["Everyone gets sick","A disease disappears permanently","Enough people are immune to slow or stop disease spread through the population","A vaccine is 100% effective"],a:2},
    {q:"A leading preventable cause of death in the United States is:",opts:["Natural disasters","Car accidents","Food poisoning","Smoking"],a:3},
    {q:"Primary prevention differs from secondary prevention because:",opts:["Secondary prevention is more important","Primary prevents disease before it occurs; secondary detects and treats it early","Primary only applies to children","They are the same"],a:1},
    {q:"A social determinant of health refers to:",opts:["A medical diagnosis","A public health law","A type of medication","Conditions in which people are born, grow, live, and work that affect health outcomes"],a:3},
    {q:"Epidemiology studies:",opts:["Hospital management","Drug development","Individual patient care","The distribution and causes of diseases in populations"],a:3},
    {q:"Quarantine is used to:",opts:["Treat illness","Enforce a hospital policy","Separate and restrict movement of people potentially exposed to disease to prevent spread","Punish sick people"],a:2},
    {q:"A health disparity is:",opts:["Preventable differences in health outcomes among different population groups","A type of disease","A medical error","A difference in hospital quality"],a:0},
  ],
  kinesiology:[
    {q:"Aerobic exercise differs from anaerobic exercise because:",opts:["Aerobic is only for athletes","Aerobic uses weights; anaerobic uses cardio","Aerobic uses oxygen for sustained activity; anaerobic is short bursts not relying on oxygen","They are the same"],a:2},
    {q:"A physical therapist helps people:",opts:["Diagnose medical conditions","Prescribe medications","Recover movement and reduce pain after injury or illness","Plan workout routines for athletes only"],a:2},
    {q:"VO2 max measures:",opts:["Muscle strength capacity","Maximum heart rate","Blood pressure during exercise","Maximum amount of oxygen the body can use during intense exercise"],a:3},
    {q:"RICE first aid stands for:",opts:["Rest, Ice, Compression, Elevation","Rest, Ibuprofen, Compress, Elevate","Relax, Inject, Cool, Exercise","Run, Ice, Compress, Elevate"],a:0},
    {q:"The skeletal system provides:",opts:["Food digestion","Structure, organ protection, and movement capability","Electrical signal transmission","Blood pumping"],a:1},
    {q:"Muscle hypertrophy is:",opts:["Muscle weakness","Muscle inflammation","A type of muscle injury","The increase in muscle size due to increased muscle fiber size from resistance training"],a:3},
    {q:"Proprioception is:",opts:["The measurement of flexibility","The sense of sight during exercise","A type of muscle contraction","The body ability to sense its position and movement in space"],a:3},
    {q:"A sports nutritionist primarily focuses on:",opts:["Treating sports injuries","Coaching athletic technique","Designing workout plans","Optimizing an athlete diet to improve performance, recovery, and overall health"],a:3},
    {q:"Fast-twitch muscle fibers differ from slow-twitch because:",opts:["Slow-twitch are stronger","Fast-twitch are used during rest","They are the same","Fast-twitch are for quick powerful movements; slow-twitch are for endurance activities"],a:3},
    {q:"Biomechanical analysis in sports is used for:",opts:["Measuring muscle size","Studying the mechanics of movement to improve performance and reduce injury risk","Measuring an athlete income","A type of fitness test"],a:1},
  ],
  envsci:[
    {q:"The greenhouse effect means:",opts:["Trapping of heat in Earth atmosphere by gases like CO2 warming the planet","Plants growing in a greenhouse","A type of solar energy","A farming technique"],a:0},
    {q:"The human activity most contributing to deforestation is:",opts:["Fishing","Water treatment","Urban road construction","Agriculture and logging to clear land"],a:3},
    {q:"Biodiversity refers to:",opts:["Measurement of pollution levels","A type of environmental law","Study of plants only","Variety of living species in a given area or on Earth"],a:3},
    {q:"Which is a nonrenewable energy source?",opts:["Hydroelectric power","Wind energy","Solar power","Natural gas"],a:3},
    {q:"Carbon neutral means:",opts:["Balancing carbon emissions with an equivalent amount removed from the atmosphere","Having no industrial production","Using only solar energy","Producing zero energy"],a:0},
    {q:"The nitrogen cycle describes:",opts:["The process by which nitrogen moves through the atmosphere, soil, water, and living organisms","A type of chemical reaction","The orbit of nitrogen in space","The study of nitrogen-based fuels"],a:0},
    {q:"Acid rain is caused by:",opts:["Heavy rainfall","Too much oxygen in the air","Volcanic eruptions only","Sulfur dioxide and nitrogen oxides from burning fossil fuels reacting with atmospheric moisture"],a:3},
    {q:"Eutrophication refers to:",opts:["A type of water purification","Excessive nutrient enrichment in water bodies causing algae overgrowth and oxygen depletion","A farming technique","A type of soil erosion"],a:1},
    {q:"A carbon footprint calculation measures:",opts:["Energy costs only","A country wealth","Total greenhouse gas emissions produced by an individual, organization, or activity","Air quality"],a:2},
    {q:"Environmental remediation is the process of:",opts:["A type of conservation effort","Writing environmental laws","Protecting endangered species","Cleaning up contaminated soil or water to reduce environmental and health risks"],a:3},
  ],
  psychology:[
    {q:"A psychologist differs from a psychiatrist because:",opts:["A psychiatrist holds a medical degree and can prescribe medication; a psychologist typically cannot","They are the same","Psychologists only work with children","Psychiatrists only treat severe illness"],a:0},
    {q:"Confirmation bias is:",opts:["A learning disability","A memory disorder","The tendency to favor information that confirms what you already believe","A fear of decisions"],a:2},
    {q:"Classical conditioning is:",opts:["Teaching through reward and punishment","Learning where a neutral stimulus becomes associated with an automatic response","A type of cognitive therapy","Memory training"],a:1},
    {q:"Nature vs. nurture refers to:",opts:["A debate about farming","A parenting philosophy","A psychological disorder","The debate over whether behavior is shaped more by genetics or environment"],a:3},
    {q:"Short-term memory differs from long-term memory because:",opts:["Long-term memory is less reliable","They store the same information","Short-term memory lasts years","Short-term holds limited info briefly; long-term stores information for extended periods"],a:3},
    {q:"Cognitive dissonance is:",opts:["A type of phobia","A sleep disorder","A learning disability","Mental discomfort from holding conflicting beliefs or behaviors"],a:3},
    {q:"Operant conditioning works through:",opts:["Consequences — behavior is strengthened by rewards or weakened by punishment","A type of memory technique","A therapeutic approach","Association with a neutral stimulus"],a:0},
    {q:"Intrinsic motivation differs from extrinsic motivation because:",opts:["Intrinsic motivation only applies to children","They are the same","Intrinsic comes from internal desire; extrinsic comes from external rewards or pressure","Extrinsic is always more effective"],a:2},
    {q:"A psychological defense mechanism is:",opts:["A type of therapy","A conscious coping strategy","An unconscious strategy the mind uses to protect itself from anxiety or uncomfortable thoughts","A physical response to stress"],a:2},
    {q:"A personality disorder differs from a mood disorder because:",opts:["Personality disorders are temporary","Mood disorders are more serious","Personality disorders involve enduring behavior patterns; mood disorders primarily affect emotional states","They are the same"],a:2},
  ],
  sociology:[
    {q:"A social institution is:",opts:["An established system meeting fundamental societal needs like family, education, or religion","A legal organization","A government building","A type of community center"],a:0},
    {q:"A folkway differs from a law because:",opts:["A folkway is an informal social norm; a law is a formal rule with legal consequences","Laws are optional","They are the same","Folkways are written; laws are spoken"],a:0},
    {q:"Upward social mobility means:",opts:["Moving to a higher social class through increased income, education, or status","A type of immigration","Getting a promotion","Moving to a new city"],a:0},
    {q:"Ethnocentrism means:",opts:["Judging another culture by your own culture standards","Assimilation","Multiculturalism","Cultural relativism"],a:0},
    {q:"The sociological imagination connects:",opts:["Personal experiences to larger social and historical forces","Creative thinking in social situations","Imagining a perfect society","A type of social media"],a:0},
    {q:"Primary groups differ from secondary groups because:",opts:["Primary groups are small and personal like family; secondary groups are larger and less personal like coworkers","They are the same","Secondary groups are more important","Primary groups are professional"],a:0},
    {q:"Deviance in sociology refers to:",opts:["Behavior that is always harmful","Always the same as illegal behavior","A type of crime only","Behavior that violates social norms ranging from minor rule-breaking to serious crimes"],a:3},
    {q:"Race differs from ethnicity because:",opts:["Ethnicity is determined by birth country only","They mean the same thing","Race is self-identified; ethnicity is assigned","Race is typically based on physical characteristics; ethnicity refers to shared cultural heritage, language, and traditions"],a:3},
    {q:"Social stratification refers to:",opts:["Population growth","The hierarchical arrangement of people in a society based on wealth, power, or status","Immigration patterns","A type of community event"],a:1},
    {q:"Socialization is:",opts:["The process through which individuals learn the norms, values, and behaviors of their culture","A type of community service","Using social media","A government program"],a:0},
  ],
  socialwork:[
    {q:"Self-determination in social work means:",opts:["Confidentiality","Non-maleficence","Respecting a client right to make their own decisions","Beneficence"],a:2},
    {q:"A needs assessment in social work is used to:",opts:["Review a budget","Conduct a background check","Evaluate performance","Identify the specific needs and resources of an individual or community"],a:3},
    {q:"The strengths-based approach focuses on:",opts:["What is wrong with a client situation","Identifying and building on a client existing strengths and resources","Placing clients in institutions","Providing financial assistance only"],a:1},
    {q:"Mandatory reporting laws require social workers to report:",opts:["Suspected abuse or neglect of children or vulnerable adults","Housing issues only","Financial problems","All client conversations"],a:0},
    {q:"Case management involves:",opts:["Managing a court case","Filing paperwork only","Coordinating services and resources to meet a client needs over time","Conducting group therapy"],a:2},
    {q:"The primary goal of crisis intervention is to:",opts:["Assess criminal behavior","Stabilize an individual in acute distress and connect them with support","Place clients in long-term care","Solve all long-term problems"],a:1},
    {q:"Trauma-informed care means:",opts:["Ignoring a client past experiences","Recognizing how trauma affects behavior and providing services that avoid re-traumatization","A type of psychological therapy","A medical treatment"],a:1},
    {q:"Macro social work practice addresses:",opts:["Individual therapy sessions","Systemic issues through policy, community organizing, and advocacy","Only financial assistance","Clinical assessments"],a:1},
    {q:"Cultural competence in social work is:",opts:["The ability to understand, respect, and effectively work with people from diverse cultural backgrounds","A type of training certification","Only relevant in international settings","Speaking multiple languages"],a:0},
    {q:"Advocacy differs from lobbying in social work because:",opts:["They are identical","Lobbying is illegal for social workers","Advocacy only happens in court","Advocacy broadly supports client rights; lobbying specifically attempts to influence legislation"],a:3},
  ],
  political:[
    {q:"Separation of powers prevents:",opts:["Laws from being passed easily","Any one branch from becoming too powerful","Reducing elected officials","Government from making quick decisions"],a:1},
    {q:"Gerrymandering is:",opts:["Manipulating electoral district boundaries to favor a particular party","A voting system used in primaries","A method of campaign financing","A type of election fraud"],a:0},
    {q:"The judicial branch:",opts:["Interprets laws and determines if they are constitutional","Enforces laws","Controls the military","Creates laws"],a:0},
    {q:"The Electoral College formally:",opts:["Nominates presidential candidates","Elects the President and Vice President based on state votes","Approves legislation","Confirms Supreme Court justices"],a:1},
    {q:"A primary election is used to:",opts:["Recall an elected official","Choose a party candidate to run in the general election","Hold the main national election","Vote on local government issues"],a:1},
    {q:"A republic differs from a direct democracy because:",opts:["A republic has no elections","They are the same","In a republic citizens elect representatives; in direct democracy citizens vote on laws themselves","Direct democracy is more common"],a:2},
    {q:"A filibuster is:",opts:["A tactic to delay legislation through prolonged debate","A congressional vote count","A type of tax bill","A presidential veto"],a:0},
    {q:"Checks and balances ensure:",opts:["Each branch of government can limit the power of the others","Voter identification is checked","Representation is balanced between states","The federal budget is balanced"],a:0},
    {q:"A political party platform is:",opts:["A formal statement of the party beliefs, values, and policy positions","A list of candidates","A stage at a political rally","A campaign financial report"],a:0},
    {q:"Foreign policy differs from domestic policy because:",opts:["Foreign policy is set by Congress only","They are the same","Foreign policy governs relationships with other countries; domestic policy addresses issues within the country","Domestic policy is more important"],a:2},
  ],
  criminal:[
    {q:"A felony differs from a misdemeanor because:",opts:["Felonies are more serious with harsher penalties; misdemeanors are less serious","The age of the offender","Whether a weapon was used","Location of crime"],a:0},
    {q:"Due process means:",opts:["A type of plea bargain","The speed of a criminal trial","The process of jury selection","The legal requirement that government must respect all legal rights owed to a person"],a:3},
    {q:"The exclusionary rule means:",opts:["Evidence obtained illegally cannot be used in court","A sentencing guideline applies","Media can be excluded from trials","Witnesses can be excluded"],a:0},
    {q:"Recidivism refers to:",opts:["A type of prison sentence","The tendency of a convicted criminal to reoffend after release","A legal defense strategy","A rehabilitation program"],a:1},
    {q:"Parole allows:",opts:["Transfer of prisoners between facilities","Sentence reduction in court","Permanent release of a prisoner","Early release under supervision with conditions that must be met"],a:3},
    {q:"Civil law differs from criminal law because:",opts:["Criminal law only applies to violent crimes","Civil law is handled by police","Civil law resolves disputes between individuals; criminal law addresses offenses against society","They are the same"],a:2},
    {q:"Mens rea refers to:",opts:["The physical act of a crime","The mental intent or guilty mind required to be convicted of most crimes","A type of plea","A sentencing factor"],a:1},
    {q:"The grand jury decides whether:",opts:["There is enough evidence to formally charge someone with a serious crime","The defendant is guilty or innocent","To sentence a defendant","To hear an appeal"],a:0},
    {q:"Restorative justice emphasizes:",opts:["A type of prison program","Mandatory minimum sentencing","Maximum punishment","Repairing harm and rehabilitating offenders through community involvement"],a:3},
    {q:"Chain of custody in criminal evidence is:",opts:["The order of command in a police department","The order witnesses testify","The documented process of collecting, tracking, and preserving evidence to maintain its integrity","A type of arrest procedure"],a:2},
  ],
  prelaw:[
    {q:"Civil law differs from criminal law because:",opts:["Civil law is handled by police","Civil law resolves disputes between individuals; criminal law addresses offenses against society","They are the same","Criminal law only applies to violent crimes"],a:1},
    {q:"A plaintiff is:",opts:["The judge assistant","A witness in a trial","The person accused of a crime","The person who brings a lawsuit against another party"],a:3},
    {q:"Beyond a reasonable doubt means:",opts:["A majority of jurors agree","The jury is somewhat sure","The defendant admitted guilt","Evidence is so strong no reasonable person would question guilt"],a:3},
    {q:"A deposition is:",opts:["A written argument from an attorney","A type of court verdict","Pre-trial testimony given under oath outside of court","A legal document filed with court"],a:2},
    {q:"The appeals process is used to:",opts:["Negotiate a plea deal","Retry a case with a new jury","Review whether legal errors occurred in a lower court that affected the outcome","Increase a criminal sentence"],a:2},
    {q:"Substantive law differs from procedural law because:",opts:["Substantive law defines rights and obligations; procedural law outlines how cases are handled in court","They are the same","Procedural law is more important","Substantive law only applies to criminal cases"],a:0},
    {q:"Habeas corpus is:",opts:["The right of a person to challenge the lawfulness of their imprisonment before a court","A type of evidence","A type of legal document","A plea bargain"],a:0},
    {q:"A felony differs from a tort because:",opts:["Torts are more serious","Felonies are handled in civil court","They are the same","A felony is a crime against society prosecuted by the government; a tort is a civil wrong between individuals"],a:3},
    {q:"Statutory law consists of:",opts:["Laws enforced by local governments only","Unwritten cultural rules","Laws written and enacted by legislative bodies like Congress","Laws created by judges through court decisions"],a:2},
    {q:"Legal precedent (stare decisis) means:",opts:["A type of plea bargain","A law passed by Congress","A type of legal document","Courts should follow decisions made in earlier similar cases"],a:3},
  ],
  finearts:[
    {q:"Chiaroscuro in visual art uses:",opts:["Painting done outdoors","Abstract shapes","Strong contrasts between light and dark to give a sense of volume","A type of sculpture"],a:2},
    {q:"Representational art differs from abstract art because:",opts:["Abstract art is always black and white","Representational depicts recognizable subjects; abstract uses shapes without literal representation","No difference","Representational art is older"],a:1},
    {q:"An artist statement is:",opts:["A price list for artworks","A biography of famous artists","A written explanation of the artist intentions, process, and meaning behind their work","A list of materials used"],a:2},
    {q:"Surrealism as an art movement emphasized:",opts:["Impressionism","Cubism","Realism","Dreamlike irrational imagery"],a:3},
    {q:"Medium in art refers to:",opts:["The size of a painting","The material or technique used to create a work of art","The subject matter","The artist style"],a:1},
    {q:"In color theory, hue, saturation, and value describe:",opts:["Value only applies to digital art","They all mean color","Saturation is the same as hue","Hue is the color itself; saturation is its intensity; value is its lightness or darkness"],a:3},
    {q:"Impasto is a painting technique where paint is:",opts:["Used only in watercolor","Diluted with water","Blended smoothly","Applied thickly creating texture that stands out from the surface"],a:3},
    {q:"The golden ratio in art is significant because:",opts:["It is the price of gold paint","It is a mathematical ratio approximately 1.618 believed to create aesthetically pleasing proportions","It is a type of paint color","It is a type of art movement"],a:1},
    {q:"A print differs from an original artwork because:",opts:["They are the same","Originals are always larger","Prints are more valuable","An original is unique; a print is a copy reproduced from an original often in multiples"],a:3},
    {q:"Negative space in composition is:",opts:["The empty or open space surrounding the main subject that helps define it","A mistake in a composition","Background color only","Dark colors in a painting"],a:0},
  ],
  graphicdesign:[
    {q:"Visual hierarchy in design means:",opts:["A type of font choice","Making all elements the same size","Arranging elements to guide the viewer eye to the most important information first","Using only one color"],a:2},
    {q:"Resolution in digital design measures:",opts:["Number of colors in an image","Amount of detail in an image measured in pixels per inch","File size of an image","Brightness of a screen"],a:1},
    {q:"RGB is used for screens while CMYK is used for:",opts:["Print using ink","Black and white only","Higher quality images","They produce identical results"],a:0},
    {q:"Whitespace in design:",opts:["Refers to white-colored backgrounds only","Empty space around elements that improves readability and visual clarity","Is a design mistake","Is only the background color"],a:1},
    {q:"A vector graphic can be scaled without losing quality because:",opts:["It is a type of animation","It is a high-quality photograph","It has low resolution","It is made of mathematical paths rather than pixels"],a:3},
    {q:"A grid system in graphic design is used to:",opts:["Select a color palette","Limit the number of fonts used","Provide a structural framework that organizes content and creates visual consistency","Create borders around elements"],a:2},
    {q:"Kerning in typography refers to:",opts:["The height of letters","The spacing adjustment between individual characters in text","The color of text","The thickness of a font"],a:1},
    {q:"A mockup in graphic design shows:",opts:["A rough pencil sketch","A realistic preview of how a design will look in its final context","A type of logo","A final printed product"],a:1},
    {q:"Bleed in print design means:",opts:["A printing error","Using red ink","Design elements that extend beyond the trim edge to ensure no white borders after cutting","A type of color effect"],a:2},
    {q:"Serif fonts differ from sans-serif fonts because:",opts:["They look the same","Sans-serif is always more modern","Serif fonts are only for headlines","Serif fonts have small decorative strokes at letter ends; sans-serif fonts do not"],a:3},
  ],
  photography:[
    {q:"Aperture in a camera controls:",opts:["Focal length","Shutter speed","ISO sensitivity","How much light enters through the lens"],a:3},
    {q:"The rule of thirds is:",opts:["Using three colors in every photo","Taking three photos of every subject","A composition guideline dividing the frame into nine sections for more balanced images","A lighting technique"],a:2},
    {q:"ISO in photography measures:",opts:["Speed of the shutter","Focal length of a lens","Aperture size","Camera sensor sensitivity to light"],a:3},
    {q:"Depth of field refers to:",opts:["Brightness of an image","Size of the camera sensor","Distance between camera and subject","Range of distance in a photo that appears acceptably sharp"],a:3},
    {q:"White balance in photography ensures:",opts:["Controlled exposure time","Reduced image noise","Colors appear accurate under different lighting conditions","Increased resolution"],a:2},
    {q:"The exposure triangle consists of:",opts:["A camera filter","A type of lens","The relationship between ISO, aperture, and shutter speed that controls exposure","A type of composition technique"],a:2},
    {q:"A RAW file compared to a JPEG:",opts:["RAW contains unprocessed sensor data with more editing flexibility; JPEG is compressed and processed in camera","RAW is lower quality","JPEG is larger in file size","RAW files cannot be edited"],a:0},
    {q:"Leading lines as a composition technique uses:",opts:["Natural or man-made lines to guide the viewer eye toward the main subject","Lines created in post-processing","Horizontal lines only","Lines that lead to the edge of a photo"],a:0},
    {q:"Focal length differs from zoom because:",opts:["Focal length only matters for portraits","Focal length is a fixed property of a lens determining field of view; zoom refers to variable focal length lenses","They are the same","Zoom is always better"],a:1},
    {q:"Post-processing in photography means:",opts:["A type of camera setting","Developing film in a darkroom only","Editing and adjusting photos after they are taken using software like Lightroom or Photoshop","Setting up for a photo shoot"],a:2},
  ],
  filmvideo:[
    {q:"A storyboard is used to:",opts:["Edit footage","Record audio","Write the script","Visually plan a film shot by shot before production begins"],a:3},
    {q:"The director of photography oversees:",opts:["The visual look including camera work and lighting","The budget","Directing the actors","The screenplay"],a:0},
    {q:"Pre-production differs from post-production because:",opts:["Pre-production is planning before filming; post-production is editing and finishing after filming","Pre-production is only for big budgets","Post-production happens before filming","They are the same"],a:0},
    {q:"Continuity in filmmaking means:",opts:["The speed of editing","A type of film genre","Using the same camera throughout","Ensuring visual consistency so details match between different shots of the same scene"],a:3},
    {q:"A foley artist:",opts:["Writes music for films","Creates and records sound effects to be added in post-production","Designs costumes","Operates the camera"],a:1},
    {q:"The 180-degree rule in filmmaking means:",opts:["Camera angle must change every 180 seconds","A rule about lighting angles","A camera must rotate 180 degrees per scene","The camera should not cross an imaginary line between characters to maintain spatial consistency"],a:3},
    {q:"Diegetic sound differs from non-diegetic sound because:",opts:["Diegetic sound is only dialogue","Non-diegetic is always better","They are the same","Diegetic sound exists within the film world; non-diegetic is added for the audience only like a musical score"],a:3},
    {q:"Color grading in post-production is:",opts:["Choosing the color of costumes","Adjusting and enhancing the color of footage to achieve a specific look or mood","A type of camera filter","Adding text overlays"],a:1},
    {q:"A cut in film editing is:",opts:["Removing a scene entirely","A type of fade effect","A mistake in the script","An instantaneous transition from one shot to another"],a:3},
    {q:"A documentary film documents:",opts:["Real events, people, or issues to inform or persuade","Only animated subjects","Only short films","A fictional narrative"],a:0},
  ],
  architecture:[
    {q:"Load-bearing walls support:",opts:["Decoration only","The weight of the structure above and cannot be removed","They provide insulation","They separate rooms"],a:1},
    {q:"Sustainable architecture prioritizes:",opts:["Using the most expensive materials","Designing buildings that minimize environmental impact and use resources efficiently","Speed of construction","Making buildings as large as possible"],a:1},
    {q:"A foundation transfers:",opts:["Interior wall support only","The building load to the ground and provides stability","Insulation throughout the building","The roof weight only"],a:1},
    {q:"Scale in architectural drawings refers to:",opts:["The building weight limit","Height of a building","The proportional relationship between the drawing and the actual building size","Cost of materials"],a:2},
    {q:"Passive solar design uses:",opts:["The sun energy for heating and cooling without mechanical systems","Reflective windows only","A type of lighting system","Solar panels only"],a:0},
    {q:"Form in architecture refers to aesthetic appearance while function refers to:",opts:["Only floor plan layout","How well the building serves its purpose","Only exterior design","They are the same"],a:1},
    {q:"A cantilever is:",opts:["A type of window","A type of foundation","A structural element anchored at one end and projecting outward unsupported at the other end","A decorative column"],a:2},
    {q:"Building codes exist to:",opts:["Limit creativity","Establish minimum standards for safety, health, and welfare in building construction","Control building costs","Determine architectural style"],a:1},
    {q:"Structural design differs from aesthetic design because:",opts:["Aesthetic is more important","Structural only applies to large buildings","Structural design ensures safety and stability; aesthetic design focuses on visual appearance","They are the same"],a:2},
    {q:"BIM (Building Information Modeling) is:",opts:["A type of architectural style","A digital representation of a building physical and functional characteristics used for planning and management","A building measurement tool","A type of construction material"],a:1},
  ],
  communications:[
    {q:"Verbal communication differs from nonverbal communication because:",opts:["Verbal only refers to speeches","Nonverbal is less important","No difference","Verbal uses spoken or written words; nonverbal uses body language, tone, and facial expressions"],a:3},
    {q:"Media literacy is the ability to:",opts:["Read newspapers daily","Critically analyze, evaluate, and create media messages","Get a journalism degree","Read quickly"],a:1},
    {q:"Framing in media communication refers to:",opts:["Putting a photo in a frame","A type of camera shot","How media presents information to shape the audience perception of an issue","A news broadcast format"],a:2},
    {q:"An op-ed is used to:",opts:["Report breaking news objectively","Summarize a TV show","Announce a product","Express a personal opinion or argument on a topic"],a:3},
    {q:"Active listening involves:",opts:["Fully concentrating, understanding, and responding thoughtfully to a speaker","Listening without taking notes","Hearing without paying attention","Listening to music while studying"],a:0},
    {q:"Synchronous communication differs from asynchronous because:",opts:["Synchronous only applies to phone calls","Synchronous happens in real time; asynchronous allows participants to respond at different times","Asynchronous is always better","They are the same"],a:1},
    {q:"A rhetorical appeal uses ethos, pathos, or logos to:",opts:["File a legal argument","Persuade an audience through credibility, emotion, or logic","Write a news story","Create an advertisement"],a:1},
    {q:"Gatekeeping in media is:",opts:["The process by which editors and platforms select what information reaches the public","A type of censorship law","A social media algorithm","Physical security at a media building"],a:0},
    {q:"Mass communication differs from interpersonal communication because:",opts:["Mass communication is less effective","Interpersonal is more important","They are the same","Mass communication reaches large audiences through media; interpersonal is direct communication between individuals"],a:3},
    {q:"Agenda-setting theory suggests that media:",opts:["Reports only biased news","Controls political elections","Influences what topics the public considers important by giving them more coverage","Sets government policy"],a:2},
  ],
  journalism:[
    {q:"The inverted pyramid structure in news writing means:",opts:["Writing stories chronologically","Starting with background information","Using the longest paragraph first","Presenting the most important information first followed by supporting details"],a:3},
    {q:"A primary source in journalism is:",opts:["A story published by a major newspaper","A summary of another article","The most popular news outlet","Direct firsthand information such as eyewitness accounts or original documents"],a:3},
    {q:"Libel is:",opts:["A type of anonymous source","A journalism award","A type of news broadcast","A false published statement that damages someone reputation"],a:3},
    {q:"Source diversity in journalism is important because:",opts:["It ensures multiple perspectives are represented and reduces bias","It increases advertisement revenue","It makes articles longer","It is required by law"],a:0},
    {q:"Hard news differs from feature stories because:",opts:["Hard news is longer","Feature stories are more credible","Hard news is only about politics","Hard news covers timely events; features explore topics in greater depth or human interest"],a:3},
    {q:"An editor in journalism:",opts:["Conducts interviews","Manages advertising sales","Writes all the articles","Reviews, corrects, and improves reporters work before publication"],a:3},
    {q:"Off the record in journalism means:",opts:["Information shared with a journalist that cannot be published or attributed to the source","Information that is public","A confidentiality agreement only","A type of interview technique"],a:0},
    {q:"Objective journalism differs from advocacy journalism because:",opts:["Objective journalism is outdated","Objective journalism aims for impartiality; advocacy journalism promotes a specific cause or viewpoint","They are the same","Advocacy journalism is less credible always"],a:1},
    {q:"A news embargo means:",opts:["A ban on all news coverage","An agreement to not publish information until a specified date or event","A government censorship order","A type of press release"],a:1},
    {q:"Citizen journalism is:",opts:["News gathering and reporting done by ordinary people rather than professional journalists often through social media","Journalism about citizenship","A type of local news","Journalism about government"],a:0},
  ],
  english:[
    {q:"A simile differs from a metaphor because:",opts:["They are the same","Metaphors are more poetic","Similes are only used in poetry","A simile compares using like or as; a metaphor makes the comparison directly without those words"],a:3},
    {q:"First person point of view means:",opts:["An unknown narrator tells the story","The story is told from a character perspective using I and me","Multiple characters narrate alternately","The narrator knows everything about all characters"],a:1},
    {q:"A counterargument in persuasive writing is used to:",opts:["End the essay","Introduce your main argument","Acknowledge an opposing viewpoint and then refute it strengthening your argument","Confuse the reader"],a:2},
    {q:"Denotation differs from connotation because:",opts:["Denotation is a word literal dictionary meaning; connotation is the emotional or cultural associations it carries","Connotation is more accurate","Denotation only applies to technical writing","They mean the same"],a:0},
    {q:"A round character in fiction is:",opts:["A character with no flaws","A character based on a real person","A complex fully developed character who changes or grows throughout the story","A character who appears in every scene"],a:2},
    {q:"Dramatic irony occurs when:",opts:["A character speaks too dramatically","A situation is simply coincidental","A character is overly dramatic","The audience knows something important that a character does not"],a:3},
    {q:"Theme differs from plot because:",opts:["Plot only applies to novels","They are the same","Theme is more important","Plot is the sequence of events; theme is the underlying message or central idea"],a:3},
    {q:"Stream of consciousness in writing:",opts:["Is written from an outside observer perspective","Mimics the natural flow of a character thoughts without structure","Is a type of nature writing","Is a type of dialogue"],a:1},
    {q:"A foil character:",opts:["Contrasts with another character highlighting their qualities by comparison","Narrates the story","Is a character who disappears","Is always the villain"],a:0},
    {q:"Showing in creative writing differs from telling because:",opts:["Telling is always better","Showing only works in visual media","They are the same","Showing conveys meaning through action and detail; telling states information directly"],a:3},
  ],
  pr:[
    {q:"The primary goal of public relations is to:",opts:["Create advertisements","Sell products directly","Handle customer complaints","Manage and shape the public perception of a person, company, or organization"],a:3},
    {q:"A press release is:",opts:["A social media post","A type of paid advertisement","An official written statement distributed to media to announce newsworthy information","A recorded company statement"],a:2},
    {q:"Crisis communication in PR involves:",opts:["Communicating only during slow periods","Avoiding the media during problems","A type of press conference only","Managing and responding to a negative event to protect an organization reputation"],a:3},
    {q:"PR differs from advertising because:",opts:["Advertising is more credible","They are the same","PR earns media coverage organically; advertising is paid placement","PR only uses social media"],a:2},
    {q:"A media kit is:",opts:["A package of information about a company provided to media for coverage","A type of press release","A list of media contacts","Camera equipment for journalists"],a:0},
    {q:"Spin in public relations means:",opts:["A crisis communication tool","A positive term for accuracy","A type of social media post","Presenting information in a way that favors one client sometimes at the expense of objectivity"],a:3},
    {q:"Proactive PR differs from reactive PR because:",opts:["Proactive only applies to large companies","They are the same","Reactive is more effective","Proactive plans and creates positive coverage; reactive responds to events as they happen"],a:3},
    {q:"Brand reputation management is:",opts:["Designing a logo","Managing social media accounts only","A type of advertising campaign","The ongoing process of monitoring and influencing how a brand is perceived by the public"],a:3},
    {q:"A spokesperson role in an organization is to:",opts:["Officially represent and communicate on behalf of the organization to media and the public","Manage the PR budget","Write all press releases","Create social media content only"],a:0},
    {q:"The PESO model in PR categorizes media into:",opts:["A social media strategy","A financial model","Paid, Earned, Shared, and Owned channels","A type of press release format"],a:2},
  ],
  digitalmedia:[
    {q:"SEO stands for:",opts:["Search Engine Optimization — improving content to rank higher in search results","A type of digital advertisement","Social Engagement Online","Software Engineering Operations"],a:0},
    {q:"Engagement rate on social media measures:",opts:["How actively an audience interacts with content through likes, comments, and shares","The number of posts per day","The number of followers","The cost of running ads"],a:0},
    {q:"A content strategy is:",opts:["A list of hashtags","A type of social media profile","A plan for office furniture","A plan for creating, publishing, and managing content to achieve specific goals"],a:3},
    {q:"Going viral means:",opts:["Content spreading rapidly and widely across the internet","A computer getting a virus","A paid advertising campaign","A live streaming event"],a:0},
    {q:"A podcast is:",opts:["A type of blog","A video-only platform","A digital audio program available for streaming or download often released in episodes","A type of live TV show"],a:2},
    {q:"Organic reach differs from paid reach because:",opts:["Organic reach is unpaid earned through engagement; paid reach uses advertising to reach more people","Paid reach is always more effective","Organic reach only applies to large accounts","They are the same"],a:0},
    {q:"Click-through rate (CTR) measures:",opts:["The percentage of people who click on a link or ad after seeing it","The number of shares a post receives","The cost of an advertisement","The number of people who see an ad"],a:0},
    {q:"UX design focuses on:",opts:["Designing digital products that provide meaningful and easy experiences for users","A type of coding language","The visual appearance of a website","Social media management"],a:0},
    {q:"A content management system (CMS) allows users to:",opts:["Track content in a spreadsheet","Use a type of social media platform","Send email marketing campaigns","Create, manage, and publish digital content without coding"],a:3},
    {q:"Influencer marketing involves:",opts:["Traditional word-of-mouth marketing","Partnering with individuals who have significant social media followings to promote products or services","Hiring celebrities for TV commercials","A type of paid search advertising"],a:1},
  ],
  education:[
    {q:"Formative assessment differs from summative assessment because:",opts:["Formative is ongoing feedback during learning; summative evaluates at the end of a unit","Summative is given daily","They are the same","Formative only applies to standardized tests"],a:0},
    {q:"Differentiated instruction means:",opts:["Teaching the same lesson to all students","Adjusting teaching methods and content to meet diverse individual student learning needs","A type of classroom management","Giving advanced students more homework"],a:1},
    {q:"An IEP provides:",opts:["A gifted student program","A behavior contract","A general curriculum for all students","A customized educational plan for students with disabilities outlining specific goals and accommodations"],a:3},
    {q:"Bloom Taxonomy provides a framework for:",opts:["Categorizing levels of cognitive thinking from basic recall to complex creation","A classroom behavior system","Classifying plant species","A grading scale"],a:0},
    {q:"Project-based learning means:",opts:["Watching educational videos","Assigning textbook chapters only","A type of standardized test","Students learn by actively working on real-world projects over an extended period"],a:3},
    {q:"The hidden curriculum refers to:",opts:["The core academic curriculum","A type of special education program","Secret courses taught after school","Implicit lessons about values, norms, and behaviors students learn through the school environment beyond formal content"],a:3},
    {q:"Intrinsic motivation in students differs from extrinsic motivation because:",opts:["Intrinsic motivation comes from internal interest; extrinsic comes from external rewards like grades","Intrinsic motivation only works for advanced students","Extrinsic is always more effective","They are the same"],a:0},
    {q:"Scaffolding in education means:",opts:["Providing temporary support to students as they learn new concepts gradually removing it as they gain independence","Building a physical structure","A type of assessment","A classroom arrangement"],a:0},
    {q:"Culturally responsive teaching connects content to:",opts:["A type of language instruction only","A multicultural holiday celebration","Students cultural backgrounds, experiences, and perspectives","Teaching only one culture history"],a:2},
    {q:"A rubric is used to:",opts:["Manage classroom behavior","Administer a test","Clearly describe criteria and levels of performance for an assignment","Write a lesson plan"],a:2},
  ],
  earlychildhood:[
    {q:"Parallel play means:",opts:["Children taking turns","Children playing the same game together","A structured group activity","Young children playing near each other but independently without direct interaction"],a:3},
    {q:"The zone of proximal development (ZPD) is:",opts:["A classroom seating arrangement","The range of tasks a child can do with guidance but not yet independently — Vygotsky concept","A physical play area","A reading level assessment"],a:1},
    {q:"Attachment theory suggests:",opts:["Play is not important for learning","Children learn best alone","Strong emotional bonds with caregivers in early childhood form the foundation for healthy development","Children develop at the same rate"],a:2},
    {q:"A developmental milestone is:",opts:["A parenting technique","A marker of typical skills and behaviors expected at certain ages in a child development","A standardized test score","A school grade level"],a:1},
    {q:"Cooperative play with peers is most important for young children development because:",opts:["It develops social skills like sharing, negotiating, and collaborating","Solitary play is better","Individual academic work is more valuable","Watching educational programs is equally effective"],a:0},
    {q:"Gross motor skills differ from fine motor skills because:",opts:["They are the same","Gross motor only applies to sports","Fine motor develops first","Gross motor involves large muscle movements like running; fine motor involves small precise movements like writing"],a:3},
    {q:"Scaffolding in early childhood education means:",opts:["A type of playground equipment","A room arrangement strategy","Providing temporary support to help children learn new skills gradually removing it as they gain independence","Building a physical structure"],a:2},
    {q:"Child-directed play means:",opts:["A type of structured game","Play directed by teachers","Play where the child chooses the activity and leads the experience promoting autonomy and creativity","Screen time selected by the child"],a:2},
    {q:"Authoritative parenting differs from authoritarian parenting because:",opts:["Authoritative only works for older children","Authoritarian is more effective","They are the same","Authoritative is warm with clear boundaries; authoritarian is strict with little warmth or explanation"],a:3},
    {q:"Emergent literacy refers to:",opts:["A standardized reading test","Learning to read in kindergarten only","Knowledge and skills related to reading and writing that develop before formal instruction starting in infancy","A type of reading program"],a:2},
  ],
  sportsmanagement:[
    {q:"NIL rights for athletes refers to:",opts:["The right for athletes to profit from their Name, Image, and Likeness","National Insurance for League players","A league negotiating rules","A type of sports contract"],a:0},
    {q:"A salary cap in professional sports is:",opts:["A limit on total team spending on player salaries to maintain competitive balance","The cost of stadium operations","A player maximum bonus","The minimum wage for athletes"],a:0},
    {q:"A sports agent primarily:",opts:["Scouts new players","Manages team finances","Negotiates contracts and manages business relationships on behalf of athletes","Coaches athletes during games"],a:2},
    {q:"Sports analytics is used to:",opts:["Design team uniforms","Count game attendance only","Manage ticket sales","Analyze data to improve player performance, team strategy, and business decisions"],a:3},
    {q:"A collective bargaining agreement in sports is:",opts:["A negotiated contract between players union and owners covering salaries, benefits, and working conditions","Used to establish fan rules","Used to schedule games","Used to set ticket prices"],a:0},
    {q:"A league differs from a franchise in professional sports because:",opts:["A league is the overall organization governing multiple teams; a franchise is a specific team within that league","They are the same","A league is only for amateur sports","A franchise is more powerful than a league"],a:0},
    {q:"A title sponsor in sports:",opts:["Is the team main coach","A company that pays for naming rights to an event or venue in exchange for major advertising exposure","Is the team owner","Is a government sports grant"],a:1},
    {q:"Revenue sharing in professional sports leagues means:",opts:["Players sharing their salaries","A type of merchandise deal","Fans sharing the cost of tickets","Distributing a portion of league revenues among all teams to promote competitive balance"],a:3},
    {q:"A general manager role in a sports team involves:",opts:["Coaching the team on the field","Managing stadium operations","Overseeing team operations including player personnel decisions, contracts, and roster management","Handling media relations"],a:2},
    {q:"Sports facility management involves:",opts:["Scheduling game broadcasts","Playing sports in a facility","Designing sports uniforms","Overseeing the operations, maintenance, and events at sports venues to ensure safety and profitability"],a:3},
  ],
  eventmanagement:[
    {q:"A run of show document is:",opts:["A post-event report","A vendor contract","A detailed timeline listing every element of an event in sequence","A budget summary"],a:2},
    {q:"During vendor negotiation an event planner:",opts:["Sends invitations to guests","Creates the event program","Sets up chairs and tables","Discusses and agrees on services, pricing, and contracts with suppliers"],a:3},
    {q:"An event brief is:",opts:["A document outlining the goals, audience, budget, and key details of an event","A vendor invoice","A post-event review","A short summary sent to guests"],a:0},
    {q:"Contingency planning in event management means:",opts:["Planning entertainment options","Planning for the best outcome","Preparing backup plans for problems that might occur like weather or technical issues","A type of event budget"],a:2},
    {q:"ROI for an event organizer measures:",opts:["Whether the event achieved its goals relative to its cost","Reach of Impact","Range of Invitation","Rate of Involvement"],a:0},
    {q:"An RFP in event planning is:",opts:["A registration form","A type of event contract","A type of event budget","A Request for Proposal — a document sent to vendors asking them to submit bids for services"],a:3},
    {q:"An event goal differs from an event objective because:",opts:["A goal is a broad desired outcome; an objective is a specific measurable step toward achieving that goal","They are the same","Objectives are less important","Goals are only financial"],a:0},
    {q:"Stakeholder management in event planning means:",opts:["Identifying and maintaining relationships with all parties who have an interest in the event success","A type of budget management","Managing event staff","Managing ticket sales"],a:0},
    {q:"A force majeure clause in an event contract:",opts:["Is a type of payment plan","Is a venue requirement","Is a fee for canceling events","Excuses parties from obligations due to extraordinary circumstances beyond their control"],a:3},
    {q:"Post-event evaluation is used to:",opts:["Update the event website","Relive the event","Assess what worked, what did not, and how to improve future events using attendee feedback and data","Pay vendors"],a:2},
  ],
  hospitality:[
    {q:"RevPAR in hotel management means:",opts:["Revenue Per Annual Reservation","Revenue Per Available Room — a key measure of hotel financial performance","Rate of Variable Pricing and Revenue","A type of hotel rating"],a:1},
    {q:"A guest satisfaction survey is used to:",opts:["Verify billing information","Sell additional services","Collect feedback that helps identify areas for improvement in guest experience","Check guests out faster"],a:2},
    {q:"Overbooking in hospitality means:",opts:["Charging guests too much","Having too many staff scheduled","Booking the wrong type of room","Accepting more reservations than capacity anticipating some cancellations"],a:3},
    {q:"Upselling in a restaurant or hotel means:",opts:["Lowering prices to attract more customers","Reducing menu options","Encouraging customers to purchase a higher-value option or additional services","Offering refunds"],a:2},
    {q:"Front-of-house in a restaurant differs from back-of-house because:",opts:["Front is for managers; back is for staff","Front-of-house is customer-facing; back-of-house is the kitchen and operations area","Front is indoor; back is outdoor","They are the same"],a:1},
    {q:"A hotel occupancy rate measures:",opts:["The average daily room rate","The number of staff on duty","The number of check-ins per day","The percentage of available rooms that are occupied over a given period"],a:3},
    {q:"Mise en place in a professional kitchen means:",opts:["Having everything in its place — the preparation and organization done before service begins","A French dish","The dessert menu","A kitchen safety rule"],a:0},
    {q:"A standard operating procedure (SOP) in hospitality ensures:",opts:["Consistent service quality through a documented step-by-step process across all staff interactions","A type of hotel contract","A type of menu","A guest review system"],a:0},
    {q:"Yield management in hospitality is:",opts:["A type of staff scheduling","A pricing strategy that adjusts rates based on demand to maximize revenue","Managing crop yields in hotel gardens","A customer loyalty program"],a:1},
    {q:"A transient guest differs from a group guest because:",opts:["Group guests pay less always","Transient guests stay longer","Transient guests book individually; group guests book as part of an organized block for a shared purpose","They are the same"],a:2},
  ],
  generalstudies:[
    {q:"If you earn $2,500 per month and rent is $900, what percentage goes to rent?",opts:["45%","18%","36%","27.5%"],a:2},
    {q:"A need differs from a want because:",opts:["Wants cost more than needs","They are the same","A need is essential for survival or basic functioning; a want is desired but not essential","Needs are only physical items"],a:2},
    {q:"Living within your means means:",opts:["Spending no more than you earn and avoiding unnecessary debt","Earning as much as possible","Only buying sale items","Having a savings account"],a:0},
    {q:"A $500 credit card balance at 20% annual interest — how much interest after one year without payment?",opts:["$200","$100","$5","$50"],a:1},
    {q:"Compound interest matters because:",opts:["Interest is paid once a year and does not matter much","Interest is calculated on both the original amount and previously earned interest so it grows faster over time","It is a fixed fee charged by banks","It applies only to the original deposit"],a:1},
    {q:"A W-2 form shows:",opts:["A job application","A credit report","A bank statement","Your annual wages and taxes withheld by an employer"],a:3},
    {q:"An insurance deductible is:",opts:["The amount you pay out-of-pocket before insurance begins covering costs","A discount on your premium","A type of insurance penalty","A monthly insurance payment"],a:0},
    {q:"Gross pay differs from net pay because:",opts:["Gross pay only includes hourly wages","Gross is total earnings before deductions; net is take-home pay after taxes and other deductions","They are the same","Net pay is higher than gross pay"],a:1},
    {q:"An overdraft on a checking account means:",opts:["A bank fee for having too much money","You spent more than your account balance causing it to go negative","A type of credit card","A type of savings account"],a:1},
    {q:"A credit card differs from a debit card because:",opts:["Credit cards are always safer","They work exactly the same","A credit card lets you borrow money to pay back later; a debit card draws directly from your bank balance","Debit cards are for businesses only"],a:2},
  ],
};

// ── State ─────────────────────────────────────────────────────
let ob = {
  player:null, step:'character',
  selectedChar:null, selectedCategory:null, selectedMajor:null,
  questions:[], currentQ:0, score:0, wrongAnswers:[],
};

window.initOnboarding = function(player) {
  ob.player = player;
  ob.step   = player.onboardingStep || 'character';
  if (player.characterId) ob.selectedChar = OB_CHARACTERS.find(c=>c.id===player.characterId)||null;
  if (player.majorId) {
    for (const cat of OB_CATEGORIES) {
      const m = cat.majors.find(m=>m.id===player.majorId);
      if (m) { ob.selectedMajor=m; ob.selectedCategory=cat; break; }
    }
    if (ob.selectedMajor) ob.questions = OB_QUESTIONS[ob.selectedMajor.id]||OB_QUESTIONS.generalstudies;
  }
  obRender();
};

function obRender() {
  const el = document.getElementById('screen-onboarding');
  if (!el) return;
  if      (ob.step==='character') obRenderCharacter(el);
  else if (ob.step==='category')  obRenderCategory(el);
  else if (ob.step==='major')     obRenderMajor(el);
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

function obLogoutBtn() {
  return `<button class="ob-logout" onclick="handleLogout()">← Log Out</button>`;
}

// ── Step 1: Character ─────────────────────────────────────────
function obRenderCharacter(el) {
  el.innerHTML=`<div class="ob-wrap">
    ${obLogoutBtn()}
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
  if (!ob.selectedChar) return;
  await window.GameState.FirestoreDB.updatePlayer(ob.player.uid,{characterId:ob.selectedChar.id,characterName:ob.selectedChar.name,onboardingStep:'degree'});
  ob.step='category'; obRender();
};

// ── Step 2a: Category ─────────────────────────────────────────
function obRenderCategory(el) {
  const regular=OB_CATEGORIES.filter(c=>!c.isGeneral);
  const general=OB_CATEGORIES.find(c=>c.isGeneral);
  el.innerHTML=`<div class="ob-wrap">
    ${obLogoutBtn()}
    <div class="ob-header">
      <div class="ob-step-bar">${obStepBar(2)}</div>
      <h1 class="ob-title">Choose your field of study</h1>
      <p class="ob-sub">Select a category to see the available degrees.</p>
    </div>
    <div class="cat-grid">
      ${regular.map(c=>`
        <div class="cat-card" style="--cat-color:${c.color};" onclick="obSelectCategory('${c.id}')">
          <div class="cat-icon">${c.icon}</div>
          <div class="cat-label">${c.label}</div>
        </div>`).join('')}
      <div class="cat-card cat-general-card" onclick="obSelectCategory('${general.id}')">
        <div class="cat-icon">${general.icon}</div>
        <div class="cat-label">${general.label}</div>
        <div class="cat-general-sub">Not sure yet? Start here.</div>
      </div>
    </div>
    <div class="ob-footer">
      <button class="ob-btn" style="background:#2a2a2a;color:#ccc;" onclick="ob.step='character';obRender()">← Back</button>
    </div>
  </div>`;
}
window.obSelectCategory = id => {
  ob.selectedCategory=OB_CATEGORIES.find(c=>c.id===id);
  if (ob.selectedCategory.isGeneral) {
    ob.selectedMajor=ob.selectedCategory.majors[0];
    ob.questions=OB_QUESTIONS.generalstudies;
    ob.currentQ=0; ob.score=0; ob.wrongAnswers=[];
    ob.step='finals'; obRender();
  } else { ob.step='major'; obRender(); }
};

// ── Step 2b: Major ────────────────────────────────────────────
function obRenderMajor(el) {
  const cat=ob.selectedCategory;
  el.innerHTML=`<div class="ob-wrap">
    ${obLogoutBtn()}
    <div class="ob-header">
      <div class="ob-step-bar">${obStepBar(2)}</div>
      <h1 class="ob-title">${cat.icon} ${cat.label}</h1>
      <p class="ob-sub">Choose your specific major.</p>
    </div>
    <div class="major-list">
      ${cat.majors.map(m=>`
        <div class="major-card ${ob.selectedMajor?.id===m.id?'selected':''}" onclick="obSelectMajor('${m.id}')">
          ${m.label}
        </div>`).join('')}
    </div>
    <div class="ob-footer" style="display:flex;gap:12px;justify-content:center;">
      <button class="ob-btn" style="background:#2a2a2a;color:#ccc;" onclick="ob.step='category';ob.selectedMajor=null;obRender()">← Back</button>
      <button class="ob-btn" onclick="obConfirmMajor()" ${!ob.selectedMajor?'disabled':''}>
        Enroll in ${ob.selectedMajor?ob.selectedMajor.label:'...'} →
      </button>
    </div>
  </div>`;
}
window.obSelectMajor = id => { ob.selectedMajor=ob.selectedCategory.majors.find(m=>m.id===id); obRender(); };
window.obConfirmMajor = async () => {
  if (!ob.selectedMajor) return;
  await window.GameState.FirestoreDB.updatePlayer(ob.player.uid,{majorId:ob.selectedMajor.id,majorLabel:ob.selectedMajor.label,onboardingStep:'finals'});
  ob.questions=OB_QUESTIONS[ob.selectedMajor.id]||OB_QUESTIONS.generalstudies;
  ob.currentQ=0; ob.score=0; ob.wrongAnswers=[];
  ob.step='finals'; obRender();
};

// ── Step 3: Finals ────────────────────────────────────────────
function obRenderFinals(el) {
  const q=ob.questions[ob.currentQ];
  const prog=Math.round((ob.currentQ/ob.questions.length)*100);
  el.innerHTML=`<div class="ob-wrap">
    ${obLogoutBtn()}
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
  if (!confirm('Drop this class? You will go back to choosing your degree.')) return;
  ob.selectedMajor=null; ob.currentQ=0; ob.score=0; ob.wrongAnswers=[];
  ob.step='category'; obRender();
};
window.obAnswerQ = idx => {
  const q=ob.questions[ob.currentQ];
  if (idx===q.a) ob.score++;
  else ob.wrongAnswers.push({question:q.q,correct:q.opts[q.a],chosen:q.opts[idx]});
  document.querySelectorAll('.finals-opt').forEach((btn,i)=>{
    btn.disabled=true;
    if(i===q.a) btn.classList.add('correct');
    if(i===idx&&idx!==q.a) btn.classList.add('wrong');
  });
  setTimeout(()=>{ ob.currentQ++; if(ob.currentQ>=ob.questions.length) ob.step='results'; obRender(); },900);
};

// ── Step 4: Results — always graduate, GPA varies ─────────────
function obRenderResults(el) {
  const total=ob.questions.length;
  const pct=Math.round((ob.score/total)*100);
  const gpa=(2.0+((ob.score/total)*2.0)).toFixed(1);
  const gpaNum=parseFloat(gpa);
  const gpaLabel=gpaNum>=3.7?'Summa Cum Laude':gpaNum>=3.3?'Magna Cum Laude':gpaNum>=3.0?'Cum Laude':gpaNum>=2.5?'Good Standing':'Minimum Standing';

  el.innerHTML=`<div class="ob-wrap">
    ${obLogoutBtn()}
    <div class="ob-header">
      <div class="ob-step-bar">${obStepBar(4)}</div>
      <h1 class="ob-title">You Graduated!</h1>
    </div>
    <div class="results-box">
      <div class="results-score pass">${ob.score}/${total}</div>
      <div class="results-pct">${pct}%</div>
      <div class="results-gpa">${gpa} GPA <span class="results-honor">${gpaLabel}</span></div>
      <p class="results-msg">
        Congratulations, <strong>${ob.player.firstName}</strong>. You have earned your
        <strong>${ob.selectedMajor.label}</strong> degree with a <strong>${gpa} GPA</strong>.
        Your GPA will affect which jobs you can qualify for in Capital Heights.
        ${gpaNum < 2.5 ? '<br><em>A higher GPA opens more doors. Study hard next time.</em>' : ''}
      </p>
      ${ob.wrongAnswers.length>0?`
        <div class="results-review">
          <p class="review-label">Questions you missed</p>
          ${ob.wrongAnswers.map(w=>`
            <div class="review-item">
              <div class="review-q">${w.question}</div>
              <div class="review-wrong">Your answer: ${w.chosen}</div>
              <div class="review-correct">Correct: ${w.correct}</div>
            </div>`).join('')}
        </div>`:''}
      <button class="ob-btn" onclick="obGraduate('${gpa}')">Enter Capital Heights</button>
    </div>
  </div>`;
}
window.obGraduate = async gpa => {
  await window.GameState.FirestoreDB.updatePlayer(ob.player.uid,{graduationGPA:parseFloat(gpa),onboardingStep:'jobboard'});
  ob.player.onboardingStep='jobboard';
  window.GameState.player=ob.player;
  showScreen('screen-citymap');
  if(window.initCityMap) window.initCityMap(ob.player);
};