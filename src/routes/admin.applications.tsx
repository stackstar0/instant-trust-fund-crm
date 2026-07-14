import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { inr } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/applications")({
  head: () => ({ meta: [{ title: "Applications — IFY CRM" }] }),
  component: AdminApplications,
});

function AdminApplications() {
  const { customers, currentUser } = useAppStore();

  if (currentUser?.role === "assistant_admin") {
    return <Navigate to="/admin/tasks" replace />;
  }

  const recent = customers.slice(0, 20);
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-black md:text-4xl">Recent Applications</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        The latest 20 loan &amp; insurance applications.
      </p>
      <div className="mt-6 grid gap-3">
        {recent.map((c) => (
          <Card key={c.id} className="flex flex-wrap items-center justify-between gap-4 p-4">
            <div>
              <div className="text-sm font-semibold">
                {c.fullName}{" "}
                <span className="text-xs font-normal text-muted-foreground">· {c.id}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {c.productType} · {c.branch}
              </div>
            </div>
            <div className="text-sm font-semibold text-primary">{inr(c.amount)}</div>
            <Badge>{c.status}</Badge>
            <div className="text-xs text-muted-foreground">
              {new Date(c.appliedOn).toLocaleString("en-IN")}
            </div>
            <Link
              to="/admin/customers"
              className="text-xs font-semibold text-primary hover:underline"
            >
              Open →
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
