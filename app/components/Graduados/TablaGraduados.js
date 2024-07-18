"use client";
import { Card, Typography } from "@material-tailwind/react";
import TrabajoTooltip from "./TrabajoTooltip";
import ExperienciaTooltip from "./ExperienciaTooltip";
import FormacionTooltip from "./FormacionTooltip";
import ContactoPopover from "./ContactoPopover";

const TABLE_HEAD = [
  "Nombre",
  "Apellido",
  "Carrera",
  "Año de graduación",
  "Ciudad",
  "Organizacion",
  "Años de experiencia",
  "Formacion", //Aca la idea es poner el nombre de los titulos de formacion
  "Contacto",
];

const TablaGraduados = ({ graduadosPorCiudad }) => {
  return (
    <div className="w-full max-w-[95vw] h-[70vh] min-h-[500px] max-h-[1000px] overflow-auto">
      <Card className="w-full min-w-max">
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-2"
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
                  className="bg-white even:bg-blue-gray-50"
                >
                  <td className="p-2">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {graduado.nombre}
                    </Typography>
                  </td>
                  <td className="p-2">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {graduado.apellido}
                    </Typography>
                  </td>
                  <td className="p-2 w-1/6">
                    {graduado.carreras.map((carrera, index) => (
                      <Typography key={index} variant="small" color="blue-gray">
                        {carrera.nombre}
                      </Typography>
                    ))}
                  </td>
                  <td className="p-2 w-1/11 h-full min-h-[60px]">
                    <div className="flex flex-col gap-5">
                      {graduado.carreras.map((carrera, index) => (
                        <Typography
                          key={index}
                          variant="small"
                          color="blue-gray"
                        >
                          {carrera.anio_graduacion}
                        </Typography>
                      ))}
                    </div>
                  </td>
                  <td className="p-2">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {datosCiudad.ciudad.nombre}
                    </Typography>
                  </td>
                  <td className="p-2">
                    <TrabajoTooltip
                      empresa={
                        graduado.ocupacion_empresa
                          ? graduado.ocupacion_empresa
                          : null
                      }
                      trabajo={
                        graduado.ocupacion_trabajo
                          ? graduado.ocupacion_trabajo
                          : null
                      }
                      sector={
                        graduado.ocupacion_sector
                          ? graduado.ocupacion_sector
                          : null
                      }
                      info={
                        graduado.ocupacion_informacion_adicional
                          ? graduado.ocupacion_informacion_adicional
                          : null
                      }
                    />
                  </td>
                  <td className="p-2">
                    <ExperienciaTooltip
                      anios={graduado.experiencia_anios}
                      info={graduado.habilidades_competencias}
                    />
                  </td>
                  <td className="w-1/11">
                    <FormacionTooltip formacion={graduado.formacion} />
                  </td>
                  <td className="w-1/11 py-1">
                    <ContactoPopover graduado={graduado} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default TablaGraduados;
