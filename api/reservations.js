import express from "express";
const router = express.Router();
export default router;

import { getMovies, getMovieById } from "#db/queries/movies";

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";
import { createReservation } from "#db/queries/reservations";

router.use(requireUser);

router.get("/", async (req, res) => {
  const playlists = await getMovieById(req.user.id);
  res.send(playlists);
});

router.post("/", requireBody(["title"]), async (req, res) => {
  const { title } = req.body;
  const playlist = await createReservation(movieid, title, req.user.id);
  res.status(201).send(playlist);
});

if (playlist.user_id !== req.user.id)
  return res
    .status(403)
    .send("You need to be logged in to reserve this movie.");

req.playlist = playlist;
next();

router.get("/:id", (req, res) => {
  res.send(req.playlist);
});
