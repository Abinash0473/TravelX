const mongoose = require('mongoose');
const Schema = mongoose.Schema;  // Add this to reference mongoose.Schema
const review = require('./review');  // Import review model if needed
const { required } = require('joi');

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: {
    filename: String,
    url: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,  // Correct Schema reference
      ref: "Review",  // Reference the Review model
    },
  ],
  owner:{
    type: Schema.Types.ObjectId,
    ref:"User",
  },
  geometry:{
    type:{
      type: String,
      enum:["Point"],
      required:true,
    },
  coordinates:{
    type:[Number],
    required:true
  },
},
});

listingSchema.post("findOneAndDelete",async(listing)=>{
  if (listing){
  await review.deleteMany({_id:{$in : listing.reviews}});
  }
});

// Export the Listing model once
module.exports = mongoose.model('Listing', listingSchema);
