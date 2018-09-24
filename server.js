const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.Promise = global.Promise;

mongoose.connect (
  process.env.MONGODV_URI || "mongodb://localhost/nytreact",
  {
    useMongoClient: true
  }
);

const db = require('./models');
console.log(db.Article);

// Define API routes here
let router = new express.Router();

router.post("/api/saved", (req, res) => {
  let article = req.body
  console.log(article)
  db.Article.create(article)
  .then(() => {
    res.json(article)
  })
  .catch((err) => {

  })
})

router.get("api/saved", (req, res) => {
  Article.find({})
  .then(articles => res.json(articles))
})

router.delete("api/saved/:id", (req, res) => {

})

app.use(router);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
