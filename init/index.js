const mongoose = require('mongoose');
const initData = require('./data.js');  // Path to your initData file

const MONGO_URL = 'mongodb://127.0.0.1:27017/test';

main()
  .then(() => {
    console.log('Connected to DB');
    initDB();  // Initialize data after successful connection
  })
  .catch((err) => {
    console.error('Failed to connect to DB:', err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: {
    filename: String,
    url: String
  },
  price: Number,
  location: String,
  country: String,
  owner: String  // Added 'owner' field to the schema
});

const Listing = mongoose.model('Listing', listingSchema);

const initDB = async () => {
  try {
    await Listing.deleteMany({});  // Clear any existing data
    const updatedData = initData.map((obj) => ({
      ...obj,
      owner: "671feb4df0c99715d465dde9"  // Add 'owner' field to each object
    }));
    await Listing.insertMany(updatedData);  // Insert the modified data
    console.log("Database initialized with sample data");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
};
