package com.roomreservation.room.controller;

import com.roomreservation.room.entity.Room;
import com.roomreservation.room.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/rooms")
@CrossOrigin(origins = "*")
public class RoomController {
    
    @Autowired
    private RoomService roomService;
    
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllRooms(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Integer minCapacity,
            @RequestParam(required = false) Boolean isAvailable,
            @RequestParam(required = false) String search) {
        
        try {
            List<Room> rooms;
            
            if (search != null && !search.trim().isEmpty()) {
                rooms = roomService.searchRooms(search);
            } else if (type != null || location != null || minCapacity != null || isAvailable != null) {
                Room.RoomType roomType = type != null ? Room.RoomType.valueOf(type.toUpperCase()) : null;
                rooms = roomService.filterRooms(roomType, location, minCapacity, isAvailable);
            } else {
                rooms = roomService.getAllRooms();
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Rooms retrieved successfully");
            response.put("data", rooms);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to retrieve rooms: " + e.getMessage());
            response.put("data", null);
            
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getRoomById(@PathVariable Long id) {
        try {
            Optional<Room> room = roomService.getRoomById(id);
            
            if (room.isPresent()) {
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("message", "Room retrieved successfully");
                response.put("data", room.get());
                
                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Room not found");
                response.put("data", null);
                
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to retrieve room: " + e.getMessage());
            response.put("data", null);
            
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping
    public ResponseEntity<Map<String, Object>> createRoom(@Valid @RequestBody Room room) {
        try {
            Room createdRoom = roomService.createRoom(room);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Room created successfully");
            response.put("data", createdRoom);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to create room: " + e.getMessage());
            response.put("data", null);
            
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateRoom(@PathVariable Long id, @Valid @RequestBody Room roomDetails) {
        try {
            Room updatedRoom = roomService.updateRoom(id, roomDetails);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Room updated successfully");
            response.put("data", updatedRoom);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to update room: " + e.getMessage());
            response.put("data", null);
            
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteRoom(@PathVariable Long id) {
        try {
            roomService.deleteRoom(id);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Room deleted successfully");
            response.put("data", null);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to delete room: " + e.getMessage());
            response.put("data", null);
            
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PatchMapping("/{id}/availability")
    public ResponseEntity<Map<String, Object>> updateRoomAvailability(
            @PathVariable Long id, 
            @RequestParam Boolean isAvailable) {
        try {
            roomService.updateRoomAvailability(id, isAvailable);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Room availability updated successfully");
            response.put("data", null);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to update room availability: " + e.getMessage());
            response.put("data", null);
            
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "room-service");
        return ResponseEntity.ok(response);
    }
}