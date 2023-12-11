const axios = require("axios");
const faker = require("faker");

function printCalendar() {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  let calendar = '';

  for (let i = 0; i < startDay; i++) {
    calendar += '   ';
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendar += i < 10 ? ' ' + i + ' ' : i + ' ';
    if ((i + startDay) % 7 === 0) {
      calendar += '\n';
    }
  }
  
  console.log(calendar);
}

printCalendar();