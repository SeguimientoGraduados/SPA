import { Select, Option } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const FiltroCarrera = ({ carreras, carreraSeleccionada, onCarreraChange }) => {
  const [listaCarreras, setListaCarreras] = useState(carreras);

  useEffect(() => {
    setListaCarreras(carreras);
  }, [carreras, carreraSeleccionada]);

  const handleSelectChange = (event) => {
    const carreraId = event;
    onCarreraChange(carreraId);
  };

  return (
    <div className="flex flex-col gap-4">
      <Select
        label="Carrera"
        value={carreraSeleccionada || ""}
        onChange={handleSelectChange}
      >
        {listaCarreras.map((carrera, index) => (
          <Option key={index} value={carrera.id}>
            {carrera.nombre}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default FiltroCarrera;
