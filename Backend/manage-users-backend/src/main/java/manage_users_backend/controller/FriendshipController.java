package manage_users_backend.controller;

import manage_users_backend.model.*;
import manage_users_backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/friendships")
public class FriendshipController {

    @Autowired
    private FriendshipService friendshipService;

    @PostMapping
    public Friendship addFriend(@RequestBody Friendship friendship) {
        return friendshipService.addFriend(friendship.getUser1(), friendship.getUser2());
    }

    @GetMapping("/user/{userId}")
    public List<Friendship> getAllFriends(@PathVariable Long userId) {
        AppUser user = new AppUser();
        user.setId(userId);
        return friendshipService.getAllFriends(user);
    }
}
