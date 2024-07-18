import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/graduados";

const obtenerGraduados = async (params = {}, headers = {}) => {
  try {
    const token = Cookies.get("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    const query = new URLSearchParams(params).toString();
    const response = await axios.get(`${API_URL}?${query}`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching graduados data:", error);
    throw error;
  }
};

const obtenerDatosGraduado = async (headers = {}) => {
  try {
    const token = Cookies.get("token");
    if (!token) throw new Error("No se encontro el token.");

    const response = await axios.get(`${API_URL}/perfil`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching graduado data:", error);
    throw error;
  }
};

const registrarGraduado = async (formData) => {
  console.log(formData)
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

const actualizarGraduado = async (formData) => {
  try {
    const token = Cookies.get("token");
    if (!token) throw new Error("No se encontró el token.");

    const response = await axios.put(`${API_URL}`, formData, {
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
    throw new Error("Error actualizando al graduado");
  }
};

  const obtenerGraduadosPorValidar = async (params = {}, headers = {}) => {
  try {
    const token = Cookies.get("token");
    if (!token) throw new Error("No se encontro el token.");

    const query = new URLSearchParams(params).toString();
    const response = await axios.get(`${API_URL}/validar?${query}`, {
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

const obtenerValoresParaFiltrar = async (params = {}, headers = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const response = await axios.get(`${API_URL}/filtros?${query}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching filtros data:", error);
    throw error;
  }
};

const exportarExcelGraduados = async (params = {}, headers = {}) => {
  try {
    const token = Cookies.get("token");
    if (!token) throw new Error("No se encontro el token.");

    const query = new URLSearchParams(params).toString();
    const response = await axios.get(`${API_URL}/exportar-excel?${query}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'graduados.csv');
    document.body.appendChild(link);
    link.click();

    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error("Error descargando archivo:", error);
    throw error;
  }
};

export default {
  obtenerGraduados,
  obtenerDatosGraduado,
  registrarGraduado,
  actualizarGraduado,
  obtenerGraduadosPorValidar,
  aprobarSolicitudGraduado,
  rechazarSolicitudGraduado,
  obtenerEnumerados,
  obtenerValoresParaFiltrar,
  exportarExcelGraduados
};
