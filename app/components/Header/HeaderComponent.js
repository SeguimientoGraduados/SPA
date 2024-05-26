"use client";
import Image from "next/image";
import logoUns from "../../../public/logo.svg"
import Link from 'next/link';
import ModalLogin from '../Login/ModalLoginComponent';
import React from "react";

const Header = () => {

  return (
    <header className="bg-blue-200 flex justify-between items-center px-32 py-4 border-b-2 border-blue-300">
      <div className="flex items-center">
        <Link href="/">
          <Image className="h-auto" src={logoUns} alt="UNS" width={50} priority={true} />
        </Link>
      </div>
      <button className="bg-sky-600 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded">
        <Link href="/formulario">
          Formulario
        </Link>
      </button>
      <div>
        <ModalLogin />
      </div>
    </header>
  );
};

export default Header;
