import React, { useState } from "react";
import { Input, IconButton, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import SelectOption from "../Utils/SelectOption";
import TooltipInfo from "../Utils/TooltipInfo";
import RadioHorizontal from "../Utils/RadioHorizontal";

const Formacion = ({
  sendChange,
  opcionesFormacion,
  formacionInicial = [],
  visibilidadFormacion,
  handleVisibilidadChange
}) => {
  const [formaciones, setFormaciones] = useState(formacionInicial);

  const addFormacion = () => {
    setFormaciones([
      ...formaciones,
      { titulo: "", institucion: "", nivel: "" },
    ]);
  };

  const handleInternalChange = (e, index, field) => {
    const { value } = e.target;
    const newformaciones = [...formaciones];
    newformaciones[index][field] = value;

    const allFieldsFilled = Object.values(newformaciones[index]).every(
      (val) => val !== ""
    );
    if (allFieldsFilled) {
      setFormaciones(newformaciones);
      sendChange({ target: { name: "formacion", value: newformaciones } });
    }
  };

  const removeFormacion = (index) => {
    const newFormaciones = formaciones.filter((_, i) => i !== index);
    setFormaciones(newFormaciones);
    sendChange({ target: { name: "formacion", value: [] } });
  };

  return (
    <>
      <div className="mb-4">
        <Typography
          className="font-normal text-center"
          variant="h5"
          color="blue-gray"
        >
          Educación y/o Formación externa
        </Typography>
        <div className="flex flex-row justify-center">
          <RadioHorizontal
            label="Privacidad de Respuestas:"
            value={visibilidadFormacion ? 'publico' : 'protegido'}
            handleChange={handleVisibilidadChange}
          />
        </div>

        <div className="flex flex-col gap-4 items-center">
          {formaciones.map((item, index) => (
            <div
              key={index}
              className="w-full grid grid-cols-6 gap-3 items-start"
            >
              <div className="col-span-5 grid grid-cols-2 gap-2">
                <Input
                  label="Título"
                  className="bg-tremor-background"
                  onBlur={(e) => handleInternalChange(e, index, "titulo")}
                  value={item.titulo}
                />
                <SelectOption
                  select="Nivel"
                  handleChange={(e) => handleInternalChange(e, index, "nivel")}
                  options={opcionesFormacion}
                />
                <div className="col-span-2">
                  <Input
                    label="Institución"
                    className="bg-tremor-background w-full"
                    onBlur={(e) => handleInternalChange(e, index, "institucion")}
                    value={item.institucion}
                  />
                </div>
              </div>

              <div className="flex items-center my-auto justify-center">
                <IconButton
                  variant="gradient"
                  color="red"
                  className="rounded-full"
                  onClick={() => removeFormacion(index)}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </IconButton>
              </div>
            </div>
          ))}
          <IconButton
            variant="gradient"
            color="blue"
            className="rounded-full"
            onClick={addFormacion}
          >
            <FontAwesomeIcon icon={faPlus} />
          </IconButton>
        </div></div>
    </>
  );
};

export default Formacion;
