package com.roomreservation.reservation.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.util.List;

@FeignClient(name = "equipement-service", url = "http://equipement-service:8080")
public interface EquipementClient {

    @PostMapping("/equipements/reserver")
    void reserverEquipements(@RequestBody List<Long> equipementIds);

    @GetMapping("/equipements/disponibilite")
    boolean verifierDisponibilite(@RequestParam List<Long> equipementIds,
                                  @RequestParam LocalDateTime startTime,
                                  @RequestParam LocalDateTime endTime);
}
