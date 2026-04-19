package com.example.cybersecurity.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AiController {

    @GetMapping("/api/ai/predict")
    public Map<String, String> predictRisk(
            @RequestParam String severity,
            @RequestParam String status) {

        Map<String, String> response = new HashMap<>();

        try {
            ProcessBuilder processBuilder = new ProcessBuilder(
                    "python",
                    "ai_risk_prediction.py",
                    severity,
                    status
            );

            processBuilder.directory(new java.io.File("."));
            Process process = processBuilder.start();

            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream())
            );

            String prediction = reader.readLine();
            process.waitFor();

            response.put("severity", severity);
            response.put("status", status);
            response.put("predictedRisk", prediction != null ? prediction : "Unknown");

        } catch (Exception e) {
            response.put("error", e.getMessage());
        }

        return response;
    }
}