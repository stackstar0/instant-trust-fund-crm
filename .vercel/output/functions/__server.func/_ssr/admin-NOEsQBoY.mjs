import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as useAppStore } from "./app-store-ByBvpnlW.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { f as Outlet, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as ShieldAlert } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-NOEsQBoY.js
var import_jsx_runtime = require_jsx_runtime();
function AdminLayoutGuard() {
	const { currentUser } = useAppStore();
	if (!currentUser || currentUser.role !== "super_admin" && currentUser.role !== "assistant_admin") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center min-h-[70vh] px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-16 w-16 bg-rose-500/10 text-rose-600 rounded-full flex items-center justify-center mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-10 w-10" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-black text-brand-navy",
				children: "Access Denied"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground max-w-md",
				children: "Staff authentication is required to access the admin CRM. Please log in as an administrator to proceed."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "bg-primary hover:bg-brand-navy",
						children: "Go to Login"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						children: "Back to Home"
					})
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
}
//#endregion
export { AdminLayoutGuard as component };
