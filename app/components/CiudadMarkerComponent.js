import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import ciudadesACoordenadas from "../utils/ciudadesACoordenadasMapping";

const CiudadMarker = ({ ciudad }) => {
  const coordenadas = ciudadesACoordenadas[ciudad];
  if (!coordenadas) {
    return null; 
  }

  return (
    <Marker position={[coordenadas.latitude, coordenadas.longitude]}>
      <Popup>{ciudad} NASHE</Popup>
    </Marker>
  );
};

export default CiudadMarker;
