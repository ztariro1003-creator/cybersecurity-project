package com.example.cybersecurity.service;

import com.example.cybersecurity.entity.Alert;
import com.example.cybersecurity.repository.AlertRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlertService {

    private final AlertRepository alertRepository;

    public AlertService(AlertRepository alertRepository) {
        this.alertRepository = alertRepository;
    }

    public List<Alert> getAllAlerts() {
        return alertRepository.findAll();
    }

    public Optional<Alert> getAlertById(Integer id) {
        return alertRepository.findById(id);
    }

    public Alert createAlert(Alert alert) {
        return alertRepository.save(alert);
    }

    public Alert updateAlert(Integer id, Alert updatedAlert) {
    return alertRepository.findById(id)
            .map(existingAlert -> {

                existingAlert.setAlertMessage(updatedAlert.getAlertMessage());
                existingAlert.setCreatedAt(updatedAlert.getCreatedAt());
                existingAlert.setIncident(updatedAlert.getIncident());

                return alertRepository.save(existingAlert);
            })
            .orElseThrow(() -> new RuntimeException("Alert not found with id: " + id));
}

    public void deleteAlert(Integer id) {
        alertRepository.deleteById(id);
    }
}