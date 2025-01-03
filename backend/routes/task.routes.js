const { createTask, getAllTasks, updateTask, deleteTask } = require('../controllers/task.controller');

const Router = require('express').Router;
const upload = require("../utils/fileConfig.js");

const router = Router();


router.get("/", getAllTasks)
router.post("/", upload.single("pdf"), createTask)
router.patch("/:id", updateTask)
router.delete("/:id", deleteTask)

module.exports = router;