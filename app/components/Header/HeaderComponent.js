"use client";
import Image from "next/image";
import logoUns from "../../../public/logo.webp";
import Link from "next/link";
import ModalLogin from "../Login/ModalLoginComponent";
import React from "react";
import { Button } from "@material-tailwind/react";

const Header = () => {

  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-md flex flex-row justify-between px-40 py-3">
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
      <div className="grid grid-cols-3 items-center">
        <Link href="/formulario" passHref>
          <Button
            className="text-md"
            variant="text"
            color="white">
            GRADUADOS
          </Button>
        </Link>
        <Link href="/solicitudes" passHref>
          <Button
            className="text-md"
            variant="text"
            color="white">
            SOLICITUDES
          </Button>
        </Link>
        <ModalLogin />
      </div>
    </header>
  );
};

export default Header;
