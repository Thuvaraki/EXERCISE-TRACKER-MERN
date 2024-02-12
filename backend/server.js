// to run application-> node server

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const exercisesRouter = require("./routes/exercises");
const userRouter = require("./routes/users");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const URI = process.env.ATLAS_URI;
mongoose.connect(URI);
//establishes a connection to the MongoDB
// In Mongoose, when you connect to a MongoDB database using mongoose.connect, it returns a connection object that
//  represents the connection to the database. and then assigning the connection object to the variable connection
const connection = mongoose.connection;
// This code sets up an event listener for the "open" event of the MongoDB connection. The once method is used, meaning
// the callback function provided will only be executed once when the "open" event occurs
connection.once("open", () => {
  console.log("MongoDB database connection established sucessfully");
});

app.use("/exercises", exercisesRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server is listening to the port: ${port}`);
});
