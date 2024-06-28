import { Radio, Typography } from "@material-tailwind/react";
import React, { useState } from 'react';

function Icon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-full w-full scale-105"
        >
            <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const RadioHorizontal = () => {

    const [selectedOption, setSelectedOption] = useState('protegido');

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };
    return (
        <div>
            <Radio
                color="blue"
                value="publico"
                checked={selectedOption === 'publico'}
                onChange={handleRadioChange}
                ripple={false}
                icon={<Icon />}
                className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0 bg-tremor-background"
                label={
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="text-blue-gray-400"
                    >
                        Público
                    </Typography>
                }
            />
            <Radio
                color="blue"
                value="protegido"
                checked={selectedOption === 'protegido'}
                onChange={handleRadioChange}
                ripple={false}
                icon={<Icon />}
                className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0 bg-tremor-background"
                label={
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="text-blue-gray-400"
                    >
                        Protegido
                    </Typography>
                }
            />
            <Radio
                color="blue"
                value="privado"
                checked={selectedOption === 'privado'}
                onChange={handleRadioChange}
                ripple={false}
                icon={<Icon />}
                className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0 bg-tremor-background"
                label={
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="text-blue-gray-400"
                    >
                        Privado
                    </Typography>
                }
            />
        </div>
    );
}
export default RadioHorizontal;