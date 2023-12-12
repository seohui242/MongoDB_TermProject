const express = require("express");
const router = express.Router();
const { Reservation } = require("../models/reservation");

router.post("/", async (req, res) => {
  try {
    const { user, accommodation, count, checkIn, checkOut, status, price, starRate, review} = req.body;
    console.log(req.body)
    const reservation = new Reservation(req.body);
    await reservation.save();
    return res.send(reservation);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const reservation = await Reservation.find({});
    return res.send({ reservation });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).send({ err: 'reservation not found' });

    return res.send({
      reservation
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const reservationId = req.params.id;

    const { status } = req.body;

    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      { status },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).send({ err: 'Reservation not found' });
    }

    return res.send({ updatedReservation });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ err: err.message });
  }
});

module.exports = router;
