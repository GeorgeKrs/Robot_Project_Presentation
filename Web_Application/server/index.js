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
app.use(
  express.json({
    type: "*/*",
  })
);
app.use(cors());

//connect to db
database.configuration.connect(function (err) {
  if (err) throw err;
});
//connect to db

//plc apis
app.get("/api/plc/events", (req, res) => {
  const sql = database.mysql2.format(
    "SELECT * FROM event_logger ORDER BY event_id DESC;"
  );

  database.configuration.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.send(data);
  });
});
//plc apis

//videos apis

//POST METHOD APIS
app.post("/api/videos/updateVideo/Robot_1"),
  (req, res) => {
    console.log(req.body);
  };

//POST METHOD APIS

//GET METHOD APIS
app.get("/api/videos/historydata", (req, res) => {
  const sql = database.mysql2.format(
    "SELECT * FROM video_history ORDER BY history_id DESC;"
  );

  database.configuration.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.send(data);
  });
});

app.get("/api/videos/fetchLast_Robot_1", (req, res) => {
  const robot_id = [1];
  const sql = database.mysql2.format(
    "SELECT * FROM video_history WHERE robot_id=? ORDER BY history_id DESC LIMIT 1;"
  );

  database.configuration.query(sql, robot_id, function (err, data, fields) {
    if (err) throw err;
    res.send(data);
  });
});

app.get("/api/videos/fetchLast_Robot_2", (req, res) => {
  const robot_id = [2];
  const sql = database.mysql2.format(
    "SELECT * FROM video_history WHERE robot_id=? ORDER BY history_id DESC LIMIT 1;"
  );

  database.configuration.query(sql, robot_id, function (err, data, fields) {
    if (err) throw err;
    res.send(data);
  });
});
//GET METHOD APIS

//videos apis

app.listen(PORT, () => {
  console.log(`Server listening on IP:127.0.0.1, Port:${PORT}`);
});
