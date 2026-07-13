import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { mockProperties, type MockProperty } from "@/lib/properties-data";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Search,
  MapPin,
  Phone,
  User,
  ShieldCheck,
  Share2,
  CheckCircle,
  AlertTriangle,
  History,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/properties")({
  head: () => ({ meta: [{ title: "Bhoomi Records Admin — IFY CRM" }] }),
  component: AdminPropertiesPage,
});

function formatINR(val: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
}

function AdminPropertiesPage() {
  const [search, setSearch] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<MockProperty>(mockProperties[0]);
  const [localProperties, setLocalProperties] = useState<MockProperty[]>(mockProperties);

  // Filtered properties list based on search
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return localProperties;
    return localProperties.filter(
      (p) =>
        p.ownerName.toLowerCase().includes(q) ||
        p.surveyNumber.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.village.toLowerCase().includes(q)
    );
  }, [localProperties, search]);

  const toggleStatus = (id: string) => {
    setLocalProperties((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextStatus: MockProperty["status"] =
            p.status === "Verified"
              ? "Disputed"
              : p.status === "Disputed"
              ? "Pending"
              : "Verified";
          toast.success(`Property ${p.id} status updated to ${nextStatus}`);
          const updated = { ...p, status: nextStatus };
          if (selectedProperty.id === id) {
            setSelectedProperty(updated);
          }
          return updated;
        }
        return p;
      })
    );
  };

  const triggerCallSimulation = (name: string, phone: string) => {
    toast.info(`Simulating call connection to owner: ${name}`, {
      description: `Dialing: ${phone}...`,
      duration: 3000,
    });
  };

  const triggerSmsSimulation = (name: string, phone: string, survey: string) => {
    toast.success(`SMS verification link sent to ${name}`, {
      description: `Target: ${phone}. Message: "Verify your land survey ${survey} on IFY portal."`,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div>
        <h1 className="text-3xl font-black md:text-4xl text-brand-navy">Bhoomi Registry & Land Audit</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Lookup land deeds, survey details, owner contacts, and verify assets for secure collateral backing.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Left 2 Columns: Directory */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 border bg-card shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h3 className="text-lg font-bold text-brand-navy">Karnataka Land Registry</h3>
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search owner name, survey, village..."
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
                    <th className="py-3 px-4">Survey No & ID</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Owner Name</th>
                    <th className="py-3 px-4">Valuation</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted-foreground">
                        No property deeds found matching search.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((p) => (
                      <tr
                        key={p.id}
                        onClick={() => setSelectedProperty(p)}
                        className={`cursor-pointer hover:bg-muted/10 transition ${
                          selectedProperty.id === p.id ? "bg-primary/5 font-medium" : ""
                        }`}
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-brand-navy">{p.surveyNumber}</div>
                          <div className="text-[10px] text-muted-foreground">{p.id}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-foreground">{p.village}</div>
                          <div className="text-[11px] text-muted-foreground">{p.district}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-foreground flex items-center gap-1">
                            <User className="h-3 w-3 text-muted-foreground shrink-0" />
                            {p.ownerName}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-foreground font-semibold">
                          {formatINR(p.valuation)}
                        </td>
                        <td className="py-3.5 px-4">
                          <Badge
                            variant="outline"
                            className={
                              p.status === "Verified"
                                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-bold text-[10px]"
                                : p.status === "Disputed"
                                ? "bg-rose-500/10 text-rose-600 border-rose-500/20 font-bold text-[10px]"
                                : "bg-amber-500/10 text-amber-600 border-amber-500/20 font-bold text-[10px]"
                            }
                          >
                            {p.status}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right 1 Column: Owner Deeds & Actions Panel */}
        <div className="space-y-6">
          <Card className="p-6 border bg-card shadow-card">
            <h3 className="text-lg font-bold text-brand-navy border-b pb-3 mb-4">Land Deed Dossier</h3>

            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Property Survey ID</div>
                <div className="text-xl font-black text-brand-navy mt-1">{selectedProperty.id}</div>
                <div className="text-sm font-semibold text-muted-foreground mt-0.5">Survey Number: {selectedProperty.surveyNumber}</div>
              </div>

              {/* Owner Info block */}
              <div className="rounded-xl bg-secondary/30 p-4 border border-border/80">
                <div className="flex items-center gap-2 mb-3">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">Registered Owner</span>
                </div>
                <div className="text-base font-black text-brand-navy">{selectedProperty.ownerName}</div>
                <div className="flex items-center gap-2 mt-2 text-sm text-foreground">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="font-mono">{selectedProperty.ownerPhone}</span>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 text-xs bg-primary hover:bg-brand-navy text-white h-8"
                    onClick={() => triggerCallSimulation(selectedProperty.ownerName, selectedProperty.ownerPhone)}
                  >
                    Call Owner
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs h-8"
                    onClick={() => triggerSmsSimulation(selectedProperty.ownerName, selectedProperty.ownerPhone, selectedProperty.surveyNumber)}
                  >
                    SMS Link
                  </Button>
                </div>
              </div>

              {/* Geographic Details */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">District</span>
                  <span className="font-semibold text-foreground">{selectedProperty.district}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Taluk</span>
                  <span className="font-semibold text-foreground">{selectedProperty.taluk}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Hobli / Village</span>
                  <span className="font-semibold text-foreground">
                    {selectedProperty.hobli} / {selectedProperty.village}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Area Measure</span>
                  <span className="font-semibold text-foreground">
                    {selectedProperty.areaAcres} Ac, {selectedProperty.areaGuntas} Gt
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Land Classification</span>
                  <Badge variant="secondary" className="font-bold text-xs">{selectedProperty.propertyType}</Badge>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Coordinates</span>
                  <span className="font-mono text-xs text-foreground">
                    {selectedProperty.lat}, {selectedProperty.lng}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-muted-foreground">Bhoomi Registry status</span>
                  <Badge
                    className={
                      selectedProperty.status === "Verified"
                        ? "bg-emerald-500 text-white font-bold"
                        : selectedProperty.status === "Disputed"
                        ? "bg-rose-500 text-white font-bold"
                        : "bg-amber-500 text-white font-bold"
                    }
                  >
                    {selectedProperty.status}
                  </Badge>
                </div>
              </div>

              {/* Action Toggles */}
              <div className="pt-4 border-t space-y-2">
                <Button
                  className="w-full text-xs font-bold flex items-center justify-center gap-2 h-9"
                  variant="outline"
                  onClick={() => toggleStatus(selectedProperty.id)}
                >
                  <ShieldCheck className="h-4 w-4 text-emerald-500" /> Cycle Audit Verification
                </Button>
                <p className="text-[10px] text-muted-foreground text-center">
                  Cycle status between <span className="font-bold">Verified</span>, <span className="font-bold">Disputed</span>, and <span className="font-bold">Pending</span>.
                </p>
              </div>
            </div>
          </Card>

          {/* Dishank Geo-Parcel Visualization Map */}
          <Card className="p-6 border bg-card shadow-card relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-brand-navy flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> Dishank Geo-Parcel Visualization
              </h4>
              <span className="font-mono text-xs text-muted-foreground">
                Lat: {selectedProperty.lat}, Lng: {selectedProperty.lng}
              </span>
            </div>

            {/* Map Grid Simulator */}
            <div className="relative h-[200px] w-full rounded-lg bg-slate-900 border overflow-hidden flex items-center justify-center">
              {/* Grid Lines */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                backgroundImage: "linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)",
                backgroundSize: "20px 20px"
              }} />

              {/* Survey Parcels Mock Visualizer */}
              <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 0,0 L 40,0 L 35,35 L 0,40 Z" fill="#334155" stroke="#475569" strokeWidth="0.5" />
                <path d="M 40,0 L 100,0 L 100,30 L 70,35 L 35,35 Z" fill="#334155" stroke="#475569" strokeWidth="0.5" />
                <path d="M 0,40 L 35,35 L 45,70 L 0,80 Z" fill="#334155" stroke="#475569" strokeWidth="0.5" />
                <path d="M 70,35 L 100,30 L 100,80 L 80,85 Z" fill="#334155" stroke="#475569" strokeWidth="0.5" />
                
                {/* Selected plot (Survey parcel boundary) */}
                <path
                  d="M 35,35 L 70,35 L 80,85 L 45,70 Z"
                  fill={selectedProperty.status === "Disputed" ? "rgba(239, 68, 68, 0.25)" : "rgba(217, 119, 6, 0.25)"}
                  stroke={selectedProperty.status === "Disputed" ? "#ef4444" : "#d97706"}
                  strokeWidth="1.5"
                />
              </svg>

              {/* Parcel label */}
              <div className="absolute top-[48%] left-[55%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="rounded-full bg-accent h-6 w-6 flex items-center justify-center shadow-lg border border-white text-[9px] font-black text-accent-foreground">
                  ★
                </div>
                <span className="mt-1 font-mono text-[10px] font-bold text-white bg-slate-950/80 px-1.5 py-0.5 rounded border border-white/20">
                  Plot {selectedProperty.surveyNumber}
                </span>
              </div>
            </div>

            <div className="mt-3 flex justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500 inline-block" /> GPS verified</span>
              <span className="font-semibold text-brand-navy">Bhoomi RTC Verified</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
