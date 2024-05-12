import {
    Input,
    Typography,
} from "@material-tailwind/react";
import React from "react";

const TercerBloque = () => {
    return (
        <>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
                Educación/Formación
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
                Campo 2
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
                Campo 3
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
                Campo 4
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
export default TercerBloque;