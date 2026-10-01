package com.portfolio.backend.controller;

import com.portfolio.backend.dto.ContactRequest;
import com.portfolio.backend.entity.Contact;
import com.portfolio.backend.service.ContactService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/contacts", "/contact"})
public class ContactController {

    private final ContactService contactService;

    public ContactController(
            ContactService contactService) {

        this.contactService = contactService;
    }

    // Public portfolio contact form
    @PostMapping
    public ResponseEntity<Contact> createContact(
            @RequestBody ContactRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        contactService.createContact(request)
                );
    }

    // Admin - get all messages
    @GetMapping
    public ResponseEntity<List<Contact>> getAllContacts() {

        return ResponseEntity.ok(
                contactService.getAllContacts()
        );
    }

    // Admin - get one message
    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContact(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                contactService.getContactById(id)
        );
    }

    // Admin - mark message as read
    @PutMapping("/{id}/read")
    public ResponseEntity<Contact> markAsRead(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                contactService.markAsRead(id)
        );
    }

    // Admin - delete message
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(
            @PathVariable Long id) {

        contactService.deleteContact(id);

        return ResponseEntity.noContent().build();
    }

    // Admin - unread count
    @GetMapping("/unread/count")
    public ResponseEntity<Long> getUnreadCount() {

        return ResponseEntity.ok(
                contactService.getUnreadCount()
        );
    }

    // Admin - total message count
    @GetMapping("/count")
    public ResponseEntity<Long> getContactCount() {

        return ResponseEntity.ok(
                contactService.getContactCount()
        );
    }
}