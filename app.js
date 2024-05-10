const express = require("express");

// init app & middleware
const app = express();

app.listen(3000, () => {
  console.log("app listening on port 3000");
});

app.get("/", (req, res) => {
  const request = req.method
  const path = req.path
res.send(`<p>request method: ${request}</p> <p>request path: ${path}</p>`);
});

app.get('/books', (req, res) => {
    res.json({mssg: "welcome to the api"})
})