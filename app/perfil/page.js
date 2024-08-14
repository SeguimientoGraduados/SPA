"use client";
import Form from "../components/Formulario/Formulario";
import React, { useState, useEffect } from "react";
import obtenerTodasLasCarreras from "../services/carrerasService";
import graduadosService from "../services/graduadosService";
import { DefaultSkeleton } from "../components/Utils/Skeleton";

const Perfil = () => {
  const { obtenerEnumerados, obtenerDatosGraduado } = graduadosService;
  const [carreras, setCarreras] = useState([]);
  const [enumerados, setEnumerados] = useState(null);
  const [datos, setDatos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCarreras = await obtenerTodasLasCarreras();
        setCarreras(dataCarreras);

        const dataEnumerados = await obtenerEnumerados();
        setEnumerados(dataEnumerados);

        const dataGraduado = await obtenerDatosGraduado();
        setDatos({
          nombre: dataGraduado.nombre,
          apellido: dataGraduado.apellido,
          dni: dataGraduado.dni,
          fecha_nacimiento: dataGraduado.fecha_nacimiento,
          ciudad: dataGraduado.ciudad,
          contacto: dataGraduado.contacto,
          carreras: dataGraduado.carreras,
          ocupaciones: dataGraduado.ocupaciones, 
          experiencia_anios: dataGraduado.experiencia_anios,
          habilidades_competencias: dataGraduado.habilidades_competencias,
          formacion: dataGraduado.formacion,
          rrss: dataGraduado.rrss,
          cv: dataGraduado.cv,
          interes_comunidad: dataGraduado.interes_comunidad,
          interes_oferta: dataGraduado.interes_oferta,
          interes_demanda: dataGraduado.interes_demanda,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <DefaultSkeleton />;
  }

  return (
    <section className="flex flex-col items-center justify-between py-4">
      <Form carreras={carreras} enumerados={enumerados} datosGraduado={datos} modoEdicion={true} />
    </section>
  );
};

export default Perfil;