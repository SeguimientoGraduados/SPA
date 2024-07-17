import axios from 'axios';

const obtenerCoordenadasCiudad = async (ciudad) => {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${ciudad}&format=json&limit=10&addressdetails=1&accept-language=es`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.length === 0) {
      throw new Error("Ciudad no encontrada");
    }

    const ciudadesFiltradas = response.data.filter(lugar => {
      const tipo = lugar.type.toLowerCase();
      const clase = lugar.class.toLowerCase();
      return (
        tipo === 'city' ||
        tipo === 'town' ||
        tipo === 'village' ||
        clase === 'place' ||
        (lugar.address && (lugar.address.city || lugar.address.town || lugar.address.village))
      );
    });

    if (ciudadesFiltradas.length === 0) {
      throw new Error("Ciudad no encontrada");
    }

    return ciudadesFiltradas.slice(0, 3);
  } catch (error) {
    throw error;
  }
}

export default obtenerCoordenadasCiudad;