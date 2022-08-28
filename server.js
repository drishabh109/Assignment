const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const Model = require("./model/model");

const server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

const connectionString =
  "mongodb+srv://assignment:assignment@cluster0.jxesayy.mongodb.net/?retryWrites=true&w=majority/test";
const PORT = process.env.PORT || 8000;

const connectionWithMongoose = async () => {
  try {
    const connection = await mongoose.connect(connectionString);
    console.log("Connected to Database.....");
    return connection;
  } catch (e) {
    console.error("Error while connecting to DB", e);
  }
};

server.get("/get", async (req, res) => {
  try {
    connectionWithMongoose();
    const postMessages = await Model.find({});
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

server.get("/get/:roll", async (req, res) => {
  try {
    const { roll } = req.params;
    connectionWithMongoose();
    const postMessages = await Model.findOne({ roll });
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

server.post("/post", async (req, res) => {
  try {
    console.log(req.body);
    const {
      firstName,
      lastName,
      roll,
      mobileNumber,
      paidOn,
      paymentMode,
      feeAmount,
    } = req.body;
    connectionWithMongoose();
    const newPostreq = Model({
      firstName,
      lastName,
      roll,
      mobileNumber,
      paidOn,
      paymentMode,
      feeAmount,
    });
    await newPostreq.save();
    console.log(newPostreq);
    res.status(200).json({ message: "success" });
  } catch (e) {
    res.status(500).json({ message: "Error while saving notes" });
  }
});

server.listen(PORT, () => {
  try {
    console.log(`Server Running on Port: http://localhost:${PORT}`);
  } catch {
    (error) => console.log(`${error} did not connect`);
  }
});
