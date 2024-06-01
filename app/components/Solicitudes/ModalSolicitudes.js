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
  const { aprobarSolicitudGraduado, rechazarSolicitudGraduado } = graduadosService;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const handleAprobar = async () => {
    try {
      const resultado = await aprobarSolicitudGraduado(solicitud.id);
      console.log(resultado);
      fetchData();
      setOpen(false);
    } catch (error) {
      console.error('Error al aprobar la solicitud:', error);
    }
  };
  const handleRechazar = async () => {
    try {
      const resultado = await rechazarSolicitudGraduado(solicitud.id);
      console.log(resultado);
      fetchData();
      setOpen(false);
    } catch (error) {
      console.error('Error al aprobar la solicitud:', error);
    }
  };

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
                Nombre:{solicitud.nombre}
              </Typography>
              <Typography variant="small" className="font-light">
                DNI:{solicitud.dni}
              </Typography>
            </div>
            <Typography variant="small" className="font-light">
              Fecha de nacimiento:{solicitud.fecha_nacimiento}
            </Typography>
            {solicitud.carreras.map((carrera, index) => (
              <div key={index} className="grid grid-cols-2">
                <Typography variant="small" className="font-light">
                  Carrera: {carrera.nombre}
                </Typography>
                <Typography variant="small" className="font-light">
                  Año de graduacion: {carrera.anio_graduacion}
                </Typography>
              </div>
            ))}
            <Typography
              variant="h6"
              color="blue-gray"
              className="font-medium text-center"
            >
              Ocupacion
            </Typography>
            <div className="grid grid-cols-3">
              <Typography variant="small" className="font-light">
                Trabajo:{solicitud.ocupacion_trabajo}
              </Typography>
              <Typography variant="small" className="font-light">
                Empresa:{solicitud.ocupacion_empresa}
              </Typography>
              <Typography variant="small" className="font-light">
                Sector:{solicitud.ocupacion_sector}
              </Typography>
            </div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="font-medium text-center"
            >
              Experiencia
            </Typography>
            <Typography variant="small" className="font-light">
              Años de experiencia:{solicitud.experiencia_anios}
            </Typography>
            <Typography
              variant="h6"
              color="blue-gray"
              className="font-medium text-center"
            >
              Habilidades/competencias
            </Typography>
            <Typography variant="small" className="font-light">
              {solicitud.habilidades_competencias}
            </Typography>
            <Typography
              variant="h6"
              color="blue-gray"
              className="font-medium text-center"
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
              onClick={handleRechazar}
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
    </>
  );
};

export default ModalSolicitudes;
