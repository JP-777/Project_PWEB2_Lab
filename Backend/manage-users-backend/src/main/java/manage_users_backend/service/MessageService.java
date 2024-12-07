package manage_users_backend.service;

import manage_users_backend.model.*;
import manage_users_backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public Message sendMessage(AppUser sender, AppUser recipient, String content) {
        Message message = new Message();
        message.setSender(sender);
        message.setRecipient(recipient);
        message.setContent(content);
        message.setDateSent(new java.util.Date());
        return messageRepository.save(message);
    }

    public List<Message> getMessagesBetweenUsers(AppUser sender, AppUser recipient) {
        return messageRepository.findBySenderAndRecipient(sender, recipient);
    }
}
