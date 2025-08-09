package com.reservationroom.equipementservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "equipements")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Equipement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long equipementId;

    private String nom;

    private String type;

    private Integer quantite;

    private Boolean disponibilite;

    private String localisation; // Ajout pour savoir où se trouve l'équipement

    private LocalDateTime dateAjout; // Historique

}
