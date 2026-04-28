const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js");
const userController = require('../controllers/user.js');
router
.route("/signup")
    .get(userController.signupform)
    .post(wrapAsync(userController.signUp));

router
    .route("/login")
    .get(wrapAsync(userController.loginform))
    .post(
        savedRedirectUrl,
        passport.authenticate("local",
            {
                failureRedirect: "/login",
                failureFlash: true,
            }), userController.login);

router.get("/logout", userController.logout);
module.exports = router;

// this is the user router file 