import React, { useState } from 'react';
import { IconButton, Select, Option } from "@material-tailwind/react";

const BotonFiltros = () => {
    const [mostrarSelects, setMostrarSelects] = useState(false);

    const handleButtonClicked = () => {
        console.log("hello world");
        setMostrarSelects(!mostrarSelects);
    };

    return (
        <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1000 }}>
            <IconButton className="mt-2 ml-2" id="boton" color="white" onClick={handleButtonClicked}>
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
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