package com.reservationroom.equipementservice.controller;


import com.reservationroom.equipementservice.entity.Equipement;
import com.reservationroom.equipementservice.service.EquipementService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/equipements")
@CrossOrigin(origins = "*")
public class EquipementController {

    @Autowired
    private EquipementService equipementService;

    @PostMapping
    public ResponseEntity<Equipement> create(@RequestBody Equipement equipement) {
        return ResponseEntity.ok(equipementService.createEquipement(equipement));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Equipement> update(@PathVariable Long id, @RequestBody Equipement equipement) {
        return ResponseEntity.ok(equipementService.updateEquipement(id, equipement));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        equipementService.deleteEquipement(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Equipement> getById(@PathVariable Long id) {
        return ResponseEntity.ok(equipementService.getEquipementById(id));
    }

    @GetMapping
    public ResponseEntity<List<Equipement>> getAll() {
        return ResponseEntity.ok(equipementService.getAllEquipements());
    }
}

