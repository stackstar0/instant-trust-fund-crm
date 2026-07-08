import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAppStore } from "@/lib/app-store";
import type { ReactNode } from "react";

const schema = z.object({
  fullName: z.string().trim().min(2, "Enter full name").max(80),
  mobile: z
    .string()
    .trim()
    .regex(/^[+\d\s-]{10,15}$/, "Enter a valid mobile number"),
  email: z.string().trim().email("Invalid email").max(120),
  aadhaar: z
    .string()
    .trim()
    .regex(/^\d{4}\s?\d{4}\s?\d{4}$/, "12-digit Aadhaar"),
  pan: z
    .string()
    .trim()
    .regex(/^[A-Za-z]{5}\d{4}[A-Za-z]$/, "Invalid PAN (e.g. ABCDE1234F)"),
  address: z.string().trim().min(6, "Enter address").max(200).optional().or(z.literal("")),
  occupation: z.string().trim().max(60).optional().or(z.literal("")),
  income: z.string().trim().max(20).optional().or(z.literal("")),
  amount: z.string().trim().max(20).optional().or(z.literal("")),
  branch: z.string().trim().max(80).optional().or(z.literal("")),
});
type FormValues = z.infer<typeof schema>;

export function ApplyDialog({
  productName,
  productKind,
  children,
}: {
  productName: string;
  productKind: "loan" | "insurance" | "service";
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ id: string } | null>(null);
  const { addApplication } = useAppStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    const created = addApplication({
      fullName: data.fullName,
      mobile: data.mobile,
      email: data.email,
      aadhaar: data.aadhaar,
      pan: data.pan.toUpperCase(),
      productType: productName,
      productKind: productKind === "service" ? "loan" : productKind,
      amount: parseInt((data.amount || "0").replace(/\D/g, "")) || 0,
      branch: data.branch || "—",
    });
    setSubmitting(false);
    setSuccess({ id: created.id });
    toast.success("Application submitted", { description: `Reference: ${created.id}` });
  };

  const handleClose = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setSuccess(null);
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        {children ?? (
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-brand-navy">
            Apply Now
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply for {productName}</DialogTitle>
          <DialogDescription>
            Fill in your details — one of our advisors will call you back within 24 hours. All
            fields are securely stored (demo).
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center py-8 text-center">
            <CheckCircle2 className="h-16 w-16 text-primary" />
            <h3 className="mt-4 text-xl font-bold">Application submitted!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your reference number is{" "}
              <span className="font-mono font-semibold text-foreground">{success.id}</span>. Track
              its status in the Admin Dashboard.
            </p>
            <div className="mt-6 flex gap-2">
              <Button variant="outline" onClick={() => handleClose(false)}>
                Close
              </Button>
              <Button
                onClick={() => {
                  setSuccess(null);
                  reset();
                }}
              >
                Submit another
              </Button>
            </div>
          </div>
        ) : (
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="sm:col-span-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input id="fullName" placeholder="As per Aadhaar" {...register("fullName")} />
              {errors.fullName && (
                <p className="mt-1 text-xs text-destructive">{errors.fullName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="mobile">Mobile Number *</Label>
              <Input id="mobile" placeholder="+91 98765 43210" {...register("mobile")} />
              {errors.mobile && (
                <p className="mt-1 text-xs text-destructive">{errors.mobile.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
              {errors.email && (
                <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="aadhaar">Aadhaar Number *</Label>
              <Input id="aadhaar" placeholder="1234 5678 9012" {...register("aadhaar")} />
              {errors.aadhaar && (
                <p className="mt-1 text-xs text-destructive">{errors.aadhaar.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="pan">PAN Number *</Label>
              <Input id="pan" placeholder="ABCDE1234F" {...register("pan")} className="uppercase" />
              {errors.pan && <p className="mt-1 text-xs text-destructive">{errors.pan.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" rows={2} placeholder="Full address" {...register("address")} />
            </div>
            <div>
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                placeholder="Salaried / Business / Student"
                {...register("occupation")}
              />
            </div>
            <div>
              <Label htmlFor="income">Annual Income (₹)</Label>
              <Input id="income" placeholder="e.g. 8,50,000" {...register("income")} />
            </div>
            <div>
              <Label htmlFor="amount">
                {productKind === "insurance" ? "Sum Assured (₹)" : "Loan Amount (₹)"}
              </Label>
              <Input id="amount" placeholder="e.g. 25,00,000" {...register("amount")} />
            </div>
            <div>
              <Label htmlFor="branch">Preferred Branch</Label>
              <Input id="branch" placeholder="e.g. Mumbai Fort" {...register("branch")} />
            </div>

            <div className="sm:col-span-2 mt-2 rounded-md bg-muted/60 p-3 text-xs text-muted-foreground">
              Uploads (Aadhaar / PAN / Income Proof) are simulated in this demo. In production,
              secure file uploads would appear here.
            </div>
            <div className="sm:col-span-2 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => handleClose(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-primary hover:bg-brand-navy"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
