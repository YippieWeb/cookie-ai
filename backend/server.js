const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB database connection established successfully"))
.catch(err => console.error("MongoDB connection error:", err));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// Define routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the app!" });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Projects
const Project = require('./models/Project'); // Ensure this path is correct based on your project structure

// Route to create a new project
app.post('/projects', async (req, res) => {
    const { projectName, description } = req.body;
    const newProject = new Project({ projectName, description });

    try {
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to retrieve all projects
app.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        console.log("Retrieved projects:", projects); // Log the retrieved projects
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: error.message });
    }
});