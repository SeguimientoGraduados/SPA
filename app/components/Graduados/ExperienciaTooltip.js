import { Tooltip, Typography } from "@material-tailwind/react";

const ExperienciaTooltip = ({ anios = null, info = null }) => {
  return (
    <Tooltip
      className="z-50 bg-white"
      content={
        info ? (
          <Typography variant="small" color="blue-gray" className="font-normal">
            {info}
          </Typography>
        ) : null
      }
    >
      <Typography variant="small" color="blue-gray" className="font-normal">
        {anios ? anios : ""}
      </Typography>
    </Tooltip>
  );
};

export default ExperienciaTooltip;
