package com.portfolio.backend.service;

import com.portfolio.backend.dto.SkillRequest;
import com.portfolio.backend.entity.Skill;
import com.portfolio.backend.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    // CREATE
    public Skill createSkill(SkillRequest request) {

        Skill skill = new Skill();

        skill.setName(request.getName());
        skill.setCategory(request.getCategory());
        skill.setLevel(request.getLevel());

        return skillRepository.save(skill);
    }

    // READ ALL
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    // READ ONE
    public Skill getSkillById(Long id) {

        return skillRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Skill not found with id: " + id));
    }

    // UPDATE
    public Skill updateSkill(Long id, SkillRequest request) {

        Skill skill = getSkillById(id);

        skill.setName(request.getName());
        skill.setCategory(request.getCategory());
        skill.setLevel(request.getLevel());

        return skillRepository.save(skill);
    }

    // DELETE
    public void deleteSkill(Long id) {

        if (!skillRepository.existsById(id)) {
            throw new RuntimeException(
                    "Skill not found with id: " + id
            );
        }

        skillRepository.deleteById(id);
    }
}