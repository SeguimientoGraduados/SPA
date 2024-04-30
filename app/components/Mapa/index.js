import dynamic from "next/dynamic";

const Mapa = dynamic(() => import('./MapaComponent'),{
    ssr: false
});

export default Mapa;