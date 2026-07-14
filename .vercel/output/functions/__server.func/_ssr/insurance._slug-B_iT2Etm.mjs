import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Route } from "./insurance._slug-K1Q8OobP.mjs";
import { t as CategoryPage } from "./category-page-CmwOFNty.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/insurance._slug-B_iT2Etm.js
var import_jsx_runtime = require_jsx_runtime();
function InsuranceDetail() {
	const { item } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryPage, { item });
}
//#endregion
export { InsuranceDetail as component };
