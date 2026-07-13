import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAppStore } from "@/lib/app-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, UserCheck, Key, Lock, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Access Center / Login — IFY CRM" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { currentUser, setCurrentUser } = useAppStore();
  const navigate = useNavigate();

  const handleLogin = (name: string, role: "super_admin" | "assistant_admin" | "customer") => {
    setCurrentUser({ name, role });
    toast.success(`Logged in as ${name}`, {
      description: `Role assigned: ${role.replace("_", " ").toUpperCase()}`,
    });

    if (role === "customer") {
      navigate({ to: "/dashboard" });
    } else {
      navigate({ to: "/admin" });
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    toast.info("Logged out successfully");
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "super_admin":
        return "Super Admin (R H Adhoni)";
      case "assistant_admin":
        return "Assistant Admin (Bibi Ayesha)";
      default:
        return "Customer Portal Access";
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 flex flex-col items-center">
      <div className="text-center max-w-lg mb-8">
        <Badge className="bg-primary/10 text-primary border-primary/20 py-1 px-3 mb-2 text-xs">
          Role-Based Access Control
        </Badge>
        <h1 className="text-3xl font-black text-brand-navy md:text-4xl">Identity & Access Center</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Select a preset role profile to simulate different permission layouts and feature restrictions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 w-full max-w-3xl">
        {/* Profile 1: Super Admin */}
        <Card className="p-6 border bg-card shadow-card flex flex-col justify-between hover:border-primary transition">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-sm mb-3">
              <ShieldCheck className="h-5 w-5" />
              <span>Super Admin</span>
            </div>
            <h3 className="text-base font-black text-brand-navy">R H Adhoni</h3>
            <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
              Full system rights. Access to financials, metrics, deletion of records, and system administration.
            </p>
          </div>
          <Button
            onClick={() => handleLogin("R H Adhoni", "super_admin")}
            className="mt-6 w-full bg-primary hover:bg-brand-navy text-xs h-9"
          >
            Access as Super Admin
          </Button>
        </Card>

        {/* Profile 2: Assistant Admin */}
        <Card className="p-6 border bg-card shadow-card flex flex-col justify-between hover:border-primary transition">
          <div>
            <div className="flex items-center gap-2 text-amber-600 font-bold text-sm mb-3">
              <UserCheck className="h-5 w-5" />
              <span>Assistant Admin</span>
            </div>
            <h3 className="text-base font-black text-brand-navy">Bibi Ayesha</h3>
            <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
              Restricted management rights. Read-only on financial graphs, cannot delete files or client entries.
            </p>
          </div>
          <Button
            onClick={() => handleLogin("Bibi Ayesha", "assistant_admin")}
            variant="outline"
            className="mt-6 w-full text-xs h-9 border-amber-500/35 text-amber-700 hover:bg-amber-500/10"
          >
            Access as Assistant
          </Button>
        </Card>

        {/* Profile 3: Customer */}
        <Card className="p-6 border bg-card shadow-card flex flex-col justify-between hover:border-primary transition">
          <div>
            <div className="flex items-center gap-2 text-slate-600 font-bold text-sm mb-3">
              <Key className="h-5 w-5" />
              <span>Customer Portal</span>
            </div>
            <h3 className="text-base font-black text-brand-navy">Demo Client</h3>
            <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
              No staff console permissions. Access limited to public pages and customer tracking dashboard.
            </p>
          </div>
          <Button
            onClick={() => handleLogin("Demo Customer", "customer")}
            variant="secondary"
            className="mt-6 w-full text-xs h-9"
          >
            Access as Client
          </Button>
        </Card>
      </div>

      {currentUser && (
        <Card className="mt-10 p-4 border bg-secondary/30 flex flex-col sm:flex-row items-center gap-4 max-w-md w-full justify-between">
          <div className="flex items-center gap-2 text-xs">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              Currently logged in as: <span className="font-bold text-brand-navy">{getRoleLabel(currentUser.role)}</span>
            </span>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="text-xs h-8 text-rose-500 hover:text-rose-700 hover:bg-rose-50/50">
            Sign Out
          </Button>
        </Card>
      )}
    </div>
  );
}
