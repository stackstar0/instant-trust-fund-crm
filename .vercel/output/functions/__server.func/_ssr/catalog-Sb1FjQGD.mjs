//#region node_modules/.nitro/vite/services/ssr/assets/catalog-Sb1FjQGD.js
var loan_home_default = "/assets/loan-home-DZbG7mHf.jpg";
var loan_mortgage_default = "/assets/loan-mortgage-uSlUmTto.jpg";
var loan_business_default = "/assets/loan-business-tplTqzN_.jpg";
var loan_vehicle_default = "/assets/loan-vehicle-DRKjCD7H.jpg";
var loan_education_default = "/assets/loan-education-BdgBK4ln.jpg";
var loan_personal_default = "/assets/loan-personal-CdXPseeC.jpg";
var loan_gold_default = "/assets/loan-gold-D_uwzGOF.jpg";
var insurance_health_default = "/assets/insurance-health-Drh0TXzt.jpg";
var insurance_family_default = "/assets/insurance-family-B0lf9olR.jpg";
var insurance_life_default = "/assets/insurance-life-g_K7oU0L.jpg";
var insurance_child_default = "/assets/insurance-child-VRaZtcPc.jpg";
var insurance_pension_default = "/assets/insurance-pension-BD1BrFsw.jpg";
var insurance_property_default = "/assets/insurance-property-DJ64u8CT.jpg";
var insurance_motor_default = "/assets/insurance-motor-DO2NZLt5.jpg";
var insurance_travel_default = "/assets/insurance-travel-D2IJyWEK.jpg";
var insurance_business_default = "/assets/insurance-business-nLRl-0VT.jpg";
var commonDocs = [
	"Aadhaar card",
	"PAN card",
	"Recent passport-size photograph",
	"Address proof (utility bill / rent agreement)",
	"Latest 6 months bank statement"
];
var loans = [
	{
		slug: "home-loan",
		kind: "loan",
		name: "Home Loan",
		tagline: "Own your dream home with the lowest EMIs.",
		image: loan_home_default,
		description: "Finance the purchase, construction, renovation or extension of residential properties with flexible repayment tenures up to 30 years and competitive floating & fixed interest rates.",
		features: [
			"Loans up to ₹5 Cr",
			"Tenure up to 30 years",
			"Zero prepayment charges",
			"Doorstep documentation"
		],
		benefits: [
			"Attractive interest starting 8.35% p.a.",
			"Tax benefits under Section 80C & 24(b)",
			"Balance transfer at reduced rates",
			"Top-up loan facility available"
		],
		eligibility: [
			"Indian resident, age 21–65 years",
			"Minimum monthly income ₹25,000 (salaried) / ₹3 L p.a. (self-employed)",
			"CIBIL score 700+ preferred"
		],
		documents: [
			...commonDocs,
			"Salary slips (last 3 months) / ITR (2 yrs)",
			"Property documents / sale agreement"
		],
		rate: "8.35% – 10.25% p.a.",
		tenure: "Up to 30 years",
		processingTime: "5–7 working days",
		subtypes: [
			{
				name: "Home Purchase Loan",
				description: "Finance the purchase of a ready-to-move or under-construction house / flat."
			},
			{
				name: "Home Construction Loan",
				description: "Fund the construction of a house on land you already own, disbursed in stages."
			},
			{
				name: "Home Extension Loan",
				description: "Add an extra room, floor or balcony to your existing home."
			},
			{
				name: "Home Renovation Loan",
				description: "Renovate, remodel and modernise your existing residence."
			},
			{
				name: "Plot Purchase Loan",
				description: "Buy a residential plot for future construction or long-term investment."
			},
			{
				name: "Balance Transfer Home Loan",
				description: "Transfer your existing home loan to us and save on interest with a top-up option."
			}
		],
		faqs: [
			{
				q: "What is the maximum loan-to-value ratio?",
				a: "Up to 90% of the property value for loans below ₹30 L, 80% for loans up to ₹75 L, and 75% above that."
			},
			{
				q: "Are foreclosure charges applicable?",
				a: "Nil foreclosure charges on floating-rate home loans for individual borrowers."
			},
			{
				q: "How is my EMI calculated?",
				a: "EMI is based on loan amount, interest rate, and tenure. Use our EMI calculator to estimate."
			}
		],
		related: ["property-insurance", "life-insurance"]
	},
	{
		slug: "mortgage-loan",
		kind: "loan",
		name: "Mortgage Loan",
		tagline: "Unlock the value of your property.",
		image: loan_mortgage_default,
		description: "Get funds by mortgaging your residential, commercial or land property while continuing to own and use it. Ideal for large personal or business expenses.",
		features: [
			"Loans up to ₹10 Cr",
			"Tenure up to 15 years",
			"Loan against self-occupied or rented property"
		],
		benefits: [
			"Lower interest than unsecured loans",
			"Overdraft facility",
			"Retain ownership & usage"
		],
		eligibility: [
			"Age 25–70 years",
			"Clear property title",
			"Stable income source"
		],
		documents: [
			...commonDocs,
			"Property title & chain documents",
			"Income proof / ITR"
		],
		rate: "9.25% – 11.50% p.a.",
		tenure: "Up to 15 years",
		processingTime: "7–10 working days",
		subtypes: [
			{
				name: "Loan Against Property",
				description: "General-purpose loan secured by a mortgage on your residential or commercial property."
			},
			{
				name: "Residential Property Mortgage",
				description: "Higher LTV loan against self-occupied or rented residential property."
			},
			{
				name: "Commercial Property Mortgage",
				description: "Mortgage your shop, office or commercial unit for working capital or expansion."
			},
			{
				name: "Land Mortgage Loan",
				description: "Raise funds against non-agricultural land with clear title."
			}
		],
		faqs: [{
			q: "Can I mortgage a rented property?",
			a: "Yes, provided you are the sole owner and the property has a clear title."
		}, {
			q: "What is the maximum LTV?",
			a: "Up to 70% of the market value of the mortgaged property."
		}],
		related: ["property-insurance", "business-loan"]
	},
	{
		slug: "business-loan",
		kind: "loan",
		name: "Business Loan",
		tagline: "Fuel your enterprise, at your pace.",
		image: loan_business_default,
		description: "Business loans designed to help entrepreneurs start, expand or manage working capital with flexible collateral-free options and quick disbursal.",
		features: [
			"Collateral-free up to ₹50 L",
			"Tenure up to 7 years",
			"Same-day sanction (in-principle)"
		],
		benefits: [
			"Minimal documentation",
			"Flexible repayment structures",
			"Overdraft & term loan mix"
		],
		eligibility: [
			"Business vintage 2+ years",
			"Annual turnover ₹20 L+",
			"Positive credit history"
		],
		documents: [
			...commonDocs,
			"GST returns (last 12 months)",
			"ITR of business (2 yrs)",
			"Udyam / MSME registration"
		],
		rate: "11.50% – 18.00% p.a.",
		tenure: "1 – 7 years",
		processingTime: "3–5 working days",
		subtypes: [
			{
				name: "MSME Loan",
				description: "Priority-sector loans for micro, small and medium enterprises under government-linked schemes."
			},
			{
				name: "Startup Loan",
				description: "Seed funding for early-stage founders with strong business plans."
			},
			{
				name: "Working Capital Loan",
				description: "Meet day-to-day operational cashflow needs with an overdraft or cash-credit line."
			},
			{
				name: "Machinery Loan",
				description: "Finance new plant, machinery or equipment purchase up to 100% of invoice."
			},
			{
				name: "Business Expansion Loan",
				description: "Scale operations, open new branches or launch new product lines."
			},
			{
				name: "Cash Flow Loan",
				description: "Short-term loan against future receivables to smoothen seasonal cashflow."
			}
		],
		faqs: [{
			q: "Do I need collateral?",
			a: "Loans up to ₹50 L are typically collateral-free under CGTMSE-linked schemes."
		}, {
			q: "How fast is disbursal?",
			a: "In-principle sanction within 48 hours; disbursal in 3–5 working days after documentation."
		}],
		related: ["business-insurance", "mortgage-loan"]
	},
	{
		slug: "vehicle-loan",
		kind: "loan",
		name: "Vehicle Loan",
		tagline: "Drive home your dream vehicle today.",
		image: loan_vehicle_default,
		description: "Finance new or used vehicles for personal or commercial use with affordable EMIs and up to 100% on-road funding.",
		features: [
			"Up to 100% on-road financing",
			"Tenure up to 8 years",
			"New & used vehicles"
		],
		benefits: [
			"Instant approval",
			"Attractive festive offers",
			"Doorstep service"
		],
		eligibility: [
			"Age 21–65",
			"Steady monthly income ₹20,000+",
			"Valid driving licence"
		],
		documents: [
			...commonDocs,
			"Vehicle quotation / invoice",
			"Salary slips / ITR"
		],
		rate: "8.75% – 12.50% p.a.",
		tenure: "1 – 8 years",
		processingTime: "24–48 hours",
		subtypes: [
			{
				name: "Car Loan",
				description: "Finance a new or pre-owned passenger car with up to 100% on-road funding."
			},
			{
				name: "Two Wheeler Loan",
				description: "Own a bike or scooter with quick approval and low down payment."
			},
			{
				name: "Commercial Vehicle Loan",
				description: "Finance trucks, buses, tempos and light commercial vehicles for your business."
			},
			{
				name: "Tractor Loan",
				description: "Special agri-tractor financing for farmers with flexible seasonal repayment."
			},
			{
				name: "Electric Vehicle Loan",
				description: "Green EV loans at concessional rates for eligible electric cars and two-wheelers."
			}
		],
		faqs: [{
			q: "Can I get 100% funding?",
			a: "Yes, up to 100% on-road for salaried customers with strong credit profile."
		}, {
			q: "Is used-car financing available?",
			a: "Yes, for cars up to 8 years old with proper valuation."
		}],
		related: ["motor-insurance"]
	},
	{
		slug: "education-loan",
		kind: "loan",
		name: "Education Loan",
		tagline: "Invest in a brighter tomorrow.",
		image: loan_education_default,
		description: "Support higher education expenses including tuition fees, accommodation, books and travel — in India or abroad.",
		features: [
			"Loans up to ₹1.5 Cr for abroad studies",
			"Moratorium during course + 6 months",
			"No margin up to ₹4 L"
		],
		benefits: [
			"Interest subsidy for eligible students",
			"Tax benefit under Section 80E",
			"Covers full cost of study"
		],
		eligibility: [
			"Indian resident",
			"Confirmed admission to recognised institution",
			"Co-applicant (parent / guardian)"
		],
		documents: [
			...commonDocs,
			"Admission letter",
			"Fee structure",
			"Academic records",
			"Co-applicant income proof"
		],
		rate: "8.60% – 12.00% p.a.",
		tenure: "Up to 15 years post-moratorium",
		processingTime: "5–10 working days",
		subtypes: [
			{
				name: "Domestic Education Loan",
				description: "Fund courses at Indian universities and premier institutes."
			},
			{
				name: "Overseas Education Loan",
				description: "Cover tuition, living and travel expenses for studies abroad."
			},
			{
				name: "Professional Course Loan",
				description: "Loans for CA, CS, MBA, medical and other professional programmes."
			},
			{
				name: "Skill Development Loan",
				description: "Short-term vocational and certification course financing."
			}
		],
		faqs: [{
			q: "Do I need collateral?",
			a: "Not required for loans up to ₹7.5 L; above that, a suitable collateral is required."
		}, {
			q: "When do EMIs start?",
			a: "Post the moratorium — course duration plus 6 months."
		}],
		related: ["child-plans", "life-insurance"]
	},
	{
		slug: "personal-loan",
		kind: "loan",
		name: "Personal Loan",
		tagline: "Instant funds for life's every moment.",
		image: loan_personal_default,
		description: "Instant unsecured personal loans for medical, marriage, travel, festivals and other personal financial needs — without collateral.",
		features: [
			"Up to ₹40 L",
			"Tenure up to 6 years",
			"100% online approval"
		],
		benefits: [
			"No collateral",
			"Flexible EMIs",
			"Disbursal within 24 hours"
		],
		eligibility: [
			"Age 21–60",
			"Monthly income ₹25,000+",
			"CIBIL score 720+"
		],
		documents: commonDocs,
		rate: "10.50% – 22.00% p.a.",
		tenure: "1 – 6 years",
		processingTime: "24 hours",
		subtypes: [
			{
				name: "Medical Loan",
				description: "Cover planned or emergency medical expenses with instant disbursal."
			},
			{
				name: "Marriage Loan",
				description: "Finance every wedding expense from venue to jewellery."
			},
			{
				name: "Travel Loan",
				description: "Fund your dream holiday, honeymoon or pilgrimage."
			},
			{
				name: "Emergency Loan",
				description: "Same-day funds for urgent unforeseen expenses."
			},
			{
				name: "Festival Loan",
				description: "Special short-tenure loans for Diwali, Eid and other festival needs."
			}
		],
		faqs: [{
			q: "Is there any collateral?",
			a: "No. Personal loans are fully unsecured."
		}, {
			q: "Can I prepay?",
			a: "Yes, with a nominal 2–4% foreclosure fee after 6 months."
		}],
		related: ["health-insurance"]
	},
	{
		slug: "gold-loan",
		kind: "loan",
		name: "Gold Loan",
		tagline: "Turn your gold into instant cash.",
		image: loan_gold_default,
		description: "Secure quick financing by pledging gold ornaments with minimal documentation and fast approval — funds in 30 minutes.",
		features: [
			"Loans up to ₹50 L",
			"Up to 75% LTV of gold value",
			"Interest from 8.50%"
		],
		benefits: [
			"Doorstep gold pickup available",
			"Safe locker storage",
			"No income proof needed"
		],
		eligibility: ["Age 18+", "Any Indian citizen with valid ID"],
		documents: [
			"Aadhaar card",
			"PAN card",
			"Recent photograph"
		],
		rate: "8.50% – 15.00% p.a.",
		tenure: "3 months – 3 years",
		processingTime: "30 minutes",
		subtypes: [
			{
				name: "Personal Gold Loan",
				description: "General-purpose loan against 18–24 carat gold ornaments."
			},
			{
				name: "Business Gold Loan",
				description: "Working-capital gold loan for MSMEs and small traders."
			},
			{
				name: "Agricultural Gold Loan",
				description: "Concessional gold loans for farmers under priority-sector schemes."
			}
		],
		faqs: [{
			q: "What purity of gold is accepted?",
			a: "18 to 24 carat gold ornaments and specified coins."
		}, {
			q: "Is the gold safe?",
			a: "Yes — stored in bank-grade insured vaults with 24×7 security."
		}],
		related: ["personal-loan"]
	}
];
var insurance = [
	{
		slug: "health-insurance",
		kind: "insurance",
		name: "Health Insurance",
		tagline: "Care that stands beside you.",
		image: insurance_health_default,
		description: "Financial protection against hospitalisation, surgeries, day-care treatments and healthcare expenses for individuals and families.",
		features: [
			"Cashless treatment at 10,000+ hospitals",
			"No sub-limits",
			"Restore benefit"
		],
		benefits: [
			"Tax benefit under Section 80D",
			"Free annual health check-up",
			"AYUSH treatment covered"
		],
		eligibility: [
			"Entry age 18–65",
			"Renewable lifelong",
			"Pre-existing waiting period 2–4 yrs"
		],
		documents: [
			...commonDocs,
			"Medical history questionnaire",
			"Recent medical reports (if age 45+)"
		],
		premium: "From ₹4,999 / year",
		coverage: "₹3 L – ₹1 Cr sum insured",
		processingTime: "Instant policy issuance",
		faqs: [{
			q: "Is COVID-19 covered?",
			a: "Yes, hospitalisation for COVID-19 is fully covered under the base plan."
		}, {
			q: "What is a restore benefit?",
			a: "If the sum insured gets exhausted, it is automatically restored once during the policy year."
		}],
		related: ["family-insurance", "personal-loan"]
	},
	{
		slug: "family-insurance",
		kind: "insurance",
		name: "Family Insurance",
		tagline: "One policy. Everyone protected.",
		image: insurance_family_default,
		description: "A comprehensive family floater health plan that covers the entire family under a single policy with shared benefits.",
		features: [
			"Covers self, spouse, kids & parents",
			"Single premium",
			"Shared sum insured"
		],
		benefits: [
			"Better value than individual plans",
			"Automatic add-on for newborns",
			"Global emergency coverage"
		],
		eligibility: ["Adults 18–65, kids 91 days – 25 yrs", "Up to 6 family members"],
		documents: [...commonDocs, "Family details form"],
		premium: "From ₹8,999 / year",
		coverage: "₹5 L – ₹1 Cr floater",
		processingTime: "Instant",
		faqs: [{
			q: "Can parents be added later?",
			a: "Yes, senior parents can be added at renewal with fresh medical underwriting."
		}],
		related: ["health-insurance", "life-insurance"]
	},
	{
		slug: "life-insurance",
		kind: "insurance",
		name: "Life Insurance",
		tagline: "Security for the ones you love.",
		image: insurance_life_default,
		description: "Provides financial security to the nominee in case of the policyholder's unfortunate demise while also offering long-term savings and wealth-creation options.",
		features: [
			"Term, endowment, ULIP & whole-life plans",
			"Riders for critical illness & accident",
			"Loyalty additions"
		],
		benefits: [
			"Section 80C & 10(10D) tax benefits",
			"Guaranteed maturity in traditional plans",
			"Nominee protection"
		],
		eligibility: ["Entry age 18–65", "Policy term up to 40 years"],
		documents: [
			...commonDocs,
			"Income proof",
			"Medical questionnaire"
		],
		premium: "From ₹6,000 / year",
		coverage: "₹10 L – ₹5 Cr sum assured",
		processingTime: "3–5 working days",
		faqs: [{
			q: "Which plan is best for me?",
			a: "Pure term plans give the highest cover at lowest cost; endowment/ULIPs combine savings with cover."
		}],
		related: ["health-insurance", "child-plans"]
	},
	{
		slug: "child-plans",
		kind: "insurance",
		name: "Child Education Plan",
		tagline: "Give their dreams a head start.",
		image: insurance_child_default,
		description: "Helps parents build funds for their children's higher education while providing life coverage during the policy term with a waiver-of-premium benefit.",
		features: [
			"Guaranteed maturity payout",
			"Waiver of premium on parent's death",
			"Milestone-based payouts"
		],
		benefits: [
			"Locks in child's future goals",
			"Disciplined long-term savings",
			"Tax-efficient wealth transfer"
		],
		eligibility: ["Parent age 18–55", "Child age 0–17"],
		documents: [...commonDocs, "Child's birth proof"],
		premium: "From ₹18,000 / year",
		coverage: "₹10 L – ₹1 Cr",
		processingTime: "5 working days",
		faqs: [{
			q: "What is waiver-of-premium?",
			a: "If the parent passes away, future premiums are waived but the plan continues and the child receives all benefits."
		}],
		related: ["education-loan", "life-insurance"]
	},
	{
		slug: "pension-plans",
		kind: "insurance",
		name: "Retirement / Pension Plan",
		tagline: "Retire with dignity and income.",
		image: insurance_pension_default,
		description: "Build a retirement corpus with regular pension income after retirement, ensuring lifelong financial independence.",
		features: [
			"Immediate & deferred annuity options",
			"Joint-life pension",
			"Return of purchase price"
		],
		benefits: [
			"Guaranteed monthly income",
			"Section 80CCC tax benefit",
			"Inflation-linked options"
		],
		eligibility: ["Entry age 30–75", "Vesting age up to 85"],
		documents: [...commonDocs, "Nominee details"],
		premium: "From ₹25,000 / year (deferred)",
		coverage: "As per selected annuity",
		processingTime: "7 working days",
		faqs: [{
			q: "Can I get a lump sum?",
			a: "You can commute up to one-third of the corpus as lump sum; the balance funds your pension."
		}],
		related: ["life-insurance"]
	},
	{
		slug: "property-insurance",
		kind: "insurance",
		name: "Property Insurance",
		tagline: "Guard your walls and everything within.",
		image: insurance_property_default,
		description: "Protect residential or commercial properties against fire, natural disasters, theft, and accidental damage — structure and contents both.",
		features: [
			"Fire & allied perils",
			"Burglary cover",
			"Natural calamities included"
		],
		benefits: [
			"Rebuilding-cost basis",
			"Optional rent-loss cover",
			"Bundled home appliance cover"
		],
		eligibility: ["Any legal owner or tenant of the property"],
		documents: [
			...commonDocs,
			"Property ownership / rent agreement",
			"Valuation report"
		],
		premium: "From ₹1,999 / year",
		coverage: "Up to ₹5 Cr",
		processingTime: "24 hours",
		faqs: [{
			q: "Is earthquake covered?",
			a: "Yes, all natural perils including earthquakes and floods are covered under the standard fire & allied perils policy."
		}],
		related: ["home-loan", "family-insurance"]
	},
	{
		slug: "motor-insurance",
		kind: "insurance",
		name: "Motor Insurance",
		tagline: "Drive with total peace of mind.",
		image: insurance_motor_default,
		description: "Financial protection against accidents, theft, natural calamities, and third-party liabilities — for all vehicle categories.",
		features: [
			"Comprehensive & third-party plans",
			"Zero-depreciation add-on",
			"24×7 roadside assistance"
		],
		benefits: [
			"Cashless repairs at 6,000+ garages",
			"No-claim bonus up to 50%",
			"Own-damage + third-party in one"
		],
		eligibility: ["Valid RC & driving licence", "Vehicle age within policy limits"],
		documents: [
			"RC copy",
			"Previous insurance policy (for renewal)",
			"Aadhaar / PAN"
		],
		premium: "From ₹2,499 / year",
		coverage: "IDV of the vehicle",
		processingTime: "Instant",
		subtypes: [
			{
				name: "Car Insurance",
				description: "Comprehensive protection for private four-wheelers with zero-dep and engine cover add-ons."
			},
			{
				name: "Bike Insurance",
				description: "Two-wheeler policies with pillion cover, RSA and consumables add-ons."
			},
			{
				name: "Commercial Vehicle Insurance",
				description: "Fleet and single-vehicle cover for taxis, trucks and commercial goods carriers."
			}
		],
		faqs: [{
			q: "What is IDV?",
			a: "Insured Declared Value — the current market value of your vehicle, which is the maximum claim amount."
		}],
		related: ["vehicle-loan"]
	},
	{
		slug: "travel-insurance",
		kind: "insurance",
		name: "Travel Insurance",
		tagline: "Journey without a worry.",
		image: insurance_travel_default,
		description: "Protects travellers against trip cancellations, medical emergencies, lost baggage, passport loss and other travel-related risks — anywhere in the world.",
		features: [
			"Worldwide medical cover",
			"Trip cancellation & delay",
			"Lost passport & baggage"
		],
		benefits: [
			"Cashless hospitalisation abroad",
			"24×7 global assistance helpline",
			"Adventure sports add-on"
		],
		eligibility: ["Age 3 months – 85 years", "Valid passport for international travel"],
		documents: ["Passport / ID", "Travel itinerary"],
		premium: "From ₹399 / trip",
		coverage: "Up to USD 500,000",
		processingTime: "Instant e-policy",
		subtypes: [
			{
				name: "Domestic Travel",
				description: "Cover for medical emergencies, cancellations and baggage loss inside India."
			},
			{
				name: "International Travel",
				description: "Worldwide medical + trip cover with 24×7 global assistance."
			},
			{
				name: "Student Travel",
				description: "Long-duration policies for students studying abroad, including sponsor protection."
			},
			{
				name: "Senior Citizen Travel",
				description: "Specially designed plans for travellers aged 60+ with pre-existing disease cover."
			}
		],
		faqs: [{
			q: "Does it cover trip cancellation?",
			a: "Yes, non-refundable trip costs are covered for specified reasons like illness, natural disasters, and airline strikes."
		}],
		related: ["health-insurance"]
	},
	{
		slug: "business-insurance",
		kind: "insurance",
		name: "Business Insurance",
		tagline: "Cover for the enterprise you built.",
		image: insurance_business_default,
		description: "Comprehensive protection for shops, offices and enterprises against property damage, liability, cyber risks and employee-related claims.",
		features: [
			"Property, liability & cyber cover",
			"Group health for employees",
			"Business interruption cover"
		],
		benefits: [
			"One policy, multiple protections",
			"Tailored for MSMEs",
			"Fast claim settlement"
		],
		eligibility: ["Any registered business or professional"],
		documents: [
			...commonDocs,
			"Business registration",
			"Asset valuation"
		],
		premium: "From ₹9,999 / year",
		coverage: "Up to ₹25 Cr",
		processingTime: "3 working days",
		faqs: [{
			q: "Is cyber liability included?",
			a: "Available as an add-on covering data breach response, ransomware and third-party claims."
		}],
		related: ["business-loan", "property-insurance"]
	}
];
function findLoan(slug) {
	return loans.find((l) => l.slug === slug);
}
function findInsurance(slug) {
	return insurance.find((i) => i.slug === slug);
}
function findCatalogItem(slug) {
	return findLoan(slug) ?? findInsurance(slug);
}
//#endregion
export { loans as a, insurance as i, findInsurance as n, findLoan as r, findCatalogItem as t };
