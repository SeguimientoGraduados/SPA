'use client'
import Image from "next/image";
import logoUns from "../../../public/uns-footer.webp"
import bandera from "../../../public/arg.svg"
import { Typography, IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-md px-32 py-4">
      <div className="flex justify-around items-center">
        <Image className="h-auto w-auto" src={logoUns} alt="UNS" width={80} />
        <div className="basis-1/2 text-sm text-center">
          <Typography variant="small" className="text-sm">
            <span className="font-bold">Universidad Nacional del Sur</span> <br />
            Sede Rectorado: Avenida Colón 80 - Bahía Blanca - 8000FTN <br />
            Provincia de Buenos Aires - República Argentina <br />
            Teléfono +54 291 459 5000 - <a href="http://www.uns.edu.ar" className="font-bold text-white hover:underline">www.uns.edu.ar</a> <br />
          </Typography>
        </div>
        <div className="basis-1/2 text-sm text-center">
          <Typography variant="small" className="text-sm">
            Esta página fue desarrollada como Proyecto Final de Carrera <br />
            para la Secretaría General de Cultura y Extensión Universitaria por:
          </Typography>
          <div className="flex justify-center mt-2 space-x-4">
            <div>
              <Typography variant="small" className="text-sm">
                <span className="font-bold">Dylan Hughes</span> <br />
                <FontAwesomeIcon icon={faEnvelope} /> <a href="mailto:dylanhughes028@gmail.com" className="font-bold text-white hover:underline">dylanhughes028@gmail.com</a>
              </Typography>
            </div>
            <div>
              <Typography variant="small" className="text-sm">
                <span className="font-bold">Gonzalo Riquelme Ludwig</span> <br />
                <FontAwesomeIcon icon={faEnvelope} /> <a href="mailto:gonzaloriquelmeludwig@gmail.com" className="font-bold text-white hover:underline">gonzaloriquelmeludwig@gmail.com</a>
              </Typography>
            </div>
          </div>
        </div>

        <Image className="h-auto" src={bandera} alt="ARG" width={100} />
      </div>
    </footer >
  );
};

export default Footer;
