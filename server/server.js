require('dotenv').config();

const path = require("path");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 8000;

app.use("/audio", express.static(path.join(__dirname, "server", "audio")));
app.use("/favicon", express.static(path.join(__dirname, "favicon")));

app.use(cors({
  origin: 'https://fyzgaston.github.io',
  credentials: true,
}));

app.use(bodyParser.json());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

