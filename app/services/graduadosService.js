import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const obtenerGraduados = async (headers = {}) => {
  try {
    const response = await axios.get(`${API_URL}/graduados`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching graduados data:", error);
    throw error;
  }
};
const registrarGraduado = async (formData) => {
  try {
    const token = Cookies.get("token");
    if (!token) throw new Error("No se encontró el token.");

    console.log(formData);

    const response = await axios.post(`${API_URL}/graduados`, formData, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    });

    if (response.status !== 201) {
      throw new Error("Error en la solicitud");
    }

    return response.data.data;
  } catch (error) {
    if (error.response) {
      // La solicitud fue hecha y el servidor respondió con un código de estado
      // que cae fuera del rango de 2xx
      console.error('Error en la respuesta del servidor:', error.response.data);
      console.error('Código de estado:', error.response.status);
      console.error('Encabezados:', error.response.headers);
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error('No se recibió respuesta del servidor:', error.request);
    } else {
      // Algo sucedió al configurar la solicitud que desencadenó un error
      console.error('Error al configurar la solicitud:', error.message);
    }
    throw new Error("Error registrando al graduado");

  }
};

const obtenerGraduadosPorValidar = async (headers = {}) => {
  try {
    const token = Cookies.get("token");
    if (!token) throw new Error("No se encontro el token.");

    const response = await axios.get(`${API_URL}/graduados/validar`, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching graduados por validar data:", error);
    throw error;
  }
};

const aprobarSolicitudGraduado = async (id, headers = {}) => {
  try {
    const token = Cookies.get("token");
    if (!token) throw new Error("No se encontro el token.");

    const response = await axios.patch(
      `${API_URL}/graduados/validar/aprobar/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching graduados por validar data:", error);
    throw error;
  }
};

const rechazarSolicitudGraduado = async (id, headers = {}) => {
  try {
    const token = Cookies.get("token");
    if (!token) throw new Error("No se encontro el token.");

    const response = await axios.delete(
      `${API_URL}/graduados/validar/rechazar/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching graduados por validar data:", error);
    throw error;
  }
};

const obtenerEnumerados = async (headers = {}) => {
  try {
    const token = Cookies.get("token");
    if (!token) throw new Error("No se encontro el token.");

    const response = await axios.get(`${API_URL}/graduados/enumerados`, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching enumerados data:", error);
    throw error;
  }
};

export default {
  obtenerGraduados,
  registrarGraduado,
  obtenerGraduadosPorValidar,
  aprobarSolicitudGraduado,
  rechazarSolicitudGraduado,
  obtenerEnumerados
};
