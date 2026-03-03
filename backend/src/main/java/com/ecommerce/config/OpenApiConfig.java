package com.ecommerce.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "Ecommerce API",
        version = "v1",
        description = "Backend API for the Ecommerce Platform"
    ),
    servers = {
        @Server(
            url = "https://portfolio-visit.onrender.com",
            description = "Production Server (Render)"
        )
    }
)
public class OpenApiConfig {
}