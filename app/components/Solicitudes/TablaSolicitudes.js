import { Card, Typography, Spinner } from "@material-tailwind/react";
import ModalSolicitudes from "./ModalSolicitudes";


const TABLE_HEAD = ["Nombre", "Apellido", "DNI", "Carrera", "Año de graduación", ""];

const TablaSolicitudes = ({ solicitudes, fetchData, loading }) => {
  return (
    <Card className="w-full">
      {loading ? (
        <div className="flex justify-center items-center p-10">
          <Spinner className="h-12 w-12" color="blue"/>
        </div>
      ) : (
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
            {solicitudes.map((solicitud, index) => {
              const classes = "p-4 border-b border-blue-gray-50";

              return (
                <tr key={solicitud.id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {solicitud.nombre}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {solicitud.apellido}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {solicitud.dni}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {solicitud.carreras[0].nombre}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {solicitud.carreras[0].anio_graduacion}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <ModalSolicitudes solicitud={solicitud} fetchData={fetchData} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </Card>
  );
}
export default TablaSolicitudes;
