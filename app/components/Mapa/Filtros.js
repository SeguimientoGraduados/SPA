import React, { useState, useEffect, useContext } from "react";
import { Typography, Spinner } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import FiltroPais from "./Filtros/FiltroPais";
import FiltroDepartamento from "./Filtros/FiltroDepartamento";
import FiltroCarrera from "./Filtros/FiltroCarrera";
import FiltroAnio from "./Filtros/FiltroAnio";
import graduadosService from "@/app/services/graduadosService";
import BotonExportarExcel from "./Filtros/ExportarExcel";
import { AuthContext } from "@/app/context/AuthContext";

const Filtros = ({ onFiltrosChange, onDescargarExcel }) => {
  const { obtenerValoresParaFiltrar } = graduadosService;
  const { authState } = useContext(AuthContext);
  const { isAuthenticated, user } = authState;

  const [paises, setPaises] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [anioMin, setAnioMin] = useState(null);
  const [anioMax, setAnioMax] = useState(null);

  const [paisSeleccionado, setPaisSeleccionado] = useState(null);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState(null);
  const [carreraSeleccionado, setCarreraSeleccionado] = useState(null);
  const [anioMinSeleccionado, setAnioMinSeleccionado] = useState(null);
  const [anioMaxSeleccionado, setAnioMaxSeleccionado] = useState(null);

  const [cargando, setCargando] = useState(true);

  const handlePaisChange = (pais) => {
    setPaisSeleccionado(pais);
  };

  const handleDepartamentoChange = (dpto) => {
    setDepartamentoSeleccionado(dpto);
  };

  const handleCarreraChange = (carrera) => {
    setCarreraSeleccionado(carrera);
  };

  const handleAnioChange = (min, max) => {
    setAnioMinSeleccionado(min);
    setAnioMaxSeleccionado(max);
  };

  const handleDescargarExcelClick = () => {
    const filtros = {};
    if (paisSeleccionado) {
      filtros.pais = paisSeleccionado;
    }
    if (departamentoSeleccionado) {
      filtros.departamento = departamentoSeleccionado;
    }
    if (carreraSeleccionado) {
      filtros.carrera = carreraSeleccionado;
    }
    if (anioMinSeleccionado) {
      filtros.anioDesde = anioMinSeleccionado;
    }
    if (anioMaxSeleccionado) {
      filtros.anioHasta = anioMaxSeleccionado;
    }
    onDescargarExcel(filtros);
  };

  useEffect(() => {
    const obtenerValores = async () => {
      try {
        const response = await obtenerValoresParaFiltrar();
        setPaises(response.paises);
        setDepartamentos(response.departamentos);
        setCarreras(response.carreras);
        setAnioMin(response.anios.anio_min);
        setAnioMinSeleccionado(response.anios.anio_min);
        setAnioMax(response.anios.anio_max);
        setAnioMaxSeleccionado(response.anios.anio_max);
      } catch (error) {
        console.error("Error al obtener los filtros:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerValores();
  }, []);

  useEffect(() => {
    const filtros = {};
    if (paisSeleccionado) {
      filtros.pais = paisSeleccionado;
    }
    if (departamentoSeleccionado) {
      filtros.departamento = departamentoSeleccionado;
    }
    if (carreraSeleccionado) {
      filtros.carrera = carreraSeleccionado;
    }
    if (anioMinSeleccionado) {
      filtros.anioDesde = anioMinSeleccionado;
    }
    if (anioMaxSeleccionado) {
      filtros.anioHasta = anioMaxSeleccionado;
    }

    onFiltrosChange(filtros);
  }, [
    paisSeleccionado,
    departamentoSeleccionado,
    carreraSeleccionado,
    anioMinSeleccionado,
    anioMaxSeleccionado,
  ]);

  return (
    <div className="flex flex-col py-4 gap-4">
      <div className="flex flex-row gap-4">
        <FontAwesomeIcon icon={faFilter} color="blue" className="mt-1" />
        <Typography variant="h5" color="blue-gray">
          Filtros
        </Typography>
      </div>
      {cargando ? (
        <div className="flex justify-center items-center h-full">
          <Spinner className="h-8 w-8" color="blue" />
        </div>
      ) : (
        <>
          <FiltroPais paises={paises} onPaisChange={handlePaisChange} />
          <FiltroDepartamento
            departamentos={departamentos}
            onDepartamentoChange={handleDepartamentoChange}
          />
          <FiltroCarrera
            carreras={carreras}
            onCarreraChange={handleCarreraChange}
          />
          <FiltroAnio
            min={anioMin}
            max={anioMax}
            onAnioChange={handleAnioChange}
          />
          {isAuthenticated && user?.rol === "admin" && (
            <BotonExportarExcel
              onClickDescargarExcel={handleDescargarExcelClick}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Filtros;
