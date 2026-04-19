package com.example.cybersecurity.service;

import com.example.cybersecurity.entity.Asset;
import com.example.cybersecurity.repository.AssetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

@Service
public class AssetService {

    private final AssetRepository assetRepository;

    public AssetService(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    public List<Asset> getAllAssets() {
        return assetRepository.findAll();
    }

    public Optional<Asset> getAssetById(Integer id) {
        return assetRepository.findById(id);
    }

    public Asset createAsset(Asset asset) {
        asset.setCreated_at(LocalDateTime.now());
        return assetRepository.save(asset);
    }

    public Asset updateAsset(Integer id, Asset updatedAsset) {
        return assetRepository.findById(id)
                .map(asset -> {
                    asset.setAsset_name(updatedAsset.getAsset_name());
                    asset.setAsset_type(updatedAsset.getAsset_type());
                    asset.setLocation(updatedAsset.getLocation());
                    return assetRepository.save(asset); 
                })
                .orElseThrow(() -> new RuntimeException("Asset not found"));
    }

    public void deleteAsset(Integer id) {
        assetRepository.deleteById(id);
    }
}