import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
 
const PaginationComponent = ({ currentPage, onPageChange }) => {
  const next = () => {
    if (currentPage < 3) { 
      onPageChange(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Anterior
      </Button>
      <div className="flex items-center gap-2">
        <IconButton variant={currentPage === 1 ? 'filled' : 'text'} onClick={() => onPageChange(1)}>1</IconButton>
        <IconButton variant={currentPage === 2 ? 'filled' : 'text'} onClick={() => onPageChange(2)}>2</IconButton>
        <IconButton variant={currentPage === 3 ? 'filled' : 'text'} onClick={() => onPageChange(3)}>3</IconButton>
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={currentPage === 3}
      >
        Siguiente <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
export default PaginationComponent;