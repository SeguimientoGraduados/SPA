import { Card, Typography } from "@material-tailwind/react";
import ModalSolicitudes from "./ModalSolicitudes";

const TABLE_HEAD = ["Nombre", "DNI", "Carrera", "Año de graduación", ""];

const TABLE_ROWS = [
  {
    nombre: "Michael Scott",
    dni: "12345667",
    carrera: "Ingenieria en Papel",
    anio: "2020",
  },
  {
    nombre: "Dwigth Schrute",
    dni: "12343210",
    carrera: "Ingenieria en Remolachas",
    anio: "2021",
  },
];

const TablaSolicitudes = ({ solicitudes }) => {
  return (
    <Card className="w-full">
      <table className="w-full min-w-max table-auto text-center">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ nombre, dni, carrera, anio }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={nombre}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {nombre}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {dni}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {carrera}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {anio}
                  </Typography>
                </td>
                <td className={classes}>
                    <ModalSolicitudes />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
export default TablaSolicitudes;