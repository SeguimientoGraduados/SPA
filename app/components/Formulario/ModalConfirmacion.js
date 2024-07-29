import React from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

const ModalConfirmacion = ({ open, handleOpen, onAceptar, formData }) => {
  const handleCancelar = () => {
    handleOpen(false);
  };

  
  const handleAceptar = (e) => {
    handleOpen(false);
    onAceptar(e); 
  };

  return (
    <>
      <Dialog size="xs" open={open} handler={handleOpen}>
        <DialogBody divider className="grid place-items-center gap-4">
          <Typography variant="h4">Importante</Typography>
          <Typography variant="small" className="text-center font-normal">
            Al enviar esta información, usted acepta y reconoce que lo hace bajo
            su propia responsabilidad. La Universidad Nacional del Sur no se
            hace responsable de la seguridad de la información proporcionada ni
            de cualquier daño o perjuicio que pueda derivarse de su envío.
          </Typography>
        </DialogBody>
        <DialogFooter className="flex flex-row gap-4 justify-center">
          <Button color="red" variant="gradient" onClick={handleCancelar}>
            Cancelar
          </Button>
          <Button color="blue" variant="gradient" onClick={handleAceptar}>
            Aceptar
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ModalConfirmacion;
