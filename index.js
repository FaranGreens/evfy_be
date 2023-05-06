require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./connectDB");
const auth_route = require("./routes/auth.routes");
const cars_route = require("./routes/car.routes");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("public"));

app.use("/user", auth_route);
app.use("/cars", cars_route);

app.get("/", (req, res) => {
  res.send("hello");
});

connectDB().then(() => {
  app.listen((port = 8080), () => console.log("listening on " + port));
});
