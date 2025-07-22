-- DROP TABLES (in dependency-safe order)
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS reactions;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS shares;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS logins;
DROP TABLE IF EXISTS users;

-- ENUMS
CREATE TYPE user_status_enum AS ENUM ('active', 'inactive', 'banned');
CREATE TYPE friendship_status_enum AS ENUM ('pending', 'accepted', 'blocked');
CREATE TYPE reaction_enum AS ENUM ('like', 'love', 'haha', 'wow', 'sad', 'angry');

-- USERS
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  firstname VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
  username VARCHAR UNIQUE NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  phonenumber VARCHAR UNIQUE,
  password VARCHAR NOT NULL,
  profile_image_url VARCHAR,
  status user_status_enum DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- POSTS
CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  content_text TEXT,
  content_image_url VARCHAR,
  content_video_url VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- COMMENTS
CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  parent_comment_id INT,
  content_text TEXT,
  content_image_url VARCHAR,
  content_video_url VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (parent_comment_id) REFERENCES comments(comment_id) ON DELETE CASCADE
);

-- REACTIONS
CREATE TABLE reactions (
  reaction_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  post_id INT,
  comment_id INT,
  reaction_type reaction_enum NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
  FOREIGN KEY (comment_id) REFERENCES comments(comment_id) ON DELETE CASCADE,
  CHECK (
    (post_id IS NOT NULL AND comment_id IS NULL) OR
    (post_id IS NULL AND comment_id IS NOT NULL)
  )
);

-- FRIENDSHIPS
CREATE TABLE friendships (
  friendship_id SERIAL PRIMARY KEY,
  user_id1 INT NOT NULL,
  user_id2 INT NOT NULL,
  status friendship_status_enum DEFAULT 'pending',
  FOREIGN KEY (user_id1) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id2) REFERENCES users(user_id) ON DELETE CASCADE,
  UNIQUE (user_id1, user_id2)
);

-- SHARES
CREATE TABLE shares (
  share_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  caption VARCHAR,
  share_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
);

-- MESSAGES
CREATE TABLE messages (
  message_id SERIAL PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  content_text TEXT,
  content_image_url VARCHAR,
  content_video_url VARCHAR,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- NOTIFICATIONS
CREATE TABLE notifications (
  notification_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  post_id INT,
  share_id INT,
  comment_id INT,
  message_id INT,
  content TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
  FOREIGN KEY (share_id) REFERENCES shares(share_id) ON DELETE CASCADE,
  FOREIGN KEY (comment_id) REFERENCES comments(comment_id) ON DELETE CASCADE,
  FOREIGN KEY (message_id) REFERENCES messages(message_id) ON DELETE CASCADE
);
