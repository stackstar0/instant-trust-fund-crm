import React, { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAPI } from "@/lib/api";

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
  const queryClient = useQueryClient();

  const { data: user = null, isLoading, refetch } = useQuery<User | null>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      try {
        const data = await fetchAPI("/auth/me");
        return data.user as User;
      } catch (error) {
        // If unauthenticated or token expires, return null
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });

  const login = (data: User) => {
    queryClient.setQueryData(["auth", "me"], data);
  };

  const logoutMutation = useMutation({
    mutationFn: () => fetchAPI("/auth/logout", { method: "POST" }),
    onSuccess: () => {
      queryClient.setQueryData(["auth", "me"], null);
      queryClient.clear(); // Clear all query caches on logout for security
    },
  });

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const checkAuth = async () => {
    await refetch();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        checkAuth,
      }}
    >
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
