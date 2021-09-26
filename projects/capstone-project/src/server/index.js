const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
var path = require("path");

const express = require("express");
const cors = require("cors");
const app = express();
const fetch = require("node-fetch");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

const destinationData = [];

app.post("/userData", async (req, res) => {
  const response = await fetch(
    `http://api.geonames.org/search?q=${req.body.input}&lang=en&maxRows=10&type=json&username=${process.env.GEONAMES_API_KEY}`
  );
  try {
    const data = await response.json();
    res.send(data);
    destinationData.push(data);
  } catch (error) {
    console.log("error", error);
  }
});

app.post("/travelForecast", async (req, res) => {
  const chosenDestination = destinationData[0];
  const latitude = chosenDestination.lat;
  const longitude = chosenDestination.lng;
  const response = await fetch(
    `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&units=I&lat=51.05011&lon=-114.08529&days=5`
    // `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&units=I&lat=${latitude}&lon=${longitude}&days=5`
  );
  try {
    const data = await response.json();
    res.send(data, latitude, longitude);
  } catch (error) {
    console.log("error", error);
  }
});

app.post("/destinationImage", async (req, res) => {
  const response = await fetch(
    `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&image_type=photo&q=paris&category=places`
  );
  try {
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log("error", error);
  }
});
