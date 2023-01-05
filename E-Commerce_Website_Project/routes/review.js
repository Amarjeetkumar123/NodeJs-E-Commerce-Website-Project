const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Review = require("../models/review");
const { validateReview } = require('../middleware');

router.post("/products/:id/review", validateReview, async (req, res) => {
  const { id } = req.params;
  // console.log(req.body);

  const product = await Product.findById(id);

  const review = new Review({ ...req.body }); // three dot is "spread operator anything exits in req.body add into review"
  // console.log(review);
  product.reviews.push(review);

  await review.save();
  await product.save();

  res.redirect(`/products/${id}`);
});



module.exports = router;
