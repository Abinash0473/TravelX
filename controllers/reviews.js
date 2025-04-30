const Listing = require("../models/listing");
const Review = require("../models/review");
const ExpressError = require("../utils/ExpressError");



module.exports.createReview = async (req, res) => {
   
        let listing = await Listing.findById(req.params.id);

        let newReview = new Review(req.body.review);
        newReview.author = req.user._id; // Set the author to the current user
        listing.reviews.push(newReview); // Add review to the listing's reviews array

        await newReview.save(); // Save the new review
        await listing.save(); // Update the listing with the new review

        req.flash("success", "New Review Created!");
        res.redirect(`/listings/${listing._id}`);

};

module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;


        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // Remove review ID from the listing
        await Review.findByIdAndDelete(reviewId); // Delete the review from the database

        req.flash("success", "Review Deleted!");
        res.redirect(`/listings/${id}`);

};
