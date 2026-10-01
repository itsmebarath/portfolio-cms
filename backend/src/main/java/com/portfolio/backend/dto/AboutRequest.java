package com.portfolio.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AboutRequest {

    private String name;

    private String title;

    private String description;

    private String profileImage;

    private String email;

    private String location;
}