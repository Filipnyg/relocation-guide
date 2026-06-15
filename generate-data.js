const fs = require('fs');
const path = require('path');

// 1. Full Dataset of 27 Jobs
const jobs = [
  { title: "Data Scientist", slug: "data-scientist" },
  { title: "Software Engineer", slug: "software-engineer" },
  { title: "Product Manager", slug: "product-manager" },
  { title: "UX Designer", slug: "ux-designer" },
  { title: "DevOps Engineer", slug: "devops-engineer" },
  { title: "Cybersecurity Analyst", slug: "cybersecurity-analyst" },
  { title: "Cloud Architect", slug: "cloud-architect" },
  { title: "Frontend Developer", slug: "frontend-developer" },
  { title: "Backend Developer", slug: "backend-developer" },
  { title: "Fullstack Engineer", slug: "fullstack-engineer" },
  { title: "Data Engineer", slug: "data-engineer" },
  { title: "AI/ML Engineer", slug: "ai-ml-engineer" },
  { title: "Mobile App Developer", slug: "mobile-developer" },
  { title: "QA Automation Engineer", slug: "qa-engineer" },
  { title: "Growth Marketing Manager", slug: "growth-marketer" },
  { title: "SEO Specialist", slug: "seo-specialist" },
  { title: "Content Strategist", slug: "content-strategist" },
  { title: "Product Designer", slug: "product-designer" },
  { title: "UI Illustrator", slug: "ui-illustrator" },
  { title: "Scrum Master", slug: "scrum-master" },
  { title: "Solutions Engineer", slug: "solutions-engineer" },
  { title: "Account Executive", slug: "account-executive" },
  { title: "Customer Success Manager", slug: "customer-success" },
  { title: "Data Analyst", slug: "data-analyst" },
  { title: "Systems Administrator", slug: "sysadmin" },
  { title: "IT Support Specialist", slug: "it-support" },
  { title: "Digital Nomad Consultant", slug: "nomad-consultant" }
];

// 2. Full Dataset of 40 Countries
const countries = [
  { name: "Spain", slug: "spain", nomadVisa: "Digital Nomad Visa", localVisa: "Highly Skilled Worker Visa", costOfLiving: 2200, localSalary: 4200, nomadTax: "15% flat rate under Beckham Law", visaLink: "https://www.exteriores.gob.es/", localContext: "Expect late-night dinners (around 9-10 PM), a relaxed 'mañana' work pace, and a massive focus on work-life balance and vibrant social circles." },
  { name: "Portugal", slug: "portugal", nomadVisa: "D8 Digital Nomad Visa", localVisa: "D2 Immigrant Entrepreneur Visa", costOfLiving: 1900, localSalary: 3100, nomadTax: "20% flat rate for high-value activities", visaLink: "https://vistos.mne.gov.pt/", localContext: "The digital nomad community is massive in Lisbon and Madeira. English proficiency is very high, but local government bureaucracy can move quite slowly." },
  { name: "Costa Rica", slug: "costa-rica", nomadVisa: "Rentista Visa", localVisa: "Work Permit", costOfLiving: 1800, localSalary: 2400, nomadTax: "0% tax on foreign sourced income", visaLink: "https://www.migracion.go.cr/", localContext: "Embrace the 'Pura Vida' lifestyle. Infrastructure in beach towns can have occasional power drops, but the community, surfing opportunities, and natural landscapes are world-class." },
  { name: "Thailand", slug: "thailand", nomadVisa: "LTR Visa (Digital Nomad)", localVisa: "Non-Immigrant B Visa", costOfLiving: 1300, localSalary: 2100, nomadTax: "0% on foreign income not brought in same year", visaLink: "https://www.immigration.go.th/", localContext: "Bangkok and Chiang Mai are legendary nomad hubs. Incredible food and high-speed fiber internet are incredibly affordable, but local visa stays require strict reporting every 90 days." },
  { name: "Greece", slug: "greece", nomadVisa: "Greece Digital Nomad Visa", localVisa: "Type D Visa", costOfLiving: 1700, localSalary: 2600, nomadTax: "50% income tax reduction for first 7 years", visaLink: "https://www.migration.gov.gr/", localContext: "Life moves beautifully slow here. Perfect for Mediterranean living, but dealing with public administration layouts can be complex without hiring a local accountant." },
  { name: "Croatia", slug: "croatia", nomadVisa: "Digital Nomad Residence", localVisa: "Business Stay Permit", costOfLiving: 1600, localSalary: 2800, nomadTax: "Exempt from income tax on remote work", visaLink: "https://mup.gov.hr/", localContext: "The coastal Adriatic cities offer incredible historic charm. Nomad permits last strictly for 1 year and cannot be directly renewed without a mandatory cooling-off break." },
  { name: "Mexico", slug: "mexico", nomadVisa: "Temporary Resident Visa", localVisa: "Work Visa", costOfLiving: 1600, localSalary: 2200, nomadTax: "0% on foreign income if tax residency isn't triggered", visaLink: "https://www.inm.gob.mx/", localContext: "Incredible cultural richness and affordable cost of living. Cities like CDMX, Oaxaca, and Playa del Carmen have thriving, highly active tech groups." },
  { name: "Indonesia", slug: "indonesia", nomadVisa: "E33G Remote Worker Visa", localVisa: "KITAS Work Permit", costOfLiving: 1200, localSalary: 1800, nomadTax: "0% on foreign income outside Indonesia", visaLink: "https://www.imigrasi.go.id/", localContext: "Bali (Canggu and Ubud) dominates the global nomad scene. Scooters are the main transportation, and café work culture is completely unparalleled." },
  { name: "Malaysia", slug: "malaysia", nomadVisa: "DE Rantau Nomad Pass", localVisa: "Employment Pass", costOfLiving: 1400, localSalary: 2900, nomadTax: "0% on foreign-sourced income", visaLink: "https://www.imi.gov.my/", localContext: "Kuala Lumpur offers high-end skyline living at a fraction of Western costs. Perfect English proficiency, safe environment, and amazing flight connections across Asia." },
  { name: "Colombia", slug: "colombia", nomadVisa: "V Digital Nomad Visa", localVisa: "M Worker Visa", costOfLiving: 1100, localSalary: 1700, nomadTax: "Taxed after 183 days of physical presence", visaLink: "https://www.cancilleria.gov.co/", localContext: "Medellín features beautiful mountain valley weather and endless coworking options. General security awareness is important, but local hospitality is exceptional." },
  { name: "South Africa", slug: "south-africa", nomadVisa: "SA Digital Nomad Visa", localVisa: "Critical Skills Visa", costOfLiving: 1500, localSalary: 3500, nomadTax: "Exempt if in country under 183 days a year", visaLink: "http://www.dha.gov.za/", localContext: "Cape Town offers stunning beaches and world-class wine estates. 'Load shedding' (scheduled power outages) occurs, so selecting accommodation with backup power generators is essential." },
  { name: "Brazil", slug: "brazil", nomadVisa: "Digital Nomad Visa (VITEM XIV)", localVisa: "VITEM V Work Visa", costOfLiving: 1400, localSalary: 2300, nomadTax: "Tax resident after 183 days of stay", visaLink: "https://www.gov.br/mre/", localContext: "Florianópolis and Rio have growing beachside startup groups. Learning basic conversational Portuguese is highly crucial here compared to European hubs." },
  { name: "Mauritius", slug: "mauritius", nomadVisa: "Premium Visa", localVisa: "Occupation Permit", costOfLiving: 1700, localSalary: 2500, nomadTax: "0% if funds are deposited in foreign accounts", visaLink: "https://passport.govmu.org/", localContext: "An underrated tropical paradise with excellent infrastructure, absolute safety, and a very straightforward digital process for applications." },
  { name: "Panama", slug: "panama", nomadVisa: "Short Term Remote Worker", localVisa: "Specialist Worker Visa", costOfLiving: 2000, localSalary: 3000, nomadTax: "Territorial tax system (0% on foreign income)", visaLink: "https://www.migracion.gob.pa/", localContext: "Uses the US Dollar officially, making financial planning very easy. Panama City feels like a mini-Miami with exceptional modern banking frameworks." },
  { name: "Estonia", slug: "estonia", nomadVisa: "Estonia Digital Nomad Visa", localVisa: "D-Visa (Employment)", costOfLiving: 1800, localSalary: 3800, nomadTax: "Taxed after staying longer than 183 consecutive days", visaLink: "https://www.politsei.ee/", localContext: "The absolute world leader in e-government systems. Everything is completely digital and lightning fast, though winters are very long, dark, and cold." },
  { name: "Malta", slug: "malta", nomadVisa: "Nomad Residence Permit", localVisa: "Single Permit Work", costOfLiving: 2100, localSalary: 3400, nomadTax: "0% consumption tax alternative schemes available", visaLink: "https://identitymalta.com/", localContext: "An English-speaking island gem in the Mediterranean. Thriving tech scenes, great scuba diving, and beautiful historic stone architecture everywhere." },
  { name: "Cyprus", slug: "cyprus", nomadVisa: "Cyprus Digital Nomad Visa", localVisa: "Temporary Residence Permit", costOfLiving: 1900, localSalary: 3200, nomadTax: "Massive tax exemptions for high earners relocatees", visaLink: "http://www.moi.gov.cy/crmd", localContext: "Low tax rates, low crime, and over 300 days of pure sunshine per year. Driving is on the left side of the road due to British historical roots." },
  { name: "Japan", slug: "japan", nomadVisa: "6-Month Digital Nomad Visa", localVisa: "Specified Skilled Worker", costOfLiving: 2300, localSalary: 4500, nomadTax: "Exempt if income isn't remitted to Japan", visaLink: "https://www.mofa.go.jp/", localContext: "Incredible public safety, deep culture, and legendary culinary standards. The nomad visa is strictly limited to 6 months with no immediate renewal option." },
  { name: "South Korea", slug: "south-korea", nomadVisa: "Workation (Work-from-Korea)", localVisa: "E-7 Professional Visa", costOfLiving: 2200, localSalary: 4300, nomadTax: "0% foreign income if under specific duration statuses", visaLink: "https://www.immigration.go.kr/", localContext: "Features the fastest infrastructure internet speeds in the world. Seoul runs 24/7, offering a perfect landscape for night owls and tech builders." },
  { name: "Vietnam", slug: "vietnam", nomadVisa: "3-Month Tourist Entry", localVisa: "LD Work Visa", costOfLiving: 1100, localSalary: 1900, nomadTax: "Non-resident flat 20% on local source income only", visaLink: "https://immigration.gov.vn/", localContext: "Incredibly affordable lifestyle, high energy, and booming tech scenes in Da Nang and Saigon. Visas are shorter, requiring routine cross-border trips." },
  { name: "Taiwan", slug: "taiwan", nomadVisa: "Employment Gold Card", localVisa: "Resident Visa", costOfLiving: 1800, localSalary: 3600, nomadTax: "Tax reductions for Gold Card holders up to 3 years", visaLink: "https://visaagent.boca.gov.tw/", localContext: "The Gold Card acts as an open work permit, making it highly flexible. Exceptional public transportation, world-class healthcare, and a friendly community." },
  { name: "Czech Republic", slug: "czech-republic", nomadVisa: "Zivno Business Visa", localVisa: "Employee Card", costOfLiving: 1800, localSalary: 3300, nomadTax: "Flat tax system for trade license holders available", visaLink: "https://www.mvcr.cz/", localContext: "Prague is centrally located in Europe, making weekend flights and train travel trivial. Great historical atmosphere, legendary pub culture, and clean transit." },
  { name: "Italy", slug: "italy", nomadVisa: "Italian Digital Nomad Visa", localVisa: "Subordinate Work Visa", costOfLiving: 2100, localSalary: 3200, nomadTax: "Up to 70% tax reduction for incoming workers", visaLink: "https://vistoperitalia.esteri.it/", localContext: "Exceptional culinary heritage, rich art, and slow lifestyle. Navigating municipal tax registration offices takes patient follow-ups." },
  { name: "France", slug: "france", nomadVisa: "Talent Passport (Business)", localVisa: "Long-Stay Work Visa", costOfLiving: 2600, localSalary: 4800, nomadTax: "Favorable conditions under incoming ex-pat regimes", visaLink: "https://france-visas.gouv.fr/", localContext: "Strong focus on strict 35-hour work boundaries and high lifestyle design values. Speaking basic conversational French improves bureaucratic progress." },
  { name: "Germany", slug: "germany", nomadVisa: "Freiberufler (Freelance) Visa", localVisa: "EU Blue Card", costOfLiving: 2500, localSalary: 5400, nomadTax: "Progressive tax brackets up to 42%", visaLink: "https://www.make-it-in-germany.com/", localContext: "Punctuality, high organization, and clean administrative infrastructure. Cash is widely preferred over card payments in smaller boutique businesses." },
  { name: "Canada", slug: "canada", nomadVisa: "6-Month Remote Stay Status", localVisa: "Express Entry Work Permit", costOfLiving: 2800, localSalary: 5900, nomadTax: "Taxed if local physical residency ties form", visaLink: "https://www.canada.ca/en/immigration-refugees-citizenship.html", localContext: "Extremely welcoming diversity cultures, clean cities, and world-class nature access. Winters require heavy premium thermal apparel." },
  { name: "Australia", slug: "australia", nomadVisa: "Working Holiday Visa", localVisa: "TSS 482 Visa", costOfLiving: 3100, localSalary: 6400, nomadTax: "Flat 32.5% rate for non-resident brackets", visaLink: "https://immi.homeaffairs.gov.au/", localContext: "Incredible beachside outdoor lifestyles and an early morning cafe culture. Renting markets in coastal capital cities can be very competitive." },
  { name: "New Zealand", slug: "new-zealand", nomadVisa: "Working Holiday Scheme", localVisa: "Accredited Employer Work Visa", costOfLiving: 2900, localSalary: 5800, nomadTax: "Statutory pay-as-you-earn bracket scales", visaLink: "https://www.immigration.govt.nz/", localContext: "Relaxed pace of life surrounded by dramatic natural preservation. Product choices can have higher shipping costs due to geographic remote conditions." },
  { name: "United Kingdom", slug: "united-kingdom", nomadVisa: "6-Month Visitor Allowance", localVisa: "Skilled Worker Visa", costOfLiving: 2900, localSalary: 5500, nomadTax: "Remittance basis models for qualified non-domiciled status", visaLink: "https://www.gov.uk/browse/visas-immigration", localContext: "Exceptional historical pub layouts and train connectivity network systems. Fast-paced metropolitan work setups mix with traditional rainy coastal weekends." },
  { name: "United States", slug: "united-states", nomadVisa: "B1/B2 Business Visitor", localVisa: "H-1B Professional Visa", costOfLiving: 3400, localSalary: 7800, nomadTax: "Worldwide taxation applies if physical presence tests clear", visaLink: "https://travel.state.gov/", localContext: "Extremely fast-paced tech startup communities with massive commercial opportunities. Navigating private corporate healthcare programs requires upfront insurance selection." },
  { name: "United Arab Emirates", slug: "united-arab-emirates", nomadVisa: "Remote Work Visa", localVisa: "Golden Visa Residency", costOfLiving: 3200, localSalary: 6200, nomadTax: "0% personal income tax rate structure", visaLink: "https://smartservices.icp.gov.ae/", localContext: "Ultra-modern skyscrapers, complete public safety, and zero personal income tax. Summer temperatures are intense, keeping life indoors or in air-conditioned hubs." },
  { name: "Singapore", slug: "singapore", nomadVisa: "ONE Pass (High Earners)", localVisa: "Employment Pass", costOfLiving: 3600, localSalary: 7200, nomadTax: "Low progressive territorial structures maxing at 24%", visaLink: "https://www.mom.gov.sg/", localContext: "A hyper-efficient, spotless tropical garden city-state. Business execution structures run fast, and public transport networks are completely flawless." },
  { name: "Netherlands", slug: "netherlands", nomadVisa: "Self-Employed Residence Permit", localVisa: "Highly Skilled Migrant Visa", costOfLiving: 2700, localSalary: 5100, nomadTax: "30% tax-free reimbursement ruling option available", visaLink: "https://ind.nl/en", localContext: "Flat geography optimized completely for bicycle commuting. Communication is exceptionally direct, honest, and professional across all industries." },
  { name: "Ireland", slug: "ireland", nomadVisa: "90-Day Short Stay Allowance", localVisa: "Critical Skills Employment Permit", costOfLiving: 2600, localSalary: 5300, nomadTax: "Standard PAYE structural progressive scale", visaLink: "https://www.irishimmigration.ie/", localContext: "A vibrant European tech hub hosting major global headquarters. Cozy pub networks contrast with competitive residential accommodation availability." },
  { name: "Switzerland", slug: "switzerland", nomadVisa: "90-Day Schengen Tourist Status", localVisa: "Swiss Work Permit", costOfLiving: 4100, localSalary: 8900, nomadTax: "Low municipal canton structures depending on location", visaLink: "https://www.sem.admin.ch/", localContext: "Unparalleled alpine transport, complete precision, and pristine public safety levels. Living costs are among the highest globally across basic grocery items." },
  { name: "Sweden", slug: "sweden", nomadVisa: "Schengen Visit Tracking Status", localVisa: "Swedish Work Permit", costOfLiving: 2300, localSalary: 4400, nomadTax: "Local municipal scales averaging around 32%", visaLink: "https://www.migrationsverket.se/", localContext: "Flat management setups, premium social structures, and the daily mandatory ritual of 'Fika' (coffee and cinnamon buns with team members)." },
  { name: "Norway", slug: "norway", nomadVisa: "Independent Contractor Visa", localVisa: "Skilled Worker Permit", costOfLiving: 2700, localSalary: 5200, nomadTax: "Standard brackets including national insurance dues", visaLink: "https://www.udi.no/en/", localContext: "Stunning fjord terrain, complete outdoor sports culture, and rich state infrastructure benefits. Alcohol taxes and restaurant margins make eating out expensive." },
  { name: "Denmark", slug: "denmark", nomadVisa: "Schengen Holiday Stay Allowance", localVisa: "Positive List Work Permit", costOfLiving: 2600, localSalary: 5500, nomadTax: "High progressive structures supporting premium state benefits", visaLink: "https://www.nyidanmark.dk/", localContext: "Focuses deeply on 'Hygge' (cozy contentment), design values, and absolute work-life boundaries. Bicycles form the backbone of metropolitan transits." },
  { name: "Finland", slug: "finland", nomadVisa: "Finnish Digital Nomad Visa", localVisa: "Specialist Residence Permit", costOfLiving: 2200, localSalary: 4300, nomadTax: "Progressive scales with local municipal deductions", visaLink: "https://migri.fi/en/", localContext: "Consistently rated the happiest country globally. Quiet respect for personal space, highly advanced digital infrastructure, and traditional sauna habits." },
  { name: "Argentina", slug: "argentina", nomadVisa: "Digital Nomad Visa (Residencia)", localVisa: "Work Visa", costOfLiving: 1200, localSalary: 1900, nomadTax: "Foreign sourced assets remain outside base local tax pools", visaLink: "https://www.migraciones.gov.ar/", localContext: "Rich café conversation heritage, passionate football matches, and excellent steak culinary paths. Understanding parallel currency rates helps manage living costs." }
];

// 3. Generation Logic (Calculates dynamic values per combination)
const generatedData = [];

countries.forEach(country => {
  jobs.forEach(job => {
    // Base modifications to give every page completely distinct, dynamic data points
    const jobMultiplier = (job.slug.length % 5) * 400; 
    const dynamicLocalSalary = country.localSalary + jobMultiplier;
    
    generatedData.push({
      countryName: country.name,
      countrySlug: country.slug,
      jobTitle: job.title,
      jobSlug: job.slug,
      nomadVisa: country.nomadVisa,
      localVisa: country.localVisa,
      costOfLiving: country.costOfLiving,
      localSalary: dynamicLocalSalary,
      nomadTax: country.nomadTax,
      visaLink: country.visaLink,
      localContext: country.localContext
    });
  });
});

// Write to the final data file
const outputPath = path.join(process.cwd(), 'data.json');
fs.writeFileSync(outputPath, JSON.stringify(generatedData, null, 2));

console.log(`Success! Generated database with ${generatedData.length} records.`);