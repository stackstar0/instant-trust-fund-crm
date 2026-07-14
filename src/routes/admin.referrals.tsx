import { useState, useMemo } from "react";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Users,
  TrendingUp,
  Percent,
  Search,
  CheckCircle2,
  AlertCircle,
  FileSignature,
  Award,
} from "lucide-react";

export const Route = createFileRoute("/admin/referrals")({
  head: () => ({ meta: [{ title: "Referrals Manager — IFY CRM" }] }),
  component: ReferralsPage,
});

function formatINR(val: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
}

function ReferralsPage() {
  const { customers, currentUser } = useAppStore();

  if (currentUser?.role === "assistant_admin") {
    return <Navigate to="/admin/tasks" replace />;
  }

  const [search, setSearch] = useState("");

  // Filter out customers that have a referral code
  const referrals = useMemo(() => {
    return customers.filter((c) => !!c.referralCode);
  }, [customers]);

  // Aggregate stats
  const stats = useMemo(() => {
    const total = referrals.length;
    const approved = referrals.filter((c) => c.status === "Approved").length;
    const pending = referrals.filter((c) => c.status === "Pending" || c.status === "In Review").length;
    const totalVolume = referrals
      .filter((c) => c.status === "Approved")
      .reduce((sum, c) => sum + (c.amount || 0), 0);
    const estCommission = totalVolume * 0.01; // 1% payouts/revenue
    const conversionRate = total > 0 ? Math.round((approved / total) * 100) : 0;

    return { total, approved, pending, totalVolume, estCommission, conversionRate };
  }, [referrals]);

  // Aggregate stats by individual referral codes
  const codeLeaderboard = useMemo(() => {
    const map: Record<string, { code: string; total: number; approved: number; volume: number }> = {};
    
    referrals.forEach((r) => {
      const code = r.referralCode!.toUpperCase();
      if (!map[code]) {
        map[code] = { code, total: 0, approved: 0, volume: 0 };
      }
      map[code].total += 1;
      if (r.status === "Approved") {
        map[code].approved += 1;
        map[code].volume += r.amount || 0;
      }
    });

    return Object.values(map).sort((a, b) => b.volume - a.volume);
  }, [referrals]);

  // Filtered referrals list for display
  const filteredReferrals = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return referrals;
    return referrals.filter(
      (r) =>
        r.fullName.toLowerCase().includes(q) ||
        r.referralCode!.toLowerCase().includes(q) ||
        r.productType.toLowerCase().includes(q)
    );
  }, [referrals, search]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "Rejected":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
      case "In Review":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      default:
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black md:text-4xl text-brand-navy">Referrals & Affiliates</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track referred applications, affiliate revenue shares, and partner conversion statistics.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 border bg-card shadow-card">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Referred Leads</span>
              <span className="text-2xl font-black text-brand-navy">{stats.total}</span>
              <span className="text-[10px] text-muted-foreground block mt-0.5">{stats.pending} pending review</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 border bg-card shadow-card">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Approved Cases</span>
              <span className="text-2xl font-black text-brand-navy">{stats.approved}</span>
              <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">{stats.conversionRate}% conversion rate</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 border bg-card shadow-card">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-600">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Converted Volume</span>
              <span className="text-2xl font-black text-brand-navy">{formatINR(stats.totalVolume)}</span>
              <span className="text-[10px] text-muted-foreground block mt-0.5">Approved loan & insurance book</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 border bg-card shadow-card">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-amber-500/10 p-3 text-amber-600">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Affiliate Revenue (1%)</span>
              <span className="text-2xl font-black text-brand-navy">{formatINR(stats.estCommission)}</span>
              <span className="text-[10px] text-muted-foreground block mt-0.5">Commission payouts accrued</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Left 2 Columns: Leads List */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 border bg-card shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h3 className="text-lg font-bold text-brand-navy">Referred Applications Log</h3>
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search code or applicant..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/30">
                    <th className="py-3 px-4">Applicant</th>
                    <th className="py-3 px-4">Product / Vol</th>
                    <th className="py-3 px-4">Referral Code</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredReferrals.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted-foreground">
                        No matching referred applications found.
                      </td>
                    </tr>
                  ) : (
                    filteredReferrals.map((r) => (
                      <tr key={r.id} className="hover:bg-muted/10 transition">
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-foreground">{r.fullName}</div>
                          <div className="text-[11px] text-muted-foreground">{r.mobile}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-foreground">{r.productType}</div>
                          <div className="text-xs text-muted-foreground">{formatINR(r.amount)}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <Badge variant="outline" className="font-mono bg-primary/5 text-primary border-primary/25">
                            {r.referralCode}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-4">
                          <Badge variant="outline" className={getStatusColor(r.status)}>
                            {r.status}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-muted-foreground">
                          {new Date(r.appliedOn).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right 1 Column: Leaderboard */}
        <div className="space-y-6">
          <Card className="p-6 border bg-card shadow-card">
            <h3 className="text-lg font-bold text-brand-navy mb-4">Referral Code Leaderboard</h3>
            <p className="text-xs text-muted-foreground mb-6">
              Performance by referral code based on approved business volume.
            </p>

            <div className="space-y-4">
              {codeLeaderboard.length === 0 ? (
                <p className="text-xs text-muted-foreground py-4 text-center">No code statistics yet.</p>
              ) : (
                codeLeaderboard.map((item, index) => (
                  <div
                    key={item.code}
                    className="flex items-center justify-between p-3 rounded-xl border bg-background hover:bg-muted/10 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-mono font-bold text-sm text-brand-navy">{item.code}</div>
                        <div className="text-[10px] text-muted-foreground">
                          {item.approved} / {item.total} approved leads
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm text-foreground">{formatINR(item.volume)}</div>
                      <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest">
                        {formatINR(item.volume * 0.01)} share
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card className="p-6 border bg-card shadow-card bg-brand-navy text-white relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-1/4 translate-x-1/4">
              <Award className="h-40 w-40 text-white" />
            </div>
            <h4 className="text-base font-bold text-accent">Affiliate Program Details</h4>
            <p className="mt-2 text-xs text-white/80 leading-relaxed">
              Affiliates receive a flat 1% revenue share on all successful (Approved) loan volumes referred via their codes. Payouts are generated on the 5th of every month.
            </p>
            <ul className="mt-4 space-y-2 text-[11px] text-white/90">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent" /> Custom commission for premium partners
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent" /> Live conversion tracking and analytics
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
