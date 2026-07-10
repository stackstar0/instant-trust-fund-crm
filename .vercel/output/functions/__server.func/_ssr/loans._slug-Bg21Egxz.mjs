import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as CategoryPage } from "./category-page-CnrrY74m.mjs";
import { t as Route } from "./loans._slug-Ql3ihV0v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/loans._slug-Bg21Egxz.js
var import_jsx_runtime = require_jsx_runtime();
function LoanDetail() {
	const { item } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryPage, { item });
}
//#endregion
export { LoanDetail as component };
