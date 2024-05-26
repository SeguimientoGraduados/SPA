import 'leaflet/dist/leaflet.css'
import React, { useState } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import CiudadMarker from '../CiudadMarkerComponent';
import BotonFiltros from './BotonFiltros';

const Mapa = ({ graduados, ciudades, selectedCity, setSelectedCity }) => {

  return (
    <MapContainer className="z-30" center={[-38.71830000, -62.26600000]} zoom={3} scrollWheelZoom={false} style={{ height: '600px', width: '100%' }} zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {ciudades.map((ciudad, index) => (
        <CiudadMarker
          key={index}
          ciudad={ciudad}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
      ))}
      <ZoomControl position="bottomright" zoomInText="+" zoomOutText="-" />
      <BotonFiltros className="boton-filtros-left" />
    </MapContainer>

  );
};

export default Mapa;
