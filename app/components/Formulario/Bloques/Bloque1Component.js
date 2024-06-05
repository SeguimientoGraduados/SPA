import { Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import DatePicker from "../../Utils/DatePicker";
import TituloForm from "../../Utils/TituloForm";
import obtenerCoordenadasCiudad from "@/app/services/geocodificationService";

const PrimerBloque = ({ handleChange, carreras }) => {
  const opcionesCarreras = carreras.map((carrera) => ({
    value: carrera.id.toString(),
    label: carrera.nombre,
  }));

  const [rrssData, setRrssData] = useState({
    linkedin: "",
    facebook: "",
    twitter: "",
  });

  const [ciudad, setCiudad] = useState({
    nombre: "",
    latitud: "",
    longitud: "",
  });

  const handleInternalChange = (e, rrssName) => {
    const newRrssData = { ...rrssData, [rrssName]: e.target.value };
    setRrssData(newRrssData);

    const formattedRrss = Object.keys(newRrssData).map((key) => ({
      rrss: key,
      url: newRrssData[key],
    }));
    handleChange({ target: { name: "rrss", value: formattedRrss } });
  };

  const [error, setError] = useState(null);
  const handleChangeCiudad = async (e) => {
    const { value } = e.target;
    try {
      const ciudadAPI = await obtenerCoordenadasCiudad(value);

      setCiudad({
        nombre: ciudadAPI.name,
        latitud: ciudadAPI.lat,
        longitud: ciudadAPI.lon
      });

      setError(null);
    } catch (error) {
      setError(error.message);
      console.log(error.message)
    }
  };

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
        <Input
          label="Nombre"
          name="nombre"
          onChange={handleChange}
          required
          onInvalid={(e) =>
            e.currentTarget.setCustomValidity("Campo obligatorio")
          }
          onInput={(e) => e.currentTarget.setCustomValidity("")}
        />

        <Input
          label="DNI"
          name="dni"
          onChange={handleChange}
          required
          onInvalid={(e) =>
            e.currentTarget.setCustomValidity("Campo obligatorio")
          }
          onInput={(e) => e.currentTarget.setCustomValidity("")}
        />

        <DatePicker
          label={"Fecha de nacimiento"}
          name="fecha_nacimiento"
          onChange={handleChange}
          required
          onInvalid={(e) =>
            e.currentTarget.setCustomValidity("Campo obligatorio")
          }
          onInput={(e) => e.currentTarget.setCustomValidity("")}
        />

        <TituloForm
          onChange={handleChange}
          carreras={opcionesCarreras}
          name="carreras"
        />

        <Input
          label="Ciudad"
          name="ciudad"
          onBlur={handleChangeCiudad}
          required
          onInvalid={(e) =>
            e.currentTarget.setCustomValidity("Campo obligatorio")
          }
          onInput={(e) => e.currentTarget.setCustomValidity("")}
          error={Boolean(error)}
        />

        <Typography
          variant="h5"
          color="blue-gray"
          className="font-normal text-center mt-2"
        >
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
            name="contacto"
            onChange={handleChange}
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
            value={rrssData.linkedin}
            onChange={(e) => handleInternalChange(e, "linkedin")}
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
            value={rrssData.facebook}
            onChange={(e) => handleInternalChange(e, "facebook")}
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
            value={rrssData.twitter}
            onChange={(e) => handleInternalChange(e, "twitter")}
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
