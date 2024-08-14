import { useState } from "react";
import SelectOption from "../Utils/SelectOption";
import CheckboxList from "../Utils/CheckboxList";
import { Input, IconButton, Textarea } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const Ocupacion = ({ onChange, enumerados, valuesIniciales = [] }) => {
    const initialOcupaciones = valuesIniciales.length > 0 ? valuesIniciales : [{ ocupacion_trabajo: "", ocupacion_empresa: "", ocupacion_sector: [] }];

    const [ocupaciones, setOcupaciones] = useState(initialOcupaciones);

    const updateOcupaciones = (newOcupaciones) => {
        setOcupaciones(newOcupaciones);
        onChange(newOcupaciones);
    };

    const addOcupacion = () => {
        updateOcupaciones([...ocupaciones, { ocupacion_trabajo: "", ocupacion_empresa: "", ocupacion_sector: "" }]);
    };

    const removeOcupacion = (index) => {
        const newOcupaciones = ocupaciones.filter((_, i) => i !== index);
        updateOcupaciones(newOcupaciones);
    };

    const handleInternalChange = (e, index, field) => {
        const newOcupaciones = ocupaciones.map((item, i) =>
            i === index ? { ...item, [field]: e.target.value } : item
        );
        updateOcupaciones(newOcupaciones);
    };

    const handleChangeSector = (e, index) => {
        const { value } = e.target;
        const sector = value[0] || "";
        const newOcupaciones = ocupaciones.map((item, i) =>
            i === index ? { ...item, ocupacion_sector: sector } : item
        );
        updateOcupaciones(newOcupaciones);
    };
    return (
        <div className="flex flex-col gap-1 items-center w-full">
            {ocupaciones.map((item, index) => (
                <div key={index} className="w-full mb-4"> 
                    <div className="flex justify-between items-center">
                        <div className="grid grid-cols-2 gap-4 w-full">
                            <SelectOption
                                select={"Ocupación actual"}
                                handleChange={(e) =>
                                    handleInternalChange(e, index, "ocupacion_trabajo")
                                }
                                options={enumerados.ocupacion_trabajo}
                                name="ocupacion_trabajo"
                                initialValue={item.ocupacion_trabajo}
                            />
                            <Input
                                label="Nombre de la organización"
                                name="ocupacion_empresa"
                                onChange={(e) =>
                                    handleInternalChange(e, index, "ocupacion_empresa")
                                }
                                value={item.ocupacion_empresa}
                                className="bg-tremor-background"
                            />
                        </div>
                        {index > 0 && (
                            <IconButton
                                className="rounded-full ml-4"
                                onClick={() => removeOcupacion(index)}
                                variant="gradient"
                                color="red"
                                size="sm"
                            >
                                <FontAwesomeIcon icon={faMinus} />
                            </IconButton>
                        )}
                    </div>
                    <div className="flex justify-center items-center mt-2">
                        <span className="mr-2">Sector:</span>
                        <CheckboxList
                            handleChange={(e) => handleChangeSector(e, index)}
                            direction={"row"}
                            items={enumerados.ocupacion_sector}
                            name="ocupacion_sector"
                            opcionesSeleccionadas={item.ocupacion_sector}
                            seleccionUnica={true}
                        />
                    </div>
                    <div className="mt-2">
                        <Textarea
                            variant="outlined"
                            label="Información adicional"
                            name="ocupacion_informacion_adicional"
                            onChange={(e) => handleInternalChange(e, index, "ocupacion_informacion_adicional")}
                            value={item.ocupacion_informacion_adicional || ""}
                            className="bg-tremor-background"
                        />
                    </div>
                </div>
            ))}
            <IconButton
                className="rounded-full"
                onClick={addOcupacion}
                variant="gradient"
                color="blue"
            >
                <FontAwesomeIcon icon={faPlus} />
            </IconButton>
        </div>

    );
};

export default Ocupacion;
