import 'leaflet/dist/leaflet.css'
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const position = [-38.7, -62.3]

const Map = () => {
  return (
    <MapContainer center={position} zoom={3} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          NASHE
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
