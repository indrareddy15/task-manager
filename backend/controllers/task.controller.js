const TaskService = require("../services/task.service");
const taskServiceInstance = new TaskService();


const postTask = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Task Data is required" });
        }
        const newTask = await taskServiceInstance.createTask(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskServiceInstance.getTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateTask = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Task Data is required" });
        }
        const updatedTask = await taskServiceInstance.updateTask(req.params.id, req.body);
        // if (!updatedTask) {
        //     return res.status(404).json({ message: "Task not found" });
        // }
        res.status(200).send({ message: "Updated Successfully", updatedTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const deletedTask = await taskServiceInstance.deleteTask(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(deletedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { postTask, getAllTasks, updateTask, deleteTask };