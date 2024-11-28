const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");

const route = require("./routes");
const passport = require("./config/passport");

const isTestEnv = process.env.NODE_ENV === "test";

require("dotenv").config();

// Model Require
require("./models/product-category.model");
require("./models/product.model");
require("./models/user.model");

const app = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Morgan for logging
app.use(morgan("dev"));

// Ejs Config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB only if not in test environment
if (!isTestEnv) {
  mongoose
    .connect(process.env.MONGODB_URL || "")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB", err);
    });
}

// Passport
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

const port = process.env.PORT || 8080;

// API Routes
app.use("/api/client", route.clientAPIRoute);
app.use("/api/admin", route.adminAPIRoute);

app.use("/client", route.clientUIRoute);
app.use("/admin", route.adminUIRoute);

app.use(passport.initialize());
app.use(passport.session());

app.use("/healthcheck", (req, res) => {
  res.status(200).send("Healthcheck is OK");
});

app.get("/", function (req, res) {
  res.redirect("/client/home");
});

app.use("*", async (req, res) => {
  const user = req.user;
  const bodyHtml = await new Promise((resolve, reject) => {
    res.render("error/404", {}, (err, html) => {
      if (err) return reject(err);
      resolve(html);
    });
  });
  res.render("layout/client-layout/layout", {
    title: "Page Not Found",
    body: bodyHtml,
    user,
  });
});

// Start the server only if this file is run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;
