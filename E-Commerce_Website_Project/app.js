const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const { copyFileSync } = require("fs");
mongoose.set('strictQuery', true);
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');

// Database connection
mongoose
  .connect("mongodb://127.0.0.1:27017/shopping-app")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));


app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const productRoutes = require('./routes/product');

app.use(productRoutes);


const port = 5000;
app.listen(port, () => {
  console.log(`Server running at port http://localhost:${port}`);
});
