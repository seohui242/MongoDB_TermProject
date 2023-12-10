const axios = require("axios");
const faker = require("faker");

const setGuest = async () => {
  var randomName = faker.name.findName();
  var randomAge = faker.random.number({
    min: 1,
    max: 100,
  });

  console.log("name : ", randomName);
  console.log("age : ", randomAge);

  axios
    .post("http://127.0.0.1:3000/guest", {
      name: randomName,
      age: randomAge,
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
setGuest();
