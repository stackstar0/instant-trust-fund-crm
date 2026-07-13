import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { mockProperties, type MockProperty } from "@/lib/properties-data";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAppStore } from "@/lib/app-store";
import {
  Search,
  MapPin,
  Phone,
  User,
  ShieldCheck,
  Plus,
  Edit,
  Trash2,
  Lock,
  Download,
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

function maskName(name: string) {
  if (!name) return "";
  return name.split(" ").map((w) => {
    if (w.length <= 1) return w;
    return w[0] + "*".repeat(Math.min(w.length - 1, 8));
  }).join(" ");
}

function maskPhone(phone: string) {
  if (!phone) return "";
  const cleaned = phone.trim();
  if (cleaned.length < 10) return cleaned;
  return cleaned.slice(0, 7) + "*** ***" + cleaned.slice(-2);
}

function AdminPropertiesPage() {
  const { currentUser } = useAppStore();
  const isSuperAdmin = currentUser?.role === "super_admin";

  const [search, setSearch] = useState("");
  const [localProperties, setLocalProperties] = useState<MockProperty[]>(mockProperties);
  
  const filtered = useMemo(() => {
    let list = localProperties;
    
    if (!isSuperAdmin) {
      list = list.filter((p) => p.assignedTo === "Bibi Ayesha");
    }

    const q = search.toLowerCase().trim();
    if (!q) return list;
    
    return list.filter((p) => {
      const nameMatch = isSuperAdmin ? p.ownerName.toLowerCase().includes(q) : false;
      return (
        nameMatch ||
        p.surveyNumber.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.village.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
      );
    });
  }, [localProperties, search, isSuperAdmin]);

  const [selectedProperty, setSelectedProperty] = useState<MockProperty | null>(null);
  const activeProperty = selectedProperty || filtered[0] || null;

  // Dialog State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  // Form fields
  const [formSurvey, setFormSurvey] = useState("");
  const [formDistrict, setFormDistrict] = useState("Bengaluru Urban");
  const [formTaluk, setFormTaluk] = useState("");
  const [formHobli, setFormHobli] = useState("");
  const [formVillage, setFormVillage] = useState("");
  const [formOwnerName, setFormOwnerName] = useState("");
  const [formOwnerPhone, setFormOwnerPhone] = useState("");
  const [formOwnerAddress, setFormOwnerAddress] = useState("");
  const [formType, setFormType] = useState<MockProperty["propertyType"]>("Agricultural");
  const [formValuation, setFormValuation] = useState(12000000);
  const [formLat, setFormLat] = useState(13.0);
  const [formLng, setFormLng] = useState(77.0);
  const [formAssignedTo, setFormAssignedTo] = useState("Unassigned");
  const [formAreaAcres, setFormAreaAcres] = useState(1);
  const [formAreaGuntas, setFormAreaGuntas] = useState(20);

  const toggleStatus = (id: string) => {
    if (!isSuperAdmin) {
      toast.error("Access Denied", { description: "Only Super Admins can update verification audits." });
      return;
    }
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
          if (activeProperty?.id === id) {
            setSelectedProperty(updated);
          }
          return updated;
        }
        return p;
      })
    );
  };

  const handleAssignExecutive = (id: string, execName: string) => {
    if (!isSuperAdmin) return;
    setLocalProperties((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          toast.success(`Property ${p.id} assigned to ${execName}`);
          const updated = { ...p, assignedTo: execName };
          if (activeProperty?.id === id) {
            setSelectedProperty(updated);
          }
          return updated;
        }
        return p;
      })
    );
  };

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formSurvey || !formVillage || !formOwnerName || !formOwnerPhone) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const newProp: MockProperty = {
      id: `PROP-${(100 + localProperties.length + 1).toString().slice(-3)}`,
      surveyNumber: formSurvey,
      district: formDistrict,
      taluk: formTaluk,
      hobli: formHobli,
      village: formVillage,
      ownerName: formOwnerName,
      ownerPhone: formOwnerPhone,
      ownerAddress: formOwnerAddress,
      propertyType: formType,
      valuation: Number(formValuation),
      lat: Number(formLat),
      lng: Number(formLng),
      status: "Pending",
      assignedTo: formAssignedTo,
      areaAcres: Number(formAreaAcres),
      areaGuntas: Number(formAreaGuntas),
      available: true,
      documents: ["RTC_Deed_Temp.pdf"],
      internalNotes: "Newly registered broker listing.",
    };

    setLocalProperties((prev) => [newProp, ...prev]);
    setSelectedProperty(newProp);
    setIsAddOpen(false);
    toast.success("New property added to Bhoomi portfolio!");
  };

  const handleEditProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProperty) return;

    setLocalProperties((prev) =>
      prev.map((p) => {
        if (p.id === activeProperty.id) {
          const updated: MockProperty = {
            ...p,
            surveyNumber: formSurvey,
            district: formDistrict,
            taluk: formTaluk,
            hobli: formHobli,
            village: formVillage,
            ownerName: formOwnerName,
            ownerPhone: formOwnerPhone,
            ownerAddress: formOwnerAddress,
            propertyType: formType,
            valuation: Number(formValuation),
            lat: Number(formLat),
            lng: Number(formLng),
            assignedTo: formAssignedTo,
            areaAcres: Number(formAreaAcres),
            areaGuntas: Number(formAreaGuntas),
          };
          setSelectedProperty(updated);
          toast.success("Property details updated successfully!");
          return updated;
        }
        return p;
      })
    );
    setIsEditOpen(false);
  };

  const handleDeleteProperty = (id: string) => {
    if (!isSuperAdmin) return;
    if (confirm("Are you sure you want to delete this property record?")) {
      setLocalProperties((prev) => prev.filter((p) => p.id !== id));
      setSelectedProperty(null);
      toast.success("Property record deleted.");
    }
  };

  const openEditDialog = () => {
    if (!activeProperty) return;
    setFormSurvey(activeProperty.surveyNumber);
    setFormDistrict(activeProperty.district);
    setFormTaluk(activeProperty.taluk);
    setFormHobli(activeProperty.hobli);
    setFormVillage(activeProperty.village);
    setFormOwnerName(activeProperty.ownerName);
    setFormOwnerPhone(activeProperty.ownerPhone);
    setFormOwnerAddress(activeProperty.ownerAddress || "");
    setFormType(activeProperty.propertyType);
    setFormValuation(activeProperty.valuation);
    setFormLat(activeProperty.lat);
    setFormLng(activeProperty.lng);
    setFormAssignedTo(activeProperty.assignedTo || "Unassigned");
    setFormAreaAcres(activeProperty.areaAcres);
    setFormAreaGuntas(activeProperty.areaGuntas);
    setIsEditOpen(true);
  };

  const openAddDialog = () => {
    setFormSurvey("");
    setFormDistrict("Bengaluru Urban");
    setFormTaluk("");
    setFormHobli("");
    setFormVillage("");
    setFormOwnerName("");
    setFormOwnerPhone("");
    setFormOwnerAddress("");
    setFormType("Agricultural");
    setFormValuation(12000000);
    setFormLat(12.9);
    setFormLng(77.5);
    setFormAssignedTo("Unassigned");
    setFormAreaAcres(1);
    setFormAreaGuntas(20);
    setIsAddOpen(true);
  };

  const triggerCallSimulation = (name: string, phone: string) => {
    const finalName = isSuperAdmin ? name : maskName(name);
    const finalPhone = isSuperAdmin ? phone : maskPhone(phone);
    toast.info(`Simulating call connection to owner: ${finalName}`, {
      description: `Dialing: ${finalPhone}...`,
      duration: 3000,
    });
  };

  const triggerSmsSimulation = (name: string, phone: string, survey: string) => {
    const finalName = isSuperAdmin ? name : maskName(name);
    const finalPhone = isSuperAdmin ? phone : maskPhone(phone);
    toast.success(`SMS verification link sent to ${finalName}`, {
      description: `Target: ${finalPhone}. Message: "Verify your land survey ${survey} on IFY portal."`,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black md:text-4xl text-brand-navy">Bhoomi Registry & Land Audit</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isSuperAdmin ? "Super Admin Portal" : "Relationship Officer Panel"} — Manage and audit brokered assets.
          </p>
        </div>
        {isSuperAdmin && (
          <Button 
            className="bg-primary hover:bg-brand-navy text-white text-xs font-bold flex items-center gap-1.5 h-9"
            onClick={openAddDialog}
          >
            <Plus className="h-4 w-4" /> Add Property
          </Button>
        )}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Left 2 Columns: Directory */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 border bg-card shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h3 className="text-lg font-bold text-brand-navy">
                {isSuperAdmin ? "Karnataka Land Registry" : "Assigned Properties"}
              </h3>
              <div className="relative max-w-sm w-full">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={isSuperAdmin ? "Search owner name, survey, village..." : "Search survey, village..."}
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
                          activeProperty?.id === p.id ? "bg-primary/5 font-medium" : ""
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
                            {isSuperAdmin ? p.ownerName : maskName(p.ownerName)}
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
          {activeProperty ? (
            <>
              <Card className="p-6 border bg-card shadow-card">
                <div className="flex items-center justify-between border-b pb-3 mb-4">
                  <h3 className="text-lg font-bold text-brand-navy">Land Deed Dossier</h3>
                  {isSuperAdmin && (
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={openEditDialog} title="Edit details" className="p-1 h-7 w-7">
                        <Edit className="h-4 w-4 text-slate-500 hover:text-primary" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDeleteProperty(activeProperty.id)} title="Delete record" className="p-1 h-7 w-7">
                        <Trash2 className="h-4 w-4 text-rose-500 hover:text-rose-700" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Property Survey ID</div>
                    <div className="text-xl font-black text-brand-navy mt-1">{activeProperty.id}</div>
                    <div className="text-sm font-semibold text-muted-foreground mt-0.5">Survey Number: {activeProperty.surveyNumber}</div>
                  </div>

                  {/* Owner Info block */}
                  <div className="rounded-xl bg-secondary/30 p-4 border border-border/80">
                    <div className="flex items-center gap-2 mb-3">
                      <User className="h-4 w-4 text-primary" />
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">Registered Owner</span>
                    </div>
                    <div className="text-base font-black text-brand-navy">
                      {isSuperAdmin ? activeProperty.ownerName : maskName(activeProperty.ownerName)}
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-sm text-foreground">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-mono">
                        {isSuperAdmin ? activeProperty.ownerPhone : maskPhone(activeProperty.ownerPhone)}
                      </span>
                    </div>

                    {isSuperAdmin && activeProperty.ownerAddress && (
                      <div className="text-xs text-muted-foreground mt-3 pt-2 border-t border-dashed">
                        <span className="font-bold text-brand-navy block mb-0.5">Physical Address:</span>
                        {activeProperty.ownerAddress}
                      </div>
                    )}

                    <div className="mt-4 flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 text-xs bg-primary hover:bg-brand-navy text-white h-8"
                        onClick={() => triggerCallSimulation(activeProperty.ownerName, activeProperty.ownerPhone)}
                      >
                        Call Owner
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs h-8"
                        onClick={() => triggerSmsSimulation(activeProperty.ownerName, activeProperty.ownerPhone, activeProperty.surveyNumber)}
                      >
                        SMS Link
                      </Button>
                    </div>
                  </div>

                  {/* Geographic Details */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">District</span>
                      <span className="font-semibold text-foreground">{activeProperty.district}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Taluk</span>
                      <span className="font-semibold text-foreground">{activeProperty.taluk}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Hobli / Village</span>
                      <span className="font-semibold text-foreground">
                        {activeProperty.hobli} / {activeProperty.village}
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Area Measure</span>
                      <span className="font-semibold text-foreground">
                        {activeProperty.areaAcres} Ac, {activeProperty.areaGuntas} Gt
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Land Classification</span>
                      <Badge variant="secondary" className="font-bold text-xs">{activeProperty.propertyType}</Badge>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Coordinates</span>
                      <span className="font-mono text-xs text-foreground">
                        {activeProperty.lat}, {activeProperty.lng}
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-muted-foreground">Assigned Executive</span>
                      {isSuperAdmin ? (
                        <select
                          className="bg-transparent border rounded px-1.5 py-0.5 text-xs font-semibold focus-visible:outline-none"
                          value={activeProperty.assignedTo || "Unassigned"}
                          onChange={(e) => handleAssignExecutive(activeProperty.id, e.target.value)}
                        >
                          <option value="Unassigned">Unassigned</option>
                          <option value="Bibi Ayesha">Bibi Ayesha</option>
                          <option value="R H Adhoni">R H Adhoni</option>
                        </select>
                      ) : (
                        <span className="font-semibold text-foreground">{activeProperty.assignedTo || "Unassigned"}</span>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-muted-foreground">Bhoomi Registry status</span>
                      <Badge
                        className={
                          activeProperty.status === "Verified"
                            ? "bg-emerald-500 text-white font-bold"
                            : activeProperty.status === "Disputed"
                            ? "bg-rose-500 text-white font-bold"
                            : "bg-amber-500 text-white font-bold"
                        }
                      >
                        {activeProperty.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Documents Section */}
                  <div className="pt-4 border-t space-y-3">
                    <h4 className="text-xs font-bold text-brand-navy">Uploaded Documents</h4>
                    {activeProperty.documents && activeProperty.documents.length > 0 ? (
                      <div className="space-y-1.5">
                        {activeProperty.documents.map((doc) => (
                          <div key={doc} className="flex items-center justify-between text-xs p-2 border rounded-lg bg-secondary/20">
                            <span className="font-medium truncate">{doc}</span>
                            {isSuperAdmin ? (
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-6 w-6 p-0"
                                onClick={() => toast.success(`Downloaded: ${doc}`)}
                              >
                                <Download className="h-3.5 w-3.5 text-primary" />
                              </Button>
                            ) : (
                              <span className="text-[10px] text-muted-foreground flex items-center gap-0.5 bg-slate-200 px-1 py-0.5 rounded font-bold">
                                <Lock className="h-2.5 w-2.5" /> Locked
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-muted-foreground">No documents uploaded.</p>
                    )}
                  </div>

                  {/* Action Toggles for Super Admin */}
                  {isSuperAdmin && (
                    <div className="pt-4 border-t space-y-2">
                      <Button
                        className="w-full text-xs font-bold flex items-center justify-center gap-2 h-9"
                        variant="outline"
                        onClick={() => toggleStatus(activeProperty.id)}
                      >
                        <ShieldCheck className="h-4 w-4 text-emerald-500" /> Cycle Audit Verification
                      </Button>
                      <p className="text-[10px] text-muted-foreground text-center">
                        Cycle status between <span className="font-bold">Verified</span>, <span className="font-bold">Disputed</span>, and <span className="font-bold">Pending</span>.
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Dishank Geo-Parcel Visualization Map */}
              <Card className="p-6 border bg-card shadow-card relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-brand-navy flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" /> Dishank Geo-Parcel Visualization
                  </h4>
                  <span className="font-mono text-xs text-muted-foreground">
                    Lat: {activeProperty.lat}, Lng: {activeProperty.lng}
                  </span>
                </div>

                <div className="relative h-[200px] w-full rounded-lg bg-slate-900 border overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                    backgroundImage: "linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                  }} />

                  <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M 0,0 L 40,0 L 35,35 L 0,40 Z" fill="#334155" stroke="#475569" strokeWidth="0.5" />
                    <path d="M 40,0 L 100,0 L 100,30 L 70,35 L 35,35 Z" fill="#334155" stroke="#475569" strokeWidth="0.5" />
                    <path d="M 0,40 L 35,35 L 45,70 L 0,80 Z" fill="#334155" stroke="#475569" strokeWidth="0.5" />
                    <path d="M 70,35 L 100,30 L 100,80 L 80,85 Z" fill="#334155" stroke="#475569" strokeWidth="0.5" />
                    
                    <path
                      d="M 35,35 L 70,35 L 80,85 L 45,70 Z"
                      fill={activeProperty.status === "Disputed" ? "rgba(239, 68, 68, 0.25)" : "rgba(217, 119, 6, 0.25)"}
                      stroke={activeProperty.status === "Disputed" ? "#ef4444" : "#d97706"}
                      strokeWidth="1.5"
                    />
                  </svg>

                  <div className="absolute top-[48%] left-[55%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="rounded-full bg-accent h-6 w-6 flex items-center justify-center shadow-lg border border-white text-[9px] font-black text-accent-foreground">
                      ★
                    </div>
                    <span className="mt-1 font-mono text-[10px] font-bold text-white bg-slate-950/80 px-1.5 py-0.5 rounded border border-white/20">
                      Plot {activeProperty.surveyNumber}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-500 inline-block" /> GPS verified</span>
                  <span className="font-semibold text-brand-navy">Bhoomi RTC Verified</span>
                </div>
              </Card>
            </>
          ) : (
            <Card className="h-[250px] flex items-center justify-center border border-dashed text-center p-6">
              <p className="text-muted-foreground text-sm">Select a property registry to view details</p>
            </Card>
          )}
        </div>
      </div>

      {/* Add Property Dialog Form */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[480px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-brand-navy flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" /> Register Bhoomi Property
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddProperty} className="space-y-4 pt-2 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-brand-navy block mb-1">Survey Number *</label>
                <Input placeholder="e.g. 142/3A" value={formSurvey} onChange={(e) => setFormSurvey(e.target.value)} required />
              </div>
              <div>
                <label className="font-bold text-brand-navy block mb-1">Property Type *</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs" value={formType} onChange={(e) => setFormType(e.target.value as any)}>
                  <option value="Agricultural">Agricultural</option>
                  <option value="Non-Agricultural">Non-Agricultural</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-brand-navy block mb-1">District *</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs" value={formDistrict} onChange={(e) => setFormDistrict(e.target.value)}>
                  <option value="Bengaluru Urban">Bengaluru Urban</option>
                  <option value="Mysuru">Mysuru</option>
                  <option value="Belagavi">Belagavi</option>
                  <option value="Mangaluru (Dakshina Kannada)">Mangaluru</option>
                  <option value="Hubli-Dharwad (Dharwad)">Hubli-Dharwad</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-brand-navy block mb-1">Taluk</label>
                <Input placeholder="e.g. Yelahanka" value={formTaluk} onChange={(e) => setFormTaluk(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-brand-navy block mb-1">Hobli</label>
                <Input placeholder="e.g. Attur" value={formHobli} onChange={(e) => setFormHobli(e.target.value)} />
              </div>
              <div>
                <label className="font-bold text-brand-navy block mb-1">Village *</label>
                <Input placeholder="e.g. Harohalli" value={formVillage} onChange={(e) => setFormVillage(e.target.value)} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-brand-navy block mb-1">Area (Acres) *</label>
                <Input type="number" value={formAreaAcres} onChange={(e) => setFormAreaAcres(Number(e.target.value))} required />
              </div>
              <div>
                <label className="font-bold text-brand-navy block mb-1">Area (Guntas) *</label>
                <Input type="number" value={formAreaGuntas} onChange={(e) => setFormAreaGuntas(Number(e.target.value))} required />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-brand-navy block mb-1">Valuation (INR) *</label>
                <Input type="number" value={formValuation} onChange={(e) => setFormValuation(Number(e.target.value))} required />
              </div>
              <div>
                <label className="font-bold text-brand-navy block mb-1">Latitude</label>
                <Input type="number" step="0.0001" value={formLat} onChange={(e) => setFormLat(Number(e.target.value))} />
              </div>
              <div>
                <label className="font-bold text-brand-navy block mb-1">Longitude</label>
                <Input type="number" step="0.0001" value={formLng} onChange={(e) => setFormLng(Number(e.target.value))} />
              </div>
            </div>

            <div className="border-t pt-3 space-y-3">
              <h4 className="font-bold text-brand-navy text-xs">Owner & Executive Assignment</h4>
              <div>
                <label className="font-bold text-brand-navy block mb-1">Owner Name *</label>
                <Input placeholder="e.g. Suresh Gowda" value={formOwnerName} onChange={(e) => setFormOwnerName(e.target.value)} required />
              </div>
              <div>
                <label className="font-bold text-brand-navy block mb-1">Owner Mobile *</label>
                <Input placeholder="e.g. +91 98860 12345" value={formOwnerPhone} onChange={(e) => setFormOwnerPhone(e.target.value)} required />
              </div>
              <div>
                <label className="font-bold text-brand-navy block mb-1">Owner Address</label>
                <Input placeholder="e.g. 5th Cross, Harohalli, Bengaluru" value={formOwnerAddress} onChange={(e) => setFormOwnerAddress(e.target.value)} />
              </div>
              <div>
                <label className="font-bold text-brand-navy block mb-1">Assign Executive</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs" value={formAssignedTo} onChange={(e) => setFormAssignedTo(e.target.value)}>
                  <option value="Unassigned">Unassigned</option>
                  <option value="Bibi Ayesha">Bibi Ayesha</option>
                  <option value="R H Adhoni">R H Adhoni</option>
                </select>
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-brand-navy text-white text-xs font-bold mt-2 h-10">
              Submit Registration
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Property Dialog Form */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[480px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-black text-brand-navy flex items-center gap-2">
              <Edit className="h-5 w-5 text-primary" /> Edit Property Details
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditProperty} className="space-y-4 pt-2 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-brand-navy block mb-1">Survey Number *</label>
                <Input placeholder="e.g. 142/3A" value={formSurvey} onChange={(e) => setFormSurvey(e.target.value)} required />
              </div>
              <div>
                <label className="font-bold text-brand-navy block mb-1">Property Type *</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs" value={formType} onChange={(e) => setFormType(e.target.value as any)}>
                  <option value="Agricultural">Agricultural</option>
                  <option value="Non-Agricultural">Non-Agricultural</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-brand-navy block mb-1">District *</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs" value={formDistrict} onChange={(e) => setFormDistrict(e.target.value)}>
                  <option value="Bengaluru Urban">Bengaluru Urban</option>
                  <option value="Mysuru">Mysuru</option>
                  <option value="Belagavi">Belagavi</option>
                  <option value="Mangaluru (Dakshina Kannada)">Mangaluru</option>
                  <option value="Hubli-Dharwad (Dharwad)">Hubli-Dharwad</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-brand-navy block mb-1">Taluk</label>
                <Input placeholder="e.g. Yelahanka" value={formTaluk} onChange={(e) => setFormTaluk(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-brand-navy block mb-1">Hobli</label>
                <Input placeholder="e.g. Attur" value={formHobli} onChange={(e) => setFormHobli(e.target.value)} />
              </div>
              <div>
                <label className="font-bold text-brand-navy block mb-1">Village *</label>
                <Input placeholder="e.g. Harohalli" value={formVillage} onChange={(e) => setFormVillage(e.target.value)} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-brand-navy block mb-1">Area (Acres) *</label>
                <Input type="number" value={formAreaAcres} onChange={(e) => setFormAreaAcres(Number(e.target.value))} required />
              </div>
              <div>
                <label className="font-bold text-brand-navy block mb-1">Area (Guntas) *</label>
                <Input type="number" value={formAreaGuntas} onChange={(e) => setFormAreaGuntas(Number(e.target.value))} required />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-brand-navy block mb-1">Valuation (INR) *</label>
                <Input type="number" value={formValuation} onChange={(e) => setFormValuation(Number(e.target.value))} required />
              </div>
              <div>
                <label className="font-bold text-brand-navy block mb-1">Latitude</label>
                <Input type="number" step="0.0001" value={formLat} onChange={(e) => setFormLat(Number(e.target.value))} />
              </div>
              <div>
                <label className="font-bold text-brand-navy block mb-1">Longitude</label>
                <Input type="number" step="0.0001" value={formLng} onChange={(e) => setFormLng(Number(e.target.value))} />
              </div>
            </div>

            <div className="border-t pt-3 space-y-3">
              <h4 className="font-bold text-brand-navy text-xs">Owner & Executive Assignment</h4>
              <div>
                <label className="font-bold text-brand-navy block mb-1">Owner Name *</label>
                <Input placeholder="e.g. Suresh Gowda" value={formOwnerName} onChange={(e) => setFormOwnerName(e.target.value)} required />
              </div>
              <div>
                <label className="font-bold text-brand-navy block mb-1">Owner Mobile *</label>
                <Input placeholder="e.g. +91 98860 12345" value={formOwnerPhone} onChange={(e) => setFormOwnerPhone(e.target.value)} required />
              </div>
              <div>
                <label className="font-bold text-brand-navy block mb-1">Owner Address</label>
                <Input placeholder="e.g. 5th Cross, Harohalli, Bengaluru" value={formOwnerAddress} onChange={(e) => setFormOwnerAddress(e.target.value)} />
              </div>
              <div>
                <label className="font-bold text-brand-navy block mb-1">Assign Executive</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs" value={formAssignedTo} onChange={(e) => setFormAssignedTo(e.target.value)}>
                  <option value="Unassigned">Unassigned</option>
                  <option value="Bibi Ayesha">Bibi Ayesha</option>
                  <option value="R H Adhoni">R H Adhoni</option>
                </select>
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-brand-navy text-white text-xs font-bold mt-2 h-10">
              Save Changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
