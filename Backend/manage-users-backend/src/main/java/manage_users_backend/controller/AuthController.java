package manage_users_backend.controller;

import java.util.*;
import manage_users_backend.model.*;
import manage_users_backend.service.AuthService;
import manage_users_backend.service.GoogleAuthService;
import manage_users_backend.service.UserDetailsServiceImpl;
import manage_users_backend.repository.*;
import manage_users_backend.filter.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @Autowired
    private GoogleAuthService googleAuthService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Value("${jwt.secret}")
    @Autowired
    private String jwtSecret;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody AppUser loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = authService.generateJwtToken(authentication);

        return ResponseEntity.ok(jwt);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody AppUser userDetails) {
        if (userRepository.existsByUsername(userDetails.getUsername())) {
            return ResponseEntity.badRequest().body("El nombre de usuario ya está en uso.");
        }

        if (userRepository.existsByEmail(userDetails.getEmail())) {
            return ResponseEntity.badRequest().body("El correo electrónico ya está en uso.");
        }

        userDetails.setPassword(passwordEncoder.encode(userDetails.getPassword()));

        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Rol USER no encontrado"));
        userDetails.setRoles(Collections.singleton(userRole));

        userRepository.save(userDetails);

        return ResponseEntity.ok("Usuario registrado exitosamente.");
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> request) {
        String token = request.get("token");

        // Validar el token de Google
        GoogleIdToken.Payload payload = googleAuthService.verifyToken(token);
        if (payload == null) {
            return ResponseEntity.badRequest().body("Token de Google inválido.");
        }

        // Extraer información del usuario desde Google
        String email = payload.getEmail();
        String name = (String) payload.get("name");
        String lastName = (String) payload.get("family_name");

        // Buscar usuario existente o crear uno nuevo
        AppUser user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    AppUser newUser = new AppUser();
                    newUser.setEmail(email);
                    newUser.setName(name);
                    newUser.setLastname(lastName);
                    newUser.setUsername(email); // Usa el email como username
                    newUser.setPassword(""); // Contraseña vacía porque es Google Login
                    Role userRole = roleRepository.findByName("ROLE_USER")
                            .orElseThrow(() -> new RuntimeException("Rol USER no encontrado"));
                    newUser.setRoles(Collections.singleton(userRole));
                    return userRepository.save(newUser);
                });

        // Generar JWT
        String jwt = new JwtAuthenticationFilter(userDetailsService, jwtSecret).generateToken(user.getUsername());

    return ResponseEntity.ok(Collections.singletonMap("token", jwt));
    }
}


