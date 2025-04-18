package server;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import server.models.User;
import server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

@SpringBootTest
@ExtendWith(SpringExtension.class)
public class SimpleIntTest {

    @Autowired
    private UserService userService;
    
    @Test
    @DisplayName("Test validate method with invalid email")
    public void testValidateMethodWithInvalidEmail() {
        String invalidEmail = "incorrect@email.com";
        User result = userService.validate(invalidEmail);
        assertNull(result, "Validation should return null for an invalid email");
    }

    @Test
    @DisplayName("Test validate method with valid email")
    public void testValidateMethodWithValidEmail() {
        String validEmail = "john.doe@example.com";
        User expectedUser = new User(); // Assuming a User object with appropriate fields
        expectedUser.setEmail(validEmail);
        expectedUser.setFirstName("John");
        expectedUser.setLastName("Doe");
        
        // Mock the database response if needed
        User result = userService.validate(validEmail);
        assertNotNull(result, "Validation should not return null for a valid email");
        assertEquals(expectedUser.getEmail(), result.getEmail(), "Emails should match");
        assertEquals(expectedUser.getFirstName(), result.getFirstName(), "First names should match");
        assertEquals(expectedUser.getLastName(), result.getLastName(), "Last names should match");
    }
    
}