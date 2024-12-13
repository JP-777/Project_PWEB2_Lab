package manage_users_backend.model;

import lombok.Data;

@Data
public class MessageDTO {
    private Long senderId;
    private Long recipientId;
    private String content;
}
