import { Input, Typography, Textarea} from "@material-tailwind/react";
import React from "react";
import CheckboxList from '../../Utils/CheckboxList'
import RadioHorizontal from '../../Utils/RadioHorizontal'
import TooltipInfo from '../../Utils/TooltipInfo'
import SelectOption from '../../Utils/SelectOption'

const SegundoBloque = () => {
  //TODO: ESTOS VALUES EN REALIDAD VAN A VENIR CON LO QUE NECESITE PONERSE EN LA BASE DE DATOS 
  const optionsOcupacion = [
    { value: "1", label: "Relación de dependencia" },
    { value: "2", label: "Autónomo" },
  ];
  const optionsExperiencia = [
    { value: "1", label: "Menos de 2 años" },
    { value: "2", label: "Entre 2 y 5 años" },
    { value: "3", label: "Entre 5 y 10 años" },
    { value: "4", label: "Más de 10 años" },
  ];

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
          <SelectOption select={"Ocupacion actual:"} options={optionsOcupacion}/>
          <Input label="Nombre de la Empresa"/>
        </div>
        <CheckboxList direction={"row"} items={["Sector Privado", "Sector Público"]} />
        <Textarea
          variant="outlined"
          label="Información Adicional"
        />

        <div className="flex items-center flex-row">
          <TooltipInfo label={"Privacidad de las respuestas"}/>
          <RadioHorizontal />
        </div>

        <Typography variant="h5" color="blue-gray" className="font-normal text-center">
          Experiencia Laboral
        </Typography>

        <SelectOption select={"Años de Experiencia:"} options={optionsExperiencia}/>
        <Typography className="font-normal text-center" variant="paragraph" color="blue-gray">
          Habilidades/Competencias:
        </Typography>
        <Textarea
          variant="outlined"
          label="Descripcion"
        />

        <div className="flex items-center flex-row justify-between">
          <TooltipInfo label={"Privacidad de las respuestas"}/>
          <RadioHorizontal />
        </div>
      </div>
    </>
  );
};
export default SegundoBloque;
