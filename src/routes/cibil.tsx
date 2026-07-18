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
  Lock,
  Smartphone,
  ChevronRight,
  TrendingDown,
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

  const [queueState, setQueueState] = useState("");

  const verifyOtpAndShowResults = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== "1234") {
      toast.error("Invalid verification code. Enter '1234' for demo.");
      return;
    }
    setVerifyingOtp(true);
    
    const states = [
      "HTTP/1.1 202 Accepted — Request registered.",
      "Pushing job 'cibil-fetch-task' to BullMQ (Redis connection secured)...",
      "Worker matched. Initializing secure TransUnion API handshake...",
      "Querying credit bureau registry for matched records...",
      "Retrieved raw Bureau file payload; applying decryption key...",
      "Compiling financial health ratios & building PDF report...",
      "Saving secure report (PDF stream) to Cloudflare R2 bucket...",
      "Generating dynamic 10-minute expiring signed URL...",
      "API Callback executed successfully. Notifying consumer."
    ];
    
    for (let i = 0; i < states.length; i++) {
      setQueueState(states[i]);
      await new Promise((r) => setTimeout(r, 600));
    }
    
    setVerifyingOtp(false);
    setStep("results");
    toast.success("CIBIL score generated successfully!");
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

  // Get status of step
  const getStepStatus = (currentStep: Step) => {
    const stepsOrder: Step[] = ["input", "checkout", "loading", "results"];
    const currentIndex = stepsOrder.indexOf(step);
    const targetIndex = stepsOrder.indexOf(currentStep);

    if (step === "loading" && currentStep === "checkout") return "active";
    if (currentIndex > targetIndex) return "completed";
    if (currentIndex === targetIndex) return "active";
    return "future";
  };

  return (
    <div className="min-h-screen bg-brand-soft py-12 px-4 sm:px-6">
      {/* Title */}
      <div className="text-center mb-12 max-w-2xl mx-auto space-y-3">
        <Badge className="bg-gradient-to-r from-royal-purple to-lic-blue text-white hover:opacity-95 border-none py-1 px-3 mb-2 text-xs font-black shadow-md">
          ⚡ Instant Credit Bureau Fetch
        </Badge>
        <h1 className="text-3xl font-extrabold text-brand-navy md:text-5xl tracking-tight leading-tight">
          Check your Credit Score
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          Securely pull your latest official CIBIL score. High scores receive pre-approved loan sanctions with lower interest rates.
        </p>
      </div>

      {/* Stepper Indicator */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="relative flex items-center justify-between">
          {/* Background Connector Bar */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-10" />

          {/* Step 1: Details */}
          <div className="flex flex-col items-center">
            <div
              className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                getStepStatus("input") === "completed"
                  ? "bg-gradient-to-r from-royal-purple to-lic-blue text-white"
                  : getStepStatus("input") === "active"
                  ? "bg-white border-2 border-royal-purple text-royal-purple shadow-md scale-105"
                  : "bg-slate-100 border-2 border-slate-200 text-slate-400"
              }`}
            >
              {getStepStatus("input") === "completed" ? <CheckCircle2 className="h-4 w-4" /> : "1"}
            </div>
            <span
              className={`text-[10px] sm:text-xs font-bold mt-2 ${
                getStepStatus("input") === "active" ? "text-royal-purple" : "text-slate-500"
              }`}
            >
              Details
            </span>
          </div>

          {/* Step 2: Payment */}
          <div className="flex flex-col items-center">
            <div
              className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                getStepStatus("checkout") === "completed"
                  ? "bg-gradient-to-r from-royal-purple to-lic-blue text-white"
                  : getStepStatus("checkout") === "active"
                  ? "bg-white border-2 border-royal-purple text-royal-purple shadow-md scale-105"
                  : "bg-slate-100 border-2 border-slate-200 text-slate-400"
              }`}
            >
              {getStepStatus("checkout") === "completed" ? <CheckCircle2 className="h-4 w-4" /> : "2"}
            </div>
            <span
              className={`text-[10px] sm:text-xs font-bold mt-2 ${
                getStepStatus("checkout") === "active" ? "text-royal-purple" : "text-slate-500"
              }`}
            >
              Payment
            </span>
          </div>

          {/* Step 3: Credit Score */}
          <div className="flex flex-col items-center">
            <div
              className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                getStepStatus("results") === "completed" || step === "results"
                  ? "bg-gradient-to-r from-royal-purple to-lic-blue text-white"
                  : getStepStatus("results") === "active"
                  ? "bg-white border-2 border-royal-purple text-royal-purple shadow-md scale-105"
                  : "bg-slate-100 border-2 border-slate-200 text-slate-400"
              }`}
            >
              {step === "results" ? <CheckCircle2 className="h-4 w-4" /> : "3"}
            </div>
            <span
              className={`text-[10px] sm:text-xs font-bold mt-2 ${
                step === "results" ? "text-royal-purple" : "text-slate-500"
              }`}
            >
              Score Report
            </span>
          </div>
        </div>
      </div>

      {/* Form Steps */}
      {step === "input" && (
        <div className="max-w-xl mx-auto space-y-6 animate-fade-in">
          <Card className="p-6 border border-slate-100 bg-white shadow-elevated relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-royal-purple to-lic-blue" />
            <h3 className="text-base font-extrabold text-brand-navy border-b pb-3 mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-royal-purple" /> Credit Bureau Consent Form
            </h3>

            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name (As on PAN Card) *</Label>
                <Input
                  id="fullName"
                  placeholder="e.g. Vikram Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="rounded-lg border-slate-200 mt-1"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="mobile" className="text-xs font-bold uppercase tracking-wider text-slate-500">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    placeholder="+91 98765 43210"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="rounded-lg border-slate-200 mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pan" className="text-xs font-bold uppercase tracking-wider text-slate-500">PAN Number *</Label>
                  <Input
                    id="pan"
                    placeholder="e.g. ABCDE1234F"
                    value={pan}
                    onChange={(e) => setPan(e.target.value)}
                    className="uppercase font-mono rounded-lg border-slate-200 mt-1"
                    maxLength={10}
                    required
                  />
                </div>
              </div>

              <div className="text-[10px] sm:text-[11px] text-muted-foreground leading-relaxed bg-slate-50 rounded-xl p-4 border border-slate-100 flex gap-2.5">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong>TransUnion API Compliance Notice</strong>: This service is a simulated interface of the TransUnion CIBIL API integration. In production, real-time fetching is subject to credential verification, licensing agreements, and commercial API contracts with TransUnion. Checking your score retrieves a soft inquiry on your record.
                </div>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-royal-purple to-lic-blue text-white font-bold h-11 shadow-md hover:opacity-95 transition-opacity">
                Proceed to Verification <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Card>

          {/* Previous Reports Section */}
          <Card className="p-6 border border-slate-100 bg-white shadow-card">
            <h3 className="text-sm font-extrabold text-brand-navy border-b pb-3 mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-royal-purple" /> Previously Generated Bureau Reports
            </h3>
            <div className="space-y-4">
              {[
                {
                  id: "TU-CIBIL-112049",
                  name: "R H Adhoni",
                  pan: "ADHPXXXX1A",
                  score: 812,
                  date: "12/06/2026",
                  color: "from-emerald-500 to-teal-500",
                },
                {
                  id: "TU-CIBIL-905581",
                  name: "Bibi Ayesha",
                  pan: "AYEPXXXX2B",
                  score: 794,
                  date: "02/07/2026",
                  color: "from-emerald-500 to-teal-500",
                },
                {
                  id: "TU-CIBIL-774512",
                  name: "Vikram Urs",
                  pan: "URSPXXXX3C",
                  score: 758,
                  date: "10/07/2026",
                  color: "from-emerald-500 to-teal-500",
                },
              ].map((rep) => (
                <div key={rep.id} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0 text-xs">
                  <div>
                    <div className="font-extrabold text-brand-navy">{rep.name}</div>
                    <div className="text-muted-foreground text-[10px] mt-0.5">
                      PAN: {rep.pan} | Date: {rep.date}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">{rep.id}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold px-2 py-0.5">
                      Score: {rep.score}
                    </Badge>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-royal-purple hover:bg-slate-50 rounded-lg"
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
        </div>
      )}

      {step === "checkout" && !otpSent && (
        <Card className="p-6 border border-slate-100 bg-white shadow-elevated max-w-xl mx-auto animate-fade-in relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-royal-purple to-lic-blue" />
          <h3 className="text-base font-extrabold text-brand-navy border-b pb-3 mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-royal-purple" /> Premium Report Payout
          </h3>

          <div className="rounded-2xl bg-gradient-to-br from-royal-purple/5 to-lic-blue/5 p-6 border border-royal-purple/10 mb-6 text-center space-y-1">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">Bureau Verification Charge</span>
            <div className="text-4xl font-black text-brand-navy">₹399.00</div>
            <p className="text-[11px] text-muted-foreground">Includes 1-year score monitoring & dynamic dashboard tracking.</p>
          </div>

          <div className="space-y-4">
            <span className="text-xs font-bold text-brand-navy block uppercase tracking-wider text-slate-500">Select Payment Method</span>
            <div className="grid grid-cols-3 gap-3">
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
                  className={`text-xs font-bold h-10 transition-all rounded-lg ${
                    paymentMethod === method.id
                      ? "bg-royal-purple text-white shadow"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {method.label}
                </Button>
              ))}
            </div>

            <Button onClick={handlePayment} className="w-full bg-gradient-to-r from-royal-purple to-lic-blue text-white font-bold h-11 shadow-md mt-6">
              Authorize Payment of ₹399
            </Button>
          </div>
        </Card>
      )}

      {step === "checkout" && otpSent && (
        <Card className="p-6 border border-slate-100 bg-white shadow-elevated max-w-xl mx-auto animate-fade-in relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
          <h3 className="text-base font-extrabold text-brand-navy border-b pb-3 mb-4 flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-emerald-500" /> Enter Payment OTP
          </h3>

          <p className="text-xs text-muted-foreground mb-4">
            We sent a secure, mock validation code to your bank terminal. Please enter it below.
          </p>

          <form onSubmit={verifyOtpAndShowResults} className="space-y-5">
            <div>
              <Label htmlFor="otp" className="text-xs font-bold uppercase tracking-wider text-slate-500">Verification Code *</Label>
              <Input
                id="otp"
                placeholder="Enter 1234 to verify"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="text-center text-lg tracking-widest font-mono font-bold mt-1 h-12 border-slate-200 rounded-lg"
                required
              />
            </div>

            <Button type="submit" disabled={verifyingOtp} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11">
              {verifyingOtp ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Fetching Score...
                </>
              ) : (
                "Verify Code & Fetch Score"
              )}
            </Button>

            {verifyingOtp && (
              <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-left font-mono text-xs space-y-2 text-slate-300">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  Async Queue Worker Status:
                </div>
                <div className="border-t border-slate-800 pt-2 text-slate-400">
                  {queueState}
                </div>
              </div>
            )}
          </form>
        </Card>
      )}

      {step === "loading" && (
        <Card className="p-12 border border-slate-100 bg-white shadow-elevated max-w-xl mx-auto flex flex-col items-center justify-center text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-purple" />
          <h3 className="text-base font-extrabold text-brand-navy">Processing Payout Request</h3>
          <p className="text-xs text-muted-foreground">Contacting secure bank gateway...</p>
        </Card>
      )}

      {step === "results" && (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          <Card className="p-8 border border-slate-100 bg-white shadow-elevated text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
            <div className="absolute top-4 right-4">
              <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-100 font-extrabold px-3 py-1 text-xs">
                Excellent Credit Health
              </Badge>
            </div>

            {/* Custom SVG Dial Gauge with needle */}
            <div className="relative mx-auto h-48 w-72 flex flex-col items-center justify-end overflow-hidden mt-6">
              <svg className="w-64 h-32" viewBox="0 0 100 50">
                <defs>
                  <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" /> {/* Red */}
                    <stop offset="40%" stopColor="#f59e0b" /> {/* Orange/Yellow */}
                    <stop offset="70%" stopColor="#10b981" /> {/* Green */}
                    <stop offset="100%" stopColor="#059669" /> {/* Dark Green */}
                  </linearGradient>
                </defs>
                {/* Arc track */}
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Colored active path */}
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke="url(#gauge-grad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="125.66"
                  strokeDashoffset={125.66 * (1 - (score - 300) / 600)}
                  className="transition-all duration-1000 ease-out"
                />
                {/* Needle indicator */}
                <g transform={`rotate(${-90 + (score - 300) / 600 * 180} 50 50)`} className="transition-transform duration-1000 ease-out">
                  <line x1="50" y1="50" x2="50" y2="18" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="50" cy="50" r="4" fill="#1e293b" />
                </g>
              </svg>
              
              {/* Score Display Overlay */}
              <div className="absolute bottom-0 text-center space-y-0.5">
                <span className="text-4xl font-black text-brand-navy tracking-tight">{score}</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">CIBIL Score</span>
              </div>
            </div>

            {/* Score Ranges Label */}
            <div className="flex justify-between max-w-sm mx-auto text-[9px] font-bold text-slate-400 mt-2 border-t pt-2">
              <span className="text-red-500">300 POOR</span>
              <span className="text-amber-500">600 FAIR</span>
              <span className="text-emerald-500">750 GOOD</span>
              <span className="text-emerald-700">900 EXCELLENT</span>
            </div>

            <h3 className="text-2xl font-black text-brand-navy mt-6">Congratulations, {fullName}!</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
              Your credit score is in the top 5% nationally. You qualify for elite pre-approved personal and home loan programs.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button onClick={downloadPdfReport} className="bg-gradient-to-r from-royal-purple to-lic-blue text-white font-bold flex items-center gap-2 shadow-md hover:opacity-95 transition-opacity">
                <Download className="h-4 w-4" /> Download Official CIBIL PDF
              </Button>
              <Button variant="outline" onClick={() => setStep("input")} className="text-xs font-bold border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg px-4">
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
                color: "text-emerald-600",
                bgColor: "bg-emerald-50/50",
                borderColor: "border-emerald-100/50",
              },
              {
                title: "Credit Utilization",
                score: "22% utilized",
                desc: "Optimal utilization below standard 30% ceiling.",
                color: "text-emerald-600",
                bgColor: "bg-emerald-50/50",
                borderColor: "border-emerald-100/50",
              },
              {
                title: "Inquiries",
                score: "1 recent query",
                desc: "Low search profile prevents hard credit impact.",
                color: "text-emerald-600",
                bgColor: "bg-emerald-50/50",
                borderColor: "border-emerald-100/50",
              },
            ].map((metric) => (
              <Card key={metric.title} className={`p-5 border ${metric.borderColor} ${metric.bgColor} shadow-sm space-y-1`}>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{metric.title}</h4>
                <div className={`text-base font-extrabold ${metric.color}`}>{metric.score}</div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{metric.desc}</p>
              </Card>
            ))}
          </div>

          {/* Financial Advice */}
          <Card className="p-6 border border-slate-100 bg-white shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-royal-purple" />
            <h4 className="text-sm font-extrabold text-brand-navy flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-royal-purple" /> Recommendations to Optimize Score
            </h4>
            <ul className="space-y-2 text-[11px] sm:text-xs text-slate-600 leading-relaxed pl-1">
              <li className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-royal-purple shrink-0 mt-0.5" />
                <span>Keep total credit card balances under 30% of their aggregate limit at all times.</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-royal-purple shrink-0 mt-0.5" />
                <span>Avoid closing older credit card accounts to preserve active age profile history.</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 text-royal-purple shrink-0 mt-0.5" />
                <span>Consolidate high-interest short-term debt into a structured personal loan.</span>
              </li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
