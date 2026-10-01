package com.portfolio.backend.repository;

import com.portfolio.backend.entity.Contact;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactRepository
        extends JpaRepository<Contact, Long> {

    List<Contact> findAllByOrderByCreatedAtDesc();

    long countByReadFalse();
}