import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";

export const Route = createFileRoute("/admin/referrals")({
  head: () => ({ meta: [{ title: "Referrals — IFY CRM" }] }),
  component: AdminReferrals,
});

function AdminReferrals() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-brand-navy">Referrals Dashboard</h1>
      </div>
      <Card className="p-12 text-center border-dashed border-2 shadow-sm flex flex-col items-center">
        <Users className="h-12 w-12 text-slate-300 mb-4" />
        <h3 className="text-lg font-bold text-brand-navy">No Referrals Data</h3>
      </Card>
    </div>
  );
}
