import { Typography } from "@material-tailwind/react";
import { useState } from "react";
import ReactSlider from "react-slider";

const FiltroAnio = ({ min, max, onAnioChange }) => {
  const [rango, setRango] = useState([min, max]);
  
  const handleAnioChange = (value) => {
    onAnioChange(value[0], value[1]);
  };

  return (
    <div className="flex flex-col pb-12 px-3">
      <Typography variant="small">Año de graduacion:</Typography>
      <ReactSlider
        className="slider"
        thumbClassName="thumb"
        trackClassName="track"
        defaultValue={rango}
        max={max}
        min={min}
        renderThumb={(props, state) => <Typography variant="small" {...props}>{state.valueNow}</Typography>}
        onAfterChange={(value) => handleAnioChange(value)}
      />
    </div>
  );
};

export default FiltroAnio;
