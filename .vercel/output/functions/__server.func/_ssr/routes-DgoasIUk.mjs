import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as loans, i as insurance } from "./catalog-Sb1FjQGD.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { A as FileCheckCorner, C as IndianRupee, E as GraduationCap, G as ArrowRight, H as Briefcase, I as CircleCheck, N as Compass, T as Heart, V as Car, W as Award, a as TrendingUp, h as Phone, l as Shield, r as Users, s as Star, t as Zap, u as ShieldCheck, v as MapPin, w as House, y as Mail } from "../_libs/lucide-react.mjs";
import { t as Slider } from "./slider-BjtFJp27.mjs";
import { i as founder_default, n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-B94Av0az.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DgoasIUk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hero_new_default = "/assets/hero_new-B0Y9fmfq.png";
function AgeCalculator() {
	const [age, setAge] = (0, import_react.useState)(30);
	const presets = [
		{
			label: "Student",
			age: 19
		},
		{
			label: "Young Pro",
			age: 24
		},
		{
			label: "Family Stage",
			age: 35
		},
		{
			label: "Pre-Retiree",
			age: 58
		},
		{
			label: "Senior",
			age: 68
		}
	];
	const eligibility = (0, import_react.useMemo)(() => {
		let eligibleLoanSlugs = [];
		let eligibleInsuranceSlugs = [];
		let reasonText = "";
		if (age < 18) {
			eligibleLoanSlugs = ["education-loan"];
			eligibleInsuranceSlugs = ["child-plans", "travel-insurance"];
			reasonText = "Focus on education and child savings benefits.";
		} else if (age >= 18 && age <= 20) {
			eligibleLoanSlugs = ["gold-loan", "education-loan"];
			eligibleInsuranceSlugs = [
				"health-insurance",
				"motor-insurance",
				"property-insurance",
				"travel-insurance",
				"business-insurance"
			];
			reasonText = "Eligible for education funding, asset protection, and quick gold loans.";
		} else if (age >= 21 && age <= 24) {
			eligibleLoanSlugs = [
				"personal-loan",
				"home-loan",
				"vehicle-loan",
				"business-loan",
				"gold-loan",
				"education-loan"
			];
			eligibleInsuranceSlugs = [
				"health-insurance",
				"family-insurance",
				"life-insurance",
				"motor-insurance",
				"property-insurance",
				"travel-insurance"
			];
			reasonText = "Broad eligibility starting for young professionals and independent earners.";
		} else if (age >= 25 && age <= 55) {
			eligibleLoanSlugs = [
				"home-loan",
				"mortgage-loan",
				"business-loan",
				"vehicle-loan",
				"education-loan",
				"personal-loan",
				"gold-loan"
			];
			eligibleInsuranceSlugs = [
				"health-insurance",
				"family-insurance",
				"life-insurance",
				"pension-plans",
				"motor-insurance",
				"property-insurance",
				"business-insurance",
				"travel-insurance"
			];
			reasonText = "Full eligibility for maximum life coverage, asset finance, and business growth.";
		} else if (age >= 56 && age <= 65) {
			eligibleLoanSlugs = [
				"home-loan",
				"mortgage-loan",
				"business-loan",
				"vehicle-loan",
				"gold-loan"
			];
			eligibleInsuranceSlugs = [
				"health-insurance",
				"family-insurance",
				"life-insurance",
				"pension-plans",
				"property-insurance",
				"travel-insurance"
			];
			reasonText = "Optimized for retirement planning, security, and senior wealth protection.";
		} else if (age >= 66 && age <= 75) {
			eligibleLoanSlugs = ["mortgage-loan", "gold-loan"];
			eligibleInsuranceSlugs = [
				"pension-plans",
				"travel-insurance",
				"property-insurance"
			];
			reasonText = "Asset-backed loans and active security features for senior citizens.";
		} else {
			eligibleLoanSlugs = ["gold-loan"];
			eligibleInsuranceSlugs = ["travel-insurance"];
			reasonText = "Simplest gold-backed liquidity and international travel protections.";
		}
		return {
			eligibleLoans: loans.filter((l) => eligibleLoanSlugs.includes(l.slug)),
			eligibleInsurance: insurance.filter((i) => eligibleInsuranceSlugs.includes(i.slug)),
			reasonText
		};
	}, [age]);
	const getIcon = (slug) => {
		switch (slug) {
			case "home-loan": return House;
			case "mortgage-loan": return TrendingUp;
			case "business-loan": return Briefcase;
			case "vehicle-loan": return Car;
			case "education-loan": return GraduationCap;
			case "personal-loan": return FileCheckCorner;
			case "gold-loan": return Shield;
			case "health-insurance": return Heart;
			case "family-insurance": return Users;
			case "life-insurance": return Shield;
			case "child-plans": return GraduationCap;
			case "pension-plans": return Compass;
			default: return Shield;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "p-6 bg-card border shadow-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-8 lg:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-2 space-y-6 flex flex-col justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xl font-bold text-brand-navy",
						children: "Age eligibility checker"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mt-1",
						children: "Find customized financial & protection products based on your age segment."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-baseline",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-semibold text-muted-foreground",
									children: "Select Age"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-4xl font-black text-primary",
										children: age
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-semibold text-muted-foreground",
										children: "years"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								value: [age],
								min: 10,
								max: 85,
								step: 1,
								onValueChange: ([v]) => setAge(v),
								className: "py-4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5 pt-2",
								children: presets.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: age === p.age ? "default" : "outline",
									size: "sm",
									onClick: () => setAge(p.age),
									className: "text-xs h-7 px-2.5 rounded-full",
									children: [
										p.label,
										" (",
										p.age,
										")"
									]
								}, p.label))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-primary/5 p-4 border border-primary/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-black uppercase tracking-widest text-primary",
							children: "Eligibility Insight"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold text-foreground mt-1 leading-relaxed",
							children: eligibility.reasonText
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-3 space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b pb-2 mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "text-sm font-black uppercase tracking-wider text-brand-navy",
						children: [
							"Eligible Loans (",
							eligibility.eligibleLoans.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-bold text-muted-foreground",
						children: "Instant Application"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2.5 sm:grid-cols-2",
					children: eligibility.eligibleLoans.map((l) => {
						const Icon = getIcon(l.slug);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/loans/$slug",
							params: { slug: l.slug },
							className: "flex items-center gap-3 p-3 rounded-xl border bg-background hover:bg-primary/5 hover:border-primary/30 transition group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4.5 w-4.5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-bold text-foreground truncate",
									children: l.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] text-muted-foreground truncate",
									children: l.tagline
								})]
							})]
						}, l.slug);
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b pb-2 mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "text-sm font-black uppercase tracking-wider text-brand-navy",
						children: [
							"Eligible Insurance (",
							eligibility.eligibleInsurance.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-bold text-muted-foreground",
						children: "Instant Quotes"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2.5 sm:grid-cols-2",
					children: eligibility.eligibleInsurance.map((i) => {
						const Icon = getIcon(i.slug);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/insurance/$slug",
							params: { slug: i.slug },
							className: "flex items-center gap-3 p-3 rounded-xl border bg-background hover:bg-primary/5 hover:border-primary/30 transition group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4.5 w-4.5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-bold text-foreground truncate",
									children: i.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] text-muted-foreground truncate",
									children: i.tagline
								})]
							})]
						}, i.slug);
					})
				})] })]
			})]
		})
	});
}
var stats = [
	{
		label: "Happy Customers",
		value: "1.2 L+",
		icon: Users
	},
	{
		label: "Loans Processed",
		value: "₹8,500 Cr+",
		icon: IndianRupee
	},
	{
		label: "Insurance Policies",
		value: "80,000+",
		icon: ShieldCheck
	},
	{
		label: "Cities Covered",
		value: "150+",
		icon: MapPin
	}
];
var detailedTestimonials = [
	{
		name: "Priya Sharma",
		amount: "₹45 Lakhs",
		purpose: "Home Purchase",
		institution: "LIC Housing Finance",
		quote: "Got my home loan sanctioned in 5 days. The team walked me through every step — no hidden charges, no runaround.",
		location: "Mumbai",
		rating: 5
	},
	{
		name: "Rohit Mehta",
		amount: "₹18 Lakhs",
		purpose: "MSME Business Expansion",
		institution: "SBI",
		quote: "My MSME loan was approved without collateral in 72 hours. It saved my seasonal business — highly recommended.",
		location: "Delhi",
		rating: 5
	},
	{
		name: "Anaya Verma",
		amount: "₹5 Lakhs",
		purpose: "Family Health Floater Plan",
		institution: "HDFC Bank",
		quote: "Their family floater plan gave us peace of mind during my mother's surgery. Cashless claim in under 4 hours.",
		location: "Bengaluru",
		rating: 5
	}
];
function LandingPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden bg-brand-gradient text-white",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 opacity-40 mix-blend-overlay",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero_new_default,
					alt: "",
					className: "h-full w-full object-cover",
					loading: "eager"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-6 flex flex-wrap items-center gap-4 rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur-md shadow-elevated w-fit",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
										className: "h-9 w-9 shrink-0 ring-2 ring-accent",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
											src: founder_default,
											alt: "Founder R H Adhoni"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
											className: "bg-primary text-white text-xs font-bold",
											children: "RA"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] font-semibold text-white/70 uppercase tracking-wider",
										children: "Founder & MD"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-bold text-white",
										children: "R H Adhoni"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden h-6 w-px bg-white/20 sm:block" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/25 ring-2 ring-accent text-accent font-black text-xs",
										children: "BA"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] font-semibold text-white/70 uppercase tracking-wider",
										children: "Chief Administrator"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-bold text-white",
										children: "Bibi Ayesha"
									})] })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: "mb-4 w-fit bg-accent text-accent-foreground hover:bg-accent font-semibold",
							children: "Trusted since 2012"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-5xl font-black leading-tight tracking-tight md:text-7xl",
							children: "Instant Funds for You"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-lg font-bold text-accent md:text-xl",
							children: "Loans & Insurance, simplified for you."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-lg text-sm text-white/80 leading-relaxed",
							children: "Home, business, vehicle and personal loans. Health, life, motor and travel insurance. One trusted partner, powered by technology."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/loans",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "lg",
									className: "bg-accent text-accent-foreground hover:bg-accent/90",
									children: ["Explore Loans ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/insurance",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "lg",
									variant: "outline",
									className: "border-white/40 bg-white/10 text-white hover:bg-white/20",
									children: "Explore Insurance"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-white/20 pt-6 text-sm",
							children: [
								{
									l: "Sanction in",
									v: "24 hrs"
								},
								{
									l: "Interest from",
									v: "8.35%"
								},
								{
									l: "Cities",
									v: "150+"
								}
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-bold text-accent",
								children: s.v
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-white/70",
								children: s.l
							})] }, s.l))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden md:flex md:items-center md:justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "w-full max-w-md p-6 shadow-elevated",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold text-brand-navy",
								children: "Quick Loan Enquiry"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Get a call back in 15 minutes."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 rounded-lg border p-3 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheckCorner, { className: "h-5 w-5 text-primary" }), " 100% online paperwork"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 rounded-lg border p-3 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5 text-primary" }), " Same-day sanction"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 rounded-lg border p-3 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-primary" }), " Bank-grade security"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/loans/$slug",
								params: { slug: "personal-loan" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "mt-5 w-full bg-primary text-primary-foreground hover:bg-brand-navy",
									children: "Apply for a Personal Loan"
								})
							})
						]
					})
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-6 py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-bold md:text-4xl text-brand-navy",
					children: "Instant Loans"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted-foreground",
					children: "Solutions for every stage of your life."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/loans",
					className: "hidden text-sm font-semibold text-primary hover:underline md:block",
					children: "View all →"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
				children: loans.slice(0, 4).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/loans/$slug",
					params: { slug: l.slug },
					className: "group overflow-hidden rounded-2xl border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elevated",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[16/10] overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: l.image,
							alt: l.name,
							className: "h-full w-full object-cover transition duration-500 group-hover:scale-105",
							width: 800,
							height: 500,
							loading: "lazy"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-brand-navy",
								children: l.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 line-clamp-2 text-sm text-muted-foreground",
								children: l.tagline
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-secondary px-2 py-1 font-semibold text-primary",
									children: l.rate
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary group-hover:underline",
									children: "Explore →"
								})]
							})
						]
					})]
				}, l.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-secondary/40 py-16 border-t border-b",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-bold md:text-4xl text-brand-navy",
						children: "Instant Insurance"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "Protection for you, your family, and your assets."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/insurance",
						className: "hidden text-sm font-semibold text-primary hover:underline md:block",
						children: "View all →"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
					children: insurance.slice(0, 4).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/insurance/$slug",
						params: { slug: i.slug },
						className: "group overflow-hidden rounded-2xl border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elevated",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-[16/10] overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: i.image,
								alt: i.name,
								className: "h-full w-full object-cover transition duration-500 group-hover:scale-105",
								width: 800,
								height: 500,
								loading: "lazy"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-bold text-brand-navy",
									children: i.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 line-clamp-2 text-sm text-muted-foreground",
									children: i.tagline
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex items-center justify-between text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-secondary px-2 py-1 font-semibold text-primary",
										children: i.premium
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary group-hover:underline",
										children: "Explore →"
									})]
								})
							]
						})]
					}, i.slug))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-6 py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-bold md:text-4xl text-brand-navy",
					children: "Why choose Instant Funds for You"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-3 max-w-2xl text-muted-foreground",
					children: "Built by financial specialists who obsess about your outcome — not paperwork."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-5 md:grid-cols-3",
				children: [
					{
						icon: Zap,
						title: "Lightning-fast approvals",
						body: "Digital KYC, algorithmic underwriting and sanctions in as little as 24 hours."
					},
					{
						icon: ShieldCheck,
						title: "Transparent, secure, trusted",
						body: "Bank-grade encryption, RBI-compliant partners, and zero hidden fees — ever."
					},
					{
						icon: Award,
						title: "Award-winning advisory",
						body: "Rated 4.8/5 by 40,000+ customers across India for service and clarity."
					}
				].map(({ icon: Icon, title, body }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 text-lg font-bold text-brand-navy",
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: body
						})
					]
				}, title))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-brand-gradient py-14 text-white",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-7xl gap-8 px-6 sm:grid-cols-2 md:grid-cols-4",
				children: stats.map(({ label, value, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mx-auto h-8 w-8 text-accent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 text-3xl font-black md:text-4xl",
							children: value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-white/75",
							children: label
						})
					]
				}, label))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-6 py-16 border-b border-t border-dashed border-primary/20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-extrabold md:text-4xl text-brand-navy",
					children: "Check your loan & insurance eligibility by age"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted-foreground",
					children: "Adjust the slider to discover personalized financial matches in seconds."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgeCalculator, {})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-6 py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-bold md:text-4xl text-brand-navy",
					children: "Loved by customers across India"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted-foreground",
					children: "Hear from our clients who achieved their financial goals."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-5 md:grid-cols-3",
				children: detailedTestimonials.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-6 shadow-card hover:shadow-elevated transition border-l-4 border-l-primary flex flex-col justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-start gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-0.5 text-accent",
								children: Array.from({ length: t.rating }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-current" }, i))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: "bg-primary/5 text-primary border-primary/20 font-bold text-xs px-2 py-0.5",
								children: t.amount
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground block",
								children: "Purpose of Loan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-bold text-foreground mt-0.5",
								children: [
									t.purpose,
									" · ",
									t.institution
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-sm text-muted-foreground italic leading-relaxed",
							children: [
								"\"",
								t.quote,
								"\""
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 border-t pt-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-bold text-foreground text-sm",
							children: t.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: t.location
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-black",
							children: t.name.split(" ").map((n) => n[0]).join("")
						})]
					})]
				}, t.name))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "contact",
			className: "bg-secondary/40 py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-bold md:text-4xl text-brand-navy",
						children: "Talk to an advisor"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted-foreground",
						children: "Our loan and insurance specialists are available 9am–9pm, seven days a week."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-5 w-5 text-primary" }), " 1800-123-4567 (toll-free)"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5 text-primary" }), " care@instantfundsforyou.demo"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5 text-primary" }), " 150+ branches across India"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6 grid gap-2 text-sm",
						children: [
							"Free eligibility check",
							"No obligation quote",
							"Doorstep documentation",
							"Post-disbursal support"
						].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-primary" }), x]
						}, x))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-bold text-brand-navy",
						children: "Send us a message"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								placeholder: "Your name",
								className: "w-full rounded-md border bg-background px-3 py-2 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								placeholder: "Mobile number",
								className: "w-full rounded-md border bg-background px-3 py-2 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								placeholder: "Email address",
								className: "w-full rounded-md border bg-background px-3 py-2 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								placeholder: "How can we help?",
								rows: 4,
								className: "w-full rounded-md border bg-background px-3 py-2 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "w-full bg-primary hover:bg-brand-navy",
								children: "Request Callback"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-center text-xs text-muted-foreground",
								children: "By submitting you agree to our Terms & Privacy Policy."
							})
						]
					})]
				})]
			})
		})
	] });
}
//#endregion
export { LandingPage as component };
