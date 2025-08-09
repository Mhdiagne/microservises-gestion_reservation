package com.reservationroom.equipementservice;

import com.reservationroom.equipementservice.entity.Equipement;
import com.reservationroom.equipementservice.repository.EquipementRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;
import java.util.List;

@EnableDiscoveryClient
@SpringBootApplication
public class EquipementServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EquipementServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(EquipementRepository equipementRepository) {
		return args -> {
			Equipement e1 = Equipement.builder()
					.nom("Projecteur Epson")
					.type("Audio-Visuel")
					.quantite(3)
					.disponibilite(true)
					.localisation("Salle 101")
					.dateAjout(LocalDateTime.of(2024, 5, 10, 9, 0))
					.build();

			Equipement e2 = Equipement.builder()
					.nom("Tableau Blanc")
					.type("Papeterie")
					.quantite(5)
					.disponibilite(true)
					.localisation("Salle 202")
					.dateAjout(LocalDateTime.of(2023, 12, 15, 14, 30))
					.build();

			Equipement e3 = Equipement.builder()
					.equipementId(3L)
					.nom("Microphone Sans Fil")
					.type("Audio")
					.quantite(10)
					.disponibilite(true)
					.localisation("Salle de conférence")
					.dateAjout(LocalDateTime.of(2025, 1, 5, 11, 15))
					.build();

			Equipement e4 = Equipement.builder()
					.equipementId(4L)
					.nom("Ordinateur Portable")
					.type("Informatique")
					.quantite(7)
					.disponibilite(false)
					.localisation("Bureau IT")
					.dateAjout(LocalDateTime.of(2024, 8, 1, 10, 0))
					.build();

			Equipement e5 = Equipement.builder()
					.equipementId(5L)
					.nom("Clé HDMI")
					.type("Accessoire")
					.quantite(20)
					.disponibilite(true)
					.localisation("Salle 305")
					.dateAjout(LocalDateTime.of(2023, 11, 20, 9, 45))
					.build();

			equipementRepository.saveAll(List.of(e1, e2, e3, e4, e5));
		};
	}
}
