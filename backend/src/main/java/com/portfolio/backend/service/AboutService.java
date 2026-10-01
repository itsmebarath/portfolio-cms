package com.portfolio.backend.service;

import com.portfolio.backend.dto.AboutRequest;
import com.portfolio.backend.entity.About;
import com.portfolio.backend.repository.AboutRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AboutService {

    private final AboutRepository aboutRepository;

    public AboutService(AboutRepository aboutRepository) {
        this.aboutRepository = aboutRepository;
    }

    // CREATE
    public About createAbout(AboutRequest request) {

        About about = new About();

        about.setName(request.getName());
        about.setTitle(request.getTitle());
        about.setDescription(request.getDescription());
        about.setProfileImage(request.getProfileImage());
        about.setEmail(request.getEmail());
        about.setLocation(request.getLocation());

        return aboutRepository.save(about);
    }

    // READ ALL
    public List<About> getAllAbout() {
        return aboutRepository.findAll();
    }

    // READ ONE
    public About getAboutById(Long id) {
        return aboutRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("About not found with id: " + id));
    }

    // UPDATE
    public About updateAbout(Long id, AboutRequest request) {

        About about = getAboutById(id);

        about.setName(request.getName());
        about.setTitle(request.getTitle());
        about.setDescription(request.getDescription());
        about.setProfileImage(request.getProfileImage());
        about.setEmail(request.getEmail());
        about.setLocation(request.getLocation());

        return aboutRepository.save(about);
    }

    // DELETE
    public void deleteAbout(Long id) {

        if (!aboutRepository.existsById(id)) {
            throw new RuntimeException(
                    "About not found with id: " + id
            );
        }

        aboutRepository.deleteById(id);
    }
}