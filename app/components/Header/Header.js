"use client";
import Image from "next/image";
import logoUns from "../../../public/logo.webp";
import Link from "next/link";
import ModalLogin from "./ModalLogin";
import React, { useContext } from "react";
import { Button } from "@material-tailwind/react";
import { AuthContext } from "@/app/context/AuthContext";

const Header = () => {
  const { authState } = useContext(AuthContext);
  const { isAuthenticated, user, graduado, loading } = authState;
  
  if (loading) {
    return; 
  }

  return (
    <header className="bg-gradient-to-t from-blue-600 to-blue-800 shadow-md flex flex-row justify-between px-40 py-3">
      <div className="flex items-center">
        <Link href="/">
          <Image
            className="h-auto w-auto"
            src={logoUns}
            alt="UNS"
            width={80}
            priority={true}
          />
        </Link>
      </div>
      <div className="flex flex-row items-center">
        {isAuthenticated && user?.rol !== "admin" && !graduado && (
          <Link href="/formulario" passHref>
            <Button className="text-md" variant="text" color="white">
              SUMATE AL MAPA
            </Button>
          </Link>
        )}
        {isAuthenticated && user?.rol === "admin" && (
          <Link href="/solicitudes" passHref>
            <Button className="text-md" variant="text" color="white">
              SOLICITUDES
            </Button>
          </Link>
        )}
        <ModalLogin />
      </div>
    </header>
  );
};

export default Header;
