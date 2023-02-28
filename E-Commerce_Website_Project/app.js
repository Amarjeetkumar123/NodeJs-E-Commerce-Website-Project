const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const { copyFileSync } = require("fs");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

// Routes

const productRoutes = require("./routes/product");
const reviewRoutes = require("./routes/review");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");

// APIs
const productApis = require("./routes/api/productapi");

// Database connection

mongoose
  .connect(
    "mongodb+srv://amarjeet_kumar:amarjeet123@cluster0.ieapcxp.mongodb.net/ShoppingApp?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const sessionConfig = {
  secret: "weneedsomebettersecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7 * 1,
    maxAge: 1000 * 60 * 60 * 24 * 7 * 1,
  },
};

app.use(session(sessionConfig));
app.use(flash());

// Initialising the middleware for passport
app.use(passport.initialize());
app.use(passport.session());

// login and logOut session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Authentication
passport.use(new LocalStrategy(User.authenticate()));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Using Routes
app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(productApis);
app.use(cartRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at port http://localhost:${port}`);
});
