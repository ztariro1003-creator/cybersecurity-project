package com.example.cybersecurity.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "assets")
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer asset_id;

    private String asset_name;
    private String asset_type;
    private String location;
    private LocalDateTime created_at;

    public Asset() {
    }

    public Asset(Integer asset_id, String asset_name, String asset_type, String location, LocalDateTime created_at) {
        this.asset_id = asset_id;
        this.asset_name = asset_name;
        this.asset_type = asset_type;
        this.location = location;
        this.created_at = created_at;
    }

    public Integer getAsset_id() {
        return asset_id;
    }

    public void setAsset_id(Integer asset_id) {
        this.asset_id = asset_id;
    }

    public String getAsset_name() {
        return asset_name;
    }

    public void setAsset_name(String asset_name) {
        this.asset_name = asset_name;
    }

    public String getAsset_type() {
        return asset_type;
    }

    public void setAsset_type(String asset_type) {
        this.asset_type = asset_type;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }
}