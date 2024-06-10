import React, { useState } from "react";
import { Input, IconButton, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import SelectOption from "../Utils/SelectOption";

const FormacionComponent = ({ sendChange, opcionesFormacion }) => {
  const [formaciones, setFormaciones] = useState([
    { titulo: "", institucion: "", nivel: "" },
  ]);

  const addFormacion = () => {
    setFormaciones([...formaciones, { titulo: "", institucion: "", nivel: "" }]);
  };

  const handleInternalChange = (e, index, field) => {
    const newformaciones = [...formaciones];
    newformaciones[index][field] = e.target.value;
    setFormaciones(newformaciones);
    sendChange({ target: { name: "formacion", value: formaciones } });
  };

  const removeFormacion = (index) => {
    const newformaciones = formaciones.filter((_, i) => i !== index);
    setFormaciones(newformaciones);
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
                  onBlur={(e) => handleInternalChange(e, index, "titulo")}
                />
                <SelectOption
                  select="Nivel"
                  handleChange={(e) => handleInternalChange(e, index, "nivel")}
                  options={opcionesFormacion}
                />
              </div>
              <Input
                label="Institución"
                onBlur={(e) => handleInternalChange(e, index, "institucion")}
              />
            </div>
            <IconButton
              variant="outlined"
              color="red"
              className="rounded-full"
              onClick={() => removeFormacion(index)}
            >
              <FontAwesomeIcon icon={faMinus} />
            </IconButton>
          </div>
        ))}
        <IconButton variant="outlined" color="blue" className="rounded-full" onClick={addFormacion}>
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>
      </div>
    </>
  );
};

export default FormacionComponent;
