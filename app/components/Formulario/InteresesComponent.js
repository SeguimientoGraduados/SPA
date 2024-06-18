import React, { useState } from "react";
import { Typography, Switch } from "@material-tailwind/react";

const InteresesComponent = ({sendChange}) => {
  const [intereses, setIntereses] = useState({
    comunidad: false,
    oferta: false,
    demanda: false,
  });

  const toggleSwitch = (pregunta) => {
    const nuevosIntereses = {
        ...intereses,
        [pregunta]: !intereses[pregunta],
      };

    setIntereses(nuevosIntereses);

    sendChange({ target: { name:"intereses", value: nuevosIntereses  } })
  };

  return (
    <div className="max-w-md mx-auto my-4 flex flex-col gap-2">
      <Typography variant="paragraph">
        ¿Está dispuesto a formar parte del ecosistema que interactúe con otros
        egresados y/o las autoridades de la UNS?
      </Typography>
      <div className="flex justify-center">
        <Switch
          checked={intereses.comunidad}
          label="Si"
          onChange={() => toggleSwitch("comunidad")}
          color="blue"
          size="regular"
        />
      </div>

      <Typography variant="paragraph">
        ¿Le gustaria proponer iniciativas a la UNS?
      </Typography>
      <div className="flex justify-center">
        <Switch
          checked={intereses.oferta}
          label="Si"
          onChange={() => toggleSwitch("oferta")}
          color="blue"
          size="regular"
        />
      </div>

      <Typography variant="paragraph">
        ¿Le gustaria recibir consultas de la UNS?
      </Typography>

      <div className="flex justify-center">
        <Switch
          checked={intereses.demanda}
          label="Si"
          onChange={() => toggleSwitch("demanda")}
          color="blue"
          size="regular"
        />
      </div>
    </div>
  );
};

export default InteresesComponent;
