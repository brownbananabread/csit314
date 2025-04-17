package server.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.util.Date;

@Entity
public class Ticket {
    @Id
    private int ticketId;
    private int eventId;
    private int customerId;
    private String ticketType;
    private String status;
    private float price;
    private Date purchaseDate;
    private String notes;

    public Ticket(int ticketId, int eventId, int customerId, String ticketType,
                 String status, float price, Date purchaseDate, String notes) {
        this.ticketId = ticketId;
        this.eventId = eventId;
        this.customerId = customerId;
        this.ticketType = ticketType;
        this.status = status;
        this.price = price;
        this.purchaseDate = purchaseDate;
        this.notes = notes;
    }

    public Ticket() {}

    // ticketId
    public int getTicketId() { return ticketId; }
    public void setTicketId(int ticketId) { this.ticketId = ticketId; }

    // eventId
    public int getEventId() { return eventId; }
    public void setEventId(int eventId) { this.eventId = eventId; }

    // customerId
    public int getCustomerId() { return customerId; }
    public void setCustomerId(int customerId) { this.customerId = customerId; }

    // ticketType
    public String getTicketType() { return ticketType; }
    public void setTicketType(String ticketType) { this.ticketType = ticketType; }

    // status
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    // price
    public float getPrice() { return price; }
    public void setPrice(float price) { this.price = price; }

    // purchaseDate
    public Date getPurchaseDate() { return purchaseDate; }
    public void setPurchaseDate(Date purchaseDate) { this.purchaseDate = purchaseDate; }

    // notes
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}