import { Tooltip, Typography } from "@material-tailwind/react";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FormacionTooltip = ({ formacion = [] }) => {
  return (
    <Tooltip
      className="z-50 bg-white border border-blue-gray-50"
      content={
        <div className="flex flex-col gap-2 items-center">
          {formacion.map((form) => (
            <>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {form.titulo} - {form.institucion}
              </Typography>
            </>
          ))}
        </div>
      }
    >
      <FontAwesomeIcon
        icon={faBuildingColumns}
        color={formacion.length > 0 ? "blue" : "gray"}
      />
    </Tooltip>
  );
};

export default FormacionTooltip;
