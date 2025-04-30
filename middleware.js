const Listing = require("./models/listing");
const Review = require("./models/review");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl; // Store the requested URL for redirection
    req.flash("error", "You must be logged in to access that page!");
    return res.redirect("/login"); // Redirect to login
  }
  next(); // Proceed to the next middleware/route
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl; // Make the redirect URL available in response locals
  }
  next(); // Proceed to the next middleware/route
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params; // Extract listing ID from request parameters
  const listing = await Listing.findById(id); // Find listing by ID
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings"); // Redirect if listing is not found
  }
  if (!listing.owner.equals(req.user._id)) { // Check if current user is the owner
    req.flash("error", "You are not the owner of this listing!");
    return res.redirect(`/listings/${id}`); // Redirect if not the owner
  }
  next(); // Proceed if checks pass
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body); // Validate review data
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg); // Throw error if validation fails
  }
  next(); // Proceed if validation passes
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params; // Extract listing ID and review ID
  const review = await Review.findById(reviewId); // Find review by ID

  if (!review) {
    req.flash("error", "Review not found!");
    return res.redirect(`/listings/${id}`); // Redirect if review not found
  }

  if (!review.author || !review.author.equals(req.user._id)) { // Check if current user is the author
    req.flash("error", "You are not the author of this review!");
    return res.redirect(`/listings/${id}`); // Redirect if not the author
  }

  next(); // Proceed if checks pass
};
