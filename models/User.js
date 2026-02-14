
const mongoose = require ("mongoose");

const userSchmea = new mongoose.Schema({
    username:{
        type: String,
        reuired: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength:6
    },
    role:{
        type: String,
        enum: ["admin","user"],
        default: "user"
    }
},{timestamps: true });
const User = mongoose.model("User",userSchmea);
module.exports = User;