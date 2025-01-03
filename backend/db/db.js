const mongoose = require('mongoose');

// Ensure the MongoDB URI is defined in the .env file
const mongoURI = "mongodb+srv://gantaindra83:indrareddy@taskmanagercluster.f7rtu.mongodb.net/?retryWrites=true&w=majority&appName=taskmanagerCluster";

if (!mongoURI) {
    console.error("MongoDB URI is not valid.");
    process.exit(1);
}

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully from local');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};


module.exports = connectDB;