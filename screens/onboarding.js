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
    {q:"A company's revenue is $80,000 and expenses are $52,000. What is the profit?",opts:["$28,000","$132,000","$52,000","$18,000"],a:0},
    {q:"What does it mean when a business breaks even?",opts:["It is losing money","Revenue exactly equals expenses","It is growing rapidly","It owes back taxes"],a:1},
    {q:"A manager delegates a task. This means the manager:",opts:["Does the task alone","Assigns the task to someone else","Cancels the task","Reports it to a supervisor"],a:1},
    {q:"Which describes the best customer service response to a complaint?",opts:["Ignore minor ones","Respond only when required","Resolve it quickly and make the customer feel valued","Offer a discount every time"],a:2},
    {q:"What is gross profit?",opts:["Revenue minus all expenses","Revenue minus cost of goods sold only","Net income after taxes","Total assets minus liabilities"],a:1},
    {q:"What does cash flow refer to?",opts:["Total company profit","The movement of money in and out of a business","The amount in a savings account","Annual revenue"],a:1},
    {q:"A sole proprietorship is:",opts:["A company with many shareholders","A business owned and operated by one person","A government-owned business","A type of nonprofit"],a:1},
    {q:"What is market share?",opts:["The number of products a company makes","The percentage of total sales a company holds in its industry","A type of stock","A business expense"],a:1},
    {q:"Which is an example of a fixed cost?",opts:["Raw materials","Sales commissions","Monthly rent for office space","Packaging costs that vary by unit"],a:2},
    {q:"What is a business expense?",opts:["Money the business earns","Money the business spends to operate","A type of savings","A customer complaint"],a:1},
  ],
  finance:[
    {q:"You deposit $1,000 at 5% annual interest. How much interest after one year?",opts:["$5","$50","$500","$150"],a:1},
    {q:"A stock is ownership; a bond is a loan to a company. Which is safer for most investors?",opts:["Stocks are always safer","Bonds are generally lower risk","They carry identical risk","Risk depends only on company size"],a:1},
    {q:"Which action most improves a low credit score over time?",opts:["Opening many new cards","Paying bills consistently on time","Spending more each month","Ignoring small debts"],a:1},
    {q:"What does diversifying investments mean?",opts:["Putting everything in the safest option","Spreading money across different investments to reduce risk","Only investing in real estate","Trusting one company"],a:1},
    {q:"A 401k employer match means:",opts:["You pay in and employer adds nothing","Employer contributes money based on your contribution","Guaranteed 401% return","Government manages your retirement"],a:1},
    {q:"What is liquidity?",opts:["How profitable an investment is","How quickly an asset can be converted to cash without major loss","The total value of investments","The risk level of a stock"],a:1},
    {q:"What is a mutual fund?",opts:["A government savings program","A pooled investment where many investors money is managed together","A type of checking account","A personal retirement account"],a:1},
    {q:"What is the time value of money?",opts:["Money saved is worth less than money spent","A dollar today is worth more than a dollar in the future due to earning potential","Inflation makes money worthless","Money only has value when invested"],a:1},
    {q:"What is an emergency fund typically used for?",opts:["Vacation savings","Investing in stocks","Covering unexpected expenses without going into debt","A down payment only"],a:2},
    {q:"Which best describes a bear market?",opts:["Stock prices rising 20 percent or more","Stock prices falling 20 percent or more over time","A market with no volatility","A market only for bonds"],a:1},
  ],
  accounting:[
    {q:"Assets = Liabilities + ___",opts:["Revenue","Expenses","Equity","Profit"],a:2},
    {q:"What does accounts receivable represent?",opts:["Money owed to suppliers","Money owed TO the business by customers","Savings account balance","Unpaid wages"],a:1},
    {q:"Depreciation refers to:",opts:["An increase in asset value","Gradual decrease in an asset's value over time","A type of loan","A tax paid on profits"],a:1},
    {q:"What is the main purpose of an audit?",opts:["To fire underperforming employees","To independently verify financial records are accurate","To create a new budget","To calculate bonuses"],a:1},
    {q:"Revenue is $90,000 and COGS is $55,000. What is gross profit?",opts:["$145,000","$55,000","$35,000","$90,000"],a:2},
    {q:"What is a liability?",opts:["Something a business owns","Something a business owes to others","A type of revenue","An operating expense"],a:1},
    {q:"Cash basis accounting records transactions:",opts:["When earned or incurred regardless of payment","When money actually changes hands","Only at year end","Only for large companies"],a:1},
    {q:"What does COGS stand for?",opts:["Cost of Goods Sold","Company Operating Growth Statement","Capital and Overhead General Summary","Cash on General Sale"],a:0},
    {q:"A credit in double-entry bookkeeping increases liabilities and equity and:",opts:["Always increases all accounts","Decreases assets","Always decreases all accounts","Only applies to bank accounts"],a:1},
    {q:"What is working capital?",opts:["Total company revenue","Current assets minus current liabilities","Long-term investments","Annual operating budget"],a:1},
  ],
  economics:[
    {q:"If demand increases but supply stays the same, price typically:",opts:["Decreases","Stays the same","Increases","The product becomes free"],a:2},
    {q:"Which best describes a recession?",opts:["Rapid economic growth","Temporary rise in inflation","Significant economic decline with rising unemployment","A government budget surplus"],a:2},
    {q:"What does the Federal Reserve primarily control?",opts:["Tax rates","The stock market","Interest rates and the money supply","Government spending"],a:2},
    {q:"Opportunity cost is best described as:",opts:["Total cost of a product","What you give up when choosing one option over another","A government fee","The price of inflation"],a:1},
    {q:"Which is an example of a public good?",opts:["A private gym","A toll road","Street lighting","A restaurant"],a:2},
    {q:"What is a progressive tax?",opts:["A flat tax rate for everyone","Higher earners pay a higher percentage of income","Everyone pays the same dollar amount","Only businesses pay this tax"],a:1},
    {q:"What does monetary policy control?",opts:["Government spending and taxation","Money supply and interest rates managed by the central bank","Import and export regulations","Corporate tax rates"],a:1},
    {q:"What is a trade deficit?",opts:["When exports exceed imports","When imports exceed exports — more is bought than sold internationally","A tariff on imported goods","A type of government debt"],a:1},
    {q:"Elasticity in economics refers to:",opts:["How flexible a business hours are","How sensitive demand or supply is to changes in price","The strength of a currency","Inflation rate sensitivity"],a:1},
    {q:"Microeconomics focuses on individual decisions while macroeconomics focuses on:",opts:["The same things","Entire economies and broad factors like GDP and inflation","Business strategy only","Government budgets only"],a:1},
  ],
  marketing:[
    {q:"A product launches with very low price to attract customers quickly. This is called:",opts:["Price skimming","Penetration pricing","Value pricing","Discount bundling"],a:1},
    {q:"What does ROI stand for in marketing?",opts:["Rate of Inflation","Return on Investment","Reach of Influence","Revenue Over Income"],a:1},
    {q:"A unique selling proposition is:",opts:["The lowest price","What makes a product distinctly better than competitors","A type of advertisement","A loyalty program"],a:1},
    {q:"Market segmentation means:",opts:["Selling the same product to everyone","Dividing the market into groups with similar needs","Lowering prices for some customers","Advertising on multiple platforms"],a:1},
    {q:"Which metric measures how many people saw an ad?",opts:["Conversion rate","Click-through rate","Reach or impressions","Bounce rate"],a:2},
    {q:"What is brand equity?",opts:["The cost to make a product","The value a brand adds beyond the product's physical attributes","A company's total revenue","A marketing budget"],a:1},
    {q:"A conversion in digital marketing is when:",opts:["A brand changes its name","A user takes a desired action such as buying or signing up","A type of advertisement loads","A social media follower comments"],a:1},
    {q:"B2B marketing differs from B2C because:",opts:["They are the same","B2B sells to other businesses while B2C sells directly to consumers","B2C uses more advertising always","B2B only uses online channels"],a:1},
    {q:"What is content marketing?",opts:["Paying for advertisements","Creating valuable content to attract and engage a target audience","Sending promotional emails only","Managing a store inventory"],a:1},
    {q:"A/B testing in marketing means:",opts:["Comparing two different products","Testing two versions of content to see which performs better","A type of market research survey","Annual Budget testing"],a:1},
  ],
  entrepreneurship:[
    {q:"What is a business model?",opts:["A store layout diagram","A plan for how a business will make money","A legal company document","A marketing strategy"],a:1},
    {q:"Venture capital is:",opts:["A personal savings account","Funding for startups in exchange for equity","A government small business grant","A bank loan"],a:1},
    {q:"What does scaling a business mean?",opts:["Reducing costs by firing employees","Growing revenue without proportionally increasing costs","Moving to a smaller location","Changing products"],a:1},
    {q:"The biggest financial risk of starting a business is:",opts:["Hiring too many employees","Losing invested money if the business fails","Having too many customers","Growing too fast"],a:1},
    {q:"A minimum viable product is:",opts:["The most expensive version","The simplest version that can be tested with real customers","A government-approved product","A product that already succeeded"],a:1},
    {q:"Bootstrapping a business means:",opts:["Hiring a large team immediately","Starting and growing with personal funds rather than outside investment","A type of marketing strategy","Taking a large bank loan"],a:1},
    {q:"A pivot in the startup world means:",opts:["A dance move at a company party","A fundamental change in business strategy when the original approach is not working","Expanding to a new market","Changing the company name"],a:1},
    {q:"What is equity in a startup context?",opts:["Total revenue earned","Ownership share in the company","The company bank balance","A type of business loan"],a:1},
    {q:"What is a competitive advantage?",opts:["Having the lowest price always","Something that allows a business to outperform competitors in a sustainable way","Spending more on advertising","Hiring more employees"],a:1},
    {q:"A burn rate describes:",opts:["How fast a product sells","The rate at which a startup spends its cash reserves","A marketing expense metric","Revenue growth speed"],a:1},
  ],
  realestate:[
    {q:"A home is $300,000 with 10% down payment. How much is the down payment?",opts:["$3,000","$30,000","$300","$10,000"],a:1},
    {q:"What does a home appraisal determine?",opts:["How much the seller wants","Estimated market value of a property","Monthly mortgage payment","Property tax amount"],a:1},
    {q:"Which factor most directly affects mortgage interest rates offered to a buyer?",opts:["Color of the house","Buyer credit score","Size of the backyard","Age of the neighborhood"],a:1},
    {q:"Home equity is:",opts:["Mortgage balance remaining","Difference between home value and what is still owed","Monthly payment amount","Property tax rate"],a:1},
    {q:"A landlord-tenant agreement is also called a:",opts:["Deed","Mortgage","Lease","Appraisal"],a:2},
    {q:"A buyer market in real estate means:",opts:["Sellers have all the power","Supply exceeds demand giving buyers more negotiating power","Prices are at their highest","A market only for first-time buyers"],a:1},
    {q:"Closing costs refer to:",opts:["The last mortgage payment","Fees paid at the finalization of a real estate transaction","The cost of home repairs","Moving expenses"],a:1},
    {q:"Title insurance protects the buyer against:",opts:["Physical home damage","Legal disputes over property ownership","Mortgage payment loss if unemployed","The realtor commission"],a:1},
    {q:"What does ROI mean for a rental property?",opts:["Rate of Insurance","The percentage return on the money invested in the property","Rental Obligation Index","Revenue on Investment only"],a:1},
    {q:"Amortization in a mortgage means:",opts:["Paying off a loan in a lump sum","Gradually paying off a loan through scheduled payments covering principal and interest","A type of property tax","Refinancing a loan"],a:1},
  ],
  hr:[
    {q:"Which law prohibits employment discrimination based on race, sex, or religion?",opts:["Fair Labor Standards Act","Title VII of the Civil Rights Act","Family and Medical Leave Act","Americans with Disabilities Act"],a:1},
    {q:"The purpose of a performance review is to:",opts:["Determine whether to fire someone","Evaluate performance and set improvement goals","Calculate payroll","Update company policies"],a:1},
    {q:"Gross pay differs from net pay because:",opts:["They are the same","Gross is before deductions; net is take-home after deductions","Net pay is higher","Gross pay includes bonuses only"],a:1},
    {q:"FMLA stands for:",opts:["Federal Minimum Labor Act","Family and Medical Leave Act","Fair Market Labor Agreement","Federal Management Leadership Act"],a:1},
    {q:"An employee handbook outlines:",opts:["A personal journal","Company policies, expectations, and employee rights","A list of salaries","A guide for managers only"],a:1},
    {q:"At-will employment means:",opts:["Employees can only be fired for cause","Either party can end the relationship at any time for most reasons","Employees work volunteer hours","A government employment program"],a:1},
    {q:"The purpose of an exit interview is to:",opts:["Guilt employees into staying","Gather honest feedback from departing employees to improve the organization","Fulfill a legal requirement","Finalize payroll only"],a:1},
    {q:"Workers compensation covers:",opts:["Unemployment insurance","Medical expenses and lost wages for employees injured on the job","Health insurance premiums","Retirement contributions"],a:1},
    {q:"A non-compete agreement restricts employees from:",opts:["Competing in sports","Working for competitors for a period after leaving","Joining a union","Receiving a bonus"],a:1},
    {q:"Unconscious bias in the workplace refers to:",opts:["Deliberate discrimination","Automatic unintentional attitudes that affect decisions without awareness","A type of workplace policy","A legal violation always"],a:1},
  ],
  intlbusiness:[
    {q:"A U.S. company sells products to Japan. This is an example of:",opts:["Importing","Outsourcing","Exporting","Foreign direct investment"],a:2},
    {q:"What is a tariff?",opts:["A tax placed on imported goods","A type of trade agreement","A currency exchange fee","A business registration fee"],a:0},
    {q:"The World Trade Organization oversees:",opts:["United Nations budgets","International trade rules between countries","The International Monetary Fund","NATO military spending"],a:1},
    {q:"Currency exchange risk means:",opts:["The risk of shipping overseas","The risk that currency value changes reduce profit when converting money","The risk of language barriers","The risk of time zones"],a:1},
    {q:"Outsourcing means:",opts:["A company expanding into a new country","Hiring another company or workers in another country to perform tasks","A government trade restriction","A type of import tax"],a:1},
    {q:"A free trade agreement is:",opts:["Countries trading for free with no money involved","A treaty reducing or eliminating tariffs and trade barriers between countries","A government subsidy","A type of foreign policy"],a:1},
    {q:"Foreign direct investment is when:",opts:["Buying foreign currency","A company invests directly in business operations in another country","A type of tariff","A short-term stock purchase in foreign markets"],a:1},
    {q:"A trade surplus means:",opts:["Imports exceed exports","Exports exceed imports — more is sold internationally than purchased","A government budget surplus","A favorable tariff agreement"],a:1},
    {q:"Cultural intelligence in international business refers to:",opts:["IQ specific to international students","The ability to relate and work effectively across cultures","A type of language translation tool","A business certification"],a:1},
    {q:"A joint venture in international business involves:",opts:["Two competitors merging permanently","Two or more companies partnering on a specific project while remaining independent","A government-run business","A type of international loan"],a:1},
  ],
  cs:[
    {q:"What is the difference between hardware and software?",opts:["Hardware is code; software is physical","Hardware is physical; software is programs that run on it","They are the same","Hardware is for businesses only"],a:1},
    {q:"A loop in programming:",opts:["Ends a program","Repeats instructions until a condition is met","Stores data permanently","Connects to the internet"],a:1},
    {q:"A variable in coding is:",opts:["A type of virus","A storage container for a value that can change","A network connection","A type of operating system"],a:1},
    {q:"Binary code uses which two digits?",opts:["1 and 2","0 and 9","0 and 1","A and B"],a:2},
    {q:"Debugging means:",opts:["Writing code from scratch","Finding and fixing errors in a program","Deleting old programs","Speeding up a computer"],a:1},
    {q:"An API is:",opts:["A type of computer virus","A set of rules allowing different software applications to communicate","A programming language","A type of database"],a:1},
    {q:"Version control like Git is used to:",opts:["Speed up code execution","Track changes in code over time and allow collaboration","Encrypt programs","Test software"],a:1},
    {q:"Object-oriented programming organizes code into:",opts:["Lists of commands only","Reusable objects with properties and methods","Separate files for each feature","Sequential instructions only"],a:1},
    {q:"Recursion is:",opts:["A type of loop","A function that calls itself to solve a problem","A way to store data","A debugging technique"],a:1},
    {q:"A compiled language differs from an interpreted language because:",opts:["They work the same way","Compiled translates all code before running; interpreted translates line by line during execution","Compiled is always faster","Interpreted languages cannot make apps"],a:1},
  ],
  it:[
    {q:"An IP address is used to:",opts:["Store files","Uniquely identify a device on a network","Speed up internet","Encrypt data"],a:1},
    {q:"Which storage holds data permanently when the computer is off?",opts:["RAM","Cache","Hard drive or SSD","CPU"],a:2},
    {q:"LAN differs from WAN because:",opts:["LAN is always faster","LAN covers a small local area; WAN covers a larger geographic area","WAN is only for governments","They are the same"],a:1},
    {q:"HTTPS indicates a website is:",opts:["Free","Using an encrypted and more secure connection","Government-owned","Faster than HTTP"],a:1},
    {q:"Cloud storage means:",opts:["Saving files on your desktop","Storing data on remote servers accessed through the internet","A type of USB drive","Backup storage on a disc"],a:1},
    {q:"Virtualization in IT creates:",opts:["Better-looking websites","Virtual versions of hardware or software to run multiple systems on one machine","A type of internet connection","A backup strategy"],a:1},
    {q:"A router differs from a switch because:",opts:["They are identical","A router connects networks together; a switch connects devices within the same network","A switch is used for WiFi only","A router is only for homes"],a:1},
    {q:"RAID in data storage stands for:",opts:["Random Access Internal Drive","Redundant Array of Independent Disks for redundancy or speed","Remote Access Internet Device","Rapid Application Integration Drive"],a:1},
    {q:"A DNS server:",opts:["Stores files","Translates domain names into IP addresses","Is a type of firewall","Is a cloud backup service"],a:1},
    {q:"Bandwidth refers to:",opts:["The speed of a processor","The maximum amount of data that can be transmitted over a network in a given time","Storage capacity of a hard drive","Number of devices on a network"],a:1},
  ],
  cybersecurity:[
    {q:"Two-factor authentication requires:",opts:["Two different passwords","Two forms of identity verification to log in","A type of firewall","Logging in from two devices"],a:1},
    {q:"A ransomware attack:",opts:["Slows internet connection","Encrypts files and demands payment to restore access","Steals passwords silently","Deletes your OS"],a:1},
    {q:"Social engineering in cybersecurity means:",opts:["Using social media for marketing","Manipulating people psychologically to reveal confidential information","A type of antivirus","A network protocol"],a:1},
    {q:"Which password is strongest?",opts:["password123","JohnSmith1990","Xk!9mP#2vL@q","ABCDEFGH"],a:2},
    {q:"Encryption:",opts:["Deletes data","Converts data into coded format only authorized parties can read","Makes data load faster","Backs data up automatically"],a:1},
    {q:"A zero-day vulnerability is:",opts:["A system with no flaws","A software flaw unknown to the vendor exploited before a fix is available","A firewall rule","A type of antivirus scan"],a:1},
    {q:"The principle of least privilege means:",opts:["Giving all employees full access","Giving users only the minimum access needed to perform their job","A password policy","A type of encryption"],a:1},
    {q:"A DDoS attack works by:",opts:["Phishing for passwords","Overwhelming a server with traffic to make it unavailable","Stealing database records","Installing a keylogger"],a:1},
    {q:"Penetration testing involves:",opts:["Testing how far a cable reaches","Authorized simulated attacks to find vulnerabilities before malicious actors do","A type of firewall test","Testing network speed"],a:1},
    {q:"The CIA Triad in cybersecurity stands for:",opts:["Central Intelligence Agency","Confidentiality, Integrity, Availability — the three core principles of information security","Computer Internet Access","Control Identity Authentication"],a:1},
  ],
  engineering:[
    {q:"The engineering design process is:",opts:["Building as fast as possible","A systematic approach: define problem, design, build, test, and improve","Choosing cheapest materials","Writing a report about a product"],a:1},
    {q:"A civil engineer primarily designs:",opts:["Computer software","Infrastructure like roads, bridges, and buildings","Electronic circuits","Manufacturing machines"],a:1},
    {q:"Which material is generally strongest under compression?",opts:["Rubber","Concrete","Plastic","Foam"],a:1},
    {q:"A structural load refers to:",opts:["Weight of construction workers only","Any force applied to a structure it must support","Cost of building materials","Size of a building"],a:1},
    {q:"Safety factors in engineering design ensure:",opts:["Products are expensive","Designs handle more stress than expected without failing","Regulatory satisfaction only","Faster manufacturing"],a:1},
    {q:"A stress test in engineering determines:",opts:["Employee performance","How much force or pressure a material or structure can withstand before failing","A quality inspection type","Production speed"],a:1},
    {q:"Thermodynamics concerns:",opts:["The study of water flow","The relationship between heat, energy, and work","The design of bridges","Electrical circuit analysis"],a:1},
    {q:"A series circuit differs from a parallel circuit because:",opts:["They are the same","Series has one path for current; parallel has multiple paths","Parallel circuits always use more power","Series is only for AC power"],a:1},
    {q:"Torque measures:",opts:["Speed of rotation","Rotational force applied to an object","Electrical resistance","Pressure in a fluid system"],a:1},
    {q:"Engineering simulations are used to:",opts:["Replace physical testing entirely","Model and test how a design will perform before building it physically","Train engineers only","Replace CAD software"],a:1},
  ],
  datascience:[
    {q:"The main purpose of data analysis is to:",opts:["Collect as much data as possible","Find patterns and insights to help make better decisions","Store data securely","Design databases"],a:1},
    {q:"Charts and graphs help you:",opts:["Store data more efficiently","Visualize patterns hard to see in raw numbers","Delete unnecessary data","Encrypt sensitive information"],a:1},
    {q:"Big data refers to:",opts:["Metadata","Data too large or complex for traditional software to handle","Raw data","Structured data"],a:1},
    {q:"Correlation vs causation — what is the difference?",opts:["They mean the same","Correlation means two things are related; causation means one directly causes the other","Causation is weaker","Correlation only applies to science"],a:1},
    {q:"A dataset is:",opts:["A type of computer program","A collection of organized information used for analysis","A backup system","A type of database software"],a:1},
    {q:"Machine learning is:",opts:["Teaching people to use machines","A type of AI where systems learn from data to improve performance without being explicitly programmed","A programming language","A type of database"],a:1},
    {q:"Data cleaning involves:",opts:["Deleting all old data","Identifying and correcting errors, inconsistencies, and missing values in a dataset","A type of data encryption","Organizing files into folders"],a:1},
    {q:"Structured data differs from unstructured data because:",opts:["They are the same","Structured is organized in tables; unstructured includes text, images, video without a predefined format","Unstructured data is more accurate","Structured data cannot be analyzed"],a:1},
    {q:"Regression analysis is used for:",opts:["Predicting a categorical outcome","Examining relationships between variables to predict a continuous outcome","A type of data cleaning","Visualizing data in charts"],a:1},
    {q:"An outlier in a dataset is:",opts:["The most common value","A data point that differs significantly from the rest of the dataset","The average value","A type of chart"],a:1},
  ],
  nursing:[
    {q:"A blood pressure reading of 140/90 — which number is systolic?",opts:["90","140","Both equally","Neither"],a:1},
    {q:"HIPAA primarily protects:",opts:["Hospital insurance payments","Patient privacy and medical information","Nursing licensing standards","Hospital safety regulations"],a:1},
    {q:"The most important action before and after patient care is:",opts:["Documenting the visit","Hand washing to prevent infection","Checking insurance","Taking vital signs"],a:1},
    {q:"Triage in an emergency setting means:",opts:["Treating in order of arrival","Sorting and prioritizing patients by severity of condition","Sending to specialists","Recording medical history"],a:1},
    {q:"Intravenous (IV) delivers medication:",opts:["Through the mouth","Through the skin","Directly into a vein","Under the skin"],a:2},
    {q:"Normal adult respiratory rate at rest is:",opts:["4-8 breaths per minute","12-20 breaths per minute","25-35 breaths per minute","40-50 breaths per minute"],a:1},
    {q:"NPO in a medical setting means:",opts:["New Patient Order","Nothing by mouth — the patient should not eat or drink","Normal Patient Observation","Non-Prescription Option"],a:1},
    {q:"A nosocomial infection is:",opts:["A chronic illness","An infection acquired during a hospital stay","A type of vaccine reaction","An inherited condition"],a:1},
    {q:"Informed consent means:",opts:["A patient insurance form","A patient voluntary agreement to treatment after being informed of risks and alternatives","A hospital billing process","A doctor order form"],a:1},
    {q:"The Glasgow Coma Scale measures:",opts:["Pain levels","A patient level of consciousness based on eye, verbal, and motor responses","Blood pressure severity","Infection risk"],a:1},
  ],
  biology:[
    {q:"Which organelle is the powerhouse of the cell?",opts:["Nucleus","Ribosome","Mitochondria","Cell membrane"],a:2},
    {q:"Red blood cells primarily:",opts:["Fight infections","Carry oxygen through the bloodstream","Produce antibodies","Regulate body temperature"],a:1},
    {q:"Natural selection means:",opts:["Animals choosing their own mates","Traits that help survival are passed on more frequently","Humans breeding animals selectively","A random DNA change"],a:1},
    {q:"The cell membrane controls:",opts:["Energy production","What enters and exits the cell","Genetic information storage","Photosynthesis"],a:1},
    {q:"Sexual reproduction requires:",opts:["One parent","Binary fission","Two parents","No genetic material"],a:2},
    {q:"DNA differs from RNA because:",opts:["They are the same","DNA stores genetic information; RNA helps carry instructions from DNA to make proteins","RNA is found in the nucleus only","DNA is temporary; RNA is permanent"],a:1},
    {q:"An enzyme is:",opts:["A type of cell","A protein that speeds up chemical reactions in the body","A type of hormone","A structural component of cell walls"],a:1},
    {q:"Homeostasis is:",opts:["The process of cell division","The body ability to maintain a stable internal environment despite external changes","A type of immune response","The movement of cells"],a:1},
    {q:"A dominant gene:",opts:["Is always harmful","Is expressed even when only one copy is present","Requires two copies to show","Is the most common gene in a population"],a:1},
    {q:"Osmosis is the movement of:",opts:["Proteins across a membrane","Water through a semipermeable membrane from lower to higher solute concentration","Active transport of molecules","The process of cell division"],a:1},
  ],
  publichealth:[
    {q:"A pandemic differs from an epidemic because:",opts:["They are the same","An epidemic is local or regional; a pandemic is global","A pandemic is less serious","An epidemic only affects animals"],a:1},
    {q:"Contact tracing is used to:",opts:["Fine people who are sick","Identify and notify people who may have been exposed to an infection","Track hospital costs","Quarantine entire cities"],a:1},
    {q:"CDC stands for:",opts:["Center for Disease Control and Prevention","Central Department of Community Health","Committee for Disease Containment","Clinical Data and Compliance"],a:0},
    {q:"Herd immunity occurs when:",opts:["Everyone gets sick","Enough people are immune to slow or stop disease spread through the population","A vaccine is 100% effective","A disease disappears permanently"],a:1},
    {q:"A leading preventable cause of death in the United States is:",opts:["Car accidents","Smoking","Natural disasters","Food poisoning"],a:1},
    {q:"Primary prevention differs from secondary prevention because:",opts:["They are the same","Primary prevents disease before it occurs; secondary detects and treats it early","Secondary prevention is more important","Primary only applies to children"],a:1},
    {q:"A social determinant of health refers to:",opts:["A medical diagnosis","Conditions in which people are born, grow, live, and work that affect health outcomes","A type of medication","A public health law"],a:1},
    {q:"Epidemiology studies:",opts:["Individual patient care","The distribution and causes of diseases in populations","Hospital management","Drug development"],a:1},
    {q:"Quarantine is used to:",opts:["Punish sick people","Separate and restrict movement of people potentially exposed to disease to prevent spread","Treat illness","Enforce a hospital policy"],a:1},
    {q:"A health disparity is:",opts:["A difference in hospital quality","Preventable differences in health outcomes among different population groups","A type of disease","A medical error"],a:1},
  ],
  kinesiology:[
    {q:"Aerobic exercise differs from anaerobic exercise because:",opts:["Aerobic uses weights; anaerobic uses cardio","Aerobic uses oxygen for sustained activity; anaerobic is short bursts not relying on oxygen","They are the same","Aerobic is only for athletes"],a:1},
    {q:"A physical therapist helps people:",opts:["Plan workout routines for athletes only","Recover movement and reduce pain after injury or illness","Diagnose medical conditions","Prescribe medications"],a:1},
    {q:"VO2 max measures:",opts:["Maximum heart rate","Maximum amount of oxygen the body can use during intense exercise","Blood pressure during exercise","Muscle strength capacity"],a:1},
    {q:"RICE first aid stands for:",opts:["Run, Ice, Compress, Elevate","Rest, Ice, Compression, Elevation","Relax, Inject, Cool, Exercise","Rest, Ibuprofen, Compress, Elevate"],a:1},
    {q:"The skeletal system provides:",opts:["Blood pumping","Structure, organ protection, and movement capability","Food digestion","Electrical signal transmission"],a:1},
    {q:"Muscle hypertrophy is:",opts:["Muscle weakness","The increase in muscle size due to increased muscle fiber size from resistance training","Muscle inflammation","A type of muscle injury"],a:1},
    {q:"Proprioception is:",opts:["The sense of sight during exercise","The body ability to sense its position and movement in space","A type of muscle contraction","The measurement of flexibility"],a:1},
    {q:"A sports nutritionist primarily focuses on:",opts:["Designing workout plans","Optimizing an athlete diet to improve performance, recovery, and overall health","Treating sports injuries","Coaching athletic technique"],a:1},
    {q:"Fast-twitch muscle fibers differ from slow-twitch because:",opts:["They are the same","Fast-twitch are for quick powerful movements; slow-twitch are for endurance activities","Slow-twitch are stronger","Fast-twitch are used during rest"],a:1},
    {q:"Biomechanical analysis in sports is used for:",opts:["Measuring an athlete income","Studying the mechanics of movement to improve performance and reduce injury risk","A type of fitness test","Measuring muscle size"],a:1},
  ],
  envsci:[
    {q:"The greenhouse effect means:",opts:["Plants growing in a greenhouse","Trapping of heat in Earth atmosphere by gases like CO2 warming the planet","A type of solar energy","A farming technique"],a:1},
    {q:"The human activity most contributing to deforestation is:",opts:["Fishing","Agriculture and logging to clear land","Urban road construction","Water treatment"],a:1},
    {q:"Biodiversity refers to:",opts:["Study of plants only","Variety of living species in a given area or on Earth","A type of environmental law","Measurement of pollution levels"],a:1},
    {q:"Which is a nonrenewable energy source?",opts:["Solar power","Wind energy","Natural gas","Hydroelectric power"],a:2},
    {q:"Carbon neutral means:",opts:["Producing zero energy","Balancing carbon emissions with an equivalent amount removed from the atmosphere","Using only solar energy","Having no industrial production"],a:1},
    {q:"The nitrogen cycle describes:",opts:["The orbit of nitrogen in space","The process by which nitrogen moves through the atmosphere, soil, water, and living organisms","A type of chemical reaction","The study of nitrogen-based fuels"],a:1},
    {q:"Acid rain is caused by:",opts:["Heavy rainfall","Sulfur dioxide and nitrogen oxides from burning fossil fuels reacting with atmospheric moisture","Too much oxygen in the air","Volcanic eruptions only"],a:1},
    {q:"Eutrophication refers to:",opts:["A type of water purification","Excessive nutrient enrichment in water bodies causing algae overgrowth and oxygen depletion","A farming technique","A type of soil erosion"],a:1},
    {q:"A carbon footprint calculation measures:",opts:["A country wealth","Total greenhouse gas emissions produced by an individual, organization, or activity","Energy costs only","Air quality"],a:1},
    {q:"Environmental remediation is the process of:",opts:["Writing environmental laws","Cleaning up contaminated soil or water to reduce environmental and health risks","A type of conservation effort","Protecting endangered species"],a:1},
  ],
  psychology:[
    {q:"A psychologist differs from a psychiatrist because:",opts:["They are the same","A psychiatrist holds a medical degree and can prescribe medication; a psychologist typically cannot","Psychologists only work with children","Psychiatrists only treat severe illness"],a:1},
    {q:"Confirmation bias is:",opts:["A memory disorder","The tendency to favor information that confirms what you already believe","A fear of decisions","A learning disability"],a:1},
    {q:"Classical conditioning is:",opts:["Teaching through reward and punishment","Learning where a neutral stimulus becomes associated with an automatic response","A type of cognitive therapy","Memory training"],a:1},
    {q:"Nature vs. nurture refers to:",opts:["A debate about farming","The debate over whether behavior is shaped more by genetics or environment","A parenting philosophy","A psychological disorder"],a:1},
    {q:"Short-term memory differs from long-term memory because:",opts:["They store the same information","Short-term holds limited info briefly; long-term stores information for extended periods","Long-term memory is less reliable","Short-term memory lasts years"],a:1},
    {q:"Cognitive dissonance is:",opts:["A learning disability","Mental discomfort from holding conflicting beliefs or behaviors","A sleep disorder","A type of phobia"],a:1},
    {q:"Operant conditioning works through:",opts:["Association with a neutral stimulus","Consequences — behavior is strengthened by rewards or weakened by punishment","A type of memory technique","A therapeutic approach"],a:1},
    {q:"Intrinsic motivation differs from extrinsic motivation because:",opts:["They are the same","Intrinsic comes from internal desire; extrinsic comes from external rewards or pressure","Extrinsic is always more effective","Intrinsic motivation only applies to children"],a:1},
    {q:"A psychological defense mechanism is:",opts:["A physical response to stress","An unconscious strategy the mind uses to protect itself from anxiety or uncomfortable thoughts","A type of therapy","A conscious coping strategy"],a:1},
    {q:"A personality disorder differs from a mood disorder because:",opts:["They are the same","Personality disorders involve enduring behavior patterns; mood disorders primarily affect emotional states","Mood disorders are more serious","Personality disorders are temporary"],a:1},
  ],
  sociology:[
    {q:"A social institution is:",opts:["A government building","An established system meeting fundamental societal needs like family, education, or religion","A type of community center","A legal organization"],a:1},
    {q:"A folkway differs from a law because:",opts:["They are the same","A folkway is an informal social norm; a law is a formal rule with legal consequences","Folkways are written; laws are spoken","Laws are optional"],a:1},
    {q:"Upward social mobility means:",opts:["Moving to a new city","Moving to a higher social class through increased income, education, or status","Getting a promotion","A type of immigration"],a:1},
    {q:"Ethnocentrism means:",opts:["Cultural relativism","Multiculturalism","Judging another culture by your own culture standards","Assimilation"],a:2},
    {q:"The sociological imagination connects:",opts:["Creative thinking in social situations","Personal experiences to larger social and historical forces","A type of social media","Imagining a perfect society"],a:1},
    {q:"Primary groups differ from secondary groups because:",opts:["They are the same","Primary groups are small and personal like family; secondary groups are larger and less personal like coworkers","Secondary groups are more important","Primary groups are professional"],a:1},
    {q:"Deviance in sociology refers to:",opts:["A type of crime only","Behavior that violates social norms ranging from minor rule-breaking to serious crimes","Always the same as illegal behavior","Behavior that is always harmful"],a:1},
    {q:"Race differs from ethnicity because:",opts:["They mean the same thing","Race is typically based on physical characteristics; ethnicity refers to shared cultural heritage, language, and traditions","Ethnicity is determined by birth country only","Race is self-identified; ethnicity is assigned"],a:1},
    {q:"Social stratification refers to:",opts:["Population growth","The hierarchical arrangement of people in a society based on wealth, power, or status","A type of community event","Immigration patterns"],a:1},
    {q:"Socialization is:",opts:["Using social media","The process through which individuals learn the norms, values, and behaviors of their culture","A type of community service","A government program"],a:1},
  ],
  socialwork:[
    {q:"Self-determination in social work means:",opts:["Confidentiality","Respecting a client right to make their own decisions","Beneficence","Non-maleficence"],a:1},
    {q:"A needs assessment in social work is used to:",opts:["Review a budget","Identify the specific needs and resources of an individual or community","Conduct a background check","Evaluate performance"],a:1},
    {q:"The strengths-based approach focuses on:",opts:["What is wrong with a client situation","Identifying and building on a client existing strengths and resources","Providing financial assistance only","Placing clients in institutions"],a:1},
    {q:"Mandatory reporting laws require social workers to report:",opts:["All client conversations","Suspected abuse or neglect of children or vulnerable adults","Financial problems","Housing issues only"],a:1},
    {q:"Case management involves:",opts:["Managing a court case","Coordinating services and resources to meet a client needs over time","Filing paperwork only","Conducting group therapy"],a:1},
    {q:"The primary goal of crisis intervention is to:",opts:["Solve all long-term problems","Stabilize an individual in acute distress and connect them with support","Place clients in long-term care","Assess criminal behavior"],a:1},
    {q:"Trauma-informed care means:",opts:["Ignoring a client past experiences","Recognizing how trauma affects behavior and providing services that avoid re-traumatization","A type of psychological therapy","A medical treatment"],a:1},
    {q:"Macro social work practice addresses:",opts:["Individual therapy sessions","Systemic issues through policy, community organizing, and advocacy","Only financial assistance","Clinical assessments"],a:1},
    {q:"Cultural competence in social work is:",opts:["Speaking multiple languages","The ability to understand, respect, and effectively work with people from diverse cultural backgrounds","A type of training certification","Only relevant in international settings"],a:1},
    {q:"Advocacy differs from lobbying in social work because:",opts:["They are identical","Advocacy broadly supports client rights; lobbying specifically attempts to influence legislation","Lobbying is illegal for social workers","Advocacy only happens in court"],a:1},
  ],
  political:[
    {q:"Separation of powers prevents:",opts:["Laws from being passed easily","Any one branch from becoming too powerful","Government from making quick decisions","Reducing elected officials"],a:1},
    {q:"Gerrymandering is:",opts:["A type of election fraud","Manipulating electoral district boundaries to favor a particular party","A voting system used in primaries","A method of campaign financing"],a:1},
    {q:"The judicial branch:",opts:["Creates laws","Enforces laws","Interprets laws and determines if they are constitutional","Controls the military"],a:2},
    {q:"The Electoral College formally:",opts:["Nominates presidential candidates","Elects the President and Vice President based on state votes","Approves legislation","Confirms Supreme Court justices"],a:1},
    {q:"A primary election is used to:",opts:["Hold the main national election","Choose a party candidate to run in the general election","Vote on local government issues","Recall an elected official"],a:1},
    {q:"A republic differs from a direct democracy because:",opts:["They are the same","In a republic citizens elect representatives; in direct democracy citizens vote on laws themselves","Direct democracy is more common","A republic has no elections"],a:1},
    {q:"A filibuster is:",opts:["A type of tax bill","A tactic to delay legislation through prolonged debate","A presidential veto","A congressional vote count"],a:1},
    {q:"Checks and balances ensure:",opts:["The federal budget is balanced","Each branch of government can limit the power of the others","Voter identification is checked","Representation is balanced between states"],a:1},
    {q:"A political party platform is:",opts:["A stage at a political rally","A formal statement of the party beliefs, values, and policy positions","A list of candidates","A campaign financial report"],a:1},
    {q:"Foreign policy differs from domestic policy because:",opts:["They are the same","Foreign policy governs relationships with other countries; domestic policy addresses issues within the country","Domestic policy is more important","Foreign policy is set by Congress only"],a:1},
  ],
  criminal:[
    {q:"A felony differs from a misdemeanor because:",opts:["Location of crime","Felonies are more serious with harsher penalties; misdemeanors are less serious","Whether a weapon was used","The age of the offender"],a:1},
    {q:"Due process means:",opts:["The speed of a criminal trial","The legal requirement that government must respect all legal rights owed to a person","A type of plea bargain","The process of jury selection"],a:1},
    {q:"The exclusionary rule means:",opts:["Witnesses can be excluded","Evidence obtained illegally cannot be used in court","Media can be excluded from trials","A sentencing guideline applies"],a:1},
    {q:"Recidivism refers to:",opts:["A rehabilitation program","The tendency of a convicted criminal to reoffend after release","A type of prison sentence","A legal defense strategy"],a:1},
    {q:"Parole allows:",opts:["Permanent release of a prisoner","Early release under supervision with conditions that must be met","Sentence reduction in court","Transfer of prisoners between facilities"],a:1},
    {q:"Civil law differs from criminal law because:",opts:["They are the same","Civil law resolves disputes between individuals; criminal law addresses offenses against society","Criminal law only applies to violent crimes","Civil law is handled by police"],a:1},
    {q:"Mens rea refers to:",opts:["The physical act of a crime","The mental intent or guilty mind required to be convicted of most crimes","A type of plea","A sentencing factor"],a:1},
    {q:"The grand jury decides whether:",opts:["The defendant is guilty or innocent","There is enough evidence to formally charge someone with a serious crime","To sentence a defendant","To hear an appeal"],a:1},
    {q:"Restorative justice emphasizes:",opts:["Maximum punishment","Repairing harm and rehabilitating offenders through community involvement","Mandatory minimum sentencing","A type of prison program"],a:1},
    {q:"Chain of custody in criminal evidence is:",opts:["The order of command in a police department","The documented process of collecting, tracking, and preserving evidence to maintain its integrity","A type of arrest procedure","The order witnesses testify"],a:1},
  ],
  prelaw:[
    {q:"Civil law differs from criminal law because:",opts:["They are the same","Civil law resolves disputes between individuals; criminal law addresses offenses against society","Criminal law only applies to violent crimes","Civil law is handled by police"],a:1},
    {q:"A plaintiff is:",opts:["The person accused of a crime","The person who brings a lawsuit against another party","A witness in a trial","The judge assistant"],a:1},
    {q:"Beyond a reasonable doubt means:",opts:["The jury is somewhat sure","Evidence is so strong no reasonable person would question guilt","The defendant admitted guilt","A majority of jurors agree"],a:1},
    {q:"A deposition is:",opts:["A type of court verdict","Pre-trial testimony given under oath outside of court","A legal document filed with court","A written argument from an attorney"],a:1},
    {q:"The appeals process is used to:",opts:["Retry a case with a new jury","Review whether legal errors occurred in a lower court that affected the outcome","Increase a criminal sentence","Negotiate a plea deal"],a:1},
    {q:"Substantive law differs from procedural law because:",opts:["They are the same","Substantive law defines rights and obligations; procedural law outlines how cases are handled in court","Procedural law is more important","Substantive law only applies to criminal cases"],a:1},
    {q:"Habeas corpus is:",opts:["A type of legal document","The right of a person to challenge the lawfulness of their imprisonment before a court","A type of evidence","A plea bargain"],a:1},
    {q:"A felony differs from a tort because:",opts:["They are the same","A felony is a crime against society prosecuted by the government; a tort is a civil wrong between individuals","Torts are more serious","Felonies are handled in civil court"],a:1},
    {q:"Statutory law consists of:",opts:["Laws created by judges through court decisions","Laws written and enacted by legislative bodies like Congress","Unwritten cultural rules","Laws enforced by local governments only"],a:1},
    {q:"Legal precedent (stare decisis) means:",opts:["A type of legal document","Courts should follow decisions made in earlier similar cases","A type of plea bargain","A law passed by Congress"],a:1},
  ],
  finearts:[
    {q:"Chiaroscuro in visual art uses:",opts:["A type of sculpture","Strong contrasts between light and dark to give a sense of volume","Painting done outdoors","Abstract shapes"],a:1},
    {q:"Representational art differs from abstract art because:",opts:["No difference","Representational depicts recognizable subjects; abstract uses shapes without literal representation","Abstract art is always black and white","Representational art is older"],a:1},
    {q:"An artist statement is:",opts:["A price list for artworks","A written explanation of the artist intentions, process, and meaning behind their work","A biography of famous artists","A list of materials used"],a:1},
    {q:"Surrealism as an art movement emphasized:",opts:["Impressionism","Realism","Dreamlike irrational imagery","Cubism"],a:2},
    {q:"Medium in art refers to:",opts:["The size of a painting","The material or technique used to create a work of art","The subject matter","The artist style"],a:1},
    {q:"In color theory, hue, saturation, and value describe:",opts:["They all mean color","Hue is the color itself; saturation is its intensity; value is its lightness or darkness","Saturation is the same as hue","Value only applies to digital art"],a:1},
    {q:"Impasto is a painting technique where paint is:",opts:["Diluted with water","Applied thickly creating texture that stands out from the surface","Blended smoothly","Used only in watercolor"],a:1},
    {q:"The golden ratio in art is significant because:",opts:["It is a type of paint color","It is a mathematical ratio approximately 1.618 believed to create aesthetically pleasing proportions","It is the price of gold paint","It is a type of art movement"],a:1},
    {q:"A print differs from an original artwork because:",opts:["They are the same","An original is unique; a print is a copy reproduced from an original often in multiples","Prints are more valuable","Originals are always larger"],a:1},
    {q:"Negative space in composition is:",opts:["Dark colors in a painting","The empty or open space surrounding the main subject that helps define it","A mistake in a composition","Background color only"],a:1},
  ],
  graphicdesign:[
    {q:"Visual hierarchy in design means:",opts:["Using only one color","Arranging elements to guide the viewer eye to the most important information first","Making all elements the same size","A type of font choice"],a:1},
    {q:"Resolution in digital design measures:",opts:["Number of colors in an image","Amount of detail in an image measured in pixels per inch","File size of an image","Brightness of a screen"],a:1},
    {q:"RGB is used for screens while CMYK is used for:",opts:["They produce identical results","Print using ink","Higher quality images","Black and white only"],a:1},
    {q:"Whitespace in design:",opts:["Refers to white-colored backgrounds only","Empty space around elements that improves readability and visual clarity","Is a design mistake","Is only the background color"],a:1},
    {q:"A vector graphic can be scaled without losing quality because:",opts:["It is a high-quality photograph","It is made of mathematical paths rather than pixels","It is a type of animation","It has low resolution"],a:1},
    {q:"A grid system in graphic design is used to:",opts:["Create borders around elements","Provide a structural framework that organizes content and creates visual consistency","Select a color palette","Limit the number of fonts used"],a:1},
    {q:"Kerning in typography refers to:",opts:["The height of letters","The spacing adjustment between individual characters in text","The thickness of a font","The color of text"],a:1},
    {q:"A mockup in graphic design shows:",opts:["A rough pencil sketch","A realistic preview of how a design will look in its final context","A type of logo","A final printed product"],a:1},
    {q:"Bleed in print design means:",opts:["A printing error","Design elements that extend beyond the trim edge to ensure no white borders after cutting","A type of color effect","Using red ink"],a:1},
    {q:"Serif fonts differ from sans-serif fonts because:",opts:["They look the same","Serif fonts have small decorative strokes at letter ends; sans-serif fonts do not","Sans-serif is always more modern","Serif fonts are only for headlines"],a:1},
  ],
  photography:[
    {q:"Aperture in a camera controls:",opts:["Shutter speed","How much light enters through the lens","ISO sensitivity","Focal length"],a:1},
    {q:"The rule of thirds is:",opts:["Using three colors in every photo","A composition guideline dividing the frame into nine sections for more balanced images","Taking three photos of every subject","A lighting technique"],a:1},
    {q:"ISO in photography measures:",opts:["Speed of the shutter","Camera sensor sensitivity to light","Focal length of a lens","Aperture size"],a:1},
    {q:"Depth of field refers to:",opts:["Distance between camera and subject","Range of distance in a photo that appears acceptably sharp","Brightness of an image","Size of the camera sensor"],a:1},
    {q:"White balance in photography ensures:",opts:["Increased resolution","Colors appear accurate under different lighting conditions","Controlled exposure time","Reduced image noise"],a:1},
    {q:"The exposure triangle consists of:",opts:["A type of lens","The relationship between ISO, aperture, and shutter speed that controls exposure","A camera filter","A type of composition technique"],a:1},
    {q:"A RAW file compared to a JPEG:",opts:["RAW is lower quality","RAW contains unprocessed sensor data with more editing flexibility; JPEG is compressed and processed in camera","JPEG is larger in file size","RAW files cannot be edited"],a:1},
    {q:"Leading lines as a composition technique uses:",opts:["Lines that lead to the edge of a photo","Natural or man-made lines to guide the viewer eye toward the main subject","Horizontal lines only","Lines created in post-processing"],a:1},
    {q:"Focal length differs from zoom because:",opts:["They are the same","Focal length is a fixed property of a lens determining field of view; zoom refers to variable focal length lenses","Zoom is always better","Focal length only matters for portraits"],a:1},
    {q:"Post-processing in photography means:",opts:["Setting up for a photo shoot","Editing and adjusting photos after they are taken using software like Lightroom or Photoshop","Developing film in a darkroom only","A type of camera setting"],a:1},
  ],
  filmvideo:[
    {q:"A storyboard is used to:",opts:["Record audio","Visually plan a film shot by shot before production begins","Edit footage","Write the script"],a:1},
    {q:"The director of photography oversees:",opts:["The screenplay","The visual look including camera work and lighting","The budget","Directing the actors"],a:1},
    {q:"Pre-production differs from post-production because:",opts:["They are the same","Pre-production is planning before filming; post-production is editing and finishing after filming","Post-production happens before filming","Pre-production is only for big budgets"],a:1},
    {q:"Continuity in filmmaking means:",opts:["Using the same camera throughout","Ensuring visual consistency so details match between different shots of the same scene","A type of film genre","The speed of editing"],a:1},
    {q:"A foley artist:",opts:["Writes music for films","Creates and records sound effects to be added in post-production","Operates the camera","Designs costumes"],a:1},
    {q:"The 180-degree rule in filmmaking means:",opts:["A camera must rotate 180 degrees per scene","The camera should not cross an imaginary line between characters to maintain spatial consistency","Camera angle must change every 180 seconds","A rule about lighting angles"],a:1},
    {q:"Diegetic sound differs from non-diegetic sound because:",opts:["They are the same","Diegetic sound exists within the film world; non-diegetic is added for the audience only like a musical score","Non-diegetic is always better","Diegetic sound is only dialogue"],a:1},
    {q:"Color grading in post-production is:",opts:["Choosing the color of costumes","Adjusting and enhancing the color of footage to achieve a specific look or mood","A type of camera filter","Adding text overlays"],a:1},
    {q:"A cut in film editing is:",opts:["A mistake in the script","An instantaneous transition from one shot to another","A type of fade effect","Removing a scene entirely"],a:1},
    {q:"A documentary film documents:",opts:["A fictional narrative","Real events, people, or issues to inform or persuade","Only animated subjects","Only short films"],a:1},
  ],
  architecture:[
    {q:"Load-bearing walls support:",opts:["Decoration only","The weight of the structure above and cannot be removed","They separate rooms","They provide insulation"],a:1},
    {q:"Sustainable architecture prioritizes:",opts:["Using the most expensive materials","Designing buildings that minimize environmental impact and use resources efficiently","Making buildings as large as possible","Speed of construction"],a:1},
    {q:"A foundation transfers:",opts:["The roof weight only","The building load to the ground and provides stability","Insulation throughout the building","Interior wall support only"],a:1},
    {q:"Scale in architectural drawings refers to:",opts:["Height of a building","The proportional relationship between the drawing and the actual building size","Cost of materials","The building weight limit"],a:1},
    {q:"Passive solar design uses:",opts:["Solar panels only","The sun energy for heating and cooling without mechanical systems","A type of lighting system","Reflective windows only"],a:1},
    {q:"Form in architecture refers to aesthetic appearance while function refers to:",opts:["They are the same","How well the building serves its purpose","Only exterior design","Only floor plan layout"],a:1},
    {q:"A cantilever is:",opts:["A type of window","A structural element anchored at one end and projecting outward unsupported at the other end","A type of foundation","A decorative column"],a:1},
    {q:"Building codes exist to:",opts:["Limit creativity","Establish minimum standards for safety, health, and welfare in building construction","Control building costs","Determine architectural style"],a:1},
    {q:"Structural design differs from aesthetic design because:",opts:["They are the same","Structural design ensures safety and stability; aesthetic design focuses on visual appearance","Aesthetic is more important","Structural only applies to large buildings"],a:1},
    {q:"BIM (Building Information Modeling) is:",opts:["A type of construction material","A digital representation of a building physical and functional characteristics used for planning and management","A type of architectural style","A building measurement tool"],a:1},
  ],
  communications:[
    {q:"Verbal communication differs from nonverbal communication because:",opts:["No difference","Verbal uses spoken or written words; nonverbal uses body language, tone, and facial expressions","Nonverbal is less important","Verbal only refers to speeches"],a:1},
    {q:"Media literacy is the ability to:",opts:["Read quickly","Critically analyze, evaluate, and create media messages","Get a journalism degree","Read newspapers daily"],a:1},
    {q:"Framing in media communication refers to:",opts:["Putting a photo in a frame","How media presents information to shape the audience perception of an issue","A type of camera shot","A news broadcast format"],a:1},
    {q:"An op-ed is used to:",opts:["Report breaking news objectively","Express a personal opinion or argument on a topic","Announce a product","Summarize a TV show"],a:1},
    {q:"Active listening involves:",opts:["Listening to music while studying","Fully concentrating, understanding, and responding thoughtfully to a speaker","Listening without taking notes","Hearing without paying attention"],a:1},
    {q:"Synchronous communication differs from asynchronous because:",opts:["They are the same","Synchronous happens in real time; asynchronous allows participants to respond at different times","Asynchronous is always better","Synchronous only applies to phone calls"],a:1},
    {q:"A rhetorical appeal uses ethos, pathos, or logos to:",opts:["File a legal argument","Persuade an audience through credibility, emotion, or logic","Create an advertisement","Write a news story"],a:1},
    {q:"Gatekeeping in media is:",opts:["Physical security at a media building","The process by which editors and platforms select what information reaches the public","A type of censorship law","A social media algorithm"],a:1},
    {q:"Mass communication differs from interpersonal communication because:",opts:["They are the same","Mass communication reaches large audiences through media; interpersonal is direct communication between individuals","Interpersonal is more important","Mass communication is less effective"],a:1},
    {q:"Agenda-setting theory suggests that media:",opts:["Reports only biased news","Influences what topics the public considers important by giving them more coverage","Sets government policy","Controls political elections"],a:1},
  ],
  journalism:[
    {q:"The inverted pyramid structure in news writing means:",opts:["Starting with background information","Presenting the most important information first followed by supporting details","Writing stories chronologically","Using the longest paragraph first"],a:1},
    {q:"A primary source in journalism is:",opts:["The most popular news outlet","Direct firsthand information such as eyewitness accounts or original documents","A story published by a major newspaper","A summary of another article"],a:1},
    {q:"Libel is:",opts:["A type of news broadcast","A false published statement that damages someone reputation","A journalism award","A type of anonymous source"],a:1},
    {q:"Source diversity in journalism is important because:",opts:["It makes articles longer","It ensures multiple perspectives are represented and reduces bias","It is required by law","It increases advertisement revenue"],a:1},
    {q:"Hard news differs from feature stories because:",opts:["Hard news is longer","Hard news covers timely events; features explore topics in greater depth or human interest","Feature stories are more credible","Hard news is only about politics"],a:1},
    {q:"An editor in journalism:",opts:["Writes all the articles","Reviews, corrects, and improves reporters work before publication","Manages advertising sales","Conducts interviews"],a:1},
    {q:"Off the record in journalism means:",opts:["Information that is public","Information shared with a journalist that cannot be published or attributed to the source","A type of interview technique","A confidentiality agreement only"],a:1},
    {q:"Objective journalism differs from advocacy journalism because:",opts:["They are the same","Objective journalism aims for impartiality; advocacy journalism promotes a specific cause or viewpoint","Advocacy journalism is less credible always","Objective journalism is outdated"],a:1},
    {q:"A news embargo means:",opts:["A ban on all news coverage","An agreement to not publish information until a specified date or event","A type of press release","A government censorship order"],a:1},
    {q:"Citizen journalism is:",opts:["Journalism about government","News gathering and reporting done by ordinary people rather than professional journalists often through social media","A type of local news","Journalism about citizenship"],a:1},
  ],
  english:[
    {q:"A simile differs from a metaphor because:",opts:["They are the same","A simile compares using like or as; a metaphor makes the comparison directly without those words","Metaphors are more poetic","Similes are only used in poetry"],a:1},
    {q:"First person point of view means:",opts:["An unknown narrator tells the story","The story is told from a character perspective using I and me","Multiple characters narrate alternately","The narrator knows everything about all characters"],a:1},
    {q:"A counterargument in persuasive writing is used to:",opts:["Confuse the reader","Acknowledge an opposing viewpoint and then refute it strengthening your argument","End the essay","Introduce your main argument"],a:1},
    {q:"Denotation differs from connotation because:",opts:["They mean the same","Denotation is a word literal dictionary meaning; connotation is the emotional or cultural associations it carries","Connotation is more accurate","Denotation only applies to technical writing"],a:1},
    {q:"A round character in fiction is:",opts:["A character who appears in every scene","A complex fully developed character who changes or grows throughout the story","A character with no flaws","A character based on a real person"],a:1},
    {q:"Dramatic irony occurs when:",opts:["A character is overly dramatic","The audience knows something important that a character does not","A situation is simply coincidental","A character speaks too dramatically"],a:1},
    {q:"Theme differs from plot because:",opts:["They are the same","Plot is the sequence of events; theme is the underlying message or central idea","Theme is more important","Plot only applies to novels"],a:1},
    {q:"Stream of consciousness in writing:",opts:["Is a type of nature writing","Mimics the natural flow of a character thoughts without structure","Is a type of dialogue","Is written from an outside observer perspective"],a:1},
    {q:"A foil character:",opts:["Is a character who disappears","Contrasts with another character highlighting their qualities by comparison","Is always the villain","Narrates the story"],a:1},
    {q:"Showing in creative writing differs from telling because:",opts:["They are the same","Showing conveys meaning through action and detail; telling states information directly","Telling is always better","Showing only works in visual media"],a:1},
  ],
  pr:[
    {q:"The primary goal of public relations is to:",opts:["Sell products directly","Manage and shape the public perception of a person, company, or organization","Create advertisements","Handle customer complaints"],a:1},
    {q:"A press release is:",opts:["A recorded company statement","An official written statement distributed to media to announce newsworthy information","A type of paid advertisement","A social media post"],a:1},
    {q:"Crisis communication in PR involves:",opts:["Communicating only during slow periods","Managing and responding to a negative event to protect an organization reputation","Avoiding the media during problems","A type of press conference only"],a:1},
    {q:"PR differs from advertising because:",opts:["They are the same","PR earns media coverage organically; advertising is paid placement","Advertising is more credible","PR only uses social media"],a:1},
    {q:"A media kit is:",opts:["Camera equipment for journalists","A package of information about a company provided to media for coverage","A type of press release","A list of media contacts"],a:1},
    {q:"Spin in public relations means:",opts:["A positive term for accuracy","Presenting information in a way that favors one client sometimes at the expense of objectivity","A type of social media post","A crisis communication tool"],a:1},
    {q:"Proactive PR differs from reactive PR because:",opts:["They are the same","Proactive plans and creates positive coverage; reactive responds to events as they happen","Reactive is more effective","Proactive only applies to large companies"],a:1},
    {q:"Brand reputation management is:",opts:["Designing a logo","The ongoing process of monitoring and influencing how a brand is perceived by the public","A type of advertising campaign","Managing social media accounts only"],a:1},
    {q:"A spokesperson role in an organization is to:",opts:["Write all press releases","Officially represent and communicate on behalf of the organization to media and the public","Manage the PR budget","Create social media content only"],a:1},
    {q:"The PESO model in PR categorizes media into:",opts:["A financial model","Paid, Earned, Shared, and Owned channels","A social media strategy","A type of press release format"],a:1},
  ],
  digitalmedia:[
    {q:"SEO stands for:",opts:["Social Engagement Online","Search Engine Optimization — improving content to rank higher in search results","Software Engineering Operations","A type of digital advertisement"],a:1},
    {q:"Engagement rate on social media measures:",opts:["The number of followers","How actively an audience interacts with content through likes, comments, and shares","The number of posts per day","The cost of running ads"],a:1},
    {q:"A content strategy is:",opts:["A plan for office furniture","A plan for creating, publishing, and managing content to achieve specific goals","A type of social media profile","A list of hashtags"],a:1},
    {q:"Going viral means:",opts:["A computer getting a virus","Content spreading rapidly and widely across the internet","A live streaming event","A paid advertising campaign"],a:1},
    {q:"A podcast is:",opts:["A type of live TV show","A digital audio program available for streaming or download often released in episodes","A video-only platform","A type of blog"],a:1},
    {q:"Organic reach differs from paid reach because:",opts:["They are the same","Organic reach is unpaid earned through engagement; paid reach uses advertising to reach more people","Paid reach is always more effective","Organic reach only applies to large accounts"],a:1},
    {q:"Click-through rate (CTR) measures:",opts:["The number of people who see an ad","The percentage of people who click on a link or ad after seeing it","The cost of an advertisement","The number of shares a post receives"],a:1},
    {q:"UX design focuses on:",opts:["The visual appearance of a website","Designing digital products that provide meaningful and easy experiences for users","A type of coding language","Social media management"],a:1},
    {q:"A content management system (CMS) allows users to:",opts:["Track content in a spreadsheet","Create, manage, and publish digital content without coding","Use a type of social media platform","Send email marketing campaigns"],a:1},
    {q:"Influencer marketing involves:",opts:["Hiring celebrities for TV commercials","Partnering with individuals who have significant social media followings to promote products or services","A type of paid search advertising","Traditional word-of-mouth marketing"],a:1},
  ],
  education:[
    {q:"Formative assessment differs from summative assessment because:",opts:["They are the same","Formative is ongoing feedback during learning; summative evaluates at the end of a unit","Summative is given daily","Formative only applies to standardized tests"],a:1},
    {q:"Differentiated instruction means:",opts:["Teaching the same lesson to all students","Adjusting teaching methods and content to meet diverse individual student learning needs","Giving advanced students more homework","A type of classroom management"],a:1},
    {q:"An IEP provides:",opts:["A general curriculum for all students","A customized educational plan for students with disabilities outlining specific goals and accommodations","A gifted student program","A behavior contract"],a:1},
    {q:"Bloom Taxonomy provides a framework for:",opts:["Classifying plant species","Categorizing levels of cognitive thinking from basic recall to complex creation","A grading scale","A classroom behavior system"],a:1},
    {q:"Project-based learning means:",opts:["Assigning textbook chapters only","Students learn by actively working on real-world projects over an extended period","A type of standardized test","Watching educational videos"],a:1},
    {q:"The hidden curriculum refers to:",opts:["Secret courses taught after school","Implicit lessons about values, norms, and behaviors students learn through the school environment beyond formal content","A type of special education program","The core academic curriculum"],a:1},
    {q:"Intrinsic motivation in students differs from extrinsic motivation because:",opts:["They are the same","Intrinsic motivation comes from internal interest; extrinsic comes from external rewards like grades","Extrinsic is always more effective","Intrinsic motivation only works for advanced students"],a:1},
    {q:"Scaffolding in education means:",opts:["Building a physical structure","Providing temporary support to students as they learn new concepts gradually removing it as they gain independence","A type of assessment","A classroom arrangement"],a:1},
    {q:"Culturally responsive teaching connects content to:",opts:["Teaching only one culture history","Students cultural backgrounds, experiences, and perspectives","A multicultural holiday celebration","A type of language instruction only"],a:1},
    {q:"A rubric is used to:",opts:["Administer a test","Clearly describe criteria and levels of performance for an assignment","Manage classroom behavior","Write a lesson plan"],a:1},
  ],
  earlychildhood:[
    {q:"Parallel play means:",opts:["Children playing the same game together","Young children playing near each other but independently without direct interaction","Children taking turns","A structured group activity"],a:1},
    {q:"The zone of proximal development (ZPD) is:",opts:["A classroom seating arrangement","The range of tasks a child can do with guidance but not yet independently — Vygotsky concept","A physical play area","A reading level assessment"],a:1},
    {q:"Attachment theory suggests:",opts:["Children learn best alone","Strong emotional bonds with caregivers in early childhood form the foundation for healthy development","Play is not important for learning","Children develop at the same rate"],a:1},
    {q:"A developmental milestone is:",opts:["A school grade level","A marker of typical skills and behaviors expected at certain ages in a child development","A standardized test score","A parenting technique"],a:1},
    {q:"Cooperative play with peers is most important for young children development because:",opts:["Solitary play is better","It develops social skills like sharing, negotiating, and collaborating","Watching educational programs is equally effective","Individual academic work is more valuable"],a:1},
    {q:"Gross motor skills differ from fine motor skills because:",opts:["They are the same","Gross motor involves large muscle movements like running; fine motor involves small precise movements like writing","Fine motor develops first","Gross motor only applies to sports"],a:1},
    {q:"Scaffolding in early childhood education means:",opts:["Building a physical structure","Providing temporary support to help children learn new skills gradually removing it as they gain independence","A type of playground equipment","A room arrangement strategy"],a:1},
    {q:"Child-directed play means:",opts:["Play directed by teachers","Play where the child chooses the activity and leads the experience promoting autonomy and creativity","A type of structured game","Screen time selected by the child"],a:1},
    {q:"Authoritative parenting differs from authoritarian parenting because:",opts:["They are the same","Authoritative is warm with clear boundaries; authoritarian is strict with little warmth or explanation","Authoritarian is more effective","Authoritative only works for older children"],a:1},
    {q:"Emergent literacy refers to:",opts:["Learning to read in kindergarten only","Knowledge and skills related to reading and writing that develop before formal instruction starting in infancy","A type of reading program","A standardized reading test"],a:1},
  ],
  sportsmanagement:[
    {q:"NIL rights for athletes refers to:",opts:["National Insurance for League players","The right for athletes to profit from their Name, Image, and Likeness","A type of sports contract","A league negotiating rules"],a:1},
    {q:"A salary cap in professional sports is:",opts:["The minimum wage for athletes","A limit on total team spending on player salaries to maintain competitive balance","A player maximum bonus","The cost of stadium operations"],a:1},
    {q:"A sports agent primarily:",opts:["Coaches athletes during games","Negotiates contracts and manages business relationships on behalf of athletes","Manages team finances","Scouts new players"],a:1},
    {q:"Sports analytics is used to:",opts:["Count game attendance only","Analyze data to improve player performance, team strategy, and business decisions","Design team uniforms","Manage ticket sales"],a:1},
    {q:"A collective bargaining agreement in sports is:",opts:["Used to set ticket prices","A negotiated contract between players union and owners covering salaries, benefits, and working conditions","Used to schedule games","Used to establish fan rules"],a:1},
    {q:"A league differs from a franchise in professional sports because:",opts:["They are the same","A league is the overall organization governing multiple teams; a franchise is a specific team within that league","A franchise is more powerful than a league","A league is only for amateur sports"],a:1},
    {q:"A title sponsor in sports:",opts:["Is the team main coach","A company that pays for naming rights to an event or venue in exchange for major advertising exposure","Is a government sports grant","Is the team owner"],a:1},
    {q:"Revenue sharing in professional sports leagues means:",opts:["Players sharing their salaries","Distributing a portion of league revenues among all teams to promote competitive balance","Fans sharing the cost of tickets","A type of merchandise deal"],a:1},
    {q:"A general manager role in a sports team involves:",opts:["Coaching the team on the field","Overseeing team operations including player personnel decisions, contracts, and roster management","Managing stadium operations","Handling media relations"],a:1},
    {q:"Sports facility management involves:",opts:["Playing sports in a facility","Overseeing the operations, maintenance, and events at sports venues to ensure safety and profitability","Designing sports uniforms","Scheduling game broadcasts"],a:1},
  ],
  eventmanagement:[
    {q:"A run of show document is:",opts:["A post-event report","A detailed timeline listing every element of an event in sequence","A vendor contract","A budget summary"],a:1},
    {q:"During vendor negotiation an event planner:",opts:["Sets up chairs and tables","Discusses and agrees on services, pricing, and contracts with suppliers","Sends invitations to guests","Creates the event program"],a:1},
    {q:"An event brief is:",opts:["A short summary sent to guests","A document outlining the goals, audience, budget, and key details of an event","A post-event review","A vendor invoice"],a:1},
    {q:"Contingency planning in event management means:",opts:["Planning for the best outcome","Preparing backup plans for problems that might occur like weather or technical issues","A type of event budget","Planning entertainment options"],a:1},
    {q:"ROI for an event organizer measures:",opts:["Range of Invitation","Whether the event achieved its goals relative to its cost","Rate of Involvement","Reach of Impact"],a:1},
    {q:"An RFP in event planning is:",opts:["A type of event contract","A Request for Proposal — a document sent to vendors asking them to submit bids for services","A type of event budget","A registration form"],a:1},
    {q:"An event goal differs from an event objective because:",opts:["They are the same","A goal is a broad desired outcome; an objective is a specific measurable step toward achieving that goal","Objectives are less important","Goals are only financial"],a:1},
    {q:"Stakeholder management in event planning means:",opts:["Managing ticket sales","Identifying and maintaining relationships with all parties who have an interest in the event success","Managing event staff","A type of budget management"],a:1},
    {q:"A force majeure clause in an event contract:",opts:["Is a fee for canceling events","Excuses parties from obligations due to extraordinary circumstances beyond their control","Is a type of payment plan","Is a venue requirement"],a:1},
    {q:"Post-event evaluation is used to:",opts:["Relive the event","Assess what worked, what did not, and how to improve future events using attendee feedback and data","Pay vendors","Update the event website"],a:1},
  ],
  hospitality:[
    {q:"RevPAR in hotel management means:",opts:["Revenue Per Available Room — a key measure of hotel financial performance","Rate of Variable Pricing and Revenue","A type of hotel rating","Revenue Per Annual Reservation"],a:0},
    {q:"A guest satisfaction survey is used to:",opts:["Sell additional services","Collect feedback that helps identify areas for improvement in guest experience","Verify billing information","Check guests out faster"],a:1},
    {q:"Overbooking in hospitality means:",opts:["Having too many staff scheduled","Accepting more reservations than capacity anticipating some cancellations","Charging guests too much","Booking the wrong type of room"],a:1},
    {q:"Upselling in a restaurant or hotel means:",opts:["Lowering prices to attract more customers","Encouraging customers to purchase a higher-value option or additional services","Offering refunds","Reducing menu options"],a:1},
    {q:"Front-of-house in a restaurant differs from back-of-house because:",opts:["Front is for managers; back is for staff","Front-of-house is customer-facing; back-of-house is the kitchen and operations area","They are the same","Front is indoor; back is outdoor"],a:1},
    {q:"A hotel occupancy rate measures:",opts:["The number of staff on duty","The percentage of available rooms that are occupied over a given period","The average daily room rate","The number of check-ins per day"],a:1},
    {q:"Mise en place in a professional kitchen means:",opts:["The dessert menu","Having everything in its place — the preparation and organization done before service begins","A French dish","A kitchen safety rule"],a:1},
    {q:"A standard operating procedure (SOP) in hospitality ensures:",opts:["A type of hotel contract","Consistent service quality through a documented step-by-step process across all staff interactions","A guest review system","A type of menu"],a:1},
    {q:"Yield management in hospitality is:",opts:["Managing crop yields in hotel gardens","A pricing strategy that adjusts rates based on demand to maximize revenue","A type of staff scheduling","A customer loyalty program"],a:1},
    {q:"A transient guest differs from a group guest because:",opts:["They are the same","Transient guests book individually; group guests book as part of an organized block for a shared purpose","Group guests pay less always","Transient guests stay longer"],a:1},
  ],
  generalstudies:[
    {q:"If you earn $2,500 per month and rent is $900, what percentage goes to rent?",opts:["27.5%","36%","45%","18%"],a:1},
    {q:"A need differs from a want because:",opts:["They are the same","A need is essential for survival or basic functioning; a want is desired but not essential","Wants cost more than needs","Needs are only physical items"],a:1},
    {q:"Living within your means means:",opts:["Earning as much as possible","Spending no more than you earn and avoiding unnecessary debt","Only buying sale items","Having a savings account"],a:1},
    {q:"A $500 credit card balance at 20% annual interest — how much interest after one year without payment?",opts:["$5","$50","$100","$200"],a:2},
    {q:"Compound interest matters because:",opts:["Interest is paid once a year and does not matter much","Interest is calculated on both the original amount and previously earned interest so it grows faster over time","It is a fixed fee charged by banks","It applies only to the original deposit"],a:1},
    {q:"A W-2 form shows:",opts:["A job application","Your annual wages and taxes withheld by an employer","A bank statement","A credit report"],a:1},
    {q:"An insurance deductible is:",opts:["A discount on your premium","The amount you pay out-of-pocket before insurance begins covering costs","A monthly insurance payment","A type of insurance penalty"],a:1},
    {q:"Gross pay differs from net pay because:",opts:["They are the same","Gross is total earnings before deductions; net is take-home pay after taxes and other deductions","Net pay is higher than gross pay","Gross pay only includes hourly wages"],a:1},
    {q:"An overdraft on a checking account means:",opts:["A type of savings account","You spent more than your account balance causing it to go negative","A bank fee for having too much money","A type of credit card"],a:1},
    {q:"A credit card differs from a debit card because:",opts:["They work exactly the same","A credit card lets you borrow money to pay back later; a debit card draws directly from your bank balance","Debit cards are for businesses only","Credit cards are always safer"],a:1},
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