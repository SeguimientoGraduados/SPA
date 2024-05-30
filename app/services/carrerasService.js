import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const obtenerTodasLasCarreras = async (headers = {}) => {
    try {
        const response = await axios.get(`${API_URL}/carreras`, {
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

export default obtenerTodasLasCarreras;