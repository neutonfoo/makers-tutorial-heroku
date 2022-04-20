const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// # Take note of the two endpoints below. They may look the same but one processes GET requests and one processes POST requests

// If a GET request is made
app.get("/person", async (req, res) => {
  console.log(`Getting a random person`);

  const person_json = (
    await axios({ method: "get", url: "https://randomuser.me/api" })
  ).data;
  res.json(person_json);
});

// If a POST request is made
app.post("/person", async (req, res) => {
  const nationality = req.body.nationality;

  console.log(`Search for person with nationality ${nationality}`);

  const person_json = (
    await axios({
      method: "get",
      url: "https://randomuser.me/api",
      params: {
        nat: nationality,
      },
    })
  ).data;
  res.json(person_json);
});

// Another GET request. This one accepts a URL parameter
app.get("/people", async (req, res) => {
  const numberOfPeople = req.query.numberOfPeople;

  console.log(`Search for ${numberOfPeople} people`);

  const person_json = (
    await axios({
      method: "get",
      url: "https://randomuser.me/api",
      params: {
        results: numberOfPeople,
      },
    })
  ).data;
  res.json(person_json);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
