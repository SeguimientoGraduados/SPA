import { Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import DatePicker from "../../Utils/DatePicker";
import TituloForm from "../../Utils/TituloForm";
import obtenerCoordenadasCiudad from "@/app/services/geocodificationService";
import ContactoComponent from "../ContactoComponent";

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

        <ContactoComponent />
      </div>
    </>
  );
};

export default PrimerBloque;
