const express = require('express');
const User = require('../models/UserModel');
const UserRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
require('dotenv').config();
const saltRounds = 10;

UserRouter.post('/register', async (req, res) => {
    const { name, username, password } = req.body;
    const existing = await User.findOne({ username });
    if (existing) {
        return res.status(400).json({ message: 'User already exists' });
    }
    bcrypt.hash(password, saltRounds, function(err, hash) {
        const newUser = User.create({
            name,
            username,
            password: hash
        })
        if (newUser) {
            res.status(200).json({ message: 'User created successfully' });
            
        }else{
            res.status(500).json({ message: 'Error signing up' });
        }
    });
}
)

UserRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const find = await User.findOne({ username });
    if (!find) {
        return res.status(400).json({ message: 'User not found' });
    }
    // console.log(find._id);
    bcrypt.compare(password,find.password,async function(err, result) {
        if (result) {
            const secret = process.env.JWT_SECRET;
            console.log(secret);
            const userId = find._id;
            const token =await jwt.sign({userId}, secret);
            res.status(200).json({ message: 'User logged in', token });
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    })
})
module.exports = UserRouter;