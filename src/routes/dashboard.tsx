import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { fetchAPI } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "My Dashboard — IFY CRM" }] }),
  component: DashboardGuard,
});

function DashboardGuard() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div className="flex justify-center p-12">Loading secure session...</div>;
  
  if (!user || user.role !== "customer") {
    // Basic redirect if not customer
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-xl font-bold text-rose-600">Access Restricted</h2>
        <p>You must be logged in as a customer to view this page.</p>
      </div>
    );
  }

  return <CustomerDashboard />;
}

function CustomerDashboard() {
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["my-applications"],
    queryFn: () => fetchAPI("/applications/"),
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-brand-navy">Welcome back, {user?.fullName}</h1>
        <p className="text-muted-foreground mt-1 text-sm">Track your active applications and required documents here.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-2 p-6 border shadow-sm">
          <h2 className="text-lg font-bold text-brand-navy mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" /> My Applications
          </h2>

          {isLoading ? (
            <p className="text-sm text-muted-foreground animate-pulse">Loading real-time data...</p>
          ) : error ? (
            <div className="p-4 bg-rose-50 text-rose-600 rounded-md flex gap-2 text-sm">
              <AlertCircle className="h-5 w-5" />
              <p>Failed to load applications. Please try again later.</p>
            </div>
          ) : data?.applications?.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed rounded-lg bg-slate-50">
              <FileText className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <h3 className="font-semibold text-brand-navy">No active applications</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
                You haven't submitted any loan or insurance applications yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {data?.applications?.map((app: any) => (
                <div key={app._id} className="p-4 border rounded-lg flex items-start justify-between bg-white hover:border-primary transition">
                  <div>
                    <h4 className="font-bold text-brand-navy capitalize">{app.productType}</h4>
                    <p className="text-xs text-muted-foreground mt-1">Ref: {app._id}</p>
                  </div>
                  <Badge variant="outline">{app.status}</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6 border shadow-sm">
          <h2 className="text-lg font-bold text-brand-navy mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" /> Recent Activity
          </h2>
          <div className="text-center py-10 border-2 border-dashed rounded-lg bg-slate-50">
            <p className="text-xs text-muted-foreground">No recent activity logs.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
