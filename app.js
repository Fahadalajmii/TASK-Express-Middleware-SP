const express = require("express");
const cors = require("cors");
const connectDb = require("./database");
const productsRoutes = require("./api/products/routes");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
connectDb();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.protocol, req.hostname, req.originalUrl);
  next();
});
// Routes
app.use("/products", productsRoutes);

//error handling middleware
app.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json(error.message || "enternal server error");
});
//not found middle ware
app.use((req, res, next) => {
  return res.status(404).json("not found path");
});

app.listen(process.env.PORT || 5000);
