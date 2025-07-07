-- Insert demo rooms
INSERT INTO rooms (name, capacity, type, location, floor, is_external, price_per_hour, image_url, description, is_available, created_at, updated_at) VALUES
('Executive Conference Room', 12, 'CONFERENCE', 'Building A', 5, false, null, 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1', 'Premium conference room with city views and state-of-the-art equipment.', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Innovation Lab', 8, 'MEETING', 'Building B', 3, false, null, 'https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1', 'Modern meeting space designed for creative collaboration and innovation.', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Training Center', 20, 'TRAINING', 'Building C', 2, false, null, 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1', 'Spacious training facility with flexible seating arrangements.', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Sky Lounge', 15, 'CONFERENCE', 'Rooftop', 10, true, 150.0, 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1', 'Exclusive rooftop venue perfect for client meetings and special events.', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Focus Pod', 4, 'PRIVATE', 'Building A', 2, false, null, 'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1', 'Intimate space for small team discussions and private calls.', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Collaboration Hub', 25, 'MEETING', 'Building B', 1, false, null, 'https://images.pexels.com/photos/1181715/pexels-photo-1181715.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1', 'Large, flexible workspace designed for team collaboration and workshops.', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert equipment for rooms
INSERT INTO room_equipment (room_id, equipment) VALUES
(1, 'Projector'), (1, 'Video Conference'), (1, 'Whiteboard'), (1, 'Coffee Machine'),
(2, 'Smart Board'), (2, 'Wireless Display'), (2, 'Collaboration Tools'),
(3, 'Projector'), (3, 'Sound System'), (3, 'Flip Charts'), (3, 'Breakout Areas'),
(4, 'Panoramic Views'), (4, 'Catering Service'), (4, 'Outdoor Terrace'),
(5, 'Video Conference'), (5, 'Noise Cancellation'), (5, 'Ergonomic Furniture'),
(6, 'Multiple Displays'), (6, 'Modular Seating'), (6, 'Digital Whiteboard'), (6, 'Refreshment Area');