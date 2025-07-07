package com.roomreservation.room.service;

import com.roomreservation.room.entity.Room;
import com.roomreservation.room.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {
    
    @Autowired
    private RoomRepository roomRepository;
    
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }
    
    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }
    
    public List<Room> getRoomsByType(Room.RoomType type) {
        return roomRepository.findByType(type);
    }
    
    public List<Room> getRoomsByLocation(String location) {
        return roomRepository.findByLocation(location);
    }
    
    public List<Room> getAvailableRooms() {
        return roomRepository.findByIsAvailable(true);
    }
    
    public List<Room> searchRooms(String keyword) {
        return roomRepository.findByKeyword(keyword);
    }
    
    public List<Room> filterRooms(Room.RoomType type, String location, Integer minCapacity, Boolean isAvailable) {
        return roomRepository.findByFilters(type, location, minCapacity, isAvailable);
    }
    
    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }
    
    public Room updateRoom(Long id, Room roomDetails) {
        Room room = roomRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Room not found with id: " + id));
        
        room.setName(roomDetails.getName());
        room.setCapacity(roomDetails.getCapacity());
        room.setType(roomDetails.getType());
        room.setLocation(roomDetails.getLocation());
        room.setFloor(roomDetails.getFloor());
        room.setEquipment(roomDetails.getEquipment());
        room.setIsExternal(roomDetails.getIsExternal());
        room.setPricePerHour(roomDetails.getPricePerHour());
        room.setImageUrl(roomDetails.getImageUrl());
        room.setDescription(roomDetails.getDescription());
        room.setIsAvailable(roomDetails.getIsAvailable());
        room.setNextAvailableSlot(roomDetails.getNextAvailableSlot());
        
        return roomRepository.save(room);
    }
    
    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
    
    public void updateRoomAvailability(Long id, Boolean isAvailable) {
        Room room = roomRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Room not found with id: " + id));
        
        room.setIsAvailable(isAvailable);
        roomRepository.save(room);
    }
}