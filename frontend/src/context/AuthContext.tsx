import React, { createContext, useContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type AuthContextType = {
  userId: string | null;
  login: (userId: string) => void;
  logout: () => void;
} | null;

const AuthContext = createContext<AuthContextType>(null);

export const AuthProvider = ({ children }: Props) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const login = (userId: string) => {
    setUserId(userId);
    localStorage.setItem("userId", userId);
  };

  const logout = () => {
    setUserId(null);
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("");
  }
  return context;
};
