"use client";
import Image from "next/image";
import logoUns from "../../../public/uns-footer.webp";
import bandera from "../../../public/arg.svg";
import { Typography, Tooltip } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faEnvelope,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-md px-32 py-4">
      <div className="flex justify-around items-center">
        <Image className="h-auto w-auto" src={logoUns} alt="UNS" width={80} />
        <div className="text-sm text-center">
          <Typography variant="small" className="text-sm">
            <span className="font-bold">Universidad Nacional del Sur</span>{" "}
            <br />
            Sede Rectorado: Avenida Colón 80 - Bahía Blanca - 8000FTN <br />
            Provincia de Buenos Aires - República Argentina <br />
          </Typography>
          <hr className="my-1 border-t border-white" />
          <Typography variant="small" className="text-sm">
            Esta plataforma fue desarrollada por solicitud de la Secretaría
            General de Cultura y <br />
            Extensión Universitaria como parte del Proyecto Final de Carrera de
            los alumnos:
          </Typography>
          <div className="flex flex-row justify-center gap-2">
            <Tooltip
              className="bg-blue-800"
              content={
                <div className="flex flex-row gap-3 items-center">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <a>dylanhughes028@gmail.com</a>
                </div>
              }
            >
              <Typography variant="small" className="text-sm">
                Dylan Hughes y
              </Typography>
            </Tooltip>

            <Tooltip
              className="bg-blue-800"
              content={
                <div className="flex flex-row gap-3 items-center">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <a>gonzaloriquelmeludwig@gmail.com</a>
                </div>
              }
            >
              <Typography variant="small" className="text-sm">
                Gonzalo Martín Riquelme Ludwig
              </Typography>
            </Tooltip>

            <Tooltip
              className="bg-blue-800"
              content={
                <Typography variant="small" className="text-sm">
                  Con la Direccion de: Dr Martín Larrea y Dr. Luciano Tamargo{" "}
                  <br />Y la colaboración de: Javier Sáenz Coré y Pablo
                  Marinangeli
                </Typography>
              }
            >
              <FontAwesomeIcon icon={faHandshake} size="lg" />
            </Tooltip>
          </div>
        </div>

        <Image className="h-auto" src={bandera} alt="ARG" width={100} />
      </div>
    </footer>
  );
};

export default Footer;
