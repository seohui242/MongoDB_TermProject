const axios = require("axios");
//1. 조건에 맞는 숙소 조회
const getSearchAccomodation = async (checkIn, checkOut, count, type) => {
  const response = await axios.get(
    `http://127.0.0.1:3000/accommodation?checkIn=${checkIn}&checkOut=${checkOut}&count=${count}&type=${type}`
  );
  console.log(response.data);
}
//getSearchAccomodation("2023-12-14", "2023-12-15", 3, "개인");

//2. 숙소 상세 조회 (검사할 때는 뒤에 숙소 _id 확인하고 넣어서 ㄱㄱ)
const getDetailAccommodation = async (accId) => {
  function printCalendar(month, reservations, type, capacity) {
    const date = new Date();
    const year = date.getFullYear();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();

    let reservationDates = {};
    reservations.forEach((reservation) => {
      let checkIn = new Date(reservation.checkIn);
      let checkOut = new Date(reservation.checkOut);
      let count = reservation.count;
      for (let d = new Date(checkIn); d <= checkOut; d.setDate(d.getDate() + 1)) {
        if (d.getMonth() === month && reservation.status !== "취소") {
          let date = d.getDate();
          if (reservationDates[date]) {
            reservationDates[date].count += count;
          } else {
            reservationDates[date] = {
              count: count,
              marked: true
            };
          }
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
        if(type === "전체") markerRow += " O ";
        else markerRow += " " +(capacity - reservationDates[i].count)+ " ";
      } else {
        if(type === "전체") markerRow += " * ";
        else markerRow += " " + capacity + " ";
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

  const response = await axios.get(
    `http://127.0.0.1:3000/accommodation/${accId}`
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
  printCalendar(month, response.data.reservations, response.data.accommodationType, response.data.accommodation.capacity);
    console.log(
    "==============================================================="
  );
};
//getDetailAccommodation("65799100896a61a24504e3d2");


//기능3
const bookHouse = async (userId, accommodationId, count, checkIn, checkOut) => {
    const accommodation = await axios.get(
        `http://127.0.0.1:3000/accommodation/${accommodationId}/house`
      );
    console.log(accommodation);

    console.log(checkOut - checkIn)

    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    let weekdays = 0
    let weekend = 0

    let currentDate = new Date(checkIn);

    while (currentDate <= checkOut) {
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek >= 1 && dayOfWeek <= 4) { //월~목
            weekdays++;
        }else{ weekend++; }
        currentDate.setDate(currentDate.getDate() + 1);
    }

    console.log(weekdays, nights)
    console.log(accommodation.data.weekdayPrice)

    const price = weekdays * accommodation.data.weekdayPrice + weekend * accommodation.data.weekendPrice;
    console.log(price)
    console.log(userId, accommodationId, count, checkIn, checkOut, price)

    const reservationData = {
        user: userId,
        accommodation: accommodationId,
        count: count,
        checkIn: checkIn,
        checkOut: checkOut,
        status: '예약',
        price: price,
        starRate: null,
        review: null
    };

    console.log(reservationData)

    const responseReservatTest1 = await axios.post('http://127.0.0.1:3000/reservation', reservationData);
    console.log("=======예약 완료======")
    console.log(responseReservatTest1.data.accommodation)
    console.log(responseReservatTest1.data.status)

}
const userId = '65799100896a61a24504e3c9';
const accommodationId = '65799100896a61a24504e3d2';
const count = 3;
const checkIn = new Date('2023-12-14');
const checkOut = new Date('2023-12-15');
//bookHouse(userId, accommodationId, count, checkIn, checkOut)

//기능4
const cancelReserve = async (reserveId) => {
    try {
        const response = await axios.get(`http://127.0.0.1:3000/reservation/${reserveId}`);
        const reservation = response.data.reservation;

        if (!reservation) {
            console.log('Reservation not found');
            return;
        }

        reservation.status = '취소';

        const updateResponse = await axios.put(`http://127.0.0.1:3000/reservation/${reserveId}`, reservation);

        console.log('Reservation canceled successfully');
        console.log(updateResponse.data);
    } catch (error) {
        console.error('Error canceling reservation:', error.response ? error.response.data : error.message);
    }

};
const reserveIdToCancel = '657992d4edf0ce1c182341bb';
//cancelReserve(reserveIdToCancel);
