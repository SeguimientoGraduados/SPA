import {
  Card,
  Button,
  Typography,
} from "@material-tailwind/react";
import Pagination from "./PaginationComponent";
import React, { useState } from "react";
import PrimerBloque from "./Bloques/Bloque1Component";
import SegundoBloque from "./Bloques/Bloque2Component";
import TercerBloque from "./Bloques/Bloque3Component";

const Form = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderInputsForPage = (page) => {
    switch (page) {
      case 1:
        return (
          <PrimerBloque />
        );
      case 2:
        return (
          <SegundoBloque />
        );
      case 3:
        return (
          <TercerBloque />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Typography variant="h3" className="-mt-8 font-normal" color="blue-gray">
        Graduados UNS
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        La información que proporciones es invaluable para comprender mejor el perfil y las trayectorias laborales de los graduados de la Universidad Nacional del Sur (UNS). Tus respuestas serán tratadas de manera confidencial y se utilizarán únicamente con fines estadísticos y de investigación.
      </Typography>

      <Card color="transparent" shadow={false}  className="w-full items-center">
        <form className="mt-8 mb-2 max-w-screen-lg sm:w-full">
          <div className="mb-1 flex flex-col gap-6">
            {renderInputsForPage(currentPage)}
          </div>

        </form>
      </Card>
      <div className="mt-6 -ml-4">
        <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
      {currentPage === 3 && (
        <Button className="mt-6">
          Finalizar
        </Button>
      )}
    </>
  );
}

export default Form;
