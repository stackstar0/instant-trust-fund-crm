import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as useAppStore } from "./app-store-ByBvpnlW.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { _ as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as MapPin, E as Phone, Z as Download, b as Search, f as SquarePen, i as User, j as Lock, u as Trash2, v as ShieldCheck, w as Plus } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, t as Dialog } from "./dialog-DGl8EHd4.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as mockProperties } from "./properties-data-BxsU0__y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.properties-Q5kJ-u3e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function formatINR(val) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0
	}).format(val);
}
function maskName(name) {
	if (!name) return "";
	return name.split(" ").map((w) => {
		if (w.length <= 1) return w;
		return w[0] + "*".repeat(Math.min(w.length - 1, 8));
	}).join(" ");
}
function maskPhone(phone) {
	if (!phone) return "";
	const cleaned = phone.trim();
	if (cleaned.length < 10) return cleaned;
	return cleaned.slice(0, 7) + "*** ***" + cleaned.slice(-2);
}
function AdminPropertiesPage() {
	const { currentUser } = useAppStore();
	if (currentUser?.role === "assistant_admin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/admin/tasks",
		replace: true
	});
	const isSuperAdmin = currentUser?.role === "super_admin";
	const [search, setSearch] = (0, import_react.useState)("");
	const [localProperties, setLocalProperties] = (0, import_react.useState)(mockProperties);
	const filtered = (0, import_react.useMemo)(() => {
		let list = localProperties;
		if (!isSuperAdmin) list = list.filter((p) => p.assignedTo === "Bibi Ayesha");
		const q = search.toLowerCase().trim();
		if (!q) return list;
		return list.filter((p) => {
			return (isSuperAdmin ? p.ownerName.toLowerCase().includes(q) : false) || p.surveyNumber.toLowerCase().includes(q) || p.district.toLowerCase().includes(q) || p.village.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
		});
	}, [
		localProperties,
		search,
		isSuperAdmin
	]);
	const [selectedProperty, setSelectedProperty] = (0, import_react.useState)(null);
	const activeProperty = selectedProperty || filtered[0] || null;
	const [isAddOpen, setIsAddOpen] = (0, import_react.useState)(false);
	const [isEditOpen, setIsEditOpen] = (0, import_react.useState)(false);
	const [formSurvey, setFormSurvey] = (0, import_react.useState)("");
	const [formDistrict, setFormDistrict] = (0, import_react.useState)("Bengaluru Urban");
	const [formTaluk, setFormTaluk] = (0, import_react.useState)("");
	const [formHobli, setFormHobli] = (0, import_react.useState)("");
	const [formVillage, setFormVillage] = (0, import_react.useState)("");
	const [formOwnerName, setFormOwnerName] = (0, import_react.useState)("");
	const [formOwnerPhone, setFormOwnerPhone] = (0, import_react.useState)("");
	const [formOwnerAddress, setFormOwnerAddress] = (0, import_react.useState)("");
	const [formType, setFormType] = (0, import_react.useState)("Agricultural");
	const [formValuation, setFormValuation] = (0, import_react.useState)(12e6);
	const [formLat, setFormLat] = (0, import_react.useState)(13);
	const [formLng, setFormLng] = (0, import_react.useState)(77);
	const [formAssignedTo, setFormAssignedTo] = (0, import_react.useState)("Unassigned");
	const [formAreaAcres, setFormAreaAcres] = (0, import_react.useState)(1);
	const [formAreaGuntas, setFormAreaGuntas] = (0, import_react.useState)(20);
	const toggleStatus = (id) => {
		if (!isSuperAdmin) {
			toast.error("Access Denied", { description: "Only Super Admins can update verification audits." });
			return;
		}
		setLocalProperties((prev) => prev.map((p) => {
			if (p.id === id) {
				const nextStatus = p.status === "Verified" ? "Disputed" : p.status === "Disputed" ? "Pending" : "Verified";
				toast.success(`Property ${p.id} status updated to ${nextStatus}`);
				const updated = {
					...p,
					status: nextStatus
				};
				if (activeProperty?.id === id) setSelectedProperty(updated);
				return updated;
			}
			return p;
		}));
	};
	const handleAssignExecutive = (id, execName) => {
		if (!isSuperAdmin) return;
		setLocalProperties((prev) => prev.map((p) => {
			if (p.id === id) {
				toast.success(`Property ${p.id} assigned to ${execName}`);
				const updated = {
					...p,
					assignedTo: execName
				};
				if (activeProperty?.id === id) setSelectedProperty(updated);
				return updated;
			}
			return p;
		}));
	};
	const handleAddProperty = (e) => {
		e.preventDefault();
		if (!formSurvey || !formVillage || !formOwnerName || !formOwnerPhone) {
			toast.error("Please fill in all required fields.");
			return;
		}
		const newProp = {
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
			internalNotes: "Newly registered broker listing."
		};
		setLocalProperties((prev) => [newProp, ...prev]);
		setSelectedProperty(newProp);
		setIsAddOpen(false);
		toast.success("New property added to Bhoomi portfolio!");
	};
	const handleEditProperty = (e) => {
		e.preventDefault();
		if (!activeProperty) return;
		setLocalProperties((prev) => prev.map((p) => {
			if (p.id === activeProperty.id) {
				const updated = {
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
					areaGuntas: Number(formAreaGuntas)
				};
				setSelectedProperty(updated);
				toast.success("Property details updated successfully!");
				return updated;
			}
			return p;
		}));
		setIsEditOpen(false);
	};
	const handleDeleteProperty = (id) => {
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
		setFormValuation(12e6);
		setFormLat(12.9);
		setFormLng(77.5);
		setFormAssignedTo("Unassigned");
		setFormAreaAcres(1);
		setFormAreaGuntas(20);
		setIsAddOpen(true);
	};
	const triggerCallSimulation = (name, phone) => {
		const finalName = isSuperAdmin ? name : maskName(name);
		const finalPhone = isSuperAdmin ? phone : maskPhone(phone);
		toast.info(`Simulating call connection to owner: ${finalName}`, {
			description: `Dialing: ${finalPhone}...`,
			duration: 3e3
		});
	};
	const triggerSmsSimulation = (name, phone, survey) => {
		const finalName = isSuperAdmin ? name : maskName(name);
		const finalPhone = isSuperAdmin ? phone : maskPhone(phone);
		toast.success(`SMS verification link sent to ${finalName}`, { description: `Target: ${finalPhone}. Message: "Verify your land survey ${survey} on IFY portal."` });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-6 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-black md:text-4xl text-brand-navy",
					children: "Bhoomi Registry & Land Audit"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [isSuperAdmin ? "Super Admin Portal" : "Relationship Officer Panel", " — Manage and audit brokered assets."]
				})] }), isSuperAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "bg-primary hover:bg-brand-navy text-white text-xs font-bold flex items-center gap-1.5 h-9",
					onClick: openAddDialog,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add Property"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-2 space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 border bg-card shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold text-brand-navy",
								children: isSuperAdmin ? "Karnataka Land Registry" : "Assigned Properties"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative max-w-sm w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: isSuperAdmin ? "Search owner name, survey, village..." : "Search survey, village...",
									className: "pl-9",
									value: search,
									onChange: (e) => setSearch(e.target.value)
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-left text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/30",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-3 px-4",
											children: "Survey No & ID"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-3 px-4",
											children: "Location"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-3 px-4",
											children: "Owner Name"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-3 px-4",
											children: "Valuation"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-3 px-4",
											children: "Status"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y",
									children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										colSpan: 5,
										className: "py-8 text-center text-muted-foreground",
										children: "No property deeds found matching search."
									}) }) : filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										onClick: () => setSelectedProperty(p),
										className: `cursor-pointer hover:bg-muted/10 transition ${activeProperty?.id === p.id ? "bg-primary/5 font-medium" : ""}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "py-3.5 px-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-bold text-brand-navy",
													children: p.surveyNumber
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[10px] text-muted-foreground",
													children: p.id
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "py-3.5 px-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-foreground",
													children: p.village
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[11px] text-muted-foreground",
													children: p.district
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3.5 px-4",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "font-semibold text-foreground flex items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3 w-3 text-muted-foreground shrink-0" }), isSuperAdmin ? p.ownerName : maskName(p.ownerName)]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3.5 px-4 text-foreground font-semibold",
												children: formatINR(p.valuation)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3.5 px-4",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
													variant: "outline",
													className: p.status === "Verified" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-bold text-[10px]" : p.status === "Disputed" ? "bg-rose-500/10 text-rose-600 border-rose-500/20 font-bold text-[10px]" : "bg-amber-500/10 text-amber-600 border-amber-500/20 font-bold text-[10px]",
													children: p.status
												})
											})
										]
									}, p.id))
								})]
							})
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-6",
					children: activeProperty ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 border bg-card shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b pb-3 mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold text-brand-navy",
								children: "Land Deed Dossier"
							}), isSuperAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: openEditDialog,
									title: "Edit details",
									className: "p-1 h-7 w-7",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4 text-slate-500 hover:text-primary" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => handleDeleteProperty(activeProperty.id),
									title: "Delete record",
									className: "p-1 h-7 w-7",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-rose-500 hover:text-rose-700" })
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground uppercase tracking-widest font-bold",
										children: "Property Survey ID"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xl font-black text-brand-navy mt-1",
										children: activeProperty.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-sm font-semibold text-muted-foreground mt-0.5",
										children: ["Survey Number: ", activeProperty.surveyNumber]
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-secondary/30 p-4 border border-border/80",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 mb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-bold uppercase tracking-wider text-brand-navy",
												children: "Registered Owner"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-base font-black text-brand-navy",
											children: isSuperAdmin ? activeProperty.ownerName : maskName(activeProperty.ownerName)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 mt-2 text-sm text-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono",
												children: isSuperAdmin ? activeProperty.ownerPhone : maskPhone(activeProperty.ownerPhone)
											})]
										}),
										isSuperAdmin && activeProperty.ownerAddress && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs text-muted-foreground mt-3 pt-2 border-t border-dashed",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-brand-navy block mb-0.5",
												children: "Physical Address:"
											}), activeProperty.ownerAddress]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												className: "flex-1 text-xs bg-primary hover:bg-brand-navy text-white h-8",
												onClick: () => triggerCallSimulation(activeProperty.ownerName, activeProperty.ownerPhone),
												children: "Call Owner"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												variant: "outline",
												className: "flex-1 text-xs h-8",
												onClick: () => triggerSmsSimulation(activeProperty.ownerName, activeProperty.ownerPhone, activeProperty.surveyNumber),
												children: "SMS Link"
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between border-b pb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "District"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-foreground",
												children: activeProperty.district
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between border-b pb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Taluk"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-foreground",
												children: activeProperty.taluk
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between border-b pb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Hobli / Village"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-semibold text-foreground",
												children: [
													activeProperty.hobli,
													" / ",
													activeProperty.village
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between border-b pb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Area Measure"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-semibold text-foreground",
												children: [
													activeProperty.areaAcres,
													" Ac, ",
													activeProperty.areaGuntas,
													" Gt"
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between border-b pb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Land Classification"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "secondary",
												className: "font-bold text-xs",
												children: activeProperty.propertyType
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between border-b pb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Coordinates"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono text-xs text-foreground",
												children: [
													activeProperty.lat,
													", ",
													activeProperty.lng
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center border-b pb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Assigned Executive"
											}), isSuperAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												className: "bg-transparent border rounded px-1.5 py-0.5 text-xs font-semibold focus-visible:outline-none",
												value: activeProperty.assignedTo || "Unassigned",
												onChange: (e) => handleAssignExecutive(activeProperty.id, e.target.value),
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Unassigned",
														children: "Unassigned"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "Bibi Ayesha",
														children: "Bibi Ayesha"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "R H Adhoni",
														children: "R H Adhoni"
													})
												]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-foreground",
												children: activeProperty.assignedTo || "Unassigned"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center pt-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Bhoomi Registry status"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												className: activeProperty.status === "Verified" ? "bg-emerald-500 text-white font-bold" : activeProperty.status === "Disputed" ? "bg-rose-500 text-white font-bold" : "bg-amber-500 text-white font-bold",
												children: activeProperty.status
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-4 border-t space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-bold text-brand-navy",
										children: "Uploaded Documents"
									}), activeProperty.documents && activeProperty.documents.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-1.5",
										children: activeProperty.documents.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between text-xs p-2 border rounded-lg bg-secondary/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium truncate",
												children: doc
											}), isSuperAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												variant: "ghost",
												className: "h-6 w-6 p-0",
												onClick: () => toast.success(`Downloaded: ${doc}`),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5 text-primary" })
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[10px] text-muted-foreground flex items-center gap-0.5 bg-slate-200 px-1 py-0.5 rounded font-bold",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-2.5 w-2.5" }), " Locked"]
											})]
										}, doc))
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground",
										children: "No documents uploaded."
									})]
								}),
								isSuperAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-4 border-t space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										className: "w-full text-xs font-bold flex items-center justify-center gap-2 h-9",
										variant: "outline",
										onClick: () => toggleStatus(activeProperty.id),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-emerald-500" }), " Cycle Audit Verification"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[10px] text-muted-foreground text-center",
										children: [
											"Cycle status between ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold",
												children: "Verified"
											}),
											", ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold",
												children: "Disputed"
											}),
											", and ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold",
												children: "Pending"
											}),
											"."
										]
									})]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 border bg-card shadow-card relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "text-sm font-bold text-brand-navy flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary" }), " Dishank Geo-Parcel Visualization"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-xs text-muted-foreground",
									children: [
										"Lat: ",
										activeProperty.lat,
										", Lng: ",
										activeProperty.lng
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative h-[200px] w-full rounded-lg bg-slate-900 border overflow-hidden flex items-center justify-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute inset-0 opacity-20 pointer-events-none",
										style: {
											backgroundImage: "linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)",
											backgroundSize: "20px 20px"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										className: "absolute inset-0 h-full w-full opacity-60",
										viewBox: "0 0 100 100",
										preserveAspectRatio: "none",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M 0,0 L 40,0 L 35,35 L 0,40 Z",
												fill: "#334155",
												stroke: "#475569",
												strokeWidth: "0.5"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M 40,0 L 100,0 L 100,30 L 70,35 L 35,35 Z",
												fill: "#334155",
												stroke: "#475569",
												strokeWidth: "0.5"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M 0,40 L 35,35 L 45,70 L 0,80 Z",
												fill: "#334155",
												stroke: "#475569",
												strokeWidth: "0.5"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M 70,35 L 100,30 L 100,80 L 80,85 Z",
												fill: "#334155",
												stroke: "#475569",
												strokeWidth: "0.5"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M 35,35 L 70,35 L 80,85 L 45,70 Z",
												fill: activeProperty.status === "Disputed" ? "rgba(239, 68, 68, 0.25)" : "rgba(217, 119, 6, 0.25)",
												stroke: activeProperty.status === "Disputed" ? "#ef4444" : "#d97706",
												strokeWidth: "1.5"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute top-[48%] left-[55%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "rounded-full bg-accent h-6 w-6 flex items-center justify-center shadow-lg border border-white text-[9px] font-black text-accent-foreground",
											children: "★"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "mt-1 font-mono text-[10px] font-bold text-white bg-slate-950/80 px-1.5 py-0.5 rounded border border-white/20",
											children: ["Plot ", activeProperty.surveyNumber]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex justify-between text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-amber-500 inline-block" }), " GPS verified"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-brand-navy",
									children: "Bhoomi RTC Verified"
								})]
							})
						]
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "h-[250px] flex items-center justify-center border border-dashed text-center p-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-sm",
							children: "Select a property registry to view details"
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: isAddOpen,
				onOpenChange: setIsAddOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-[480px] max-h-[85vh] overflow-y-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						className: "text-lg font-black text-brand-navy flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5 text-primary" }), " Register Bhoomi Property"]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleAddProperty,
						className: "space-y-4 pt-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-bold text-brand-navy block mb-1",
									children: "Survey Number *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "e.g. 142/3A",
									value: formSurvey,
									onChange: (e) => setFormSurvey(e.target.value),
									required: true
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-bold text-brand-navy block mb-1",
									children: "Property Type *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs",
									value: formType,
									onChange: (e) => setFormType(e.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Agricultural",
											children: "Agricultural"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Non-Agricultural",
											children: "Non-Agricultural"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Residential",
											children: "Residential"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Commercial",
											children: "Commercial"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Industrial",
											children: "Industrial"
										})
									]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-bold text-brand-navy block mb-1",
									children: "District *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs",
									value: formDistrict,
									onChange: (e) => setFormDistrict(e.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Bengaluru Urban",
											children: "Bengaluru Urban"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Mysuru",
											children: "Mysuru"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Belagavi",
											children: "Belagavi"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Mangaluru (Dakshina Kannada)",
											children: "Mangaluru"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Hubli-Dharwad (Dharwad)",
											children: "Hubli-Dharwad"
										})
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-bold text-brand-navy block mb-1",
									children: "Taluk"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "e.g. Yelahanka",
									value: formTaluk,
									onChange: (e) => setFormTaluk(e.target.value)
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-bold text-brand-navy block mb-1",
									children: "Hobli"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "e.g. Attur",
									value: formHobli,
									onChange: (e) => setFormHobli(e.target.value)
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-bold text-brand-navy block mb-1",
									children: "Village *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "e.g. Harohalli",
									value: formVillage,
									onChange: (e) => setFormVillage(e.target.value),
									required: true
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-bold text-brand-navy block mb-1",
									children: "Area (Acres) *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: formAreaAcres,
									onChange: (e) => setFormAreaAcres(Number(e.target.value)),
									required: true
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-bold text-brand-navy block mb-1",
									children: "Area (Guntas) *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: formAreaGuntas,
									onChange: (e) => setFormAreaGuntas(Number(e.target.value)),
									required: true
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-3 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-bold text-brand-navy block mb-1",
										children: "Valuation (INR) *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										value: formValuation,
										onChange: (e) => setFormValuation(Number(e.target.value)),
										required: true
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-bold text-brand-navy block mb-1",
										children: "Latitude"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										step: "0.0001",
										value: formLat,
										onChange: (e) => setFormLat(Number(e.target.value))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-bold text-brand-navy block mb-1",
										children: "Longitude"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										step: "0.0001",
										value: formLng,
										onChange: (e) => setFormLng(Number(e.target.value))
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t pt-3 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-bold text-brand-navy text-xs",
										children: "Owner & Executive Assignment"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-bold text-brand-navy block mb-1",
										children: "Owner Name *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "e.g. Suresh Gowda",
										value: formOwnerName,
										onChange: (e) => setFormOwnerName(e.target.value),
										required: true
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-bold text-brand-navy block mb-1",
										children: "Owner Mobile *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "e.g. +91 98860 12345",
										value: formOwnerPhone,
										onChange: (e) => setFormOwnerPhone(e.target.value),
										required: true
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-bold text-brand-navy block mb-1",
										children: "Owner Address"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "e.g. 5th Cross, Harohalli, Bengaluru",
										value: formOwnerAddress,
										onChange: (e) => setFormOwnerAddress(e.target.value)
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-bold text-brand-navy block mb-1",
										children: "Assign Executive"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs",
										value: formAssignedTo,
										onChange: (e) => setFormAssignedTo(e.target.value),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Unassigned",
												children: "Unassigned"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Bibi Ayesha",
												children: "Bibi Ayesha"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "R H Adhoni",
												children: "R H Adhoni"
											})
										]
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "w-full bg-primary hover:bg-brand-navy text-white text-xs font-bold mt-2 h-10",
								children: "Submit Registration"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: isEditOpen,
				onOpenChange: setIsEditOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-[480px] max-h-[85vh] overflow-y-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						className: "text-lg font-black text-brand-navy flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-5 w-5 text-primary" }), " Edit Property Details"]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleEditProperty,
						className: "space-y-4 pt-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-bold text-brand-navy block mb-1",
									children: "Survey Number *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "e.g. 142/3A",
									value: formSurvey,
									onChange: (e) => setFormSurvey(e.target.value),
									required: true
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-bold text-brand-navy block mb-1",
									children: "Property Type *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs",
									value: formType,
									onChange: (e) => setFormType(e.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Agricultural",
											children: "Agricultural"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Non-Agricultural",
											children: "Non-Agricultural"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Residential",
											children: "Residential"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Commercial",
											children: "Commercial"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Industrial",
											children: "Industrial"
										})
									]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-bold text-brand-navy block mb-1",
									children: "District *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs",
									value: formDistrict,
									onChange: (e) => setFormDistrict(e.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Bengaluru Urban",
											children: "Bengaluru Urban"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Mysuru",
											children: "Mysuru"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Belagavi",
											children: "Belagavi"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Mangaluru (Dakshina Kannada)",
											children: "Mangaluru"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Hubli-Dharwad (Dharwad)",
											children: "Hubli-Dharwad"
										})
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-bold text-brand-navy block mb-1",
									children: "Taluk"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "e.g. Yelahanka",
									value: formTaluk,
									onChange: (e) => setFormTaluk(e.target.value)
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-bold text-brand-navy block mb-1",
									children: "Hobli"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "e.g. Attur",
									value: formHobli,
									onChange: (e) => setFormHobli(e.target.value)
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-bold text-brand-navy block mb-1",
									children: "Village *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "e.g. Harohalli",
									value: formVillage,
									onChange: (e) => setFormVillage(e.target.value),
									required: true
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-bold text-brand-navy block mb-1",
									children: "Area (Acres) *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: formAreaAcres,
									onChange: (e) => setFormAreaAcres(Number(e.target.value)),
									required: true
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "font-bold text-brand-navy block mb-1",
									children: "Area (Guntas) *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: formAreaGuntas,
									onChange: (e) => setFormAreaGuntas(Number(e.target.value)),
									required: true
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-3 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-bold text-brand-navy block mb-1",
										children: "Valuation (INR) *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										value: formValuation,
										onChange: (e) => setFormValuation(Number(e.target.value)),
										required: true
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-bold text-brand-navy block mb-1",
										children: "Latitude"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										step: "0.0001",
										value: formLat,
										onChange: (e) => setFormLat(Number(e.target.value))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-bold text-brand-navy block mb-1",
										children: "Longitude"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										step: "0.0001",
										value: formLng,
										onChange: (e) => setFormLng(Number(e.target.value))
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t pt-3 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-bold text-brand-navy text-xs",
										children: "Owner & Executive Assignment"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-bold text-brand-navy block mb-1",
										children: "Owner Name *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "e.g. Suresh Gowda",
										value: formOwnerName,
										onChange: (e) => setFormOwnerName(e.target.value),
										required: true
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-bold text-brand-navy block mb-1",
										children: "Owner Mobile *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "e.g. +91 98860 12345",
										value: formOwnerPhone,
										onChange: (e) => setFormOwnerPhone(e.target.value),
										required: true
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-bold text-brand-navy block mb-1",
										children: "Owner Address"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "e.g. 5th Cross, Harohalli, Bengaluru",
										value: formOwnerAddress,
										onChange: (e) => setFormOwnerAddress(e.target.value)
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-bold text-brand-navy block mb-1",
										children: "Assign Executive"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs",
										value: formAssignedTo,
										onChange: (e) => setFormAssignedTo(e.target.value),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Unassigned",
												children: "Unassigned"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Bibi Ayesha",
												children: "Bibi Ayesha"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "R H Adhoni",
												children: "R H Adhoni"
											})
										]
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "w-full bg-primary hover:bg-brand-navy text-white text-xs font-bold mt-2 h-10",
								children: "Save Changes"
							})
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { AdminPropertiesPage as component };
