'use client'
import React from "react";
import {
  Checkbox,
  List,
  ListItem,
  ListItemPrefix,
  Radio,
} from "@material-tailwind/react";
import { normalizeText } from "../../utils/utils";

const CheckboxList = ({ direction, items, handleChange, name, opcionesSeleccionadas, seleccionUnica = false }) => {

  const handleSelectChange = (event) => {
    const valorNormalizado = normalizeText(event.target.value);
    let opcionSeleccionadaActualizada = seleccionUnica ? [] : [...opcionesSeleccionadas];

    if (event.target.checked || seleccionUnica) {
      if (!opcionSeleccionadaActualizada.includes(valorNormalizado)) {
        opcionSeleccionadaActualizada = seleccionUnica ? [valorNormalizado] : [...opcionSeleccionadaActualizada, valorNormalizado];
      }
    } else {
      opcionSeleccionadaActualizada = opcionSeleccionadaActualizada.filter(item => item !== valorNormalizado);
    }
    handleChange({ target: { name, value: opcionSeleccionadaActualizada } });
  };

  const InputComponent = seleccionUnica ? Radio : Checkbox;

  return (
    <List className={`flex flex-${direction}`}>
      {items.map((item, index) => {
        const valorNormalizado = normalizeText(item);
        return (
          <ListItem key={index} className="p-0">
            <ListItemPrefix>
              <InputComponent
                onChange={handleSelectChange}
                value={item}
                color="blue"
                ripple={false}
                label={item}
                checked={(opcionesSeleccionadas ?? []).includes(valorNormalizado)}
                className="h-4 w-4 rounded-full hover:scale-105 hover:before:opacity-0 bg-tremor-background"
              />
            </ListItemPrefix>
          </ListItem>
        );
      })}
    </List>
  );
};

export default CheckboxList;
