import requireBody from "#middleware/requireBody";
import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";

router.use(requireUser);

router
    .route("/")
    .post(requireBody(["reservationId"]), async(req, res) => {
        const { resId } = req.body;

        const movie = await addToHistory(resId);
        res.status(201).send(movie);
    });