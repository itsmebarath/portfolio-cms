package com.portfolio.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class FileUploadService {

    @Value("${supabase.url}")
    private String supabaseUrl;

    @Value("${supabase.service-key}")
    private String serviceKey;

    @Value("${supabase.bucket}")
    private String bucket;

    private final RestClient restClient = RestClient.create();

    public String uploadFile(MultipartFile file) throws IOException {

        // Create unique file name
        String fileName = UUID.randomUUID() + "-" + file.getOriginalFilename();

        // Supabase Storage URL
        String uploadUrl = supabaseUrl
                + "/storage/v1/object/"
                + bucket
                + "/"
                + fileName;

        // Upload file
        restClient.put()
                .uri(uploadUrl)
                .header("Authorization", "Bearer " + serviceKey)
                .header("apikey", serviceKey)
                .contentType(
                        MediaType.parseMediaType(file.getContentType())
                )
                .body(file.getBytes())
                .retrieve()
                .toBodilessEntity();

        // Public URL
        return supabaseUrl
                + "/storage/v1/object/public/"
                + bucket
                + "/"
                + fileName;
    }
}