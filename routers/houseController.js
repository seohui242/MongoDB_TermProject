const express = require("express");
const router = express.Router();
const { House } = require("../models/house");

router.post("/", async (req, res) => {
  try {
    const { dtype, bath_room, bed, house_type, person_capacity, room_size } =
      req.body;
    const house = new House(req.body);
    await house.save();
    return res.send({ house });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const houses = await House.find({});
    return res.send({ houses });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: err.message });
  }
});

module.exports = router;
