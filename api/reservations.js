import express from "express";
const router = express.Router();
export default router;

import { getMovies, getMovieById } from "#db/queries/movies";

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";
import { createReservation } from "#db/queries/reservations";

router.use(requireUser);

router.get("/", async (req, res) => {
  const movies = await getReservationsByUserId(req.user.id);
  res.send(movies);
});

router.post("/", requireBody(["movieId"]), async (req, res) => {
  const { movieId } = req.body;
  const reservation = await createReservation(movieId, req.user.id);
  res.status(201).send(reservation);
});
