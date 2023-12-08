const express = require("express");
const app = express();
const mongoose = require("mongoose");

const memberController = require("./routers/memberController");
const blogController = require("./routers/blogController");

const hostname = "127.0.0.1";
const port = 3000;
const DB_URI = "mongodb://127.0.0.1:27017/testdb";



const server = async () => {
try {
    await mongoose.connect(DB_URI);
    app.use(express.json());
    app.use(memberController);
    app.use("/blog", blogController);
    app.listen(port, hostname, function () {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
 } catch (err) {
    console.log(err);
 }
};

server();