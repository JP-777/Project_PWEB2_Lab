package manage_users_backend.service;
import manage_users_backend.model.*;
import manage_users_backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FriendshipService {

    @Autowired
    private FriendshipRepository friendshipRepository;

    public Friendship addFriend(AppUser user1, AppUser user2) {
        
        if (!friendshipRepository.existsByUser1AndUser2(user1, user2) && !friendshipRepository.existsByUser1AndUser2(user2, user1)) {
            Friendship friendship = new Friendship();
            friendship.setUser1(user1);
            friendship.setUser2(user2);
            return friendshipRepository.save(friendship);
        }
        return null;
    }

    public List<Friendship> getAllFriends(AppUser user) {
        return friendshipRepository.findByUser1OrUser2(user, user);
    }
}