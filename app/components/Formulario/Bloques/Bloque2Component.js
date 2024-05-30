import { Input, Typography, Textarea } from "@material-tailwind/react";
import React from "react";
import CheckboxHorizontal from "../../Utils/CheckboxHorizontal";
import RadioHorizontal from "../../Utils/RadioHorizontal";
import Tooltip from "../../Utils/Tooltip";

const SegundoBloque = () => {
  return (
    <>
      <Typography
        variant="h3"
        color="blue-gray"
        className="text-center font-normal"
      >
        Información Laboral
      </Typography>

      <div className="flex flex-col gap-4">
        <Typography variant="h5" color="blue-gray" className="font-normal text-center mt-2">
          Ocupación Actual
        </Typography>
        
        <CheckboxHorizontal items={["Relación de dependencia", "Autónomo"]} />
        <Input label="Nombre de la Empresa" labelProps={{ className: "font-semibold" }} />
        <CheckboxHorizontal items={["Sector Privado", "Sector Público"]} />
        <Textarea
          variant="outlined"
          label="Información Adicional"
          labelProps={{ className: "font-semibold" }}
        />

        <div className="flex items-center flex-row">
          <Tooltip />
          <Typography className="text-center font-semibold" variant="small" color="blue-gray">
            Visibilidad de Información:
          </Typography>
          <RadioHorizontal />
        </div>

        <Typography variant="h5" color="blue-gray" className="font-normal text-center">
          Experiencia Laboral
        </Typography>

        <Typography className="font-normal text-center" variant="paragraph" color="blue-gray">
          Años de Experiencia:
        </Typography>
        <CheckboxHorizontal items={["0 a 2 años", "2 a 5 años", "5 a 10 años", "Más de 10 años"]}/>
        <Textarea
          variant="outlined"
          label="Información Adicional"
          labelProps={{ className: "font-semibold" }}
        />

        <div className="flex items-center flex-row">
          <Tooltip />
          <Typography className="text-center font-semibold" variant="small" color="blue-gray">
            Visibilidad de Información:
          </Typography>
          <RadioHorizontal />
        </div>

        <Typography variant="h5" color="blue-gray" className="font-normal text-center">
          Habilidades/Competencias
        </Typography>
        <Textarea
          size="md"
          placeholder="-"
          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </div>
    </>
  );
};
export default SegundoBloque;
