import React, { useState } from "react";
import {
  Typography,
  Select,
  Option,
  Input,
  IconButton,
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";

const TituloForm = () => {
  const [titles, setTitles] = useState([{ title: "", year: "" }]);

  const addTitle = () => {
    setTitles([...titles, { title: "", year: "" }]);
  };

  const handleTitleChange = (index, value) => {
    const newTitles = [...titles];
    newTitles[index].title = value;
    setTitles(newTitles);
  };

  const handleYearChange = (index, value) => {
    const newTitles = [...titles];
    newTitles[index].year = value;
    setTitles(newTitles);
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      {titles.map((item, index) => (
        <div key={index}>
          <div className="flex flex-row gap-2">
            <Select
              label="Título"
              labelProps={{ className: "font-semibold" }}
              value={item.title}
              onChange={(e) => handleTitleChange(index, e.target.value)}
            >
              <Option value="Ingeniería en Sistemas de Información">
                Ingeniería en Sistemas de Información
              </Option>
              <Option value="Licenciatura en Ciencias de la Computación">
                Licenciatura en Ciencias de la Computación
              </Option>
              <Option value="Abogacía">Abogacía</Option>
            </Select>

            <Input
              label="Año de Graduación"
              labelProps={{ className: "font-semibold" }}
              value={item.year}
              onChange={(e) => handleYearChange(index, e.target.value)}
            />
          </div>
        </div>
      ))}
      <IconButton variant="outlined" onClick={addTitle}>
        <PlusIcon className="h-5 w-5" />
      </IconButton>
    </div>
  );
};

export default TituloForm;
