const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");


// router.get("/fakeuser", async(req, res) => {
//   const user = {
//     email: "amar@gmail.com",
//     username: "Amarjeet",
//     };

//     const newUser = await User.register(user, "amarjeet123");

//     res.send(newUser);
// });

router.get("/register", (req, res) => {
  res.render("auth/signup");
});

router.post("/register", async (req, res) => {

  try {
    const { username, password, email,role } = req.body;
    const user = new User({ username, email,role });
    const newUser = await User.register(user, password);

    req.login(newUser, function (err) {
      if (err) {
        return res.send(err);
      }
      req.flash("success", "Welcome, You are Registered Successfully!!");

      // console.log(newUser);

      res.redirect("/products");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    // console.log(req.user);

   
  
    // let redirectUrl = req.session.returnUrl;
     console.log(req.session);


    req.flash("success", `Welcome Back ${req.user.username} Again !!`);
    console.log("Login Successfully");
    res.redirect("/products");
  }
);

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.send(err);
    }
    req.flash("success", "GoodBye!!");
    res.redirect("/products");
  });
});

module.exports = router;
