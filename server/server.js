require('dotenv').config();
const fs = require("fs");
const path = require("path");

const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 8000;


const audioPath = path.join(__dirname, "audio");
console.log("Serving audio from:", audioPath);

try {
  const files = fs.readdirSync(audioPath);
  console.log("Audio folder contents:", files);
} catch (e) {
  console.error("Error reading audio folder:", e.message);
}

app.use("/audio", express.static(audioPath));
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

