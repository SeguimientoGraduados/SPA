import {
    Input,
    Typography,
} from "@material-tailwind/react";
import React from "react";

const SegundoBloque = () => {
    return (
        <>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
                Contacto
            </Typography>
            <Input
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                    className: "before:content-none after:content-none",
                }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
                RRSS
            </Typography>
            <Input
                size="lg"
                placeholder="-"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                    className: "before:content-none after:content-none",
                }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
                Página Web
            </Typography>
            <Input
                size="lg"
                placeholder="-"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                    className: "before:content-none after:content-none",
                }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
                CV
            </Typography>
            <Input
                size="lg"
                placeholder="-"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                    className: "before:content-none after:content-none",
                }}
            />
        </>
    );
}
export default SegundoBloque;