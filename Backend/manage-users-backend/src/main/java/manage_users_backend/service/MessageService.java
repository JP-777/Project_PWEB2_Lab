package manage_users_backend.service;

import manage_users_backend.model.*;
import manage_users_backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;


import java.util.*;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public List<Message> getMessagesBetweenUsers(Long userId1, Long userId2) {
        List<Message> messages1 = messageRepository.findBySenderIdAndRecipientIdOrderByTimestampAsc(userId1, userId2);
        List<Message> messages2 = messageRepository.findByRecipientIdAndSenderIdOrderByTimestampAsc(userId1, userId2);
        messages1.addAll(messages2);
        messages1.sort((m1, m2) -> m1.getTimestamp().compareTo(m2.getTimestamp()));
        return messages1;
    }

    public Message sendMessage(Long senderId, Long recipientId, String content) {
        Message message = new Message();
        AppUser sender = userRepository.findById(senderId)
                .orElseThrow(() -> new IllegalArgumentException("El remitente no existe"));
        AppUser recipient = userRepository.findById(recipientId)
                .orElseThrow(() -> new IllegalArgumentException("El destinatario no existe"));
    
        message.setSender(sender); // Instancia proxy
        message.setRecipient(recipient); // Instancia proxy
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now());
        return messageRepository.save(message);
    }
}
/*
@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private FriendshipRepository friendshipRepository;

    @Autowired
    private UserRepository userRepository;

    public Message sendMessage(Long senderId, Long recipientId, String content) {
        // Convertir IDs a AppUser usando el UserRepository
        AppUser sender = userRepository.findById(senderId)
                .orElseThrow(() -> new IllegalArgumentException("El remitente no existe"));
        AppUser recipient = userRepository.findById(recipientId)
                .orElseThrow(() -> new IllegalArgumentException("El destinatario no existe"));
    
        // Verificar si existe una relación de amistad
        boolean isFriend = friendshipRepository.existsByUser1AndUser2(sender, recipient) ||
                           friendshipRepository.existsByUser1AndUser2(recipient, sender);
    
        if (!isFriend) {
            throw new IllegalArgumentException("No existe una relación de amistad entre los usuarios.");
        }
    
        // Crear y guardar el mensaje
        Message message = new Message();
        message.setSender(sender);
        message.setRecipient(recipient);
        message.setContent(content);
        message.setDateSent(new Date());
    
        return messageRepository.save(message);
    }

    public List<Message> getMessagesBetweenUsers(Long userId1, Long userId2) {
        return messageRepository.findMessagesBetweenUsers(userId1, userId2);
    }
}
*/