package com.example.cybersecurity.repository;

import com.example.cybersecurity.entity.Threat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThreatRepository extends JpaRepository<Threat, Integer> {
}