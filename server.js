import { createConnection } from "mysql";
import express from "express";
const app = express();
import "dotenv/config";

app.listen(3000, () => {
  console.log("server started and listening to port 3000");
});

const database = createConnection({
  host: "localhost",
  port: "3306",
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
});

database.connect((err) => {
  if (err) throw err;
  else console.log("Database connected");

  database.query("USE students", (err, result) => {
    if (err) throw err;

    console.log("database selected");
  });

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.get("/", (req, res) => {
    res.send("hey");
  });

  app.get("/info", (req, res) => {
    database.query("select * from info;", (err, result) => {
      if (err) throw err;

      res.send(JSON.stringify(result));
      console.log("data loaded");
      // console.log(JSON.stringify(result));
    });
  });
});
