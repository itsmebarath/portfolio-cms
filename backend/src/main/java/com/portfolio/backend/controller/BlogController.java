package com.portfolio.backend.controller;

import com.portfolio.backend.dto.BlogRequest;
import com.portfolio.backend.entity.Blog;
import com.portfolio.backend.service.BlogService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/blogs")
public class BlogController {

    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    // CREATE
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Blog createBlog(@RequestBody BlogRequest request) {
        return blogService.createBlog(request);
    }

    // READ ALL
    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogService.getAllBlogs();
    }

    // READ ONE
    @GetMapping("/{id}")
    public Blog getBlogById(@PathVariable Long id) {
        return blogService.getBlogById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Blog updateBlog(
            @PathVariable Long id,
            @RequestBody BlogRequest request) {

        return blogService.updateBlog(id, request);
    }

    // DELETE
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
    }
}