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

    public Contact createContact(ContactRequest request) {

        // Create contact object
        Contact contact = new Contact();

        contact.setName(request.getName());
        contact.setEmail(request.getEmail());
        contact.setSubject(request.getSubject());
        contact.setMessage(request.getMessage());
        contact.setRead(false);

        // Save message to database
        Contact savedContact = contactRepository.save(contact);

        // Try to send email notification
        try {

            emailService.sendContactEmail(
                    request.getName(),
                    request.getEmail(),
                    request.getSubject(),
                    request.getMessage()
            );

            System.out.println("Contact email sent successfully.");

        } catch (Exception e) {

            // Email failure should NOT break the contact form
            System.err.println(
                    "Failed to send contact email: "
                            + e.getMessage()
            );
        }

        return savedContact;
    }

    public List<Contact> getAllContacts() {
        return contactRepository.findAllByOrderByCreatedAtDesc();
    }

    public Contact getContactById(Long id) {

        return contactRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Contact message not found"));
    }

    public Contact markAsRead(Long id) {

        Contact contact =
                contactRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Contact message not found"));

        contact.setRead(true);

        return contactRepository.save(contact);
    }

    public void deleteContact(Long id) {

        if (!contactRepository.existsById(id)) {
            throw new RuntimeException("Contact message not found");
        }

        contactRepository.deleteById(id);
    }

    public long getContactCount() {
        return contactRepository.count();
    }

    public long getUnreadCount() {
        return contactRepository.countByReadFalse();
    }
}