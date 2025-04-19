CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    email VARCHAR(255) UNIQUE,
    role VARCHAR(50) CHECK (role IN ('admin', 'researcher', 'leader')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for research papers
CREATE TABLE IF NOT EXISTS research_papers (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    journal TEXT NOT NULL,
    published_date DATE
);

-- Table for experiments
CREATE TABLE IF NOT EXISTS experiments (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Foreign key to reference the user who created the experiment
ALTER TABLE experiments ADD COLUMN created_by INT;
ALTER TABLE experiments ADD CONSTRAINT fk_user FOREIGN KEY (created_by) REFERENCES users(id);
