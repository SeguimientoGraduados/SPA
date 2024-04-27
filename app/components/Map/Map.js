import 'leaflet/dist/leaflet.css'
/* import 'Home.modules.css' */
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

const position = [51.505, -0.09]

const Map = () => {
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
    </MapContainer>
  );
};

export default Map;
