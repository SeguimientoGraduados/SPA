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
        handleValidation({ currentTarget: { name: "rrss", value: formattedRrss } });
        handleChange({ target: { name: "rrss", value: formattedRrss } });
    };


    const handleChangeFecha = (e) => {
        const { value } = e.target;
        const fechaFormateada = conversorFecha(value);
        handleValidation({ currentTarget: { name: "fecha_nacimiento", value: fechaFormateada } })
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

    function handleRequired(e) {

        if (e.type === "invalid") {
            e.currentTarget.setCustomValidity("Campo obligatorio");
        } else if (e.type === "input") {
            e.currentTarget.setCustomValidity("");
        }
    }

    const [errors, setErrors] = useState({});
    function handleValidation(e) {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        console.log(name, value)

        let errorObj = { ...errors };
        switch (name) {
            case 'nombre':
                if (value.trim().length < 3) {
                    errorObj.nombre = 'El nombre debe tener al menos 3 caracteres';
                } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(value)) {
                    errorObj.nombre = 'El nombre no puede contener números o simbolos';
                } else {
                    errorObj.nombre = '';
                }
                break;
            case 'dni':
                const dniRegex = /^\d+$/;
                errorObj.dni = !dniRegex.test(value) ? 'Ingrese solo números' : '';
                break;
            case 'fecha_nacimiento':
                const year = parseInt(value.split('-')[0], 10);
                errorObj.fecha_nacimiento = year >= 2005 ? 'El año debe ser menor que 2005' : '';
                break;
            //TODO: Borrar los errores cuando se ocultan los inputs
            case 'rrss':
                if (value != "") {
                    value.forEach(({ rrss, url }) => {
                        const urlRegexes = {
                            linkedin: /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/,
                            facebook: /^(https?:\/\/)?(www\.)?facebook\.com\/.*$/,
                            twitter: /^(https?:\/\/)?(www\.)?twitter\.com\/.*$/
                        };
                        if (!urlRegexes[rrss].test(url)) {
                            errorObj[rrss] = `Ingrese una URL válida de ${rrss}`;
                        } else {
                            errorObj[rrss] = '';
                        }

                    });
                } else {
                    errorObj.linkedin = '';
                    errorObj.facebook = '';
                    errorObj.twitter = '';
                }
                break;
            case 'cv':
                if (value != "") {
                    const urlCVRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
                    if (!urlCVRegex.test(value)) {
                        errorObj.cv = 'Ingrese una URL válida';
                    } else {
                        errorObj.cv = '';
                    }
                } else {
                    errorObj.cv = '';
                }
                break;
            default:
                break;
        }

        setErrors(errorObj);
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
                    onInvalid={handleRequired}
                    onInput={handleRequired}
                    onBlur={handleValidation}
                    error={errors.nombre}
                />
                {errors.nombre && <span>{errors.nombre}</span>}

                <Input
                    label="DNI"
                    name="dni"
                    onChange={handleChange}
                    required
                    onInput={handleRequired}
                    onInvalid={handleRequired}
                    onBlur={handleValidation}
                    error={errors.dni}
                />
                {errors.dni && <span>{errors.dni}</span>}

                <DatePicker
                    label={"Fecha de nacimiento"}
                    name="fecha_nacimiento"
                    onChange={handleChangeFecha}
                    onInput={handleRequired}
                    required
                />
                {errors.fecha_nacimiento && <span>{errors.fecha_nacimiento}</span>}

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
                {errors.linkedin && <span>{errors.linkedin}</span>}
                {errors.facebook && <span>{errors.facebook}</span>}
                {errors.twitter && <span>{errors.twitter}</span>}
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
                    onBlur={handleValidation}
                />
                {errors.cv && <span>{errors.cv}</span>}

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