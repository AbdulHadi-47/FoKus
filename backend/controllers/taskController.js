const Task = require('../models/task.model')

const getTasks = (req, res) => {
    Task.find({userId: req.user.id})

    .then(tasks => res.json(tasks))
    .catch(err => res.status(500).json({success:false, error: err.message}))
}

const createTask = (req, res) => {
    if (!req.body.name || req.body.name.trim() === "") {
        return res.status(400).json({success: false, error: "Title is required"})
    }
    Task.create({ name: req.body.name, hours: req.body.hours, minutes: req.body.minutes, seconds: req.body.seconds, userId: req.user.id,})
    .then(task => res.status(201).json({success: true, id: task._id}))
    .catch(err => res.status(500).json({success: false, error: err.message}))
}

const deleteTask = (req, res) => {
        Task.findOneAndDelete({_id: req.params.id, userId: req.user.id})
        .then(task => {
        if (task) {
            res.json({success: true, message: "Task Deleted"})
        } else {
            res.status(404).json({success: false, message: "Task not found"})
        }
    })
    .catch(err => res.status(500).json({success: false, error: err.message}))

}

module.exports = {getTasks, createTask, deleteTask}