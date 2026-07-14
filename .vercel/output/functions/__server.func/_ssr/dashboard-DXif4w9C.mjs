import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as useAppStore } from "./app-store-ByBvpnlW.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { D as MessageSquare, G as FileText, U as Gift, bt as ArrowRight, et as Copy, ht as Calculator, mt as Calendar, nt as Clock, o as Upload, v as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-DXif4w9C.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function formatINR(val) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0
	}).format(val);
}
function CustomerDashboard() {
	const { customers, sms, notifications } = useAppStore();
	const [phoneQuery, setPhoneQuery] = (0, import_react.useState)("");
	const [refQuery, setRefQuery] = (0, import_react.useState)("");
	const [activeClient, setActiveClient] = (0, import_react.useState)(null);
	const [hasSearched, setHasSearched] = (0, import_react.useState)(false);
	const [uploadedDocs, setUploadedDocs] = (0, import_react.useState)([]);
	const demoSug = (0, import_react.useMemo)(() => {
		return {
			loanCl: customers.find((c) => c.productKind === "loan"),
			insCl: customers.find((c) => c.productKind === "insurance")
		};
	}, [customers]);
	const handleSearch = (e) => {
		e.preventDefault();
		const phone = phoneQuery.trim().replace(/\D/g, "");
		const ref = refQuery.trim().toUpperCase();
		if (!phone && !ref) {
			toast.error("Please enter a Phone Number or Reference ID.");
			return;
		}
		const matched = customers.find((c) => {
			const cPhone = c.mobile.replace(/\D/g, "");
			const phoneMatch = phone ? cPhone.includes(phone) : false;
			const refMatch = ref ? c.id.toUpperCase() === ref : false;
			return phoneMatch || refMatch;
		});
		if (matched) {
			setActiveClient(matched);
			setUploadedDocs(matched.documents || []);
			toast.success(`Access granted for ${matched.fullName}`);
		} else {
			setActiveClient(null);
			toast.error("No active application found matching credentials.");
		}
		setHasSearched(true);
	};
	const handleLogout = () => {
		setActiveClient(null);
		setHasSearched(false);
		setPhoneQuery("");
		setRefQuery("");
		setUploadedDocs([]);
	};
	const simulateDocUpload = () => {
		const docName = `Doc_${Math.floor(100 + Math.random() * 900)}.pdf`;
		setUploadedDocs((prev) => [...prev, docName]);
		toast.success(`Uploaded ${docName}`, { description: "Document has been appended to your application logs." });
	};
	const clientSms = (0, import_react.useMemo)(() => {
		if (!activeClient) return [];
		const clientCleanPhone = activeClient.mobile.replace(/\D/g, "");
		return sms.filter((s) => s.phone.replace(/\D/g, "").includes(clientCleanPhone));
	}, [activeClient, sms]);
	const clientNotifications = (0, import_react.useMemo)(() => {
		if (!activeClient) return [];
		return notifications.filter((n) => n.customer.toLowerCase() === activeClient.fullName.toLowerCase());
	}, [activeClient, notifications]);
	const getStatusStep = (status) => {
		switch (status) {
			case "Approved": return 3;
			case "Rejected": return 3;
			case "In Review": return 2;
			default: return 1;
		}
	};
	const mockEmiSchedule = (0, import_react.useMemo)(() => {
		if (!activeClient || activeClient.productKind !== "loan") return [];
		const p = activeClient.amount;
		const emi = Math.round(p * (8.5 / 12 / 100) * Math.pow(1.0070833333333333, 180) / (Math.pow(1.0070833333333333, 180) - 1)) || 15e3;
		return [
			{
				installment: "1",
				date: "05 Jun 2026",
				amount: emi,
				principal: Math.round(emi * .42),
				interest: Math.round(emi * .58),
				status: "Paid"
			},
			{
				installment: "2",
				date: "05 Jul 2026",
				amount: emi,
				principal: Math.round(emi * .43),
				interest: Math.round(emi * .57),
				status: "Paid"
			},
			{
				installment: "3",
				date: "05 Aug 2026",
				amount: emi,
				principal: Math.round(emi * .44),
				interest: Math.round(emi * .56),
				status: "Pending"
			},
			{
				installment: "4",
				date: "05 Sep 2026",
				amount: emi,
				principal: Math.round(emi * .45),
				interest: Math.round(emi * .55),
				status: "Pending"
			},
			{
				installment: "5",
				date: "05 Oct 2026",
				amount: emi,
				principal: Math.round(emi * .46),
				interest: Math.round(emi * .54),
				status: "Pending"
			}
		];
	}, [activeClient]);
	const mockReferralInfo = (0, import_react.useMemo)(() => {
		if (!activeClient) return null;
		return {
			referredCount: 3,
			convertedCount: 1,
			bonusEarned: 7500,
			referralCode: `REF-${activeClient.id}`,
			referredUsers: [
				{
					name: "Rahul Deshmukh",
					status: "Sanction Disbursed",
					date: "12 May 2026",
					reward: "₹5,000"
				},
				{
					name: "Sneha Patil",
					status: "KYC In Audit",
					date: "18 June 2026",
					reward: "Pending"
				},
				{
					name: "Vijay Naik",
					status: "Lead Captured",
					date: "02 July 2026",
					reward: "Pending"
				}
			]
		};
	}, [activeClient]);
	const copyReferralLink = () => {
		if (mockReferralInfo) {
			navigator.clipboard.writeText(`https://instanttrustfund.com/apply?ref=${mockReferralInfo.referralCode}`);
			toast.success("Referral link copied to clipboard!");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-7xl px-6 py-12",
		children: !activeClient ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-black text-brand-navy md:text-4xl",
					children: "Customer Tracking Portal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted-foreground text-sm",
					children: "Enter your mobile number or reference code to view real-time tracking, files checklist, and advisor messages."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6 border bg-card shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSearch,
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "phone",
							className: "text-xs font-bold text-slate-500 uppercase",
							children: "Registered Mobile Number"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "phone",
							placeholder: "e.g. 98765 43210",
							value: phoneQuery,
							onChange: (e) => setPhoneQuery(e.target.value)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "ref",
							className: "text-xs font-bold text-slate-500 uppercase",
							children: "Application Reference Code"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "ref",
							placeholder: "e.g. IFY10012",
							value: refQuery,
							onChange: (e) => setRefQuery(e.target.value),
							className: "uppercase"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						className: "w-full bg-primary hover:bg-brand-navy text-white font-bold",
						children: ["Track Status ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 pt-6 border-t rounded-lg text-xs text-muted-foreground bg-slate-50 p-4 border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-brand-navy block mb-2",
						children: "💡 Demo Credentials to Test Portal:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [demoSug.loanCl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border bg-white p-3 rounded-lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-primary block mb-1",
									children: "Loan Portfolio"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Phone: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono font-bold text-foreground",
									children: demoSug.loanCl.mobile
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Ref Code: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono font-bold text-foreground",
									children: demoSug.loanCl.id
								})] })
							]
						}), demoSug.insCl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border bg-white p-3 rounded-lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-primary block mb-1",
									children: "Insurance Portfolio"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Phone: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono font-bold text-foreground",
									children: demoSug.insCl.mobile
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Ref Code: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono font-bold text-foreground",
									children: demoSug.insCl.id
								})] })
							]
						})]
					})]
				})]
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/40 border border-white/20 backdrop-blur-md rounded-2xl p-6 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] text-muted-foreground uppercase font-black",
						children: "Authorized Session"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-black text-brand-navy mt-0.5",
						children: activeClient.fullName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Ref Code: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono font-bold text-foreground",
								children: activeClient.id
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Mobile: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono font-bold text-foreground",
								children: activeClient.mobile
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Branch: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono font-bold text-foreground",
								children: activeClient.branch || "Bengaluru Main"
							})] })
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "sm",
					onClick: handleLogout,
					className: "w-fit font-bold border-rose-500/20 text-rose-600 hover:bg-rose-50 hover:text-rose-700",
					children: "Disconnect Session"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-8 space-y-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 border bg-white/40 border-white/20 backdrop-blur-md shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-black text-brand-navy mb-6",
								children: "Milestone Audit Log"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-4 left-4 right-4 h-1 bg-slate-200 -z-10 hidden sm:block" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-6 sm:grid-cols-3 text-center sm:text-left",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col sm:items-center",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-9 w-9 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm mx-auto sm:mx-0 shadow-lg",
													children: "✓"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-bold text-brand-navy mt-2 block",
													children: "Application Filed"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] text-slate-500 mt-0.5",
													children: "We captured your primary parameters."
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col sm:items-center",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: `h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm mx-auto sm:mx-0 shadow-lg ${getStatusStep(activeClient.status) >= 2 ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"}`,
													children: getStatusStep(activeClient.status) >= 2 ? "✓" : "2"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-bold text-brand-navy mt-2 block",
													children: "Document Verification"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] text-slate-500 mt-0.5",
													children: "Verification of your deed records & KYC."
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col sm:items-center",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: `h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm mx-auto sm:mx-0 shadow-lg ${activeClient.status === "Approved" ? "bg-emerald-500 text-white" : activeClient.status === "Rejected" ? "bg-rose-500 text-white" : "bg-slate-200 text-slate-500"}`,
													children: activeClient.status === "Approved" ? "✓" : activeClient.status === "Rejected" ? "✗" : "3"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-bold text-brand-navy mt-2 block",
													children: "Final Disbursal"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] text-slate-500 mt-0.5",
													children: activeClient.status === "Approved" ? "Sanction approved!" : activeClient.status === "Rejected" ? "Application rejected." : "Pending outcome."
												})
											]
										})
									]
								})]
							})]
						}),
						activeClient.productKind === "insurance" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 border bg-white/40 border-white/20 backdrop-blur-md shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-black text-brand-navy mb-4",
								children: "Your E-Policy Card"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "max-w-md mx-auto rounded-2xl bg-gradient-to-r from-royal-purple to-lic-blue p-6 text-white shadow-elevated relative overflow-hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute right-0 bottom-0 opacity-10 transform translate-y-1/4 translate-x-1/4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-44 w-44 text-white" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-start",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] text-white/60 uppercase tracking-widest font-black",
											children: "E-POLICY CERTIFICATE"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-base font-black text-gold",
											children: activeClient.productType
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											className: "bg-white/20 text-white hover:bg-white/35 font-bold text-[9px]",
											children: "ACTIVE"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-8 grid grid-cols-2 gap-4 text-[11px]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-white/60 block uppercase font-semibold text-[9px]",
												children: "Insured Person"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-sm",
												children: activeClient.fullName
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-white/60 block uppercase font-semibold text-[9px]",
												children: "Coverage Sum"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-sm",
												children: formatINR(activeClient.amount)
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-white/60 block uppercase font-semibold text-[9px]",
												children: "Certificate Code"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono font-bold text-sm",
												children: ["IFY-POL-", activeClient.id]
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-white/60 block uppercase font-semibold text-[9px]",
												children: "Validity Period"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-sm",
												children: "1 Year / Auto-Renewable"
											})] })
										]
									})
								]
							})]
						}),
						activeClient.productKind === "loan" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 border bg-white/40 border-white/20 backdrop-blur-md shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-black text-brand-navy",
									children: "EMI Repayment Schedule"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-slate-500",
									children: "Upcoming debit schedule and principal breakup estimates."
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto border rounded-xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "min-w-full text-xs text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
										className: "bg-slate-50 border-b text-[10px] font-bold text-slate-400 uppercase",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3",
												children: "Inst."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3",
												children: "Due Date"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3",
												children: "EMI Amount"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3",
												children: "Principal"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3",
												children: "Interest"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3",
												children: "Status"
											})
										] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
										className: "divide-y font-semibold",
										children: mockEmiSchedule.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "hover:bg-slate-50/50",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3 font-mono",
													children: row.installment
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "p-3 flex items-center gap-1.5",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3 text-slate-400" }),
														" ",
														row.date
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3",
													children: formatINR(row.amount)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3 text-slate-500",
													children: formatINR(row.principal)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3 text-slate-500",
													children: formatINR(row.interest)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
														className: row.status === "Paid" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-bold" : "bg-amber-500/10 text-amber-600 border-amber-500/20 font-bold",
														children: row.status
													})
												})
											]
										}, row.installment))
									})]
								})
							})]
						}),
						mockReferralInfo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 border bg-white/40 border-white/20 backdrop-blur-md shadow-card space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "h-5 w-5 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-base font-black text-brand-navy",
											children: "Refer & Earn Dashboard"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-slate-500",
											children: "Share your custom link and earn ₹5,000 for every sanctioned loan."
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										onClick: copyReferralLink,
										size: "sm",
										className: "bg-primary hover:bg-brand-navy flex items-center gap-1.5 h-8 font-bold text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" }),
											" Copy Code: ",
											mockReferralInfo.referralCode
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-white border rounded-xl p-4 text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] uppercase font-bold text-slate-400 block",
												children: "Invites Sent"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xl font-black text-brand-navy mt-1 block",
												children: mockReferralInfo.referredCount
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-white border rounded-xl p-4 text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] uppercase font-bold text-slate-400 block",
												children: "Disbursed Audits"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xl font-black text-emerald-600 mt-1 block",
												children: mockReferralInfo.convertedCount
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "bg-white border rounded-xl p-4 text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] uppercase font-bold text-slate-400 block",
												children: "Total Earnings"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xl font-black text-primary mt-1 block",
												children: formatINR(mockReferralInfo.bonusEarned)
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-brand-navy block",
										children: "My Referred Invites"
									}), mockReferralInfo.referredUsers.map((refUser, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between p-3 rounded-xl border bg-white text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-bold text-brand-navy",
											children: refUser.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[10px] text-slate-400 mt-0.5",
											children: ["Invited: ", refUser.date]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-right",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "outline",
												className: "text-[9px] font-bold",
												children: refUser.status
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] font-black text-primary mt-0.5",
												children: refUser.reward
											})]
										})]
									}, index))]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-4 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 border bg-white/40 border-white/20 backdrop-blur-md shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center border-b pb-3 mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-bold text-brand-navy",
									children: "Uploaded Verification Files"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: simulateDocUpload,
									size: "sm",
									className: "bg-primary hover:bg-brand-navy h-7 px-2 text-[10px] font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-3 w-3 mr-1" }), " Upload"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2",
								children: uploadedDocs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-muted-foreground text-center py-4 border border-dashed rounded-lg",
									children: "No documents attached."
								}) : uploadedDocs.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between p-2.5 rounded-lg border bg-white hover:bg-muted/10 transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3.5 w-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10px] font-bold text-brand-navy",
											children: doc
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-bold text-[9px] px-1 py-0",
										children: "✓ Verified"
									})]
								}, doc))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 border bg-white/40 border-white/20 backdrop-blur-md shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-sm font-bold text-brand-navy border-b pb-3 mb-4 flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-4 w-4 text-primary" }), " SMS Communication Logs"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-4 max-h-[350px] overflow-y-auto pr-1",
								children: clientSms.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground text-center py-4",
									children: "No communication logs recorded."
								}) : clientSms.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border bg-white rounded-xl p-3 space-y-1 shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-[9px] text-slate-400 font-mono",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.id }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: new Date(s.sentAt).toLocaleDateString("en-IN") })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold text-brand-navy leading-relaxed",
										children: s.message
									})]
								}, s.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 border bg-white/40 border-white/20 backdrop-blur-md shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-sm font-bold text-brand-navy border-b pb-3 mb-4 flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-primary" }), " Action Items"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: clientNotifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground text-center py-4",
									children: "No active advisory alerts."
								}) : clientNotifications.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-3 rounded-lg bg-primary/5 border border-primary/20 flex gap-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-brand-navy",
										children: n.type
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-slate-500 mt-0.5",
										children: [
											"Due by: ",
											new Date(n.dueDate).toLocaleDateString("en-IN"),
											n.amount ? ` (Amount: ${formatINR(n.amount)})` : ""
										]
									})] })]
								}, n.id))
							})]
						})
					]
				})]
			})]
		})
	});
}
//#endregion
export { CustomerDashboard as component };
