import axios from 'axios';
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const loginAPI = async (email, password) => {
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

const logoutAPI = async () => {
    try {
        const token = Cookies.get("token");
        if (!token) throw new Error("No se encontro el token.");
        
        const response = await axios.post(`${API_URL}/logout`,{}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status !== 200) {
            throw new Error('Error en la solicitud');
        }
    } catch (error) {
        throw new Error('Error al cerrar sesión:', error);
    }
};

export default {loginAPI, logoutAPI};