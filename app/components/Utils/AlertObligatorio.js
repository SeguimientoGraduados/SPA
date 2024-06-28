import { Alert } from "@material-tailwind/react";
import { AlertIcon } from "./Icons";

const alertasObligatorio = {
    fecha_nacimiento: {
        mensaje: 'Debe ingresar la fecha de nacimiento.',
    },
    carreras: {
        mensaje: 'Debe completar ambos campos del título.',
    },
};

const AlertaObligatorio = ({ input }) => {
    const alerta = alertasObligatorio[input];
    if (!alerta) return null; 

    return (
        <Alert variant="ghost" icon={<AlertIcon />} className="text-center" color="red">
            <span>{alerta.mensaje}</span>
        </Alert>
    );
};

export default AlertaObligatorio;