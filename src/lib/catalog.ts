// Catalog of loans, insurance, services. Slug-based dynamic routes render from this.
import homeImg from "@/assets/loan-home.jpg";
import mortgageImg from "@/assets/loan-mortgage.jpg";
import businessImg from "@/assets/loan-business.jpg";
import vehicleImg from "@/assets/loan-vehicle.jpg";
import educationImg from "@/assets/loan-education.jpg";
import personalImg from "@/assets/loan-personal.jpg";
import healthImg from "@/assets/insurance-health.jpg";
import familyImg from "@/assets/insurance-family.jpg";
import lifeImg from "@/assets/insurance-life.jpg";
import childImg from "@/assets/insurance-child.jpg";
import pensionImg from "@/assets/insurance-pension.jpg";
import propertyImg from "@/assets/insurance-property.jpg";
import motorImg from "@/assets/insurance-motor.jpg";
import travelImg from "@/assets/insurance-travel.jpg";
import businessInsImg from "@/assets/insurance-business.jpg";
import goldImg from "@/assets/loan-gold.jpg";

// WhatsApp upload assets
import waProfessionalImg from "@/assets/WhatsApp Image 2026-07-13 at 11.47.39 AM.jpeg";
import waEduInstImg from "@/assets/WhatsApp Image 2026-07-13 at 11.47.41 AM (1).jpeg";
import waEquipmentImg from "@/assets/WhatsApp Image 2026-07-13 at 11.47.41 AM.jpeg";
import waCommercialImg from "@/assets/WhatsApp Image 2026-07-13 at 11.47.42 AM.jpeg";
import waHospitalImg from "@/assets/WhatsApp Image 2026-07-13 at 11.47.43 AM.jpeg";


export type CategoryKind = "loan" | "insurance" | "service";

export interface CatalogItem {
  slug: string;
  kind: CategoryKind;
  name: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  benefits: string[];
  eligibility: string[];
  documents: string[];
  rate?: string;
  tenure?: string;
  premium?: string;
  coverage?: string;
  processingTime?: string;
  subtypes?: { name: string; description: string }[];
  faqs: { q: string; a: string }[];
  related?: string[];
}

const commonDocs = [
  "Aadhaar card",
  "PAN card",
  "Recent passport-size photograph",
  "Address proof (utility bill / rent agreement)",
  "Latest 6 months bank statement",
];

export const loans: CatalogItem[] = [
  {
    slug: "personal-loan",
    kind: "loan",
    name: "Personal Loan",
    tagline: "Instant funds for life's every milestone.",
    image: personalImg,
    description:
      "Instant unsecured personal loans for medical expenses, marriages, travel, or other personal financial needs without requiring collateral.",
    features: ["Up to ₹40 L", "Tenure up to 6 years", "100% online approval"],
    benefits: ["No collateral required", "Flexible EMIs", "Disbursal within 24 hours"],
    eligibility: ["Age 21–60 years", "Monthly income ₹25,000+", "CIBIL score 720+ preferred"],
    documents: [...commonDocs, "Salary slips (last 3 months) / Form 16"],
    rate: "10.50% – 22.00% p.a.",
    tenure: "1 – 6 years",
    processingTime: "24 hours",
    subtypes: [
      { name: "Medical Loan", description: "Cover planned or emergency medical expenses with instant disbursal." },
      { name: "Marriage Loan", description: "Finance wedding expenses from venue booking to jewelry." },
      { name: "Travel Loan", description: "Fund international vacations or domestic holiday plans." },
    ],
    faqs: [
      { q: "Is there any collateral?", a: "No. Personal loans are fully unsecured." },
      { q: "Can I prepay my personal loan?", a: "Yes, with a nominal 2–4% foreclosure fee after 6 months." },
    ],
    related: ["health-insurance", "life-insurance"],
  },
  {
    slug: "business-loan",
    kind: "loan",
    name: "Business Loan",
    tagline: "Fuel your enterprise growth.",
    image: businessImg,
    description:
      "Collateral-free and structured business loans to help entrepreneurs start, expand, or manage working capital.",
    features: ["Collateral-free up to ₹50 L", "Tenure up to 7 years", "In-principle sanction in 48 hours"],
    benefits: ["Minimal documentation", "Flexible repayment", "MSME priority schemes"],
    eligibility: ["Business vintage 2+ years", "Annual turnover ₹20 L+", "Positive credit history"],
    documents: [...commonDocs, "GST returns (last 12 months)", "Business ITR (2 years)", "MSME registration Certificate"],
    rate: "11.50% – 18.00% p.a.",
    tenure: "1 – 7 years",
    processingTime: "3–5 working days",
    subtypes: [
      { name: "Working Capital Loan", description: "Meet operational cashflow needs with overdraft facilities." },
      { name: "Business Expansion Loan", description: "Scale operations, open branches, or acquire inventory." },
    ],
    faqs: [
      { q: "Do I need to submit collateral?", a: "Loans up to ₹50 L are typically collateral-free under CGTMSE-linked schemes." },
    ],
    related: ["business-insurance", "commercial-loan"],
  },
  {
    slug: "education-loan",
    kind: "loan",
    name: "Education Loan",
    tagline: "Invest in higher education goals.",
    image: educationImg,
    description:
      "Support higher education expenses including tuition, hostel fees, books, and travel — in India or abroad.",
    features: ["Loans up to ₹1.5 Cr for studies abroad", "Moratorium during course + 6 months", "No margin up to ₹4 L"],
    benefits: ["Interest subsidy for eligible students", "Tax benefit under Section 80E", "Comprehensive coverage of study cost"],
    eligibility: ["Indian resident", "Confirmed admission in recognized institution", "Parent/guardian as co-applicant"],
    documents: [...commonDocs, "Admission letter", "Fee structure breakdown", "Academic records"],
    rate: "8.60% – 12.00% p.a.",
    tenure: "Up to 15 years",
    processingTime: "5–10 working days",
    subtypes: [
      { name: "Domestic Education Loan", description: "Fund courses at recognized Indian universities." },
      { name: "Overseas Education Loan", description: "Cover tuition, living expenses, and travel tickets abroad." },
    ],
    faqs: [
      { q: "When does repayment start?", a: "Repayment begins after the moratorium period — course duration plus 6 months." },
    ],
    related: ["travel-insurance", "life-insurance"],
  },
  {
    slug: "professional-loan",
    kind: "loan",
    name: "Professional Loan",
    tagline: "Specialized funding for qualified professionals.",
    image: waProfessionalImg,
    description:
      "Customized unsecured funding solutions designed for Doctors, Chartered Accountants, Architects, and Consulting Professionals.",
    features: ["Loans up to ₹75 L", "No collateral required", "Special interest rates"],
    benefits: ["Flexible tenure options", "Doorstep service", "Speedy processing & disbursal"],
    eligibility: ["Qualified Doctor, CA, CS, or Architect", "Minimum 3 years of active practice", "Age 25–65 years"],
    documents: [...commonDocs, "Professional Degree Certificate", "Practice vintage proof", "ITR & Financial Statements (2 years)"],
    rate: "9.99% – 14.50% p.a.",
    tenure: "1 – 5 years",
    processingTime: "48 hours",
    subtypes: [
      { name: "Doctor Loan", description: "Tailored for setting up clinics, upgrading chambers, or emergency funds." },
      { name: "CA / Professional Loan", description: "Expand consulting firms, hire professionals, or modernize office spaces." },
    ],
    faqs: [
      { q: "Is collateral mandatory?", a: "No, professional loans are completely unsecured." },
    ],
    related: ["business-insurance", "professional-equipment-loan"],
  },
  {
    slug: "professional-equipment-loan",
    kind: "loan",
    name: "Professional Equipment Loan",
    tagline: "Finance state-of-the-art tools and equipment.",
    image: waEquipmentImg,
    description:
      "Finance the purchase of medical equipment, software, diagnostic tools, and office machinery for your professional practice.",
    features: ["Up to 90% funding of invoice value", "Loans up to ₹5 Cr", "Tenure up to 7 years"],
    benefits: ["Preserves working capital", "Flexible EMI options", "Tax depreciation benefits on equipment"],
    eligibility: ["Doctors, healthcare units, diagnostics labs, CAs, and architects", "Active practice of 3+ years"],
    documents: [...commonDocs, "Equipment proforma invoice / quotation", "Income tax returns (2 years)", "Business registration"],
    rate: "9.25% – 12.00% p.a.",
    tenure: "1 – 7 years",
    processingTime: "5–7 working days",
    subtypes: [
      { name: "Medical Equipment Financing", description: "Fund MRI machines, X-Ray equipment, dental chairs, and surgical tools." },
      { name: "Office Infrastructure Financing", description: "Fund servers, commercial software, and specialized machinery." },
    ],
    faqs: [
      { q: "Is the equipment itself considered collateral?", a: "Yes, the purchased equipment is hypothecated as primary security." },
    ],
    related: ["professional-loan", "business-insurance"],
  },
  {
    slug: "loan-against-property",
    kind: "loan",
    name: "Loan Against Property",
    tagline: "Unlock the value locked in your property.",
    image: mortgageImg,
    description:
      "Acquire high-value funds by mortgaging your residential, commercial, or industrial property while continuing to occupy it.",
    features: ["Loans up to ₹10 Cr", "Tenure up to 15 years", "Self-occupied or rented properties accepted"],
    benefits: ["Lower interest rates than unsecured loans", "High loan-to-value ratio (LTV)", "Flexible overdraft facilities"],
    eligibility: ["Age 25–70 years", "Property must have clear and marketable title", "Regular income stream"],
    documents: [...commonDocs, "Original property title deeds & chain documents", "Income proof / ITR (2 years)"],
    rate: "9.00% – 11.50% p.a.",
    tenure: "Up to 15 years",
    processingTime: "7–10 working days",
    subtypes: [
      { name: "Residential Property LAP", description: "Mortgage your residential house or flat." },
      { name: "Commercial Property LAP", description: "Mortgage offices, retail shops, or warehouses for capital." },
    ],
    faqs: [
      { q: "Can I still use the property?", a: "Yes, you retain full ownership and usage of the property." },
    ],
    related: ["property-insurance", "commercial-loan"],
  },
  {
    slug: "commercial-loan",
    kind: "loan",
    name: "Commercial Loan",
    tagline: "Finance commercial spaces and operations.",
    image: waCommercialImg,
    description:
      "Finance the purchase of commercial properties, offices, warehouses, or fund large scale corporate activities.",
    features: ["Loans up to ₹25 Cr", "Tenure up to 15 years", "Competitive corporate interest rates"],
    benefits: ["High loan limit", "Customized corporate structures", "Build business assets"],
    eligibility: ["Corporate entities, partnership firms, or proprietorships", "Min. annual revenue ₹1 Cr", "3+ years profitable records"],
    documents: [...commonDocs, "Company registration / partnership deed", "Audited financial statements (3 years)", "Property blueprint & clearance certificate"],
    rate: "8.75% – 11.00% p.a.",
    tenure: "Up to 15 years",
    processingTime: "10–14 working days",
    subtypes: [
      { name: "Commercial Space Purchase", description: "Buy office spaces, shops, showrooms, or godowns." },
      { name: "Construction Finance", description: "Funding for developers to build commercial complexes." },
    ],
    faqs: [
      { q: "What is the maximum LTV?", a: "Typically up to 60-70% of the property market value." },
    ],
    related: ["loan-against-property", "business-insurance"],
  },
  {
    slug: "car-loan",
    kind: "loan",
    name: "Car Loan",
    tagline: "Drive home your dream car.",
    image: vehicleImg,
    description:
      "Affordable car loans for purchasing new or used passenger cars, with quick online approval and flexible EMIs.",
    features: ["Up to 100% on-road financing", "Tenure up to 8 years", "Options for new & used cars"],
    benefits: ["Instant digital approval", "Attractive seasonal deals", "No hidden processing costs"],
    eligibility: ["Age 21–65 years", "Net monthly income ₹20,000+", "Valid driving license & proof of employment"],
    documents: [...commonDocs, "Car proforma invoice / quotation", "Income proof / salary slips (3 months)"],
    rate: "8.50% – 12.00% p.a.",
    tenure: "1 – 8 years",
    processingTime: "24–48 hours",
    subtypes: [
      { name: "New Car Loan", description: "Get up to 100% funding on the showroom price of a brand new car." },
      { name: "Used Car Loan", description: "Finance the purchase of certified pre-owned cars up to 8 years old." },
    ],
    faqs: [
      { q: "Is a down payment required?", a: "In most cases, we offer 90% to 100% on-road funding based on your credit profile." },
    ],
    related: ["motor-insurance"],
  },
  {
    slug: "hospital-funding",
    kind: "loan",
    name: "Hospital Funding",
    tagline: "Finance healthcare infrastructure and modernization.",
    image: waHospitalImg,
    description:
      "Specialized financial assistance for doctors, trusts, and corporations to set up hospitals, nursing homes, diagnostics labs, or upgrade healthcare centers.",
    features: ["Loans up to ₹50 Cr", "Tenure up to 15 years", "Structured repayment linked to hospital revenues"],
    benefits: ["Customized grace periods", "Funding for greenfield and brownfield projects", "Equipment bundling options"],
    eligibility: ["Registered medical trusts, firms, or private limited hospital entities", "Promoters with medical background"],
    documents: [...commonDocs, "Hospital registration & clearances", "Project feasibility report", "Audited balance sheet (3 years)"],
    rate: "8.50% – 10.75% p.a.",
    tenure: "Up to 15 years",
    processingTime: "15–20 working days",
    subtypes: [
      { name: "Infrastructure Expansion", description: "Fund construction of new wards, ICU rooms, or consulting units." },
      { name: "Specialized Lab Setup", description: "Setup advanced diagnostic clinics, CT scan labs, and pharmacies." },
    ],
    faqs: [
      { q: "Can trusts apply for hospital funding?", a: "Yes, registered healthcare trusts and societies are fully eligible." },
    ],
    related: ["professional-equipment-loan", "business-insurance"],
  },
  {
    slug: "educational-institution-funding",
    kind: "loan",
    name: "Educational Institution Funding",
    tagline: "Empower academic growth & infrastructure.",
    image: waEduInstImg,
    description:
      "Comprehensive funding for schools, colleges, universities, and coaching institutes to construct campuses, labs, hostels, or upgrade tech equipment.",
    features: ["Funding up to ₹30 Cr", "Tenure up to 12 years", "Low interest rates for registered trusts"],
    benefits: ["Capital for modernizing classrooms", "Flexible disbursement schedules", "Support for smart-class setup"],
    eligibility: ["Registered educational societies, trusts, or private institutes", "Valid recognition certificate (UGC/AICTE/State Board)"],
    documents: [...commonDocs, "Trust deed / Society registration", "FCRA & tax exemption certificates if applicable", "Audited financials (3 years)"],
    rate: "8.75% – 11.50% p.a.",
    tenure: "3 – 12 years",
    processingTime: "15–20 working days",
    subtypes: [
      { name: "Campus Construction", description: "Build libraries, chemistry labs, residential halls, or athletic centers." },
      { name: "Tech & Equipment Upgrade", description: "Procure computers, interactive displays, and campus-wide high speed Wi-Fi." },
    ],
    faqs: [
      { q: "Can we get funding for school buses?", a: "Yes, vehicle purchase funding can be bundled under this scheme." },
    ],
    related: ["education-loan", "property-insurance"],
  },
  {
    slug: "property-loan",
    kind: "loan",
    name: "Property Loan",
    tagline: "Own your residential or commercial property.",
    image: homeImg,
    description:
      "Finance the purchase, building, extension, or renovation of residential and commercial properties with flexible terms.",
    features: ["Loans up to ₹10 Cr", "Tenure up to 30 years", "Doorstep documentation"],
    benefits: ["Competitive interest rates", "Tax deductions under Section 80C & 24(b)", "Easy balance transfers"],
    eligibility: ["Resident Indian, age 21–65 years", "Steady monthly income or business record", "CIBIL score 700+"],
    documents: [...commonDocs, "Property sale agreement & registration deeds", "Salary slips (3 months) / Business ITR (2 years)"],
    rate: "8.35% – 10.50% p.a.",
    tenure: "Up to 30 years",
    processingTime: "5–7 working days",
    subtypes: [
      { name: "Home Purchase", description: "Buy a ready or under-construction flat, villa, or independent house." },
      { name: "Plot Purchase & Construction", description: "Acquire residential land and build a custom home." },
      { name: "Commercial Office Purchase", description: "Finance corporate workspace or retail outlet units." },
    ],
    faqs: [
      { q: "Can I transfer my existing property loan?", a: "Yes, balance transfers are supported at reduced interest rates." },
    ],
    related: ["property-insurance", "loan-against-property"],
  },
  {
    slug: "gold-loan",
    kind: "loan",
    name: "Gold Loan",
    tagline: "Instant liquidity against your gold ornaments.",
    image: goldImg,
    description:
      "Unlock the value of your gold ornaments instantly with low interest rates, flexible repayment options, and maximum safety of your assets.",
    features: ["Loans up to ₹50 Lakhs", "Same-day cash disbursal", "Minimal documentation & zero hidden charges"],
    benefits: ["Highest LTV (Loan-to-Value) ratio", "Secure vault storage with insurance", "Pay interest only on outstanding amount"],
    eligibility: ["Age 18–70 years", "Must own gold ornaments (18 karat & above)", "Indian citizenship"],
    documents: [...commonDocs, "Proof of ownership of gold (optional/declaration)"],
    rate: "7.90% – 12.00% p.a.",
    tenure: "3 months – 2 years",
    processingTime: "1 hour",
    subtypes: [
      { name: "Bullet Repayment", description: "Pay interest and principal together at the end of the tenure." },
      { name: "Monthly Interest Pay", description: "Pay interest monthly, principal at the end of the term." },
    ],
    faqs: [
      { q: "Is a CIBIL score required for a gold loan?", a: "No. Since gold loans are secured, credit score requirement is extremely lenient." },
      { q: "How is my gold stored?", a: "Your gold is valued and stored in highly secure, fireproof vaults protected by 24/7 security and comprehensive insurance coverage." },
    ],
    related: ["personal-loan", "property-loan"],
  },
];

export const insurance: CatalogItem[] = [
  {
    slug: "health-insurance",
    kind: "insurance",
    name: "Health Insurance",
    tagline: "Care that stands beside you.",
    image: healthImg,
    description:
      "Financial protection against hospitalisation, surgeries, day-care treatments and healthcare expenses for individuals and families.",
    features: ["Cashless treatment at 10,000+ hospitals", "No sub-limits", "Restore benefit"],
    benefits: [
      "Tax benefit under Section 80D",
      "Free annual health check-up",
      "AYUSH treatment covered",
    ],
    eligibility: ["Entry age 18–65", "Renewable lifelong", "Pre-existing waiting period 2–4 yrs"],
    documents: [
      ...commonDocs,
      "Medical history questionnaire",
      "Recent medical reports (if age 45+)",
    ],
    premium: "From ₹4,999 / year",
    coverage: "₹3 L – ₹1 Cr sum insured",
    processingTime: "Instant policy issuance",
    faqs: [
      {
        q: "Is COVID-19 covered?",
        a: "Yes, hospitalisation for COVID-19 is fully covered under the base plan.",
      },
      {
        q: "What is a restore benefit?",
        a: "If the sum insured gets exhausted, it is automatically restored once during the policy year.",
      },
    ],
    related: ["family-insurance", "personal-loan"],
  },
  {
    slug: "family-insurance",
    kind: "insurance",
    name: "Family Insurance",
    tagline: "One policy. Everyone protected.",
    image: familyImg,
    description:
      "A comprehensive family floater health plan that covers the entire family under a single policy with shared benefits.",
    features: ["Covers self, spouse, kids & parents", "Single premium", "Shared sum insured"],
    benefits: [
      "Better value than individual plans",
      "Automatic add-on for newborns",
      "Global emergency coverage",
    ],
    eligibility: ["Adults 18–65, kids 91 days – 25 yrs", "Up to 6 family members"],
    documents: [...commonDocs, "Family details form"],
    premium: "From ₹8,999 / year",
    coverage: "₹5 L – ₹1 Cr floater",
    processingTime: "Instant",
    faqs: [
      {
        q: "Can parents be added later?",
        a: "Yes, senior parents can be added at renewal with fresh medical underwriting.",
      },
    ],
    related: ["health-insurance", "life-insurance"],
  },
  {
    slug: "life-insurance",
    kind: "insurance",
    name: "Life Insurance",
    tagline: "Security for the ones you love.",
    image: lifeImg,
    description:
      "Provides financial security to the nominee in case of the policyholder's unfortunate demise while also offering long-term savings and wealth-creation options.",
    features: [
      "Term, endowment, ULIP & whole-life plans",
      "Riders for critical illness & accident",
      "Loyalty additions",
    ],
    benefits: [
      "Section 80C & 10(10D) tax benefits",
      "Guaranteed maturity in traditional plans",
      "Nominee protection",
    ],
    eligibility: ["Entry age 18–65", "Policy term up to 40 years"],
    documents: [...commonDocs, "Income proof", "Medical questionnaire"],
    premium: "From ₹6,000 / year",
    coverage: "₹10 L – ₹5 Cr sum assured",
    processingTime: "3–5 working days",
    faqs: [
      {
        q: "Which plan is best for me?",
        a: "Pure term plans give the highest cover at lowest cost; endowment/ULIPs combine savings with cover.",
      },
    ],
    related: ["health-insurance", "child-plans"],
  },
  {
    slug: "child-plans",
    kind: "insurance",
    name: "Child Education Plan",
    tagline: "Give their dreams a head start.",
    image: childImg,
    description:
      "Helps parents build funds for their children's higher education while providing life coverage during the policy term with a waiver-of-premium benefit.",
    features: [
      "Guaranteed maturity payout",
      "Waiver of premium on parent's death",
      "Milestone-based payouts",
    ],
    benefits: [
      "Locks in child's future goals",
      "Disciplined long-term savings",
      "Tax-efficient wealth transfer",
    ],
    eligibility: ["Parent age 18–55", "Child age 0–17"],
    documents: [...commonDocs, "Child's birth proof"],
    premium: "From ₹18,000 / year",
    coverage: "₹10 L – ₹1 Cr",
    processingTime: "5 working days",
    faqs: [
      {
        q: "What is waiver-of-premium?",
        a: "If the parent passes away, future premiums are waived but the plan continues and the child receives all benefits.",
      },
    ],
    related: ["education-loan", "life-insurance"],
  },
  {
    slug: "pension-plans",
    kind: "insurance",
    name: "Retirement / Pension Plan",
    tagline: "Retire with dignity and income.",
    image: pensionImg,
    description:
      "Build a retirement corpus with regular pension income after retirement, ensuring lifelong financial independence.",
    features: [
      "Immediate & deferred annuity options",
      "Joint-life pension",
      "Return of purchase price",
    ],
    benefits: [
      "Guaranteed monthly income",
      "Section 80CCC tax benefit",
      "Inflation-linked options",
    ],
    eligibility: ["Entry age 30–75", "Vesting age up to 85"],
    documents: [...commonDocs, "Nominee details"],
    premium: "From ₹25,000 / year (deferred)",
    coverage: "As per selected annuity",
    processingTime: "7 working days",
    faqs: [
      {
        q: "Can I get a lump sum?",
        a: "You can commute up to one-third of the corpus as lump sum; the balance funds your pension.",
      },
    ],
    related: ["life-insurance"],
  },
  {
    slug: "property-insurance",
    kind: "insurance",
    name: "Property Insurance",
    tagline: "Guard your walls and everything within.",
    image: propertyImg,
    description:
      "Protect residential or commercial properties against fire, natural disasters, theft, and accidental damage — structure and contents both.",
    features: ["Fire & allied perils", "Burglary cover", "Natural calamities included"],
    benefits: ["Rebuilding-cost basis", "Optional rent-loss cover", "Bundled home appliance cover"],
    eligibility: ["Any legal owner or tenant of the property"],
    documents: [...commonDocs, "Property ownership / rent agreement", "Valuation report"],
    premium: "From ₹1,999 / year",
    coverage: "Up to ₹5 Cr",
    processingTime: "24 hours",
    faqs: [
      {
        q: "Is earthquake covered?",
        a: "Yes, all natural perils including earthquakes and floods are covered under the standard fire & allied perils policy.",
      },
    ],
    related: ["home-loan", "family-insurance"],
  },
  {
    slug: "motor-insurance",
    kind: "insurance",
    name: "Motor Insurance",
    tagline: "Drive with total peace of mind.",
    image: motorImg,
    description:
      "Financial protection against accidents, theft, natural calamities, and third-party liabilities — for all vehicle categories.",
    features: [
      "Comprehensive & third-party plans",
      "Zero-depreciation add-on",
      "24×7 roadside assistance",
    ],
    benefits: [
      "Cashless repairs at 6,000+ garages",
      "No-claim bonus up to 50%",
      "Own-damage + third-party in one",
    ],
    eligibility: ["Valid RC & driving licence", "Vehicle age within policy limits"],
    documents: ["RC copy", "Previous insurance policy (for renewal)", "Aadhaar / PAN"],
    premium: "From ₹2,499 / year",
    coverage: "IDV of the vehicle",
    processingTime: "Instant",
    subtypes: [
      {
        name: "Car Insurance",
        description:
          "Comprehensive protection for private four-wheelers with zero-dep and engine cover add-ons.",
      },
      {
        name: "Bike Insurance",
        description: "Two-wheeler policies with pillion cover, RSA and consumables add-ons.",
      },
      {
        name: "Commercial Vehicle Insurance",
        description:
          "Fleet and single-vehicle cover for taxis, trucks and commercial goods carriers.",
      },
    ],
    faqs: [
      {
        q: "What is IDV?",
        a: "Insured Declared Value — the current market value of your vehicle, which is the maximum claim amount.",
      },
    ],
    related: ["vehicle-loan"],
  },
  {
    slug: "travel-insurance",
    kind: "insurance",
    name: "Travel Insurance",
    tagline: "Journey without a worry.",
    image: travelImg,
    description:
      "Protects travellers against trip cancellations, medical emergencies, lost baggage, passport loss and other travel-related risks — anywhere in the world.",
    features: ["Worldwide medical cover", "Trip cancellation & delay", "Lost passport & baggage"],
    benefits: [
      "Cashless hospitalisation abroad",
      "24×7 global assistance helpline",
      "Adventure sports add-on",
    ],
    eligibility: ["Age 3 months – 85 years", "Valid passport for international travel"],
    documents: ["Passport / ID", "Travel itinerary"],
    premium: "From ₹399 / trip",
    coverage: "Up to USD 500,000",
    processingTime: "Instant e-policy",
    subtypes: [
      {
        name: "Domestic Travel",
        description: "Cover for medical emergencies, cancellations and baggage loss inside India.",
      },
      {
        name: "International Travel",
        description: "Worldwide medical + trip cover with 24×7 global assistance.",
      },
      {
        name: "Student Travel",
        description:
          "Long-duration policies for students studying abroad, including sponsor protection.",
      },
      {
        name: "Senior Citizen Travel",
        description:
          "Specially designed plans for travellers aged 60+ with pre-existing disease cover.",
      },
    ],
    faqs: [
      {
        q: "Does it cover trip cancellation?",
        a: "Yes, non-refundable trip costs are covered for specified reasons like illness, natural disasters, and airline strikes.",
      },
    ],
    related: ["health-insurance"],
  },
  {
    slug: "business-insurance",
    kind: "insurance",
    name: "Business Insurance",
    tagline: "Cover for the enterprise you built.",
    image: businessInsImg,
    description:
      "Comprehensive protection for shops, offices and enterprises against property damage, liability, cyber risks and employee-related claims.",
    features: [
      "Property, liability & cyber cover",
      "Group health for employees",
      "Business interruption cover",
    ],
    benefits: ["One policy, multiple protections", "Tailored for MSMEs", "Fast claim settlement"],
    eligibility: ["Any registered business or professional"],
    documents: [...commonDocs, "Business registration", "Asset valuation"],
    premium: "From ₹9,999 / year",
    coverage: "Up to ₹25 Cr",
    processingTime: "3 working days",
    faqs: [
      {
        q: "Is cyber liability included?",
        a: "Available as an add-on covering data breach response, ransomware and third-party claims.",
      },
    ],
    related: ["business-loan", "property-insurance"],
  },
];

export const services: {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  eligibility: string[];
  documents: string[];
}[] = [
  {
    slug: "aadhaar-services",
    name: "Aadhaar Services",
    tagline: "New enrolment, updates & downloads.",
    description:
      "End-to-end assistance for Aadhaar enrolment, biometric updates, mobile-number linking, address change, and e-Aadhaar downloads at any registered centre.",
    eligibility: ["Any Indian resident", "Children require parent's Aadhaar for enrolment"],
    documents: [
      "Existing Aadhaar (for updates)",
      "Proof of Identity",
      "Proof of Address",
      "Recent photograph",
    ],
  },
  {
    slug: "pan-services",
    name: "PAN Services",
    tagline: "New PAN, corrections & e-PAN in 48 hours.",
    description:
      "Apply for new PAN, correct existing PAN details, link PAN with Aadhaar, and download e-PAN — fully digital with minimum paperwork.",
    eligibility: ["Individuals, HUFs, firms and companies", "Minors through guardian"],
    documents: ["Aadhaar card", "Address proof", "Date-of-birth proof", "Photograph"],
  },
  {
    slug: "salary-account",
    name: "Salary Account Assistance",
    tagline: "Zero-balance corporate salary accounts.",
    description:
      "Open zero-balance salary accounts with premium debit cards, complimentary insurance and personal-loan pre-approvals through our partner banks.",
    eligibility: ["Salaried employees of registered organisations", "Age 18+"],
    documents: ["Aadhaar", "PAN", "Latest salary slip", "Company ID card"],
  },
  {
    slug: "mobile-banking",
    name: "Mobile Banking Services",
    tagline: "Bank on the go, hassle-free.",
    description:
      "Registration, activation and troubleshooting for mobile-banking apps of leading banks — transfers, bill payments, UPI setup and card controls.",
    eligibility: ["Active bank account", "Registered mobile number"],
    documents: ["Aadhaar", "Bank passbook / cheque", "Active debit card (for UPI setup)"],
  },
  {
    slug: "gps-tracking",
    name: "GPS / Vehicle Tracking Assistance",
    tagline: "AIS-140 compliant vehicle tracking.",
    description:
      "Sourcing, installation and RTO-compliance support for GPS tracking devices used in commercial vehicles, cabs and school buses.",
    eligibility: ["Commercial vehicle owners", "Fleet operators"],
    documents: ["Vehicle RC", "Owner's Aadhaar / PAN", "Fitness certificate"],
  },
  {
    slug: "documentation-support",
    name: "Documentation Support",
    tagline: "Paperwork made simple.",
    description:
      "Assistance with affidavits, form-filling, notarisation, income & residence certificates, and legal document collation for loan and insurance applications.",
    eligibility: ["Any customer"],
    documents: ["Existing supporting documents as per requirement"],
  },
];

export function findLoan(slug: string) {
  return loans.find((l) => l.slug === slug);
}
export function findInsurance(slug: string) {
  return insurance.find((i) => i.slug === slug);
}
export function findService(slug: string) {
  return services.find((s) => s.slug === slug);
}
export function findCatalogItem(slug: string): CatalogItem | undefined {
  return findLoan(slug) ?? findInsurance(slug);
}
