import React, { useState, useContext } from "react";
import { toTitleCase } from "../../utils/utils";
import authService from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import Dropdown from "../Utils/Dropdown";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Dialog,
  CardBody,
  CardFooter,
  Alert,
} from "@material-tailwind/react";
import { AlertIcon } from "../Utils/Icons";
import ReCAPTCHA from 'react-google-recaptcha';

const SITE_KEY = process.env.NEXT_PUBLIC_SITE_KEY;


const ModalLogin = () => {
  const { loginAPI, registerAPI, logoutAPI } = authService;
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);

  const { authState, login, logout, user } = useContext(AuthContext);


  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleOpen = () => {
    setOpen((cur) => !cur);
    setError("");
  };

  const handleLogin = async () => {
    if (!captchaValue) {
      setError("Por favor complete el CAPTCHA");
      return;
    }
    try {
      const data = await loginAPI(email, password, captchaValue);
      login(data.user, data.token, data.graduado);
      setOpen(false);
      setCaptchaValue(null);
    } catch (error) {
      handleError(error);
    }
  };
  const handleError = (error) => {
    if (error.response) {
      const errorMessages = {
        401: "Contraseña incorrecta",
        404: "Usuario no encontrado",
        403: "Error de validación",
      };

      const status = error.response.status;
      setError(errorMessages[status] || "Error inesperado al iniciar sesión");
    } else if (error.request) {
      setError("No se recibió respuesta del servidor");
    } else {
      setError("Error al configurar la petición");
    }
  };

  const handleRegister = async () => {
    if (!captchaValue) {
      setError("Por favor complete el CAPTCHA");
      return;
    }
    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      const data = await registerAPI(name, email, password, captchaValue);
      login(data.user, data.token, data.graduado);
      setOpen(false);
      setCaptchaValue(null);
    } catch (error) {
      console.error("Error al registrarse:", error);
      setError("Error al registrarse");
    }
  };

  const handleDatos = async () => {
    setOpen(false);
    window.location.href = "/perfil";
  };

  const handleLogout = async () => {
    try {
      const data = await logoutAPI();
      logout();
      setOpen(false);
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <>
      <div>
        {authState.isAuthenticated ? (
          <Dropdown
            user={toTitleCase(authState.user.name)}
            onDatos={handleDatos}
            mostrarDatos={authState.user.rol === "user" && authState.graduado}
            onLogout={handleLogout}
          />
        ) : (
          <Button
            onClick={handleOpen}
            className="text-md"
            variant="text"
            color="white"
          >
            INICIAR SESIÓN
          </Button>
        )}
      </div>

      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="relative mx-auto w-full max-w-[24rem]">
          <button
            data-ripple-dark="true"
            data-dialog-close="true"
            className="absolute top-2 right-2 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-blue-gray-500 transition-all hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={handleOpen}
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </span>
          </button>

          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              {isLogin ? "Iniciar Sesión" : "Registrarse"}
            </Typography>
            {!isLogin && (
              <Input
                label="Nombre"
                size="lg"
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <Input
              label="Email"
              size="lg"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Contraseña"
              size="lg"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isLogin && (
              <Input
                label="Repetir Contraseña"
                size="lg"
                type="password"
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            )}
            {error && (
              <Alert icon={<AlertIcon />} color="red" className="mt-4">
                {error}
              </Alert>
            )}
            <div className="self-center">
              <ReCAPTCHA
                sitekey={SITE_KEY}
                onChange={handleCaptchaChange}
              />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              color="blue"
              onClick={isLogin ? handleLogin : handleRegister}
              fullWidth
            >
              {isLogin ? "Iniciar Sesión" : "Registrarse"}
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              {isLogin ? "No tienes cuenta?" : "Ya tienes cuenta?"}
              <Typography
                as="a"
                href="#"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
              >
                {isLogin ? "Registrarse" : "Iniciar Sesión"}
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default ModalLogin;
