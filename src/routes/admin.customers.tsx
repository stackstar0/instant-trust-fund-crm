import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Search, Filter, ShieldCheck, Phone, MapPin, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Customer360 } from "@/components/Customer360";

export const Route = createFileRoute("/admin/customers")({
  head: () => ({ meta: [{ title: "Customer CRM Database — IFY CRM" }] }),
  component: AdminCustomers,
});

function AdminCustomers() {
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["customers", search, source, page],
    queryFn: () =>
      fetchAPI(`/customers?page=${page}&limit=15&search=${encodeURIComponent(search)}&source=${source}`),
  });

  const customers = data?.customers || [];
  const total = data?.total || 0;
  const totalPages = data?.pages || 1;

  if (selectedCustomerId) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-4">
          <Button onClick={() => setSelectedCustomerId(null)} variant="outline" size="sm" className="flex items-center gap-2">
            <X className="h-4 w-4" /> Close 360° Profile
          </Button>
        </div>
        <Customer360 customerId={selectedCustomerId} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-brand-navy">Customer CRM Database</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage real imported customer records, KYC profiles, and privacy controls. Click on a record to view details.
          </p>
        </div>
        <Badge className="bg-emerald-500/10 text-emerald-600 px-3 py-1 text-xs font-semibold">
          {total.toLocaleString()} Verified Records
        </Badge>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 border mb-6 shadow-sm flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 min-w-[260px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by customer name, phone, or location..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9 text-xs"
          />
        </div>
        <div className="flex gap-3">
          <select
            className="h-9 px-3 rounded-md border text-xs bg-white focus:outline-none"
            value={source}
            onChange={(e) => {
              setSource(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Sources</option>
            <option value="imported">Imported (Excel)</option>
            <option value="manual">Manual Register</option>
            <option value="web_application">Web Application</option>
          </select>
        </div>
      </Card>

      {/* Table */}
      <Card className="border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-bold border-b">
              <tr>
                <th className="px-5 py-3.5">Customer Name</th>
                <th className="px-5 py-3.5">Contact Number</th>
                <th className="px-5 py-3.5">Location / City</th>
                <th className="px-5 py-3.5">Source</th>
                <th className="px-5 py-3.5">KYC Status</th>
                <th className="px-5 py-3.5">Created Date</th>
              </tr>
            </thead>
            <tbody className="divide-y text-slate-600">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-muted-foreground animate-pulse">
                    Loading Customer CRM Database...
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-muted-foreground">
                    <Users className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                    No customer records matched your query.
                  </td>
                </tr>
              ) : (
                customers.map((c: any) => (
                  <tr key={c._id} className="hover:bg-slate-50/60 transition cursor-pointer" onClick={() => setSelectedCustomerId(c._id)}>
                    <td className="px-5 py-3.5 font-bold text-brand-navy">{c.fullName}</td>
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-700">
                      <span className="inline-flex items-center gap-1">
                        <Phone className="h-3 w-3 text-slate-400" />
                        {c.mobile}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-600">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        {c.city || c.district || "Karnataka"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant="outline" className="capitalize text-[10px]">
                        {c.source}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge
                        className={
                          c.kycStatus === "verified"
                            ? "bg-emerald-500/10 text-emerald-600"
                            : "bg-amber-500/10 text-amber-600"
                        }
                      >
                        {c.kycStatus}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-400">
                      {new Date(c.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t bg-slate-50/50 text-xs">
          <span className="text-slate-500">
            Showing Page <strong className="text-slate-700">{page}</strong> of{" "}
            <strong className="text-slate-700">{totalPages}</strong> ({total} total customers)
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
