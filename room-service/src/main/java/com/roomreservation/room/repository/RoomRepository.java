package com.roomreservation.room.repository;

import com.roomreservation.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByType(Room.RoomType type);
    List<Room> findByLocation(String location);
    List<Room> findByCapacityGreaterThanEqual(Integer capacity);
    List<Room> findByIsAvailable(Boolean isAvailable);
    
    @Query("SELECT r FROM Room r WHERE r.name LIKE %:keyword% OR r.description LIKE %:keyword%")
    List<Room> findByKeyword(@Param("keyword") String keyword);
    
    @Query("SELECT r FROM Room r WHERE " +
           "(:type IS NULL OR r.type = :type) AND " +
           "(:location IS NULL OR r.location = :location) AND " +
           "(:minCapacity IS NULL OR r.capacity >= :minCapacity) AND " +
           "(:isAvailable IS NULL OR r.isAvailable = :isAvailable)")
    List<Room> findByFilters(@Param("type") Room.RoomType type,
                            @Param("location") String location,
                            @Param("minCapacity") Integer minCapacity,
                            @Param("isAvailable") Boolean isAvailable);
}