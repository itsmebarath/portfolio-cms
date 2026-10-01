package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ExperienceRequest;
import com.portfolio.backend.entity.Experience;
import com.portfolio.backend.service.ExperienceService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/experiences")
public class ExperienceController {

    private final ExperienceService experienceService;

    public ExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    // CREATE
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Experience createExperience(
            @RequestBody ExperienceRequest request) {

        return experienceService.createExperience(request);
    }

    // READ ALL
    @GetMapping
    public List<Experience> getAllExperiences() {

        return experienceService.getAllExperiences();
    }

    // READ ONE
    @GetMapping("/{id}")
    public Experience getExperienceById(
            @PathVariable Long id) {

        return experienceService.getExperienceById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Experience updateExperience(
            @PathVariable Long id,
            @RequestBody ExperienceRequest request) {

        return experienceService.updateExperience(id, request);
    }

    // DELETE
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteExperience(
            @PathVariable Long id) {

        experienceService.deleteExperience(id);
    }
}