import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";

export const Route = createFileRoute("/admin/customers")({
  head: () => ({ meta: [{ title: "Customer Database — IFY CRM" }] }),
  component: AdminCustomers,
});

function AdminCustomers() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-brand-navy">Customer Database</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage all registered customers and their KYC profiles.
        </p>
      </div>

      <Card className="p-12 text-center border-dashed border-2 shadow-sm flex flex-col items-center">
        <Users className="h-12 w-12 text-slate-300 mb-4" />
        <h3 className="text-lg font-bold text-brand-navy">No Customers Found</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
          The customer database is currently empty. New user registrations will appear here.
        </p>
      </Card>
    </div>
  );
}
