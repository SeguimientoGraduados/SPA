import React, { useState } from "react";
import { Input, IconButton, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import SelectOption from "../Utils/SelectOption";

const FormacionComponent = ({ onChange, opcionesFormacion }) => {
  const [formaciones, setFormaciones] = useState([
    { title: "", year: "", nivel: "" },
  ]);

  const addFormacion = () => {
    setFormaciones([...formaciones, { title: "", year: "", nivel: "" }]);
  };

  const handleInternalChange = (e, index, field) => {
    const newformaciones = [...formaciones];
    newformaciones[index][field] = e.target.value;
    setFormaciones(newformaciones);
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
                  onChange={(e) => handleInternalChange(e, index, "title")}
                  value={item.title}
                />
                <SelectOption
                  select="Nivel"
                  onChange={(e) => handleInternalChange(e, index, "nivel")}
                  options={opcionesFormacion}
                  value={item.nivel}
                />
              </div>
              <Input
                label="Institución"
                onChange={(e) => handleInternalChange(e, index, "year")}
                value={item.year}
              />
            </div>
            <IconButton
              variant="outlined"
              color="red"
              onClick={() => removeFormacion(index)}
            >
              <FontAwesomeIcon icon={faMinus} />
            </IconButton>
          </div>
        ))}
        <IconButton variant="outlined" color="blue" onClick={addFormacion}>
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>
      </div>
    </>
  );
};

export default FormacionComponent;
