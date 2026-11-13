import db from "#db/client";

export async function createReservation(movieId, userId) {
  const sql = `
  INSERT INTO reservations
    (movie_id, user_id)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [reservation],
  } = await db.query(sql, [movieId, userId]);
  return reservation;
}

export async function getReservationsByUserId(userId) {
  const sql = `
  SELECT * FROM movies
  JOIN reservations ON movies.id = reservations.movie_id
  WHERE user_id = $1
  `;
  const { rows: movies } = await db.query(sql, [userId]);
  return movies;
}
