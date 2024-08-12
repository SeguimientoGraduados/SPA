import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Input, List, ListItem } from "@material-tailwind/react";
import obtenerCoordenadasCiudad from '@/app/services/geocodificationService';
import { debounce } from 'lodash';

const CiudadAutocomplete = ({ onCiudadSelect, onValidation, initialValue = null }) => {
    const [inputValue, setInputValue] = useState(initialValue ? initialValue.nombre + ", " + initialValue.pais : '');
    const [opciones, setOpciones] = useState([]);
    const [mostrarOpciones, setMostrarOpciones] = useState(false);
    const [error, setError] = useState(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        if (initialValue) {
            onCiudadSelect(initialValue);
        }
    }, []);

    const debouncedBuscarCiudades = useCallback(
        debounce((valor) => {
            if (valor.length > 2) {
                buscarCiudades(valor);
            } else {
                setOpciones([]);
                setMostrarOpciones(false);
            }
        }, 300),
        []
    );

    useEffect(() => {
        debouncedBuscarCiudades(inputValue);
        return () => debouncedBuscarCiudades.cancel();
    }, [inputValue, debouncedBuscarCiudades]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setMostrarOpciones(false);
        }
    };

    const buscarCiudades = async (valor) => {
        try {
            const ciudades = await obtenerCoordenadasCiudad(valor);
            setOpciones(ciudades);
            setMostrarOpciones(true);
            setError(null);
        } catch (error) {
            setError(error.message);
            setOpciones([]);
            setMostrarOpciones(false);
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        onValidation(e);
        if (e.target.value.length > 2) {
            setMostrarOpciones(true);
        } else {
            setMostrarOpciones(false);
        }
    };

    const handleSeleccionCiudad = (ciudad) => {
        const nuevaCiudad = {
            nombre: ciudad.name,
            latitud: parseFloat(ciudad.lat),
            longitud: parseFloat(ciudad.lon),
            pais: ciudad.address.country,
        };
        setInputValue(ciudad.name + ", " + ciudad.address.country);
        setMostrarOpciones(false);
        onCiudadSelect(nuevaCiudad);
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <Input
                label="Ciudad de residencia"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => inputValue.length > 2 && setMostrarOpciones(true)}
                required
                error={Boolean(error)}
                className="bg-tremor-background"
            />
            {mostrarOpciones && opciones.length > 0 && (
                <List className="absolute z-10 w-full bg-white shadow-md">
                    {opciones.map((opcion, index) => (
                        <ListItem key={index} onClick={() => handleSeleccionCiudad(opcion)}>
                            {opcion.display_name}
                        </ListItem>
                    ))}
                </List>
            )}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default CiudadAutocomplete;