const axios = require("axios");

//2. 숙소 상세 조회 (검사할 때는 뒤에 숙소 _id 확인하고 넣어서 ㄱㄱ)
function printCalendar(month, reservations) {
  const date = new Date();
  const year = date.getFullYear();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  let reservationDates = {};
  reservations.forEach((reservation) => {
    let checkIn = new Date(reservation.checkIn);
    let checkOut = new Date(reservation.checkOut);
    for (let d = new Date(checkIn); d <= checkOut; d.setDate(d.getDate() + 1)) {
      if (d.getMonth() === month) {
        reservationDates[d.getDate()] = true;
      }
    }
  });

  let calendar = "";
  let markerRow = "";

  for (let i = 0; i < startDay; i++) {
    calendar += "   ";
    markerRow += "   ";
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendar += i < 10 ? " " + i + " " : i + " ";
    if (reservationDates[i]) {
      markerRow += " O ";
    } else {
      markerRow += " * ";
    }
    if ((i + startDay) % 7 === 0) {
      calendar += "\n" + markerRow + "\n";
      markerRow = "";
    }
  }

  if (daysInMonth + (startDay % 7) !== 0) {
    calendar += "\n" + markerRow;
  }

  console.log(calendar);
}

const getDetailAccommodation = async () => {
  const response = await axios.get(
    "http://127.0.0.1:3000/accommodation/6576b5eded9ccbe55c42ad45"
  );

  console.log(
    "====================== Accomodation Info ======================"
  );
  console.log("[ADDRESS]");
  console.log(" - city    :", response.data.accommodation.address.city);
  console.log(" - street  :", response.data.accommodation.address.street);
  console.log(" - zipCode :", response.data.accommodation.address.zipCode);

  console.log("\n[INFORMAITION]");
  console.log(" - id                : ", response.data.accommodation._id);
  console.log(" - name              : ", response.data.accommodation.name);
  console.log(
    " - accommodationType : ",
    response.data.accommodation.accommodationType
  );
  console.log(" - amenity           : ", response.data.accommodation.amenity);
  console.log(" - capacity          : ", response.data.accommodation.capacity);
  console.log(
    " - weekdayPrice      : ",
    response.data.accommodation.weekdayPrice
  );
  console.log(
    " - weekendPrice      : ",
    response.data.accommodation.weekendPrice
  );
  console.log(" - averageRating     : ", response.data.averageRating);

  console.log("\n[REVIEW]");
  for (let i = 0; i < response.data.reservations.length; i++) {
    console.log(" - review", i + 1);
    console.log("  > star rate  :", response.data.reservations[i].starRate);
    console.log("  > review     :", response.data.reservations[i].review);
    console.log("  > check in   :", response.data.reservations[i].checkIn);
    console.log("  > check out  :", response.data.reservations[i].checkOut);
  }

  const date = new Date();
  var month = date.getMonth();

  console.log("\n[RESERVATION CALENDAR]");
  printCalendar(month, response.data.reservations);
  console.log(
    "==============================================================="
  );
};
getDetailAccommodation();
