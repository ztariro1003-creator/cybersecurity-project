package com.example.cybersecurity.repository;

import com.example.cybersecurity.entity.Incident;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IncidentRepository extends JpaRepository<Incident, Long> {
      List<Incident> findBySeverity(String severity);
}