import db from "#db/client";

export async function addToHistory(resId) {
  const sql = `
    INSERT INTO watchhistory
        (reservation_id)
    VALUES
        ($1)
    RETURNING *
    `;
  const {
    rows: [reservation],
  } = await db.query(sql, [resId]);
  return reservation;
}

export async function gethistory(id) {
  const sql = `
    SELECT * FROM movies
    JOIN reservations ON movies.id = reservations.movie_id
    JOIN watchhistory ON reservations.id = watchhistory.reservation_id
    WHERE reservations.user_id = $1
    `;
  const { rows: reservations } = await db.query(sql, [id]);
  return reservations;
}
