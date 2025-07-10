import React, { useState } from 'react';
import { Room } from '../../types/room';
import { X, Calendar, Clock, Users, BookOpen, User, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  room: Room;
  onClose: () => void;
  onSubmit: (reservationData: any) => void;
}

const ReservationModal: React.FC<Props> = ({ room, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [attendees, setAttendees] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({
        roomId: room.id,
        userId: user?.id,
        title,
        description,
        startTime,
        endTime,
        attendees: attendees.split(',').map((a) => a.trim()),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm  flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white dark:bg-stone-800 w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden border border-white/10"
        >
          <div className="relative p-6">
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
            >
              <X className="w-5 h-5 text-stone-500 hover:text-red-500" />
            </button>

            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
                <Calendar className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-stone-800 dark:text-white">
                  Réserver : <span className="text-amber-600">{room.name}</span>
                </h2>
                {user && (
                  <div className="flex items-center mt-2 text-sm text-stone-600 dark:text-stone-300">
                    <User className="w-4 h-4 mr-1" />
                    <span className="font-medium">{user.name}</span>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Titre */}
                <div className="space-y-1">
                  <label className="flex items-center text-sm font-medium text-stone-600 dark:text-stone-300">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Titre de l'événement
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mt-1 p-3 rounded-lg bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-white" 
                    placeholder="Réunion d'équipe"
                    required
                  />
                </div>

                {/* Participants */}
                <div className="space-y-1">
                  <label className="flex items-center text-sm font-medium text-stone-600 dark:text-stone-300">
                    <Users className="w-4 h-4 mr-2" />
                    Participants (emails)
                  </label>
                  <input
                    type="text"
                    placeholder="modou@email.com, faty@email.com"
                    value={attendees}
                    onChange={(e) => setAttendees(e.target.value)}
                    className="w-full mt-1 p-3 rounded-lg bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-white"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="flex items-center text-sm font-medium text-stone-600 dark:text-stone-300">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full mt-1 p-3 rounded-lg bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all min-h-[100px] text-white"
                  placeholder="Décrivez l'objectif de cette réservation..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Date de début */}
                <div className="space-y-1">
                  <label className="flex items-center text-sm font-medium text-stone-600 dark:text-stone-300">
                    <Clock className="w-4 h-4 mr-2" />
                    Date et heure de début
                  </label>
                  <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full mt-1 p-3 rounded-lg bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-white"
                    required
                  />
                </div>

                {/* Date de fin */}
                <div className="space-y-1">
                  <label className="flex items-center text-sm font-medium text-stone-600 dark:text-stone-300">
                    <Clock className="w-4 h-4 mr-2" />
                    Date et heure de fin
                  </label>
                  <input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full mt-1 p-3 rounded-lg bg-stone-50 dark:bg-stone-700 border border-stone-200 dark:border-stone-600 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-white"
                    required
                  />
                </div>
              </div>

              <div className="pt-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${isSubmitting ? 'bg-amber-400' : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:shadow-lg hover:shadow-amber-500/20'}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      En cours...
                    </span>
                  ) : (
                    'Confirmer la réservation'
                  )}
                </motion.button>
              </div>
            </form>
          </div>

          {/* Footer avec infos de la salle */}
          <div className="bg-stone-50 dark:bg-stone-700/50 px-6 py-3 border-t border-stone-200 dark:border-stone-600">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-stone-600 dark:text-stone-300">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{room.name} • Capacité : {room.capacity} personnes</span>
              </div>
              <div className="text-stone-500 dark:text-stone-400">
                {room.equipment.join(' • ')}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReservationModal;