package com.ecommerce.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.*;

@RestController
@RequestMapping("/api")
@Tag(name = "GitHub", description = "GitHub integration endpoints")
public class GithubController {

    private final RestTemplate restTemplate;

    public GithubController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping("/github/{username}/repos")
    @Operation(summary = "Fetch public GitHub repositories for a user")
    public List<Map<String, Object>> getReposForUser(
            @Parameter(description = "GitHub username") @PathVariable String username) {

        String u = (username == null) ? "" : username.trim();
        if (u.isEmpty()) {
            throw new IllegalArgumentException("Missing username");
        }

        URI uri = UriComponentsBuilder
                .fromUriString("https://api.github.com/users/{username}/repos")
                .queryParam("per_page", 100)
                .queryParam("sort", "updated")
                .buildAndExpand(u)
                .encode()
                .toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
        headers.set("User-Agent", "portfolio-visit");
        RequestEntity<Void> request = RequestEntity.get(uri).headers(headers).build();

        ResponseEntity<List<Map<String, Object>>> response =
                restTemplate.exchange(
                        request,
                        new ParameterizedTypeReference<List<Map<String, Object>>>() {}
                );

        List<Map<String, Object>> repos = Optional.ofNullable(response.getBody())
                .orElseGet(Collections::emptyList);

        List<Map<String, Object>> projects = new ArrayList<>();
        for (Map<String, Object> repo : repos) {
            Map<String, Object> project = new HashMap<>();
            project.put("id", repo.get("id"));
            project.put("name", repo.get("name"));
            project.put("description", repo.get("description"));
            project.put("stars", repo.get("stargazers_count"));
            project.put("forks", repo.get("forks_count"));
            project.put("url", repo.get("html_url"));
            project.put("language", repo.get("language"));
            project.put("updatedAt", repo.get("updated_at"));
            projects.add(project);
        }

        return projects;
    }
}
