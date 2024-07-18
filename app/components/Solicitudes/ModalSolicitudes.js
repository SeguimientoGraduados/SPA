import { useState } from "react";
import {
  Card,
  Button,
  Typography,
  Dialog,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import graduadosService from "@/app/services/graduadosService";
import { format, parseISO } from 'date-fns';

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

  const fechaFormateada = format(parseISO(solicitud.fecha_nacimiento), 'dd/MM/yyyy');

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
        <Card className="relative mx-auto w-full max-w-[40rem]">
          <button
            data-ripple-dark="true"
            data-dialog-close="true"
            className="absolute top-2 right-2 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={handleOpen}
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                className="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </span>
          </button>

          <CardBody className="flex flex-col gap-2">
            <Typography
              variant="h4"
              color="blue-gray"
              className="text-center font-semibold"
            >
              Solicitud de alta
            </Typography>
            <div className="grid grid-cols-4 gap-2">
              <div className="flex flex-col">
                <Typography variant="small" className="font-semibold">
                  Nombre:
                </Typography>
                <Typography variant="small">{solicitud.nombre}</Typography>
              </div>
              <div className="flex flex-col">
                <Typography variant="small" className="font-semibold">
                  Apellido:
                </Typography>
                <Typography variant="small">{solicitud.apellido}</Typography>
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
                  {fechaFormateada}
                </Typography>
              </div>
            </div>

            {solicitud.carreras.map((carrera, index) => (
              <div
                key={index}
                className="grid grid-cols-2 gap-8 content-between"
              >
                <div className="flex flex-col">
                  <Typography variant="small" className="font-semibold">
                    Carrera:
                  </Typography>
                  <Typography variant="small">{carrera.nombre}</Typography>
                </div>
                <div className="flex flex-col">
                  <Typography variant="small" className="font-semibold">
                    Año de graduación:
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
              Ocupación
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
                <Typography
                  variant="small"
                  className="font-semibold text-center"
                >
                  Organización:
                </Typography>
                <Typography variant="small" className="text-center">
                  {solicitud.ocupacion_empresa}
                </Typography>
              </div>
              <div className="flex flex-col">
                <Typography
                  variant="small"
                  className="font-semibold text-center"
                >
                  Sector:
                </Typography>
                <Typography variant="small" className="text-center">
                  {solicitud.ocupacion_sector}
                </Typography>
              </div>
              <div className="flex flex-col col-span-3">
                <Typography
                  variant="small"
                  className="font-semibold text-center"
                >
                  Información adicional:
                </Typography>
                <Typography variant="small" className="text-center">
                  {solicitud.ocupacion_informacion_adicional}
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

            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col">
                <Typography variant="small" className="font-semibold">
                  Años de experiencia:
                </Typography>
                <Typography variant="small">
                  {solicitud.experiencia_anios}
                </Typography>
              </div>
              <div className="flex flex-col col-span-2">
                <Typography
                  variant="small"
                  className="font-semibold text-center"
                >
                  Habilidades/competencias
                </Typography>
                <Typography variant="small" className="text-center">
                  {solicitud.habilidades_competencias}
                </Typography>
              </div>
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
