import React, { useState } from "react";
import { Input, IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import SelectOption from "../Utils/SelectOption";
import { ValidacionComponent } from "./Validacion";

const Titulo = ({ onChange, carreras }) => {
  const [titles, setTitles] = useState([{ title: "", year: "" }]);
  const [errors, setErrors] = useState([]);

  const updateTitles = (newTitles) => {
    setTitles(newTitles);

    const formattedTitles = newTitles.filter(item => item.title && item.year).map(item => ({
      carrera_id: item.title,
      anio_graduacion: item.year,
    }));

    onChange({ target: { name: "carreras", value: formattedTitles } });
  };

  const addTitle = () => {
    updateTitles([...titles, { title: "", year: "" }]);
  };

  const removeTitle = (index) => {
    const newTitles = titles.filter((_, i) => i !== index);
    const newErrors = errors.filter((_, i) => i !== index);
    setErrors(newErrors);
    updateTitles(newTitles);
  };

  const handleInternalChange = (e, index, field) => {
    const newTitles = titles.map((item, i) => i === index ? { ...item, [field]: e.target.value } : item);
    updateTitles(newTitles);
  };

  const handleBlur = (index) => {
    const name = "anio_graduacion";
    const value = titles[index].year;

    const updatedErrors = titles.map((_, i) => i === index ? ValidacionComponent(name, value, errors) : errors[i]);
    setErrors(updatedErrors);
  };


  return (
    <div className="flex flex-col gap-4 items-center w-full">
      {titles.map((item, index) => (
        <div key={index} className="flex flex-row items-center gap-3 w-full">
          <SelectOption
            select={"Título"}
            handleChange={(e) => handleInternalChange(e, index, "title")}
            options={carreras}
            name="carreras"
            value={item.title}
            className="flex-grow"
          />
          <div className="flex-grow">
            <div className="relative">
              <Input
                label="Año de Graduación"
                labelProps={{ className: "mt-3" }}
                name="año_graduacion"
                onChange={(e) => handleInternalChange(e, index, "year")}
                onBlur={() => handleBlur(index)}
                value={item.year}
                required={index === 0}
                onInvalid={(e) =>
                  index === 0 && e.currentTarget.setCustomValidity('Campo obligatorio')
                }
                onInput={(e) => e.currentTarget.setCustomValidity('')}
                error={(errors[index] != null) ? errors[index].anio_graduacion : ''}
                className="mt-3"
              />
              {errors[index] && errors[index].anio_graduacion && (
                <span className="mt-4 text-xs text-red-600 absolute left-0">
                  {errors[index].anio_graduacion}
                </span>
              )}
            </div>
            <div className="min-h-[20px]"></div>
          </div>


          <IconButton
            className="rounded-full"
            onClick={() => removeTitle(index)}
            variant="outlined"
            color="red"
            size="sm"
          >
            <FontAwesomeIcon icon={faMinus} />
          </IconButton>
        </div>
      ))}
      <IconButton
        className="rounded-full"
        onClick={addTitle}
        variant="outlined"
        color="blue"
      >
        <FontAwesomeIcon icon={faPlus} />
      </IconButton>
    </div>
  );
};

export default Titulo;