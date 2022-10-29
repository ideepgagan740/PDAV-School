const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema(
    {
        student_id: {
            type: String,
            unique: true,
            required: true,
            trim:true
        },
        student_name: {
            type: String,
            required: true,
            trim: true
        },
        student_pass: {
            type: String,
            required: true,
            trim: true
        },
        student_class: {
            type: String,
            required: true,
            trim: true
        },
        student_section: {
            type: String,
            required:true,
            trim: true
        }
    }
)
const student = new mongoose.model("student" , studentSchema);
module.exports= student;