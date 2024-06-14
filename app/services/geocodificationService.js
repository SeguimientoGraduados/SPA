import axios from "axios";

const obtenerCoordenadasCiudad = async (ciudad) => {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${ciudad}&format=json&limit=1&addressdetails=1&accept-language=es`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.length === 0) {
      throw new Error("Ciudad no encontrada");
    }

    return response.data[0];
  } catch (error) {
    throw error;
  }
}

export default obtenerCoordenadasCiudad;