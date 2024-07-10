import React, { useState } from "react";
import { Input, IconButton, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import SelectOption from "../Utils/SelectOption";

const Formacion = ({ sendChange, opcionesFormacion, formacionInicial = [] }) => {
  const [formaciones, setFormaciones] = useState(formacionInicial);

  const addFormacion = () => {
    setFormaciones([...formaciones, { titulo: "", institucion: "", nivel: "" }]);
  };

  const handleInternalChange = (e, index, field) => {
    const { value } = e.target;
    const newformaciones = [...formaciones];
    newformaciones[index][field] = value;

    const allFieldsFilled = Object.values(newformaciones[index]).every(val => val !== "");
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
      <Typography
        className="font-normal text-center"
        variant="h5"
        color="blue-gray"
      >
        Educación y/o Formación externa
      </Typography>
      <div className="flex flex-col gap-4 items-center">
        {formaciones.map((item, index) => (
          <div key={index} className="w-full flex flex-row gap-3 items-center">
            <div>
              <div className="grid grid-cols-2 gap-2 mb-2">
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
              </div>
              <Input
                label="Institución"
                className="bg-tremor-background"
                onBlur={(e) => handleInternalChange(e, index, "institucion")}
                value={item.institucion}
              />
            </div>
            <IconButton
              variant="gradient"
              color="red"
              className="rounded-full"
              onClick={() => removeFormacion(index)}
            >
              <FontAwesomeIcon icon={faMinus} />
            </IconButton>
          </div>
        ))}
        <IconButton variant="gradient" color="blue" className="rounded-full" onClick={addFormacion}>
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>
      </div>
    </>
  );
};

export default Formacion;
