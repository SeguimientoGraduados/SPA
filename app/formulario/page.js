"use client";
import Form from "../components/Formulario/Formulario";
import React, { useState, useEffect } from "react";
import obtenerTodasLasCarreras from "../services/carrerasService";
import graduadosService from "../services/graduadosService";
import { DefaultSkeleton } from "../components/Utils/Skeleton";

const Formulario = () => {
  const { obtenerEnumerados } = graduadosService;
  const [carreras, setCarreras] = useState([]);
  const [enumerados, setEnumerados] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCarreras = await obtenerTodasLasCarreras();
        setCarreras(dataCarreras);
        const dataEnumerados = await obtenerEnumerados();
        setEnumerados(dataEnumerados);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (enumerados === null) {
    return <DefaultSkeleton />
  }

  return (
    <section className="flex flex-col items-center justify-between py-4">
      <Form carreras={carreras} enumerados={enumerados} />
    </section>
  );
};

export default Formulario;
