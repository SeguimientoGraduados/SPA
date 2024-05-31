import { Card, Button, Typography } from "@material-tailwind/react";
import Pagination from "./PaginationComponent";
import React, { useState } from "react";
import PrimerBloque from "./Bloques/Bloque1Component";
import SegundoBloque from "./Bloques/Bloque2Component";
import TercerBloque from "./Bloques/Bloque3Component";
import graduadosService from "../../services/graduadosService";

const Form = ({ carreras, ciudades }) => {
  const { registrarGraduado } = graduadosService;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderInputsForPage = (page) => {
    switch (page) {
      case 1:
        return <PrimerBloque
          carreras={carreras}
          ciudades={ciudades}
          handleChange={handleChange} />;
      case 2:
        return <SegundoBloque />;
      case 3:
        return <TercerBloque />;
      default:
        return null;
    }
  };

  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    fecha_nacimiento: '',
    ciudad_id: '',
    contacto: '',
    carreras: [],
    ocupacion_trabajo: '',
    ocupacion_empresa: '',
    ocupacion_sector: '',
    ocupacion_informacion_adicional: '',
    experiencia_anios: '',
    experiencia_informacion_adicional: '',
    habilidades_competencias: '',
    formacion: [],
    rrss: [],
    cv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registrarGraduado(formData);
      console.log('Formulario enviado con éxito:', data);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <>
      <div className="max-w-screen-xl sm:w-full">
        <Typography variant="parragraph" color="gray">
          La información que proporciones es invaluable para comprender mejor el
          perfil y las trayectorias laborales de los graduados de la Universidad
          Nacional del Sur. Tus respuestas serán tratadas de manera confidencial
          y se utilizarán únicamente con fines estadísticos y de investigación.
        </Typography>
        <hr className="my-2 border-t-2 border-blue-800" />
        <div className="flex flex-col justify-center">
          <Card onSubmit={handleSubmit} color="transparent" shadow={false} className="items-center">
            <form className="mt-8 mb-2 ">
              <div className="mb-1 flex flex-col gap-6">
                {renderInputsForPage(currentPage)}
              </div>
              <Button type="submit" color="blue">Enviar Formulario</Button>
            </form>
          </Card>
          {currentPage === 3 &&
            <div className="flex justify-center py-2">
              <Button color="blue">Enviar Formulario</Button>
            </div>}
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />

        </div>
      </div>
    </>
  );
};

export default Form;
