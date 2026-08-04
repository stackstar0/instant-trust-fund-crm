import React, { createContext, useContext, ReactNode, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { fetchAPI } from "@/lib/api";

// Legacy UI pages can still consume a safe context shape, but they now use the authenticated backend when available.
interface AppStoreContextType {
  currentUser: any;
  setCurrentUser: (u: any) => void;
  customers: any[];
  addCustomer: (c: any) => void;
  updateCustomerStatus: (id: string, s: string) => void;
  deleteCustomer: (id: string) => void;
  sms: any[];
  addSms: (s: any) => void;
  notifications: any[];
  addNotification: (n: any) => void;
  dismissNotification: (id: string) => void;
  tasks: any[];
  addTask: (t: any) => void;
  updateTask: (id: string, updates: any) => void;
  deleteTask: (id: string) => void;
  addApplication: (payload: any) => Promise<any>;
}

const StubStoreContext = createContext<AppStoreContextType | undefined>(undefined);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    if (user) {
      setCurrentUser({ ...user, name: user.fullName || user.email || "User" });
    } else {
      setCurrentUser(null);
    }
  }, [user]);

  const addApplication = async (payload: any) => {
    const response = await fetchAPI("/applications/apply", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return response.application;
  };

  const value = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      customers: [],
      addCustomer: () => {},
      updateCustomerStatus: () => {},
      deleteCustomer: () => {},
      sms: [],
      addSms: () => {},
      notifications: [],
      addNotification: () => {},
      dismissNotification: () => {},
      tasks: [],
      addTask: () => {},
      updateTask: () => {},
      deleteTask: () => {},
      addApplication,
    }),
    [currentUser]
  );

  return (
    <StubStoreContext.Provider value={value}>
      {children}
    </StubStoreContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(StubStoreContext);
  if (context === undefined) {
    throw new Error("useAppStore must be used within an AppStoreProvider");
  }
  return context;
}
