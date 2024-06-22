import React from 'react';
import { Marker, Popup } from 'react-leaflet';

const CiudadMarker = ({ ciudad, selectedCity, setSelectedCity }) => {
  const handleMarkerClick = () => {
    setSelectedCity(ciudad);
  };
  const iconUrl = 'http://localhost:3000/_next/static/media/marker-icon-2x.93fdb12c.png';
  const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
}); 
  return (
    <Marker
      position={[ciudad.latitud, ciudad.longitud]}
      eventHandlers={{
        click: handleMarkerClick
      }}
      icon={customIcon}
    >
      <Popup>
        {ciudad.nombre} - {ciudad.cantidad_graduados}
        {ciudad.cantidad_graduados === 1 ? ' graduado' : ' graduados'}
      </Popup>
    </Marker>
  );
};

export default CiudadMarker;
