import React from "react";
import { SearchSelect, SearchSelectItem } from "@tremor/react";

const SelectFiltrable = ({
  className,
  select,
  options,
  handleChange,
  name,
}) => {
  const handleSelectChange = (value) => {
    handleChange({ target: { name, value } });
  };

  return (
    <div className={className}>
      
      <label
        htmlFor={select}
        className="text-base text-tremor-content pl-1"
      >
        {select}
      </label>
      <SearchSelect
        className="mt-2"
        id={select}
        onValueChange={handleSelectChange}
        placeholder={"Buscar..."}
      >
        {options.map((option, index) => (
          <SearchSelectItem key={index} value={option.value}>
            {option.label}
          </SearchSelectItem>
        ))}
      </SearchSelect>
    </div>
  );
};

export default SelectFiltrable;
