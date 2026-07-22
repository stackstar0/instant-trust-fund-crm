import React, { createContext, useContext, ReactNode } from "react";

// Stubbed AppStore to prevent compilation errors in legacy dashboard files
// while they are being migrated to the real MongoDB API.
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
}

const StubStoreContext = createContext<AppStoreContextType | undefined>(undefined);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  return (
    <StubStoreContext.Provider
      value={{
        currentUser: null,
        setCurrentUser: () => {},
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
      }}
    >
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
