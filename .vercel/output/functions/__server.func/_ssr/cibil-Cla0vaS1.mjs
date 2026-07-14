import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { G as FileText, M as LoaderCircle, Q as CreditCard, Z as Download, at as CircleCheck, bt as ArrowRight, g as Smartphone, h as Sparkles, lt as ChevronRight, st as CircleAlert, v as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cibil-Cla0vaS1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CibilPage() {
	const [step, setStep] = (0, import_react.useState)("input");
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [mobile, setMobile] = (0, import_react.useState)("");
	const [pan, setPan] = (0, import_react.useState)("");
	const [paymentMethod, setPaymentMethod] = (0, import_react.useState)("upi");
	const [otpSent, setOtpSent] = (0, import_react.useState)(false);
	const [otp, setOtp] = (0, import_react.useState)("");
	const [verifyingOtp, setVerifyingOtp] = (0, import_react.useState)(false);
	const score = 782;
	const handleDetailsSubmit = (e) => {
		e.preventDefault();
		if (!fullName || !mobile || !pan) {
			toast.error("Please fill in all required fields.");
			return;
		}
		if (pan.length !== 10) {
			toast.error("Enter a valid 10-character PAN number.");
			return;
		}
		setStep("checkout");
	};
	const handlePayment = async () => {
		setStep("loading");
		await new Promise((r) => setTimeout(r, 1500));
		setOtpSent(true);
		setStep("checkout");
	};
	const verifyOtpAndShowResults = async (e) => {
		e.preventDefault();
		if (otp !== "1234") {
			toast.error("Invalid verification code. Enter '1234' for demo.");
			return;
		}
		setVerifyingOtp(true);
		await new Promise((r) => setTimeout(r, 1200));
		setVerifyingOtp(false);
		setStep("results");
		toast.success("Payment authorized & Credit Score generated!");
	};
	const downloadPdfReport = () => {
		toast.success("Generating CIBIL report PDF...", { description: "Downloading will start automatically." });
		const docContent = `
=============================================
         TRANSUNION CIBIL CREDIT REPORT
=============================================
Report ID: TU-CIBIL-887410293
Date Generated: ${(/* @__PURE__ */ new Date()).toLocaleDateString("en-IN")}
Subject: ${fullName.toUpperCase()}
PAN: ${pan.toUpperCase()}
Mobile: ${mobile}

CREDIT SCORE: ${score} / 900
Rating: EXCELLENT

KEY PARAMETERS BREAKDOWN:
---------------------------------------------
1. Payment History: On-time (99%) - EXCELLENT
2. Credit Utilization: 22% - EXCELLENT
3. Credit Age: 6 Years 2 Months - GOOD
4. Total Accounts: 6 Active (3 Loans, 3 Cards)
5. Recent Inquiries: 1 (Last 30 Days)

SUMMARY REPORT BACKED BY INSTANT TRUST FUND
=============================================
`;
		const element = document.createElement("a");
		const file = new Blob([docContent], { type: "text/plain" });
		element.href = URL.createObjectURL(file);
		element.download = `CIBIL_Report_${fullName.replace(/\s+/g, "_")}.txt`;
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	};
	const getStepStatus = (currentStep) => {
		const stepsOrder = [
			"input",
			"checkout",
			"loading",
			"results"
		];
		const currentIndex = stepsOrder.indexOf(step);
		const targetIndex = stepsOrder.indexOf(currentStep);
		if (step === "loading" && currentStep === "checkout") return "active";
		if (currentIndex > targetIndex) return "completed";
		if (currentIndex === targetIndex) return "active";
		return "future";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-brand-soft py-12 px-4 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-12 max-w-2xl mx-auto space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: "bg-gradient-to-r from-royal-purple to-lic-blue text-white hover:opacity-95 border-none py-1 px-3 mb-2 text-xs font-black shadow-md",
						children: "⚡ Instant Credit Bureau Fetch"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-extrabold text-brand-navy md:text-5xl tracking-tight leading-tight",
						children: "Check your Credit Score"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-slate-600 text-xs sm:text-sm leading-relaxed",
						children: "Securely pull your latest official CIBIL score. High scores receive pre-approved loan sanctions with lower interest rates."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-xl mx-auto mb-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex items-center justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-10" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `h-9 w-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${getStepStatus("input") === "completed" ? "bg-gradient-to-r from-royal-purple to-lic-blue text-white" : getStepStatus("input") === "active" ? "bg-white border-2 border-royal-purple text-royal-purple shadow-md scale-105" : "bg-slate-100 border-2 border-slate-200 text-slate-400"}`,
								children: getStepStatus("input") === "completed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }) : "1"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-[10px] sm:text-xs font-bold mt-2 ${getStepStatus("input") === "active" ? "text-royal-purple" : "text-slate-500"}`,
								children: "Details"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `h-9 w-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${getStepStatus("checkout") === "completed" ? "bg-gradient-to-r from-royal-purple to-lic-blue text-white" : getStepStatus("checkout") === "active" ? "bg-white border-2 border-royal-purple text-royal-purple shadow-md scale-105" : "bg-slate-100 border-2 border-slate-200 text-slate-400"}`,
								children: getStepStatus("checkout") === "completed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }) : "2"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-[10px] sm:text-xs font-bold mt-2 ${getStepStatus("checkout") === "active" ? "text-royal-purple" : "text-slate-500"}`,
								children: "Payment"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `h-9 w-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${getStepStatus("results") === "completed" || step === "results" ? "bg-gradient-to-r from-royal-purple to-lic-blue text-white" : getStepStatus("results") === "active" ? "bg-white border-2 border-royal-purple text-royal-purple shadow-md scale-105" : "bg-slate-100 border-2 border-slate-200 text-slate-400"}`,
								children: step === "results" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }) : "3"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-[10px] sm:text-xs font-bold mt-2 ${step === "results" ? "text-royal-purple" : "text-slate-500"}`,
								children: "Score Report"
							})]
						})
					]
				})
			}),
			step === "input" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-xl mx-auto space-y-6 animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-6 border border-slate-100 bg-white shadow-elevated relative overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-royal-purple to-lic-blue" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-base font-extrabold text-brand-navy border-b pb-3 mb-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-royal-purple" }), " Credit Bureau Consent Form"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleDetailsSubmit,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "fullName",
									className: "text-xs font-bold uppercase tracking-wider text-slate-500",
									children: "Full Name (As on PAN Card) *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "fullName",
									placeholder: "e.g. Vikram Sharma",
									value: fullName,
									onChange: (e) => setFullName(e.target.value),
									className: "rounded-lg border-slate-200 mt-1",
									required: true
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "mobile",
										className: "text-xs font-bold uppercase tracking-wider text-slate-500",
										children: "Mobile Number *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "mobile",
										placeholder: "+91 98765 43210",
										value: mobile,
										onChange: (e) => setMobile(e.target.value),
										className: "rounded-lg border-slate-200 mt-1",
										required: true
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "pan",
										className: "text-xs font-bold uppercase tracking-wider text-slate-500",
										children: "PAN Number *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "pan",
										placeholder: "e.g. ABCDE1234F",
										value: pan,
										onChange: (e) => setPan(e.target.value),
										className: "uppercase font-mono rounded-lg border-slate-200 mt-1",
										maxLength: 10,
										required: true
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[10px] sm:text-[11px] text-muted-foreground leading-relaxed bg-slate-50 rounded-xl p-4 border border-slate-100 flex gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 text-amber-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "TransUnion API Compliance Notice" }), ": This service is a simulated interface of the TransUnion CIBIL API integration. In production, real-time fetching is subject to credential verification, licensing agreements, and commercial API contracts with TransUnion. Checking your score retrieves a soft inquiry on your record."] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "submit",
									className: "w-full bg-gradient-to-r from-royal-purple to-lic-blue text-white font-bold h-11 shadow-md hover:opacity-95 transition-opacity",
									children: ["Proceed to Verification ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-6 border border-slate-100 bg-white shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-sm font-extrabold text-brand-navy border-b pb-3 mb-4 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4 text-royal-purple" }), " Previously Generated Bureau Reports"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: [
							{
								id: "TU-CIBIL-112049",
								name: "R H Adhoni",
								pan: "ADHPXXXX1A",
								score: 812,
								date: "12/06/2026",
								color: "from-emerald-500 to-teal-500"
							},
							{
								id: "TU-CIBIL-905581",
								name: "Bibi Ayesha",
								pan: "AYEPXXXX2B",
								score: 794,
								date: "02/07/2026",
								color: "from-emerald-500 to-teal-500"
							},
							{
								id: "TU-CIBIL-774512",
								name: "Vikram Urs",
								pan: "URSPXXXX3C",
								score: 758,
								date: "10/07/2026",
								color: "from-emerald-500 to-teal-500"
							}
						].map((rep) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-extrabold text-brand-navy",
									children: rep.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-muted-foreground text-[10px] mt-0.5",
									children: [
										"PAN: ",
										rep.pan,
										" | Date: ",
										rep.date
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] font-mono text-slate-400 mt-0.5",
									children: rep.id
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									className: "bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold px-2 py-0.5",
									children: ["Score: ", rep.score]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "ghost",
									size: "icon",
									className: "h-8 w-8 text-royal-purple hover:bg-slate-50 rounded-lg",
									onClick: () => {
										toast.success(`Downloading historical report for ${rep.name}...`);
										const docContent = `
=============================================
         TRANSUNION CIBIL CREDIT REPORT
=============================================
Report ID: ${rep.id}
Date Generated: ${rep.date}
Subject: ${rep.name.toUpperCase()}
PAN: ${rep.pan}

CREDIT SCORE: ${rep.score} / 900
Rating: EXCELLENT

SUMMARY REPORT BACKED BY INSTANT TRUST FUND
=============================================
`;
										const element = document.createElement("a");
										const file = new Blob([docContent], { type: "text/plain" });
										element.href = URL.createObjectURL(file);
										element.download = `CIBIL_Report_${rep.name.replace(/\s+/g, "_")}.txt`;
										document.body.appendChild(element);
										element.click();
										document.body.removeChild(element);
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" })
								})]
							})]
						}, rep.id))
					})]
				})]
			}),
			step === "checkout" && !otpSent && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6 border border-slate-100 bg-white shadow-elevated max-w-xl mx-auto animate-fade-in relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-royal-purple to-lic-blue" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-base font-extrabold text-brand-navy border-b pb-3 mb-4 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-5 w-5 text-royal-purple" }), " Premium Report Payout"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-gradient-to-br from-royal-purple/5 to-lic-blue/5 p-6 border border-royal-purple/10 mb-6 text-center space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] text-slate-500 uppercase tracking-widest block font-bold",
								children: "Bureau Verification Charge"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-4xl font-black text-brand-navy",
								children: "₹399.00"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: "Includes 1-year score monitoring & dynamic dashboard tracking."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-brand-navy block uppercase tracking-wider text-slate-500",
								children: "Select Payment Method"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-3 gap-3",
								children: [
									{
										id: "upi",
										label: "UPI / QR"
									},
									{
										id: "card",
										label: "Card"
									},
									{
										id: "net",
										label: "Net Banking"
									}
								].map((method) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: paymentMethod === method.id ? "default" : "outline",
									onClick: () => setPaymentMethod(method.id),
									className: `text-xs font-bold h-10 transition-all rounded-lg ${paymentMethod === method.id ? "bg-royal-purple text-white shadow" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`,
									children: method.label
								}, method.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: handlePayment,
								className: "w-full bg-gradient-to-r from-royal-purple to-lic-blue text-white font-bold h-11 shadow-md mt-6",
								children: "Authorize Payment of ₹399"
							})
						]
					})
				]
			}),
			step === "checkout" && otpSent && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6 border border-slate-100 bg-white shadow-elevated max-w-xl mx-auto animate-fade-in relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-base font-extrabold text-brand-navy border-b pb-3 mb-4 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "h-5 w-5 text-emerald-500" }), " Enter Payment OTP"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mb-4",
						children: "We sent a secure, mock validation code to your bank terminal. Please enter it below."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: verifyOtpAndShowResults,
						className: "space-y-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "otp",
							className: "text-xs font-bold uppercase tracking-wider text-slate-500",
							children: "Verification Code *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "otp",
							placeholder: "Enter 1234 to verify",
							value: otp,
							onChange: (e) => setOtp(e.target.value),
							className: "text-center text-lg tracking-widest font-mono font-bold mt-1 h-12 border-slate-200 rounded-lg",
							required: true
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: verifyingOtp,
							className: "w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11",
							children: verifyingOtp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), " Verifying OTP..."] }) : "Verify Code & Fetch Score"
						})]
					})
				]
			}),
			step === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-12 border border-slate-100 bg-white shadow-elevated max-w-xl mx-auto flex flex-col items-center justify-center text-center space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-royal-purple" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-extrabold text-brand-navy",
						children: "Processing Payout Request"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Contacting secure bank gateway..."
					})
				]
			}),
			step === "results" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-4xl mx-auto space-y-6 animate-fade-in",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-8 border border-slate-100 bg-white shadow-elevated text-center relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-4 right-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: "bg-emerald-50 text-emerald-700 border border-emerald-100 font-extrabold px-3 py-1 text-xs",
									children: "Excellent Credit Health"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative mx-auto h-48 w-72 flex flex-col items-center justify-end overflow-hidden mt-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									className: "w-64 h-32",
									viewBox: "0 0 100 50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
											id: "gauge-grad",
											x1: "0%",
											y1: "0%",
											x2: "100%",
											y2: "0%",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "0%",
													stopColor: "#ef4444"
												}),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "40%",
													stopColor: "#f59e0b"
												}),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "70%",
													stopColor: "#10b981"
												}),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "100%",
													stopColor: "#059669"
												}),
												" "
											]
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M 10 50 A 40 40 0 0 1 90 50",
											fill: "none",
											stroke: "#f1f5f9",
											strokeWidth: "8",
											strokeLinecap: "round"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M 10 50 A 40 40 0 0 1 90 50",
											fill: "none",
											stroke: "url(#gauge-grad)",
											strokeWidth: "8",
											strokeLinecap: "round",
											strokeDasharray: "125.66",
											strokeDashoffset: 125.66 * (1 - (score - 300) / 600),
											className: "transition-all duration-1000 ease-out"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
											transform: `rotate(54.599999999999994 50 50)`,
											className: "transition-transform duration-1000 ease-out",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
												x1: "50",
												y1: "50",
												x2: "50",
												y2: "18",
												stroke: "#1e293b",
												strokeWidth: "2.5",
												strokeLinecap: "round"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
												cx: "50",
												cy: "50",
												r: "4",
												fill: "#1e293b"
											})]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute bottom-0 text-center space-y-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-4xl font-black text-brand-navy tracking-tight",
										children: score
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-slate-500 font-bold uppercase tracking-wider block",
										children: "CIBIL Score"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between max-w-sm mx-auto text-[9px] font-bold text-slate-400 mt-2 border-t pt-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-red-500",
										children: "300 POOR"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-amber-500",
										children: "600 FAIR"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-emerald-500",
										children: "750 GOOD"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-emerald-700",
										children: "900 EXCELLENT"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-2xl font-black text-brand-navy mt-6",
								children: [
									"Congratulations, ",
									fullName,
									"!"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed",
								children: "Your credit score is in the top 5% nationally. You qualify for elite pre-approved personal and home loan programs."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap justify-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: downloadPdfReport,
									className: "bg-gradient-to-r from-royal-purple to-lic-blue text-white font-bold flex items-center gap-2 shadow-md hover:opacity-95 transition-opacity",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Download Official CIBIL PDF"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									onClick: () => setStep("input"),
									className: "text-xs font-bold border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg px-4",
									children: "Check Another"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							{
								title: "Payment History",
								score: "99% on-time",
								desc: "Excellent track record with zero late payments.",
								color: "text-emerald-600",
								bgColor: "bg-emerald-50/50",
								borderColor: "border-emerald-100/50"
							},
							{
								title: "Credit Utilization",
								score: "22% utilized",
								desc: "Optimal utilization below standard 30% ceiling.",
								color: "text-emerald-600",
								bgColor: "bg-emerald-50/50",
								borderColor: "border-emerald-100/50"
							},
							{
								title: "Inquiries",
								score: "1 recent query",
								desc: "Low search profile prevents hard credit impact.",
								color: "text-emerald-600",
								bgColor: "bg-emerald-50/50",
								borderColor: "border-emerald-100/50"
							}
						].map((metric) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: `p-5 border ${metric.borderColor} ${metric.bgColor} shadow-sm space-y-1`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-[10px] font-black text-slate-500 uppercase tracking-widest",
									children: metric.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `text-base font-extrabold ${metric.color}`,
									children: metric.score
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-slate-500 leading-relaxed",
									children: metric.desc
								})
							]
						}, metric.title))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 border border-slate-100 bg-white shadow-sm relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-1 h-full bg-royal-purple" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "text-sm font-extrabold text-brand-navy flex items-center gap-2 mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-royal-purple" }), " Recommendations to Optimize Score"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "space-y-2 text-[11px] sm:text-xs text-slate-600 leading-relaxed pl-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-royal-purple shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Keep total credit card balances under 30% of their aggregate limit at all times." })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-royal-purple shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Avoid closing older credit card accounts to preserve active age profile history." })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-royal-purple shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Consolidate high-interest short-term debt into a structured personal loan." })]
									})
								]
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
export { CibilPage as component };
