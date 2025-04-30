const express = require("express");
const router = express.Router();
const listingsController = require("../controllers/listings.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage});



router
 .route("/")
 .get(isLoggedIn,wrapAsync(listingsController.index))
 .post(isLoggedIn, upload.single("listing[image]"), wrapAsync(listingsController.createListing));





// New Listing Form: Show the form to create a new listing
router.get("/new", isLoggedIn, listingsController.renderNewForm);

router
 .route("/:id")
 .get(wrapAsync(listingsController.showListing))
 .put(isLoggedIn, isOwner,upload.single("listing[image]"),   wrapAsync(listingsController.updateListing))
 .delete(isLoggedIn, isOwner, wrapAsync(listingsController.destroyListing)
); 









// Edit Listing Form: Show the form to edit a listing
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingsController.renderEditForm));



module.exports = router;
