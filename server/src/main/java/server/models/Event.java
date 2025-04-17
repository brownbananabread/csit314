package server.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.util.Date;

@Entity
public class Event {
    @Id
    private int eventId;
    private int organiserId;
    private String title;
    private String description;
    private String eventType;
    private String status;
    private String location;
    private Date date;
    private Date createdAt;

    public Event(int eventId, int organiserId, String title, String description, 
                String eventType, String status, String location, Date date, Date createdAt) {
        this.eventId = eventId;
        this.organiserId = organiserId;
        this.title = title;
        this.description = description;
        this.eventType = eventType;
        this.status = status;
        this.location = location;
        this.date = date;
        this.createdAt = createdAt;
    }

    public Event() {}

    // eventId
    public int getEventId() { return eventId; }
    public void setEventId(int eventId) { this.eventId = eventId; }

    // organiser
    public int getOrganiser() { return organiserId; }
    public void setOrganiser(int organiserId) { this.organiserId = organiserId; }

    // title
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    // description
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    // eventType
    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }

    // status
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    // location
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    // date
    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }

    // createdAt
    public Date getCreatedAt() { return createdAt; }
    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
}