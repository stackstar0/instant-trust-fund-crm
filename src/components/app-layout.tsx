import { Link, useRouterState } from "@tanstack/react-router";
import { type ReactNode, useState, useMemo } from "react";
import { useAppStore } from "@/lib/app-store";
import { useAuth } from "@/lib/auth-context";
import {
  Home,
  Landmark,
  ShieldCheck,
  Wrench,
  LayoutDashboard,
  Users,
  MessageSquare,
  Bell,
  BarChart3,
  FileText,
  ChevronDown,
  Menu,
  X,
  FileSignature,
  ScrollText,
  CheckSquare,
} from "lucide-react";
import logo from "@/assets/logo_new.png";
import founderPhoto from "@/assets/founder.png";
import { loans, insurance } from "@/lib/catalog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const primaryNav = [
  { label: "Home", icon: Home, to: "/" },
  {
    label: "Loans",
    icon: Landmark,
    to: "/loans",
    children: loans.map((l) => ({ label: l.name, to: `/loans/${l.slug}` })),
  },
  {
    label: "Insurance",
    icon: ShieldCheck,
    to: "/insurance",
    children: insurance.map((i) => ({ label: i.name, to: `/insurance/${i.slug}` })),
  },
  { label: "Policy Bazaar", icon: FileText, to: "/policybazaar" },
  { label: "Property Verify", icon: Wrench, to: "/properties" },
  { label: "CIBIL Score", icon: ScrollText, to: "/cibil" },
  { label: "Track Application", icon: Users, to: "/dashboard" },
];

const adminNav = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/admin" },
  { label: "Customers", icon: Users, to: "/admin/customers" },
  { label: "Applications", icon: FileSignature, to: "/admin/applications" },
  { label: "Tasks", icon: CheckSquare, to: "/admin/tasks" },
  { label: "Referrals", icon: ScrollText, to: "/admin/referrals" },
  { label: "Property Search", icon: Home, to: "/admin/properties" },
  { label: "SMS Center", icon: MessageSquare, to: "/admin/sms" },
  { label: "Notifications", icon: Bell, to: "/admin/notifications" },
  { label: "Analytics", icon: BarChart3, to: "/admin/analytics" },
  { label: "Reports", icon: FileText, to: "/admin/reports" },
];

function SidebarItem({
  to,
  label,
  Icon,
  active,
  collapsed,
  children,
  onNavigate,
}: {
  to: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  collapsed: boolean;
  children?: { label: string; to: string }[];
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex items-stretch">
        <Link
          to={to}
          onClick={onNavigate}
          className={cn(
            "group flex flex-1 items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
            active
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
          )}
        >
          <Icon className="h-4 w-4 shrink-0" />
          {!collapsed && <span className="truncate">{label}</span>}
        </Link>
        {!collapsed && children && (
          <button
            onClick={() => setOpen((v) => !v)}
            className="ml-1 rounded-md px-2 text-sidebar-foreground/70 hover:bg-sidebar-accent/60"
            aria-label={`Toggle ${label}`}
          >
            <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
          </button>
        )}
      </div>
      {!collapsed && children && open && (
        <div className="mt-1 ml-8 flex flex-col gap-0.5 border-l border-sidebar-border/50 pl-3">
          {children.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              onClick={onNavigate}
              className="rounded px-2 py-1.5 text-xs text-sidebar-foreground/70 transition hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
            >
              {c.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function AppLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { currentUser } = useAppStore();
  const { logout } = useAuth();

  const visibleAdminNav = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.role === "assistant_admin") {
      return adminNav.filter(
        (item) => item.label === "Tasks"
      );
    }
    return adminNav;
  }, [currentUser]);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(path + "/");

  return (
    <div className="min-h-screen bg-brand-surface">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-white/95 backdrop-blur">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 py-2.5 sm:grid-cols-3 sm:px-6">
          {/* Left: founder */}
          <div className="flex min-w-0 items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Avatar className="h-10 w-10 shrink-0 ring-2 ring-primary/20">
              <AvatarImage src={founderPhoto} alt="Founder" />
              <AvatarFallback>RA</AvatarFallback>
            </Avatar>
            <div className="hidden min-w-0 flex-col sm:flex">
              <span className="truncate text-sm font-semibold text-foreground">
                R H Adhoni
              </span>
              <span className="truncate text-xs text-muted-foreground">Founder</span>
            </div>
          </div>

          {/* Center: brand */}
          <Link to="/" className="flex items-center justify-center gap-3">
            <img
              src={logo}
              alt="Instant Funds for You"
              className="h-12 w-12 object-contain"
              width={48}
              height={48}
            />
            <div className="flex flex-col leading-tight">
              <span className="text-brand-gradient text-lg font-black tracking-tight sm:text-xl">
                Instant Funds for You
              </span>
              <span className="hidden text-[10px] font-semibold uppercase tracking-widest text-muted-foreground sm:block">
                Loans · Insurance · Advisory
              </span>
            </div>
          </Link>

          {/* Right: admin */}
          <div className="flex items-center justify-end gap-3">
            {currentUser ? (
              <>
                <div className="hidden text-right sm:block">
                  <div className="text-sm font-semibold text-foreground">{currentUser.name}</div>
                  {(currentUser.role === "super_admin" || currentUser.role === "assistant_admin") && (
                    <div className="text-xs text-muted-foreground">
                      {currentUser.role === "super_admin" ? "Super Admin" : "Assistant"}
                    </div>
                  )}
                </div>
                <Link
                  to={currentUser.role === "super_admin" || currentUser.role === "assistant_admin" ? "/admin" : "/profile"}
                  className="hidden rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-brand-navy sm:inline-flex"
                >
                  {currentUser.role === "super_admin" || currentUser.role === "assistant_admin" ? "Console" : "Profile"}
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    logout().then(() => {
                      window.location.href = "/";
                    });
                  }}
                  className="hidden sm:inline-flex h-8 px-3 text-xs"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link
                to="/login"
                className="hidden rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-brand-navy sm:inline-flex"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside
          className={cn(
            "sticky top-[65px] hidden h-[calc(100vh-65px)] shrink-0 flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 lg:flex",
            collapsed ? "w-16" : "w-64",
          )}
        >
          <div className="flex items-center justify-between px-3 py-3">
            {!collapsed && (
              <span className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60">
                Explore
              </span>
            )}
            <button
              onClick={() => setCollapsed((v) => !v)}
              className="ml-auto rounded-md p-1.5 text-sidebar-foreground/70 hover:bg-sidebar-accent"
              aria-label="Collapse sidebar"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
          <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 pb-3">
            {primaryNav.map((n) => (
              <SidebarItem
                key={n.to}
                to={n.to}
                label={n.label}
                Icon={n.icon}
                active={isActive(n.to)}
                collapsed={collapsed}
                children={n.children}
                onNavigate={() => { }}
              />
            ))}
            {currentUser && (currentUser.role === "super_admin" || currentUser.role === "assistant_admin") && (
              <>
                <div className="my-3 border-t border-sidebar-border/60" />
                {!collapsed && (
                  <div className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60">
                    Admin
                  </div>
                )}
                {visibleAdminNav.map((n) => (
                  <SidebarItem
                    key={n.to}
                    to={n.to}
                    label={n.label}
                    Icon={n.icon}
                    active={isActive(n.to)}
                    collapsed={collapsed}
                    onNavigate={() => { }}
                  />
                ))}
              </>
            )}
            <div className="my-3 border-t border-sidebar-border/60" />
            {!collapsed && (
              <div className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60">
                Legal
              </div>
            )}
            <SidebarItem
              to="/terms"
              label="Terms"
              Icon={ScrollText}
              active={isActive("/terms")}
              collapsed={collapsed}
              onNavigate={() => { }}
            />
            <SidebarItem
              to="/privacy"
              label="Privacy"
              Icon={ScrollText}
              active={isActive("/privacy")}
              collapsed={collapsed}
              onNavigate={() => { }}
            />
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
            <aside className="absolute left-0 top-0 flex h-full w-72 flex-col bg-sidebar text-sidebar-foreground">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="font-semibold">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md p-1.5 hover:bg-sidebar-accent"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 pb-4">
                {primaryNav.map((n) => (
                  <SidebarItem
                    key={n.to}
                    to={n.to}
                    label={n.label}
                    Icon={n.icon}
                    active={isActive(n.to)}
                    collapsed={false}
                    children={n.children}
                    onNavigate={() => setMobileOpen(false)}
                  />
                ))}
                {currentUser && (currentUser.role === "super_admin" || currentUser.role === "assistant_admin") && (
                  <>
                    <div className="my-3 border-t border-sidebar-border/60" />
                    <div className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60">
                      Admin
                    </div>
                    {visibleAdminNav.map((n) => (
                      <SidebarItem
                        key={n.to}
                        to={n.to}
                        label={n.label}
                        Icon={n.icon}
                        active={isActive(n.to)}
                        collapsed={false}
                        onNavigate={() => setMobileOpen(false)}
                      />
                    ))}
                  </>
                )}
                {currentUser && (
                  <div className="mt-4 px-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/60"
                      onClick={() => {
                        logout().then(() => {
                          window.location.href = "/";
                        });
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </nav>
            </aside>
          </div>
        )}

        {/* Main */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>

      <SiteFooter />

    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-brand-navy text-white/90">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:grid-cols-2 md:grid-cols-5">
        <div className="sm:col-span-2 md:col-span-1 space-y-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-12 w-12 object-contain" width={48} height={48} />
            <span className="text-xl font-black text-white tracking-tight">Instant Funds for You</span>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            A modern loan, insurance and financial-advisory partner for millions of Indians. Fast,
            transparent, trusted.
          </p>
          <div className="rounded-lg bg-white/5 p-3 text-xs text-white/70 space-y-1">
            <div className="font-semibold text-white">Direct Care Helpline</div>
            <div className="font-black text-gold">1800-123-4567</div>
            <div className="text-[10px] text-white/50">care@instantfunds.example</div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Loans</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {loans.slice(0, 6).map((l) => (
              <li key={l.slug}>
                <Link to="/loans/$slug" params={{ slug: l.slug }} className="hover:text-accent">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Insurance</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {insurance.slice(0, 6).map((i) => (
              <li key={i.slug}>
                <Link to="/insurance/$slug" params={{ slug: i.slug }} className="hover:text-accent">
                  {i.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <a href="/#about-section" className="hover:text-accent">
                About Us
              </a>
            </li>
            <li>
              <a href="/#callback-form" className="hover:text-accent">
                Contact Us
              </a>
            </li>
            <li>
              <Link to="/terms" className="hover:text-accent">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-accent">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-accent">
                Admin Dashboard
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Partners</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <a href="/#insurance-grid" className="hover:text-accent">
                RenewBuy Partner
              </a>
            </li>
            <li>
              <a href="/#loans-grid" className="hover:text-accent">
                Authorized Banks
              </a>
            </li>
            <li>
              <Link to="/admin" className="hover:text-accent">
                Sub-Advisors &amp; Agents
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-4 text-xs text-white/60 sm:flex-row">
          <div>© {new Date().getFullYear()} Instant Funds for You. All rights reserved.</div>
          <div>
            Website created by{" "}
            <span className="font-semibold text-white/90">Hafiza Shamsuddin Jakkli</span> (
            <a href="mailto:hafizajakkli20579@gmail.com" className="hover:underline text-white/90">
              hafizajakkli20579@gmail.com
            </a>
            ) · Production-ready financial services platform · Copyright terms apply.
          </div>
        </div>
      </div>
    </footer>
  );
}
