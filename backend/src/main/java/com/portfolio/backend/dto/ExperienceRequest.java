package com.portfolio.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExperienceRequest {

    private String company;
    private String role;
    private String description;
    private String startDate;
    private String endDate;
    private String location;
}