const express = require("express");
const axios = require("axios");
const path = require("path");

const weatherRoute = express.Router();
const WEATHER_SERVICE_URL = 'http://localhost:8080/weather'; // Local URL for development

weatherRoute.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

weatherRoute.post("/", async (req, res) => {
    const city = req.body.cityName;
    const unit = req.body.unit;

    try {
        const response = await axios.get(WEATHER_SERVICE_URL, {
            params: { city, unit }
        });
        const { temperature, weatherDes, imageURL, cityName } = response.data;

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(`<h1>The weather is ${temperature} degrees Celsius in ${cityName} and the description is ${weatherDes}</h1>`);
        res.write(`<img src="${imageURL}">`);
        res.end();
    } catch (error) {
        console.error(`Error fetching weather data: ${error.message}`);
        res.status(500).send("Error fetching weather data");
    }
});

module.exports = weatherRoute;
