CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    password_hash TEXT NOT NULL,
    role VARCHAR(50) CHECK (role IN ('admin', 'researcher', 'leader')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Table for publications 
CREATE TABLE publications (
    id UUID PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    journal TEXT NOT NULL,
    status VARCHAR(50) CHECK (status IN ('DRAFT', 'APPROVED', 'WAITING')) NOT NULL DEFAULT 'DRAFT',
    submitter_id UUID NOT NULL REFERENCES users(id),
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table for publications files
CREATE TABLE publication_files (
    id UUID PRIMARY KEY,
    file_type VARCHAR(50) NOT NULL,
    file_path VARCHAR(50) NOT NULL,
    publication_id UUID NOT NULL 

);

CREATE TABLE groups(
    id UUID PRIMARY KEY,
    title VARCHAR(50) NOT NULL DEFAULT 'default title',
    description VARCHAR(50) NOT NULL DEFAULT 'default title',
    status VARCHAR(50) CHECK (status IN ('OPENED', 'CLOSED', 'DELETED')) NOT NULL DEFAULT 'OPENED',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    leader_id UUID NOT NULL REFERENCES users(id)
);

CREATE TABLE group_user(
    leader_id UUID NOT NULL REFERENCES users(id),
    group_id UUID NOT NULL REFERENCES groups(id)
);


-- -- Table for experiments
-- CREATE TABLE IF NOT EXISTS experiments (
--     id SERIAL PRIMARY KEY,
--     name TEXT NOT NULL,
--     description TEXT,
--     status TEXT,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- Foreign key to reference the user who created the experiment
ALTER TABLE publication_files ADD CONSTRAINT fk_pub FOREIGN KEY (publication_id) REFERENCES publications(id);
