import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  CheckCircle2,
  Clock,
  Plus,
  User,
  AlertCircle,
  Calendar,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/tasks")({
  head: () => ({ meta: [{ title: "CRM Tasks Manager — IFY CRM" }] }),
  component: TasksPage,
});

interface TaskItem {
  id: string;
  title: string;
  desc: string;
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "Completed";
  assignedTo: string; // "R H Adhoni" | "Bibi Ayesha"
  dueDate: string;
}

const initialTasks: TaskItem[] = [
  {
    id: "TSK-101",
    title: "Verify survey record 142/3A",
    desc: "Cross check boundary markings with Bhoomi record for Manjunath Gowda's farm loan application.",
    priority: "High",
    status: "Pending",
    assignedTo: "Bibi Ayesha",
    dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
  },
  {
    id: "TSK-102",
    title: "Review Gold loan replacement mapping",
    desc: "Align updated SBA/LIC loans mapping rules in the age calculation components.",
    priority: "Medium",
    status: "Completed",
    assignedTo: "R H Adhoni",
    dueDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
  },
  {
    id: "TSK-103",
    title: "Follow up on pending Aadhaar upload",
    desc: "Contact customer Vikram Sharma (+91 99002 88471) regarding missing signature on form page 3.",
    priority: "High",
    status: "Pending",
    assignedTo: "Bibi Ayesha",
    dueDate: new Date(Date.now() + 172800000).toISOString(),
  },
  {
    id: "TSK-104",
    title: "Audit monthly affiliate payouts",
    desc: "Compile conversions list for REF-101 and ADHONI-20 codes to authorize payouts.",
    priority: "High",
    status: "Pending",
    assignedTo: "R H Adhoni",
    dueDate: new Date(Date.now() + 259200000).toISOString(),
  },
  {
    id: "TSK-105",
    title: "Verify property deed 77/9 dispute status",
    desc: "Contact Bantwal sub-registrar office regarding the Kabaka village property status.",
    priority: "Low",
    status: "Pending",
    assignedTo: "Bibi Ayesha",
    dueDate: new Date(Date.now() + 432000000).toISOString(),
  },
];

function TasksPage() {
  const { currentUser } = useAppStore();
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  
  // Form states
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPriority, setNewPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [newAssignee, setNewAssignee] = useState("Bibi Ayesha");
  const [showAddForm, setShowAddForm] = useState(false);

  // Filter states
  const [statusFilter, setStatusFilter] = useState<"All" | "Pending" | "Completed">("Pending");
  const [assigneeFilter, setAssigneeFilter] = useState<"All" | "Mine">("All");

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    const newTask: TaskItem = {
      id: `TSK-${Math.floor(106 + Math.random() * 900)}`,
      title: newTitle,
      desc: newDesc,
      priority: newPriority,
      status: "Pending",
      assignedTo: newAssignee,
      dueDate: new Date(Date.now() + 172800000).toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
    toast.success(`Task ${newTask.id} created successfully!`);
    
    // Reset Form
    setNewTitle("");
    setNewDesc("");
    setNewPriority("Medium");
    setNewAssignee("Bibi Ayesha");
    setShowAddForm(false);
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === "Pending" ? "Completed" : "Pending";
          toast.success(`Task status updated to ${nextStatus}`);
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const handleToggleAssignee = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextAssignee = t.assignedTo === "R H Adhoni" ? "Bibi Ayesha" : "R H Adhoni";
          toast.info(`Task reassigned to ${nextAssignee}`);
          return { ...t, assignedTo: nextAssignee };
        }
        return t;
      })
    );
  };

  // Filtered list
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (statusFilter !== "All" && t.status !== statusFilter) return false;
      if (assigneeFilter === "Mine") {
        return t.assignedTo.toLowerCase() === currentUser?.name?.toLowerCase();
      }
      return true;
    });
  }, [tasks, statusFilter, assigneeFilter, currentUser]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-rose-500/10 text-rose-600 border-rose-500/20";
      case "Medium":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      default:
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black md:text-4xl text-brand-navy">Task Board</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track daily checklists, assign operations, and resolve verification tickets.
          </p>
        </div>
        {currentUser?.role !== "assistant_admin" && (
          <Button
            onClick={() => setShowAddForm((v) => !v)}
            className="bg-primary hover:bg-brand-navy text-white flex items-center gap-1.5 self-start sm:self-auto h-9 text-xs"
          >
            <Plus className="h-4 w-4" /> {showAddForm ? "Hide Form" : "Create Task"}
          </Button>
        )}
      </div>

      {/* Task Creation Form */}
      {showAddForm && (
        <Card className="mt-6 p-6 border bg-card shadow-card max-w-xl animate-in fade-in slide-in-from-top-4">
          <h3 className="text-base font-bold text-brand-navy mb-4">New CRM Task</h3>
          <form onSubmit={handleCreateTask} className="space-y-4">
            <div>
              <Label htmlFor="taskTitle">Task Name *</Label>
              <Input
                id="taskTitle"
                placeholder="e.g. Audit documents for IFY1004"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="taskDesc">Description / Context</Label>
              <Input
                id="taskDesc"
                placeholder="Add background notes..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="taskPriority">Priority</Label>
                <select
                  id="taskPriority"
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as any)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <Label htmlFor="taskAssignee">Assignee</Label>
                <select
                  id="taskAssignee"
                  value={newAssignee}
                  onChange={(e) => setNewAssignee(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="Bibi Ayesha">Bibi Ayesha (Assistant)</option>
                  <option value="R H Adhoni">R H Adhoni (Super Admin)</option>
                </select>
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-brand-navy">
              Add Task to Board
            </Button>
          </form>
        </Card>
      )}

      {/* Filter Toolbar */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b pb-4">
        {/* Left: filters */}
        <div className="flex flex-wrap items-center gap-2">
          {["Pending", "Completed", "All"].map((f) => (
            <Button
              key={f}
              variant={statusFilter === f ? "default" : "outline"}
              onClick={() => setStatusFilter(f as any)}
              className="text-xs h-8 px-3"
            >
              {f} Tasks
            </Button>
          ))}
        </div>

        {/* Right: assignee scope */}
        <div className="flex items-center gap-2 text-xs">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground mr-1">Assignee Scope:</span>
          <Button
            variant={assigneeFilter === "All" ? "secondary" : "outline"}
            onClick={() => setAssigneeFilter("All")}
            className="text-xs h-8 px-2.5"
          >
            All Staff
          </Button>
          <Button
            variant={assigneeFilter === "Mine" ? "secondary" : "outline"}
            onClick={() => setAssigneeFilter("Mine")}
            className="text-xs h-8 px-2.5"
          >
            Assigned to Me
          </Button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="mt-6 space-y-4">
        {filteredTasks.length === 0 ? (
          <Card className="p-8 text-center border border-dashed bg-muted/20">
            <CheckCircle2 className="h-12 w-12 text-muted-foreground opacity-40 mx-auto mb-2" />
            <h3 className="font-bold text-brand-navy">Task Board Clear</h3>
            <p className="text-xs text-muted-foreground">No tasks matching the selected filters.</p>
          </Card>
        ) : (
          filteredTasks.map((t) => (
            <Card
              key={t.id}
              className={`p-5 border bg-card shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4 transition hover:shadow-md ${
                t.status === "Completed" ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Complete checkbox button */}
                <button
                  onClick={() => handleToggleComplete(t.id)}
                  className={`mt-0.5 h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
                    t.status === "Completed"
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : "border-muted-foreground/30 hover:border-primary"
                  }`}
                  aria-label="Toggle Complete"
                >
                  {t.status === "Completed" && <CheckCircle2 className="h-4 w-4" />}
                </button>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-muted-foreground">{t.id}</span>
                    <h3 className={`text-base font-bold text-brand-navy ${
                      t.status === "Completed" ? "line-through text-muted-foreground" : ""
                    }`}>
                      {t.title}
                    </h3>
                    <Badge variant="outline" className={`text-[9px] font-bold ${getPriorityColor(t.priority)}`}>
                      {t.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">{t.desc}</p>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground pt-1.5">
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" /> Assigned to:{" "}
                      {currentUser?.role === "super_admin" ? (
                        <span
                          onClick={() => handleToggleAssignee(t.id)}
                          className="font-bold text-primary cursor-pointer hover:underline"
                          title="Click to toggle assign"
                        >
                          {t.assignedTo}
                        </span>
                      ) : (
                        <span className="font-bold text-muted-foreground">
                          {t.assignedTo}
                        </span>
                      )}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> Due:{" "}
                      <span className="font-semibold text-foreground">
                        {new Date(t.dueDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-auto">
                <Button
                  size="sm"
                  variant={t.status === "Completed" ? "outline" : "default"}
                  className="text-xs h-8 font-semibold"
                  onClick={() => handleToggleComplete(t.id)}
                >
                  {t.status === "Completed" ? "Mark Pending" : "Resolve Task"}
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
