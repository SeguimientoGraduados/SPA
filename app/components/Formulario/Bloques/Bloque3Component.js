import { Input, Typography } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import CheckboxList from "../../Utils/CheckboxList";
import FormacionComponent from "../FormacionComponent";

const TercerBloque = ({ handleChange, opcionesFormacion }) => {
  const [opcionesInteres, setOpcionesInteres] = useState([]);
  const [intereses, setIntereses] = useState({
    comunidad: false,
    oferta: false,
    demanda: false,
  });

  const handleChangeInteres = (event) => {
    const { value } = event.target;
    setOpcionesInteres(value);

    const nuevosIntereses = {
      comunidad: value.includes("1. comunidad /integrar red (ecosistema)"),
      oferta: value.includes("2. proponer iniciativas (oferta)"),
      demanda: value.includes("3. recibir consultas (demanda)"),
    };
    setIntereses(nuevosIntereses);
  };

  useEffect(() => {
    handleChange({
      target: { name: "interes_comunidad", value: intereses.comunidad },
    });
    handleChange({
      target: { name: "interes_oferta", value: intereses.oferta },
    });
    handleChange({
      target: { name: "interes_demanda", value: intereses.demanda },
    });
  }, [intereses]);

  return (
    <>
      <Typography
        variant="h3"
        color="blue-gray"
        className="text-center font-normal"
      >
        Información Adicional
      </Typography>

      <div className="flex flex-col gap-4">
        <Input
          label="CV"
          placeholder="https://drive.google.com/CV_Ejemplo"
          labelProps={{ className: "font-semibold" }}
          name="cv"
          onChange={handleChange}
        />

        <FormacionComponent
          sendChange={handleChange}
          opcionesFormacion={opcionesFormacion}
        />

        <div className="mx-auto">
          <Typography
            variant="h5"
            color="blue-gray"
            className="font-normal mt-2"
          >
            Interés/Predisposición a:
          </Typography>
          <CheckboxList
            handleChange={handleChangeInteres}
            direction={"col"}
            items={[
              "1. Comunidad /integrar red (Ecosistema)",
              "2. Proponer iniciativas (Oferta)",
              "3. Recibir consultas (Demanda)",
            ]}
            opcionesSeleccionadas={opcionesInteres}
          />
        </div>
      </div>
    </>
  );
};

export default TercerBloque;
