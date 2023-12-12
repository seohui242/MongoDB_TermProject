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
  const {checkIn, checkOut, count, type} = req.query

  try {
    const accommodations = await Accommodation.find({accommodationType: type});
    
    resAcc = []

    if (type === "전체") {
      for (const acc of accommodations) {
        const dupList = await Reservation.find({
          accommodation: acc._id,
          $or: [
            {
              $and: [{
                checkIn: {$lte: checkIn},
                checkOut: {$gte: checkOut}
              }],
            },
            {
              checkIn: {
                $gte: checkIn,
                $lt: checkOut
              }
            },
            {
              checkOut: {
                $gt: checkIn,
                $lte: checkOut
              }
            }
          ]
        });
        if (dupList.length === 0) resAcc.push(acc);
      }
    }
    else if (type === "개인") {
      for (const acc of accommodations) {
        const dupList = await Reservation.find({
          accommodation: acc._id,
          $or: [
            {
              $and: [{
                checkIn: {$lte: checkIn},
                checkOut: {$gte: checkOut}
              }],
            },
            {
              checkIn: {
                $gte: checkIn,
                $lt: checkOut
              }
            },
            {
              checkOut: {
                $gt: checkIn,
                $lte: checkOut
              }
            }
          ]
        });
        const cntMap = {}
        const curDate = new Date(checkIn);
        const _checkOut = new Date(checkOut);

        while (curDate < _checkOut) {
          cntMap[curDate] = 0;
          dupList.forEach(dup => {
            if (dup.checkIn <= curDate && curDate < dup.checkOut) {
              cntMap[curDate] += dup.count
            }
          });
          curDate.setDate(curDate.getDate() + 1)
        }

        let pass = true;

        for (const curCount of Object.values(cntMap)) {
          if (count > acc.capacity - curCount) pass = false;
        }

        if (pass) resAcc.push(acc);
      }
    }
    
    return res.send({ resAcc });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const accommodations = await Accommodation.find({});
    return res.send({ accommodations });
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

router.get("/:id/house", async (req, res) => {
  try {
    const accommodationId = req.params.id;
    
    const accommodation = await Accommodation.findById(accommodationId);
    console.log(accommodation)
    if (!accommodation) return res.status(404).send({ err: 'Accommodation not found' });

    return res.send(accommodation);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: err.message });
  }
});

module.exports = router;
