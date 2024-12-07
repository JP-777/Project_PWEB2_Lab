package manage_users_backend.repository;
import manage_users_backend.model.AppUser;
import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findById(Long id);
    AppUser findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}