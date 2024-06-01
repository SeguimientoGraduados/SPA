'use client';
import Mapa from "./components/Mapa";
import graduadosService from "./services/graduadosService";
import obtenerTodasLasCiudades from "./services/ciudadesService";
import TablaGraduados from "./components/Graduados/TablaGraduadosComponent"
import React, { useState , useEffect } from "react";

const Home = () => {
  const { obtenerGraduados } = graduadosService;
  const [graduados, setGraduados] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
        try {
          const dataGraduados = await obtenerGraduados();
          const dataCiudades = await obtenerTodasLasCiudades();

          const ciudadesGraduadosIds = dataGraduados.map(graduado => graduado.ciudad_id);
          const ciudadesFiltradas = dataCiudades.filter(ciudad => ciudadesGraduadosIds.includes(ciudad.id));
          setGraduados(dataGraduados);
          setCiudades(ciudadesFiltradas)
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false);
        }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-gray-200 flex min-h-screen flex-col items-center justify-between p-24">
      <Mapa
        graduados={graduados}
        ciudades={ciudades}
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
