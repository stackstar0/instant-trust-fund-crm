import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as useAppStore } from "./app-store-ByBvpnlW.mjs";
import { _ as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { at as CircleCheck, b as Search, l as TrendingUp, r as Users, yt as Award } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.referrals-CRAuw8bs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function formatINR(val) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0
	}).format(val);
}
function ReferralsPage() {
	const { customers, currentUser } = useAppStore();
	if (currentUser?.role === "assistant_admin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/admin/tasks",
		replace: true
	});
	const [search, setSearch] = (0, import_react.useState)("");
	const referrals = (0, import_react.useMemo)(() => {
		return customers.filter((c) => !!c.referralCode);
	}, [customers]);
	const stats = (0, import_react.useMemo)(() => {
		const total = referrals.length;
		const approved = referrals.filter((c) => c.status === "Approved").length;
		const pending = referrals.filter((c) => c.status === "Pending" || c.status === "In Review").length;
		const totalVolume = referrals.filter((c) => c.status === "Approved").reduce((sum, c) => sum + (c.amount || 0), 0);
		return {
			total,
			approved,
			pending,
			totalVolume,
			estCommission: totalVolume * .01,
			conversionRate: total > 0 ? Math.round(approved / total * 100) : 0
		};
	}, [referrals]);
	const codeLeaderboard = (0, import_react.useMemo)(() => {
		const map = {};
		referrals.forEach((r) => {
			const code = r.referralCode.toUpperCase();
			if (!map[code]) map[code] = {
				code,
				total: 0,
				approved: 0,
				volume: 0
			};
			map[code].total += 1;
			if (r.status === "Approved") {
				map[code].approved += 1;
				map[code].volume += r.amount || 0;
			}
		});
		return Object.values(map).sort((a, b) => b.volume - a.volume);
	}, [referrals]);
	const filteredReferrals = (0, import_react.useMemo)(() => {
		const q = search.toLowerCase().trim();
		if (!q) return referrals;
		return referrals.filter((r) => r.fullName.toLowerCase().includes(q) || r.referralCode.toLowerCase().includes(q) || r.productType.toLowerCase().includes(q));
	}, [referrals, search]);
	const getStatusColor = (status) => {
		switch (status) {
			case "Approved": return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
			case "Rejected": return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
			case "In Review": return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
			default: return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-6 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-black md:text-4xl text-brand-navy",
					children: "Referrals & Affiliates"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Track referred applications, affiliate revenue shares, and partner conversion statistics."
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "p-6 border bg-card shadow-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-xl bg-primary/10 p-3 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-6 w-6" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider block",
									children: "Referred Leads"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-black text-brand-navy",
									children: stats.total
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] text-muted-foreground block mt-0.5",
									children: [stats.pending, " pending review"]
								})
							] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "p-6 border bg-card shadow-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-xl bg-emerald-500/10 p-3 text-emerald-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-6 w-6" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider block",
									children: "Approved Cases"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-black text-brand-navy",
									children: stats.approved
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] text-emerald-600 font-semibold block mt-0.5",
									children: [stats.conversionRate, "% conversion rate"]
								})
							] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "p-6 border bg-card shadow-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-xl bg-indigo-500/10 p-3 text-indigo-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-6 w-6" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider block",
									children: "Converted Volume"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-black text-brand-navy",
									children: formatINR(stats.totalVolume)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted-foreground block mt-0.5",
									children: "Approved loan & insurance book"
								})
							] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "p-6 border bg-card shadow-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-xl bg-amber-500/10 p-3 text-amber-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-6 w-6" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider block",
									children: "Affiliate Revenue (1%)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl font-black text-brand-navy",
									children: formatINR(stats.estCommission)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted-foreground block mt-0.5",
									children: "Commission payouts accrued"
								})
							] })]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-8 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-2 space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 border bg-card shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold text-brand-navy",
								children: "Referred Applications Log"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative max-w-sm w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "Search code or applicant...",
									className: "pl-9",
									value: search,
									onChange: (e) => setSearch(e.target.value)
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-left text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/30",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-3 px-4",
											children: "Applicant"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-3 px-4",
											children: "Product / Vol"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-3 px-4",
											children: "Referral Code"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-3 px-4",
											children: "Status"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-3 px-4",
											children: "Date"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y",
									children: filteredReferrals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										colSpan: 5,
										className: "py-8 text-center text-muted-foreground",
										children: "No matching referred applications found."
									}) }) : filteredReferrals.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "hover:bg-muted/10 transition",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "py-3.5 px-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-semibold text-foreground",
													children: r.fullName
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[11px] text-muted-foreground",
													children: r.mobile
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "py-3.5 px-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-medium text-foreground",
													children: r.productType
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-xs text-muted-foreground",
													children: formatINR(r.amount)
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3.5 px-4",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													variant: "outline",
													className: "font-mono bg-primary/5 text-primary border-primary/25",
													children: r.referralCode
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3.5 px-4",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													variant: "outline",
													className: getStatusColor(r.status),
													children: r.status
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3.5 px-4 text-xs text-muted-foreground",
												children: new Date(r.appliedOn).toLocaleDateString("en-IN", {
													day: "numeric",
													month: "short"
												})
											})
										]
									}, r.id))
								})]
							})
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 border bg-card shadow-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold text-brand-navy mb-4",
								children: "Referral Code Leaderboard"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mb-6",
								children: "Performance by referral code based on approved business volume."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-4",
								children: codeLeaderboard.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground py-4 text-center",
									children: "No code statistics yet."
								}) : codeLeaderboard.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between p-3 rounded-xl border bg-background hover:bg-muted/10 transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs",
											children: index + 1
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-mono font-bold text-sm text-brand-navy",
											children: item.code
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[10px] text-muted-foreground",
											children: [
												item.approved,
												" / ",
												item.total,
												" approved leads"
											]
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-bold text-sm text-foreground",
											children: formatINR(item.volume)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[9px] font-bold text-amber-500 uppercase tracking-widest",
											children: [formatINR(item.volume * .01), " share"]
										})]
									})]
								}, item.code))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 border bg-card shadow-card bg-brand-navy text-white relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-1/4 translate-x-1/4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-40 w-40 text-white" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-base font-bold text-accent",
								children: "Affiliate Program Details"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-white/80 leading-relaxed",
								children: "Affiliates receive a flat 1% revenue share on all successful (Approved) loan volumes referred via their codes. Payouts are generated on the 5th of every month."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-4 space-y-2 text-[11px] text-white/90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-accent" }), " Custom commission for premium partners"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-accent" }), " Live conversion tracking and analytics"]
								})]
							})
						]
					})]
				})]
			})
		]
	});
}
//#endregion
export { ReferralsPage as component };
