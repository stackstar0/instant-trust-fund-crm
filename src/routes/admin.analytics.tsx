import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { lazy, Suspense } from "react";
import { monthlyApplications, distributionBy, smsWeekly } from "@/lib/mock-data";

const AnalyticsCharts = lazy(() => import("@/components/analytics-charts"));

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({ meta: [{ title: "Analytics — IFY CRM" }] }),
  component: AnalyticsPage,
});

const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

function AnalyticsPage() {
  const { customers, sms, currentUser } = useAppStore();

  if (currentUser?.role === "assistant_admin") {
    return <Navigate to="/admin/tasks" replace />;
  }

  const monthly = monthlyApplications(customers);
  const revenue = monthly.map((m) => ({ ...m, revenue: m.applications * 42000 + 800000 }));
  const growth = monthly.map((m, i) => ({ ...m, customers: 100 + i * 45 + m.applications * 3 }));
  const loanDist = distributionBy(customers, "loan").sort((a, b) => b.value - a.value);
  const insDist = distributionBy(customers, "insurance").sort((a, b) => b.value - a.value);
  const smsData = smsWeekly(sms);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-black md:text-4xl">Analytics</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Business intelligence across products, revenue and reach.
      </p>
      {/* Charts */}
      <Suspense fallback={
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card className="p-6 h-[320px] animate-pulse bg-slate-900/50 border border-slate-800 rounded-2xl" />
          <Card className="p-6 h-[320px] animate-pulse bg-slate-900/50 border border-slate-800 rounded-2xl" />
          <Card className="p-6 h-[352px] animate-pulse bg-slate-900/50 border border-slate-800 rounded-2xl" />
          <Card className="p-6 h-[352px] animate-pulse bg-slate-900/50 border border-slate-800 rounded-2xl" />
          <Card className="p-6 h-[320px] animate-pulse bg-slate-900/50 border border-slate-800 rounded-2xl" />
          <Card className="p-6 h-[320px] animate-pulse bg-slate-900/50 border border-slate-800 rounded-2xl" />
        </div>
      }>
        <div className="mt-8">
          <AnalyticsCharts
            monthly={monthly}
            revenue={revenue}
            growth={growth}
            loanDist={loanDist}
            insDist={insDist}
            smsData={smsData}
          />
        </div>
      </Suspense>
    </div>
  );
}
