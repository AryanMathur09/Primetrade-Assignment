package com.primetrade.assignment.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/test")
public class TestController {

    @GetMapping
    public String securedEndpoint() {
        return "You accessed a secured endpoint!";
    }
}
