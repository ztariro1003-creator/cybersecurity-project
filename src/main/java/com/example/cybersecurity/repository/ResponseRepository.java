package com.example.cybersecurity.repository;

import com.example.cybersecurity.entity.Response;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResponseRepository extends JpaRepository<Response, Integer> {
}