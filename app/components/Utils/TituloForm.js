import React, { useState } from "react";
import { Input, IconButton } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import SelectOption from "../Utils/SelectOption";

const TituloForm = ({ onChange, carreras }) => {
  const [titles, setTitles] = useState([{ title: "", year: "" }]);

  const addTitle = () => {
    setTitles([...titles, { title: "", year: "" }]);
  };

  const handleInternalChange = (e, index, field) => {
    const newTitles = [...titles];
    newTitles[index][field] = e.target.value;
    setTitles(newTitles);

    const formattedTitles = newTitles.map((item) => ({
      carrera_id: item.title,
      anio_graduacion: item.year,
    }));
    onChange({ target: { name: "carreras", value: formattedTitles } });
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      {titles.map((item, index) => (
        <div key={index} className="grid grid-cols-2 gap-2 w-full">
          <SelectOption
            select={"Título"}
            handleChange={(e) => handleInternalChange(e, index, "title")}
            options={carreras}
            name="carreras"
            value={item.title}
          />

          <Input
            label="Año de Graduación"
            name="año_graduacion"
            onChange={(e) => handleInternalChange(e, index, "year")}
            value={item.year}
          />
        </div>
      ))}
      <IconButton variant="outlined" onClick={addTitle}>
        <PlusIcon className="h-5 w-5" />
      </IconButton>
    </div>
  );
};

export default TituloForm;
