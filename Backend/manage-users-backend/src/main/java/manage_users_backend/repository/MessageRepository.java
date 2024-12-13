package manage_users_backend.repository;
import manage_users_backend.model.*;
import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderIdAndRecipientIdOrderByTimestampAsc(Long senderId, Long recipientId);
    List<Message> findByRecipientIdAndSenderIdOrderByTimestampAsc(Long recipientId, Long senderId);
}

/*
@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT m FROM Message m WHERE (m.sender.id = :userId1 AND m.recipient.id = :userId2) " +
           "OR (m.sender.id = :userId2 AND m.recipient.id = :userId1) ORDER BY m.dateSent ASC")
    List<Message> findMessagesBetweenUsers(@Param("userId1") Long userId1, @Param("userId2") Long userId2);
}
    */