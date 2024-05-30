import { Input, Typography } from "@material-tailwind/react";
import React from "react";
import DatePicker from "../../Utils/DatePicker";
import TituloForm from "../../Utils/TituloForm";

const PrimerBloque = ({carreras}) => {
  return (
    <>
      <Typography
        variant="h3"
        color="blue-gray"
        className="text-center font-normal"
      >
        Información Personal
      </Typography>

      <div className="flex flex-col gap-4">
        <Input label="Nombre" labelProps={{ className: "font-semibold" }} />

        <Input label="DNI" labelProps={{ className: "font-semibold" }} />

        <DatePicker />

        <TituloForm carreras={carreras}/>

        <Input label="Ciudad" labelProps={{ className: "font-semibold" }} />

        <Typography variant="h5" color="blue-gray" className="font-normal text-center mt-2">
          Informacion de Contacto
        </Typography>
        <div className="flex flex-row gap-2">
          <img
            src={`/logos/gmail.svg`}
            alt="Gmail Logo"
            className="h-8 w-10 mr-2"
          />
          <Input
            placeholder="ejemplo@mail.com"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <div className="flex flex-row gap-2">
          <img
            src={`/logos/Linkedin.webp`}
            alt="Linkedin Logo"
            className="h-10 w-10 mr-2"
          />
          <Input
            placeholder="https://www.linkedin.com/in/ejemplo/"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <div className="flex flex-row gap-2">
          <img
            src={`/logos/Facebook.webp`}
            alt="Facebook Logo"
            className="h-10 w-10 mr-2"
          />
          <Input
            placeholder="https://www.facebook.com/ejemplo/"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <div className="flex flex-row gap-2">
          <img src={`/logos/X.webp`} alt="X Logo" className="h-10 w-10 mr-2" />
          <Input
            placeholder="https://www.twitter.com/ejemplo/"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default PrimerBloque;
