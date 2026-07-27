import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Building2 } from "lucide-react";

export const Route = createFileRoute("/properties")({
  head: () => ({ meta: [{ title: "Properties List — IFY CRM" }] }),
  component: PropertiesList,
});

function PropertiesList() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-brand-navy">Available Properties</h1>
        <p className="mt-1 text-sm text-muted-foreground">Explore our real estate portfolio.</p>
      </div>

      <Card className="p-12 text-center border-dashed border-2 shadow-sm flex flex-col items-center">
        <Building2 className="h-12 w-12 text-slate-300 mb-4" />
        <h3 className="text-lg font-bold text-brand-navy">No Properties Currently Listed</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
          Please check back later for new listings.
        </p>
      </Card>
    </div>
  );
}
