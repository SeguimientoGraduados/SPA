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

const ModalLogin = () => {
  const { loginAPI, registerAPI, logoutAPI } = authService;
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const { authState, login, logout } = useContext(AuthContext);

  const handleOpen = () => {
    setOpen((cur) => !cur);
    setError("");
  };

  const handleLogin = async () => {
    try {
      const data = await loginAPI(email, password);
      login(data.user, data.token);
      setOpen(false);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handleRegister = async () => {
    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      const data = await registerAPI(name, email, password);
      login(data.user, data.token);
      setOpen(false);
    } catch (error) {
      console.error("Error al registrarse:", error);
      setError("Error al registrarse");
    }
  };

  const handleLogout = async () => {
    try {
      const data = await logoutAPI();
      logout();
      setOpen(false);
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
        <Card className="mx-auto w-full max-w-[24rem]">
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
              <Alert color="red" className="mt-4">
                {error}
              </Alert>
            )}
            {isLogin && (
              <div className="self-end mr-2.5 -mt-3">
                <Checkbox label="Recuérdame" />
              </div>
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              onClick={isLogin ? handleLogin : handleRegister}
              fullWidth
            >
              {isLogin ? "Iniciar Sesión" : "Registrarse"}
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              {isLogin ? "No tienes cuenta?" : "Ya tienes cuenta?"}
              <Typography
                as="a"
                href="#toggle"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={() => setIsLogin(!isLogin)}
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
