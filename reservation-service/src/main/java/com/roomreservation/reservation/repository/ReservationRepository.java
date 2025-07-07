package com.roomreservation.reservation.repository;

import com.roomreservation.reservation.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUserId(Long userId);
    List<Reservation> findByRoomId(Long roomId);
    List<Reservation> findByStatus(Reservation.ReservationStatus status);
    
    @Query("SELECT r FROM Reservation r WHERE r.roomId = :roomId AND r.status = 'CONFIRMED' AND " +
           "((r.startTime <= :startTime AND r.endTime > :startTime) OR " +
           "(r.startTime < :endTime AND r.endTime >= :endTime) OR " +
           "(r.startTime >= :startTime AND r.endTime <= :endTime))")
    List<Reservation> findConflictingReservations(@Param("roomId") Long roomId,
                                                  @Param("startTime") LocalDateTime startTime,
                                                  @Param("endTime") LocalDateTime endTime);
    
    @Query("SELECT r FROM Reservation r WHERE r.startTime >= :startDate AND r.startTime < :endDate")
    List<Reservation> findByDateRange(@Param("startDate") LocalDateTime startDate,
                                     @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT r FROM Reservation r WHERE r.userId = :userId AND r.startTime >= :startDate AND r.startTime < :endDate")
    List<Reservation> findByUserIdAndDateRange(@Param("userId") Long userId,
                                              @Param("startDate") LocalDateTime startDate,
                                              @Param("endDate") LocalDateTime endDate);
}