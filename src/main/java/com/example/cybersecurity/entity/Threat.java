package com.example.cybersecurity.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "threats")
public class Threat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer threat_id;

    private String name;

    private String description;

    private String severity_level;

    private LocalDateTime created_at;

    public Threat() {
    }

    public Threat(Integer threat_id, String name, String description, String severity_level, LocalDateTime created_at) {
        this.threat_id = threat_id;
        this.name = name;
        this.description = description;
        this.severity_level = severity_level;
        this.created_at = created_at;
    }

    public Integer getThreat_id() {
        return threat_id;
    }

    public void setThreat_id(Integer threat_id) {
        this.threat_id = threat_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSeverity_level() {
        return severity_level;
    }

    public void setSeverity_level(String severity_level) {
        this.severity_level = severity_level;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }
}