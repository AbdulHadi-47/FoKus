const express = require('express')
const app = express()
const PORT = 5000
const mongoose = require("mongoose")
const User = require("./models/user.model.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken") 
const cookieParser = require('cookie-parser')
const Task = require("./models/task.model")
const authRoutes = require("./routes/authRoutes")
const taskRoutes = require("./routes/taskRoutes")

require("dotenv").config()

const JWT_SECRET = process.env.JWT_SECRET


mongoose.connect('mongodb://localhost:27017/mydb')
.then(() => console.log('MongoDB connected!'))
.catch(err => console.error('MongoDB connection error:', err))

const cors = require('cors')

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json()) 

app.use(cookieParser())

app.use("/api/auth", authRoutes)

app.use("/api/tasks", taskRoutes)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
