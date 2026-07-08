import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, FileText } from "lucide-react";
import { toast } from "sonner";
import { toCSV } from "./admin.customers";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({ meta: [{ title: "Reports — IFY CRM" }] }),
  component: ReportsPage,
});

function download(name: string, content: string, mime: string) {
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
      fname: "customer-report",
    },
    {
      name: "Loan Report",
      desc: "All loan applications with status distribution.",
      rows: customers.filter((c) => c.productKind === "loan").length,
      csv: () => toCSV(customers.filter((c) => c.productKind === "loan")),
      fname: "loan-report",
    },
    {
      name: "Insurance Report",
      desc: "All insurance policies with premium & renewals.",
      rows: customers.filter((c) => c.productKind === "insurance").length,
      csv: () => toCSV(customers.filter((c) => c.productKind === "insurance")),
      fname: "insurance-report",
    },
    {
      name: "SMS Report",
      desc: "300-day SMS log with delivery status.",
      rows: sms.length,
      csv: () => {
        const header = ["ID", "Customer", "Phone", "Message", "Sent At", "Status"];
        return [
          header.join(","),
          ...sms.map((s) =>
            [
              s.id,
              s.customer,
              s.phone,
              `"${s.message.replace(/"/g, '""')}"`,
              s.sentAt,
              s.status,
            ].join(","),
          ),
        ].join("\n");
      },
      fname: "sms-report",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-black md:text-4xl">Reports</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Download detailed CSV / PDF reports for operations, compliance and audit.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {reports.map((r) => (
          <Card key={r.name} className="flex flex-col p-6">
            <h3 className="text-lg font-bold">{r.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
            <div className="mt-3 inline-flex w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
              {r.rows.toLocaleString("en-IN")} records
            </div>
            <div className="mt-6 flex gap-2">
              <Button
                className="bg-primary hover:bg-brand-navy"
                onClick={() => {
                  download(`${r.fname}.csv`, r.csv(), "text/csv");
                  toast.success("Excel downloaded");
                }}
              >
                <FileSpreadsheet className="mr-2 h-4 w-4" /> Download Excel
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  download(`${r.fname}.txt`, r.csv(), "text/plain");
                  toast.success("PDF-ready report exported");
                }}
              >
                <FileText className="mr-2 h-4 w-4" /> Download PDF
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
