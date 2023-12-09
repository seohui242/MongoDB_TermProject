const express = require("express");
const router = express.Router();
const { Guest } = require("../models/guest");

router.post("/", async (req, res) => {
    try {
        const { age, name } = req.body;
        const guest = new Guest(req.body);
        await guest.save();
        return res.send({ guest });
      } catch (err) {
        console.log(err);
        return res.status(400).send({ err: err.message });
      }
})

module.exports = router;