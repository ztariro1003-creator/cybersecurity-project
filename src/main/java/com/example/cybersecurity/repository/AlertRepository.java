package com.example.cybersecurity.repository;

import com.example.cybersecurity.entity.Alert;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlertRepository extends JpaRepository<Alert, Integer> {
}