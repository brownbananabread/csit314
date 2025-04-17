package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.models.User;
import server.service.EventService;
import server.utils.Response;
import server.middleware.Request;

@RestController
@RequestMapping("/api")
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private Request request;

    @GetMapping("/events")
    public ResponseEntity<?> getEvents(@CookieValue(name = "accessToken") String accessToken) {
        
        User user = request.getUserFromToken(accessToken);
        if (user == null) { return Response.Unauthorized(); }

        switch (user.getRole()) {
            case "customer": return Response.Ok(eventService.getCustomerEvents(user.getUserId()));
            case "organiser": return Response.Ok(eventService.getOrganiserEvents(user.getUserId()));
            default: return Response.Unauthorized();
        }
    }

    @GetMapping("/all-events")
    public ResponseEntity<?> getAllUpcomingEvents(@CookieValue(name = "accessToken") String accessToken) {
        
        User user = request.getUserFromToken(accessToken);
        if (user == null) { return Response.Unauthorized(); }

        switch (user.getRole()) {
            case "customer": return Response.Ok(eventService.getAllUpcomingEvents());
            case "organiser": return Response.Ok(eventService.getAllUpcomingEvents());
            default: return Response.Unauthorized();
        }
    }

    @GetMapping("/tickets")
    public ResponseEntity<?> getAllTickets(@CookieValue(name = "accessToken") String accessToken) {
        
        User user = request.getUserFromToken(accessToken);
        if (user == null) { return Response.Unauthorized(); }

        switch (user.getRole()) {
            case "customer": return Response.Ok(eventService.getCustomerTickets(user.getUserId()));
            default: return Response.Unauthorized();
        }
    }
}
