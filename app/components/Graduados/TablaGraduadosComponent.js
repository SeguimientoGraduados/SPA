"use client";
import { Card, Typography, Button } from "@material-tailwind/react";

const TABLE_HEAD = [
  "Nombre",
  "Carrera",
  "Año de graduación",
  "Ciudad",
  "Empresa",
  "Años de experiencia",
  "Contacto",
];

const TablaGraduados = ({ graduadosPorCiudad }) => {
  return (
    <Card>
      <table className="w-full min-w-max table-auto text-center">
        <thead>
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                style={{ width: "150px" }}
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
          {graduadosPorCiudad.map((datosCiudad) =>
            datosCiudad.ciudad.graduados.map((graduado) => (
              <tr key={graduado.nombre} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {graduado.nombre}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {graduado.carreras.length > 0
                      ? graduado.carreras[0].nombre
                      : ""}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {graduado.carreras.length > 0
                      ? graduado.carreras[0].anio_graduacion
                      : ""}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {datosCiudad.ciudad.nombre}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {graduado.ocupacion_empresa
                      ? graduado.ocupacion_empresa
                      : ""}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {graduado.experiencia_anios}
                  </Typography>
                </td>
                <td>
                  <Typography
                    variant="small"
                    as="a"
                    href="#"
                    color="blue-gray"
                    className="font-normal hover:underline hover:underline-offset-2"
                  >
                    Ver información
                  </Typography>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Card>
  );
};

export default TablaGraduados;
