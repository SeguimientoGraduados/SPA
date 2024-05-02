import React, { useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import ciudadesACoordenadas from "../utils/ciudadesACoordenadasMapping";

const CiudadMarker = ({ ciudad, selectedCity, setSelectedCity }) => {
  const coordenadas = ciudadesACoordenadas[ciudad];
  if (!coordenadas) {
    return null;
  }
   const handleMarkerClick = () => {
    setSelectedCity(ciudad); 
  };

  return (
    <Marker
      position={[coordenadas.latitude, coordenadas.longitude]}
      eventHandlers={{
        click: handleMarkerClick
      }}
    >
      <Popup>{ciudad} NASHE</Popup>
    </Marker>
  );
};

export default CiudadMarker;
