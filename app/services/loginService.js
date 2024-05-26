import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email: email,
            password: password
        }, {
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

export default login;