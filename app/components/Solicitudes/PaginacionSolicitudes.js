import React from "react";
import { IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const PaginacionSolicitudes = ({ paginas, onClickPagina }) => {
  const renderIconButton = (link) => (
    <IconButton
      key={link.label}
      variant={link.active ? "filled" : "text"}
      color="blue"
      className="rounded-full"
      onClick={() => onClickPagina(link.url)}
      disabled={!link.url}
    >
      {link.label.includes('&laquo;') || link.label.includes('&raquo;') ? (
        <FontAwesomeIcon icon={link.label.includes('&laquo;') ? faArrowLeft : faArrowRight} color="blue" />
      ) : (
        link.label
      )}
    </IconButton>
  );

  return (
    <div className="flex items-center gap-4">
      {paginas.map(renderIconButton)}
    </div>
  );
};

export default PaginacionSolicitudes;