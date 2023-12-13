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

router.get("/myReservations/:userId/:status", async (req, res) => {
  try {
    const status = req.params.status;
    const userId = req.params.userId;
    const myReservations = await Reservation.find({ user: userId, status: status }).populate("accommodation");
    console.log(myReservations)
    res.send(myReservations)
  } catch (error) {
    console.error("Error fetching my reservations:", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.get("/myReservations/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const myReservations = await Reservation.find({ user: userId}).populate("accommodation");
    console.log(myReservations)
    res.send(myReservations)
  } catch (error) {
    console.error("Error fetching my reservations:", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.put("/review/:id", async (req, res) => {
  try {
    const reservationId = req.params.id;

    const reservation = await Reservation.findById(reservationId);
    
    if (reservation.status == '체크인') {
      return res.status(400).send({ error: '리뷰를 작성할 수 있는 예약이 아닙니다.' });
    }

    const { starRate, review } = req.body;

    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      { starRate, review },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).send({ error: 'Reservation not found' });
    }

    return res.send({ updatedReservation });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: err.message });
  }
});

module.exports = router;
