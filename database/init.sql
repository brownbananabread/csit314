CREATE TABLE users (
 userId SERIAL PRIMARY KEY,
 email VARCHAR(50) UNIQUE NOT NULL,
 firstName VARCHAR(100) NOT NULL,
 lastName VARCHAR(50) NOT NULL,
 password VARCHAR(255) NOT NULL,
 role VARCHAR(10) CHECK (role IN ('customer', 'organiser')) NOT NULL DEFAULT 'customer',
 serviceOffered VARCHAR(50) NULL,
 createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample users with plain text passwords
INSERT INTO users (email, firstName, lastName, password, role, serviceOffered) VALUES
('john.doe@example.com', 'John', 'Doe', 'password123', 'customer', NULL),
('jane.smith@example.com', 'Jane', 'Smith', 'securepass', 'organiser', 'Wedding Planning'),
('mike.wilson@example.com', 'Mike', 'Wilson', 'mike2025', 'organiser', 'Corporate Events'),
('sarah.johnson@example.com', 'Sarah', 'Johnson', 'sarah1234', 'customer', NULL),
('david.brown@example.com', 'David', 'Brown', 'brownie22', 'organiser', 'Birthday Parties');

CREATE TABLE events (
 eventId SERIAL PRIMARY KEY,
 organiserId INT REFERENCES users(userId),
 title VARCHAR(100) NOT NULL,
 description TEXT NOT NULL,
 eventType VARCHAR(50) NOT NULL,
 status VARCHAR(10) CHECK (status IN ('upcoming', 'completed', 'cancelled')) NOT NULL DEFAULT 'upcoming',
 location VARCHAR(100) NOT NULL,
 date DATE NOT NULL,
 createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample events
INSERT INTO events (organiserId, title, description, eventType, status, location, date) VALUES
(2, 'Smith Wedding', 'Wedding ceremony and reception for Alice and Bob Smith', 'Wedding', 'upcoming', 'Grand Plaza Hotel, Sydney', '2025-06-15'),
(3, 'Annual Corporate Retreat', 'TechCorp annual team building and strategy event', 'Corporate', 'upcoming', 'Blue Mountains Resort', '2025-05-20'),
(5, 'Emmas 10th Birthday', 'Princess themed birthday party for Emma', 'Birthday', 'upcoming', '42 Cedar Street, Melbourne', '2025-04-30'),
(3, 'Product Launch Gala', 'Formal dinner and presentation for XYZ product launch', 'Corporate', 'upcoming', 'Harbour View Function Centre', '2025-07-10'),
(2, 'Johnson Anniversary', '25th wedding anniversary celebration', 'Anniversary', 'upcoming', 'Seaside Restaurant, Brisbane', '2025-08-05');

CREATE TABLE tickets (
 ticketId SERIAL PRIMARY KEY,
 eventId INT REFERENCES events(eventId),
 customerId INT REFERENCES users(userId),
 ticketType VARCHAR(10) CHECK (ticketType IN ('free', 'standard', 'premium')) NOT NULL,
 status VARCHAR(20) CHECK (status IN ('rejected', 'registered', 'payment_pending', 'confirmed')) NOT NULL DEFAULT 'registered',
 price DECIMAL(10, 2) NOT NULL,
 purchaseDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 notes TEXT
);

-- Insert sample tickets
INSERT INTO tickets (eventId, customerId, ticketType, status, price, notes) VALUES
(1, 1, 'standard', 'confirmed', 50.00, 'Main hall seating'),
(1, 4, 'premium', 'confirmed', 100.00, 'VIP table arrangement'),
(2, 1, 'standard', 'confirmed', 150.00, 'Includes accommodation'),
(3, 4, 'free', 'confirmed', 0.00, 'Family member'),
(4, 1, 'premium', 'payment_pending', 200.00, 'Awaiting payment confirmation'),
(5, 4, 'standard', 'registered', 75.00, 'Special dietary requirements noted');