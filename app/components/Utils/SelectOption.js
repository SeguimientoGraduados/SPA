import React from "react";
import { Select, SelectItem } from "@tremor/react";

const SelectOption = ({
  className,
  select,
  options,
  handleChange,
  name,
  initialValue,
}) => {
  const handleSelectChange = (value) => {
    handleChange({ target: { name, value } });
  };

  return (
    <div className={className}>   
      <Select
        id={select}
        placeholder={select}
        onValueChange={handleSelectChange}
        value={initialValue}
        className="bg-tremor-background rounded-md"
      >
        {options.map((option, index) => (
          <SelectItem key={index} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default SelectOption;
