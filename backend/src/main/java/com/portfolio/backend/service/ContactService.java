package com.portfolio.backend.service;

import com.portfolio.backend.dto.ContactRequest;
import com.portfolio.backend.entity.Contact;
import com.portfolio.backend.repository.ContactRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    private final ContactRepository contactRepository;
    private final EmailService emailService;

    public ContactService(
            ContactRepository contactRepository,
            EmailService emailService) {

        this.contactRepository = contactRepository;
        this.emailService = emailService;
    }

    // Create contact message
    public Contact createContact(ContactRequest request) {

        Contact contact = new Contact();

        contact.setName(request.getName());
        contact.setEmail(request.getEmail());
        contact.setSubject(request.getSubject());
        contact.setMessage(request.getMessage());
        contact.setRead(false);

        // Save message to database
        Contact savedContact =
                contactRepository.save(contact);

        // Send email notification
        emailService.sendContactEmail(
                request.getName(),
                request.getEmail(),
                request.getSubject(),
                request.getMessage()
        );

        return savedContact;
    }

    // Get all contact messages
    public List<Contact> getAllContacts() {

        return contactRepository
                .findAllByOrderByCreatedAtDesc();
    }

    // Get one contact message
    public Contact getContactById(Long id) {

        return contactRepository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Contact message not found"
                        )
                );
    }

    // Mark message as read
    public Contact markAsRead(Long id) {

        Contact contact =
                contactRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Contact message not found"
                                )
                        );

        contact.setRead(true);

        return contactRepository.save(contact);
    }

    // Delete contact message
    public void deleteContact(Long id) {

        if (!contactRepository.existsById(id)) {

            throw new RuntimeException(
                    "Contact message not found"
            );
        }

        contactRepository.deleteById(id);
    }

    // Get total contact count
    public long getContactCount() {

        return contactRepository.count();
    }

    // Get unread contact count
    public long getUnreadCount() {

        return contactRepository.countByReadFalse();
    }
}