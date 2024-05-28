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
        DNI
      </Typography>
      <Input
        size="lg"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />

      <Typography variant="h4" color="blue-gray" className="-mb-3">
        Fecha Nacimiento
      </Typography>
      <DatePicker />

      <TituloForm />

      <Typography variant="h4" color="blue-gray" className="-mb-3">
        Ciudad
      </Typography>
      <Input
        size="lg"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />

      <Typography variant="h4" color="blue-gray" className="-mb-3">
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

      <Typography variant="h4" color="blue-gray" className="-mb-3">
        Redes Sociales
      </Typography>
      <div className="flex items-center">
        <img
          src={`/logos/Linkedin.webp`}
          alt="Linkedin Logo"
          className="h-10 w-10 mr-2"
        />
        <Input
          size="lg"
          label="Ingrese la Url"
        />
      </div>
      <div className="flex items-center">
        <img
          src={`/logos/Facebook.webp`}
          alt="Facebook Logo"
          className="h-10 w-10 mr-2"
        />
        <Input
          size="lg"
          label="Ingrese la Url"
        />
      </div>
      <div className="flex items-center">
        <img
          src={`/logos/X.webp`}
          alt="X Logo"
          className="h-10 w-10 mr-2"
        />
        <Input
          size="lg"
          label="Ingrese la Url"
        />
      </div>

    </>
  );
}
export default PrimerBloque;