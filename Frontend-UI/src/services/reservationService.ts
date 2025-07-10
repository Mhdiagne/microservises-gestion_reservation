import axios from 'axios';

const API = 'http://localhost:8083/reservations';

// interface ReservationRequest {
//   roomId: number;
//   userId: number;
//   title: string;
//   description: string;
//   startTime: string;
//   endTime: string;
//   attendees: string[];

// }

export const createReservation = async (data: any) => {
  const response = await axios.post(API, data);
  if (!response.data.success) {
    throw new Error(response.data.message);
  }
  return response.data.data;
};

export const getAllReservations = async () => {
  const response = await axios.get(API);
  if (!response.data.success) {
    throw new Error(response.data.message);
  }
  return response.data.data;
};

export const cancelReservation = async (reservationId: number) => {
  const response = await axios.patch(`${API}/${reservationId}/cancel`);
  if (!response.data.success) {
    throw new Error(response.data.message);
  }
  return response.data.data;
};
