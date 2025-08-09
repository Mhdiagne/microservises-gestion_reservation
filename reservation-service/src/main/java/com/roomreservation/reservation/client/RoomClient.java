package com.roomreservation.reservation.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;

@FeignClient(name = "room-service")
public interface RoomClient {

    @GetMapping("/rooms/disponibilite")
    boolean verifierDisponibiliter(@RequestParam Long roomId,
                                  @RequestParam LocalDateTime startTime,
                                  @RequestParam LocalDateTime endTime);
}
