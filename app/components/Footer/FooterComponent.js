import Image from "next/image";
import logoUns from "../../../public/uns-footer.svg"
import bandera from "../../../public/arg.svg"

const Footer = () => {
  return (
    <footer className="bg-blue-200 px-32 py-4">
      <div className="flex justify-around items-center">
        <Image className="h-auto" src={logoUns} alt="UNS" width={100} />
        <p className="basis-1/2 text-black text-xl text-center">Universidad Nacional del Sur</p>
        <Image className="h-auto" src={bandera} alt="ARG" width={100} />
      </div>
    </footer>
  );
};

export default Footer;
