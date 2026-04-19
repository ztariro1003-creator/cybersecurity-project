package com.example.cybersecurity.service;

import com.example.cybersecurity.entity.Log;
import com.example.cybersecurity.repository.LogRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LogService {

    private final LogRepository logRepository;

    public LogService(LogRepository logRepository) {
        this.logRepository = logRepository;
    }

    public List<Log> getAllLogs() {
        return logRepository.findAll();
    }

    public Optional<Log> getLogById(Integer id) {
        return logRepository.findById(id);
    }

    public Log createLog(Log log) {
        return logRepository.save(log);
    }

    public Log updateLog(Integer id, Log updatedLog) {
        return logRepository.findById(id)
                .map(existingLog -> {
                    existingLog.setLogData(updatedLog.getLogData());
                    existingLog.setTimestamp(updatedLog.getTimestamp());
                    existingLog.setIncident(updatedLog.getIncident());
                    return logRepository.save(existingLog);
                })
                .orElseThrow(() -> new RuntimeException("Log not found with id: " + id));
    }

    public void deleteLog(Integer id) {
        logRepository.deleteById(id);
    }
}