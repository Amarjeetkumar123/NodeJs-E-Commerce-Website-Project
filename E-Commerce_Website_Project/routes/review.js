const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Review = require("../models/review");
const { validateReview } = require("../middleware");

router.post("/products/:id/review", validateReview, async (req, res) => {
  try {


    const { id } = req.params;
    // console.log(req.body);

    const product = await Product.findById(id);

    const review = new Review({ ...req.body }); // three dot is "spread operator anything exits in req.body add into review"
    // console.log(review);

    // Average Rating Logic
   
    const newAverageRating = ((product.avgRating * product.reviews.length) + parseInt(review.rating)) / (product.reviews.length + 1);
  
    product.avgRating = parseFloat(newAverageRating.toFixed(1));


    product.reviews.push(review);

    await review.save();
    await product.save();

    req.flash("success", "Added your review successfully!!");
    res.redirect(`/products/${id}`);
  }
  
  catch (e) {
  
    res.status(500).render("error", { err: e.message });
  }
});

module.exports = router;
