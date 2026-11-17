import db from "#db/client";

export async function createReservation(movieId, userId, reserved, watched) {
  const sql = `
  INSERT INTO reservations
    (movie_id, user_id, is_reserved, is_watched)
  VALUES
    ($1, $2, $3, $4)
  RETURNING *
  `;
  const {
    rows: [reservation],
  } = await db.query(sql, [movieId, userId, reserved, watched]);
  return reservation;
}

export async function getReservation(movieId, userId) {
  const sql = `
  SELECT * FROM reservations
  WHERE movie_id = $1 
  AND user_id = $2
  AND is_reserved = true
  LIMIT 1
  `;
  const {
    rows: [reservation],
  } = await db.query(sql, [movieId, userId]);
  if(!reservation) return null;
  
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
