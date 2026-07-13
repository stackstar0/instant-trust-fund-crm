import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useAppStore } from "@/lib/app-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MessageSquare, RotateCcw, Search, CheckCircle2, Clock, XCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/sms")({
  head: () => ({ meta: [{ title: "SMS Center — IFY CRM" }] }),
  component: SmsPage,
});

function SmsPage() {
  const { sms, resendSms, triggerScheduler } = useAppStore();
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      sms.filter(
        (s) => !q || s.customer.toLowerCase().includes(q.toLowerCase()) || s.phone.includes(q),
      ),
    [sms, q],
  );

  const today = new Date().toDateString();
  const weekAgo = new Date(Date.now() - 7 * 24 * 3600 * 1000);
  const monthAgo = new Date(Date.now() - 30 * 24 * 3600 * 1000);

  const todayCount = sms.filter((s) => new Date(s.sentAt).toDateString() === today).length;
  const weekCount = sms.filter((s) => new Date(s.sentAt) >= weekAgo).length;
  const monthCount = sms.filter((s) => new Date(s.sentAt) >= monthAgo).length;
  const sent = sms.filter((s) => s.status === "Sent").length;
  const failed = sms.filter((s) => s.status === "Failed").length;
  const deliveryRate = ((sent / sms.length) * 100).toFixed(1);

  const StatusIcon = ({ s }: { s: string }) =>
    s === "Sent" ? (
      <CheckCircle2 className="h-3.5 w-3.5" />
    ) : s === "Scheduled" ? (
      <Clock className="h-3.5 w-3.5" />
    ) : (
      <XCircle className="h-3.5 w-3.5" />
    );
  const badgeCls = (s: string) =>
    s === "Sent"
      ? "bg-primary/10 text-primary border border-primary/30"
      : s === "Scheduled"
        ? "bg-accent/30 text-brand-navy border border-accent/50"
        : "bg-destructive/10 text-destructive border border-destructive/30";

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div>
        <h1 className="text-3xl font-black md:text-4xl">SMS Automation Center</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Scheduled reminders, campaigns, and delivery logs (demo).
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { l: "Today", v: todayCount },
          { l: "This Week", v: weekCount },
          { l: "This Month", v: monthCount },
          { l: "Delivery Rate", v: deliveryRate + "%" },
          { l: "Failed", v: failed },
        ].map((x) => (
          <Card key={x.l} className="p-5">
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {x.l}
            </div>
            <div className="mt-2 text-2xl font-black text-primary">{x.v}</div>
          </Card>
        ))}
      </div>

      <Card className="mt-6 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[240px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by customer or phone..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => {
              const { sent, failed } = triggerScheduler();
              if (sent === 0 && failed === 0) {
                toast.info("No pending scheduled SMS messages found today.");
              } else {
                toast.success("SMS Scheduler completed!", {
                  description: `Dispatched: ${sent} delivered, ${failed} failed.`,
                });
              }
            }}
            className="bg-primary/5 hover:bg-primary/10 border-primary/20 text-primary flex items-center gap-1.5"
          >
            <RotateCcw className="h-4 w-4" /> Run Daily Scheduler
          </Button>
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" /> New Campaign
          </Button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Sent Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.slice(0, 60).map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.customer}</TableCell>
                  <TableCell className="font-mono text-xs">{s.phone}</TableCell>
                  <TableCell className="max-w-xs text-xs text-muted-foreground">
                    {s.message}
                  </TableCell>
                  <TableCell className="text-xs">
                    {new Date(s.sentAt).toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${badgeCls(s.status)} inline-flex items-center gap-1`}>
                      <StatusIcon s={s.status} />
                      {s.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={s.status === "Sent"}
                      onClick={() => {
                        resendSms(s.id);
                        toast.success("SMS re-sent");
                      }}
                    >
                      <RotateCcw className="mr-1 h-3.5 w-3.5" /> Retry
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
