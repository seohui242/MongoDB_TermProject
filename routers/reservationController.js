const express = require("express");
const router = express.Router();
const { Reservation } = require("../models/reservation");

router.post("/", async (req, res) => {
  try {
    const { user, accommodation, count, checkIn, checkOut, status, price, starRate, review} = req.body;
    const reservation = new Reservation(req.body);
    await reservation.save();
    return res.send({ house });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const reservation = await Reservation.find({});
    return res.send({ lodgings });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: err.message });
  }
});

module.exports = router;
