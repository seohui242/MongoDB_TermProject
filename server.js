const express = require("express");
const app = express();
const mongoose = require("mongoose");

const hostController = require("./routers/hostController");
const guestController = require("./routers/guestController");
const houseController = require("./routers/houseController");
const lodgingController = require("./routers/lodgingController");

const hostname = "127.0.0.1";
const port = 3000;
const DB_URI = "mongodb://127.0.0.1:27017/testdb";



const server = async () => {
try {
    await mongoose.connect(DB_URI);
    app.use(express.json());
    
    app.use("/host", hostController);
    app.use("/guest", guestController);
    app.use("/house", houseController);
    app.use("/lodging",lodgingController)

    app.listen(port, hostname, function () {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
 } catch (err) {
    console.log(err);
 }
};

server();