const express = require('express')
const app = express()
const PORT = 3000
const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/mydb')
.then(() => console.log('MongoDB connected!'))
.catch(err => console.error('MongoDB connection error:', err))

const taskSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        minlength: [1, 'Title cannot be empty']
    },
    hours:{
        type: Number,
        required: [true, "hours are required"]
    },
    minutes: {
        type: Number,
        required: [true, "minutes are required"]
    },
    seconds: {
        type: Number, 
        required: [true, "seconds are required"]
    },
    description: String,
});

const Task = mongoose.model('Task', taskSchema)

const cors = require('cors')

app.use(cors())

app.use(express.json())

const tasks = []

app.get('/api/tasks', (req, res) => {
    Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(500).json({success:false, error: err.message}))
})

app.post("/api/tasks", (req, res) => {
    if (!req.body.name || req.body.name.trim() === "") {
        return res.status(400).json({success: false, error: "Title is required"})
    }
    Task.create({ name: req.body.name, hours: req.body.hours, minutes: req.body.minutes, seconds: req.body.seconds})
    .then(task => res.status(201).json({success: true, id: task._id}))
    .catch(err => res.status(500).json({success: false, error: err.message}))
})

app.put('/api/tasks/:id', (req, res) => {
    if (!req.body.title || req.body.title.trim() === "") {
        return res.status(400).jsoN({success: false, error: "Title is required"})
    }
    Task.findByIdAndUpdate(
        req.params.id,
        { title: req.body.title, description: req.body.description },
        {new: true}
    )
        .then(task => {
            if (task) {
                res.json({success: true, message: "Task Updated", task})
            } else {
                res.status(404).json({success:false, message: "Task not found"})
            }
        })
        .catch(err => res.status(500).json({success: false, error: err.message}))
})


app.delete('/api/tasks/:id', (req, res) => {
    Task.findByIdAndDelete(req.params.id)
    .then(task => {
        if (task) {
            res.json({success: true, message: "Task Deleted"})
        } else {
            res.status(404).json({success: false, message: "Task not found"})
        }
    })
    .catch(err => res.status(500).json({success: false, error: err.message}))
})


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
