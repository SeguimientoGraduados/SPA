import { Tooltip, Typography } from "@material-tailwind/react";

const TooltipInfo = ({ label }) => {
  return (
    <div className="flex flex-row items-center">
      <Tooltip
        content={
          <div className="w-80">
            <Typography color="white" className="font-medium">
              Niveles de Visibilidad
            </Typography>
            <ul>
              <li>
                <Typography
                  variant="small"
                  color="white"
                  className="font-normal opacity-80"
                >
                  • Público: Para todo el que ingrese
                </Typography>
              </li>
              <li>
                <Typography
                  variant="small"
                  color="white"
                  className="font-normal opacity-80"
                >
                  • Protegido: Solo el personal autorizado de la UNS
                </Typography>
              </li>
              <li>
                <Typography
                  variant="small"
                  color="white"
                  className="font-normal opacity-80"
                >
                  • Privado: No se va a entregar esa información
                </Typography>
              </li>
            </ul>
          </div>
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className="h-5 w-5 cursor-pointer text-blue-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
      </Tooltip>
      <Typography className="text-center font-semibold" variant="small" color="blue-gray">
        {label}
      </Typography>
    </div>
  );
};

export default TooltipInfo;
