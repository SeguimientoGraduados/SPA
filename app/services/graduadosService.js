import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/graduados";

const obtenerGraduados = async (params ={}, headers = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const response = await axios.get(`${API_URL}?${query}`, {
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

    const response = await axios.post(`${API_URL}`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 201) {
      throw new Error("Error en la solicitud");
    }

    return response.data.data;
  } catch (error) {
    if (error.response) {
      console.error("Error en la respuesta del servidor:", error.response.data);
      console.error("Código de estado:", error.response.status);
      console.error("Encabezados:", error.response.headers);
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor:", error.request);
    } else {
      console.error("Error al configurar la solicitud:", error.message);
    }
    throw new Error("Error registrando al graduado");
  }
};

const obtenerGraduadosPorValidar = async (headers = {}) => {
  try {
    const token = Cookies.get("token");
    if (!token) throw new Error("No se encontro el token.");

    const response = await axios.get(`${API_URL}/validar`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
      `${API_URL}/validar/aprobar/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const rechazarSolicitudGraduado = async (id, headers = {}) => {
  try {
    const token = Cookies.get("token");
    if (!token) throw new Error("No se encontro el token.");

    const response = await axios.delete(`${API_URL}/validar/rechazar/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const obtenerEnumerados = async (headers = {}) => {
  try {
    const token = Cookies.get("token");
    if (!token) throw new Error("No se encontro el token.");

    const response = await axios.get(`${API_URL}/enumerados`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching enumerados data:", error);
    throw error;
  }
};

const obtenerPaisesParaFiltrar = async (headers = {}) => {
  try {
    const response = await axios.get(`${API_URL}/paises`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching paises data:", error);
    throw error;
  }
};

export default {
  obtenerGraduados,
  registrarGraduado,
  obtenerGraduadosPorValidar,
  aprobarSolicitudGraduado,
  rechazarSolicitudGraduado,
  obtenerEnumerados,
  obtenerPaisesParaFiltrar
};
