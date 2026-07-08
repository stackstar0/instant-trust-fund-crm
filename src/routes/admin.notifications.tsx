import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Clock, ShieldCheck, FileText, Landmark } from "lucide-react";
import { inr } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/notifications")({
  head: () => ({ meta: [{ title: "Notifications — IFY CRM" }] }),
  component: NotificationsPage,
});

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "EMI Due": Landmark,
  "Insurance Renewal": ShieldCheck,
  "Loan Approval": Bell,
  "Pending Documents": FileText,
};

function Countdown({ iso }: { iso: string }) {
  const diff = new Date(iso).getTime() - Date.now();
  const days = Math.max(0, Math.floor(diff / (1000 * 3600 * 24)));
  const hrs = Math.max(0, Math.floor((diff % (1000 * 3600 * 24)) / (1000 * 3600)));
  return (
    <div className="flex items-center gap-2 text-xs">
      <Clock className="h-3.5 w-3.5 text-primary" />
      <span className="font-mono font-semibold text-primary">
        {days}d {hrs}h
      </span>
    </div>
  );
}

function NotificationsPage() {
  const { notifications } = useAppStore();
  const grouped = notifications.reduce<Record<string, typeof notifications>>((acc, n) => {
    (acc[n.type] ||= []).push(n);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-black md:text-4xl">Notification Center</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Upcoming events and reminders across your book.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {Object.entries(grouped).map(([type, items]) => {
          const Icon = ICONS[type] || Bell;
          return (
            <Card key={type} className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold">{type}</h3>
                <Badge className="ml-auto">{items.length}</Badge>
              </div>
              <div className="space-y-3">
                {items.map((n) => (
                  <div
                    key={n.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>
                      <div className="text-sm font-semibold">{n.customer}</div>
                      <div className="text-xs text-muted-foreground">
                        Due {new Date(n.dueDate).toLocaleDateString("en-IN")}
                        {n.amount ? ` · ${inr(n.amount)}` : ""}
                      </div>
                    </div>
                    <Countdown iso={n.dueDate} />
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
