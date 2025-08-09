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
            room1.setName("Salle Conference ");
            room1.setCapacity(12);
            room1.setType(Room.RoomType.CONFERENCE);
            room1.setLocation("Building A");
            room1.setFloor(5);
            room1.setEquipment(Arrays.asList("Projector",  "Coffee Machine"));
            room1.setImageUrl("https://image.workin.space/wijpeg-5u5wa9krufhkfnu1qor3m8o0c/file.jpg");
            room1.setDescription("Salle reservé aux conférences !");
            room1.setCreatedAt(LocalDateTime.now());
            room1.setUpdatedAt(LocalDateTime.now());

            Room room2 = new Room();
            room2.setName("Salle Meeting ");
            room2.setIsAvailable(false);
            room2.setCapacity(4);
            room2.setType(Room.RoomType.MEETING);
            room2.setLocation("Building B");
            room2.setFloor(25);
            room2.setEquipment(Arrays.asList("Whiteboard", "Desk"));
            room2.setImageUrl("https://www.concept-bureau.fr/img/cms/blog/salle-de-reunion.jpg");
            room2.setDescription("Salle reservé aux meetings !");
            room2.setCreatedAt(LocalDateTime.now());
            room2.setUpdatedAt(LocalDateTime.now());

            Room room3 = new Room();
            room3.setName("Salle Java 1");
            room3.setCapacity(6);
            room3.setType(Room.RoomType.TRAINING);
            room3.setLocation("Building C");
            room3.setFloor(1);
            room3.setEquipment(Arrays.asList("Projector", "Microphones"));
            room3.setImageUrl("https://www.concept-bureau.fr/modules/prestablog/views/img/grid-for-1-7/up-img/243.jpg");
            room3.setDescription("Salle Java 1 des devs !");
            room3.setCreatedAt(LocalDateTime.now());
            room3.setUpdatedAt(LocalDateTime.now());

            Room room4 = new Room();
            room4.setName("Innovation Hub");
            room4.setCapacity(15);
            room4.setType(Room.RoomType.CONFERENCE);
            room4.setLocation("Building D");
            room4.setFloor(3);
            room4.setEquipment(Arrays.asList("Smartboard", "3D Printer"));
            room4.setIsExternal(true);
            room4.setPricePerHour(50.0);
            room4.setImageUrl("https://www.ringcentral.com/fr/fr/blog/wp-content/uploads/2024/01/Configuration-de-la-salle-de-conference-scaled.jpg");
            room4.setDescription("Salle Creative space !");
            room4.setIsAvailable(true);
            room4.setCreatedAt(LocalDateTime.now());
            room4.setUpdatedAt(LocalDateTime.now());

            Room room5 = new Room();
            room5.setName("Open Collaboration Space");
            room5.setCapacity(10);
            room5.setIsAvailable(false);
            room5.setType(Room.RoomType.MEETING);
            room5.setLocation("Building E");
            room5.setFloor(1);
            room5.setEquipment(Arrays.asList("Whiteboard",  "Coffee Machine"));
            room5.setIsExternal(false);
            room5.setPricePerHour(30.0);
            room5.setImageUrl("https://cdn.prod.website-files.com/62dededd49f7ef4222242889/62f82c1c5d479b0a132cda80_r%C3%A9union.jpg");
            room5.setDescription("Meetings and Teamwork !");
            room5.setCreatedAt(LocalDateTime.now());
            room5.setUpdatedAt(LocalDateTime.now());

            Room room6 = new Room();
            room6.setName("Salle Python");
            room6.setCapacity(20);
            room6.setType(Room.RoomType.CONFERENCE);
            room6.setLocation("Building F");
            room6.setFloor(6);
            room6.setEquipment(Arrays.asList("Large Screen", "Teleconferencing"));
            room6.setIsExternal(false);
            room6.setPricePerHour(75.0);
            room6.setImageUrl("https://image.workin.space/wijpeg-148vgihnftwtoj559ac6f6kkb/file.jpg");
            room6.setDescription("Salle Conference Prime !");
            room6.setIsAvailable(true);
            room6.setCreatedAt(LocalDateTime.now());
            room6.setUpdatedAt(LocalDateTime.now());


            roomRepo.saveAll(List.of(
                    room1, room2, room3,
                    room4, room5, room6
            ));

        };
    }

}