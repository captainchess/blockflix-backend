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

router.use(requireUser);

router.get("/:id", async (req, res) => {
  const movieId = req.params.id;
  const reservation = await getReservation(movieId, req.user.id);
  res.send(reservation);
});

/** add movie and user to reservations */
router.post("/", requireBody(["movieId"]), async (req, res) => {
  const { movieId } = req.body;
  const reservation = await createReservation(
    movieId,
    req.user.id,
    true,
    false,
  );
  res.status(201).send(reservation);
});

/** Updates the is_watched property in Reservations Table */
router.put("/", requireBody(["movieId", "watched"]), async (req, res) => {
  const { movieId, watched } = req.body;
  const response = await updateWatched(watched, req.user.id, movieId);
  res.send(response);
});

/** delete the reservation from table */
router.delete("/:id", async (req, res) => {
  const movieId = req.params.id;
  const userId = req.user.id;
  await deleteReservationById(userId, movieId);
  res.sendStatus(204);
});
