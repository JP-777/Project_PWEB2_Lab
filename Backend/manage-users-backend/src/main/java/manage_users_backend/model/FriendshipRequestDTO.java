package manage_users_backend.model;

import lombok.Data;


@Data
public class FriendshipRequestDTO {
    private Long senderId;
    private Long recipientId;
}
