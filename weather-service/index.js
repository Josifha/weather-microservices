const express = require("express");
const https = require("https");

const app = express();

app.get("/weather", (req, res) => {
    const city = req.query.city;
    const unit = req.query.unit;
    const apiKey = "355c355927d79e71ffb0288370923bdc"; // Replace with your OpenWeatherMap API key

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    https.get(url, (response) => {
        let data = "";

        response.on("data", (chunk) => {
            data += chunk;
        });

        response.on("end", () => {
            const responseData = JSON.parse(data);
            if (responseData.main) {
                const temperature = responseData.main.temp;
                const weatherDes = responseData.weather[0].description;
                const icon = responseData.weather[0].icon;
                const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                const cityName = responseData.name;

                res.json({
                    temperature,
                    weatherDes,
                    imageURL,
                    cityName,
                });
            } else {
                res.status(404).json({ error: "City not found" });
            }
        });
    }).on("error", (e) => {
        console.error(`Got error: ${e.message}`);
        res.status(500).send("Error fetching weather data");
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Weather service running on port ${PORT}`);
});
