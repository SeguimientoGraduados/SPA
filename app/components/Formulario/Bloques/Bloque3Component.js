import { Input, Typography, IconButton, Checkbox } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import CheckboxList from "../../Utils/CheckboxList";

const TercerBloque = ({ handleChange }) => {

    const [formaciones, setFormaciones] = useState([{ formacion: '' }]);
    const addFormacion = () => {
        setFormaciones([...formaciones, { formacion: '' }]);
    };
    const handleChangeFormacion = (e, index, fieldName) => {
        const updatedFormaciones = [...formaciones];
        updatedFormaciones[index][fieldName] = e.target.value;
        const formacion = obtenerFormaciones();
        handleChange({ target: { name: "formacion", value: formacion } });
    };
    const obtenerFormaciones = () => {
        return formaciones.map(formacion => formacion.formacion).filter(Boolean);
    };

    const [opcionesInteres, setOpcionesInteres] = useState([]);
    const [interes_comunidad, setInteresComunidad] = useState(false);
    const [interes_oferta, setInteresOferta] = useState(false);
    const [interes_demanda, setInteresDemanda] = useState(false);

    useEffect(() => {
        handleChange({
            target: { name: "interes_comunidad", value: interes_comunidad }
        });
    }, [interes_comunidad]);

    useEffect(() => {
        handleChange({
            target: { name: "interes_oferta", value: interes_oferta }
        });
    }, [interes_oferta]);

    useEffect(() => {
        handleChange({
            target: { name: "interes_demanda", value: interes_demanda }
        });
    }, [interes_demanda]);

    const handleChangeInteres = (event) => {

        const { value } = event.target;
        setOpcionesInteres(value);

        let comunidad = false;
        let oferta = false;
        let demanda = false;

        value.forEach(opcion => {
            if (opcion.includes("1. comunidad /integrar red (ecosistema)")) {
                comunidad = true;
            }
            if (opcion.includes("2. proponer iniciativas (oferta)")) {
                oferta = true;
            }
            if (opcion.includes("3. recibir consultas (demanda)")) {
                demanda = true;
            }
        });

        setInteresComunidad(comunidad);
        setInteresOferta(oferta);
        setInteresDemanda(demanda);
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