import { Tooltip, Typography } from "@material-tailwind/react";
import { toTitleCase, formateoTrabajo } from "@/app/utils/utils";
import React, { useState } from 'react';

const TrabajoTooltip = ({
  empresa = null,
  trabajo = null,
  sector = null,
  info = null,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <Tooltip
      className="z-50 bg-white border border-blue-gray-50"
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
      <Typography variant="small"
        color="blue-gray"
        className={`font-normal ${isHovered ? 'underline text-blue-600' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {empresa ? empresa : ""}
      </Typography>
    </Tooltip>
  );
};

export default TrabajoTooltip;
