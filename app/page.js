"use client";
import Mapa from "./components/Mapa";
import graduadosService from "./services/graduadosService";
import TablaGraduados from "./components/Graduados/TablaGraduados";
import React, { useState, useEffect } from "react";
import { DefaultSkeleton } from "./components/Utils/Skeleton";

const Home = () => {
  const { obtenerGraduados } = graduadosService;
  const [graduados, setGraduados] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataGraduados = await obtenerGraduados();
        setGraduados(dataGraduados);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleCambioFiltros = async (params) => {
    try {
      setLoading(true);
      const response = await obtenerGraduados(params);
      setGraduados(response);
    } catch (error) {
      console.error("Error al obtener graduados por ciudad:", error);
    } finally {
      setLoading(false);
    }
  };

  if (graduados === null) {
    return <DefaultSkeleton />;
  }

  return (
    <section className="bg-gray-200 flex flex-col gap-8 p-10">
      <Mapa
        graduadosPorCiudad={graduados}
        onFiltrosChange={handleCambioFiltros}
      />
      <TablaGraduados graduadosPorCiudad={graduados} loading={loading}/>
    </section>
  );
};

export default Home;
