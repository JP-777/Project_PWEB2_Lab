package manage_users_backend.repository;
import manage_users_backend.model.*;
import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderAndRecipient(AppUser sender, AppUser recipient);
    
    List<Message> findBySender(AppUser sender);

    List<Message> findByRecipient(AppUser recipient);
}