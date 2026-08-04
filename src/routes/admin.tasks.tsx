import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/admin/tasks")({
  head: () => ({ meta: [{ title: "Task Manager — IFY CRM" }] }),
  component: AdminTasks,
});

function AdminTasks() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-brand-navy">Task Manager</h1>
      </div>
      <Card className="p-12 text-center border-dashed border-2 shadow-sm flex flex-col items-center">
        <CheckCircle2 className="h-12 w-12 text-slate-300 mb-4" />
        <h3 className="text-lg font-bold text-brand-navy">No Pending Tasks</h3>
      </Card>
    </div>
  );
}
