const express = require("express");
const database = require("../database/configuration");

const router = express.Router();

router.get("/events", (req, res) => {
  const sql = database.mysql2.format(
    "SELECT * FROM event_logger ORDER BY event_id DESC LIMIT 20;"
  );

  database.configuration.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.send(data);
  });
});

router.get("/fetchAll", (req, res) => {
  const sql = database.mysql2.format("SELECT * FROM event_logger");

  database.configuration.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.send(data);
  });
});

module.exports = router;
