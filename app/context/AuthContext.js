"use client";
import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const token = Cookies.get("token");
    let user = null;

    try {
      const userCookie = Cookies.get("user");
      if (userCookie) {
        user = JSON.parse(userCookie);
      }
    } catch (error) {
      console.error("Failed to parse user cookie:", error);
    }

    if (token && user) {
      setAuthState({
        isAuthenticated: true,
        user: user,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
