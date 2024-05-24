'use client';
import Mapa from "./components/Mapa";
import getCiudades from "./services/ciudadesService";
import TablaGraduados from "./components/Graduados/TablaGraduadosComponent"
import React, { useState } from "react";

const ciudades = getCiudades()

const Home = () => {

  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <section className="bg-gray-200 flex min-h-screen flex-col items-center justify-between p-24">
      <Mapa
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
