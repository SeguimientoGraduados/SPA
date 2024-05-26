import axios from 'axios';

//TODO: utilizar variables de entorno / constantes globales
const API_URL = 'http://localhost:8000/api/graduados';

const obtenerGraduados = async (headers = {}) => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching graduados data:', error);
        throw error;
    }
};

export default obtenerGraduados;