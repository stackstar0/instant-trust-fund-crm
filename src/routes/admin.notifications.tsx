import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Bell } from "lucide-react";

export const Route = createFileRoute("/admin/notifications")({
  head: () => ({ meta: [{ title: "Notifications — IFY CRM" }] }),
  component: AdminNotifications,
});

function AdminNotifications() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-brand-navy">System Notifications</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View automated alerts, reminders, and system notifications.
        </p>
      </div>

      <Card className="p-12 text-center border-dashed border-2 shadow-sm flex flex-col items-center">
        <Bell className="h-12 w-12 text-slate-300 mb-4" />
        <h3 className="text-lg font-bold text-brand-navy">No Notifications</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
          You're all caught up! System notifications will appear here.
        </p>
      </Card>
    </div>
  );
}
