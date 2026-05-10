package com.ecommerce.controller;

import com.ecommerce.dto.Project;
import com.ecommerce.entity.Product;
import com.ecommerce.repository.ProductRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProductRepository productRepository;

    public ProjectController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping
    public List<Project> getProjects() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(this::mapToProject)
                .collect(Collectors.toList());
    }

    private Project mapToProject(Product product) {
        String status = Boolean.TRUE.equals(product.getActive()) ? "active" : "archived";
        String startDate = product.getCreatedAt() != null
            ? product.getCreatedAt().toString()
            : null;

        return new Project(
            Objects.toString(product.getId(), null),
            product.getName(),
            product.getDescription(),
            status,
            "medium",
            List.of(product.getCategory()),
            50,
            startDate,
            null,
            1,
            null,
            product.getImageUrl(),
            null
        );
    }
}
