const { faker } = require("@faker-js/faker/locale/ko");
const { User } = require("./models/user")
const { Accommodation } = require("./models/accommodation")
const { Reservation } = require("./models/reservation")

const init = function () {
    // INIT USER
    const users = []
    for (let i=0; i<10; i++) {
        const newUser = new User({
            name: faker.person.lastName() + faker.person.firstName(),
            age: faker.random.number({
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
                city: faker.location.city(),
                street: faker.location.street(),
                zipCode: faker.location.zipCode(),
            },
            accommodationType: i<5 ? "개인":"전체",
            amenity: faker.helpers.arrayElements([
                "편의시설1",
                "편의시설2",
                "편의시설3",
                "편의시설4"
            ]),
            capacity: faker.helpers.arrayElement([10, 12, 14]),
            weekdayPrice: faker.helpers.arrayElement([10000, 11000, 15000]),
            weekendPrice: faker.helpers.arrayElement([20000, 21000, 25000]),
        });
        newAccommodation.save();
        accommodations.push(newAccommodation);
    }

    // INIT RESERVATION
    const reservations = [];
    for (let i=0; i<accommodations.length; i++) {
        for(let j=0; j<4; j++) {
            const checkOutDate = faker.date.between({from: "2023-11-01", to: Date.now()});
            const checkInDate = faker.date.recent({days: 7, refDate: checkOutDate - 1});

            const newReservation = new Reservation({
                user: faker.helpers.arrayElement(users),
                accommodation: accommodations[i],
                count: faker.helpers.arrayElement([1, 2, 3]),
                checkIn: checkInDate,
                checkOut: checkOutDate,
                status: "완료",
                price: faker.helpers.arrayElement([55000, 62000, 51000, 57000, 46000, 150000]),
                starRate: j===0 ? null : faker.helpers.arrayElement([1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]),
                review: j===0 ? null : faker.lorem.sentence()
            });
            newReservation.save();
            reservations.push(newReservation);
        }
    }
}

module.exports = init;
