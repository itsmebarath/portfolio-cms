package com.portfolio.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BlogRequest {

    private String title;
    private String content;
    private String image;
    private String category;
    private String publishedDate;
}