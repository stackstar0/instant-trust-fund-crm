import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useAppStore } from "@/lib/app-store";
import { maskAadhaar, maskPan, inr, type MockCustomer } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, Trash2, Download, FileSpreadsheet, FileText, Search } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/customers")({
  head: () => ({ meta: [{ title: "Customers — IFY CRM" }] }),
  component: CustomersPage,
});

const STATUS_COLORS: Record<string, string> = {
  Approved: "bg-primary/10 text-primary border border-primary/30",
  Pending: "bg-accent/30 text-brand-navy border border-accent/50",
  Rejected: "bg-destructive/10 text-destructive border border-destructive/30",
  "In Review": "bg-secondary text-secondary-foreground border",
};

function downloadFile(name: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

export function toCSV(rows: MockCustomer[]) {
  const header = [
    "ID",
    "Name",
    "Mobile",
    "Email",
    "Aadhaar",
    "PAN",
    "Product",
    "Kind",
    "Status",
    "Applied On",
    "Amount",
    "Branch",
  ];
  const escape = (s: unknown) => `"${String(s).replace(/"/g, '""')}"`;
  return [
    header.join(","),
    ...rows.map((r) =>
      [
        r.id,
        r.fullName,
        r.mobile,
        r.email,
        r.aadhaar,
        r.pan,
        r.productType,
        r.productKind,
        r.status,
        new Date(r.appliedOn).toLocaleDateString(),
        r.amount,
        r.branch,
      ]
        .map(escape)
        .join(","),
    ),
  ].join("\n");
}

function CustomersPage() {
  const { customers, deleteCustomer, updateStatus, currentUser } = useAppStore();

  if (currentUser?.role === "assistant_admin") {
    return <Navigate to="/admin/tasks" replace />;
  }

  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [kind, setKind] = useState("all");
  const [selected, setSelected] = useState<MockCustomer | null>(null);

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      if (currentUser?.role === "assistant_admin" && c.assignedTo !== "Bibi Ayesha") return false;
      if (status !== "all" && c.status !== status) return false;
      if (kind !== "all" && c.productKind !== kind) return false;
      if (q) {
        const s = q.toLowerCase();
        return (
          c.fullName.toLowerCase().includes(s) ||
          c.id.toLowerCase().includes(s) ||
          c.email.toLowerCase().includes(s) ||
          c.mobile.includes(s) ||
          c.productType.toLowerCase().includes(s)
        );
      }
      return true;
    });
  }, [customers, q, status, kind, currentUser]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black md:text-4xl">Customer Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {filtered.length} of {customers.length} records
          </p>
        </div>
        {currentUser?.role === "super_admin" && (
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => {
                downloadFile("customers.csv", toCSV(filtered), "text/csv");
                toast.success("Excel/CSV downloaded");
              }}
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" /> Excel
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                downloadFile("customers.txt", toCSV(filtered), "text/plain");
                toast.success("PDF-ready report generated");
              }}
            >
              <FileText className="mr-2 h-4 w-4" /> PDF
            </Button>
          </div>
        )}
      </div>

      <Card className="mt-6 p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-[240px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search name, ID, mobile, product..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="In Review">In Review</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select value={kind} onValueChange={setKind}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="loan">Loans</SelectItem>
              <SelectItem value="insurance">Insurance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead className="hidden md:table-cell">Aadhaar</TableHead>
                <TableHead className="hidden md:table-cell">PAN</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Applied</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.slice(0, 50).map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-mono text-xs">{c.id}</TableCell>
                  <TableCell className="font-medium">{c.fullName}</TableCell>
                  <TableCell className="text-xs">{c.mobile}</TableCell>
                  <TableCell className="hidden font-mono text-xs md:table-cell">
                    {maskAadhaar(c.aadhaar)}
                  </TableCell>
                  <TableCell className="hidden font-mono text-xs md:table-cell">
                    {maskPan(c.pan)}
                  </TableCell>
                  <TableCell className="text-xs">{c.productType}</TableCell>
                  <TableCell className="text-xs font-semibold">{inr(c.amount)}</TableCell>
                  <TableCell>
                    <Badge className={STATUS_COLORS[c.status] + " font-medium"}>{c.status}</Badge>
                  </TableCell>
                  <TableCell className="hidden text-xs lg:table-cell">
                    {new Date(c.appliedOn).toLocaleDateString("en-IN")}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => setSelected(c)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        disabled={currentUser?.role === "assistant_admin"}
                        title={currentUser?.role === "assistant_admin" ? "Super Admin access required" : "Delete customer"}
                        onClick={() => {
                          if (currentUser?.role === "assistant_admin") {
                            toast.error("Permission Denied: Super Admin access required");
                            return;
                          }
                          deleteCustomer(c.id);
                          toast.success("Deleted");
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-rose-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filtered.length > 50 && (
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Showing 50 of {filtered.length} — refine filters to see more.
            </p>
          )}
        </div>
      </Card>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm">
              {[
                ["Customer ID", selected.id],
                ["Full Name", selected.fullName],
                ["Mobile", selected.mobile],
                ["Email", selected.email],
                ["Aadhaar", selected.aadhaar],
                ["PAN", selected.pan],
                ["Product", selected.productType],
                ["Amount", inr(selected.amount)],
                ["Branch", selected.branch],
                ["Applied", new Date(selected.appliedOn).toLocaleString("en-IN")],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-3 gap-2 border-b pb-2 last:border-0">
                  <div className="text-muted-foreground">{k}</div>
                  <div className="col-span-2 font-medium">{v}</div>
                </div>
              ))}
              <div className="flex flex-wrap gap-2 pt-2">
                <Button
                  size="sm"
                  onClick={() => {
                    updateStatus(selected.id, "Approved");
                    toast.success("Approved");
                    setSelected(null);
                  }}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    updateStatus(selected.id, "In Review");
                    toast.info("Marked In Review");
                    setSelected(null);
                  }}
                >
                  Move to Review
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    updateStatus(selected.id, "Rejected");
                    toast.error("Rejected");
                    setSelected(null);
                  }}
                >
                  Reject
                </Button>
                {currentUser?.role === "super_admin" && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="ml-auto"
                    onClick={() =>
                      downloadFile(
                        `${selected.id}.txt`,
                        JSON.stringify(selected, null, 2),
                        "text/plain",
                      )
                    }
                  >
                    <Download className="mr-1 h-4 w-4" /> Download
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
