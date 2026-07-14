import { i as __toESM } from "../_runtime.mjs";
import { a as loans, i as insurance } from "./catalog-BNgltH_A.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as useAppStore, t as AppStoreProvider } from "./app-store-ByBvpnlW.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Heart, D as MessageSquare, F as Landmark, G as FileText, J as FileClock, N as LayoutDashboard, O as Menu, b as Search, ft as ChartColumn, it as CircleQuestionMark, l as TrendingUp, n as Wrench, ot as CircleCheckBig, p as SquareCheckBig, pt as Car, q as FilePenLine, r as Users, t as X, ut as ChevronDown, v as ShieldCheck, vt as Bell, x as ScrollText, xt as Activity, z as House } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-CzXpCsbD.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$24 } from "./admin.customers-C-WMg1Vn.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Route$25 } from "./insurance._slug-K1Q8OobP.mjs";
import { t as Route$26 } from "./loans._slug-DD5fRDlK.mjs";
import { a as logo_new_default, i as founder_default, n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-DJ7rf4aj.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Bo-r4pRv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var primaryNav = [
	{
		label: "Home",
		icon: House,
		to: "/"
	},
	{
		label: "Loans",
		icon: Landmark,
		to: "/loans",
		children: loans.map((l) => ({
			label: l.name,
			to: `/loans/${l.slug}`
		}))
	},
	{
		label: "Insurance",
		icon: ShieldCheck,
		to: "/insurance",
		children: insurance.map((i) => ({
			label: i.name,
			to: `/insurance/${i.slug}`
		}))
	},
	{
		label: "Policy Bazaar",
		icon: FileText,
		to: "/policybazaar"
	},
	{
		label: "Property Verify",
		icon: Wrench,
		to: "/properties"
	},
	{
		label: "CIBIL Score",
		icon: ScrollText,
		to: "/cibil"
	},
	{
		label: "Track Application",
		icon: Users,
		to: "/dashboard"
	}
];
var adminNav = [
	{
		label: "Dashboard",
		icon: LayoutDashboard,
		to: "/admin"
	},
	{
		label: "Customers",
		icon: Users,
		to: "/admin/customers"
	},
	{
		label: "Applications",
		icon: FilePenLine,
		to: "/admin/applications"
	},
	{
		label: "Tasks",
		icon: SquareCheckBig,
		to: "/admin/tasks"
	},
	{
		label: "Referrals",
		icon: ScrollText,
		to: "/admin/referrals"
	},
	{
		label: "Property Search",
		icon: House,
		to: "/admin/properties"
	},
	{
		label: "SMS Center",
		icon: MessageSquare,
		to: "/admin/sms"
	},
	{
		label: "Notifications",
		icon: Bell,
		to: "/admin/notifications"
	},
	{
		label: "Analytics",
		icon: ChartColumn,
		to: "/admin/analytics"
	},
	{
		label: "Reports",
		icon: FileText,
		to: "/admin/reports"
	}
];
function SidebarItem({ to, label, Icon, active, collapsed, children, onNavigate }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-stretch",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to,
			onClick: onNavigate,
			className: cn("group flex flex-1 items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors", active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 shrink-0" }), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate",
				children: label
			})]
		}), !collapsed && children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => setOpen((v) => !v),
			className: "ml-1 rounded-md px-2 text-sidebar-foreground/70 hover:bg-sidebar-accent/60",
			"aria-label": `Toggle ${label}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("h-4 w-4 transition-transform", open && "rotate-180") })
		})]
	}), !collapsed && children && open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1 ml-8 flex flex-col gap-0.5 border-l border-sidebar-border/50 pl-3",
		children: children.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: c.to,
			onClick: onNavigate,
			className: "rounded px-2 py-1.5 text-xs text-sidebar-foreground/70 transition hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
			children: c.label
		}, c.to))
	})] });
}
function AppLayout({ children }) {
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { currentUser } = useAppStore();
	const visibleAdminNav = (0, import_react.useMemo)(() => {
		if (!currentUser) return [];
		if (currentUser.role === "assistant_admin") return adminNav.filter((item) => item.label === "Tasks");
		return adminNav;
	}, [currentUser]);
	const isActive = (path) => path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(path + "/");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-brand-surface",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-border/60 bg-white/95 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 py-2.5 sm:grid-cols-3 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "lg:hidden",
									onClick: () => setMobileOpen(true),
									"aria-label": "Open menu",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
									className: "h-10 w-10 shrink-0 ring-2 ring-primary/20",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
										src: founder_default,
										alt: "Founder"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: "RA" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hidden min-w-0 flex-col sm:flex",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate text-sm font-semibold text-foreground",
										children: "R H Adhoni"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate text-xs text-muted-foreground",
										children: "Founder"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: logo_new_default,
								alt: "Instant Funds for You",
								className: "h-12 w-12 object-contain",
								width: 48,
								height: 48
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col leading-tight",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-brand-gradient text-lg font-black tracking-tight sm:text-xl",
									children: "Instant Funds for You"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden text-[10px] font-semibold uppercase tracking-widest text-muted-foreground sm:block",
									children: "Loans · Insurance · Advisory"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-end gap-3",
							children: currentUser ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden text-right sm:block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-semibold text-foreground",
									children: currentUser.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: currentUser.role === "super_admin" ? "Super Admin" : "Assistant"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin",
								className: "hidden rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-brand-navy sm:inline-flex",
								children: "Console"
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								className: "hidden rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-brand-navy sm:inline-flex",
								children: "Sign In"
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: cn("sticky top-[65px] hidden h-[calc(100vh-65px)] shrink-0 flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 lg:flex", collapsed ? "w-16" : "w-64"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-3 py-3",
							children: [!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60",
								children: "Explore"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setCollapsed((v) => !v),
								className: "ml-auto rounded-md p-1.5 text-sidebar-foreground/70 hover:bg-sidebar-accent",
								"aria-label": "Collapse sidebar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-4 w-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "flex-1 space-y-0.5 overflow-y-auto px-2 pb-3",
							children: [
								primaryNav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
									to: n.to,
									label: n.label,
									Icon: n.icon,
									active: isActive(n.to),
									collapsed,
									children: n.children,
									onNavigate: () => {}
								}, n.to)),
								currentUser && (currentUser.role === "super_admin" || currentUser.role === "assistant_admin") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-3 border-t border-sidebar-border/60" }),
									!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60",
										children: "Admin"
									}),
									visibleAdminNav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
										to: n.to,
										label: n.label,
										Icon: n.icon,
										active: isActive(n.to),
										collapsed,
										onNavigate: () => {}
									}, n.to))
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-3 border-t border-sidebar-border/60" }),
								!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60",
									children: "Legal"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
									to: "/terms",
									label: "Terms",
									Icon: ScrollText,
									active: isActive("/terms"),
									collapsed,
									onNavigate: () => {}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
									to: "/privacy",
									label: "Privacy",
									Icon: ScrollText,
									active: isActive("/privacy"),
									collapsed,
									onNavigate: () => {}
								})
							]
						})]
					}),
					mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "fixed inset-0 z-50 lg:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 bg-black/50",
							onClick: () => setMobileOpen(false)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
							className: "absolute left-0 top-0 flex h-full w-72 flex-col bg-sidebar text-sidebar-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: "Menu"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setMobileOpen(false),
									className: "rounded-md p-1.5 hover:bg-sidebar-accent",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
								className: "flex-1 space-y-0.5 overflow-y-auto px-2 pb-4",
								children: [primaryNav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
									to: n.to,
									label: n.label,
									Icon: n.icon,
									active: isActive(n.to),
									collapsed: false,
									children: n.children,
									onNavigate: () => setMobileOpen(false)
								}, n.to)), currentUser && (currentUser.role === "super_admin" || currentUser.role === "assistant_admin") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-3 border-t border-sidebar-border/60" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60",
										children: "Admin"
									}),
									visibleAdminNav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
										to: n.to,
										label: n.label,
										Icon: n.icon,
										active: isActive(n.to),
										collapsed: false,
										onNavigate: () => setMobileOpen(false)
									}, n.to))
								] })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "min-w-0 flex-1",
						children
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "https://wa.me/9118001234567",
				target: "_blank",
				rel: "noopener noreferrer",
				className: "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-110 hover:bg-[#20ba5a]",
				"aria-label": "Contact us on WhatsApp",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					viewBox: "0 0 24 24",
					className: "h-7 w-7 fill-current",
					xmlns: "http://www.w3.org/2000/svg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.59 1.977 14.113.953 11.488.953c-5.442 0-9.866 4.372-9.87 9.802 0 1.63.454 3.224 1.316 4.634L1.936 21.03l5.88-1.53c.006-.002.01-.004.01-.004z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.472 14.382c-.302-.15-1.787-.88-2.062-.98-.275-.1-.475-.15-.675.15-.2.3-.775.98-.95 1.18-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.79-1.492-1.77-1.667-2.07-.175-.3-.02-.46.13-.61.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.589-.493-.51-.675-.52-.172-.007-.368-.009-.563-.009-.195 0-.514.074-.783.37-.268.295-1.025 1.002-1.025 2.443 0 1.44 1.05 2.83 1.196 3.03.146.197 2.063 3.147 4.997 4.417.697.3 1.242.48 1.667.615.7.22 1.336.19 1.84.115.56-.083 1.787-.73 2.037-1.436.25-.707.25-1.31.175-1.436-.075-.125-.275-.2-.575-.35z" })]
				})
			})
		]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-brand-navy text-white/90",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:grid-cols-2 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: logo_new_default,
						alt: "",
						className: "h-12 w-12 object-contain",
						width: 48,
						height: 48
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xl font-black text-white tracking-tight",
						children: "Instant Funds for You"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-white/70",
					children: "A modern loan, insurance and financial-advisory partner for millions of Indians. Fast, transparent, trusted."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-sm font-semibold text-white",
					children: "Loans"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2 text-sm text-white/70",
					children: loans.slice(0, 6).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/loans/$slug",
						params: { slug: l.slug },
						className: "hover:text-accent",
						children: l.name
					}) }, l.slug))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-sm font-semibold text-white",
					children: "Insurance"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2 text-sm text-white/70",
					children: insurance.slice(0, 6).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/insurance/$slug",
						params: { slug: i.slug },
						className: "hover:text-accent",
						children: i.name
					}) }, i.slug))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-sm font-semibold text-white",
						children: "Company"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 space-y-2 text-sm text-white/70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin",
								className: "hover:text-accent",
								children: "Admin Dashboard"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/terms",
								className: "hover:text-accent",
								children: "Terms & Conditions"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy",
								className: "hover:text-accent",
								children: "Privacy Policy"
							}) })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 rounded-lg bg-white/5 p-3 text-xs text-white/70",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold text-white",
							children: "Contact"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1",
							children: "1800-123-4567 · care@instantfundsforyou.demo"
						})]
					})
				] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-white/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-4 text-xs text-white/60 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Instant Funds for You. All rights reserved."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					"Website created by",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-white/90",
						children: "Hafiza Shamsuddin Jakkli"
					}),
					" (",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "mailto:hafizajakkli20579@gmail.com",
						className: "hover:underline text-white/90",
						children: "hafizajakkli20579@gmail.com"
					}),
					") · Demo prototype — no real financial transactions · Copyright terms apply."
				] })]
			})
		})]
	});
}
var styles_default = "/assets/styles-CiklnXoM.css";
function reportError(error, context = {}) {
	if (typeof window === "undefined") {
		console.error("Captured Server Error:", error, context);
		return;
	}
	console.error("Captured Client Error:", error, {
		route: window.location.pathname,
		...context
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-brand-surface px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-black text-primary",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-brand-navy",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-brand-surface px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong. Try again or head home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-brand-navy",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "rounded-md border px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$23 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Instant Funds for You — Loans, Insurance & Financial Advisory" },
			{
				name: "description",
				content: "Home, Business, Vehicle, Education, Personal & Gold Loans plus Health, Life, Motor, Travel & Family Insurance. Apply online in minutes."
			},
			{
				property: "og:title",
				content: "Instant Funds for You — Loans, Insurance & Financial Advisory"
			},
			{
				property: "og:description",
				content: "Home, Business, Vehicle, Education, Personal & Gold Loans plus Health, Life, Motor, Travel & Family Insurance. Apply online in minutes."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "Instant Funds for You — Loans, Insurance & Financial Advisory"
			},
			{
				name: "twitter:description",
				content: "Home, Business, Vehicle, Education, Personal & Gold Loans plus Health, Life, Motor, Travel & Family Insurance. Apply online in minutes."
			},
			{
				property: "og:image",
				content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/3d0dc96e-7750-4269-ba2b-138d4ec8c6df"
			},
			{
				name: "twitter:image",
				content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/3d0dc96e-7750-4269-ba2b-138d4ec8c6df"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800;900&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$23.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppStoreProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			richColors: true,
			position: "top-right"
		})] })
	});
}
var $$splitComponentImporter$20 = () => import("./terms-BrytOhif.mjs");
var Route$22 = createFileRoute("/terms")({
	head: () => ({ meta: [{ title: "Terms & Conditions — Instant Funds for You" }, {
		name: "description",
		content: "Terms and conditions governing your use of the Instant Funds for You website and demo services."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var BASE_URL = "";
var Route$21 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
		"/",
		"/loans",
		"/insurance",
		"/terms",
		"/privacy",
		...loans.map((l) => `/loans/${l.slug}`),
		...insurance.map((i) => `/insurance/${i.slug}`)
	].map((p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`).join("\n")}\n</urlset>`;
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$19 = () => import("./properties-CtFwI5fv.mjs");
var Route$20 = createFileRoute("/properties")({
	head: () => ({ meta: [{ title: "Bhoomi & Dishank Property Search — Instant Funds" }, {
		name: "description",
		content: "Search and verify land survey records, check Bhoomi registration details, and view parcel coordinates in Karnataka."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./privacy-DCV-eaO3.mjs");
var Route$19 = createFileRoute("/privacy")({
	head: () => ({ meta: [{ title: "Privacy Policy — Instant Funds for You" }, {
		name: "description",
		content: "How we handle information on the Instant Funds for You demo website."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var Route$18 = createFileRoute("/policybazaar")({
	head: () => ({ meta: [{ title: "Policybazaar Services — Instant Trust Funds" }, {
		name: "description",
		content: "Compare health, motor, life policies and process instant claim renewals."
	}] }),
	component: PolicyBazaarPage
});
function PolicyBazaarPage() {
	const [activeTab, setActiveTab] = (0, import_react.useState)("compare");
	const [healthAge, setHealthAge] = (0, import_react.useState)("30");
	const [healthCover, setHealthCover] = (0, import_react.useState)("10");
	const [healthQuote, setHealthQuote] = (0, import_react.useState)(null);
	const [vehicleNo, setVehicleNo] = (0, import_react.useState)("");
	const [motorQuote, setMotorQuote] = (0, import_react.useState)(null);
	const [lifeCover, setLifeCover] = (0, import_react.useState)("1");
	const [isSmoker, setIsSmoker] = (0, import_react.useState)(false);
	const [lifeQuote, setLifeQuote] = (0, import_react.useState)(null);
	const [renewPolicyNo, setRenewPolicyNo] = (0, import_react.useState)("");
	const [renewName, setRenewName] = (0, import_react.useState)("");
	const [claimPolicyNo, setClaimPolicyNo] = (0, import_react.useState)("");
	const [claimReason, setClaimReason] = (0, import_react.useState)("");
	const handleHealthCalculate = (e) => {
		e.preventDefault();
		const ageVal = parseInt(healthAge) || 30;
		const coverVal = parseInt(healthCover) || 10;
		const base = ageVal * 250 + coverVal * 400;
		setHealthQuote([
			{
				provider: "Care Health Secure",
				premium: Math.round(base * .95)
			},
			{
				provider: "Star Health Assure",
				premium: Math.round(base * 1.05)
			},
			{
				provider: "Aditya Birla Active",
				premium: Math.round(base * 1.1)
			},
			{
				provider: "Niva Bupa ReAssure",
				premium: Math.round(base * 1)
			}
		]);
		toast.success("Quotes loaded successfully!");
	};
	const handleMotorCalculate = (e) => {
		e.preventDefault();
		if (!vehicleNo) return;
		setMotorQuote({
			idv: `₹${45e4.toLocaleString()}`,
			premium: 12500
		});
		toast.success("Motor quotes fetched!");
	};
	const handleLifeCalculate = (e) => {
		e.preventDefault();
		let base = (parseFloat(lifeCover) || 1) * 8500;
		if (isSmoker) base *= 1.6;
		setLifeQuote(Math.round(base));
		toast.success("Term insurance quote generated!");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-6 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-10 rounded-2xl bg-brand-gradient text-white p-8 shadow-elevated relative overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-6 translate-x-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-64 w-64" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 max-w-3xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: "bg-soft-pink text-white hover:bg-soft-pink/90 mb-3 px-3 py-1 font-bold",
							children: "Policybazaar Premium Partner Channel"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-black md:text-5xl tracking-tight text-white",
							children: "Policy Comparison & Renewals"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-white/80 leading-relaxed",
							children: "Compare plans, renew coverages, and request claims assistance instantly. Instant Trust Fund leverages secure comparison parameters to guide your insurance investments."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 rounded-lg bg-white/10 border border-white/20 p-3 text-[11px] text-white/90 leading-relaxed",
							children: "⚠️ **Official Partner Disclaimer**: Product comparisons, IDV appraisals, and quote structures are simulated for demonstration. Policy purchases and claims are bound by final underwriting covenants with LIC, Star Health, and other associated insurers."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2 mb-8 border-b pb-4",
				children: [
					{
						id: "compare",
						label: "Compare Policies",
						icon: Search
					},
					{
						id: "health",
						label: "Health Insurance",
						icon: Heart
					},
					{
						id: "motor",
						label: "Motor Insurance",
						icon: Car
					},
					{
						id: "life",
						label: "Life Term Cover",
						icon: Activity
					},
					{
						id: "renew",
						label: "Buy / Renew",
						icon: FileClock
					},
					{
						id: "claims",
						label: "Claim Desk",
						icon: CircleQuestionMark
					}
				].map((t) => {
					const Icon = t.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab(t.id),
						className: `flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${activeTab === t.id ? "bg-primary text-white shadow-md" : "bg-white text-muted-foreground hover:bg-slate-100 hover:text-foreground border border-slate-200"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), t.label]
					}, t.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-8",
					children: [
						activeTab === "compare" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 border shadow-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-lg font-bold text-brand-navy border-b pb-3 mb-4 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5 text-primary" }), " Integrated Insurance Matcher"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mb-6",
									children: "Compare multi-provider health policies dynamically. Filter details below:"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-x-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										className: "w-full text-left text-xs border-collapse",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "border-b bg-slate-50 text-slate-700",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3 font-semibold",
													children: "Insurance Provider"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3 font-semibold",
													children: "Base Cover"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3 font-semibold",
													children: "Cashless Hospitals"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3 font-semibold",
													children: "Co-Pay"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3 font-semibold",
													children: "Est. Monthly Premium"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "p-3 font-semibold" })
											]
										}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [
											{
												provider: "Star Health Optima",
												cover: "₹10 Lakhs",
												cashless: "140+ in Karnataka",
												copay: "No Co-pay",
												price: "₹680"
											},
											{
												provider: "Care Health Supreme",
												cover: "₹10 Lakhs",
												cashless: "190+ in Karnataka",
												copay: "10% Co-pay",
												price: "₹612"
											},
											{
												provider: "Niva Bupa ReAssure",
												cover: "₹10 Lakhs",
												cashless: "155+ in Karnataka",
												copay: "No Co-pay",
												price: "₹720"
											},
											{
												provider: "Aditya Birla Active",
												cover: "₹10 Lakhs",
												cashless: "120+ in Karnataka",
												copay: "No Co-pay",
												price: "₹790"
											}
										].map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "border-b last:border-0 hover:bg-slate-50/50",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3 font-bold text-brand-navy",
													children: item.provider
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3",
													children: item.cover
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3",
													children: item.cashless
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3",
													children: item.copay
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3 font-bold text-primary",
													children: item.price
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														size: "sm",
														className: "bg-secondary text-white hover:bg-brand-navy",
														onClick: () => toast.success(`Callback requested for ${item.provider}`),
														children: "Enquire"
													})
												})
											]
										}, idx)) })]
									})
								})
							]
						}),
						activeTab === "health" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 border shadow-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-lg font-bold text-brand-navy border-b pb-3 mb-4 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-5 w-5 text-primary" }), " Health Insurance Quote Engine"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handleHealthCalculate,
									className: "space-y-4 max-w-md",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "healthAge",
											children: "Age of Eldest Insured Member"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "healthAge",
											type: "number",
											value: healthAge,
											onChange: (e) => setHealthAge(e.target.value),
											min: 18,
											max: 100,
											required: true
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "healthCover",
											children: "Desired Cover Limit (in Lakhs)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "healthCover",
											value: healthCover,
											onChange: (e) => setHealthCover(e.target.value),
											className: "w-full rounded-md border bg-background px-3 py-2 text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "5",
													children: "₹5 Lakhs"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "10",
													children: "₹10 Lakhs"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "15",
													children: "₹15 Lakhs"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "20",
													children: "₹20 Lakhs"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "50",
													children: "₹50 Lakhs"
												})
											]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											className: "w-full bg-primary hover:bg-brand-navy text-white",
											children: "Calculate Health Cover Premiums"
										})
									]
								}),
								healthQuote && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 border-t pt-6 space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-bold uppercase tracking-wider text-brand-navy mb-2",
										children: "Simulated Health Quotations"
									}), healthQuote.map((q, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center bg-slate-50 border p-3 rounded-lg text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-brand-navy block",
											children: q.provider
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground",
											children: "Cashless hospitalization network included"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-right",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-sm font-bold text-primary block",
												children: [
													"₹",
													q.premium.toLocaleString(),
													" / yr"
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												variant: "ghost",
												className: "text-[10px] text-primary p-0 h-auto hover:underline",
												onClick: () => toast.success(`Selected ${q.provider}. We will connect shortly.`),
												children: "Select Plan →"
											})]
										})]
									}, idx))]
								})
							]
						}),
						activeTab === "motor" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 border shadow-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-lg font-bold text-brand-navy border-b pb-3 mb-4 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Car, { className: "h-5 w-5 text-primary" }), " Motor Insurance Calculator"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handleMotorCalculate,
									className: "space-y-4 max-w-md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "vehicleNo",
										children: "Vehicle Registration Number (e.g. KA-03-ME-1234)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "vehicleNo",
										placeholder: "KA-03-ME-1234",
										value: vehicleNo,
										onChange: (e) => setVehicleNo(e.target.value),
										required: true
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										className: "w-full bg-primary hover:bg-brand-navy text-white",
										children: "Fetch Vehicle IDV & Quote"
									})]
								}),
								motorQuote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-8 border-t pt-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 rounded-xl border bg-slate-50 flex flex-col md:flex-row justify-between md:items-center gap-4 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-brand-navy text-sm",
												children: "Insured Declared Value (IDV)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-muted-foreground mt-0.5",
												children: "Calculated based on standard depreciation schedule."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-lg font-black text-brand-navy mt-1 block",
												children: motorQuote.idv
											})
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-right",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold text-slate-600 block",
													children: "Est. Annual Premium"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-lg font-black text-primary block",
													children: ["₹", motorQuote.premium.toLocaleString()]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "sm",
													className: "mt-2 bg-secondary text-white hover:bg-brand-navy",
													onClick: () => toast.success("Motor policy application submitted"),
													children: "Buy Policy Online"
												})
											]
										})]
									})
								})
							]
						}),
						activeTab === "life" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 border shadow-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-lg font-bold text-brand-navy border-b pb-3 mb-4 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-5 w-5 text-primary" }), " Term Life Insurance Calculator"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handleLifeCalculate,
									className: "space-y-4 max-w-md",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "lifeCover",
											children: "Sum Assured"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											id: "lifeCover",
											value: lifeCover,
											onChange: (e) => setLifeCover(e.target.value),
											className: "w-full rounded-md border bg-background px-3 py-2 text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "0.5",
													children: "₹50 Lakhs"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "1",
													children: "₹1 Crore"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "1.5",
													children: "₹1.5 Crores"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "2",
													children: "₹2 Crores"
												})
											]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "isSmoker",
												type: "checkbox",
												checked: isSmoker,
												onChange: (e) => setIsSmoker(e.target.checked),
												className: "h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "isSmoker",
												className: "text-xs",
												children: "Have you consumed nicotine in the last 12 months?"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											className: "w-full bg-primary hover:bg-brand-navy text-white",
											children: "Estimate Monthly Premium"
										})
									]
								}),
								lifeQuote !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 border-t pt-6 text-center bg-slate-50 p-6 rounded-xl border",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs uppercase text-muted-foreground font-semibold block",
											children: "Estimated Term Premium"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-3xl font-black text-brand-navy mt-1",
											children: [
												"₹",
												lifeQuote.toLocaleString(),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-normal",
													children: "/ yr"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-muted-foreground mt-2 max-w-sm mx-auto",
											children: "Term life cover provides financial protection for your dependents in the event of an untimely death. Quote is inclusive of standard GST."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											className: "mt-4 bg-secondary text-white hover:bg-brand-navy",
											onClick: () => toast.success("Advisory callback booked for Term Plan"),
											children: "Request Free Consultation"
										})
									]
								})
							]
						}),
						activeTab === "renew" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 border shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-lg font-bold text-brand-navy border-b pb-3 mb-4 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileClock, { className: "h-5 w-5 text-primary" }), " Renew Existing Insurance Policy"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: (e) => {
									e.preventDefault();
									toast.success(`Policy ${renewPolicyNo} verified. Initiating simulated payment gateway...`);
								},
								className: "space-y-4 max-w-md",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "renewPolicyNo",
										children: "Policy Number"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "renewPolicyNo",
										placeholder: "e.g. POL1102938",
										value: renewPolicyNo,
										onChange: (e) => setRenewPolicyNo(e.target.value),
										required: true
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "renewName",
										children: "Full Name of Insured"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "renewName",
										placeholder: "e.g. Vikram Sharma",
										value: renewName,
										onChange: (e) => setRenewName(e.target.value),
										required: true
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										className: "w-full bg-primary hover:bg-brand-navy text-white",
										children: "Retrieve & Renew Policy"
									})
								]
							})]
						}),
						activeTab === "claims" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-6 border shadow-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-lg font-bold text-brand-navy border-b pb-3 mb-4 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-5 w-5 text-primary" }), " Policybazaar Claim Assistance Desk"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mb-6",
									children: "Need to process a cashless claim? Submit parameters to activate claim coordinators."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: (e) => {
										e.preventDefault();
										toast.success(`Claim request registered for policy ${claimPolicyNo}. An advisor will contact you within 15 minutes.`);
									},
									className: "space-y-4 max-w-md",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "claimPolicyNo",
											children: "Policy Reference Code"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "claimPolicyNo",
											placeholder: "e.g. StarHealth-9088",
											value: claimPolicyNo,
											onChange: (e) => setClaimPolicyNo(e.target.value),
											required: true
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "claimReason",
											children: "Reason for Claim Request"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											id: "claimReason",
											rows: 4,
											placeholder: "Briefly state reason (e.g. Emergency hospitalization at Apollo)",
											value: claimReason,
											onChange: (e) => setClaimReason(e.target.value),
											className: "w-full rounded-md border bg-background px-3 py-2 text-xs",
											required: true
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											className: "w-full bg-primary hover:bg-brand-navy text-white",
											children: "Register Claim Support Ticket"
										})
									]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-4 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 border bg-slate-50 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "text-sm font-bold text-brand-navy mb-3 flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-4 w-4 text-emerald-500" }), " Instant Trust Fund Guarantee"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-3 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-emerald-500 font-bold mt-0.5",
										children: "✔"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "**Best Prices Guaranteed**: Compare across 20+ insurers and buy without markup." })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-emerald-500 font-bold mt-0.5",
										children: "✔"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "**Dedicated Claims Desk**: 24x7 support during medical or motor emergencies." })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-emerald-500 font-bold mt-0.5",
										children: "✔"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "**Doorstep Documentation**: Zero physical office visits required." })]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-6 border shadow-card bg-primary/5 border-primary/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
							className: "text-sm font-bold text-brand-navy mb-2 flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4 text-primary" }), " Why Buy Term Cover?"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: "Term insurance secures your family's future at minimal costs. High cover limits starting from ₹1 Crore cost as low as ₹20 per day."
						})]
					})]
				})]
			})
		]
	});
}
var $$splitComponentImporter$17 = () => import("./login-DgmSV_2B.mjs");
var Route$17 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Access Center / Login — IFY CRM" }] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./loans-Dk5JgTdN.mjs");
var Route$16 = createFileRoute("/loans")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./insurance-DCKc3S3_.mjs");
var Route$15 = createFileRoute("/insurance")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./dashboard-DXif4w9C.mjs");
var Route$14 = createFileRoute("/dashboard")({
	head: () => ({ meta: [{ title: "Customer Portal & Application Tracking — Instant Funds" }, {
		name: "description",
		content: "Track your loan or insurance application status, view communication logs, and upload required verification documents."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./cibil-Cla0vaS1.mjs");
var Route$13 = createFileRoute("/cibil")({
	head: () => ({ meta: [{ title: "Get Your Official CIBIL Credit Score — Instant Funds" }, {
		name: "description",
		content: "Get your official TransUnion CIBIL credit report instantly. Check loan eligibility, payment history, and credit health analysis."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./admin-NOEsQBoY.mjs");
var Route$12 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./routes-DuVYNeyL.mjs");
var Route$11 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Instant Trust Funds — 20+ Years of Financial Services" }, {
		name: "description",
		content: "Apply for Personal, Business, Home, Property and Agricultural Loans or compare Health, Life and Motor Insurance. Trusted banking advisory."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./loans.index-BQwVfJrQ.mjs");
var Route$10 = createFileRoute("/loans/")({
	head: () => ({ meta: [{ title: "Loans — Instant Funds for You" }, {
		name: "description",
		content: "Explore Home, Vehicle, Business, Education, Personal, Property and Mortgage loans with instant approvals and competitive rates."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./insurance.index-HrDLlV8y.mjs");
var Route$9 = createFileRoute("/insurance/")({
	head: () => ({ meta: [{ title: "Insurance Plans — Instant Funds for You" }, {
		name: "description",
		content: "Health, Life, Family, Motor, Travel, Child, Pension, Property and Business insurance from India's most trusted advisors."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./admin.index-DMVffrH5.mjs");
var Route$8 = createFileRoute("/admin/")({
	head: () => ({ meta: [{ title: "Admin Dashboard — IFY CRM" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./admin.tasks-BWMVzwwR.mjs");
var Route$7 = createFileRoute("/admin/tasks")({
	head: () => ({ meta: [{ title: "CRM Tasks Manager — IFY CRM" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./admin.sms-BH1w5mMU.mjs");
var Route$6 = createFileRoute("/admin/sms")({
	head: () => ({ meta: [{ title: "SMS Center — IFY CRM" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./admin.reports-Drkp5FXr.mjs");
var Route$5 = createFileRoute("/admin/reports")({
	head: () => ({ meta: [{ title: "Reports — IFY CRM" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./admin.referrals-CRAuw8bs.mjs");
var Route$4 = createFileRoute("/admin/referrals")({
	head: () => ({ meta: [{ title: "Referrals Manager — IFY CRM" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./admin.properties-Q5kJ-u3e.mjs");
var Route$3 = createFileRoute("/admin/properties")({
	head: () => ({ meta: [{ title: "Bhoomi Records Admin — IFY CRM" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./admin.notifications-B6W_HtPO.mjs");
var Route$2 = createFileRoute("/admin/notifications")({
	head: () => ({ meta: [{ title: "Notifications — IFY CRM" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./admin.applications-BPXCiCet.mjs");
var Route$1 = createFileRoute("/admin/applications")({
	head: () => ({ meta: [{ title: "Applications — IFY CRM" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./admin.analytics-D_B1pI50.mjs");
var Route = createFileRoute("/admin/analytics")({
	head: () => ({ meta: [{ title: "Analytics — IFY CRM" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var TermsRoute = Route$22.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$23
});
var SitemapDotxmlRoute = Route$21.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$23
});
var PropertiesRoute = Route$20.update({
	id: "/properties",
	path: "/properties",
	getParentRoute: () => Route$23
});
var PrivacyRoute = Route$19.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$23
});
var PolicybazaarRoute = Route$18.update({
	id: "/policybazaar",
	path: "/policybazaar",
	getParentRoute: () => Route$23
});
var LoginRoute = Route$17.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$23
});
var LoansRoute = Route$16.update({
	id: "/loans",
	path: "/loans",
	getParentRoute: () => Route$23
});
var InsuranceRoute = Route$15.update({
	id: "/insurance",
	path: "/insurance",
	getParentRoute: () => Route$23
});
var DashboardRoute = Route$14.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$23
});
var CibilRoute = Route$13.update({
	id: "/cibil",
	path: "/cibil",
	getParentRoute: () => Route$23
});
var AdminRoute = Route$12.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$23
});
var IndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$23
});
var LoansIndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => LoansRoute
});
var InsuranceIndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => InsuranceRoute
});
var AdminIndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var LoansSlugRoute = Route$26.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => LoansRoute
});
var InsuranceSlugRoute = Route$25.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => InsuranceRoute
});
var AdminTasksRoute = Route$7.update({
	id: "/tasks",
	path: "/tasks",
	getParentRoute: () => AdminRoute
});
var AdminSmsRoute = Route$6.update({
	id: "/sms",
	path: "/sms",
	getParentRoute: () => AdminRoute
});
var AdminReportsRoute = Route$5.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => AdminRoute
});
var AdminReferralsRoute = Route$4.update({
	id: "/referrals",
	path: "/referrals",
	getParentRoute: () => AdminRoute
});
var AdminPropertiesRoute = Route$3.update({
	id: "/properties",
	path: "/properties",
	getParentRoute: () => AdminRoute
});
var AdminNotificationsRoute = Route$2.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => AdminRoute
});
var AdminCustomersRoute = Route$24.update({
	id: "/customers",
	path: "/customers",
	getParentRoute: () => AdminRoute
});
var AdminApplicationsRoute = Route$1.update({
	id: "/applications",
	path: "/applications",
	getParentRoute: () => AdminRoute
});
var AdminRouteChildren = {
	AdminAnalyticsRoute: Route.update({
		id: "/analytics",
		path: "/analytics",
		getParentRoute: () => AdminRoute
	}),
	AdminApplicationsRoute,
	AdminCustomersRoute,
	AdminNotificationsRoute,
	AdminPropertiesRoute,
	AdminReferralsRoute,
	AdminReportsRoute,
	AdminSmsRoute,
	AdminTasksRoute,
	AdminIndexRoute
};
var AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
var InsuranceRouteChildren = {
	InsuranceSlugRoute,
	InsuranceIndexRoute
};
var InsuranceRouteWithChildren = InsuranceRoute._addFileChildren(InsuranceRouteChildren);
var LoansRouteChildren = {
	LoansSlugRoute,
	LoansIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AdminRoute: AdminRouteWithChildren,
	CibilRoute,
	DashboardRoute,
	InsuranceRoute: InsuranceRouteWithChildren,
	LoansRoute: LoansRoute._addFileChildren(LoansRouteChildren),
	LoginRoute,
	PolicybazaarRoute,
	PrivacyRoute,
	PropertiesRoute,
	SitemapDotxmlRoute,
	TermsRoute
};
var routeTree = Route$23._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
