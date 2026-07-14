import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as useAppStore, r as inr } from "./app-store-ByBvpnlW.mjs";
import { F as Landmark, G as FileText, nt as Clock, v as ShieldCheck, vt as Bell } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.notifications-B6W_HtPO.js
var import_jsx_runtime = require_jsx_runtime();
var ICONS = {
	"EMI Due": Landmark,
	"Insurance Renewal": ShieldCheck,
	"Loan Approval": Bell,
	"Pending Documents": FileText
};
function Countdown({ iso }) {
	const diff = new Date(iso).getTime() - Date.now();
	const days = Math.max(0, Math.floor(diff / (1e3 * 3600 * 24)));
	const hrs = Math.max(0, Math.floor(diff % (1e3 * 3600 * 24) / (1e3 * 3600)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-mono font-semibold text-primary",
			children: [
				days,
				"d ",
				hrs,
				"h"
			]
		})]
	});
}
function NotificationsPage() {
	const { notifications } = useAppStore();
	const grouped = notifications.reduce((acc, n) => {
		(acc[n.type] ||= []).push(n);
		return acc;
	}, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-6 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-black md:text-4xl",
				children: "Notification Center"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Upcoming events and reminders across your book."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-2",
				children: Object.entries(grouped).map(([type, items]) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg bg-primary/10 p-2 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ICONS[type] || Bell, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-bold",
									children: type
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: "ml-auto",
									children: items.length
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: items.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-lg border p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-semibold",
									children: n.customer
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-muted-foreground",
									children: [
										"Due ",
										new Date(n.dueDate).toLocaleDateString("en-IN"),
										n.amount ? ` · ${inr(n.amount)}` : ""
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Countdown, { iso: n.dueDate })]
							}, n.id))
						})]
					}, type);
				})
			})
		]
	});
}
//#endregion
export { NotificationsPage as component };
