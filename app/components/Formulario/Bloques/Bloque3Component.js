import { Input, Typography, IconButton, Checkbox } from "@material-tailwind/react";
import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import CheckboxList from "../../Utils/CheckboxList";

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
                <CheckboxList 
                direction={"col"} 
                items={["1. Comunidad /integrar red (Ecosistema)", "2. Proponer iniciativas (Oferta)", "3. Recibir consultas (Demanda)"]} />
            </div>
        </>
    );
}
export default TercerBloque;