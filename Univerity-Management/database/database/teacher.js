const mongoose = require("mongoose")

const teacherSchema = new mongoose.Schema(
    {
        teacher_id: {
            type: String,
            unique: true,
            required: true,
            trim:true
        },
        teacher_name: {
            type: String,
            required: true,
            trim: true
        },
        teacher_pass: {
            type: String,
            // unique: true,
            required:true,
            trim: true
        },
        teacher_subject: {
            type: String,
            // unique: true,
            required:true,
            trim: true
        },
        teacher_salary:{
            type: Number,
            // unique: true,
            required:true,
            trim: true
        
        },
        teacher_exp: {
            type: Number,
            // unique: true,
            required:true,
            trim: true
        },
    }
)
const teacher = new mongoose.model("teacher" , teacherSchema);
module.exports= teacher;