// src/types/room.ts
export interface Room {
  id: number;
  name: string;
  capacity: number;
  type: 'CONFERENCE' | 'MEETING' | 'TRAINING';
  location: string;
  floor: number;
  equipment: string[];
  imageUrl?: string;
  description?: string;
  isAvailable?: boolean;
  isExternal?: boolean;
  pricePerHour?: number | null;
  createdAt: string;
  updatedAt: string;
}
