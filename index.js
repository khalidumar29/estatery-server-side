const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

/** middle ware */
app.use(cors());
app.use(express.json());

/** database connection (mongodb) */
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v62avza.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

/** api oparetion */
const run = async () => {
  try {
    /** data Collection */
    await client.connect();
    const propertyCollection = client.db("data").collection("property");

    app.get("/property", async (req, res) => {
      const property = await propertyCollection.find({}).toArray();
      res.send(property);
    });
  } finally {
    /**nothing to be happen here */
  }
};
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("<h1>😎😎</h1>");
});
app.listen(port, () => {
  console.log(port, "is running");
});
