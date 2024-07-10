import React from "react";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import { Tooltip } from "@material-tailwind/react";

const SelectFiltrable = ({
  className,
  select,
  options,
  handleChange,
  name,
  selectedOption = ""
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
        value={selectedOption}
      >
        {options.map((option, index) => (
          <SearchSelectItem
            key={index}
            value={option.value}
          >
            <Tooltip
              className="border border-blue-gray-50 bg-gray-50 px-4 py-3 shadow-md shadow-black/10"
              content={

                <div className="text-black">
                  {option.label}
                </div>
              }
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              {option.label}
            </Tooltip>
          </SearchSelectItem>
        ))}
      </SearchSelect>
    </div>
  );
};

export default SelectFiltrable;
