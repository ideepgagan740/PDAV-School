const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            unique: true,
            required: true,
            trim:true
        },
        user_name: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        user_pass: {
            type: String,
            unique: true,
            required:true,
            trim: true
        }
    }
)
const user = new mongoose.model("authentication" , userSchema);
module.exports= user;