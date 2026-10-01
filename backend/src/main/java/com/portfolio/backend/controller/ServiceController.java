package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ServiceRequest;
import com.portfolio.backend.entity.PortfolioService;
import com.portfolio.backend.service.ServiceService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
public class ServiceController {

    private final ServiceService serviceService;

    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PortfolioService createService(
            @RequestBody ServiceRequest request) {

        return serviceService.createService(request);
    }

    @GetMapping
    public List<PortfolioService> getAllServices() {
        return serviceService.getAllServices();
    }

    @GetMapping("/{id}")
    public PortfolioService getServiceById(
            @PathVariable Long id) {

        return serviceService.getServiceById(id);
    }

    @PutMapping("/{id}")
    public PortfolioService updateService(
            @PathVariable Long id,
            @RequestBody ServiceRequest request) {

        return serviceService.updateService(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteService(@PathVariable Long id) {

        serviceService.deleteService(id);
    }
}