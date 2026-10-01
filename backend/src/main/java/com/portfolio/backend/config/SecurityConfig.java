package com.portfolio.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    // =========================
    // Password Encoder
    // =========================

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    // =========================
    // CORS Configuration
    // =========================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of(
                        "http://localhost:5173",
                        "http://localhost:5174"
                )
        );

        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                List.of("*")
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }

    // =========================
    // Security Filter Chain
    // =========================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        // Disable CSRF because we are using JWT
        http.csrf(
                csrf -> csrf.disable()
        );

        // Enable CORS
        http.cors(
                cors -> cors.configurationSource(
                        corsConfigurationSource()
                )
        );

        // =========================
        // Authorization Rules
        // =========================

        http.authorizeHttpRequests(
                auth -> auth

                        // -------------------------
                        // Public Login
                        // -------------------------

                        .requestMatchers(
                                "/auth/login",
                                "/error"
                        ).permitAll()

                        // -------------------------
                        // Public GET APIs
                        // -------------------------

                        .requestMatchers(
                                HttpMethod.GET,
                                "/about/**",
                                "/skills/**",
                                "/projects/**",
                                "/blogs/**",
                                "/experiences/**",
                                "/testimonials/**",
                                "/services/**"
                        ).permitAll()

                        // -------------------------
                        // Public Contact Form
                        // -------------------------
                        // Anyone can submit
                        // a contact message.

                        .requestMatchers(
                                HttpMethod.POST,
                                "/contact",
                                "/contacts"
                        ).permitAll()

                        // -------------------------
                        // Everything Else
                        // -------------------------
                        // Admin requests require
                        // JWT authentication.

                        .anyRequest().authenticated()
        );

        // Disable default login page
        http.formLogin(
                form -> form.disable()
        );

        // Disable HTTP Basic authentication
        http.httpBasic(
                basic -> basic.disable()
        );

        // =========================
        // JWT Authentication Filter
        // =========================

        http.addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
        );

        return http.build();
    }
}