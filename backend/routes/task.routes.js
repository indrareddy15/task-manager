const { postTask, getAllTasks, updateTask, deleteTask } = require('../controllers/task.controller');

const Router = require('express').Router;

const router = Router();


router.post("/uploadtask", postTask)
router.get("/gettask", getAllTasks)
router.patch("/updatetask/:id", updateTask)
router.delete("/deletetask/:id", deleteTask)

module.exports = router;