
require('dotenv').config();
const express = require('express');
const app = express();
const bcrypt = require ("bcrypt");
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000; 

app.use(express.json())
async function conctionDB(){
try{
    await mongoose.connect(process.env.URL)
    console.log("conction data done")
}
catch(err){
    console.log(err)
}
}


conctionDB();

const User = require("./models/User");

app.post("/register", async (req,res)=>{
try {
const { username,email,password,role } = req.body;

if (!username || !email || !password)
     return res.status(400).json({ msg: "missing data"});

const existUser = await User.findOne({email});
if (existUser)
     return res.status(400).json({msg:"acount already Exsist"})

const hashpassword = await bcrypt.hash(password,10);
const user = await User.create({
    username,
    email,
    password: hashpassword,
    role
})

res.status(201).json({
    msg: "done created user",
    data: user,
})


}catch (error) {
console.log(error.message);

}
});

app.post("/login", async (req,res)=>{
    try{
        const {email ,password} = req.body;


        if ( !email || !password) return res.status(400).json({ msg: "missing data"});
        const user = await User.findOne({email});
         if (!user)
             return res.status(404).json({msg: "your account not found please create Account"});

        const matchpassword = await bcrypt.compare(password ,user.password);
        if (!matchpassword)
             return res.status(400).json({msg:"invalid password"});

        res.status(200).json({

        msg:"success login",
        })    
    } catch (error) {
        console.log(error)
    }

});

app.listen(PORT, ()=> {
    console.log("server is running")})