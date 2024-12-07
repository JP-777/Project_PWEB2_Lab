package manage_users_backend.service;
import manage_users_backend.model.Profile;
import manage_users_backend.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    public Optional<Profile> getProfileByUserId(Long userId) {
        return Optional.ofNullable(profileRepository.findByUserId(userId));
    }

    public Profile saveProfile(Profile profile) {
        return profileRepository.save(profile);
    }
}