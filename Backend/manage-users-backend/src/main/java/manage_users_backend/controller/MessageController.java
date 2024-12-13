package manage_users_backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;;
import org.springframework.http.ResponseEntity;

import manage_users_backend.model.*;
import manage_users_backend.repository.FriendshipRepository;
import manage_users_backend.service.MessageService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/messages")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/{userId1}/{userId2}")
    public ResponseEntity<List<Message>> getMessagesBetweenUsers(
            @PathVariable Long userId1, 
            @PathVariable Long userId2) {
        List<Message> messages = messageService.getMessagesBetweenUsers(userId1, userId2);
        return ResponseEntity.ok(messages);
    }

    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestBody MessageDTO messageRequest) {
        Message message = messageService.sendMessage(
                messageRequest.getSenderId(),
                messageRequest.getRecipientId(),
                messageRequest.getContent());
        return ResponseEntity.ok(message);
    }
}
/*
@RestController
@RequestMapping("/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private FriendshipRepository friendshipRepository;

    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestBody MessageDTO messageDto) {
        Message message = messageService.sendMessage(
                messageDto.getSenderId(),
                messageDto.getRecipientId(),
                messageDto.getContent()
        );
        return ResponseEntity.ok(message);
    }
    

    @GetMapping("/{userId1}/{userId2}")
    public ResponseEntity<List<Message>> getMessages(
        @PathVariable Long userId1,
        @PathVariable Long userId2
    ) {
        List<Message> messages = messageService.getMessagesBetweenUsers(userId1, userId2);
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/friends/{userId}")
    public List<AppUser> getFriends(@PathVariable Long userId) {
        return friendshipRepository.findFriendsByUserId(userId);
    }

}
    */
