import axios from 'axios';

//TODO: utilizar variables de entorno / constantes globales
const API_URL = 'http://localhost:8000/api/ciudades';

const obtenerTodasLasCiudades = async (headers = {}) => {
    try {
        const response = await axios.get(API_URL, {
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