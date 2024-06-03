import React, { useState, useContext } from "react";
import { toTitleCase } from "../../utils/utils";
import login from "../../services/loginService";
import { AuthContext } from "../../context/AuthContext";
import Dropdown from "../Utils/Dropdown";
import Cookies from "js-cookie";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Dialog,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

const ModalLogin = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { authState, setAuthState } = useContext(AuthContext);

  const handleOpen = () => setOpen((cur) => !cur);

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      Cookies.set('token', data.token, {expires: 1, secure: true, sameSite: 'Strict', httpOnly: true})
      Cookies.set('user', JSON.stringify(data.user), {expires: 1, secure: true, sameSite: 'Strict', httpOnly: true})
      setAuthState({ isAuthenticated: true, user: data.user });
      setOpen(false);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };
  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
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
          <Button
            onClick={handleOpen}
            className="text-md"
            variant="text"
            color="white">
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
              Iniciar Sesión
            </Typography>
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
            <div className="self-end mr-2.5 -mt-3">
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
