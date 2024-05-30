const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ['critical', 'high', 'medium', 'low'], required: true },
    timeEstimated: { type: Number, required: true }
});

const projectSchema = new mongoose.Schema({
    projectName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    instructions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Instruction' }],
    subtasks: [subtaskSchema],
    description: { type: String, default: "Default description" },
    instructionText: { type: String }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;