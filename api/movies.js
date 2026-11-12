import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import { getMovieById, getMovies } from "#db/queries/movies";

router
    .route("/")
    .get(async(req, res) => {
        const movies = await getMovies();
        res.send(movies);
    });

router.param("id", async (req, res, next, id) => {
  const movie = await getMovieById(id);
  if (!movie) return res.status(404).send("Movie not found.");

  req.movie = movie;
  next();
});

router
    .route("/:id")
    .get(async(req, res) => {
        res.send(req.movie);
    });
    