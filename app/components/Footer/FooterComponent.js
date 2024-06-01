'use client'
import Image from "next/image";
import logoUns from "../../../public/uns-footer.webp"
import bandera from "../../../public/arg.svg"
import { Typography } from "@material-tailwind/react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-md px-32 py-4">
      <div className="flex justify-around items-center">
        <Image className="h-auto w-auto" src={logoUns} alt="UNS" width={80}/>
        <Typography variant="small" className="basis-1/2 text-sm text-center">
          <span className="font-bold">Universidad Nacional del Sur</span> <br />
          Sede Rectorado: Avenida Colón 80 - Bahía Blanca - 8000FTN <br />
          Provincia de Buenos Aires - República Argentina <br />
          Teléfono +54 291 459 5000 - <a href="http://www.uns.edu.ar" className="font-bold text-white hover:underline">www.uns.edu.ar</a> <br />
        </Typography>



        <Image className="h-auto" src={bandera} alt="ARG" width={100} />
      </div>
    </footer>
  );
};

export default Footer;
