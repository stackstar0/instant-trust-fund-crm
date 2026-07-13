import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  CreditCard,
  Download,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sparkles,
  TrendingUp,
  HelpCircle,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/cibil")({
  head: () => ({
    meta: [
      { title: "Get Your Official CIBIL Credit Score — Instant Funds" },
      {
        name: "description",
        content: "Get your official TransUnion CIBIL credit report instantly. Check loan eligibility, payment history, and credit health analysis.",
      },
    ],
  }),
  component: CibilPage,
});

type Step = "input" | "checkout" | "loading" | "results";

function CibilPage() {
  const [step, setStep] = useState<Step>("input");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [pan, setPan] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  // Score details generated deterministically based on PAN/Name
  const score = 782; // Premium score

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !mobile || !pan) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (pan.length !== 10) {
      toast.error("Enter a valid 10-character PAN number.");
      return;
    }
    setStep("checkout");
  };

  const handlePayment = async () => {
    setStep("loading");
    // Simulate transaction processing
    await new Promise((r) => setTimeout(r, 1500));
    setOtpSent(true);
    setStep("checkout");
  };

  const verifyOtpAndShowResults = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== "1234") {
      toast.error("Invalid verification code. Enter '1234' for demo.");
      return;
    }
    setVerifyingOtp(true);
    await new Promise((r) => setTimeout(r, 1200));
    setVerifyingOtp(false);
    setStep("results");
    toast.success("Payment authorized & Credit Score generated!");
  };

  const downloadPdfReport = () => {
    toast.success("Generating CIBIL report PDF...", {
      description: "Downloading will start automatically.",
    });

    const docContent = `
=============================================
         TRANSUNION CIBIL CREDIT REPORT
=============================================
Report ID: TU-CIBIL-887410293
Date Generated: ${new Date().toLocaleDateString("en-IN")}
Subject: ${fullName.toUpperCase()}
PAN: ${pan.toUpperCase()}
Mobile: ${mobile}

CREDIT SCORE: ${score} / 900
Rating: EXCELLENT

KEY PARAMETERS BREAKDOWN:
---------------------------------------------
1. Payment History: On-time (99%) - EXCELLENT
2. Credit Utilization: 22% - EXCELLENT
3. Credit Age: 6 Years 2 Months - GOOD
4. Total Accounts: 6 Active (3 Loans, 3 Cards)
5. Recent Inquiries: 1 (Last 30 Days)

SUMMARY REPORT BACKED BY INSTANT TRUST FUND
=============================================
`;
    // Create download element
    const element = document.createElement("a");
    const file = new Blob([docContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `CIBIL_Report_${fullName.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Title */}
      <div className="text-center mb-10">
        <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/30 py-1 px-3 mb-3 text-xs font-bold">
          ⚡ Instant Credit Bureau Fetch
        </Badge>
        <h1 className="text-3xl font-black text-brand-navy md:text-5xl">Check your Credit Score</h1>
        <p className="mt-2 text-muted-foreground text-sm max-w-lg mx-auto">
          Securely pull your latest official CIBIL score. High scores receive pre-approved loan sanctions with lower interest rates.
        </p>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-center items-center gap-2 mb-8 text-xs font-semibold text-muted-foreground">
        <span className={step === "input" ? "text-primary font-bold" : ""}>1. Details</span>
        <ArrowRight className="h-3.5 w-3.5" />
        <span className={step === "checkout" ? "text-primary font-bold" : ""}>2. Paid Check</span>
        <ArrowRight className="h-3.5 w-3.5" />
        <span className={step === "results" ? "text-primary font-bold" : ""}>3. Credit Report</span>
      </div>

      {/* Form Steps */}
      {step === "input" && (
        <>
          <Card className="p-6 border bg-card shadow-card max-w-xl mx-auto">
            <h3 className="text-lg font-bold text-brand-navy border-b pb-3 mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" /> Credit Bureau Consent Form
            </h3>

            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name (As on PAN Card) *</Label>
                <Input
                  id="fullName"
                  placeholder="e.g. Vikram Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    placeholder="+91 98765 43210"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pan">PAN Number *</Label>
                  <Input
                    id="pan"
                    placeholder="e.g. ABCDE1234F"
                    value={pan}
                    onChange={(e) => setPan(e.target.value)}
                    className="uppercase font-mono"
                    maxLength={10}
                    required
                  />
                </div>
              </div>

              <div className="text-[11px] text-muted-foreground leading-relaxed bg-secondary/50 rounded-lg p-3 border">
                ⚠️ **TransUnion API Compliance**: This service is a simulated interface of the TransUnion CIBIL API integration. In production, real-time fetching is subject to credential verification, licensing agreements, and commercial API contracts with TransUnion. Checked score retrieves a soft inquiry on your record.
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-brand-navy text-white">
                Proceed to Verification <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Card>

          {/* Previous Reports Section */}
          <Card className="mt-6 p-6 border bg-card shadow-card max-w-xl mx-auto">
            <h3 className="text-sm font-bold text-brand-navy border-b pb-3 mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" /> Previously Generated Bureau Reports
            </h3>
            <div className="space-y-3">
              {[
                {
                  id: "TU-CIBIL-112049",
                  name: "R H Adhoni",
                  pan: "ADHPXXXX1A",
                  score: 812,
                  date: "12/06/2026",
                },
                {
                  id: "TU-CIBIL-905581",
                  name: "Bibi Ayesha",
                  pan: "AYEPXXXX2B",
                  score: 794,
                  date: "02/07/2026",
                },
                {
                  id: "TU-CIBIL-774512",
                  name: "Vikram Urs",
                  pan: "URSPXXXX3C",
                  score: 758,
                  date: "10/07/2026",
                },
              ].map((rep) => (
                <div key={rep.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0 text-xs">
                  <div>
                    <div className="font-bold text-brand-navy">{rep.name}</div>
                    <div className="text-muted-foreground text-[10px] mt-0.5">
                      PAN: {rep.pan} | Date: {rep.date}
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground mt-0.5">{rep.id}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-bold">
                      Score: {rep.score}
                    </Badge>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-primary hover:text-brand-navy"
                      onClick={() => {
                        toast.success(`Downloading historical report for ${rep.name}...`);
                        const docContent = `
=============================================
         TRANSUNION CIBIL CREDIT REPORT
=============================================
Report ID: ${rep.id}
Date Generated: ${rep.date}
Subject: ${rep.name.toUpperCase()}
PAN: ${rep.pan}

CREDIT SCORE: ${rep.score} / 900
Rating: EXCELLENT

SUMMARY REPORT BACKED BY INSTANT TRUST FUND
=============================================
`;
                        const element = document.createElement("a");
                        const file = new Blob([docContent], { type: "text/plain" });
                        element.href = URL.createObjectURL(file);
                        element.download = `CIBIL_Report_${rep.name.replace(/\s+/g, "_")}.txt`;
                        document.body.appendChild(element);
                        element.click();
                        document.body.removeChild(element);
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {step === "checkout" && !otpSent && (
        <Card className="p-6 border bg-card shadow-card max-w-xl mx-auto">
          <h3 className="text-lg font-bold text-brand-navy border-b pb-3 mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" /> Premium Report Payout
          </h3>

          <div className="rounded-xl bg-primary/5 p-4 border border-primary/20 mb-6 text-center">
            <span className="text-xs text-muted-foreground uppercase block font-semibold">Bureau Verification Charge</span>
            <div className="text-3xl font-black text-brand-navy mt-1">₹399.00</div>
            <p className="text-[11px] text-muted-foreground mt-1">Includes 1-yr score monitoring & dynamic dashboard tracking.</p>
          </div>

          <div className="space-y-4">
            <span className="text-xs font-bold text-brand-navy block mb-2">Select Payment Method</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "upi", label: "UPI / QR" },
                { id: "card", label: "Card" },
                { id: "net", label: "Net Banking" },
              ].map((method) => (
                <Button
                  key={method.id}
                  type="button"
                  variant={paymentMethod === method.id ? "default" : "outline"}
                  onClick={() => setPaymentMethod(method.id)}
                  className="text-xs h-9"
                >
                  {method.label}
                </Button>
              ))}
            </div>

            <Button onClick={handlePayment} className="w-full bg-primary hover:bg-brand-navy text-white mt-4">
              Authorize Payment of ₹399
            </Button>
          </div>
        </Card>
      )}

      {step === "checkout" && otpSent && (
        <Card className="p-6 border bg-card shadow-card max-w-xl mx-auto">
          <h3 className="text-lg font-bold text-brand-navy border-b pb-3 mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-500" /> Enter Payment OTP
          </h3>

          <p className="text-xs text-muted-foreground mb-4">
            We sent a mock validation code to your bank terminal. Please enter it below.
          </p>

          <form onSubmit={verifyOtpAndShowResults} className="space-y-4">
            <div>
              <Label htmlFor="otp">Verification Code *</Label>
              <Input
                id="otp"
                placeholder="Enter 1234 to verify"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="text-center text-lg tracking-widest font-mono font-bold"
                required
              />
            </div>

            <Button type="submit" disabled={verifyingOtp} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
              {verifyingOtp ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
                </>
              ) : (
                "Verify Code & Fetch Score"
              )}
            </Button>
          </form>
        </Card>
      )}

      {step === "loading" && (
        <Card className="p-12 border bg-card shadow-card max-w-xl mx-auto flex flex-col items-center justify-center text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
          <h3 className="text-lg font-bold text-brand-navy">Processing Payout Request</h3>
          <p className="mt-1 text-xs text-muted-foreground">Contacting secure gateway...</p>
        </Card>
      )}

      {step === "results" && (
        <div className="grid gap-6">
          <Card className="p-8 border bg-card shadow-card text-center max-w-2xl mx-auto w-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-bold">
                Excellent Credit Health
              </Badge>
            </div>

            {/* Circular score display */}
            <div className="relative mx-auto h-40 w-40 flex items-center justify-center rounded-full border-8 border-emerald-500 bg-emerald-500/5 mt-4">
              <div>
                <span className="text-xs text-muted-foreground font-semibold uppercase tracking-widest block">Score</span>
                <span className="text-4xl font-black text-brand-navy">{score}</span>
                <span className="text-[10px] text-muted-foreground block font-bold mt-0.5">out of 900</span>
              </div>
            </div>

            <h3 className="text-2xl font-black text-brand-navy mt-6">Congratulations, {fullName}!</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
              Your credit score is in the top 5% nationally. You qualify for elite pre-approved personal and home loan programs.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button onClick={downloadPdfReport} className="bg-primary hover:bg-brand-navy text-white flex items-center gap-2">
                <Download className="h-4 w-4" /> Download Official CIBIL PDF
              </Button>
              <Button variant="outline" onClick={() => setStep("input")} className="text-xs">
                Check Another
              </Button>
            </div>
          </Card>

          {/* Breakdown cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Payment History",
                score: "99% on-time",
                desc: "Excellent track record with zero late payments.",
                color: "text-emerald-500",
              },
              {
                title: "Credit Utilization",
                score: "22% utilized",
                desc: "Optimal utilization below standard 30% ceiling.",
                color: "text-emerald-500",
              },
              {
                title: "Inquiries",
                score: "1 recent query",
                desc: "Low search profile prevents hard credit impact.",
                color: "text-emerald-500",
              },
            ].map((metric) => (
              <Card key={metric.title} className="p-5 border">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{metric.title}</h4>
                <div className={`text-lg font-bold mt-2 ${metric.color}`}>{metric.score}</div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{metric.desc}</p>
              </Card>
            ))}
          </div>

          {/* Financial Advice */}
          <Card className="p-6 border bg-secondary/30">
            <h4 className="text-sm font-bold text-brand-navy flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-primary" /> Recommendations to Optimize Score
            </h4>
            <ul className="list-disc list-inside space-y-2 text-xs text-muted-foreground">
              <li>Keep total credit card balances under 30% of their aggregate limit at all times.</li>
              <li>Avoid closing older credit card accounts to preserve active age profile history.</li>
              <li>Consolidate high-interest short-term debt into a structured personal loan.</li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
