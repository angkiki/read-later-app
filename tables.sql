-- create users table
DROP TABLE users;
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username varchar(255) UNIQUE,
  password varchar(255)
);

-- create bookmarks table
DROP TABLE bookmarks;
CREATE TABLE IF NOT EXISTS bookmarks (
  id SERIAL PRIMARY KEY,
  title varchar(255),
  user_id integer
);

-- create links table
DROP TABLE links;
CREATE TABLE IF NOT EXISTS links (
  id SERIAL PRIMARY KEY,
  bookmark_id INTEGER,
  description varchar(255),
  url varchar(255)
);
