// src/api.js
import axios from 'axios';

// Función para obtener el token del almacenamiento local (localStorage)
const getToken = () => {
  return localStorage.getItem('token');
};

// Función para configurar el encabezado de autorización
const setAuthHeader = () => {
  const token = getToken();
  if (token) {
    return { headers: { Authorization: `Bearer ${token}` } };
  }
  return {};
};

// Función general para realizar solicitudes GET con autenticación
const fetchData = async (url) => {
  try {
    const config = setAuthHeader();
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos:', error.message);
    throw error;
  }
};

export { fetchData };
