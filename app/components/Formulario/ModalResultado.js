import React from "react";
import { useRouter } from "next/navigation";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    Typography
} from "@material-tailwind/react";

const ModalResultado = ({ open, handleOpen, registroExitoso }) => {
    const router = useRouter();
    const handleAceptar = () => {
        handleOpen(false);
        router.push('/');
    };
    return (
        <>
            <Dialog size="xs" open={open} handler={handleOpen}>
                <DialogBody divider className="grid place-items-center gap-4">
                    {registroExitoso ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1024 1024"
                            className="h-16 w-16 text-green-500 inline-block align-middle"
                        >
                            <path
                                fill="currentColor"
                                d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
                            />
                        </svg>
                    ) : (
                        <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16 text-green-500 inline-block align-middle"
                        >
                            <g>
                                <g id="Error_1_">
                                    <g id="Error">
                                        <circle cx="16" cy="16" id="BG" r="16" fill={'#D72828'} />
                                        <path d="M14.5,25h3v-3h-3V25z M14.5,6v13h3V6H14.5z" id="Exclamatory_x5F_Sign" fill="#E6E6E6" />
                                    </g>
                                </g>
                            </g>
                        </svg>
                    )}
                    <Typography color={registroExitoso ? 'green' : 'red'} variant="h4">
                        {registroExitoso ? '¡Éxito!' : '¡Hubo un error!'}
                    </Typography>
                    <Typography className="text-center font-normal">
                        {registroExitoso ? 'El formulario se envió exitosamente.' : 'Hubo un error al procesar el formulario.'}
                    </Typography>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button color="blue" variant="gradient" onClick={handleAceptar}>
                        Aceptar
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default ModalResultado;
