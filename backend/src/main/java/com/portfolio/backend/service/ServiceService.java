package com.portfolio.backend.service;

import com.portfolio.backend.dto.ServiceRequest;
import com.portfolio.backend.entity.PortfolioService;
import com.portfolio.backend.repository.ServiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceService {

    private final ServiceRepository serviceRepository;

    public ServiceService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public PortfolioService createService(ServiceRequest request) {

        PortfolioService service = new PortfolioService();

        service.setTitle(request.getTitle());
        service.setDescription(request.getDescription());
        service.setIcon(request.getIcon());

        return serviceRepository.save(service);
    }

    public List<PortfolioService> getAllServices() {
        return serviceRepository.findAll();
    }

    public PortfolioService getServiceById(Long id) {

        return serviceRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Service not found with id: " + id));
    }

    public PortfolioService updateService(
            Long id,
            ServiceRequest request) {

        PortfolioService service = getServiceById(id);

        service.setTitle(request.getTitle());
        service.setDescription(request.getDescription());
        service.setIcon(request.getIcon());

        return serviceRepository.save(service);
    }

    public void deleteService(Long id) {

        if (!serviceRepository.existsById(id)) {
            throw new RuntimeException(
                    "Service not found with id: " + id);
        }

        serviceRepository.deleteById(id);
    }
}