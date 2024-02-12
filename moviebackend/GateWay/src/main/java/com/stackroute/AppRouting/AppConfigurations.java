package com.stackroute.AppRouting;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration

public class AppConfigurations {
    @Bean
    RouteLocator getRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(p -> p
                        .path("/auth-app/**")
                        .uri("lb://api-AuthService"))
                .route(p -> p
                        .path("/user/**", "/movies/**")
                        .uri("lb://api-MovieService"))
                .route(p-> p
                        .path("/tvShow/**")
                        .uri("lb://api-TvShowService"))
                .route(p-> p
                        .path("/pg/**","/payUser/**")
                        .uri("lb://api-PaymentService"))
                .build();
        //This is test for git push
    }

//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200")); // Add your Angular application's origin
//        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
//        configuration.setAllowedHeaders(Arrays.asList("*"));
//        configuration.setAllowCredentials(true);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//
//        return source;
//    }
}
