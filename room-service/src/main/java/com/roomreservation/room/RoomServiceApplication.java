package com.roomreservation.room;

import com.roomreservation.room.entity.Room;
import com.roomreservation.room.repository.RoomRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
@EnableDiscoveryClient
public class RoomServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(RoomServiceApplication.class, args);
    }

    @Bean
    public CommandLineRunner loadData(RoomRepository roomRepo) {
        return args -> {
            // === ROOMS ===
            Room room1 = new Room();
            room1.setName("Executive Conference Room");
            room1.setCapacity(12);
            room1.setType(Room.RoomType.CONFERENCE);
            room1.setLocation("Building A");
            room1.setFloor(5);
            room1.setEquipment(Arrays.asList("Projector", "Video Conference", "Whiteboard", "Coffee Machine"));
            room1.setImageUrl("https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg");
            room1.setDescription("Premium conference room with city views and state-of-the-art equipment.");
            room1.setCreatedAt(LocalDateTime.now());
            room1.setUpdatedAt(LocalDateTime.now());

            Room room2 = new Room();
            room2.setName("Small Meeting Room");
            room2.setCapacity(4);
            room2.setType(Room.RoomType.MEETING);
            room2.setLocation("Building B");
            room2.setFloor(2);
            room2.setEquipment(Arrays.asList("Whiteboard"));
            room2.setImageUrl("https://images.pexels.com/photos/1181400/pexels-photo-1181400.jpeg");
            room2.setDescription("Cozy meeting room perfect for quick stand-ups.");
            room2.setCreatedAt(LocalDateTime.now());
            room2.setUpdatedAt(LocalDateTime.now());

            Room room3 = new Room();
            room3.setName("Training Room");
            room3.setCapacity(25);
            room3.setType(Room.RoomType.TRAINING);
            room3.setLocation("Building C");
            room3.setFloor(1);
            room3.setEquipment(Arrays.asList("Projector", "Microphones", "Whiteboard", "Desks"));
            room3.setImageUrl("https://images.pexels.com/photos/1181410/pexels-photo-1181410.jpeg");
            room3.setDescription("Spacious room ideal for workshops and training sessions.");
            room3.setCreatedAt(LocalDateTime.now());
            room3.setUpdatedAt(LocalDateTime.now());

            Room room4 = new Room();
            room4.setName("Innovation Hub");
            room4.setCapacity(15);
            room4.setType(Room.RoomType.CONFERENCE);
            room4.setLocation("Building D");
            room4.setFloor(3);
            room4.setEquipment(Arrays.asList("Smartboard", "3D Printer", "Video Conference"));
            room4.setIsExternal(true);
            room4.setPricePerHour(50.0);
            room4.setImageUrl("https://images.pexels.com/photos/1181411/pexels-photo-1181411.jpeg");
            room4.setDescription("Creative space for brainstorming and prototyping.");
            room4.setIsAvailable(true);
            room4.setCreatedAt(LocalDateTime.now());
            room4.setUpdatedAt(LocalDateTime.now());

            Room room5 = new Room();
            room5.setName("Open Collaboration Space");
            room5.setCapacity(10);
            room5.setType(Room.RoomType.MEETING);
            room5.setLocation("Building E");
            room5.setFloor(1);
            room5.setEquipment(Arrays.asList("Whiteboard", "Mobile Monitor", "Coffee Machine"));
            room5.setIsExternal(false);
            room5.setPricePerHour(30.0);
            room5.setImageUrl("https://images.pexels.com/photos/1181412/pexels-photo-1181412.jpeg");
            room5.setDescription("Open space for informal meetings and teamwork.");
            room5.setIsAvailable(true);
            room5.setCreatedAt(LocalDateTime.now());
            room5.setUpdatedAt(LocalDateTime.now());

            Room room6 = new Room();
            room6.setName("Board Room");
            room6.setCapacity(20);
            room6.setType(Room.RoomType.CONFERENCE);
            room6.setLocation("Building F");
            room6.setFloor(6);
            room6.setEquipment(Arrays.asList("Large Screen", "Teleconferencing", "Private Catering"));
            room6.setIsExternal(false);
            room6.setPricePerHour(75.0);
            room6.setImageUrl("https://images.pexels.com/photos/1181413/pexels-photo-1181413.jpeg");
            room6.setDescription("High-end boardroom for executive meetings.");
            room6.setIsAvailable(true);
            room6.setCreatedAt(LocalDateTime.now());
            room6.setUpdatedAt(LocalDateTime.now());

            Room room7 = new Room();
            room7.setName("Quiet Focus Room");
            room7.setCapacity(2);
            room7.setType(Room.RoomType.MEETING);
            room7.setLocation("Building G");
            room7.setFloor(4);
            room7.setEquipment(Arrays.asList("Desk Lamp", "Ergonomic Chair"));
            room7.setIsExternal(false);
            room7.setPricePerHour(null);
            room7.setImageUrl("https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg");
            room7.setDescription("Private space designed for deep work and concentration.");
            room7.setIsAvailable(true);
            room7.setCreatedAt(LocalDateTime.now());
            room7.setUpdatedAt(LocalDateTime.now());

            Room room8 = new Room();
            room8.setName("Virtual Meeting Booth");
            room8.setCapacity(1);
            room8.setType(Room.RoomType.MEETING);
            room8.setLocation("Building H");
            room8.setFloor(1);
            room8.setEquipment(Arrays.asList("High-speed Internet", "Noise-cancelling Headset"));
            room8.setIsExternal(true);
            room8.setPricePerHour(20.0);
            room8.setImageUrl("https://images.pexels.com/photos/5212313/pexels-photo-5212313.jpeg");
            room8.setDescription("Compact booth for virtual calls and webinars.");
            room8.setIsAvailable(true);
            room8.setCreatedAt(LocalDateTime.now());
            room8.setUpdatedAt(LocalDateTime.now());

            Room room9 = new Room();
            room9.setName("Workshop Lab");
            room9.setCapacity(30);
            room9.setType(Room.RoomType.CONFERENCE);
            room9.setLocation("Building I");
            room9.setFloor(2);
            room9.setEquipment(Arrays.asList("3D Printers", "Soldering Stations", "Tool Rack"));
            room9.setIsExternal(true);
            room9.setPricePerHour(60.0);
            room9.setImageUrl("https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg");
            room9.setDescription("Equipped lab space for hands-on workshops and prototyping.");
            room9.setIsAvailable(false);
            room9.setCreatedAt(LocalDateTime.now());
            room9.setUpdatedAt(LocalDateTime.now());

            roomRepo.saveAll(List.of(
                    room1, room2, room3,
                    room4, room5, room6,
                    room7, room8, room9
            ));

        };
    }

}