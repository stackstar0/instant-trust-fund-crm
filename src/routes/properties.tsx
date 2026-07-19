import { useState, useMemo } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { mockProperties, type MockProperty } from "@/lib/properties-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Search,
  MapPin,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  Map,
  AlertTriangle,
  Phone,
  Mail,
  User,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { useAppStore } from "@/lib/app-store";

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

// Stylized Interactive Karnataka SVG Map Component
function KarnatakaMap({
  activeDistrict,
  onSelectDistrict,
  properties
}: {
  activeDistrict: string;
  onSelectDistrict: (d: string) => void;
  properties: MockProperty[];
}) {
  const getCount = (district: string) => {
    return properties.filter(p => p.district.toLowerCase().includes(district.toLowerCase().split(" ")[0].toLowerCase())).length;
  };

  const districts = [
    {
      name: "Belagavi",
      displayName: "Belagavi",
      path: "M 22 22 L 35 18 L 32 32 L 18 30 Z",
      center: { x: 26, y: 25 }
    },
    {
      name: "Hubli-Dharwad (Dharwad)",
      displayName: "Hubli-Dharwad",
      path: "M 32 32 L 48 30 L 44 45 L 28 42 Z",
      center: { x: 38, y: 37 }
    },
    {
      name: "Mangaluru (Dakshina Kannada)",
      displayName: "Mangaluru",
      path: "M 25 58 L 38 56 L 42 70 L 28 72 Z",
      center: { x: 33, y: 64 }
    },
    {
      name: "Bengaluru Urban",
      displayName: "Bengaluru Urban",
      path: "M 62 65 L 75 60 L 78 72 L 65 75 Z",
      center: { x: 70, y: 68 }
    },
    {
      name: "Mysuru",
      displayName: "Mysuru",
      path: "M 48 72 L 62 70 L 58 88 L 44 85 Z",
      center: { x: 53, y: 79 }
    }
  ];

  return (
    <Card className="relative border bg-slate-950 rounded-2xl p-6 shadow-card overflow-hidden flex flex-col items-center">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
        backgroundSize: "24px 24px"
      }} />

      {/* Map Heading */}
      <div className="w-full flex items-center justify-between mb-4 border-b border-white/10 pb-3 z-10">
        <div>
          <h4 className="text-sm font-black text-white flex items-center gap-2">
            <Map className="h-4 w-4 text-accent" /> Interactive Karnataka Map
          </h4>
          <p className="text-[10px] text-slate-400">Click highlighted districts to filter curated properties</p>
        </div>
        {activeDistrict && (
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-accent hover:text-accent-foreground text-[10px] h-6 px-2"
            onClick={() => onSelectDistrict("")}
          >
            Clear Filter
          </Button>
        )}
      </div>

      {/* Map SVG */}
      <div className="relative w-full max-w-[300px] aspect-[3/4]">
        <svg 
          viewBox="0 0 100 110" 
          className="w-full h-full select-none"
        >
          {/* Main State Outline (Background) */}
          <path
            d="M 22 8 L 38 4 Q 48 8 52 14 L 46 22 L 58 28 L 54 38 L 62 44 L 58 52 L 78 62 L 86 78 L 78 98 Q 62 108 58 104 L 50 102 L 56 88 L 38 88 L 26 80 L 32 62 L 18 52 L 15 36 Z"
            fill="#1e1b4b"
            stroke="#312e81"
            strokeWidth="1.5"
          />

          {/* Interactive Active Districts */}
          {districts.map((d) => {
            const count = getCount(d.name);
            const isSelected = activeDistrict.toLowerCase().includes(d.name.toLowerCase().split(" ")[0].toLowerCase());
            return (
              <g key={d.name} className="cursor-pointer group">
                {/* District Path */}
                <path
                  d={d.path}
                  fill={isSelected ? "#d97706" : "rgba(37, 99, 235, 0.45)"}
                  stroke={isSelected ? "#f59e0b" : "#3b82f6"}
                  strokeWidth="1.2"
                  className="transition-all duration-200 hover:fill-accent/70 hover:stroke-accent"
                  onClick={() => onSelectDistrict(d.name)}
                />
                {/* Label text */}
                <text
                  x={d.center.x}
                  y={d.center.y}
                  textAnchor="middle"
                  className="fill-white text-[5px] font-black pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity"
                >
                  {d.displayName}
                </text>
                {/* Count Badge on Map */}
                <circle
                  cx={d.center.x}
                  cy={d.center.y + 4}
                  r="3.5"
                  className={isSelected ? "fill-white" : "fill-accent"}
                />
                <text
                  x={d.center.x}
                  y={d.center.y + 5.2}
                  textAnchor="middle"
                  className="fill-slate-950 text-[4px] font-black pointer-events-none"
                >
                  {count}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-4 w-full flex items-center justify-around text-[10px] text-slate-300 border-t border-white/5 pt-3">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-blue-600 inline-block" /> Active
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-500 inline-block" /> Selected
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-indigo-950 border border-indigo-900 inline-block" /> Other Regions
        </span>
      </div>
    </Card>
  );
}

function PropertySearchPage() {
  const navigate = useNavigate();
  const { addApplication, currentUser } = useAppStore();
  const [district, setDistrict] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<MockProperty | null>(null);
  const [priceRange, setPriceRange] = useState<number>(30000000);
  const [landClass, setLandClass] = useState<string>("All");

  // Lead submission modal state
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadMsg, setLeadMsg] = useState("");

  const handleDistrictSelect = (d: string) => {
    setDistrict(d);
    setSelectedProperty(null);
  };

  // Filter properties based on map district, price, land type and text search
  const filteredProperties = useMemo(() => {
    return mockProperties.filter((p) => {
      // District filter
      if (district && !p.district.toLowerCase().includes(district.toLowerCase().split(" ")[0].toLowerCase())) {
        return false;
      }
      
      // Price filter
      if (p.valuation > priceRange) {
        return false;
      }

      // Land type class filter
      if (landClass !== "All" && p.propertyType !== landClass) {
        return false;
      }

      // Text search (Village, Survey, Property ID)
      if (searchQuery) {
        const q = searchQuery.toLowerCase().trim();
        return (
          p.village.toLowerCase().includes(q) ||
          p.surveyNumber.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          p.district.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [district, searchQuery, priceRange, landClass]);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) {
      toast.error("Please provide Name and Contact number");
      return;
    }

    // Submit lead application
    addApplication({
      fullName: leadName,
      mobile: leadPhone,
      email: leadEmail || `${leadName.toLowerCase().replace(/\s/g, "")}@example.com`,
      aadhaar: "Not Provided",
      pan: "Not Provided",
      productType: `Property Loan - Survey ${selectedProperty?.surveyNumber}`,
      productKind: "loan",
      amount: selectedProperty ? Math.floor(selectedProperty.valuation * 0.7) : 5000000,
      branch: selectedProperty?.district || "Bengaluru Urban",
    });

    toast.success("Lead registered successfully!", {
      description: "Our financial advisor will contact you within 24 hours.",
    });

    setIsLeadModalOpen(false);
    setLeadName("");
    setLeadPhone("");
    setLeadEmail("");
    setLeadMsg("");
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/30 py-1 px-3 mb-3 text-xs font-bold">
          Karnataka Bhoomi & Dishank Integration
        </Badge>
        <h1 className="text-4xl font-black text-brand-navy md:text-5xl">
          Property Services & Financing
        </h1>
        <p className="mt-3 text-muted-foreground text-sm md:text-base leading-relaxed">
          Browse our active portfolio of brokered and financed land properties in Karnataka. Locate survey boundaries, verify land classifications, and apply for properties loans.
        </p>
        <div className="mt-4 rounded-xl border bg-amber-50/50 p-3 text-[11.5px] text-amber-800 text-center max-w-xl mx-auto dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-900/30">
          ⚠️ **Bhoomi & Dishank Official Source Disclaimer**: Survey record listings and coordinates are simulated for demonstration. Active property title checks rely on official Bhoomi (Karnataka Land Records) credentials and Dishank geo-spatial APIs.
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Interactive Map & Directory */}
        <div className="lg:col-span-4 space-y-6">
          {currentUser?.role === "assistant_admin" ? (
            <Card className="p-6 border bg-slate-950 text-white rounded-2xl flex flex-col items-center justify-center min-h-[250px] text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                backgroundSize: "20px 20px"
              }} />
              <AlertTriangle className="h-10 w-10 text-amber-500 mb-3" />
              <h4 className="text-sm font-bold">Map View Restricted</h4>
              <p className="text-xs text-slate-400 max-w-[200px] mt-1">Map visualizations are disabled for Assistant Administrator roles.</p>
            </Card>
          ) : (
            <KarnatakaMap 
              activeDistrict={district} 
              onSelectDistrict={handleDistrictSelect} 
              properties={mockProperties}
            />
          )}

          {/* District & Search Box */}
          <Card className="p-6 border bg-card shadow-card">
            <h3 className="text-sm font-bold text-brand-navy mb-4">Filter Properties</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-brand-navy block mb-1.5">Search Query</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search Survey No, Village, ID..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-brand-navy block mb-1.5">Selected District</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={district}
                  onChange={(e) => handleDistrictSelect(e.target.value)}
                >
                  <option value="">All Districts</option>
                  <option value="Bengaluru Urban">Bengaluru Urban</option>
                  <option value="Mysuru">Mysuru</option>
                  <option value="Belagavi">Belagavi</option>
                  <option value="Mangaluru (Dakshina Kannada)">Mangaluru (DK)</option>
                  <option value="Hubli-Dharwad (Dharwad)">Hubli-Dharwad</option>
                  <option value="Kalaburagi">Kalaburagi</option>
                  <option value="Shivamogga">Shivamogga</option>
                  <option value="Tumakuru">Tumakuru</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-brand-navy block mb-1.5">Land Class</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none"
                  value={landClass}
                  onChange={(e) => setLandClass(e.target.value)}
                >
                  <option value="All">All Types</option>
                  <option value="Agricultural">Agricultural</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-brand-navy mb-1">
                  <span>Max Valuation</span>
                  <span className="text-primary">{formatINR(priceRange)}</span>
                </div>
                <input
                  type="range"
                  min={1000000}
                  max={100000000}
                  step={1000000}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Center/Right Property Details & Selection */}
        <div className="lg:col-span-8 space-y-6">
          {/* Properties List */}
          <Card className="p-6 border bg-card shadow-card">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <h3 className="text-lg font-bold text-brand-navy">IFY Brokerage Portfolio</h3>
              <Badge variant="secondary" className="font-bold text-xs">{filteredProperties.length} available plots</Badge>
            </div>

            <div className="grid gap-3 max-h-[220px] overflow-y-auto pr-2">
              {filteredProperties.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No properties found matching the selected criteria.
                </div>
              ) : (
                filteredProperties.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProperty(p)}
                    className={`p-4 border rounded-xl cursor-pointer hover:bg-primary/5 transition flex items-center justify-between ${
                      selectedProperty?.id === p.id ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <div>
                      <div className="font-black text-brand-navy text-sm">Survey {p.surveyNumber} ({p.id})</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{p.village}, {p.district}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary text-sm">{formatINR(p.valuation)}</div>
                      <Badge variant="outline" className="text-[10px] mt-0.5 bg-background font-bold">{p.propertyType}</Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Details & Map Drawer */}
          {selectedProperty ? (
            <div className="space-y-6">
              <Card className="p-6 border bg-card shadow-card relative overflow-hidden">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4 mb-4">
                  <div>
                    <span className="text-xs text-muted-foreground font-mono">Bhoomi Registry ID: {selectedProperty.id}</span>
                    <h3 className="text-xl font-bold text-brand-navy mt-1">Survey No. {selectedProperty.surveyNumber}</h3>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      selectedProperty.status === "Verified"
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-bold"
                        : selectedProperty.status === "Disputed"
                        ? "bg-rose-500/10 text-rose-600 border-rose-500/20 font-bold animate-pulse"
                        : "bg-amber-500/10 text-amber-600 border-amber-500/20 font-bold"
                    }
                  >
                    {selectedProperty.status} Record
                  </Badge>
                </div>

                {/* Details Grid */}
                <div className="grid gap-4 sm:grid-cols-2 text-sm mb-6">
                  <div>
                    <span className="text-muted-foreground block text-xs uppercase tracking-wide">Location Hierarchy</span>
                    <span className="font-semibold text-foreground">
                      {selectedProperty.village}, {selectedProperty.hobli}, {selectedProperty.taluk}, {selectedProperty.district}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs uppercase tracking-wide">Total Measure / Area</span>
                    <span className="font-semibold text-foreground">
                      {selectedProperty.areaAcres} Acres, {selectedProperty.areaGuntas} Guntas
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs uppercase tracking-wide">Land Class</span>
                    <span className="font-semibold text-foreground">{selectedProperty.propertyType}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs uppercase tracking-wide">Approx. Valuation</span>
                    <span className="font-semibold text-brand-navy">{formatINR(selectedProperty.valuation)}</span>
                  </div>
                </div>

                {/* Owner details restricted strictly to Super Admin (R H Adhoni) */}
                {currentUser?.role === "super_admin" ? (
                  <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 mb-6 space-y-3">
                    <h4 className="text-xs font-bold text-brand-navy flex items-center gap-1.5">
                      <Lock className="h-4 w-4 text-primary" /> Deed Owner Credentials (Super Admin Access)
                    </h4>
                    <div className="grid gap-3 sm:grid-cols-2 text-xs">
                      <div>
                        <span className="text-slate-400 block">Owner Name</span>
                        <span className="font-bold text-brand-navy">{selectedProperty.ownerName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Phone Number</span>
                        <span className="font-bold text-brand-navy">{selectedProperty.ownerPhone}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Aadhaar ID</span>
                        <span className="font-bold text-brand-navy">{(selectedProperty as any).ownerAadhaar || "4290-8812-9023"}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Deed Document No</span>
                        <span className="font-bold text-brand-navy">DOC-RTC-{selectedProperty.id}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Privacy shield notice for public and Bibi Ayesha */
                  <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-4 flex gap-3 mb-6">
                    <Lock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-brand-navy">Owner Identity Shield Active</h4>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        To comply with privacy laws, owner details, phone numbers, and physical home addresses are hidden in the public lookup. Authorized CRM representatives can retrieve deed documents internally.
                      </p>
                    </div>
                  </div>
                )}

                {/* Call-to-action banner & Buttons */}
                <div className="bg-secondary/40 border rounded-2xl p-6 text-center space-y-4">
                  <h4 className="text-sm font-black text-brand-navy">
                    Interested in this property? Contact Instant Trust Fund to learn more or apply for a property loan.
                  </h4>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Button 
                      className="bg-primary hover:bg-brand-navy text-white text-xs font-bold px-4"
                      onClick={() => setIsLeadModalOpen(true)}
                    >
                      Contact Us
                    </Button>
                    <Button 
                      className="bg-accent hover:bg-accent/80 text-accent-foreground text-xs font-bold px-4"
                      onClick={() => setIsLeadModalOpen(true)}
                    >
                      Request Information
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-xs font-bold border-primary text-primary hover:bg-primary/5"
                      onClick={() => navigate({ to: "/dashboard" })}
                    >
                      Apply for Property Loan
                    </Button>
                  </div>
                </div>
              </Card>

              {/* SVG Map Visualization */}
              <Card className="p-6 border bg-card shadow-card relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-brand-navy flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" /> Dishank Geo-Parcel Visualization
                  </h4>
                  <span className="font-mono text-xs text-muted-foreground">
                    Lat: {selectedProperty.lat}, Lng: {selectedProperty.lng}
                  </span>
                </div>

                {currentUser?.role === "assistant_admin" ? (
                  <div className="h-[250px] w-full rounded-lg bg-slate-900 border flex flex-col items-center justify-center text-center p-6 text-white">
                    <AlertTriangle className="h-8 w-8 text-amber-500 mb-2" />
                    <h4 className="text-xs font-bold">Satellite & Parcel Grid Disabled</h4>
                    <p className="text-[10px] text-slate-400 max-w-xs mt-1">Official Dishank mapping is restricted for your admin privilege level.</p>
                  </div>
                ) : (
                  <div className="relative h-[380px] w-full rounded-xl overflow-hidden border border-slate-700">
                    <iframe
                      key={`${selectedProperty.lat}-${selectedProperty.lng}`}
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedProperty.lng - 0.012}%2C${selectedProperty.lat - 0.010}%2C${selectedProperty.lng + 0.012}%2C${selectedProperty.lat + 0.010}&layer=mapnik&marker=${selectedProperty.lat}%2C${selectedProperty.lng}`}
                      className="h-full w-full"
                      style={{ border: 0 }}
                      title={`Map view for Survey ${selectedProperty.surveyNumber}`}
                      loading="lazy"
                      allowFullScreen
                    />
                    {/* Overlay label */}
                    <div className="absolute top-3 left-3 bg-slate-950/90 text-white text-[11px] font-mono rounded-lg px-3 py-2 border border-white/10 backdrop-blur-sm pointer-events-none">
                      <div className="font-bold text-amber-400">📍 Survey {selectedProperty.surveyNumber}</div>
                      <div className="text-slate-300">{selectedProperty.village}, {selectedProperty.district}</div>
                      <div className="text-slate-400 mt-0.5">Lat: {selectedProperty.lat} | Lng: {selectedProperty.lng}</div>
                    </div>
                    <a
                      href={`https://www.openstreetmap.org/?mlat=${selectedProperty.lat}&mlon=${selectedProperty.lng}#map=15/${selectedProperty.lat}/${selectedProperty.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-3 right-3 bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-brand-navy transition-colors"
                    >
                      <ArrowUpRight className="h-3 w-3" /> Open in OpenStreetMap
                    </a>
                  </div>
                )}

                <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500 inline-block" /> High-accuracy GPS verified</span>
                  <span className="font-semibold text-brand-navy">Bhoomi RTC Verified</span>
                </div>
              </Card>
            </div>
          ) : (
            <Card className="h-[350px] flex items-center justify-center flex-col border border-dashed bg-muted/20 p-6 text-center">
              <MapPin className="h-16 w-16 text-muted-foreground opacity-40 mb-4" />
              <h3 className="text-lg font-bold text-brand-navy">No Property Selected</h3>
              <p className="mt-1 text-sm text-muted-foreground max-w-sm">
                Select a property from the portfolio list or click a highlighted district on the interactive map to start.
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Contact Inquiry Lead Capture Modal */}
      <Dialog open={isLeadModalOpen} onOpenChange={setIsLeadModalOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-brand-navy flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" /> Request Property Info
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLeadSubmit} className="space-y-4 pt-2">
            <div className="rounded-lg bg-secondary/50 p-3 text-xs text-brand-navy border">
              <span className="font-bold">Target Plot:</span> Survey {selectedProperty?.surveyNumber} ({selectedProperty?.id}) located at {selectedProperty?.village}, {selectedProperty?.district}.
            </div>
            <div>
              <label className="text-xs font-bold text-brand-navy block mb-1">Full Name *</label>
              <Input
                placeholder="e.g. Ramesh Kumar"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-brand-navy block mb-1">Mobile Number *</label>
              <Input
                placeholder="e.g. +91 98765 43210"
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-brand-navy block mb-1">Email Address</label>
              <Input
                type="email"
                placeholder="e.g. ramesh@example.com"
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-brand-navy block mb-1">Message / Notes</label>
              <Input
                placeholder="e.g. Interested in loan options..."
                value={leadMsg}
                onChange={(e) => setLeadMsg(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-brand-navy text-white text-xs font-bold mt-2">
              Submit Inquiry
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
