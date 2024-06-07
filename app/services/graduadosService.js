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
    if (!token) throw new Error("No se encontro el token.");
    const response = await axios.post(`${API_URL}/graduados`, formData, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`        
      },
    });

    if (response.status !== 200) {
      throw new Error("Error en la solicitud");
    }
    return response.data.data;
  } catch (error) {
    throw new Error("Error fetching para registrar graduado:", error);
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
