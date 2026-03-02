package com.ecommerce.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

@GetMapping("/")
public String home() {
    return "Backend OK ✅ Try /actuator/health or /swagger-ui/index.html";
}

@GetMapping("/health")
public String health() {
    return "ok";
}
}