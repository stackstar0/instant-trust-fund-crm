import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchAPI } from "./api";

export type Role = "super_admin" | "assistant_admin" | "customer";

export interface User {
  id: string;
  fullName: string;
  email?: string;
  mobile?: string;
  dob?: string;
  role: Role;
  permissions?: string[];
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: User) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      // In a real scenario, you'd hit a /me endpoint that verifies the token
      // and returns the current user. For now, we will assume if the refresh token works,
      // we are logged in.
      const data = await fetchAPI("/auth/refresh", { method: "POST" });
      // The refresh endpoint needs to return the user info, or we need a separate /me endpoint.
      // Assuming we implement a /me endpoint later:
      const meData = await fetchAPI("/auth/me");
      setUser(meData.user);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (data: User) => {
    setUser(data);
  };

  const logout = async () => {
    try {
      await fetchAPI("/auth/logout", { method: "POST" });
    } catch (e) {
      console.error(e);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
