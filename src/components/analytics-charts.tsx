import {
  Area,
  AreaChart,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card } from "@/components/ui/card";
import { inr } from "@/lib/mock-data";

const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

interface AnalyticsChartsProps {
  monthly: any[];
  revenue: any[];
  growth: any[];
  loanDist: any[];
  insDist: any[];
  smsData: any[];
}

export default function AnalyticsCharts({
  monthly,
  revenue,
  growth,
  loanDist,
  insDist,
  smsData,
}: AnalyticsChartsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <h3 className="text-lg font-bold">Applications per Month</h3>
        <div className="mt-4 h-64">
          <ResponsiveContainer>
            <BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip />
              <Bar dataKey="applications" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-bold">Revenue Overview</h3>
        <p className="text-xs text-muted-foreground">Projected (demo)</p>
        <div className="mt-4 h-64">
          <ResponsiveContainer>
            <AreaChart data={revenue}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
              />
              <Tooltip formatter={(v: number) => inr(v)} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-chart-1)"
                fill="url(#rev)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-bold">Most Popular Loans</h3>
        <div className="mt-4 h-72">
          <ResponsiveContainer>
            <BarChart data={loanDist} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis
                type="category"
                dataKey="name"
                stroke="var(--color-muted-foreground)"
                fontSize={11}
                width={130}
              />
              <Tooltip />
              <Bar dataKey="value" fill="var(--color-chart-1)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-bold">Most Popular Insurance</h3>
        <div className="mt-4 h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={insDist} dataKey="value" nameKey="name" outerRadius={100}>
                {insDist.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-bold">Customer Growth</h3>
        <div className="mt-4 h-64">
          <ResponsiveContainer>
            <LineChart data={growth}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="customers"
                stroke="var(--color-chart-1)"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-bold">SMS Delivery Rate</h3>
        <div className="mt-4 h-64">
          <ResponsiveContainer>
            <BarChart data={smsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar dataKey="sent" stackId="a" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="failed" stackId="a" fill="var(--color-destructive)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
