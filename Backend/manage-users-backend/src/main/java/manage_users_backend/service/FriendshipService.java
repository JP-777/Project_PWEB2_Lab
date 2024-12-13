package manage_users_backend.service;

import manage_users_backend.model.AppUser;
import manage_users_backend.model.Friendship;
import manage_users_backend.model.FriendshipStatus;
import manage_users_backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import manage_users_backend.exception.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FriendshipService {

    @Autowired
    private FriendshipRepository friendshipRepository;

    @Autowired
    private UserRepository userRepository;

    public Friendship sendFriendRequest(Long senderId, Long recipientId) {
        AppUser sender = userRepository.findById(senderId)
            .orElseThrow(() -> new ResourceNotFoundException("Sender not found"));
    
        AppUser recipient = userRepository.findById(recipientId)
            .orElseThrow(() -> new ResourceNotFoundException("Recipient not found"));
    
        Friendship friendship = new Friendship();
        friendship.setSender(sender);
        friendship.setReceiver(recipient); // Asegúrate de que este método existe en el modelo Friendship.
        friendship.setStatus(FriendshipStatus.PENDING);
        return friendshipRepository.save(friendship); // Ahora retorna el objeto guardado.
    }
    
    
    public Friendship respondToFriendRequest(Long friendshipId, FriendshipStatus status) {
        Friendship friendship = friendshipRepository.findById(friendshipId)
                .orElseThrow(() -> new IllegalArgumentException("Friend request not found"));

        friendship.setStatus(status);
        friendship.setUpdatedAt(LocalDateTime.now());
        return friendshipRepository.save(friendship);
    }

    public List<Friendship> getPendingRequests(AppUser receiver) {
        return friendshipRepository.findByReceiverAndStatus(receiver, FriendshipStatus.PENDING);
    }

    public List<Friendship> getAcceptedFriends(AppUser user) {
        return friendshipRepository.findBySenderAndStatus(user, FriendshipStatus.ACCEPTED);
    }
}
