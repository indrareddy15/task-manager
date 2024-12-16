const TaskModel = require("../model/task.model");

class TaskService {
    createTask = async (task) => {
        try {
            const newTask = new TaskModel(task);
            return await newTask.save();
        } catch (error) {
            console.error("Error creating task:", error);
            throw new Error(error);
        }
    }

    getTasks = async () => {
        try {
            return await TaskModel.find();
        } catch (error) {
            console.error("Error creating task:", error);
            throw new Error(error);
        }
    }

    updateTask = async (id, task) => {
        try {
            const updatedTask = await TaskModel.findByIdAndUpdate(
                id,
                task,
                { new: true }
            );
            return updatedTask;
        } catch (error) {
            console.error("Error creating task:", error);
            throw new Error(error);
        }
    }

    deleteTask = async (id) => {
        try {
            const deletedTask = await TaskModel.findByIdAndDelete(id);
            return deletedTask;
        } catch (error) {
            console.error("Error creating task:", error); 
            throw new Error(error);
        }
    }
}

module.exports = TaskService;