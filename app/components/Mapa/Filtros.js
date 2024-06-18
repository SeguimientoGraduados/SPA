import React, { useState, useEffect } from "react";
import { IconButton, Card } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import FiltroPaisComponent from "./Filtros/FiltroPaisComponent";
import graduadosService from "@/app/services/graduadosService";

const Filtros = ({onFiltrosChange}) => {
  const { obtenerPaisesParaFiltrar } = graduadosService;
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [paises, setPaises] = useState([]);

  const handlePaisChange = (paisId) => {
    onFiltrosChange({pais: paisId});
  }
  const handleButtonClicked = () => {
    setMostrarFiltros(!mostrarFiltros);
  };

  useEffect(() => {
    const obtenerPaises = async () => {
      try {
        const response = await obtenerPaisesParaFiltrar();
        setPaises(response);
      } catch (error) {
        console.error("Error al obtener los países:", error);
      }
    };

    obtenerPaises();
  }, []);

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
        <Card className="w-full mt-2 ml-2">
          <FiltroPaisComponent
            paises={paises}
            onPaisChange={(pais) => handlePaisChange(pais)}
          />
        </Card>
      )}
    </div>
  );
};

export default Filtros;
