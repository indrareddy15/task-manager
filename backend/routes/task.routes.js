const { createTask, getAllTasks, updateTask, deleteTask } = require('../controllers/task.controller');

const Router = require('express').Router;

const router = Router();


router.post("/", createTask)
router.get("/", getAllTasks)
router.patch("/:id", updateTask)
router.delete(":id", deleteTask)

module.exports = router;