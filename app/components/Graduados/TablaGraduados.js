"use client";
import { Card, Typography } from "@material-tailwind/react";
import ContactoPopover from "./ContactoPopover";

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
              <tr
                key={graduado.nombre}
                className="even:bg-blue-gray-50/50 min-h-[60px]"
              >
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
                  {graduado.carreras.map((carrera, index) => (
                    <Typography key={index} variant="small" color="blue-gray">
                      {carrera.nombre}
                    </Typography>
                  ))}
                </td>
                <td className="p-4 h-full min-h-[60px]">
                  <div className="flex flex-col gap-5">
                    {graduado.carreras.map((carrera, index) => (
                      <Typography key={index} variant="small" color="blue-gray">
                        {carrera.anio_graduacion}
                      </Typography>
                    ))}
                  </div>
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
                  <ContactoPopover graduado={graduado} />
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
