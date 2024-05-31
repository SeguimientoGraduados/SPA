'use client';
import Form from "../components/Formulario/FormularioComponent"
import React, { useState, useEffect } from 'react';
import obtenerTodasLasCarreras from '../services/carrerasService';
import obtenerTodasLasCiudades from "../services/ciudadesService"

const Formulario = () => {

  const [carreras, setCarreras] = useState([]);
  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const data = await obtenerTodasLasCarreras();
        setCarreras(data);
      } catch (error) {
        console.error('Error fetching carreras:', error);
      }
    };

    fetchCarreras();
  }, []);

  const [ciudades, setCiudades] = useState([]);
  useEffect(() => {
    const fetchCiudades = async () => {
      try {
        const data = await obtenerTodasLasCiudades();
        setCiudades(data);
      } catch (error) {
        console.error('Error fetching ciudades:', error);
      }
    };

    fetchCiudades();
  }, []);



  return (
    <section className="flex flex-col items-center justify-between py-4 bg-gray-200">
      <Form
        carreras={carreras}
        ciudades={ciudades}
      />
    </section>
  );
};

export default Formulario;
