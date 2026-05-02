const express = require('express')
const app = express()
const PORT = 5000
const mongoose = require("mongoose")
const User = require("./models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const path = require('path');
const cookieParser = require('cookie-parser')

    require("dotenv").config()

    const JWT_SECRET = process.env.JWT_SECRET


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

    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true
    }))

    app.use(express.json())

    app.use(cookieParser())

        const authenticateJWT = (req, res, next) => {
            const token = req.cookies?.token;
            if (!token) return res.sendStatus(401)
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            req.user = {id: payload.id}
            next()
        }

app.get('/api/tasks', authenticateJWT, (req, res) => {
    Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(500).json({success:false, error: err.message}))
})

app.get('/api/me', authenticateJWT, async (req, res) => {
    const user = await User.findById(req.user.id).select('-password')
    console.log(user);
    
    res.json({
        loggedIn: true,
        user
    })
})

app.get('/api/protected', authenticateJWT, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user})
})

app.post("/api/tasks", authenticateJWT, (req, res) => {
    if (!req.body.name || req.body.name.trim() === "") {
        return res.status(400).json({success: false, error: "Title is required"})
    }
    Task.create({ name: req.body.name, hours: req.body.hours, minutes: req.body.minutes, seconds: req.body.seconds})
    .then(task => res.status(201).json({success: true, id: task._id}))
    .catch(err => res.status(500).json({success: false, error: err.message}))
})

app.delete('/api/tasks/:id', authenticateJWT, (req, res) => {
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


app.post('/api/register', async (req, res) => {
    try {
        const {username, password} = req.body
        if (!username || !password) return res.status(400).json({error: "Username and password required"})
        await User.create({username, password})
        return res.status(201).json({message: "Registeration Successful"})
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
})

app.post('/api/login', async (req, res) => {
    try {
   const user = await User.findOne({ username: req.body.username})
   
   if (!user) return res.status(404).json({error: "username not found"});
   const plainPassword = req.body.password
   const hashedPassword = user.password
   const isMatch = await bcrypt.compare(plainPassword, hashedPassword)
   if (!isMatch) return res.status(401).json({error: "Invalid Password"});

   const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h'})
   res.cookie("token", token, {httpOnly: true, sameSite: "lax", secure: false}) 
   res.status(200).json({message: "Login Successful"})

    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

app.post('/api/logout', async (req, res) => {
    const token = req.cookies?.token
    if (!token) return res.json({error: "Done"})
    res.clearCookie('token', { path: '/'})
    res.status(200).json({message: "Logout Successful"})
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
