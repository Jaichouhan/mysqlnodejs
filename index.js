const express = require("express");
const app = express();
const mysql = require("mysql");
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testing",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected");
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/find", (req, res) => {
  try {
    const findData = "SELECT * FROM users ";
    connection.query(findData, function (err, result) {
      if (err) throw err;
      if (findData) {
        res.status(200).json({
          status: true,
          message: result,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/users", (req, res) => {
  const { name, last, email, phone, password } = req.body;
  try {
    const sql = "INSERT INTO users (name,last,email,phone,password) VALUES (?)";
    connection.query(
      sql,
      [[name, last, email, phone, password]],
      function (err, result) {
        if (err) throw err;
        console.log("record insert done");
        res.status(200).json({
          message: "record insert done",
          status: true,
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log(`your port is listing http://localhost:${3000}`);
});
