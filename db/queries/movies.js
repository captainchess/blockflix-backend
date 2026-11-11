import db from "#db/client";

export async function addToMovies(title, year, rating, poster) {
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

export async function getMovieByUserId(id) {
  const sql = `
  SELECT *
  FROM movies
  WHERE id = $1
  `;
  const { rows: movie } = await db.query(sql, [id]);
  return movie;
}
