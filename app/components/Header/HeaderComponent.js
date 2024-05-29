"use client";
import Image from "next/image";
import logoUns from "../../../public/logo.webp";
import Link from "next/link";
import ModalLogin from "../Login/ModalLoginComponent";
import React from "react";
import { Button } from "@material-tailwind/react";

const Header = () => {
  return (
    <header className="bg-blue-200 flex flex-row justify-between px-32 py-4 border-b-2 border-blue-300">
      <div className="flex items-center">
        <Link href="/">
          <Image
            className="h-auto"
            src={logoUns}
            alt="UNS"
            width={50}
            priority={true}
          />
        </Link>
      </div>
      <div className="grid grid-cols-3 items-center gap-3">
        <Link href="/formulario" passHref>
          <Button
            variant="blue"
            color="blue"
          >
            Formulario
          </Button>
        </Link>
        <Link href="/solicitudes" passHref>
          <Button
            variant="blue"
            color="blue"
          >
            Solicitudes
          </Button>
        </Link>
        <ModalLogin />
      </div>
    </header>
  );
};

export default Header;
