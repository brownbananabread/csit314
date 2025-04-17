
package server.service;

import org.springframework.stereotype.Service;
import server.models.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.List;
import server.middleware.RowMappers;
import server.models.Ticket;

@Service
public class EventService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Event> getCustomerEvents(int customerId) {
        // filter to be added
        String sql = "SELECT * FROM events WHERE eventId in ( SELECT eventId FROM tickets WHERE customerId = ?)";
        List<Event> events = jdbcTemplate.query(sql, RowMappers.getEventRowMapper(), customerId);
        return events.isEmpty() ? null : events;
    }

    public List<Event> getOrganiserEvents(int organiserId) {
        // filter to be added
        String sql = "SELECT * FROM events WHERE organiserId = ?";
        List<Event> events = jdbcTemplate.query(sql, RowMappers.getEventRowMapper(), organiserId);
        return events.isEmpty() ? null : events;
    }

    public List<Ticket> getCustomerTickets(int customerId) {
        // filter to be added
        String sql = "SELECT * FROM tickets WHERE customerId = ?";
        List<Ticket> tickets = jdbcTemplate.query(sql, RowMappers.getTicketRowMapper(), customerId);
        return tickets.isEmpty() ? null : tickets;
    }

    public List<Event> getAllUpcomingEvents() {
        String sql = "SELECT * FROM events WHERE status = 'upcoming'";
        List<Event> events = jdbcTemplate.query(sql, RowMappers.getEventRowMapper());
        return events.isEmpty() ? null : events;
    }
}