import React, { useState, useContext } from 'react';
import { toTitleCase } from '../../utils/utils';
import login from '../../services/loginService';
import { AuthContext } from '../../context/AuthContext';
import Dropdown from '../Utils/Dropdown';
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

    const { setAuthState } = useContext(AuthContext);
    const { authState } = useContext(AuthContext);

    const handleOpen = () => setOpen((cur) => !cur);

    const handleLogin = async () => {
        try {
            const data = await login(email, password);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setAuthState({ isAuthenticated: true, user: data.user });
            setOpen(false);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({ isAuthenticated: false, user: null });
    };

    return (
        <>
            <div>
                {authState.isAuthenticated ? (
                    <Dropdown
                        user={toTitleCase(authState.user.name)}
                        onLogout={handleLogout}
                    />
                ) : (
                    <Button className="bg-sky-600 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded" onClick={handleOpen}>Iniciar Sesión</Button>
                )}
            </div>

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