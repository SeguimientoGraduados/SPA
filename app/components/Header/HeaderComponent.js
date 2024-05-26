"use client";
import Image from "next/image";
import logoUns from "../../../public/logo.svg"
import Link from 'next/link';
import ModalLogin from '../Login/ModalLoginComponent';
import React, { useState } from "react";

const Header = () => {

  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);

  return (
    <header className="bg-blue-200 flex justify-between items-center px-32 py-4 border-b-2 border-blue-300">
      <div className="flex items-center">
        <Image className="h-auto" src={logoUns} alt="UNS" width={50} priority={true}/>
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
