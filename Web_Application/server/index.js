const express = require("express");
const database = require("./database/configuration");

const cors = require("cors");
// const corsOptions = {
//   origin: "*",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

database.configuration.connect(function (err) {
  if (err) throw err;
});

app.get("/api/plc/events", (req, res) => {
  const sql = database.mysql2.format(
    "SELECT * FROM event_logger ORDER BY event_id DESC;"
  );

  database.configuration.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.send(data);
  });
});

app.get("/api/videos/historydata", (req, res) => {
  const sql = database.mysql2.format(
    "SELECT * FROM video_history ORDER BY history_id DESC;"
  );

  database.configuration.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on IP:127.0.0.1, Port:${PORT}`);
});
