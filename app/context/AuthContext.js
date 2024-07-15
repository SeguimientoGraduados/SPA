"use client";
import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    graduado: false
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

    const graduado = Cookies.get("graduado") === "true";

    if (token && user && graduado) {
      setAuthState({
        isAuthenticated: true,
        user: user,
        graduado: graduado
      });
    }
   }, []); 

  const login = (user, token, graduado) => {
    Cookies.set("token", token, {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("user", JSON.stringify(user), {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("graduado", graduado, {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });
    setAuthState({ isAuthenticated: true, user: user, graduado: graduado });
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("graduado");
    setAuthState({ isAuthenticated: false, user: null, graduado: false });
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
