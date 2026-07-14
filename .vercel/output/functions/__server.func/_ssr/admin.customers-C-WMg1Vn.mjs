import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.customers-C-WMg1Vn.js
var $$splitComponentImporter = () => import("./admin.customers-DLJpZedy.mjs");
var Route = createFileRoute("/admin/customers")({
	head: () => ({ meta: [{ title: "Customers — IFY CRM" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
function toCSV(rows) {
	const header = [
		"ID",
		"Name",
		"Mobile",
		"Email",
		"Aadhaar",
		"PAN",
		"Product",
		"Kind",
		"Status",
		"Applied On",
		"Amount",
		"Branch"
	];
	const escape = (s) => `"${String(s).replace(/"/g, "\"\"")}"`;
	return [header.join(","), ...rows.map((r) => [
		r.id,
		r.fullName,
		r.mobile,
		r.email,
		r.aadhaar,
		r.pan,
		r.productType,
		r.productKind,
		r.status,
		new Date(r.appliedOn).toLocaleDateString(),
		r.amount,
		r.branch
	].map(escape).join(","))].join("\n");
}
//#endregion
export { toCSV as n, Route as t };
