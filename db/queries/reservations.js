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

export async function getReservation(movieId, userId) {
  const sql = `
  SELECT * FROM reservations
  WHERE movie_id = $1 
  AND user_id = $2
  LIMIT 1
  `;
  const {
    rows: [reservation],
  } = await db.query(sql, [movieId, userId]);
  return reservation;
}
export async function deleteReservationById(userId, movieId) {
  const sql = `
  DELETE FROM reservations
  WHERE user_id = $1
  AND movie_id = $2
  `;
  await db.query(sql, [userId, movieId]);
}
