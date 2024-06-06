import React, { useState } from 'react';
import { IconButton, Select, Option } from "@material-tailwind/react";
import { AddIcon } from '../Utils/Icons';

const BotonFiltros = () => {
    const [mostrarSelects, setMostrarSelects] = useState(false);

    const handleButtonClicked = () => {
        setMostrarSelects(!mostrarSelects);
    };

    return (
        <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1000 }}>

            <IconButton className="mt-2 ml-2" id="boton" color="white" onClick={handleButtonClicked}>
                <AddIcon />
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