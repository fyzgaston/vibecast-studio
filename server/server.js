const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 8000;

app.use("/audio", express.static(path.join(__dirname, "audio")));
app.use("/images", express.static(path.join(__dirname, "favicon")));

app.use(cors({
  origin: 'https://fyzgaston.github.io',
  credentials: true,
}));

app.use(bodyParser.json());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
