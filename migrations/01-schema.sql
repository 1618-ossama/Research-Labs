CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    password_hash TEXT NOT NULL,

    first_name VARCHAR(50),
    last_name VARCHAR(50),
    bio TEXT,
    photo_url VARCHAR(50),


    role VARCHAR(50) CHECK (role IN ('ADMIN', 'RESEARCHER', 'LEADER', 'GUEST')) NOT NULL ,
    status VARCHAR(50) CHECK (status IN ('ACTIVE', 'INACTIVE', 'SUSPENDED')) DEFAULT 'INACTIVE',

    affiliation VARCHAR(50),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE links(
    id UUID PRIMARY KEY,
    type VARCHAR(50) CHECK (type IN ('LINKEDIN', 'GITHUB', 'WEBSITE', 'RESEARCHGATE', 'OTHER')) DEFAULT 'LINKEDIN',
    link VARCHAR(255),
    user_id UUID NOT NULL REFERENCES users(id)

);


-- Table for publications 
CREATE TABLE publications (
    id UUID PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    journal TEXT NOT NULL,
    status VARCHAR(50) CHECK (status IN ('DRAFT', 'APPROVED', 'WAITING')) NOT NULL DEFAULT 'DRAFT',
    visibility VARCHAR(50) CHECK (visibility IN ('PUBLIC', 'PRIVATE')) NOT NULL DEFAULT 'PRIVATE',
    submitter_id UUID NOT NULL REFERENCES users(id),
    conference_id UUID REFERENCES conferences(id),
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table for publications files
CREATE TABLE publication_files (
    id UUID PRIMARY KEY,
    file_type VARCHAR(50) NOT NULL,
    file_path VARCHAR(50) NOT NULL,
    publication_id UUID NOT NULL REFERENCES publications(id)


);

CREATE TABLE groups(
    id UUID PRIMARY KEY,
    title VARCHAR(50) NOT NULL DEFAULT 'default title',
    description VARCHAR(50) NOT NULL DEFAULT 'default title',
    status VARCHAR(50) CHECK (status IN ('ONGOINING', 'SUSPENDED', 'FINISHED', 'DELETED')) NOT NULL DEFAULT 'ONGOINING',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    leader_id UUID NOT NULL REFERENCES users(id),
    publication_id UUID NOT NULL REFERENCES publications(id)
);


-- Table for group_user 
CREATE TABLE group_user(
    user_id UUID NOT NULL REFERENCES users(id),
    group_id UUID NOT NULL REFERENCES groups(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- Table for conferences
CREATE TABLE conferences (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL
);

CREATE TABLE Speaker (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    conference_id UUID NOT NULL REFERENCES conferences(id),
    affiliation VARCHAR(255),
    title VARCHAR(255), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
    

-- Update the publications table to include a conference reference

-- Table for messages (communication feature)
--
CREATE TABLE messages (
    id UUID PRIMARY KEY,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) CHECK (status IN ('SENT', 'READ', 'ARCHIVED')) DEFAULT 'SENT',
    sender_id UUID NOT NULL REFERENCES users(id),
    receiver_id UUID NOT NULL REFERENCES users(id)
);

-- Table for notifications (communication feature)
CREATE TABLE notifications (
    id UUID PRIMARY KEY,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    read_status BOOLEAN DEFAULT FALSE,
    user_id UUID NOT NULL REFERENCES users(id)
);
