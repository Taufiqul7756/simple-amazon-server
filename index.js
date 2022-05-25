const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.4y8td.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3002;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const products = client.db("amazonStore").collection("products");
  console.log("Database connected");

  app.post("/addProduct", (req, res) => {
    const productsCollection = req.body;
    console.log(productsCollection);
    products.insertMany(productsCollection).then((result) => {
      console.log(result.insertedCount);
      res.send(result.insertedCount);
    });
  });

  app.get("", (req, res) => {
    res.send("Hello Amazon");
  });

  app.get("/products", (req, res) => {
    productsCollection
      .find({})
      .limit(20)
      .toArray((err, documents) => {
        res.send(documents);
      });
  });
});
app.listen(port);
