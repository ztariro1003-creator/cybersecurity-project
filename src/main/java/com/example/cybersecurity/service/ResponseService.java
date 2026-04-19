package com.example.cybersecurity.service;

import com.example.cybersecurity.entity.Response;
import com.example.cybersecurity.repository.ResponseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResponseService {

    private final ResponseRepository responseRepository;

    public ResponseService(ResponseRepository responseRepository) {
        this.responseRepository = responseRepository;
    }

    public List<Response> getAllResponses() {
        return responseRepository.findAll();
    }

    public Optional<Response> getResponseById(Integer id) {
        return responseRepository.findById(id);
    }

    public Response createResponse(Response response) {
        return responseRepository.save(response);
    }

public Response updateResponse(Integer id, Response updatedResponse) {
    return responseRepository.findById(id)
            .map(existingResponse -> {

                existingResponse.setActionTaken(updatedResponse.getActionTaken());
                existingResponse.setResponseDate(updatedResponse.getResponseDate());
                existingResponse.setIncident(updatedResponse.getIncident());

                return responseRepository.save(existingResponse);
            })
            .orElseThrow(() -> new RuntimeException("Response not found with id: " + id));
}

    public void deleteResponse(Integer id) {
        responseRepository.deleteById(id);
    }
}