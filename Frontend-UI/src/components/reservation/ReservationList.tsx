import React, { useEffect, useState } from 'react';
import { X, MapPin, Calendar, Clock, User, Trash2, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getAllReservations, cancelReservation } from '../../services/reservationService';
import { formatDate, formatTime } from '../../utils/dateUtils';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigate, useNavigate } from 'react-router-dom';

const ReservationList: React.FC = () => {
  const [reservations, setReservations] = useState<any[]>([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancellingId, setCancellingId] = useState<number | null>(null);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setIsLoading(true);
        const res = await getAllReservations();
        const userReservations = res.filter((r: any) => r.userId === user?.id);
        setReservations(userReservations);
      } catch (error) {
        console.error('Erreur lors du chargement des réservations', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, [user]);

  const handleCancel = async () => {
  if (!cancellingId) return;
  try {
    await cancelReservation(cancellingId);
    setReservations((prev) =>
      prev.map((r) =>
        r.id === cancellingId ? { ...r, status: 'CANCELLED' } : r
      )
    );
    setShowCancelModal(false);
  } catch (err) {
    console.error('Erreur annulation :', err);
  } finally {
    setCancellingId(null); // ça enlève le loading
  }
};

  const statusColors: Record<string, string> = {
    CONFIRMED: 'bg-emerald-100 text-emerald-800',
    CANCELLED: 'bg-rose-100 text-rose-800',
    PENDING: 'bg-amber-100 text-amber-800'
  };

  const statusIcons: Record<string, JSX.Element> = {
    CONFIRMED: <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>,
    CANCELLED: <div className="w-2 h-2 rounded-full bg-rose-500 mr-2"></div>,
    PENDING: <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent"
      >
        ✦•┈๑⋅⋯ Mes Réservations ⋯⋅๑┈•✦ 
      </motion.h1>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      ) : reservations.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center py-12 bg-white/5 rounded-xl backdrop-blur-sm"
        >
          <p className="text-lg mb-6 text-stone-300"> ⓘ Vous n'avez aucune réservation</p>
          <Button 
            onClick={() => navigate('/espace-entreprise')} 
            className="hover:scale-105 transition-transform"
          >
            Voir les salles disponibles
          </Button>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <AnimatePresence>
            {reservations.map(reservation => (
              <motion.div
                key={reservation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-stone-800 rounded-xl shadow-lg overflow-hidden border border-white/10 hover:shadow-yellow-500/10 transition-all"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-white">
                          {reservation.title}
                        </h3>
                        <span className={`text-xs px-3 py-1 rounded-full ${statusColors[reservation.status]} flex items-center`}>
                          {statusIcons[reservation.status]}
                          {reservation.status === 'CONFIRMED' ? 'Confirmée' : reservation.status === 'CANCELLED' ? 'Annulée' : 'En attente'}
                        </span>
                      </div>
                      
                      {reservation.description && (
                        <p className="text-stone-400 mt-1 text-sm">{reservation.description}</p>
                      )}

                      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-stone-700 rounded-lg">
                            <MapPin className="w-5 h-5 text-yellow-400" />
                          </div>
                          <div>
                            <p className="text-xs text-stone-400">Salle</p>
                            <p className="text-white font-medium">Salle {reservation.roomId}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-stone-700 rounded-lg">
                            <Calendar className="w-5 h-5 text-yellow-400" />
                          </div>
                          <div>
                            <p className="text-xs text-stone-400">Date</p>
                            <p className="text-white font-medium">{formatDate(reservation.startTime)}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-stone-700 rounded-lg">
                            <Clock className="w-5 h-5 text-yellow-400" />
                          </div>
                          <div>
                            <p className="text-xs text-stone-400">Horaire</p>
                            <p className="text-white font-medium">
                              {formatTime(reservation.startTime)} - {formatTime(reservation.endTime)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-stone-700 rounded-lg">
                            <User className="w-5 h-5 text-yellow-400" />
                          </div>
                          <div>
                            <p className="text-xs text-stone-400">Réservé par</p>
                            <p className="text-white font-medium">{user?.name || 'Vous'}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {reservation.status === 'CONFIRMED' && (
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="ml-4"
                      >
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            setCancellingId(reservation.id);
                            setShowCancelModal(true);
                          }}
                          className="shadow-lg shadow-rose-500/10"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Annuler
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>

                {reservation.status === 'CONFIRMED' && (
                  <div className="bg-gradient-to-r from-yellow-500/10 to-transparent h-1 w-full"></div>
                )}
                {reservation.status === 'CANCELLED' && (
                  <div className="bg-gradient-to-r from-rose-500/10 to-transparent h-1 w-full"></div>
                )}
                {reservation.status === 'PENDING' && (
                  <div className="bg-gradient-to-r from-amber-500/10 to-transparent h-1 w-full"></div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Confirmer l'annulation"
      >
        <div className="text-center p-4">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          </motion.div>
          <p className="mb-6 text-stone-300">Êtes-vous sûr de vouloir annuler cette réservation ?</p>
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => setShowCancelModal(false)}
              className="hover:bg-stone-700 transition-colors"
            >
              Non, garder
            </Button>
            <Button 
              variant="danger" 
              onClick={handleCancel} 
            //   loading={!!cancellingId}
              className="hover:shadow-rose-500/30 transition-all"
            >
              Oui, annuler
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReservationList;