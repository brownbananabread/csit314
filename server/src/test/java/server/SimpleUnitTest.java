package server;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;

public class SimpleUnitTest {
    
    @Test
    @DisplayName("Test addition operation")
    public void testAddition() {
        int a = 5;
        int b = 3;
        int result = a + b;
        assertEquals(8, result, "Addition test failed");
    }
    
    @Test
    @DisplayName("Test subtraction operation")
    public void testSubtraction() {
        int a = 5;
        int b = 3;
        int result = a - b;
        assertEquals(2, result, "Subtraction test failed");
    }
}