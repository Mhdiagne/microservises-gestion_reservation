package com.roomreservation.auth.dto;

import com.roomreservation.auth.entity.User;

public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private UserDto user;
    private String expiresAt;
    
    public AuthResponse(String token, User user, String expiresAt) {
        this.token = token;
        this.user = new UserDto(user);
        this.expiresAt = expiresAt;
    }
    
    // Getters and Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public UserDto getUser() { return user; }
    public void setUser(UserDto user) { this.user = user; }
    
    public String getExpiresAt() { return expiresAt; }
    public void setExpiresAt(String expiresAt) { this.expiresAt = expiresAt; }
    
    public static class UserDto {
        private Long id;
        private String email;
        private String name;
        private String role;
        private String department;
        private String avatar;
        
        public UserDto(User user) {
            this.id = user.getId();
            this.email = user.getEmail();
            this.name = user.getName();
            this.role = user.getRole().name().toLowerCase();
            this.department = user.getDepartment();
            this.avatar = user.getAvatar();
        }
        
        // Getters and Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
        
        public String getDepartment() { return department; }
        public void setDepartment(String department) { this.department = department; }
        
        public String getAvatar() { return avatar; }
        public void setAvatar(String avatar) { this.avatar = avatar; }
    }
}