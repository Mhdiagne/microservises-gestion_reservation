// src/components/cards/RoomCard.tsx
import React from 'react';
import {
  Users,
  MapPin,
  Wifi,
  Monitor,
  Coffee,
  Camera,
  Building,
  Clock,
} from 'lucide-react';
import { Room } from '../../types/room';
import Button from '../ui/Button';

interface RoomCardProps {
  room: Room;
  onReserve: (room: Room) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onReserve }) => {
  const getEquipmentIcon = (equipment: string) => {
    switch (equipment.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-4 h-4" />;
      case 'ecran':
      case 'moniteur':
        return <Monitor className="w-4 h-4" />;
      case 'cafe':
      case 'cafetiere':
        return <Coffee className="w-4 h-4" />;
      case 'camera':
      case 'visioconference':
        return <Camera className="w-4 h-4" />;
      case 'vue panoramique':
        return <Building className="w-4 h-4" />;
      default:
        return <div className="w-4 h-4 bg-stone-500 rounded-full" />;
    }
  };

  return (
    <div className=" relative">
      {/* Suppression du fond flou au hover */}
      {/* <div className="absolute -inset-0.5 bg-gradient-to-r from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" /> */}

      <div
        className="relative bg-white dark:bg-stone-800 rounded-xl shadow-md transition-all duration-300 overflow-hidden border border-stone-100 dark:border-stone-700
             hover:scale-105 hover:shadow-xl transition-transform"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={room.imageUrl}
            alt={room.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

          <div className="absolute top-4 left-4">
            <div className={`
              px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm border
              ${room.isAvailable
                ? 'bg-emerald-50/90 text-emerald-700 border-emerald-200 dark:bg-emerald-900/90 dark:text-emerald-300 dark:border-emerald-700'
                : 'bg-red-50/90 text-red-700 border-red-200 dark:bg-red-900/90 dark:text-red-300 dark:border-red-700'
              }
            `}>
              <div className={`inline-block w-2 h-2 rounded-full mr-2 ${room.isAvailable ? 'bg-emerald-500' : 'bg-red-500'}`} />
              {room.isAvailable ? 'Disponible' : 'Occupée'}
            </div>
          </div>

          <div className="absolute bottom-4 left-4">
            <div className="bg-white/90 dark:bg-stone-800/90 backdrop-blur-sm text-stone-700 dark:text-stone-300 px-3 py-1 rounded-full text-xs font-medium border border-white/20">
              <MapPin className="w-3 h-3 inline mr-1" />
              Étage {room.floor}
            </div>
          </div>

          <div className="absolute bottom-4 right-4">
            <div className="bg-stone-800/80 dark:bg-stone-200/80 backdrop-blur-sm text-white dark:text-stone-800 px-3 py-1 rounded-full text-xs font-medium">
              <Users className="w-3 h-3 inline mr-1" />
              {room.capacity} pers.
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-200 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-200">
              {room.name}
            </h3>
            <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed line-clamp-2">
              {room.description}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide">
              Équipements
            </h4>
            <div className="flex flex-wrap gap-2">
              {room.equipment?.map((equipment, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-stone-50 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-lg text-xs font-medium border border-stone-200 dark:border-stone-600 hover:bg-stone-100 dark:hover:bg-stone-600 transition-colors duration-200"
                >
                  {getEquipmentIcon(equipment)}
                  <span>{equipment}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Button
              onClick={() => onReserve(room)}
              disabled={!room.isAvailable}
              className={`
                w-full font-medium transition-all duration-200
                flex items-center justify-center gap-2
                ${
                  room.isAvailable
                    ? 'bg-stone-800 hover:bg-stone-900 dark:bg-stone-200 dark:hover:bg-stone-100 dark:text-stone-800 shadow-sm hover:shadow-md'
                    : 'bg-stone-200 dark:bg-stone-700 text-stone-400 dark:text-stone-500 cursor-not-allowed'
                }
              `}
            >
              <Clock className="w-4 h-4" />
              {room.isAvailable ? 'Réserver cette salle' : 'Indisponible'}
            </Button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
