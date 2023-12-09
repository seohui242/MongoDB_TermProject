const express = require("express");
const router = express.Router();
const { Host } = require("../models/host");

router.post("/", async (req, res) => {
    try {
        const { name, age, lodging_id} = req.body;
        const host = new Host(req.body);
        await host.save();
        return res.send({ host });
      } catch (err) {
        console.log(err);
        return res.status(400).send({ err: err.message });
      }
})

module.exports = router;