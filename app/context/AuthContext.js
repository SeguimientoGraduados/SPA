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

  const login = (user, token) => {
    Cookies.set("token", token, {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("user", user, {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });
    setAuthState({ isAuthenticated: true, user: user });
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setAuthState({ isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
