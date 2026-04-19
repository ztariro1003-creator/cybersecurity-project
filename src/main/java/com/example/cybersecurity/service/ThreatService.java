package com.example.cybersecurity.service;

import com.example.cybersecurity.entity.Threat;
import com.example.cybersecurity.repository.ThreatRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ThreatService {

    private final ThreatRepository threatRepository;

    public ThreatService(ThreatRepository threatRepository) {
        this.threatRepository = threatRepository;
    }

    public List<Threat> getAllThreats() {
        return threatRepository.findAll();
    }

    public Optional<Threat> getThreatById(Integer id) {
        return threatRepository.findById(id);
    }

    public Threat createThreat(Threat threat) {
        threat.setCreated_at(LocalDateTime.now());
        return threatRepository.save(threat);
    }

    public Threat updateThreat(Integer id, Threat updatedThreat) {
        return threatRepository.findById(id)
                .map(threat -> {
                    threat.setName(updatedThreat.getName());
                    threat.setDescription(updatedThreat.getDescription());
                    threat.setSeverity_level(updatedThreat.getSeverity_level());
                    return threatRepository.save(threat);
                })
                .orElseThrow(() -> new RuntimeException("Threat not found"));
    }

    public void deleteThreat(Integer id) {
        threatRepository.deleteById(id);
    }
}