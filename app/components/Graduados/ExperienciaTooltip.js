import { Tooltip, Typography } from "@material-tailwind/react";
import React, { useState } from 'react';

const ExperienciaTooltip = ({ anios = null, info = null }) => {
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
        info ? (
          <Typography variant="small" color="blue-gray" className="font-normal">
            {info}
          </Typography>
        ) : null
      }
    >
      <Typography variant="small" color="blue-gray"
        className={`font-normal ${isHovered ? 'underline text-blue-600' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {anios ? anios : ""}
      </Typography>
    </Tooltip>
  );
};

export default ExperienciaTooltip;
