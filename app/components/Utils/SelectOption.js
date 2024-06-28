import { Select, Option } from "@material-tailwind/react";
import React from "react";

const SelectOption = ({ className, select, options, handleChange, name }) => {
  const handleSelectChange = (value) => {
    handleChange({ target: { name, value } });
  };

  return (
    <div className={className}>
      <Select
        label={select}
        onChange={handleSelectChange}
        className="bg-tremor-background"
        selected={(element) =>
          element &&
          React.cloneElement(element, {
            disabled: false,
            className:
              "flex items-center opacity-100 px-0 gap-2 pointer-events-none w-48 truncate",
          })
        }
      >
        {options.map((option, index) => (
          <Option key={index} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SelectOption;
