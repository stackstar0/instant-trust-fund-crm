import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as useAppStore } from "./app-store-ByBvpnlW.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as MapPin, L as Info, P as Layers, b as Search, c as TriangleAlert, j as Lock, k as Map, tt as Compass } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, t as Dialog } from "./dialog-DGl8EHd4.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as mockProperties } from "./properties-data-BxsU0__y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/properties-CtFwI5fv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var satellite_map_default = "/assets/satellite_map-DnEgQlmS.png";
function formatINR(val) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0
	}).format(val);
}
function KarnatakaMap({ activeDistrict, onSelectDistrict, properties }) {
	const getCount = (district) => {
		return properties.filter((p) => p.district.toLowerCase().includes(district.toLowerCase().split(" ")[0].toLowerCase())).length;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "relative border bg-slate-950 rounded-2xl p-6 shadow-card overflow-hidden flex flex-col items-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 opacity-10 pointer-events-none",
				style: {
					backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
					backgroundSize: "24px 24px"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full flex items-center justify-between mb-4 border-b border-white/10 pb-3 z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
					className: "text-sm font-black text-white flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map, { className: "h-4 w-4 text-accent" }), " Interactive Karnataka Map"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] text-slate-400",
					children: "Click highlighted districts to filter curated properties"
				})] }), activeDistrict && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					className: "text-accent hover:text-accent-foreground text-[10px] h-6 px-2",
					onClick: () => onSelectDistrict(""),
					children: "Clear Filter"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative w-full max-w-[300px] aspect-[3/4]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					viewBox: "0 0 100 110",
					className: "w-full h-full select-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 22 8 L 38 4 Q 48 8 52 14 L 46 22 L 58 28 L 54 38 L 62 44 L 58 52 L 78 62 L 86 78 L 78 98 Q 62 108 58 104 L 50 102 L 56 88 L 38 88 L 26 80 L 32 62 L 18 52 L 15 36 Z",
						fill: "#1e1b4b",
						stroke: "#312e81",
						strokeWidth: "1.5"
					}), [
						{
							name: "Belagavi",
							displayName: "Belagavi",
							path: "M 22 22 L 35 18 L 32 32 L 18 30 Z",
							center: {
								x: 26,
								y: 25
							}
						},
						{
							name: "Hubli-Dharwad (Dharwad)",
							displayName: "Hubli-Dharwad",
							path: "M 32 32 L 48 30 L 44 45 L 28 42 Z",
							center: {
								x: 38,
								y: 37
							}
						},
						{
							name: "Mangaluru (Dakshina Kannada)",
							displayName: "Mangaluru",
							path: "M 25 58 L 38 56 L 42 70 L 28 72 Z",
							center: {
								x: 33,
								y: 64
							}
						},
						{
							name: "Bengaluru Urban",
							displayName: "Bengaluru Urban",
							path: "M 62 65 L 75 60 L 78 72 L 65 75 Z",
							center: {
								x: 70,
								y: 68
							}
						},
						{
							name: "Mysuru",
							displayName: "Mysuru",
							path: "M 48 72 L 62 70 L 58 88 L 44 85 Z",
							center: {
								x: 53,
								y: 79
							}
						}
					].map((d) => {
						const count = getCount(d.name);
						const isSelected = activeDistrict.toLowerCase().includes(d.name.toLowerCase().split(" ")[0].toLowerCase());
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							className: "cursor-pointer group",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: d.path,
									fill: isSelected ? "#d97706" : "rgba(37, 99, 235, 0.45)",
									stroke: isSelected ? "#f59e0b" : "#3b82f6",
									strokeWidth: "1.2",
									className: "transition-all duration-200 hover:fill-accent/70 hover:stroke-accent",
									onClick: () => onSelectDistrict(d.name)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
									x: d.center.x,
									y: d.center.y,
									textAnchor: "middle",
									className: "fill-white text-[5px] font-black pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity",
									children: d.displayName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: d.center.x,
									cy: d.center.y + 4,
									r: "3.5",
									className: isSelected ? "fill-white" : "fill-accent"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
									x: d.center.x,
									y: d.center.y + 5.2,
									textAnchor: "middle",
									className: "fill-slate-950 text-[4px] font-black pointer-events-none",
									children: count
								})
							]
						}, d.name);
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 w-full flex items-center justify-around text-[10px] text-slate-300 border-t border-white/5 pt-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-blue-600 inline-block" }), " Active"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-amber-500 inline-block" }), " Selected"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-indigo-950 border border-indigo-900 inline-block" }), " Other Regions"]
					})
				]
			})
		]
	});
}
function PropertySearchPage() {
	const navigate = useNavigate();
	const { addApplication, currentUser } = useAppStore();
	const [district, setDistrict] = (0, import_react.useState)("");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [selectedProperty, setSelectedProperty] = (0, import_react.useState)(null);
	const [mapMode, setMapMode] = (0, import_react.useState)("dishank");
	const [priceRange, setPriceRange] = (0, import_react.useState)(3e7);
	const [landClass, setLandClass] = (0, import_react.useState)("All");
	const [isLeadModalOpen, setIsLeadModalOpen] = (0, import_react.useState)(false);
	const [leadName, setLeadName] = (0, import_react.useState)("");
	const [leadPhone, setLeadPhone] = (0, import_react.useState)("");
	const [leadEmail, setLeadEmail] = (0, import_react.useState)("");
	const [leadMsg, setLeadMsg] = (0, import_react.useState)("");
	const handleDistrictSelect = (d) => {
		setDistrict(d);
		setSelectedProperty(null);
	};
	const filteredProperties = (0, import_react.useMemo)(() => {
		return mockProperties.filter((p) => {
			if (district && !p.district.toLowerCase().includes(district.toLowerCase().split(" ")[0].toLowerCase())) return false;
			if (p.valuation > priceRange) return false;
			if (landClass !== "All" && p.propertyType !== landClass) return false;
			if (searchQuery) {
				const q = searchQuery.toLowerCase().trim();
				return p.village.toLowerCase().includes(q) || p.surveyNumber.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.district.toLowerCase().includes(q);
			}
			return true;
		});
	}, [
		district,
		searchQuery,
		priceRange,
		landClass
	]);
	const handleLeadSubmit = (e) => {
		e.preventDefault();
		if (!leadName || !leadPhone) {
			toast.error("Please provide Name and Contact number");
			return;
		}
		addApplication({
			fullName: leadName,
			mobile: leadPhone,
			email: leadEmail || `${leadName.toLowerCase().replace(/\s/g, "")}@example.com`,
			aadhaar: "Not Provided",
			pan: "Not Provided",
			productType: `Property Loan - Survey ${selectedProperty?.surveyNumber}`,
			productKind: "loan",
			amount: selectedProperty ? Math.floor(selectedProperty.valuation * .7) : 5e6,
			branch: selectedProperty?.district || "Bengaluru Urban"
		});
		toast.success("Lead registered successfully!", { description: "Our financial advisor will contact you within 24 hours." });
		setIsLeadModalOpen(false);
		setLeadName("");
		setLeadPhone("");
		setLeadEmail("");
		setLeadMsg("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-6 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center max-w-3xl mx-auto mb-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: "bg-primary/10 text-primary hover:bg-primary/20 border-primary/30 py-1 px-3 mb-3 text-xs font-bold",
						children: "Karnataka Bhoomi & Dishank Integration"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-4xl font-black text-brand-navy md:text-5xl",
						children: "Property Services & Financing"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted-foreground text-sm md:text-base leading-relaxed",
						children: "Browse our active portfolio of brokered and financed land properties in Karnataka. Locate survey boundaries, verify land classifications, and apply for properties loans."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 rounded-xl border bg-amber-50/50 p-3 text-[11.5px] text-amber-800 text-center max-w-xl mx-auto dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-900/30",
						children: "⚠️ **Bhoomi & Dishank Official Source Disclaimer**: Survey record listings and coordinates are simulated for demonstration. Active property title checks rely on official Bhoomi (Karnataka Land Records) credentials and Dishank geo-spatial APIs."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-4 space-y-6",
					children: [currentUser?.role === "assistant_admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 border bg-slate-950 text-white rounded-2xl flex flex-col items-center justify-center min-h-[250px] text-center relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 opacity-5 pointer-events-none",
								style: {
									backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
									backgroundSize: "20px 20px"
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-10 w-10 text-amber-500 mb-3" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-sm font-bold",
								children: "Map View Restricted"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-400 max-w-[200px] mt-1",
								children: "Map visualizations are disabled for Assistant Administrator roles."
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KarnatakaMap, {
						activeDistrict: district,
						onSelectDistrict: handleDistrictSelect,
						properties: mockProperties
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 border bg-card shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-bold text-brand-navy mb-4",
							children: "Filter Properties"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-bold text-brand-navy block mb-1.5",
									children: "Search Query"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "Search Survey No, Village, ID...",
										className: "pl-9",
										value: searchQuery,
										onChange: (e) => setSearchQuery(e.target.value)
									})]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-bold text-brand-navy block mb-1.5",
									children: "Selected District"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
									value: district,
									onChange: (e) => handleDistrictSelect(e.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "All Districts"
										}),
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
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-bold text-brand-navy block mb-1.5",
									children: "Land Class"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none",
									value: landClass,
									onChange: (e) => setLandClass(e.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "All",
											children: "All Types"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Agricultural",
											children: "Agricultural"
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
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-xs font-bold text-brand-navy mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Max Valuation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										children: formatINR(priceRange)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: 1e6,
									max: 1e8,
									step: 1e6,
									value: priceRange,
									onChange: (e) => setPriceRange(Number(e.target.value)),
									className: "w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
								})] })
							]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-8 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 border bg-card shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b pb-4 mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold text-brand-navy",
								children: "IFY Brokerage Portfolio"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "secondary",
								className: "font-bold text-xs",
								children: [filteredProperties.length, " available plots"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 max-h-[220px] overflow-y-auto pr-2",
							children: filteredProperties.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-center py-8 text-muted-foreground text-sm",
								children: "No properties found matching the selected criteria."
							}) : filteredProperties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => setSelectedProperty(p),
								className: `p-4 border rounded-xl cursor-pointer hover:bg-primary/5 transition flex items-center justify-between ${selectedProperty?.id === p.id ? "border-primary bg-primary/5" : "border-border"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-black text-brand-navy text-sm",
									children: [
										"Survey ",
										p.surveyNumber,
										" (",
										p.id,
										")"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: [
										p.village,
										", ",
										p.district
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-primary text-sm",
										children: formatINR(p.valuation)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										className: "text-[10px] mt-0.5 bg-background font-bold",
										children: p.propertyType
									})]
								})]
							}, p.id))
						})]
					}), selectedProperty ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 border bg-card shadow-card relative overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4 mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs text-muted-foreground font-mono",
										children: ["Bhoomi Registry ID: ", selectedProperty.id]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-xl font-bold text-brand-navy mt-1",
										children: ["Survey No. ", selectedProperty.surveyNumber]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										variant: "outline",
										className: selectedProperty.status === "Verified" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-bold" : selectedProperty.status === "Disputed" ? "bg-rose-500/10 text-rose-600 border-rose-500/20 font-bold animate-pulse" : "bg-amber-500/10 text-amber-600 border-amber-500/20 font-bold",
										children: [selectedProperty.status, " Record"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2 text-sm mb-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground block text-xs uppercase tracking-wide",
											children: "Location Hierarchy"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold text-foreground",
											children: [
												selectedProperty.village,
												", ",
												selectedProperty.hobli,
												", ",
												selectedProperty.taluk,
												", ",
												selectedProperty.district
											]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground block text-xs uppercase tracking-wide",
											children: "Total Measure / Area"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold text-foreground",
											children: [
												selectedProperty.areaAcres,
												" Acres, ",
												selectedProperty.areaGuntas,
												" Guntas"
											]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground block text-xs uppercase tracking-wide",
											children: "Land Class"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: selectedProperty.propertyType
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground block text-xs uppercase tracking-wide",
											children: "Approx. Valuation"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-brand-navy",
											children: formatINR(selectedProperty.valuation)
										})] })
									]
								}),
								currentUser?.role === "super_admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-primary/5 border border-primary/20 p-4 mb-6 space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
										className: "text-xs font-bold text-brand-navy flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4 text-primary" }), " Deed Owner Credentials (Super Admin Access)"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-3 sm:grid-cols-2 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-slate-400 block",
												children: "Owner Name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-brand-navy",
												children: selectedProperty.ownerName
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-slate-400 block",
												children: "Phone Number"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-brand-navy",
												children: selectedProperty.ownerPhone
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-slate-400 block",
												children: "Aadhaar ID"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-brand-navy",
												children: selectedProperty.ownerAadhaar || "4290-8812-9023"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-slate-400 block",
												children: "Deed Document No"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-bold text-brand-navy",
												children: ["DOC-RTC-", selectedProperty.id]
											})] })
										]
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-amber-500/5 border border-amber-500/20 p-4 flex gap-3 mb-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-5 w-5 text-amber-500 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-bold text-brand-navy",
										children: "Owner Identity Shield Active"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground mt-0.5",
										children: "To comply with privacy laws, owner details, phone numbers, and physical home addresses are hidden in the public lookup. Authorized CRM representatives can retrieve deed documents internally."
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-secondary/40 border rounded-2xl p-6 text-center space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-sm font-black text-brand-navy",
										children: "Interested in this property? Contact Instant Trust Fund to learn more or apply for a property loan."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap justify-center gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												className: "bg-primary hover:bg-brand-navy text-white text-xs font-bold px-4",
												onClick: () => setIsLeadModalOpen(true),
												children: "Contact Us"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												className: "bg-accent hover:bg-accent/80 text-accent-foreground text-xs font-bold px-4",
												onClick: () => setIsLeadModalOpen(true),
												children: "Request Information"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "outline",
												className: "text-xs font-bold border-primary text-primary hover:bg-primary/5",
												onClick: () => navigate({ to: "/dashboard" }),
												children: "Apply for Property Loan"
											})
										]
									})]
								})
							]
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
											selectedProperty.lat,
											", Lng: ",
											selectedProperty.lng
										]
									})]
								}),
								currentUser?.role === "assistant_admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "h-[250px] w-full rounded-lg bg-slate-900 border flex flex-col items-center justify-center text-center p-6 text-white",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-8 w-8 text-amber-500 mb-2" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-xs font-bold",
											children: "Satellite & Parcel Grid Disabled"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-slate-400 max-w-xs mt-1",
											children: "Official Dishank mapping is restricted for your admin privilege level."
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative h-[250px] w-full rounded-lg bg-slate-900 border overflow-hidden flex items-center justify-center",
									children: [
										mapMode === "satellite" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: satellite_map_default,
											alt: "Satellite View",
											className: "absolute inset-0 h-full w-full object-cover opacity-80"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute inset-0 opacity-20 pointer-events-none",
											style: {
												backgroundImage: "linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)",
												backgroundSize: "20px 20px"
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
											className: "absolute inset-0 h-full w-full opacity-70",
											viewBox: "0 0 100 100",
											preserveAspectRatio: "none",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M 0,0 L 40,0 L 35,35 L 0,40 Z",
													fill: mapMode === "satellite" ? "transparent" : "#334155",
													stroke: mapMode === "satellite" ? "rgba(255,255,255,0.4)" : "#475569",
													strokeWidth: "0.5"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M 40,0 L 100,0 L 100,30 L 70,35 L 35,35 Z",
													fill: mapMode === "satellite" ? "transparent" : "#334155",
													stroke: mapMode === "satellite" ? "rgba(255,255,255,0.4)" : "#475569",
													strokeWidth: "0.5"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M 0,40 L 35,35 L 45,70 L 0,80 Z",
													fill: mapMode === "satellite" ? "transparent" : "#334155",
													stroke: mapMode === "satellite" ? "rgba(255,255,255,0.4)" : "#475569",
													strokeWidth: "0.5"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M 70,35 L 100,30 L 100,80 L 80,85 Z",
													fill: mapMode === "satellite" ? "transparent" : "#334155",
													stroke: mapMode === "satellite" ? "rgba(255,255,255,0.4)" : "#475569",
													strokeWidth: "0.5"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M 35,35 L 70,35 L 80,85 L 45,70 Z",
													fill: selectedProperty.status === "Disputed" ? "rgba(239, 68, 68, 0.25)" : "rgba(217, 119, 6, 0.2)",
													stroke: selectedProperty.status === "Disputed" ? "#ef4444" : "#ffd700",
													strokeWidth: "2"
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
												children: ["Plot ", selectedProperty.surveyNumber]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute bottom-3 left-3 flex gap-1 text-[10px] bg-slate-950/80 text-white rounded border border-white/10 p-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												className: `flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold transition-colors ${mapMode === "dishank" ? "bg-primary text-white" : "hover:bg-white/10 text-white/80"}`,
												onClick: () => setMapMode("dishank"),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-3 w-3" }), " Dishank Map"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												className: `flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold transition-colors ${mapMode === "satellite" ? "bg-primary text-white" : "hover:bg-white/10 text-white/80"}`,
												onClick: () => setMapMode("satellite"),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "h-3 w-3" }), " Satellite"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute top-3 right-3 text-[10px] bg-slate-950/80 text-white/90 rounded border border-white/10 px-2 py-1 font-semibold",
											children: "Scale: 1 : 2,500"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex justify-between text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-amber-500 inline-block" }), " High-accuracy GPS verified"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-brand-navy",
										children: "Bhoomi RTC Verified"
									})]
								})
							]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "h-[350px] flex items-center justify-center flex-col border border-dashed bg-muted/20 p-6 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-16 w-16 text-muted-foreground opacity-40 mb-4" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold text-brand-navy",
								children: "No Property Selected"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground max-w-sm",
								children: "Select a property from the portfolio list or click a highlighted district on the interactive map to start."
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: isLeadModalOpen,
				onOpenChange: setIsLeadModalOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-[420px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						className: "text-lg font-black text-brand-navy flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-5 w-5 text-primary" }), " Request Property Info"]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleLeadSubmit,
						className: "space-y-4 pt-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-secondary/50 p-3 text-xs text-brand-navy border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold",
										children: "Target Plot:"
									}),
									" Survey ",
									selectedProperty?.surveyNumber,
									" (",
									selectedProperty?.id,
									") located at ",
									selectedProperty?.village,
									", ",
									selectedProperty?.district,
									"."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold text-brand-navy block mb-1",
								children: "Full Name *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "e.g. Ramesh Kumar",
								value: leadName,
								onChange: (e) => setLeadName(e.target.value),
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold text-brand-navy block mb-1",
								children: "Mobile Number *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "e.g. +91 98765 43210",
								value: leadPhone,
								onChange: (e) => setLeadPhone(e.target.value),
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold text-brand-navy block mb-1",
								children: "Email Address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "email",
								placeholder: "e.g. ramesh@example.com",
								value: leadEmail,
								onChange: (e) => setLeadEmail(e.target.value)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold text-brand-navy block mb-1",
								children: "Message / Notes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "e.g. Interested in loan options...",
								value: leadMsg,
								onChange: (e) => setLeadMsg(e.target.value)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "w-full bg-primary hover:bg-brand-navy text-white text-xs font-bold mt-2",
								children: "Submit Inquiry"
							})
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { PropertySearchPage as component };
