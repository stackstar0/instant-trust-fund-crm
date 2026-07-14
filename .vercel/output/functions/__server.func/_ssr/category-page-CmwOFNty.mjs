import { i as __toESM } from "../_runtime.mjs";
import { a as loans, i as insurance, t as findCatalogItem } from "./catalog-BNgltH_A.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as Trigger2, i as Root2, n as Header, r as Item, t as Content2, v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as useAppStore, r as inr } from "./app-store-ByBvpnlW.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Heart, G as FileText, H as GraduationCap, M as LoaderCircle, R as IndianRupee, Y as FileCheckCorner, _ as Shield, _t as Briefcase, at as CircleCheck, bt as ArrowRight, h as Sparkles, l as TrendingUp, nt as Clock, pt as Car, r as Users, tt as Compass, ut as ChevronDown, v as ShieldCheck, z as House } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, r as DialogDescription, t as Dialog } from "./dialog-DGl8EHd4.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { n as objectType, r as stringType, t as literalType } from "../_libs/zod.mjs";
import { n as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/radix-ui__react-slider.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/category-page-CmwOFNty.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var schema = objectType({
	fullName: stringType().trim().min(2, "Enter full name").max(80),
	mobile: stringType().trim().regex(/^[+\d\s-]{10,15}$/, "Enter a valid mobile number"),
	email: stringType().trim().email("Invalid email").max(120),
	aadhaar: stringType().trim().regex(/^\d{4}\s?\d{4}\s?\d{4}$/, "12-digit Aadhaar"),
	pan: stringType().trim().regex(/^[A-Za-z]{5}\d{4}[A-Za-z]$/, "Invalid PAN (e.g. ABCDE1234F)"),
	address: stringType().trim().min(6, "Enter address").max(200).optional().or(literalType("")),
	occupation: stringType().trim().max(60).optional().or(literalType("")),
	income: stringType().trim().max(20).optional().or(literalType("")),
	amount: stringType().trim().max(20).optional().or(literalType("")),
	branch: stringType().trim().max(80).optional().or(literalType("")),
	bank: stringType().trim().optional().or(literalType("")),
	insuranceType: stringType().trim().optional().or(literalType("")),
	referralCode: stringType().trim().optional().or(literalType(""))
});
function ApplyDialog({ productName, productKind, children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [success, setSuccess] = (0, import_react.useState)(null);
	const [uploadedDocs, setUploadedDocs] = (0, import_react.useState)([]);
	const { addApplication } = useAppStore();
	const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: u(schema) });
	const simulateUpload = (doc) => {
		if (!uploadedDocs.includes(doc)) {
			setUploadedDocs((prev) => [...prev, doc]);
			toast.success(`${doc.replace(/_/g, " ")} simulated successfully!`);
		} else {
			setUploadedDocs((prev) => prev.filter((d) => d !== doc));
			toast.info(`Removed ${doc.replace(/_/g, " ")}`);
		}
	};
	const onSubmit = async (data) => {
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
			bank: productKind === "loan" ? data.bank || "SBI" : void 0,
			insuranceType: productKind === "insurance" ? data.insuranceType || "Health Plan" : void 0,
			referralCode: data.referralCode || void 0,
			documents: uploadedDocs.length > 0 ? uploadedDocs : ["Aadhaar_Card.pdf", "PAN_Card.pdf"]
		});
		setSubmitting(false);
		setSuccess({ id: created.id });
		toast.success("Application submitted", { description: `Reference: ${created.id}` });
	};
	const handleClose = (isOpen) => {
		setOpen(isOpen);
		if (!isOpen) {
			setSuccess(null);
			setUploadedDocs([]);
			reset();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: handleClose,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "lg",
				className: "bg-primary text-primary-foreground hover:bg-brand-navy",
				children: "Apply Now"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[92vh] max-w-2xl overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: ["Apply for ", productName] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Fill in your details — one of our advisors will call you back within 24 hours. All fields are securely stored (demo)." })] }), success ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center py-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-16 w-16 text-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-4 text-xl font-bold",
						children: "Application submitted!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: [
							"Your reference number is",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono font-semibold text-foreground",
								children: success.id
							}),
							". Track its status in the Customer Dashboard or Admin CRM."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => handleClose(false),
							children: "Close"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								setSuccess(null);
								setUploadedDocs([]);
								reset();
							},
							children: "Submit another"
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "grid gap-4 sm:grid-cols-2",
				onSubmit: handleSubmit(onSubmit),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "fullName",
								children: "Full Name *"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "fullName",
								placeholder: "As per Aadhaar",
								...register("fullName")
							}),
							errors.fullName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-destructive",
								children: errors.fullName.message
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "mobile",
							children: "Mobile Number *"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "mobile",
							placeholder: "+91 98765 43210",
							...register("mobile")
						}),
						errors.mobile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-destructive",
							children: errors.mobile.message
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "email",
							children: "Email Address *"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "email",
							type: "email",
							placeholder: "you@example.com",
							...register("email")
						}),
						errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-destructive",
							children: errors.email.message
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "aadhaar",
							children: "Aadhaar Number *"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "aadhaar",
							placeholder: "1234 5678 9012",
							...register("aadhaar")
						}),
						errors.aadhaar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-destructive",
							children: errors.aadhaar.message
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "pan",
							children: "PAN Number *"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "pan",
							placeholder: "ABCDE1234F",
							...register("pan"),
							className: "uppercase"
						}),
						errors.pan && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-destructive",
							children: errors.pan.message
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "address",
							children: "Address"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "address",
							rows: 2,
							placeholder: "Full address",
							...register("address")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "occupation",
						children: "Occupation"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "occupation",
						placeholder: "Salaried / Business / Student",
						...register("occupation")
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "income",
						children: "Annual Income (₹)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "income",
						placeholder: "e.g. 8,50,000",
						...register("income")
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "amount",
						children: productKind === "insurance" ? "Sum Assured (₹)" : "Loan Amount (₹)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "amount",
						placeholder: "e.g. 25,00,000",
						...register("amount")
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "branch",
						children: "Preferred Branch"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "branch",
						placeholder: "e.g. Mumbai Fort",
						...register("branch")
					})] }),
					productKind === "loan" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "bank",
						children: "Preferred Lender Bank *"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						id: "bank",
						className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
						...register("bank"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "SBI",
								children: "State Bank of India (SBI)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "HDFC Bank",
								children: "HDFC Bank"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ICICI Bank",
								children: "ICICI Bank"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Axis Bank",
								children: "Axis Bank"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "LIC Housing Finance",
								children: "LIC Housing Finance"
							})
						]
					})] }),
					productKind === "insurance" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "insuranceType",
						children: "Coverage Term / Plan Type *"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						id: "insuranceType",
						className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
						...register("insuranceType"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Term Life",
								children: "Term Life Plan"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Health Plan",
								children: "Health Plan Cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Motor Guard",
								children: "Motor Guard Policy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Travel Protect",
								children: "Travel Protect Plan"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "Commercial Property",
								children: "Commercial Property Protect"
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "referralCode",
						children: "Referral Code (Optional)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "referralCode",
						placeholder: "e.g. REF-101",
						...register("referralCode"),
						className: "uppercase"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2 mt-2 rounded-xl bg-muted/60 p-4 border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-brand-navy block mb-2",
								children: "Simulate Document Uploads"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground mb-3",
								children: "Click each checklist document to simulate uploading it. Green indicates attached."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									{
										name: "Aadhaar_Card.pdf",
										label: "Aadhaar Card"
									},
									{
										name: "PAN_Card.pdf",
										label: "PAN Card"
									},
									{
										name: "Income_Proof.pdf",
										label: "Income Statement / Salary slip"
									},
									{
										name: "Property_Title.pdf",
										label: "Property Deeds (optional)"
									}
								].map((doc) => {
									const isUploaded = uploadedDocs.includes(doc.name);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: isUploaded ? "default" : "outline",
										size: "sm",
										onClick: () => simulateUpload(doc.name),
										className: "text-xs flex items-center gap-1.5 h-8",
										children: [isUploaded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }), doc.label]
									}, doc.name);
								})
							}),
							uploadedDocs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 pt-3 border-t text-[11px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold text-brand-navy",
									children: [
										"Uploaded files (",
										uploadedDocs.length,
										"):"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "list-disc list-inside mt-1 font-mono text-muted-foreground",
									children: uploadedDocs.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: doc }, doc))
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2 flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: () => handleClose(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: submitting,
							className: "bg-primary hover:bg-brand-navy",
							children: submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), " Submitting..."] }) : "Submit Application"
						})]
					})
				]
			})]
		})]
	});
}
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = Slider$1.displayName;
function EmiCalculator({ defaultAmount = 25e5, defaultRate = 8.5, defaultYears = 20 }) {
	const [amount, setAmount] = (0, import_react.useState)(defaultAmount);
	const [rate, setRate] = (0, import_react.useState)(defaultRate);
	const [years, setYears] = (0, import_react.useState)(defaultYears);
	const { emi, totalInterest, totalPay } = (0, import_react.useMemo)(() => {
		const n = years * 12;
		const r = rate / 12 / 100;
		const emi = r === 0 ? amount / n : amount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
		const totalPay = emi * n;
		return {
			emi,
			totalInterest: totalPay - amount,
			totalPay
		};
	}, [
		amount,
		rate,
		years
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "grid gap-6 p-6 md:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "font-medium",
						children: "Loan Amount"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-primary",
						children: inr(amount)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					value: [amount],
					min: 5e4,
					max: 2e7,
					step: 5e4,
					onValueChange: ([v]) => setAmount(v),
					className: "mt-3"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "font-medium",
						children: "Interest Rate (% p.a.)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-semibold text-primary",
						children: [rate.toFixed(2), "%"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					value: [rate],
					min: 6,
					max: 22,
					step: .1,
					onValueChange: ([v]) => setRate(v),
					className: "mt-3"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "font-medium",
						children: "Tenure (years)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-semibold text-primary",
						children: [years, " yrs"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
					value: [years],
					min: 1,
					max: 30,
					step: 1,
					onValueChange: ([v]) => setYears(v),
					className: "mt-3"
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid content-center gap-3 rounded-xl bg-brand-gradient p-6 text-white",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-wider text-white/70",
					children: "Monthly EMI"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-4xl font-black",
					children: inr(Math.round(emi))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3 border-t border-white/20 pt-4 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-white/70",
						children: "Total Interest"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-semibold",
						children: inr(Math.round(totalInterest))
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-white/70",
						children: "Total Payable"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-semibold",
						children: inr(Math.round(totalPay))
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-white/70",
					children: "Indicative EMI for demo purposes; actual EMI depends on bank policy."
				})
			]
		})]
	});
}
function AgeCalculator() {
	const [age, setAge] = (0, import_react.useState)(30);
	const presets = [
		{
			label: "Student",
			age: 19
		},
		{
			label: "Young Pro",
			age: 24
		},
		{
			label: "Family Stage",
			age: 35
		},
		{
			label: "Pre-Retiree",
			age: 58
		},
		{
			label: "Senior",
			age: 68
		}
	];
	const eligibility = (0, import_react.useMemo)(() => {
		let eligibleLoanSlugs = [];
		let eligibleInsuranceSlugs = [];
		let reasonText = "";
		if (age < 18) {
			eligibleLoanSlugs = ["education-loan"];
			eligibleInsuranceSlugs = ["child-plans", "travel-insurance"];
			reasonText = "Focus on education and child savings benefits.";
		} else if (age >= 18 && age <= 20) {
			eligibleLoanSlugs = ["education-loan", "car-loan"];
			eligibleInsuranceSlugs = [
				"health-insurance",
				"motor-insurance",
				"property-insurance",
				"travel-insurance",
				"business-insurance"
			];
			reasonText = "Eligible for education funding, vehicle financing, and asset protection.";
		} else if (age >= 21 && age <= 24) {
			eligibleLoanSlugs = [
				"personal-loan",
				"property-loan",
				"car-loan",
				"business-loan",
				"education-loan"
			];
			eligibleInsuranceSlugs = [
				"health-insurance",
				"family-insurance",
				"life-insurance",
				"motor-insurance",
				"property-insurance",
				"travel-insurance"
			];
			reasonText = "Broad eligibility starting for young professionals and independent earners.";
		} else if (age >= 25 && age <= 55) {
			eligibleLoanSlugs = [
				"property-loan",
				"loan-against-property",
				"business-loan",
				"car-loan",
				"education-loan",
				"personal-loan",
				"professional-loan",
				"professional-equipment-loan",
				"commercial-loan",
				"hospital-funding",
				"educational-institution-funding"
			];
			eligibleInsuranceSlugs = [
				"health-insurance",
				"family-insurance",
				"life-insurance",
				"pension-plans",
				"motor-insurance",
				"property-insurance",
				"business-insurance",
				"travel-insurance"
			];
			reasonText = "Full eligibility for maximum life coverage, asset finance, and business/professional growth.";
		} else if (age >= 56 && age <= 65) {
			eligibleLoanSlugs = [
				"property-loan",
				"loan-against-property",
				"business-loan",
				"car-loan",
				"professional-loan",
				"commercial-loan"
			];
			eligibleInsuranceSlugs = [
				"health-insurance",
				"family-insurance",
				"life-insurance",
				"pension-plans",
				"property-insurance",
				"travel-insurance"
			];
			reasonText = "Optimized for retirement planning, security, and senior wealth protection.";
		} else if (age >= 66 && age <= 75) {
			eligibleLoanSlugs = ["loan-against-property", "commercial-loan"];
			eligibleInsuranceSlugs = [
				"pension-plans",
				"travel-insurance",
				"property-insurance"
			];
			reasonText = "Asset-backed loans and active security features for senior citizens.";
		} else {
			eligibleLoanSlugs = ["loan-against-property"];
			eligibleInsuranceSlugs = ["travel-insurance"];
			reasonText = "Simple asset-backed liquidity and international travel protections.";
		}
		return {
			eligibleLoans: loans.filter((l) => eligibleLoanSlugs.includes(l.slug)),
			eligibleInsurance: insurance.filter((i) => eligibleInsuranceSlugs.includes(i.slug)),
			reasonText
		};
	}, [age]);
	const getIcon = (slug) => {
		switch (slug) {
			case "property-loan": return House;
			case "loan-against-property": return TrendingUp;
			case "business-loan": return Briefcase;
			case "car-loan": return Car;
			case "education-loan": return GraduationCap;
			case "personal-loan": return FileCheckCorner;
			case "professional-loan": return Briefcase;
			case "professional-equipment-loan": return TrendingUp;
			case "commercial-loan": return House;
			case "hospital-funding": return Heart;
			case "educational-institution-funding": return GraduationCap;
			case "health-insurance": return Heart;
			case "family-insurance": return Users;
			case "life-insurance": return Shield;
			case "child-plans": return GraduationCap;
			case "pension-plans": return Compass;
			default: return Shield;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "p-6 bg-card border shadow-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-8 lg:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-2 space-y-6 flex flex-col justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xl font-bold text-brand-navy",
						children: "Age eligibility checker"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mt-1",
						children: "Find customized financial & protection products based on your age segment."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-baseline",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-semibold text-muted-foreground",
									children: "Select Age"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-4xl font-black text-primary",
										children: age
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-semibold text-muted-foreground",
										children: "years"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								value: [age],
								min: 10,
								max: 85,
								step: 1,
								onValueChange: ([v]) => setAge(v),
								className: "py-4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5 pt-2",
								children: presets.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: age === p.age ? "default" : "outline",
									size: "sm",
									onClick: () => setAge(p.age),
									className: "text-xs h-7 px-2.5 rounded-full",
									children: [
										p.label,
										" (",
										p.age,
										")"
									]
								}, p.label))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-primary/5 p-4 border border-primary/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-black uppercase tracking-widest text-primary",
							children: "Eligibility Insight"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold text-foreground mt-1 leading-relaxed",
							children: eligibility.reasonText
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-3 space-y-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b pb-2 mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "text-sm font-black uppercase tracking-wider text-brand-navy",
						children: [
							"Eligible Loans (",
							eligibility.eligibleLoans.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-bold text-muted-foreground",
						children: "Instant Application"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2.5 sm:grid-cols-2",
					children: eligibility.eligibleLoans.map((l) => {
						const Icon = getIcon(l.slug);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/loans/$slug",
							params: { slug: l.slug },
							className: "flex items-center gap-3 p-3 rounded-xl border bg-background hover:bg-primary/5 hover:border-primary/30 transition group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4.5 w-4.5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-bold text-foreground truncate",
									children: l.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] text-muted-foreground truncate",
									children: l.tagline
								})]
							})]
						}, l.slug);
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b pb-2 mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "text-sm font-black uppercase tracking-wider text-brand-navy",
						children: [
							"Eligible Insurance (",
							eligibility.eligibleInsurance.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-bold text-muted-foreground",
						children: "Instant Quotes"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2.5 sm:grid-cols-2",
					children: eligibility.eligibleInsurance.map((i) => {
						const Icon = getIcon(i.slug);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/insurance/$slug",
							params: { slug: i.slug },
							className: "flex items-center gap-3 p-3 rounded-xl border bg-background hover:bg-primary/5 hover:border-primary/30 transition group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4.5 w-4.5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-bold text-foreground truncate",
									children: i.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] text-muted-foreground truncate",
									children: i.tagline
								})]
							})]
						}, i.slug);
					})
				})] })]
			})]
		})
	});
}
var SbiLogo = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	viewBox: "0 0 100 100",
	className: "h-8 w-8",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "50",
			cy: "50",
			r: "36",
			fill: "#005BAC"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "50",
			y1: "50",
			x2: "50",
			y2: "86",
			stroke: "white",
			strokeWidth: "8"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "50",
			cy: "50",
			r: "10",
			fill: "white"
		})
	]
});
var LicLogo = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	viewBox: "0 0 120 100",
	className: "h-8 w-12",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M20,60 C20,30 50,20 60,10 C70,20 100,30 100,60 C100,90 20,90 20,60 Z",
			fill: "#0054A6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "60",
			cy: "50",
			r: "18",
			fill: "#FFD200"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M50,45 C50,30 70,30 70,45 C70,60 50,60 50,45 Z",
			fill: "#E31E24"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M15,50 Q10,75 40,85",
			stroke: "white",
			strokeWidth: "4",
			strokeLinecap: "round"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M105,50 Q110,75 80,85",
			stroke: "white",
			strokeWidth: "4",
			strokeLinecap: "round"
		})
	]
});
var HdfcLogo = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	viewBox: "0 0 150 40",
	className: "h-8 w-24",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "150",
			height: "40",
			rx: "4",
			fill: "#004C8F"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "10",
			y: "8",
			width: "8",
			height: "24",
			fill: "#E31E24"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "22",
			y: "8",
			width: "8",
			height: "24",
			fill: "white"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "34",
			y: "8",
			width: "8",
			height: "24",
			fill: "white"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "46",
			y: "8",
			width: "8",
			height: "24",
			fill: "white"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: "62",
			y: "26",
			fill: "white",
			fontSize: "16",
			fontWeight: "bold",
			fontFamily: "sans-serif",
			children: "HDFC BANK"
		})
	]
});
var IciciLogo = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	viewBox: "0 0 160 40",
	className: "h-8 w-28",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "160",
			height: "40",
			rx: "4",
			fill: "#8F2A28"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "20",
			cy: "20",
			r: "10",
			fill: "#FFC72C"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: "40",
			y: "25",
			fill: "#FFC72C",
			fontSize: "15",
			fontWeight: "black",
			fontFamily: "sans-serif",
			children: "ICICI Bank"
		})
	]
});
var AxisLogo = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	viewBox: "0 0 140 40",
	className: "h-8 w-24",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "140",
			height: "40",
			rx: "4",
			fill: "#971B49"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M22,12 L32,28 L27,28 L17,12 Z",
			fill: "white"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M12,28 L22,12 L17,12 L7,28 Z",
			fill: "white"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: "42",
			y: "26",
			fill: "white",
			fontSize: "16",
			fontWeight: "black",
			fontFamily: "sans-serif",
			children: "AXIS BANK"
		})
	]
});
function BankPartners({ slug }) {
	const getPartners = (slug) => {
		switch (slug) {
			case "property-loan": return [
				{
					name: "LIC Housing Finance",
					logo: LicLogo
				},
				{
					name: "HDFC Bank",
					logo: HdfcLogo
				},
				{
					name: "SBI",
					logo: SbiLogo
				}
			];
			case "loan-against-property":
			case "commercial-loan": return [
				{
					name: "HDFC Bank",
					logo: HdfcLogo
				},
				{
					name: "ICICI Bank",
					logo: IciciLogo
				},
				{
					name: "Axis Bank",
					logo: AxisLogo
				}
			];
			case "business-loan":
			case "professional-loan":
			case "professional-equipment-loan":
			case "hospital-funding":
			case "educational-institution-funding": return [
				{
					name: "SBI",
					logo: SbiLogo
				},
				{
					name: "ICICI Bank",
					logo: IciciLogo
				},
				{
					name: "Axis Bank",
					logo: AxisLogo
				}
			];
			case "car-loan": return [
				{
					name: "HDFC Bank",
					logo: HdfcLogo
				},
				{
					name: "SBI",
					logo: SbiLogo
				},
				{
					name: "ICICI Bank",
					logo: IciciLogo
				}
			];
			case "education-loan": return [
				{
					name: "SBI",
					logo: SbiLogo
				},
				{
					name: "HDFC Bank",
					logo: HdfcLogo
				},
				{
					name: "ICICI Bank",
					logo: IciciLogo
				}
			];
			case "personal-loan": return [
				{
					name: "HDFC Bank",
					logo: HdfcLogo
				},
				{
					name: "ICICI Bank",
					logo: IciciLogo
				},
				{
					name: "Axis Bank",
					logo: AxisLogo
				}
			];
			default: return [
				{
					name: "SBI",
					logo: SbiLogo
				},
				{
					name: "HDFC Bank",
					logo: HdfcLogo
				},
				{
					name: "ICICI Bank",
					logo: IciciLogo
				}
			];
		}
	};
	const partners = getPartners(slug);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-card border-t border-b py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-bold uppercase tracking-wider text-muted-foreground",
					children: "Associated Banks & Financial Institutions"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: "Official partnership channels for fast processing & lower rates."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex flex-wrap justify-center items-center gap-8 md:gap-12",
					children: partners.map(({ name, logo: LogoComponent }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 bg-background border px-5 py-3 rounded-2xl shadow-sm hover:shadow-md transition",
						title: name,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoComponent, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold text-foreground",
							children: name
						})]
					}, name))
				})
			]
		})
	});
}
function CategoryPage({ item }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "relative overflow-hidden bg-brand-gradient text-white",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl gap-8 px-6 py-14 md:grid-cols-2 md:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: "mb-4 w-fit bg-accent text-accent-foreground hover:bg-accent",
							children: item.kind === "loan" ? "Loan Product" : "Insurance Plan"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-4xl font-extrabold leading-tight md:text-5xl",
							children: item.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-lg text-white/85",
							children: item.tagline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-sm text-white/75",
							children: item.description
						}),
						item.kind === "insurance" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 rounded-xl border border-white/20 bg-white/10 p-3 text-[11px] text-white/90 backdrop-blur-sm max-w-xl",
							children: "🛡️ **Policybazaar Partner Integration**: In production, real-time premium tables and direct policy comparison depend on official partnership API contracts with Policybazaar and regulatory IRDAI clearances."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplyDialog, {
								productName: item.name,
								productKind: item.kind,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "lg",
									className: "bg-accent text-accent-foreground hover:bg-accent/90",
									children: ["Apply Now ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#details",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "lg",
									variant: "outline",
									className: "border-white/40 bg-white/10 text-white hover:bg-white/20",
									children: "Learn more"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap gap-4 text-sm text-white/80",
							children: [
								item.rate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: "h-4 w-4" }), item.rate]
								}),
								item.tenure && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" }), item.tenure]
								}),
								item.premium && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: "h-4 w-4" }), item.premium]
								}),
								item.coverage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }), item.coverage]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-2xl bg-accent/30 blur-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: item.image,
						alt: item.name,
						className: "relative aspect-[4/3] w-full rounded-2xl object-cover shadow-elevated",
						width: 1200,
						height: 700,
						loading: "eager"
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "details",
			className: "mx-auto max-w-7xl px-6 py-14",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-4",
				children: item.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex items-start gap-3 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mt-0.5 h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-medium",
						children: f
					})]
				}, f))
			})
		}),
		item.subtypes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-secondary/40 py-14 border-t border-b",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold md:text-3xl",
						children: "Available variants"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "Choose the option that best fits your goal."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3",
						children: item.subtypes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-5 transition hover:shadow-elevated",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-8 w-8 rounded-md bg-primary/10 p-1.5 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-full w-full" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-foreground",
									children: s.name
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted-foreground",
								children: s.description
							})]
						}, s.name))
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-7xl px-6 py-14",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold",
							children: "Benefits"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-2 text-sm",
							children: item.benefits.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: b })]
							}, b))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold",
							children: "Eligibility"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-2 text-sm",
							children: item.eligibility.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: b })]
							}, b))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-bold",
							children: "Documents Required"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-2 text-sm",
							children: item.documents.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: b })]
							}, b))
						})]
					})
				]
			})
		}),
		item.kind === "loan" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BankPartners, { slug: item.slug }),
		item.kind === "loan" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-secondary/40 py-14",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold md:text-3xl",
						children: "EMI Calculator"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "Plan your monthly outgo before you apply."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmiCalculator, {
							defaultRate: parseFloat((item.rate || "9").replace(/[^0-9.]/g, "")) || 9,
							defaultAmount: item.slug === "personal-loan" ? 5e5 : item.slug === "car-loan" ? 1e6 : 25e5,
							defaultYears: item.slug === "car-loan" ? 5 : item.slug === "personal-loan" ? 4 : 20
						})
					})
				]
			})
		}),
		item.kind === "loan" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-14 border-t border-b",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgeCalculator, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-4xl px-6 py-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-center text-2xl font-bold md:text-3xl",
				children: "Frequently Asked Questions"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
				type: "single",
				collapsible: true,
				className: "mt-8",
				children: item.faqs.map((f, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
					value: `f-${idx}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
						className: "text-left",
						children: f.q
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
						className: "text-sm text-muted-foreground",
						children: f.a
					})]
				}, idx))
			})]
		}),
		item.related && item.related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-secondary/40 py-14 border-t border-b",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold md:text-3xl",
					children: "You may also consider"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 md:grid-cols-3",
					children: item.related.map((slug) => {
						const rel = findCatalogItem(slug);
						if (!rel) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: rel.kind === "loan" ? "/loans/$slug" : "/insurance/$slug",
							params: { slug: rel.slug },
							className: "group overflow-hidden rounded-xl border bg-card transition hover:shadow-elevated",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-[16/9] overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: rel.image,
									alt: rel.name,
									className: "h-full w-full object-cover transition group-hover:scale-105",
									width: 800,
									height: 450,
									loading: "lazy"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold",
									children: rel.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: rel.tagline
								})]
							})]
						}, slug);
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-brand-gradient py-14 text-white",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-4xl px-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-extrabold",
						children: "Ready to move forward?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-white/85",
						children: "Submit your application in less than 3 minutes."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplyDialog, {
							productName: item.name,
							productKind: item.kind,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "lg",
								className: "bg-accent text-accent-foreground hover:bg-accent/90",
								children: [
									"Apply for ",
									item.name,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })
								]
							})
						})
					})
				]
			})
		})
	] });
}
//#endregion
export { CategoryPage as t };
