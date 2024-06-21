import { Select, Option } from "@material-tailwind/react";

const FiltroCarrera = ({ carreras, onCarreraChange }) => {
  const handleSelectChange = (event) => {
    const carreraId = event;
    onCarreraChange(carreraId);
  };

  return (
    <div className="flex flex-col gap-4">
      <Select label="Carrera" onChange={handleSelectChange}>
        {carreras.map((carrera, index) => (
          <Option key={index} value={carrera.id}>
            {carrera.nombre}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default FiltroCarrera;
