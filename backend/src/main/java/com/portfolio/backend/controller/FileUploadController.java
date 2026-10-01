package com.portfolio.backend.controller;

import com.portfolio.backend.service.FileUploadService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/upload")
public class FileUploadController {

    private final FileUploadService fileUploadService;

    public FileUploadController(FileUploadService fileUploadService) {
        this.fileUploadService = fileUploadService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Map<String, String> uploadFile(
            @RequestParam("file") MultipartFile file) throws IOException {

        String url = fileUploadService.uploadFile(file);

        return Map.of(
                "message", "File uploaded successfully",
                "url", url
        );
    }
}