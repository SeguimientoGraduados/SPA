import React, { useState } from 'react';
import { Marker, Popup } from 'react-leaflet';

const CiudadMarker = ({ ciudad, selectedCity, setSelectedCity }) => {
   const handleMarkerClick = () => {
    setSelectedCity(ciudad); 
  };

  return (
    <Marker
      position={[ciudad.latitud, ciudad.longitud]}
      eventHandlers={{
        click: handleMarkerClick
      }}
    >
      <Popup>{ciudad.nombre} - {ciudad.cantidad_graduados} graduados</Popup>
    </Marker>
  );
};

export default CiudadMarker;
