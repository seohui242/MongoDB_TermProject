const express = require("express");
const router = express.Router();
const { Accommodation } = require("../models/accommodation");
const { Reservation } = require("../models/reservation");

router.post("/", async (req, res) => {
  try {
    const { name, address, accommodationType, amenity, capacity, weekdayPrice, weekendPrice} = req.body;
    const accommodation = new Accommodation(req.body);
    await accommodation.save();
    return res.send({ house });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const accommodations = await Accommodation.find({});
    return res.send({ lodgings });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const accommodation = await Accommodation.findById(req.params.id);
    if (!accommodation) return res.status(404).send({ err: 'Accommodation not found' });

    const reservations = await Reservation.find({ accommodation: req.params.id });
    const ratings = reservations.map(reservation => reservation.starRate).filter(Boolean);
    const averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length || 'No ratings yet';

    return res.send({
      accommodation,
      averageRating,
      reservations
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: err.message });
  }
});

module.exports = router;
