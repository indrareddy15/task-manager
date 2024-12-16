const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['TODO', 'DONE'],
        default: 'TODO',
    },
    linkedFile: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    deadline: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
})

const TaskModel = mongoose.model("Task", taskSchema);

module.exports = TaskModel;