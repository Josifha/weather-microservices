const express = require("express");
const bodyParser = require("body-parser");

const aboutRouter = require("./routes/about");
const weatherRouter = require("./routes/weather");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/weather", weatherRouter);
app.use("/about", aboutRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Frontend service running on port ${PORT}`);
});
