import {
  Input,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import DatePicker from '../../Utils/DatePicker'
import TituloForm from '../../Utils/TituloForm'


const PrimerBloque = () => {


  return (
    <>
      <Typography variant="h3" color="blue-gray" className="text-center -mb-3">
        Información Personal
      </Typography>

      <div className="flex">
        <div className="w-1/2 pr-4 mr-12">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Nombre
          </Typography>
          <Input
            size="lg"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />

          <Typography variant="h4" color="blue-gray" className="mt-6 mb-2">
            DNI
          </Typography>
          <Input
            size="lg"
            className="mb-3 !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />

          <Typography variant="h4" color="blue-gray" className="mt-6 mb-2">
            Fecha Nacimiento
          </Typography>
          <DatePicker />

          <div className="mt-6">
            <TituloForm />
          </div>

        </div>

        <div className="w-1/2 pl-4">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            Ciudad
          </Typography>
          <Input
            size="lg"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />

          <Typography variant="h4" color="blue-gray" className="mb-2 mt-6">
            Contacto
          </Typography>
          <div className="flex items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/768px-Gmail_icon_%282020%29.svg.png"
              alt="Gmail Logo"
              className="h-8 w-10 mr-2"
            />
            <Input
              size="lg"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <Typography variant="h4" color="blue-gray" className="mb-2 mt-6">
            Redes Sociales
          </Typography>
          <div className="flex items-center">
            <img
              src={`/logos/Linkedin.png`}
              alt="Linkedin Logo"
              className="h-10 w-10 mr-2"
            />
            <Input
              size="lg"
              label="Ingrese la Url"
            />
          </div>
          <div className="flex items-center mt-6">
            <img
              src={`/logos/Facebook.png`}
              alt="Facebook Logo"
              className="h-10 w-10 mr-2"
            />
            <Input
              size="lg"
              label="Ingrese la Url"
            />
          </div>
          <div className="flex items-center mt-6">
            <img
              src={`/logos/X.png`}
              alt="X Logo"
              className="h-10 w-10 mr-2"
            />
            <Input
              size="lg"
              label="Ingrese la Url"
            />
          </div>
        </div>
      </div>

    </>
  );
}
export default PrimerBloque;