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