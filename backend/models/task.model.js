const mongoose = require("mongoose")

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
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            description: String,
        });

const Task = mongoose.model('Task', taskSchema) 

module.exports = Task