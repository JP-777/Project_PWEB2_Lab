package manage_users_backend.model;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String name;
    private String lastName;
    private String hourAgo;
    private String minuteAgo;
    private String dayAgo;
}