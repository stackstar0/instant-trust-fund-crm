import { i as insurance } from "./catalog-BNgltH_A.mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/insurance.index-HrDLlV8y.js
var import_jsx_runtime = require_jsx_runtime();
function InsuranceIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-6 py-14",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl font-black md:text-5xl",
				children: "All Insurance Plans"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-muted-foreground",
				children: "Protect what matters most — your family, your health, your car and your business."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
			children: insurance.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
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
					className: "p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-bold",
							children: i.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: i.tagline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center justify-between text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-secondary px-3 py-1 font-semibold text-primary",
								children: i.premium
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-primary group-hover:underline",
								children: "Learn more →"
							})]
						})
					]
				})]
			}, i.slug))
		})]
	});
}
//#endregion
export { InsuranceIndex as component };
