package manage_users_backend.controller;

import manage_users_backend.model.*;
import manage_users_backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/profiles")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping("/user/{userId}")
    public Optional<Profile> getProfileByUserId(@PathVariable Long userId) {
        return profileService.getProfileByUserId(userId);
    }

    @PostMapping
    public Profile saveProfile(@RequestBody Profile profile) {
        return profileService.saveProfile(profile);
    }
}
