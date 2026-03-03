package com.ecommerce.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class CorsConfig {

  @Bean
  public CorsFilter corsFilter() {
    CorsConfiguration config = new CorsConfiguration();

    // ✅ Allow your Render frontend (add localhost for dev)
    config.setAllowedOrigins(List.of(
        "https://ecommerce-platform-thsg.onrender.com",
        "http://localhost:5173",
        "http://localhost:3000"
    ));

    // ✅ Allow common methods
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));

    // ✅ Allow headers your frontend might send
    config.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept", "Origin"));

    // ✅ Expose headers if you ever need them on frontend
    config.setExposedHeaders(List.of("Authorization"));

    // If you use cookies/sessions later, set true AND then you CANNOT use "*"
    config.setAllowCredentials(false);

    config.setMaxAge(3600L);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);

    return new CorsFilter(source);
}
}