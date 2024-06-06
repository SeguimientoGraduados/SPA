'use client';
import Mapa from "./components/Mapa";
import graduadosService from "./services/graduadosService";
import TablaGraduados from "./components/Graduados/TablaGraduadosComponent"
import React, { useState, useEffect } from "react";
import { DefaultSkeleton } from "./components/Utils/Skeleton";

const Home = () => {
  const { obtenerGraduados } = graduadosService;
  const [graduados, setGraduados] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataGraduados = await obtenerGraduados();
        setGraduados(dataGraduados);
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, []);

  if (graduados === null) {
    return <DefaultSkeleton />
  }

  return (
    <section className="bg-gray-200 flex min-h-screen flex-col items-center justify-between p-24">
      <Mapa
        graduadosPorCiudad={graduados}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />
      <div className="flex justify-start w-full mt-4">
        <TablaGraduados selectedCity={selectedCity} />
      </div>
    </section>
  );
};

export default Home;
