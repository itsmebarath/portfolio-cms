package com.portfolio.backend.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendContactEmail(
            String name,
            String email,
            String subject,
            String message) {

        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setTo("barathrajas093@gmail.com");

        mail.setSubject(
                "New Portfolio Contact: " + subject
        );

        mail.setText(
                "You received a new message from your portfolio.\n\n"
                + "Name: " + name + "\n"
                + "Email: " + email + "\n"
                + "Subject: " + subject + "\n\n"
                + "Message:\n"
                + message
        );

        mailSender.send(mail);
    }
}