const express = require("express");
const router = express.Router();
const { Lodging } = require("../models/lodging");

router.post("/", async (req, res) => {
  try {
    const { city, street, zip_code, check_in, check_out, introduction, name, discount_policy_id, base_id, house_id, rate_policy_id} = req.body;
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
    const lodgings = await Lodging.find({});
    return res.send({ lodgings });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: err.message });
  }
});

module.exports = router;
