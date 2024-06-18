import 'leaflet/dist/leaflet.css'
import React from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import CiudadMarker from './CiudadMarkerComponent';
import Filtros from './Filtros';

const Mapa = ({ graduadosPorCiudad, selectedCity, setSelectedCity, onFiltrosChange }) => {
  const handleFiltrosChange = async (params) => {
    onFiltrosChange(params)
  }

  return (
    <MapContainer className="z-30" center={[-38.71830000, -62.26600000]} zoom={3} scrollWheelZoom={false} style={{ height: '450px', width: '100%' }} zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {graduadosPorCiudad.map((ciudad, index) => (
        <CiudadMarker
          key={index}
          ciudad={ciudad.ciudad}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
      ))}
      <ZoomControl position="bottomright" zoomInText="+" zoomOutText="-" />
      <Filtros onFiltrosChange={handleFiltrosChange}/>
    </MapContainer>

  );
};

export default Mapa;
