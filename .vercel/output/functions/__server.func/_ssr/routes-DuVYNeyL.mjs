import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as Cpu, B as Heart, H as GraduationCap, T as Plane, V as HeartPulse, _ as Shield, _t as Briefcase, at as CircleCheck, b as Search, bt as ArrowRight, d as Stethoscope, gt as Building, h as Sparkles, it as CircleQuestionMark, m as Sprout, pt as Car, r as Users, s as Truck, v as ShieldCheck, xt as Activity } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as logo_new_default, i as founder_default, n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-DJ7rf4aj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DuVYNeyL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hero_new_default = "/assets/hero_new-B0Y9fmfq.png";
var admin2_default = "/assets/admin2-DdkbJ4AJ.png";
var partners = [
	"LIC",
	"PolicyBazaar",
	"SBI",
	"HDFC",
	"ICICI",
	"Axis",
	"Kotak Mahindra",
	"Bajaj Finserv",
	"Tata Capital",
	"Godrej Capital",
	"Poonawalla Fincorp",
	"Piramal Finance",
	"L&T Finance",
	"Credila",
	"Avanse",
	"Auxilo",
	"InCred",
	"Protium",
	"Unity",
	"Credi Saison",
	"Star Health",
	"Care Health",
	"Niva Bupa",
	"Aditya Birla Health"
];
var extendedLoans = [
	{
		name: "Personal Loan",
		icon: Users,
		rate: "10.5%",
		startingAmt: "₹25 Lakhs",
		approvalTime: "24h Approval",
		tagline: "Collateral-free funds for personal milestones & urgent needs."
	},
	{
		name: "Business Loan",
		icon: Briefcase,
		rate: "11.2%",
		startingAmt: "₹1 Crore",
		approvalTime: "48h Approval",
		tagline: "Fuel your enterprise growth, buy inventory & expand scale."
	},
	{
		name: "Home Loan",
		icon: Building,
		rate: "8.4%",
		startingAmt: "₹5 Crore",
		approvalTime: "3-5 Days",
		tagline: "Make your dream home a reality with custom tenure options."
	},
	{
		name: "Property Loan",
		icon: LandmarkIcon,
		rate: "9.25%",
		startingAmt: "₹10 Crore",
		approvalTime: "5-7 Days",
		tagline: "Unlock value from your residential or commercial real estate."
	},
	{
		name: "Mortgage Loan",
		icon: LandmarkIcon,
		rate: "9.5%",
		startingAmt: "₹7 Crore",
		approvalTime: "5-7 Days",
		tagline: "High-value loans secured against fixed asset equity."
	},
	{
		name: "Education Loan",
		icon: GraduationCap,
		rate: "8.9%",
		startingAmt: "₹1.5 Crore",
		approvalTime: "3 Days",
		tagline: "Global education funding covering fees, travel & stay."
	},
	{
		name: "Professional Loan",
		icon: Stethoscope,
		rate: "10.75%",
		startingAmt: "₹50 Lakhs",
		approvalTime: "24h Approval",
		tagline: "Tailored credit lines for Doctors, CA, and Architects."
	},
	{
		name: "Professional Equipment Loan",
		icon: Cpu,
		rate: "11.0%",
		startingAmt: "₹2 Crore",
		approvalTime: "3 Days",
		tagline: "Finance medical machinery, diagnostic units & CA tech."
	},
	{
		name: "Commercial Vehicle Loan",
		icon: Truck,
		rate: "9.8%",
		startingAmt: "₹1.5 Crore",
		approvalTime: "48h Approval",
		tagline: "Funding for trucks, buses & corporate fleets."
	},
	{
		name: "Car Loan",
		icon: Car,
		rate: "8.7%",
		startingAmt: "₹50 Lakhs",
		approvalTime: "24h Approval",
		tagline: "Drive home your dream hatchback, sedan, or SUV today."
	},
	{
		name: "Hospital Funding",
		icon: HeartPulse,
		rate: "10.5%",
		startingAmt: "₹10 Crore",
		approvalTime: "7 Days",
		tagline: "Capital setup for clinics, diagnostics centers & hospitals."
	},
	{
		name: "Agricultural Loan",
		icon: Sprout,
		rate: "7.5%",
		startingAmt: "₹1 Crore",
		approvalTime: "3 Days",
		tagline: "Earthy funding for crop inputs, tractors & farm upgrades."
	}
];
var extendedInsurance = [
	{
		name: "Health Insurance",
		icon: Heart,
		premium: "₹450/mo",
		tagline: "Cashless coverage for medical emergencies and major illnesses.",
		benefits: ["100% Cashless network", "No room rent capping"]
	},
	{
		name: "Life Insurance",
		icon: Activity,
		premium: "₹650/mo",
		tagline: "Secure your family's future with term or endowment coverage.",
		benefits: ["High sum assured", "Tax benefits U/S 80C"]
	},
	{
		name: "Motor Insurance",
		icon: Car,
		premium: "₹200/mo",
		tagline: "Third-party and comprehensive covers for two/four-wheelers.",
		benefits: ["Cashless garages", "Quick claim settling"]
	},
	{
		name: "Travel Insurance",
		icon: Plane,
		premium: "₹150/trip",
		tagline: "Stay protected against lost baggage and medical expenses abroad.",
		benefits: ["Instant global support", "Baggage loss cover"]
	},
	{
		name: "Property Insurance",
		icon: Shield,
		premium: "₹500/mo",
		tagline: "Insure your building and household goods against fire and theft.",
		benefits: ["Fire & flood cover", "Burglary protection"]
	},
	{
		name: "Corporate Insurance",
		icon: Briefcase,
		premium: "₹1,200/mo",
		tagline: "Asset protection, liability, and employee coverage for enterprises.",
		benefits: ["Keyman insurance", "Asset protection"]
	},
	{
		name: "Group Insurance",
		icon: Users,
		premium: "₹250/member",
		tagline: "Tailored group health & life insurance schemes for workforces.",
		benefits: ["Easy member additions", "Corporate health plans"]
	}
];
function LandmarkIcon(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "24",
		height: "24",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "3",
				y1: "22",
				x2: "21",
				y2: "22"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "6",
				y1: "18",
				x2: "6",
				y2: "11"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "10",
				y1: "18",
				x2: "10",
				y2: "11"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "14",
				y1: "18",
				x2: "14",
				y2: "11"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "18",
				y1: "18",
				x2: "18",
				y2: "11"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "12 2 2 7 22 7" })
		]
	});
}
function LandingPage() {
	useNavigate();
	const [loanQuery, setLoanQuery] = (0, import_react.useState)("");
	const [loanAmt, setLoanAmt] = (0, import_react.useState)(1e6);
	const [interestRate, setInterestRate] = (0, import_react.useState)(8.5);
	const [tenureYears, setTenureYears] = (0, import_react.useState)(15);
	const [age, setAge] = (0, import_react.useState)(28);
	const filteredLoans = (0, import_react.useMemo)(() => {
		if (!loanQuery) return extendedLoans;
		return extendedLoans.filter((l) => l.name.toLowerCase().includes(loanQuery.toLowerCase()));
	}, [loanQuery]);
	const calculatedEmi = (0, import_react.useMemo)(() => {
		const P = loanAmt;
		const r = interestRate / 12 / 100;
		const n = tenureYears * 12;
		if (r === 0) return Math.round(P / n);
		const emiVal = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
		return Math.round(emiVal);
	}, [
		loanAmt,
		interestRate,
		tenureYears
	]);
	const totalPayment = calculatedEmi * tenureYears * 12;
	const totalInterest = totalPayment - loanAmt;
	const eligibleProducts = (0, import_react.useMemo)(() => {
		if (age < 18) return {
			label: "Underage",
			desc: "You must be at least 18 years old to apply.",
			count: 0
		};
		if (age > 75) return {
			label: "Superannuated",
			desc: "Age exceeds our standard risk limit.",
			count: 0
		};
		if (age >= 18 && age <= 23) return {
			label: "Young Aspirant",
			desc: "Eligible for Education Loans, Car Loans, and basic Health Insurance.",
			count: 3
		};
		if (age >= 24 && age <= 58) return {
			label: "Prime Applicant",
			desc: "Eligible for all Personal, Home, Business, Professional Equipment & Commercial Vehicle Loans, and all Insurance Products.",
			count: 19
		};
		return {
			label: "Senior Professional / Pensioner",
			desc: "Eligible for customized Mortgage Loans, Pensioner Loans, and Senior Citizen Health policies.",
			count: 6
		};
	}, [age]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden bg-brand-gradient text-white py-20 px-6 md:py-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/4 left-10 w-72 h-72 bg-royal-purple/30 rounded-full filter blur-3xl opacity-40 animate-float pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-10 right-1/4 w-96 h-96 bg-lic-blue/20 rounded-full filter blur-3xl opacity-30 animate-float-delayed pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-10 right-10 w-60 h-60 bg-turquoise/15 rounded-full filter blur-3xl opacity-25 animate-float pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute left-[8%] top-[18%] animate-float opacity-20 pointer-events-none hidden md:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-6xl font-black select-none text-gold text-glow-gold",
							children: "₹"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute right-[12%] bottom-[15%] animate-float-delayed opacity-20 pointer-events-none hidden md:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-7xl font-black select-none text-turquoise",
							children: "₹"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute left-[35%] bottom-[12%] animate-float opacity-10 pointer-events-none hidden md:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-16 w-16 text-white" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute right-[45%] top-[10%] animate-float-delayed opacity-15 pointer-events-none hidden md:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-12 w-12 text-gold" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 opacity-10 mix-blend-overlay",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: hero_new_default,
							alt: "",
							className: "h-full w-full object-cover",
							loading: "eager"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto max-w-7xl grid gap-12 lg:grid-cols-12 items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lg:col-span-7 space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: logo_new_default,
										alt: "Instant Trust Fund Logo",
										className: "h-12 w-auto filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)] shrink-0"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										className: "bg-gold hover:bg-gold/90 text-dark-navy font-bold px-3 py-1 text-xs tracking-wider animate-pulse shadow-lg",
										children: "★ 20+ Years of Trusted Financial Services"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
											className: "text-4xl font-extrabold md:text-6xl text-white tracking-tight leading-tight",
											children: "Instant Funds For You"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-bold text-accent tracking-widest uppercase bg-white/5 border border-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-sm",
											children: "Loans • Insurance • Property Services • Financial Advisory • CIBIL Reports"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-base text-white/80 max-w-xl leading-relaxed",
											children: "Access premium, low-interest credit lines and comprehensive family insurance. Leverage our 20+ years of trust and proprietary advisory platforms to match with nationalized lenders instantly."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col sm:flex-row gap-4 items-center bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md max-w-xl shadow-lg",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
												className: "h-14 w-14 ring-2 ring-gold shrink-0 shadow-md",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
													src: founder_default,
													className: "object-cover"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
													className: "bg-royal-purple text-white",
													children: "RA"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] uppercase font-bold text-gold/90 tracking-wider",
												children: "Founder & MD"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm font-black text-white",
												children: "R H Adhoni"
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden sm:block w-px bg-white/10 h-10" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
												className: "h-14 w-14 ring-2 ring-gold shrink-0 shadow-md",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
													src: admin2_default,
													className: "object-cover"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
													className: "bg-royal-purple text-white",
													children: "BA"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] uppercase font-bold text-gold/90 tracking-wider",
												children: "Chief Administrator"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm font-black text-white",
												children: "Bibi Ayesha"
											})] })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "max-w-md relative",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-3.5 h-5 w-5 text-slate-300" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												placeholder: "Search 12+ Loan Categories (e.g. Home Loan, Agri)...",
												className: "pl-10 pr-28 py-6 bg-white/95 text-dark-navy placeholder:text-slate-400 border-none rounded-xl shadow-xl w-full text-xs font-semibold focus:ring-2 focus:ring-gold",
												value: loanQuery,
												onChange: (e) => setLoanQuery(e.target.value)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												className: "absolute right-2 top-2 bg-gradient-to-r from-royal-purple to-lic-blue hover:from-royal-purple hover:to-sbi-blue text-white font-bold text-xs px-4 shadow-md transition-all duration-300",
												onClick: () => {
													const el = document.getElementById("loans-grid");
													if (el) el.scrollIntoView({ behavior: "smooth" });
												},
												children: "Find Loan"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-4 pt-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											onClick: () => {
												const el = document.getElementById("calculator-section");
												if (el) el.scrollIntoView({ behavior: "smooth" });
											},
											className: "bg-gold text-dark-navy hover:bg-gold/90 font-bold px-6 shadow-md hover:scale-105 transition-transform",
											children: "EMI Calculator"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											onClick: () => {
												const el = document.getElementById("calculator-section");
												if (el) el.scrollIntoView({ behavior: "smooth" });
											},
											className: "bg-turquoise text-dark-navy hover:bg-turquoise/90 font-bold px-6 shadow-md hover:scale-105 transition-transform",
											children: "Eligibility Appraiser"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											onClick: () => {
												const el = document.getElementById("loans-grid");
												if (el) el.scrollIntoView({ behavior: "smooth" });
											},
											className: "bg-transparent border border-white/40 hover:bg-white/10 font-bold px-6 text-white",
											children: "Apply Now →"
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "lg:col-span-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "p-6 border bg-glass border-glass backdrop-blur-xl shadow-2xl text-white relative overflow-hidden animate-pulse-glow",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-8 -top-8 w-24 h-24 bg-gold/10 rounded-full filter blur-xl" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-gold fill-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-base font-black text-white",
											children: "Quick Callback Registration"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-white/80 mb-4",
										children: "Complete quick registration to route requests directly to our advisory queues."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										onSubmit: (e) => {
											e.preventDefault();
											toast.success("Callback request captured. An advisor will contact you within 15 minutes.");
										},
										className: "space-y-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "reqName",
												className: "text-[10px] uppercase font-bold text-slate-300",
												children: "Full Name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "reqName",
												placeholder: "e.g. Vikram Sharma",
												className: "bg-white/10 border-white/20 text-white placeholder:text-slate-400 rounded-lg text-xs",
												required: true
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "reqPhone",
												className: "text-[10px] uppercase font-bold text-slate-300",
												children: "Mobile Number"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "reqPhone",
												placeholder: "+91 98765 43210",
												className: "bg-white/10 border-white/20 text-white placeholder:text-slate-400 rounded-lg text-xs",
												required: true
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "reqType",
												className: "text-[10px] uppercase font-bold text-slate-300",
												children: "Required Service"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												id: "reqType",
												className: "w-full rounded-lg border border-white/20 bg-dark-navy text-white px-3 py-2 text-xs focus:ring-1 focus:ring-gold",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Home Loan" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Business Loan" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Personal Loan" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Term Life Insurance" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Health Policy" })
												]
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "submit",
												className: "w-full bg-gradient-to-r from-gold via-soft-pink to-turquoise hover:from-turquoise hover:to-gold text-dark-navy font-bold text-sm mt-3 py-5 shadow-lg transition-all duration-500",
												children: "Request Call Back"
											})
										]
									})
								]
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-gradient-to-r from-lic-blue/10 via-sbi-blue/5 to-gold/10 py-12 border-b overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center gap-2 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-xs font-black uppercase tracking-widest text-slate-500",
							children: "Our Elite Lending & Insurance Partners"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex overflow-x-hidden py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "animate-marquee flex gap-6 whitespace-nowrap items-center",
							children: partners.map((p, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 border border-slate-200/50 bg-white/70 backdrop-blur-md px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 shrink-0 hover:border-gold/50 cursor-pointer hover:-translate-y-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-gradient-to-r from-royal-purple to-lic-blue inline-block shadow-sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-black text-brand-navy tracking-tight",
									children: p
								})]
							}, idx))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-4 animate-marquee2 flex gap-6 whitespace-nowrap items-center",
							children: partners.map((p, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 border border-slate-200/50 bg-white/70 backdrop-blur-md px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 shrink-0 hover:border-gold/50 cursor-pointer hover:-translate-y-0.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-gradient-to-r from-royal-purple to-lic-blue inline-block shadow-sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-black text-brand-navy tracking-tight",
									children: p
								})]
							}, `dup-${idx}`))
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-gradient-to-br from-sbi-blue/10 via-gold/5 to-lic-blue/10 py-16 border-b",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-7xl mx-auto px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-5",
						children: [
							{
								val: "20+",
								label: "Years Experience",
								desc: "Trusted banking consulting since 2006",
								color: "from-royal-purple to-lic-blue"
							},
							{
								val: "25+",
								label: "Partner Banks",
								desc: "Nationalized & private banking tie-ups",
								color: "from-lic-blue to-sbi-blue"
							},
							{
								val: "10,000+",
								label: "Happy Customers",
								desc: "Served across Karnataka & beyond",
								color: "from-sbi-blue to-turquoise"
							},
							{
								val: "₹250 Cr+",
								label: "Loans Processed",
								desc: "Substantial capital disbursements",
								color: "from-royal-purple to-soft-pink"
							},
							{
								val: "98%",
								label: "Approval Success",
								desc: "Industry-leading approval rates",
								color: "from-soft-pink to-gold"
							}
						].map((stat, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 border border-slate-200/50 bg-white/70 backdrop-blur-md shadow-md hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 text-center relative overflow-hidden group",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-royal-purple to-lic-blue opacity-70" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-3xl md:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent block mb-1 group-hover:scale-105 transition-transform`,
									children: stat.val
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-black text-brand-navy block tracking-wide uppercase mb-1",
									children: stat.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground leading-snug",
									children: stat.desc
								})
							]
						}, idx))
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "loans-grid",
				className: "bg-gradient-to-b from-lic-blue/10 via-gold/5 to-sbi-blue/10 px-6 py-20 space-y-10 border-b",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center max-w-2xl mx-auto space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: "bg-gradient-to-r from-royal-purple to-lic-blue text-white font-bold shadow-md px-3 py-1",
							children: "12 Active Products"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl font-extrabold text-brand-navy",
							children: "Explore Customized Loans"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Find structured interest rates, low processing fees, and doorstep delivery for all categories."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto",
					children: filteredLoans.map((l) => {
						const IconComponent = l.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 border border-slate-200/50 bg-white/70 backdrop-blur-md shadow-md hover:shadow-elevated transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden group",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-royal-purple via-lic-blue to-sbi-blue opacity-80" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-12 w-12 rounded-xl bg-gradient-to-br from-royal-purple/10 to-lic-blue/10 text-royal-purple flex items-center justify-center mb-4 transition-all duration-300 group-hover:from-royal-purple group-hover:to-lic-blue group-hover:text-white shadow-inner",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconComponent, { className: "h-6 w-6" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-extrabold text-brand-navy group-hover:text-primary transition-colors text-sm",
									children: l.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground mt-2 leading-relaxed min-h-[44px]",
									children: l.tagline
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 text-[10px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-slate-50 p-1.5 rounded-lg border border-slate-100/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground block font-bold uppercase tracking-wider scale-[0.9] origin-left",
											children: "Rate Starting"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-black text-emerald-600",
											children: ["from ", l.rate]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-slate-50 p-1.5 rounded-lg border border-slate-100/50 text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground block font-bold uppercase tracking-wider scale-[0.9] origin-right",
											children: "Up To"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-black text-brand-navy",
											children: l.startingAmt
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex items-center justify-between pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										className: "bg-emerald-50 text-emerald-700 border-emerald-100 font-black text-[9px] uppercase tracking-wider px-2 py-0.5 rounded",
										children: l.approvalTime
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/loans",
										className: "text-xs text-primary font-black hover:underline flex items-center gap-1 group/btn",
										children: ["Apply Now ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3 transition-transform group-hover/btn:translate-x-1" })]
									})]
								})
							]
						}, l.name);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "calculator-section",
				className: "bg-gradient-to-tr from-sbi-blue/10 via-lic-blue/5 to-gold/10 border-t border-b py-16 px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto grid gap-12 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 border border-slate-200/50 bg-white/70 backdrop-blur-md shadow-card space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold text-brand-navy",
								children: "EMI Repayment Estimator"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-0.5",
								children: "Calculate your monthly outflow instantly based on loan parameters."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-xs font-bold text-slate-700 mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Loan Amount" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-primary",
											children: ["₹", loanAmt.toLocaleString()]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "range",
										min: 1e5,
										max: 5e7,
										step: 5e4,
										value: loanAmt,
										onChange: (e) => setLoanAmt(Number(e.target.value)),
										className: "w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-xs font-bold text-slate-700 mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Annual Interest Rate (%)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-primary",
											children: [interestRate, "%"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "range",
										min: 5,
										max: 20,
										step: .1,
										value: interestRate,
										onChange: (e) => setInterestRate(Number(e.target.value)),
										className: "w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-xs font-bold text-slate-700 mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tenure (Years)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-primary",
											children: [tenureYears, " yrs"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "range",
										min: 1,
										max: 30,
										step: 1,
										value: tenureYears,
										onChange: (e) => setTenureYears(Number(e.target.value)),
										className: "w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t pt-4 grid grid-cols-3 gap-2 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-slate-50 p-3 rounded-lg border",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground uppercase block font-semibold",
											children: "Monthly EMI"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-sm font-black text-brand-navy",
											children: ["₹", calculatedEmi.toLocaleString()]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-slate-50 p-3 rounded-lg border",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground uppercase block font-semibold",
											children: "Total Interest"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-sm font-black text-brand-navy",
											children: ["₹", totalInterest.toLocaleString()]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-slate-50 p-3 rounded-lg border text-primary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-primary/80 uppercase block font-semibold",
											children: "Total Payment"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-sm font-black",
											children: ["₹", totalPayment.toLocaleString()]
										})]
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 border border-slate-200/50 bg-white/70 backdrop-blur-md shadow-card space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold text-brand-navy",
								children: "Age Eligibility Appraiser"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-0.5",
								children: "Toggle your age value below to discover custom portfolio matches."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-xs font-bold text-slate-700 mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Current Age" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-primary",
										children: [age, " Years Old"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: 15,
									max: 80,
									step: 1,
									value: age,
									onChange: (e) => setAge(Number(e.target.value)),
									className: "w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
								})] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t pt-4 p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-brand-navy",
										children: eligibleProducts.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										className: "bg-gold text-dark-navy font-bold text-[10px]",
										children: [eligibleProducts.count, " Active Matches"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground leading-relaxed",
									children: eligibleProducts.desc
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "max-w-7xl mx-auto px-6 py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "bg-gradient-to-r from-royal-purple to-lic-blue text-white p-8 rounded-2xl shadow-elevated grid md:grid-cols-12 gap-6 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-8 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "bg-gold text-dark-navy font-bold px-2 py-0.5",
								children: "Powered by TransUnion"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-black md:text-3xl text-white",
								children: "Check Your CIBIL Score Online"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-white/90 max-w-xl",
								children: "Understand your creditworthiness, access personalized home loan interest matches, and download detailed bureau records instantly. Simulated verification fee ₹499 applies."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-4 flex flex-col gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/cibil",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "w-full bg-gold text-dark-navy hover:bg-gold/90 font-bold",
									children: "Generate CIBIL Report"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "w-full bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold",
								onClick: () => toast.success("Loading credit score improvement guidelines..."),
								children: "Improve Score"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "w-full bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold",
								onClick: () => toast.success("Simulated Loan eligibility check activated..."),
								children: "Eligibility Report"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-gradient-to-br from-gold/10 via-lic-blue/5 to-sbi-blue/10 py-20 px-6 border-t border-b",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto space-y-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center max-w-2xl mx-auto space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "bg-gradient-to-r from-lic-blue to-sbi-blue text-white font-bold shadow-md px-3 py-1",
								children: "7 Active Coverages"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-3xl font-extrabold text-brand-navy",
								children: "All Insurance Covers"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Cashless coverage, quick claim support, and hassle-free online renewals."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
						children: extendedInsurance.map((i) => {
							const Icon = i.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "p-6 border border-slate-200/50 bg-white/70 backdrop-blur-md shadow-md hover:shadow-elevated transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden group",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lic-blue via-sbi-blue to-turquoise opacity-85" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-12 w-12 rounded-xl bg-gradient-to-br from-lic-blue/10 to-sbi-blue/10 text-lic-blue flex items-center justify-center mb-4 transition-all duration-300 group-hover:from-lic-blue group-hover:to-sbi-blue group-hover:text-white shadow-inner",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-extrabold text-brand-navy group-hover:text-secondary transition-colors text-sm",
										children: i.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground mt-2 leading-relaxed min-h-[44px]",
										children: i.tagline
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-4 space-y-1.5 border-t border-slate-100 pt-3",
										children: i.benefits.map((b, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5 text-[10px] text-slate-600",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: b })]
										}, idx))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex items-center justify-between pt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-black text-primary bg-primary/5 border border-primary/10 px-2.5 py-1 rounded-lg",
											children: i.premium
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/insurance",
											className: "text-xs text-secondary font-black hover:underline flex items-center gap-1 group/btn",
											children: ["Compare Plans ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3 transition-transform group-hover/btn:translate-x-1" })]
										})]
									})
								]
							}, i.name);
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "max-w-7xl mx-auto my-12 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-sbi-blue/10 via-lic-blue/5 to-gold/10 border border-slate-200/50 shadow-xl space-y-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center max-w-2xl mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-extrabold text-brand-navy",
						children: "Fast Approval Timeline"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mt-1",
						children: "Get your funds dispersed with minimal roadblocks. Here is our workflow:"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 md:grid-cols-4",
					children: [
						{
							step: "1",
							title: "Enquire Online",
							desc: "Select product, fill primary parameters, and generate credit app."
						},
						{
							step: "2",
							title: "Verify Credentials",
							desc: "Complete paperless KYC check and appraise loan parameters."
						},
						{
							step: "3",
							title: "Property Audit",
							desc: "For secure loans, survey parcels mapped using Bhoomi & Dishank."
						},
						{
							step: "4",
							title: "Disbursal",
							desc: "Approved amount routed to your verified bank account in 24 hours."
						}
					].map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 border shadow-sm relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute right-3 top-3 text-4xl font-black text-slate-100",
								children: item.step
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-bold text-brand-navy text-sm relative z-10",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-2 leading-relaxed relative z-10",
								children: item.desc
							})
						]
					}, idx))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-gradient-to-b from-lic-blue/10 via-sbi-blue/5 to-gold/10 py-16 px-6 border-t border-b",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-3xl mx-auto space-y-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl font-extrabold text-brand-navy",
							children: "Frequently Asked Questions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "General inquiries about eligibility, documents, and interest calculation."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: [
							{
								q: "What is the average timeline for loan sanction?",
								a: "Unsecured personal and business loans are approved within 24 hours. Mortgages and home loans take 4-7 banking days depending on local land audits."
							},
							{
								q: "Do you charge extra consulting fee?",
								a: "No, Instant Trust Fund provides transparent advisory comparisons. Our consulting costs are covered directly by lending partners without adding marks to your rates."
							},
							{
								q: "How are properties verified?",
								a: "We sync with Karnataka Bhoomi title servers and Dishank spatial coordinates to run primary verification on secure land properties."
							}
						].map((faq, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-5 border border-slate-200/50 bg-white/70 backdrop-blur-md shadow-sm space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "text-xs font-bold text-brand-navy flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-4 w-4 text-primary shrink-0" }),
									" ",
									faq.q
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground leading-relaxed pl-5.5",
								children: faq.a
							})]
						}, idx))
					})]
				})
			})
		]
	});
}
//#endregion
export { LandingPage as component };
