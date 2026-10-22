CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    event_id INT NOT NULL REFERENCES events(id)
)

