package com.portfolio.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectRequest {

    private String title;

    private String description;

    private String image;

    private String techStack;

    private String githubUrl;

    private String liveUrl;
}