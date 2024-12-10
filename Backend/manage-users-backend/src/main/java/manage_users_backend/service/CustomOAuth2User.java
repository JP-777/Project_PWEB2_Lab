package manage_users_backend.service;

import manage_users_backend.model.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

public class CustomOAuth2User implements OAuth2User {

    private final OAuth2User oAuth2User;
    private final AppUser appUser;

    public CustomOAuth2User(OAuth2User oAuth2User, AppUser appUser) {
        this.oAuth2User = oAuth2User;
        this.appUser = appUser;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return oAuth2User.getAttributes();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return appUser.getAuthorities();
    }

    @Override
    public String getName() {
        return appUser.getUsername();
    }

    public AppUser getAppUser() {
        return appUser;
    }
}
