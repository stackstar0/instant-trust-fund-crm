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

  // Find a helper client to display as suggest tips
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
                  <Label htmlFor="phone">Registered Mobile Number</Label>
                  <Input
                    id="phone"
                    placeholder="e.g. 98765 43210"
                    value={phoneQuery}
                    onChange={(e) => setPhoneQuery(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="ref">Application Reference Code</Label>
                  <Input
                    id="ref"
                    placeholder="e.g. IFY10012"
                    value={refQuery}
                    onChange={(e) => setRefQuery(e.target.value)}
                    className="uppercase"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-brand-navy text-white">
                Track Status <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            {/* Sug Tips */}
            <div className="mt-8 pt-6 border-t rounded-lg text-xs text-muted-foreground bg-secondary/30 p-4 border">
              <span className="font-bold text-brand-navy block mb-2">💡 Demo Credentials to Test Portal:</span>
              <div className="grid gap-3 sm:grid-cols-2">
                {demoSug.loanCl && (
                  <div>
                    <span className="font-semibold text-primary block">Loan Application:</span>
                    <div>Phone: <span className="font-mono font-bold text-foreground">{demoSug.loanCl.mobile}</span></div>
                    <div>Ref Code: <span className="font-mono font-bold text-foreground">{demoSug.loanCl.id}</span></div>
                  </div>
                )}
                {demoSug.insCl && (
                  <div>
                    <span className="font-semibold text-primary block">Insurance Application:</span>
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
          {/* Top Panel */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-card border rounded-2xl p-6 shadow-card">
            <div>
              <span className="text-xs text-muted-foreground">Welcome back, Client</span>
              <h2 className="text-2xl font-black text-brand-navy mt-0.5">{activeClient.fullName}</h2>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-muted-foreground">
                <span>Ref: <span className="font-mono font-bold text-foreground">{activeClient.id}</span></span>
                <span>Phone: <span className="font-mono font-bold text-foreground">{activeClient.mobile}</span></span>
                <span>Email: <span className="font-mono font-bold text-foreground">{activeClient.email}</span></span>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="w-fit">
              Disconnect Portal
            </Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            {/* Left 8 Columns: Tracker & Files & Insurance */}
            <div className="lg:col-span-8 space-y-8">
              {/* Progress Tracker */}
              <Card className="p-6 border bg-card shadow-card">
                <h3 className="text-lg font-bold text-brand-navy mb-6">Application Milestone Tracker</h3>
                <div className="relative">
                  {/* Timeline bar */}
                  <div className="absolute top-4 left-4 right-4 h-1 bg-muted -z-10 hidden sm:block" />

                  <div className="grid gap-6 sm:grid-cols-3 text-center sm:text-left">
                    {/* Step 1 */}
                    <div className="flex flex-col sm:items-center">
                      <div className="h-9 w-9 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm mx-auto sm:mx-0">
                        ✓
                      </div>
                      <span className="text-sm font-bold text-brand-navy mt-2 block">Application Filed</span>
                      <span className="text-xs text-muted-foreground mt-0.5">We received your application details.</span>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col sm:items-center">
                      <div className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm mx-auto sm:mx-0 ${
                        getStatusStep(activeClient.status) >= 2 ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"
                      }`}>
                        {getStatusStep(activeClient.status) >= 2 ? "✓" : "2"}
                      </div>
                      <span className="text-sm font-bold text-brand-navy mt-2 block">Document Audit</span>
                      <span className="text-xs text-muted-foreground mt-0.5">Verification & eligibility screening.</span>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col sm:items-center">
                      <div className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm mx-auto sm:mx-0 ${
                        activeClient.status === "Approved"
                          ? "bg-emerald-500 text-white"
                          : activeClient.status === "Rejected"
                          ? "bg-rose-500 text-white"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {activeClient.status === "Approved" ? "✓" : activeClient.status === "Rejected" ? "✗" : "3"}
                      </div>
                      <span className="text-sm font-bold text-brand-navy mt-2 block">Final Decision</span>
                      <span className="text-xs text-muted-foreground mt-0.5">
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

              {/* Insurance Wallet Card (Show for insurance kinds) */}
              {activeClient.productKind === "insurance" && (
                <Card className="p-6 border bg-card shadow-card">
                  <h3 className="text-lg font-bold text-brand-navy mb-4">Your E-Policy Wallet</h3>
                  <div className="max-w-md mx-auto rounded-2xl bg-brand-gradient p-6 text-white shadow-elevated relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 opacity-15 transform translate-y-1/4 translate-x-1/4">
                      <ShieldCheck className="h-44 w-44 text-white" />
                    </div>

                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] text-white/60 uppercase tracking-widest font-bold">Insurance E-Card</span>
                        <h4 className="text-lg font-black text-accent">{activeClient.productType}</h4>
                      </div>
                      <Badge className="bg-white/20 text-white hover:bg-white/35">ACTIVE</Badge>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-white/60 block uppercase font-semibold">Policy Insured</span>
                        <span className="font-bold text-sm">{activeClient.fullName}</span>
                      </div>
                      <div>
                        <span className="text-white/60 block uppercase font-semibold">Coverage Vol</span>
                        <span className="font-bold text-sm">{formatINR(activeClient.amount)}</span>
                      </div>
                      <div>
                        <span className="text-white/60 block uppercase font-semibold">Policy Number</span>
                        <span className="font-mono font-bold text-sm">IFY-POL-{activeClient.id}</span>
                      </div>
                      <div>
                        <span className="text-white/60 block uppercase font-semibold">Validity Period</span>
                        <span className="font-bold text-sm">1 Year / Recurring</span>
                      </div>
                    </div>

                    {/* Barcode Mock */}
                    <div className="mt-6 pt-4 border-t border-white/20 flex justify-between items-center">
                      <div className="h-6 w-32 bg-white/20 rounded flex items-center justify-center text-[10px] tracking-widest font-mono">
                        ||||| | ||||| | |||
                      </div>
                      <span className="text-[9px] text-white/50">Instant Trust Fund Security</span>
                    </div>
                  </div>
                </Card>
              )}

              {/* Documents Checklist */}
              <Card className="p-6 border bg-card shadow-card">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy">Uploaded Verification Files</h3>
                    <p className="text-xs text-muted-foreground">Manage your documents required for underwriting verification.</p>
                  </div>
                  <Button onClick={simulateDocUpload} size="sm" className="bg-primary hover:bg-brand-navy flex items-center gap-1.5 h-8">
                    <Upload className="h-3.5 w-3.5" /> Upload File
                  </Button>
                </div>

                <div className="space-y-2">
                  {uploadedDocs.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-4 border border-dashed rounded-lg">No documents attached.</p>
                  ) : (
                    uploadedDocs.map((doc) => (
                      <div key={doc} className="flex items-center justify-between p-3 rounded-lg border bg-background hover:bg-muted/10 transition">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <span className="font-mono text-xs font-semibold">{doc}</span>
                        </div>
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-bold text-[10px]">
                          ✓ Verified
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </div>

            {/* Right 4 Columns: SMS Log & Notifications */}
            <div className="lg:col-span-4 space-y-6">
              {/* Alert Notifications */}
              <Card className="p-6 border bg-card shadow-card">
                <h3 className="text-sm font-bold text-brand-navy border-b pb-3 mb-4">Advisory Alerts</h3>
                <div className="space-y-3">
                  {clientNotifications.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-4">No active advisory alerts.</p>
                  ) : (
                    clientNotifications.map((n) => (
                      <div key={n.id} className="p-3 rounded-lg bg-primary/5 border border-primary/20 flex gap-2 text-xs">
                        <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-brand-navy">{n.type}</div>
                          <p className="text-muted-foreground mt-0.5">
                            Action due by: {new Date(n.dueDate).toLocaleDateString("en-IN")}
                            {n.amount ? ` (Amount: ${formatINR(n.amount)})` : ""}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>

              {/* Communication Logs */}
              <Card className="p-6 border bg-card shadow-card">
                <h3 className="text-sm font-bold text-brand-navy border-b pb-3 mb-4">SMS Updates Dispatch</h3>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                  {clientSms.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-4">No dispatch logs found.</p>
                  ) : (
                    clientSms.map((s) => (
                      <div key={s.id} className="border-b pb-3 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-mono text-muted-foreground">{s.id}</span>
                          <span className="text-muted-foreground">
                            {new Date(s.sentAt).toLocaleDateString("en-IN")}
                          </span>
                        </div>
                        <p className="text-xs text-foreground mt-1 leading-relaxed bg-muted/40 p-2.5 rounded border">
                          {s.message}
                        </p>
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
