import Image from "next/image";
import logoUns from "../../../public/logo.svg"

const Header = () => {
  return (
    <header className="bg-blue-200 flex justify-between items-center px-32 py-4 border-b-2 border-blue-300">
      <div className="flex items-center">
        <Image src={logoUns} alt="UNS" width={50} height={50}/>
      </div>
      <button className="bg-sky-600 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded">
        Iniciar sesión
      </button>
    </header>
  );
};

export default Header;
