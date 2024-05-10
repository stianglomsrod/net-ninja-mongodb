const express = require("express");
const { connectToDb, getDb } = require("./db");

// init app & middleware
const app = express();

// db connection
let db;

connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("app listening on port 3000");
    });
    db = getDb();
  }
});

app.get("/", (req, res) => {
  const request = req.method;
  const path = req.path;
  res.send(`<p>request method: ${request}</p> <p>request path: ${path}</p>`);
});

app.get("/books", (req, res) => {
  res.json({ mssg: "welcome to the api" });
});
