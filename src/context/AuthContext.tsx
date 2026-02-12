import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("learnloop-token");
    const storedUser = localStorage.getItem("learnloop-user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, _password: string, remember = false) => {
    // Mock login
    const mockUser: User = { id: "1", name: "Alex Student", email };
    const mockToken = "mock-jwt-token-" + Date.now();
    setUser(mockUser);
    setToken(mockToken);
    if (remember) {
      localStorage.setItem("learnloop-token", mockToken);
      localStorage.setItem("learnloop-user", JSON.stringify(mockUser));
    }
  };

  const register = async (name: string, email: string, _password: string) => {
    const mockUser: User = { id: "1", name, email };
    const mockToken = "mock-jwt-token-" + Date.now();
    setUser(mockUser);
    setToken(mockToken);
    localStorage.setItem("learnloop-token", mockToken);
    localStorage.setItem("learnloop-user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("learnloop-token");
    localStorage.removeItem("learnloop-user");
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
