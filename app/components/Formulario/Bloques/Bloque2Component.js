import { Input, Typography, Textarea } from "@material-tailwind/react";
import React, { useState } from "react";
import CheckboxList from "../../Utils/CheckboxList";
import RadioHorizontal from "../../Utils/RadioHorizontal";
import TooltipInfo from "../../Utils/TooltipInfo";
import SelectOption from "../../Utils/SelectOption";

const SegundoBloque = ({
  opcionesOcupacion,
  opcionesSectorProp,
  opcionesExperiencia,
  handleChange,
}) => {
  const [opcionesSector, setOpcionesSector] = useState(opcionesSectorProp);
  const handleChangeSector = (event) => {
    const { value } = event.target;
    setOpcionesSector(value);
    handleChange({ target: { name: "ocupacion_sector", value } });
  };

  const handleChangeOcupacion = (event) => {
    const { value } = event.target;
    const ocupacion_trabajo = value;
    handleChange({
      target: { name: "ocupacion_trabajo", value: ocupacion_trabajo },
    });
  };

  const handleChangeAnios = (event) => {
    const { value } = event.target;
    const experiencia_anios = value;
    handleChange({
      target: { name: "experiencia_anios", value: experiencia_anios },
    });
  };

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
            items={opcionesSector}
            name="ocupacion_sector"
            opcionesSeleccionadas={[]}
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
    </>
  );
};
export default SegundoBloque;
