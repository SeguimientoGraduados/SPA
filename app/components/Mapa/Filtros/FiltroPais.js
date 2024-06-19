import { Select, Option } from "@material-tailwind/react";

const FiltroPais = ({ paises, onPaisChange }) => {
  const handleSelectChange = (event) => {
    const paisId = event;
    onPaisChange(paisId);
  };

  return (
    <div className="flex flex-col gap-4">
      <Select label="País" onChange={handleSelectChange}>
        {paises.map((pais, index) => (
          <Option key={index} value={pais.id}>
            {pais.nombre}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default FiltroPais;
