import { Tooltip, Typography } from "@material-tailwind/react";
import { toTitleCase, formateoTrabajo } from "@/app/utils/utils";

const TrabajoTooltip = ({
  empresa = null,
  trabajo = null,
  sector = null,
  info = null,
}) => {
  return (
    <Tooltip
      className="z-50 bg-white"
      content={
        <div className="flex flex-col gap-2 items-center">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {trabajo ? formateoTrabajo(trabajo) : ""}
          </Typography>
          <Typography variant="small" color="blue-gray" className="font-normal">
            Sector: {sector ? toTitleCase(sector) : ""}
          </Typography>
          <Typography variant="small" color="blue-gray" className="font-normal">
            {info ? info : ""}
          </Typography>
        </div>
      }
    >
      <Typography variant="small" color="blue-gray" className="font-normal">
        {empresa ? empresa : ""}
      </Typography>
    </Tooltip>
  );
};

export default TrabajoTooltip;
