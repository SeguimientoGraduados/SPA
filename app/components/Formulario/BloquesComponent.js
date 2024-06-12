import { Input, Typography, Textarea } from "@material-tailwind/react";
import RadioHorizontal from "../Utils/RadioHorizontal";
import TooltipInfo from "../Utils/TooltipInfo";
import SelectOption from "../Utils/SelectOption";
import DatePicker from "../Utils/DatePicker";
import TituloForm from "./TituloForm";
import obtenerCoordenadasCiudad from "@/app/services/geocodificationService";
import { conversorFecha } from "../Utils/ConversorFecha";
import ContactoComponent from "./ContactoComponent";
import React, { useState, useEffect } from "react";
import CheckboxList from "../Utils/CheckboxList";
import FormacionComponent from "./FormacionComponent";


const Bloques = ({ handleChange, carreras, opcionesRrss, opcionesOcupacion, opcionesSectorProp, opcionesExperiencia, opcionesFormacion }) => {

    // Bloque 1
    const opcionesCarreras = carreras.map((carrera) => ({
        value: carrera.id.toString(),
        label: carrera.nombre,
    }));
    const [error, setError] = useState(null);
    const handleChangeCiudad = async (e) => {
        const { value } = e.target;
        try {
            const ciudadAPI = await obtenerCoordenadasCiudad(value);
            const nuevaCiudad = {
                nombre: ciudadAPI.name,
                latitud: parseFloat(ciudadAPI.lat),
                longitud: parseFloat(ciudadAPI.lon)
            };
            setError(null);

            handleChange({ target: { name: "ciudad", value: nuevaCiudad } });
        } catch (error) {
            setError(error.message);
            console.log(error.message)
        }
    };

    const [rrssData, setRrssData] = useState({
        linkedin: "",
        facebook: "",
        twitter: "",
    });
    const handleChangeRRSS = (e, rrssName) => {
        const newRrssData = { ...rrssData, [rrssName]: e.target.value };
        setRrssData(newRrssData);

        const formattedRrss = Object.keys(newRrssData)
            .filter((key) => newRrssData[key] !== "")
            .map((key) => ({
                rrss: key,
                url: newRrssData[key],
            }));
        handleChange({ target: { name: "rrss", value: formattedRrss } });
    };


    const handleChangeFecha = (e) => {
        const { value } = e.target;
        const fechaFormateada = conversorFecha(value);

        handleChange({ target: { name: "fecha_nacimiento", value: fechaFormateada } });
    };

    //Bloque 2
    const [opcionesSector, setOpcionesSector] = useState([]);
    const handleChangeSector = (event) => {
        const { value } = event.target;
        const sector = value[0];
        setOpcionesSector(sector);

        handleChange({ target: { name: "ocupacion_sector", value: sector } });
    };

    const handleChangeOcupacion = (event) => {
        const { value } = event.target;
        const ocupacion_trabajo = value;
        handleChange({
            target: { name: "ocupacion_trabajo", value: ocupacion_trabajo },
        });
    };

    const handleChangeAnios = (event) => {
        const { value } = event.target;
        const experiencia_anios = value;
        handleChange({
            target: { name: "experiencia_anios", value: experiencia_anios },
        });
    };

    //Bloque 3
    const [opcionesInteres, setOpcionesInteres] = useState([]);
    const [intereses, setIntereses] = useState({
        comunidad: false,
        oferta: false,
        demanda: false,
    });
    const handleChangeInteres = (event) => {
        const { value } = event.target;
        setOpcionesInteres(value);

        const nuevosIntereses = {
            comunidad: value.includes("1. comunidad /integrar red (ecosistema)"),
            oferta: value.includes("2. proponer iniciativas (oferta)"),
            demanda: value.includes("3. recibir consultas (demanda)"),
        };
        setIntereses(nuevosIntereses);
    };

    //TODO: tuve que volver a ponerlo separado porque sino no actualizaba bien
    useEffect(() => {
        handleChange({
            target: { name: "interes_comunidad", value: intereses.comunidad },
        });
    }, [intereses.comunidad]);

    useEffect(() => {
        handleChange({
            target: { name: "interes_oferta", value: intereses.oferta },
        });
    }, [intereses.oferta]);

    useEffect(() => {
        handleChange({
            target: { name: "interes_demanda", value: intereses.demanda },
        });
    }, [intereses.demanda]);

    function handleValidation(e) {
        if (e.type === "invalid") {
            e.currentTarget.setCustomValidity("Campo obligatorio");
        } else if (e.type === "input") {
            e.currentTarget.setCustomValidity("");
        }
    }

    return (
        <>
            {/* Bloque 1 */}
            <Typography
                variant="h3"
                color="blue-gray"
                className="text-center font-normal"
            >
                Información Personal
            </Typography>

            <div className="flex flex-col gap-4">
                <Input
                    label="Nombre"
                    name="nombre"
                    onChange={handleChange}
                    required
                    onInvalid={handleValidation}
                    onInput={handleValidation}
                />

                <Input
                    label="DNI"
                    name="dni"
                    onChange={handleChange}
                    required
                    onInvalid={handleValidation}
                    onInput={handleValidation}
                />

                <DatePicker
                    label={"Fecha de nacimiento"}
                    name="fecha_nacimiento"
                    onChange={handleChangeFecha}
                    required
                />

                <TituloForm
                    onChange={handleChange}
                    carreras={opcionesCarreras}
                    name="carreras"
                />

                <Input
                    label="Ciudad"
                    name="ciudad"
                    onBlur={handleChangeCiudad}
                    required
                    onInvalid={handleValidation}
                    onInput={handleValidation}
                    error={Boolean(error)}
                />

                <ContactoComponent
                    handleChange={handleChangeRRSS}
                    opcionesRrss={opcionesRrss}
                />
            </div>

            {/* Bloque 2 */}
            <Typography
                variant="h3"
                color="blue-gray"
                className="text-center font-normal"
            >
                Información Laboral
            </Typography>

            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <SelectOption
                        select={"Ocupacion actual"}
                        handleChange={handleChangeOcupacion}
                        options={opcionesOcupacion}
                        name="ocupacion_trabajo"
                    />
                    <Input
                        label="Nombre de la Empresa"
                        name="ocupacion_empresa"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex justify-center">
                    <CheckboxList
                        handleChange={handleChangeSector}
                        direction={"row"}
                        items={opcionesSectorProp}
                        name="ocupacion_sector"
                        opcionesSeleccionadas={opcionesSector}
                        seleccionUnica={true}
                    />
                </div>

                <Textarea
                    variant="outlined"
                    label="Información Adicional"
                    name="ocupacion_informacion_adicional"
                    onChange={handleChange}
                />

                <div className="flex items-center flex-row">
                    <TooltipInfo label={"Privacidad de las respuestas"} />
                    <RadioHorizontal />
                </div>

                <Typography
                    variant="h5"
                    color="blue-gray"
                    className="font-normal text-center"
                >
                    Experiencia Laboral
                </Typography>

                <SelectOption
                    select={"Años de Experiencia:"}
                    handleChange={handleChangeAnios}
                    options={opcionesExperiencia}
                    name="experiencia_anios"
                />
                <Typography
                    className="font-normal text-center"
                    variant="h5"
                    color="blue-gray"
                >
                    Habilidades/Competencias
                </Typography>
                <Textarea
                    variant="outlined"
                    label="Descripcion"
                    name="habilidades_competencias"
                    onChange={handleChange}
                />

                <div className="flex items-center flex-row justify-between">
                    <TooltipInfo label={"Privacidad de las respuestas"} />
                    <RadioHorizontal />
                </div>
            </div>

            {/* Bloque 3 */}
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
                    labelProps={{ className: "font-semibold" }}
                    name="cv"
                    onChange={handleChange}
                />

                <FormacionComponent
                    sendChange={handleChange}
                    opcionesFormacion={opcionesFormacion}
                />

                <div className="mx-auto">
                    <Typography
                        variant="h5"
                        color="blue-gray"
                        className="font-normal mt-2"
                    >
                        Interés/Predisposición a:
                    </Typography>
                    <CheckboxList
                        handleChange={handleChangeInteres}
                        direction={"col"}
                        items={[
                            "1. Comunidad /integrar red (Ecosistema)",
                            "2. Proponer iniciativas (Oferta)",
                            "3. Recibir consultas (Demanda)",
                        ]}
                        opcionesSeleccionadas={opcionesInteres}
                    />
                </div>
            </div>

        </>
    )

}

export default Bloques;