package com.portfolio.backend.controller;

import com.portfolio.backend.dto.AboutRequest;
import com.portfolio.backend.entity.About;
import com.portfolio.backend.service.AboutService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/about")
public class AboutController {

    private final AboutService aboutService;

    public AboutController(AboutService aboutService) {
        this.aboutService = aboutService;
    }

    // CREATE
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public About createAbout(@RequestBody AboutRequest request) {
        return aboutService.createAbout(request);
    }

    // READ ALL
    @GetMapping
    public List<About> getAllAbout() {
        return aboutService.getAllAbout();
    }

    // READ ONE
    @GetMapping("/{id}")
    public About getAboutById(@PathVariable Long id) {
        return aboutService.getAboutById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public About updateAbout(
            @PathVariable Long id,
            @RequestBody AboutRequest request) {

        return aboutService.updateAbout(id, request);
    }

    // DELETE
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAbout(@PathVariable Long id) {
        aboutService.deleteAbout(id);
    }
}