const express = require('express');
const router = express.Router({ mergeParams: true });

const wrapAsync = require('../utils/wrapAsync.js');
const{validateReview}=require('../middleware.js');

const { isloggedIn } = require("../middleware.js");
const reviewController=require('../controllers/reviews.js');

// new review
router.post("/", validateReview,isloggedIn, wrapAsync(reviewController.createNew));
// delete Review route 
router.delete("/:reviewId", isloggedIn, wrapAsync(reviewController.deleteReview));

module.exports = router;