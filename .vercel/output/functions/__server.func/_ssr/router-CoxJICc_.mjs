import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as loans, i as insurance } from "./catalog-Sb1FjQGD.mjs";
import { t as AppStoreProvider } from "./app-store-DvCWVi7f.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { B as ChartColumn, D as FileText, R as ChevronDown, S as Landmark, U as Bell, _ as Menu, f as ScrollText, g as MessageSquare, k as FilePenLine, n as X, r as Users, u as ShieldCheck, w as House, x as LayoutDashboard } from "../_libs/lucide-react.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$16 } from "./admin.customers-DzyIVou5.mjs";
import { t as Route$17 } from "./insurance._slug-DOQfm_rf.mjs";
import { t as Route$18 } from "./loans._slug-Ql3ihV0v.mjs";
import { i as founder_default, n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-B94Av0az.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CoxJICc_.js
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
var logo_new_default = "/assets/logo_new-EJ8tXZ0A.png";
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-end gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden text-right sm:block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-semibold text-foreground",
									children: "Admin Panel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: "Bibi Ayesha · Admin"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin",
								className: "hidden rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-brand-navy sm:inline-flex",
								children: "Admin Dashboard"
							})]
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-3 border-t border-sidebar-border/60" }),
								!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60",
									children: "Admin"
								}),
								adminNav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
									to: n.to,
									label: n.label,
									Icon: n.icon,
									active: isActive(n.to),
									collapsed,
									onNavigate: () => {}
								}, n.to)),
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
								children: [
									primaryNav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
										to: n.to,
										label: n.label,
										Icon: n.icon,
										active: isActive(n.to),
										collapsed: false,
										children: n.children,
										onNavigate: () => setMobileOpen(false)
									}, n.to)),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-3 border-t border-sidebar-border/60" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60",
										children: "Admin"
									}),
									adminNav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarItem, {
										to: n.to,
										label: n.label,
										Icon: n.icon,
										active: isActive(n.to),
										collapsed: false,
										onNavigate: () => setMobileOpen(false)
									}, n.to))
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "min-w-0 flex-1",
						children
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
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
var styles_default = "/assets/styles-C6H7uTNJ.css";
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
var Route$15 = createRootRouteWithContext()({
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
	const { queryClient } = Route$15.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppStoreProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			richColors: true,
			position: "top-right"
		})] })
	});
}
var $$splitComponentImporter$13 = () => import("./terms-BrytOhif.mjs");
var Route$14 = createFileRoute("/terms")({
	head: () => ({ meta: [{ title: "Terms & Conditions — Instant Funds for You" }, {
		name: "description",
		content: "Terms and conditions governing your use of the Instant Funds for You website and demo services."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var BASE_URL = "";
var Route$13 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
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
var $$splitComponentImporter$12 = () => import("./privacy-DCV-eaO3.mjs");
var Route$12 = createFileRoute("/privacy")({
	head: () => ({ meta: [{ title: "Privacy Policy — Instant Funds for You" }, {
		name: "description",
		content: "How we handle information on the Instant Funds for You demo website."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./loans-Dk5JgTdN.mjs");
var Route$11 = createFileRoute("/loans")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./insurance-DCKc3S3_.mjs");
var Route$10 = createFileRoute("/insurance")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./admin-rRckGftk.mjs");
var Route$9 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./routes-DgoasIUk.mjs");
var Route$8 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Instant Funds for You — Loans, Insurance & Financial Advisory" }, {
		name: "description",
		content: "Home, Business, Vehicle, Education, Personal & Gold Loans plus Health, Life, Motor, Travel & Family Insurance. Apply online in minutes."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./loans.index-B6cyYBmO.mjs");
var Route$7 = createFileRoute("/loans/")({
	head: () => ({ meta: [{ title: "Loans — Instant Funds for You" }, {
		name: "description",
		content: "Explore Home, Vehicle, Business, Education, Personal, Gold and Mortgage loans with instant approvals and competitive rates."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./insurance.index-BqPJ57RU.mjs");
var Route$6 = createFileRoute("/insurance/")({
	head: () => ({ meta: [{ title: "Insurance Plans — Instant Funds for You" }, {
		name: "description",
		content: "Health, Life, Family, Motor, Travel, Child, Pension, Property and Business insurance from India's most trusted advisors."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./admin.index-BKJp1gQu.mjs");
var Route$5 = createFileRoute("/admin/")({
	head: () => ({ meta: [{ title: "Admin Dashboard — IFY CRM" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./admin.sms-BSYaQkvZ.mjs");
var Route$4 = createFileRoute("/admin/sms")({
	head: () => ({ meta: [{ title: "SMS Center — IFY CRM" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./admin.reports-CH-K-85E.mjs");
var Route$3 = createFileRoute("/admin/reports")({
	head: () => ({ meta: [{ title: "Reports — IFY CRM" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./admin.notifications-DWjrfrth.mjs");
var Route$2 = createFileRoute("/admin/notifications")({
	head: () => ({ meta: [{ title: "Notifications — IFY CRM" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./admin.applications-BNiwD4mw.mjs");
var Route$1 = createFileRoute("/admin/applications")({
	head: () => ({ meta: [{ title: "Applications — IFY CRM" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./admin.analytics-JBo7PLmB.mjs");
var Route = createFileRoute("/admin/analytics")({
	head: () => ({ meta: [{ title: "Analytics — IFY CRM" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var TermsRoute = Route$14.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$15
});
var SitemapDotxmlRoute = Route$13.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$15
});
var PrivacyRoute = Route$12.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$15
});
var LoansRoute = Route$11.update({
	id: "/loans",
	path: "/loans",
	getParentRoute: () => Route$15
});
var InsuranceRoute = Route$10.update({
	id: "/insurance",
	path: "/insurance",
	getParentRoute: () => Route$15
});
var AdminRoute = Route$9.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$15
});
var IndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$15
});
var LoansIndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => LoansRoute
});
var InsuranceIndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => InsuranceRoute
});
var AdminIndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var LoansSlugRoute = Route$18.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => LoansRoute
});
var InsuranceSlugRoute = Route$17.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => InsuranceRoute
});
var AdminSmsRoute = Route$4.update({
	id: "/sms",
	path: "/sms",
	getParentRoute: () => AdminRoute
});
var AdminReportsRoute = Route$3.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => AdminRoute
});
var AdminNotificationsRoute = Route$2.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => AdminRoute
});
var AdminCustomersRoute = Route$16.update({
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
	AdminReportsRoute,
	AdminSmsRoute,
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
	InsuranceRoute: InsuranceRouteWithChildren,
	LoansRoute: LoansRoute._addFileChildren(LoansRouteChildren),
	PrivacyRoute,
	SitemapDotxmlRoute,
	TermsRoute
};
var routeTree = Route$15._addFileChildren(rootRouteChildren)._addFileTypes();
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
