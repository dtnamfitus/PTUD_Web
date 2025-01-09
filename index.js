const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");

const route = require("./routes");
const passport = require("./config/passport");
const renderAdminLayout = require("./controllers/renderAdminLayout");

const isTestEnv = process.env.NODE_ENV === "test";

require("dotenv").config();

require("./models/product-category.model");
require("./models/product.model");
require("./models/user.model");
require("./models/comment.model");
require("./models/manufacturer.model");
require("./models/order.model");
require("./models/cart.model");
require("./models/order-item.model");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

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

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

const port = process.env.PORT || 8080;

app.use("/client", route.clientUIRoute);
app.use("/admin", route.adminUIRoute);

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/healthcheck", (req, res) => {
  res.status(200).send("Healthcheck is OK");
});

app.get("/", function (req, res) {
  res.redirect("/client/home");
});

app.get("/test", async function (req, res) {
  const bodyHtml = await new Promise((resolve, reject) => {
    res.render(
      "admin/orderList",
      { orders: {}, admin: {} },
      (err, html) => {
        if (err) return reject(err);
        resolve(html);
      }
    );
  });
  await renderAdminLayout(req, res, bodyHtml, "Cart")
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

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;
