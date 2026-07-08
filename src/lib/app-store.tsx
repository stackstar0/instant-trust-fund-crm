// In-memory store: seeded mock customers + newly submitted applications.
// Runtime state (no persistence) — the whole app subscribes via useAppStore.
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
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
  addApplication: (a: Omit<MockCustomer, "id" | "status" | "appliedOn">) => MockCustomer;
  updateStatus: (id: string, status: MockCustomer["status"]) => void;
  deleteCustomer: (id: string) => void;
  resendSms: (id: string) => void;
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

  const value: Store = {
    customers,
    sms,
    notifications,
    addApplication: (a) => {
      const newCust: MockCustomer = {
        ...a,
        id: `IFY${(10000 + customers.length + 1).toString()}`,
        status: "Pending",
        appliedOn: new Date().toISOString(),
      };
      setCustomers((prev) => [newCust, ...prev]);
      return newCust;
    },
    updateStatus: (id, status) =>
      setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c))),
    deleteCustomer: (id) => setCustomers((prev) => prev.filter((c) => c.id !== id)),
    resendSms: (id) =>
      setSms((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, status: "Sent", sentAt: new Date().toISOString() } : s,
        ),
      ),
  };
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useAppStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useAppStore must be used inside AppStoreProvider");
  return ctx;
}
