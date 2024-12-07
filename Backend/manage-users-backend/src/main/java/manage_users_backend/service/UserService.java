package manage_users_backend.service;

import manage_users_backend.model.AppUser;
import manage_users_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

import java.time.Duration;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public AppUser createUser(AppUser user) {
        return userRepository.save(user);
    }

    public Optional<AppUser> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<AppUser> getUserByUsername(String username) {
        return Optional.ofNullable(userRepository.findByUsername(username));
    }

    public AppUser updateUser(AppUser user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public String getTimeSinceLastActivity(AppUser user) {
        Duration duration = Duration.between(user.getLastActive(), LocalDateTime.now());
        long minutes = duration.toMinutes();
        long hours = duration.toHours();
        long days = duration.toDays();

        if (days > 0) {
            return days + " días";
        } else if (hours > 0) {
            return hours + " horas";
        } else {
            return minutes + " minutos";
        }
    }

    public List<AppUser> getAllUsers() {
        return userRepository.findAll();
    }

}
