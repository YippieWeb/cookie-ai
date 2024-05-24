const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json()); // middleware to parse JSON

// CORS Configuration
const allowedOrigins = [
    'http://localhost:3000', // React app running locally
    'https://yippieweb.github.io', // GitHub Pages deployment
    'https://cookie-ai-three.vercel.app' // Vercel deployment
];

app.use(cors({
    origin: allowedOrigins
}));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB database connection established successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

// API Routes
const Project = require('./models/Project'); // ensure this path is correct based on your project structure

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

app.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/projects/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/projects/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/projects/:projectId', async (req, res) => {
    const { projectId } = req.params;
    const { instructionText } = req.body;
    try {
        const project = await Project.findByIdAndUpdate(projectId, { instructionText }, { new: true });
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// Catch-all route to serve index.html for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;