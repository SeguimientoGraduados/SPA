'use client';
import Mapa from "./components/Mapa";
import getCiudades from "./services/ciudadesService";

const ciudades = getCiudades()


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <Mapa ciudades={ciudades} />
    </main>
  );
}
