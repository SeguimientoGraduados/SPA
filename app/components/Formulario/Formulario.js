import {
  Card,
  Button,
  Typography,
  Input,
  Textarea,
  Tooltip,
} from "@material-tailwind/react";
import React, { useState, useEffect, useContext } from "react";
import graduadosService from "../../services/graduadosService";
import { DefaultSkeleton } from "../Utils/Skeleton";
import AlertaObligatorio from "../Utils/AlertObligatorio";
import Cookies from "js-cookie";
import ModalResultado from "./ModalResultado";
import ModalConfirmacion from "./ModalConfirmacion";
import RadioHorizontal from "../Utils/RadioHorizontal";
import SelectOption from "../Utils/SelectOption";
import DatePicker from "../Utils/DatePicker";
import Titulo from "./Titulo";
import obtenerCoordenadasCiudad from "@/app/services/geocodificationService";
import { conversorFecha } from "../Utils/ConversorFecha";
import Contacto from "./Contacto";
import Formacion from "./Formacion";
import { Validacion } from "./Validacion";
import Intereses from "./Intereses";
import { AuthContext } from "@/app/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import CiudadAutocomplete from "./CiudadAutocomplete";
import Ocupacion from "./Ocupacion";

const FormularioGraduado = ({
  carreras,
  enumerados,
  datosGraduado = {},
  onSubmit,
  modoEdicion = false,
}) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    fecha_nacimiento: "",
    ciudad: [],
    contacto: "",
    carreras: [],
    ocupaciones: [],
    experiencia_anios: "",
    habilidades_competencias: "",
    formacion: [],
    rrss: [],
    cv: "",
    interes_comunidad: false,
    interes_oferta: false,
    interes_demanda: false,
    visibilidad_contacto: true,
    visibilidad_laboral: true,
    visibilidad_formacion: true,
  });

  const [alertaVisible, setAlertaVisible] = useState(false);
  const [campoObligatorio, setCampoObligatorio] = useState("");
  const [modalResultadoVisible, setModalResultadoVisible] = useState(false);
  const [modalConfirmacionVisible, setModalConfirmacionVisible] =
    useState(false);
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);
  const [rrssData, setRrssData] = useState({
    linkedin: "",
    facebook: "",
    twitter: "",
  });
  const [opcionesSector, setOpcionesSector] = useState([]);
  const [intereses, setIntereses] = useState({
    comunidad: false,
    oferta: false,
    demanda: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...datosGraduado,
    }));

    if (formData.contacto == "") {
      const userCookie = Cookies.get("user");
      if (userCookie) {
        const decodedUser = decodeURIComponent(userCookie);
        const user = JSON.parse(decodedUser);
        setFormData((prevFormData) => ({
          ...prevFormData,
          contacto: prevFormData.contacto || user.email,
        }));
      }
    }

    setIsLoading(false);
  }, [datosGraduado]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "intereses") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        interes_comunidad: value.comunidad,
        interes_oferta: value.oferta,
        interes_demanda: value.demanda,
      }));
    } else if (name === "carreras") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        carreras: value.map((carrera) => ({
          id: carrera.carrera_id,
          anio_graduacion: carrera.anio_graduacion,
        })),
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fecha_nacimiento) {
      setAlertaVisible(true);
      setCampoObligatorio("fecha_nacimiento");
      return;
    }

    for (const carrera of formData.carreras) {
      if (carrera.carrera_id === "") {
        setAlertaVisible(true);
        setCampoObligatorio("carreras");
        return;
      }
    }

    const carrerasFormateadas = formData.carreras.map((carrera) => ({
      carrera_id: carrera.id,
      anio_graduacion: carrera.anio_graduacion,
    }));

    const dataToSubmit = {
      ...formData,
      carreras: carrerasFormateadas,
    };

    try {
      await onSubmit(dataToSubmit);
      setAlertaVisible(false);
      setRegistroExitoso(true);
      setModalResultadoVisible(true);
    } catch (error) {
      setRegistroExitoso(false);
      setModalResultadoVisible(true);
      console.error("Error al enviar el formulario:", error);
    }
  };

  const handleValidation = (e) => {
    const { name, value } = e.currentTarget;
    const updatedErrors = Validacion(name, value, errors);
    setErrors(updatedErrors);
  };

  const handleChangeCiudad = async (e) => {
    const { value } = e.target;
    try {
      const ciudadAPI = await obtenerCoordenadasCiudad(value);
      const nuevaCiudad = {
        nombre: ciudadAPI.name,
        latitud: parseFloat(ciudadAPI.lat),
        longitud: parseFloat(ciudadAPI.lon),
        pais: ciudadAPI.address.country,
      };
      setError(null);
      handleChange({ target: { name: "ciudad", value: nuevaCiudad } });
    } catch (error) {
      setError(error.message);
    }
  };
  const handleCiudadSelect = (nuevaCiudad) => {
    handleChange({ target: { name: "ciudad", value: nuevaCiudad } });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange({ target: { name, value } });
  };

  const handleChangeRRSS = (e, rrssName) => {
    const newRrssData = { ...rrssData, [rrssName]: e.target.value };
    setRrssData(newRrssData);

    const formattedRrss = Object.keys(newRrssData)
      .filter((key) => newRrssData[key] !== "")
      .map((key) => ({
        rrss: key,
        url: newRrssData[key],
      }));
    handleValidation({ currentTarget: { name: "rrss", value: formattedRrss } });
    handleChange({ target: { name: "rrss", value: formattedRrss } });
  };

  const handleChangeFecha = (e) => {
    const { value } = e.target;
    const fechaFormateada = conversorFecha(value);
    handleValidation({
      currentTarget: { name: "fecha_nacimiento", value: fechaFormateada },
    });
    handleChange({
      target: { name: "fecha_nacimiento", value: fechaFormateada },
    });
  };


  const handleChangeAnios = (e) => {
    const { value } = e.target;
    handleChange({ target: { name: "experiencia_anios", value } });
  };

  const handleChangeInteres = (e) => {
    const { value } = e.target;
    setIntereses(value);
    handleChange({
      target: { name: "intereses", value: value },
    });
  };

  const handleRequired = (e) => {
    if (e.type === "invalid") {
      e.currentTarget.setCustomValidity("Campo obligatorio");
    } else if (e.type === "input") {
      e.currentTarget.setCustomValidity("");
    }
  };

  const handleOpenConfirmacion = () => {
    setModalConfirmacionVisible((cur) => !cur);
  };
  const handleVisibilidadChange = (campo, valor) => {
    handleChange({ target: { name: campo, value: valor } });
  };

  const opcionesCarreras = carreras.map((carrera) => ({
    value: carrera.id.toString(),
    label: carrera.nombre,
  }));

  const carrerasIniciales = datosGraduado?.carreras
    ? datosGraduado.carreras.map((carrera) => ({
      title: carrera.id.toString(),
      year: carrera.anio_graduacion,
    }))
    : {};

  const ocupacionesIniciales = datosGraduado?.ocupaciones
    ? datosGraduado.ocupaciones.map((ocupacion) => ({
      ocupacion_trabajo: ocupacion.ocupacion_trabajo,
      ocupacion_empresa: ocupacion.ocupacion_empresa,
      ocupacion_sector: ocupacion.ocupacion_sector,
      ocupacion_informacion_adicional: ocupacion.ocupacion_informacion_adicional,
    }))
    : {};
  console.log(datosGraduado)

  const fechaInicial = datosGraduado?.fecha_nacimiento
    ? datosGraduado.fecha_nacimiento
    : "";

  if (isLoading) {
    return <DefaultSkeleton />;
  }

  return (
    <>
      <div className="max-w-screen-xl sm:w-full">
        <Typography variant="parragraph" color="gray">
          La información que proporciones servirá para comprender mejor el
          perfil y las trayectorias laborales de los graduados de la Universidad
          Nacional del Sur, con el objetivo de ayudarlos en su vida profesional.
        </Typography>
        <hr className="my-2 border-t-2 border-blue-800" />
        <div className="flex flex-col justify-center">
          <form className="mt-4" onSubmit={handleSubmit}>
            <Card color="transparent" shadow={false} className="items-center">
              <div className="flex flex-col gap-2">
                <Typography
                  variant="h3"
                  color="blue-gray"
                  className="text-center font-normal"
                >
                  Información Personal
                </Typography>

                <div className="flex flex-col gap-2">
                  {modoEdicion ? (
                    <>
                      <div className="grid grid-cols-3 items-center px-2">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal w-40"
                        >
                          Nombre:
                        </Typography>
                        <Input
                          label="Nombre"
                          name="nombre"
                          onChange={handleChange}
                          value={formData.nombre}
                          disabled={modoEdicion}
                          onInvalid={handleRequired}
                          onInput={handleRequired}
                          onBlur={handleValidation}
                          error={errors.nombre}
                          className="bg-tremor-background col-span-2"
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center px-2">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal w-40"
                        >
                          Apellido:
                        </Typography>
                        <Input
                          label="Apellido"
                          name="nombre"
                          onChange={handleChange}
                          value={formData.apellido}
                          disabled={modoEdicion}
                          onInvalid={handleRequired}
                          onInput={handleRequired}
                          onBlur={handleValidation}
                          error={errors.nombre}
                          className="bg-tremor-background col-span-2"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-row gap-4">
                      <Input
                        label="Nombre"
                        name="nombre"
                        onChange={handleChange}
                        value={formData.nombre}
                        disabled={modoEdicion}
                        required
                        onInvalid={handleRequired}
                        onInput={handleRequired}
                        onBlur={handleValidation}
                        error={errors.nombre}
                        className="bg-tremor-background"
                      />
                      <Input
                        label="Apellido"
                        name="apellido"
                        onChange={handleChange}
                        value={formData.apellido}
                        disabled={modoEdicion}
                        required
                        onInvalid={handleRequired}
                        onInput={handleRequired}
                        onBlur={handleValidation}
                        error={errors.nombre}
                        className="bg-tremor-background"
                      />
                    </div>
                  )}

                  {errors.nombre && (
                    <span className="text-xs text-red-600 -mt-2">
                      {errors.nombre}
                    </span>
                  )}

                  {modoEdicion ? (
                    <div className="grid grid-cols-3 items-center px-2">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        DNI:
                      </Typography>
                      <Input
                        label="DNI"
                        name="dni"
                        onChange={handleChange}
                        value={formData.dni}
                        disabled={modoEdicion}
                        onInput={handleRequired}
                        onInvalid={handleRequired}
                        onBlur={handleValidation}
                        error={errors.dni}
                        className="bg-tremor-background col-span-2"
                      />
                    </div>
                  ) : (
                    <Input
                      label="DNI"
                      name="dni"
                      onChange={handleChange}
                      required
                      value={formData.dni}
                      disabled={modoEdicion}
                      onInput={handleRequired}
                      onInvalid={handleRequired}
                      onBlur={handleValidation}
                      error={errors.dni}
                      className="bg-tremor-background col-span-2"
                    />
                  )}

                  {errors.dni && (
                    <span className="text-xs text-red-600 -mt-2">
                      {errors.dni}
                    </span>
                  )}

                  <DatePicker
                    label={"Fecha de nacimiento"}
                    name="fecha_nacimiento"
                    onChange={handleChangeFecha}
                    value={fechaInicial}
                    onInput={handleRequired}
                    error={errors.fecha_nacimiento}
                    required
                  />
                  {errors.fecha_nacimiento && (
                    <span className="text-xs text-red-600 -mt-2">
                      {errors.fecha_nacimiento}
                    </span>
                  )}

                  <Titulo
                    onChange={handleChange}
                    carreras={opcionesCarreras}
                    valuesIniciales={carrerasIniciales}
                    name="carreras"
                  />

                  {modoEdicion ? (
                    <CiudadAutocomplete
                      onCiudadSelect={handleCiudadSelect}
                      onValidation={handleValidation}
                      initialValue={formData.ciudad}
                    />
                  ) : (
                    <CiudadAutocomplete
                      onCiudadSelect={handleCiudadSelect}
                      onValidation={handleValidation}
                    />
                  )}
                  {errors && (
                    <span className="text-xs text-red-600 -mt-2">{error}</span>
                  )}

                  <Contacto
                    handleChange={handleChangeRRSS}
                    opcionesRrss={enumerados.rrss}
                    error={errors.rrss}
                    valoresIniciales={formData.rrss}
                    visibilidadContacto={formData.visibilidad_contacto}
                    handleVisibilidadChange={(valor) => handleVisibilidadChange('visibilidad_contacto', valor)}
                  />
                </div>
                <div>
                  <Typography
                    variant="h3"
                    color="blue-gray"
                    className="text-center font-normal"
                  >
                    Información Laboral
                  </Typography>
                  <div className="flex flex-row justify-center">
                    <RadioHorizontal
                      label="Privacidad de respuestas:"
                      value={formData.visibilidad_laboral ? 'publico' : 'protegido'}
                      handleChange={(valor) => handleVisibilidadChange('visibilidad_laboral', valor)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Ocupacion
                    onChange={(e) =>
                      handleChange({ target: { name: "ocupaciones", value: e } })
                    }
                    enumerados={enumerados}
                    valuesIniciales={ocupacionesIniciales}
                  />

                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="font-normal text-center"
                  >
                    Experiencia Laboral
                  </Typography>

                  <SelectOption
                    select={"Años de experiencia:"}
                    handleChange={handleChangeAnios}
                    options={enumerados.exp_anios}
                    initialValue={formData.experiencia_anios}
                    name="experiencia_anios"
                  />
                  <Typography
                    className="font-normal text-center"
                    variant="h5"
                    color="blue-gray"
                  >
                    Habilidades/Competencias
                  </Typography>
                  <Textarea
                    variant="outlined"
                    label="Descripción"
                    name="habilidades_competencias"
                    placeholder="Describa sus habilidades y competencias, incluyendo herramientas, idiomas, habilidades blandas, y cualquier otra información relevante que considere importante para su perfil profesional."
                    onChange={handleChange}
                    value={formData.habilidades_competencias || ""}
                    className="bg-tremor-background placeholder:pt-5"
                  />
                </div>

                <Typography
                  variant="h3"
                  color="blue-gray"
                  className="text-center font-normal mt-4"
                >
                  Información Adicional
                </Typography>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-row gap-3 items-center">
                    <Tooltip
                      className="w-48"
                      content={
                        <Typography variant="small" className="text-sm">
                          Aquí puedes dejar el enlace a tu CV ya sea como pdf en
                          Google Drive o cualquier otra página de tu
                          preferencia.
                        </Typography>
                      }
                    >
                      <FontAwesomeIcon
                        icon={faCircleQuestion}
                        size="lg"
                        color="grey"
                      />
                    </Tooltip>
                    <Input
                      label="CV"
                      placeholder="https://drive.google.com/CV_Ejemplo"
                      name="cv"
                      onChange={handleChange}
                      value={formData.cv}
                      onBlur={handleValidation}
                      error={errors.cv}
                      className="bg-tremor-background"
                    />
                  </div>

                  {errors.cv && (
                    <span className="text-xs text-red-600 -mt-2">
                      {errors.cv}
                    </span>
                  )}

                  <Formacion
                    sendChange={handleChange}
                    opcionesFormacion={enumerados.nivel_formacion}
                    formacionInicial={formData.formacion}
                    visibilidadFormacion={formData.formacion}
                    handleVisibilidadChange={(valor) => handleVisibilidadChange('visibilidad_formacion', valor)}
                  />
                </div>

                <Typography
                  className="font-normal text-center"
                  variant="h5"
                  color="blue-gray"
                >
                  Interés/Predisposición a:
                </Typography>

                <Intereses
                  sendChange={handleChangeInteres}
                  comunidadInicial={formData.interes_comunidad}
                  ofertaInicial={formData.interes_oferta}
                  demandaInicial={formData.interes_demanda}
                />
                {alertaVisible && campoObligatorio && (
                  <AlertaObligatorio input={campoObligatorio} />
                )}
              </div>
            </Card>
            <div className="flex justify-center py-2">
              <Button
                color="blue"
                onClick={modoEdicion ? null : handleOpenConfirmacion}
                type={modoEdicion ? "submit" : "button"}
              >
                Enviar
              </Button>
            </div>
          </form>

          <ModalConfirmacion
            open={modalConfirmacionVisible}
            handleOpen={setModalConfirmacionVisible}
            onAceptar={handleSubmit}
            formData={formData}
          />

          <ModalResultado
            open={modalResultadoVisible}
            handleOpen={setModalResultadoVisible}
            registroExitoso={registroExitoso}
          />
        </div>
      </div>
    </>
  );
};

const Form = ({
  carreras,
  enumerados,
  modoEdicion = false,
  datosGraduado = {},
}) => {
  const { setAuthState } = useContext(AuthContext);
  const { registrarGraduado, actualizarGraduado } = graduadosService;

  const handleSubmit = async (formData) => {
    if (modoEdicion) {
      await actualizarGraduado(formData);
    } else {
      await registrarGraduado(formData);
      setAuthState((prev) => {
        const newState = {
          ...prev,
          graduado: true,
        };
        return newState;
      });
    }
  };

  return (
    <FormularioGraduado
      carreras={carreras}
      enumerados={enumerados}
      datosGraduado={datosGraduado}
      onSubmit={handleSubmit}
      modoEdicion={modoEdicion}
    />
  );
};

export default Form;
