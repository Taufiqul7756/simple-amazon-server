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
  const products = client.db("amazonStore").collection("products");
  app.post("/addProduct", (req, res) => {
    const product = req.body;
    products.insertOne(product).then((res) => {
      console.log(res);
    });
  });
});

app.listen(port);
