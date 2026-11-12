DROP TABLE IF EXISTS watchhistory;
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS movies;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password text NOT NULL
);

CREATE TABLE movies (
  id serial PRIMARY KEY,
  title text NOT NULL,
  year int NOT NULL,
  rating real NOT NULL,
  poster text NOT NULL
);

CREATE TABLE reservations (
  id serial PRIMARY KEY,
  movie_id int NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
  user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE watchhistory (
  id serial PRIMARY KEY,
  reservation_id int NOT NULL REFERENCES reservations(id) ON DELETE CASCADE
);
