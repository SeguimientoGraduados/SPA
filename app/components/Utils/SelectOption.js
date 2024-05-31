import { Select, Option } from "@material-tailwind/react";

const SelectOption = ({ className, select, options, handleChange, name }) => {

  const handleSelectChange = (value) => {
    handleChange({ target: { name, value } });
  };

  return (
    <div className={className}>
      <Select label={select} onChange={handleSelectChange}>
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
