import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import {
  getMovieById,
  getMovies,
  getMoviesInReservationsByUserId,
  getMovieInReservations,
} from "#db/queries/movies";

router.use(requireUser);

router.route("/").get(async (req, res) => {
  const movies = await getMovies();
  res.send(movies);
});

/** Get the users reserved movies */
router.get("/reservations", async (req, res) => {
  const movies = await getMoviesInReservationsByUserId(req.user.id);
  res.send(movies);
});

router.param("id", async (req, res, next, id) => {
  const movie = await getMovieById(id);
  if (!movie) return res.status(404).send("Movie not found.");

  req.movie = movie;
  next();
});

router.get("/:movieId/reservations", async (req, res) => {
  const { movieId } = req.params;
  const reservation = await getMovieInReservations(req.user.id, movieId);
  res.send(reservation);
});

router.route("/:id").get(async (req, res) => {
  res.send(req.movie);
});
