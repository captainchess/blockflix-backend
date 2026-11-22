import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";
import {
  createReservation,
  deleteReservationById,
  getReservation,
  updateMovieInReservations,
  updateWatched,
} from "#db/queries/reservations";
import { getMovieInReservations } from "#db/queries/movies";

router.use(requireUser);

router.get("/:id", async (req, res) => {
  const movieId = req.params.id;
  const reservation = await getReservation(movieId, req.user.id);
  res.send(reservation);
});

/** add movie and user to reservations */
router.post("/", requireBody(["movieId"]), async (req, res) => {
  const { movieId } = req.body;
  // Check if this movie is already in the reservations table
  // If it is, just update the is_reserved property on that row
  const reservedMovie = await getMovieInReservations(req.user.id, movieId);

  if (!reservedMovie) {
    const reservation = await createReservation(
      movieId,
      req.user.id,
      true,
      false,
    );
    res.status(201).send(reservation);
  } else {
    const reservation = await updateMovieInReservations(req.user.id, movieId);
    res.send(reservation);
  }
});

/** Updates the is_watched property in Reservations Table */
router.put("/", requireBody(["movieId", "watched"]), async (req, res) => {
  const { movieId, watched } = req.body;
  const response = await updateWatched(watched, req.user.id, movieId);
  res.send(response);
});

/** delete the reservation from table */
router.put("/:id", async (req, res) => {
  const movieId = req.params.id;
  const userId = req.user.id;
  await deleteReservationById(userId, movieId);
  res.sendStatus(204);
});
