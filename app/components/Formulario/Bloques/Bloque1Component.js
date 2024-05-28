import {
  Input,
  Typography,
  Textarea,
  Select,
  Option
} from "@material-tailwind/react";
import React from "react";
import CheckboxVertical from '../../Utils/CheckboxVertical'
import DatePicker from '../../Utils/DatePicker'


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

      <Typography variant="h4" color="blue-gray" className="-mb-3">
        Título
      </Typography>
      <Select label="Selecciona el Título">
        <Option>Ingeniería en Sistemas de Información</Option>
        <Option>Licenciatura en Ciencias de la Computación</Option>
        <Option>Abogacía</Option>
      </Select>

      <Typography variant="h4" color="blue-gray" className="-mb-3">
        Año de Graduación
      </Typography>
      <Input
        size="lg"
        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />

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
          src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
          alt="Gmail Logo"
          className="h-10 w-10 mr-2"
        />
        <Input
          size="lg"
          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
      </div>
    </>
  );
}
export default PrimerBloque;