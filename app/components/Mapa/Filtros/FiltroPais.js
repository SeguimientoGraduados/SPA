import { Select, Option } from "@material-tailwind/react";
import { useState, useEffect } from "react";

const FiltroPais = ({ paises, paisSeleccionado, onPaisChange }) => {
  const [listaPaises, setListaPaises] = useState(paises);

  useEffect(() => {
    setListaPaises(paises);
  }, [paises, paisSeleccionado]);

  const handleSelectChange = (event) => {
    const paisId = event;
    onPaisChange(paisId);
  };

  return (
    <div className="flex flex-col gap-4">
      <Select
        label="País"
        value={paisSeleccionado || ""}
        onChange={handleSelectChange}
      >
        {listaPaises.map((pais, index) => (
          <Option key={index} value={pais.id}>
            {pais.nombre}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default FiltroPais;
