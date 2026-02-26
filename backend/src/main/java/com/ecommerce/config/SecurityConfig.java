package com.ecommerce.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      // if you're using cookies/sessions for login, keep CSRF enabled for browser forms
      // but for quick testing you can temporarily disable it:
    .csrf(csrf -> csrf.disable())

    .authorizeHttpRequests(auth -> auth
        // allow frontend assets + SPA entry
        .requestMatchers("/", "/index.html", "/assets/**", "/vite.svg", "/*.css", "/*.js").permitAll()

        // allow these APIs without login (choose one)
        .requestMatchers("/api/projects", "/health").permitAll()
        // or if you want all APIs public:
        // .requestMatchers("/api/**").permitAll()

        .anyRequest().authenticated()
    )
    .formLogin(Customizer.withDefaults());

    return http.build();
}
}