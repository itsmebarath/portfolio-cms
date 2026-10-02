package com.portfolio.backend.config;

import com.portfolio.backend.entity.User;
import com.portfolio.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminSeeder {

    @Bean
    CommandLineRunner createAdmin(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            User admin = userRepository
                    .findByEmail("admin@example.com")
                    .orElseGet(User::new);

            admin.setEmail("admin@example.com");

            admin.setPassword(
                    passwordEncoder.encode("Admin@123")
            );

            admin.setRole("ADMIN");

            userRepository.save(admin);

            System.out.println("Admin user created/updated successfully!");
        };
    }
}