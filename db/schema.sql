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
  rating decimal(3, 2) NOT NULL,
  poster text NOT NULL
);

CREATE TABLE reservations (
  id serial PRIMARY KEY,
  movie_id int NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
  user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  is_reserved boolean NOT NULL,
  is_watched boolean NOT NULL
);
