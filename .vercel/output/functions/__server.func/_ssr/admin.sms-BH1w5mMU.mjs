import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as useAppStore } from "./app-store-ByBvpnlW.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { _ as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as MessageSquare, S as RotateCcw, at as CircleCheck, b as Search, nt as Clock, rt as CircleX } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.sms-BH1w5mMU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SmsPage() {
	const { sms, resendSms, triggerScheduler, currentUser } = useAppStore();
	if (currentUser?.role === "assistant_admin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/admin/tasks",
		replace: true
	});
	const [q, setQ] = (0, import_react.useState)("");
	const filtered = (0, import_react.useMemo)(() => sms.filter((s) => !q || s.customer.toLowerCase().includes(q.toLowerCase()) || s.phone.includes(q)), [sms, q]);
	const today = (/* @__PURE__ */ new Date()).toDateString();
	const weekAgo = /* @__PURE__ */ new Date(Date.now() - 168 * 3600 * 1e3);
	const monthAgo = /* @__PURE__ */ new Date(Date.now() - 720 * 3600 * 1e3);
	const todayCount = sms.filter((s) => new Date(s.sentAt).toDateString() === today).length;
	const weekCount = sms.filter((s) => new Date(s.sentAt) >= weekAgo).length;
	const monthCount = sms.filter((s) => new Date(s.sentAt) >= monthAgo).length;
	const sent = sms.filter((s) => s.status === "Sent").length;
	const failed = sms.filter((s) => s.status === "Failed").length;
	const deliveryRate = (sent / sms.length * 100).toFixed(1);
	const StatusIcon = ({ s }) => s === "Sent" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }) : s === "Scheduled" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-3.5 w-3.5" });
	const badgeCls = (s) => s === "Sent" ? "bg-primary/10 text-primary border border-primary/30" : s === "Scheduled" ? "bg-accent/30 text-brand-navy border border-accent/50" : "bg-destructive/10 text-destructive border border-destructive/30";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-6 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-black md:text-4xl",
				children: "SMS Automation Center"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Scheduled reminders, campaigns, and delivery logs (demo)."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5",
				children: [
					{
						l: "Today",
						v: todayCount
					},
					{
						l: "This Week",
						v: weekCount
					},
					{
						l: "This Month",
						v: monthCount
					},
					{
						l: "Delivery Rate",
						v: deliveryRate + "%"
					},
					{
						l: "Failed",
						v: failed
					}
				].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
						children: x.l
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-2xl font-black text-primary",
						children: x.v
					})]
				}, x.l))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-6 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative min-w-[240px] flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Search by customer or phone...",
								value: q,
								onChange: (e) => setQ(e.target.value),
								className: "pl-9"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: () => {
								const { sent, failed } = triggerScheduler();
								if (sent === 0 && failed === 0) toast.info("No pending scheduled SMS messages found today.");
								else toast.success("SMS Scheduler completed!", { description: `Dispatched: ${sent} delivered, ${failed} failed.` });
							},
							className: "bg-primary/5 hover:bg-primary/10 border-primary/20 text-primary flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" }), " Run Daily Scheduler"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "mr-2 h-4 w-4" }), " New Campaign"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Customer" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Phone" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Message" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Sent Time" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Action" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filtered.slice(0, 60).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-medium",
							children: s.customer
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-mono text-xs",
							children: s.phone
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "max-w-xs text-xs text-muted-foreground",
							children: s.message
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-xs",
							children: new Date(s.sentAt).toLocaleString("en-IN")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							className: `${badgeCls(s.status)} inline-flex items-center gap-1`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusIcon, { s: s.status }), s.status]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "ghost",
							disabled: s.status === "Sent",
							onClick: () => {
								resendSms(s.id);
								toast.success("SMS re-sent");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "mr-1 h-3.5 w-3.5" }), " Retry"]
						}) })
					] }, s.id)) })] })
				})]
			})
		]
	});
}
//#endregion
export { SmsPage as component };
