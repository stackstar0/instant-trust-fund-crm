import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as useAppStore, r as inr } from "./app-store-ByBvpnlW.mjs";
import { _ as Navigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.applications-BPXCiCet.js
var import_jsx_runtime = require_jsx_runtime();
function AdminApplications() {
	const { customers, currentUser } = useAppStore();
	if (currentUser?.role === "assistant_admin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/admin/tasks",
		replace: true
	});
	const recent = customers.slice(0, 20);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-6 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-black md:text-4xl",
				children: "Recent Applications"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "The latest 20 loan & insurance applications."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-3",
				children: recent.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-wrap items-center justify-between gap-4 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm font-semibold",
							children: [
								c.fullName,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-normal text-muted-foreground",
									children: ["· ", c.id]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground",
							children: [
								c.productType,
								" · ",
								c.branch
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold text-primary",
							children: inr(c.amount)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: c.status }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: new Date(c.appliedOn).toLocaleString("en-IN")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/customers",
							className: "text-xs font-semibold text-primary hover:underline",
							children: "Open →"
						})
					]
				}, c.id))
			})
		]
	});
}
//#endregion
export { AdminApplications as component };
