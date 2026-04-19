package com.example.cybersecurity.controller;

import com.example.cybersecurity.entity.Log;
import com.example.cybersecurity.service.LogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/logs")
@CrossOrigin(origins = "http://localhost:4200")
public class LogController {

    private final LogService logService;

    public LogController(LogService logService) {
        this.logService = logService;
    }

    @GetMapping
    public List<Log> getAllLogs() {
        return logService.getAllLogs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Log> getLogById(@PathVariable Integer id) {
        return logService.getLogById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Log createLog(@RequestBody Log log) {
        return logService.createLog(log);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Log> updateLog(@PathVariable Integer id, @RequestBody Log log) {
        try {
            Log updatedLog = logService.updateLog(id, log);
            return ResponseEntity.ok(updatedLog);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLog(@PathVariable Integer id) {
        logService.deleteLog(id);
        return ResponseEntity.noContent().build();
    }
}