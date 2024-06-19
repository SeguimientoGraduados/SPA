import { Input, Typography, Textarea } from "@material-tailwind/react";
import RadioHorizontal from "../Utils/RadioHorizontal";
import TooltipInfo from "../Utils/TooltipInfo";
import SelectOption from "../Utils/SelectOption";
import DatePicker from "../Utils/DatePicker";
import Titulo from "./Titulo";
import obtenerCoordenadasCiudad from "@/app/services/geocodificationService";
import { conversorFecha } from "../Utils/ConversorFecha";
import Contacto from "./Contacto";
import React, { useState } from "react";
import CheckboxList from "../Utils/CheckboxList";
import Formacion from "./Formacion";
import { Validacion } from "./Validacion";
import Intereses from "./Intereses";

const Bloques = ({
  correo,
  handleChange,
  carreras,
  opcionesRrss,
  opcionesOcupacion,
  opcionesSectorProp,
  opcionesExperiencia,
  opcionesFormacion,
}) => {
  const [error, setError] = useState(null);
  const [rrssData, setRrssData] = useState({
    linkedin: "",
    facebook: "",
    twitter: "",
  });

  const [opcionesSector, setOpcionesSector] = useState([]);
  const [intereses, setIntereses] = useState({
    comunidad: false,
    oferta: false,
    demanda: false,
  });

  const [errors, setErrors] = useState({});

  const opcionesCarreras = carreras.map((carrera) => ({
    value: carrera.id.toString(),
    label: carrera.nombre,
  }));

  const handleValidation = (e) => {
    const { name, value } = e.currentTarget;
    const updatedErrors = Validacion(name, value, errors);
    setErrors(updatedErrors);
  };

  const handleChangeCiudad = async (e) => {
    const { value } = e.target;
    try {
      const ciudadAPI = await obtenerCoordenadasCiudad(value);
      const nuevaCiudad = {
        nombre: ciudadAPI.name,
        latitud: parseFloat(ciudadAPI.lat),
        longitud: parseFloat(ciudadAPI.lon),
        pais: ciudadAPI.address.country,
      };
      setError(null);
      handleChange({ target: { name: "ciudad", value: nuevaCiudad } });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChangeRRSS = (e, rrssName) => {
    const newRrssData = { ...rrssData, [rrssName]: e.target.value };
    setRrssData(newRrssData);

    const formattedRrss = Object.keys(newRrssData)
      .filter((key) => newRrssData[key] !== "")
      .map((key) => ({
        rrss: key,
        url: newRrssData[key],
      }));
    handleValidation({ currentTarget: { name: "rrss", value: formattedRrss } });
    handleChange({ target: { name: "rrss", value: formattedRrss } });
  };

  const handleChangeFecha = (e) => {
    const { value } = e.target;
    const fechaFormateada = conversorFecha(value);
    handleValidation({
      currentTarget: { name: "fecha_nacimiento", value: fechaFormateada },
    });
    handleChange({
      target: { name: "fecha_nacimiento", value: fechaFormateada },
    });
  };

  const handleChangeSector = (e) => {
    const { value } = e.target;
    const sector = value[0];
    setOpcionesSector(sector);
    handleChange({ target: { name: "ocupacion_sector", value: sector } });
  };

  const handleChangeOcupacion = (e) => {
    const { value } = e.target;
    handleChange({ target: { name: "ocupacion_trabajo", value } });
  };

  const handleChangeAnios = (e) => {
    const { value } = e.target;
    handleChange({ target: { name: "experiencia_anios", value } });
  };

  const handleChangeInteres = (e) => {
    const { value } = e.target;
    setIntereses(value);
    handleChange({
      target: { name: "intereses", value: value },
    });
  };

  const handleRequired = (e) => {
    if (e.type === "invalid") {
      e.currentTarget.setCustomValidity("Campo obligatorio");
    } else if (e.type === "input") {
      e.currentTarget.setCustomValidity("");
    }
  };
  return (
    <>
      {/* Bloque 1 */}
      <Typography
        variant="h3"
        color="blue-gray"
        className="text-center font-normal"
      >
        Información Personal
      </Typography>

      <div className="flex flex-col gap-4">
        <Input
          label="Nombre completo"
          name="nombre"
          onChange={handleChange}
          required
          onInvalid={handleRequired}
          onInput={handleRequired}
          onBlur={handleValidation}
          error={errors.nombre}
        />
        {errors.nombre && (
          <span className="text-xs text-red-600 -mt-2">{errors.nombre}</span>
        )}

        <Input
          label="Email"
          name="contacto"
          value={correo}
          placeholder="ejemplo@mail.com"
          onChange={handleChange}
          required
          onInvalid={handleRequired}
          onInput={handleRequired}
          onBlur={handleValidation}
          error={errors.email}
        />
        {errors.email && (
          <span className="text-xs text-red-600 -mt-2">{errors.email}</span>
        )}

        <Input
          label="DNI"
          name="dni"
          onChange={handleChange}
          required
          onInput={handleRequired}
          onInvalid={handleRequired}
          onBlur={handleValidation}
          error={errors.dni}
        />
        {errors.dni && (
          <span className="text-xs text-red-600 -mt-2">{errors.dni}</span>
        )}

        <DatePicker
          label={"Fecha de nacimiento"}
          name="fecha_nacimiento"
          onChange={handleChangeFecha}
          onInput={handleRequired}
          error={errors.fecha_nacimiento}
          required
        />
        {errors.fecha_nacimiento && (
          <span className="text-xs text-red-600 -mt-2">
            {errors.fecha_nacimiento}
          </span>
        )}

        <Titulo
          onChange={handleChange}
          carreras={opcionesCarreras}
          name="carreras"
        />

        <Input
          label="Ciudad"
          name="ciudad"
          onBlur={handleChangeCiudad}
          required
          onInvalid={handleValidation}
          onInput={handleValidation}
          error={Boolean(error)}
        />
        {errors && <span className="text-xs text-red-600 -mt-2">{error}</span>}

        <Contacto
          handleChange={handleChangeRRSS}
          opcionesRrss={opcionesRrss}
          error={errors.rrss}
        />
      </div>

      {/* Bloque 2 */}
      <Typography
        variant="h3"
        color="blue-gray"
        className="text-center font-normal"
      >
        Información Laboral
      </Typography>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <SelectOption
            select={"Ocupacion actual"}
            handleChange={handleChangeOcupacion}
            options={opcionesOcupacion}
            name="ocupacion_trabajo"
          />
          <Input
            label="Nombre de la Empresa"
            name="ocupacion_empresa"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center">
          <CheckboxList
            handleChange={handleChangeSector}
            direction={"row"}
            items={opcionesSectorProp}
            name="ocupacion_sector"
            opcionesSeleccionadas={opcionesSector}
            seleccionUnica={true}
          />
        </div>

        <Textarea
          variant="outlined"
          label="Información Adicional"
          name="ocupacion_informacion_adicional"
          onChange={handleChange}
        />

        <div className="flex items-center flex-row">
          <TooltipInfo label={"Privacidad de las respuestas"} />
          <RadioHorizontal />
        </div>

        <Typography
          variant="h5"
          color="blue-gray"
          className="font-normal text-center"
        >
          Experiencia Laboral
        </Typography>

        <SelectOption
          select={"Años de Experiencia:"}
          handleChange={handleChangeAnios}
          options={opcionesExperiencia}
          name="experiencia_anios"
        />
        <Typography
          className="font-normal text-center"
          variant="h5"
          color="blue-gray"
        >
          Habilidades/Competencias
        </Typography>
        <Textarea
          variant="outlined"
          label="Descripcion"
          name="habilidades_competencias"
          onChange={handleChange}
        />

        <div className="flex items-center flex-row justify-between">
          <TooltipInfo label={"Privacidad de las respuestas"} />
          <RadioHorizontal />
        </div>
      </div>

      {/* Bloque 3 */}
      <Typography
        variant="h3"
        color="blue-gray"
        className="text-center font-normal"
      >
        Información Adicional
      </Typography>

      <div className="flex flex-col gap-4">
        <Input
          label="CV"
          placeholder="https://drive.google.com/CV_Ejemplo"
          labelProps={{ className: "font-semibold" }}
          name="cv"
          onChange={handleChange}
          onBlur={handleValidation}
          error={errors.cv}
        />
        {errors.cv && (
          <span className="text-xs text-red-600 -mt-2">{errors.cv}</span>
        )}

        <Formacion
          sendChange={handleChange}
          opcionesFormacion={opcionesFormacion}
        />
      </div>

      <Typography
        className="font-normal text-center"
        variant="h5"
        color="blue-gray"
      >
        Interés/Predisposición a:
      </Typography>

      <Intereses sendChange={handleChangeInteres}/>
    </>
  );
};

export default Bloques;
