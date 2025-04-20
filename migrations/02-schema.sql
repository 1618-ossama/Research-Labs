CREATE EXTENSION IF NOT EXISTS "ltree";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE publication_status AS ENUM (
    'UNDER_REVIEW',
    'PUBLISHED',
'DRAFT',
    'ARCHIVED'
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    password_hash TEXT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    avatar_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT false,
    supervisor_id UUID REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login TIMESTAMPTZ,
    last_updated_at TIMESTAMPTZ DEFAULT NOW(),
    CHECK (supervisor_id != id)
);


CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE,
    parent_role_id UUID REFERENCES roles(id)
);

CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE role_permissions (
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    context JSONB,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE user_roles (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    attributes JSONB,
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE publications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    status publication_status NOT NULL DEFAULT 'DRAFT',
    submitter_id UUID NOT NULL REFERENCES users(id),
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE keywords (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    term VARCHAR(100) NOT NULL UNIQUE,
    canonical_id UUID REFERENCES keywords(id)
);

CREATE TABLE publication_keywords (
    publication_id UUID NOT NULL REFERENCES publications(id) ON DELETE CASCADE,
    keyword_id UUID NOT NULL REFERENCES keywords(id) ON DELETE CASCADE,
    PRIMARY KEY (publication_id, keyword_id)
);

CREATE TABLE publication_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    publication_id UUID NOT NULL REFERENCES publications(id) ON DELETE CASCADE,
    content_hash BYTEA NOT NULL UNIQUE,
    file_type VARCHAR(50) NOT NULL,
    version INTEGER NOT NULL CHECK (version > 0),
    valid_from TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    valid_to TIMESTAMPTZ,
    EXCLUDE USING gist (publication_id WITH =, valid_from WITH <>, valid_to WITH <>)  -- No overlapping versions
);

CREATE TABLE chats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user1_id UUID NOT NULL REFERENCES users(id),
    user2_id UUID NOT NULL REFERENCES users(id),
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_message_at TIMESTAMPTZ,
    EXCLUDE USING gist (
        LEAST(user1_id, user2_id) WITH =,
        GREATEST(user1_id, user2_id) WITH =
    )
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chat_id UUID NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id),
    content TEXT NOT NULL CHECK (length(content) > 0),
    sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    search_vector TSVECTOR GENERATED ALWAYS AS (to_tsvector('english', content)) STORED
);

CREATE INDEX idx_message_search ON messages USING GIN (search_vector);

CREATE TABLE message_reads (
    message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    read_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (message_id, user_id)
);

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    priority SMALLINT NOT NULL DEFAULT 3 CHECK (priority BETWEEN 1 AND 5),
    is_read BOOLEAN NOT NULL DEFAULT false,
    action_link JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notification_priority ON notifications (priority) WHERE priority < 3;

CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    publication_id UUID NOT NULL REFERENCES publications(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES users(id),
    content TEXT NOT NULL CHECK (length(content) >= 2),
    path LTREE NOT NULL,
    posted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE comment_ancestors (
    ancestor_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
    descendant_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
    depth INTEGER NOT NULL CHECK (depth > 0),
    PRIMARY KEY (ancestor_id, descendant_id)
);

CREATE TABLE comment_edits (
    comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
    editor_id UUID NOT NULL REFERENCES users(id),
    edit_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    previous_content TEXT NOT NULL,
    PRIMARY KEY (comment_id, edit_time)
);

CREATE OR REPLACE FUNCTION update_last_updated()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_last_updated
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_last_updated();

CREATE OR REPLACE FUNCTION update_chat_activity()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE chats SET last_message_at = NEW.sent_at WHERE id = NEW.chat_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER message_activity
AFTER INSERT ON messages
FOR EACH ROW EXECUTE FUNCTION update_chat_activity();


INSERT INTO users (email, password_hash, first_name, last_name)
SELECT 
  'user' || i || '@example.com',
  'hashed_password_' || i,
  'First' || i,
  'Last' || i
FROM generate_series(1, 5) AS i;

INSERT INTO roles (name)
SELECT 'Role_' || i FROM generate_series(1, 5) AS i;

INSERT INTO permissions (name)
SELECT 'permission_' || i FROM generate_series(1, 5) AS i;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM (SELECT id FROM roles LIMIT 5) r,
     (SELECT id FROM permissions LIMIT 5) p
LIMIT 5;

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM (SELECT id FROM users LIMIT 5) u,
     (SELECT id FROM roles LIMIT 5) r
LIMIT 5;

INSERT INTO publications (title, status, submitter_id)
SELECT 'Publication ' || i, 'DRAFT', id
FROM (SELECT id FROM users LIMIT 5) u,
     generate_series(1, 5) i
LIMIT 5;

INSERT INTO keywords (term)
SELECT 'keyword_' || i FROM generate_series(1, 5) i;

INSERT INTO publication_keywords (publication_id, keyword_id)
SELECT p.id, k.id
FROM (SELECT id FROM publications LIMIT 5) p,
     (SELECT id FROM keywords LIMIT 5) k
LIMIT 5;

INSERT INTO publication_files (publication_id, content_hash, file_type, version)
SELECT p.id, decode(md5(random()::text), 'hex'), 'pdf', 1
FROM (SELECT id FROM publications LIMIT 5) p;

INSERT INTO chats (user1_id, user2_id)
SELECT u1.id, u2.id
FROM (SELECT id FROM users LIMIT 5) u1,
     (SELECT id FROM users OFFSET 1 LIMIT 5) u2
WHERE u1.id <> u2.id
LIMIT 5;

INSERT INTO messages (chat_id, sender_id, content)
SELECT c.id, u.id, 'Hello from user ' || u.email
FROM (SELECT id FROM chats LIMIT 5) c,
     (SELECT id, email FROM users LIMIT 5) u
LIMIT 5;

INSERT INTO message_reads (message_id, user_id)
SELECT m.id, u.id
FROM (SELECT id FROM messages LIMIT 5) m,
     (SELECT id FROM users LIMIT 5) u
LIMIT 5;

INSERT INTO notifications (user_id, type, title, message, priority)
SELECT id, 'SYSTEM', 'Welcome!', 'Hello, welcome to the platform.', 3
FROM (SELECT id FROM users LIMIT 5);

INSERT INTO comments (publication_id, author_id, content, path)
SELECT p.id, u.id, 'This is a comment by ' || u.email, text2ltree(i::text)
FROM generate_series(1, 5) i,
     (SELECT id FROM publications LIMIT 5) p,
     (SELECT id, email FROM users LIMIT 5) u
LIMIT 5;

INSERT INTO comment_ancestors (ancestor_id, descendant_id, depth)
SELECT c1.id, c2.id, 1
FROM (SELECT id FROM comments LIMIT 4) c1,
     (SELECT id FROM comments OFFSET 1 LIMIT 4) c2
WHERE c1.id <> c2.id
LIMIT 5;

INSERT INTO comment_edits (comment_id, editor_id, previous_content)
SELECT c.id, u.id, 'Old content for ' || c.id::text
FROM (SELECT id FROM comments LIMIT 5) c,
     (SELECT id FROM users LIMIT 5) u
LIMIT 5;



/* CREATE INDEX idx_user_supervision ON users (id, supervisor_id); */
/* CREATE INDEX idx_comment_path ON comments USING GIST (path); */
