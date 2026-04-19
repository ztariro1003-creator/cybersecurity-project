package com.example.cybersecurity.repository;

import com.example.cybersecurity.entity.Asset;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssetRepository extends JpaRepository<Asset, Integer> {
}