import { Select, Option } from "@material-tailwind/react";

const SelectOption = ({ className, select, options }) => {
  return (
    <div className={className}>
      <Select label={select}>
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
