import React, { useState, useEffect } from "react";
import { IconButton, Card, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import FiltroPaisComponent from "./Filtros/FiltroPaisComponent";
import FiltroDepartamentoComponent from "./Filtros/FiltroDepartamentoComponent";
import FiltroAnioComponent from "./Filtros/FiltroAnioComponent";
import graduadosService from "@/app/services/graduadosService";

const Filtros = ({ onFiltrosChange }) => {
  const { obtenerValoresParaFiltrar } = graduadosService;
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  
  const [paises, setPaises] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [anioMin, setAnioMin] = useState(null);
  const [anioMax, setAnioMax] = useState(null);

  const [paisSeleccionado, setPaisSeleccionado] = useState(null);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState(null);
  const [anioMinSeleccionado, setAnioMinSeleccionado] = useState(null);
  const [anioMaxSeleccionado, setAnioMaxSeleccionado] = useState(null);

  const handleButtonClicked = () => {
    setMostrarFiltros(!mostrarFiltros);
  };

  const handlePaisChange = (pais) => {
    setPaisSeleccionado(pais);
  };

  const handleDepartamentoChange = (dpto) => {
    setDepartamentoSeleccionado(dpto);
  };

  const handleAnioChange = (min, max) => {
    setAnioMinSeleccionado(min);
    setAnioMaxSeleccionado(max);
    console.log(min,max)
  };

  useEffect(() => {
    const obtenerValores = async () => {
      try {
        const response = await obtenerValoresParaFiltrar();
        setPaises(response.paises);
        setDepartamentos(response.departamentos);
        setAnioMin(response.anios.anio_min);
        setAnioMinSeleccionado(response.anios.anio_min);
        setAnioMax(response.anios.anio_max);
        setAnioMaxSeleccionado(response.anios.anio_max);
      } catch (error) {
        console.error("Error al obtener los filtros:", error);
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
    if (anioMinSeleccionado) {
      filtros.anioDesde = anioMinSeleccionado;
    }
    if (anioMaxSeleccionado) {
      filtros.anioHasta = anioMaxSeleccionado;
    }

    onFiltrosChange(filtros);
  }, [paisSeleccionado, departamentoSeleccionado, anioMinSeleccionado, anioMaxSeleccionado]);

  return (
    <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1000 }}>
      <IconButton size="lg" color="white" onClick={handleButtonClicked}>
        <FontAwesomeIcon icon={faFilter} />
      </IconButton>

      {mostrarFiltros && (
        <Card className="w-full flex flex-col gap-2 mt-2 p-2">
          <Typography variant="paragraph" className="text-center">
            Filtros
          </Typography>
          <FiltroPaisComponent
            paises={paises}
            onPaisChange={(pais) => handlePaisChange(pais)}
          />
          <FiltroDepartamentoComponent
            departamentos={departamentos}
            onDepartamentoChange={(departamento) =>
              handleDepartamentoChange(departamento)
            }
          />
          <FiltroAnioComponent
            min={anioMin}
            max={anioMax}
            onAnioChange={(min, max) => handleAnioChange(min, max)}
          />
        </Card>
      )}
    </div>
  );
};

export default Filtros;
