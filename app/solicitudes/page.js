"use client";
import React, { useEffect, useState } from "react";
import TablaSolicitudes from "../components/Solicitudes/TablaSolicitudes";
import { Typography } from "@material-tailwind/react";
import graduadosService from "../services/graduadosService";
import PaginacionSolicitudes from "../components/Solicitudes/PaginacionSolicitudes";

const Solicitudes = () => {
  const { obtenerGraduadosPorValidar } = graduadosService;

  const [graduadosPorValidar, setGraduadosPorValidar] = useState([]);
  const [paginas, setPaginas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (params = {}) => {
    try {
      const response = await obtenerGraduadosPorValidar(params);
      setGraduadosPorValidar(response.data);
      setPaginas(response.links);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickPagina = (url) => {
    if (url) {
      const params = new URL(url).searchParams;
      const queryParams = {};
      params.forEach((value, key) => {
        queryParams[key] = value;
      });

      fetchData(queryParams);
    }
  };

  return (
    <section className="h-screen flex flex-col gap-10 items-center p-10 bg-gray-200">
      <Typography variant="h2" color="blue-gray" className="font-normal">
        Solicitudes
      </Typography>
      <TablaSolicitudes
        solicitudes={graduadosPorValidar}
        fetchData={fetchData}
      />
      <PaginacionSolicitudes
        paginas={paginas}
        onClickPagina={handleClickPagina}
      />
    </section>
  );
};

export default Solicitudes;
