import { Select, Option } from "@material-tailwind/react";

const FiltroDepartamentoComponent = ({ departamentos, onDepartamentoChange }) => {
  const handleSelectChange = (event) => {
    const dptoId = event;
    onDepartamentoChange(dptoId);
  };

  return (
    <div className="flex flex-col gap-4">
      <Select label="Departamento" onChange={handleSelectChange}>
        {departamentos.map((departamento, index) => (
          <Option key={index} value={departamento.id}>
            {departamento.nombre}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default FiltroDepartamentoComponent;
