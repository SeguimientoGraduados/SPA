import {
  Input,
  Typography,
  Textarea 
} from "@material-tailwind/react";
import React from "react";
import CheckboxVertical from '../../Utils/CheckboxVertical'


const PrimerBloque = () => {

  return (
    <>
      <Typography variant="h4" color="blue-gray" className="-mb-3">
        Nombre
      </Typography>
      <Input
        size="lg"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      <Typography variant="h4" color="blue-gray" className="-mb-3">
        Email
      </Typography>
      <Input
        size="lg"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      {/* Ocupación Actual */}
      <Typography variant="h4" color="blue-gray" className="-mb-3">
        Ocupación Actual
      </Typography>

      <div className="flex space-x-6 ml-3">
        <div className="flex flex-col">
          <Typography variant="h5" color="blue-gray">
            Tipo de Trabajo
          </Typography>
          <CheckboxVertical items={['Relación de dependencia', 'Autónomo']} />
        </div>
        <div className="flex flex-col">
          <Typography variant="h5" color="blue-gray">
            Sector
          </Typography>
          <CheckboxVertical items={['Privado', 'Público']} />
        </div>
      </div>

      <Typography variant="h5" color="blue-gray" className="ml-3 -mt-5 -mb-3">
        Información Adicional
      </Typography>
      <Textarea 
        size="lg"
        placeholder="-"
        className=" ml-3 !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      {/* Experiencia Laboral */}
      <Typography variant="h4" color="blue-gray" className="-mb-3">
        Experiencia Laboral
      </Typography>

      <div className="flex space-x-6 ml-3">
        <div className="flex flex-col">
          <Typography variant="h5" color="blue-gray">
            Categoría
          </Typography>
          <CheckboxVertical items={['Junior', 'Semi Senior', 'Senior']} />
        </div>
        <div className="flex flex-col">
          <Typography variant="h5" color="blue-gray" className=" whitespace-nowrap">
            Información Adicional
          </Typography>
          <Textarea 
            size="lg"
            placeholder="-"
            className="mt-4 !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
      </div>


      {/* Habilidades/Competencias */}
      <Typography variant="h4" color="blue-gray" className="-mb-3">
        Habilidades/Competencias
      </Typography>
      <Textarea 
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