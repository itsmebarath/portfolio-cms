package com.portfolio.backend.repository;

import com.portfolio.backend.entity.PortfolioService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository
        extends JpaRepository<PortfolioService, Long> {
}