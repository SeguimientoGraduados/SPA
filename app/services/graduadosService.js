import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const obtenerGraduados = async (headers = {}) => {
    try {
        const response = await axios.get(`${API_URL}/graduados`, {
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