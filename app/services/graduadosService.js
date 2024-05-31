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


const registrarGraduado = async (formData) => {
    console.log(formData);
    try {
        const response = await axios.post(`${API_URL}/graduados`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status !== 200) {
            throw new Error('Error en la solicitud');
        }
        return response.data.data; 
    } catch (error) {
        throw new Error('Error al iniciar sesión:', error);
    }
};

export default { obtenerGraduados, registrarGraduado };