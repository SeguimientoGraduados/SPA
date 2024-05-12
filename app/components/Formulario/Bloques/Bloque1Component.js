import {
  Input,
  Typography,
} from "@material-tailwind/react";
import React from "react";

const PrimerBloque = () => {
  return (
    <>
      <Typography variant="h6" color="blue-gray" className="-mb-3">
        Nombre
      </Typography>
      <Input
        size="lg"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      <Typography variant="h6" color="blue-gray" className="-mb-3">
        Ocupación Actual
      </Typography>
      <Input
        size="lg"
        placeholder="-"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      <Typography variant="h6" color="blue-gray" className="-mb-3">
        Experiencia Laboral
      </Typography>
      <Input
        size="lg"
        placeholder="-"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      <Typography variant="h6" color="blue-gray" className="-mb-3">
        Habilidades/Competencias
      </Typography>
      <Input
        size="lg"
        placeholder="-"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
    </>
  );
}
export default PrimerBloque;