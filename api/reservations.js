import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";
import {
  createReservation,
  deleteReservationById,
  getReservation,
} from "#db/queries/reservations";

import { getMoviesInReservationsByUserId } from "#db/queries/movies";

router.use(requireUser);

/** Get the users reserved movies */
router.get("/", async (req, res) => {
  const movies = await getMoviesInReservationsByUserId(req.user.id);
  res.send(movies);
});

router.get("/:id", async(req, res) => {
  const { id } = req.params;
  const reservation = await getReservation(id, req.user.id);
  res.send(reservation);
}); 

/** add movie and user to reservations */
router.post("/", requireBody(["movieId"]), async (req, res) => {
  const { movieId } = req.body;
  const reservation = await createReservation(movieId, req.user.id);
  res.status(201).send(reservation);
});

/** delete the reservation from table */
router.delete("/:id", async (req, res) => {
  const movieId = req.params.id;
  const userId = req.user.id;
  await deleteReservationById(userId, movieId);
  res.sendStatus(204);
});
