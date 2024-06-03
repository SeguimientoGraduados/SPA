import { useState } from "react";
import {
  Card,
  Button,
  Typography,
  Dialog,
  CardBody,
  CardFooter,
  Checkbox,
} from "@material-tailwind/react";
import graduadosService from "@/app/services/graduadosService";

const ModalSolicitudes = ({ solicitud, fetchData }) => {
  const { aprobarSolicitudGraduado, rechazarSolicitudGraduado } =
    graduadosService;
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleConfirmOpen = () => setConfirmOpen((cur) => !cur);

  const handleAprobar = async () => {
    try {
      await aprobarSolicitudGraduado(solicitud.id);
      fetchData();
      setOpen(false);
    } catch (error) {
      console.error("Error al aprobar la solicitud:", error);
    }
  };

  const handleRechazar = async () => {
    try {
      await rechazarSolicitudGraduado(solicitud.id);
      fetchData();
      setConfirmOpen(false);
      setOpen(false);
    } catch (error) {
      console.error("Error al rechazar la solicitud:", error);
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="small"
        color="blue"
        className="font-semibold"
      >
        Evaluar
      </Button>

      <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
        onClose={handleOpen}
        backdrop="static"
      >
        <Card className="mx-auto w-full max-w-[40rem]">
          <CardBody className="flex flex-col gap-2">
            <Typography
              variant="h4"
              color="blue-gray"
              className="text-center font-semibold"
            >
              Solicitud de alta
            </Typography>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col">
                <Typography variant="small" className="font-semibold">
                  Nombre:
                </Typography>
                <Typography variant="small">{solicitud.nombre}</Typography>
              </div>
              <div className="flex flex-col">
                <Typography variant="small" className="font-semibold">
                  DNI:
                </Typography>
                <Typography variant="small">{solicitud.dni}</Typography>
              </div>
              <div className="flex flex-col">
                <Typography variant="small" className="font-semibold">
                  Fecha de nacimiento:
                </Typography>
                <Typography variant="small">
                  {solicitud.fecha_nacimiento}
                </Typography>
              </div>
            </div>

            {solicitud.carreras.map((carrera, index) => (
              <div key={index} className="grid grid-cols-2 gap-8 content-between">
                <div className="flex flex-col">
                  <Typography variant="small" className="font-semibold">
                    Carrera:
                  </Typography>
                  <Typography variant="small">{carrera.nombre}</Typography>
                </div>
                <div className="flex flex-col">
                  <Typography variant="small" className="font-semibold">
                    Año de graduacion:
                  </Typography>
                  <Typography variant="small">
                    {carrera.anio_graduacion}
                  </Typography>
                </div>
              </div>
            ))}
            <Typography
              variant="h6"
              color="blue-gray"
              className="font-semibold text-center font-semibold"
            >
              Ocupacion
            </Typography>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col">
                <Typography variant="small" className="font-semibold">
                  Trabajo:
                </Typography>
                <Typography variant="small">
                  {solicitud.ocupacion_trabajo}
                </Typography>
              </div>
              <div className="flex flex-col">
                <Typography variant="small" className="font-semibold">
                  Empresa:
                </Typography>
                <Typography variant="small">
                  {solicitud.ocupacion_empresa}
                </Typography>
              </div>
              <div className="flex flex-col">
                <Typography variant="small" className="font-semibold">
                  Sector:
                </Typography>
                <Typography variant="small">
                  {solicitud.ocupacion_sector}
                </Typography>
              </div>
            </div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="text-center font-semibold"
            >
              Experiencia
            </Typography>
            <div className="flex flex-col">
              <Typography variant="small" className="font-semibold">
                Años de experiencia:
              </Typography>
              <Typography variant="small">
                {solicitud.experiencia_anios}
              </Typography>
            </div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="text-center font-semibold"
            >
              Habilidades/competencias
            </Typography>
            <Typography variant="small">
              {solicitud.habilidades_competencias}
            </Typography>
            <Typography
              variant="h6"
              color="blue-gray"
              className="text-center font-semibold"
            >
              Intereses
            </Typography>
            <div className="flex flex-col px-40">
              <Checkbox
                color="blue"
                label="Comunidad"
                defaultChecked={solicitud.interes_comunidad}
                disabled={true}
              />
              <Checkbox
                color="blue"
                label="Oferta"
                defaultChecked={solicitud.interes_oferta}
                disabled={true}
              />
              <Checkbox
                color="blue"
                label="Demanda"
                defaultChecked={solicitud.interes_demanda}
                disabled={true}
              />
            </div>
          </CardBody>
          <CardFooter className="flex flex-row gap-4">
            <Button
              variant="gradient"
              color="red"
              onClick={handleConfirmOpen}
              fullWidth
            >
              Rechazar
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={handleAprobar}
              fullWidth
            >
              Aprobar
            </Button>
          </CardFooter>
        </Card>
      </Dialog>

      <Dialog
        open={confirmOpen}
        handler={handleConfirmOpen}
        className="bg-transparent shadow-none"
        onClose={handleConfirmOpen}
        backdrop="static"
      >
        <Card className="mx-auto w-full max-w-[20rem]">
          <CardBody className="flex flex-col gap-4 text-center">
            <Typography variant="h5" color="blue-gray">
              ¿Está seguro de que desea rechazar la solicitud?
            </Typography>
          </CardBody>
          <CardFooter className="flex flex-row gap-4 justify-center">
            <Button variant="gradient" color="red" onClick={handleRechazar}>
              Sí
            </Button>
            <Button
              variant="gradient"
              color="blue-gray"
              onClick={handleConfirmOpen}
            >
              No
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default ModalSolicitudes;
