package com.example.cybersecurity.repository;

import com.example.cybersecurity.entity.Log;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogRepository extends JpaRepository<Log, Integer> {
}