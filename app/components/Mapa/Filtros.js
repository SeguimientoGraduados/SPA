import React, { useState, useEffect } from "react";
import { IconButton, Card } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import FiltroPaisComponent from "./Filtros/FiltroPaisComponent";
import FiltroDepartamentoComponent from "./Filtros/FiltroDepartamentoComponent";
import graduadosService from "@/app/services/graduadosService";

const Filtros = ({ onFiltrosChange }) => {
  const { obtenerValoresParaFiltrar } = graduadosService;
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [paises, setPaises] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState(null);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState(null);

  const handleButtonClicked = () => {
    setMostrarFiltros(!mostrarFiltros);
  };

  const handlePaisChange = (pais) => {
    setPaisSeleccionado(pais);
  }

  const handleDepartamentoChange = (dpto) => {
    setDepartamentoSeleccionado(dpto);
  }

  useEffect(() => {
    const obtenerValores = async () => {
      try {
        const response = await obtenerValoresParaFiltrar();
        setPaises(response.paises);
        setDepartamentos(response.departamentos);
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
    
    onFiltrosChange(filtros);
  }, [paisSeleccionado, departamentoSeleccionado]);

  return (
    <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1000 }}>
      <IconButton
        className="mt-2 ml-2"
        id="boton"
        color="white"
        onClick={handleButtonClicked}
      >
        <FontAwesomeIcon icon={faPlus} />
      </IconButton>

      {mostrarFiltros && (
        <Card className="w-full flex flex-col gap-2 mt-2 ml-2 p-2">
          <FiltroPaisComponent
            paises={paises}
            onPaisChange={(pais) => handlePaisChange(pais)}
          />
          <FiltroDepartamentoComponent
            departamentos={departamentos}
            onDepartamentoChange={(departamento) => handleDepartamentoChange(departamento)}
          />
        </Card>
      )}
    </div>
  );
};

export default Filtros;
