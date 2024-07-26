import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import CiudadMarker from "./CiudadMarker";
import Filtros from "./Filtros";
import graduadosService from "@/app/services/graduadosService";
import { Button } from "@material-tailwind/react";
import '../../globals.css';

const Mapa = ({
  graduadosPorCiudad,
  onFiltrosChange,
}) => {
  const { exportarExcelGraduados } = graduadosService;
  const [filtros, setFiltros] = useState({});
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState(null);

  const handleFiltrosChange = async (params) => {
    setFiltros(params)
    onFiltrosChange(params)
  };

  const handleCiudadSelect = (ciudad) => {
    const newFiltros = { ...filtros, ciudad: ciudad.nombre };
    handleFiltrosChange(newFiltros);
    setCiudadSeleccionada(ciudad.nombre);
  };

  const handleCiudadLimpiar = () => {
    const { ciudad, ...restoDeFiltros } = filtros;
    handleFiltrosChange(restoDeFiltros);
    setCiudadSeleccionada(null);
  };

  const handleDescargarExcel = async (params) => {
    try {
      await exportarExcelGraduados(params);
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
    }
  };

  const clusterStyle = {
    backgroundColor: '#87CEEB',
    border: '2px solid #4682B4',
    borderRadius: '50%',
    color: 'white',
    height: '40px',
    width: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '16px',
  };
  
  const innerDivStyle = {
    backgroundColor: '#4682B4',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<div><span>${cluster.getChildCount()}</span></div>`,
      className: 'custom-marker-cluster',
      iconSize: L.point(40, 40, true),
    });
  };  

  return (
    <div>
      <div className="grid grid-cols-7 gap-4" style={{ height: "450px" }}>
        <div className="col-span-1">
          <Filtros
            onFiltrosChange={handleFiltrosChange}
            onDescargarExcel={handleDescargarExcel}
            onLimpiarCiudad={handleCiudadLimpiar}
            ciudadSeleccionada={ciudadSeleccionada}
          />
        </div>
        <div className="col-span-6 pl-10">
          <MapContainer
            className="z-30"
            center={[-38.7183, -62.266]}
            zoom={3}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MarkerClusterGroup
              chunkedLoading
              spiderfyOnMaxZoom={true}
              iconCreateFunction={createClusterCustomIcon}
            >
              {graduadosPorCiudad.map((ciudad, index) => (
                <CiudadMarker
                  key={index}
                  ciudad={ciudad.ciudad}
                  onCitySelect={handleCiudadSelect}
                  onCityClear={handleCiudadLimpiar}
                />
              ))}
            </MarkerClusterGroup>
            <ZoomControl position="bottomright" zoomInText="+" zoomOutText="-" />
          </MapContainer>

        </div>
      </div>
    </div>
  );
};

export default Mapa;
