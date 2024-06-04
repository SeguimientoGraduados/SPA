"use client";
import React, { useEffect, useState} from "react";
import TablaSolicitudes from "../components/Solicitudes/TablaSolicitudes";
import { Typography } from "@material-tailwind/react";
import graduadosService from "../services/graduadosService";

const Solicitudes = () => {
  const { obtenerGraduadosPorValidar } = graduadosService;
  const [graduadosPorValidar, setGraduadosPorValidar] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const dataGraduadosPorValidar = await obtenerGraduadosPorValidar();
      setGraduadosPorValidar(dataGraduadosPorValidar);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section className="h-screen flex flex-col gap-4 items-center p-10 bg-gray-200">
      <Typography
        variant="h2"
        color="blue-gray"
        className="font-normal"
      >Solicitudes</Typography>
      <TablaSolicitudes solicitudes={graduadosPorValidar} fetchData={fetchData}/>
    </section>
  );
};

export default Solicitudes;
