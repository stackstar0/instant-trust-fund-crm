import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({ meta: [{ title: "Reports — IFY CRM" }] }),
  component: AdminReports,
});

function AdminReports() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-brand-navy">Management Reports</h1>
      </div>
      <Card className="p-12 text-center border-dashed border-2 shadow-sm flex flex-col items-center">
        <FileText className="h-12 w-12 text-slate-300 mb-4" />
        <h3 className="text-lg font-bold text-brand-navy">No Reports Generated</h3>
      </Card>
    </div>
  );
}
