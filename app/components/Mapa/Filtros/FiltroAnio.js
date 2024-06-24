import { Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import ReactSlider from "react-slider";

const FiltroAnio = ({ min, max, anioMinSeleccionado, anioMaxSeleccionado, onAnioChange }) => {
  const [rango, setRango] = useState([min, max]);

  const handleAnioChange = (value) => {
    onAnioChange(value[0], value[1]);
  };

  useEffect(() => {
    setRango([anioMinSeleccionado, anioMaxSeleccionado])
  }, [min, max, anioMinSeleccionado, anioMaxSeleccionado]);

  return (
    <div className="flex flex-col pb-12 px-3">
      <Typography variant="paragraph" color="blue-gray">Año de graduación:</Typography>
      <ReactSlider
        className="slider"
        thumbClassName="thumb"
        trackClassName="track"
        value={rango}
        max={max}
        min={min}
        renderThumb={(props, state) => {
          const { key, ...restProps } = props;
          return <Typography key={key} variant="small" {...restProps}>{state.valueNow}</Typography>;
        }}
        onAfterChange={(value) => handleAnioChange(value)}
      />
    </div>
  );
};

export default FiltroAnio;
