const express = require("express");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");

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
  let books = [];

  db.collection("books")
    .find()
    .sort({ author: 1 })
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});

app.get("/books/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("books")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not fetch the document" });
      });
  } else {
    res.status(500).json({error: 'Not a valid doc id'})
  }
});
