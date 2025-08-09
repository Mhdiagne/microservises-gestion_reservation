package com.reservationroom.equipementservice.service;

import com.reservationroom.equipementservice.entity.Equipement;
import com.reservationroom.equipementservice.repository.EquipementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EquipementService {

    private final EquipementRepository equipementRepository;

    public Equipement createEquipement(Equipement equipement) {
        return equipementRepository.save(equipement);
    }

    public Equipement updateEquipement(Long id, Equipement equipement) {
        Equipement existing = equipementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Equipement non trouvé"));

        existing.setNom(equipement.getNom());
        existing.setType(equipement.getType());
        existing.setQuantite(equipement.getQuantite());
        existing.setDisponibilite(equipement.getDisponibilite());
        existing.setLocalisation(equipement.getLocalisation());

        return equipementRepository.save(existing);
    }

    public void deleteEquipement(Long id) {
        equipementRepository.deleteById(id);
    }

    public Equipement getEquipementById(Long id) {
        return equipementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Equipement non trouvé"));
    }

    public List<Equipement> getAllEquipements() {
        return equipementRepository.findAll();
    }
}

