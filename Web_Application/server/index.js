const express = require("express");
const bodyParser = require("body-parser");
const database = require("./database/configuration");
const cors = require("cors");

//routes
const plcRoutes = require("./routes/plc");
const videosRoutes = require("./routes/videos");
//end of routes

const PORT = process.env.PORT || 3001;

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

app.use("/api/plc", plcRoutes);
app.use("/api/videos", videosRoutes);

//connect to db
database.configuration.connect(function (err) {
  if (err) throw err;
});
//connect to db

app.listen(PORT, () => {
  console.log(`Server listening on IP:127.0.0.1, Port:${PORT}`);
});
