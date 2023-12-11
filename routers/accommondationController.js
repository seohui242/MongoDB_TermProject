const express = require("express");
const router = express.Router();
const { Accommodation } = require("../models/accommodation");

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
    const accommodation = await Accommodation.find({});
    return res.send({ lodgings });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: err.message });
  }
});

module.exports = router;
