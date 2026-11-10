DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password text NOT NULL
);

CREATE TABLE movies (
  id serial PRIMARY KEY,
  title text NOT NULL,
  date date NOT NULL,
  rating int NOT NULL,
  poster img NOT NULL
)
