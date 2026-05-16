const express = require("express")
const router = express.Router()

const {getTasks, createTask, deleteTask} = require('../controllers/taskController')
const authenticateJWT = require("../middlewares/authenticateJWT")

router.get('/', authenticateJWT, getTasks)
router.post('/', authenticateJWT, createTask)
router.delete('/:id', authenticateJWT, deleteTask)

module.exports = router