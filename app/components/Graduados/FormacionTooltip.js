import { Tooltip, Typography } from "@material-tailwind/react";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FormacionTooltip = ({ formacion = [] }) => {
  return formacion.length > 0 ? (
    <Tooltip
      className="z-50 bg-white border border-blue-gray-50"
      content={
        <div className="flex flex-col gap-2 items-center">
          {formacion.map((form, index) => (
            <Typography
              key={index}
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {form.titulo} - {form.institucion}
            </Typography>
          ))}
        </div>
      }
    >
      <FontAwesomeIcon
        icon={faBuildingColumns}
        color="blue"
      />
    </Tooltip>
  ) : (
    <FontAwesomeIcon
      icon={faBuildingColumns}
      color="gray"
    />
  );
};

export default FormacionTooltip;