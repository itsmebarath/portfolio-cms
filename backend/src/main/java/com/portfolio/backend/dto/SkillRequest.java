package com.portfolio.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SkillRequest {

    private String name;

    private String category;

    private String level;
}