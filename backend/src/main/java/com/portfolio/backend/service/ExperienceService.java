package com.portfolio.backend.service;

import com.portfolio.backend.dto.ExperienceRequest;
import com.portfolio.backend.entity.Experience;
import com.portfolio.backend.repository.ExperienceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperienceService {

    private final ExperienceRepository experienceRepository;

    public ExperienceService(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    // CREATE
    public Experience createExperience(ExperienceRequest request) {

        Experience experience = new Experience();

        experience.setCompany(request.getCompany());
        experience.setRole(request.getRole());
        experience.setDescription(request.getDescription());
        experience.setStartDate(request.getStartDate());
        experience.setEndDate(request.getEndDate());
        experience.setLocation(request.getLocation());

        return experienceRepository.save(experience);
    }

    // READ ALL
    public List<Experience> getAllExperiences() {
        return experienceRepository.findAll();
    }

    // READ ONE
    public Experience getExperienceById(Long id) {

        return experienceRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Experience not found with id: " + id
                        ));
    }

    // UPDATE
    public Experience updateExperience(
            Long id,
            ExperienceRequest request) {

        Experience experience = getExperienceById(id);

        experience.setCompany(request.getCompany());
        experience.setRole(request.getRole());
        experience.setDescription(request.getDescription());
        experience.setStartDate(request.getStartDate());
        experience.setEndDate(request.getEndDate());
        experience.setLocation(request.getLocation());

        return experienceRepository.save(experience);
    }

    // DELETE
    public void deleteExperience(Long id) {

        if (!experienceRepository.existsById(id)) {
            throw new RuntimeException(
                    "Experience not found with id: " + id
            );
        }

        experienceRepository.deleteById(id);
    }
}