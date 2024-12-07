package manage_users_backend.service;

import manage_users_backend.model.*;
import manage_users_backend.repository.*;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Role createRole(String roleName) {
        if (roleRepository.existsByName(roleName)) {
            throw new IllegalArgumentException("Role already exists: " + roleName);
        }

        Role role = new Role();
        role.setName(roleName);
        return roleRepository.save(role);
    }

    public Optional<Role> getRoleByName(String roleName) {
        return roleRepository.findByName(roleName);
    }
}
