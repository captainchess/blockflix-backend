import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";

router
    .route("/")
    .get(async(req, res) => {
        const movies = await getMovies();
        res.send(movies);
    });

router
    .route("/:id")
    .get(async(req, res) => {
        const movie = await getMovieByUserId(req.user.id);
        if(!movie) return res.status(400).send("Movie not found.");
        res.send(movie);
    });