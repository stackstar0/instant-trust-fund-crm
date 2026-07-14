import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as CategoryPage } from "./category-page-CmwOFNty.mjs";
import { t as Route } from "./loans._slug-DD5fRDlK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/loans._slug-CPK2nq8K.js
var import_jsx_runtime = require_jsx_runtime();
function LoanDetail() {
	const { item } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryPage, { item });
}
//#endregion
export { LoanDetail as component };
