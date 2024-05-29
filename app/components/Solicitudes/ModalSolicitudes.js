import { useState } from "react";
import {
  Card,
  Button,
  Typography,
  Dialog,
  CardBody,
  CardFooter,
  Checkbox
} from "@material-tailwind/react";

const ModalSolicitudes = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  return (
    <>
      <Button
        onClick={handleOpen}
        variant="small"
        color="blue"
        className="font-medium"
      >
        Evaluar
      </Button>

      <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[40rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray" className="text-center">
              Solicitud de alta
            </Typography>
            <div className="grid grid-cols-2">
              <Typography variant="small" className="font-light">
                Nombre:{" "}
              </Typography>
              <Typography variant="small" className="font-light">
                DNI:{" "}
              </Typography>
            </div>
            <Typography variant="small" className="font-light">
              Fecha de nacimiento:{" "}
            </Typography>
            <div className="grid grid-cols-2">
              <Typography variant="small" className="font-light">
                Carrera:{" "}
              </Typography>
              <Typography variant="small" className="font-light">
                Año de graduacion:{" "}
              </Typography>
            </div>
            <Typography variant="h6" color="blue-gray" className="font-medium text-center">
              Ocupacion
            </Typography>
            <div className="grid grid-cols-3">
              <Typography variant="small" className="font-light">
                Trabajo:{" "}
              </Typography>
              <Typography variant="small" className="font-light">
                Empresa:{" "}
              </Typography>
              <Typography variant="small" className="font-light">
                Sector:{" "}
              </Typography>
            </div>
            <Typography variant="h6" color="blue-gray" className="font-medium text-center">
              Experiencia
            </Typography>
            <Typography variant="small" className="font-light">
              Años de experiencia:{" "}
            </Typography>
            <Typography variant="small" className="font-light">
              Informacion adicional:{" "}
            </Typography>
            <Typography variant="h6" color="blue-gray" className="font-medium text-center">
              Habilidades/competencias
            </Typography>
            <Typography variant="small" className="font-light">
              {" "}
            </Typography>
            <Typography variant="h6" color="blue-gray" className="font-medium text-center">
              Intereses
            </Typography>
            <div className="flex flex-col gap-2 px-40">
                <Checkbox color="blue" label="Comunidad" defaultChecked disabled={true} />
                <Checkbox color="blue" label="Oferta" defaultChecked disabled={true} />
                <Checkbox color="blue" label="Demanda" defaultChecked disabled={true} />
            </div>
          </CardBody>
          <CardFooter className="flex flex-row gap-4">
            <Button variant="gradient" color="red" onClick={handleOpen} fullWidth>
              Rechazar
            </Button>
            <Button variant="gradient" color="green" onClick={handleOpen} fullWidth>
              Aprobar
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default ModalSolicitudes;
