import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { mockProperties, type MockProperty } from "@/lib/properties-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  CheckCircle2,
  Lock,
  Compass,
  Layers,
  Map,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Bhoomi & Dishank Property Search — Instant Funds" },
      {
        name: "description",
        content: "Search and verify land survey records, check Bhoomi registration details, and view parcel coordinates in Karnataka.",
      },
    ],
  }),
  component: PropertySearchPage,
});

function formatINR(val: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
}

function PropertySearchPage() {
  const [district, setDistrict] = useState("");
  const [taluk, setTaluk] = useState("");
  const [surveyNum, setSurveyNum] = useState("");
  const [searching, setSearching] = useState(false);
  const [foundProperty, setFoundProperty] = useState<MockProperty | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Auto-suggest fields from mock database based on selection
  const districts = useMemo(() => {
    return Array.from(new Set(mockProperties.map((p) => p.district)));
  }, []);

  const taluks = useMemo(() => {
    if (!district) return [];
    return Array.from(
      new Set(mockProperties.filter((p) => p.district === district).map((p) => p.taluk))
    );
  }, [district]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!district || !surveyNum) {
      toast.error("Please fill in District and Survey Number");
      return;
    }

    setSearching(true);
    setFoundProperty(null);
    setHasSearched(false);

    setTimeout(() => {
      const match = mockProperties.find(
        (p) =>
          p.district.toLowerCase() === district.toLowerCase() &&
          p.surveyNumber.toLowerCase() === surveyNum.toLowerCase().trim()
      );
      setFoundProperty(match || null);
      setSearching(false);
      setHasSearched(true);
      if (match) {
        toast.success("Land record located in Bhoomi database!");
      } else {
        toast.error("No record found matching the survey parameters.");
      }
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/30 py-1 px-3 mb-3 text-xs">
          Karnataka Bhoomi & Dishank Integration
        </Badge>
        <h1 className="text-4xl font-black text-brand-navy md:text-5xl">
          Property Land Records Verification
        </h1>
        <p className="mt-3 text-muted-foreground text-sm md:text-base leading-relaxed">
          Verify plot boundaries, survey numbers, Hobli classification, and legal dispute status using Karnataka's open land records standards.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Search Box */}
        <div className="lg:col-span-4">
          <Card className="p-6 border bg-card shadow-card">
            <h3 className="text-lg font-bold text-brand-navy mb-4">Land Record Lookup</h3>
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-brand-navy block mb-1.5">District *</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={district}
                  onChange={(e) => {
                    setDistrict(e.target.value);
                    setTaluk("");
                  }}
                >
                  <option value="">Select District</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-brand-navy block mb-1.5">Taluk (Optional)</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
                  value={taluk}
                  onChange={(e) => setTaluk(e.target.value)}
                  disabled={!district}
                >
                  <option value="">Select Taluk</option>
                  {taluks.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-brand-navy block mb-1.5">Survey Number *</label>
                <Input
                  placeholder="e.g. 142/3A or 88/1"
                  value={surveyNum}
                  onChange={(e) => setSurveyNum(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                disabled={searching}
                className="w-full bg-primary text-primary-foreground hover:bg-brand-navy flex items-center justify-center gap-2"
              >
                {searching ? (
                  "Searching Bhoomi..."
                ) : (
                  <>
                    <Search className="h-4 w-4" /> Fetch Land Record
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 rounded-lg bg-secondary/50 p-4 border border-dashed text-xs text-muted-foreground leading-relaxed">
              <span className="font-bold text-brand-navy block mb-1">💡 Demo parameters to try:</span>
              <ul className="list-disc list-inside space-y-1">
                <li>District: <span className="font-semibold">Bengaluru Urban</span>, Survey: <span className="font-mono bg-white px-1 border rounded">142/3A</span></li>
                <li>District: <span className="font-semibold">Mysuru</span>, Survey: <span className="font-mono bg-white px-1 border rounded">204/C</span></li>
                <li>District: <span className="font-semibold">Mangaluru (Dakshina Kannada)</span>, Survey: <span className="font-mono bg-white px-1 border rounded">77/9</span> <span className="text-rose-500">(Disputed)</span></li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Right Map & Details Panel */}
        <div className="lg:col-span-8 space-y-6">
          {searching ? (
            <Card className="h-[450px] flex items-center justify-center flex-col border">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
              <p className="mt-4 text-sm text-muted-foreground">Connecting to state data exchange node...</p>
            </Card>
          ) : !hasSearched ? (
            <Card className="h-[450px] flex items-center justify-center flex-col border border-dashed bg-muted/20 p-6 text-center">
              <Map className="h-16 w-16 text-muted-foreground opacity-40 mb-4" />
              <h3 className="text-lg font-bold text-brand-navy">No Query Executed</h3>
              <p className="mt-1 text-sm text-muted-foreground max-w-sm">
                Fill in the survey parameters on the left to locate the parcel and inspect ownership status.
              </p>
            </Card>
          ) : !foundProperty ? (
            <Card className="h-[450px] flex items-center justify-center flex-col border border-rose-500/20 bg-rose-500/5 p-6 text-center">
              <AlertTriangle className="h-16 w-16 text-rose-500 mb-4" />
              <h3 className="text-lg font-bold text-rose-700">Record Not Found</h3>
              <p className="mt-1 text-sm text-muted-foreground max-w-md">
                We could not find an active Bhoomi land ledger matching survey number <span className="font-mono font-bold text-foreground">"{surveyNum}"</span> in district <span className="font-bold text-foreground">"{district}"</span>.
              </p>
            </Card>
          ) : (
            <div className="grid gap-6">
              {/* Plot Details Card */}
              <Card className="p-6 border bg-card shadow-card">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4 mb-4">
                  <div>
                    <span className="text-xs text-muted-foreground">Bhoomi Ledger ID: {foundProperty.id}</span>
                    <h3 className="text-xl font-bold text-brand-navy mt-1">Survey No. {foundProperty.surveyNumber}</h3>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      foundProperty.status === "Verified"
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-bold"
                        : foundProperty.status === "Disputed"
                        ? "bg-rose-500/10 text-rose-600 border-rose-500/20 font-bold animate-pulse"
                        : "bg-amber-500/10 text-amber-600 border-amber-500/20 font-bold"
                    }
                  >
                    {foundProperty.status === "Verified" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                    {foundProperty.status} Record
                  </Badge>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 text-sm">
                  <div>
                    <span className="text-muted-foreground block text-xs uppercase tracking-wide">Location Hierarchy</span>
                    <span className="font-semibold text-foreground">
                      {foundProperty.village}, {foundProperty.hobli}, {foundProperty.taluk}, {foundProperty.district}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs uppercase tracking-wide">Total Measure / Area</span>
                    <span className="font-semibold text-foreground">
                      {foundProperty.areaAcres} Acres, {foundProperty.areaGuntas} Guntas
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs uppercase tracking-wide">Land Class</span>
                    <span className="font-semibold text-foreground">{foundProperty.propertyType}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs uppercase tracking-wide">Approx. Valuation</span>
                    <span className="font-semibold text-brand-navy">{formatINR(foundProperty.valuation)}</span>
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-amber-500/5 border border-amber-500/20 p-4 flex gap-3">
                  <Lock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-brand-navy">Owner Identity Shield Active</h4>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      To comply with privacy laws, owner details and contact numbers are hidden in the public lookup. Authorized Instant Trust Fund admins can retrieve complete deeds inside the staff CRM.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Map Canvas Mock */}
              <Card className="p-6 border bg-card shadow-card relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-brand-navy flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" /> Dishank Geo-Parcel Visualization
                  </h4>
                  <span className="font-mono text-xs text-muted-foreground">
                    Lat: {foundProperty.lat}, Lng: {foundProperty.lng}
                  </span>
                </div>

                {/* Map Grid Simulator */}
                <div className="relative h-[250px] w-full rounded-lg bg-slate-900 border overflow-hidden flex items-center justify-center">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                    backgroundImage: "linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                  }} />

                  {/* Survey Parcels Mock Visualizer */}
                  <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Neighbor plots */}
                    <path d="M 0,0 L 40,0 L 35,35 L 0,40 Z" fill="#334155" stroke="#475569" strokeWidth="0.5" />
                    <path d="M 40,0 L 100,0 L 100,30 L 70,35 L 35,35 Z" fill="#334155" stroke="#475569" strokeWidth="0.5" />
                    <path d="M 0,40 L 35,35 L 45,70 L 0,80 Z" fill="#334155" stroke="#475569" strokeWidth="0.5" />
                    <path d="M 70,35 L 100,30 L 100,80 L 80,85 Z" fill="#334155" stroke="#475569" strokeWidth="0.5" />
                    
                    {/* Selected plot (Survey parcel boundary) */}
                    <path
                      d="M 35,35 L 70,35 L 80,85 L 45,70 Z"
                      fill={foundProperty.status === "Disputed" ? "rgba(239, 68, 68, 0.25)" : "rgba(217, 119, 6, 0.25)"}
                      stroke={foundProperty.status === "Disputed" ? "#ef4444" : "#d97706"}
                      strokeWidth="1.5"
                    />
                  </svg>

                  {/* Parcel label */}
                  <div className="absolute top-[48%] left-[55%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="rounded-full bg-accent h-6 w-6 flex items-center justify-center shadow-lg border border-white text-[9px] font-black text-accent-foreground">
                      ★
                    </div>
                    <span className="mt-1 font-mono text-[10px] font-bold text-white bg-slate-950/80 px-1.5 py-0.5 rounded border border-white/20">
                      Plot {foundProperty.surveyNumber}
                    </span>
                  </div>

                  {/* Map overlay controls */}
                  <div className="absolute bottom-3 left-3 flex gap-1 text-[10px] bg-slate-950/80 text-white rounded border border-white/10 p-1">
                    <button className="flex items-center gap-1 px-1.5 py-0.5 bg-primary rounded font-semibold"><Layers className="h-3 w-3" /> Dishank Map</button>
                    <button className="flex items-center gap-1 px-1.5 py-0.5 hover:bg-white/10 rounded"><Compass className="h-3 w-3" /> Satellite</button>
                  </div>

                  <div className="absolute top-3 right-3 text-[10px] bg-slate-950/80 text-white/90 rounded border border-white/10 px-2 py-1 font-semibold">
                    Scale: 1 : 2,500
                  </div>
                </div>

                <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500 inline-block" /> Parcel border high-accuracy GPS verified</span>
                  <span className="font-semibold text-brand-navy">Bhoomi RTC Verified</span>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
