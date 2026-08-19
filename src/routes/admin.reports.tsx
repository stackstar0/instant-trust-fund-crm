import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

import { BulkImportWizard } from "@/components/BulkImportWizard";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({ meta: [{ title: "Reports — IFY CRM" }] }),
  component: AdminReports,
});

function AdminReports() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-brand-navy font-plus-jakarta">Bulk Import CRM Pipeline</h1>
        <p className="text-sm text-slate-500 mt-1">Upload and map Excel spreadsheets to insert users and loans dynamically.</p>
      </div>
      <BulkImportWizard />
    </div>
  );
}
