package server.middleware;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.lang.NonNull;
import org.springframework.jdbc.core.RowMapper;
import server.models.Event;
import server.models.Ticket;
import server.models.User;

public class RowMappers {
    private static final class UserRowMapper implements RowMapper<User> {
        @Override
        public User mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
            
            return new User(
                rs.getInt("userId"),
                rs.getString("email"),
                rs.getString("firstName"),
                rs.getString("lastName"),
                rs.getString("password"),
                rs.getString("role"),
                rs.getString("serviceOffered"),
                rs.getDate("createdAt")
            );
        }
    }

    private static final class EventRowMapper implements RowMapper<Event> {
        @Override
        public Event mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
            return new Event(
                rs.getInt("eventId"),
                rs.getInt("organiserId"),
                rs.getString("title"),
                rs.getString("description"),
                rs.getString("eventType"),
                rs.getString("status"),
                rs.getString("location"),
                rs.getDate("date"),
                rs.getDate("createdAt")
            );
        }
    }

    private static final class TicketRowMapper implements RowMapper<Ticket> {
    @Override
    public Ticket mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
            return new Ticket(
                rs.getInt("ticketId"),
                rs.getInt("eventId"),
                rs.getInt("customerId"),
                rs.getString("ticketType"),
                rs.getString("status"),
                rs.getFloat("price"),
                rs.getTimestamp("purchaseDate"),
                rs.getString("notes")
            );
        }
    }

    public static RowMapper<Ticket> getTicketRowMapper() {
        return new TicketRowMapper();
    }


    public static RowMapper<Event> getEventRowMapper() {
        return new EventRowMapper();
    }

    public static RowMapper<User> getUserRowMapper() {
        return new UserRowMapper();
    }
    
}
