package com.example.cybersecurity.controller;

import com.example.cybersecurity.entity.Response;
import com.example.cybersecurity.service.ResponseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/responses")
@CrossOrigin(origins = "http://localhost:4200")
public class ResponseController {

    private final ResponseService responseService;

    public ResponseController(ResponseService responseService) {
        this.responseService = responseService;
    }

    @GetMapping
    public List<Response> getAllResponses() {
        return responseService.getAllResponses();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response> getResponseById(@PathVariable Integer id) {
        return responseService.getResponseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Response createResponse(@RequestBody Response response) {
        return responseService.createResponse(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Response> updateResponse(@PathVariable Integer id, @RequestBody Response response) {
        try {
            Response updatedResponse = responseService.updateResponse(id, response);
            return ResponseEntity.ok(updatedResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResponse(@PathVariable Integer id) {
        responseService.deleteResponse(id);
        return ResponseEntity.noContent().build();
    }
}