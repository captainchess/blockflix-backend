import express from "express";
const router = express.Router();
export default router;

import { getMovies, getMovieById } from "#db/queries/movies";

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";
import { createReservation } from "#db/queries/reservations";

router.use(requireUser);

router.get("/", async (req, res) => {
  const movie = await getMovieById(req.user.id);
  res.send(movie);
});

router.post("/", requireBody(["movieId"]), async (req, res) => {
  const { movieId } = req.body;
  const reservation = await createReservation(movieId, req.user.id);
  res.status(201).send(reservation);
});

if (movie.user_id !== req.user.id)
  return res
    .status(403)
    .send("You need to be logged in to reserve this movie.");

req.movie = movie;
next();

router.get("/:id", (req, res) => {
  res.send(req.movie);
});
