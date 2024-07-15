import {
  Card,
  Button,
  Typography,
  Input,
  Textarea,
  Tooltip
} from "@material-tailwind/react";
import React, { useState, useEffect, useContext } from "react";
import graduadosService from "../../services/graduadosService";
import { DefaultSkeleton } from "../Utils/Skeleton";
import AlertaObligatorio from "../Utils/AlertObligatorio";
import Cookies from "js-cookie";
import ModalFormulario from "./ModalFormulario";
import RadioHorizontal from "../Utils/RadioHorizontal";
import TooltipInfo from "../Utils/TooltipInfo";
import SelectOption from "../Utils/SelectOption";
import DatePicker from "../Utils/DatePicker";
import Titulo from "./Titulo";
import obtenerCoordenadasCiudad from "@/app/services/geocodificationService";
import { conversorFecha } from "../Utils/ConversorFecha";
import Contacto from "./Contacto";
import CheckboxList from "../Utils/CheckboxList";
import Formacion from "./Formacion";
import { Validacion } from "./Validacion";
import Intereses from "./Intereses";
import { AuthContext } from "@/app/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

const FormularioGraduado = ({
  carreras,
  enumerados,
  datosGraduado = {},
  onSubmit,
  modoEdicion = false,
}) => {
  const [formData, setFormData] = useState({
    nombre: "",
    dni: "",
    fecha_nacimiento: "",
    ciudad: [],
    contacto: "",
    carreras: [],
    ocupacion_trabajo: "",
    ocupacion_empresa: "",
    ocupacion_sector: "",
    ocupacion_informacion_adicional: "",
    experiencia_anios: "",
    habilidades_competencias: "",
    formacion: [],
    rrss: [],
    cv: "",
    interes_comunidad: false,
    interes_oferta: false,
    interes_demanda: false,
  });

  const [alertaVisible, setAlertaVisible] = useState(false);
  const [campoObligatorio, setCampoObligatorio] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
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
      setModalVisible(true);
    } catch (error) {
      setRegistroExitoso(false);
      setModalVisible(true);
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

  const handleChangeSector = (e) => {
    const { value } = e.target;
    const sector = value[0];
    setOpcionesSector(sector);
    handleChange({ target: { name: "ocupacion_sector", value: sector } });
  };

  const handleChangeOcupacion = (e) => {
    const { value } = e.target;
    handleChange({ target: { name: "ocupacion_trabajo", value } });
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

  const opcionesCarreras = carreras.map((carrera) => ({
    value: carrera.id.toString(),
    label: carrera.nombre,
  }));

  const carrerasIniciales = datosGraduado.carreras
    ? datosGraduado.carreras.map((carrera) => ({
        title: carrera.id.toString(),
        year: carrera.anio_graduacion,
      }))
    : {};

  const fechaInicial = datosGraduado.fecha_nacimiento
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
                    <div className="grid grid-cols-3 items-center px-2">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal w-40"
                      >
                        Nombre completo:
                      </Typography>
                      <Input
                        label="Nombre completo"
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
                  ) : (
                    <Input
                      label="Nombre completo"
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
                    <Input
                      label="Ciudad"
                      name="ciudad"
                      onBlur={handleChangeCiudad}
                      onChange={handleInputChange}
                      value={formData.ciudad.nombre}
                      required
                      onInvalid={handleValidation}
                      onInput={handleValidation}
                      error={Boolean(error)}
                      className="bg-tremor-background"
                    />
                  ) : (
                    <Input
                      label="Ciudad"
                      name="ciudad"
                      onBlur={handleChangeCiudad}
                      required
                      onInvalid={handleValidation}
                      onInput={handleValidation}
                      error={Boolean(error)}
                      className="bg-tremor-background"
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
                  />
                </div>

                <Typography
                  variant="h3"
                  color="blue-gray"
                  className="text-center font-normal mb-2"
                >
                  Información Laboral
                </Typography>

                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <SelectOption
                      select={"Ocupacion actual"}
                      handleChange={handleChangeOcupacion}
                      options={enumerados.ocupacion_trabajo}
                      name="ocupacion_trabajo"
                      initialValue={formData.ocupacion_trabajo}
                    />
                    <Input
                      label="Nombre de la organización"
                      name="ocupacion_empresa"
                      onChange={handleChange}
                      value={formData.ocupacion_empresa}
                      className="bg-tremor-background"
                    />
                  </div>
                  <div className="flex justify-center items-center">
                    <Typography variant="paragraph" color="blue=gray">
                      Sector:
                    </Typography>
                    <CheckboxList
                      handleChange={handleChangeSector}
                      direction={"row"}
                      items={enumerados.ocupacion_sector}
                      name="ocupacion_sector"
                      opcionesSeleccionadas={formData.ocupacion_sector}
                      seleccionUnica={true}
                    />
                  </div>

                  <Textarea
                    variant="outlined"
                    label="Información adicional"
                    name="ocupacion_informacion_adicional"
                    onChange={handleChange}
                    value={formData.ocupacion_informacion_adicional || ""}
                    className="bg-tremor-background"
                  />

                  <div className="flex items-center flex-row">
                    <TooltipInfo label={"Privacidad de las respuestas"} />
                    <RadioHorizontal />
                  </div>

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
                    label="Descripcion"
                    name="habilidades_competencias"
                    placeholder="Describa sus habilidades y competencias, incluyendo herramientas, idiomas, habilidades blandas, y cualquier otra información relevante que considere importante para su perfil profesional."
                    onChange={handleChange}
                    value={formData.habilidades_competencias || ""}
                    className="bg-tremor-background placeholder:pt-5"
                  />

                  <div className="flex items-center flex-row justify-between">
                    <TooltipInfo label={"Privacidad de las respuestas"} />
                    <RadioHorizontal />
                  </div>
                </div>

                <Typography
                  variant="h3"
                  color="blue-gray"
                  className="text-center font-normal"
                >
                  Información Adicional
                </Typography>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-row gap-3 items-center">
                    <Tooltip
                      className="w-48"
                      content={
                        <Typography variant="small" className="text-sm">
                          Aquí puedes dejar el enlace a tu CV ya sea como pdf en Google Drive o cualquier otra página de tu preferencia.
                        </Typography>
                      }
                    >
                      <FontAwesomeIcon icon={faCircleQuestion} size="lg" color="grey"/>
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
              <Button type="submit" color="blue">
                Enviar
              </Button>
            </div>
          </form>
          <ModalFormulario
            open={modalVisible}
            handleOpen={setModalVisible}
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
        console.log("Nuevo AuthState:", newState);
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
