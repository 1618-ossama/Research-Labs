-- Mock Data for the 'users' table
INSERT INTO users (id, username, email, password_hash, role, created_at, updated_at) VALUES
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'admin_user', 'admin@example.com', 'hashed_password_admin_1', 'admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('b2c3d4e5-f6a7-8901-2345-67890abcdef1', 'researcher_alice', 'alice.r@example.com', 'hashed_password_alice_2', 'researcher', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('c3d4e5f6-a7b8-9012-3456-7890abcdef12', 'researcher_bob', 'bob.r@example.com', 'hashed_password_bob_3', 'researcher', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('d4e5f6a7-b8c9-0123-4567-890abcdef123', 'leader_carol', 'carol.l@example.com', 'hashed_password_carol_4', 'leader', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('e5f6a7b8-c9d0-1234-5678-90abcdef1234', 'leader_david', 'david.l@example.com', 'hashed_password_david_5', 'leader', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('f6a7b8c9-d0e1-2345-6789-0abcdef12345', 'researcher_eve', 'eve.r@example.com', 'hashed_password_eve_6', 'researcher', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Mock Data for the 'groups' table
INSERT INTO groups (id, title, description, status, created_at, leader_id) VALUES
('11223344-5566-7788-9900-aabbccddeeff', 'Quantum Computing Lab', 'Research on quantum algorithms and hardware.', 'OPENED', NOW(), 'd4e5f6a7-b8c9-0123-4567-890abcdef123'), -- leader_carol
('22334455-6677-8899-00aa-bbccddeeff11', 'AI Ethics Group', 'Discussing ethical implications of AI.', 'OPENED', NOW(), 'e5f6a7b8-c9d0-1234-5678-90abcdef1234'), -- leader_david
('33445566-7788-9900-aabb-ccddeeff1122', 'Robotics Research', 'Developing autonomous systems.', 'CLOSED', NOW(), 'd4e5f6a7-b8c9-0123-4567-890abcdef123'); -- leader_carol

-- Mock Data for the 'group_user' table
INSERT INTO group_user (leader_id, group_id) VALUES
('d4e5f6a7-b8c9-0123-4567-890abcdef123', '11223344-5566-7788-9900-aabbccddeeff'), -- carol in Quantum Computing Lab (as leader)
('b2c3d4e5-f6a7-8901-2345-67890abcdef1', '11223344-5566-7788-9900-aabbccddeeff'), -- alice in Quantum Computing Lab
('c3d4e5f6-a7b8-9012-3456-7890abcdef12', '11223344-5566-7788-9900-aabbccddeeff'), -- bob in Quantum Computing Lab
('e5f6a7b8-c9d0-1234-5678-90abcdef1234', '22334455-6677-8899-00aa-bbccddeeff11'), -- david in AI Ethics Group (as leader)
('b2c3d4e5-f6a7-8901-2345-67890abcdef1', '22334455-6677-8899-00aa-bbccddeeff11'), -- alice in AI Ethics Group
('f6a7b8c9-d0e1-2345-6789-0abcdef12345', '22334455-6677-8899-00aa-bbccddeeff11'), -- eve in AI Ethics Group
('d4e5f6a7-b8c9-0123-4567-890abcdef123', '33445566-7788-9900-aabb-ccddeeff1122'), -- carol in Robotics Research (as leader)
('c3d4e5f6-a7b8-9012-3456-7890abcdef12', '33445566-7788-9900-aabb-ccddeeff1122'); -- bob in Robotics Research

-- Mock Data for the 'publications' table
INSERT INTO publications (id, title, journal, status, submitter_id, submitted_at) VALUES
('44556677-8899-00aa-bbcc-ddeeff112233', 'A Novel Quantum Algorithm', 'Journal of Quantum Physics', 'APPROVED', 'b2c3d4e5-f6a7-8901-2345-67890abcdef1', NOW()), -- alice submitted
('55667788-9900-aabb-ccdd-eeff11223344', 'Ethical Framework for Generative AI', 'AI Ethics Review', 'WAITING', 'e5f6a7b8-c9d0-1234-5678-90abcdef1234', NOW()), -- david submitted
('66778899-00aa-bbcc-ddee-ff1122334455', 'Design of a Collaborative Robot Arm', 'Robotics Today', 'DRAFT', 'c3d4e5f6-a7b8-9012-3456-7890abcdef12', NOW()), -- bob submitted
('77889900-aabb-ccdd-eeff-112233445566', 'Improving Qubit Stability', 'Physical Review Letters', 'WAITING', 'b2c3d4e5-f6a7-8901-2345-67890abcdef1', NOW()); -- alice submitted

-- Mock Data for the 'publication_files' table
INSERT INTO publication_files (id, file_type, file_path, publication_id) VALUES
('889900aa-bbcc-ddee-ff11-223344556677', 'pdf', '/files/pub1_main.pdf', '44556677-8899-00aa-bbcc-ddeeff112233'), -- file for Quantum Algorithm
('9900aabb-ccdd-eeff-1122-334455667788', 'latex', '/files/pub1_source.tex', '44556677-8899-00aa-bbcc-ddeeff112233'), -- file for Quantum Algorithm
('aabbccdd-eeff-1122-3344-556677889900', 'pdf', '/files/pub2_draft.pdf', '55667788-9900-aabb-ccdd-eeff11223344'), -- file for AI Ethics Framework
('bbccddff-ee11-2233-4455-6677889900aa', 'docx', '/files/pub3_report.docx', '66778899-00aa-bbcc-ddee-ff1122334455'); -- file for Robot Arm
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
