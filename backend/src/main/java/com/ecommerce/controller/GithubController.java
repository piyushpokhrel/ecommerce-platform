package com.ecommerce.controller;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.*;

@RestController
@RequestMapping("/api")
public class GithubController {

    @GetMapping("/projects")
    public List<Map<String, Object>> getProjects() {
        String username = System.getenv("GITHUB_USERNAME");
        if (username == null || username.isBlank()) {
            throw new RuntimeException("Missing GITHUB_USERNAME");
        }

        URI uri = UriComponentsBuilder
    .fromUriString("https://api.github.com/users/{username}/repos")
    .queryParam("per_page", 100)
    .queryParam("sort", "updated")
    .buildAndExpand(username)
    .toUri();

        RestTemplate restTemplate = new RestTemplate();
        RequestEntity<Void> request = RequestEntity.get(uri).build();

        ResponseEntity<List<Map<String, Object>>> response =
                restTemplate.exchange(request, new ParameterizedTypeReference<>() {});

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
            projects.add(project);
        }
        return projects;
    }
}