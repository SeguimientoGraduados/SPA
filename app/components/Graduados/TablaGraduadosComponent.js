"use client";
import { Card, Typography } from "@material-tailwind/react";
import graduados from './Graduado';

const TABLE_HEAD = ["Nombre", "Título", "Año", "Ciudad"];

const TablaGraduados = ({ selectedCity }) => {

  const filteredGraduates = graduados.filter((graduado) => graduado.ciudad === selectedCity);

  return (
    <Card>
      <table className="w-full min-w-max table-auto text-center">
        <thead>
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                style={{ width: '150px' }} 
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
          {filteredGraduates.map(({ nombre, titulo, año, ciudad }, index) => (
            <tr key={nombre} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {nombre}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {titulo}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {año}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {ciudad}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default TablaGraduados