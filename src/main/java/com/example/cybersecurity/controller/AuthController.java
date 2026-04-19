package com.example.cybersecurity.controller;

import com.example.cybersecurity.entity.LoginRequest;
import com.example.cybersecurity.entity.LoginResponse;
import com.example.cybersecurity.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        String username = request.getUsername();
        String password = request.getPassword();

        if ("admin".equals(username) && "admin123".equals(password)) {
            String token = jwtUtil.generateToken(username);
            return ResponseEntity.ok(new LoginResponse(token, username, "ADMIN"));
        }

        if ("analyst".equals(username) && "analyst123".equals(password)) {
            String token = jwtUtil.generateToken(username);
            return ResponseEntity.ok(new LoginResponse(token, username, "ANALYST"));
        }

        if ("viewer".equals(username) && "viewer123".equals(password)) {
            String token = jwtUtil.generateToken(username);
            return ResponseEntity.ok(new LoginResponse(token, username, "VIEWER"));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Invalid username or password");
    }
}