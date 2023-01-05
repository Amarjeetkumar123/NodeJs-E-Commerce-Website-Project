const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Review = require("../models/review");

const { validateProduct} = require('../middleware');

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.render("products/index", { products });
  } catch (e) {
    res.status(500).render("error", { err: e.message });
  }
});

// Add new product
router.get("/products/new", (req, res) => {
  try {
    res.render("products/new");
  } catch (e) {
    res.status(500).render("error", { err: e.message });
  }
});

router.post("/products", validateProduct, async (req, res) => {
  try {
    const { name, img, price, desc } = req.body;

    await Product.create({ name, img, price: parseFloat(price), desc });

    res.redirect("/products");
  } catch (e) {
    res.status(500).render("error", { err: e.message });
  }
});

// Show the product

router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate("reviews");

    res.render("products/show", { product });
  } catch (e) {
    res.status(500).render("error", { err: e.message });
  }
});

// edit the product
router.get("/products/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    res.render("products/edit", { product });
  } catch (e) {
    res.status(500).render("error", { err: e.message });
  }
});

// update
router.patch("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, img, price, desc } = req.body;

    await Product.findByIdAndUpdate(id, { name, img, price, desc });

    res.redirect(`/products/${id}`);
  } catch (e) {
    res.status(500).render("error", { err: e.message });
  }
});

// delete

router.get("/products/:id/delete", async (req, res) => {
  try {
    const { id } = req.params;

    // const product = await Product.findById(id);

    // for (let id of product.reviews) {
    //   await Review.findByIdAndDelete(id);
    // }
    await Product.findByIdAndDelete(id);

    res.redirect("/products");
  } catch (e) {
    res.status(500).render("error", { err: e.message });
  }
});

module.exports = router;
