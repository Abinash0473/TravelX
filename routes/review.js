const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing");
const Review = require("../models/review");
const ExpressError = require("../utils/ExpressError");




const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

router.post("/", isLoggedIn, wrapAsync(reviewController.createReview)); // POST review

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview)); // DELETE review

module.exports = router;
