package com.reservationroom.equipementservice.repository;

import com.reservationroom.equipementservice.entity.Equipement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EquipementRepository extends JpaRepository<Equipement, Long> {
    // On peut ajouter des méthodes custom si nécessaire
}
