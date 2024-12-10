package manage_users_backend.service;
import manage_users_backend.model.AppUser;
import manage_users_backend.model.Role;
import manage_users_backend.repository.UserRepository;
import manage_users_backend.repository.RoleRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public CustomOAuth2UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        // Extraer información del usuario desde el proveedor OAuth2
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String lastName = oAuth2User.getAttribute("family_name");

        // Buscar usuario existente o crear uno nuevo
        AppUser user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    AppUser newUser = new AppUser();
                    newUser.setEmail(email);
                    newUser.setName(name);
                    newUser.setLastname(lastName);
                    newUser.setUsername(email); // Usa el email como nombre de usuario
                    newUser.setPassword(""); // No se necesita contraseña para Google Login
                    Role userRole = roleRepository.findByName("ROLE_USER")
                            .orElseThrow(() -> new RuntimeException("Rol USER no encontrado"));
                    newUser.setRoles(Collections.singleton(userRole));
                    return userRepository.save(newUser);
                });

        return new CustomOAuth2User(oAuth2User, user);
    }
}
