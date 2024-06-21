import { IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";


const BotonExportarExcel = ({onClickDescargarExcel}) => {
  return (
    <IconButton
      onClick={onClickDescargarExcel}
      variant="gradient"
      color="green"
      size="lg"
      className="self-end"
    >
      <FontAwesomeIcon icon={faFileExcel} />
    </IconButton>
  );
};

export default BotonExportarExcel;
