import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

import { SmsDashboard } from "@/components/SmsDashboard";

export const Route = createFileRoute("/admin/sms")({
  head: () => ({ meta: [{ title: "SMS Gateway — IFY CRM" }] }),
  component: AdminSms,
});

function AdminSms() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <SmsDashboard />
    </div>
  );
}
