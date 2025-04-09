CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL
);

INSERT INTO users (username, email)
VALUES ('admin', 'admin@example.com');

