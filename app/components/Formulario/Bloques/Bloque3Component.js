import { Input, Typography, IconButton, Checkbox } from "@material-tailwind/react";
import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

const TercerBloque = () => {
    const [formaciones, setFormaciones] = useState([0]);

    const addFormacion = () => {
        setFormaciones([...formaciones, formaciones.length]);
    };

    return (
        <>
            <Typography
                variant="h3"
                color="blue-gray"
                className="text-center font-normal"
            >
                Información Adicional
            </Typography>

            <div className="flex flex-col gap-4">
                <Input label="CV" placeholder="https://drive.google.com/CV_Ejemplo" labelProps={{ className: "font-semibold" }} />

                {formaciones.map((index) => (
                    <div key={index}>
                        <Input label="Educación/Formación" labelProps={{ className: "font-semibold" }} />
                    </div>
                ))}
                <div className="flex flex-col items-center">
                    <IconButton variant="outlined" onClick={addFormacion}>
                        <PlusIcon className="h-5 w-5" />
                    </IconButton>
                </div>


                <Typography variant="h5" color="blue-gray" className="font-normal text-center mt-2">
                    Interés/Predisposición a:
                </Typography>
                <div className="flex flex-row items-center gap-2">
                    <Checkbox color="blue" />
                    <Typography variant="h7" color="blue-gray" className="font-normal text-center   ">
                        1. Comunidad /integrar red (Ecosistema)
                    </Typography>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <Checkbox color="blue" />
                    <Typography variant="h7" color="blue-gray" className="font-normal text-center   ">
                        2. Proponer iniciativas (Oferta)
                    </Typography>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <Checkbox color="blue" />
                    <Typography variant="h7" color="blue-gray" className="font-normal text-center   ">
                        3. Recibir consultas (Demanda)
                    </Typography>
                </div>
            </div>
        </>
    );
}
export default TercerBloque;