const express = require("express");
const router = express.Router();
const { Member } = require("../models/member");
router.post("/member", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).send({ err: "name is requried" });
    const member = new Member(req.body);
    await member.save();
    return res.send({ member });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: err.message });
  }
});
router.get("/member", async (req, res) => {
  const members = await Member.find({});
  return res.send({ members });
});

router.get("/member-v2", async (req, res) => {
  const { age } = req.query;
  const members = await Member.find({}).find({ age: { $gte: age } });
  return res.send({ members });
});

router.get("/member-v3/:age", async (req, res) => {
  const { age } = req.params;
  const members = await Member.find({}).find({ age: { $gte: age } });
  return res.send({ members });
});

router.get("/member-v4/:memberId", async (req, res) => {
  const { memberId } = req.params;
  const members = await Member.findById(memberId);
  return res.send({ members });
});

router.put("/member-v1/:memberId", async (req, res) => {
  const { memberId } = req.params;
  const { age } = req.body;
  const members = await Member.updateOne({ _id: memberId }, { age: age });
  return res.send({ members });
});

router.put("/member-v2/:memberId", async (req, res) => {
  const { memberId } = req.params;
  const { age } = req.body;
  const members = await Member.findByIdAndUpdate(memberId,{age:age}, {new:true});
  return res.send({ members });
});

module.exports = router;
