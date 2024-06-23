import { IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";


const BotonLimpiarFiltros = ({onClickLimpiarFiltros}) => {
  return (
    <IconButton
      onClick={onClickLimpiarFiltros}
      variant="text"
      color="blue"
      size="md"
      className="self-end"
    >
      <FontAwesomeIcon icon={faArrowRotateLeft} />
    </IconButton>
  );
};

export default BotonLimpiarFiltros;
