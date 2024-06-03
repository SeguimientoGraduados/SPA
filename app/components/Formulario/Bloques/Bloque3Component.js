import { Input, Typography, IconButton, Checkbox } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import CheckboxList from "../../Utils/CheckboxList";

const TercerBloque = ({ handleChange }) => {

    const [formaciones, setFormaciones] = useState([{ formacion: '' }]);
    const addFormacion = () => {
        setFormaciones([...formaciones, { formacion: '' }]);
    };
    const handleChangeFormacion = (e, index) => {
        const { value } = e.target;
        const updatedFormaciones = [...formaciones];
        updatedFormaciones[index].formacion = value;

        const formacion = updatedFormaciones.map(formacion => formacion.formacion).filter(Boolean);
        handleChange({ target: { name: "formacion", value: formacion } });
    };


    const [opcionesInteres, setOpcionesInteres] = useState([]);
    const [intereses, setIntereses] = useState({
        comunidad: false,
        oferta: false,
        demanda: false
    });

    useEffect(() => {
        handleChange({ target: { name: "interes_comunidad", value: intereses.comunidad } });
    }, [intereses.comunidad]);

    useEffect(() => {
        handleChange({ target: { name: "interes_oferta", value: intereses.oferta } });
    }, [intereses.oferta]);

    useEffect(() => {
        handleChange({ target: { name: "interes_demanda", value: intereses.demanda } });
    }, [intereses.demanda]);

    const handleChangeInteres = (event) => {
        const { value } = event.target;
        setOpcionesInteres(value);

        const nuevosIntereses = {
            comunidad: value.includes("1. comunidad /integrar red (ecosistema)"),
            oferta: value.includes("2. proponer iniciativas (oferta)"),
            demanda: value.includes("3. recibir consultas (demanda)")
        };

        setIntereses(nuevosIntereses);
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
                <Input
                    label="CV"
                    placeholder="https://drive.google.com/CV_Ejemplo"
                    labelProps={{
                        className: "font-semibold"
                    }}
                    name="cv"
                    onChange={handleChange}
                />

                {formaciones.map((formacion, index) => (
                    <div key={index}>
                        <Input
                            label="Educación/Formación"
                            labelProps={{ className: "font-semibold" }}
                            name="formacion"
                            onChange={(e) => handleChangeFormacion(e, index, 'formacion')}
                            value={formacion.formacion}
                        />
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
                    handleChange={handleChangeInteres}
                    direction={"col"}
                    items={["1. Comunidad /integrar red (Ecosistema)", "2. Proponer iniciativas (Oferta)", "3. Recibir consultas (Demanda)"]}
                    opcionesSeleccionadas={opcionesInteres}
                />
            </div>
        </>
    );
}
export default TercerBloque;