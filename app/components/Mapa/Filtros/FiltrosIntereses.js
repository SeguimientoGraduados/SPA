import { Typography, Switch } from "@material-tailwind/react";

const FiltrosIntereses = ({ intereses, onInteresChange }) => {
  return (
    <div>
      <Typography variant="paragraph" color="blue-gray">
        Intereses:
      </Typography>
      <div className="flex flex-col gap-1 mx-10">
        <Switch
          checked={intereses.comunidad}
          label="Comunidad"
          labelProps={{className: "text-sm"}}
          onChange={() => onInteresChange("comunidad")}
          color="blue"
          ripple={false}
        />
        <Switch
          checked={intereses.oferta}
          label="Oferta"
          labelProps={{className: "text-sm"}}
          onChange={() => onInteresChange("oferta")}
          color="blue"
          ripple={false}
        />
        <Switch
          checked={intereses.demanda}
          label="Demanda"
          labelProps={{className: "text-sm"}}
          onChange={() => onInteresChange("demanda")}
          color="blue"
          ripple={false}
        />
      </div>
    </div>
  );
};

export default FiltrosIntereses;
