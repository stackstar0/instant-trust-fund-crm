import { j as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as findLoan } from "./catalog-Sb1FjQGD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/loans._slug-Ql3ihV0v.js
var $$splitErrorComponentImporter = () => import("./loans._slug-C6Y2_69k.mjs");
var $$splitNotFoundComponentImporter = () => import("./loans._slug-CSwxuNC_.mjs");
var $$splitComponentImporter = () => import("./loans._slug-Bg21Egxz.mjs");
var Route = createFileRoute("/loans/$slug")({
	head: ({ params }) => {
		const item = params ? findLoan(params.slug) : void 0;
		return { meta: [
			{ title: item ? `${item.name} — Instant Funds for You` : "Loan — Instant Funds for You" },
			{
				name: "description",
				content: item?.description ?? "Loan product details and application."
			},
			...item ? [{
				property: "og:image",
				content: item.image
			}] : []
		] };
	},
	loader: ({ params }) => {
		const item = findLoan(params.slug);
		if (!item) throw notFound();
		return { item };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
//#endregion
export { Route as t };
