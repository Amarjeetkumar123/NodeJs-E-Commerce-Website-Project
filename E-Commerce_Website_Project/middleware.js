const { productSchema, reviewSchema } = require("./schemas");
const Product = require("./models/product");

module.exports.validateProduct = (req, res, next) => {
  const { name, img, desc, price } = req.body;
  const { error } = productSchema.validate({ name, img, price, desc });

  if (error) {
    const msg = error.details.map((err) => err.message).join(",");
    return res.render("error", { err: msg });
  }
  next();
};

module.exports.isLoggedIn = (req, res, next) => {
  //  console.log(req.originalUrl);
  // req.session.returnUrl = req.originalUrl;
  // console.log(req.session);


  //  console.log(req.xhr);  // check request is AJAX request or not

  if (req.xhr && !req.isAuthenticated()) {
    return res.status(401).json({ msg: "You need to login first" }); // 401 means "UnAthorized error"
  }

  if (!req.isAuthenticated()) {
    req.flash("error", "You need to Login first to do that!");
    return res.redirect("/login");
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { rating, comment } = req.body;
  const { error } = reviewSchema.validate({ rating, comment });

  if (error) {
    const msg = error.details.map((err) => err.message).join(",");
    // console.log(msg);
    return res.render("error", { err: msg });
  }
  next();
};


module.exports.isSeller = (req, res, next) => {
  if (!(req.user.role && req.user.role === "seller")) {
    req.flash("error", "You dont have permissions to do that");
    return res.redirect("/products");
  }

  next();
};



module.exports.isProductAuthor = async (req, res, next) => {
  // Getting a product id
  const { id } = req.params;
  // console.log(id);


  const product = await Product.findById(id);
  // console.log(product);
  if (!(product.author && product.author.equals(req.user._id))) {
    req.flash("error", "You dont have permissions to do that");
    return res.redirect(`/products/${id}`);
  }
  next();
};