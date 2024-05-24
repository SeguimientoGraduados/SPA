import React, { useState } from 'react';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Dialog,
    CardBody,
    CardFooter
} from "@material-tailwind/react";

const ModalLogin = () => {
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleOpen = () => setOpen((cur) => !cur);

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <>
            <Button className="bg-sky-600 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded" onClick={handleOpen}>Iniciar Sesión</Button>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            Iniciar Sesión
                        </Typography>
                        <Typography
                            className="mb-3 font-normal"
                            variant="paragraph"
                            color="gray"
                        >
                            Ingrese su email y contraseña para iniciar sesión
                        </Typography>
                        <Typography className="-mb-2" variant="h6">
                            Email
                        </Typography>
                        <Input label="Email" size="lg" onChange={(e) => setEmail(e.target.value)} />
                        <Typography className="-mb-2" variant="h6">
                            Contraseña
                        </Typography>
                        <Input label="Contraseña" size="lg" type="password" onChange={(e) => setPassword(e.target.value)} />
                        <div className="-ml-2.5 -mt-3">
                            <Checkbox label="Recuérdame" />
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" onClick={handleLogin} fullWidth>
                            Iniciar Sesión
                        </Button>
                        <Typography variant="small" className="mt-4 flex justify-center">
                            No tenes cuenta?
                            <Typography
                                as="a"
                                href="#signup"
                                variant="small"
                                color="blue-gray"
                                className="ml-1 font-bold"
                                onClick={handleOpen}
                            >
                                Registrarse
                            </Typography>
                        </Typography>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
};

export default ModalLogin;