package com.portfolio.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Service
public class EmailService {

    private final RestClient restClient;

    @Value("${resend.api-key}")
    private String apiKey;

    public EmailService() {
        this.restClient = RestClient.builder()
                .baseUrl("https://api.resend.com")
                .build();
    }

    public void sendContactEmail(
            String name,
            String email,
            String subject,
            String message) {

        String emailBody =
                "<h2>New Portfolio Contact</h2>" +
                "<p><strong>Name:</strong> " + name + "</p>" +
                "<p><strong>Email:</strong> " + email + "</p>" +
                "<p><strong>Subject:</strong> " + subject + "</p>" +
                "<hr>" +
                "<p><strong>Message:</strong></p>" +
                "<p>" + message.replace("\n", "<br>") + "</p>";

        Map<String, Object> requestBody = Map.of(
                "from", "onboarding@resend.dev",
                "to", new String[]{"barathrajas093@gmail.com"},
                "subject", "New Portfolio Contact: " + subject,
                "html", emailBody
        );

        restClient.post()
                .uri("/emails")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + apiKey)
                .body(requestBody)
                .retrieve()
                .toBodilessEntity();
    }
}