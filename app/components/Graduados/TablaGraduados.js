"use client";
import { Card, Typography, Spinner } from "@material-tailwind/react";
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
  "Formacion",
  "Contacto",
];

const TablaGraduados = ({ graduadosPorCiudad, loading }) => {
  if (loading) {
    return <Spinner className=" self-center h-12 w-12" color="blue" />;
  }
  return (
    <div className="w-full max-w-[95vw] h-[60vh] min-h-[500px] max-h-[1000px] overflow-auto">
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
                    {graduado.ocupaciones.map((ocupacion, index) => (
                      <TrabajoTooltip
                        key={index}
                        empresa={
                          ocupacion.ocupacion_empresa
                            ? ocupacion.ocupacion_empresa
                            : null
                        }
                        trabajo={
                          ocupacion.ocupacion_trabajo
                            ? ocupacion.ocupacion_trabajo
                            : null
                        }
                        sector={
                          ocupacion.ocupacion_sector
                            ? ocupacion.ocupacion_sector
                            : null
                        }
                        info={
                          ocupacion.ocupacion_informacion_adicional
                            ? ocupacion.ocupacion_informacion_adicional
                            : null
                        }
                      />
                    ))}
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
