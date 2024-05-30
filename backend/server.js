require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json()); // middleware to parse JSON

// CORS Configuration
const allowedOrigins = [
    'http://localhost:3000', // React app running locally
    'https://yippieweb.github.io', // GitHub Pages deployment
    'https://cookie-ai-ioy6.onrender.com'
];
app.use(cors({
    origin: allowedOrigins
}));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB database connection established successfully"))
.catch(err => console.error("MongoDB connection error:", err));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// projects
const Project = require('./models/Project');
 
// route to create a new project
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

// route to retrieve all projects
app.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 }); // sort by createdAt in descending order
        console.log("Retrieved projects:", projects); // log the retrieved projects
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: error.message });
    }
});

// route to retrieve a project by its ID
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

// route to delete a project by its ID
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

// route to update instructionText for a specific project
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

// route to GET subtasks for a project
app.get('/projects/:projectId/subtasks', async (req, res) => {
    try {
        const { projectId } = req.params;

        // Find the project by its ID
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).send('Project not found');
        }

        // Log the project object to see if subtasks are included
        console.log(project);

        // Return the entire project object
        res.json(project.subtasks);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// route to delete a specific subtask by its MongoDB ObjectId (_id)
app.delete('/projects/:projectId/subtasks/:subtaskId', async (req, res) => {
    const { projectId, subtaskId } = req.params;
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // check if the subtask exists
        const subtask = project.subtasks.id(subtaskId);
        if (!subtask) {
            return res.status(404).json({ message: 'Subtask not found' });
        }

        // remove the subtask from the project's subtasks array
        project.subtasks.pull(subtaskId);

        // save the project to apply the changes
        await project.save();

        res.status(200).json({ message: 'Subtask deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// prepare for deployment to "render"
app.use(express.static(path.join(__dirname, "../build")));

app.get('*', async (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
});

console.log(path.join(__dirname, "../build/index.html"));

// start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
