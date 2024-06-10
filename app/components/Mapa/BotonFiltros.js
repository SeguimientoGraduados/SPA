import React, { useState } from 'react';
import { IconButton, Select, Option } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const BotonFiltros = () => {
    const [mostrarSelects, setMostrarSelects] = useState(false);

    const handleButtonClicked = () => {
        setMostrarSelects(!mostrarSelects);
    };

    return (
        <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1000 }}>

            <IconButton className="mt-2 ml-2" id="boton" color="white" onClick={handleButtonClicked}>
                <FontAwesomeIcon icon={faPlus} />
            </IconButton>


            {mostrarSelects && (
                <div className="w-48 mt-2 ml-2">
                    <Select className="bg-white" label="Seleccione departamento">
                        <Option>Derecho</Option>
                        <Option>Ciencias e Ingeniería de la Computación</Option>
                        <Option>Ciencias de la Salud</Option>
                    </Select >

                </div>
            )}
        </div>
    );
};

export default BotonFiltros;