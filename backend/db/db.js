const mongoose = require('mongoose');
require('dotenv').config();

// Ensure the MongoDB URI is defined in the .env file
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error("MongoDB URI is not defined in environment variables.");
    process.exit(1);
}

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
