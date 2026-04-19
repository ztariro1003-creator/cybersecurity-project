package com.example.cybersecurity.service;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;

@Service
public class AiPredictionService {

    public String predictRisk(String severity, String status) {
        try {
            String projectRoot = System.getProperty("user.dir");
            String scriptPath = projectRoot + File.separator + "ai_risk_prediction.py";
            String pythonPath = projectRoot + File.separator + ".venv" + File.separator + "scripts" + File.separator + "python.exe";

            ProcessBuilder processBuilder = new ProcessBuilder(
                    pythonPath,
                    scriptPath,
                    severity,
                    status
            );

            processBuilder.redirectErrorStream(true);
            Process process = processBuilder.start();

            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream())
            );
String line;
String lastUsefulLine = null;
            
            while ((line = reader.readLine()) != null) {
                line = line.trim();
                if (!line.isBlank() && !
                    line.contains("Userwarning") && ! 
                line.contains("Failed to initalize NumPy"))  {
                    lastUsefulLine = line;
                }
            }
int exitCode = process.waitFor();
            if (exitCode == 0 && lastUsefulLine != null){
                return lastUsefulLine;
            } else {
                return "Prediction failed";
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "Prediction failed";
        }
    }
}