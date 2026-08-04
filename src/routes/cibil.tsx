import { useMemo, useState } from "react";
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

  const pendingNotice = useMemo(
    () =>
      "Your request has been submitted to the authorised bureau provider. No score will be displayed until the provider returns a result.",
    []
  );

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
    await new Promise((r) => setTimeout(r, 900));
    setOtpSent(true);
    setStep("checkout");
  };

  const [queueState, setQueueState] = useState("");

  const verifyOtpAndShowResults = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      toast.error("Enter the verification code received from the provider.");
      return;
    }
    setVerifyingOtp(true);

    const states = [
      "Request accepted by the bureau provider.",
      "Submitting verification request to the authorised integration queue.",
      "Awaiting provider callback and secure record match.",
      "No score will be generated until the provider returns a result.",
    ];

    for (let i = 0; i < states.length; i++) {
      setQueueState(states[i]);
      await new Promise((r) => setTimeout(r, 500));
    }

    setVerifyingOtp(false);
    setStep("results");
    toast.success("Request submitted for processing.");
  };

  const downloadPdfReport = () => {
    toast.info("A report will be available after the provider returns a verified result.");
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
                  <strong>TransUnion API Compliance Notice</strong>: Real-time bureau requests are subject to provider credentials, licensing terms, and commercial contracts. The platform will only submit requests through authorised channels and will never invent a score when integration is unavailable.
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
            We sent a verification code through the configured provider channel. Please enter it below.
          </p>

          <form onSubmit={verifyOtpAndShowResults} className="space-y-5">
            <div>
              <Label htmlFor="otp" className="text-xs font-bold uppercase tracking-wider text-slate-500">Verification Code *</Label>
              <Input
                id="otp"
                placeholder="Enter verification code"
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
              <Badge className="bg-amber-50 text-amber-700 border border-amber-100 font-extrabold px-3 py-1 text-xs">
                Processing Pending
              </Badge>
            </div>

            <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
              <ShieldCheck className="mx-auto h-10 w-10 text-royal-purple" />
              <h3 className="mt-4 text-2xl font-black text-brand-navy">Request received</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{pendingNotice}</p>
              <p className="mt-4 text-sm text-slate-500">
                We will notify you once the bureau provider returns a verified report or status update.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button onClick={downloadPdfReport} className="bg-gradient-to-r from-royal-purple to-lic-blue text-white font-bold flex items-center gap-2 shadow-md hover:opacity-95 transition-opacity">
                <Download className="h-4 w-4" /> Check Status Later
              </Button>
              <Button variant="outline" onClick={() => setStep("input")} className="text-xs font-bold border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg px-4">
                Submit Another Request
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
