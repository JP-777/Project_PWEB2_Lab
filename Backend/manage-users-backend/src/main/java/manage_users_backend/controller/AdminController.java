package manage_users_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import manage_users_backend.model.*;
import manage_users_backend.repository.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;


@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminController(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/create-admin")
    public ResponseEntity<?> createAdmin(@RequestBody Map<String, String> userDetails) {
        String username = userDetails.get("username");
        String email = userDetails.get("email");
        String password = userDetails.get("password");

        if (userRepository.existsByUsername(username)) {
            return ResponseEntity.badRequest().body("Username already exists!");
        }

        AppUser admin = new AppUser();
        admin.setUsername(username);
        admin.setEmail(email);
        admin.setPassword(passwordEncoder.encode(password));

        Role adminRole = roleRepository.findByName("ADMIN")
                .orElseThrow(() -> new RuntimeException("Role ADMIN not found"));
        admin.setRoles(Collections.singleton(adminRole));

        userRepository.save(admin);

        return ResponseEntity.ok("Admin user created successfully!");
    }
}
