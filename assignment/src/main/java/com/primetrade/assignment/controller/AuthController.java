package com.primetrade.assignment.controller;

import com.primetrade.assignment.dto.AuthResponse;
import com.primetrade.assignment.dto.LoginRequest;
import com.primetrade.assignment.dto.RegisterRequest;
import com.primetrade.assignment.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public String register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }
    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        String token = authService.login(request);
        return new AuthResponse(token); // Now it returns {"token": "your_jwt_here"}
    }
}