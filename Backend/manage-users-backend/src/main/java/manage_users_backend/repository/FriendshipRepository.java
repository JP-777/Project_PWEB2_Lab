package manage_users_backend.repository;
import manage_users_backend.model.*;
import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendshipRepository extends JpaRepository<Friendship, Long> {
    List<Friendship> findByUser1OrUser2(AppUser user1, AppUser user2);

    boolean existsByUser1AndUser2(AppUser user1, AppUser user2);
}