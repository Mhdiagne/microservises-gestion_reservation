// src/services/roomService.ts
import axios from 'axios';
import { Room } from '../types/room';

const API_URL = 'http://localhost:8082/'; // adapte le port si nécessaire

export const getAllRooms = async (): Promise<Room[]> => {
  const response = await axios.get(`${API_URL}rooms`);
  if (response.data.success) {
    return response.data.data;
  }
  throw new Error(response.data.message || 'Erreur lors du chargement des salles');
};
