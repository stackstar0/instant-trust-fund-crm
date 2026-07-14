import { n as findInsurance } from "./catalog-BNgltH_A.mjs";
import { N as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/insurance._slug-K1Q8OobP.js
var $$splitErrorComponentImporter = () => import("./insurance._slug-DSaiq90k.mjs");
var $$splitNotFoundComponentImporter = () => import("./insurance._slug-D9UGz4rD.mjs");
var $$splitComponentImporter = () => import("./insurance._slug-B_iT2Etm.mjs");
var Route = createFileRoute("/insurance/$slug")({
	head: ({ params }) => {
		const item = params ? findInsurance(params.slug) : void 0;
		return { meta: [
			{ title: item ? `${item.name} — Instant Funds for You` : "Insurance — Instant Funds for You" },
			{
				name: "description",
				content: item?.description ?? "Insurance plan details."
			},
			...item ? [{
				property: "og:image",
				content: item.image
			}] : []
		] };
	},
	loader: ({ params }) => {
		const item = findInsurance(params.slug);
		if (!item) throw notFound();
		return { item };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
//#endregion
export { Route as t };
