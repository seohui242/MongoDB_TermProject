const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

router.post("/", async (req, res) => {
    try {
        const { name, age, lodging_id} = req.body;
        const user = new User(req.body);
        await user.save();
        return res.send({ host });
      } catch (err) {
        console.log(err);
        return res.status(400).send({ err: err.message });
      }
})

module.exports = router;