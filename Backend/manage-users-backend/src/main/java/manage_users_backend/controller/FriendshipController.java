package manage_users_backend.controller;

import manage_users_backend.model.*;
import manage_users_backend.service.FriendshipService;
import manage_users_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/api/friendships")
public class FriendshipController {

    @Autowired
    private FriendshipService friendshipService;

    @Autowired
    private UserService userService;

    @PostMapping("/send")
    public Friendship sendFriendRequest(@RequestParam Long senderId, @RequestParam Long receiverId) {
        AppUser sender = userService.getUserById(senderId).orElseThrow();
        AppUser receiver = userService.getUserById(receiverId).orElseThrow();
        return friendshipService.sendFriendRequest(senderId, receiverId);
    }

    @PutMapping("/{id}/respond")
    public Friendship respondToFriendRequest(@PathVariable Long id, @RequestParam FriendshipStatus status) {
        return friendshipService.respondToFriendRequest(id, status);
    }

    @GetMapping("/pending/{userId}")
    public List<Friendship> getPendingRequests(@PathVariable Long userId) {
        AppUser receiver = userService.getUserById(userId).orElseThrow();
        return friendshipService.getPendingRequests(receiver);
    }

    @GetMapping("/friends/{userId}")
    public List<Friendship> getAcceptedFriends(@PathVariable Long userId) {
        AppUser user = userService.getUserById(userId).orElseThrow();
        return friendshipService.getAcceptedFriends(user);
    }

    @PostMapping("/friendships/request")
    public ResponseEntity<String> sendFriendRequest(@RequestBody FriendshipRequestDTO request) {
        friendshipService.sendFriendRequest(request.getSenderId(), request.getRecipientId());
        return ResponseEntity.ok("Friend request sent successfully.");
    }

}
