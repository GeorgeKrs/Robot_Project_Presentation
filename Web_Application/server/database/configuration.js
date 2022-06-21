const mysql2 = require("mysql2");

const configuration = mysql2.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "1234",
  database: "robot_project_provik_presantation",
  port: 3000,
  timezone: "utc",
});

module.exports = { configuration, mysql2 };
