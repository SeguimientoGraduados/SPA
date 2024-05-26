import axios from 'axios';

//TODO: utilizar variables de entorno / constantes globales
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const obtenerTodasLasCiudades = async (headers = {}) => {
    try {
        const response = await axios.get(`${API_URL}/ciudades`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching ciudades data:', error);
        throw error;
    }
};

export default obtenerTodasLasCiudades;