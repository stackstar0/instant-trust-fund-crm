import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as useAppStore } from "./app-store-ByBvpnlW.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as Key, a as UserCheck, j as Lock, v as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DgmSV_2B.js
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const { currentUser, setCurrentUser } = useAppStore();
	const navigate = useNavigate();
	const handleLogin = (name, role) => {
		setCurrentUser({
			name,
			role
		});
		toast.success(`Logged in as ${name}`, { description: `Role assigned: ${role.replace("_", " ").toUpperCase()}` });
		if (role === "customer") navigate({ to: "/dashboard" });
		else navigate({ to: "/admin" });
	};
	const handleLogout = () => {
		setCurrentUser(null);
		toast.info("Logged out successfully");
	};
	const getRoleLabel = (role) => {
		switch (role) {
			case "super_admin": return "Super Admin (R H Adhoni)";
			case "assistant_admin": return "Assistant Admin (Bibi Ayesha)";
			default: return "Customer Portal Access";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl px-6 py-12 flex flex-col items-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center max-w-lg mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: "bg-primary/10 text-primary border-primary/20 py-1 px-3 mb-2 text-xs",
						children: "Role-Based Access Control"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-black text-brand-navy md:text-4xl",
						children: "Identity & Access Center"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Select a preset role profile to simulate different permission layouts and feature restrictions."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-3 w-full max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 border bg-card shadow-card flex flex-col justify-between hover:border-primary transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-primary font-bold text-sm mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Super Admin" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-black text-brand-navy",
								children: "R H Adhoni"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground mt-2 leading-relaxed",
								children: "Full system rights. Access to financials, metrics, deletion of records, and system administration."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => handleLogin("R H Adhoni", "super_admin"),
							className: "mt-6 w-full bg-primary hover:bg-brand-navy text-xs h-9",
							children: "Access as Super Admin"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 border bg-card shadow-card flex flex-col justify-between hover:border-primary transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-amber-600 font-bold text-sm mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Assistant Admin" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-black text-brand-navy",
								children: "Bibi Ayesha"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground mt-2 leading-relaxed",
								children: "Restricted management rights. Read-only on financial graphs, cannot delete files or client entries."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => handleLogin("Bibi Ayesha", "assistant_admin"),
							variant: "outline",
							className: "mt-6 w-full text-xs h-9 border-amber-500/35 text-amber-700 hover:bg-amber-500/10",
							children: "Access as Assistant"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 border bg-card shadow-card flex flex-col justify-between hover:border-primary transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-slate-600 font-bold text-sm mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Customer Portal" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-black text-brand-navy",
								children: "Demo Client"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground mt-2 leading-relaxed",
								children: "No staff console permissions. Access limited to public pages and customer tracking dashboard."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => handleLogin("Demo Customer", "customer"),
							variant: "secondary",
							className: "mt-6 w-full text-xs h-9",
							children: "Access as Client"
						})]
					})
				]
			}),
			currentUser && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-10 p-4 border bg-secondary/30 flex flex-col sm:flex-row items-center gap-4 max-w-md w-full justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted-foreground",
						children: ["Currently logged in as: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-brand-navy",
							children: getRoleLabel(currentUser.role)
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: handleLogout,
					className: "text-xs h-8 text-rose-500 hover:text-rose-700 hover:bg-rose-50/50",
					children: "Sign Out"
				})]
			})
		]
	});
}
//#endregion
export { LoginPage as component };
