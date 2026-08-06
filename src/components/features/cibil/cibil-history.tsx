import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, AlertTriangle, HelpCircle, FileText, Send, Landmark } from "lucide-react";
import { toast } from "sonner";

interface AccountHistory {
  id: string;
  lender: string;
  type: string;
  balance: number;
  limit?: number;
  status: "Active" | "Closed";
  paymentHistory: "Excellent" | "Delayed" | "No issues";
  accountNumber: string;
}

interface EnquiryHistory {
  id: string;
  lender: string;
  date: string;
  purpose: string;
  amount: number;
}

export function CibilHistory() {
  const [disputes, setDisputes] = useState<any[]>([
    {
      id: "DISP-8812",
      subject: "SBI Personal Loan balance mismatch",
      status: "Under Investigation",
      date: "04/08/2026",
    },
  ]);

  const [disputeOpen, setDisputeOpen] = useState(false);
  const [disputeSubject, setDisputeSubject] = useState("");
  const [disputeAccount, setDisputeAccount] = useState("");
  const [disputeReason, setDisputeReason] = useState("");
  const [submittingDispute, setSubmittingDispute] = useState(false);

  const accounts: AccountHistory[] = [
    {
      id: "1",
      lender: "HDFC Bank",
      type: "Credit Card",
      balance: 18450,
      limit: 150000,
      status: "Active",
      paymentHistory: "Excellent",
      accountNumber: "XXXX XXXX XXXX 4921",
    },
    {
      id: "2",
      lender: "SBI",
      type: "Personal Loan",
      balance: 145000,
      status: "Active",
      paymentHistory: "Excellent",
      accountNumber: "XXXX XXXX 9924",
    },
    {
      id: "3",
      lender: "ICICI Bank",
      type: "Car Loan",
      balance: 0,
      status: "Closed",
      paymentHistory: "Excellent",
      accountNumber: "XXXX XXXX 8812",
    },
    {
      id: "4",
      lender: "Axis Bank",
      type: "Consumer Durable Loan",
      balance: 4500,
      status: "Active",
      paymentHistory: "Delayed",
      accountNumber: "XXXX XXXX 1042",
    },
  ];

  const enquiries: EnquiryHistory[] = [
    {
      id: "e1",
      lender: "HDFC Bank",
      date: "28/07/2026",
      purpose: "Credit Card Application",
      amount: 150000,
    },
    {
      id: "e2",
      lender: "Bajaj Finserv",
      date: "10/07/2026",
      purpose: "Consumer Durable Loan",
      amount: 45000,
    },
    {
      id: "e3",
      lender: "SBI",
      date: "02/06/2026",
      purpose: "Home Loan Inquiry",
      amount: 5500000,
    },
  ];

  const handleFileDispute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disputeSubject || !disputeAccount || !disputeReason) {
      toast.error("Please fill in all details for the dispute request.");
      return;
    }

    setSubmittingDispute(true);
    setTimeout(() => {
      const newDispute = {
        id: `DISP-${Math.floor(1000 + Math.random() * 9000)}`,
        subject: disputeSubject,
        status: "Submitted to Bureau",
        date: new Date().toLocaleDateString("en-IN"),
      };
      setDisputes([newDispute, ...disputes]);
      setSubmittingDispute(false);
      setDisputeOpen(false);
      setDisputeSubject("");
      setDisputeAccount("");
      setDisputeReason("");
      toast.success(`Dispute ${newDispute.id} submitted for bureau resolution.`);
    }, 1000);
  };

  return (
    <Card className="p-6 border bg-card shadow-lg w-full">
      <Tabs defaultValue="accounts" className="w-full">
        <div className="flex items-center justify-between border-b pb-3 flex-wrap gap-2">
          <h3 className="text-base font-extrabold text-brand-navy dark:text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" /> Credit Bureau Details
          </h3>
          <TabsList className="bg-slate-100 dark:bg-slate-800">
            <TabsTrigger value="accounts" className="text-xs font-bold">Accounts</TabsTrigger>
            <TabsTrigger value="enquiries" className="text-xs font-bold">Hard Enquiries</TabsTrigger>
            <TabsTrigger value="disputes" className="text-xs font-bold">Disputes</TabsTrigger>
          </TabsList>
        </div>

        {/* ACCOUNTS TAB */}
        <TabsContent value="accounts" className="mt-4 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b text-muted-foreground uppercase font-black tracking-wider text-[10px]">
                  <th className="pb-3 pr-4">Lender / Account</th>
                  <th className="pb-3 px-4">Type</th>
                  <th className="pb-3 px-4">Balance / Limit</th>
                  <th className="pb-3 px-4">Payment Health</th>
                  <th className="pb-3 pl-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {accounts.map((acc) => (
                  <tr key={acc.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                    <td className="py-3.5 pr-4">
                      <div className="font-extrabold text-brand-navy dark:text-white">{acc.lender}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{acc.accountNumber}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-600 dark:text-slate-300">
                      {acc.type}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-800 dark:text-slate-100">
                        ₹{acc.balance.toLocaleString("en-IN")}
                      </div>
                      {acc.limit && (
                        <div className="text-[10px] text-muted-foreground mt-0.5">
                          Limit: ₹{acc.limit.toLocaleString("en-IN")}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {acc.paymentHistory === "Excellent" ? (
                        <div className="flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                          <CheckCircle2 className="h-3.5 w-3.5" /> On Time
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-amber-500 font-bold text-[11px]">
                          <AlertTriangle className="h-3.5 w-3.5" /> Delay Reported
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 pl-4 text-right">
                      <Badge className={acc.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100" : "bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200"}>
                        {acc.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* ENQUIRIES TAB */}
        <TabsContent value="enquiries" className="mt-4 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b text-muted-foreground uppercase font-black tracking-wider text-[10px]">
                  <th className="pb-3 pr-4">Lender</th>
                  <th className="pb-3 px-4">Inquiry Date</th>
                  <th className="pb-3 px-4">Purpose</th>
                  <th className="pb-3 pl-4 text-right">Inquired Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                    <td className="py-3.5 pr-4 font-extrabold text-brand-navy dark:text-white flex items-center gap-2">
                      <Landmark className="h-3.5 w-3.5 text-muted-foreground" /> {enq.lender}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-500">{enq.date}</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-medium">{enq.purpose}</td>
                    <td className="py-3.5 pl-4 text-right font-black text-brand-navy dark:text-white">
                      ₹{enq.amount.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* DISPUTES TAB */}
        <TabsContent value="disputes" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Submit a formal query to the bureau if any credit card or loan entry is incorrect.
            </p>

            <Dialog open={disputeOpen} onOpenChange={setDisputeOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-primary hover:bg-brand-navy text-white text-xs font-bold">
                  File Bureau Dispute
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-brand-navy font-black text-lg">File a Dispute Record</DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground">
                    Your request will be routed directly to TransUnion CIBIL for review.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleFileDispute} className="space-y-4 py-2">
                  <div className="space-y-1">
                    <Label htmlFor="accountSelect" className="text-xs font-bold uppercase tracking-wider text-slate-500">Related Account *</Label>
                    <Select onValueChange={(val) => setDisputeAccount(val)} value={disputeAccount} required>
                      <SelectTrigger className="w-full text-xs">
                        <SelectValue placeholder="Select incorrect account" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.map((acc) => (
                          <SelectItem key={acc.id} value={`${acc.lender} (${acc.type})`} className="text-xs">
                            {acc.lender} - {acc.type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-slate-500">Dispute Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="e.g. Account balance shows active but fully paid"
                      value={disputeSubject}
                      onChange={(e) => setDisputeSubject(e.target.value)}
                      className="text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="reason" className="text-xs font-bold uppercase tracking-wider text-slate-500">Explanation & Supporting Info *</Label>
                    <Textarea
                      id="reason"
                      placeholder="Provide precise details, dates, and any proof details..."
                      value={disputeReason}
                      onChange={(e) => setDisputeReason(e.target.value)}
                      className="text-xs min-h-[80px]"
                      required
                    />
                  </div>

                  <DialogFooter className="mt-4">
                    <Button type="button" variant="outline" onClick={() => setDisputeOpen(false)} className="text-xs">
                      Cancel
                    </Button>
                    <Button type="submit" disabled={submittingDispute} className="bg-primary hover:bg-brand-navy text-white text-xs font-bold flex items-center gap-1.5">
                      {submittingDispute ? "Submitting..." : (
                        <>
                          <Send className="h-3 w-3" /> Submit Dispute
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-3 mt-2">
            {disputes.map((disp) => (
              <div key={disp.id} className="p-4 border rounded-xl flex items-center justify-between bg-slate-50 dark:bg-slate-900/50 text-xs">
                <div>
                  <div className="font-extrabold text-brand-navy dark:text-white">{disp.subject}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    Filed on {disp.date} | ID: {disp.id}
                  </div>
                </div>
                <Badge className="bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100 font-bold">
                  {disp.status}
                </Badge>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
