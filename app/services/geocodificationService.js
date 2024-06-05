import axios from "axios";

const obtenerCoordenadasCiudad = async (ciudad) => {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${ciudad}&format=json&limit=1`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
}

export default obtenerCoordenadasCiudad;