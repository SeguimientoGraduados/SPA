import { Select, Option } from "@material-tailwind/react";
import { useState, useEffect } from "react";

const FiltroDepartamento = ({ departamentos, departamentoSeleccionado, onDepartamentoChange }) => {
  const [listaDepartamentos, setListaDepartamentos] = useState(departamentos);

  useEffect(() => {
    setListaDepartamentos(departamentos);
  }, [departamentos, departamentoSeleccionado]);

  const handleSelectChange = (event) => {
    const dptoId = event;
    onDepartamentoChange(dptoId);
  };

  return (
    <div className="flex flex-col gap-4">
      <Select
        label="Departamento"
        value={departamentoSeleccionado || ""}
        onChange={handleSelectChange}
        className="bg-tremor-background"
      >
        {listaDepartamentos.map((departamento, index) => (
          <Option key={index} value={departamento.id}>
            {departamento.nombre}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default FiltroDepartamento;
