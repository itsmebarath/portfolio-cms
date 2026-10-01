package com.portfolio.backend.controller;

import com.portfolio.backend.dto.TestimonialRequest;
import com.portfolio.backend.entity.Testimonial;
import com.portfolio.backend.service.TestimonialService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/testimonials")
public class TestimonialController {

    private final TestimonialService testimonialService;

    public TestimonialController(TestimonialService testimonialService) {
        this.testimonialService = testimonialService;
    }

    // CREATE
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Testimonial createTestimonial(
            @RequestBody TestimonialRequest request) {

        return testimonialService.createTestimonial(request);
    }

    // READ ALL
    @GetMapping
    public List<Testimonial> getAllTestimonials() {
        return testimonialService.getAllTestimonials();
    }

    // READ ONE
    @GetMapping("/{id}")
    public Testimonial getTestimonialById(
            @PathVariable Long id) {

        return testimonialService.getTestimonialById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Testimonial updateTestimonial(
            @PathVariable Long id,
            @RequestBody TestimonialRequest request) {

        return testimonialService.updateTestimonial(id, request);
    }

    // DELETE
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTestimonial(
            @PathVariable Long id) {

        testimonialService.deleteTestimonial(id);
    }
}