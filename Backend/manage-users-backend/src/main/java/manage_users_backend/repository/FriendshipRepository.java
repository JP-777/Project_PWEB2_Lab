package manage_users_backend.repository;

import manage_users_backend.model.Friendship;
import manage_users_backend.model.AppUser;
import manage_users_backend.model.FriendshipStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FriendshipRepository extends JpaRepository<Friendship, Long> {
    List<Friendship> findByReceiverAndStatus(AppUser receiver, FriendshipStatus status);
    List<Friendship> findBySenderAndStatus(AppUser sender, FriendshipStatus status);
    Optional<Friendship> findBySenderAndReceiver(AppUser sender, AppUser receiver);
}
