import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "@/lib/api";

export const Route = createFileRoute("/admin/applications")({
  head: () => ({ meta: [{ title: "Applications Manager — IFY CRM" }] }),
  component: AdminApplications,
});

function AdminApplications() {
  const { data, isLoading } = useQuery({
    queryKey: ["all-applications-list"],
    queryFn: () => fetchAPI("/applications/"),
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-brand-navy">Applications Manager</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review, approve, and reject loan and insurance applications.
        </p>
      </div>

      {isLoading ? (
        <Card className="p-12 text-center animate-pulse">Loading live data...</Card>
      ) : data?.applications?.length === 0 ? (
        <Card className="p-12 text-center border-dashed border-2 shadow-sm flex flex-col items-center">
          <FileText className="h-12 w-12 text-slate-300 mb-4" />
          <h3 className="text-lg font-bold text-brand-navy">No Applications Found</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            The database is currently empty. New submissions will populate here.
          </p>
        </Card>
      ) : (
        <Card className="p-6 border shadow-sm">
           <div className="space-y-4">
              {data?.applications?.map((app: any) => (
                <div key={app._id} className="p-4 border rounded-lg flex items-start justify-between bg-white hover:border-primary transition">
                  <div>
                    <h4 className="font-bold text-brand-navy">{app.fullName}</h4>
                    <p className="text-xs text-muted-foreground mt-1">Ref: {app._id} | {app.productKind} - {app.productType}</p>
                  </div>
                  <div className="font-semibold text-primary">{app.status}</div>
                </div>
              ))}
            </div>
        </Card>
      )}
    </div>
  );
}
