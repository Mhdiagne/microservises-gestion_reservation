package com.roomreservation.reservation.service;

import com.roomreservation.reservation.dto.ReservationRequest;
import com.roomreservation.reservation.entity.Reservation;
import com.roomreservation.reservation.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {
    
    @Autowired
    private ReservationRepository reservationRepository;
    
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }
    
    public Optional<Reservation> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }
    
    public List<Reservation> getReservationsByUserId(Long userId) {
        return reservationRepository.findByUserId(userId);
    }
    
    public List<Reservation> getReservationsByRoomId(Long roomId) {
        return reservationRepository.findByRoomId(roomId);
    }
    
    public List<Reservation> getReservationsByStatus(Reservation.ReservationStatus status) {
        return reservationRepository.findByStatus(status);
    }
    
    public List<Reservation> getReservationsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return reservationRepository.findByDateRange(startDate, endDate);
    }

    public Reservation createReservation(ReservationRequest request) {
        if (request.getEndTime().isBefore(request.getStartTime()) ||
                request.getEndTime().isEqual(request.getStartTime())) {
            throw new RuntimeException("End time must be after start time");
        }

        List<Reservation> conflicts = reservationRepository.findConflictingReservations(
                request.getRoomId(), request.getStartTime(), request.getEndTime());

        if (!conflicts.isEmpty()) {
            throw new RuntimeException("Room is already booked for the selected time slot");
        }

        Reservation reservation = new Reservation();
        reservation.setRoomId(request.getRoomId());
        reservation.setUserId(request.getUserId());
        reservation.setTitle(request.getTitle());
        reservation.setDescription(request.getDescription());
        reservation.setStartTime(request.getStartTime());
        reservation.setEndTime(request.getEndTime());
        reservation.setAttendees(request.getAttendees());
        reservation.setStatus(Reservation.ReservationStatus.CONFIRMED);

        Reservation saved = reservationRepository.save(reservation);

        // 🔥 Met à jour la disponibilité de la salle
        markRoomAsUnavailable(request.getRoomId());

        return saved;
    }

    private void markRoomAsUnavailable(Long roomId) {
        String roomServiceUrl = "http://localhost:8082/rooms/" + roomId + "/availability?isAvailable=false";

        RestTemplate restTemplate = new RestTemplate();
        try {
            restTemplate.patchForObject(roomServiceUrl, null, Void.class);
        } catch (Exception e) {
            System.err.println("Erreur mise à jour disponibilité de la salle : " + e.getMessage());
            // Tu peux logger ou ignorer, selon la criticité
        }
    }


    public Reservation updateReservation(Long id, ReservationRequest request) {
        Reservation reservation = reservationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Reservation not found with id: " + id));
        
        // Validate time range
        if (request.getEndTime().isBefore(request.getStartTime()) || 
            request.getEndTime().isEqual(request.getStartTime())) {
            throw new RuntimeException("End time must be after start time");
        }
        
        // Check for conflicts (excluding current reservation)
        List<Reservation> conflicts = reservationRepository.findConflictingReservations(
            request.getRoomId(), request.getStartTime(), request.getEndTime());
        conflicts.removeIf(r -> r.getId().equals(id));
        
        if (!conflicts.isEmpty()) {
            throw new RuntimeException("Room is already booked for the selected time slot");
        }
        
        reservation.setRoomId(request.getRoomId());
        reservation.setTitle(request.getTitle());
        reservation.setDescription(request.getDescription());
        reservation.setStartTime(request.getStartTime());
        reservation.setEndTime(request.getEndTime());
        reservation.setAttendees(request.getAttendees());
        
        return reservationRepository.save(reservation);
    }
    
    public Reservation cancelReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Reservation not found with id: " + id));
        
        reservation.setStatus(Reservation.ReservationStatus.CANCELLED);
        return reservationRepository.save(reservation);
    }
    
    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }
    
    public boolean isRoomAvailable(Long roomId, LocalDateTime startTime, LocalDateTime endTime) {
        List<Reservation> conflicts = reservationRepository.findConflictingReservations(
            roomId, startTime, endTime);
        return conflicts.isEmpty();
    }
}