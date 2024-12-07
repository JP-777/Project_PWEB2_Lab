package manage_users_backend.controller;

import manage_users_backend.exception.ResourceNotFoundException;
import manage_users_backend.model.*;
import manage_users_backend.service.*;
import manage_users_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.time.Duration;


@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public AppUser createUser(@RequestBody AppUser user) {
        return userService.createUser(user);
    }

    @GetMapping("/{id}")
    public Optional<AppUser> getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @GetMapping("/username/{username}")
    public Optional<AppUser> getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

    @PutMapping("/{id}")
    public AppUser updateUser(@PathVariable Long id, @RequestBody AppUser user) {
        user.setId(id);
        return userService.updateUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @PutMapping("/users/{id}/updateActivity")
    public ResponseEntity<AppUser> updateUserActivity(@PathVariable Long id) {
        AppUser user = userRepository.findById(id).orElse(null);
        if (user == null) {
            throw new ResourceNotFoundException("User not found");
        }
        
        user.setLastActive(LocalDateTime.now());
        userRepository.save(user);
        
        return ResponseEntity.ok(user);
    }

    @GetMapping("/all")
    public List<UserDTO> getAllUsers() {
        List<AppUser> users = userService.getAllUsers();

        List<UserDTO> userDTOs = users.stream().map(user -> {
            UserDTO userDTO = new UserDTO();
            userDTO.setId(user.getId());
            userDTO.setName(user.getName());
            userDTO.setLastName(user.getLastName());

            Duration duration = Duration.between(user.getLastActive(), LocalDateTime.now());
            long hours = duration.toHours();
            long minutes = duration.toMinutes() % 60;

            userDTO.setHourAgo(String.valueOf(hours));
            userDTO.setMinuteAgo(String.valueOf(minutes));

            return userDTO;
        }).collect(Collectors.toList());

        return userDTOs;
    }

}




