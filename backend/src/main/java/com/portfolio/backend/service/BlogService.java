package com.portfolio.backend.service;

import com.portfolio.backend.dto.BlogRequest;
import com.portfolio.backend.entity.Blog;
import com.portfolio.backend.repository.BlogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogService {

    private final BlogRepository blogRepository;

    public BlogService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    // CREATE
    public Blog createBlog(BlogRequest request) {

        Blog blog = new Blog();

        blog.setTitle(request.getTitle());
        blog.setContent(request.getContent());
        blog.setImage(request.getImage());
        blog.setCategory(request.getCategory());
        blog.setPublishedDate(request.getPublishedDate());

        return blogRepository.save(blog);
    }

    // READ ALL
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    // READ ONE
    public Blog getBlogById(Long id) {

        return blogRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Blog not found with id: " + id));
    }

    // UPDATE
    public Blog updateBlog(Long id, BlogRequest request) {

        Blog blog = getBlogById(id);

        blog.setTitle(request.getTitle());
        blog.setContent(request.getContent());
        blog.setImage(request.getImage());
        blog.setCategory(request.getCategory());
        blog.setPublishedDate(request.getPublishedDate());

        return blogRepository.save(blog);
    }

    // DELETE
    public void deleteBlog(Long id) {

        if (!blogRepository.existsById(id)) {
            throw new RuntimeException("Blog not found with id: " + id);
        }

        blogRepository.deleteById(id);
    }
}