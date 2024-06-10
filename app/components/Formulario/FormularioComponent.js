import { Card, Button, Typography } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import PrimerBloque from "./Bloques/Bloque1Component";
import SegundoBloque from "./Bloques/Bloque2Component";
import TercerBloque from "./Bloques/Bloque3Component";
import graduadosService from "../../services/graduadosService";
import AlertaObligatorio from "../Utils/AlertObligatorio";
import Cookies from 'js-cookie';

const Form = ({ carreras, ciudades, enumerados }) => {
  const { registrarGraduado } = graduadosService;
  const [formData, setFormData] = useState({
    "nombre": "",
    "dni": "",
    "fecha_nacimiento": "",
    "ciudad": [],
    "contacto": "",
    "carreras": [],
    "ocupacion_trabajo": "",
    "ocupacion_empresa": "",
    "ocupacion_sector": "",
    "ocupacion_informacion_adicional": "",
    "experiencia_anios": "",
    "habilidades_competencias": "",
    "formacion": [],
    "rrss": [],
    "cv": "",
    "interes_comunidad": false,
    "interes_oferta": false,
    "interes_demanda": false,
  });

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      const decodedUser = decodeURIComponent(userCookie);
      const user = JSON.parse(decodedUser);
      setFormData(prevFormData => ({
        ...prevFormData,
        contacto: user.email
      }));
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [alertaVisible, setAlertaVisible] = useState(false);
  const [campoObligatorio, setCampoObligatorio] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fecha_nacimiento) {
      setAlertaVisible(true);
      setCampoObligatorio('fecha_nacimiento');
      return;
    }

    for (const carrera of formData.carreras) {
      if (carrera.carrera_id === '') {
        setAlertaVisible(true);
        setCampoObligatorio('carreras');
        return;
      }
    }

    try {
      const data = await registrarGraduado(formData);
      setAlertaVisible(false);
      console.log('Formulario enviado con éxito:', data);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
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
          <form className="mt-4" onSubmit={handleSubmit}>
            <Card color="transparent" shadow={false} className="items-center">
              <div className="flex flex-col gap-3">
                <PrimerBloque
                  carreras={carreras}
                  ciudades={ciudades}
                  enumerados={enumerados}
                  handleChange={handleChange}
                />
                <SegundoBloque
                  opcionesOcupacion={enumerados.ocupacion_trabajo}
                  opcionesExperiencia={enumerados.exp_anios}
                  opcionesSectorProp={enumerados.ocupacion_sector}
                  handleChange={handleChange}
                />
                <TercerBloque
                  enumerados={enumerados}
                  handleChange={handleChange}
                />
                {alertaVisible && campoObligatorio && (
                  <AlertaObligatorio input={campoObligatorio} />
                )}
              </div>
            </Card>
            <div className="flex justify-center py-2">
              <Button type="submit" color="blue">
                Enviar Formulario
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
