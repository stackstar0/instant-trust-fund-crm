// In-memory store: seeded mock customers + newly submitted applications.
// Runtime state (no persistence) — the whole app subscribes via useAppStore.
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { encryptField } from "./crypto";
import {
  generateCustomers,
  generateSmsLogs,
  generateNotifications,
  type MockCustomer,
  type MockSms,
  type MockNotification,
} from "./mock-data";

interface Store {
  customers: MockCustomer[];
  sms: MockSms[];
  notifications: MockNotification[];
  currentUser: { name: string; role: "super_admin" | "assistant_admin" | "customer" } | null;
  setCurrentUser: (u: { name: string; role: "super_admin" | "assistant_admin" | "customer" } | null) => void;
  addApplication: (a: Omit<MockCustomer, "id" | "status" | "appliedOn" | "bank" | "insuranceType" | "referralCode" | "documents"> & { bank?: string; insuranceType?: string; referralCode?: string; documents?: string[] }) => MockCustomer;
  updateStatus: (id: string, status: MockCustomer["status"]) => void;
  deleteCustomer: (id: string) => void;
  resendSms: (id: string) => void;
  triggerScheduler: () => { sent: number; failed: number };
}

const StoreCtx = createContext<Store | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const seed = useMemo(() => {
    const customers = generateCustomers(100);
    const sms = generateSmsLogs(300, customers);
    const notifications = generateNotifications(customers);
    return { customers, sms, notifications };
  }, []);
  const [customers, setCustomers] = useState<MockCustomer[]>(seed.customers);
  const [sms, setSms] = useState<MockSms[]>(seed.sms);
  const [notifications] = useState<MockNotification[]>(seed.notifications);
  const [currentUser, setCurrentUser] = useState<Store["currentUser"]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ify_current_user");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          // ignore
        }
      }
    }
    return {
      name: "R H Adhoni",
      role: "super_admin",
    };
  });

  const handleSetCurrentUser = (u: Store["currentUser"]) => {
    setCurrentUser(u);
    if (typeof window !== "undefined") {
      if (u) {
        localStorage.setItem("ify_current_user", JSON.stringify(u));
      } else {
        localStorage.removeItem("ify_current_user");
      }
    }
  };

  const value: Store = {
    customers,
    sms,
    notifications,
    currentUser,
    setCurrentUser: handleSetCurrentUser,
    addApplication: (a) => {
      let assignedTo = "R H Adhoni";
      if (a.referralCode) {
        const ref = a.referralCode.trim().toUpperCase();
        if (ref.includes("AYESHA") || ref.includes("EMP002") || ref === "BROKER101") {
          assignedTo = "Bibi Ayesha";
        }
      }
      const newCust: MockCustomer = {
        ...a,
        aadhaar: a.aadhaar && a.aadhaar !== "Not Provided" ? encryptField(a.aadhaar) : "Not Provided",
        pan: a.pan && a.pan !== "Not Provided" ? encryptField(a.pan) : "Not Provided",
        id: `IFY${(10000 + customers.length + 1).toString()}`,
        status: "Pending",
        appliedOn: new Date().toISOString(),
        assignedTo,
      };
      setCustomers((prev) => [newCust, ...prev]);
      return newCust;
    },
    updateStatus: (id, status) => {
      if (currentUser?.role !== "super_admin" && currentUser?.role !== "assistant_admin") {
        throw new Error("Access Denied: Customer role cannot update application status.");
      }
      setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    },
    deleteCustomer: (id) => {
      if (currentUser?.role !== "super_admin") {
        throw new Error("Access Denied: Super Admin role required to delete customer entities.");
      }
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    },
    resendSms: (id) =>
      setSms((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, status: "Sent", sentAt: new Date().toISOString() } : s,
        ),
      ),
    triggerScheduler: () => {
      let sentCount = 0;
      let failedCount = 0;
      // Pre-calculate to ensure accurate return numbers
      sms.forEach((s) => {
        if (s.status === "Scheduled") {
          if (Math.random() > 0.08) {
            sentCount++;
          } else {
            failedCount++;
          }
        }
      });

      setSms((prev) => {
        let localSent = 0;
        return prev.map((s) => {
          if (s.status === "Scheduled") {
            // Match the pre-calculated random counts or generate now
            const success = localSent < sentCount;
            localSent++;
            return {
              ...s,
              status: success ? "Sent" : "Failed",
              sentAt: new Date().toISOString(),
            };
          }
          return s;
        });
      });

      return { sent: sentCount, failed: failedCount };
    },
  };
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useAppStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useAppStore must be used inside AppStoreProvider");
  return ctx;
}
