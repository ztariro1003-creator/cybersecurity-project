package com.example.cybersecurity.service;

import com.example.cybersecurity.entity.Incident;
import com.example.cybersecurity.repository.IncidentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IncidentService {

    private final IncidentRepository incidentRepository;

    public IncidentService(IncidentRepository incidentRepository) {
        this.incidentRepository = incidentRepository;
    }

    public List<Incident> getAllIncidents() {
        return incidentRepository.findAll();
    }

    public Optional<Incident> getIncidentById(Long id) {
        return incidentRepository.findById(id);
    }

    public Incident createIncident(Incident incident) {
        return incidentRepository.save(incident);
    }

    public Incident updateIncident(Long id, Incident updatedIncident) {
        return incidentRepository.findById(id)
                .map(existingIncident -> {
                    existingIncident.setTitle(updatedIncident.getTitle());
                    existingIncident.setDescription(updatedIncident.getDescription());
                    existingIncident.setSeverity(updatedIncident.getSeverity());
                    existingIncident.setStatus(updatedIncident.getStatus());
                    existingIncident.setDate(updatedIncident.getDate());
                    existingIncident.setAssignedTo(updatedIncident.getAssignedTo());
                    return incidentRepository.save(existingIncident);
                })
                .orElseThrow(() -> new RuntimeException("Incident not found with id: " + id));
    }

    public void deleteIncident(Long id) {
        incidentRepository.deleteById(id);
    }

    public Incident assignIncident(Long id, String assignedTo) {
        Incident incident = incidentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Incident not found"));

        incident.setAssignedTo(assignedTo);
        return incidentRepository.save(incident);
    }

    public List<Incident> getIncidentsBySeverity(String severity) {
        return incidentRepository.findBySeverity(severity);
    }
}