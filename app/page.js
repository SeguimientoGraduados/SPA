'use client';
import Mapa from "./components/Mapa";
import getCiudades from "./services/ciudadesService";
import Header from "./components/Header/HeaderComponent";
import Footer from "./components/Footer/FooterComponent"

const ciudades = getCiudades()


export default function Home() {
  return (
    <main>
        <Header />
        <section className="bg-gray-200 flex min-h-screen flex-col items-center justify-between p-24">
          <Mapa ciudades={ciudades} />
        </section>
        <Footer />
    </main>
  );
}
