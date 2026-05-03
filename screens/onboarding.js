// ============================================================
// CAPITAL HEIGHTS — onboarding.js
// Character → Category → Major → Finals (10 Qs) → Graduation
// Players always graduate — GPA reflects performance 2.0-4.0
// ============================================================

const OB_CHARACTERS = [
  { id:"char1", name:"Alex Rivera",    desc:"Business-minded and ambitious",   img:"assets/characters/white_man_1.png" },
  { id:"char2", name:"Jordan Lee",     desc:"Tech-savvy problem solver",        img:"assets/characters/black_woman_1.png" },
  { id:"char3", name:"Morgan Chen",    desc:"Creative and entrepreneurial",     img:null },
  { id:"char4", name:"Taylor Brooks",  desc:"Detail-oriented and analytical",   img:null },
  { id:"char5", name:"Casey Williams", desc:"People-focused team player",       img:null },
  { id:"char6", name:"Riley Johnson",  desc:"Strategic and goal-driven",        img:null },
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
    {q:"A company's revenue is $80,000 and expenses are $52,000. What is the profit?",opts:["$18,000","$132,000","$52,000","$28,000"],a:3},
    {q:"What does it mean when a business breaks even?",opts:["Revenue exactly equals expenses","It is growing rapidly in most circumstances","It is losing money in regulated industries","It owes back taxes when properly managed"],a:0},
    {q:"A manager delegates a task. This means the manager:",opts:["Cancels the task depending on the situation","Does the task alone under certain conditions","Assigns the task to someone else","Reports it to a supervisor"],a:2},
    {q:"Which describes the best customer service response to a complaint?",opts:["Offer a discount every time according to federal law","Resolve it quickly and make the customer feel valued","Respond only when required in most circumstances","Ignore minor ones depending on the situation"],a:1},
    {q:"What is gross profit?",opts:["Revenue minus cost of goods sold only","Net income after taxes based on company policy","Total assets minus liabilities","Revenue minus all expenses in most circumstances"],a:0},
    {q:"What does cash flow refer to?",opts:["Total company profit based on company policy","Annual revenue under certain conditions","The amount in a savings account based on company policy","The movement of money in and out of a business"],a:3},
    {q:"A sole proprietorship is:",opts:["A type of nonprofit when properly managed","A business owned and operated by one person","A government-owned business under certain conditions","A company with many shareholders according to federal law"],a:1},
    {q:"What is market share?",opts:["A business expense in most circumstances","The number of products a company makes if approved by management","The percentage of total sales a company holds in its industry","A type of stock depending on the situation"],a:2},
    {q:"Which is an example of a fixed cost?",opts:["Raw materials","Packaging costs that vary by unit","Monthly rent for office space","Sales commissions"],a:2},
    {q:"What is a business expense?",opts:["Money the business spends to operate","A type of savings in most circumstances","A customer complaint depending on the situation","Money the business earns if approved by management"],a:0},
  ],
  finance:[
    {q:"You deposit $1,000 at 5% annual interest. How much interest after one year?",opts:["$5","$50","$500","$150"],a:1},
    {q:"A stock is ownership; a bond is a loan to a company. Which is safer for most investors?",opts:["Stocks are always safer","They carry identical risk","Risk depends only on company size","Bonds are generally lower risk"],a:3},
    {q:"Which action most improves a low credit score over time?",opts:["Opening many new cards based on company policy","Spending more each month if approved by management","Paying bills consistently on time","Ignoring small debts when properly managed"],a:2},
    {q:"What does diversifying investments mean?",opts:["Spreading money across different investments to reduce risk","Only investing in real estate under certain conditions","Putting everything in the safest option depending on the situation","Trusting one company depending on the situation"],a:0},
    {q:"A 401k employer match means:",opts:["Government manages your retirement in regulated industries","You pay in and employer adds nothing based on company policy","Guaranteed 401% return in regulated industries","Employer contributes money based on your contribution"],a:3},
    {q:"What is liquidity?",opts:["The risk level of a stock based on company policy when applicable","How quickly an asset can be converted to cash without major loss","How profitable an investment is in regulated industries in regulated settings","The total value of investments when properly managed  based on context"],a:1},
    {q:"What is a mutual fund?",opts:["A pooled investment where many investors money is managed together","A personal retirement account based on company policy in regulated settings","A type of checking account in most circumstances when applicable","A government savings program if approved by management  based on context"],a:0},
    {q:"What is the time value of money?",opts:["Money only has value when invested depending on the situation when applicable","Inflation makes money worthless when properly managed in regulated settings","Money saved is worth less than money spent in most circumstances  based on context","A dollar today is worth more than a dollar in the future due to earning potential"],a:3},
    {q:"What is an emergency fund typically used for?",opts:["Investing in stocks based on company policy  based on context","Vacation savings under certain conditions as a general rule","Covering unexpected expenses without going into debt","A down payment only based on company policy in most cases"],a:2},
    {q:"Which best describes a bear market?",opts:["A market with no volatility according to federal law","Stock prices falling 20 percent or more over time","A market only for bonds based on company policy","Stock prices rising 20 percent or more in most circumstances"],a:1},
  ],
  accounting:[
    {q:"Assets = Liabilities + ___",opts:["Equity","Profit","Revenue","Expenses"],a:0},
    {q:"What does accounts receivable represent?",opts:["Money owed to suppliers in most circumstances","Savings account balance in regulated industries","Unpaid wages based on company policy","Money owed TO the business by customers"],a:3},
    {q:"Depreciation refers to:",opts:["A tax paid on profits if approved by management","An increase in asset value depending on the situation","Gradual decrease in an asset's value over time","A type of loan if approved by management"],a:2},
    {q:"What is the main purpose of an audit?",opts:["To fire underperforming employees depending on the situation","To independently verify financial records are accurate","To create a new budget in most circumstances","To calculate bonuses when properly managed"],a:1},
    {q:"Revenue is $90,000 and COGS is $55,000. What is gross profit?",opts:["$55,000","$35,000","$90,000","$145,000"],a:1},
    {q:"What is a liability?",opts:["A type of revenue when properly managed","An operating expense when properly managed","Something a business owes to others","Something a business owns when properly managed"],a:2},
    {q:"Cash basis accounting records transactions:",opts:["Only at year end","When earned or incurred regardless of payment","Only for large companies","When money actually changes hands"],a:3},
    {q:"What does COGS stand for?",opts:["Cost of Goods Sold","Cash on General Sale","Capital and Overhead General Summary","Company Operating Growth Statement"],a:0},
    {q:"A credit in double-entry bookkeeping increases liabilities and equity and:",opts:["Always increases all accounts","Always decreases all accounts","Decreases assets","Only applies to bank accounts"],a:2},
    {q:"What is working capital?",opts:["Total company revenue according to federal law","Current assets minus current liabilities","Long-term investments according to federal law","Annual operating budget under certain conditions"],a:1},
  ],
  economics:[
    {q:"If demand increases but supply stays the same, price typically:",opts:["Increases","Decreases","The product becomes free","Stays the same"],a:0},
    {q:"Which best describes a recession?",opts:["A government budget surplus in most circumstances","Temporary rise in inflation in regulated industries","Rapid economic growth when properly managed as a general rule","Significant economic decline with rising unemployment"],a:3},
    {q:"What does the Federal Reserve primarily control?",opts:["Tax rates when properly managed","The stock market according to federal law","Interest rates and the money supply","Government spending if approved by management"],a:2},
    {q:"Opportunity cost is best described as:",opts:["Total cost of a product if approved by management  based on context","What you give up when choosing one option over another","A government fee under certain conditions as a general rule","The price of inflation according to federal law in most cases"],a:1},
    {q:"Which is an example of a public good?",opts:["Street lighting","A private gym","A restaurant","A toll road"],a:0},
    {q:"What is a progressive tax?",opts:["Only businesses pay this tax if approved by management","A flat tax rate for everyone under certain conditions","Everyone pays the same dollar amount according to federal law","Higher earners pay a higher percentage of income"],a:3},
    {q:"What does monetary policy control?",opts:["Government spending and taxation depending on the situation","Corporate tax rates based on company policy","Import and export regulations depending on the situation","Money supply and interest rates managed by the central bank"],a:3},
    {q:"What is a trade deficit?",opts:["When imports exceed exports — more is bought than sold internationally","When exports exceed imports in regulated industries  based on context","A type of government debt in most circumstances as a general rule","A tariff on imported goods according to federal law in most cases"],a:0},
    {q:"Elasticity in economics refers to:",opts:["How flexible a business hours are if approved by management","The strength of a currency according to federal law","How sensitive demand or supply is to changes in price","Inflation rate sensitivity based on company policy"],a:2},
    {q:"Microeconomics focuses on individual decisions while macroeconomics focuses on:",opts:["Business strategy only if approved by management  based on context","Entire economies and broad factors like GDP and inflation","The same things based on company policy as a general rule","Government budgets only in most circumstances in most cases"],a:1},
  ],
  marketing:[
    {q:"A product launches with very low price to attract customers quickly. This is called:",opts:["Value pricing under standard conditions","Price skimming if circumstances allow","Penetration pricing","Discount bundling"],a:2},
    {q:"What does ROI stand for in marketing?",opts:["Return on Investment","Revenue Over Income","Reach of Influence","Rate of Inflation"],a:0},
    {q:"A unique selling proposition is:",opts:["The lowest price based on company policy depending on factors involved","A loyalty program in most circumstances under standard conditions","A type of advertisement in regulated industries if circumstances allow","What makes a product distinctly better than competitors"],a:3},
    {q:"Market segmentation means:",opts:["Advertising on multiple platforms under certain conditions","Dividing the market into groups with similar needs","Lowering prices for some customers in most circumstances","Selling the same product to everyone under certain conditions"],a:1},
    {q:"Which metric measures how many people saw an ad?",opts:["Click-through rate","Bounce rate in most cases","Conversion rate as a general rule","Reach or impressions"],a:3},
    {q:"What is brand equity?",opts:["The cost to make a product under certain conditions under standard conditions","The value a brand adds beyond the product's physical attributes","A marketing budget in most circumstances if circumstances allow","A company's total revenue according to federal law depending on factors involved"],a:1},
    {q:"A conversion in digital marketing is when:",opts:["A user takes a desired action such as buying or signing up","A type of advertisement loads in regulated industries if circumstances allow","A brand changes its name according to federal law depending on factors involved","A social media follower comments in most circumstances"],a:0},
    {q:"B2B marketing differs from B2C because:",opts:["B2C uses more advertising always when properly managed if circumstances allow","B2B only uses online channels based on company policy under standard conditions","B2B sells to other businesses while B2C sells directly to consumers","They are the same under certain conditions depending on factors involved"],a:2},
    {q:"What is content marketing?",opts:["Paying for advertisements under certain conditions when applicable","Creating valuable content to attract and engage a target audience","Managing a store inventory according to federal law in regulated settings","Sending promotional emails only according to federal law  based on context"],a:1},
    {q:"A/B testing in marketing means:",opts:["Annual Budget testing if approved by management when applicable","Comparing two different products in regulated industries","A type of market research survey in most circumstances  based on context","Testing two versions of content to see which performs better"],a:3},
  ],
  entrepreneurship:[
    {q:"What is a business model?",opts:["A plan for how a business will make money","A store layout diagram if approved by management","A legal company document if approved by management","A marketing strategy based on company policy"],a:0},
    {q:"Venture capital is:",opts:["A bank loan if approved by management","A government small business grant based on company policy","Funding for startups in exchange for equity","A personal savings account when properly managed"],a:2},
    {q:"What does scaling a business mean?",opts:["Reducing costs by firing employees in regulated industries","Changing products when properly managed","Moving to a smaller location based on company policy","Growing revenue without proportionally increasing costs"],a:3},
    {q:"The biggest financial risk of starting a business is:",opts:["Growing too fast based on company policy","Losing invested money if the business fails","Having too many customers depending on the situation","Hiring too many employees depending on the situation"],a:1},
    {q:"A minimum viable product is:",opts:["A product that already succeeded in most circumstances if circumstances allow","The most expensive version under certain conditions under standard conditions","The simplest version that can be tested with real customers","A government-approved product depending on the situation"],a:2},
    {q:"Bootstrapping a business means:",opts:["Starting and growing with personal funds rather than outside investment","A type of marketing strategy according to federal law  based on context","Hiring a large team immediately if approved by management as a general rule","Taking a large bank loan depending on the situation in most cases"],a:0},
    {q:"A pivot in the startup world means:",opts:["A dance move at a company party based on company policy  based on context","Changing the company name depending on the situation as a general rule","A fundamental change in business strategy when the original approach is not","Expanding to a new market under certain conditions in most cases"],a:2},
    {q:"What is equity in a startup context?",opts:["A type of business loan","The company bank balance","Total revenue earned when properly managed","Ownership share in the company"],a:3},
    {q:"What is a competitive advantage?",opts:["Something that allows a business to outperform competitors in a sustainable way","Having the lowest price always in regulated industries  based on context","Hiring more employees when properly managed as a general rule","Spending more on advertising based on company policy in most cases"],a:0},
    {q:"A burn rate describes:",opts:["Revenue growth speed according to federal law","The rate at which a startup spends its cash reserves","How fast a product sells if approved by management","A marketing expense metric depending on the situation"],a:1},
  ],
  realestate:[
    {q:"A home is $300,000 with 10% down payment. How much is the down payment?",opts:["$300","$10,000","$30,000","$3,000"],a:2},
    {q:"What does a home appraisal determine?",opts:["How much the seller wants if approved by management","Property tax amount when properly managed","Monthly mortgage payment in regulated industries","Estimated market value of a property"],a:3},
    {q:"Which factor most directly affects mortgage interest rates offered to a buyer?",opts:["Age of the neighborhood","Buyer credit score","Color of the house","Size of the backyard"],a:1},
    {q:"Home equity is:",opts:["Difference between home value and what is still owed","Mortgage balance remaining based on company policy","Monthly payment amount according to federal law depending on factors involved","Property tax rate according to federal law under standard conditions"],a:0},
    {q:"A landlord-tenant agreement is also called a:",opts:["Deed","Mortgage","Appraisal","Lease"],a:3},
    {q:"A buyer market in real estate means:",opts:["Supply exceeds demand giving buyers more negotiating power","Sellers have all the power depending on the situation","Prices are at their highest if approved by management","A market only for first-time buyers in regulated industries"],a:0},
    {q:"Closing costs refer to:",opts:["The cost of home repairs depending on the situation under standard conditions","Fees paid at the finalization of a real estate transaction","The last mortgage payment under certain conditions depending on factors involved","Moving expenses depending on the situation if circumstances allow"],a:1},
    {q:"Title insurance protects the buyer against:",opts:["Physical home damage according to federal law","The realtor commission when properly managed","Legal disputes over property ownership","Mortgage payment loss if unemployed"],a:2},
    {q:"What does ROI mean for a rental property?",opts:["The percentage return on the money invested in the property","Revenue on Investment only in most circumstances if circumstances allow","Rental Obligation Index in most circumstances depending on factors involved","Rate of Insurance if approved by management under standard conditions"],a:0},
    {q:"Amortization in a mortgage means:",opts:["A type of property tax in regulated industries under standard conditions","Gradually paying off a loan through scheduled payments covering principal and interest","Paying off a loan in a lump sum in most circumstances if circumstances allow","Refinancing a loan in regulated industries depending on factors involved"],a:1},
  ],
  hr:[
    {q:"Which law prohibits employment discrimination based on race, sex, or religion?",opts:["Americans with Disabilities Act","Family and Medical Leave Act","Title VII of the Civil Rights Act","Fair Labor Standards Act depending on the situation"],a:2},
    {q:"The purpose of a performance review is to:",opts:["Calculate payroll depending on the situation","Determine whether to fire someone according to federal law","Update company policies in most circumstances","Evaluate performance and set improvement goals"],a:3},
    {q:"Gross pay differs from net pay because:",opts:["They are the same when properly managed  based on context","Gross pay includes bonuses only when properly managed as a general rule","Gross is before deductions; net is take-home after deductions","Net pay is higher in most circumstances in most cases"],a:2},
    {q:"FMLA stands for:",opts:["Federal Minimum Labor Act","Family and Medical Leave Act","Federal Management Leadership Act","Fair Market Labor Agreement"],a:1},
    {q:"An employee handbook outlines:",opts:["Company policies, expectations, and employee rights","A guide for managers only in most circumstances","A list of salaries in most circumstances if circumstances allow","A personal journal in most circumstances depending on factors involved"],a:0},
    {q:"At-will employment means:",opts:["Employees work volunteer hours when properly managed  based on context","Employees can only be fired for cause based on company policy in most cases","A government employment program in most circumstances as a general rule","Either party can end the relationship at any time for most reasons"],a:3},
    {q:"The purpose of an exit interview is to:",opts:["Gather honest feedback from departing employees to improve the organization","Finalize payroll only depending on the situation under standard conditions","Guilt employees into staying under certain conditions if circumstances allow","Fulfill a legal requirement in regulated industries depending on factors involved"],a:0},
    {q:"Workers compensation covers:",opts:["Retirement contributions according to federal law  based on context","Unemployment insurance depending on the situation in most cases","Health insurance premiums if approved by management as a general rule","Medical expenses and lost wages for employees injured on the job"],a:3},
    {q:"A non-compete agreement restricts employees from:",opts:["Joining a union under certain conditions  based on context","Working for competitors for a period after leaving","Receiving a bonus in regulated industries as a general rule","Competing in sports based on company policy in most cases"],a:1},
    {q:"Unconscious bias in the workplace refers to:",opts:["A legal violation always depending on the situation when applicable","Deliberate discrimination in regulated industries in regulated settings","Automatic unintentional attitudes that affect decisions without awareness","A type of workplace policy if approved by management  based on context"],a:2},
  ],
  intlbusiness:[
    {q:"A U.S. company sells products to Japan. This is an example of:",opts:["Outsourcing","Foreign direct investment","Exporting","Importing"],a:2},
    {q:"What is a tariff?",opts:["A tax placed on imported goods","A currency exchange fee if circumstances allow","A type of trade agreement depending on factors involved","A business registration fee"],a:0},
    {q:"The World Trade Organization oversees:",opts:["The International Monetary Fund based on company policy","United Nations budgets according to federal law","NATO military spending if approved by management","International trade rules between countries"],a:3},
    {q:"Currency exchange risk means:",opts:["The risk of shipping overseas in regulated industries under standard conditions","The risk that currency value changes reduce profit when converting money","The risk of language barriers in most circumstances if circumstances allow","The risk of time zones under certain conditions depending on factors involved"],a:1},
    {q:"Outsourcing means:",opts:["A company expanding into a new country in most circumstances  based on context","Hiring another company or workers in another country to perform tasks","A type of import tax in most circumstances as a general rule","A government trade restriction in most circumstances in most cases"],a:1},
    {q:"A free trade agreement is:",opts:["A treaty reducing or eliminating tariffs and trade barriers between countries","A type of foreign policy when properly managed if circumstances allow","Countries trading for free with no money involved in most circumstances depending on factors involved","A government subsidy if approved by management under standard conditions"],a:0},
    {q:"Foreign direct investment is when:",opts:["A type of tariff based on company policy","Buying foreign currency in most circumstances","A company invests directly in business operations in another country","A short-term stock purchase in foreign markets in most circumstances"],a:2},
    {q:"A trade surplus means:",opts:["Imports exceed exports depending on the situation  based on context","A government budget surplus based on company policy in most cases","A favorable tariff agreement based on company policy as a general rule","Exports exceed imports — more is sold internationally than purchased"],a:3},
    {q:"Cultural intelligence in international business refers to:",opts:["The ability to relate and work effectively across cultures","A business certification depending on the situation","A type of language translation tool in regulated industries","IQ specific to international students in regulated industries"],a:0},
    {q:"A joint venture in international business involves:",opts:["Two competitors merging permanently depending on the situation under standard conditions","Two or more companies partnering on a specific project while remaining independent","A type of international loan depending on the situation depending on factors involved","A government-run business in regulated industries if circumstances allow"],a:1},
  ],
  cs:[
    {q:"What is the difference between hardware and software?",opts:["Hardware is code; software is physical according to federal law","Hardware is for businesses only according to federal law","Hardware is physical; software is programs that run on it","They are the same if approved by management"],a:2},
    {q:"A loop in programming:",opts:["Stores data permanently when properly managed","Ends a program if approved by management","Connects to the internet according to federal law","Repeats instructions until a condition is met"],a:3},
    {q:"A variable in coding is:",opts:["A type of operating system based on company policy","A storage container for a value that can change","A type of virus when properly managed","A network connection based on company policy"],a:1},
    {q:"Binary code uses which two digits?",opts:["1 and 2","0 and 9","0 and 1","A and B"],a:2},
    {q:"Debugging means:",opts:["Speeding up a computer in most circumstances","Deleting old programs depending on the situation","Writing code from scratch if approved by management","Finding and fixing errors in a program"],a:3},
    {q:"An API is:",opts:["A set of rules allowing different software applications to communicate","A type of computer virus if approved by management in regulated settings","A programming language when properly managed when applicable","A type of database based on company policy  based on context"],a:0},
    {q:"Version control like Git is used to:",opts:["Test software based on company policy depending on factors involved","Encrypt programs based on company policy under standard conditions","Speed up code execution if approved by management if circumstances allow","Track changes in code over time and allow collaboration"],a:3},
    {q:"Object-oriented programming organizes code into:",opts:["Sequential instructions only based on company policy","Separate files for each feature if approved by management","Reusable objects with properties and methods","Lists of commands only in most circumstances"],a:2},
    {q:"Recursion is:",opts:["A way to store data based on company policy","A function that calls itself to solve a problem","A debugging technique based on company policy","A type of loop based on company policy in most cases"],a:1},
    {q:"A compiled language differs from an interpreted language because:",opts:["Compiled translates all code before running; interpreted translates line by line during execution","They work the same way in most circumstances  based on context","Compiled is always faster if approved by management as a general rule","Interpreted languages cannot make apps when properly managed in most cases"],a:0},
  ],
  it:[
    {q:"An IP address is used to:",opts:["Encrypt data in regulated industries","Uniquely identify a device on a network","Speed up internet when properly managed","Store files in most circumstances"],a:1},
    {q:"Which storage holds data permanently when the computer is off?",opts:["Cache when applicable","RAM in regulated settings","CPU  based on context","Hard drive or SSD"],a:3},
    {q:"LAN differs from WAN because:",opts:["WAN is only for governments in most circumstances  based on context","They are the same in most circumstances as a general rule","LAN covers a small local area; WAN covers a larger geographic area","LAN is always faster according to federal law in most cases"],a:2},
    {q:"HTTPS indicates a website is:",opts:["Using an encrypted and more secure connection","Government-owned when properly managed  based on context","Faster than HTTP in regulated industries as a general rule","Free under certain conditions in most cases"],a:0},
    {q:"Cloud storage means:",opts:["Saving files on your desktop depending on the situation if circumstances allow","Backup storage on a disc in regulated industries under standard conditions","Storing data on remote servers accessed through the internet","A type of USB drive depending on the situation depending on factors involved"],a:2},
    {q:"Virtualization in IT creates:",opts:["Better-looking websites in most circumstances under standard conditions","Virtual versions of hardware or software to run multiple systems on one machine","A backup strategy depending on the situation depending on factors involved","A type of internet connection depending on the situation if circumstances allow"],a:1},
    {q:"A router differs from a switch because:",opts:["A router is only for homes in most circumstances when applicable","They are identical depending on the situation in regulated settings","A switch is used for WiFi only depending on the situation  based on context","A router connects networks together; a switch connects devices within the same"],a:3},
    {q:"RAID in data storage stands for:",opts:["Redundant Array of Independent Disks for redundancy or speed","Remote Access Internet Device depending on the situation","Random Access Internal Drive under certain conditions","Rapid Application Integration Drive depending on the situation"],a:0},
    {q:"A DNS server:",opts:["Translates domain names into IP addresses","Is a cloud backup service in regulated industries","Is a type of firewall in most circumstances","Stores files in most circumstances"],a:0},
    {q:"Bandwidth refers to:",opts:["The speed of a processor according to federal law depending on factors involved","Storage capacity of a hard drive when properly managed under standard conditions","Number of devices on a network in regulated industries if circumstances allow","The maximum amount of data that can be transmitted over a network in a given time"],a:3},
  ],
  cybersecurity:[
    {q:"Two-factor authentication requires:",opts:["Two different passwords according to federal law","A type of firewall depending on the situation","Requiring two separate forms of identity verification before granting access","Logging in from two devices when properly managed"],a:2},
    {q:"A ransomware attack:",opts:["Slows internet connection if approved by management","Encrypts files and demands payment to restore access","Steals passwords silently according to federal law","Deletes your OS if approved by management if circumstances allow"],a:1},
    {q:"Social engineering in cybersecurity means:",opts:["A type of antivirus depending on the situation under standard conditions","Manipulating people psychologically to reveal confidential information","A network protocol if approved by management depending on factors involved","Using social media for marketing based on company policy if circumstances allow"],a:1},
    {q:"Which password is strongest?",opts:["ABCDEFGH","password123","JohnSmith1990","Xk!9mP#2vL@q"],a:3},
    {q:"Encryption:",opts:["Backs data up automatically under certain conditions under standard conditions","Deletes data according to federal law if circumstances allow","Converts data into coded format only authorized parties can read","Makes data load faster depending on the situation depending on factors involved"],a:2},
    {q:"A zero-day vulnerability is:",opts:["A software flaw unknown to the vendor exploited before a fix is available","A firewall rule in most circumstances under standard conditions","A system with no flaws depending on the situation if circumstances allow","A type of antivirus scan when properly managed depending on factors involved"],a:0},
    {q:"The principle of least privilege means:",opts:["Giving users only the minimum access needed to perform their job","A type of encryption based on company policy under standard conditions","Giving all employees full access in most circumstances if circumstances allow","A password policy in most circumstances depending on factors involved"],a:0},
    {q:"A DDoS attack works by:",opts:["Phishing for passwords in most circumstances under standard conditions","Overwhelming a server with traffic to make it unavailable","Stealing database records depending on the situation if circumstances allow","Installing a keylogger when properly managed depending on factors involved"],a:1},
    {q:"Penetration testing involves:",opts:["A type of firewall test according to federal law  based on context","Testing how far a cable reaches when properly managed in most cases","Testing network speed if approved by management as a general rule","Authorized simulated attacks to find vulnerabilities before malicious"],a:3},
    {q:"The CIA Triad in cybersecurity stands for:",opts:["Central Intelligence Agency according to federal law when applicable","Computer Internet Access when properly managed in regulated settings","Confidentiality, Integrity, Availability — the three core principles of information security","Control Identity Authentication depending on the situation  based on context"],a:2},
  ],
  engineering:[
    {q:"The engineering design process is:",opts:["A systematic approach: define problem, design, build, test, and improve","Building as fast as possible depending on the situation under standard conditions","Choosing cheapest materials according to federal law if circumstances allow","Writing a report about a product when properly managed depending on factors involved"],a:0},
    {q:"A civil engineer primarily designs:",opts:["Electronic circuits according to federal law  based on context","Manufacturing machines in regulated industries","Computer software under certain conditions as a general rule","Infrastructure like roads, bridges, and buildings"],a:3},
    {q:"Which material is generally strongest under compression?",opts:["Rubber","Foam","Concrete","Plastic"],a:2},
    {q:"A structural load refers to:",opts:["Size of a building according to federal law","Any force applied to a structure it must support","Cost of building materials based on company policy","Weight of construction workers only according to federal law"],a:1},
    {q:"Safety factors in engineering design ensure:",opts:["Regulatory satisfaction only in most circumstances under standard conditions","Designs handle more stress than expected without failing","Products are expensive when properly managed if circumstances allow","Faster manufacturing in most circumstances depending on factors involved"],a:1},
    {q:"A stress test in engineering determines:",opts:["How much force or pressure a material or structure can withstand before failing","Production speed in regulated industries if circumstances allow","A quality inspection type when properly managed depending on factors involved","Employee performance under certain conditions under standard conditions"],a:0},
    {q:"Thermodynamics concerns:",opts:["The study of water flow in most circumstances","The design of bridges based on company policy","Electrical circuit analysis based on company policy","The relationship between heat, energy, and work"],a:3},
    {q:"A series circuit differs from a parallel circuit because:",opts:["They are the same depending on the situation","Series is only for AC power in most circumstances","Series has one path for current; parallel has multiple paths","Parallel circuits always use more power depending on the situation"],a:2},
    {q:"Torque measures:",opts:["Pressure in a fluid system if approved by management","Electrical resistance if approved by management","Speed of rotation in most circumstances","Rotational force applied to an object"],a:3},
    {q:"Engineering simulations are used to:",opts:["Replace CAD software in most circumstances if circumstances allow","Replace physical testing entirely according to federal law under standard conditions","Model and test how a design will perform before building it physically","Train engineers only when properly managed depending on factors involved"],a:2},
  ],
  datascience:[
    {q:"The main purpose of data analysis is to:",opts:["Design databases under certain conditions when applicable","Find patterns and insights to help make better decisions","Store data securely under certain conditions in regulated settings","Collect as much data as possible when properly managed"],a:1},
    {q:"Charts and graphs help you:",opts:["Visualize patterns hard to see in raw numbers","Store data more efficiently in regulated industries","Delete unnecessary data depending on the situation","Encrypt sensitive information under certain conditions"],a:0},
    {q:"Big data refers to:",opts:["Raw data in regulated industries depending on factors involved","Structured data according to federal law under standard conditions","Metadata according to federal law if circumstances allow","Data too large or complex for traditional software to handle"],a:3},
    {q:"Correlation vs causation — what is the difference?",opts:["Causation is weaker if approved by management when applicable","They mean the same under certain conditions in regulated settings","Correlation means two things are related; causation means one directly causes the other","Correlation only applies to science under certain conditions  based on context"],a:2},
    {q:"A dataset is:",opts:["A collection of organized information used for analysis","A type of database software if approved by management","A type of computer program when properly managed depending on factors involved","A backup system under certain conditions under standard conditions"],a:0},
    {q:"Machine learning is:",opts:["A type of database under certain conditions  based on context","A type of AI where systems learn from data to improve performance","A programming language in most circumstances as a general rule","Teaching people to use machines when properly managed in most cases"],a:1},
    {q:"Data cleaning involves:",opts:["Deleting all old data in most circumstances when applicable","A type of data encryption in regulated industries in regulated settings","Identifying and correcting errors, inconsistencies, and missing values in a dataset","Organizing files into folders in regulated industries  based on context"],a:2},
    {q:"Structured data differs from unstructured data because:",opts:["They are the same depending on the situation  based on context","Unstructured data is more accurate depending on the situation in most cases","Structured data cannot be analyzed if approved by management as a general rule","Structured is organized in tables; unstructured includes text, images, video"],a:3},
    {q:"Regression analysis is used for:",opts:["Visualizing data in charts in regulated industries when applicable","Examining relationships between variables to predict a continuous outcome","A type of data cleaning according to federal law in regulated settings","Predicting a categorical outcome if approved by management  based on context"],a:1},
    {q:"An outlier in a dataset is:",opts:["A data point that differs significantly from the rest of the dataset","The most common value in most circumstances  based on context","A type of chart depending on the situation as a general rule","The average value based on company policy in most cases"],a:0},
  ],
  nursing:[
    {q:"A blood pressure reading of 140/90 — which number is systolic?",opts:["Neither","140","Both equally","90"],a:1},
    {q:"HIPAA primarily protects:",opts:["Hospital safety regulations depending on the situation","Nursing licensing standards in most circumstances","Hospital insurance payments when properly managed","Patient privacy and medical information"],a:3},
    {q:"The most important action before and after patient care is:",opts:["Checking insurance if approved by management","Taking vital signs depending on the situation","Hand washing to prevent infection","Documenting the visit depending on the situation"],a:2},
    {q:"Triage in an emergency setting means:",opts:["Sorting and prioritizing patients by severity of condition","Treating in order of arrival when properly managed  based on context","Recording medical history according to federal law as a general rule","Sending to specialists depending on the situation in most cases"],a:0},
    {q:"Intravenous (IV) delivers medication:",opts:["Under the skin when applicable","Directly into a vein","Through the mouth","Through the skin"],a:1},
    {q:"Normal adult respiratory rate at rest is:",opts:["25-35 breaths per minute","4-8 breaths per minute","40-50 breaths per minute","12-20 breaths per minute"],a:3},
    {q:"NPO in a medical setting means:",opts:["Nothing by mouth — the patient should not eat or drink","Normal Patient Observation in regulated industries","Non-Prescription Option depending on the situation","New Patient Order if approved by management depending on factors involved"],a:0},
    {q:"A nosocomial infection is:",opts:["A chronic illness according to federal law","A type of vaccine reaction in most circumstances","An infection acquired during a hospital stay","An inherited condition according to federal law"],a:2},
    {q:"Informed consent means:",opts:["A hospital billing process when properly managed if circumstances allow","A doctor order form if approved by management under standard conditions","A patient voluntary agreement to treatment after being informed of risks and alternatives","A patient insurance form in most circumstances depending on factors involved"],a:2},
    {q:"The Glasgow Coma Scale measures:",opts:["A patient level of consciousness based on eye, verbal, and motor responses","Infection risk if approved by management if circumstances allow","Pain levels in most circumstances depending on factors involved","Blood pressure severity under certain conditions under standard conditions"],a:0},
  ],
  biology:[
    {q:"Which organelle is the powerhouse of the cell?",opts:["Cell membrane","Mitochondria","Ribosome","Nucleus"],a:1},
    {q:"Red blood cells primarily:",opts:["Fight infections depending on the situation","Produce antibodies depending on the situation","Regulate body temperature depending on the situation","Carry oxygen through the bloodstream"],a:3},
    {q:"Natural selection means:",opts:["Humans breeding animals selectively under certain conditions","A random DNA change in most circumstances","Animals choosing their own mates in most circumstances","Traits that help survival are passed on more frequently"],a:3},
    {q:"The cell membrane controls:",opts:["Genetic information storage","Photosynthesis if approved by management","What enters and exits the cell","Energy production depending on the situation"],a:2},
    {q:"Sexual reproduction requires:",opts:["No genetic material","Two parents","Binary fission","One parent"],a:1},
    {q:"DNA differs from RNA because:",opts:["DNA stores genetic information; RNA helps carry instructions from DNA to make proteins","They are the same in regulated industries in regulated settings","RNA is found in the nucleus only according to federal law when applicable","DNA is temporary; RNA is permanent depending on the situation  based on context"],a:0},
    {q:"An enzyme is:",opts:["A type of cell when properly managed","A structural component of cell walls in most circumstances","A type of hormone in most circumstances","A protein that speeds up chemical reactions in the body"],a:3},
    {q:"Homeostasis is:",opts:["A type of immune response under certain conditions under standard conditions","The body ability to maintain a stable internal environment despite external changes","The process of cell division under certain conditions if circumstances allow","The movement of cells according to federal law depending on factors involved"],a:1},
    {q:"A dominant gene:",opts:["Is expressed even when only one copy is present","Is the most common gene in a population","Requires two copies to show when properly managed","Is always harmful under certain conditions"],a:0},
    {q:"Osmosis is the movement of:",opts:["Proteins across a membrane in regulated industries under standard conditions","The process of cell division under certain conditions if circumstances allow","Water through a semipermeable membrane from lower to higher solute concentration","Active transport of molecules depending on the situation depending on factors involved"],a:2},
  ],
  publichealth:[
    {q:"A pandemic differs from an epidemic because:",opts:["They are the same when properly managed","A pandemic is less serious depending on the situation","An epidemic is local or regional; a pandemic is global","An epidemic only affects animals in regulated industries"],a:2},
    {q:"Contact tracing is used to:",opts:["Track hospital costs under certain conditions under standard conditions","Identify and notify people who may have been exposed to an infection","Quarantine entire cities depending on the situation depending on factors involved","Fine people who are sick when properly managed if circumstances allow"],a:1},
    {q:"CDC stands for:",opts:["Center for Disease Control and Prevention","Clinical Data and Compliance based on company policy","Central Department of Community Health","Committee for Disease Containment"],a:0},
    {q:"Herd immunity occurs when:",opts:["A vaccine is 100% effective in regulated industries depending on factors involved","A disease disappears permanently under certain conditions under standard conditions","Everyone gets sick under certain conditions if circumstances allow","Enough people are immune to slow or stop disease spread through the population"],a:3},
    {q:"A leading preventable cause of death in the United States is:",opts:["Natural disasters","Smoking","Food poisoning","Car accidents"],a:1},
    {q:"Primary prevention differs from secondary prevention because:",opts:["Secondary prevention is more important in regulated industries under standard conditions","They are the same based on company policy if circumstances allow","Primary only applies to children when properly managed depending on factors involved","Primary prevents disease before it occurs; secondary detects and treats it early"],a:3},
    {q:"A social determinant of health refers to:",opts:["Conditions in which people are born, grow, live, and work that affect health","A public health law based on company policy under standard conditions","A type of medication under certain conditions if circumstances allow","A medical diagnosis based on company policy depending on factors involved"],a:0},
    {q:"Epidemiology studies:",opts:["Hospital management when properly managed  based on context","Individual patient care when properly managed as a general rule","The distribution and causes of diseases in populations","Drug development in regulated industries in most cases"],a:2},
    {q:"Quarantine is used to:",opts:["Treat illness in regulated industries if circumstances allow","Enforce a hospital policy under certain conditions under standard conditions","Separate and restrict movement of people potentially exposed to disease to prevent spread","Punish sick people depending on the situation depending on factors involved"],a:2},
    {q:"A health disparity is:",opts:["A medical error when properly managed when applicable","A type of disease based on company policy in regulated settings","A difference in hospital quality in most circumstances  based on context","Preventable differences in health outcomes among different population groups"],a:3},
  ],
  kinesiology:[
    {q:"Aerobic exercise differs from anaerobic exercise because:",opts:["Aerobic is only for athletes in most circumstances under standard conditions","Aerobic uses oxygen for sustained activity; anaerobic is short bursts not relying on oxygen","They are the same in most circumstances depending on factors involved","Aerobic uses weights; anaerobic uses cardio when properly managed if circumstances allow"],a:1},
    {q:"A physical therapist helps people:",opts:["Recover movement and reduce pain after injury or illness","Diagnose medical conditions according to federal law","Prescribe medications when properly managed","Plan workout routines for athletes only according to federal law"],a:0},
    {q:"VO2 max measures:",opts:["Maximum amount of oxygen the body can use during intense exercise","Muscle strength capacity depending on the situation  based on context","Blood pressure during exercise depending on the situation as a general rule","Maximum heart rate if approved by management in most cases"],a:0},
    {q:"RICE first aid stands for:",opts:["Run, Ice, Compress, Elevate","Rest, Ibuprofen, Compress, Elevate","Relax, Inject, Cool, Exercise","Rest, Ice, Compression, Elevation"],a:3},
    {q:"The skeletal system provides:",opts:["Food digestion in regulated industries","Blood pumping in most circumstances","Structure, organ protection, and movement capability","Electrical signal transmission under certain conditions"],a:2},
    {q:"Muscle hypertrophy is:",opts:["Muscle inflammation under certain conditions under standard conditions","The increase in muscle size due to increased muscle fiber size from resistance training","A type of muscle injury in regulated industries if circumstances allow","Muscle weakness in most circumstances depending on factors involved"],a:1},
    {q:"Proprioception is:",opts:["The body ability to sense its position and movement in space","The sense of sight during exercise if approved by management","The measurement of flexibility in most circumstances","A type of muscle contraction depending on the situation"],a:0},
    {q:"A sports nutritionist primarily focuses on:",opts:["Treating sports injuries in regulated industries when applicable","Coaching athletic technique in most circumstances in regulated settings","Optimizing an athlete diet to improve performance, recovery, and overall health","Designing workout plans based on company policy  based on context"],a:2},
    {q:"Fast-twitch muscle fibers differ from slow-twitch because:",opts:["Slow-twitch are stronger in regulated industries when applicable","Fast-twitch are used during rest according to federal law in regulated settings","They are the same under certain conditions  based on context","Fast-twitch are for quick powerful movements; slow-twitch are for endurance activities"],a:3},
    {q:"Biomechanical analysis in sports is used for:",opts:["Measuring muscle size if approved by management under standard conditions","Studying the mechanics of movement to improve performance and reduce injury risk","Measuring an athlete income depending on the situation if circumstances allow","A type of fitness test according to federal law depending on factors involved"],a:1},
  ],
  envsci:[
    {q:"The greenhouse effect means:",opts:["A farming technique under certain conditions under standard conditions","Plants growing in a greenhouse in most circumstances if circumstances allow","A type of solar energy when properly managed depending on factors involved","Trapping of heat in Earth atmosphere by gases like CO2 warming the planet"],a:3},
    {q:"The human activity most contributing to deforestation is:",opts:["Agriculture and logging to clear land","Water treatment based on company policy","Urban road construction in most circumstances","Fishing when properly managed"],a:0},
    {q:"Biodiversity refers to:",opts:["Measurement of pollution levels when properly managed","Variety of living species in a given area or on Earth","A type of environmental law according to federal law","Study of plants only if approved by management"],a:1},
    {q:"Which is a nonrenewable energy source?",opts:["Hydroelectric power","Wind energy","Natural gas","Solar power"],a:2},
    {q:"Carbon neutral means:",opts:["Balancing carbon emissions with an equivalent amount removed from the atmosphere","Having no industrial production if approved by management if circumstances allow","Using only solar energy in regulated industries depending on factors involved","Producing zero energy according to federal law under standard conditions"],a:0},
    {q:"The nitrogen cycle describes:",opts:["A type of chemical reaction when properly managed  based on context","The process by which nitrogen moves through the atmosphere, soil, water,","The orbit of nitrogen in space when properly managed as a general rule","The study of nitrogen-based fuels when properly managed in most cases"],a:1},
    {q:"Acid rain is caused by:",opts:["Heavy rainfall based on company policy depending on factors involved","Too much oxygen in the air based on company policy under standard conditions","Volcanic eruptions only in most circumstances if circumstances allow","Sulfur dioxide and nitrogen oxides from burning fossil fuels reacting with atmospheric moisture"],a:3},
    {q:"Eutrophication refers to:",opts:["A type of water purification based on company policy when applicable","A farming technique when properly managed in regulated settings","Excessive nutrient enrichment in water bodies causing algae overgrowth","A type of soil erosion under certain conditions  based on context"],a:2},
    {q:"A carbon footprint calculation measures:",opts:["Energy costs only in regulated industries under standard conditions","A country wealth under certain conditions if circumstances allow","Total greenhouse gas emissions produced by an individual,","Air quality under certain conditions depending on factors involved"],a:2},
    {q:"Environmental remediation is the process of:",opts:["A type of conservation effort when properly managed  based on context","Cleaning up contaminated soil or water to reduce environmental and health risks","Protecting endangered species based on company policy as a general rule","Writing environmental laws in most circumstances in most cases"],a:1},
  ],
  psychology:[
    {q:"A psychologist differs from a psychiatrist because:",opts:["A psychiatrist holds a medical degree and can prescribe medication; a psychologist","They are the same under certain conditions  based on context","Psychologists only work with children according to federal law as a general rule","Psychiatrists only treat severe illness in regulated industries in most cases"],a:0},
    {q:"Confirmation bias is:",opts:["A learning disability under certain conditions  based on context","A fear of decisions according to federal law in most cases","A memory disorder if approved by management as a general rule","The tendency to favor information that confirms what you already believe"],a:3},
    {q:"Classical conditioning is:",opts:["Teaching through reward and punishment when properly managed under standard conditions","Learning where a neutral stimulus becomes associated with an automatic response","A type of cognitive therapy according to federal law depending on factors involved","Memory training based on company policy if circumstances allow"],a:1},
    {q:"Nature vs. nurture refers to:",opts:["The debate over whether behavior is shaped more by genetics or environment","A parenting philosophy according to federal law under standard conditions","A psychological disorder in most circumstances if circumstances allow","A debate about farming based on company policy depending on factors involved"],a:0},
    {q:"Short-term memory differs from long-term memory because:",opts:["Long-term memory is less reliable under certain conditions when applicable","They store the same information under certain conditions in regulated settings","Short-term memory lasts years based on company policy  based on context","Short-term holds limited info briefly; long-term stores information for extended"],a:3},
    {q:"Cognitive dissonance is:",opts:["A learning disability based on company policy if circumstances allow","A sleep disorder when properly managed under standard conditions","Mental discomfort from holding conflicting beliefs or behaviors","A type of phobia based on company policy depending on factors involved"],a:2},
    {q:"Operant conditioning works through:",opts:["A therapeutic approach in most circumstances when applicable","A type of memory technique according to federal law in regulated settings","Association with a neutral stimulus according to federal law  based on context","Consequences — behavior is strengthened by rewards or weakened by punishment"],a:3},
    {q:"Intrinsic motivation differs from extrinsic motivation because:",opts:["Intrinsic motivation only applies to children when properly managed  based on context","They are the same according to federal law as a general rule","Intrinsic comes from internal desire; extrinsic comes from external rewards or pressure","Extrinsic is always more effective according to federal law in most cases"],a:2},
    {q:"A psychological defense mechanism is:",opts:["A conscious coping strategy in regulated industries under standard conditions","An unconscious strategy the mind uses to protect itself from anxiety or uncomfortable thoughts","A type of therapy according to federal law if circumstances allow","A physical response to stress when properly managed depending on factors involved"],a:1},
    {q:"A personality disorder differs from a mood disorder because:",opts:["Personality disorders involve enduring behavior patterns; mood disorders primarily affect","Mood disorders are more serious in most circumstances if circumstances allow","They are the same depending on the situation depending on factors involved","Personality disorders are temporary under certain conditions under standard conditions"],a:0},
  ],
  sociology:[
    {q:"A social institution is:",opts:["A legal organization in most circumstances  based on context","A government building under certain conditions as a general rule","An established system meeting fundamental societal needs like family,","A type of community center if approved by management in most cases"],a:2},
    {q:"A folkway differs from a law because:",opts:["A folkway is an informal social norm; a law is a formal rule with legal consequences","Laws are optional under certain conditions  based on context","They are the same when properly managed as a general rule","Folkways are written; laws are spoken in regulated industries in most cases"],a:0},
    {q:"Upward social mobility means:",opts:["Getting a promotion according to federal law when applicable","A type of immigration based on company policy in regulated settings","Moving to a new city depending on the situation  based on context","Moving to a higher social class through increased income, education,"],a:3},
    {q:"Ethnocentrism means:",opts:["Assimilation when properly managed  based on context","Judging another culture by your own culture standards","Multiculturalism under certain conditions as a general rule","Cultural relativism according to federal law in most cases"],a:1},
    {q:"The sociological imagination connects:",opts:["A type of social media based on company policy","Creative thinking in social situations depending on the situation","Personal experiences to larger social and historical forces","Imagining a perfect society when properly managed"],a:2},
    {q:"Primary groups differ from secondary groups because:",opts:["They are the same when properly managed  based on context","Primary groups are professional according to federal law in most cases","Secondary groups are more important in most circumstances as a general rule","Primary groups are small and personal like family; secondary groups are larger"],a:3},
    {q:"Deviance in sociology refers to:",opts:["Behavior that is always harmful depending on the situation when applicable","Behavior that violates social norms ranging from minor rule-breaking to serious crimes","Always the same as illegal behavior based on company policy in regulated settings","A type of crime only under certain conditions  based on context"],a:1},
    {q:"Race differs from ethnicity because:",opts:["Race is typically based on physical characteristics; ethnicity refers to shared cultural","Ethnicity is determined by birth country only according to federal law  based on context","Race is self-identified; ethnicity is assigned depending on the situation as a general rule","They mean the same thing based on company policy in most cases"],a:0},
    {q:"Social stratification refers to:",opts:["A type of community event under certain conditions depending on factors involved","Population growth based on company policy under standard conditions","Immigration patterns when properly managed if circumstances allow","The hierarchical arrangement of people in a society based on wealth, power, or status"],a:3},
    {q:"Socialization is:",opts:["Using social media according to federal law when applicable","A type of community service depending on the situation in regulated settings","The process through which individuals learn the norms, values, and behaviors of their culture","A government program when properly managed  based on context"],a:2},
  ],
  socialwork:[
    {q:"Self-determination in social work means:",opts:["Confidentiality according to federal law under standard conditions","Respecting a client right to make their own decisions","Beneficence under certain conditions depending on factors involved","Non-maleficence if approved by management if circumstances allow"],a:1},
    {q:"A needs assessment in social work is used to:",opts:["Identify the specific needs and resources of an individual or community","Conduct a background check depending on the situation under standard conditions","Evaluate performance under certain conditions if circumstances allow","Review a budget when properly managed depending on factors involved"],a:0},
    {q:"The strengths-based approach focuses on:",opts:["What is wrong with a client situation in most circumstances when applicable","Placing clients in institutions if approved by management in regulated settings","Providing financial assistance only based on company policy  based on context","Identifying and building on a client existing strengths and resources"],a:3},
    {q:"Mandatory reporting laws require social workers to report:",opts:["Suspected abuse or neglect of children or vulnerable adults","Housing issues only if approved by management in regulated settings","Financial problems when properly managed when applicable","All client conversations based on company policy  based on context"],a:0},
    {q:"Case management involves:",opts:["Filing paperwork only if approved by management under standard conditions","Coordinating services and resources to meet a client needs over time","Managing a court case when properly managed if circumstances allow","Conducting group therapy in regulated industries depending on factors involved"],a:1},
    {q:"The primary goal of crisis intervention is to:",opts:["Place clients in long-term care in regulated industries if circumstances allow","Assess criminal behavior if approved by management under standard conditions","Stabilize an individual in acute distress and connect them with support","Solve all long-term problems in regulated industries depending on factors involved"],a:2},
    {q:"Trauma-informed care means:",opts:["Recognizing how trauma affects behavior and providing services that avoid re-traumatization","A medical treatment according to federal law if circumstances allow","A type of psychological therapy according to federal law depending on factors involved","Ignoring a client past experiences depending on the situation under standard conditions"],a:0},
    {q:"Macro social work practice addresses:",opts:["Individual therapy sessions in regulated industries under standard conditions","Clinical assessments in most circumstances if circumstances allow","Systemic issues through policy, community organizing, and advocacy","Only financial assistance if approved by management depending on factors involved"],a:2},
    {q:"Cultural competence in social work is:",opts:["Speaking multiple languages based on company policy under standard conditions","A type of training certification when properly managed if circumstances allow","Only relevant in international settings according to federal law depending on factors involved","The ability to understand, respect, and effectively work with people from diverse cultural backgrounds"],a:3},
    {q:"Advocacy differs from lobbying in social work because:",opts:["Lobbying is illegal for social workers depending on the situation under standard conditions","Advocacy broadly supports client rights; lobbying specifically attempts to influence legislation","Advocacy only happens in court when properly managed if circumstances allow","They are identical if approved by management depending on factors involved"],a:1},
  ],
  political:[
    {q:"Separation of powers prevents:",opts:["Laws from being passed easily when properly managed","Any one branch from becoming too powerful","Reducing elected officials in most circumstances","Government from making quick decisions"],a:1},
    {q:"Gerrymandering is:",opts:["A type of election fraud according to federal law under standard conditions","A voting system used in primaries if approved by management if circumstances allow","Manipulating electoral district boundaries to favor a particular party","A method of campaign financing under certain conditions depending on factors involved"],a:2},
    {q:"The judicial branch:",opts:["Creates laws depending on the situation under standard conditions","Enforces laws based on company policy if circumstances allow","Controls the military in most circumstances depending on factors involved","Interprets laws and determines if they are constitutional"],a:3},
    {q:"The Electoral College formally:",opts:["Elects the President and Vice President based on state votes","Approves legislation under certain conditions in regulated settings","Nominates presidential candidates according to federal law","Confirms Supreme Court justices in most circumstances  based on context"],a:0},
    {q:"A primary election is used to:",opts:["Choose a party candidate to run in the general election","Recall an elected official in most circumstances","Hold the main national election in most circumstances","Vote on local government issues depending on the situation"],a:0},
    {q:"A republic differs from a direct democracy because:",opts:["A republic has no elections according to federal law  based on context","They are the same under certain conditions as a general rule","In a republic citizens elect representatives; in direct democracy","Direct democracy is more common in regulated industries in most cases"],a:2},
    {q:"A filibuster is:",opts:["A type of tax bill when properly managed when applicable","A tactic to delay legislation through prolonged debate","A congressional vote count in most circumstances in regulated settings","A presidential veto in most circumstances  based on context"],a:1},
    {q:"Checks and balances ensure:",opts:["The federal budget is balanced in regulated industries","Voter identification is checked when properly managed","Representation is balanced between states under certain conditions","Each branch of government can limit the power of the others"],a:3},
    {q:"A political party platform is:",opts:["A list of candidates if approved by management  based on context","A stage at a political rally depending on the situation as a general rule","A formal statement of the party beliefs, values, and policy positions","A campaign financial report if approved by management in most cases"],a:2},
    {q:"Foreign policy differs from domestic policy because:",opts:["Foreign policy is set by Congress only in most circumstances  based on context","Foreign policy governs relationships with other countries; domestic policy","They are the same in regulated industries as a general rule","Domestic policy is more important if approved by management in most cases"],a:1},
  ],
  criminal:[
    {q:"A felony differs from a misdemeanor because:",opts:["Felonies are more serious with harsher penalties; misdemeanors are less serious","The age of the offender based on company policy if circumstances allow","Whether a weapon was used depending on the situation depending on factors involved","Location of crime based on company policy under standard conditions"],a:0},
    {q:"Due process means:",opts:["A type of plea bargain if approved by management depending on factors involved","The speed of a criminal trial in regulated industries under standard conditions","The process of jury selection based on company policy if circumstances allow","The legal requirement that government must respect all legal rights owed to a person"],a:3},
    {q:"The exclusionary rule means:",opts:["Witnesses can be excluded in most circumstances","Evidence obtained illegally cannot be used in court","Media can be excluded from trials according to federal law","A sentencing guideline applies in most circumstances"],a:1},
    {q:"Recidivism refers to:",opts:["The tendency of a convicted criminal to reoffend after release","A legal defense strategy based on company policy in regulated settings","A type of prison sentence under certain conditions when applicable","A rehabilitation program based on company policy  based on context"],a:0},
    {q:"Parole allows:",opts:["Transfer of prisoners between facilities under certain conditions","Sentence reduction in court when properly managed","Permanent release of a prisoner when properly managed","Early release under supervision with conditions that must be met"],a:3},
    {q:"Civil law differs from criminal law because:",opts:["Criminal law only applies to violent crimes depending on the situation under standard conditions","Civil law is handled by police in regulated industries if circumstances allow","Civil law resolves disputes between individuals; criminal law addresses offenses against society","They are the same when properly managed depending on factors involved"],a:2},
    {q:"Mens rea refers to:",opts:["The mental intent or guilty mind required to be convicted of most crimes","A type of plea depending on the situation in regulated settings","The physical act of a crime according to federal law when applicable","A sentencing factor according to federal law  based on context"],a:0},
    {q:"The grand jury decides whether:",opts:["To hear an appeal depending on the situation under standard conditions","There is enough evidence to formally charge someone with a serious crime","To sentence a defendant based on company policy depending on factors involved","The defendant is guilty or innocent under certain conditions if circumstances allow"],a:1},
    {q:"Restorative justice emphasizes:",opts:["A type of prison program based on company policy when applicable","Mandatory minimum sentencing according to federal law in regulated settings","Maximum punishment based on company policy  based on context","Repairing harm and rehabilitating offenders through community involvement"],a:3},
    {q:"Chain of custody in criminal evidence is:",opts:["The order of command in a police department in most circumstances under standard conditions","The order witnesses testify based on company policy if circumstances allow","The documented process of collecting, tracking, and preserving evidence to maintain its integrity","A type of arrest procedure in regulated industries depending on factors involved"],a:2},
  ],
  prelaw:[
    {q:"Civil law differs from criminal law because:",opts:["Civil law resolves disputes between individuals; criminal law addresses offenses against","They are the same in regulated industries in regulated settings","Civil law is handled by police depending on the situation when applicable","Criminal law only applies to violent crimes under certain conditions  based on context"],a:0},
    {q:"A plaintiff is:",opts:["A witness in a trial if approved by management","The person who brings a lawsuit against another party","The person accused of a crime based on company policy","The judge assistant in regulated industries"],a:1},
    {q:"Beyond a reasonable doubt means:",opts:["A majority of jurors agree depending on the situation  based on context","The jury is somewhat sure in regulated industries in most cases","The defendant admitted guilt in most circumstances as a general rule","Evidence is so strong no reasonable person would question guilt"],a:3},
    {q:"A deposition is:",opts:["A written argument from an attorney if approved by management","A type of court verdict under certain conditions","Pre-trial testimony given under oath outside of court","A legal document filed with court in regulated industries"],a:2},
    {q:"The appeals process is used to:",opts:["Negotiate a plea deal if approved by management if circumstances allow","Retry a case with a new jury in regulated industries under standard conditions","Review whether legal errors occurred in a lower court that affected the outcome","Increase a criminal sentence if approved by management depending on factors involved"],a:2},
    {q:"Substantive law differs from procedural law because:",opts:["Substantive law defines rights and obligations; procedural law outlines how cases are handled in court","They are the same when properly managed  based on context","Procedural law is more important in most circumstances as a general rule","Substantive law only applies to criminal cases in regulated industries in most cases"],a:0},
    {q:"Habeas corpus is:",opts:["A plea bargain according to federal law under standard conditions","The right of a person to challenge the lawfulness of their imprisonment before a court","A type of legal document based on company policy depending on factors involved","A type of evidence according to federal law if circumstances allow"],a:1},
    {q:"A felony differs from a tort because:",opts:["Torts are more serious in most circumstances when applicable","Felonies are handled in civil court according to federal law in regulated settings","They are the same in most circumstances  based on context","A felony is a crime against society prosecuted by the government; a tort is a civil"],a:3},
    {q:"Statutory law consists of:",opts:["Laws written and enacted by legislative bodies like Congress","Laws enforced by local governments only in regulated industries","Unwritten cultural rules if approved by management","Laws created by judges through court decisions depending on the situation"],a:0},
    {q:"Legal precedent (stare decisis) means:",opts:["A type of plea bargain under certain conditions depending on factors involved","A law passed by Congress when properly managed under standard conditions","A type of legal document in regulated industries if circumstances allow","Courts should follow decisions made in earlier similar cases"],a:3},
  ],
  finearts:[
    {q:"Chiaroscuro in visual art uses:",opts:["Painting done outdoors in regulated industries  based on context","Strong contrasts between light and dark to give a sense of volume","Abstract shapes if approved by management as a general rule","A type of sculpture if approved by management in most cases"],a:1},
    {q:"Representational art differs from abstract art because:",opts:["Abstract art is always black and white in most circumstances when applicable","No difference if approved by management in regulated settings","Representational depicts recognizable subjects; abstract uses shapes without","Representational art is older in most circumstances  based on context"],a:2},
    {q:"An artist statement is:",opts:["A price list for artworks in regulated industries under standard conditions","A biography of famous artists if approved by management if circumstances allow","A list of materials used when properly managed depending on factors involved","A written explanation of the artist intentions, process, and meaning behind their work"],a:3},
    {q:"Surrealism as an art movement emphasized:",opts:["Dreamlike irrational imagery","Impressionism when properly managed","Realism in regulated industries","Cubism in regulated industries"],a:0},
    {q:"Medium in art refers to:",opts:["The size of a painting if approved by management under standard conditions","The artist style if approved by management if circumstances allow","The material or technique used to create a work of art","The subject matter when properly managed depending on factors involved"],a:2},
    {q:"In color theory, hue, saturation, and value describe:",opts:["Value only applies to digital art in most circumstances  based on context","Hue is the color itself; saturation is its intensity; value is its lightness","Saturation is the same as hue according to federal law as a general rule","They all mean color under certain conditions in most cases"],a:1},
    {q:"Impasto is a painting technique where paint is:",opts:["Used only in watercolor in most circumstances when applicable","Diluted with water based on company policy in regulated settings","Blended smoothly according to federal law  based on context","Applied thickly creating texture that stands out from the surface"],a:3},
    {q:"The golden ratio in art is significant because:",opts:["It is the price of gold paint if approved by management when applicable","It is a mathematical ratio approximately 1.618 believed to create","It is a type of paint color in most circumstances in regulated settings","It is a type of art movement if approved by management  based on context"],a:1},
    {q:"A print differs from an original artwork because:",opts:["An original is unique; a print is a copy reproduced from an original often in multiples","Originals are always larger in most circumstances under standard conditions","Prints are more valuable if approved by management if circumstances allow","They are the same if approved by management depending on factors involved"],a:0},
    {q:"Negative space in composition is:",opts:["Background color only in regulated industries when applicable","A mistake in a composition in regulated industries in regulated settings","The empty or open space surrounding the main subject that helps define it","Dark colors in a painting based on company policy  based on context"],a:2},
  ],
  graphicdesign:[
    {q:"Visual hierarchy in design means:",opts:["A type of font choice when properly managed under standard conditions","Arranging elements to guide the viewer eye to the most important information first","Using only one color in most circumstances depending on factors involved","Making all elements the same size based on company policy if circumstances allow"],a:1},
    {q:"Resolution in digital design measures:",opts:["Number of colors in an image in regulated industries","File size of an image based on company policy in regulated settings","Brightness of a screen in regulated industries  based on context","Amount of detail in an image measured in pixels per inch"],a:3},
    {q:"RGB is used for screens while CMYK is used for:",opts:["Print using ink","Black and white only","Higher quality images","They produce identical results"],a:0},
    {q:"Whitespace in design:",opts:["Refers to white-colored backgrounds only if approved by management when applicable","Is a design mistake depending on the situation in regulated settings","Empty space around elements that improves readability and visual clarity","Is only the background color in regulated industries  based on context"],a:2},
    {q:"A vector graphic can be scaled without losing quality because:",opts:["It is a type of animation in most circumstances","It is a high-quality photograph depending on the situation","It has low resolution in regulated industries","It is made of mathematical paths rather than pixels"],a:3},
    {q:"A grid system in graphic design is used to:",opts:["Provide a structural framework that organizes content and creates visual consistency","Limit the number of fonts used in regulated industries under standard conditions","Select a color palette depending on the situation if circumstances allow","Create borders around elements based on company policy depending on factors involved"],a:0},
    {q:"Kerning in typography refers to:",opts:["The height of letters according to federal law when applicable","The spacing adjustment between individual characters in text","The color of text based on company policy in regulated settings","The thickness of a font in regulated industries  based on context"],a:1},
    {q:"A mockup in graphic design shows:",opts:["A rough pencil sketch if approved by management when applicable","A type of logo based on company policy in regulated settings","A realistic preview of how a design will look in its final context","A final printed product if approved by management  based on context"],a:2},
    {q:"Bleed in print design means:",opts:["Design elements that extend beyond the trim edge to ensure no","A printing error in most circumstances  based on context","Using red ink according to federal law as a general rule","A type of color effect in regulated industries in most cases"],a:0},
    {q:"Serif fonts differ from sans-serif fonts because:",opts:["Serif fonts are only for headlines if approved by management if circumstances allow","Sans-serif is always more modern depending on the situation under standard conditions","Serif fonts have small decorative strokes at letter ends; sans-serif fonts do not","They look the same when properly managed depending on factors involved"],a:2},
  ],
  photography:[
    {q:"Aperture in a camera controls:",opts:["Focal length under certain conditions","Shutter speed in most circumstances","ISO sensitivity according to federal law","How much light enters through the lens"],a:3},
    {q:"The rule of thirds is:",opts:["Using three colors in every photo in most circumstances under standard conditions","A composition guideline dividing the frame into nine sections for more balanced images","A lighting technique if approved by management depending on factors involved","Taking three photos of every subject if approved by management if circumstances allow"],a:1},
    {q:"ISO in photography measures:",opts:["Speed of the shutter based on company policy","Focal length of a lens when properly managed","Aperture size in most circumstances","Camera sensor sensitivity to light"],a:3},
    {q:"Depth of field refers to:",opts:["Distance between camera and subject if approved by management","Size of the camera sensor in regulated industries","Range of distance in a photo that appears acceptably sharp","Brightness of an image under certain conditions"],a:2},
    {q:"White balance in photography ensures:",opts:["Controlled exposure time in most circumstances  based on context","Colors appear accurate under different lighting conditions","Reduced image noise under certain conditions as a general rule","Increased resolution if approved by management in most cases"],a:1},
    {q:"The exposure triangle consists of:",opts:["The relationship between ISO, aperture, and shutter speed that controls exposure","A camera filter if approved by management  based on context","A type of lens in regulated industries as a general rule","A type of composition technique depending on the situation in most cases"],a:0},
    {q:"A RAW file compared to a JPEG:",opts:["RAW is lower quality depending on the situation  based on context","RAW files cannot be edited when properly managed in most cases","JPEG is larger in file size according to federal law as a general rule","RAW contains unprocessed sensor data with more editing flexibility; JPEG"],a:3},
    {q:"Leading lines as a composition technique uses:",opts:["Natural or man-made lines to guide the viewer eye toward the main subject","Lines created in post-processing according to federal law in regulated settings","Horizontal lines only in regulated industries when applicable","Lines that lead to the edge of a photo according to federal law  based on context"],a:0},
    {q:"Focal length differs from zoom because:",opts:["Focal length only matters for portraits based on company policy when applicable","They are the same based on company policy in regulated settings","Focal length is a fixed property of a lens determining field of view; zoom refers","Zoom is always better if approved by management  based on context"],a:2},
    {q:"Post-processing in photography means:",opts:["Developing film in a darkroom only in regulated industries under standard conditions","Editing and adjusting photos after they are taken using software like Lightroom or Photoshop","A type of camera setting in most circumstances if circumstances allow","Setting up for a photo shoot in regulated industries depending on factors involved"],a:1},
  ],
  filmvideo:[
    {q:"A storyboard is used to:",opts:["Record audio when properly managed under standard conditions","Visually plan a film shot by shot before production begins","Write the script under certain conditions if circumstances allow","Edit footage if approved by management depending on factors involved"],a:1},
    {q:"The director of photography oversees:",opts:["The budget in most circumstances  based on context","The screenplay in most circumstances in most cases","Directing the actors if approved by management","The visual look including camera work and lighting"],a:3},
    {q:"Pre-production differs from post-production because:",opts:["They are the same in most circumstances under standard conditions","Pre-production is only for big budgets in regulated industries if circumstances allow","Pre-production is planning before filming; post-production is editing and finishing after filming","Post-production happens before filming when properly managed depending on factors involved"],a:2},
    {q:"Continuity in filmmaking means:",opts:["Ensuring visual consistency so details match between different shots of the same scene","A type of film genre based on company policy under standard conditions","Using the same camera throughout according to federal law if circumstances allow","The speed of editing in regulated industries depending on factors involved"],a:0},
    {q:"A foley artist:",opts:["Creates and records sound effects to be added in post-production","Designs costumes if approved by management in regulated settings","Writes music for films when properly managed when applicable","Operates the camera based on company policy  based on context"],a:0},
    {q:"The 180-degree rule in filmmaking means:",opts:["Camera angle must change every 180 seconds in regulated industries  based on context","The camera should not cross an imaginary line between characters to maintain spatial","A camera must rotate 180 degrees per scene under certain conditions as a general rule","A rule about lighting angles according to federal law in most cases"],a:1},
    {q:"Diegetic sound differs from non-diegetic sound because:",opts:["Diegetic sound is only dialogue under certain conditions when applicable","Non-diegetic is always better when properly managed in regulated settings","Diegetic sound exists within the film world; non-diegetic is added for the audience only","They are the same when properly managed  based on context"],a:2},
    {q:"Color grading in post-production is:",opts:["Choosing the color of costumes under certain conditions under standard conditions","Adding text overlays in most circumstances if circumstances allow","A type of camera filter according to federal law depending on factors involved","Adjusting and enhancing the color of footage to achieve a specific look or mood"],a:3},
    {q:"A cut in film editing is:",opts:["Removing a scene entirely depending on the situation","A type of fade effect when properly managed","A mistake in the script in regulated industries","An instantaneous transition from one shot to another"],a:3},
    {q:"A documentary film documents:",opts:["Real events, people, or issues to inform or persuade","Only animated subjects if approved by management","Only short films depending on the situation when applicable","A fictional narrative when properly managed  based on context"],a:0},
  ],
  architecture:[
    {q:"Load-bearing walls support:",opts:["Decoration only according to federal law under standard conditions","The weight of the structure above and cannot be removed","They provide insulation depending on the situation if circumstances allow","They separate rooms in most circumstances depending on factors involved"],a:1},
    {q:"Sustainable architecture prioritizes:",opts:["Using the most expensive materials in most circumstances when applicable","Speed of construction when properly managed in regulated settings","Designing buildings that minimize environmental impact and use resources efficiently","Making buildings as large as possible under certain conditions  based on context"],a:2},
    {q:"A foundation transfers:",opts:["The building load to the ground and provides stability","The roof weight only depending on the situation","Insulation throughout the building according to federal law","Interior wall support only depending on the situation"],a:0},
    {q:"Scale in architectural drawings refers to:",opts:["The building weight limit according to federal law under standard conditions","Height of a building according to federal law if circumstances allow","Cost of materials based on company policy depending on factors involved","The proportional relationship between the drawing and the actual building size"],a:3},
    {q:"Passive solar design uses:",opts:["Solar panels only depending on the situation under standard conditions","Reflective windows only in regulated industries if circumstances allow","The sun energy for heating and cooling without mechanical systems","A type of lighting system when properly managed depending on factors involved"],a:2},
    {q:"Form in architecture refers to aesthetic appearance while function refers to:",opts:["Only floor plan layout based on company policy","How well the building serves its purpose","Only exterior design according to federal law","They are the same under certain conditions"],a:1},
    {q:"A cantilever is:",opts:["A type of window in most circumstances if circumstances allow","A type of foundation when properly managed under standard conditions","A structural element anchored at one end and projecting outward unsupported","A decorative column according to federal law depending on factors involved"],a:2},
    {q:"Building codes exist to:",opts:["Limit creativity depending on the situation under standard conditions","Establish minimum standards for safety, health, and welfare in building construction","Control building costs according to federal law if circumstances allow","Determine architectural style depending on the situation depending on factors involved"],a:1},
    {q:"Structural design differs from aesthetic design because:",opts:["Aesthetic is more important under certain conditions under standard conditions","Structural only applies to large buildings depending on the situation if circumstances allow","They are the same in regulated industries depending on factors involved","Structural design ensures safety and stability; aesthetic design focuses on visual appearance"],a:3},
    {q:"BIM (Building Information Modeling) is:",opts:["A digital representation of a building physical and functional characteristics","A building measurement tool if approved by management in regulated settings","A type of architectural style under certain conditions when applicable","A type of construction material based on company policy  based on context"],a:0},
  ],
  communications:[
    {q:"Verbal communication differs from nonverbal communication because:",opts:["Verbal uses spoken or written words; nonverbal uses body language, tone,","Nonverbal is less important when properly managed in regulated settings","Verbal only refers to speeches according to federal law when applicable","No difference based on company policy  based on context"],a:0},
    {q:"Media literacy is the ability to:",opts:["Read newspapers daily when properly managed under standard conditions","Read quickly depending on the situation if circumstances allow","Get a journalism degree under certain conditions depending on factors involved","Critically analyze, evaluate, and create media messages"],a:3},
    {q:"Framing in media communication refers to:",opts:["Putting a photo in a frame according to federal law  based on context","How media presents information to shape the audience perception of an issue","A type of camera shot in regulated industries as a general rule","A news broadcast format depending on the situation in most cases"],a:1},
    {q:"An op-ed is used to:",opts:["Report breaking news objectively in most circumstances","Summarize a TV show if approved by management","Express a personal opinion or argument on a topic","Announce a product if approved by management"],a:2},
    {q:"Active listening involves:",opts:["Listening without taking notes in regulated industries  based on context","Hearing without paying attention in regulated industries as a general rule","Fully concentrating, understanding, and responding thoughtfully to a speaker","Listening to music while studying when properly managed in most cases"],a:2},
    {q:"Synchronous communication differs from asynchronous because:",opts:["Synchronous only applies to phone calls when properly managed under standard conditions","Synchronous happens in real time; asynchronous allows participants to respond at different times","Asynchronous is always better when properly managed depending on factors involved","They are the same under certain conditions if circumstances allow"],a:1},
    {q:"A rhetorical appeal uses ethos, pathos, or logos to:",opts:["Persuade an audience through credibility, emotion, or logic","Write a news story when properly managed in regulated settings","File a legal argument according to federal law when applicable","Create an advertisement in most circumstances  based on context"],a:0},
    {q:"Gatekeeping in media is:",opts:["A type of censorship law if approved by management  based on context","Physical security at a media building based on company policy in most cases","A social media algorithm based on company policy as a general rule","The process by which editors and platforms select what information reaches the public"],a:3},
    {q:"Mass communication differs from interpersonal communication because:",opts:["Mass communication reaches large audiences through media; interpersonal is direct","Interpersonal is more important if approved by management in regulated settings","Mass communication is less effective when properly managed when applicable","They are the same when properly managed  based on context"],a:0},
    {q:"Agenda-setting theory suggests that media:",opts:["Reports only biased news based on company policy under standard conditions","Controls political elections in regulated industries if circumstances allow","Sets government policy under certain conditions depending on factors involved","Influences what topics the public considers important by giving them more coverage"],a:3},
  ],
  journalism:[
    {q:"The inverted pyramid structure in news writing means:",opts:["Starting with background information based on company policy under standard conditions","Presenting the most important information first followed by supporting details","Using the longest paragraph first in regulated industries if circumstances allow","Writing stories chronologically in most circumstances depending on factors involved"],a:1},
    {q:"A primary source in journalism is:",opts:["A story published by a major newspaper when properly managed  based on context","The most popular news outlet based on company policy as a general rule","Direct firsthand information such as eyewitness accounts or original documents","A summary of another article depending on the situation in most cases"],a:2},
    {q:"Libel is:",opts:["A false published statement that damages someone reputation","A type of anonymous source depending on the situation  based on context","A type of news broadcast if approved by management as a general rule","A journalism award according to federal law in most cases"],a:0},
    {q:"Source diversity in journalism is important because:",opts:["It is required by law when properly managed under standard conditions","It increases advertisement revenue under certain conditions if circumstances allow","It makes articles longer under certain conditions depending on factors involved","It ensures multiple perspectives are represented and reduces bias"],a:3},
    {q:"Hard news differs from feature stories because:",opts:["Hard news is only about politics according to federal law if circumstances allow","Feature stories are more credible in regulated industries under standard conditions","Hard news covers timely events; features explore topics in greater depth or human interest","Hard news is longer according to federal law depending on factors involved"],a:2},
    {q:"An editor in journalism:",opts:["Manages advertising sales under certain conditions under standard conditions","Reviews, corrects, and improves reporters work before publication","Writes all the articles when properly managed if circumstances allow","Conducts interviews in regulated industries depending on factors involved"],a:1},
    {q:"Off the record in journalism means:",opts:["Information that is public under certain conditions  based on context","A type of interview technique depending on the situation in most cases","A confidentiality agreement only if approved by management as a general rule","Information shared with a journalist that cannot be published or attributed to the source"],a:3},
    {q:"Objective journalism differs from advocacy journalism because:",opts:["Objective journalism is outdated depending on the situation when applicable","Objective journalism aims for impartiality; advocacy journalism promotes a specific cause","They are the same according to federal law in regulated settings","Advocacy journalism is less credible always depending on the situation  based on context"],a:1},
    {q:"A news embargo means:",opts:["A ban on all news coverage according to federal law under standard conditions","A type of press release according to federal law if circumstances allow","An agreement to not publish information until a specified date or event","A government censorship order under certain conditions depending on factors involved"],a:2},
    {q:"Citizen journalism is:",opts:["News gathering and reporting done by ordinary people rather than professional","Journalism about citizenship based on company policy in regulated settings","A type of local news in most circumstances when applicable","Journalism about government if approved by management  based on context"],a:0},
  ],
  english:[
    {q:"A simile differs from a metaphor because:",opts:["Metaphors are more poetic based on company policy under standard conditions","A simile compares using like or as; a metaphor makes the comparison directly","Similes are only used in poetry based on company policy if circumstances allow","They are the same in most circumstances depending on factors involved"],a:1},
    {q:"First person point of view means:",opts:["The narrator knows everything about all characters depending on the situation","An unknown narrator tells the story if approved by management","Multiple characters narrate alternately when properly managed","The story is told from a character perspective using I and me"],a:3},
    {q:"A counterargument in persuasive writing is used to:",opts:["End the essay when properly managed if circumstances allow","Introduce your main argument if approved by management under standard conditions","Acknowledge an opposing viewpoint and then refute it strengthening your argument","Confuse the reader when properly managed depending on factors involved"],a:2},
    {q:"Denotation differs from connotation because:",opts:["Denotation is a word literal dictionary meaning; connotation is the emotional or cultural associations","Connotation is more accurate according to federal law if circumstances allow","Denotation only applies to technical writing depending on the situation depending on factors involved","They mean the same when properly managed under standard conditions"],a:0},
    {q:"A round character in fiction is:",opts:["A character with no flaws depending on the situation if circumstances allow","A character based on a real person in regulated industries under standard conditions","A complex fully developed character who changes or grows throughout the story","A character who appears in every scene when properly managed depending on factors involved"],a:2},
    {q:"Dramatic irony occurs when:",opts:["A character speaks too dramatically according to federal law","A situation is simply coincidental in regulated industries in regulated settings","A character is overly dramatic under certain conditions  based on context","The audience knows something important that a character does not"],a:3},
    {q:"Theme differs from plot because:",opts:["Plot only applies to novels when properly managed  based on context","Plot is the sequence of events; theme is the underlying message or central idea","Theme is more important when properly managed as a general rule","They are the same if approved by management in most cases"],a:1},
    {q:"Stream of consciousness in writing:",opts:["Mimics the natural flow of a character thoughts without structure","Is a type of dialogue in regulated industries","Is a type of nature writing in regulated industries","Is written from an outside observer perspective when properly managed"],a:0},
    {q:"A foil character:",opts:["Narrates the story if approved by management  based on context","Contrasts with another character highlighting their qualities by comparison","Is a character who disappears according to federal law as a general rule","Is always the villain in most circumstances in most cases"],a:1},
    {q:"Showing in creative writing differs from telling because:",opts:["Telling is always better in regulated industries when applicable","Showing only works in visual media when properly managed in regulated settings","They are the same when properly managed  based on context","Showing conveys meaning through action and detail; telling states information directly"],a:3},
  ],
  pr:[
    {q:"The primary goal of public relations is to:",opts:["Handle customer complaints in most circumstances if circumstances allow","Sell products directly in most circumstances under standard conditions","Manage and shape the public perception of a person, company, or organization","Create advertisements if approved by management depending on factors involved"],a:2},
    {q:"A press release is:",opts:["An official written statement distributed to media to announce newsworthy information","A type of paid advertisement based on company policy under standard conditions","A social media post based on company policy if circumstances allow","A recorded company statement according to federal law depending on factors involved"],a:0},
    {q:"Crisis communication in PR involves:",opts:["Communicating only during slow periods when properly managed when applicable","Avoiding the media during problems in most circumstances in regulated settings","A type of press conference only depending on the situation  based on context","Managing and responding to a negative event to protect an organization reputation"],a:3},
    {q:"PR differs from advertising because:",opts:["PR earns media coverage organically; advertising is paid placement","Advertising is more credible when properly managed  based on context","They are the same in regulated industries as a general rule","PR only uses social media based on company policy in most cases"],a:0},
    {q:"A media kit is:",opts:["A type of press release in regulated industries  based on context","A list of media contacts in most circumstances as a general rule","A package of information about a company provided to media for coverage","Camera equipment for journalists if approved by management in most cases"],a:2},
    {q:"Spin in public relations means:",opts:["A positive term for accuracy in regulated industries under standard conditions","Presenting information in a way that favors one client sometimes at the expense of objectivity","A type of social media post in regulated industries if circumstances allow","A crisis communication tool in regulated industries depending on factors involved"],a:1},
    {q:"Proactive PR differs from reactive PR because:",opts:["Proactive only applies to large companies in regulated industries  based on context","They are the same depending on the situation in most cases","Reactive is more effective according to federal law as a general rule","Proactive plans and creates positive coverage; reactive responds to events as they happen"],a:3},
    {q:"Brand reputation management is:",opts:["The ongoing process of monitoring and influencing how a brand is perceived by the public","Managing social media accounts only based on company policy under standard conditions","A type of advertising campaign according to federal law if circumstances allow","Designing a logo in most circumstances depending on factors involved"],a:0},
    {q:"A spokesperson role in an organization is to:",opts:["Manage the PR budget according to federal law  based on context","Write all press releases in most circumstances as a general rule","Officially represent and communicate on behalf of the organization to media","Create social media content only depending on the situation in most cases"],a:2},
    {q:"The PESO model in PR categorizes media into:",opts:["A social media strategy according to federal law","Paid, Earned, Shared, and Owned channels","A financial model in most circumstances","A type of press release format according to federal law"],a:1},
  ],
  digitalmedia:[
    {q:"SEO stands for:",opts:["Social Engagement Online depending on the situation when applicable","Search Engine Optimization — improving content to rank higher in search results","A type of digital advertisement when properly managed in regulated settings","Software Engineering Operations in regulated industries  based on context"],a:1},
    {q:"Engagement rate on social media measures:",opts:["How actively an audience interacts with content through likes, comments, and shares","The number of posts per day according to federal law in regulated settings","The number of followers depending on the situation when applicable","The cost of running ads when properly managed  based on context"],a:0},
    {q:"A content strategy is:",opts:["A list of hashtags depending on the situation depending on factors involved","A type of social media profile under certain conditions under standard conditions","A plan for office furniture if approved by management if circumstances allow","A plan for creating, publishing, and managing content to achieve specific goals"],a:3},
    {q:"Going viral means:",opts:["A live streaming event depending on the situation under standard conditions","A computer getting a virus in regulated industries if circumstances allow","Content spreading rapidly and widely across the internet","A paid advertising campaign if approved by management"],a:2},
    {q:"A podcast is:",opts:["A type of live TV show if approved by management depending on factors involved","A video-only platform based on company policy under standard conditions","A type of blog depending on the situation if circumstances allow","A digital audio program available for streaming or download often released in episodes"],a:3},
    {q:"Organic reach differs from paid reach because:",opts:["They are the same when properly managed under standard conditions","Organic reach is unpaid earned through engagement; paid reach uses advertising to reach more people","Organic reach only applies to large accounts if approved by management depending on factors involved","Paid reach is always more effective under certain conditions if circumstances allow"],a:1},
    {q:"Click-through rate (CTR) measures:",opts:["The cost of an advertisement under certain conditions when applicable","The number of shares a post receives in most circumstances in regulated settings","The percentage of people who click on a link or ad after seeing it","The number of people who see an ad in most circumstances  based on context"],a:2},
    {q:"UX design focuses on:",opts:["Designing digital products that provide meaningful and easy experiences for users","A type of coding language depending on the situation if circumstances allow","The visual appearance of a website if approved by management depending on factors involved","Social media management depending on the situation under standard conditions"],a:0},
    {q:"A content management system (CMS) allows users to:",opts:["Track content in a spreadsheet based on company policy","Use a type of social media platform under certain conditions","Send email marketing campaigns when properly managed","Create, manage, and publish digital content without coding"],a:3},
    {q:"Influencer marketing involves:",opts:["Traditional word-of-mouth marketing in most circumstances under standard conditions","Partnering with individuals who have significant social media followings to promote products or services","Hiring celebrities for TV commercials depending on the situation depending on factors involved","A type of paid search advertising under certain conditions if circumstances allow"],a:1},
  ],
  education:[
    {q:"Formative assessment differs from summative assessment because:",opts:["Formative is ongoing feedback during learning; summative evaluates at the end of a unit","Summative is given daily if approved by management in regulated settings","They are the same based on company policy when applicable","Formative only applies to standardized tests in most circumstances  based on context"],a:0},
    {q:"Differentiated instruction means:",opts:["Teaching the same lesson to all students according to federal law when applicable","A type of classroom management under certain conditions in regulated settings","Adjusting teaching methods and content to meet diverse individual student learning needs","Giving advanced students more homework based on company policy  based on context"],a:2},
    {q:"An IEP provides:",opts:["A customized educational plan for students with disabilities outlining specific","A gifted student program depending on the situation  based on context","A general curriculum for all students if approved by management as a general rule","A behavior contract if approved by management in most cases"],a:0},
    {q:"Bloom Taxonomy provides a framework for:",opts:["A grading scale when properly managed under standard conditions","Categorizing levels of cognitive thinking from basic recall to complex creation","Classifying plant species when properly managed depending on factors involved","A classroom behavior system in most circumstances if circumstances allow"],a:1},
    {q:"Project-based learning means:",opts:["A type of standardized test according to federal law if circumstances allow","Assigning textbook chapters only according to federal law under standard conditions","Students learn by actively working on real-world projects over an extended period","Watching educational videos in most circumstances depending on factors involved"],a:2},
    {q:"The hidden curriculum refers to:",opts:["The core academic curriculum in most circumstances depending on factors involved","A type of special education program in regulated industries under standard conditions","Secret courses taught after school in regulated industries if circumstances allow","Implicit lessons about values, norms, and behaviors students learn through the school"],a:3},
    {q:"Intrinsic motivation in students differs from extrinsic motivation because:",opts:["They are the same in most circumstances under standard conditions","Intrinsic motivation only works for advanced students depending on the situation if circumstances allow","Extrinsic is always more effective in most circumstances depending on factors involved","Intrinsic motivation comes from internal interest; extrinsic comes from external rewards like grades"],a:3},
    {q:"Scaffolding in education means:",opts:["Providing temporary support to students as they learn new concepts gradually","Building a physical structure depending on the situation in regulated settings","A type of assessment according to federal law when applicable","A classroom arrangement depending on the situation  based on context"],a:0},
    {q:"Culturally responsive teaching connects content to:",opts:["A type of language instruction only according to federal law","A multicultural holiday celebration under certain conditions","Students cultural backgrounds, experiences, and perspectives","Teaching only one culture history in regulated industries"],a:2},
    {q:"A rubric is used to:",opts:["Manage classroom behavior based on company policy  based on context","Clearly describe criteria and levels of performance for an assignment","Administer a test in most circumstances as a general rule","Write a lesson plan if approved by management in most cases"],a:1},
  ],
  earlychildhood:[
    {q:"Parallel play means:",opts:["Children playing the same game together depending on the situation under standard conditions","Young children playing near each other but independently without direct interaction","A structured group activity according to federal law if circumstances allow","Children taking turns when properly managed depending on factors involved"],a:1},
    {q:"The zone of proximal development (ZPD) is:",opts:["A classroom seating arrangement based on company policy when applicable","A physical play area in most circumstances in regulated settings","A reading level assessment when properly managed  based on context","The range of tasks a child can do with guidance but not yet independently"],a:3},
    {q:"Attachment theory suggests:",opts:["Play is not important for learning in most circumstances  based on context","Children learn best alone if approved by management as a general rule","Strong emotional bonds with caregivers in early childhood form the foundation","Children develop at the same rate in most circumstances in most cases"],a:2},
    {q:"A developmental milestone is:",opts:["A marker of typical skills and behaviors expected at certain ages in a child development","A school grade level in most circumstances if circumstances allow","A standardized test score if approved by management depending on factors involved","A parenting technique if approved by management under standard conditions"],a:0},
    {q:"Cooperative play with peers is most important for young children development because:",opts:["Solitary play is better when properly managed","Watching educational programs is equally effective based on company policy","Individual academic work is more valuable under certain conditions","It develops social skills like sharing, negotiating, and collaborating"],a:3},
    {q:"Gross motor skills differ from fine motor skills because:",opts:["Gross motor only applies to sports if approved by management under standard conditions","Gross motor involves large muscle movements like running; fine motor involves small","Fine motor develops first in most circumstances if circumstances allow","They are the same depending on the situation depending on factors involved"],a:1},
    {q:"Scaffolding in early childhood education means:",opts:["A type of playground equipment according to federal law  based on context","A room arrangement strategy if approved by management as a general rule","Providing temporary support to help children learn new skills gradually","Building a physical structure based on company policy in most cases"],a:2},
    {q:"Child-directed play means:",opts:["Play where the child chooses the activity and leads the experience promoting autonomy and creativity","Play directed by teachers when properly managed under standard conditions","A type of structured game in regulated industries if circumstances allow","Screen time selected by the child under certain conditions depending on factors involved"],a:0},
    {q:"Authoritative parenting differs from authoritarian parenting because:",opts:["Authoritative is warm with clear boundaries; authoritarian is strict with little warmth","Authoritarian is more effective in most circumstances in regulated settings","Authoritative only works for older children if approved by management when applicable","They are the same based on company policy  based on context"],a:0},
    {q:"Emergent literacy refers to:",opts:["A standardized reading test in regulated industries under standard conditions","Learning to read in kindergarten only according to federal law if circumstances allow","A type of reading program according to federal law depending on factors involved","Knowledge and skills related to reading and writing that develop before formal"],a:3},
  ],
  sportsmanagement:[
    {q:"NIL rights for athletes refers to:",opts:["A type of sports contract according to federal law under standard conditions","The right for athletes to profit from their Name, Image, and Likeness","A league negotiating rules under certain conditions depending on factors involved","National Insurance for League players in regulated industries if circumstances allow"],a:1},
    {q:"A salary cap in professional sports is:",opts:["A player maximum bonus if approved by management when applicable","The cost of stadium operations in regulated industries in regulated settings","A limit on total team spending on player salaries to maintain competitive balance","The minimum wage for athletes when properly managed  based on context"],a:2},
    {q:"A sports agent primarily:",opts:["Manages team finances in most circumstances under standard conditions","Negotiates contracts and manages business relationships on behalf of athletes","Scouts new players under certain conditions if circumstances allow","Coaches athletes during games depending on the situation depending on factors involved"],a:1},
    {q:"Sports analytics is used to:",opts:["Design team uniforms if approved by management when applicable","Count game attendance only in regulated industries in regulated settings","Analyze data to improve player performance, team strategy, and business decisions","Manage ticket sales based on company policy  based on context"],a:2},
    {q:"A collective bargaining agreement in sports is:",opts:["Used to schedule games according to federal law when applicable","Used to establish fan rules when properly managed in regulated settings","Used to set ticket prices when properly managed  based on context","A negotiated contract between players union and owners covering salaries,"],a:3},
    {q:"A league differs from a franchise in professional sports because:",opts:["A league is the overall organization governing multiple teams; a franchise is a specific team within it","They are the same if approved by management  based on context","A league is only for amateur sports under certain conditions as a general rule","A franchise is more powerful than a league depending on the situation in most cases"],a:0},
    {q:"A title sponsor in sports:",opts:["Is the team main coach based on company policy when applicable","Is the team owner in most circumstances in regulated settings","Is a government sports grant based on company policy  based on context","A company that pays for naming rights to an event or venue in exchange"],a:3},
    {q:"Revenue sharing in professional sports leagues means:",opts:["Distributing a portion of league revenues among all teams to promote","Players sharing their salaries when properly managed  based on context","Fans sharing the cost of tickets in most circumstances as a general rule","A type of merchandise deal according to federal law in most cases"],a:0},
    {q:"A general manager role in a sports team involves:",opts:["Coaching the team on the field based on company policy under standard conditions","Overseeing team operations including player personnel decisions, contracts, and roster management","Handling media relations according to federal law depending on factors involved","Managing stadium operations if approved by management if circumstances allow"],a:1},
    {q:"Sports facility management involves:",opts:["Scheduling game broadcasts according to federal law when applicable","Playing sports in a facility if approved by management in regulated settings","Overseeing the operations, maintenance, and events at sports venues to ensure","Designing sports uniforms if approved by management  based on context"],a:2},
  ],
  eventmanagement:[
    {q:"A run of show document is:",opts:["A detailed timeline listing every element of an event in sequence","A vendor contract when properly managed if circumstances allow","A budget summary in most circumstances depending on factors involved","A post-event report according to federal law under standard conditions"],a:0},
    {q:"During vendor negotiation an event planner:",opts:["Sends invitations to guests depending on the situation  based on context","Creates the event program in most circumstances in most cases","Sets up chairs and tables when properly managed as a general rule","Discusses and agrees on services, pricing, and contracts with suppliers"],a:3},
    {q:"An event brief is:",opts:["A vendor invoice when properly managed  based on context","A document outlining the goals, audience, budget, and key details of an event","A post-event review when properly managed as a general rule","A short summary sent to guests when properly managed in most cases"],a:1},
    {q:"Contingency planning in event management means:",opts:["Planning entertainment options in regulated industries under standard conditions","Planning for the best outcome in most circumstances if circumstances allow","Preparing backup plans for problems that might occur like weather or technical issues","A type of event budget based on company policy depending on factors involved"],a:2},
    {q:"ROI for an event organizer measures:",opts:["Whether the event achieved its goals relative to its cost","Reach of Impact when properly managed  based on context","Range of Invitation in regulated industries as a general rule","Rate of Involvement in regulated industries in most cases"],a:0},
    {q:"An RFP in event planning is:",opts:["A type of event budget depending on the situation if circumstances allow","A type of event contract according to federal law under standard conditions","A Request for Proposal — a document sent to vendors asking them to submit bids","A registration form depending on the situation depending on factors involved"],a:2},
    {q:"An event goal differs from an event objective because:",opts:["They are the same depending on the situation  based on context","Goals are only financial in most circumstances in most cases","Objectives are less important depending on the situation as a general rule","A goal is a broad desired outcome; an objective is a specific measurable step"],a:3},
    {q:"Stakeholder management in event planning means:",opts:["Managing event staff depending on the situation when applicable","Identifying and maintaining relationships with all parties who have an interest in the event success","A type of budget management based on company policy in regulated settings","Managing ticket sales in most circumstances  based on context"],a:1},
    {q:"A force majeure clause in an event contract:",opts:["Is a type of payment plan under certain conditions  based on context","Is a fee for canceling events when properly managed as a general rule","Excuses parties from obligations due to extraordinary circumstances","Is a venue requirement in regulated industries in most cases"],a:2},
    {q:"Post-event evaluation is used to:",opts:["Update the event website in regulated industries under standard conditions","Assess what worked, what did not, and how to improve future events using","Pay vendors when properly managed depending on factors involved","Relive the event under certain conditions if circumstances allow"],a:1},
  ],
  hospitality:[
    {q:"RevPAR in hotel management means:",opts:["Revenue Per Available Room — a key measure of hotel financial performance","A type of hotel rating under certain conditions if circumstances allow","Rate of Variable Pricing and Revenue in regulated industries depending on factors involved","Revenue Per Annual Reservation in most circumstances under standard conditions"],a:0},
    {q:"A guest satisfaction survey is used to:",opts:["Verify billing information under certain conditions under standard conditions","Sell additional services according to federal law if circumstances allow","Check guests out faster under certain conditions depending on factors involved","Collect feedback that helps identify areas for improvement in guest experience"],a:3},
    {q:"Overbooking in hospitality means:",opts:["Accepting more reservations than capacity anticipating some cancellations","Having too many staff scheduled according to federal law under standard conditions","Booking the wrong type of room in regulated industries if circumstances allow","Charging guests too much according to federal law depending on factors involved"],a:0},
    {q:"Upselling in a restaurant or hotel means:",opts:["Lowering prices to attract more customers if approved by management under standard conditions","Encouraging customers to purchase a higher-value option or additional services","Offering refunds in regulated industries depending on factors involved","Reducing menu options depending on the situation if circumstances allow"],a:1},
    {q:"Front-of-house in a restaurant differs from back-of-house because:",opts:["Front is for managers; back is for staff in most circumstances under standard conditions","They are the same based on company policy if circumstances allow","Front-of-house is customer-facing; back-of-house is the kitchen and operations area","Front is indoor; back is outdoor in regulated industries depending on factors involved"],a:2},
    {q:"A hotel occupancy rate measures:",opts:["The average daily room rate in regulated industries depending on factors involved","The number of staff on duty in regulated industries under standard conditions","The number of check-ins per day depending on the situation if circumstances allow","The percentage of available rooms that are occupied over a given period"],a:3},
    {q:"Mise en place in a professional kitchen means:",opts:["A French dish in most circumstances  based on context","A kitchen safety rule depending on the situation in most cases","The dessert menu when properly managed as a general rule","Having everything in its place — the preparation and organization"],a:3},
    {q:"A standard operating procedure (SOP) in hospitality ensures:",opts:["A type of menu depending on the situation when applicable","A type of hotel contract in regulated industries in regulated settings","Consistent service quality through a documented step-by-step process","A guest review system in regulated industries  based on context"],a:2},
    {q:"Yield management in hospitality is:",opts:["A type of staff scheduling according to federal law under standard conditions","A pricing strategy that adjusts rates based on demand to maximize revenue","Managing crop yields in hotel gardens depending on the situation if circumstances allow","A customer loyalty program depending on the situation depending on factors involved"],a:1},
    {q:"A transient guest differs from a group guest because:",opts:["Transient guests book individually; group guests book as part of an organized","Transient guests stay longer if approved by management if circumstances allow","They are the same in regulated industries depending on factors involved","Group guests pay less always in most circumstances under standard conditions"],a:0},
  ],
  generalstudies:[
    {q:"If you earn $2,500 per month and rent is $900, what percentage goes to rent?",opts:["36%","18%","45%","27.5%"],a:0},
    {q:"A need differs from a want because:",opts:["Wants cost more than needs based on company policy  based on context","They are the same when properly managed as a general rule","A need is essential for survival or basic functioning; a want is desired but not essential","Needs are only physical items according to federal law in most cases"],a:2},
    {q:"Living within your means means:",opts:["Only buying sale items when properly managed when applicable","Spending no more than you earn and avoiding unnecessary debt","Earning as much as possible if approved by management in regulated settings","Having a savings account in most circumstances  based on context"],a:1},
    {q:"A $500 credit card balance at 20% annual interest — how much interest after one year without payment?",opts:["$200","$50","$5","$100"],a:3},
    {q:"Compound interest matters because:",opts:["Interest is paid once a year and does not matter much in most circumstances when applicable","It is a fixed fee charged by banks according to federal law in regulated settings","It applies only to the original deposit based on company policy  based on context","Interest is calculated on both the original amount and previously earned interest so it grows"],a:3},
    {q:"A W-2 form shows:",opts:["A job application under certain conditions  based on context","A bank statement in most circumstances as a general rule","Your annual wages and taxes withheld by an employer","A credit report in most circumstances in most cases"],a:2},
    {q:"An insurance deductible is:",opts:["The amount you pay out-of-pocket before insurance begins covering costs","A discount on your premium depending on the situation  based on context","A type of insurance penalty according to federal law as a general rule","A monthly insurance payment in regulated industries in most cases"],a:0},
    {q:"Gross pay differs from net pay because:",opts:["Gross pay only includes hourly wages in most circumstances when applicable","Gross is total earnings before deductions; net is take-home pay after taxes and other deductions","They are the same according to federal law in regulated settings","Net pay is higher than gross pay depending on the situation  based on context"],a:1},
    {q:"An overdraft on a checking account means:",opts:["A bank fee for having too much money based on company policy when applicable","You spent more than your account balance causing it to go negative","A type of credit card when properly managed in regulated settings","A type of savings account in regulated industries  based on context"],a:1},
    {q:"A credit card differs from a debit card because:",opts:["A credit card lets you borrow money to pay back later; a debit card draws","Credit cards are always safer depending on the situation  based on context","They work exactly the same according to federal law as a general rule","Debit cards are for businesses only in most circumstances in most cases"],a:0},
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
  // Character is chosen during login — skip that step
  // If onboardingStep is 'character' or missing, jump to 'category'
  const rawStep = player.onboardingStep || 'character';
  ob.step = rawStep === 'character' ? 'category' : rawStep;
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
  // 'character' step is handled by login.js — skip it here
  if      (ob.step==='category')  obRenderCategory(el);
  else if (ob.step==='major')     obRenderMajor(el);
  else if (ob.step==='finals')    obRenderFinals(el);
  else if (ob.step==='results')   obRenderResults(el);
  else { showScreen('screen-citymap'); if(window.initCityMap) window.initCityMap(ob.player); }
}

function obStepBar(active) {
  return ['Degree','Finals','Graduate'].map((s,i)=>{
    const n=i+1, cls=n<active?'done':n===active?'active':'';
    return `<div class="ob-step ${cls}">${n} ${s}</div>`;
  }).join('');
}

function obLogoutBtn() {
  return `<button class="ob-logout" onclick="handleLogout()">← Log Out</button>`;
}

// ── Named navigation functions (avoid inline onclick quote issues) ──
window.obBackToCategory = function() {
  ob.selectedMajor = null;
  ob.currentQ = 0; ob.score = 0; ob.wrongAnswers = [];
  ob.step = 'category';
  obRender();
};
window.obBackFromMajor = function() {
  ob.selectedMajor = null;
  ob.step = 'category';
  obRender();
};

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
          ${c.img
            ? `<img src="${c.img}" class="char-img" alt="${c.name}"/>`
            : `<div class="char-placeholder">?</div>`}
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
      <button class="ob-btn" style="background:var(--panel2);color:var(--text-muted);" onclick="obBackToCategory()">← Back</button>
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
      <button class="ob-btn" style="background:var(--panel2);color:var(--text-muted);" onclick="obBackFromMajor()">← Back</button>
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
        <span class="drop-link" onclick="obBackToCategory()">Drop Class</span></p>
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
window.obDropClass = () => { obBackToCategory(); };
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
  if(window.showForeverBtn) window.showForeverBtn();
  showScreen('screen-home');
  if(window.initHome) window.initHome(ob.player);
};