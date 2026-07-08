import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Landmark,
  ShieldCheck,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { monthlyApplications, distributionBy, smsWeekly, inr } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Dashboard — IFY CRM" }] }),
  component: AdminDashboard,
});

const CHART_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-brand-navy)",
  "var(--color-sbi)",
];

function StatCard({
  title,
  value,
  sub,
  Icon,
  tone = "primary",
}: {
  title: string;
  value: string;
  sub?: string;
  Icon: React.ComponentType<{ className?: string }>;
  tone?: "primary" | "accent" | "warn";
}) {
  const toneCls =
    tone === "accent"
      ? "bg-accent/20 text-brand-navy"
      : tone === "warn"
        ? "bg-destructive/10 text-destructive"
        : "bg-primary/10 text-primary";
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </div>
          <div className="mt-2 text-2xl font-black">{value}</div>
          {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
        </div>
        <div className={`rounded-xl p-2.5 ${toneCls}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}

function AdminDashboard() {
  const { customers, sms, notifications } = useAppStore();
  const totalLoans = customers.filter((c) => c.productKind === "loan").length;
  const totalIns = customers.filter((c) => c.productKind === "insurance").length;
  const pending = customers.filter((c) => c.status === "Pending").length;
  const approved = customers.filter((c) => c.status === "Approved").length;
  const rejected = customers.filter((c) => c.status === "Rejected").length;
  const today = new Date().toDateString();
  const smsToday = sms.filter((s) => new Date(s.sentAt).toDateString() === today).length;
  const smsFailed = sms.filter((s) => s.status === "Failed").length;
  const renewals = notifications.filter((n) => n.type === "Insurance Renewal").length;
  const totalDisbursed = customers
    .filter((c) => c.productKind === "loan" && c.status === "Approved")
    .reduce((s, c) => s + c.amount, 0);

  const monthly = monthlyApplications(customers);
  const loanDist = distributionBy(customers, "loan");
  const insDist = distributionBy(customers, "insurance");
  const smsChart = smsWeekly(sms);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black md:text-4xl">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Real-time overview of your CRM (demo data).
          </p>
        </div>
        <Badge className="bg-accent text-accent-foreground">Live · Demo Mode</Badge>
      </div>

      {/* Stat grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Customers"
          value={customers.length.toLocaleString("en-IN")}
          Icon={Users}
        />
        <StatCard
          title="Total Loans"
          value={totalLoans.toString()}
          sub={`${inr(totalDisbursed)} disbursed`}
          Icon={Landmark}
        />
        <StatCard title="Insurance Policies" value={totalIns.toString()} Icon={ShieldCheck} />
        <StatCard
          title="Pending Applications"
          value={pending.toString()}
          Icon={Clock}
          tone="accent"
        />
        <StatCard title="Approved" value={approved.toString()} Icon={CheckCircle2} />
        <StatCard title="Rejected" value={rejected.toString()} Icon={XCircle} tone="warn" />
        <StatCard title="SMS Sent Today" value={smsToday.toString()} Icon={MessageSquare} />
        <StatCard
          title="Failed SMS"
          value={smsFailed.toString()}
          Icon={AlertTriangle}
          tone="warn"
        />
        <StatCard
          title="Renewals This Month"
          value={renewals.toString()}
          Icon={RefreshCw}
          tone="accent"
        />
      </div>

      {/* Charts */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-bold">Monthly Applications</h3>
          <p className="text-xs text-muted-foreground">Trailing 6 months</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <BarChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid var(--color-border)" }}
                />
                <Bar dataKey="applications" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold">SMS Delivery — Last 7 days</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <LineChart data={smsChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sent"
                  stroke="var(--color-chart-1)"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="failed"
                  stroke="var(--color-destructive)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold">Loan Distribution</h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={loanDist}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label={(e) => (e as { name: string }).name}
                >
                  {loanDist.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold">Insurance Distribution</h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={insDist}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label={(e) => (e as { name: string }).name}
                >
                  {insDist.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
