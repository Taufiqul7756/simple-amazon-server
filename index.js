const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.4y8td.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3001;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const productsCollection = client.db("amazonStore").collection("products");
  console.log("Database connected");

  app.post("/addProduct", (req, res) => {
    const products = req.body;
    console.log(products);
    productsCollection.insertMany(products).then((result) => {
      console.log(result.insertedCount);
      res.send(result.insertedCount);
    });
  });

  app.get("", (req, res) => {
    res.send("Hello Amazon");
  });

  app.get("/products", (req, res) => {
    productsCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.get("/product/:key", (req, res) => {
    productsCollection
      .find({ key: req.params.key })
      .toArray((err, documents) => {
        res.send(documents[0]);
      });
  });
});
app.listen(port);
