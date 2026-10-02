package com.portfolio.backend.service;

import com.portfolio.backend.dto.ContactRequest;
import com.portfolio.backend.entity.Contact;
import com.portfolio.backend.repository.ContactRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public Contact createContact(ContactRequest request) {

        Contact contact = new Contact();

        contact.setName(request.getName());
        contact.setEmail(request.getEmail());
        contact.setSubject(request.getSubject());
        contact.setMessage(request.getMessage());
        contact.setRead(false);

        return contactRepository.save(contact);
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