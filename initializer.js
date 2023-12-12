const faker = require('faker');
const mongoose = require("mongoose");
const { User } = require("./models/user")
const { Accommodation } = require("./models/accommodation")
const { Reservation } = require("./models/reservation")



const init = function () {

    const db = mongoose.connection.db;
  
    // INIT USER
    const users = []
    for (let i=0; i<10; i++) {
        const newUser = new User({
            name: faker.name.findName(),
            age: faker.datatype.number({
                min: 1,
                max: 100
            })
        });
        newUser.save();
        users.push(newUser);
    }

    // INIT ACCOMMODATION
    const accommodations = [];
    let fs = require("fs");
    const accommodationNames = fs.readFileSync("accommodations.txt", "utf8").split("\r\n");
    for (let i=0; i<accommodationNames.length; i++) {
        const newAccommodation = new Accommodation({
            name: accommodationNames[i],
            address: {
                city: faker.address.city(),
                street: faker.address.streetName(),
                zipCode: faker.address.zipCode(),
            },
            accommodationType: i<5 ? "개인":"전체",
            amenity: faker.random.arrayElements([
                "편의시설1",
                "편의시설2",
                "편의시설3",
                "편의시설4"
            ]),
            capacity: faker.random.arrayElement([6, 8, 10]),
            weekdayPrice: faker.random.arrayElement([10000, 13000, 15000]),
            weekendPrice: faker.random.arrayElement([20000, 23000, 25000]),
        });
        newAccommodation.save();
        accommodations.push(newAccommodation);
    }

    // INIT RESERVATION
    const reservations = [];
    for (let i=0; i<accommodations.length; i++) {
        for(let j=0; j<4; j++) {
            const checkOutDate = faker.date.between("2023-11-01", new Date());
            const checkInDate = faker.date.recent(7, new Date(checkOutDate.getTime() - 24 * 60 * 60 * 1000));

            const newReservation = new Reservation({
                user: faker.random.arrayElement(users),
                accommodation: accommodations[i],
                count: faker.random.arrayElement([1, 2, 3]),
                checkIn: checkInDate,
                checkOut: checkOutDate,
                status: "완료",
                price: faker.random.arrayElement([60000, 62000, 50000, 54000, 46000, 150000]),
                starRate: j===0 ? null : faker.random.arrayElement([1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]),
                review: j===0 ? null : faker.lorem.sentence()
            });
            newReservation.save();
            reservations.push(newReservation);
        }
    }

}

module.exports = init;
