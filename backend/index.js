const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/db');
const taskRoutes = require('./routes/task.routes');

dotenv.config();
const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true
}
app.use(cors(corsOptions))
const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use("/tasks", taskRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});