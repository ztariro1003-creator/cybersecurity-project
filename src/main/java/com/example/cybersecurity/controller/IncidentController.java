package com.example.cybersecurity.controller;

import com.example.cybersecurity.entity.Incident;
import com.example.cybersecurity.service.IncidentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

import java.util.List;

@RestController
@RequestMapping("/api/incidents")
@CrossOrigin(origins = "http://localhost:4200")
public class IncidentController {

    private final IncidentService incidentService;

    public IncidentController(IncidentService incidentService) {
        this.incidentService = incidentService;
    }

    @PostMapping
    public Incident createIncident(@RequestBody Incident incident) {
        return incidentService.createIncident(incident);
    }

    @GetMapping
    public List<Incident> getAllIncidents() {
        return incidentService.getAllIncidents();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Incident> getIncidentById(@PathVariable Long id) {
        return incidentService.getIncidentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PutMapping("/{id}")
public ResponseEntity<Incident> updateIncident(@PathVariable Long id, @RequestBody Incident updatedIncident) {
    try {
        Incident incident = incidentService.updateIncident(id, updatedIncident);
        return ResponseEntity.ok(incident);
    } catch (RuntimeException e) {
        return ResponseEntity.notFound().build();
    }
}
@PutMapping("/{id}/assign")
public Incident assignIncident(@PathVariable Long id, @RequestBody Map<String, String> payload) {
    String assignedTo = payload.get("assignedTo");
    return incidentService.assignIncident(id, assignedTo);
}
@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteIncident(@PathVariable Long id) {
    try {
        incidentService.deleteIncident(id);
        return ResponseEntity.noContent().build();
    } catch (RuntimeException e) {
        return ResponseEntity.notFound().build();
    }
}
}