import React, { useState } from 'react';
import { Typography, Select, Option, Input, Button } from '@material-tailwind/react';

const TituloForm = () => {
    const [titles, setTitles] = useState([{ title: '', year: '' }]);

    const addTitle = () => {
        setTitles([...titles, { title: '', year: '' }]);
    };

    const handleTitleChange = (index, value) => {
        const newTitles = [...titles];
        newTitles[index].title = value;
        setTitles(newTitles);
    };

    const handleYearChange = (index, value) => {
        const newTitles = [...titles];
        newTitles[index].year = value;
        setTitles(newTitles);
    };

    return (
        <div>
            {titles.map((item, index) => (
                <div key={index}>
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        Título
                    </Typography>
                    <Select
                        label="Selecciona el Título"
                        value={item.title}
                        onChange={(e) => handleTitleChange(index, e.target.value)}
                    >
                        <Option value="Ingeniería en Sistemas de Información">Ingeniería en Sistemas de Información</Option>
                        <Option value="Licenciatura en Ciencias de la Computación">Licenciatura en Ciencias de la Computación</Option>
                        <Option value="Abogacía">Abogacía</Option>
                    </Select>
                    <Typography variant="h4" color="blue-gray" className="mb-2 mt-6">
                        Año de Graduación
                    </Typography>
                    <Input
                        size="lg"
                        value={item.year}
                        onChange={(e) => handleYearChange(index, e.target.value)}
                        className="mb-3 !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                    />
                </div>
            ))}
            <div className="flex justify-end mt-4 -mb-6">
                <Button className="w-auto" onClick={addTitle}>Añadir más</Button>
            </div>
        </div>
    );
};

export default TituloForm;
