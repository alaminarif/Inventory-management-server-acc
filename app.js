const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// schema design
// routes
const productRouter = require("./routes/products.routes");

app.use("/api/v1/product", productRouter);
app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
