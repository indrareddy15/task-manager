const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/db');
const taskRoutes = require('./routes/task.routes');

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());

// app.use(express.json());
app.use("/tasks/v1", taskRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});