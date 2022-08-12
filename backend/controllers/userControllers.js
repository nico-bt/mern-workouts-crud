const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const validator = require('validator');
const jwt = require("jsonwebtoken")

// LOG IN User
// ----------------------------------------------------------------------------------
const loginUser = async (req, res) => {
    const { email, password } = req.body

    // Check for empty inputs
    if(!email || !password) {
        return res.status(400).json({error: "Please enter all fields"})
    }

    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({ error: `${email} is not registered. Sign up first please.`})
        }
        // Check if passsword match with hashed password in DB
        const match = await bcrypt.compare(password, user.password);

        if(!match){
            return res.status(400).json({ error: "Wrong credentials"})
        }

        if(match){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn: "1d"})
            res.json({ email: user.email, token })
        }
    } catch (error) {
        console.log(error)
    }
}


// SIGN UP User
// ----------------------------------------------------------------------------------
const signupUser = async (req, res) => {
    const {email, password} = req.body

    // Check for empty inputs
    if(!email || !password) {
        return res.status(400).json({error: "Please enter all fields"})
    }
    // Check if email is in valid format
    if(!validator.isEmail(email)){
        return res.status(400).json({error: "Please enter a valid email"})
    }
    
    try {
        // Check if user already exists in DB
        const alreadyExists = await User.findOne({ email })
        if(alreadyExists){
            return res.status(400).json({error: `${email} is already registered`})
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)
        
        // Create user in Database
        const user = await User.create({email, password: hashedPassword})
        
        // Give Token to user to keep it logged in
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn: "1d"})
        
        res.status(201).json({ email: user.email, token })

    } catch (error) {
        console.log(error)
    }
}

module.exports = {loginUser, signupUser}