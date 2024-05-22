const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: { type: String, required: true },
    description: { type: String, default: "Default description" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    // arrays to store ObjectIds of instructions and subtasks
    instructions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Instruction' }],
    subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subtask' }]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
