export const Validacion = (name, value, errors) => {
  let errorObj = { ...errors };

  const validateNombre = (value) => {
    if (
      !/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+ [A-Za-zÁÉÍÓÚáéíóúñÑ]+$/.test(value.trim()) &&
      value.trim().length > 0
    ) {
      return "Ingrese nombre completo (Nombre/s y Apellido/s)";
    }
    if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(value) && value.trim().length > 0) {
      return "El nombre solo puede contener letras y espacios";
    }
    return "";
  };

  const validateEmail = (value) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(value.trim()) && value.trim().length > 0) {
      return "Debe ingresar un correo electrónico válido";
    }
    return "";
  };

  const validateDni = (value) => {
    const dniRegex = /^\d{6,9}$/;
    return !dniRegex.test(value) && value.trim().length > 0
      ? "El DNI debe contener al menos 6 dígitos y solo números"
      : "";
  };

  const validateFechaNacimiento = (value) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(value)) {
      return "Ingrese una fecha válida";
    }
    const year = parseInt(value.split("-")[0], 10);
    return year >= 2005 ? "Ingrese una fecha válida" : "";
  };

  const validateAnioGraduacion = (value) => {
  
    const graduationYear = parseInt(value, 10);
    const currentYear = new Date().getFullYear();
    if (
      (isNaN(graduationYear) ||
        graduationYear <= 1930 ||
        graduationYear > currentYear) &&
      value.trim().length > 0
    ) {
      return "Ingrese una fecha válida";
    }
    return "";
  };

  const validateRrss = (value) => {
    let rrssErrors = {};
    const urlRegexes = {
      linkedin: /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/,
      facebook: /^(https?:\/\/)?(www\.)?facebook\.com\/.*$/,
      twitter: /^(https?:\/\/)?(www\.)?twitter\.com\/.*$/,
    };

    value.forEach(({ rrss, url }) => {
      if (url.trim() === "") {
        rrssErrors[rrss] = "";
      } else if (!urlRegexes[rrss].test(url)) {
        rrssErrors[rrss] = `Ingrese una URL válida de ${rrss}`;
      } else {
        rrssErrors[rrss] = "";
      }
    });
    return rrssErrors;
  };

  const validateCv = (value) => {
    if (value.length > 0) {
      const urlPattern =
        /^(https?:\/\/)?((www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(\/[^\s]*)?$/;
      return !urlPattern.test(value) ? "Ingrese una URL válida" : "";
    }
    return "";
  };

  switch (name) {
    case "nombre":
      errorObj.nombre = validateNombre(value);
      break;
    case "contacto":
      errorObj.email = validateEmail(value);
      break;
    case "dni":
      errorObj.dni = validateDni(value);
      break;
    case "fecha_nacimiento":
      errorObj.fecha_nacimiento = validateFechaNacimiento(value);
      break;
    case "anio_graduacion":
      errorObj.anio_graduacion = validateAnioGraduacion(value);
      break;
    case "rrss":
      errorObj.rrss = validateRrss(value);
      break;
    case "cv":
      errorObj.cv = validateCv(value);
      break;
    default:
      break;
  }

  return errorObj;
};
