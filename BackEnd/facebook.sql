DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS reactions;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

-- Enum types for reaction and friendship status
CREATE TYPE reaction_enum AS ENUM ('like', 'love', 'haha', 'wow', 'sad', 'angry');
CREATE TYPE friendship_status_enum AS ENUM ('pending', 'accepted', 'declined', 'blocked');

-- Users table
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  firstname VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
  username VARCHAR UNIQUE NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  phonenumber VARCHAR UNIQUE,
  password VARCHAR NOT NULL,
  profile_image_url VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Logins table
CREATE TABLE logins (
  login_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_logins_user_id ON logins(user_id);

-- Posts table
CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(user_id),
  content_text TEXT,
  content_image_url VARCHAR,
  content_video_url VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CHECK (
    content_text IS NOT NULL OR 
    content_image_url IS NOT NULL OR 
    content_video_url IS NOT NULL
  )
);

CREATE INDEX idx_posts_user_id ON posts(user_id);

-- Comments table (supports nested comments via parent_comment_id)
CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY,
  post_id INT NOT NULL REFERENCES posts(post_id),
  user_id INT NOT NULL REFERENCES users(user_id),
  parent_comment_id INT REFERENCES comments(comment_id),
  content_text TEXT,
  content_image_url VARCHAR,
  content_video_url VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CHECK (
    content_text IS NOT NULL OR 
    content_image_url IS NOT NULL OR 
    content_video_url IS NOT NULL
  )
);

CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);

-- Reactions table (polymorphic target)
CREATE TABLE reactions (
  reaction_id SERIAL PRIMARY KEY,
  target_type VARCHAR NOT NULL, -- e.g., 'post', 'comment', 'message'
  target_id INT NOT NULL,
  user_id INT NOT NULL REFERENCES users(user_id),
  reaction_type reaction_enum NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reactions_user_id ON reactions(user_id);
CREATE INDEX idx_reactions_target ON reactions(target_type, target_id);

-- Friendships table
CREATE TABLE friendships (
  friendship_id SERIAL PRIMARY KEY,
  user_id1 INT NOT NULL REFERENCES users(user_id),
  user_id2 INT NOT NULL REFERENCES users(user_id),
  status friendship_status_enum NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CHECK (user_id1 <> user_id2)
);

-- Ensure one unique friendship pair (user_id1 < user_id2)
CREATE UNIQUE INDEX idx_unique_friendship ON friendships (
  LEAST(user_id1, user_id2), GREATEST(user_id1, user_id2)
);

CREATE INDEX idx_friendships_user1 ON friendships(user_id1);
CREATE INDEX idx_friendships_user2 ON friendships(user_id2);

-- Notifications table
CREATE TABLE notifications (
  notification_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(user_id),
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);

-- Messages table
CREATE TABLE messages (
  message_id SERIAL PRIMARY KEY,
  sender_id INT NOT NULL REFERENCES users(user_id),
  receiver_id INT NOT NULL REFERENCES users(user_id),
  content_text TEXT,
  content_image_url VARCHAR,
  content_video_url VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CHECK (
    content_text IS NOT NULL OR 
    content_image_url IS NOT NULL OR 
    content_video_url IS NOT NULL
  )
);

CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_receiver ON messages(receiver_id);
