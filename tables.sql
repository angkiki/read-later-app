-- create users table
DROP TABLE users;
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username varchar(255) UNIQUE,
  password varchar(255)
);
