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
