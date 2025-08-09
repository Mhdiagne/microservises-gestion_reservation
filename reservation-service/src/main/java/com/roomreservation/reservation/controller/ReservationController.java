package com.roomreservation.reservation.controller;

import com.roomreservation.reservation.dto.ReservationRequest;
import com.roomreservation.reservation.entity.Reservation;
import com.roomreservation.reservation.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/reservations")
@CrossOrigin(origins = "*")
public class ReservationController {
    
    @Autowired
    private ReservationService reservationService;
    
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllReservations() {
        
        try {
            List<Reservation> reservations;

            reservations = reservationService.getAllReservations();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Reservations retrieved successfully");
            response.put("data", reservations);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to retrieve reservations: " + e.getMessage());
            response.put("data", null);
            
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getReservationById(@PathVariable("id") Long id) {
        try {
            Optional<Reservation> reservation = reservationService.getReservationById(id);
            
            if (reservation.isPresent()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("message", "Reservation retrieved successfully");
                response.put("data", reservation.get());
                
                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Reservation not found");
                response.put("data", null);
                
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to retrieve reservation: " + e.getMessage());
            response.put("data", null);
            
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping
    public ResponseEntity<Map<String, Object>> createReservation(@Valid @RequestBody ReservationRequest request) {
        try {
            Reservation reservation = reservationService.createReservation(request);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Reservation created successfully");
            response.put("data", reservation);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to create reservation: " + e.getMessage());
            response.put("data", null);
            
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateReservation(@PathVariable Long id, @Valid @RequestBody ReservationRequest request) {
        try {
            Reservation reservation = reservationService.updateReservation(id, request);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Reservation updated successfully");
            response.put("data", reservation);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to update reservation: " + e.getMessage());
            response.put("data", null);
            
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PatchMapping("/{id}/cancel")
    public ResponseEntity<Map<String, Object>> cancelReservation(@PathVariable("id") Long id) {
    try {
            Reservation reservation = reservationService.cancelReservation(id);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Reservation cancelled successfully");
            response.put("data", reservation);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to cancel reservation: " + e.getMessage());
            response.put("data", null);
            
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteReservation(@PathVariable Long id) {
        try {
            reservationService.deleteReservation(id);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Reservation deleted successfully");
            response.put("data", null);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to delete reservation: " + e.getMessage());
            response.put("data", null);
            
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/availability")
    public ResponseEntity<Map<String, Object>> checkAvailability(
            @RequestParam Long roomId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime) {
        
        try {
            boolean isAvailable = reservationService.isRoomAvailable(roomId, startTime, endTime);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Availability checked successfully");
            response.put("data", Map.of("available", isAvailable));
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to check availability: " + e.getMessage());
            response.put("data", null);
            
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "reservation-service");
        return ResponseEntity.ok(response);
    }
}