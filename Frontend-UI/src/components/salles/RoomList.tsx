import React, { useEffect, useState } from 'react';
import RoomCard from '../salles/RoomCard';
import { Room } from '../../types/room';
import { getAllRooms } from '../../services/roomService';
import { Search, Filter, Building2, X, RotateCw } from 'lucide-react';
import ReservationModal from '../reservation/ReservationModal';
import { createReservation } from '../../services/reservationService';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import Tooltip from '../ui/Tooltip';

const RoomList: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [search, setSearch] = useState('');
  const [availability, setAvailability] = useState<'all' | 'available' | 'unavailable'>('all');
  const [floor, setFloor] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setIsLoading(true);
        const data = await getAllRooms();
        setRooms(data);
        setFilteredRooms(data);
      } catch (error) {
        console.error('Erreur lors du chargement des salles :', error);
        toast.error('Erreur lors du chargement des salles');
      } finally {
        setIsLoading(false);
      }
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      filterRooms();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, availability, floor, rooms]);

  const filterRooms = () => {
    setIsFiltering(true);
    let result = [...rooms];

    if (search.trim()) {
      result = result.filter((room) =>
        room.name.toLowerCase().includes(search.toLowerCase()) ||
        room.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (availability !== 'all') {
      result = result.filter((room) =>
        availability === 'available' ? room.isAvailable : !room.isAvailable
      );
    }

    if (floor.trim()) {
      result = result.filter((room) => room.floor === Number(floor));
    }

    setFilteredRooms(result);
    setIsFiltering(false);
  };

  const resetFilters = () => {
    setSearch('');
    setAvailability('all');
    setFloor('');
  };

  const handleReserve = (room: Room) => {
    setSelectedRoom(room);
  };

  const closeModal = () => {
    setSelectedRoom(null);
  };

  const handleReservationSubmit = async (reservationData: any) => {
    try {
      await createReservation(reservationData);

      // Mise à jour de l'état local pour refléter l'indisponibilité
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === reservationData.roomId
            ? { ...room, isAvailable: false }
            : room
        )
      );

      // Mise à jour immédiate de la liste filtrée
      filterRooms();

      toast.success("Réservation réussie !");
      setSelectedRoom(null);
    } catch (error) {
      toast.error("Erreur lors de la réservation");
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent text-center"
        >
          ✦•┈๑⋅⋯ Salles disponibles ⋯⋅๑┈•✦ 
        </motion.h1>

        <Tooltip content="Réinitialiser les filtres">
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Réinitialiser</span>
          </button>
        </Tooltip>
      </div>

      {/* Filtres */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-6 rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {/* Recherche */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-600 dark:text-stone-300 flex items-center gap-2">
            <Search className="w-4 h-4" />
            Recherche
          </label>
          <input
            type="text"
            placeholder="Nom ou description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Disponibilité */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-600 dark:text-stone-300 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Disponibilité
          </label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value as any)}
            className="w-full px-4 py-2 rounded-lg bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
          >
            <option value="all">Toutes les salles</option>
            <option value="available">Disponibles</option>
            <option value="unavailable">Occupées</option>
          </select>
        </div>

        {/* Étage */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-600 dark:text-stone-300 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Étage
          </label>
          <input
            type="number"
            placeholder="Tous les étages"
            min="0"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Résultats */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-600 dark:text-stone-300">
            Résultats
          </label>
          <div className="bg-stone-50 dark:bg-stone-700/50 p-3 rounded-lg border border-stone-200 dark:border-stone-600">
            {isFiltering ? (
              <div className="flex items-center gap-2 text-sm text-stone-500">
                <RotateCw className="w-4 h-4 animate-spin" />
                Filtrage en cours...
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  {filteredRooms.length} {filteredRooms.length > 1 ? 'salles' : 'salle'}
                </span>
                <span className="text-xs px-2 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 rounded-full">
                  {rooms.length} au total
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Liste des salles */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <RotateCw className="w-8 h-8 animate-spin text-amber-500" />
        </div>
      ) : (
        <>
          {filteredRooms.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-16 bg-stone-50 dark:bg-stone-800/50 rounded-xl"
            >
              <div className="max-w-md mx-auto space-y-4">
                <Search className="w-12 h-12 mx-auto text-stone-400" />
                <h3 className="text-lg font-medium text-stone-700 dark:text-stone-300">
                  Aucune salle trouvée
                </h3>
                <p className="text-stone-500 dark:text-stone-400">
                  Essayez d'ajuster vos critères de recherche ou de réinitialiser les filtres.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredRooms.map((room) => (
                  <motion.div
                    key={room.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <RoomCard 
                      room={room} 
                      onReserve={handleReserve} 
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedRoom && (
          <ReservationModal
            room={selectedRoom}
            onClose={closeModal}
            onSubmit={handleReservationSubmit}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoomList;
