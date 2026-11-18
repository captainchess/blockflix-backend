import db from "#db/client";

export async function createMovie(title, year, rating, poster) {
  const sql = `
  INSERT INTO movies
    (title, year, rating, poster)
  VALUES
    ($1, $2, $3, $4)
  RETURNING *
  `;
  const {
    rows: [movie],
  } = await db.query(sql, [title, year, rating, poster]);
  return movie;
}

export async function getMovies() {
  const sql = `
    SELECT * FROM movies
    `;
  const { rows: movies } = await db.query(sql);
  return movies;
}

export async function getMovieById(id) {
  const sql = `
  SELECT *
  FROM movies
  WHERE id = $1
  `;
  const { rows: [movie] } = await db.query(sql, [id]);
  return movie;
}

export async function getMoviesInReservationsByUserId(userId) {
  const sql = `
  SELECT movies.* FROM movies
  JOIN reservations ON movies.id = reservations.movie_id
  WHERE user_id = $1
  `;
  const { rows: movies } = await db.query(sql, [userId]);
  if (!movies) return null;
  return movies;
}

export async function getMovieInReservations(userId, movieId) {
  const sql = `
  SELECT movies.* FROM movies
  JOIN reservations ON movies.id = reservations.movie_id
  WHERE user_id = $1
  AND movie_id = $2
  AND is_reserved = true
  `;
  const { rows: [movie] } = await db.query(sql, [userId, movieId]);
  return movie;
}
