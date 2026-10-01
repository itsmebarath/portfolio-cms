package com.portfolio.backend.service;

import com.portfolio.backend.dto.TestimonialRequest;
import com.portfolio.backend.entity.Testimonial;
import com.portfolio.backend.repository.TestimonialRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestimonialService {

    private final TestimonialRepository testimonialRepository;

    public TestimonialService(TestimonialRepository testimonialRepository) {
        this.testimonialRepository = testimonialRepository;
    }

    // CREATE
    public Testimonial createTestimonial(TestimonialRequest request) {

        Testimonial testimonial = new Testimonial();

        testimonial.setName(request.getName());
        testimonial.setRole(request.getRole());
        testimonial.setMessage(request.getMessage());
        testimonial.setImage(request.getImage());

        return testimonialRepository.save(testimonial);
    }

    // READ ALL
    public List<Testimonial> getAllTestimonials() {
        return testimonialRepository.findAll();
    }

    // READ ONE
    public Testimonial getTestimonialById(Long id) {

        return testimonialRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Testimonial not found with id: " + id
                        ));
    }

    // UPDATE
    public Testimonial updateTestimonial(
            Long id,
            TestimonialRequest request) {

        Testimonial testimonial = getTestimonialById(id);

        testimonial.setName(request.getName());
        testimonial.setRole(request.getRole());
        testimonial.setMessage(request.getMessage());
        testimonial.setImage(request.getImage());

        return testimonialRepository.save(testimonial);
    }

    // DELETE
    public void deleteTestimonial(Long id) {

        if (!testimonialRepository.existsById(id)) {
            throw new RuntimeException(
                    "Testimonial not found with id: " + id
            );
        }

        testimonialRepository.deleteById(id);
    }
}