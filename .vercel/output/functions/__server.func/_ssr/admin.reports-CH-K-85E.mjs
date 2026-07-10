import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as useAppStore } from "./app-store-DvCWVi7f.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { D as FileText, O as FileSpreadsheet } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as toCSV } from "./admin.customers-DzyIVou5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.reports-CH-K-85E.js
var import_jsx_runtime = require_jsx_runtime();
function download(name, content, mime) {
	const blob = new Blob([content], { type: mime });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = name;
	a.click();
	URL.revokeObjectURL(url);
}
function ReportsPage() {
	const { customers, sms } = useAppStore();
	const reports = [
		{
			name: "Customer Report",
			desc: "Full customer roster with product, status and amount.",
			rows: customers.length,
			csv: () => toCSV(customers),
			fname: "customer-report"
		},
		{
			name: "Loan Report",
			desc: "All loan applications with status distribution.",
			rows: customers.filter((c) => c.productKind === "loan").length,
			csv: () => toCSV(customers.filter((c) => c.productKind === "loan")),
			fname: "loan-report"
		},
		{
			name: "Insurance Report",
			desc: "All insurance policies with premium & renewals.",
			rows: customers.filter((c) => c.productKind === "insurance").length,
			csv: () => toCSV(customers.filter((c) => c.productKind === "insurance")),
			fname: "insurance-report"
		},
		{
			name: "SMS Report",
			desc: "300-day SMS log with delivery status.",
			rows: sms.length,
			csv: () => {
				return [[
					"ID",
					"Customer",
					"Phone",
					"Message",
					"Sent At",
					"Status"
				].join(","), ...sms.map((s) => [
					s.id,
					s.customer,
					s.phone,
					`"${s.message.replace(/"/g, "\"\"")}"`,
					s.sentAt,
					s.status
				].join(","))].join("\n");
			},
			fname: "sms-report"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-6 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-black md:text-4xl",
				children: "Reports"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Download detailed CSV / PDF reports for operations, compliance and audit."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-5 md:grid-cols-2",
				children: reports.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-col p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold",
							children: r.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: r.desc
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 inline-flex w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary",
							children: [r.rows.toLocaleString("en-IN"), " records"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "bg-primary hover:bg-brand-navy",
								onClick: () => {
									download(`${r.fname}.csv`, r.csv(), "text/csv");
									toast.success("Excel downloaded");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "mr-2 h-4 w-4" }), " Download Excel"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								onClick: () => {
									download(`${r.fname}.txt`, r.csv(), "text/plain");
									toast.success("PDF-ready report exported");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mr-2 h-4 w-4" }), " Download PDF"]
							})]
						})
					]
				}, r.name))
			})
		]
	});
}
//#endregion
export { ReportsPage as component };
