import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({ meta: [{ title: "Analytics — IFY CRM" }] }),
  component: AdminAnalytics,
});

function AdminAnalytics() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-brand-navy">Analytics Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Live analytics and reporting module.
        </p>
      </div>

      <Card className="p-12 text-center border-dashed border-2 shadow-sm flex flex-col items-center">
        <BarChart3 className="h-12 w-12 text-slate-300 mb-4" />
        <h3 className="text-lg font-bold text-brand-navy">No Data Available</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
          The database is currently empty. Advanced analytics and performance charts will be populated here once customer applications are submitted.
        </p>
      </Card>
    </div>
  );
}
