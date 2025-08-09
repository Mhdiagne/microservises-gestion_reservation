import axios from 'axios';


const API_URL = 'http://localhost:8081/auth';

export const inscription = async (userData: {
  email: string;
  password: string;
  name: string;
  role: string;
  department: string;
}) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const connexion = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data.data?.token) {
    localStorage.setItem('token', response.data.data.token);
  }
  return response.data;
};

export const validateToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const response = await axios.post(`${API_URL}/validate`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    localStorage.removeItem('token');
    return null;
  }
};