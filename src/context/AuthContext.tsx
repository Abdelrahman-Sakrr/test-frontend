import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const AUTH_KEY = "auth_token";

interface AuthContextValue {
  token: string | null;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    SecureStore.getItemAsync(AUTH_KEY)
      .then((stored) => setToken(stored))
      .catch(() => setToken(null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (newToken: string) => {
    await SecureStore.setItemAsync(AUTH_KEY, newToken);
    setToken(newToken);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(AUTH_KEY);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}