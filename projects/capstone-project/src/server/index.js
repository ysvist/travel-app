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
  console.log("Travel app listening on port 8081!");
});

app.post("/userData", async (req, res) => {
  const response = await fetch(
    `http://api.geonames.org/search?q=${req.body.input}&lang=en&maxRows=10&type=json&username=${process.env.GEONAMES_API_KEY}`
  );
  try {
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log("error", error);
  }
});

app.post("/travelForecast", async (req, res) => {
  const location = req.body.location.geonames[0];
  const days = req.body.days;
  const longitude = await location.lng;
  const latitude = await location.lat;
  const response = await fetch(
    `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&units=I&lat=${latitude}&lon=${longitude}&days=${days}`
  );
  try {
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log("error", error);
  }
});

app.post("/destinationImage", async (req, res) => {
  const location = req.body.query.geonames[0];
  const destinationName = location.name;
  const countryName = location.countryName;
  const response = await fetch(
    `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&image_type=photo&q=${destinationName}&category=places`
  );
  try {
    const data = await response.json();
    // can't find a result for this specific place? fetch a photo from the country instead.
    if (!data.total) {
      const altResponse = await fetch(
        `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&image_type=photo&q=${countryName}&category=places`
      );
      try {
        const altData = await altResponse.json();
        res.send(altData.hits[0]);
      } catch (error) {
        console.log("error", error);
      }
    } else {
      res.send(data.hits[0]);
    }
  } catch (error) {
    console.log("error", error);
  }
});
