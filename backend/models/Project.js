const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    instructions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Instruction' }],
    subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subtask' }],
    description: { type: String, default: "Default description" },
    instructionText: { type: String }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
