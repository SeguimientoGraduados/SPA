import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import CiudadMarker from "./CiudadMarker";
import Filtros from "./Filtros";
import graduadosService from "@/app/services/graduadosService";
import '../../globals.css';

const Mapa = ({
  graduadosPorCiudad,
  onCityChange,
  onFiltrosChange,
}) => {
  const { exportarExcelGraduados } = graduadosService;

  const handleFiltrosChange = async (params) => {
    onFiltrosChange(params);
  };

  const handleDescargarExcel = async (params) => {
    try {
      await exportarExcelGraduados(params);
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
    }
  };

  const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<div><span>${cluster.getChildCount()}</span></div>`,
      className: 'custom-marker-cluster',
      iconSize: L.point(40, 40, true),
    });
  };

  return (
    <div className="grid grid-cols-7 gap-4" style={{ height: "450px" }}>
      <div className="col-span-1">
        <Filtros
          onFiltrosChange={handleFiltrosChange}
          onDescargarExcel={handleDescargarExcel}
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
                onCitySelect={onCityChange}
              />
            ))}
          </MarkerClusterGroup>
          <ZoomControl position="bottomright" zoomInText="+" zoomOutText="-" />
        </MapContainer>
      </div>
    </div>
  );
};

export default Mapa;
