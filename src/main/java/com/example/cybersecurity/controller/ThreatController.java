package com.example.cybersecurity.controller;

import com.example.cybersecurity.entity.Threat;
import com.example.cybersecurity.service.ThreatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/threats")
@CrossOrigin(origins = "http://localhost:4200")
public class ThreatController {

    private final ThreatService threatService;

    public ThreatController(ThreatService threatService) {
        this.threatService = threatService;
    }

    @GetMapping
    public List<Threat> getAllThreats() {
        return threatService.getAllThreats();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Threat> getThreatById(@PathVariable Integer id) {
        return threatService.getThreatById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Threat createThreat(@RequestBody Threat threat) {
        return threatService.createThreat(threat);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Threat> updateThreat(@PathVariable Integer id, @RequestBody Threat threat) {
        try {
            Threat updatedThreat = threatService.updateThreat(id, threat);
            return ResponseEntity.ok(updatedThreat);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteThreat(@PathVariable Integer id) {
        threatService.deleteThreat(id);
        return ResponseEntity.noContent().build();
    }
}