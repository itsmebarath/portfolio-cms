package com.portfolio.backend.config;

import com.portfolio.backend.service.JwtService;

import io.jsonwebtoken.Claims;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {

    private final JwtService jwtService;

    public JwtAuthenticationFilter(
            JwtService jwtService) {

        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getServletPath();
        String method = request.getMethod();

        // ==========================================
        // PUBLIC ENDPOINTS
        // ==========================================

        boolean publicRequest =
                path.equals("/auth/login")

                // Public GET APIs
                || (
                    method.equals("GET")
                    &&
                    (
                        path.startsWith("/about")
                        || path.startsWith("/skills")
                        || path.startsWith("/projects")
                        || path.startsWith("/blogs")
                        || path.startsWith("/experiences")
                        || path.startsWith("/testimonials")
                        || path.startsWith("/services")
                    )
                )

                // Public contact form
                || (
                    method.equals("POST")
                    &&
                    (path.equals("/contact") || path.equals("/contacts"))
                );

        // ==========================================
        // SKIP JWT FOR PUBLIC REQUESTS
        // ==========================================

        if (publicRequest) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }

        // ==========================================
        // GET AUTHORIZATION HEADER
        // ==========================================

        String authHeader =
                request.getHeader("Authorization");

        // No JWT token
        if (
                authHeader == null
                ||
                !authHeader.startsWith("Bearer ")
        ) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }

        // ==========================================
        // EXTRACT TOKEN
        // ==========================================

        String token =
                authHeader.substring(7);

        try {

            Claims claims =
                    jwtService.extractClaims(token);

            String email =
                    claims.getSubject();

            String role =
                    claims.get(
                            "role",
                            String.class
                    );

            // ==========================================
            // CREATE AUTHENTICATION
            // ==========================================

            UsernamePasswordAuthenticationToken
                    authentication =
                    new UsernamePasswordAuthenticationToken(
                            email,
                            null,
                            List.of(
                                    new SimpleGrantedAuthority(
                                            "ROLE_" + role
                                    )
                            )
                    );

            SecurityContextHolder
                    .getContext()
                    .setAuthentication(
                            authentication
                    );

        } catch (Exception e) {

            response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED
            );

            return;
        }

        // ==========================================
        // CONTINUE REQUEST
        // ==========================================

        filterChain.doFilter(
                request,
                response
        );
    }
}