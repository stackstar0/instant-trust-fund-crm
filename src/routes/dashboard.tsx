import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  CheckCircle2,
  FileText,
  MessageSquare,
  Clock,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Upload,
  ArrowRight,
  TrendingUp,
  User,
  Heart,
  Share2,
  DollarSign,
  Gift,
  Calculator,
  Calendar,
  ArrowUpRight,
  Link2,
  Coins,
  Copy,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Customer Portal & Application Tracking — Instant Funds" },
      {
        name: "description",
        content: "Track your loan or insurance application status, view communication logs, and upload required verification documents.",
      },
    ],
  }),
  component: CustomerDashboard,
});

function formatINR(val: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
}

function CustomerDashboard() {
  const { customers, sms, notifications } = useAppStore();
  const [phoneQuery, setPhoneQuery] = useState("");
  const [refQuery, setRefQuery] = useState("");
  const [activeClient, setActiveClient] = useState<any | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);

  // Suggest tips
  const demoSug = useMemo(() => {
    const loanCl = customers.find((c) => c.productKind === "loan");
    const insCl = customers.find((c) => c.productKind === "insurance");
    return { loanCl, insCl };
  }, [customers]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = phoneQuery.trim().replace(/\D/g, "");
    const ref = refQuery.trim().toUpperCase();

    if (!phone && !ref) {
      toast.error("Please enter a Phone Number or Reference ID.");
      return;
    }

    const matched = customers.find((c) => {
      const cPhone = c.mobile.replace(/\D/g, "");
      const phoneMatch = phone ? cPhone.includes(phone) : false;
      const refMatch = ref ? c.id.toUpperCase() === ref : false;
      return phoneMatch || refMatch;
    });

    if (matched) {
      setActiveClient(matched);
      setUploadedDocs(matched.documents || []);
      toast.success(`Access granted for ${matched.fullName}`);
    } else {
      setActiveClient(null);
      toast.error("No active application found matching credentials.");
    }
    setHasSearched(true);
  };

  const handleLogout = () => {
    setActiveClient(null);
    setHasSearched(false);
    setPhoneQuery("");
    setRefQuery("");
    setUploadedDocs([]);
  };

  const simulateDocUpload = () => {
    const docName = `Doc_${Math.floor(100 + Math.random() * 900)}.pdf`;
    setUploadedDocs((prev) => [...prev, docName]);
    toast.success(`Uploaded ${docName}`, {
      description: "Document has been appended to your application logs.",
    });
  };

  // Filter SMS and notifications matching this client
  const clientSms = useMemo(() => {
    if (!activeClient) return [];
    const clientCleanPhone = activeClient.mobile.replace(/\D/g, "");
    return sms.filter((s) => s.phone.replace(/\D/g, "").includes(clientCleanPhone));
  }, [activeClient, sms]);

  const clientNotifications = useMemo(() => {
    if (!activeClient) return [];
    return notifications.filter((n) => n.customer.toLowerCase() === activeClient.fullName.toLowerCase());
  }, [activeClient, notifications]);

  // Compute status tracker steps
  const getStatusStep = (status: string) => {
    switch (status) {
      case "Approved":
        return 3;
      case "Rejected":
        return 3;
      case "In Review":
        return 2;
      default:
        return 1;
    }
  };

  // Mock EMI Repayment Schedule
  const mockEmiSchedule = useMemo(() => {
    if (!activeClient || activeClient.productKind !== "loan") return [];
    const p = activeClient.amount;
    const rate = 8.5;
    const emi = Math.round((p * (rate/12/100) * Math.pow(1 + rate/12/100, 180)) / (Math.pow(1 + rate/12/100, 180) - 1)) || 15000;
    return [
      { installment: "1", date: "05 Jun 2026", amount: emi, principal: Math.round(emi * 0.42), interest: Math.round(emi * 0.58), status: "Paid" },
      { installment: "2", date: "05 Jul 2026", amount: emi, principal: Math.round(emi * 0.43), interest: Math.round(emi * 0.57), status: "Paid" },
      { installment: "3", date: "05 Aug 2026", amount: emi, principal: Math.round(emi * 0.44), interest: Math.round(emi * 0.56), status: "Pending" },
      { installment: "4", date: "05 Sep 2026", amount: emi, principal: Math.round(emi * 0.45), interest: Math.round(emi * 0.55), status: "Pending" },
      { installment: "5", date: "05 Oct 2026", amount: emi, principal: Math.round(emi * 0.46), interest: Math.round(emi * 0.54), status: "Pending" },
    ];
  }, [activeClient]);

  // Mock Referral Progress Tracker
  const mockReferralInfo = useMemo(() => {
    if (!activeClient) return null;
    return {
      referredCount: 3,
      convertedCount: 1,
      bonusEarned: 7500,
      referralCode: `REF-${activeClient.id}`,
      referredUsers: [
        { name: "Rahul Deshmukh", status: "Sanction Disbursed", date: "12 May 2026", reward: "₹5,000" },
        { name: "Sneha Patil", status: "KYC In Audit", date: "18 June 2026", reward: "Pending" },
        { name: "Vijay Naik", status: "Lead Captured", date: "02 July 2026", reward: "Pending" }
      ]
    };
  }, [activeClient]);

  const copyReferralLink = () => {
    if (mockReferralInfo) {
      navigator.clipboard.writeText(`https://instanttrustfund.com/apply?ref=${mockReferralInfo.referralCode}`);
      toast.success("Referral link copied to clipboard!");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {!activeClient ? (
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-brand-navy md:text-4xl">Customer Tracking Portal</h1>
            <p className="mt-2 text-muted-foreground text-sm">
              Enter your mobile number or reference code to view real-time tracking, files checklist, and advisor messages.
            </p>
          </div>

          <Card className="p-6 border bg-card shadow-card">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="phone" className="text-xs font-bold text-slate-500 uppercase">Registered Mobile Number</Label>
                  <Input
                    id="phone"
                    placeholder="e.g. 98765 43210"
                    value={phoneQuery}
                    onChange={(e) => setPhoneQuery(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="ref" className="text-xs font-bold text-slate-500 uppercase">Application Reference Code</Label>
                  <Input
                    id="ref"
                    placeholder="e.g. IFY10012"
                    value={refQuery}
                    onChange={(e) => setRefQuery(e.target.value)}
                    className="uppercase"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-brand-navy text-white font-bold">
                Track Status <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            {/* Suggestions */}
            <div className="mt-8 pt-6 border-t rounded-lg text-xs text-muted-foreground bg-slate-50 p-4 border">
              <span className="font-bold text-brand-navy block mb-2">💡 Demo Credentials to Test Portal:</span>
              <div className="grid gap-4 sm:grid-cols-2">
                {demoSug.loanCl && (
                  <div className="border bg-white p-3 rounded-lg">
                    <span className="font-semibold text-primary block mb-1">Loan Portfolio</span>
                    <div>Phone: <span className="font-mono font-bold text-foreground">{demoSug.loanCl.mobile}</span></div>
                    <div>Ref Code: <span className="font-mono font-bold text-foreground">{demoSug.loanCl.id}</span></div>
                  </div>
                )}
                {demoSug.insCl && (
                  <div className="border bg-white p-3 rounded-lg">
                    <span className="font-semibold text-primary block mb-1">Insurance Portfolio</span>
                    <div>Phone: <span className="font-mono font-bold text-foreground">{demoSug.insCl.mobile}</span></div>
                    <div>Ref Code: <span className="font-mono font-bold text-foreground">{demoSug.insCl.id}</span></div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Top Panel Glassmorphism */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/40 border border-white/20 backdrop-blur-md rounded-2xl p-6 shadow-card">
            <div>
              <span className="text-[10px] text-muted-foreground uppercase font-black">Authorized Session</span>
              <h2 className="text-2xl font-black text-brand-navy mt-0.5">{activeClient.fullName}</h2>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs text-muted-foreground">
                <span>Ref Code: <span className="font-mono font-bold text-foreground">{activeClient.id}</span></span>
                <span>Mobile: <span className="font-mono font-bold text-foreground">{activeClient.mobile}</span></span>
                <span>Branch: <span className="font-mono font-bold text-foreground">{activeClient.branch || "Bengaluru Main"}</span></span>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="w-fit font-bold border-rose-500/20 text-rose-600 hover:bg-rose-50 hover:text-rose-700">
              Disconnect Session
            </Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            {/* Left 8 Columns: Tracker, Wallet, EMI, Referrals */}
            <div className="lg:col-span-8 space-y-8">
              {/* Glassmorphic progress tracker */}
              <Card className="p-6 border bg-white/40 border-white/20 backdrop-blur-md shadow-card">
                <h3 className="text-base font-black text-brand-navy mb-6">Milestone Audit Log</h3>
                <div className="relative">
                  <div className="absolute top-4 left-4 right-4 h-1 bg-slate-200 -z-10 hidden sm:block" />

                  <div className="grid gap-6 sm:grid-cols-3 text-center sm:text-left">
                    {/* Step 1 */}
                    <div className="flex flex-col sm:items-center">
                      <div className="h-9 w-9 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm mx-auto sm:mx-0 shadow-lg">
                        ✓
                      </div>
                      <span className="text-xs font-bold text-brand-navy mt-2 block">Application Filed</span>
                      <span className="text-[10px] text-slate-500 mt-0.5">We captured your primary parameters.</span>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col sm:items-center">
                      <div className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm mx-auto sm:mx-0 shadow-lg ${
                        getStatusStep(activeClient.status) >= 2 ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
                      }`}>
                        {getStatusStep(activeClient.status) >= 2 ? "✓" : "2"}
                      </div>
                      <span className="text-xs font-bold text-brand-navy mt-2 block">Document Verification</span>
                      <span className="text-[10px] text-slate-500 mt-0.5">Verification of your deed records & KYC.</span>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col sm:items-center">
                      <div className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm mx-auto sm:mx-0 shadow-lg ${
                        activeClient.status === "Approved"
                          ? "bg-emerald-500 text-white"
                          : activeClient.status === "Rejected"
                          ? "bg-rose-500 text-white"
                          : "bg-slate-200 text-slate-500"
                      }`}>
                        {activeClient.status === "Approved" ? "✓" : activeClient.status === "Rejected" ? "✗" : "3"}
                      </div>
                      <span className="text-xs font-bold text-brand-navy mt-2 block">Final Disbursal</span>
                      <span className="text-[10px] text-slate-500 mt-0.5">
                        {activeClient.status === "Approved"
                          ? "Sanction approved!"
                          : activeClient.status === "Rejected"
                          ? "Application rejected."
                          : "Pending outcome."}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Insurance Wallet Card */}
              {activeClient.productKind === "insurance" && (
                <Card className="p-6 border bg-white/40 border-white/20 backdrop-blur-md shadow-card">
                  <h3 className="text-base font-black text-brand-navy mb-4">Your E-Policy Card</h3>
                  <div className="max-w-md mx-auto rounded-2xl bg-gradient-to-r from-royal-purple to-lic-blue p-6 text-white shadow-elevated relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 opacity-10 transform translate-y-1/4 translate-x-1/4">
                      <ShieldCheck className="h-44 w-44 text-white" />
                    </div>

                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] text-white/60 uppercase tracking-widest font-black">E-POLICY CERTIFICATE</span>
                        <h4 className="text-base font-black text-gold">{activeClient.productType}</h4>
                      </div>
                      <Badge className="bg-white/20 text-white hover:bg-white/35 font-bold text-[9px]">ACTIVE</Badge>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4 text-[11px]">
                      <div>
                        <span className="text-white/60 block uppercase font-semibold text-[9px]">Insured Person</span>
                        <span className="font-bold text-sm">{activeClient.fullName}</span>
                      </div>
                      <div>
                        <span className="text-white/60 block uppercase font-semibold text-[9px]">Coverage Sum</span>
                        <span className="font-bold text-sm">{formatINR(activeClient.amount)}</span>
                      </div>
                      <div>
                        <span className="text-white/60 block uppercase font-semibold text-[9px]">Certificate Code</span>
                        <span className="font-mono font-bold text-sm">IFY-POL-{activeClient.id}</span>
                      </div>
                      <div>
                        <span className="text-white/60 block uppercase font-semibold text-[9px]">Validity Period</span>
                        <span className="font-bold text-sm">1 Year / Auto-Renewable</span>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* EMI Repayment Schedule */}
              {activeClient.productKind === "loan" && (
                <Card className="p-6 border bg-white/40 border-white/20 backdrop-blur-md shadow-card">
                  <div className="flex items-center gap-2 mb-4">
                    <Calculator className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="text-base font-black text-brand-navy">EMI Repayment Schedule</h3>
                      <p className="text-[10px] text-slate-500">Upcoming debit schedule and principal breakup estimates.</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto border rounded-xl">
                    <table className="min-w-full text-xs text-left">
                      <thead className="bg-slate-50 border-b text-[10px] font-bold text-slate-400 uppercase">
                        <tr>
                          <th className="p-3">Inst.</th>
                          <th className="p-3">Due Date</th>
                          <th className="p-3">EMI Amount</th>
                          <th className="p-3">Principal</th>
                          <th className="p-3">Interest</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y font-semibold">
                        {mockEmiSchedule.map((row) => (
                          <tr key={row.installment} className="hover:bg-slate-50/50">
                            <td className="p-3 font-mono">{row.installment}</td>
                            <td className="p-3 flex items-center gap-1.5"><Calendar className="h-3 w-3 text-slate-400" /> {row.date}</td>
                            <td className="p-3">{formatINR(row.amount)}</td>
                            <td className="p-3 text-slate-500">{formatINR(row.principal)}</td>
                            <td className="p-3 text-slate-500">{formatINR(row.interest)}</td>
                            <td className="p-3">
                              <Badge className={
                                row.status === "Paid" 
                                  ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-bold" 
                                  : "bg-amber-500/10 text-amber-600 border-amber-500/20 font-bold"
                              }>
                                {row.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}

              {/* Referral Progress Tracker */}
              {mockReferralInfo && (
                <Card className="p-6 border bg-white/40 border-white/20 backdrop-blur-md shadow-card space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
                    <div className="flex items-center gap-2">
                      <Gift className="h-5 w-5 text-gold" />
                      <div>
                        <h3 className="text-base font-black text-brand-navy">Refer & Earn Dashboard</h3>
                        <p className="text-[10px] text-slate-500">Share your custom link and earn ₹5,000 for every sanctioned loan.</p>
                      </div>
                    </div>
                    <Button onClick={copyReferralLink} size="sm" className="bg-primary hover:bg-brand-navy flex items-center gap-1.5 h-8 font-bold text-xs">
                      <Copy className="h-3.5 w-3.5" /> Copy Code: {mockReferralInfo.referralCode}
                    </Button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="bg-white border rounded-xl p-4 text-center">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Invites Sent</span>
                      <span className="text-xl font-black text-brand-navy mt-1 block">{mockReferralInfo.referredCount}</span>
                    </div>
                    <div className="bg-white border rounded-xl p-4 text-center">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Disbursed Audits</span>
                      <span className="text-xl font-black text-emerald-600 mt-1 block">{mockReferralInfo.convertedCount}</span>
                    </div>
                    <div className="bg-white border rounded-xl p-4 text-center">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Earnings</span>
                      <span className="text-xl font-black text-primary mt-1 block">{formatINR(mockReferralInfo.bonusEarned)}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold text-brand-navy block">My Referred Invites</span>
                    {mockReferralInfo.referredUsers.map((refUser, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-xl border bg-white text-xs">
                        <div>
                          <div className="font-bold text-brand-navy">{refUser.name}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">Invited: {refUser.date}</div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="text-[9px] font-bold">{refUser.status}</Badge>
                          <div className="text-[10px] font-black text-primary mt-0.5">{refUser.reward}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Right 4 Columns: Communication logs & Upload checklists */}
            <div className="lg:col-span-4 space-y-6">
              {/* Document checklists */}
              <Card className="p-6 border bg-white/40 border-white/20 backdrop-blur-md shadow-card">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                  <h3 className="text-sm font-bold text-brand-navy">Uploaded Verification Files</h3>
                  <Button onClick={simulateDocUpload} size="sm" className="bg-primary hover:bg-brand-navy h-7 px-2 text-[10px] font-bold">
                    <Upload className="h-3 w-3 mr-1" /> Upload
                  </Button>
                </div>

                <div className="space-y-2">
                  {uploadedDocs.length === 0 ? (
                    <p className="text-[10px] text-muted-foreground text-center py-4 border border-dashed rounded-lg">No documents attached.</p>
                  ) : (
                    uploadedDocs.map((doc) => (
                      <div key={doc} className="flex items-center justify-between p-2.5 rounded-lg border bg-white hover:bg-muted/10 transition">
                        <div className="flex items-center gap-2">
                          <FileText className="h-3.5 w-3.5 text-primary" />
                          <span className="font-mono text-[10px] font-bold text-brand-navy">{doc}</span>
                        </div>
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-bold text-[9px] px-1 py-0">
                          ✓ Verified
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </Card>

              {/* Communication Dispatch Logs */}
              <Card className="p-6 border bg-white/40 border-white/20 backdrop-blur-md shadow-card">
                <h3 className="text-sm font-bold text-brand-navy border-b pb-3 mb-4 flex items-center gap-1">
                  <MessageSquare className="h-4 w-4 text-primary" /> SMS Communication Logs
                </h3>
                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                  {clientSms.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-4">No communication logs recorded.</p>
                  ) : (
                    clientSms.map((s) => (
                      <div key={s.id} className="border bg-white rounded-xl p-3 space-y-1 shadow-sm">
                        <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono">
                          <span>{s.id}</span>
                          <span>{new Date(s.sentAt).toLocaleDateString("en-IN")}</span>
                        </div>
                        <p className="text-xs font-semibold text-brand-navy leading-relaxed">
                          {s.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </Card>

              {/* Advisory Alerts */}
              <Card className="p-6 border bg-white/40 border-white/20 backdrop-blur-md shadow-card">
                <h3 className="text-sm font-bold text-brand-navy border-b pb-3 mb-4 flex items-center gap-1">
                  <Clock className="h-4 w-4 text-primary" /> Action Items
                </h3>
                <div className="space-y-3">
                  {clientNotifications.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-4">No active advisory alerts.</p>
                  ) : (
                    clientNotifications.map((n) => (
                      <div key={n.id} className="p-3 rounded-lg bg-primary/5 border border-primary/20 flex gap-2 text-xs">
                        <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-brand-navy">{n.type}</div>
                          <p className="text-slate-500 mt-0.5">
                            Due by: {new Date(n.dueDate).toLocaleDateString("en-IN")}
                            {n.amount ? ` (Amount: ${formatINR(n.amount)})` : ""}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
