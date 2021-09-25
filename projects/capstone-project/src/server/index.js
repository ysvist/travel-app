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

app.post("/userData", async (req, res) => {
  const response = await fetch(
    `https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=auto&url=${req.body.input}`
  );
  try {
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log("error", error);
  }
});
