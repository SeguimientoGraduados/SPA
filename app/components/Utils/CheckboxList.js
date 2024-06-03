'use client'
import React from "react";
import {
  Checkbox,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { normalizeText } from "../../utils/utils";

const CheckboxList = ({ direction, items, handleChange, name, opcionesSeleccionadas }) => {

  const handleSelectChange = (event) => {
    const valorNormalizado = normalizeText(event.target.value);
    let opcionSeleccionadaActualizada = [...opcionesSeleccionadas];

    if (event.target.checked) {
      if (!opcionSeleccionadaActualizada.includes(valorNormalizado)) {
        opcionSeleccionadaActualizada.push(valorNormalizado);
      }
    } else {
      opcionSeleccionadaActualizada = opcionSeleccionadaActualizada.filter(item => item !== valorNormalizado);
    }
    handleChange({ target: { name, value: opcionSeleccionadaActualizada } });
  };

  return (
    <List className={`flex flex-${direction}`}>
      {items.map((item, index) => (
        <ListItem key={index} className="justify-center">
          <ListItemPrefix>
            <Checkbox
              onChange={handleSelectChange}
              value={item}
              color="blue"
              ripple={false}
              label={item}
              checked={opcionesSeleccionadas.includes(normalizeText(item))}
              className="h-8 w-8 rounded-full hover:scale-105 hover:before:opacity-0"
            />
          </ListItemPrefix>
        </ListItem>
      ))}
    </List>
  );
};

export default CheckboxList;
