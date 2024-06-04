"use client";
import Form from "../components/Formulario/FormularioComponent";
import React, { useState, useEffect } from "react";
import obtenerTodasLasCarreras from "../services/carrerasService";
import obtenerTodasLasCiudades from "../services/ciudadesService";

const Formulario = () => {
  const [carreras, setCarreras] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCarreras = await obtenerTodasLasCarreras();
        setCarreras(dataCarreras);
        const dataCiudades = await obtenerTodasLasCiudades();
        setCiudades(dataCiudades);
      } catch (error) {
        console.error("Error fetching carreras:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="flex flex-col items-center justify-between py-4 bg-gray-200">
      <Form carreras={carreras} ciudades={ciudades} />
    </section>
  );
};

export default Formulario;
