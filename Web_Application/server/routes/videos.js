const express = require("express");
const database = require("../database/configuration");

const router = express.Router();

router.get("/historydata", (req, res) => {
  const sql = database.mysql2.format(
    "SELECT * FROM video_history ORDER BY history_id DESC LIMIT 20;"
  );

  database.configuration.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.send(data);
  });
});

router.put("/fetchLast/:history_id", (req, res) => {
  let history_id = req.params.history_id.replace("history_id=", "");
  history_id = [1, parseInt(history_id)];

  const sql = database.mysql2.format(
    "UPDATE video_history SET video_done_playing=? WHERE history_id=?;"
  );

  database.configuration.query(sql, history_id, function (err, data, fields) {
    if (err) throw err;
  });
});

router.get("/fetchLast/:robot_id", (req, res) => {
  let robot_id = req.params.robot_id.replace("robot_id=", "");
  robot_id = parseInt(robot_id);

  const sql = database.mysql2.format(
    "SELECT * FROM video_history WHERE robot_id=? ORDER BY history_id DESC LIMIT 1;"
  );

  database.configuration.query(sql, robot_id, function (err, data, fields) {
    if (err) throw err;
    res.send(data);
  });
});

module.exports = router;
